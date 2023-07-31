---
title: "No Else, No Cry"
date: 2023-07-31T07:07:07+00:00
categories:
  - Razvoj
tag:
  - razumljivost
  - kod
  - razvoj
---

Nema više Elze.

<!--more-->

Otišla je, sklonili su je; zauvek. Ostaju crveno-žuto-zelena sećanja koja ne prestaju da naviru, bez najave, iza svih tih zajedničkih mesta koja su delili. Probadaju nešto duboko u njemu, nemušto; prepuklo je i rascepilo se samo tkanje njegovog bića.

Bob dohvati gitaru, povuče duboki dim džoksa koji će ga vinuti sve do Vasione i započne da pevuši pesmu. Posle Elze, šta mu je drugo preostalo?

Bili su tako, tako slobodni... Uživao je Bob u svakom trenutku provedenom sa Elze. Imali su samo njihova, posebna mesta; kutke koji su im bili baš potaman. Svaki put kada bi im se vratio, Elze je bila tamo; nasmejana, vragolasta. Često su bili okruženi dobrim prijateljima; delili su i dobro i loše.

A onda, jednog dana, sve se promenilo. Uključen je linter.

Preko noći, Elze je zauvek nestala.

Obriši suze, pevao je Marli. Da li je te reči namenio sebi, ili ih je ponavljao uspomeni na Elze, nećemo nikada saznati.

----

Linter nema milosti. Okrutnost je slabost svakog neinteligentnog sustava; uporno se sprovodi da se slabost ne bi ukazala. Programski kod linter posmatra samo kao struktuiran tekst, bez trunke razumevanja. Zato zahteva slepa pravila. Ispada da ih programeri vole.

Jedna zanimljiva rasprava mi je privukla pažnju. Na jednom projektu, podrazumevano linter pravilo je obrisalo `else` koje je u vezi sa `return`:

```
if what?
  return foo
else
  return bar
```

je postalo:

```
if what?
  return foo
return bar
```

Ima kome je pravilo zasmetalo, te je započeta slek diskusija. Svi su pristojno i razumno iznosili stavove. Evo šta se moglo čuti:

**A** - Sviđa mi se pravilo. Ne volim bespotreban kod. Teže mi je da razumem drugačije. Pravilo je podrazumevano. Piše u knjizi.
**B** - Ne sviđa mi se pravilo. Teže mi je da razumem drugačije.
**C** - `if` je problem, ne `else`.
**D** - zameniti sa `switch` konstruktom. Ili pak ne, jer je u korišćenom jeziku `switch` nova stvar (da, leta gospodnjeg 2023.), pa će biti nepoznata ostalim programerima.
**E** - nisu sva pravila ista. Neka pravila su arbitrarna: za njih postoji samo doza saglasnosti među programerima koliko je pravilo važno.
**F** - pošto u diskusiji učestvuje samo šestoro, to nije dovoljan uzorak za donošenje statistički značajne odluke.


## Moja dva jamajčanska dolara

Nisam učestvovao u diskusiji; vodila se u drugoj vremenskoj zoni. Nisam siguran ni da li bih učestvovao; brzina kojom se razmenjuju stavovi kroz poruke na sleku ne odgovara načinu kako sam dolazim do odgovora.

Javio mi se Bob Marli u snu. "Vidi, čo’ek", reče mi između dva dima, "Elze plače. Aj budi gari, ljubi te rasta; napiši koju. Pevati nemoj, ni u snu; to ću ja. Aj, čo’ek, odoh da pikam loptu.""

Kad te lepo zamole, uradiš, pa čak i kada Bob Marli zvuči kao vojvođanski predratni prevarant.

Da krenemo od zicera. **E** je potpuno na mestu. Nisu sva pravila iste vrednosti. Većina je samo koncenzus, dogovor. Zanimljivo: programeri sami odlučuju šta je "jasnije", bez ikakvog sistematskog istraživanja ili konsultacije sa onima koji se u jezike i razumevanje razumeju. Kadija je omni-sposoban programer, te i tuži i sudi.

