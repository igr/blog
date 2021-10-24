---
title: "OpenAPI priče"
date: 2021-10-25T01:06:08+00:00
categories:
  - Razvoj
tag:
  - razvoj
  - openapi
  - projekat
---

Par priča iz svakodnevnog života softverskih inženjera.

<!--more-->

## Priča 1

Par činjenica sa projekta:

1. Web aplikacija ima OpenAPI definiciju koja se generiše iz koda. Definicija sadrži i biznis ograničenja: neka polja su, na primer, obavezna.
2. UI tim konzumira API. Prave svog klijenta na osnovu OpenAPI definicije.
3. Test tim proverava API. Tako, na primer, pišu testove za proveru obaveznih polja: eksplicitno navode njihova imena u kodu. Koriste svoj API klijent.
4. OpenAPI endpointi zahtevaju autorizaciju od strane trećeg servisa. Za konzumiranje API-ja neophodan je odgovarajući token, koji ne traje dugo (30tak min). Testovi zahtevaju da postoje testni korisnici u Auth servisu, sa različitim pravima pristupa. Ove testne korisnike kreira treća strana.

Šta sve ovde nije OK?

OpenAPI definicija _nije_ samo opis endpointa. OpenAPI je ujedno i _single source of truth_; jedinstveno mesto koje sadrži tačne informacije.

U ovom primeru to nije slučaj. Time što UI i Test tim pravi svaki svoje klijente, efikasno se narušava ovaj koncept. Informacija sa izvora se _ručno_ prenosi dalje; postoji mogućnost greške i neusaglašenosti - na račun utroška vremena.

OpenAPI definiciju treba koristiti za _generisanje_... pa, svega što je potrebno. Počevši od API klijenata. Svaki OpenAPI modul treba da generiše i skup API klijenata; automatski pri svakom releasu API-ja. Drugim rečima, artefakti OpenAPI definicije su klijentske biblioteke u neophodnim programskim jezicima i tehnologijama.

Dalje, dobar deo testova OpenAPI endpointa se može generisati iz definicije. Zadatak testnog tima je, u tim slučajevima, ne da piše takve testove, već da se uveri da li su biznis pravila ispravno zavedena u definiciji. Ovo otvara nova pitanja (odakle zapravo dolaze biznis informacije), ali to već prevazilazi fokus ovog teksta.

Konačno, nema razloga da se u toku razvoja (uključujući i testiranje) koriste pravi treći servis za dobavljanje tokena i proveru korisnika. Iako neophodan, treći servis ne spada u domen programa niti je potrebno da ga testiramo. Zato bi trebalo koristiti bilo koji drugi način za mokovanje korisnika, kako bi svakodnevni razvoj bio jednostavniji. Gledam da napravim _automatsko_ kreiranje neophodnih tokena i korisnika, shodno trenutnim potrebama. Ušteda na vremenu je značajna.

Ili... sve to nije toliko važno.

## Priča 2

SpringDoc je skup biblioteka za, između ostalog, generisanje OpenAPI definicije iz koda. Ova definicija je dostupna na određenom endpointu kada se server startuje.

Međutim, OpenAPI definija je neophodna za generisanje različitih klijenata. Kako najviše ima smisla da je generisanje automatsko tik nakon build-a projekta, neophodno je da OpenAPI definicija postoji kao fajl negde u okviru projekta.

Nažalost, zamisao SpringDoc programera je da se OpenAPI definicija dobavi sa pomenutog endpointa. To znači da se najčešće pre integracionih testova podigne server, te plugin okine OpenAPI endpoint i snimi ga na fajl sistem.

Ovo je potpuno neprihvatljiva prečica. Primer nerazume, kratkoročne uštede (čega tačno?).

Ako se generiše iz koda, proces generisanje OpenAPI definicije _ne sme_ da zavisi od servera. Idealno samo od strukture klasa (što se čini da je slučaj).

Ili... nisam dobro pročitao dokumentaciju.

## Priča 3

Tim je napisao mali endpoint za generisanje slika. Slike mogu biti vraćene u PNG ili SVG formatu. Tip slike se određuje `accept` hederom na istom endpointu. Endpoint ima svoju OpenAPI definiciju.

Problem je što standardni generator klijenata _ne može_ da generiše različite endpointe po hederima. Time smo primorani da ručno pravimo klijenta za ovaj mikroservis.

Predlog je dat da se umesto hedera koristi ekstenzija za određivanje tipa slike (`.png`, `.svg`). Dakle, da umesto jednog endpointa postoje dva (ili koliko bude trebalo), za svaki tip slike. Kod se minimalno menja. Šta više, trenutni `match` blok (Skalin `switch`) bi nestao i bio zamenjen metodama koje pozivaju postojeći zajednički kod. Takvu OpenAPI definiciju je sada moguće iskoristiti za generisanje klijenata.

Predlog _ne_ prolazi. Razlog: iako se trenutno koriste samo dva grafička formata, njihov broj _možda_ nekada može biti veći. To bi onda povećalo i broj endpointa, jer se svaki završava novom ekstenzijom. Uostalom, nije naš problem što zvanični OpenAPI generator ne radi u ovom slučaju.

Dakle, manje košta da programer sam pravi celog klijenta i ručno održava kompatibilinost koda i OpenAPI definicije, nego da se doda nova kratka metoda za novi tip slike i jedna anotacija - ako se ikada, možda, bude koristio i još neki format (kojih, znamo, i nema toliko).

Ili... ne vidim stvari kako treba.
