---
title: Brojimo zajedno
date: 2017-10-13T09:53:22+00:00
slug: brojimo-zajedno
categories:
  - Razvoj
tags:
  - asynchronous
  - brzina
  - java
  - java9
  - optimizacija
  - paralelno
  - performanse
  - razvoj
---

Zahtev ne može biti jednostavniji: odrediti ukupan broj poseta skupu stranica na prometnom sajtu, kako bi se obračunala naplata određene usluge.

<!--more-->

Prosto, zar ne?

## Naivni pristup

Uvodimo jednostavan brojač:

```java
public class Counter {
	private long counter = 0;
	public void increment() {
		counter++;
	}
	public long count() {
		return counter;
	}
}
```

Podelimo referencu na istu instancu brojača svim stranama i beležimo posetu. Gotovo: u produkciji sve radi, dobijaju se prve brojke. Tapšemo sami sebe po leđima i divimo se rešenju. Vreme je za povišicu 🙂

## Paralelni univerzum

Problem sa brojačem je što je naizgled sve kako treba. Kao što je to uvek i slučaj u _multi-threading_ okruženju, nije jednostavno uočiti problem.

Hajdemo prvo da to dokažemo:

```java
public void executeParallel(Runnable runnable) {
	ExecutorService executor = Executors.newCachedThreadPool();
	for (int i = 0; i < 10_000_000; i++) {
		executor.execute(runnable);
	}
	executor.shutdown();
	executor.awaitTermination(1, TimeUnit.DAYS);
}
```

Test bi izgledao ovako:

```java
Counter counter = new Counter();
executeParallel(counter::increment);
System.out.println(counter.count());
```

Mogući rezultat: `9879737`. Gde je nestalo 120 hiljada poseta?!

## Atomske operacije

Odgovor je zapravo jednostavan: instrukcija `counter++` **nije** atomska. Ne postoji garancija da će raditi ispravno u _multi-threading_ okruženju. Razlog zašto nije atomska se krije u bajtkodu. Ova Java instrukcija se pretvara u nekoliko bajtkod instrukcija koje rade sledeće: očitavaju vrednost registra, povećavaju je za jedan i upisuju vrednost nazad. Dva _threada_ mogu da prođu kroz ove bajtkod instrukcije bilo kojim redosledom; jasno se uočava slučaj koji dovodi do toga da se vrednost varijable ne uvećava.

Ma koliko da je jednostavna neka Java instrukcija, ona često nije i atomska. Kako ovo rešiti?

## Synchronized

Da, da, dobro; deklarisaćemo metod sa `synchronized` i rešili smo problem. Pa... donekle. Sada sve stranice koje koriste brojač moraju da _čekaju_ da se on oslobodi. Što uzrokuje smanjenje performansi. Jer `synchronized` je i dalje skupa operacija i predstavlja tačku kroz koju svi _threadovi_ moraju da prođu serijski, jedan za drugim, iako je suština da upravo rade paralelno.

Zar ne postoji nešto što radi bolje?

## Volatile

Sigurno jedna od najmanje korišćenih ključnih reči u Javi je `volatile`. Ako ste čuli za nju i znate šta radi - sjajno 🙂 Ukratko, kada neku varijablu obeležimo sa `volatile` time naznačavamo da je njena vrednost promenljive prirode; na pr. da će biti izmenjena od strane više _threadova_. JVM teži da optimizuje kod, pa ima običaj da kešira varijable u okviru jednog _threada_, kako ne bi stalno iznova očitavao vrednost varijable. Ova optimizacija se isključuje sa _volatile_, čime se varijabla uvek očitava sa svog izvora. JVM čak implicitno sinhronizuje pristup _volatile_ varijablama: čitanje _volatile_ varijable i upisivanje u _volatile_ varijablu je svaka za sebe _synchronized_.

Ali to i dalje ne čini operacije nad _volatile_ varijablama atomskim!

## AtomicLong

"Atomski s leva", prisećaju se svi koji su služili vojsci. Java 5 donosi sjajnu klasu: `AtomicLong` koja upravo odgovara našem problemu performantnih i atomskih operacija nad nekom varijablom. U našem slučaju bi koristili `getAndIncrement()` i `get()` metode koja su garantovano atomske:

```java
AtomicLong atomicLong = new AtomicLong(0);
executeParallel(atomicLong::getAndIncrement);
System.out.println(atomicLong.get());
```

Ispod haube se dešava "magija" koja uključuje i famoznu `Unsafe` klasu; pogledajte sors za detalje. Kako bilo, ovo rešenje je bolje jer ne uključuje Javin `synchronized` mehanizam.

Može li to još bolje i brže?

## LongAdder

Sa Javom 8 dolazi vrlo interesantna klasa: `LongAdder`, namenjena isključivo brojanju; radi brže, a ne koristi `Unsafe` magiju! Ukratko: svaki thread za sebe inkrementira svoj brojač, da bi se ovi brojači sabrali u trenutku kada se rezultat očitava. Time operacije brojanja postaju atomske:

```java
LongAdder longAdder = new LongAdder();
executeParallel(longAdder::increment);
System.out.println(longAdder.intValue());
```

Uočavamo da ne postoji atomska operacija slična `getAndIncrement()` koja bi vratila tačnu vrednost u upravo ovom trenutku. I to je u redu, pošto očitavanje _nije_ problem. Da podsetim: problem je u "izgubljenim" operacijama uvećavanja vrednosti varijable; dakle, pri pisanju. `LongAdder` obezbeđuje da izmena vrednosti bude atomska.

## VarHandle

Zašto bi tu stali? Java 9 donosi generalizaciju principa iz `AtomicLong` klase kao `VarHandle`. Reč je zapravo o _wrapperu_ oko varijable koji obezbeđuje atomska svojstva osnovnih operacija. Naš brojač može da izgleda ovako:

```java
public class Counter {
	private long counter = 0;
	final VarHandle counterVarHandle;

	public VarHandleCounter() {
		counterVarHandle = MethodHandles
			.lookup()
			.in(VarHandleCounter.class)
			.findVarHandle(
				VarHandleCounter.class, "counter", long.class);
	}

	public void increment() {
		counterVarHandle.getAndAdd(this, 1);
	}
	public long count() {
		return (long) counterVarHandle.get(this);
	}
```

Sada se brojač može koristiti bezbedno u _multi-thread_ okruženju.

## A samo sam hteo da...

Ovo putovanje kroz primere asinhronog inkrementiranja zapravo pokazuje koliko je teško razvijati kod koji se koristi u _multi-thread_ okruženju. Lako je pogrešiti, a teško je uočiti problem. I to je prirodna stvar; prosto nismo napravljeni da razmišljamo na takav način. Zato se slažem sa mišljenjem da sam programski jezik pruži rešenja i konstrukte za paralelna izvršavanja; drugim rečima da se izmesti implementacija podrške paralelnog izvršavanja iz koda i ugrade u jezik. Neki programski jezici to nude od samog početka; nažalost, to se ne dešava sa Javom. Šteta.

Ako vam se posle svega ovoga vrti u glavi, sve je ok; udahnite duboko i brojite u sebi... ili možda ne:)
