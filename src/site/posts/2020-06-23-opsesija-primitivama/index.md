---
title: "Opsednutost primitivnim"
date: 2020-06-23T01:07:03+00:00
categories:
  - Razvoj
tag:
  - clean-code
  - refaktoring
  - razvoj
  - java
  - kotlin
  - oblacodemia
---

Postoji jedan _code smell_ na koji naročito obraćam pažnju. I gotovo je sigurno da ste koliko danas naišli na ovaj nepoželjni obrazac u programiranju i olako prešli preko njega.

<!--more-->

Uobičajena linija u kodu koji se uspešno kompajlira:

```java
String id = book.getId();
```

Ništa neobično, zaista. Desetak linija kasnije:

```java
findAuthor(id);
```

I dalje je sve u redu: dobavljam ključ knjige, a potom potražujem njenog autora. Sve OK.

Osim... što ovde _ništa_ nije u redu.

## Omiriši, pa obriši

Ono što u ove svega dve linije koda smeta je tkzv. _primitive obsession_ - korišćenje uobičajenih, generalnih tipova, u ovom primeru `String`-a. Problem je što metod `findAuthor` traži `id` _autora_, a ne knjige. Sve i da poboljšamo imenovanje varijable gornji kod i dalje ostaje nejasan; posebno je opasno to da se kod koji sadrži grešku _uspešno kompajlira_. Programer je ovde dužan da sam vodi računa da prosledi odgovarajući `id` pravoj metodi. Sa povećanjem volumena koda, mogućnost za grešku se takođe uvećava.

Uzrok problema je to što iz navike koristimo uobičajene, generičke tipove, koji dolaze zajedno sa programskim jezikom. String je ništa drugo do niz karaktera; a mi tom nizu svaki put pridodajemo drugačije značenje, zavisno od mesta upotrebe. Dobra praksa programiranja je da jedan kocept radi jednu i samo jednu stvar (**S**RP); očigledno se ovde odstupa od toga.

Rešenje je očigledno - ključ `id` ne treba da bude `String`. Svaki ključ treba da ima svoj jednoznači tip, zavisno od modela kojem pripada. Tako gornji kod postaje:

```java
BookId id = book.getId();
findAuthor(id);  // compile error
```

te sam kompajler uočava grešku: metoda `findAuthor` zaheva tip `AuthorId`. Oba ova tipa ključa, `BookId` i `AuthorId`, se jednostavno implementiraju kao data-klase s jednim propertijem. On interno sada može da čuva vrednost ključa kao `String`. Drugim rečima, tip `String` se koristi u _implementaciji_ ključa, a ne u njegovoj definiciji.

## Opasani ograničenim

Ovakva izmena nije trivijalna. Vrlo je verovatno da će modeli završiti u JSON serijalajzeru, te rezultuju sledećim:

```json
{
  "id": {
    "value": "..."
  },
  ...
}
```

Slično je i u obratnom pravcu, kod parsiranja JSON-a i pretakanje vrednosti u objekat.

Neophodno je, dakle, da se za svaki tip ključa posebno piše kod za de/serijalizaciju. Ovaj kod je notorno dosadan. Evo primera za to u Kotlinu, za ključeve koji su numerički:

```kt
@Serializable(with = BookIdSerializer::class)
data class BookId(val value: Int) {
  override fun toString() = value.toString()
}

@Serializer(forClass = BookId::class)
object BookIdSerializer : KSerializer<BookId> {
  override val descriptor: SerialDescriptor =
    PrimitiveDescriptor("BookIdSerializer",
      PrimitiveKind.INT)

  override fun serialize(encoder: Encoder, value: BookId) {
    encoder.encodeInt(value.value)
  }

  override fun deserialize(decoder: Decoder): BookId =
    BookId(decoder.decodeInt())
}
```

Ovaj kod se ne može uopštiti: ako ništa drugo, na kraju koristimo konstruktor konkretnog tipa. Naslućujem sledeće pitanje: pa ako bi već trebalo da koristimo konkretne tipove u modelima, to znači da moramo da pišemo sav ovaj kod za svaki ključ u domenu, a zna da ih bude pozamašan broj? Nije li to još više koda o kome treba voditi računa? Na kraju ispada da je preterala dara meru!

