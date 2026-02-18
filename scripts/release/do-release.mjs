import fs from 'node:fs';
import { spawnSync } from 'node:child_process';

const repoRoot = process.cwd();

// Releases apps:
// - build each app (npm run build --workspace <path>)
// - create annotated tag key@version (if missing)
// - push tags
// - create GitHub release per tag
// supports DRY_RUN=true

function run(cmd, args, opts = {}) {
  const r = spawnSync(cmd, args, { stdio: 'inherit', cwd: repoRoot, ...opts });
  if (r.status !== 0) throw new Error(`Command failed: ${cmd} ${args.join(' ')}`);
}

function runCapture(cmd, args, opts = {}) {
  const r = spawnSync(cmd, args, { encoding: 'utf8', cwd: repoRoot, ...opts });
  if (r.status !== 0) throw new Error(`Command failed: ${cmd} ${args.join(' ')}`);
  return (r.stdout ?? '').trim();
}

function hasTag(tag) {
  return runCapture('git', ['tag', '--list', tag]) === tag;
}

function ghReleaseExists(tag) {
  try {
    runCapture('gh', ['release', 'view', tag]);
    return true;
  } catch {
    return false;
  }
}

function main() {
  const plan = JSON.parse(process.env.RELEASE_PLAN_JSON ?? '{}');
  const dryRun = (process.env.DRY_RUN ?? 'false') === 'true';

  const releases = plan.releases ?? [];
  if (releases.length === 0) {
    console.log('No releases to do.');
    return;
  }

  // Safety: enforce apps/* only
  for (const r of releases) {
    if (
      !String(r.path ?? '')
        .replaceAll('\\', '/')
        .startsWith('apps/')
    ) {
      throw new Error(`Plan contains path outside apps/: path="${r.path}" for key="${r.key}".`);
    }
  }

  // Build each app
  for (const r of releases) {
    const wsPath = String(r.path);

    console.log(`\n=== Build: ${r.key} (${wsPath}) ===`);
    if (dryRun) console.log(`[dry] npm run --workspace ${wsPath} build`);
    else run('npm', ['run', '--workspace', wsPath, 'build']);
  }

  // Tags: key@version
  for (const r of releases) {
    const tag = `${r.key}@${r.version}`;
    if (hasTag(tag)) {
      console.log(`Tag exists: ${tag} (skip)`);
      continue;
    }

    if (dryRun) console.log(`[dry] git tag -a ${tag} -m "${r.key} v${r.version}"`);
    else run('git', ['tag', '-a', tag, '-m', `${r.key} v${r.version}`]);
  }

  if (!dryRun) run('git', ['push', '--tags']);

  // GitHub release
  for (const r of releases) {
    const tag = `${r.key}@${r.version}`;

    const notes = [
      `**${r.name}**`,
      ``,
      `- Version: \`${r.prev ?? 'none'}\` → \`${r.version}\``,
      `- Workspace: \`${r.path}\``,
      ``,
      `_Source of truth: git tag \`${tag}\`._`
    ].join('\n');

    if (ghReleaseExists(tag)) {
      console.log(`GitHub release exists: ${tag} (skip)`);
      continue;
    }

    if (dryRun) {
      console.log(`[dry] gh release create ${tag} --title "${r.key} v${r.version}"`);
    } else {
      run('gh', ['release', 'create', tag, '--title', `${r.key} v${r.version}`, '--notes', notes]);
    }
  }

  console.log('\nRelease done.');
}

main();
