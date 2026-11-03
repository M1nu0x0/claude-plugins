#!/usr/bin/env node
// @ts-check
// Writes src/plugins.json, the plugin cards on the page, from ../.claude-plugin/marketplace.json and, for each
// entry, its repository's plugin.json (name, version) and site/src/site.json (title, site URL, one line per
// language). The plugins keep their own words; this file only copies them, so the page builds offline.
//   node scripts/sync-plugins.mjs          fetch from GitHub and write src/plugins.json
//   node scripts/sync-plugins.mjs --check  fetch and compare: an error when the plugins differ from the
//                                          marketplace, a warning when only their text or version moved on
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const MARKETPLACE = fileURLToPath(new URL('../../.claude-plugin/marketplace.json', import.meta.url))
const SITE_JSON = fileURLToPath(new URL('../src/site.json', import.meta.url))
const OUT = fileURLToPath(new URL('../src/plugins.json', import.meta.url))
const OUT_NAME = 'site/src/plugins.json'

/**
 * @typedef {{ name: string, source: { source: string, url: string, path: string, ref?: string, sha?: string } }} Entry
 * @typedef {{ path: string, description: string }} Card
 * @typedef {{ name: string, repo: string, title: string, version: string, site: string, languages: Record<string, Card> }} Plugin
 */

/** @param {string} f @returns {any} */
const readJson = f => JSON.parse(readFileSync(f, 'utf8'))
/** @param {string} msg @returns {never} */
const fail = msg => { console.error(`::error::${msg}`); process.exit(1) }

// A raw file of the entry's repository, at the ref the marketplace installs from.
/** @param {Entry['source']} source @param {string} path */
async function raw(source, path) {
  const ref = source.sha ?? source.ref ?? 'HEAD'
  const url = `https://raw.githubusercontent.com/${source.url}/${ref}/${path}`
  const res = await fetch(url)
  if (!res.ok) fail(`${url}: HTTP ${res.status}`)
  return res.json()
}

/** @param {Entry} entry @param {string[]} langs @returns {Promise<Plugin>} */
async function plugin(entry, langs) {
  const { source } = entry
  if (source.source !== 'git-subdir' || !/^[\w.-]+\/[\w.-]+$/.test(source.url)) {
    fail(`${entry.name}: the page reads plugins from a git-subdir source with an owner/repo url`)
  }
  const manifest = await raw(source, `${source.path}/.claude-plugin/plugin.json`)
  if (manifest.name !== entry.name) fail(`${entry.name}: ${source.url}/${source.path} is the plugin "${manifest.name}"`)
  const site = await raw(source, 'site/src/site.json')
  /** @type {Record<string, Card>} */
  const languages = {}
  for (const l of langs) {
    const L = site.languages[l]
    if (!L) fail(`${entry.name}: ${source.url} has no "${l}" page, and this site has one`)
    languages[l] = { path: L.path, description: L.ogDescription }
  }
  return { name: entry.name, repo: source.url, title: site.name, version: manifest.version, site: site.site, languages }
}

const check = process.argv.includes('--check')
/** @type {{ plugins: Entry[] }} */
const marketplace = readJson(MARKETPLACE)
const langs = Object.keys(readJson(SITE_JSON).languages)
const plugins = await Promise.all(marketplace.plugins.map(e => plugin(e, langs)))
const text = JSON.stringify({ plugins }, null, 2) + '\n'

if (!check) {
  writeFileSync(OUT, text)
  console.log(`${OUT_NAME}: ${plugins.map(p => `${p.name} ${p.version}`).join(', ')}`)
} else {
  /** @type {{ plugins: Plugin[] }} */
  const have = readJson(OUT)
  const names = (/** @type {Plugin[]} */ ps) => ps.map(p => p.name).join(', ')
  if (names(have.plugins) !== names(plugins)) {
    fail(`${OUT_NAME} lists ${names(have.plugins)}, the marketplace ${names(plugins)}. Run npm run sync in site/.`)
  }
  const moved = plugins.filter((p, i) => JSON.stringify(p) !== JSON.stringify(have.plugins[i]))
  if (moved.length) {
    for (const p of moved) {
      console.log(`::warning file=${OUT_NAME},title=${p.name} moved on::${p.repo} has a new version or new text (now ${p.version}). Run npm run sync in site/ and commit ${OUT_NAME}.`)
    }
  } else console.log(`${OUT_NAME} matches every plugin's repository`)
}