## Poetska pravda

Rezonovanje je na mestu: skuplje je održavati gornji kod za svaki ključ nego voditi računa o opsesiji. Tehničko ograničenje nametnuno korišćenim bibliotekama se prihvata kao stanje stvari.

Osim... što ne mora tako.

Generisanje koda je jedna od pragmatičnih tehnika koje nadomešćuju nedostatke jezika ili biblioteka. Java donosi `APT`: procesor za anotacije. Kotlin ga donekle nasleđuje kao `KAPT`, koji nije u potpunosti sposoban kao izvorni Javin, ali sasvim radi posao. Ovim procesorom se mogu 'uhvatiti' anotacije u kodu _pre_ kompajliranja i to se može iskoristiti za generisanje koda, koji postaje ravnopravni deo projekta.

Ceo gornji blok koda se može izgenerisati iz jednostavne linije:

```kt
@IdGen
val _BookId: Id = GENERATED()
```

Pomenuta ograničenja `KAPT`-a (ili moje neznanje) traže postojanje ovakve konstante u kodu koja će biti označena anotacijom prisutnom samo u sorsu. Odatle, procesor za anotacije preuzima posao i generiše sav onaj kod gore. Ako bih da sitničarim: voleo bih da ova linija može da nestne iz koda, nakon procesiranja.

Generisanje koda je puko sastavljanje sadržaja fajla koji će biti kompajliran zajedno sa ostatkom koda. Da se ne bi puno pogrešilo u tom prekrajanju stringova, zgodno je koristiti pomoć. Jedna takva biblioteka je i "Kotlin Poet" (verzija "Java Poet"-a namenjena Kotlinu), koja daje prijateljski DSL za konstruisanje sorsa.

Sa poetom na našoj strani možemo pustiti maštu na volju. Zgodno je, na primer, izgenerisati i sledeće _extended_ funkcije:

```kt
fun Int.toBookId(): BookId = BookId(this)
fun String.toBookId(): BookId = BookId(this.toInt())
fun EntityID<Int>.toBookId(): BookId = BookId(this.value)
```

koje se bave konverzijom tipova.

## Dometi opsesije

Da li su samo ključevi predmet opsesije? Naravno da ne. Gotovo da svako polje u modelu može da ima svoj zaseban tip. Neka polja se mogu grupisati: tip adrese bi uključio nekoliko podataka (ulica, broj, grad). No ako bi me pitali gde je granica, ne bih umeo da preciziram. Insistiram da ključevi budu zasebni tipovi, blagonaklon sam prema svim poljima koja se nekako koriste u domenskoj logici, a puke (pre)nosioce informacija ostavljam primitivnim.

Opsesija nije samo okrenuta brojkama i slovima; sledi podjednako uznemiravajući potpis Java metode:

```java
public List<Book> getAllBooks();
```

Najčešće ovakvu listu ne menjamo, već je iteriramo i procesiramo. Tada povratni tip `List` sadrži više toga nego što nam zaista treba. Čemu onda uopšte da dovodimo programera u situaciju da može da učini listi nešto što ne želimo?

Zato insistiram na što "fokusiranijim" povratnim tipovima: vrati samo ono što ukazuje na nameru predviđenog korišćenja. Gornji potpis se može 'suziti' vraćanjem nekog `Iterable`. Korak dalje bi bilo zapravo ne vratiti ništa, već ponuditi opcije za predviđena korišćenja rezultata:

```java
public void forEachBook(Consumer<Book> c);
```

Ili pak vratiti konktekst sa spiskom funkcija koje se dalje na njega mogu primeniti.

Kako bilo, sve je bolje nego vratiti uobičajene tipove, kao što su `List` ili `Map`. To su, ponavljam, generički tipovi, namenjeni za širok spektar upotreba. Na njih gledam kao sredstva za _implementaciju_, koja treba da ostane nevidjiva za korisnika, a ne kao elemente dizajna sistema.

## Oblacodemia

_Primitive obsession_ je jedan od programskih mirisa kojima se bavim na `Clean Code` radionici, u sklopu [Oblacodemia](https://oblacodemia.com).