---
title: "Dev Lives Matter"
date: 2025-05-26T01:05:03+00:00
lang: en
slug: "dev-lives-matter"
description: >
  Part of engineering and development is making sure that people can work effectively, efficiently, and, hopefully, enjoyably.
---

Most of the teams I worked with never achieved a serious, sustained effort to maintain and improve developer experience. The fun part is that I am in this industry for over two decades:) Sad but true: it’s often the last thing anyone thinks about. We don't have time, right?

Here are a couple of practices I enforce early on in any project that falls under my ownership.

## Project Interface

Every project must follow the same technology-agnostic _interface_ for building, testing, starting/stopping local infrastructure, and so on. For this, I use `just`: a simple yet powerful command runner—think `make` on steroids. Regardless of whether the repository uses sbt, Gradle, Maven, npm, Docker, or any other tool, the way a developer interacts with the project remains consistent across all services.

## Local Auto-Auth

Authentication in the local development environment is usually an unnecessary source of friction. I always provide a local-only mechanism to _automatically authenticate_ each request as default user—configurable via a `.env` file (for example). I really, really don’t want anyone wasting time generating tokens or jumping through hoops just to get started with local development.

## README Header

Every service’s `README.md` begins with a list of environment-specific links. Each infrastructure and observability tool—ArgoCD, Datadog logs, OpenAPI schema, health checks, Figma designs, you name it—is listed and linked per environment.

The only thing I need to keep bookmarked is the list of service repositories.

## Dashboard

Each service—or group of services—has one or more pages I refer to as the "dashboard." These aren't APIs; they’re real, server-rendered HTML pages.

Dashboards are intentionally simple pages designed to:

1. Quickly display key business data—the kind of insights that typically come up during troubleshooting.
2. Easily set the system into predefined states. For instance, I’ve used dashboards to simulate different days of the month or to load initial data sets.

Dashboards may read directly from the database, link to relevant APIs, or execute helper actions. As development progresses, the dashboard naturally evolves. Once troubleshooting becomes part of the workflow, every recurring question or step ends up documented and implemented there—including entire procedures.

Dashboards are enabled in local and staging environments. Sometimes in production, too, but only for internal use, e.g., troubleshooting.

How long does it take to build a dashboard? Far less time than repeatedly performing the same manual steps across the team.

## Vocabulary

Shared page/place with all the relevant terms, acronyms, and abbreviations used in the project. It’s a living document that evolves as the project grows. It’s not just a glossary; it’s a shared understanding of the language we use. Each definition should be clear, concise, and unambiguous. It’s not about being pedantic; it’s about ensuring everyone is on the same page. Add links to relevant documentation or resources where necessary.

Every time someone asks "What does X mean?" or "What is Y?", I add it to the vocabulary.

## Clear Ownership

Forget the "everything-everywhere-all-at-once" mentality—it often masquerades as collaboration, but in reality, it’s just an excuse for poor engineering practices and a lack of clarity. When everyone is responsible for everything, no one is truly accountable for anything. Decisions get diluted, code quality suffers, and long-term ownership disappears into the fog of group indecision.

Clear ownership matters. When someone owns a system, a component, or a domain, they have the final say on technical decisions. That doesn’t mean their choices are always perfect—but that’s not the point. Ownership isn’t about always being right; it’s about being accountable. It’s about having the courage to make a call, accept the consequences, and continuously learn from the outcomes.

This doesn’t mean building ivory towers or hoarding knowledge. On the contrary, effective ownership includes a responsibility to share knowledge openly, mentor others, and make sure the system can outlast any one person. Ownership without collaboration breeds silos; collaboration without ownership breeds chaos. The balance lies in knowing who leads, while ensuring others are empowered to follow, contribute, and eventually lead too.

In short: assign ownership, trust people to lead, and hold them accountable—not for perfection, but for stewardship.

## How Early?

These are just a few of the practices I enforce early in any project. When? Day two :) Day one is reserved for setup and building the very first artifact—something tangible, no matter how simple.

Developer lives matter. Part of engineering and development is making sure that people can work effectively, efficiently, and, hopefully, enjoyably.

`#devlivesmatter`
