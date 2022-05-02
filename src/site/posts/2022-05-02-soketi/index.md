---
title: "Soketi, strimovi"
date: 2022-05-02T01:07:03+00:00
categories:
  - Razvoj
tag:
  - razvoj
  - java
  - soket
  - strim
---

Crtica iz svakodnevnog programerskog života.

<!--more-->

Java kod otvara klijentski soket ka udaljenom serveru i šalje mu tekstualne poruke:

```java
  PrintWriter out =
    new PrintWriter(socket.getOutputStream(), true);
  BufferedReader in =
    new BufferedReader(
      new InputStreamReader(socket.getInputStream()));

  // ...

  try {
    out.println(msg);
  } catch (Exceptio e) {
    // important!
  }
```

Bitno je uhvatiti grešku da bi bili sigurni da se poruka zaista poslala.

Međutim, to se ne dešava. Kod nije dobar - kada se server 'otkači', klijent nastavlja da šalje poruke kao da je sve u redu.

U čemu je greška?

## RTFM ...i kod

`PrintWriter` implementacija `println()` guta izuzetke 🤷‍♂️.

Muči me što ovakva greška lako prolazi 'ispod' radara. Na prvo gledanje koda mi je samo zasmetalo što se koriste karakterni strimovi za rad sa soketima, ali sam prešao preko toga (i mnogočega drugog) - niti je moj tim, niti moj deo poslovne odgovornosti. Tek sledeći put kada sam zapravo seo da rešim problem, primećujem grešku koju je programer nenamerno ostavio. Ispravka je prosta: prelaz na `Data*Stream` klase.

Razmišljam, dakle, da li bi nešto moglo da bude drugačije? Da li je ovo greška programera ili je greška dizajna klase iz JDK-a? Da li bi kompajler mogao da javlja upozorenja za upotrebu svih metoda koje gutaju izuzetke? Da li postojanje karakternih strimova ima uopšte smisla? Karakterni strimovi su, jasno, samo olakšica; dok su bajtni strimovi ono kako se podaci zapravo koriste.

Stvari bi bile okej da se koriste _unchecked_ izuzeci, kao što je `UncheckedIOException` - koji se zakasnelo pojavio tek u Javi 8. Da bi se kompatibilnost unazad održala, nažalost, potpisi starih metoda su morali da ostanu isti. Ne možeš da se ne zapitaš: ima li smisla po svaku cenu održavati kompatibilnost? Imamo li dobre alatke da stariji kod unapredimo na noviju verziju, koja je eventualno drugačija? Zašto svaka verzija jezika ne bi donela strogo minimalni set unapređenja, makar zarad gubitka kompatibilnosti?