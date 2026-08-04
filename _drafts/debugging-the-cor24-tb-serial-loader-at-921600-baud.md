---
layout: post
title: "Debugging the COR24-TB Serial Loader at 921600 Baud"
categories: [usb, boards]
tags: [uart, cts-rts, flow-control, ft232h, ft232rl, ft232r, ch340, cp2102, cor24-tb, "921600"]
keywords: "USB UART, FT232H, FT232RL, FT232R, FT232U, CH340, CH341, CP2102, CP2104, CTS, RTS, hardware flow control, 921600 baud, COR24-TB, serial loader, oscilloscope, logic analyzer"
author: Mike Wright
abstract: "The COR24-TB dev board is locked to 921600 baud with hardware flow control, and most USB UART adapters cannot keep up. Working through why: delays as a workaround, CTS/RTS continuity checks with a DMM, scope captures of the handshake, and a comparison of every adapter on my bench."
hardware: [cor24-tb, ft232h, ft232rl, ft232r, ch340, cp2102]
interfaces: [uart, usb]
status: active
difficulty: intermediate
toc: true

# Rendered as the "Parts and Tools" section at the foot of the post, with the
# disclosure from _config.yml. Set affiliate: false on anything not affiliate
# linked. TODO: fill in real URLs once the affiliate accounts are set up.
gear_intro: "Everything used in this post. One adapter meets the COR24-TB's particular demands; the others are ordinary, useful parts that are simply aimed at less demanding serial work."
gear:
  - name: "DKARDU FT232H (CJMCU-FT232H) USB to JTAG/UART/FIFO/SPI/I2C module"
    note: "FT232H. The only adapter that held 921600 baud with RTS/CTS through a full load"
    url: "https://www.amazon.com/dp/B09PH38ZB4"
  - name: "FT232RL USB to TTL adapter, 3-pack (genuine FTDI)"
    note: "FT232RL. Intermittent at 921600 with flow control; fine for ordinary serial work"
    url: "https://www.amazon.com/dp/B0DG4RQSKC"
  - name: "JESSINIE CH343P USB to serial module, 2-pack, USB-C"
    note: "CH343P, the newer CH340 successor rated to 6 Mbps. TODO confirm which of my CH3xx results this board produced"
    url: "https://www.amazon.com/dp/B0DLGN14T6"
  - name: "Waveshare USB to UART/I2C/SPI/JTAG converter"
    note: "WCH CH347, run in mode 3. TODO verify the chipset marking and what that mode exposes"
    url: "https://www.amazon.com/dp/B0CGLRHDRD"
  - name: "TODO --- FT232U board"
    note: "The part the COR24-TB docs recommend; ordered, not yet tested"
    url: "TODO"
  - name: "DSD TECH SH-U09B3 USB-C to TTL serial adapter"
    note: "CP2102N. TODO test"
    url: "https://www.amazon.com/dp/B09KXT6W46"
  - name: "DSD TECH SH-U09C5 USB to TTL UART converter"
    note: "FT232RNL, read off the chip in the product photo. Selectable 5V/3.3V/2.5V/1.8V logic levels. TODO confirm marking on the board in hand"
    url: "https://www.amazon.com/dp/B07WX2DSVB"
  - name: "EC Buying CH340C USB-C to UART adapter, 2-pack"
    note: "CH340C. TODO test"
    url: "https://www.amazon.com/dp/B0D8T31GX8"
  - name: "COR24-TB dev board"
    note: "From MakerLisp"
    url: "https://makerlisp.com"
    affiliate: false

# Bench tools (scope, meters, logic analyzer, jumpers) are listed once in the
# lab post rather than repeated here.
gear_see_also:
  - post: oscilloscopes-on-my-bench
    text: "The oscilloscope used for the handshake captures"
  - post: multimeters-on-my-bench
    text: "The meters used for the continuity checks"
  - post: breadboarding-and-prototyping
    text: "Jumpers and breadboard for probing the handshake lines"
---

<!-- DRAFT --- do not publish until the FT232U board arrives and is tested.
     Open items are marked TODO. Full checklist at the end of the file. -->

