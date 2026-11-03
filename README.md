# claude-plugins

[![release](https://img.shields.io/github/v/release/M1nu0x0/claude-plugins)](https://github.com/M1nu0x0/claude-plugins/releases)
[![CI](https://github.com/M1nu0x0/claude-plugins/actions/workflows/ci.yml/badge.svg)](https://github.com/M1nu0x0/claude-plugins/actions/workflows/ci.yml)
[![license](https://img.shields.io/github/license/M1nu0x0/claude-plugins)](LICENSE)

**한국어** | [English](README.en.md) | [日本語](README.ja.md)

M1nu0x0이 만든 Claude Code 플러그인을 모은 마켓플레이스입니다. 한 번 추가하면 아래 플러그인을 모두 이름으로 설치할 수 있습니다.

각 플러그인은 자기 레포에서 따로 만들고 배포합니다. 이 레포에는 플러그인 코드가 없고, 마켓플레이스의 각 항목이 플러그인 레포의 `plugins/<이름>` 폴더를 가리킵니다. 그래서 여기서 설치해도 개별 마켓플레이스에서 설치한 것과 같은 파일을 받습니다.

**[Website](https://m1nu0x0.github.io/claude-plugins/ko/) · [Releases](https://github.com/M1nu0x0/claude-plugins/releases) · [Changelog](CHANGELOG.md)**

## 플러그인

| 플러그인 | 설치 ID | 하는 일 |
| --- | --- | --- |
| [TurnDuration for Claude](https://m1nu0x0.github.io/claude-turn-duration/ko/) ([레포](https://github.com/M1nu0x0/claude-turn-duration)) | `turn-duration@m1nu0x0` | Claude Desktop 답변 아래에 응답 시간과 끝난 시각을 표시합니다 |
| [SafeZsh for Claude](https://m1nu0x0.github.io/claude-safe-zsh/ko/) ([레포](https://github.com/M1nu0x0/claude-safe-zsh)) | `safe-zsh@m1nu0x0` | Bash 도구의 zsh가 Claude가 쓴 bash 명령을 bash처럼 읽게 합니다 |
| [UTF-8 Guard for Claude](https://m1nu0x0.github.io/claude-utf8-guard/ko/) ([레포](https://github.com/M1nu0x0/claude-utf8-guard)) | `utf8-guard@m1nu0x0` | 도구 호출의 한글, 일본어, 중국어가 `\uXXXX` 이스케이프 때문에 엉뚱한 글자로 바뀌는 것을 막습니다 |

## 설치

Claude Code 터미널 프롬프트에서 마켓플레이스를 한 번 추가합니다.

```
/plugin marketplace add M1nu0x0/claude-plugins
```

그다음 원하는 플러그인을 설치 ID로 설치하고 scope는 user를 고릅니다.

```
/plugin install utf8-guard@m1nu0x0
```

셸에서는 이렇게 합니다.

```sh
claude plugin marketplace add M1nu0x0/claude-plugins
claude plugin install utf8-guard@m1nu0x0
```

Claude Desktop에서는 프롬프트 옆 `+` → Plugins → Add marketplace에 `M1nu0x0/claude-plugins`를 넣고 원하는 플러그인을 추가합니다. 각 플러그인은 설치한 뒤 새 세션부터 적용됩니다. 플러그인마다 필요한 것(Node.js 등)은 각 플러그인의 README에 있습니다.

### 이미 개별 마켓플레이스에서 설치했다면

그대로 써도 됩니다. 옮기려면 먼저 지운 뒤 여기서 설치합니다.

```sh
claude plugin uninstall utf8-guard@claude-utf8-guard
claude plugin install utf8-guard@m1nu0x0
```

둘 다 남겨 두지는 마세요. Claude Code는 `utf8-guard@claude-utf8-guard`와 `utf8-guard@m1nu0x0`을 서로 다른 플러그인으로 보고, 두 플러그인의 훅을 모두 실행합니다.

## 업데이트

마켓플레이스의 항목은 `ref`를 고정하지 않고 각 플러그인 레포의 기본 브랜치를 따라갑니다. 개별 마켓플레이스도 같은 브랜치를 상대경로로 가리키므로, 새 버전은 두 곳에 같은 때 반영됩니다. 목록을 바로 새로 받으려면 이렇게 실행합니다.

```sh
claude plugin marketplace update m1nu0x0
```

새 플러그인을 만들면 이 마켓플레이스에 추가합니다. 마켓플레이스를 등록해 두었다면 목록을 다음에 새로 받을 때 보입니다.

## 구성

```
.claude-plugin/
  marketplace.json      마켓플레이스 m1nu0x0, 플러그인마다 git-subdir 항목 하나
site/                   GitHub Pages 사이트(Astro): src/site.json 번역, src/pages/ 페이지
  src/plugins.json      플러그인 카드. scripts/sync-plugins.mjs가 각 레포에서 복사
  scripts/sync-plugins.mjs
README.en.md, README.ja.md  README 번역본
```

마켓플레이스 이름은 레포 이름(`claude-plugins`)이 아니라 `m1nu0x0`입니다. Claude Code는 `claude-plugins-official` 같은 공식 이름과 그것을 흉내 낸 이름을 마켓플레이스 이름으로 받지 않으므로, 그 규칙에 걸릴 수 있는 이름을 피했습니다. 레포 이름은 이 규칙과 관계없습니다.

## 개발

```sh
claude plugin validate .                  # 마켓플레이스
cd site && npm ci && npm run build        # 사이트 빌드와 검사(site/dist)
cd site && npm run dev                    # 로컬 미리보기
cd site && npm run sync                   # 각 플러그인 레포에서 src/plugins.json을 다시 만듦
cd site && npm run sync:check             # src/plugins.json이 각 레포와 같은지 확인
cd site && npm run og                     # 언어별 링크 미리보기 이미지 생성(Playwright 필요)
```

CI는 Ubuntu, Windows, macOS에서 마켓플레이스를 검증하고, 빈 설정 폴더에서 마켓플레이스를 추가한 뒤 모든 플러그인을 실제로 설치합니다. 플러그인 레포가 폴더를 옮기거나 이름을 바꾸면 여기서 잡힙니다. 매일 한 번씩도 돕니다.

사이트는 플러그인 사이트들과 같은 공용 키트 [claude-plugin-site](https://github.com/M1nu0x0/claude-plugin-site)로 만듭니다. 이 레포는 플러그인이 아니라 마켓플레이스라서, JSON-LD의 버전은 `marketplace.json`의 `version`에서 읽습니다(`site/astro.config.mjs`). 플러그인 카드의 이름, 버전, 페이지 주소, 언어별 한 줄 설명은 각 플러그인 레포의 `plugin.json`과 `site/src/site.json`에서 `npm run sync`로 복사해 `site/src/plugins.json`에 커밋합니다. 빌드는 네트워크 없이 돌고, 설명은 플러그인 레포 한 곳에서만 고칩니다. CI는 PR마다 `sync:check`를 돌려 마켓플레이스와 카드의 플러그인 목록이 다르면 실패하고, 플러그인 쪽 버전이나 문구만 바뀌었으면 경고합니다. 경고가 나오면 `npm run sync`를 돌려 커밋합니다.

내용이 바뀌면 `site/src/site.json`의 `updated`도 그날 날짜로 바꿉니다. 바꾸지 않으면 PR에서 CI가 경고합니다. `ask`, `hero`, `ogImageText`를 바꾸면 `npm run og`로 `site/public/images/og*.png`도 다시 만들어 커밋합니다.

### 플러그인 추가

1. 플러그인 레포를 다른 플러그인과 같은 구성(`plugins/<이름>/`, `site/src/site.json`)으로 만듭니다.
2. `.claude-plugin/marketplace.json`의 `plugins`에 `git-subdir` 항목을 추가합니다. `url`은 `https://github.com/M1nu0x0/<레포>.git`처럼 전체 주소로 씁니다. `M1nu0x0/<레포>` 축약형은 Claude Code가 SSH로 클론해서, GitHub SSH 키가 없는 사용자는 설치하지 못합니다.
3. `cd site && npm run sync`로 `src/plugins.json`을 다시 만들고, `site.json`의 `description`과 위 표에 플러그인을 넣습니다.
4. `marketplace.json`의 `version`을 올리고 `CHANGELOG.md`에 적습니다.

새 버전은 `marketplace.json`의 `version`을 올리는 PR을 병합한 뒤, 같은 버전으로 `vX.Y.Z` Release를 만듭니다. 태그가 생기면 CI가 태그와 `version`이 같은지 확인합니다.

## License

MIT
