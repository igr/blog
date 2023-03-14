---
title: "Rendgenski snimak projekta"
date: 2023-03-14T01:07:03+00:00
categories:
  - Razvoj
tag:
  - razvoj
  - projekat
  - praksa
---

Iz života programera.

<!--more-->

Retka je prilika raditi projekat od samog početka, a i da ti se niko ne meša u razvoj. Delim jedno takvo iskustvo. Nije sve roze: angažovanje je vremenski ograničeno.

**Kotlin.** Kotlin je donja granica do koje idem. Kao što i govorni jezik oblikuje način razmišljanja, tako i programski jezik oblikuje način razvoja. Java mi odavno ne prija. To ne znači da nije upotrebljiva, ali ograničava prakse koje nalazim da su vredne.

**SpringBoot.** Bez iznenađenja. Iako me privlače manji frejmvorci - tačnije, odsustvo svakog (!) - SB je upotrebljiva, efikasna alatka; jasna, poznata i dokumentovana platforma. Može se koristiti toliko duboko koliko je potrebno.

**Hex arhitektura.** Moduli razdvajaju implementaciju od namere u compile-time i fokusiraju me na interfejse. Donose mir u jasnim granicama preko kojih nema prelivanja. Čini razumevanje koda lakšim. Mogu se odvojiti u zasebne biblioteke i ponovo upotrebljavati. Mogu se odvojiti u mikroservise, ako ikada, verovatno nikada.

U projektu postoji već desetak modula. Neki enkapsuliraju 3rd-party servise. Neke module čine svega 2-3 klase. Pogrešno je izjednačavati modul sa build modulom (nemam bolje ime: modul definisan u build modulu.) Modul definiše ulazne i izlazne interfejse; jedan modul je definisan s više build modula. Drugi put više o tome. Moduli su potcenjeni. Trebalo bi da su deo jezika (na tragu `internal`), a ne konfiguracije projekta.

