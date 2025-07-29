---
title: "Some Refactorings"
date: 2025-07-29T01:05:03+00:00
lang: en
slug: "some-refactorings"
description: >
  Some refactorings of AI generated OOP Kotlin code I've done recently.
---

I wanted to create a simple cellular automaton with custom, pluggable rules. In case you're not familiar, a cellular automaton is a grid of cells that evolve over time based on rules that consider the states of neighboring cells. A well-known example is Conway’s Game of Life, where each cell is either alive or dead, and follows simple rules that can lead to surprisingly complex behavior.

Since I was testing the new AI provider, I submitted a set of simple automata rules requesting a code implementation. The result was (implementation omitted):

```kotlin
class GeneralizedCellularAutomaton(
    val width: Int, val height: Int,
    // impl params
) {
  fun setState(x: Int, y: Int, state: Int) {}
  fun getState(x: Int, y: Int): Int {}

  private fun getNeighbors(x: Int, y: Int): List<Int> {}

  fun step() {
    // implementation
  }

  fun forEach(action: (x: Int, y: Int, state: Int) -> Unit) {}
```

Besides the obviously wrong name, the implementation was almost descent: no surprise there. The next step is to extract the specific logic in `step()` from the generalcell state. Prompting to separate these, the AI returned:

```kotlin
abstract class CellularAutomaton(
    val width: Int,
    val height: Int
) {
    operator fun set(x: Int, y: Int, state: Int) {}
    operator fun get(x: Int, y: Int): Int {}
    fun forEach(action: (x: Int, y: Int, state: Int) -> Unit) {}
    protected fun getNeighbors(x: Int, y: Int): List<Int> {}

    abstract fun computeNextState(
        x: Int, y: Int,
        currentState: Int,
        neighbors: List<Int>
    ): Int

    fun step() {
      // uses the computeNextState()
    }
}
```

The previous `GeneralizedCellularAutomaton` class now extends this one, bringing in the custom logic.

This is a working result, but not a correct one. Clearly, the AI assumes that OOP and inheritance are the right approach, which is incorrect when a programming language supports functional concepts. So my next prompt was to use composition instead of inheritance:

```kotlin
class CellularAutomaton(
    val width: Int,
    val height: Int,
    private val ruleEngine: CellularAutomatonRules
) {
    operator fun set(x: Int, y: Int, state: Int) {}
    operator fun get(x: Int, y: Int): Int {}
    fun forEach(action: (x: Int, y: Int, state: Int) -> Unit) {}
    private fun neighbors(x: Int, y: Int): List<Int> {}
    fun step() { /*uses ruleEngine */}
}

interface CellularAutomatonRules {
    fun initalState(...) // forgotten by AI
    fun computeNextState(...): Int
    fun validateState(state: Int): Int
}
```

And there's the implementation of the `CustomCellularAutomatonRules` class. First, the AI "forgot" about the initial state of the cells in the cell engine; but that is fine. However, the AI _continues_ to think in OOP way: interfaces and implementations. Every implementation of `CellularAutomatonRules` is by default closed. Changing only the initial state would require explicit opening of the class due to yet another inheritance layer. In other words, inheritance introduces a strong - and unjustified - coupling between three functions.

Extracting set of rules as an interface is incorrect. Rules are simply a collection of functions applied to the internal state of the cellular automata. That being said, we can (manually) change the interface to simple `data class`:

```kotlin
data class CellularAutomataRules(
    val computeNextState: (...) -> Int,
    val validateState: (state: Int) -> Int = { it },
    val initialState: (...) -> Int
)
```

The previous "instance of interface" is now simple a new instance of data class, created by a straightforward function. Now, it's trivial to change any part of the triplet. Fun fact: switching to the data class didn't require any changes to the `CellularAutomaton` class.
