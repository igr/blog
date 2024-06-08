---
title: "OOP Boja"
date: 2021-11-16T01:06:08+00:00
slug: oop-boja
description: >
  Nedavno sam naišao na članak koji naglašava nepotrebnost statičkih metoda.
---

Nedavno sam naišao na članak koji naglašava nepotrebnost statičkih metoda.

Statički kontekst, slično kao i primitivni tipovi, postoji kao prečica, nastao u davno vreme kada je kreiranje objekata bila skupa operacija. Programski jezik bi bio smisleniji kada statički kontekst ne bi postojao (naročito onaj koji zavisi od class loadera). No to ne znači da je njegovo postojanje izlišno - šta više, neophodan je. Drugo je pitanje da li je ova 'prečica' mogla da bude izvedena bolje, poput, na pr., elegantnih singleton 'objekta' u Skali.

Autor članka, međutim, pokušava da pokaže da se može i bez statičkih metoda. Uspeva u nameri; pri tome pravi takav OOP nered da sve boje postanu sive.

Primer je sledeći:

```java
public class Color {
  private final int hex;
  public Color(String rgb) {
    this(Integer.parseInt(rgb, 16));
  }
  public Color(int r, int g, int b) {
    this(r << 16 + g << 8 + b);
  }
  public Color(int h) {
    this.hex = h;
  }
}
```

Pošto Java još uvek ne podržava imenovanje argumenata (!?), kreiranje instance `Color` samo kroz konstruktore nije sasvim jasno. Jedno rešenje je da se dodaju statički konstruktori:

```java
public class Color {
  public static Color makeFromRGB(String rgb) {
    return new Color(Integer.parseInt(rgb, 16));
  }
  public static Color makeFromPalette(int r, int g, int b) {
    return new Color(r << 16 + g << 8 + b);
  }
  public static Color makeFromHex(int h) {
    return new Color(h);
  }
  private Color(int h) {
    this.hex = h;
  }
}
```

Autor izaziva ovu ideju i predlaže da se umesto koriste zasebni tipovi sa odgovarajućim konstruktorom:

```java
public class HexColor implements Color {...}
public class RGBColor implements Color {...}
```

Ime tipa sada jasnije naznačava kako se `Color` formira, te i pošto ima samo jedan konstruktor, nema mesta grešci.

Ovo NIJE ispravno razmišljanje.

1. Tipove formiramo za različita _ponašanja_. Ove klase se, međutim, ponašaju identično.
2. Konstrukcija objekata se zapravo i dešava u statičkom kontekstu. Ponašanje objekta se tiče instance. To su dva različita konteksta. Drugim rečima, ponašanje != način kreiranja.

Autor ide još dalje i uvodi specijalizaciju, [Pantone](https://www.pantone-colours.com) boju:

```java
public class PantoneColor extends Color {
  private final PantoneName pantone;
  public PantoneColor(String name) {
    this(new PantoneName(name));
  }
  // ...
}
```

Tek je sada napravio problem.

Iako su Pantone boje specijazacija, nije nužno i podklasa. Tačnije, Pantone boje su _podskup_! One se ni po čemu drugome ne razlikuju od ostalih boja. Slično sam nedavno pisao na temu [kvadrata i pravougaonika](https://oblac.rs/kvadrat-vs-pravougaonik/).

Jer, `PantoneColor` je ujedno i `HexColor`, ali i `RGBColor`. Ili drugačije: krenimo od `HexColor` koja nije Pantone boja, učinimo je svetlijom, te slučajno pogodimo vrednost iz Pantone skupa:

```java
hexColor.lighter();
```

Šta je rezultat: `HexColor` ili `PantoneColor`? Zar je bitno, ako je rezultat interfejs `Color`? Ako je bitno, onda smo u problemu. Ako nije bitno, onda je tip nevažan i nema opravdanja da postoji (jer interfejs se tiče samo ponašanja).

Potpuna, potpuna zbrka.
