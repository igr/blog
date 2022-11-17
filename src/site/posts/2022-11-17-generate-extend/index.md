---
title: "Crtica o nasleđivanju"
date: 2022-11-17T01:07:03+00:00
categories:
  - Razvoj
tag:
  - razvoj
  - oop
---

Kratka zabeleška o nasleđivanju pred spavanje.

<!--more-->

Uobičajan scenario: dodavanje novog entiteta u tabelu koja automatski generiše ID. Iako koristim `UUID` gde mogu, ima mesta gde ima numerički tip za ključ ima smisla.

Za klijenta pišem ovakav model:

```kotlin
data class Book(val id: Long?, val name: String)
```

Ukratko: propertiji su mutabilni: `id` svakako jeste, a ostatak zavisi od tehnološkog steka. Snimanje u bazu je funkcija: `Book -> Book`, prosleđujemo delimično popunjeni objekat, a baza doda šta izgeneriše. Klijentima je to uglavnom dovoljno; imutabilnost je još uvek samo "nice-to-have".

Naravno, ovakav kod je manje kvalitetan. Kada kuckam za sebe, razdvajam modele:

```kotlin
data class Book(val id: Long, val name: String)
data class BookDetails(val name: String)
```

Funkcija snimanja u bazu postaje: `BookDetails -> Book`.

U primeru imamo samo jedan opisni podatak `name`; lako je zamisliti da ih im mnogo više u pravom projektu. Kao rezultat razdvajanja modela javlja se _ponavljanje_. Potrebno je da deklarišemo sve te opisne podatke na dva mesta.

Šta OOP programer radi kada uoči ponavljanje? Ili ništa ili zajedničko izdvoji u podklasu.

Postoje programski jezici koji ne dozvoljavaju nasleđivanje `data` klasa, jer je poznato da to može da naruši neke odnose preispitivanja "jeste li" nešto tip ovaj ili onaj. Naravno, stvari se mogu rešiti sa šta god da je `trait` u tom programskom jeziku - abstraktna klasa, interfejs itd. No sve to dramatično povećava napisan kod, samo zarad izdvajanja zajedničkih opisnih podataka.

Kratka stanka. Neka podignu ruke svi oni koji misle da je nasleđivanje implementacija "jeste" odnosa iz pravog sveta. Na primer, `Dog` jeste `Animal`, da? Okej, vi koji ste podigli ruke nemojte ih spuštati više ikada na tastaturu; programiranje možda nije za vas. (IT stendap komedija?)

Nasleđivanje je samo [redefinisanje u podskupu](https://oblac.rs/kvadrat-vs-pravougaonik/). Dolazim do zabeleške od sinoć. Ako je tako, gornji problem ponavljanja se može rešiti na potpuno drugačiji način - van ograničenja programskog jezika. Generisanjem koda s jednog mesta:

```yaml
Book
  key: id
  details:
  - name
```

Ova definicija (upravo smišljena) može da _generiše_ gornje dve klase sa jednog mesta! Ovde rešavamo samo ponavljanje; nemamo potrebe za bilo kojom relacijom između `Book` i `BookDetails`. Ne bi trebalo da ikada prosledimo `Book` gde nam treba `BookDetails`.

Generisanje koda, zanimljivo, može da zameni potrebu za nasleđivanjem.

Kada je tehnološki stek dovoljno agilan, kompozicija je rešenje bez generisanja koda:

```kotlin
data class BookDetails(val name: String)
data class Book(val id: Long, val details: BookDetails)
```

Ovo zahteva da se kompozicija mapira na tabelu, što je često dosadno komplikovan slučaj sa postojećim alatima.