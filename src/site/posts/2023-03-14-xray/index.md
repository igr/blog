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

**Hex arhitektura.** Moduli razdvajaju implementaciju od namere u compile-time i fokusiraju me na interfejse. Donose mir u jasnim granicama preko kojih nema prelivanja. Čini razumevanje koda lakšim. Mogu se odvojiti u zasebne biblioteke i ponovo upotrebljavati. Mogu se odvojiti u mikroservise, ako ikada.

U projektu postoji već dvadesetak modula. Neki enkapsuliraju 3rd-party servise. Neke module čine svega 2-3 klase. Repozitorijum je odvojen u zaseban modul, jer su entiteti preslikavači na bazu, a ne domenski modeli.

Moduli su potcenjeni. Trebalo bi da su deo jezika (na tragu `internal`), a ne konfiguracije projekta.

**JPA.** [ORM](https://oblac.rs/bas-bas-ne-volim-orm) mi nije omiljen koncept. Otkud onda JPA? Koristim ga samo kao `OM`: _object mapper_. Relacije su deo run-time, ne compile-time. JPA vredi jer, pored mapiranja, kešira upita, može da mapira rezultat na bilo koji tip i postoji `Repository` koji ubrzava pisanje koda. Podjednako važno: JPA podržavaju alatke.

**Joins.** Relacije mapiram u `Join` klasu koja je običan par `Parent` i `Child`. Kada je one-to-many relacija u pitanju, lako se grupišu:

```kt
fun <P, C> List<Join<P, C>>.toPairList(): List<Pair<P, List<C>>> {
    return this
        .ifEmpty { emptyList() }
        .groupByTo(mutableMapOf()) { it.parent }
        .map { it.key to it.value.map(Join<P, C>::child) }
}
```

Relacija je kompozicija roditelja i dece. Pomislim na [Jodd Db](https://db.jodd.org), tamo je sve ovo lepše rešeno :)

**Null & Exception.** Vraćam nullable tipove kada zatreba; u Kotlinu su oni implementacija `Optional` ugrađena u sam jezik. Slično, bacam izuzetke kada zatreba. Kotlin ima `Result` koji je bleda senka `Either`; ne radi mi dovoljno da bih ga opravdao u interfejsima.

Poslovni izuzeci ne upisuju stack trace u log.

**Immutable.** Svi podaci su nepromenljivi.

**Glagoli, ne imenice.** Ne postoji `UserService` anemična klasa. Postoje samo funkcije koji su domenski glagoli. Deklarisane su kao SAM funkcionalni interfejsi:

```kt
fun interface FindUserById : (UserId) -> User?
fun interface PrepareFooReport : (ExistingEmployee, LocalDate) -> List<FooRecord>
```

Imena glagola zajedno sa potpisom (subjektom i predikatom) govore o nameri.

Grupisane su u običnim Kotlin fajlovima, a ne u klasama. Radnje su glagoli, podaci su imenice. Postoji puno kratkih funkcija - ne vidim problem u tome.

Uvedena je konvencija u imenovanju. Kako je najveći broj glagola u `core` i `repo` modulu, razdvajam `Find` vs `Fetch`, `Save` vs `Store` itd. Prvi su biznis glagoli, drugi su glagoli za repozitorijum.

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

Retko upotrebim i `typealias`: gde je dualnost opravdana (`User` je ujedno i `Employee`.)

**Mapiranje modela.** Bogati tipovi i modeli u modulima zahtevaju dodatnu pažnju i trud oko mapiranja jednih u druge. Postoje 3 velika skupa tipova: entiteti, domenski i prezentacioni. Nisam našao elegantan način da sažeto podelim zajedničke atribute. MapStruct ne poznaje value types. Na kraju: sva mapiranja se pišu eksplicitno, no bar je u Kotlinu sažeto. Mapiranja podataka, istini na volju, jesu dodatni korak. Takođe bi trebalo rešiti programskim jezicima.

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

**API za FE.** Ne postoji pravi REST API, jer ne postoji nekakav public API. Zato postoji konkretan, taman dovoljan API za FE, fokusiran samo na ono šta treba korisniku.

**Cucumber.** Unit testovi postoje samo za proračunske algoritme. Za sve ostalo pišem Cucumber testove, koji mogu da istovremeno rade sa direktnim servisnim pozivima ili sa HTTP pozivima. Većina testova je BDD, barata domenskim ponašanjem. Drugi deo (razdvojen) je zamena za integracione testove. I oni su domenskom ponašanje, samo na nižem nivou.

**OpenAPI šema generisana iz koda.** Dugo nisam umeo da procenim da li generisati ili pisati OpenAPI šemu? Sada prednost dajem generisanju iz koda. Sve OpenAPI anotacije su, svakako, u interfejsima, tako da je vrlo pregledno šta čini šemu. Implementacije su u kontrolerima i ne poznaju OpenAPI.

**Biznis provere vizuelno različite.** Biznis provere su one koje sprečavaju nedozvoljena stanja ili korišćenja aplikacije. Bitno mi je da ih brzo pronađem u kodu, te postoji poseban način upotrebe:

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

**ADR.** Bitne odluke koje imaju uticaja na arhitekturu projekta se zapisuju u ADR fajlove. Koristim se efikasnim [MADR](https://adr.github.io/madr/) šablonom.

**Dokumentacija korisničkog toka.** Tokom analize korisničkog toka upotrebe u Figmi, pravim specifikaciju koja se fokusira na komunikaciju FE i BE. Postoje sledeće celine: 1) kontekst - glavni akteri na stranicama 2) podaci koji dolaze u tok i 3) akcije koje korisnik treba. Svaka je opisana HTTP API pozivima i biznis ograničenjima koja moraju biti ispoštovana.

## Dva POC-a

Uzgred su napravljena i dva POC projekta.

**Codegen.** Jednostavan in-place code generator. Korišćenje generatora tokom compile-time jeste zgodno, ali je pomalo magično jer sklanja generisano. Jednostavniji je kod generator koji bi se koristio u toku pisanja koda. On kod posmatra kao obične tekstualne fajlove, pronalazi komande za generisanje u, na primer, komentarima, a rezultuje prostim blokom generisanog koda.

**Metabot.** Svaki projekat ima neka svoja pravila koja se ne mogu iskazati sintaksom. Konvencije imenovanja, ispravno korišćenja, mesta odakle se poziva neki kod i sl. Zato Metabot projekat. Skenira izmene u fajlovima. Na osnovu pravila, aktiviraju se akcije. Akcija može biti bilo šta: od analize koda (korišćenjem Kotlin kompajlera) ili generisanje koda (Kotlin Poet). Metabot radi u pozadini sve vreme dok se radi na projektu.

Oba projekta ima smisla uvezati u jedan. Vreme uzima danak, te ne uspevam da ih dovedem u red da bih se potpuno oslonio na njih. Deluje mi da koncept ima smisla i da vredi uložiti dodatno vreme.

----

Ovo je sve samo lični, trenutni izbor. Ne znači da drugačiji pristup nije korektan.

Otvoren sam za pitanja i dodatna tumačenja.