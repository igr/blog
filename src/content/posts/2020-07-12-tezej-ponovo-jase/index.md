---
title: "Tezej ponovo jaše"
date: 2020-07-14T01:07:03+00:00
slug: tezej-ponovo-jase
description: >
  Gotovo godinu i po dana je Tezej čekao da se njegova potraga za Minotaurom prekodira na drugačiji način.
---

Gotovo godinu i po dana je Tezej čekao da se njegova potraga za Minotaurom prekodira na drugačiji način.

## Recenzija prethodnog

[Prethodni put](/tezej-protiv-minotaura/) sam problemu pristupio onako kako bi to očekivali na intervjuu za posao, školski. Sors sam ostavio u ponešto nedovršenom stanju (delimično namerno), te sam dužan da ga prvo diseciram.

Najveća primedba, zbog koje i pišem ovaj članak, je upravo to što klase rade previše toga. Sve što se može raditi (glagoli, dakle) se nalazi u metodama klasa. Heroj može i da ubije i oseti i da se pomera... Neko će reći da je zaista tako - pa Tezej je taj koji izvšava radnju postavljanja sveće, ko drugi?

Stvari možemo da gledamo i drugačije. Tezej je taj koji ima _sposobnost_ obavljanja radnje. Sam čin, akcija (glagol) **ne mora** biti uvrežena sa subjektom. Šta više, to je prirodniji način razmišljanja, jer akcija je rezultat veštine, svojstva, kojeg subjekat može, a i ne mora da ima. Drugim rečima, nema posebnog razloga da implementacija akcije bude u izvršiocu. To što OOP to dozvoljava i nameće, ne znači da tako mora da bude. Ideja je da preokrenemo redosled: umesto da Tezej uradi nešto, mi ćemo nešto uraditi s Tezejom koji zna da to radi. Umesto `thesus.enterCavern()` kažemo: `theseus(enterCavern)`.