Ne razumemo šta tačno znači "čitljivije." To je _promenljiva_ kategorija. Zavisi od faktora koje znamo i koje ne znamo. Jedan od često zanemarenih faktora je "navika". Mozak čoveka obožava repeticiju; ponavljanje je ekvivalencija dobrog, mirnog, bezopasnog. Dobar deo smicalica u kodu za koje tvrdimo da su "čitljivije" jesu samo _navika_. Promeni bilo koje takvo pravilo na godinu dana i gle - usvojio si ga i nije ti više strano. Da postavim u primer: ako kažem da sam bio opsednut sintaksnim "pravilima" kako pisati "dobar" kod, pa, neću dovoljno naznačiti kolika je opsesija bila jaka niti koliko je dugo trajala 🤷‍♂️ Recimo samo da je išlo dotle da sam bio potpuno nabeđen da su tabovi bolji od spejsova i imao nepobitne razloge za to (wtf!) Onda je došao projekat sa nešto drugačijim pravilima; prvo hejtuješ, pa gunđaš, pa se navikneš, pa prođe puno vremena i onda skapiraš.

Šta je problem u `if`/`else`? Ovo _nije_ problem čitljivosti:

```
if what?
  return foo
else
  return bar
```

Ovo _jeste_ problem:

```
if what?
  something
  something
  something
  return foo
else
  something else
  return bar
```

Lint pravilo želi da spreči ovaj drugi primer (a ne ume), a ne prvi primer.

Zašto? [Razumevanje koda](https://oblac.rs/razumevanje-koda/) ima veze sa čitanjem. Usvajanje napisanog ima ograničenja, protok informacija u našu svest ima propusnu moć. I to malu. Razumevanje kratkog je veće od razumevanje dugačkog. Konstrukcija `if` traži da programer _pamti_ uslov za sve vreme trajanja bloka. To je suštinski problem ovog pravila.

Zato su odgovori **A** i **B** besmisleni; nije im mesto u ovakvoj diskusiji. Da li kod potreban ili ne - opet ima veze samo sa razumevanjem. Bolje i nepotreban kod, ako je razumevanje bolje. Uostalom, nije li _dokumentacija_ upravo "nepotreban" kod (koji se ne izvršava)?

**C** je zanimljiv odgovor: ako već `if` nosi kognitivnu težinu, hajde da ga nema. Za početak, `if` mora da postane izraz - to se neće desiti skoro u nekim mainstream jezicima. Dalje, `return` bi trebalo da je samo jedan; i to poslednji. Neki jezici i ne zahtevaju eksplicitno pisanje `return`, podrazumeva se da se vraća rezultat poslednjeg izraza. I konačno, trebalo bi da se otklonimo ka funkcionalnom (rekao bih: proceduralnom), što je tema za drugi put.

**D** je nepotpun. Switch konstrukt - nemam bolji naziv, pod ovim podrazumevam i sve šta liči na njega (_for comprehension_) - zahteva ADT i posle pattern matching. Drugim rečima, ne želiš da ti uslov bude `boolean`. Eto lepog i smislenijeg pravila za lint - izbaciti `boolean` iz potpisa metoda.

**F** je ispravno razmišljanje sa dve pogrešne pretpostavke. Prva je već objašnjena: ne znamo da merimo razumevanje, a odlučujemo o njemu. Druga pretpostavka je da bi trebalo da postoji ubedljiv dogovor programera u firmi oko pravila razumevanja. Pomalo naivno. Umesto toga, bolje je ukloniti sva nejasna pravila ukoliko žuljaju: pisanje koda mora da teče.

----

Na kraju: ni sam ne koristim `else`/`return` konstrukciju. Ali savršeno razumem kod koji ga koristi i ne smeta mi - ukoliko je blok kognitivno kratak. Takođe: ne znači da sam u pravu.

Koristim ovaj primer da prozovem i izazovem "osećaje." Čak i intuicija je samo instiktivni emotivni odgovor svega šta smo naučili i iskusili, koji se takođe uvežbava i osnažuje. Ako želimo [postati inženjeri](https://oblac.rs/pomoz-bog/), moramo biti precizniji. De gustibus non est disputandum.


> 10 Everything's going to be alright
> 20 GOTO 10
