---
title: "Op, hop, OOP"
date: 2021-12-10T01:06:08+00:00
slug: op-hop-oop
description: >
  Crtica iz koda OO programera.
---

Crtica iz koda OO programera.

Nabasao sam na (još) jednu [HTTP biblioteku](https://github.com/Vatavuk/verano-http) pisanu u Javi. Autor naročito naglašava da je biblioteka napisana u OO maniru.

Primer korišćenja je sledeći:

```java
new Response(
    "http://example.com",
    new Post(
        "/items",
        new Body("Hello World!"),
        new ContentType("text/html"),
    )
).touch();
```

`Post` klasa ima smisla. Dovodim u pitanjem ime, mada mi nije jak stav. Imalo bi malo više smisla da se zove `PostRequest` (što i jeste).

Svi argumenti `Post` konstruktora (osim putanje) su tipa `DictInput`. Jasno je zašto je tako - da bi proizvoljno dodavali željene elemente HTTP zahteva bez nekog posebnog reda u konstruktoru.

Za razliku od malo pre, ovde naziv više žulja. `DictInput` je nekakvo ime koje upućuje na drugačiji domen, nekakav rečnik koji skladišti stvari - generički kontejner za par podataka. Nije mi OK što različiti domenski tipovi dele isti tip: `Body` i `ContentType` su `DictInput.Envelope`. To je tako delom da bi zadovoljili konstruktor sa opštim argumentima. Ovde je napravljen ustupak, prečica; da ne bi imali pregršt overloadovanih konstruktora. Kao i svaka prečica, upitna je. Na primer, razdvojio bih način skladištenja (sve u vezi `Dict`) od domenskog tipa (`Body`, `Header` itd.).

Na prvo gledanje, problem mi predstavlja i kreiranje `Response` objekta pre nego što je poziv učinjen. Kako odgovor može da postoji pre zahteva!? Zatim, poziv metode `touch()` radi... šta? Gde je domenski rečnik? Nije li to možda `fetch()` metod?

`Response` klasa je lazy klasa. Ukoliko ne pozoveš `touch()`, svako njeno korišćenje će obaviti HTTP poziv. Zar to onda nije nekakav `Future`? Da li je to dodatna fukcionalnost? Sada shvatam zašto se `touch()` metod tako zove: izaziva HTTP poziv prvim "dodirom" `Response` instance.

Zanimljivo mi je kako se očitavaju vrednosti iz `Response`:

```java
System.out.println(new Body.Of(response).asString());
```

Ovo mi se dopada - `Body` nije deo kompozicije `Response`, već način parsiranja odgovora. Ima smisla, naročito kada znamo da je `Response` zapravo lazy izvršilac pozivanja HTTP zahteva. To otvara mesta za različite implementacije parsiranja sadržaja. Međutim, `Body` sada postaje svestan `Response` tipa, a to ne bi trebalo; pa očekujem da se `Response` spušta na neki osnovniji tip.

Uočio sam nešto u implementaciji šta me žulja: dubina kompozicije objekata je _ogromna_. Da bih prilikom debagovanja došao do `Body` u `Request` instanci, potrebno je da "zaronim" čak 13-tak koraka u dubinu! Nisam se udubljivao u detalje; na slepo smatram da to nije OK.

----

Da rezimiram. Imenovanje je najviše narušilo moje inicijalno razumevanje upotrebe ove biblioteke. Kada sam zagrebao malo, došlo je razumevanje. Imam zamerke po pitanju interne implementacije, ali sa strane modelovanja - kada jednom razumemo svrhu klasa - stvari postaju zanimljive.

Pristup bi ovako mogao da se sumira pseudo-kodom:

```kt
val a = LazyOutput(Input)
val b = OutputParser(a)
```

U ovakvom načinu modelovanja, radnja (glagol, funkcija) je implicitna: izostavljena i zamenjena lazy ponašanjem izlaza.

Priznajem da nisam navikao da razmišljam na taj način. [Pre par godina](https://github.com/oblac/jodd-http) sam razmišljao ovako:

```kt
val a = Input.build()
val b: Output = a.send()  // ili:
val b: Output = connection.send(a)
```

Dok danas razdvajam funkcije od OO modela (više o tome uskoro):

```kt
val a = Input.build()
val b: Output = a.map { send(it) }
```

Kako bilo, vredi obratiti pažnju na način kako je ova biblioteka modelovana.

Koji je ispravan način? Zanimljivo, dizajn zavisi i od namere autora, ne samo od prirode domena. Pričajmo.

----

Rado bih napravio mob sesiju na ovu temu :) Kapiram da je ovo lep, mali domen, na kome se možemo igrati i različito modelovati. Premišljam se i da započnem Github projekat sa različitim pristupima modelovanja ovog i sličnih primera.
