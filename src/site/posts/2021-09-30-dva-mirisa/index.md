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

Drugi pristup deluje kao zicer: testiramo naš API-je od HTTP zahteva do baze, pa nazad kroz HTTP odgovor. Pokrivamo time sve slojeve i mnogo više koda odjednom. To je dobra stvar, zar ne? Reč je, zapravo, o funkcionalnim testovima, zar ne?

Nisam za to da programeri pišu funkcionalne testove. Bliži mi je prvi pristup - programeri pišu unit i integracione testove. Dalje, u drugom pristupu se testira _previše_ toga odjednom. Jedan deo onoga što pokrivamo takvim testovima su i sami alati (spring, http, mapiranja), što je nepotrebno u svakodnevnom radu. Ponavljam, testiraju se i _implementacioni detalji_, a to nije ideja testova.

Vrednujem granularne testove, po slojevima. Servisni sloj zaslužuje zasebne testove, koji ne uključuju bilo kakvog klijenta. Klijentski sloj zahteva lagane mokovane testove, jer nema razloga podizati testing server i slati prave HTTP zahteve samo da bi proverili da li radi mapiranje JSON sadržaja na neki tip - koji je upravo upotrebljen za generisanje API šeme!

Tačno je da suma proverenih komponenti ne znači nužno da zajedno rade kako treba - osim ako se testovi ne pišu tako. Gledam da svaku granicu testiram sa _obe_ strane; na način koji izdaleka podseća na PACT testove. Kako bilo, ostavljamo prostor i za zasebne funkcionalne testove, koji nisu deo svakodnevne rutine programera, i koji ne blokiraju razvoj.

## Zip i Tuple1000

Uobičajena metoda u funcionalnom programiranju je `zip()`. Ona, ukratko, spaja više ulaze u jedan.

U reaktivnom steku, `zip()` deluje vrlo pogodna da spoji nekoliko non-blocking poziva. Na primer, napisano uprošćenim kodom:

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
Ovaj kod radi.

Međutim, blok prve sledeće `map()` (koja praktično uvek ide iza `zip()`) će biti baš veliki. Koristiće se `getT1()`...`getT4()` metode za dobavljanje elemenata tuplea, čija imena ništa ne znače, te treba dodatno kognitivno procesirati mapiranja ulaza.

To sve može drugačije:

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

Function<OrgDto, Mono<OrgDto>> orgUpdateContact =
  org -> userRepo
      .findById(userId)
      .map(it -> org.getContact()
            .withName(it.getName())
      )
      .map(orgDto::withContact);

return orgRepo
      .save(orgInput)
            .flatMap(orgWithAddress)
            .flatMap(orgWithContact)
            .flatMap(orgUpdateContact);
```

Drugim rečima, `zip()` četiri elementa se može pretvoriti u tri `flatMap()` poziva. Gornji kod je izvučen iz projekta i očišćen za potrebe primera, te možda nije potpuno ispravan.

Kako bilo, uočavam da često vrlo brzo skrenemo u imperativni način razmišljanja, koji podrazumeva ogromne blokove koda unutar, na pr., `map()` ili `flatMap()` poziva. Iako takav kod radi posao, smatram da nije u duhu paradigme i _postepenoj_ modifikaciji ulaza našim funkcijama.
