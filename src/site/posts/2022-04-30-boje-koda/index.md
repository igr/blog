---
title: "Boje koda"
date: 2022-04-30T01:07:03+00:00
categories:
  - Razvoj
tag:
  - razvoj
  - projekat
  - boja
  - kod
  - modularno
---

Kod se može obojiti.

Takođe, prestanimo više da pišemo anemične servisne i repo klase, kao i da mislimo u imenicama.

<!--more-->

Uradio sam malu praktično-pokaznu programersku vežbu. Cilj je bio sledeći:

1. Razdvojiti funkcije, podatke i akcije - po bojama.
2. Napraviti fleksibilnu web aplikaciju koja koristi obojeni kod.

## Boje

OOP način programiranja ne vodi mnogo računa o čistoći funkcija. Klase se koriste za sve; često i za prosto grupisanje biznis funkcija. Rezultat su ogromne, anemične klase sa gomilom metoda. Ovakve klase nemaju nikakvog domenskog smisla.

Može to i bolje. Ideja je zaista jednostavna:

+ podatke čuvamo u nepromenljivim klasama,
+ funkcije pišemo da budu čiste,
+ stanje i side-effect dozvoljavamo, ali ograničavamo.

Da bi potpomogli razmišljanje na tu temu, možemo "obojiti" kod. Zašto boje? Prosto, trebao mi je još način kategorizacije.

Osnovne boje koda:

+ 🟦 DATA = podaci, stabilno, nepromenljivo
+ 🟨 FUNCTION = čiste funkcije, lagane, zgodne za kombinovanje
+ 🟥 STATE = stanje, side-efekat, zarazan

Izvedene boje:

+ 🟪 BUILDER = spoj podataka i stanja, privremen
+ 🟧 ACTION = spoj funkcija i stanja, sve funkcije koje nisu čiste

Zgodna računica boja:

```
DATA + FUNCTION   -> 🟦 + 🟨 == 🟩 (green is good!)
DATA + STATE      -> 🟦 + 🟥 == 🟪
FUNCTION + STATE  -> 🟨 + 🟥 == ACTION 🟧
FUNCTION + ACTION -> 🟨 + 🟧 == ACTION 🟧
OOP               -> 🟦 + 🟥 + 🟨 == ⬜️ (avoid!)
```

Da sumiram: kada pišeš nekakav programski konstrukt, on bi trebalo da bude jedna od pet pomenutih boja. Stanje je zarazno i menja sve druge boje. Zeleno je dobro.

Nije ovo nekakva originalna ideja; i drugi propovedaju razdvajanje čistih funkcija i podataka. Bojom samo naglašavam ovakav način razmišljanja i razdvajanja.

## Projekat

Prateći princip sa bojama, napravio sam malu, pokaznu web aplikaciju. Izabrao sam Kotlin, jer mi nudi taman dovoljno da iskažem šta želim.

Sumarno o aplikaciji:

+ aplikacija je podeljena na module (sve "miriše" na clean ili heksagonalnu arhitekturu)
+ interfejsi su eksplicitno odvojeni od implementacija
+ ne koristi se nikakav DI, svako uvezivanje je u kodu (i ne nedostaje)
+ biznis logika se piše u čistim funkcijama
+ transakcije potpadaju u bootstrap modul (praktično konfiguracija)
+ imena funkcija su glagoli
+ akcije (nečiste funkcije) su ograničene unutar modula, ne iskaču vani
+ podaci su nepromenljivi (immutable)
+ imena podataka su imenice

Stanje pokazne aplikacije je na nekih `3` od maksimalne ocene `5`. Ima tu još stvari koje bih dodao - no većina je na stranu koja se ne tiče teme eksperimenta.

## Repositorijum

Početi ovde: https://github.com/igr/color-code

Izdvajam: [color wheel](https://github.com/igr/color-code/blob/main/doc/20-color-wheel.md) i [projekat](https://github.com/igr/color-code/tree/main/pectopah).

Samo opušteno, na kraju.