I bought a COR24-TB dev board, wired up a USB UART adapter, and tried to load a
program into it. It did not work.

What followed was a long detour into hardware flow control at high baud rates,
which is what this post is about.

The short version: the board is locked to 921600 baud with RTS/CTS
handshaking, most of the USB UART adapters in my drawer cannot do that
reliably, and the COR24-TB documentation named a tested adapter before I
started. I did not use it. I reached for what was already in the drawer, hit an
intermittent failure, papered over it with inserted delays, worked through
several near-identical boards looking for one that behaved, and only then
ordered the part the docs had recommended all along.

The debugging below was genuinely interesting and I would do it again. It was
also, in the narrow sense of getting a program onto the board, entirely
avoidable.

<!--more-->

## The Setup

<figure class="photo-aside photo-aside-wide">
  <img src="/images/posts/uart-cor24/bench-setup.webp"
       alt="COR24-TB dev board wired to a USB UART adapter on the bench"
       data-lightbox loading="lazy">
  <figcaption>TODO: COR24-TB with an adapter wired up.</figcaption>
</figure>

TODO: what the COR24-TB is, what the loader does, and the one line that matters
--- **921600 baud, hardware flow control, not negotiable**.

### What the Documentation Said

The COR24-TB docs name both a tested adapter and the software to drive it.

TODO: quote the documentation exactly --- the specific part it recommends and
the wording it uses. Being precise here matters, because the whole post hangs on
the gap between what it said and what I did.

TODO: say why I skipped it. Did I have something that looked equivalent? Assume
any FTDI part would do? Not read that far? The honest answer is more useful to a
reader than the debugging that followed, and it is the reason this post exists.

## Symptoms

TODO: describe the failure as it actually appeared --- partial loads, hangs,
corrupted bytes? Include the exact error output.

The detail that matters: it did not fail cleanly. It failed *intermittently*,
which is what turned this into a multi-week problem instead of a one-evening
one.

## The Adapters

<figure class="photo-aside-left photo-aside-wide">
  <img src="/images/posts/uart-cor24/adapters-group.webp"
       alt="Group shot of the USB UART adapters tested"
       data-lightbox loading="lazy">
  <figcaption>TODO: group shot of everything tested.</figcaption>
</figure>

Every USB UART adapter I tried, and how it behaved. All tested at 921600 with
RTS/CTS enabled, loading the same program into the same board.

**Read the results narrowly.** This is one unusually demanding test: sustained
transfer at 921600 baud with hardware flow control that actually has to be
honored. The results below describe how each adapter behaved *in that specific
job*. They are measurements from my bench, not verdicts on the products. Most
serial work runs at 115200 or slower with no flow control wired at all, and
these are all ordinary, useful adapters for that.

| Adapter | Chipset | Result |
|---------|---------|--------|
| DKARDU CJMCU-FT232H module | FT232H | **Reliable.** The only one that never dropped a load. |
| FT232RL USB-TTL adapter (genuine FTDI, 3-pack) | FT232RL | Intermittent at 921600 with flow control. |
| TODO board name | FT232R | Frequent failures at 921600 with flow control. |
| Waveshare USB to UART/I2C/SPI/JTAG converter | CH347 (mode 3) | TODO --- see note on operating modes below |
| JESSINIE CH343P module (USB-C, 2-pack) | CH343P | Frequent failures at 921600 with flow control. |
| DSD TECH SH-U09B3 (USB-C) | CP2102N | TODO --- not yet tested |
| DSD TECH SH-U09C5 | FT232RNL | TODO --- not yet tested |
| EC Buying CH340C module (USB-C, 2-pack) | CH340C | TODO --- not yet tested |
| TODO board name | FT232U | **The adapter the docs recommend.** TODO --- ordered, not yet tested |

