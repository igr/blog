---
title: "REST, opet"
date: 2021-10-20T01:06:08+00:00
categories:
  - Razvoj
tag:
  - razvoj
  - rest
  - api
---

Učestvovao sam u zanimljivom razgovoru. Dotakli smo se teme API-ja i kompozicije modela čiji se sadržaj vraća kroz pozive.

U toku diskusije, čulo se i ovo mišljenje: REST API ne bi trebalo da se prilagođava klijentu (kako sam indirektno propovedao), već bi trebalo da stvaramo ispravan REST API, prema modelima.

<!--more-->

Većina sadržaja koja se bave sličnom temom, _upućuje_ da je tvrdnja ispravna. Na primer, `Book` sadrži `Library` i `Author` i `Stats`. Dakle, pravimo 4 API-ja. Klijent se sam snalazi i koristi šta mu treba.

Mislim da je to put kojim ređe treba ići.

Trik za razlučivanje suštine je pitati: **zašto**? Zašto mislimo da je generički API dobar?

Prvo, klijentu predajemo biznis logiku i namećemo dodatnu odgovornost. Nije li upravo ideja servera ta da klijenti imaju slobodu da budu "glupi"? Zahtevi dolaze sa strane klijenta; no to ne znači da se na klijentu i trebaju razrešavati. (Ukoliko uopšte nemamo servis - što je takođe validan pristup - ova tačka ne važi).

Drugo, svaka generalizacija servisnog sloja namenjenog klijentima se protivureči sa idejom servisa. Servisi jesu biznis logika, stoga jesu vrlo konkretna _specijalizacija_ zahteva.

Treće: kakav je odnos modela/entitija i REST resursa? Nikakav. Ponavljam, _nikakav_. REST resurs je bilo šta što se može dobaviti URL-om. Resurs _ne zna_ ništa o implementaciji: koliko je entiteta upotrebljeno, kako su uvezani u kodu, odakle su dobavljeni itd. Upravo je ideja resura da bude razdvojen (_decoupled_) od detalja implementacije.

## BFF

Do sada nisam pomenuo performanse komunikacije. Naime, generalni API iz prvobitne tvrdnje je "pričljiv": za dobavljanje potrebnog sadržaja je neophodno uputiti više zahteva ka serveru. To samo po sebi zvuči kao dovoljan razlog da se okrenemo konkretnijim resursima. Ipak, budimo precizni - reč je o _optimizaciji_ koja je, sticjem okolnosti, u skladu sa opisanim razlozima.

Kako bilo, postoji obrazac mikroservisa koji se često pojavljuje u praksi: Backend For Frontend (BFF). Reč je o tankom servisnom sloju koji je upravo prilagođen tipu klijenta. Zadatak ovog arhitekturalnog obrasca je da smanji "pričljivost" klijenta i kroz API-je dostavlja odmah sav potreban sadržaj. Pogledati: Netflix.

## Public

Ovo ne znači da generali API nikada neće postojati. Naprotiv - kada klijent _nije_ poznat, jedino rešenje je generalni API. Drugim rečima, javni API-ji su mahom generalni API-ji; oni ne znaju na koji će način biti upotrebljeni. To što ih ujedno koristimo i za saopstvene klijent je, opet, samo optimizacija (najčešće) resursa: ne da nam se, jelte, da napravimo klijentski API sloj.

I u takvoj postavci ima mesta za optimizaciju "pričljivosti" za generalne REST API-je. Imao sam prilike da dizajniram i implementiram tanak servisni sloj koji u okviru jednog HTTP zahteva ostvari više drugih, ali interno, na strani servera. Rezultat se mogao kombinovati na proizvoljan način, entiteti filtrirati i sl. (Bilo je to pre GraphQL).
