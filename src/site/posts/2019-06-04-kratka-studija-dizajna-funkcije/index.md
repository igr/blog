---
title: "Kratka studija dizajna funkcije"
date: 2019-06-04T08:07:03+00:00
slug: "kratka-studija-dizajna-funkcija"
categories:
  - Razvoj
tags:
  - razvoj
  - framework
  - programiranje
  - java
  - kotlin
  - funkcionalno
---

Zadatak je jednostavan. Dat je skup resursa. Svaki resurs treba proveriti istim setom pravila; rezultat provere pravila je nekakva ocena. Sve ocene resursa se čuvaju, a proračunava se i finalna ocena resursa. To je sve.
<!--more-->

## Imperativno razmišljanje

Okej, treba iterirati niz resursa. Za svaki resurs pojedinačno proračunam `Score`, ocenu. Proračun ocena započinje kreiranjem niza provera, `List<Check>`. Svaki `Check` je `Function<Resource, Health>`. Dakle, iteriram svaki `Check`, primenim ga na `Resource` da bih dobio `Health`, a zatim tako dobijenu ocenu skladištim u `Score`, koji je zajednički za sve provere jednog resursa.

Rečima koda, nešto ovako:

```java
Map<String, Score> validate(List<Resource> resources) {
	return resources.
		stream()
		.map(this::calcStore)
		.collect(Collectors.toMap(
			Score::getResourceId(),
			Function.identity()
		);
}

Score calcScore(final Resource resource) {
	Score score = new Score(resource.getId());

	Checks.createAllChecks().forEach(resourceCheck -> {
		Health health = resourceCheck.apply(resource);
		score.addHealth(resourceCheck.id(), health);
	});

	return score;
}
```

Kod radi. No, da li ovo to što želimo?

## Zamućenost funkcija

Funkcija `calcScore()` mi ne dozvoljava da se opustim, iako radi šta treba. Nije reč o kompleksnosti koda, koja je ovde mala. Reč je o uvreženosti i toku podataka. Naivno to nazivam 'zamućenost' koda. Naime, ako bi svaki tip koji se koristi u funkciji imao svoju boju (ok, možda malo previše razmišljam o ovome :), i ako svako pridruživanje (`new` ili `getXxx`) unosi valer, krajnji miks boja dosta govori.

Lambda u `forEach` koriste objekat koji dolazi izvan (`resource`). Dalje, kreira se vrednost `Health`, da bi se već u sledećem koraku iskoristila dalje. S druge strane, nema smisla da lambda uopšte bude svestna `Score`.

Druga stvar je važnija i ne uočava se iz gornjeg koda: postoji nemali broj mogućnosti kako dizajnirati klase `Score`, `Health`... i njihov odnos. Ni jedan od tih načina nije posebno loš ili dobar. Svodi se na lični izbor, na kraju krajeva - što baš i nije vrlina koda. 

## Funkcionalno razmišljanje

Napomena: ovo što sledi je samo primer - _ogled_ jednog načina razmišljanja.

Funkcije posmatram kao _jediničnu transformaciju_. One su korak transformacije ulaza. Rešenje problema je sada niz tranformacija koje treba primeniti na ulaz (`List<Resource>`) da bi došli do rezultata (`Map<String, Score>`). Nešto ovako:
 
```
List<Resource> -> Resource ->
Check -> CheckHealth ->
Map<Id, Status>
```

Uočite: još uvek ne razmišljam šta konkretno da uradim da bih došao do rešenja. Umesto toga se fokusiram samo na transformacije ulaza.

Najveća prednost (po mom skromnom mišljenju) ovakvog pristupa je što značajno usmerava dizajn funkcija i modela! U imperativnom razmišljanju sam morao sam da donosim odluku kako će modeli biti uvezani, zavisno od pristupa rešavanju problema. Funkcionalno razmišljanje me oslobođa toga: sami koraci i jedinične transformacije usmeravaju dizajn domena.

Kod bi mogao da izgleda ovako:

```java
return dataset
  .getResources()
  .stream()

  .map(Checks::createAllChecks)
  .flatMap(Collection::stream)

  .map(Supplier::get)

  .collect(Collectors.groupingBy(
    CheckHealth::getResourceId,
    (Supplier<Map<String, Score>>) HashMap::new,
    new Collector<CheckHealth, Score, Score>() {
      //... big code
    }
  ));
```

Da li je ovo zaista bolje?

Da, ovo je bolje. Da li može čitljivije - može, naravno. Na primer, iako je provera `Supplier`, dozvolio bih zaseban funkcionalni interfejs koji bi imenom obevaštavao da radimo zaista provere (na pr: `checkResource()`). Kolektori su posebna priča: u gornjem primeru nisu na prvo čitanje jasni, ali se daju bar izmestiti u posebne klase. Tu već negde udaramo u funkcionalna ograničenja Jave (i nepostojanja monada kao osnovne gradivne jedinice koda).

Suština boljitka je u pristupu. Ponavljam, primenjujemo jedinične transformacije sve dok ne dobijemo željeni izlaz. Ništa više, ništa manje. To je vrednost. 

## Isto to, sada u Kotlinu 

Iskreno, gornji Java kod nisam napisao 'iz rukava', naročito deo sa kolektorima na kraju. Igre radi, okušao sam se u Kotlinu:

```kotlin
database
  .resources
  .map { ResourceEx(it) }
  .map { Checks(it) }
  .map { it.createAllChecks() }
  .flatten()
  .pmap { it.check() }
  .groupBy(
          { it.resourceEx },
          { it }
  )
  .mapValues { Score(it.key, it.value) }
  .mapKeys { it.key.resource.id }
```  

Meni je ovaj kod baš legao. Nije sve moralo u ovoliko koraka, ali - zašto da ne. Ima tu stvari i koje se ne vide, kao na primer keširanje na nivou resursa (radi boljih performansi).

Jedinične transformacije ulaza. Samo to zapamtite kao ideju - u redu, sada sam i zvanično dosadan :)
