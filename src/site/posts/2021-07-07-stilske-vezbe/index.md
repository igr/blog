---
title: "Stilske vežbe"
date: 2021-07-07T01:07:03+00:00
categories:
  - Razvoj
tag:
  - programiranje
  - osvrt
  - java
  - kod
  - funkcionalno
---

Tri stilske vežbe preuzete iz pravih projekata i jedna fusnota.

<!--more-->

## Jedan

```java
private long foo(final int operationMode, final long input, final byte[] key) {
  return Try.of(() -> {
    // desetak linija koda
    return ByteBuffer.wrap(/* nesto */);
  }).getOrElseThrow(ex -> new IllegalStateException("Failed: " + input, ex));
}
```

Prva stvar koja se uočava je nesiguran izuzetak: nije greška u stanju, već u ulazu. Takvoj grešci je primereniji `IllegalArgumentException` - ili konkretniji, domenski, izuzetak. Šta više, pošto je u pitanju `private` metoda, sve mi se manje čini da ima smisla baviti se izuzecima u njoj. Izuzetke bi mogla da baca javna metoda, koja koristi ovu privatnu metodu. Time podstičemo pravljenje domenskih izuzetaka na poslednjem mogućem mestu u kodu, čime imamo bolji pregled šta želimo da saopštimo korisniku metode.

Druga stvar je korišćenje `Try` monada umesto `if` ili `try` bloka. U primeru se ne vidi, ali tih desetak linija koda značajno uvećava `Try` blok; čini stvari manje čitljivim. Kako bilo, primećujem da se ovakva zamena smatra 'dobrom praksom', kao da korišćenje `Try` ili `Optional` - na ovakav način (!) - nekako pospešuje kod. Takvo razmišljanje nema osnova. Ako već postoji namera da se uvodi kontejner za rezultat, onda ga i treba vratiti:

```java
private Try<Byffer> doit(...) { }
```

S druge strane, korišćenje starog dobrog - i jasnog - `try` bloka omogućava da se izuzetak hvata samo tamo gde se i baca:

```java
// početni blok
try {
  // srednji blok
} catch (Exception ex) {
  ...
}
// kranji blok
```

Naravno, ako se složimo da to uopšte želimo da radimo.

## Dva

```java
return Optional<List> doit() {
  // izračunaj listu
  return Optional.ofNullable(list)
}
```

Na prvi pogled je sve u redu: metoda vraća `Optional` umesto `null` - to je dobra stvar, zar ne?

Tačno je da ne treba vraćati `null`. Međutim, već vraćamo kontejner koji ima informaciju o tome ima li ili nema elemenata. Nema potreba ponovo wrapovati `List` još jednim `Optional` - to je dvostruko, bespotrebno wrapovanje sadržaja. Umesto treba vratiti praznu listu.

Na drugu stvar bih značajno više obratio pažnju: (i)mutabilnost vraćene liste. Vraćanje imutabilne verzije liste je kul, ali je runtime rešenje. Pošto ovo nije Kotlin, jedno rešenje je vratiti read-only interfejs liste, kao na pr. `Iterable` ili `Stream` - zavisi od slučaja korišćenja.

## Tri

```java
public static Either<String, Number> parseStringToNumber(String number) {
    try {
        return Either.right(Integer.parseInt(number));
    } catch (NumberFormatException ignore) {
        return Either.left(number);
    }
}

public static void execute(String... numbers) {
    final List<Number> validNumbers = new LinkedList<>();
    final Set<String> invalidInputs = new LinkedHashSet<>();

    Arrays.stream(numbers)
        .forEach(number ->
            parseStringToNumber(number)
                .bimap(invalidInputs::add, validNumbers::add)
        );

    validNumbers.forEach(System.out::println);
    invalidInputs.forEach(System.out::println);
}
```

Ovo je primer _bulk_ obrade podataka. Naizgled, sve je OK.

Prva korekcija bi bila upotreba `fold` umesto `bimap` - nema potrebe za ponovnim kreiranjem `Either` kontejnera nakon mapiranja.

Pomalo upitno je korišćenje ulazne vrednosti kao _left_ u rezultujećem `Either`, koji se po prećutnom dogovoru koristi za opis greške (na pr. izuzetak). Hajde da sada pređemo preko toga; lako je napraviti `Either`-oliku klasu koja bi više odgovarala domenu gornje konverzije.

Najveći problem ovde je u toku, tj. u ne-čistoti procesiranja ulaznog strima. Side-efektima se pune kolekcije `validNumbers` i `invalidInputs`, dok se glavno procesiranje strima završava foldovanjem u `boolean`-ove (rezultate operacije `add`), a zatim taj rezultat potpuno _odbacuje_. To se da rešiti, na primer:

```java
enum EitherMark {RIGHT, LEFT}
// ...
var s = Arrays.stream(numbers)
    .map(PrimerTri::parseStringToNumber)
    .collect(Collectors.groupingBy(it -> it.isRight() ? EitherMark.RIGHT : EitherMark.LEFT));

final List<Number> validNumbers = s
    .get(EitherMark.RIGHT)
    .stream()
    .map(Either::get)
    .collect(Collectors.toList());

final Set<String> invalidInputs = s
    .get(EitherMark.LEFT)
    .stream()
    .map(Either::getLeft)
    .collect(Collectors.toCollection(LinkedHashSet::new));
```

Moglo je i bez `enum`-a, koristeći kraći `Collectors.partitionBy` i `Bool` rezultat. Gledam da izbegavam magične vrednosti, otuda insistiranje na `enum`. Da, ime `EitherMark` nije najsrećnije izabrano; no već je kasno i umoran sam da smišljam bolje.

Sad, Java je prilično smorna kada treba pisati implementacije kolektora. No korak dalje bi bilo napisati jedan takav kolektor koji radi mapiranje tokom obrade, kako ne bi to radili ekspliticno posle, te bi rezultat bila `Map<EitherMark, List<?>>`. A možda možemo izbeći i mapu, te kolektovati u `Either<List<>, List<>>`? Probaj, čik!

## Fusnota

Sve su ovo bili primeri iz živih projekata. Pisali su ih dobri programeri. Ipak, nalazim da je moglo da se ode korak dalje.

No pitanje koje sve više postavljam u poslednje vreme je: teram li to mak na konac? Nisam li sitničav? Prvobitno napisan kod _radi_; time bi ovakva izmena postala skupa, zar ne? Dodatno postoji osnovana šansa da se usput autorima stane na žulj, te može nastati više štete nego koristi.

Da li je ovo softversko inženjerstvo? Ili je to samo hobi programiranje?

Da li je ovakvo razmišljanje vredno?

Rekao bih, sve manje. Te ako ste stigli sa čitanjem do ovde, izvinite na oduzetom vremenu.
