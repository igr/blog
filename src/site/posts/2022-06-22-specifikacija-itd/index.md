---
title: "Specifikacija itd."
date: 2022-06-22T01:07:03+00:00
categories:
  - Razvoj
tag:
  - razvoj
  - arhitektura
  - modeli
  - domen
  - specifikacija
---

Kako znaš da funkcija radi šta i kako treba?

<!--more-->

(Unapredio sam [primer](https://github.com/igr/paywent) kako bi mogli da pričamo.)

Jedna od poslovnih funkcija je `AddProfile`. Reč je o funkciji koja dodaje novi profil u sistem. Kako znamo da ova funkcija radi kako treba? Odgovor nije "testovima".

Testiranje može dokazati da je program pogrešan, ali ne može dokazati da je tačan.

## Specifikacija

Tačan odgovor je: "specifikacijom" funkcije. Ovo što pričam nije ništa novo; no u nekom ponovnom krugu profesionalne samo-spoznaje uočavam da nam nedostaje ova tema. Specifikacija je zamenjena klikni-dok-ne-pukne-testiranjem, na koje nalepimo etiketu "QA" i - svi srećni.

Specifikacija funkcije opisuje kako se menja postojeće stanje konteksta kada se na njega primeni funkcija. Nisam vičan definicijama, pa ovo ne uzimati kao takvu.

Primer bi izgledao ovako:

> U kontekstu u kome ne postoji profil imena `N`, nakon pozivanja funkcije `AddProfile(N)`, u kontekstu postoji jedan i samo jedan profil imena `N`.

Specifikacija se piše u zasebnom modulu (ne kao test!). Na primer:

```java
public class AddProfileSpec implements Specification {
  private final AddProfile addProfile;
  void add_new_profile() {
    final ProfileName profileName =
      ProfileName.of("PROFILE A");

    // given (setup)
    given(profileNameDoesntExist, profileName);

    // when (exercise)
    addProfile.invoke(
      NewProfile.builder()
        .name(profileName.get())
        .build());

    // then (verify)
    then(profileNameExist, profileName);
  }
}
```

Digresija: da li je ovo BDD (ili Testiranje-u-4-faze)? Iako koristim `given` i `then`, mislim da idemo malkice dalje od BDD u formalnijem pravcu. Ako ti se čini da ipak jeste - skroz okej; prosto nisam imao prilike da vidim BDD u punom sjaju: samo u salati krastavac-testova.

Specifikacija definiše kako se ponaša funkcija `AddProfile` u kontekstu. Uprošćeno: ako je stanje `A`, pozivom funkcije `F`, novo stanje je `B`. Ako je kontest `2`, pozivom funkcije `3*x`, novo stanje je `6`. I to je to.

Da li je ovo matematika? Ne još. Bila bi kada bi dozvolili sebi da potpuno definišemo specifikaciju. Na primer, nije specificirano šta sve može biti ime profila; šta kada sistem već postoji profil itd. Postoji i ciklična zavisnost od provere stanja konteksta (bar u mom primeru) - koristim isti API koji definišem specifikacijom da ga ujedno i potvrdim :)

## Provera implementacija

Konačno, testiranje. Konkretna implementacija mora da radi prema specifikaciji. U primeru: `app-impl` modul mora da radi po `app-spec` specifikaciji. Testovi se svode samo na _konfiguraciju_: dostavljanje implementacije specifikaciji.

Zvrčka: implementacija zavisi od nove komponente, repozitorijuma. Nema druge, potrebno je da napravimo specifikaciju i tog modula.

Drugim rečima: komponenta je definisana **1) svojom apstraktnom barijerom i 2) njenom specifikacijom**. Tek tada implementacija postaje detalj.

Na sličan način se stvara specifikacija repo modula. Imamo mogućnost da napravimo i "in-memory" implementaciju, koju možemo da koristimo prilikom provere implemetacija downstream komponenti, `app-impl` (da ne bi koristili bazu u testovima za `app`). Drugim rečima, bilo kakvo mokovanje upstream komponente mora takođe da odgovara njenoj identičnoj specifikaciji.

## Primer je tek početak

Primer na Github je tek (naivan) početak; zagrebao sam po površini.

Napravio sam "in-memory" implementaciju repozitorijuma, koji interno koristi `HashSet`, isključivo da što pre završim primer. Drugi način bi bio - pažnja - nemati konkretnu implementaciju; već čuvati samo niz ponašanja (!). Izbaci `HashSet`; šta preostaje? Nekakav niz pravila (`if`-`then`) koji može da postoji bez funkcionalne implementacije. Nema razloga da zaista perzistiramo stanje (u memoriji, testnoj bazi itd); dovoljno je da imamo niz pravila koji to oponaša.

Da li je izrada specifikacija skupa za izradu? Skupo je koliko je nevažno da specifikacija bude ispoštovana (obrnuto proporcionalno).

Da li ima mesta za uobičajene testove? Da, postoji kod koji nisu poslovne funkcije.

"Ma, to su sve samo testovi...", kažeš ti. Okej, nisu :) Kako god nazivali, bitan je pristup. Specifikacijom želimo da definišemo ponašanje, što tačnije, što preciznije. Testovi potvrđuju implementaciju specifikacije, a ne samu specifikaciju. Specifikacija je starija od testova.

## Kraj primera

Nekoliko poslednjih tekstova čini celinu; ovim je završavam.

Da li sam sve ovo koristio u praksi? Ne budi smešan.

Idemo dalje.