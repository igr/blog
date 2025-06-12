---
title: "Third Time’s a Charm"
date: 2025-05-27T01:05:03+00:00
lang: en
slug: "third-time-charm"
description: >
  Do you have a throwaway code mentality? Or do you think you can get it right on the first try?
---

I created a graphics library on top of [Skiko](https://github.com/JetBrains/skiko), for personal use only. My goal is to come up with a bunch of algorithms and math formulas that I can use to generate images.

I had to rewrite the library _twice_. The current version is the third one, and it still shows some signs of friction.

Skiko is a fairly simple canvas graphics library. You get basic primitives: points, rectangles, fills, etc.,everything you’d expect from such a library. The domain is straightforward and familiar; definitely not new to me.

The first version of my library was a quick miss. I got the initial examples running, but everything felt off.

The second version lasted longer. It introduced some practices that I still use today. I was able to do more with it and experienced less friction. Still, I didn’t get everything right. Not because I didn’t think things through, but because I simply couldn’t anticipate how I would actually use the library. The utilities were fine, but the major abstractions weren’t quite right.

The third, and current, version required (painful) refactoring all of my previous work. This is the version I’m using now, and it's fine. I’ve started noticing new points of friction, but for now, it’s all acceptable, and I’m working efficiently with how things are.

If I only had more time, or if I cared to make it useful for others, I’d need to refactor again.

## Why Am I Sharing This?

Even though I was familiar with the domain, I didn’t get it right on the first try. It took multiple iterations: each one teaching me not more about the domain itself, but about how to better use the library.

I can’t stop asking myself: how is it that we design and write more complex systems all _at once_? There’s no throwaway code; we treat everything we write as "good enough" for production. Is it really possible to understand a domain so well and plan so thoroughly before development that we get it right on the _first try_?

I highly doubt it.
