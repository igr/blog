---
title: "Dva mirisa"
date: 2021-09-30T01:06:08+00:00
categories:
  - Razvoj
tag:
  - razvoj
  - rest
  - test
  - api
  - funkcionalno
---

# Dva mirisa

Iz svakodnevnog života programera.

<!--more-->

## Testiranje i slojevi

SpringBoot aplikacija. Postoji servisni sloj, uobičajene Spring komponente, rade sa bazom. Postoji tanak sloj kontrolera, koji uglavnom samo pozivaju servise; služe da definišu API-je, auth provere, validaciju i sl. Ukratko, nema mnogo iznenađenja, što je dobra stvar.

Na koje načine programeri mogu da pišu testove?

1. Pišemo _zasebne_ testove za servisni sloj, kojima detaljno testiramo biznis logiku. Ovi testovi rade sa bazom. Zatim pišemo _zasebne_ lagane testove za kontrolere, koji se najviše bave mapiranjem i validacijama. Oni rade sa mock-ovanim servisima i upitima i ne trebaju bazu niti testni server.
2. Pišemo testove za kontrolere i servise zajedno, jer tako proveravamo, jelte, ceo tok zahteva/odgovora: od poziva API-ja sve do baze. Ovi testovi zahtevaju i testni server i bazu.

Koji pristup odabrati?

Drugi pristup deluje kao zicer: testiramo API-je od HTTP zahteva do baze, pa nazad kroz HTTP odgovor. Pokrivamo time sve slojeve i mnogo više koda odjednom. To je dobra stvar, zar ne? Reč je, zapravo, o funkcionalnim testovima, zar ne?

Nisam za to da programeri pišu funkcionalne testove. Bliži mi je prvi pristup - programeri pišu unit i integracione testove. Dalje, u drugom pristupu se testira _previše_ toga odjednom. Jedan deo onoga što pokrivamo takvim testovima su i sami alati (spring, http, mapiranja), što je nepotrebno u svakodnevnom radu. Ponavljam, testiraju se i _implementacioni detalji_, a to nije ideja ovih testova.

Vrednujem granularne testove, po slojevima. Servisni sloj zaslužuje zasebne testove, koji ne uključuju bilo kakvog klijenta. Klijentski sloj zahteva lagane mokovane testove, jer nema razloga podizati testing server i slati prave HTTP zahteve samo da bi proverili da li radi mapiranje JSON sadržaja na neki tip - koji je upravo upotrebljen za generisanje API šeme!

Tačno je da suma proverenih komponenti ne znači nužno da zajedno rade kako treba - osim ako se testovi ne pišu tako. Gledam da svaku granicu testiram sa _obe_ strane; na način koji izdaleka podseća na PACT testove. Kako bilo, ostavljamo prostor i za zasebne funkcionalne testove, koji nisu deo svakodnevne rutine programera i koji ne blokiraju razvoj.

## Zip i Tuple1000

Uobičajena metoda u funcionalnom programiranju je `zip()`. Ona, ukratko, spaja više ulaze u jedan.

U reaktivnom steku, `zip()` deluje vrlo pogodna da spoji nekoliko paralelnih strimova. Primer, napisan uprošćenim kodom:

```java
var org = orgRepo.save(orgInput);
var addr = addressRepo.save(addresInput);
var contact = contactRepo.save(contactInput);
var user = userRepo.findById(userId);

return Mono
  .zip(org, addr, contact, user)
  .map(tuple4 -> {
    // konstruiši rezultat od T1-T4
  });
```

Ovaj kod (uglavnom) radi.

Blok prvog sledećeg `map()` poziva (koja praktično uvek ide iza `zip()`) će biti veliki. Koristiće se `getT1()`...`getT4()` metode za dobavljanje elemenata tuplea, čija imena ništa ne znače, te treba dodatno kognitivno pratiti mapiranja ulaza. Promena argumenata `zip()` metode zahteva promenu na više mesta nego što je to očekivano, a to nije miris koji cenimo u kodu. Vrlo lako se tu uveče i neko `if`, čime kompleksnost bloka poraste.

Može i drugačije:

```java
Function<Org, Mono<Org>> orgWithAddress =
  org -> addressRepo
      .save(addressInput)
      .map(List::of)
      .map(org::withAddress)
      .switchIfEmpty(Mono.just(org));

Function<Org, Mono<Org>> orgWithContact =
  org -> contactRepo
      .save(Contact.builder()
          .orgId(org.getId())
                    .userId(userId)
                    .build())
      .map(org::withContact);

Function<Org, Mono<Org>> orgUpdateContact =
  org -> userRepo
      .findById(userId)
      .map(it -> org.getContact().withName(it.getName()))
      .map(org::withContact);

return orgRepo
      .save(orgInput)
      .flatMap(orgWithAddress)
      .flatMap(orgWithContact)
      .flatMap(orgUpdateContact);
```

