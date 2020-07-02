---
title: "TDD bowling and uncle Bob"
date: 2020-05-03T01:07:03+00:00
categories:
  - Development
meta:
  img: "ig.png"
tag:
  - tdd
  - development
---

There is one TDD kata that particularly grabs my attention. I often have a problem with it in my workshops. And some with uncle Bob, as well.

<!--more-->

## TDD

Let's first quickly agree on what TDD is all about. If you think it is about testing, you are mistaken.

> TDD is about incremental development through small steps. Hence: the software design.

The idea is to develop just what is needed, incrementally. With tiny baby steps, we can reach a goal more safely without fear of overdoing it. Developing higher complexity than needed (over-engineering) is a common problem during development, and it is a natural consequence of every problem-solving process.

Tests are just a tool. The same goes for refactoring, which is an integral part of one TDD cycle. Refactoring is even more important; I'll write about it next time.

Moving on: every bit of development with TDD is either refactoring or adding single functionality. The test helps to determine the next (small) step or to secure a code change. First, we write the most straightforward code we can think of - it turns out that this is often a problem. The point of practicing TDD katas is also to practice this step. Once tests are passing, we must go back and refactor the initial code: the first version may be of any quality as long as it satisfies the tests.

## Let's go bowling

A typical TDD kata is the calculation of bowling scores. [Following the example of Bob's course](/tdd-kuglanje-i-teca-bob/Bowling_Game_Kata.pdf) in my workshops, I first let attendees model the problem in a "standard" way. In a matter of minutes, we come out with a rich class diagram. Next, we start tackling the kata in a TDD way. The idea is to point out a simpler solution that does not require additional classes and is (relatively) easily achievable by TDD practice.

The kata is described in detail in the enclosed PDF. In short, the player plays 10 times - frames. A player rolls the ball twice during each frame. The score is equal to the number of knocked pins. If a player gets all the pins in the first roll (a strike), the frame ends. Strike roll has a score bonus: the sum of knocked pins of the next two rolls. If a player knocks all pins down within two rolls (spare), the bonus is a number of knocked pins of the next roll.

Write a `Game` class that has two methods:

+ `roll(pins)` called every time a player throws a ball,
+ `score()` called at the end of the game and returns the result.

Let's exercise this kata together. Today, let it be in Scala.

## Come on, Eileen, too rye aye, code in

(I am accelerating the pace to make the article shorter)

We start with minimal functionality: when a player misses everything, the game score is 0. When he knocks down only one pin, the score is 1.

The `Game` class after first steps is:

```scala
class GameX extends Game {
  private var pins: Int = 0

  override def roll(pins: Int): Unit = {
    this.pins += pins
  }
  override def score(): Int = {
    if (this.pins > 0) {
      return 1
    }
    0
  }
}
```

Off-topic: while practicing the TDD, I have noticed various complexity-growing patterns. For example, one pattern is to allow two repetitions, while a third repetition indicates the need for generalization. `if` block may turn into a loop, or move into the loop. Interestingly, I did not find much literature on such patterns of growing code complexity. If someone is interested in this subject, let me know.

Back to the problem: we have a case of two repetitions - there are two `if` blocks (the second one is implicit), so the code needs to be generalized. We may presume that the score for 'weak' rolls (when a player does not knock down all the pins in a frame) is equal to the number of knocked-down pins, which simplifies the code:

```scala
override def score(): Int = {
  this.pins
}
```

That solved all the weak rolls. It is time to focus on cases where all pins are knocked down. Let's start with a strike (for no particular reason). If a player knocks down all pins in the first frame, and rolls a total of `7` pins in the second frame, the score for the first frame is `10 + 7 = 17` points. The total score after the second frame is `17 + 7 = 24` points.

We have come to a critical part, where often things go in different directions on workshops. As said, the point is to develop in baby steps. What would be the smallest change of the code that introduces the strike case (and that passes the test described above)?

The first change is the introduction of history: it becomes apparent that we have to store all the rolls. The introduction of history requires refactoring of existing code. Instead of cumulatively collecting the number of knocked pins for the score, we need to preserve them.

```scala
class GameX extends Game {
  private val rolls = new Array[Int](21)
  private var currentRoll: Int = 0

  override def roll(pins: Int): Unit = {
    rolls(currentRoll) = pins
    currentRoll += 1
  }
  override def score(): Int = {
    var score = 0
    for (roll <- rolls) {
      score += roll
    }
    score
  }
}
```

Why `21` for array size? It is merely the maximum number of rolls possible in the game of bowling.

Note that we haven't introduced anything new yet. We did not design, for example, a `frame`, that would represent the introduction of a new concept. Although we wrote much code, it was all about the refactoring to get one component back in the program, which is the history. History already existed as a concept; we just didn't preserve it: the existence of a single variable erased it. Let me emphasize this: we did not add anything new, but reclaimed the existing concept.

Now we can go further: when we have history, we can calculate the bonus. This step is not refactoring now, but rather adding new functionality. The bonus depends on future rolls. Hence, we can write the following:

```scala
override def score(): Int = {
  var score = 0
  var rollNdx = 0

  while (rollNdx < rolls.length) {
    val roll = rolls(rollNdx)

    var scoreForRoll = roll

    if (roll == 10) { // strike
      scoreForRoll += rolls(rollNdx + 1)
      scoreForRoll += rolls(rollNdx + 2)
    }

    score += scoreForRoll

    rollNdx += 1
  }
  score
}
```

Handling spare is similar - after adding a test, the minimal step could be:

```scala
override def score(): Int = {
  var score = 0
  var rollNdx = 0

  while (rollNdx < 20) {    // FIX!
    val roll = rolls(rollNdx)

    var frameScore = roll

    if (roll == 10) { // strike
      frameScore += rolls(rollNdx + 1)
      frameScore += rolls(rollNdx + 2)
    }
    else if (roll + rolls(rollNdx + 1) == 10) { // spare
      frameScore += rolls(rollNdx + 1)
      frameScore += rolls(rollNdx + 2)

      rollNdx += 1
    }

    score += frameScore
    rollNdx += 1
  }
  score
}
```

We've added another `if` block to check spare. However, we need to fix the `while` loop condition. We use the value `20` because it is the least we can do in this step. We are aware that it is a magical value, inserted only for the test to pass, and that we are left to analyze it (read: cover with test). We don't want to address this value in the current step.

The next step is examining the case of the "perfect" game: when the player consistently knocks down all the pins. The maximum score is `300`; the above code returns `330`, because it does not know when to stop when iterating over rolls. The conclusion is that we have to iterate the frames instead, as that's how we only know when the game is over - the number of rolls does not tell us that. Let's switch to counting frames:

```scala
  override def score(): Int = {
    var score = 0
    var rollNdx = 0
    var frame = 0

    while (frame < 10) {
      val roll = rolls(rollNdx)

      var frameScore = roll

      if (roll == 10) { // strike
        frameScore += rolls(rollNdx + 1)
        frameScore += rolls(rollNdx + 2)
      }
      else if (roll + rolls(rollNdx + 1) == 10) { // spare
        frameScore += rolls(rollNdx + 1)
        frameScore += rolls(rollNdx + 2)
        rollNdx += 1
      }
      else {
        frameScore += rolls(rollNdx + 1)
        rollNdx += 1
      }

      score += frameScore

      rollNdx += 1
      frame += 1
    }
    score
  }

```

We're not done yet - the code craves for some refactoring. E.g.:

```scala
override def score(): Int = {
  var score = 0
  var rollNdx = 0
  var frame = 0

  while (playingFrame(frame)) {
    var frameScore = simpleFrameScore(rollNdx)

    if (isStrike(rollNdx)) {
      frameScore += rolls(rollNdx + 2)
      rollNdx += 1
    }
    else if (isSpare(rollNdx)) {
      frameScore += rolls(rollNdx + 2)
      rollNdx += 2
    }
    else {
      rollNdx += 2
    }

    score += frameScore
    frame += 1
  }
  score
}

private def playingFrame(frame: Int): Boolean = {
  frame < 10
}
private def isStrike(rollNdx: Int): Boolean = {
  rolls(rollNdx) == 10
}
private def isSpare(rollNdx: Int): Boolean = {
  rolls(rollNdx) + rolls(rollNdx + 1) == 10
}
private def simpleFrameScore(rollNdx: Int): Int = {
  rolls(rollNdx) + rolls(rollNdx + 1)
}
```

Nice, right? It's not all that great, though: the functions are not entirely correct. They are bound to `rollNdx`, expecting it to be in sync with the frame. Unfortunately, there is no pure correlation (in terms of "pure functions") between a frame and roll, as the correlation depends on history. The `isSpare` function only makes sense if a strike has already been detected, for example. All this results in functions that do not do what they are intended to do.

## In the meantime...

The course Bob took is a bit different.

First, it calculates the `score` when calling `roll()`. This approach is, of course, wrong. Bob himself reasons the same in the third test. What is a mistake? The intent of the `roll()` function has nothing to do with the score - it serves solely to receive information about knocked pins; that's all it needs to do. Nevertheless, this erroneous approach is understandable, and I have no problem with it.

What is striking (pun intended), however, is the decision to switch from iterating over rolls to iterating over frames in the same step, the third test. Sure, it is not fair to judge an example based on presentation alone. However, this premature, in no way motivated, refactoring just obstructs the idea of ​​TDD: it changes the concept without a previously apparent reason (_test_). We came to the same conclusion in the better way I would say, a few steps later.

The next concern is extracted methods such as `isSpare(int frameIndex)`. Unlike the above example, Bob uses `rolls[frameIndex]` in the function's code, which is particularly wrong. This term implies a clear correlation between the two values, which is not the case. The `rolls` collection, in this example, should exclusively be read with `rollNdx`.

## Exaggeration or not?

Admittedly this all sounds like an exaggeration to someone: "Write the code that works now, son, don't think much". To me, these are not just little things: they accumulate and become an avalanche that comes when it is not needed. If anything, this is at least an illustration that writing a clear and clean code is not easy.

Which brings us back to the beginning of the problem. The only way I can think of a code that has no challenges is to code a class diagram mentioned in the beginning. And this, somewhat, I resent Bob: his example can also be interpreted as advice that modeling (with classes) is somewhat complicated. This is not the case. Types that precisely model a domain are much more valuable than a function that uses primitive types for its calculation. What's more, Bob's approach is sort of _code smell_, _primitive obsession_, which I am trying to get rid of as much as possible.
