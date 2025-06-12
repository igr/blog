---
title: "PRroud to PRocrastinate"
date: 2025-06-12T01:05:03+00:00
lang: en
slug: "proud-to-procrastinate"
description: >
  First-IN-Last-OUT: this is how so many development practices end up shaping our engineering lives. Including Pull Requests.
---

Pull Requests were invented by Git’s creator and later blasted into fame by GitHub around 2008. PRs are specifically designed to simplify accepting contributions from the outside world; contributors we may not know, who might not fully grasp all the intricate details of the project and its domain.

In the open-source world, PRs make perfect sense. They offer a straightforward way for people _outside_ the core team to get involved. Meanwhile, the core team retains control: they can review proposals, suggest improvements, and ultimately decide whether to integrate the changes. That’s the beauty of PRs: they’ve significantly enhanced collaboration in open-source projects.

Or, as Hermann Hesse put it in Steppenwolf:

> PRs allow someone to contribute to a codebase they do not have ownership of.

## Embrace the Dogma

Almost two decades later, PRs have become a must-have dogma adopted by all sorts of software organizations - often without fully understanding (or even questioning) the consequences. The IT industry eagerly embraced the open-source model and transplanted it into the closed-source world, where teams are supposed to collaborate more closely, and where ownership should be clearly structured.

Now, wait a second: just because something was invented for one purpose doesn’t necessarily mean it can’t work for others. So what if PRs were created for open-source projects? Why not use them everywhere? Fair point. However, simply being able to use a practice doesn’t automatically make it the right practice. It still needs to be verified. And, boy, we’ve had over 15 years of data to look at.

So, what’s the core problem with PRs?

We’re essentially asking engineers to contribute to a codebase while _denying_ them full **ownership** of that codebase; they can’t even decide whether their own change gets accepted. Why on earth would we ask someone to request permission to change code they’re supposed to own?

And that’s where dysfunction creeps in.

Stripping ownership from the team is a critical mistake: it goes against the very essence of teamwork. Without clear ownership, no one cares deeply, and everyone gets pulled into endless opinions and debates. In my native tongue, there’s a proverb: "mnogo babica, kilavo dete," which loosely translates to the English "Too many cooks spoil the broth." When too many people try to manage or interfere, the end result often suffers.

And that’s just the tip of the iceberg. Who decides what changes go in? The architect? Only seniors? What knowledge must they have? Do you accept all their remarks? Should non-functional changes even block a PR? And who reviews the reviewers?

PR reviewers often struggle to distinguish between what’s important and valuable versus what’s simply nice to have. Code should land in the codebase as soon as possible. Cosmetic changes can and should be addressed separately, not used as a reason to block a PR. Moreover, the asynchronous nature of PRs disrupts the flow: development slows down, and with it, costs go up.

Wait, but isn’t slower development worth it for better quality and security? Nope.

Slowing down for the sake of safety is a mistake. The research is clear: gates actually drive quality down. The very mechanism we rely on to improve quality often produces the exact opposite outcome.

And again, this is still just the tip of the iceberg. I won’t dive into all the details: many others have done an excellent job already. And please, don’t take my word for it. Do your own research. Just. Do. Fricking. Research.

## FILO Development Practices

**First-IN-Last-OUT** - this is how so many development practices end up shaping our engineering lives. We’re always eager to adopt new practices, and understandably so. After all, software engineering seems to be getting less and less like actual engineering, right? New practices are shiny, each promising to be the solution.

+ Take a shot of TDD - your project will flourish!
+ Sniff that OOP - your business problems are covered!
+ Embrace the AI - your developers are obsolete!
+ Follow Clean Architecture - your uncle will be proud!
+ Be Agile - have dailies, read yesterday’s Jira tickets, and your project will skyrocket!

And if something isn’t working? Well, that’s because you are doing it wrong, not the practice itself. Just look around at all these teams worldwide: they’re using it, so obviously, the problem is you.

The truth is, most of these practices have been _invented_. Sure, the intentions are often good, but I remain unconvinced that they’ve been properly reviewed, measured, or thoroughly researched. Once something gets IN, it seems almost impossible to get it OUT.

Why can’t we shake this FILO attitude?

Because, usually, FILO offers a cheap excuse that creates an illusion of control, of quality, of oversight. It’s easier to trust in some procedure: some magical steps that falsely reassure the team that everything is under control. It’s binary. And we developers? We love binary decisions.

## Back to PR

Is there room for PR in software development? Of course. Anytime there’s a contribution from someone who isn’t an owner: like new joiners to the team, for example. Or when we’re just not entirely sure about a change. So yes, PR is one more tool in our toolbox. And like any tool, it has its specific, limited purpose.
