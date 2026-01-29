---
title: "Me, Myself and AI"
date: 2026-01-29T01:06:08+00:00
slug: me-myself-and-ai
description: "Effective AI-assisted development isn't about maximizing code generation. It's about staying in control and preserving space for thought."
lang: en
---

First, my approach to tools. I'm open to using anything (ethical boundaries aside) if I can find a pragmatic way to incorporate it into my daily routines while extracting significant value. I'm not obsessed with tools. I'm comfortable learning 80% of a tool's capabilities in 20% of the time, fully aware that chasing the remaining 20% of features probably won't improve my output enough to justify the other 80% of potentially invested time.

As someone naturally curious, I haven't stopped experimenting with newly available tools; but I'm also not hunting for the next shiny solution just for the thrill. I'm perfectly happy with boring.

Now, AI. I use Claude Code in two modes. In the slow, blocking mode, I ask it to analyze something, produce a piece of code, or propose a solution. The fast, non-blocking mode kicks in when I'm in the flow (sorry, I don't vibe), performing short loops one after another:

+ understanding the intention of what I'm about to add to the codebase
+ prompting a AI task, keeping the context small
+ while AI works, I'm already onto understanding the very next step
+ once the change is done, I revisit the intention (now enriched with information from the previous step), review the generated code, tweak here and there, and commit a checkpoint (even if it doesn't compile.)

Most of the time I let AI complete its task without interruption. I don't let it plan. I don't bother being crazy descriptive or detailed; actually, my expectations are quite the opposite. If AI can't figure out the intent of a simply written task, it's probably not an issue with my prompt but with my environment, code structure, or understanding. Bottom line: I'm in control.

But all this is nothing new. And - surprise, surprise - this isn't what I want to share.

## Development Is Not Just About Producing Code

The steps listed above don't do justice to another crucial part of the process. Producing code was - another surprise - never the problem. What's missing is, in short, _thinking_ (reasoning about intent and code).

What I often do during focus mode is break the AI loop. Instead of letting AI generate code, I make myself do it. This has become almost a rule: every time a new architectural pattern emerges, I break the AI loop and type the next piece of code myself. This allows my lateral thinking to kick in, so I can experience and - don't laugh - _feel_ whether the architectural pattern fits properly. I need time to let things sink in, to ponder them, to understand the resilience of the solution. And a way to think is to write:

> Writing is thinking.

This is a universal rule of human nature. Don't let your tools take it away from you.
