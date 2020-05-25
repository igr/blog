---
title: "VertX i greška u arhitekturi"
date: 2019-05-20T22:22:22+00:00
slug: "vertx-i-greska-u-arhitekturi"
categories:
  - Razvoj
tag:
  - razvoj
  - vertx
  - sinhronizacija
  - mikroservisi
---

[VertX](https://vertx.io) je event-driven i non-blocking web server i framework. Nekada možeš da pogrešiš u arhitekturi mikroservisa usled nerazumevanja prirode platforme.
<!--more-->

## Kako radi VertX?

Za razliku od 'klasičnih' web servera, [Netty](https://netty.io), nad kojim je VertX nadgrađen, nema veliki thread-pool kojim opslužuje dolazeće konekcije. Umesto toga, VertX koristi thread-ova toliko da su umnožak broja CPU-ova. Na primer, na mašini sa 8 CPU, VertX koristi 16 threadova (konfigurabilno). Suština je upravo da je broj threadova mali. Operativni sistem, naravno, i dalje prihvata ogroman broj konkecija, ali ih opslužuje tim malim brojem threadova. Time se, prema pravilu, dobijaju veći 'protoci' servera, te su performanse takvog servera bolje od 'klasičnih'.

Svaki takav thread opslužuje jedan tkzv _event loop_. Suština koda _event loop_-a je da bude non-blocking, linearan. To pravilo je toliko važno, da ga nazivaju [zlatnim](https://vertx.io/docs/vertx-core/groovy/#golden_rule) u dokumentaciji. Ukoliko je kod blokirajući, on se prepušta pool-u tkzv. workera, klasičnom modelu opsluživanja. Da bi iskoristili moć VertX-a, poenta je da što više pišemo kod koji je neblokirajući.

## Mikro problem

Mikroservis o kome pričamo je jednostavan, svega nekoliko end-pointa. Naravno, napisan je i Java HTTP klijent kojim se ovi pozivi 'prikrivaju'.

A sada, ovaj kod (pojednostavljen radi primera):

```java
public void nonBlockingHandler() {
  // do stuff
  thisMicroServiceClient.doSomething();
  // do more stuff
}
```

Testovi prolaze. Na produkciji stvari rade... do trenutka kada se saobraćaj poveća. I to ne nešto puno, dovoljno je bilo nekih stotinak zahteva u sekundi da obori ovaj kod.

## Šta se dešava?

U slučajevima sa povećanim saobraćajem, dešava se da u jednom trenutku sve stane, te ne bude odziva (VertX, na kraju, sam odbaci konekcije koje detektuje da su blokirane). Očigledno je da _event loop_ blokiraju sve raspoložive threadove, te da nema slobodnog thread-a koji bi opslužio nove konekcije.

Razlog za blokiranje je: pozivanje end-pointa sopstvenog servisa iz ne-blokirajućeg koda! Na prvi pogled deluje kao da se poziva obična Java metoda, a zapravo se pravi _blokirajući_ poziv ka `doSomething()`. Time se dodaje nova konekcija koju treba opslužiti; pod većim saobraćajem se dešava da svi VertX threadovi čekaju da se izvrše `doSomething()` pozivi u _event loop_-ovima, a ti pozivi pak čekaju da se neki thread oslobodi kako bi bili opsluženi. Dead-lock, školski primer.

## Zašto je ovo interesantno?

Iako zvuči trivijalno, ispostavlja se da sve ovo nije bilo lako prihvaćeno od strane projektnog arhitekte. Alternative kao to da se pozove lokalni kod direktno, ili pak koristi blokirajući handler, nije naišlo na razumevanje (mesecima!). Ovime ne osuđujem odluku; ali je upravo dobra ilustracija kako današnji programerski modeli i dalje mogu da budu izazovni, više nego što bi to možda trebalo. Baš kao što sam se nedavno bunio zbog postojanja `volatile` ključne reči, razmišljam (na glas) da probleme u asinhronom i ne-blokirajućem svetu zapravo nije lako pojmiti, ili bar - nije dovoljno lako.

Ukoliko mislite suprotno, predlažem da se oprobate u [The Deadlock Empire](https://deadlockempire.github.io).
