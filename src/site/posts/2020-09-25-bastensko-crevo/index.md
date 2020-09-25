---
title: "Baštensko crevo programiranja"
date: 2020-09-25T01:07:03+00:00
categories:
  - Razvoj
tag:
  - razvoj
  - programiranje
  - java
  - kotlin
  - skala
  - funkcionalno
  - monad
---

Jednom kada se savladaju osnove, kompozicija postane najvažnija veština baštovanstva.

<!--more-->

Neretko bacam drvlje i kamenje na [OOP](https://oblac.rs/otpor-oop-nasledjivanje/). Namerno preterujem; OOP je tek jedan programerski model koji radi to što treba da radi. Ono našta ukazujem nisu nedostaci OOP, kako to izgleda na prvi pogled, već namera da se OOP koristi kao rešenje _za sve_. Obučavanje sa tolikim fokusom na OOP je pogubno za razvoj mladog programerskog uma. Rezultat je imperativan način razmišljanja. Štos sa imperativnim je što nalikuje na naš svakodnevni model razmišljanja. Rekli bi da je to dobra stvar - sve dok ne uvidimo kompleksnost granjanja i svih slučajeva o kojima ne vodimo računa dok razmišljamo, a neophodni su za softversko projektovanje.

Jedanaestog oktobra 1964. [Doug McIlroy](https://en.wikipedia.org/wiki/Douglas_McIlroy) je na pisaćoj mašini otkucao sledeću zamisao:

> We should have some ways of coupling programs, like a garden hose, screw in another segment when it becomes necessary to massage data in another way.

Ova ideja se smatra polaznom za kasnije nastali moćan model Unix _pipe_-ova. Ako se u ovoj misli zameni pojam 'program' sa 'programska funkcija' dolazi se do principa kompozicije o kojem želim da pričamo.

## Connascence

Labavo uvezane komponente se smatraju osnovom dobre arhitekture, s razlogom. Imperativni OOP trpi jednu inherentnu čvrstu vezu: redosled izvršavanja programskih komponenti koje su povezane. Ne postoji mehanizam kojim se nameće ispravan redosled; na programeru je da sam ispravno pozove prvo jednu pa drugu komponentu, zatvori otvorene resurse ili ih otključa. Ovakvo uvezivanje komponenti se naziva "Connascence of Execution"; jedno od matrika pod meni neprevodivim imenom [Connascence](https://connascence.io). Inače, iznenađen sam da nema puno prilike da se čuje o ovim metrikama; dok dizajn paterne žurimo da istetoviramo čim pre.

Primer, primer... recimo: program koji traži ime i godine profesionalnog rada, pa ispisuje nivo seniornosti. Radim u Skali, što znači dve stvari: 1) neću umeti sve da objasnim, 2) koristim prednosti koje ne postoje u drugim jezicima. Kako bilo, trebalo bi da može da se isprati ideja.

```scala
println("Kako se zoveš?")
val name = readLine()
println("Koliko godina programiraš?")
readLine().toInt match {
  case x if 0 until 10 contains x => println(s"${name} je junior!")
  case x if 10 until 20 contains x => println(s"${name} je senior!")
  case _ => println(s"${name} je baš star/a!")
}
```

Kod deluje jasno - jer naš uvreženi imperativni način razmišljanja očitava samo srećnu putanju. Međutim, kod ne pokriva nikakve neispravne i pogrešne unose. Nema lakog načina da se testira. Ima ponavljanja. Ništa nije izdvojeno: kod je preplavljen vrednostima.

## Rekonstrukcija

Ako se vratimo bašti, ideja kompozicije komponenti (tj. funkcija) je da se _nastavljaju_ jedna na drugu. U programskim jezicima manjeg reda (nije diskriminacija, već klasifikacija) to se uglavnom može ostvariti sledećim trikom: rezultat jedne funkcije je ulaz za sledeću. U lepšim jezicima, kao što je Kotlin, stvari se i sintaksno i strukturno mogu dodatno oplemeniti, [pisao sam već o tome](https://oblac.rs/anemicni-servisi-krcati-domeni/). No hajde da vidimo kuda sve možemo otići u jeziku višeg reda, u vezi sa kompozicijom.

Funkcije koje upisuju na ekran ili čitaju unos nisu čiste: imaju sporedne efekte (_side-effect_). Da bi takve funkcije uopšte mogao da učinim delom kompozicije, uvodim `IO` monad. Ne treba preterano mistifikovati monad: prosto je kontejner za funkciju. Monad ima dve operacije kojima se menja to što kontejner obuhvata, i to je sve:

```scala
case class IO[A](run: () => A) {
  final def map[B](f: A => B): IO[B] = IO(() => f(run()))
  final def flatMap[B](f: A => IO[B]): IO[B] = IO(() => f(run()).run())
}
```

Tradicionalno se monad koji se bavi funkcijama sa sporednim efektima naziva `IO`. Nema potrebe da se kodira, dolazi u Cats ili ZIO bibliotekama; no ne smeta radi kompletnosti da ga ovde pišemo sami.

Sledeća je enkapsulacija čitanja i pisanja u konzolu:

```scala
trait Console[F[_]] {
  def writeStrLn(line: String): F[Unit]
  def readStrLn: F[String]
}
```

Ove funkcije ne izvršavaju pomenute operacije čitanja i pisanja. One vraćaju kontejner `F` koji će znati da izvrši pomenute radnje. Ovako:

```scala
val ConsoleIO: Console[IO] = new Console[IO] {
  override def writeStrLn(line: String): IO[Unit] = IO(() => println(line))
  override def readStrLn: IO[String] = IO(() => readLine())
}
```

Šta se ovde dešava i zašto? Ideja je da enkapsuliramo funkcije u kontejnere. Ako pratimo isti način imenovanja operacija nad kontejnerima, možemo da standardizujemo kako se ostvaruje kompozicija sadržaja kontejnera (tj. funkcija). A to donosi već veliku vrednost.

Prve dve linije imperativnog programa sada postaju:

```scala
ConsoleIO.writeStrLn("Kako se zoveš?")
  .flatMap(_ => ConsoleIO.readStrLn)
```

Rezultat ovog koda je novi `IO` monad, koji sada sadrži kompoziciju funkcija `println` i `readLine`. Nikakav kod se još uvek ne poziva, već se i dalje samo definiše kompozicija. Nastavak kompozije bi opet sledio pozivom `flatMap` i tako redom. Kul stvar je što nema potrebe čuvati povratne vrednosti u varijablama (kao što smo bili primorani da koristimo `name`), one će biti dostupne sve vreme u ovakvom uvezanom pozivanju funkcija.

Kako ugnježdena pozivanja nisu čitljiva, u Skali koristimo tkzv. `For Comprehensions` kao sintaksni šećer za čitljiviju kompoziciju monada:

```scala
val program = for {
  _    <- ConsoleIO.writeStrLn("Kako se zoveš?")
  name <- ConsoleIO.readStrLn
  _    <- ConsoleIO.writeStrLn("Koliko godina programiraš?")
  age  <- ConsoleIO.readStrLn
  _    <- IO(() => {
    age.toInt match {
      case x if 0 until 10 contains x => println(s"${name} je junior!")
      case x if 10 until 20 contains x => println(s"${name} je senior!")
      case _ => println(s"${name} je baš star/a!")
    }
  })
} yield ()

program.run()
```

U ovom koraku smo napravili kompoziciju 5 uvezanih `IO` monada. Skala ispod haube zove `flatMap` i trasformiše jedan monad u drugi. Ponavljam, kada imamo ujednačene strukture i operacije, lako je da programski jezik barata sa njima i ponudi sintakse koje uvećavaju upotrebljivost.

## Idemo dalje

Kod se može skratiti pomoćnim metodama:

```scala
def writeStrLn(string: String): IO[Unit] = ConsoleIO.writeStrLn(string)
def readStrLn(): IO[String] = ConsoleIO.readStrLn
```

Vreme je da rešimo parsiranje broja godina:

```scala
def parseInt(input: String): Option[Int] = Try(input.toInt).toOption
```

Program postaje:

```scala
val program = for {
  _    <- writeStrLn("Kako se zoveš?")
  name <- readStrLn()
  _    <- writeStrLn("Koliko godina programiraš?")
  age  <- readStrLn()
  _    <- parseInt(age).fold(writeStrLn("Error"))(ageInt => answer(name, ageInt))
} yield ()
```

## Malo teksta

Hajde da izdvojimo stringove i rešimo se opsednošću tim tipom: nema razloga da naše klase koriste uopštene tipove.

```scala
trait Text {
  def en: String
  def rs: String
  def in(f: (Text) => String): String = f(this)
}
```

Primera radi uvodimo multijezičnost, da bi pokazali mogućnost koju `String` ne može da ima. Implementacije su u kompanjonskom traitu:

```scala
object Text {
  case object WhatsYourName extends Text {
    override def en: String = "Whats your name?"
    override def rs: String = "Kako se zoveš?"
  }
  // ...
```

Funkcija kojom se definiše prevod može da izgleda ovako:

```scala
def serbian(text: Text): String = text.rs
```

da bi sve to lepo leglo kao _infix_ poziv:

```scala
def writeStrLn[F[_]: Console](text: Text): F[Unit] =
  Console[F].writeStrLn(text in serbian)
```

## Kraj

Raspon godina je takođe tip, enumeracija.

```scala
abstract case class Age() {
  def message(name: String): Text
}
object Age {
  def of(age: Int): Option[Age] = age match {
    case x if 0 until 10 contains x => Some(Junior)
    case x if 10 until 20 contains x => Some(Senior)
    case x if x > 20 => Some(Star)
    case _ => None
  }
}
object Junior extends Age {
  override def message(name: String): Text = Text.Junior(name)
}
// ...
```

Funkcija `answer` služi da procesira ulaz i vrati odgovarajuću poruku:

```scala
def answer(name: String, age: Option[Int]): Text =
  age
    .fold[Text](Text.InvalidInput)(
      Age.of(_).fold[Text](Text.InvalidAge)(
        age => age.message(name)))
```

Program konačno dobija ovaj oblik:

```scala
def main[F[_]]: IO[Unit] = for {
    _         <- writeStrLn(Text.WhatsYourName)
    name      <- readStrLn()
    _         <- writeStrLn(Text.HowManyYears)
    age       <- readStrLn().map(_.trim).map(parseInt)
    txt       <- answer(name, age)
    _         <- writeStrLn(txt)
  } yield ()
```

Nedostaje još samo `flatMap` u `Text`, pošto je rezultat `answer()` uključen u kompoziciju:

```scala
  sealed trait Text {
    def flatMap(f: Text => IO[Unit]): IO[Unit] = IO(() => f(this).run())
    // ...
```
A čak ne moramo da napravimo ceo monad of `Text`a.

## Posle kraja

Rezultujući program koristi kompoziciju funkcija. Pokriva pogrešan unos godina i neispravnu godinu; naterani smo dizajnom da o tome vodimo računa _odmah sada_, pre nego _možda posle_. To je nusefekat kompozicije: nema prečica, sve mora biti definisano kako bi tok programa nastavio izvršavanje.

Jbg, ko će sve ovo da isprati...
