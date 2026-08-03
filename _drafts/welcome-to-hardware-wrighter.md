---
layout: post
title: "Welcome to Hardware Wrighter"
date: 2026-08-03 09:00:00 -0700
categories: [meta, introduction]
tags: [about, uart, jtag, fpga, cor24, lab]
keywords: "hardware blog, embedded systems, FPGA, USB UART, JTAG, logic analyzer, lab notebook, COR24"
author: Mike Wright
abstract: "Introduction to Hardware Wrighter: a lab notebook for embedded systems, FPGA boards, test equipment, adapters, and the tools on my bench. Written by Mike Wright, a software engineer with 40+ years of experience from mainframes to modern AI, now working closer to the metal."
hardware: []
interfaces: []
status: active
difficulty: beginner
pinned: true
toc: false
---

Welcome to Hardware Wrighter---a lab notebook for the hardware side of my work: embedded systems, FPGA boards, USB adapters, test equipment, and the tools and gizmos that end up on my bench.

I'm Mike Wright. For four decades I've written software, most recently AI-assisted development in Rust and WebAssembly over at [Software Wrighter Lab](https://software-wrighter-lab.github.io/). This blog is where the work that involves a soldering iron, a logic analyzer, or an oscilloscope gets written down.

**Contents:**
- [Why a Separate Blog](#why-a-separate-blog)
- [About Me](#about-me)
- [What This Blog Covers](#what-this-blog-covers)
- [Three Kinds of Content](#three-kinds-of-content)
- [Why "Hardware Wrighter"?](#why-hardware-wrighter)
- [What's Next](#whats-next)

## Why a Separate Blog

Software Wrighter Lab is about AI coding agents, systems programming, and machine learning. Over the last year an increasing share of my time has gone somewhere else: characterizing USB UART adapters, bringing up FPGA boards, building a toolchain for the COR24 soft CPU, and rebuilding my bench.

That work has a different rhythm. A software post is often finished when the repo is pushed. A hardware post is rarely finished at all---you learn something new about a board six months after you first powered it up. So rather than stretch one blog across both, this is a second notebook with its own structure.

## About Me

I've been writing code professionally for over 35 years---an Emacs user since 1989, still going strong.

My background spans mainframes to startups:

- **IBM Data Processing Division** - MVS Dynamic Reconfiguration and Standalone Dump (SADUMP)
- **IBM T.J. Watson Research** - Advisory Programmer on MVS Batch Pipes, Automatic Restart Manager, Java Record I/O, and IMS Data Sharing
- **Forte Software / Sun Microsystems** - Senior Programmer on Forte 4GL/Conductor/Fusion, Open Enterprise Service Bus, and Glassfish
- **Startups** - Individual contributor and management roles including LogiCoy (Open ESB), Likestream (Facebook Clojure App), Guidewire (Platform), Illumio (Network Security Web UI), and Signifyd (Gradle/Docker performance tuning)

Assembler taught me what the machine is actually doing. That curiosity never really went away, and hardware is where it leads.

<!-- TODO: add a paragraph on your hardware background specifically --
     when you started with electronics, formative projects, what drew you
     back to the bench. This is the part readers will remember. -->

## What This Blog Covers

<!-- TODO: trim or reorder these to match what you actually plan to write
     first. Each bullet should be something you could publish this month. -->

### 1. Adapters and Interfaces

The unglamorous parts that decide whether a project works. USB UART bridges (FT232H, CP2102, CH340, PL2303), JTAG adapters, logic analyzers, and the differences between them that only show up under load.

### 2. The COR24-TB Board

The COR24 is a retro-inspired soft CPU. I've been building out its toolchain---assembler, loader, JTAG debugging, and language implementations---and the hardware side of that work belongs here. The software side lives at [Software Wrighter Lab](https://software-wrighter-lab.github.io/).

### 3. The Lab Itself

Bench layout, power distribution, test equipment, what I bought and regretted, and what turned out to be worth the money.

## Three Kinds of Content

Not everything here is a blog post. There are three content types, and they have different lifetimes:

| Type | Purpose | Lifetime |
|------|---------|----------|
| **Bench Notes** | Short updates, measurements, experiments | Days to weeks |
| **Articles** | Tutorials, reviews, deep dives | Months to years |
| **Hardware Reference** | Living documentation for boards, adapters, and equipment | Years |

Hardware reference pages are the part I'm most interested in. A page on the COR24-TB should get better every time I learn something, rather than being frozen the day it was published. Posts document milestones; reference pages accumulate what's actually true.

Every post is tagged with the hardware it involves and the interfaces it uses, so a page like "everything related to COR24-TB" or "everything involving JTAG" builds itself with no manual curation.

## Why "Hardware Wrighter"?

A "wright" is a craftsperson---someone who builds things. A wheelwright builds wheels. A playwright builds plays.

A **Software Wrighter** builds software. A **Hardware Wrighter** builds the things it runs on, with the same attention to craft.

## What's Next

<!-- TODO: replace with the post you actually intend to publish second.
     A dated commitment here is a good forcing function. -->

The first real post is a comparison of the USB UART adapters on my bench---FT232H, CP2102, CH340, and PL2303---measured rather than repeated from datasheets.

Thanks for reading. Let's build something interesting.

---

*Mike Wright*
*Hardware Wrighter - a division of Software Wrighter LLC*
*San Francisco Bay Area*
