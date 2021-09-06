---
title: "Kvadrat vs Pravougaonik"
date: 2021-09-06T01:06:08+00:00
categories:
  - Razvoj
tag:
  - razvoj
  - oop
  - analiza
  - nasleđivanje
---

Hajde da dizajniramo OO model pravouganika i kvadrata. Jednostavno, zar ne?

<!--more-->

Geometrija je jasna: kvadrat je pravougaonik. Relacija "je" (engl. "is") označava vezu _nasleđivanja_, specifikaciju tipa. Krenimo od pravougaonika:

```java
public class Rectangular {
  @Setter @Getter int width;
  @Setter @Getter int height;
}
```

(Koristim Lombok anotacije radi preglednosti).

Dakle, `Rectangle` je obična POJO mutabilna klasa. Rekli smo da je `Square` nasleđuje, pošto kvadrat _jeste_ pravougaonik. Međutim, za kvadrat važi da je dužina jednaka širini, pa je jedini način da se nasleđivanje ostvari sledeći:

```java
public class Square extends Rectangular {
  @Override
  public void setWidth(int w) {
    this.width = w;
    this.height = w;
  }
  @Override
  public void setHeight(int h) {
    this.width = h;
    this.height = h;
  }
}
```
Čini se da je sve kako treba. Posao završen; komit, merge, idemo dalje.

## LSP

Ako je `Square` isto što i `Rectangle`, onda bi trebalo da se ponaša identično u svakoj situaciju u kojoj se koristi osnovna klasa. Zamislimo sada metodu koja računa površinu:

```java
public int areaOf(Rectangle rect) {
  return rect.getWidth() * rect.getHeight();
}
```
Za pravougaonik važi da ako povećamo jednu stranicu `n` puta, za toliko puta se poveća i njegova površina:

```java
var rect = new Rectangle();

rect.setWidth(2);
rect.setHeight(3);
println(areaOf(rect));  // 6

rect.setWidth(4);
println(areaOf(rect));  // 12
```

Ako u prvoj liniji zamenimo `Rectangle` sa `Sqaure`, da li dobijamo isto ponašanje?

```java
var rect = new Square();

rect.setWidth(2);
println(areaOf(rect));  // 4

rect.setWidth(4);
println(areaOf(rect));  // 16 ?!
```

Ne. Nada. Jok. `Square` se **NE** ponaša kao `Rectangle`.

Ovim se narušava jedno od najvažnijih pravila OOP-a: Liskov Substitution Principle (LSP). O njemu i patkama možete pročitati na puuuno mesta mnogo bolja objašnjenja nego što to sam umem da objasnim.

## Imutabilno!?

Ha, neko će reći, pa problem je imutabilnost. Da nemamo `set` metode, stvari bi bile drugačije - nikada ne bi _menjali_ vrednosti:

```java
var rect = new Rectangle(2,3);
println(areaOf(rect));  // 6

rect = new Rectangle(4,3);
println(areaOf(rect));  // 12

rect = new Square(2);
println(areaOf(rect));  // 4

rect = new Square(4);
println(areaOf(rect));  // 16
```

Nema nejasnoće. Konstruktor `Square` zabranjuje da uopšte dođe do nepredviđene upotrebe. Time što ograničavamo na jedan argument, dužinu stranice, kvadrat je siguran da će uvek biti upotrebljen na pravi način.

Ne. I dalje je reč o različitom _ponašanju_ dva modela. Prethodni primer nije ispravno napisan:

```java
var rect = new Rectangle(2,3);
println(areaOf(rect));  // 6

rect = new Rectangle(
  rect.getWidth()*2,rect.getHeight());
println(areaOf(rect));  // 12

rect = new Square(2);
println(areaOf(rect));  // 4

rect = new Square(???);
```

I dalje ostajemo uskraćeni time što pravougaonik opisuju 2 vrednosti, a kvadrat samo jedna.

## instanceOf?

Ako ovo nije bilo dovoljno ubedljivo, sledi još jedan primer:

```java
var rect = new Rectangle(2, 2);
println(rect instanceOf Square);  // false
```

Drugim rečima, pravougaonik koji je zapravo kvadrat - u našem programu to _nije_!

Rešiti ovo zahteva privatne konstruktore i factory za kreiranje tipova. No ovde bi to bila štaka za programiranje, koja ne rešava suštinski problem, već nudi zakrpu.

## Dakle?

Ispostavlja se da je postojanje klase `Square` sasvim upitno: nema opravdanog razloga da postoji! Ne možemo je uključiti u OOP model, a da ga ne narušimo.

Ako bi nam baš bila neophodna informacija o kvadratu (iz razloga koji ne mogu da zamislim), ona bi se dobavljala na drugi način.

Na primer:

```java
public class Rectangle() {
  // static ctor
  public static Rectangle asSquare(int side) {
    return new Rectangle(side, side);
  }

  // ...ostatak klase

  public boolean isSquare() {...}
}
```

Ili pak:

```java
public class Rectangle() {
  public Optional<Square> asSquare() {...}
}
public interface Square{
  int getSide();
}
```

Korak dalje bi bio da ne postoji ni klasa `Rectangle`, već interfejs; a da se geometrijska figura kreira kompozicijom osobina - no to već umnogo zavisi od toga šta zaista konstruišemo.

Naglasio bih:

> Nasleđivanje NIJE preslikavanje relacije "JESTE" iz realnog sveta.

Zvuči pomalo kao film "Inception". Zato ću ponoviti na drugi način:

> Nasleđivanje je ponovno definisanje funkcija i varijabli u podskupu (sub-scope).

Inače, ovaj primer je star... pa, bar nekoliko decenija, a i dalje se lome koplja oko njega. Ne bi trebalo. Priznajem, nije lako odmah uočiti narušavanje LSP principa; pogrešno smo naučeni da slepo preslikavamo realni svet u kod. U poslednje vreme razmišljam... maštam, zapravo... o Ujedinjenoj Teoriji Modelovanja - nepogrešivom načinu modelovanja koda, primenjivoj teoriji koja se bavi kohezijom, uvezanošću, bojama, entropijom i vektorima. Pristup koji nepobitno i jednostavno donosi odgovore na ovakva pitanja.

Ok, sam ću pronaći izlaz.
