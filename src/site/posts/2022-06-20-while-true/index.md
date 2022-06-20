---
title: "while(true)"
date: 2022-06-20T01:07:03+00:00
categories:
  - Razvoj
tag:
  - razvoj
  - kod
  - kotlin
  - funkcionalno
  - oop
---

Iskodirao sam trivijalnu `while(true)` petlju za dovlačenje svih elemenata kolekcije po stranicama.

Nije mi se dopalo to što sam napisao.

<!--more-->

Kod izgleda ovako:

```kt
fun one(): List<String> {
  val list = mutableListOf<String>()
  var offset = 0

  while (true) {
    val batch = fetch(offset, 10)
      list.addAll(batch)
      if (batch.size < 10) break
      offset += batch.size
  }
  return list
}
```

Prilično uobičajen način dovlačenja elemenata po stranicama.

## Smetnje

Smeta mutabilna kolekcija koja traje celu metodu. Bilo kada u toku trajanja metode programer može poremetiti listu.

Smeta što se u toku iste metode raštrkano barata sa ofsetom, koji je takođe promenljiv.

Smeta što je dovlačenje elemenata čvrsto uvezano sa ovim konkretnim kodom, te pozivanje drugog nekog API-ja zahteva ponovno pisanje iste logike.

Smeta što se niz koncepata (skladištenje elemenata, while petlja, dovlačenje elemenata) prepliće u krhkoj ravnoteži, koju je lako poremetiti.

## Bez while

Posegao sam za drugačijim rešenjem:

```kt
open class Pager<E> private constructor(
    private val offset: Int,
    private val limit: Int,
    val elements: List<E>) {
  open val ended = elements.isEmpty()
  companion object {
    fun <T> start(pageSize: Int) =
      object: Pager<T>(0, pageSize, emptyList<T>()) {
        override val ended = false
      }
  }
  fun next(fn: (offset: Int, limit: Int) -> List<E>): Pager<E> {
    if (ended) throw IllegalStateException("End of pages")
    val nextOffset = offset + elements.size
    return Pager(nextOffset, limit, fn(nextOffset, limit))
  }
}
fun two(): List<String> {
  return generateSequence(Pager.start<String>(pageSize = 10)) {
    it.next { offset, limit ->
      fetch(offset, limit)
    }
  }
  .takeWhile { !it.ended }
  .map { it.elements }
  .flatten()
  .toList()
}
```

Iteriranje je povereno sekvencama. Brojanje stranica je povereno klasi `Pager`. Dobavljanje elemenata je povereno lambdi. Jednom napisan `Pager` se može iskoristiti nanovo.

Moj unutrašnji mir je ponovo uspostavljen.

## Koji kod je bolji?

Prvo - teško je biti objektivan posle godina pisanja `while` petlji. Prirodno težimo izboru kojem nas uče od prvog dana kada krenemo da crtamo proklete algoritme (o, to je tek tema za sebe!)

Odgovor na pitanje bi bio novo pitanje: ko menja kod i ko zavisi od koda?

Ako kodu ima pristup mali broj ljudi (do tri), `while` može da opstane; kao što mogu da se zanemere različiti mirisi u kodu. Možemo reći da su pod kontrolom; ako ničim drugim onda prosto malom mogućnošću da nešto krene po zlu. Naravno, ovakvo stanje nije skalabilno.

Slično je kada kod nema svoje downstream zavisnosti (kod koji zavisi od njega). Kod koji je na vrhu zavisnosti (od koga ništa drugo ne zavisi) može biti nestabilan. S druge strane, kod od koga zavise druge stvari mora biti stabilniji i apstraktniji.

Šta ako u oba slučaja izdvojimo kod straničenja u funkciju koja prima samo `fetch`? Time nas ne zanima implementacija - da li je upotrebljen `while` ili ne? Odlično zapažanje. Razlika je u tome da u drugom slučaju baratamo direktnom sekvencom što nam ostavlja mesta za dodatnu manipulaciju elementima. Upravo ta namera da se enkapsulira `while` je već ostvarena u drugom primeru!

Drugi primer je odlična mešavina tkzv. OOP i funkcionalnog koda. I dosta s time, više. Ne postoji funkcionalan ili OOP stil programiranja. Postoji samo mešanje i razdvajanje interesa koda. To je sve.