Drugim rečima, `zip()` četiri elementa se može pretvoriti u tri `flatMap()` poziva. Gornji kod je izvučen iz projekta i očišćen za potrebe primera, te možda nije potpuno ispravan.

Ovakav način razmišljanja mi je bliži. Gledam da postepeno modifikujem ulaz zasebnim funkcijama, koje su zgodne za novu upotrebu.

### Kad ono, međutim

Sekvencijalni pozivi `flatMap` su neophodni kada zavise jedan od drugoga. Šta ako su ovi pozivi nezavisni? Onda ima smisla pozvati ih paralelno; a `flatMap` to ne može sam da uradi?

Zavisi od implementacije. Spring ne nudi još `parallel().runOn()`, tako da se `zip()` vraća u igru. Da ponovim, `zip()` kombinuje rezultate paralelnih strimova. Hajde da pogledamo novi primer, koji pravi kompoziciju više objekata:

```java
Function<Org, Mono<Org>> orgWithAddress =
    org -> addressRepo
        .findByOrg(org.getId())
        .map(addressMapper::map)
        .collect(Collectors.toList())
        .map(org::withAddress)
        .switchIfEmpty(Mono.just(org));

Function<Org, Mono<Org>> orgWithContact =
    org -> contactRepo
        .findContactByOrgId(org.getId())
        .map(contactMapper::map)
        .map(org::withContact)
        .switchIfEmpty(Mono.just(org));

return orgRepo
    .findById(id)
    .switchIfEmpty(...)
    .map(orgMapper::map)
    .flatMap(orgWithAddress)
    .flatMap(orgWithContact);
```

Poslednja dva poziva `flatMap()` mogu biti izvršena paralelno, zar ne? Podaci o adresama i kontaktu su nezavisni, te možemo da ih `zip`-ujemo:

```java
Function<Org, Mono<Org>> zip =
    org -> Mono
        .zip(Mono.just(org),
            orgWithAddress.apply(org),
            orgWithContact.apply(org)
        )
        .map(Tuple2::getT1);

return orgRepo
    .findById(id)
    .switchIfEmpty(...)
    .map(orgMapper::map)
    .flatMap(zip);
```

Kul! Zar ne? Zar neeeee!?

Bilo bi kul da ne radimo sa imutabilnim objektima. Metoda `withXxx()` pravi novu instancu, tako da su rezultati funkcija koji su argumenti `zip` metode zapravo tri različita imutabilna objekta, od kojih se samo prvi, neizmenjen, vraća nazad. To nije ono što smo hteli: da paralelno izvršimo funkcije, ali sekvencijalno spojimo rezultate. Zato:

```java
Function<Org, Mono<List<Address>>> orgAddresses =
    org -> addressRepo
        .findByOrg(org.getId())
        .map(addressMapper::map)
        .collect(Collectors.toList())
        .switchIfEmpty(Mono.just(List.of()));

Function<Org, Mono<Contact>> orgContact =
    org -> contactRepo
        .findContactByOrgId(org.getId())
        .map(contactMapper::map);

Function<Org, Mono<Org>> zip =
    org -> Mono
        .zip(Mono.just(org), orgAddresses.apply(org), orgContact.apply(org))
        .map(it -> it.mapT1(x -> x.withAddress(it.getT2())))
        .map(it -> it.mapT1(x -> x.withContact(it.getT3())))
        .map(Tuple2::getT1);

return orgDao
    .findById(id)
    .switchIfEmpty(...)
    .map(orgMapper::map)
    .flatMap(zip);
```

Trik za de-tuplovanje. Java još uvek NE poznaje destrukturalizaciju (čik izgovori ovu reč brzo!); kad će, neće skoro. Rešavam to u koracima na prikazani način. Naravno, moglo je spojiti dva `mapT1` poziva u jedan; nemam primedbu na to. Ovako mi je za nijansu čitljivije - bar je tako danas.

Kul! Zar ne? Nee!????

Stvar sa `zip()` je da emituje isključivo kada _svi_ ulazni strimovi dostave svoje vrednosti. Problem je štp `orgContact` više ne definiše `switchIfEmpty()`, te ukoliko nema kontakta `zip()` daje prazan rezultat. To otvara drugu kutiju drugarice Pandore, punu `null` i nepostojećih vrednostima; ostavljam je za neki drugi put.

Ima još jedna zvrčka. Da li su dva paralelna poziva brža od dva sekvencijalna? Očigledan odgovor je da jesu; dva paralelna poziva traju koliko jedan najduži, te su svakako kraći od zbira trajanja dva sekvencijalna poziva. Osim ako zajednički working thread pool nije zagušen, pri nešto uvećanom saobraćaju. Kako isti pool opslužuje sve paralelne operacije, može se desiti da se na drugi poziv _čeka_ više nego što bi trebalo. Drugim rečima, trajanje dva paralelna poziva jednako je trajanju najdužeg PLUS vreme čekanja između dva poziva. Eto nam još jedne Pandorine kutije.

Uh, nisam planirao ovoliko teksta. Posle kažu, lako je programirati.
