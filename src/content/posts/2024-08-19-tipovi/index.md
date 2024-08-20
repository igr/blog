---
title: "Oop, kakav tip, reče klasa"
date: 2024-08-19T01:06:08+00:00
slug: "oop-kakav-tip-rece-klasa"
description: "Klase i tipovi nisu isto."
---

Klase i tipovi nisu isto.

Primeri u tekstu su jednostavni miks Haskela i Jave; ne bi trebalo imati problem pratiti ih.

## Type

Tip je skup mogućih vrednosti izraza. To je _labela_ kojom imenujemo skup vrednosti. Na primer, `Int` je naziv za konačan skup svih 32-bitnih celih brojeva. `Boolean` je skup od samo dva elementa. `String` je (ogroman) skup svih mogućih nizova karaktera.

Hajde da napravimo naše tipove (za potrebe kartanja):

```haskell
data Suit = Club | Diamond | Heart | Spade
data CardValue = Two | Three | Four
     | Five | Six | Seven | Eight | Nine | Ten
     | Jack | Queen | King | Ace
```

Boja karte je tip koji ima samo četiri vrednosti; broj karte ima `13` mogućih vrednosti.

Postoji dva načina kako se elementi dva skupa mogu kombinovati: **množenjem** i **sabiranjem** (AND i OR).

Množenje (_product type_) je prost `record` (čest u programskim jezicima), koji definiše skup od `4 x 13 = 52` karte:

```haskell
data Card = Card {value :: CardValue, suit :: Suit}
```

Sabiranje (_sum type_) smo već koristili:

```haskell
data RedSuit = Heart | Diamond
```

Ovo je, verovatno, najkraći mogući uvod u (algebarske data) tipove :) Tipovi se, dakle, mogu kombinovati kako bi se napravili novi tipovi: skupovi mogućih vrednosti. Jasno, ovo je tek početak početka priče o tipovima; dovoljna za ovaj tekst, ali ne i za vašu radoznalost!

Idemo dalje. Tipovi imenuju i skupove funkcija. `String -> Int` je skup svih funkcija koje primaju `String` i vraćaju `Int`. Ovaj tip ne treba posebno ime osim svog potpisa funkcije.

Inače, kada čujete da neko priča o dobro poznatoj praksi: "dobar kod je onaj koji se oslanja na interfejs", zamenite pojam "interfejs" sa pojmom "tip". Interfejs nije ništa drugo do vreća tipova funkcija.

## Typeclass

_Typeclass_ podseća na `interface` u OOP svetu; i to nećemo nikada reći naglas. Postoji da bi se ostvario tkzv. _ad-hoc_ polimorfizam. Najkraće, to je polimorfizam gde svaka overloadovana funkcija (implementirana metoda) može da radi na drugačiji način (da se služi drugim algoritmom.)

_Typeclass_ opisuje protokol, funkcije koje su zajedničke za više tipova. One su ekstenzija tipova, njihove osobine; tačnije: typeclasses su ograničenja tipova. One su, čak, sintaksni šećer; nisu neophodne, ali su korisne.

Hajde da u gornjem primeru imamo zajedničku funkciju `isPowerful` koja određuje koja je boja i vrednost moćna. Želimo da istu funkciju dele i `Suite` i `CardValue`, zato uvodimo typeclass `IsPowerful`:

```haskell
class IsPowerful a where
  isPowerful :: a -> Bool
```

Sada možemo implementirati metode, tako da svi herčevi i dame budu moćne karte:

```haskell
instance IsPowerful Suit where
  isPowerful Heart = True
  isPowerful _     = False
instance IsPowerful CardValue where
  isPowerful Queen = True
  isPowerful _     = False
```

Razlika u odnosu na `interface` je da typeclass dozvoljava "slobodnu" implementaciju; imamo mogućnost da dodamo ovo ponašanje na bilo koji tip, čak i onaj nad kojim nemamo kontrolu. Ovo je tek jedna razlika, ima ih još.

