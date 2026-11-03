# claude-plugins

[![release](https://img.shields.io/github/v/release/M1nu0x0/claude-plugins)](https://github.com/M1nu0x0/claude-plugins/releases)
[![CI](https://github.com/M1nu0x0/claude-plugins/actions/workflows/ci.yml/badge.svg)](https://github.com/M1nu0x0/claude-plugins/actions/workflows/ci.yml)
[![license](https://img.shields.io/github/license/M1nu0x0/claude-plugins)](LICENSE)

[한국어](README.md) | **English** | [日本語](README.ja.md)

A marketplace with every Claude Code plugin by M1nu0x0. Add it once, then install any of the plugins below by name.

Each plugin is built and released in its own repository. This repository holds no plugin code: each entry in the marketplace points at the `plugins/<name>` folder of the plugin's repository, so installing from here gives you the same files as installing from the plugin's own marketplace.

**[Website](https://m1nu0x0.github.io/claude-plugins/) · [Releases](https://github.com/M1nu0x0/claude-plugins/releases) · [Changelog](CHANGELOG.md)**

## Plugins

| Plugin | Install ID | What it does |
| --- | --- | --- |
| [TurnDuration for Claude](https://m1nu0x0.github.io/claude-turn-duration/) ([repo](https://github.com/M1nu0x0/claude-turn-duration)) | `turn-duration@m1nu0x0` | Shows how long each answer took and when it finished, under the answer in Claude Desktop |
| [SafeZsh for Claude](https://m1nu0x0.github.io/claude-safe-zsh/) ([repo](https://github.com/M1nu0x0/claude-safe-zsh)) | `safe-zsh@m1nu0x0` | Makes the Bash tool's zsh read the bash-style commands Claude writes the way bash does |
| [UTF-8 Guard for Claude](https://m1nu0x0.github.io/claude-utf8-guard/) ([repo](https://github.com/M1nu0x0/claude-utf8-guard)) | `utf8-guard@m1nu0x0` | Keeps Korean, Japanese and Chinese in tool calls from turning into wrong characters through `\uXXXX` escapes |

## Install

Add the marketplace once, at the Claude Code terminal prompt:

```
/plugin marketplace add M1nu0x0/claude-plugins
```

Then install the plugins you want by install ID, and choose the user scope:

```
/plugin install utf8-guard@m1nu0x0
```

From a shell:

```sh
claude plugin marketplace add M1nu0x0/claude-plugins
claude plugin install utf8-guard@m1nu0x0
```

In Claude Desktop, click `+` next to the prompt box → Plugins → Add marketplace, enter `M1nu0x0/claude-plugins`, then add the plugins you want. Each plugin applies from the next session after you install it. What each plugin needs (Node.js and so on) is in its own README.

### If you already installed one from its own marketplace

Keep it, or move it: uninstall it first, then install it from here.

```sh
claude plugin uninstall utf8-guard@claude-utf8-guard
claude plugin install utf8-guard@m1nu0x0
```

Do not keep both. Claude Code sees `utf8-guard@claude-utf8-guard` and `utf8-guard@m1nu0x0` as two different plugins and runs the hooks of both.

## Updates

The entries pin no `ref`: each follows the default branch of the plugin's repository. The plugin's own marketplace points at the same branch through a relative path, so a new version reaches both at the same time. To fetch the list now:

```sh
claude plugin marketplace update m1nu0x0
```

A new plugin is added to this marketplace. Once you have added the marketplace, it shows up the next time the list is fetched.

## Layout

```
.claude-plugin/
  marketplace.json      the marketplace m1nu0x0, one git-subdir entry per plugin
site/                   GitHub Pages site (Astro): translations in src/site.json, pages in src/pages/
  src/plugins.json      the plugin cards, copied from each repository by scripts/sync-plugins.mjs
  scripts/sync-plugins.mjs
README.en.md, README.ja.md  translations of this README
```

The marketplace is named `m1nu0x0`, not after the repository (`claude-plugins`). Claude Code refuses official names such as `claude-plugins-official`, and names that imitate them, as marketplace names, so this one stays clear of that rule. The repository name is not subject to it.

## Development

```sh
claude plugin validate .                  # the marketplace
cd site && npm ci && npm run build        # build and check the site (site/dist)
cd site && npm run dev                    # local preview
cd site && npm run sync                   # rebuild src/plugins.json from each plugin's repository
cd site && npm run sync:check             # check that src/plugins.json matches each repository
cd site && npm run og                     # draw the link-preview image for each language (needs Playwright)
```

CI validates the marketplace on Ubuntu, Windows and macOS, then adds it in an empty config folder and actually installs every plugin, so a plugin repository that moves its folder or renames its plugin is caught here. It also runs once a day.

The site uses [claude-plugin-site](https://github.com/M1nu0x0/claude-plugin-site), the same shared kit as the plugin sites. This repository is a marketplace, not a plugin, so the version in the JSON-LD comes from `version` in `marketplace.json` (`site/astro.config.mjs`). Each card's name, version, page URL and one line per language are copied from the plugin repository's `plugin.json` and `site/src/site.json` by `npm run sync` and committed as `site/src/plugins.json`. The build needs no network, and each description is edited in one place only, the plugin's repository. On every PR CI runs `sync:check`: it fails when the plugins on the cards differ from the marketplace, and warns when only a plugin's version or text has moved on. On a warning, run `npm run sync` and commit.

When the text changes, also set `updated` in `site/src/site.json` to that day; otherwise CI warns on the PR. After changing `ask`, `hero` or `ogImageText`, run `npm run og` and commit `site/public/images/og*.png` too.

### Adding a plugin

1. Lay out the plugin's repository like the others (`plugins/<name>/`, `site/src/site.json`).
2. Add a `git-subdir` entry to `plugins` in `.claude-plugin/marketplace.json`.
3. Run `cd site && npm run sync` to rebuild `src/plugins.json`, and add the plugin to `description` in `site.json` and to the table above.
4. Raise `version` in `marketplace.json` and record it in `CHANGELOG.md`.

For a new version, merge a PR that raises `version` in `marketplace.json`, then make a `vX.Y.Z` Release with the same version. When the tag is created, CI checks that it matches `version`.

## License

MIT
