---
title: "Interview Interference"
date: 2025-08-22T01:05:03+00:00
lang: en
slug: "interview-interference"
description: >
   Observations on system design interview discussions; and why the process might not work
   the way we think it does. What a lame description this is.
---

I once had an unusual hobby: attending job interviews for sport. No preparation, no real interest in the positions, just curiosity about what would happen. Looking back, this was ethically questionable at best: I was essentially using companies as my personal laboratory. The tech world was in a frenzy back then. Developers were mythical creatures, and companies were throwing offers at anyone who could spell "print." It was a seller's market gone mad, though that hardly excuses my behavior.

Or did I? Maybe this article is just a vivid imagination? Maybe I used a different persona?

Anyhow, the [coding questions](https://github.com/igr/coding-questions) are easy, binary tasks: you either know how to solve them or you don't. I learned not to have a problem with that. If someone values how fast I can invent an irrelevant algorithm while they're watching me and giving hints that aren't aligned with my current flow of thoughts, so be it. I'm probably not a match for such a team. Sure, if I were actually looking for a job, I would care more and give it more significance.

What's interesting is the part about _pre-assumptions_: you're handled differently based on the position you're applying for. Applying for a junior role? You'll get the junior treatment. Senior position? Different set of expectations entirely. On the surface, this makes perfect sense: of course they should tailor the conversation to the role. But somehow it _feels_ wrong. Once, I was treated as entry level junior and solution architect in the same time, by the same big-tech-mumbo-jumbo company, when applied for both positions. Fun, right? The purpose of the interview was always to figure out if I'm a match for a given position. It was never about my overall know-how. I'm still undecided if this is the right approach. I feel it's more important what I know, rather than whether I tick all the required boxes. Maybe it's more of a financial decision: we can only pay for junior skills, and we're not interested in anything more.

And that's exactly what's troubling: "we're _not_ interested in anything beyond what we specifically need."

But I want to talk about system design interviews: any senior-level interview around architecture proposals for common business services (notification service, URL shortener, etc.). Here's the thing: it doesn't matter what the system actually does. The resulting "interview" architecture will be virtually identical every time. You'll inevitably draw the same components: microservices, event bus, load balancers, circuit breakers, outbox pattern, databases, shared state management. You'll field the same predictable questions about availability, horizontal scaling, distributed transactions, and so on.

Master one system design on paper, and you can essentially copy-paste your way through every subsequent interview. It becomes a theatrical performance where everyone knows the script.

Or not - plot twist - depending on actually what the interviewer _wants_ to hear.

Let me rephrase: the success of such interviews seems to depend on whether you say out loud the concepts the interviewer wants to hear. Not whether you're right or wrong, just whether you said the correct words: again, ticking boxes. Interview interference phenomenon, as I am calling it.

For example, I was once asked about the database-per-microservice scenario. I answered that it depends; we can start with separate db schemas; but for fun, I offered also one uncommon solution: having database users with different access rights per microservice. Of course, there's no right or wrong answer. However, that interview almost ended badly because the architect was expecting to hear that each microservice must have its own database, because, as I learned later, this is how they were doing it in their project. He was not willing to accept any alternative at the time of the interview. I almost didn't pass the interview.

But I got the job, and I found a complete, utter mess in the project. They were just doing things for the sake of doing them. That was the first and only contract I quit after two months.

Another example: I was asked how I would maintain the quality of a project about six minutes before the end of the interview. I asked: "What is quality for you?" I could probably write a small book about software quality (not saying it would be correct, but I'd have something to say since I think about it a lot). This response wasn't in alignment with what the interviewer expected, so they never returned my call. I simply cannot answer that question in five minutes or less. C'est la vie.

This all _feels_ fundamentally wrong. Alignment of ideas should not be the metric for interviews, nor should it determine a candidate's capabilities. We're not hiring for ideological conformity: we're supposed to be hiring for technical competence and problem-solving ability. When interviews become about saying the "right" buzzwords rather than demonstrating actual understanding, we've turned the hiring process into a game of corporate Simon Says.

The best engineers I know often challenged conventional wisdom and brought fresh perspectives. But our current interview culture systematically filters them out in favor of people who can recite the accepted gospel. We're optimizing for compliance, not capability.