<div class="photo-row">
  <figure>
    <img src="/images/posts/uart-cor24/ft232h-board.webp" alt="FT232H adapter"
         data-lightbox loading="lazy">
    <figcaption>FT232H</figcaption>
  </figure>
  <figure>
    <img src="/images/posts/uart-cor24/ft232rl-board.webp" alt="FT232RL adapter"
         data-lightbox loading="lazy">
    <figcaption>FT232RL</figcaption>
  </figure>
  <figure>
    <img src="/images/posts/uart-cor24/ft232r-board.webp" alt="FT232R adapter"
         data-lightbox loading="lazy">
    <figcaption>FT232R</figcaption>
  </figure>
  <figure>
    <img src="/images/posts/uart-cor24/ch34x-board.webp" alt="CH34x adapter"
         data-lightbox loading="lazy">
    <figcaption>CH34x</figcaption>
  </figure>
  <figure>
    <img src="/images/posts/uart-cor24/cp21xx-board.webp" alt="CP21xx adapter"
         data-lightbox loading="lazy">
    <figcaption>CP21xx</figcaption>
  </figure>
  <figure>
    <img src="/images/posts/uart-cor24/ft232u-board.webp" alt="FT232U adapter"
         data-lightbox loading="lazy">
    <figcaption>FT232U</figcaption>
  </figure>
</div>


TODO: be specific about *which board*, not just which chipset. Two boards
carrying the same chip can behave differently depending on the crystal, the USB
connector, the cable, and whether the RTS/CTS pins are broken out at all. That
distinction is most of the value of this post --- "use an FT232H" is advice a
reader can act on; "FTDI is better" is not.

TODO: the bench now has three revisions of essentially the same FTDI part ---
FT232R, FT232RL, and FT232RNL --- which makes for a much sharper comparison than
chipset families. The RNL is the newer part and, as I understand it, moves the
clock on-chip rather than relying on an external crystal; verify that against
the datasheet before saying it in print. If these three diverge at 921600, the
lesson is not "pick FTDI" but "the revision and the board around it decide
this", which is a far more useful thing for a reader to know.

## What These Adapters Are Good For

The adapters that struggled here were being asked to do something most projects
never ask of them.

TODO: confirm by testing --- the same boards driving an Arduino or ESP32 at
115200 with no flow control, which is what the overwhelming majority of serial
work looks like. I expect all of them to do fine. Worth actually running,
because a table of failures with no context reads as a broader judgement than I
intend.

TODO: be specific about what distinguishes them, since it is narrower than the
table suggests:

- **Baud rate.** 921600 is four to eight times the usual. Some of these parts
  are specified for it and still miss the timing under sustained load.
- **Flow control that is honored.** Many cheap boards break CTS and RTS out to
  pins that go nowhere, or expose them without the driver ever asserting them.
  Nothing notices until something on the other end depends on it.
- **Sustained transfer.** A terminal session sends a few bytes at a time. A
  loader pushes a continuous stream, which is where buffering behavior shows up.
- **Which signals are actually broken out.** Whatever the chip supports, you
  only get the pins the board or cable exposes. Plenty of USB-TTL products bring
  out power, ground, TX and RX and nothing else, and some expose RTS and CTS on
  headers that are not connected to anything. If the lines are not there,
  hardware flow control is off the table by construction --- which is a
  specification to check before buying, not a fault to find on the bench.
- **Operating mode, on multi-function parts.** The Waveshare board uses a WCH
  CH347, which is configurable: the mode it is strapped for decides whether the
  UART comes with full modem control lines or a bare TX/RX pair, and what the
  remaining pins become. TODO: confirm what mode 3 exposes. If RTS and CTS are
  not routed in that mode, the board never had a chance at this test, and the
  honest result is "wrong mode" rather than anything about the chip.

If none of those three apply to your project --- and for most Arduino and ESP32
work, none of them do --- any of these will serve, so pick on price and
connector type.

## Workaround: Inserted Delays

Before understanding the problem, I worked around it.

TODO: document the delay approach --- where the delays went, how long they had
to be, and how much they cost. Worth keeping in the post even though it is not a
fix: it is what most people find first, and *why* it helps is a clue to the real
cause.

TODO: measure it. "It got slower" is not a result. How much slower, in seconds,
for a load of known size?

## Is the Handshake Even Wired?

The first real diagnostic step: stop assuming CTS and RTS connect to whatever
the silkscreen claims.

