---
title: "Stilske Vežbe"
date: 2021-12-16T01:06:08+00:00
slug: stilske-vezbe-2
categories:
  - Razvoj
tag:
  - razvoj
  - skala
  - java
  - javascript
  - zabava
  - parodija
---

Francuski pisac Rejmon Keno je u svom delu "Stilske vežbe" ispričao jednu scenu iz pariskog autobusa na 99 različitih načina.

Dodajem još tri.

<!--more-->

## Beleška (deo)

U autobusu S za vreme najveće gužve. Jedan tip od svojih dvadesetšest godina, sa dugim vratom kao da su mu ga istegli i sa šeširom na kome traku zamenjuje uzica. Ljudi silaze. Pomenuti tip otresa se na svog suseda. Prebacuje mu da ga ovaj gurne svaki put kada neko prođe. Glas piskutav i zloban. Kada ugleda jedno slobodno mesto, hitro se ustremi na njega.

## Java

Autobus je PrevoznoSredstvo. Autobus je na Trasi `23`, u smeri ka Stanici `Mon de Per`. Autobus sadrži kolekciju Putnika koji jesu i Osobe. OsobaFactory pravi `96` Osoba koje dodeljuje Autobusu. Jedna Osoba ima `26` godina, `null` ime, `null` adresu. Ta Osoba ima atribut "dužina vrata" sa vrednošću `10`. Osoba takođe sadrži kolekciju predmeta. U kolekciji predmeta se nalazi jedan PredmetZaGlavu koga implementira naročiti Šešir, na kome `getTraka()` vraća Uzica koja je i NeštoZaŠešir.

Osoba iterira sve osobe Autobusa, sortira po udaljenosti obrnutim redom i preuzima prvu nađenu Osobu koja je `Optional`. Osoba kreira Poruku, sa tonom "piskutavo" na `0.9d`, "empatično" na `0.1d`, sadržaj je `enum` TipPoruke.PREBACIVANJE. Osoba izvršava metodu `kažiMi` na pronađenoj osobi sa formiranom Porukom.

Osoba je kao Putnik prilikom pridruživanja Autobusu startovala background thread većeg prioriteta koji iterira sva Mesta u Autobusu. Thread u tom trenutku pronalazi Mesto koje nema Putnika i call-back-uje Osobu. Osoba se pridružuje se nađenom Mestu. Autobus osvežava broj slobodnih mesta.

## Scala

Trasa, `23`, stanica `Mon De Per`, PrevoznoSredstvo odgovara mu Autobus `flatMap` u kolekciju Osoba sa osobinom Putnika, `26` (\*1) , `^^10` (\*2) -> u set predmeta dodaj Šešir koji je TrakaŠešir (\*3).

Autobus za svakog Putnika min dist (\*4) prva `map` u Poruka `0.9` `0.1` Prebacivanje `apply` Putnik je proširen kao MestoPretraživač. Autobus za svako Mesto prvo ako prazno >> (\*5). Autobus vraća novi Autobus sa osveženim stanjem.

1. implicitna godina.
2. `^^` operator za visinu vrata.
3. trait za vraćanje Traka umesto Uzica.
4. implicitna funkcija za razdaljinu između dve Osobe
5. operator za zauizmanje mesta

## JavaScript

Skup entiteta koji se kreće ima `94` elemenata. Jedan entitet ima `"26"` godina i entitet za vrat koji ima ključ tekst: `"dugacak"`. Entitet osobe se dodaje u skup u kome je i entitet za Šešir, sa naznakom `trakaUmestoUzice` : `true`.

Glavni thread pronalazi sve entitete i odbacuje one koje imaju atribute Autobusa, Šešira i nalazi samo Osobe. Za svaki entitet Osoba, uzima Osobu iz skupa, računa razdaljinu i stavlja ih u niz. Glavni thread izbroji Mesta. Niz sortira, pa uzima entitet koji odgovara najmanjoj vrednosti. Poziva metodu `saopšti` i šalje mapu sa Porukom, VisinomGlasa, Autobusom, Šeširom i Emocijom. Glavni thread izbroji Mesta. Nađe da je broj Mesta manji nego što ima Autobus, pa zaključuje da je mesto slobodno, te ubacuje novi entitet u spisak Mesta sa entitetom Osobe, Šeširom i Autobusom.
