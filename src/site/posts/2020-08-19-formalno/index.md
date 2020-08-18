---
title: "Lestvice ka formalnom kodu"
date: 2020-08-19T01:07:03+00:00
categories:
  - Razvoj
tag:
  - razvoj
  - tla
  - testiranje
  - specifikacija
  - opnejml
  - formalno
---

Da li možemo da programiramo _formalnije_?

<!--more-->

## Unit Tests

Pišemo program za nalaženje prvog indeksa najmanjeg broja u ulaznom nizu. Kod se napiše lako.

```java
public static int smallest(int[] a) {
    if (a.length == 0) return -1;

    int index = 0;
    int smallest = 0;
    while (a.length - index > 0) {
        if (a[index] < a[smallest]) {
            smallest = index;
        }
        index = index + 1;
    }
    return smallest;
}
```

Pišemo testove da bi dokazali da kod radi predviđeno. Možemo i da krenemo TDD stranom, te pišemo testove i kod u ciklusima.

Ne mogu već dugo da se otresem misli da se imamo svojevrsnu diskrepancu: kod sam po sebi nije dovoljan, te nam je potrebna nova alataka (testiranje) da potvrdi da kod radi kako treba. Nije li to malo... čudno? Kao da rešavamo posledicu, a ne problem.

## Formalna specifikacija

Očigledno, kod sam po sebi nije dovoljan da predstavi specifikaciju koju implementira. Iz tog razloga su smišljeni jezici za opis formalne specifikacije. Takvi jezici su vrlo precizni, matematički zaokruženi; tiču se svakog stanja kroz koje kod mora da prođe.

Na primer, postoji **TLA+** - matematički jezik za opisivanje specifikacije. Ovakav jezik, ne samo da definiše dizajn sistema/algoritma, već i radi proveru da li sistem ispravno radi ili ima bagove.

**TLA+** nije nova stvar, postoji već nekih desetak godina; koncept, očekivano, neki pedesetak godina. Prema izveštajima, mnoge firme ga uistinu i koriste: AWS, Microsoft, Fejsbuk; te su na ovaj način pronašle kritične bagove PRE nego što je kod pušten u produkciju.

Pored **TLA+** postoje i druga rešenja. Za Javu je, na primer, simpatičan [OpenJML](http://www.openjml.org), pa gornji kod možemo pisati i ovako:

```java
//@ requires true;
//@ ensures \result == -1 ==> a.length == 0;
//@ ensures \result > -1 ==> (\forall int i; 0 <= i && i < a.length; a[\result] <= a[i]);
static public int smallest(int[] a) {
    if (a.length == 0) return -1;

    int index = 0;
    int smallest = 0;
    //@ maintaining 0 <= index && index <= a.length;
    //@ maintaining 0 <= smallest && smallest < a.length;
    //@ maintaining (\forall int i; 0 <= i && i < index; a[smallest] <= a[i]);
    //@ decreases a.length - index;
    while (a.length - index > 0) {
        if (a[index] < a[smallest]) {
            smallest = index;
        }
        index = index + 1;
    }
    return smallest;
}
```

Specifikacije se definiše u komentarima koda. Primer pokazuje suštinu: definišu se sva dozvoljena stanja. Verifikacija propušta kod kroz sve moguće ulaze, te prati stanja i obaveštava ukoliko nešto nije kako treba.

Ovakvom kodu ne treba unit test.

Nisam imao prilike da koristim TLA u produkciji (nameravam:). No i dalje me nešto žulja: mešamo dva jezika (formalni i programski) da bi dobili rezultat koji radi kako treba.

Možemo li dalje?

## Formalni kod

Ono što sledi je puka fantazija, bespoličarenje dokonog uma.

Šta bi bilo kada bi imali samo jedan, formalan jezik kojim definišemo specifikaciju; a kod se zapravo generiše/stvara tokom njegove _verifikacije_?

Drugim rečima: ako bi imali definisana SVA stanja i prelaze jednog u drugi, da li bi to moglo da bude dovoljno da generiše kakav god kod, koji će se ponašati kako je definisano?

Zašto nam uopšte i treba imperativni kod, kojim neprestano, dosadno govorimo "kako" da uradimo, umesto, "šta"? Može li specifikacija da bude dovoljna?

Da li je to smer ka kojem treba da idemo?

Razmišljam naglas.
