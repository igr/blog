---
title: "TDD kuglanje i teča Bob"
date: 2020-05-03T01:07:03+00:00
categories:
  - Razvoj
meta:
  img: "ig.png"
tag:
  - tdd
  - razvoj
---

Postoji jedna TDD kata koja mi naročito privlači pažnju. Često imam problem s njom na radionicama. A pomalo i sa tečom Bobom.

<!--more-->

## TDD

Hajde prvo da se brzo dogovorimo šta je to **TDD**. Ako mislite da ima veze sa testiranjem, grešite.

> TDD je _razvoj u malim koracima_. Dakle: praksa dizajna softvera.

Ideja je da se razvija samo ono što je potrebno. Malim koracima (_baby steps_) dolazimo do cilja sigurnije, bez bojazni da preteramo sa _over-engineeringom_. Veća nego potrebna složenost je čest problem razvoja, a prirodni je sled stvari svakog rešavanja problema.

Testovi su samo alat. Isto kao i _refactoring_, koji je sastavni deo TDD ciklusa. Zapravo, on je važniji, ali o tome ću pisati drugi put.

Dalje: svaki korak razvoja u TDD je ili refaktoring ili dodavanje _jedne_ funkcionalnosti. Test pomaže da odredimo šta je sledeći mali korak i/ili da osiguramo izmenu. Prvo pišemo _najjednostavniji_ kod koji možemo da smislimo - pokazuje se da je ovo često problem. Smisao vežbanja TDD kata je i vežbanje ovog koraka. Takav kod se _obavezno_ kasnije refaktoriše; prvo pisanje dozvoljava svakakav kod dok god on zadovoljava testove.

## Kuglanje

Česta TDD kata je računanje rezultata za kuglanje. [Po uzoru na teču Boba](Bowling_Game_Kata.pdf), na radionicama pustim da prvo modeliramo problem na "standardan" način. Za tili čas se tu stvori nekakav klasni dijagram. Onda sve to obrišemo i krenemo da zajedno rešavamo katu na TDD način. Ideja je da se pokaže da postoji jednostavno rešenje koje ne zahteva nikakve klase i do koga se (relativno) lako dolazi TDD praksom.

Zadatak je opisan detaljno u priloženom PDF-u. Ukratko, igrač igra 10 puta - frejmova. U svakom frejmu se baca dva puta. Rezultat je jednak broju srušenih čunjeva. Ukoliko iz prvog bacanja sruši sve (strajk), frejm se završava, a kao bonus se dodaju vrednosti sledeća dva bacanja. Ukoliko iz dva puta sruši sve (sper), bonus je samo jedno sledeće bacanje. (Izvinite na traljavoj upotrebi engleskih reči, ne znam odgovarajuće prevode.)

Treba napisati klasu `Game` koja ima dve metode:

+ `roll(pins)` koja se poziva svaki put kada igrač baca kuglu,
+ `score()` poziva se na kraju igre i vraća rezultat.

Hajde da prođemo ovu katu zajedno. Ovde je radim u Skali.

## Ajde kato, koda brati

(Ubrzavam tempo da bi tekst bio kraći)

Krećemo od _minimalne funkcionalnosti_: kada igrač ne sruši ni jedan čunj, rezultat je 0. Kada sruši 1 čunj, rezultat je 1.

`Game` klasa posle ovih prvih koraka je:

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

Intermeco: tokom primenjivanja TDD prakse uočavaju se izvesni _obrasci usložnjavanja_ koda. Tako, na primer, jedan od obrazaca je i da se dozvole dva ponavljanja, dok treće ponavljanje ukazuje na potrebu za generalizacijom. Neki drugi obrasci su da `if` preraste u petlju, ili da se `if` pomera u blok petlje. Zanimljivo da nisam pronašao nikakvu literaturu na temu usložnjavanja koda. Kako bilo, ako nekog bude zanimalo više, možemo da uradimo zajedničko istraživanje.

Povratak na problem: imamo slučaj dva ponavljanja - postoje dva `if` bloka (drugi je implicitan), te treba generalizovati stvari. Naslućujemo da je rezultat pri 'slabim' bacanjima (kada se ne sruše svi čunjevi) jednak broju srušenih čunjeva, što pojednostavljuje kod:

```scala
override def score(): Int = {
  this.pins
}
```

Time smo rešili sva slaba bacanja. Vreme je da se posvetimo slučajevima kada se ruše svi čunjevi. Krećemo od strajka (bez posebnog razloga). Ako se sruše svi čunjevi u prvom frejmu, a u drugom sruši ukupno `7`, rezultat za prvi frejm je `10 + 7 = 17` poena. Ukupan rezultat posle drugog frejma je `17 + 7 = 24` poena.

Došli smo do ključnog dela, gde često stvari odu na različite strane, kako se pokazuje na radionicama. Smisao je da razvijamo u malim koracima. Šta bi onda bila najmanja promena koda koja rešava slučaj strajka (tj. gore opisan test)?

