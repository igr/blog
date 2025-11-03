---
title: "Effects"
date: 2025-11-04T01:06:08+00:00
slug: "effects"
lang: en
description: Just Effects.
---

An effect is any interaction with the outside world or computational context that goes beyond pure computation.

_Pure functions_ are deterministic functions that do not perform any side-effects. They simply take inputs and return outputs with no other observable behavior. They are also referentially transparent, meaning that they always produce the same output for the same input. They are perfect for performing _lazy evaluation_: _when_ they execute doesn't matter, _only if_ they need to execute at all!

For example, in Haskell, evaluation is lazy by default (unless explicitly marked as `strict`). This expression is not evaluated until its result is needed:

```haskell
expensiveList = map (*2) [1..1000000]
```

Back to the effects: when a function does something more (reading from a file, throwing an exception, maintaining state, or performing asynchronous computation), it's performing an effect.

_Effects represent the "how" of computation, not just the "what."_ They capture the context in which a computation happens and the side effects it may produce.

What about impure functions? Well, we may treat "impure" and "effectful" as synonyms. If we want to be precise (and if I understand correctly):

+ Impure = not referentially transparent (e.g. `currentTime`, `random` functions)
+ Effectless = doesn't perform I/O, mutation, exceptions, etc.

## Categories of Effects

In functional programming, we recognize several categories of effects:

+ **Option/Maybe Effect**: Represents computations that might fail to produce a value. Instead of throwing exceptions or returning `null`, you get `Some(value)` or `None`.
+ **Either/Result Effect**: Similar to `Option`, but carries error information. Returns either `Right(success)` or `Left(error)`.
+ **Input/Output (IO) Effect**: Effects that involve reading from or writing to the outside world, such as reading from a file or printing to the console. These are inherently impure operations that we wrap in a functional interface.
+ **State Effect**: Carries mutable state through a computation in a functional way, allowing you to read and modify state without actual mutation.
+ **Reader Effect**: Provides access to some shared environment or configuration that's passed through the computation.
+ **Writer Effect**: Accumulates output (like logs) alongside the main computation.
+ **Asynchronous Computation (Async/Future) Effect**: Represents asynchronous computations that will complete at some point in the future, such as making network requests or scheduling tasks.
+ **List/Nondeterminism Effect**: Represents multiple possible outcomes or branching computations.
+ **Exception Handling**: Effects that involve handling errors or exceptions, such as catching and rethrowing exceptions.

There are three major approaches to modeling effects:

+ Monadic Effects: the traditional approach where effects are modeled as monads that you compose using monadic operations.
+ Algebraic Effects: a more modern approach where effects are defined as abstract operations with handlers that interpret them.
+ Direct-Style Algebraic Effects (also called "Effect Handlers with Direct Style"): the newest evolution, combining algebraic effects with syntax that looks like direct imperative code.

Imho, there are two important dimensions regarding the approach: how the effects are combined (how we build programs) and how they are later used (how they are interpreted).

## Monadic Effects Example: Scala + Cats

Monadic Effects Philosophy: Effects are types that form monads. We compose them using `flatMap/>>=` and monad transformers.

Characteristics:

+ Effects are "baked into" the type
+ Composition happens through the monadic bind operation
+ Order of effect composition matters (monad transformer stack order)
+ Each effect needs explicit lifting through transformer layers

Frictions:

+ Complex type signatures
+ Order-dependent transformer stacks
+ Performance overhead from multiple layers
+ Difficult to add/remove effects later

```scala
object MinimalMonadTransformer extends IOApp {

  type Result[A] = StateT[IO, Int, A]

  def increment: Result[Unit] = StateT.modify[IO, Int](_ + 1)

  def greet(name: String): Result[String] = for {
    _ <- increment
    msg <- StateT.liftF(IO(s"Hello, $name!"))
  } yield msg

  def run(args: List[String]): IO[ExitCode] = for {
    result <- greet("World").run(0)
    (count, message) = result
    _ <- IO(println(s"$message (operations: $count)"))
  } yield ExitCode.Success
}
```

Even if you don't know Scala, you can still understand the basic concepts of effects and monads.

+ Effect #1: `State` - holds a counter through the computation, modified by `increment`
+ Effect #2: `IO` - holds a string for console output (created in `IO(s"Hello, $name!")`, printed with `IO.println`)

These two effects are combined using the `StateT` monad transformer, which allows us to sequence computations that involve both state and side effects. `StateT[IO, Int, A]` means "a stateful computation that produces a value of type `A`, carries state of type `Int`, and performs IO effects." The `StateT` transformer wraps the `IO` monad, adding state-threading capabilities on top.

