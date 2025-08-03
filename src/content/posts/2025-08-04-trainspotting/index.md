---
title: "Trainspotting"
date: 2025-08-04T01:05:03+00:00
lang: en
slug: "trainspotting"
description: >
  But why would I want to do a thing like that? I chose not to choose.
---

Choose tests. Choose code coverage. Choose 90% passing thresholds. Choose mutation tests. Choose strict source formatting checks, functional tests, mocking frameworks. Choose CI/CD, DevOps rules, charts, scripts, READMEs. Choose project structure templates, choose tooling, code modules. Choose epics, tickets, endless kanbans, massive documentation... Choose interfaces and default implementations, clean code, TDD, hexagonal architecture, microservices. Choose project future.

But why would I want to do a thing like that? I chose not to choose.

## The Cost of an Unused Import

It seems the focus of development is _never_ development itself. The pattern I see repeated is an obsession with everything _except_ the actual code.

We're obsessed with enforcing rules. We glorify manual procedures buried in READMEs. Talking becomes ceremony. But when it comes to development, we drop our guard. Here are requirements; write some code. As long as everything else is satisfied, the code is fine.

Granted, bad code can bring value. That's no surprise. However, bad code is expensive to modify. Bad code is [communication noise](https://oblac.rs/ccc/).

When I say "bad code," I don't mean just common code smells. I'm referring to higher concepts, abstractions of the business domain. I've seen technical boundaries, not domain boundaries. I've seen detailed individual requirements, yet no understanding of the complete flow.

No wonder AI seems "smart": it follows patterns. How did the _same_ patterns become the best for all domains?

True story: Imagine you write a simple API endpoint that returns mocked data. You're fine with it. You feel you own that code. Job done. Not. CI fails: you have an unused import. Flow breaks. Remove unused import by auto-formatting. Job done. Not quite! CI complains: the import order is wrong. Flow breaks. Apply the rules by invoking a command from the terminal. Push, job done. Nope. CI complains: 78% code coverage, minimum is 80%. Flow breaks. Write meaningless tests that cover getters just to hit the metric. Push, job done. Wrong again. PIT test breaks. Sometimes. Flow breaks. Write even more tests so the flaky mutation testing starts behaving. Push, job done. Still no. A team member believes we should also add X. Flow breaks. Discuss on GitHub that X is not in current scope. Resolve comment and wait for second approval from infra engineer. Twenty minutes later, DevOps member asks questions about upstream dependencies. Flow breaks. Discuss on Slack. Job done, 2 approvals. Not yet. Can't rebase: conflicts. Flow breaks. Resolve conflicts, push, job done. Nope. Flaky test on CI, restart job. Request review again as approvals are invalidated. Wait, we need to release the change? Flow breaks. Huh, what's the GitHub Action I need to run? Check personal docs: if this then that. Go to GitHub, start release. Job done. Not. Release failed due to network issue. Flow breaks. Restart the release. Finally done. Well, not quite. Slack question about whether the release is out. Flow breaks. Check CI. Write follow-up about the status. Job done.

All that for non-production code that will be _removed_ in three weeks. All that for code I _thought_ I owned.

And yet, I was using repositories directly from controllers in hexagonal architecture. And yet, there were random interfaces extracted into separate compilable units, only to find their single implementations freely shared across modules. And yet, there was no domain model: just entities and API data types, obsessed with primitives. That's less important, right?