TODO: continuity checks with the DMM --- which pins, what was measured, what was
found. Include the pinout as *tested*, not as documented.

<figure class="photo-aside">
  <img src="/images/posts/uart-cor24/dmm-probing.webp"
       alt="DMM probing the CTS and RTS pins of a USB UART adapter"
       data-lightbox loading="lazy">
  <figcaption>TODO: DMM on the CTS/RTS pins.</figcaption>
</figure>

TODO: custom test code that asserts and de-asserts RTS on demand, so the line
can be measured statically with a meter before involving the scope. Link the
repo.

## What the Scope Sees

Continuity proves the wire exists. It does not prove the handshake happens in
time. For that, the scope.

<div class="photo-row">
  <figure>
    <img src="/images/posts/uart-cor24/scope-working.webp"
         alt="Scope capture: FT232H stopping cleanly on CTS de-assert"
         data-lightbox loading="lazy">
    <figcaption>TODO: FT232H, handshake respected.</figcaption>
  </figure>
  <figure>
    <img src="/images/posts/uart-cor24/scope-failing.webp"
         alt="Scope capture: adapter overrunning after CTS de-assert"
         data-lightbox loading="lazy">
    <figcaption>TODO: a failing adapter overrunning.</figcaption>
  </figure>
</div>

<!-- Third capture to add: zoom on the transition that matters. -->

TODO: the measurement that would explain everything --- how long each adapter
takes to stop transmitting after CTS is de-asserted, versus how much buffer the
COR24-TB has. If the adapter overshoots by more bytes than the board can
absorb, the load corrupts. That is the hypothesis. The scope either confirms it
or kills it, and if it kills it, say so.

TODO: state trigger setup and timebase so the capture is reproducible.

## A Proper Test Rig

Everything above is anecdote: one board, one fixed speed, one payload, and a
sample size of "however many times I retried before giving up." The COR24-TB is
locked to 921600, so it cannot answer the question a reader actually has, which
is *where does each adapter stop working*.

TODO: build the rig and rerun this properly. Sketch of the plan:

**Both ends under my control.** A Raspberry Pi 4 or an Arduino as the far end,
so I can script both sides, choose the flow control mode, and sweep the baud
rate. The COR24-TB becomes one data point rather than the whole experiment.

**The matrix.** For each adapter: baud from 9600 up through 921600 and beyond,
crossed with hardware flow control, software (XON/XOFF) throttling, and none.
Fixed payload, fixed cable, fixed USB port.

**Iterations, not impressions.** Each cell run N times and reported as a success
rate. "Flaky" is not a result; "27 of 30 transfers completed at 921600 with
RTS/CTS" is. This is the single biggest improvement over what I have now.

**The deliverable.** A highest-reliable-baud figure per adapter, per flow
control mode. That is the table people are searching for, and none of the
adapters need to fail for it to be useful --- the expected outcome is that they
all work fine below some cutoff, and the cutoff is the interesting number.

<div class="warning-box" markdown="1">

**TODO --- verify before trusting any Pi-side result.** The Raspberry Pi's
serial situation is a trap for exactly this experiment. The Pi has two UARTs:
a full PL011 and a cut-down "mini UART" whose baud rate is tied to the VPU core
clock and which does not do hardware flow control. Which one lands on the GPIO
header depends on model and configuration, and CTS/RTS are not routed to pins by
default --- they need a device tree overlay to enable.

Get this wrong and the reference side silently cannot do flow control, which
would make every adapter look broken and invalidate the whole sweep. Check the
current Pi documentation for the exact device names and overlay, confirm which
UART is on the header, and prove the Pi side works before testing anything else.

</div>

TODO: consider an Arduino instead for the far end --- a simpler, more
predictable UART with fewer configuration traps, at the cost of lower maximum
baud. Possibly both, since agreement between two independent reference setups
would be worth more than either alone.

## Logic Analyzer

Time permitting.

TODO: 8- or 16-channel capture with TX, RX, RTS, and CTS on screen together,
decoded. The scope shows timing on two channels; the analyzer shows the whole
conversation and decodes the bytes, which is the better view for showing *what*
was lost rather than *when*.

## What Actually Fixed It

