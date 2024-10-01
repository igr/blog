---
title: "Bolji od dva"
date: 2024-10-01T01:06:08+00:00
slug: "bolji-od-dva"
description: "Koji je od dva koda bolji i zašto?"
---

Primer iz Kluba programera koji mi je nedavno privukao pažnju.
Prebacio sam ga u Javu. Koji je od ova dva koda bolji?

## A) Statičke metode

```java
private static String encodeToIso88591(String str) {
	var encodedStr = new StringBuilder();
	for (char c : str.toCharArray()) {
		if (c > 255) {
			throw new IllegalArgumentException();
		}
		encodedStr.append(c);
	}
	return encodedStr.toString();
}
```

## B) Klasa

```java
public class Iso88591String {
	private String str;
	public Iso88591String(String str) {
		this.str = str;
	}

	@Override
	public String toString() {
		var encodedStr = new StringBuilder();
		for (char c : str.toCharArray()) {
			if (c > 255) {
				throw new IllegalArgumentException();
			}
			encodedStr.append(c);
		}
		return encodedStr.toString();
	}

	public String getDecoded() {
		var decodedStr = new StringBuilder();
		for (char c : str.toCharArray()) {
			decodedStr.append(c);
		}
		return decodedStr.toString();
	}
}
```

## Poređenje

Za kod **A** možemo reći:

+ ima manje poziva, pa je malo brži;
+ nije testabilan, jer su metode `private`.

Za kod **B** možemo reći:

+ testabilan je;
+ enkapsulira logiku u klasi;
+ više poziva, instanciranje, nešto sporiji.

Koji je bolji i zašto? Zastanite na trenutak, razmislite i dajte svoj odgovor.

Hajdemo po redu.

## Brzina izvršavanja

Gornje rezonovanje o performansama koda je često pogrešno. Zaboravljamo da radimo na modernim VM, koji su godinama unazad optimizovane. Ono što je imalo smisla pre nekih 20-tak godina, danas ne važi: VM je toliko optimizovana da ne možemo da razmišljamo na isti način. Svaku diskusiju koja se vodi sličnim rezonovanjem gledam da što pre prekinem, jer spada u imaginaciju, a ne preciznu analizu.

Pošto mi ne verujete (s razlogom, nemam YT kanal), napravio sam [test performansi](https://github.com/igr/java-benchmarks/blob/master/src/main/java/com/oblac/jmh/lang/IsoEncodeBenchmark.java). Rezultat je očekivan: razlike nema.

```text
Benchmark   (size)  Mode  Cnt      Score     Error  Units
withClass       32  avgt   25     87.113 ±   2.353  ns/op
withClass      128  avgt   25    188.925 ±   1.020  ns/op
withClass     1024  avgt   25   1553.195 ±   8.505  ns/op
withClass    32768  avgt   25  48765.192 ± 576.917  ns/op
withMethod      32  avgt   25     88.350 ±   3.025  ns/op
withMethod     128  avgt   25    189.265 ±   2.427  ns/op
withMethod    1024  avgt   25   1571.427 ±  23.476  ns/op
withMethod   32768  avgt   25  48565.216 ± 198.854  ns/op
```

Test je dobijen JMH-om (a čime drugim) nad stringovima različitih dužina.

## Testabilnost

Jasno, kod **A** nije dostupan za testove. Što i dalje ne znači da je kod lošiji, ukoliko možemo da mu promenimo vidljivost. A trebalo bi da to možemo, jer nema razloga da ovakve metode ostanu privatne. Ako ju je već potrebno sakriti, može da ostane interna za modul ili samo za paket.

## Enkapsulacija

Kada ugledamo kod **B**, OOP-ovac u nama usklikne s ljubavlju: tamo potok, ovde klasa, tamo cvet, ovde enkapsulacija. Kao što lasta ne čini proleće, klasa ne čini kod ispravnim. Štaviše, kod **B** je baš, baš loš.

Naime, reč je o pokušaju da se definiše novi tip. Setimo se, tipovi su [podskupi vrednosti](https://oblac.rs/oop-kakav-tip-rece-klasa/). Dakle, ne bi uopšte trebalo biti moguće napraviti instancu s neispravnom vrednošću. Kao što ne bi imalo smisla pisati: `new Integer("12.5")` i da tek ko zna kada kasnije pri upotrebi proveravamo da li je zaista prosleđen ispravan string, tako i ovde - provera (ujedno i konverzija) treba da se desi prilikom kreiranja instance.

Sve da i nije tako, koristiti `toString()` za bilo šta drugo osim za reprezentaciju objekta je pogrešno. To što nam je `toString` dostupno usled grešnog nasleđivanja nije razlog da se koristi za biznis funkcionalnost. Kako je ovde smisao konverzija (zapravo, smisao je novi tip, ali hajde da zažmurimo), ne bi trebalo da koristimo `toString`, već namensku metodu (ako to već nije konstruktor.) Metoda `toString` svojim ugovorom ne opisuje _ponašanje_. [LSP](https://oblac.rs/liskov-substitution-problem/) i sav taj džez.

Da pristupimo s potpuno druge strane: osim kada imamo konkretan razlog zašto tako ne raditi, klase dizajniramo da više iz njih čitamo nego pišemo/menjamo. U softverskim sistemima je, u proseku, drastična razlika između broja čitanja i broja upisa. Zato nema smisla da svaki put pri čitanju iznova i iznova dekodiramo string, umesto da vratimo referencu na jednom prethodno dekodiranu vrednost.

Methoda `getDecoded` presipa iz šupljeg u prazno da bi vratio polazni string. Može se zameniti samo sa `return str`. A ukoliko je predviđeno da uradi kakvu obradu, ne bi trebalo da bude getter. Getteri su čisto, glupo, čitanje; nedostatak programskog jezika, a ne poziv za implementaciju. Po [mom pravilu](https://oblac.rs/imenovanje-namera-i-interpretacija/) metoda bi trebalo da se zove `decoded`, jer ne radi ništa i služi kao zamena za vrednost, te je i ne treba glagolizovati (izmišljena reč, nema na čemu.)

Opet oko imenovanja: imati `decoded()` i `toString()` koje vraćaju dve interpretacije ulaza? Ne.

Zašto mislimo da u **A** nema enkapsulacije? Cvrc, ima je. Enkapsulairano je ponašanje funkcijom (statičkom metodom, jer Java.) Zapravo, **A** enkapsulacija je bolja, jer je funkcija `encodeToIso88591` jasno definisana i ne može se koristiti za nešto drugo. Ujedno je funkcija _čista_, što se ne može reći za drugi slučaj.

Problem sa **A** je što baca izuzetak, a ne vraća nekakav `Either` rezultat. No to je već druga priča koju OOP veronauka baš i ne voli, te je nećemo sada iznositi na videlo.

## Na kraju

Kod **A**, ali ne-private.

Idemo dalje.