Prva izmena je uvođenje istorije: postaje očigledno da moramo da pamtimo sva bacanja. To zahteva refaktoring postojećeg koda. Umesto da kumulativno sabiramo srušene čunjeve, moramo da ih pamtimo.

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

Zašto `21` za veličinu niza? To je, jednostavno, maksimalni mogući broj bacanja.

Obrati pažnju da još uvek nismo uveli ništa novo. Nije modeliran, na primer, `frame`, što bi predstavljalo dodavanje novog koncepta. Iako smo napisali dosta koda, ovo je bio samo refaktoring kojim smo povratili jednu komponentu u programu, a to je istorija. Istorija je već postojala kao koncept, samo je nismo čuvali: bila je brisana kroz postojanje jedne varijable. Ponavljam, nismo dodali ništa novo, već povratili postojeći koncept (eto još jednog obrasca usložnjavanja).

Sada možemo dalje: kada imamo istoriju možemo da računamo bonus. Ovaj korak sada nije refaktoring, već je dodavanje nove funkcionalnosti. Bonus zavisi od budućih bacanja. Otuda, možemo da pišemo sledeće:

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

Pokrivanje slučaja za sper (_spare_) je sličan - minimalni korak bi mogao da bude sledeći:

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

Dodali smo još jedan `if` blok kojim proveravamo sper. Međutim, neophodna je i popravka u uslovu `while` petlje. Stavljamo vrednost `20`, jer je to najmanje što možemo da uradimo u ovom koraku. Svesni smo da je to magična vrednost, ubačena samo da bi test prošao, te da nam preostaje da je analiziramo (čitaj: pokrijemo testom). Nikako ne želimo da se bavimo ovom vrednošću u ovom koraku.

Sledeći korak proverava slučaj "savršene" igre: kada igrač neprestano obara sve čunjeve. Maksimalni broj bodova je `300`; gornji kod vraća `330`, upravo jer ne zna kada treba da stane. Zaključak je da moramo da brojimo frejmove, jer jedino tako znamo kada je kraj igre - broj bacanja nam to ne govori. Sledi zamena petlje, sada broji frejmove umesto bacanja:

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

Nismo gotovi - kod treba refaktorisati. Na primer:

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

Lepo, zar ne? Ipak nije sve tako sjajno: funkcije nisu _potpuno_ ispravne. Vezane su za `rollNdx`, očekujući da je sinhronizovan sa frejmom. Nažalost, ne postoji čista korelacija (u smislu "čistih funkcija") između frejma i bacanja, jer zavisi od istorije. Funkcija `isSpare` ima smisla samo ako je već detektovan strajk, na primer. To čini da funkcije ne rade potpuno ono za šta su predviđene da rade.

## Za to vreme...

Teča Bob je krenuo primer drugačije.

Prvo računa `score` pri svakom pozivu `roll()`. To je, naravno, pogrešno, što i sam Bob zaključuje na trećem testu. Šta je greška? Namera funkcije `roll()` nema nikakve veze sa rezultatom - ona služi isključivo da prihvata informaciju o srušenim čunjevima; to je sve što ona i treba da radi. Kako bilo, ovaj početak mi je razumljiv i s njim nemam problem.

Ono što pak upada u oči je odluka da se prebaci sa iteracije po bacanjima na iteraciju po frejmovima, u istom, trećem testu. Nije moguće suditi o primeru samo na osnovu prezentacije, jasno. Ipak, taj preuranjeni, ničim izazvan, refaktoring upravo narušava ideju TDD-a: menja se koncept bez prethodno jasnog razloga (_testa_). Mi smo gore došli do istog na pravilniji način, rekao bih.

Sledeća stvar su izdvojene funkcije, kao što je `isSpare(int frameIndex)`. Za razliku od mog primera, teča Bob se ove malo zaneo, pa koristi `rolls[frameIndex]` u kodu funkcije, što je naročito pogrešno. Ovaj izraz implicira jasnu korelaciju ove dve vrednosti, a to nije slučaj. Kolekciju `rolls` bi, u ovom primeru, isključivo trebalo čitati s `rollNdx`.

## Preterivanje ili ne?

Sigurno sve ovo nekome liči na preterivanje. Napiši ti kod koji radi danas, sinak, ne budi krelac. Meni ovo nisu tek sitnice: nagomilaju se i postanu lavina, koja nadođe kada ne treba. Ako ništa, bar je ilustracija da napisati jasan kod nije lako.

Što nas vraća na početak problema. Jedini način koji mogu da smislim, a da rezultuje kodom koji neće imati izazove je upravo klasni dijagram sa početka. I to, pomalo, zameram teči Bobu: njegov primer se može protumačiti i kao uput da je modeliranje klasama (tipovima) nešto kompleksno. To nije slučaj. Tipovi koji modeluju domen na jasan način su mnogo vrednije od funkcije koja koristi primitivne tipove za svoje izračunavanje. Šta više, ovakav pristup teče Boba je svojevrsni _code smell_, _primitive obsession_, od koga sve više želim da pobegnem u poslednje vreme.
