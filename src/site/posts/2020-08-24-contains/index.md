---
title: "Shape-ologija"
date: 2020-08-24T01:07:03+00:00
categories:
  - Razvoj
tag:
  - razvoj
  - soc
  - principi
---

Šta bi izmenili u kodu koji sledi?

<!--more-->

```java
public interface Shape {
  // ...
}

public class ShapeGroup {
  private final List<Shape> shapes = List.of();

  public boolean containsShape(final Shape shape) {
    return shapes
        .stream()
        .anyMatch(it -> it.equals(shape));
  }
  public boolean containsPoint(final Point point) {
    return shapes
        .stream()
        .anyMatch(it -> it.contains(point));
  }

  // ...
}
```

Dakle?

## SoC

Ovu vinjetu volim da pomenem u okviru [Clean Code](https://oblacodemia.com) radionice. Na prvi pogled, sve izgleda u redu. Možemo, eventualno, da diskutujemo da li koristiti `stream`-ove, ili o implementaciji liste.

Ima, ipak, jedna stvar koja škripi. Stiče se utisak da obe metode imaju isti interes (_concerne_). To nije slučaj!

Metod `containsShape()` proverava da li je data geometrijska figura već prisutna u kolekciji figura. Bavi se, dakle, svojstvima _kontejnera_: sadržajem. Ovu metodu geometrija **ne** zanima: ne ispituje da li unija grupe geometrijskih figura sadrži celu površinu date figure.

S druge strane, metod `containsPoint()` se bavi baš _geometrijom_: proverava da li se data tačka sadrži u površini koju čini unija geometrijskih figura kolekcije.

Ovime narušavamo "Separation of concerns" princip (SoC) - jedan od, možda, najvažnijih principa softverskog razvoja; a koji, kako mi sve više to (filozoski) izgleda, nikako nije lako održati do kraja. Tromi jezici kao Java nimalo ne olakšavaju stvari; C# ima bar parcijalne klase, a drugi jezici traitove.

Kako bilo, trebalo bi da promenimo imena metodama. Nazvane kao u primeru prosto impliciraju isti interes. S obzirom da se termin `contains` već koristi u JDK kolekcijama, ima smisla ostaviti ime prve metode nepromenjeno. Drugo ime bih izmenio. Kako? Uhhh... dobro došli u najteži problem softverskog razvoja: pravilno imenovanje. Već po navici posežem za elektronskim leksikonom sinonima i tražim alternativu. Na primer: `enclose`, `have`... Nešto od toga bi svakako ukazalo na drugačiju prirodu operacije metode.

OK, sada kada smo promenili imena metoda, ne mogu a da se ne zapitam da li cela klasa i dalje narušava SoC? Jer, imamo metode koje se čas bave sadržajem, a čas bave geometrijom. To me dovodi do zaključka do koga iznova dolazim: klase, tj. OOP, nisu najbolji način _grupisanja_ funkcionalnosti. Ili, ako bih bio manje stroži: lakše je okliznuti se i povrediti principe.

Zato bih, vrlo verovatno, `ShapeGroup` oslobodio bilo kakve geometrije. Pustio bih, verovatno, i da implementira `Shape` (jer unija grupa figura i jeste figura). Sve geometrijske operacije bih izvezao u druge klase, koje se samo time bave. Ili u druge funkcije, jednom kada nadogradim Javu :)

Nit manje koda, nit više filozofije.