TODO: the conclusion, once it is established rather than assumed.

## If You Hit This

TODO: the practical summary. Which adapter to buy, what to check first, how to
tell quickly whether flow control is the problem. Someone arriving from a search
engine with this symptom should get an answer in the first screen.

TODO: and the obvious one --- read the board's documentation and buy the part it
names. Worth stating plainly rather than leaving implied, since it is the step I
skipped.

---

*The software side of this work --- the test harness, and scripting the
oscilloscope and bench DMM over their APIs to automate captures --- is a
companion post on
[Software Wrighter Lab](https://software-wrighter-lab.github.io/).*

<!-- TODO: link the companion post once it exists, and add a link back from it. -->

{% comment %}
CHECKLIST BEFORE PUBLISHING

  [ ] FT232U board received and tested
  [ ] CP21xx tested
  [ ] Quote the COR24-TB doc's exact recommendation and wording
  [ ] Say why I skipped it --- that admission is the spine of the post
  [ ] Exact board names and part numbers for every adapter
  [ ] Verify the Waveshare board's chip marking is CH347, and confirm which
      mode it was in and what that mode routes to the UART pins
  [ ] Check the CH347 datasheet: does the mode I used expose RTS/CTS at all?
      If not, that is a configuration finding, not an adapter limitation
  [ ] Identify which CH3xx board struggled: CH340C and CH343P are both on the
      bench now and are different parts
  [ ] Confirm the SH-U09C5 marking on the physical board reads FT232RNL ---
      currently read from a zoomed product photo, not the part in hand
  [ ] SH-U09C5: confirm form factor --- the listing title says "cable" but the
      product images look like a board. Check what I actually received
  [ ] Compare FT232R vs FT232RL vs FT232RNL directly. Three revisions of the
      same basic part, and if they behave differently at 921600 that is the
      sharpest possible version of this post's argument
  [ ] For every adapter, record which signals are genuinely broken out AND
      genuinely connected. A labelled RTS pin that goes nowhere looks identical
      to a working one until you meter it --- which is what the continuity
      section above is for
  [ ] Set amazon_affiliate_tag in _config.yml once the Associates account
      exists; links and disclosure switch over automatically
  [ ] Photos: group shot, individual boards, bench setup, DMM probing
  [ ] Scope captures with stated trigger and timebase
  [ ] Numbers for the delay workaround
  [ ] Logic analyzer capture (optional)
  [ ] Build the test rig; verify the Pi's UART and flow control FIRST
  [ ] Run the full matrix with N iterations per cell; report success rates
  [ ] Establish a highest-reliable-baud figure per adapter
  [ ] Test the struggling adapters at 115200 without flow control, so the post
      can say what they are good for rather than only where they fell short
  [ ] Real affiliate URLs in the gear: list, and accounts set up
  [ ] Reread the table wording once more --- these are scoped measurements, not
      product verdicts, and the post should not read as a takedown
  [ ] Companion software post written and cross-linked
  [ ] Re-check the hardware: front matter against what was actually tested

STRUCTURAL NOTE --- worth deciding early

  This is currently a debugging narrative, which is the honest shape of what
  happened. But the thing most readers want --- "which USB UART adapter works at
  921600 with flow control" --- is buried in the middle.

  The test rig plan sharpens this. There are now clearly two posts:

    1. "How Fast Can a USB UART Actually Go?" --- the rig, the sweep, the
       success rates, and a highest-reliable-baud table per adapter per flow
       control mode. Answers the general question, ages well, and is the one
       that catches search traffic. Nothing in it depends on the COR24-TB.

    2. This post: the specific COR24-TB debugging story, ending in the docs
       admission, linking to (1) for the general characterisation.

  Publish order matters less than keeping them separate --- (2) is a story and
  is nearly written, (1) is data collection and will take real bench time. Both
  share hardware: [ft232h, ...] so they cross-link automatically.

  Consider also: the expected headline for (1) is that every adapter works fine
  below some cutoff and only the top of the range separates them. That is a
  friendlier and more useful result than a table of failures, and it fits the
  no-takedown policy better too.
{% endcomment %}
