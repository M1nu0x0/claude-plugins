// The GitHub Pages site. Everything about it, in every language, is in src/site.json and the plugin cards in
// src/plugins.json; the shared layout, SEO head, sitemap and build checks come from @m1nu0x0/claude-plugin-site.
// This repository is a marketplace, not a plugin, so the version in the JSON-LD is the marketplace's.
import { defineConfig } from 'astro/config'
import pluginSite from '@m1nu0x0/claude-plugin-site'

export default defineConfig({
  integrations: [pluginSite({ pluginJson: '../.claude-plugin/marketplace.json' })],
})