To summarize: we combine effects using monad transformers, which allow us to sequence computations. Monad transformers are a powerful tool for building complex programs with multiple effects; but they can also be tricky to use correctly. It's important to understand the underlying monads and how they interact with each other.

The same code, but in Haskell:

```haskell
import Control.Monad.State

type Result a = StateT Int IO a

increment :: Result ()
increment = modify (+ 1)

greet :: String -> Result String
greet name = do
  increment
  return $ "Hello, " ++ name ++ "!"

main :: IO ()
main = do
  (message, count) <- runStateT (greet "World") 0
  putStrLn $ message ++ " (operations: " ++ show count ++ ")"
```

## Algebraic Effects Example: Scala + Cats

Algebraic Effects Philosophy: Effects are defined as abstract operations (an algebra) separate from their interpretation. Handlers provide the implementation.

Characteristics:

+ Effects are declared as operations, not types
+ Order of effects doesn't matter in the type
+ Handlers interpret effects at the edges
+ More flexible composition

```scala
trait Counter[F[_]] {
  def increment: F[Unit]
  def get: F[Int]
}

object CounterProgram {
  def greet[F[_] : Monad : Console](name: String)(implicit C: Counter[F]): F[String] =
    for {
      _ <- C.increment
      count <- C.get
      msg = s"Hello, $name!"
      _ <- Console[F].println(s"$msg (operations: $count)")
    } yield msg
}

object CounterInterpreter {
  def refCounter[F[_] : Sync](ref: Ref[F, Int]): Counter[F] = new Counter[F] {
    def increment: F[Unit] = ref.update(_ + 1)
    def get: F[Int] = ref.get
  }
}

object MinimalAlgebraicEffects extends IOApp.Simple {
  import CounterInterpreter.*
  import CounterProgram.*

  def run: IO[Unit] =
    Ref.of[IO, Int](0).flatMap { ref =>
      implicit val counter: Counter[IO] = refCounter[IO](ref)
      greet[IO]("World").void
    }
}
```

Key concepts to understand:

+ `Counter[F[_]]` - the effect interface (algebra) - what operations are available
+ `greet[F[_]]` - business logic (program) that's generic in `F` - it doesn't know if it's using `IO`, `State`, or something else.
`refCounter` - concrete interpreter (handler) that implements Counter using `Ref[F, Int]`

This is an example of separation of concerns:

+ Define WHAT you want to do in the algebra
+ Write business logic generically in the program
+ Decide HOW to run it with the interpreter

## Direct-Style Algebraic Effects: Kotlin

Philosophy: Write code that looks imperative/direct, but effects are tracked by the type system and handled algebraically.

Characteristics:

+ Looks like imperative code (no explicit `flatMap`/`bind`)
+ Effects are tracked in types
+ Handlers interpret effects
+ Best of both worlds: readability + safety

```kotlin
// Effect interfaces (algebra)
interface Counter {
    fun increment()
    fun get(): Int
}

interface Logger {
    fun log(message: String)
}

// Business logic using context parameters
context(counter: Counter, logger: Logger)
fun greet(name: String): String {
    counter.increment()
    val count = counter.get()
    val msg = "Hello, $name!"
    logger.log("$msg (operations: $count)")
    return msg
}

// Concrete interpreter using AtomicInteger
class AtomicCounter(private val ref: AtomicInteger = AtomicInteger(0)) : Counter {
    override fun increment() {
        ref.incrementAndGet()
    }
    override fun get(): Int = ref.get()
}
class ConsoleLogger : Logger {
    override fun log(message: String) {
        println("[LOG] $message")
    }
}

// Run the program
fun main() {
    val counter = AtomicCounter()
    val logger = ConsoleLogger()
    context(counter, logger) {
      val message = greet("World")
      println("Result: $message")
    }
}
```

Key concepts are the same: algebra + program + handler. However, the direct-style approach offers a balance between readability and safety, as it allows for imperative-looking code while ensuring that effects are tracked and handled algebraically.

Why Kotlin? To demonstrate that effects and handlers can be modeled in a type-safe
way even in languages without native effect systems. Kotlin isn't a purely functional
language: it uses eager evaluation, and its context parameters are not limited to effects (e.g. they are implicit context passing for dependency injection, configuration/environment passing, DSL builders, transaction scopes - and yes, effect handlers.)

However, context parameters provide exactly what we need for effect handlers: a way
to thread capabilities through a call stack in a type-safe manner without explicit
parameter passing.

## Finally

This is just a small peek into effect systems; there’s still so much more to learn. I’m definitely not an expert, but I really like where things are going.

From what I can tell, programming languages are moving toward direct-style algebraic effects, which bring together the safety of effect tracking and the readability of imperative code. Cool!
