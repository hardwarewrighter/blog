---
layout: page
title: About
nav_title: About
permalink: /about/
---

# Hardware Wrighter

A lab notebook for embedded systems, FPGA boards, USB adapters, test equipment,
and the tools that end up on my bench. The software side of my work lives at
[Software Wrighter Lab](https://software-wrighter-lab.github.io/).

Comments are not enabled here. Corrections and questions are welcome via GitHub
issues.

{% include toc.html %}

<div class="resource-box" markdown="1">

| Connect | Link |
|---------|------|
| **GitHub** | [hardwarewrighter](https://github.com/hardwarewrighter) |
| **Software blog** | [Software Wrighter Lab](https://software-wrighter-lab.github.io/) |

</div>

## About the Author

<div class="author-section" markdown="1">

<img src="/images/mike-wright-avatar.webp" class="about-avatar no-invert" alt="Mike Wright">

Mike Wright is a software engineer with over four decades of experience, from
mainframe operating systems at IBM to modern AI-assisted development in Rust.
Hardware Wrighter is where the work that involves a soldering iron, a logic
analyzer, or an oscilloscope gets written down.

</div>

<style>
.author-section {
  display: flow-root; /* Contains the avatar float locally so it does not leak
                         into the next section. */
}

.about-avatar {
  float: left;
  width: 150px;
  margin: 0 1.5rem 1rem 0;
}

@media (max-width: 480px) {
  .about-avatar {
    float: none;
    display: block;
    margin: 0 auto 1rem auto;
  }
}
</style>

## How This Site Is Organized

Three kinds of content, with different lifetimes:

- **Bench Notes** --- short measurements and experiments. Days to weeks.
- **Articles** --- tutorials, reviews, and deep dives. Months to years.
- **Hardware Reference** --- living documentation for boards, adapters, and
  equipment. Years, and continuously revised.

Every post is tagged with the hardware it involves and the interfaces it uses,
so pages like [Hardware](/hardware/) and [Interfaces](/interfaces/) build
themselves. Nothing on this site is a hand-maintained index.

## Navigation

| Page | What it is |
|------|-----------|
| [Home](/) | Recent posts, newest first |
| [Abstracts](/abstracts/) | Every post as a card, sortable and filterable |
| [Hardware](/hardware/) | Posts grouped by board, adapter, or instrument |
| [Interfaces](/interfaces/) | Posts grouped by protocol --- UART, SPI, JTAG |
| [Categories](/categories/) | Broad subject buckets |
| [Tags](/tags/) | Fine-grained topics |
| [Archive](/archive/) | Everything by year and month |
| [Search](/search/) | Full-text search across all posts |

## Colophon

Built with [Jekyll](https://jekyllrb.com/), deployed to GitHub Pages by GitHub
Actions from [hardwarewrighter/blog](https://github.com/hardwarewrighter/blog).
Search is client-side, with no third-party service and no tracking. There are no
analytics on this site.
