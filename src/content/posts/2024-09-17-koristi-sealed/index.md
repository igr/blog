---
title: "Koristi sealed interfejse za opšte Java dobro"
date: 2024-09-17T01:06:08+00:00
slug: "koristi-sealed-interfejse-za-opste-java-dobro"
description: "Ako koristiš Javu 17+, vreme je za ADT."
---

Jedna od skorašnjih novina u programskom jeziku Java je važnija od ostalih.

## Šta?

Sealed interfejs zahteva konačan broj implementacija. Dakle, sve implementacije moraju biti definisane tokom kompajliranja.

## Čemu?

Postoje različiti primeri sealed interfejsa; no većina se oslanja na POOP: pseudo-OOP koji je uvrežen u programski jezik Java. Ovi primeri ne donose neke drastične promene u modelovanju, koje sam nagovestio u početku teksta.

Sealed interfejs je odličan način za definisanje mogućih rezultata funkcije. Njime se možete rešiti jednom za svagda i `null` i krnjavog `Optional` (uveden samo zbog stream API-ja, te ga, preporučeno, treba koristiti samo kao povratnu vrednost) i `if` blokova i `default` grana i izuzetaka.

Zamislimo funkciju koja pretvara string u broj. Funkcija može da rezultuje celobrojnom ili realnom (float-pointing) vrednošću. Naravno, tu je i mogućnost greške, koja je u domenu funkcije validan domenski rezultat - dakle, _nije_ izuzetak.

Potpis funkcije bi mogao da izgleda ovako:

```java
public ConvertedNumber convertStringToNumber(String input);
```

Sada kreće zanimljiv deo. Tip `ConvertedNumber` opisuje sve moguće rezultate (setimo se, tip definiše [skup vrednosti](https://oblac.rs/oop-kakav-tip-rece-klasa/)):

```java
interface sealed ConvertedNumber {

  class IntegerNumber(int value) implements ConvertedNumber {...};

  class RealNumber(double value) implements ConvertedNumber {...};

  class Error(String message) implements ConvertedNumber {};
}
```

(Pišem napamet; primer verovatno nije potpuno sintaksno korektan.)

Nema izuzetaka, nema `null`, nema nedoumica. Sve moguće vrednosti rezultata su sadržane u povratnom tipu. Interfejs `ConvertedNumber` nema nikakve funkcije, jer služi za opis tipa, ne ponašanja.

Ovo ne bi imalo mnogo smisla da Java (konačno) ne radi _pattern matching_. Od sada, `switch` je tvoj prijatelj:

```java
switch (result) {
  case IntegerNumber i: // ...
  case RealNumber r: // ...
  case Error e: // ...
}
```

Nema nepotrebne `default` grane.

Zašto ne vraćamo `Number`, pitaće neko? `Number` ne definiše skupove mogućih _vrednosti_, već definiše zajedničko ponašanje! Nažalost, problem sa Javom je što se različiti koncepti nazivaju i konstruišu na isti način. `ConvertedNumber` nije nikakav "interfejs"; to je prosta definicija data tipa.

Ovo smo čekali dve decenije! Ne mogu da dočekam narednih dvadeset godina: pa biće od Jave nešto!

Idemo dalje.
