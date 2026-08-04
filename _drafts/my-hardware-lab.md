---
layout: post
title: "My Hardware Lab"
categories: [lab]
tags: [bench, tools, test-equipment, lab]
keywords: "hardware lab, workbench, bench setup, electronics lab, test equipment, tools, home lab, workshop"
author: Mike Wright
abstract: "An overview of my bench and an index to the individual sections: scopes, meters, power supplies, soldering, hand tools, storage, prototyping, and 3D printing."
hardware: []
interfaces: []
status: active
difficulty: beginner
toc: true
---

<!-- DRAFT. This is the hub post. It deliberately carries NO gear: list --- tool
     links live in the section posts, and the index below builds itself from any
     post with bench_section: true in its front matter. -->

TODO: opening. What the bench is for, how it grew, and the honest framing ---
this is a working bench, not a showcase.

<!--more-->

## The Bench Itself

TODO: the surface, lighting, power distribution, layout. Photos.

TODO: what I would do differently. Bench posts are more useful when they say
which decisions did not work out.

## The Sections

The bench is covered one area at a time, so each post can go into proper depth
rather than listing everything at once. Tool links live in those, not here.

{% assign sections = site.posts | where: "bench_section", true | sort: "bench_order" %}
{% if sections.size > 0 %}
<ul class="post-list bench-index">
  {% for s in sections %}
  <li>
    <a class="post-link" href="{{ s.url | relative_url }}">{{ s.title | escape }}</a>
    {% if s.abstract %}<span class="bench-index-abstract">{{ s.abstract }}</span>{% endif %}
  </li>
  {% endfor %}
</ul>
{% else %}
<p><em>Section posts are still drafts. This index fills itself in as each one is
published.</em></p>
{% endif %}

## Antiques Are Not Recommendations

Some instruments here are collectables rather than tools I would tell anyone to
buy. The Tektronix 475A, the Fluke 8022A, the 1977 soldering iron, and the wire
wrap tools all still work and all still get used, but none of them is a sensible
purchase in 2026.

The rule across every section: **anything old gets described, anything current
gets linked.** Mixing the two is the easiest way to hand a reader bad advice.

## Safety

TODO: ESD practice, fume extraction, eye protection, mains work. Worth covering
once here rather than scattering footnotes across eight posts.

## What I Would Buy First

TODO: the useful part for someone starting out. Ordered by what earns its place
soonest, not by what is most impressive, and explicit about what can wait. Most
of this bench accumulated over years and none of it needed to arrive at once.

TODO: write this last, once the section posts exist, so it can link into them.
It is likely the most-read section of the most-read post on the site.

{% comment %}
CHECKLIST

  [ ] Photos of the bench overall
  [ ] Write "What I Would Buy First" last, linking into the section posts
  [ ] Keep this post free of gear: links --- they belong in the sections, or the
      two lists will drift out of sync
  [ ] Publish section posts first, or alongside; the index above is empty until
      they are live
  [ ] Revisit whenever the bench changes --- a living page, not a one-time post

STRUCTURE

  Hub and spoke. Spokes declare `bench_section: true` and `bench_order: N`, and
  the index above picks them up with no manual editing. To add a section, create
  a post with those two fields and it appears here.

  Other posts should cross-reference the specific relevant section rather than
  this hub --- the UART post wants the scopes and meters posts, not a general
  pointer at the lab.
{% endcomment %}
