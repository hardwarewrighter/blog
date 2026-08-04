# Authoring and publishing workflow

One repository. Four commands.

```
scripts/new-post "Title"   ->   edit markdown   ->   scripts/preview   ->   scripts/publish <slug>
```

Nothing else. No index to update, no series to register, no second repository
to push to.

## Where things live

```
_drafts/          unpublished posts (drafts branch only), never built
_posts/           published posts, YYYY-MM-DD-slug.md
_layouts/         home.html, post.html
_includes/        head, header, footer, toc, search, post-meta, toggles
assets/           main.scss, js/, images/
scripts/          new-post, preview, publish, validate
docs/             this file and planning notes (excluded from the build)
*.html            the index pages: hardware, interfaces, categories, tags,
                  archive, abstracts, search
```

## The four commands

### `scripts/new-post "USB UART Adapter Comparison"`

Run from the `drafts` branch; it refuses elsewhere. Creates
`_drafts/usb-uart-adapter-comparison.md` with the full front matter template. Drafts carry no date --- the date is assigned at publish time, so a
draft that sits for three weeks does not publish with a stale date.

### `scripts/preview`

Serves the site at <http://localhost:5907> with `--drafts --future --livereload`,
so you see unpublished and future-dated posts alongside the real ones. This is
strictly more than the public site shows.

`scripts/preview --no-drafts` shows exactly what a visitor gets.

### `scripts/publish <slug> [YYYY-MM-DD]`

Moves `_drafts/<slug>.md` on `drafts` to `_posts/<date>-<slug>.md` on `main`,
sets the date in the front matter, runs `scripts/validate`, commits, and pushes
both branches. Refuses to run with uncommitted draft edits, which would
otherwise publish a stale version. With no date it
publishes today. With a future date it schedules (see below).

`scripts/publish --list` shows what is currently in `_drafts/`.

### `scripts/validate`

Front matter lint. Runs automatically inside `publish` and again in CI. Checks
that every post has a title, date, and abstract; that the filename date matches
the front matter date; and that the time of day will not make a scheduled post
slip a day.

## How publishing actually works

A post is public when it is a file in `_posts/` with a date in the past, on
`main`. That is the entire gate. There is no `published:` flag and no separate
deploy step.

Pushing to `main` triggers `.github/workflows/pages.yml`, which builds with
Jekyll and deploys to GitHub Pages. Every index --- home, archive, categories,
tags, hardware, interfaces, abstracts, `search.json`, `feed.xml`, `sitemap.xml`
--- is regenerated from the posts collection on every build. None of them are
stored in the repository, and none are ever edited by hand.

## Scheduling

```
scripts/publish cor24-tb-overview 2026-08-10
```

This puts a post dated in the future into `_posts/` on `main`. Jekyll's default
`future: false` excludes it from every build until its date arrives. A daily
GitHub Actions cron rebuilds the site at 00:20 America/Los_Angeles, and on the
morning of the 10th that build includes it. The post goes live with no action
from you.

The one sharp edge: posts are dated `00:15:00` local, five minutes *before* the
cron. A post dated later in the day is still in the future when the cron fires
and slips to the next day. `scripts/publish` sets the time for you; `validate`
warns if a hand-edited post gets it wrong.

## Branches

Two long-lived branches:

| Branch | Contains | Purpose |
|--------|----------|---------|
| `main` | Theme, config, scripts, `_posts/`, images | What GitHub Pages deploys, and what anyone browsing this repo sees first |
| `drafts` | Everything on `main`, plus `_drafts/` | Where writing happens |

`main` carries no drafts at all, so the default view of the repository is the
published blog rather than works in progress. Day to day you live on `drafts`;
`scripts/new-post` and `scripts/preview` both expect it.

Publishing moves a post from `_drafts/` on `drafts` to `_posts/` on `main`.
`scripts/publish` does this through a temporary git worktree, so your working
copy never leaves the `drafts` branch and a running preview server is not
disturbed. It then merges `main` back into `drafts`, keeping the draft branch
current with the live theme and scripts.

Theme, layout, and script changes belong on `main`. Merge them into `drafts`
with `git merge main` --- because `main` never touches `_drafts/`, those merges
are effectively always conflict-free.

**Neither branch is private.** Every branch of a public repository is public, so
`drafts` is visible to anyone who switches branches. Drafts are unpublished, not
hidden --- the branch split is about what a casual visitor sees by default, not
about secrecy. The repo has to stay public regardless: GitHub Pages serves
private repositories only on a paid plan, and the `hardwarewrighter` org is on
Free.

For the rare thing that genuinely should not be readable yet, keep it as a local
file outside the repo until it is ready to become a draft.

## Front matter

```yaml
---
layout: post
title: "USB UART Adapter Comparison"
date: 2026-08-10 00:15:00 -0700   # set by scripts/publish
categories: [reviews]              # broad bucket -> /categories/
tags: [ft232h, cp2102, ch340]      # fine grained -> /tags/
keywords: "usb uart, serial, ftdi" # comma-separated, feeds search
author: Mike Wright
abstract: "One or two sentences."   # drives search, cards, and index pages
hardware: [ft232h, cp2102]         # -> /hardware/, and post-to-post relations
interfaces: [uart, usb]            # -> /interfaces/
status: active                     # active | complete | archived
difficulty: intermediate           # beginner | intermediate | advanced
toc: true
---
```

Only `title` and `date` are strictly required by the templates; everything else
degrades gracefully. `abstract` is required by `scripts/validate` because the
card and index pages look empty without it.

`hardware:` is what replaces the old series metadata. Posts sharing a hardware
value automatically cross-link, so a COR24-TB overview, its assembler post, and
its JTAG post collect themselves without any series bookkeeping.

## Local toolchain

Jekyll 4.4 needs Ruby 2.7 or newer. macOS ships 2.6, which is too old, so
`scripts/preview` will refuse to run until you install a current one:

```
brew install ruby
echo 'export PATH="/opt/homebrew/opt/ruby/bin:$PATH"' >> ~/.zshrc
exec zsh
bundle install
```

CI does not depend on this --- GitHub Actions installs its own Ruby 3.3. The
local toolchain is only needed for `scripts/preview`.

## What was dropped from the Software Wrighter Lab setup

- **The two-repo deploy.** `deploy.sh` built locally and pushed `_site` into a
  separate `.github.io` repo, which collided with the cron roughly two deploys
  in three. Single-repo Pages deployment removes the whole class of problem.
- **Series metadata** (`series`, `series_part`) and the `/series/` page.
  Replaced by `hardware:` collections.
- **Paper-to-code mappings** (`papers:`) and the Papers panel.
- **`validate-deploy.sh`** and the publish-repo checks in `test-site.sh`, which
  encoded the superseded architecture and reported errors on correct deploys.

## Known gaps

- `index-all.html` (alphabetical / chronological / KWIC concordance) has not
  been ported yet. It is the most distinctive index page on the old site and is
  worth bringing over.
- There is no logo, favicon, or post-separator art. The header falls back to
  text; set `logo:` in `_config.yml` once art exists.
- Search has no relevance ranking --- it returns the 20 most recent matches, not
  the 20 best. That is inherited from simple-jekyll-search and would require
  swapping in Lunr or Fuse to fix.