[Bla, bla](https://blablaigor.com), pa koliko može biti važna razlika između `a.foo()` i `a(foo)`? Tačka manje? Jel to sve pitanje samo sintakse?

Ogromna i ne, to su odgovori. Postoje dve najjače veze u programiranju, koje neumitno uvezuju programske elemente. Jedna veza je svima poznata: `new` kojom se pravi konkretna instanca neke klase. Od tog trenutka nadalje, konkretni tip je uvezan za taj deo koda. Zato postoji nekoliko obrazaca i principa koji služe da 'olabave' ovu vezu, kao što su _Factory_ obrazac ili IoC princip.

Druga veza je ona koju prihvatamo zdravo za gotovo: `.` (tačka). Tačkom prizivamo metodu koja je upisana (deklarisana) u nekoj klasi - i ta metoda ostaje tu zauvek. OOP nam dozvoljava da donekle promenimo ponašanje nasleđivanjem (pogrešno je menjati), no metoda ostaje zauvek vezana za klasu.

Zbog toga ostatak koda trpi. Recimo, `Cavern` čuva i ime, dozvoljava dodavanje novog prolaza, prihvata sveće i traži sledeće prihvatljive prolaze. Tako klasa postane bućkuriš svega. Skaliraj i dobijaš nerazumno i neodrživo.

## Tezej 2.0

Napomena: ono što sledi je _samo jedan_ način kako drugačije pristupiti problemu. Bitan je koncept, ne detalji. Realizacija sigurno može i drugačije (i zrelije). Biram Kotlin, jer je blizak Javi.

Da ne dužim, [rešenje](https://github.com/igr/void/tree/master/src/main/kotlin/challenge/tvsm) može da izgleda i ovako:

```kotlin
HeroAndCandles(minotaur, candles).run {
	senseCandleInNextCavern(this)
}.ifCandleSeen {
	turnBack(it)
}

minotaur(enterCavern)
theseus(enterCavern)

HeroAndCandles(theseus, candles).apply {
	putCandleInHeroesCavern(this)
}

checkPlace(heroes())
	.inSamePlace {
		TheseusKillMinotaur(it)
	}
	.also { if (it) return@solve }

minotaur(enterLeftUnmarkedExit)
theseus(enterRightUnmarkedExit)

checkPlace(heroes())
	.inSamePlace {
		MinotaurKillTheseus(it)
	}
	.also { if (it) return@solve }
```

Kotlin ima ograničenja, te ne mogu napisati sve kako bih zaista želeo. Otuda ove `if (it)` pitalice kojima se prekida okolna `while` petlja, pošto je to jedino moguće uraditi iz `inline` funkcija.

Zanimljiv deo je inicijalizacija cele pećine - parsiranje fajla, kreiranje i uvezivanje objekata. Kako želim da ovi objekti budu nepromenljivi (_immutable_), pravim dve verzije objekata - osnovnu i nasleđenu `mutable` verziju. Tokom kreiranja koristim promenljive objekte, koje jednom kada se završi parsiranje, čuvam nadalje kao nepromenljive.

Stanje pratim u klasama heroja. One nisu nepromenljive - i to bi bila velika zamerka rešenju. Ispostavlja se da to i nije tako lako postići (što je tema za neku drugu diskusiju). Heroj se zapravo bavi samo jednim - svojom pozicijom. Preciznije: heroj zna da postoji ili u prolazu ili u pećini, te i da može da se pomeri. Sama pozicija se prati u zasebnoj klasi. Time smo odvojili korišćenje pozicije i praćenje pozicije.

Tu negde i prestaje potreba za OOP. Pazi sada ovu misao: OOP ima smisla u modelovanju _stanja_. Ponašanje, akciju, glagole pišemo u _funkcijama_.

U rešenju ih imam svega nekoliko, kao što sve vidi iz koda. Ono što se ne vidi je postojanje konteksta u kome se gornji kod izvršava. Tu su funkcije `minotaur()` i `theseus()` koje zapravo obični konzjumeri: `(Hero) -> Unit` i služe da naprave novi kontekst od određenog heroja. Raznovrsnosti radi, preostala dva konteksta su obične data klase `TwoHeroes` i `HeroAndCandles`.

U rešenju sam insistirao da funkcije imaju samo jedan ulazni parametar. U Kotlinu ne postoji _currying_ u samoj sintaksi, već se mora konstruisati eksplicitno; to ovde nije primenjeno, a moglo je. Nažalost, kao što pomenuh, funkcije nisu čiste, jer menjaju ulazni parametar.

Takođe nema korišćenja `if` van implementacija funkcija. Na mestima gde se ostvaruje neki upit (ima li sveće u sledećoj pećini?), ne vraćam `boolean`, već prilagođen objekat sličan `Maybe` koji izvršava blok ukoliko je upit potvrdan.

Zanimljiva je i upotreba Kotlinovih standardnih funkcija: `run`, `apply`, `also` i `with`. One su vrlo vredne za uvezivanje funkcija: rezultat prethodnog poziva postaje argument ili kontekst lambda funkcije koja se sledeća izvršava: nema više potrebe čuvati rezultat u privremenoj varijabli koja traje samo do narednog poziva.

## Legenda i dalje traje

Kotlin je neosporno komotniji i zreliji jezik od starmale Jave. Međutim, osećam ograničenja u iskazivanju na pojedinim mestima: ili jezikom ili sopstvenim neznanjem. Jurnjava Tezeja i Minotaura je dobar primer za testiranje agilnosti programskog jezika. Ipak, ne treba smetnuti sa uma da smo prestali da pišemo algoritme i da je naš dnevni kod jednostavniji, gotovo trivijalan. Kako bilo, iako je Kotlin komotniji, nema razloga ostati na njemu. Čini se da Scala zapravo uspeva da pogodi pravo mesto. O tome više drugi put, kada budem znao više.

Deo koji mi nedostaje su upravo načini kako se ispravnije radi kompozicija funkcija. Poznajem algebarske strukture, ali ne uspevam da odem dalje od prostog mapiranja (`functor`), a ne vidim potrebu da po svaku cenu impementiram `aplicative` ili `monad` ako neću koristiti sve njihove osobine. Sam Kotlin ovde ne pomaže mnogo, te bih možda tek sa [Arrow](https://arrow-kt.io) stvari izgledale bolje. Zato bih i da što pre odvedem heroje dublje u Scalu; tamo slobodnije mogu da kombinujem i uvezujem programske komponente.

Bilo bi sjajno diskutovati na ovu temu uživo. Verujem da je ovakav pristup programiranju zdraviji.
