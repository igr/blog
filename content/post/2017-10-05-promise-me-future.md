---
title: Promise me future
date: 2017-10-05T09:53:22+00:00
slug: promise-me-future
categories:
  - Razvoj
tags:
  - asynchronous
  - future
  - izvršavanje
  - paralelno
  - promise
  - thread
---

U [prethodnom tekstu](https://oblac.rs/async-nonblocking) dotakao sam se pojma asinhronih operacija. One se izvršavaju nezavisno od _threada_ koji ih je startovao, a rezultat asinhrone operacije se može očekivati bilo kada.

<!--more-->

Postoji više softverskih konstrukta kojima se implementiraju asinhrone aplikacije. Najprostiji način je izvršavanje asinhronog koda u posebnom _threadu_ koji _callbackom_ obaveštava kada je posao završen. To je previše jednostavno za iole ozbiljniji rad sa asinhronim operacijama - teško je uvezivati ih, hvatati greške i sl.

Bolje implementacije su _Future_ i _Promise_.

## Future

_Future_ je softverski konstrukt koji predstavlja _handle_ za rezultat koji će se izračunati u budućnosti. _Future_ je _read-only_ **kontejner** za vrednost koja još uvek ne postoji. _Future_ se dobija asinhrono, ali ne znači da je non-blocking. To zavisi od momenta u kome zatreba vrednost koju _future_ predstavlja. Primer:

```java
Future<Double> primeFuture = runAsync(() -> {
    return calculateBigPrime();
});

// ...šta god...

primeFuture.get();	// blokirajuće
```

_Futur_ se u Javi konstruiše pomoću _ExecutorService_; kako god, gornji primer se ne razlikuje mnogo u drugim jezicima. Iako prosleđujemo kod kojim se određuje vrednost za _future_, suština je da ga on ne čini, već da _future_ određuje isključivo izračunata vrednost.

Iako zgodan, _future_ nije dovoljan. Pošto se po prirodi ne može menjati, nema lakog kombinovanja s drugom operacijom, niti nastavljanja asinhronog toka dalje. U trenutku kada nam zatreba vrednost, moramo je zahtevati sa `get()`, što može da blokira trenutni tok izvršavanja ukoliko vrednost koju _future_ predstavlja još uvek nije dostupna.

## Promise

_Promise_ je softverski konstrukt koji "obećava" da će **proizvesti** rezultat. _Promise_ je kontejner i za varijablu i za dodeljivanje vrednosti varijabli - nije read-only; uključuje dakle i sam kod dodele. _Promise_ vraća svoju varijablu kao _future_ i može ga kompletirati (rezultatom ili _exceptionom_). _Promise_ se može zamisliti kao _future_ sa javnom `set()` metodom kroz koju se može upisati vrednost za _future_ koji vraća.

Evo sjajnog primera koji ilustruje _Promise_:

```java
Supplier<Integer> novcanik = ()-> {
	try {
		Thread.sleep(1000); 	// mama je zauzeta
    } catch (InterruptedException e) {}
	return 100;
};

CompletableFuture<Integer> promise =
	CompletableFuture.supplyAsync(momsPurse);
```

Svi smo nekada kamčili novac od roditelja. U ovom primeru ga tražimo od mame, koja obećava da će dati, ali ne odmah. Mama nam je, dakle, vratila _promise_ . Kao dobro vaspitani klinci, zahvalićemo se onog trenutka kada novac dobijemo:

```java
promise.thenAccept(v -> System.out.println("Hvala za " + v));
```

Ova linija upravo pokazuje svu lepotu _promisa_: nastavljanje toka, tj. povezivanje operacija. Da, _future_ su monadi asihronog programiranja.

Na scenu stupa strogi tata, koji zaključuje da je mamin plan suviše darežljiv, te odlučuje da smanji novčani iznos dok je mama još uvek zauzeta:

```java
promise.complete(10);
```

To momentalno ispunjava _promise_ i mi kažemo:

```bash
> Hvala za 10
```

Mamin _promise_ je ispunjen, ali ne na način kako je to prvobitno zamišljeno.

## Sumarno i sažeto

TL;DR: _future_ i _promise_ su dve strane asinhrone operacije: **_consumer_** i **_producer_**.