**JPA.** [ORM](https://oblac.rs/bas-bas-ne-volim-orm) mi nije omiljen koncept. Otkud onda JPA? Koristi se samo kao `OM`: _object mapper_. Relacije su deo run-time, ne compile-time. Entiteti su maper na bazu, a ne domenski objekti. JPA vredi jer, pored mapiranja, kešira upita, može da mapira rezultat na bilo koji tip i postoji `Repository` koji ubrzava pisanje koda. Podjednako važno: JPA podržavaju alatke.

**Joins.** Relacije se mapiraju u `Join` klasu koja je običan par `Parent` i `Child`. Kada je one-to-many relacija u pitanju, lako se grupišu:

```kt
fun <P, C> List<Join<P, C>>.toPairList(): List<Pair<P, List<C>>> {
    return this
        .ifEmpty { emptyList() }
        .groupByTo(mutableMapOf()) { it.parent }
        .map { it.key to it.value.map(Join<P, C>::child) }
}
```

Relacija je kompozicija roditelja i dece. Pomislim na [Jodd Db](https://db.jodd.org), tamo je sve ovo lepše rešeno :)

**Null & Exception.** Vraćaju se nullable tipovi kada zatreba; u Kotlinu su oni implementacija `Optional` ugrađena u sam jezik. Slično, bacaju se izuzeci kada zatreba. Kotlin ima `Result` koji je bleda senka `Either`; ne radi mi dovoljno da bih ga opravdao u interfejsima. Poslovni izuzeci ne upisuju stack trace u log.

**Immutable.** Svi podaci su nepromenljivi.

**Glagoli, ne imenice.** Radnje su glagoli, podaci su imenice. Ne postoji `UserService` anemična klasa. Postoje samo funkcije koji su domenski glagoli. Deklarisane su kao SAM funkcionalni interfejsi:

```kt
fun interface FindUserById :
    (UserId) -> User?
fun interface PrepareFooReport :
    (ExistingEmployee, LocalDate) -> List<FooRecord>
```

Imena glagola zajedno sa potpisom (subjektom i predikatom) govore o nameri.

Funkcije su grupisane u Kotlin fajlovima, a ne u klasama. Postoji puno kratkih funkcija - ne vidim problem u tome. Uvedena je konvencija u imenovanju. Funkcije prema svetu (domenski API) vs funkcije koje trebaju (najčešće za repozitorijum): `Find` vs `Fetch`, `Save` vs `Store` itd.

**Bogati tipovi.** Svaki atribut domenskog modela ima svoj tip.

```kt
data class User(
    val id: UserId,
    val email: Email,
    val firstName: FirstName,
    val lastName: LastName,
    val title: Title?,
    val profileUrl: ProfileUrl?,
    val reportTo: ManagerId?,
    val role: UserRole = UserRole.USER,
)
```

Osnovni tipovi se deklarišu kao value types, na pr:

```kt
@JvmInline
value class FirstName(val value: String)
```

Retko se upotrebljava i `typealias`: gde je dualnost opravdana (`User` je ujedno i `Employee`.)

**Mapiranje modela.** Bogati tipovi i modeli u modulima zahtevaju dodatnu pažnju i trud oko mapiranja jednih u druge. Postoje 3 velika skupa tipova: entiteti, domenski i prezentacioni. Nisam našao elegantan način da sažeto podelim zajedničke atribute, a da rezultat opravda dodatni napor. MapStruct ne poznaje value types. Na kraju: sva mapiranja se pišu eksplicitno; bar je u Kotlinu sažeto. Mapiranja podataka, istini na volju, jesu dodatni korak. Takođe bi trebalo rešiti programskim jezicima (ili generisanjem koda.)

**Konfiguracija, ne servisi.** Ne koristi se `@Service` anotacija, nema implementacionih klasa, nema `UserServiceImpl`. Umesto toga, definisane su _konfiguracije_: factory za anonimne implementacije glagola, koji ume da uveže zavisnosti:

```kt
@Configuration
class FindEmployeeSpring(
    val fetchUserById: FetchUserById,
) {
    @Bean
    fun findEmployeeById() = FindEmployeeById { employeeId ->
        fetchUserById(employeeId)
    }
}
```

**API za FE.** Ne postoji pravi REST API, jer ne postoji nekakav public API. Zato postoji konkretan, taman dovoljan API za FE, fokusiran samo na ono šta treba korisniku. Poštuje se namera HTTP metoda.

**Cucumber.** Unit testovi postoje samo za proračunske algoritme. Za sve ostalo su tu Cucumber testovi, koji mogu da istovremeno rade sa direktnim servisnim pozivima ili sa HTTP pozivima. Većina testova je BDD, barata domenskim ponašanjem. Drugi deo testova je zamena za integracione testove. I oni su domenskom ponašanje, samo na nižem nivou. Svi Cucumber testovi su u svom modulu.

**OpenAPI šema generisana iz koda.** Dugo nisam umeo da procenim da li generisati ili pisati OpenAPI šemu? Prednost dajem generisanju iz koda. Sve OpenAPI anotacije su u interfejsima, tako da je vrlo pregledno šta čini šemu. Implementacije su u kontrolerima i ne poznaju OpenAPI.

**Biznis provere.** Biznis provere su one koje sprečavaju nedozvoljena stanja ili korišćenja aplikacije. Bitno je da se brzo pronađu u kodu, jer se često nalaze unutar funkcije, kako se logika odmotava. Zato je uveden poseban način zapisa koji vizuelno odskače:

```kt
checkUp(foo) { ::isSubmitted }
```

Još uvek vagam ovu odluku.

**Transakcije u kontrolerima.** Nema razloga da transakcije započinju na servisnom sloju, naročito kada je baza detalj. U projektu započinju u kontroleru. Tu je transakcija samo opis, a implementacija transakcije dolazi iz implementacije repozitorijuma.

```kt
 override fun postUser(newUser: NewUserRequest): UserResponse = tx {
        createUser(newUser.toUser()).let {
            UserResponse.from(it)
        }
    }
```

Dajem prednost funkcijama u odnosu na anotacije (aspekte).

**ADR.** Bitne odluke koje imaju uticaja na arhitekturu projekta se zapisuju u ADR fajlove. Koristi se efikasan [MADR](https://adr.github.io/madr/) šablon.

**Dokumentacija korisničkog toka.** Tokom analize korisničkog toka upotrebe u Figmi, pravi se specifikacija/analiza koja fokusira na komunikaciju fronta i bekenda. Jedna takva celina u dokumentu čine: 1) kontekst - glavni akteri 2) podaci koji dolaze u tok i 3) akcije koje korisnik izvršava. Svaka je opisana HTTP API pozivima i biznis ograničenjima koja moraju biti ispoštovana. Liči da ovakav zapis ima smisla, jer je fokus na komunikaciji. Nisam uspeo da pregledno upotrebim UML dijagrame. Više o tome drugi put.

## Dva POC-a

Uzgred su napravljena i dva POC projekta.

**Codegen.** Jednostavan in-place code generator. Korišćenje generatora tokom compile-time jeste zgodno, ali pomalo magično, jer sklanja generisano. Jednostavniji je kod generator koji bi se koristio u toku pisanja koda. On posmatra kod kao obične tekstualne fajlove, pronalazi komande za generisanje u, na primer, komentarima, a rezultuje prostim blokom generisanog koda.

**Metabot.** Svaki projekat ima neka svoja pravila koja se ne mogu iskazati sintaksom. Konvencije imenovanja, ispravno uvezivanje, mapiranje data klasa i sl. Zato Metabot projekat. Skenira izmene u fajlovima, one aktiviraju pravila. Pravila aktiviraju akcije. Akcija može biti bilo šta: od analize koda (korišćenjem Kotlin kompajlera) ili generisanje koda (Kotlin Poet). Metabot radi u pozadini sve vreme dok se radi na projektu. Zamišljen je kao meta-pomoćnik. Ne treba mu AI.

Oba projekta ima smisla uvezati u jedan. Vreme je ograničeno, te nisu u dovoljno dobrom stanju da bih se potpuno oslonio na njih. Deluje da koncept ima smisla i vrednost.

----

Ovo je sve samo lični, trenutni izbor. Ne znači da drugačiji pristup nije korektan.

Otvoren sam za pitanja i dodatna tumačenja.