_Typeclass_ nisu tipovi.

## Klasa

Klasa je pojam najčešće vezan za OOP svet, različit od pojma tipa. Klasa se tiče run-timea: predstavlja šablon za objekat. Klasa definiše factory za objekte (konstruktor) i predstavlja skladište objekata (svi objekti iste klase). Klase se ne koriste za proveru korektnosti programa na način kako se koriste tipovi.

Klase, dakle, nisu tipovi. Čini mi se da je pojam "klasa" pogrešno izabran: ne radi se niokakvoj klasifikaciji. Klasa je samo `blueprint`, `scheme`, `prototype`... da, namerno sam izabrao ove nazive, jer se pojavljuju u programskim jezicima; bolje opisuju šta klasa zapravo jeste.

Klase jesu sintaksni šećer. To je način da se uvede "tačka"-notacija: `A.foo(B)` koje je **identična** funkciji `foo(A, B)`. Zato funkcionalni jezici ne trebaju klase. Drugi put više o ovome.

## Subtyping

_Subtyping_ je definisanje podskupa. Na primer, `Short` bi bio podskup skupa `Int`.

Kako je subtype podskup matičnog skupa (tj. njegovog roditelja), bilo koja vrednost iz podskupa se može upotrebiti na identičan način kao da je vrednost matičnog skupa. `Short` tip bi trebalo da može da se koristi u svim funkcijama koje rade sa tipom `Int`. Subtyping omogućava slanje instance podtipa bilo kojoj funkciji koja očekuje supertip.

Da li je `Int` podskup `Float` podskup `Double`? Ako imamo tipove `A < B < C` i objekat `Maybe B`, da li on sme da sadrži `A` ili `C`? Da li postoji način da se to vidi iz definicije? Da li je funkcija `Maybe B -> Maybe B` kovarijantna s leve strane, a kontravarijantna s desne strane?

Pokazuje se da subtyping značajno komplikuje detekciju tipova (_type inference_) i da zahteva anotaciju varijanse i ko zna šta još. Naporno je raditi sa takvim kompleksnim formalizmom; naročito kada za tim nema potrebe. Mudriji programski jezici izbegavaju subtyping.

Svrha tipova je tačniji program: način da se spreči pisanje lošeg programa, a da to ne naškodi pisanju dobrog programa. Kada se uvede subtyping, izviru različite situacije koje unose nedoumice.

## Nasleđivanje

Nasleđivanje je nešto potpuno drugo: to je _specijalizacija_ deteta (podtipa) za konkretnu upotrebu, ponovna upotreba pojedinih ponašanja roditelja (supertipa) i, eventualno, njihova izmena. Nasleđivanje je jaka veza između dve klase. Kada interfejs nasleđuje drugi, on ga samo proširuje.

OOP bukvari pokušavaju da na nasleđivanje prilepe i "IS" (jeste) relaciju, vozeći se na talasu pogrešne pretpostavke da je klasa nekakva klasifikacija. Nasleđivanje nije "jeste" relacija.

Pretpostavimo da `B` nasleđuje većinu svog ponašanja od `A`, ali menja jednu metodu `m`. Ako je `B` specijalizovana verzija `A`, njen `B.m` može zahtevati specijalizovani ulaz, prihvatajući samo specijalizovanu verziju `A.m`-ovog ulaza. S druge strane, ako je `B` podskup `A`, onda njegov `B.m` **mora** prihvatiti sve ulaze koje `A.m` prihvata, zahtevajući da ulaz `B.m` bude supertip `A.m`.

Nasleđivanje je takođe pogrešan naziv, jer implicira relaciju roditelj-dete koja ne postoji, jer se klasa ne bavi klasifikacijama. _Extension_, _Subclassing_ ili _specialization_ bi bili primereniji nazivi.

## Nasleđivanje nije subtyping

