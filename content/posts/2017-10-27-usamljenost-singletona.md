---
title: Usamljenost singletona
date: 2017-10-27T11:11:22+00:00
slug: usamljenost-singletona
categories:
  - Razvoj
tags:
  - efikasnost
  - factory
  - java
  - lazy
  - memorija
  - pattern
  - singleton
  - sinhrono
  - volatile
---

Čini se da i digitalni vrapci znaju sve o singletonima; ipak često susrećem nepotpuno razumevanje teme. Izvinjavam se vrapcima u ime onih kojima je ova tema nova.

Većina greši u samom početku. _Singleton_ objekat postoji samo kao jedna instanca u svakom trenutku života programa, a dodao bih, i u datom kontekstu. Sa singletonom nema nikakvih problema, to je obična klasa; ovaj članak se zapravo ne bavi njima. S druge strane, _Singleton Factory_ je objekat koji održava singletone. O njima već ima šta da se kaže.

Da preskočimo banalne implementacije, Singleton Factory ima smisla jedino ako 1) ima metodu koja vraća instancu singletona, 2) ako je thread-safe, 3) ako singleton kreira _lazy_, i 4) ako je efikasan. Ovakav jedan Singleton Factory nema smisla:

```java
public class SingletonFactory {
	private Singleton instance;
	public synchronized Singleton get() {
		if (instance == null) {
			instance = new Singleton();
		}
		return instance;
	}
}
```

Iako ispravan, ne zadovoljava uslove: besmisleno je sinhronizovati metodu samo zarad jednog instanciranja, a uzrokujemo slabije performanse pri svakom potraživanju instance singletona.

Pametni ljudi smisliše _Double-Checking Lock_ (DCL) idiom:

```java
public class SingletonFactory {
	private Singleton instance;
	public Singleton get() {
		if (instance == null) {
			synchronized (this) {
				if (instance == null) {
					instance = new Singleton();
				}
			}
		}
		return instance;
	}
}
```

Naizgled, problem je rešen.

## Modeli

Java komunicira sa hardverom kroz formalni memorijski model: on je praktično adapter za fizičku memoriju koja radi na svim platformama. Dalje, Java kompajler može da izmeni redosled izvršavanja instrukcija, ali i da izmesti varijable u registre umesto u memoriju. Procesor može da izvršava instrukcije paralelno, čime se takođe remeti prvobitni redosled instrukcija. Keš može da se upiše nazad u memoriju u različitim trenucima. Sve ove optimizacije su dozvoljene u memorijskom modelu Jave, dok god se održava privid da se kod izvršava serijski kao što je napisan.

Threadovi u Javi alociraju i koriste lokalnu memoriju; koja se sinhroniše sa glavnom memorijom. Izmena u lokalnoj memoriji threada se propagira do glavne memorije; no to se može desiti bilo kada. Možemo reći da postoji problem _vidljivosti_: kada jedan thread izmeni vrednost varijable, nema garancije posle koliko vremena će drugi thread videti ovu izmenu.

Na scenu stupa `synchronized`. Većini ova ključna reč predstavlja samo muteks koji sprečava da više threadova izvršavaju kritičnu sekciju. Nije netačno, no `synchronized` uključuje i interakciju sa glavnom memorijom - predstavlja memorijsku barijeru koja forsira sinhronizaciju između lokalne memorije threada i glavne memorije. Konkretno: na izlasku iz `synchronized` bloka sva lokalna memorija se upisuje nazad u glavnu, a na ulasku u `synchronized` blok lokalna memorija se invalidira što uzrokuje čitanje iz glavne memorije.

Ove optimizacija su opravdane efikasnijim izvršavanjem programa.

## Dakle?

Dakle, može se desiti da se izraz u gornjem kodu koji kreira instancu singletona izvrši na sledeći način (predstavljeno pseudo-kodom):

```java
mem = alloc();		// alociraj memoriju za objekat
instance = mem;		// pridruži memoriju referenci
callCtor(instance);	// pozovi konstruktor radi inicijalizacije
```

Neka je thread A upravo završio drugi korak: objekat je kreiran, pridružen je `instance`, ali konstruktor nije pozvan. Drugi thread B je ušao u `get()` i kako referenca više nije `null` vraća nazad singleton kome konstruktor nije pozvan! To svakako nije ono što želimo da se ikada desi.

## Fiks; Ili: Bloch Nije Uvek U Pravu

Rešenje DCL problema je deklarisanje polja `instance` kao `volatile`. Polje klase označeno sa `volatile` čini da se čitanja i pisanja uvek izvršavaju direktno u i iz glavne memorije. Time se sve izmene varijable od strane jednog threada pravovremeno vide u ostalim threadovima - po cenu performansi. (Inače, ovo radi od Jave5).

Digresija: čika Bloch u knjizi “_Effective Java_” (2nd edition) pod stavkom **#71** navodi primer DCL u kome `volatile` vrednost prvo prepisuje u lokalnu varijablu. Razlog za dodatni korak su, kako tvrdi, bolje performanse: čak 25% bolje. Nažalost, ne navodi validan dokaz koji bi ovo potvrdio; s druge strane drastične razlike su uvek sumnjive (bar meni). [Ovaj put Bloch nije u pravu](https://github.com/igr/java-benchmarks/blob/master/src/main/java/com/oblac/jmh/lang/Item71Benchmark.java).

## Elegantni Singleton

Iako usamljen, ne znači da ne može da bude elegantan. Sledeće rešenje je baš takvo:

```java">public class SingletonFactory {
	public static Singleton get() {
		return SingletonValue.instance;
	}
	private static class SingletonValue {
		public static final Singleton instance = new Singleton();
	}
}
```

Ovde se oslanjamo na mehanizme koje već uzimamo zdravo za gotovo, kao na pr. da se inicijalizacija klase izvršava ekskluzivno, kao da i je _lazy_. Tek kada pozovemo `get()` prvi put, dolazi do prve inicijalizacije klase `SingletonValue`. Varijanta gornjeg primera koristi `enum` umesto dodatne klase, a svodi se na isto.

`post.getInstance().kraj();`