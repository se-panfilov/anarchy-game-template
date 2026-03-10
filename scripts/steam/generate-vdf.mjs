#!/usr/bin/env node

/**
 * Generates SteamPipe VDF build script from templates.
 *
 * Reads configuration from environment variables (or falls back to apps/desktop/.env).
 * Outputs a ready-to-use app_build.vdf for SteamCMD.
 *
 * Required env:
 *   STEAM_APP_ID          — Steam application ID
 *   STEAM_DEPOT_ID_WIN    — Depot ID for Windows
 *   STEAM_DEPOT_ID_MAC    — Depot ID for macOS
 *   STEAM_DEPOT_ID_LINUX  — Depot ID for Linux
 *
 * Optional env:
 *   BUILD_DESC            — Build description (default: "CI build")
 *   CONTENT_ROOT          — Root path for depot content (default: "./steam-depots")
 *   BUILD_OUTPUT          — SteamPipe build output dir (default: "./steam-output")
 *   SET_LIVE              — Steam branch name to set live (default: "" = don't set live)
 *   VDF_PREVIEW           — "1" for preview mode / "0" for real upload (default: "0")
 *   PLATFORMS             — Comma-separated list of platforms to include (default: "win,mac,linux")
 *   OUTPUT_DIR            — Where to write the generated VDF (default: "./steam-vdf")
 *
 * Usage:
 *   node scripts/steam/generate-vdf.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ---------------------------------------------------------------------------
// Load .env fallback (simple key=value parser, no quotes handling needed)
// ---------------------------------------------------------------------------

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const vars = {};
  for (const line of fs.readFileSync(filePath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx < 1) continue;
    vars[trimmed.slice(0, eqIdx).trim()] = trimmed.slice(eqIdx + 1).trim();
  }
  return vars;
}

function env(key, fallbackEnv = {}) {
  return process.env[key] ?? fallbackEnv[key] ?? '';
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  const repoRoot = process.cwd();
  const envFallback = loadEnvFile(path.join(repoRoot, 'apps', 'desktop', '.env'));

  // Required
  const appId = env('STEAM_APP_ID', envFallback);
  const depotWin = env('STEAM_DEPOT_ID_WIN', envFallback);
  const depotMac = env('STEAM_DEPOT_ID_MAC', envFallback);
  const depotLinux = env('STEAM_DEPOT_ID_LINUX', envFallback);

  if (!appId) throw new Error('STEAM_APP_ID is required');

  // Optional
  const buildDesc = env('BUILD_DESC', envFallback) || 'CI build';
  const contentRoot = env('CONTENT_ROOT', envFallback) || './steam-depots';
  const buildOutput = env('BUILD_OUTPUT', envFallback) || './steam-output';
  const setLive = env('SET_LIVE', envFallback) || '';
  const preview = env('VDF_PREVIEW', envFallback) || '0';
  const platforms = (env('PLATFORMS', envFallback) || 'win,mac,linux')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  const outputDir = env('OUTPUT_DIR', envFallback) || './steam-vdf';

  // Depot map
  const depotMap = {
    win: { id: depotWin, subdir: 'windows' },
    mac: { id: depotMac, subdir: 'macos' },
    linux: { id: depotLinux, subdir: 'linux' }
  };

  // Read templates
  const appTemplate = fs.readFileSync(path.join(__dirname, 'app_build.vdf.template'), 'utf8');
  const depotTemplate = fs.readFileSync(path.join(__dirname, 'depot.vdf.template'), 'utf8');

  // Generate depot entries
  const depotEntries = [];
  for (const platform of platforms) {
    const depot = depotMap[platform];
    if (!depot) throw new Error(`Unknown platform: "${platform}". Expected: win, mac, linux`);
    if (!depot.id) throw new Error(`STEAM_DEPOT_ID_${platform.toUpperCase()} is required when platform "${platform}" is enabled`);

    const entry = depotTemplate.replace(/__DEPOT_ID__/g, depot.id);
    depotEntries.push(entry);
  }

  // Generate app_build.vdf
  const vdf = appTemplate
    .replace(/__APP_ID__/g, appId)
    .replace(/__BUILD_DESC__/g, buildDesc)
    .replace(/__BUILD_OUTPUT__/g, buildOutput)
    .replace(/__CONTENT_ROOT__/g, contentRoot)
    .replace(/__SET_LIVE__/g, setLive)
    .replace(/__PREVIEW__/g, preview)
    .replace(/__DEPOT_ENTRIES__/g, depotEntries.join('\n'));

  // Write output
  fs.mkdirSync(outputDir, { recursive: true });
  const outPath = path.join(outputDir, 'app_build.vdf');
  fs.writeFileSync(outPath, vdf, 'utf8');

  console.log(`Generated: ${outPath}`);
  console.log(`  App ID: ${appId}`);
  console.log(`  Platforms: ${platforms.join(', ')}`);
  console.log(`  Set live: ${setLive || '(none)'}`);
  console.log(`  Preview: ${preview}`);
  console.log(`  Content root: ${contentRoot}`);
  console.log('');
  console.log(vdf);
}

main();
