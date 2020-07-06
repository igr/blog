---
title: "DFE FTW!"
date: 2020-07-01T01:07:03+00:00
categories:
  - Development
meta:
  img: "ig.png"
tag:
  - project
  - development
---

The blooming world of software development seems to be fanatically obsessed with efficiency and rapid production; until someone, as in that fairy tale, shouts "The king is naked" and points out the excess of talking, and the lack of results. In this regard, there is one important practice that is, as far as I can see, poorly cared for: `DFE`.

<!--more-->

It is not something that is taught in agile courses. It's not a glamorous topic to write about. This practice is assumed and almost always neglected. And it all costs money, and it all erodes (your) project day by day.

DFE is an acronym for **Developer-First Experience**, defined as:

> It is the duty of project managers to remove any doubts that a developer encounters during their work. The project should be set up exclusively to suit the developers.


## Doubts

Every time a programmer interrupts his flow to do something that is not programming is, in essence, a double waste of time: both his and the project's.

This is a specific communication problem. In addition to the code, the project environment itself serves as a means of communication between team members. We all agree that the code needs to be maintained, refactored; and in the same way one should constantly work on the project environment.

What does this mean in practice? A lot of things. The project must be able to open in any programming environment (IDE) immediately after download. It is similar with starting a project - the default settings must be set for local development. All necessary services must be started with a single script, the name of which indicates what it does. There is no `run.sh`. There is no 'out of the blue' configuration that needs to be added to make everything work locally. Delete the `README.md`; are you handling it now?

Next: all logs, errors, reports, documentation, and settings must be clearly available in one and only one place, within the project. The CI/CD must set the results clearly and regularly to be accessed in an identical way, regardless of the service. Automation does not stop with a successful project build.

Next: there must be access to every part of the system in the working and test environment (i.e. dev/test environment). Everyone must be able to repeat any scenario and hook up to a service on any port. The application must have an admin console that provides quick information (system status, ssh access, variables, etc.). Setting up a new version of the service must be one-step, which - I can't stress this strongly enough - must take as little time as possible.

And the code: it must be rich in information, not only in the source (already so much talked about), but also in the runtime (less talked about). Proper logging, input verification, unambiguous error location… pragmatic detail is not a flaw.

## Dellusion

Many will say they already have all this. What I am writing about may even seem trivial. But, alas, it's not.

A project set up in such a way that it leaves no doubts, idleness, unnecessary waiting… I have not had the opportunity to meet often. Usually everything ends with some README.md or wiki, in a clinch between the need to keep everything simple and, on the other hand, the need for detailed and comprehensive documentation. Good luck with that! Sometimes there is an intention for everything to be as it should be, which ends with the initial setup. Thereafter, no one is dealing with the project anymore, or, even worse, everyone is dealing with it, and the information is being patched or shared through the wrong channels.

To repeat the idea from the introduction: fixed on the solutions from the neighbouring yard, we leave our own garden unweeded.

## DFE!

Litmus test is a new programmer on the project: how long it takes him to find the error on the last test, start the project locally from scratch and start coding without any consultation with the team. Does your project pass this test?

DFE is something that is constantly being worked on as the project grows and becomes more complicated. Constantly! It's good to listen to the team's daily communication channels for topics that slow them down: every time someone asks 'how to...', 'where is...', it's time to apply DFE.

It is allowed to be creative. Where is that AI, or machine learning, that recognises cats or generate quasi-artistic content? It is welcome in my garden, there is soooo much weeding to do.
