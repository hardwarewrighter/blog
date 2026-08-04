---
layout: post
title: "Multimeters on My Bench"
categories: [lab]
tags: [multimeter, dmm, test-equipment, bench, fluke]
keywords: "multimeter, bench multimeter, handheld DMM, Labloot LB1041, Fluke 8022A, 55000 counts, continuity, SCPI, scriptable instrument"
author: Mike Wright
abstract: "Bench and handheld multimeters: what a bench meter does that a handheld cannot, why scriptability matters more than counts, and the 1978 Fluke that still works."
hardware: []
interfaces: []
status: active
difficulty: beginner
toc: true

# Part of the bench series. `bench_section` puts it in the index on the
# hardware lab hub post automatically; `bench_order` sets where it appears.
bench_section: true
bench_order: 2

gear_title: "Meters"
gear_intro: "The meters in regular use. The bench meter earns its place through automation more than resolution."
gear:
  - name: "Labloot LB1041 bench digital multimeter"
    note: "55,000 counts, scriptable over USB"
    url: "https://www.amazon.com/dp/B0C5CSX7RJ"
  - name: "TODO --- handheld multimeter"
    note: "A current handheld I would actually recommend, standing in for the 1978 Fluke"
    url: "TODO"
  - name: "TODO --- test leads and probes"
    url: "TODO"
---

<!-- DRAFT. One section of the bench, kept deliberately narrow. The hub post
     (my-hardware-lab) links to this automatically once it is published. -->

TODO: the meter is the instrument you reach for most and think about least.

## Bench vs Handheld

TODO: what a bench meter gives you beyond resolution --- it stays put, it stays
powered, it has a proper display, and it can be driven by a script.

## The Bench Meter

Labloot LB1041, 55,000 counts.

TODO: confirm the remote interface before writing about it. "Scriptable over
USB" covers everything from a documented SCPI instrument on a CDC port to a
vendor application with an undocumented protocol, and which one it is decides
how much of this is worth saying.

## Why Scriptable Matters

TODO: a measurement taken by hand once is an anecdote; one a script runs thirty
times across a swept parameter is data. See the
[UART debugging](/2026/08/03/debugging-the-cor24-tb-serial-loader-at-921600-baud/)
for the case that motivated it.

## The Antique

The Fluke 8022A/AF from about 1978 still works and still gets used. It is not a
purchase recommendation --- see the
[welcome post](/2026/08/03/welcome-to-hardware-wrighter/).

## What I Would Buy

TODO: for most people one decent handheld is enough. Say what would change that.

{% comment %}
CHECKLIST

  [ ] Photos
  [ ] Real product links, or omit anything I would not recommend
  [ ] Keep antiques described-not-linked
  [ ] Publish: the hub post links here automatically once this is live
{% endcomment %}
