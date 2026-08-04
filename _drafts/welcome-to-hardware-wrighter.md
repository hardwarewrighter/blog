---
layout: post
title: "Welcome to Hardware Wrighter"
date: 2026-08-03 09:00:00 -0700
categories: [meta, introduction]
tags: [about, uart, jtag, fpga, cor24, arduino, esp32, raspberry-pi, lab]
keywords: "hardware blog, embedded systems, FPGA, USB UART, JTAG, logic analyzer, lab notebook, COR24, Arduino, ESP32, Raspberry Pi, IBM Customer Engineer, IBM 1130, IBM 1800, IBM 5100, IBM 5110, System/3, System/32, System/34, System/7, Series/1"
author: Mike Wright
abstract: "Introduction to Hardware Wrighter: a lab notebook for embedded systems, microcontroller projects, FPGA boards, test equipment, and the tools on my bench. Written by Mike Wright, who started as a self-taught electronics hobbyist and IBM Customer Engineer, spent four decades in software, and came back to the bench."
hardware: []
interfaces: []
status: active
difficulty: beginner
pinned: true
toc: false
---

<figure class="photo-aside-left photo-aside-wide">
  <video class="photo-anim" muted loop playsinline preload="metadata"
         poster="/images/posts/welcome/tektronix-475a.webp"
         data-lightbox-full="/images/posts/welcome/tektronix-475a-animated.webm"
         aria-label="Tektronix 475A oscilloscope, traces sweeping across the screen">
    <source src="/images/posts/welcome/tektronix-475a-animated.webm" type="video/webm">
    <img src="/images/posts/welcome/tektronix-475a.webp"
         alt="Tektronix 475A oscilloscope displaying two traces">
  </video>
  <figcaption>Tektronix 475A.</figcaption>
</figure>

<!-- PLACEHOLDER: this is the eBay listing photo for the scope, not your own.
     Replace with your own shot once you photograph it --- higher resolution
     will also fix the smeared panel lettering, which is a JPEG artifact at
     this size rather than anything wrong with the image. -->

Welcome to Hardware Wrighter---a lab notebook for the hardware side of my work: embedded systems, FPGA boards, USB adapters, test equipment, and the tools and gizmos that end up on my bench.

I'm Mike Wright. I started with hardware, spent four decades writing software, and have come back around to the bench. Software Wrighter Lab covers the software side; this blog is where the work that involves a soldering iron, a logic analyzer, or an oscilloscope gets written down.