Zamislimo strukturu `deque`: red koji ima 2 kraja; dozvoljava dodavanje i brisanje na obe strane. Zato ima 4 funkcije: `insertFront`, `insertBack`, `removeFront` i `removeBack`. Ako koristimo samo `insertBack` i `removeFront` dobijamo regularni red (_queue_). Ako koristimo samo `insertFront` i `removeFront` dobijamo stek (_stack_). Pošto možemo da implementiramo i red i stek od `deque`, ispada da `Stack` i `Queue` nasleđuju `Deque`. Ipak, ni `Stack` ni `Queue` nisu podtipovi `Deque`, jer ne podržavaju sve njegove funkcije. Zapravo, stanje je obratno: `Deque` je u isto vreme subtip i `Stack` i `Queue`. Subtyping i nasleđivanje su ortogonalni principi.

---

Zamislimo da imamo klasu `Point` za dva propertija, `x` i `y`.

```java
class Point {
	private final int x, y;
	boolean eq(Point other) {
    if (this.x == other.x && this.y == other.y) {
        return true;
    }
		return false;
	}
}
```

Sada nam treba nova klasa, `ColorPoint`, koja pored koordinata sadrži i boju.

```java
class ColorPoint extends Point {
	private final Color color;
	boolean eq(ColorPoint other) {
    if (super.eq(other) && this.color == other.color) {
        return true;
    }
		return false;
  }
}
```

Pitanje: koliko `eq()` metoda postoji u `ColorPoint`?

Tačan odgovor je: dve metode. Ako raščlanimo sintaksni šećer klase, dobijamo da postoje sledeće _overloadovane_ (a ne overvrajtovane) funkcije:

```java
boolean eq(Point, Point);
boolean eq(ColorPoint, ColorPoint);
```

Zato kada napišemo `cpoint.eq(point)`, poziva se metoda iz `Point` (prva funkcija), a ne iz `ColorPoint`. Da smo zaista overajdovali metodu `eq`, kompajler ne bi smeo da dozvoli poziv `cpoint.eq(point)`. Vrednosti podskupa se ne mogu porediti sa svim vrednostima super skupa! Ne možemo porediti `Short` sa `Int`.

Nasleđivanje zato nije subtyping.

## Nasleđivanje jeste subtyping

Nominalni OOP jezici su oni u kojima se nasleđivanje eksplicitno deklariše; strukturalni OOP jezici su oni u kojima je nasleđivanje automatsko ukoliko podtip sadrži sve šta i supertip.

Nominalni OOP jezici (Java, C#) identifikuju subtyping kroz mehanizam nasleđivanja. Svaka klasa `A` ima svoj tip koji sadrži sve instance `A`, kao i sve instance svih klasa koje nasleđuju `A`. Drugim rečima, `B` je podtip `A` ako i samo ako `B` nasleđuje `A`.

Pipavi deo dolazi sada: pošto je smisao subtypinga korišćenje podtipova umesto supertipova, programer je taj koji **mora** da obezbedi ugovor roditeljske klase, tj. da obezbedi da se dete ponaša isto. Ovo je najvažniji - i jedini, rekao bih - stub OOP koji specifičan za tu paradigmu. Programer mora da poštuje LSP, kako bi nasleđivanje, pored onoga šta jeste, bilo ujedno i subtyping.

Ako se osvrnemo, ispada da OOP zavisi samo od pažnje programera; a zauzvrat dobijamo sintaksni šećer klase i nametnutu hijerarhiju tipova. Ili postajem gluplji vremenom (sasvim validno), ili mi se OOP sve više čini nategnutim.

Da se vratimo na `ColorPoint` - on je pod svetlom OOP-a pogrešno napisan. Da bi zaista uradili override metode `eq`, potrebno je da potpis bude identičan:

```java
class ColorPoint extends Point {
	private final Color color;
	boolean eq(Point other) {
    // pa... snađite se.
  }
}
```

Kako sada _ispravno_ rešiti implementaciju - ne znam. Koristio bih `instanceof` kao i sav ostali svet; ali to nije korektno rešenje.

## Kind

_Kind_ su tipovi tipova. Dosta za danas.
