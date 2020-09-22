---
title: "Kod koji obara s nogu"
date: 2020-09-22T01:07:03+00:00
categories:
  - Razvoj
tag:
  - razvoj
  - programiranje
  - java
  - kotlin
  - refaktorisanje
---

Pre nekog vremena sam napisao sledeće parče koda. Kako vam se čini?

<!--more-->

```java
byte b = 32;

// ...

b++;
if (b < 0) {
    b = 32;
}
char c = (char) b;
```

Mda, zaslužuje da budem javno osramoćen. Hajde da analiziramo.

Šta je namera i šta se sve ovde dešava? Kod generiše sekvencu karaktera, od ASCII vrednosti `33` do `127`, jer su to kako-tako čitljivi karakteri; znak za razmak (ASCII `32`) se izostavlja. Pri tome se koristi prečica. Brojač je `byte` da iskoristi _overflow_ prilikom inkrementiranja: sledeća vrednost posle `127` je `-128`. Kao da to nije dovoljno, kod ima i grešku: ASCII vrednost `32` je preskočena samo u prvom prolazu, a dozvoljena u ostalim. Postoji i logička greška: ASCII vrednost `127` ne spada u čitljive karaktere.

Nit' manje koda, nit' više zbrke! Odlična pitalica za [Cicin intervju](https://oblac.rs/zaposlite-cicu/).

Pošto se ložim na [RED](https://oblac.rs/refactoring-enabled-development-aka-red/), hajde da sitnim koracima unapredimo kod. Promenimo prvo tip:

```java
char c = ' ';
// ...
c++;
if (c == 128) {
  c = ' ';
}
```

Ispravimo grešku sa upotrebom praznog karaktera:

```java
char c = ' ' + 1;
// ...
if (c == 127) {
  c = ' ';
}
c++;
```

Ovaj korak je naročito zanimljiv, jer nimalo ne doprinosi čitljivosti. Konačno, da isključimo korišćenje karaktera čija je ASCII vrednosti `127`:

```java
char c = 33;
// ...
if (c == 126) {
  c = 32;
}
c++;
```

Kod sada ispravno radi (sve vreme pišem i testove), ali je podjednako nejasan: previše je magičnih vrednosti u igri. Postoji izvestan kognitivni napor razumeti okvire skupa generisanih karaktera. Da li je `32` uključen ili ne? A `126`? Ponudite ovo nekome kao pitalicu; trebaće mu par trenutaka.

**Van teme**: pored uobičajenih metrika koje proizilaze iz koda (kompleksnost, performanse, složenost...), vredi uključiti i metriku koja dolazi sa suprotne strane - od onoga ko _čita_ kod. Na primer, to može biti broj `WTF` po desetak linija koda: mera koji je nikada nula:) U korelaciji je sa stepenom razumevanja koda.

Hajde da za trenutak ostavimo razumljivost po strani. Sledeći korak je enkapsulacija. Nema razloga da generator bude razbacan po kodu, već:

```java
public class NextCharGenerator {
  char c = 33;
  public char get() {
    if (c == 126) {
      c = 32;
    }
    c++;
    return c;
  }
}
```

Iako popravljen, kod se i dalje služi još jednom prečicom. Umeš li da prepoznaš kojom? ASCII tabelom. Nerazumljivost koda upravo dolazi iz predpostavljanja ASCII rasporeda i ugrađenom konverzijom brojeva u karaktere. Drugim rečima, kod je jako uvezan sa ASCII tabelom - ali i sa redosledom karaktera u njoj.

Refaktorišemo:

```java
public class NextCharGenerator {
  final char[] alphabet = "abc...".toCharArray();
  int currentIndex = 0;

  public char get() {
    final char c = alphabet[currentIndex];
    incrementIndex();
    return c;
  }
  private void incrementIndex() {
    currentIndex++;
    if (currentIndex == alphabet.length) {
      currentIndex = 0;
    }
  }
}
```

Sada je kompletan alfabet eksplicitno definisan u generatoru: više se ne generiše, čime se uklanja veza sa ASCII tabelom i rasporedom. Razumljivost koda je svakako porasla. Postoji još jedna stvar koju možemo da uradimo: da izdvojimo logiku ciklične iteracije u zaseban iterator (na pr. `CycleIterator`) koji bi se bavio isključivo matematikom indeksa; te kod postaje sličan ovome:

```java
public class NextCharGenerator {
  final CycleIterator charIterator =
    CycleInterator.of("abc...".toCharArray());

  public char get() {
    return charIterator.next();
  }
}
```

Dometi Jave se ovde završavaju. Da bi videli kako kod može dalje da evoluira, moramo da posegnemo (bar) za Kotlinom.

Kotlin ima pregršt korisnih trikova u rukavu. Jedan je i _range_ - definisanje skupa navođenjem samo početne i krajnje vrednosti. U Java primeru alfabet je definisan stringom koga čine _svi_ karakteri koje želimo da koristimo: to je nekih stotinjak karaktera koji će nepotrebno stajati u fajlu, otvoreni za svaku moguću grešku. U Kotlinu se svodi na:

```kt
val alphabet = ('a'..'c') + ('A'..'C')
```

Dalje, nema potrebe da pravimo zaseban `CycleInterator`: njega ćemo zameniti generatorom sekvence, na primer:

```kt
val seq = generateSequence(
  {0},
  {
    when (it) {
      alphabet.count() - 1 -> 0
      else -> it + 1
    }
  })
```

Lepša sekvenca, bez `when` granjanja (nema smisla kada ima samo dva ishoda), može da se odmah mapira u iterator, izgleda nekako ovako:

```kt
val alphabet = ('a'..'c') + ('A'..'C')
val it = generateSequence(0) {
    it.inc().takeIf { i -> i < alphabet.count() } ?: 0
  }
  .map { alphabet.elementAt(it) }
  .iterator()
```

Bang! Dobili smo lep ciklični generator karaktera u formi iteratora, bez preke potrebe za zasebnim klasama.

Počeli smo sa `6` linija i završili sa isto toliko :) Nadam se da je ova kratka vožnja prijala.
