---
title: "REST, opet"
date: 2021-09-20T01:06:08+00:00
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

Prvo, klijentu predajemo biznis logiku i namećemo dodatnu odgovornost. Nije li upravo ideja servera ta da klijenti imaju slobodu da budu "glupi"? Zahtevi dolaze sa strane klijenta; no to ne znači da se na klijentu i trebaju razrešavati. (Ukoliko nemamo servis - što je takođe validan pristup - ova tačka ne važi).

Drugo, svaka generalizacija servisnog sloja namenjenog klijentima se protivureči sa idejom servisa. Servisi jesu biznis logika, stoga jesu vrlo konkretna _specijalizacija_ zahteva.

Treće: kakav je odnos modela/entitija i REST resursa? Nikakav. Ponavljam, _nikakav_. REST resurs je bilo šta što se može dobaviti URI-om. I to je to. Resurs _ne zna_ ništa o implementaciji: koliko je entiteta upotrebljeno, kako su uvezani u kodu, odakle su dobavljeni itd. Upravo je ideja resura da bude razdvojen (_decoupled_) od detalja implementacije. Kao što bi to sam R. Fielding rekao:

> Any information that can be named can be a resource \[...\] A resource is a conceptual mapping to a set of entities, not the entity that corresponds to the mapping at any particular point in time.

## BFF

Do sada nisam pomenuo performanse komunikacije. Naime, generalni API iz prvobitne tvrdnje je "pričljiv": za dobavljanje potrebnog sadržaja je neophodno uputiti više zahteva ka serveru. To samo po sebi zvuči kao dovoljan razlog da se okrenemo konkretnijim resursima. Ipak, budimo precizni - reč je o _optimizaciji_ koja je, sticajem okolnosti, u skladu sa opisanim razlozima.

Kako bilo, postoji obrazac mikroservisa koji se često pojavljuje u praksi: Backend For Frontends (BFF). Reč je o tankom servisnom sloju koji je upravo prilagođen tipu klijenta. Zadatak ovog arhitekturalnog obrasca je da smanji "pričljivost" klijenta i kroz API-je dostavlja odmah sav potreban sadržaj. Pogledati: Netflix.

## Public

Ovo ne znači da generali API nikada neće postojati. Naprotiv - kada klijent _nije_ poznat, jedino rešenje je generalni API. Drugim rečima, javni API-ji su mahom generalni API-ji; oni ne znaju na koji će način biti upotrebljeni. To što ih ujedno koristimo i za saopstvene klijent je, opet, samo optimizacija (najčešće) resursa: ne da nam se, jelte, da iskucamo klijentski API sloj.

I u takvoj postavci ima mesta za optimizaciju "pričljivosti" za generalne REST API-je. Imao sam prilike da dizajniram i implementiram tanak servisni sloj koji u okviru jednog HTTP zahteva ostvari više drugih, ali interno, na strani servera. Rezultat se mogao kombinovati na proizvoljan način, entiteti filtrirati i sl. (Bilo je to pre GraphQL).

## Opušteno...

...sa RESTom. REST nije "go-to" model arhitekture web API-ja. Zvuči kao da pre REST-a, mi ubogi programeri nismo imali pojma kako da pišemo web API-je, te je sada to odjednom razjašnjeno. Zanimljivo, do eksplozije web API-ja dolazi dosta kasnije; te REST svakako nije nikakav pokretač.

Šta više, REST disertacija je služila Fieldingu kao smernica prilikom dizajniranja HTTP 1.1 protokola: šta od predloga ulazi u implementaciju. Na primer, Fielding je odbio metod `MGET` za batch-ovane zahteve, jer nisu u skladu sa smernicama (u vezi proksija i keša); a takav zahtev je čest u modernim API-jima. Kolačići isto nisu REST. Dakle, REST je više smernica za _proširenje_ HTTP, a ne za konstrukciju sistema koji se baziraju na HTTP-u.

Ironija je da REST nije alat-za-sve; više je ilustracija mogućeg alata za "distributed hypermedia systems". To se više puta napominje u disertaciji:

> REST is designed to be efficient for large-grain hypermedia data transfer, optimizing for the common case of the Web, but resulting in an interface that is not optimal for other forms of architectural interaction.

Ono što se desilo tih godina je ilutracija neprestane potrebe tehnološke zajednice da **ne** koristi standarde i da nalazi nove i nove načine kako da samo urade stvari. "Get things done" je opasna mantra koja lako može da zanemari mnoge standarde, prakse i pravila. Eto, sada samo vraćamo `500` kada nastane logička greška - srećno sa (s)nalaženjem šta je pravi problem.

Opušteno, dakle, sa RESTom. Dozvoljeno je da ga prilagodiš potrebama. Ili da koristiš GraphQL. Ili Json-RPC. Ili...
