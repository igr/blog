---
title: "Modeli itd."
date: 2022-06-17T01:07:03+00:00
categories:
  - Razvoj
tag:
  - razvoj
  - arhitektura
  - modeli
  - domen
---

Modeli su domenski tipovi: klase koje oslikavaju domen u kodu. Tako nekako; nisam vičan definicijama.

<!--more-->

Da odmah podelim zaključak do koga sam došao: _nije_ moguće preslikati realni domen u klase. To je kao da 2D figurama pokušavate da opišete 3D objekte.

Šta to zapravo znači za modeliranje u kodu?

Pa - da u kodu dizajniramo "poglede" - različite načine predstavljanja realnih modela, potrebne za poslovna pravila. U kodu baratamo sa više različitih pogleda na istu stvar. Da upotrebim pređašnju analogiju: koristimo različite projekcije 3D objekta na 2D ravan, zavisno od potreba.

---

Za mene su modeli samo data objekti, nosioci podataka.

U njima nema biznis pravila.

Modeli se kombinuju isključivo putem agregacije (kontraverzno, zar ne? :).

## Član biblioteke

Biblioteka je svima razumljiv primer. Biblioteka sadrži knjige. Knjige su pisali autori. Nešto ovako: `Library` ⮕ `Book` ⮕ `Author`.

Da li `Library` model (klasa) treba da ima properti `getBooks()`, koji vraća skup (`Set`) knjiga?

Ne. Veza u kodu: `Library.getBooks()` je vrlo jaka veza između dva modela. Međutim, relacije i međusobni odnosi u životu nisu tako jednostavni. Postoji više različitih podskupova seta knjiga. Na primer, knjige određenog pisca; sortirane knjige; knjige koje su oštećene; starije knjige itd. Da li sve one trebaju biti modelovane kroz `getBooks()`? Da li treba imati veze `getOldBooks()`, `getBooksOfAuthor()`...? Ne i ne. Fundus biblioteke čine i autori - da li postoji `Library.getAuthors()`? Ne.

Relacije se formiraju na mestu korišćenja, od strane poslovnih pravila. Modeli su gradivne jedinice relacija; starije su od njih. Relacije ne postoje bez modela; modeli mogu da postoje bez relacija.

