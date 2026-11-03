# Changelog

All notable changes to this project are recorded here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added

- `$schema` in `marketplace.json`, pointing at the Claude Code marketplace schema on SchemaStore, for editor autocomplete and checks; Claude Code ignores it at load time

## [0.1.0] - 2026-11-03

### Added

- The marketplace `m1nu0x0` (`.claude-plugin/marketplace.json`) with `turn-duration`, `safe-zsh` and `utf8-guard`, each a `git-subdir` entry with a full https URL for the `plugins/<name>` folder of the plugin's own repository, following its default branch
- CI on Ubuntu, Windows and macOS that validates the marketplace, adds it in an empty config folder and installs every plugin from it; it also runs daily, so a plugin repository that moves or renames its plugin is caught
- A GitHub Pages site in Korean, English and Japanese, built with [claude-plugin-site](https://github.com/M1nu0x0/claude-plugin-site) v0.1.1, with a card and an install command for each plugin; the cards are copied from each plugin's `plugin.json` and `site/src/site.json` by `npm run sync`, and CI fails when they list other plugins than the marketplace and warns when a plugin's version or text has moved on
- A check that a release tag matches the marketplace's version, and Dependabot updates for GitHub Actions and the site
- READMEs in Korean, English and Japanese

[Unreleased]: https://github.com/M1nu0x0/claude-plugins/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/M1nu0x0/claude-plugins/releases/tag/v0.1.0
