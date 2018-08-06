---
title: Lenji Consumer i Supplier
date: 2017-12-04T09:53:22+00:00
slug: lenji-consumer-i-supplier
categories:
  - Razvoj
tags:
  - consumer
  - funk
  - funkcionalno
  - java
  - java8
  - konfiguracija
  - razvoj
  - supplier
---

U poslednje vreme često koristim nešto što nazivam _lazy_ konfigurisanje. Da predstavim problem sledećim kodom:

```java
public class Starter {
	private Foo foo;
	private Bar bar;

	public void start() {
		// ...
		foo = new Foo();
		// ...
		bar = new Bar(foo);
		// ...
	}
}
```

U pitanju je kompozija par komponenti i njihovo kreiranje.

Problem nastaje kada želimo da _konfigurišemo_ instancu `Foo`. Dakle, negde nakon kreiranja instance `Foo` i njenog korišćenja u `Bar` treba je dohvatiti i dati korisniku da je konfiguriše. Očigledno, instancu ne možemo da dohvatimo pre poziva `start()`, tako da dodavanje _gettera_ `getFoo()` nema smisla. Neka tradicionalna rešenja bi uključivala, na pr., nasleđivanje `Starter` klase i uvođenja apstraktne metode za konfiguraciju; no ne smatram da je to dobar razlog zašto bi klasu trebalo naslediti.

## Consumer

Java8 dolazi sa `Consumer` funkcionalnom klasom, koja je sjajna za odgođena delovanja. Rešenje gornjeg problema se svodi da korisnik ne dohvata instancu `foo`, već da dostavlja kod (kao lambdu) koji će se baviti instancom, ali tek kada za to bude došlo vreme! Gornji kod sada postaje:

```java
public void start(Consumer<Foo> fooConsumer) {
	// ...
	foo = new Foo();
	fooConsumer.accept(foo);
	// ...
}
```

Idemo dalje: ovde mi se ne dopada to što `start()` prima argument; kako se povećava broj komponenti rastao bi i broj argumenata, a svakako bi bilo ružno za korišćenje. Umesto toga možemo da koristimo _builder_ obrazac i napravimo _fluent_ interfejs:

```java
public Starter withFoo(Consumer<Foo> fooConsumer) {
	fooConsumers.add(fooConsumer);
	return this;
}
```

Ne samo što smo uklonili argument(e) iz `start`() metode, već je omogućeno da korisnik dostavi više takvih blokova koda čuvajući te _consumere_ u listi. Korišćenje:

```java
starter
	.withFoo(foo -> foo.feature1(true))
  	.withFoo(foo -> foo.feature2(false))
  	.start();
```

Naravno, moglo je sve odraditi i bez lista i samo sa jednom pozivom `withFoo()`. Međutim, ovako dozvoljavamo da se 1) konfiguracija definiše na različitim mestima; i 2) da se može izdeliti na sitnije, logički bliske, korake.

## Supplier

Još jedna stvar ovde se može “ulenjiti”. `Bar` prima instancu `Foo`. Šta ako se desi da se `foo` promeni _nakon_ što ga je `Bar` preuzeo? Drugim rečima, moramo da vodimo računa da nakon što se kreira instanca `Bar` ne smemo da menjamo `foo`.

U pomoć dolazi druga Java8 klasa: `Supplier`. Menjamo konstruktor za `Bar`:

```java
public Bar(Supplier<Foo> fooSupplier) {
	this.fooSupplier = fooSupplier;
}
```

U konstruktoru ništa drugo i ne smemo da radimo što se tiče `foo`, inače ovo gubi smisao. Sada se `Bar` kreira ovako:

```java
bar = new Bar(() -> foo);
```

Šta god da se sada desi sa `foo` i nakon što smo kreirali `Bar` neće uticati na izvršavanje.

## Još Jedan Primer Za Consumer

Čest slučaj je registracija nekih klasa koje se kasnije instanciraju po potrebi:

```java
registerModule(MyModule.class);
registerModule(ThatModule.class);
```

Ponovo je potrebno konfigurisati instancu nekog modula, ali tek kada se on kreira, što može biti bilo kada u toku rada programa. I ovaj slučaj je zgodan za `Consumer`, koji se može dodati kao opcioni argument metode:

```java
registerModule(MyModule.class, module -> {
	module.setColor(123);
	module.setSize(456);
})
registerModule(ThatModule.class);
```

Sve što treba je da čuvamo i `Consumer` pored klase na koju se odnosi, te i da ga pozovemo jednom kada kreiramo instancu klase.

Što je lepo biti lenj 🙂