Zato nemam takve veze u kodu. Iz istog razloga je ORM za mene[samo OM](https://oblac.rs/bas-bas-ne-volim-orm/). (Sva sreća pa me niko ne pita za mišljenje. :)

"Agregacija" je odgovor na pitanje koje upravo postavljaš - kako modelovati relacije? Skup starih knjiga bi bio, na primer:

```java
class OldBooks {
    Library library;
    Set<Book> books;
    Year year;
}
```

Relacija `Library` ⮕ `Book` ipak postoji: preko ključa `LibraryId` koji je deo knjige. On je, zapravo, samo indikacija relacije, njena _mogućnost_. Agregacija je _implementacija_ relacije.

---- 

Inače, primer biblioteke nije kompletan. Jedna knjiga može da postoji u više primeraka. Zato je potreban još jedan model: `BookCopy`. Da li biblioteka ima knjige ili primerke knjiga? Da li knjiga ima listu primeraka knjiga? Nevažno je. O relacijama ćemo odlučiti kasnije, u potrebnim agregacijama.

## Model za Web

Primera radi, neka postoji zahtev da prezentacioni sloj prikazuje spisak zauzetih primeraka knjiga. Pri tome, žutim treba da obeleži knjige koje su u poslednjoj nedelji pred rok, a crvenim one za koje je rok prošao.

Jedan način modelovanja je sledeći. `BookCopy` ima opciono polje `dueDay` koje predstavlja poslednji dan dozvoljenog roka. Web aplikacija dobija iz API bekenda niz zauzetih `BookCopy`. U tamo nekoj JavaScript komponenti postoji jednostavan proračun za `remainingDays`. Potom sledi mapiranje preostalog broja dana u boju, sa `switch` ili `if`.

Ovo nije OK.

Bekend bi trebalo da vraća _sve_ potrebne informacije nazad. To često ne radimo - najčešće samo presipamo model koji koristimo, iz sloja u sloj.

Postojanje `BookCopy.dueDay` ima smisla. Međutim, za potrebe poslovnog pravila, potreban nam je drugačiji _pogled_, koji uključuje dodatne informacije. Kako ne želimo da menjamo `BookCopy` i da mu dodajemo logiku izračunavanja preostalog broja dana, potrebno je da vraćamo novi agregat nazad. To je nekakav `BookOccupation`, koji sadrži `BookCopy`, ali i dodatne flegove za potrebe prikaza.

Prezentacioni sloj, na kraju, treba da _isključivo_ proverava samo postojanje podatka (ili _enuma_); radi samo `if (flag)` - i ništa drugo. Preciznije, on treba da _mapira_ flegove u vrednosti potrebne za grafički prikaz. Sve ostalo mora da dolazi sa bekenda. Dakle: prezentacioni sloj bi trebalo da poznaje samo iteraciju, poseduje samo `switch/case` i poznaje jedino `+` - sve van toga je višak. Možda sam nešto omašio; ali to je ideja glupog prezentacionog sloja.

Trenutno smo u delu ciklusa softverskog razvoja u kome ovo nije popularno. Server-side renderovanje još uvek spada u "napredno" korišćenje; mora da prođe još neko vreme pa da se vrati u punom jeku. Ponovo.

## Opsesija primitivnim

Pogledajte ovaj kod:

```java
String a = "John Doe";
String b = csvRow.readField(1);
doSomethingGood("123", "456");
```

Možete li reći šta predstavljaju vrednosti u `a` i `b`? Šta su argumenti poziva; da li možemo da zamenimo neki sa prethodnim varijablama?

Ovo je jedan od najvažnijih [loših mirisa koda](https://oblac.rs/opsednutost-primitivnim/). Ne želimo uobičajne tipove, generičke namene. To su kontejneri vrednosti koji svašta mogu da po(d)nesu. Moraju da postoje u svakom programskom jeziku. Umesto toga želimo konkretne tipove, koje oslikavaju domen:

```java
BookName a = BookName.of("John Doe");
AuthorId b = AuthorId.of(csvRow.readField(1));
doSomethingGood(a, b);
```

Nema mesta nerazumevanju. Nema mesta slučajnom pogrešnom ukrštanju (na pr. `a = b`). Tipovi su, na primer, mnogo važnija informacija od relacija; a opet, retko gde se bogato koriste.

## Nomen est omen

Ukoliko ste pratili moje nedavne tekstove, uvidećete da se kod aplikacije transformiše - sada postoji mnogo više klasa. Dok za funkcije/glagole to nije problem, postaje izazov kako nazvati sve te modele i agregatore. Treba se potruditi i datim im neko ime koje odgovara realnom domenu. Neki anti-paterni imenovanja su korišćenje sufiksa `Aggregator` (na pr. `BookAuthorsAgregator`) ili korišćenje poveznice `With` (na pr. `BookWithAuthors`).

Takođe, modeli se prenose kroz slojeve i mapiraju u nosače podataka pogodne za sloj/modul. Neko ih naziva `DTO`. Ne volim naglasak na 'Transfer' pošto sa ovakvim pristupom oni ostaju interni, vezani za konkretnu implementaciju. To su više `LDO`: Local Data Objects.

Kako bilo, njima će se dodavati nekakav sufiks da bi se razlikovali od modela. Na primer, `Book` će imati svoj `BookEntity`, `BookResponse`, `NewBookRequest`, itd. To je i dalje _isti_ model, samo njegovo različito preslikavanje. Najvažnije je da imenovanje bude uniformno. Kasnije možemo da pričamo više o različitim načinima imenovanja istog modela - no to je već neka dalja priča.

---- 

Neće biti lako nazvati sve te projekcije realnih modela u kod. Razmišljam o postojanju anonimnih agregacija, koje su deklarisane tipovima koje sadrže; slično kako su funkcije deklarisane svojim potpisom. Eto još jedne zabavne ideje :)
