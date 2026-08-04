---
layout: post
title: "Oscilloscopes on My Bench"
categories: [lab]
tags: [oscilloscope, test-equipment, bench, siglent, tektronix]
keywords: "oscilloscope, bench scope, Siglent SDS814X HD, 12-bit scope, mixed signal oscilloscope, Tektronix 475A, scope probes, bandwidth"
author: Mike Wright
abstract: "The oscilloscopes I use and why, from a 12-bit Siglent as the working instrument to a 1970s Tektronix that is a collectable rather than a recommendation."
hardware: []
interfaces: []
status: active
difficulty: beginner
toc: true

# Part of the bench series. `bench_section` puts it in the index on the
# hardware lab hub post automatically; `bench_order` sets where it appears.
bench_section: true
bench_order: 1

gear_title: "Scopes and Scope Accessories"
gear_intro: "The scope I actually reach for, plus the accessories that matter more than most buyers expect."
gear:
  - name: "Siglent SDS814X HD mixed-signal oscilloscope"
    note: "4 channels, 100 MHz, 12-bit. The working scope, and scriptable over USB and LAN"
    url: "https://www.amazon.com/dp/B0CZJSPQCB"
  - name: "TODO --- scope probes"
    note: "The probes that ship with a scope are rarely the ones you want long term"
    url: "TODO"
  - name: "TODO --- probe accessories"
    note: "Ground spring, hook clips, BNC leads"
    url: "TODO"
---

<!-- DRAFT. One section of the bench, kept deliberately narrow. The hub post
     (my-hardware-lab) links to this automatically once it is published. -->

TODO: what a scope is actually for on a hobby bench, and how often it is the
wrong instrument (a logic analyzer usually beats it for protocol work).

## The Working Scope

The Siglent SDS814X HD: 4 channels, 100 MHz, 12-bit.

TODO: why this one. The interesting question is what 12 bits buys over the usual
8-bit scope --- that is the part worth explaining rather than restating the
spec sheet.

TODO: it is scriptable over USB and LAN, which matters more than any front-panel
feature once you start sweeping a parameter. LAN is usually the nicer path.

## Probes

TODO: the accessory that punches above its weight. Ground lead length, the
difference a proper ground spring makes at speed, and why the bundled probes are
a starting point rather than an endpoint.

## The Antique

The Tektronix 475A in the
[welcome post](/2026/08/03/welcome-to-hardware-wrighter/) is a collectable, not
a recommendation. It works, it is beautiful, and nobody should buy a 1970s scope
to get work done in 2026.

## What I Would Buy

TODO: honest guidance by budget. Be explicit that a cheap modern scope beats an
expensive old one for almost everyone.

{% comment %}
CHECKLIST

  [ ] Photos
  [ ] Real product links, or omit anything I would not recommend
  [ ] Keep antiques described-not-linked
  [ ] Publish: the hub post links here automatically once this is live
{% endcomment %}