**Contents:**
- [Why a Separate Blog](#why-a-separate-blog)
- [About Me](#about-me)
- [What This Blog Covers](#what-this-blog-covers)
- [Three Kinds of Content](#three-kinds-of-content)
- [Why "Hardware Wrighter"?](#why-hardware-wrighter)
- [What's Next](#whats-next)

## Why a Separate Blog

Software Wrighter Lab is about AI coding agents, systems programming, and machine learning. Since retiring from professional software development, a growing share of my time has gone somewhere else: microcontroller projects, characterizing USB UART adapters, bringing up FPGA boards, building a toolchain for the COR24 soft CPU, and rebuilding my bench.

That work has a different rhythm. A software post is often finished when the repo is pushed. A hardware post is rarely finished at all---you learn something new about a board six months after you first powered it up. So rather than stretch one blog across both, this is a second notebook with its own structure.

## About Me

I came to computers through electronics, not the other way around.

- **Electronics hobbyist** - self-taught, long before any of it was a job
- **IBM Customer Engineer** - servicing computers built between the 1960s and the 1980s: scopes, wire wrap, soldering, logic probes, and a fair amount of mechanical work
- **IBM Data Processing Division** - MVS Dynamic Reconfiguration and Standalone Dump (SADUMP)
- **IBM T.J. Watson Research** - Advisory Programmer on MVS Batch Pipes, Automatic Restart Manager, Java Record I/O, and IMS Data Sharing
- **Forte Software / Sun Microsystems** - Senior Programmer on Forte 4GL/Conductor/Fusion, Open Enterprise Service Bus, and Glassfish
- **Startups** - Individual contributor and management roles including LogiCoy (Open ESB), Likestream (Facebook Clojure App), Guidewire (Platform), Illumio (Network Security Web UI), and Signifyd (Gradle/Docker performance tuning)


<figure class="photo-aside">
  <img src="/images/posts/welcome/ibm-logic-probe.webp"
       alt="IBM General Logic Probe with technology, latch, and gate reference switches"
       data-lightbox loading="lazy" width="376" height="900">
  <figcaption>IBM General Logic Probe. The three switches set what counts as a
  valid level: technology, latch, and gate reference.</figcaption>
</figure>

That CE work was hardware all the way down---a scope and a print set rather
than a debugger, and as often a mechanical fault as an electrical one. You meet
a machine at its worst: intermittent, mis-documented, and someone is waiting on
it.

The machines I worked on read like a tour of IBM's small-systems era: the
System/3, System/32, and System/34 on the business side, and the System/7 and
Series/1 on the sensor and real-time side. Each had its own personality, its
own failure modes, and its own set of things the manual did not mention.

My favorites were the **IBM 1130** and **1800**, and the **IBM 5100** and
**5110**---for opposite reasons.

The 1130 and 1800 were fun hardware. You could enter a program directly on the
front panel toggle switches. Memory was core, so it was nonvolatile: cut the
power mid-problem and everything was still sitting there when you came back.
IBM shipped complete schematics, and nothing was sealed---you could put a probe
on any transistor in the machine and watch what it was actually doing.

I liked the 1130 enough to
[build an emulator for it](https://software-wrighter-lab.github.io/2026/02/26/ibm-1130-system-emulator/)
decades later, console panel and all. You can
[run it in a browser](https://sw-comp-history.github.io/ibm-1130-rs/) if you
want to see what the front panel actually looked like.

The 5100 and 5110 were the other kind of fun. They ran APL, which was my first
programming language, and they were a pleasure to write applications for. I
have [written elsewhere about that first APL
program](https://software-wrighter-lab.github.io/2026/01/29/tbt-apl-horse-race/).

One was fun to take apart. The other was fun to write for. I have been chasing
both ever since.

<!-- Still worth adding: one specific repair or bring-up story. A single
     concrete anecdote will do more for this post than the machine list. -->

Working on assembler later at IBM was the same instinct pointed at software.

<figure class="photo-aside-left">
  <img src="/images/posts/welcome/ibm-analog-multimeter.webp"
       alt="IBM analog multimeter" data-lightbox loading="lazy">
  <figcaption>IBM analog multimeter. Still the fastest way to see a value
  moving rather than a value.</figcaption>
</figure>

Some of that era is still on my bench: an IBM analog multimeter, a Fluke DMM,
wire wrap tools, and a soldering iron, all of which have outlasted every
computer I used them on. I also still have an IBM unit record plugboard---a
program you could hold, wired by hand, from the era when "patch" was literal.

<figure class="photo-aside">
  <img src="/images/posts/welcome/fluke-8022a.webp"
       alt="Fluke 8022A/AF ruggedized digital multimeter with test leads"
       data-lightbox loading="lazy">
  <figcaption>Fluke 8022A/AF, the ruggedized version, from about 1978. Still
  the one I reach for when I need a number rather than a trend.</figcaption>
</figure>

{% comment %}
  Still to shoot: the IBM unit record plugboard. It wants a full-width figure
  rather than a grid cell --- the wiring is the whole point and does not
  survive being shown small. Delete the surrounding Liquid comment tags once
  the file exists.

  Sizing for all of these: long edge ~1600px as .webp stays under ~200KB.
    magick IMG_1234.jpg -resize 1600x1600\> -quality 82 \
      images/posts/welcome/ibm-unit-record-plugboard.webp

<figure class="photo-full">
  <img src="/images/posts/welcome/ibm-unit-record-plugboard.webp"
       alt="IBM unit record plugboard, wired with patch cords"
       data-lightbox loading="lazy">
  <figcaption>An IBM unit record plugboard. Each wire is one step of the
  program.</figcaption>
</figure>
{% endcomment %}

<!-- PROVENANCE: confirm the logic probe image above is yours to publish. If it
     is a product or archive photo rather than one you took, it needs a license
     check and probably an attribution line in the caption. Delete this note
     once confirmed.

     Original note, still relevant for any other sourced image: Wikimedia
     Commons and the Computer History Museum both have period instruments, but
     terms vary per image --- some are public
     domain, some are CC-BY and need attribution in the caption, and some are
     all-rights-reserved. The license is listed on each image's own page. -->


After I retired from professional software development I went back to building
things: Arduino, ESP32, Raspberry Pi, and the sensors and protocols that hang
off them. A dev board that costs a few dollars today outruns anything I could
buy in the 1970s, but the loop is identical---wire it up, get it wrong,
measure, understand why.

## What This Blog Covers

<!-- TODO: trim or reorder these to match what you actually plan to write
     first. Each bullet should be something you could publish this month. -->

### 1. Adapters and Interfaces

<figure class="photo-aside-left">
  <img src="/images/posts/welcome/soldering-iron.webp"
       alt="Soldering iron" data-lightbox loading="lazy">
  <figcaption>The soldering iron does not care which decade it is.</figcaption>
</figure>

The unglamorous parts that decide whether a project works. USB UART bridges (FT232H, CP2102, CH340, PL2303), JTAG adapters, logic analyzers, and the differences between them that only show up under load.

### 2. Microcontroller Projects

Arduino, ESP32, and Raspberry Pi, and the sensors and protocols hanging off
them. What actually worked, what drew more current than the datasheet implied,
and which cheap module was worth the money.

### 3. The COR24-TB Board

The COR24 is a new RISC instruction set architecture from [MakerLisp](https://makerlisp.com), implemented as a soft CPU on FPGA. I've been building out its toolchain---assembler, loader, JTAG debugging, and language implementations---and the hardware side of that work belongs here. The software side lives at Software Wrighter Lab, starting with [getting Rust onto an unsupported ISA](https://software-wrighter-lab.github.io/2026/03/13/rabbit-hole-rust-to-unsupported-isa/).

The languages I target it with---Pascal, Scheme, Fortran---lean retro. The ISA
does not.

### 4. The Lab Itself

<figure class="photo-aside">
  <img src="/images/posts/welcome/wire-wrap-tools.webp"
       alt="Wire wrap tool" data-lightbox loading="lazy">
  <figcaption>Wire wrap tool. Solderless, repairable, and still the right
  answer for some prototypes.</figcaption>
</figure>

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
