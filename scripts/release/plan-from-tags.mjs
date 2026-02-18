import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import semver from 'semver';

const repoRoot = process.cwd();

// Calculates "what to release" based on tags name@x.y.z and current package.json.
// Applies ONLY for apps/core and apps/desktop.

function runCapture(cmd, args) {
  const r = spawnSync(cmd, args, { encoding: 'utf8', cwd: repoRoot });
  if (r.status !== 0) throw new Error(`Command failed: ${cmd} ${args.join(' ')}`);
  return (r.stdout ?? '').trim();
}

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

/** Known app workspaces (add future apps like "mobile" here). */
const APP_DIRS = ['apps/core', 'apps/desktop'];

function listAppWorkspaces() {
  const out = [];
  for (const wsPath of APP_DIRS) {
    const absPath = path.join(repoRoot, wsPath);
    const pkgPath = path.join(absPath, 'package.json');
    if (!fs.existsSync(pkgPath)) continue;

    const pkg = readJson(pkgPath);
    if (!pkg?.version) continue;

    // key = folder name (e.g. "core", "desktop")
    const key = path.basename(wsPath);

    out.push({
      key,
      path: wsPath.replaceAll('\\', '/'),
      name: String(pkg.name ?? key),
      version: String(pkg.version)
    });
  }

  return out;
}

function latestTagVersionFor(wsKey) {
  const tags = runCapture('git', ['tag', '--list', `${wsKey}@*`])
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);

  let best = null;
  for (const t of tags) {
    const v = t.slice((wsKey + '@').length);
    if (!semver.valid(v)) continue;
    if (!best || semver.gt(v, best)) best = v;
  }
  return best;
}

function main() {
  const app = (process.env.RELEASE_APP ?? 'all').trim(); // all | core | desktop

  if (!['all', 'core', 'desktop'].includes(app)) {
    throw new Error(`Invalid RELEASE_APP: "${app}". Expected: all, core, or desktop`);
  }

  const workspaces = listAppWorkspaces();
  const selected = app === 'all' ? workspaces : workspaces.filter((w) => w.key === app);

  if (selected.length === 0) {
    const keys = workspaces.map((w) => w.key).sort();
    throw new Error(`App not found: "${app}". Available:\n- ${keys.join('\n- ')}`);
  }

  const releases = [];
  for (const w of selected) {
    const last = latestTagVersionFor(w.key);
    const shouldRelease = !last || semver.neq(w.version, last);
    if (!shouldRelease) continue;

    releases.push({
      key: w.key,
      name: w.name,
      path: w.path,
      version: w.version,
      prev: last ?? null
    });
  }

  releases.sort((a, b) => a.key.localeCompare(b.key));
  console.log(JSON.stringify({ releases }, null, 2));
}

main();
