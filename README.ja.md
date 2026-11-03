# claude-plugins

[![release](https://img.shields.io/github/v/release/M1nu0x0/claude-plugins)](https://github.com/M1nu0x0/claude-plugins/releases)
[![CI](https://github.com/M1nu0x0/claude-plugins/actions/workflows/ci.yml/badge.svg)](https://github.com/M1nu0x0/claude-plugins/actions/workflows/ci.yml)
[![license](https://img.shields.io/github/license/M1nu0x0/claude-plugins)](LICENSE)

[한국어](README.md) | [English](README.en.md) | **日本語**

M1nu0x0 の Claude Code プラグインをまとめたマーケットプレイスです。一度追加すれば、下のプラグインをどれも名前でインストールできます。

各プラグインはそれぞれのリポジトリで作り、リリースしています。このリポジトリにプラグインのコードはなく、マーケットプレイスの各項目がプラグインのリポジトリの `plugins/<名前>` フォルダを指します。そのため、ここからインストールしても、個別のマーケットプレイスからインストールしたのと同じファイルが入ります。

**[Website](https://m1nu0x0.github.io/claude-plugins/ja/) · [Releases](https://github.com/M1nu0x0/claude-plugins/releases) · [Changelog](CHANGELOG.md)**

## プラグイン

| プラグイン | インストール ID | 内容 |
| --- | --- | --- |
| [TurnDuration for Claude](https://m1nu0x0.github.io/claude-turn-duration/ja/)（[リポジトリ](https://github.com/M1nu0x0/claude-turn-duration)） | `turn-duration@m1nu0x0` | Claude Desktop の回答の下に、応答時間と終了時刻を表示します |
| [SafeZsh for Claude](https://m1nu0x0.github.io/claude-safe-zsh/ja/)（[リポジトリ](https://github.com/M1nu0x0/claude-safe-zsh)） | `safe-zsh@m1nu0x0` | Claude が書いた bash 形式のコマンドを、Bash ツールの zsh に bash と同じように読ませます |
| [UTF-8 Guard for Claude](https://m1nu0x0.github.io/claude-utf8-guard/ja/)（[リポジトリ](https://github.com/M1nu0x0/claude-utf8-guard)） | `utf8-guard@m1nu0x0` | ツール呼び出しの日本語、韓国語、中国語が `\uXXXX` エスケープで別の文字に化けるのを防ぎます |

## インストール

Claude Code のターミナルのプロンプトで、マーケットプレイスを一度だけ追加します。

```
/plugin marketplace add M1nu0x0/claude-plugins
```

あとは使いたいプラグインをインストール ID でインストールし、scope は user を選びます。

```
/plugin install utf8-guard@m1nu0x0
```

シェルからは次のとおりです。

```sh
claude plugin marketplace add M1nu0x0/claude-plugins
claude plugin install utf8-guard@m1nu0x0
```

Claude Desktop では、プロンプト横の `+` → Plugins → Add marketplace に `M1nu0x0/claude-plugins` を入力し、使いたいプラグインを追加します。どのプラグインもインストール後の新しいセッションから適用されます。プラグインごとに必要なもの（Node.js など）は、各プラグインの README にあります。

### すでに個別のマーケットプレイスからインストールしている場合

そのまま使っても構いません。移すときは、先にアンインストールしてからここでインストールします。

```sh
claude plugin uninstall utf8-guard@claude-utf8-guard
claude plugin install utf8-guard@m1nu0x0
```

両方を残さないでください。Claude Code は `utf8-guard@claude-utf8-guard` と `utf8-guard@m1nu0x0` を別のプラグインとして扱い、両方のフックを実行します。

## 更新

マーケットプレイスの項目は `ref` を固定せず、各プラグインのリポジトリの既定ブランチを追います。個別のマーケットプレイスも同じブランチを相対パスで指すので、新しいバージョンは両方に同時に届きます。一覧をすぐに取り直すには次を実行します。

```sh
claude plugin marketplace update m1nu0x0
```

新しいプラグインを作ったら、このマーケットプレイスに追加します。マーケットプレイスを登録してあれば、次に一覧を取り直したときに表示されます。

## 構成

```
.claude-plugin/
  marketplace.json      マーケットプレイス m1nu0x0、プラグインごとに git-subdir の項目がひとつ
site/                   GitHub Pages サイト（Astro）: 翻訳は src/site.json、ページは src/pages/
  src/plugins.json      プラグインのカード。scripts/sync-plugins.mjs が各リポジトリからコピー
  scripts/sync-plugins.mjs
README.en.md, README.ja.md  この README の翻訳
```

マーケットプレイスの名前はリポジトリ名（`claude-plugins`）ではなく `m1nu0x0` です。Claude Code は `claude-plugins-official` のような公式の名前と、それをまねた名前をマーケットプレイス名として受け付けないため、その規則に当たりうる名前を避けました。リポジトリ名はこの規則と関係ありません。

## 開発

```sh
claude plugin validate .                  # マーケットプレイス
cd site && npm ci && npm run build        # サイトのビルドと検査（site/dist）
cd site && npm run dev                    # ローカルプレビュー
cd site && npm run sync                   # 各プラグインのリポジトリから src/plugins.json を作り直す
cd site && npm run sync:check             # src/plugins.json が各リポジトリと同じか確認
cd site && npm run og                     # 言語ごとのリンクプレビュー画像を生成（Playwright が必要）
```

CI は Ubuntu、Windows、macOS でマーケットプレイスを検証し、空の設定フォルダにマーケットプレイスを追加してから、すべてのプラグインを実際にインストールします。プラグインのリポジトリがフォルダを移したり名前を変えたりすると、ここで検出されます。毎日 1 回も実行します。

サイトは、各プラグインのサイトと同じ共通キット [claude-plugin-site](https://github.com/M1nu0x0/claude-plugin-site) で作っています。このリポジトリはプラグインではなくマーケットプレイスなので、JSON-LD のバージョンは `marketplace.json` の `version` から読みます（`site/astro.config.mjs`）。カードの名前、バージョン、ページの URL、言語ごとの一行の説明は、各プラグインのリポジトリの `plugin.json` と `site/src/site.json` から `npm run sync` でコピーし、`site/src/plugins.json` としてコミットします。ビルドはネットワークなしで動き、説明はプラグインのリポジトリ一か所でだけ直します。CI は PR ごとに `sync:check` を実行し、カードのプラグイン一覧がマーケットプレイスと違えば失敗し、プラグイン側のバージョンや文言だけが変わっていれば警告します。警告が出たら `npm run sync` を実行してコミットします。

内容を変えたら、`site/src/site.json` の `updated` もその日の日付にします。変えないと PR で CI が警告します。`ask`、`hero`、`ogImageText` を変えたら、`npm run og` で `site/public/images/og*.png` も作り直してコミットします。

### プラグインの追加

1. プラグインのリポジトリをほかと同じ構成（`plugins/<名前>/`、`site/src/site.json`）にします。
2. `.claude-plugin/marketplace.json` の `plugins` に `git-subdir` の項目を追加します。`url` は `https://github.com/M1nu0x0/<リポジトリ>.git` のように完全な URL で書きます。`M1nu0x0/<リポジトリ>` の短縮形は Claude Code が SSH でクローンするため、GitHub の SSH キーがない人はインストールできません。
3. `cd site && npm run sync` で `src/plugins.json` を作り直し、`site.json` の `description` と上の表にプラグインを加えます。
4. `marketplace.json` の `version` を上げ、`CHANGELOG.md` に書きます。

新しいバージョンは、`marketplace.json` の `version` を上げる PR をマージしてから、同じバージョンで `vX.Y.Z` の Release を作ります。タグができると、CI がタグと `version` が同じか確認します。

## License

MIT
