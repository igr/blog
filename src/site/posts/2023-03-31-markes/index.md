---
title: "Markes, Ana, relacije, parovi i kompot"
date: 2023-03-31T01:07:03+00:00
categories:
  - Razvoj
tag:
  - razvoj
  - projekat
  - kompozicija
  - relacija
---

Ana Grigorjevna Dostojevska čita knjigu pisca Gabrijel Hose de la Konkordija Garsija Markesa.

<!--more-->

Čini se da je OOP postao krajnji cilj razumevanja savremenog programiranja. Jedan razlog je opsednutost "lakim" jezicima, u kojima se takvim konceptima retko bavi. Nedavna ilustracija: programer (5+) radosno veliča postojanje klasa kao zaista odličnog izuma u jednom od \*skript jezika. Drugi razlog je niz okolonosti koji je pre skoro tri dekade učinio da jezik za tostere dobije zamah i postane jedan od industrijskih standarda za razvoj softvera.

OOP narativ je [dosadno](https://oblac.rs/op-hop-oop/) [monoton](https://oblac.rs/otpor-oop-nasledjivanje/) i [ograničen](https://oblac.rs/oop-boja/). Da ne bude zabune: OOP je koncept koji ima vrednost, ali i svoj domet. Svet imenica u kome je sve klasa predstavlja nasilno nametnutu utopiju. Odnosi mogu da budu ili "is" (jeste) ili "has" (ima); štiklirano. Prvi mapira klasifikaciju iz sveta, a drugi relacije; štiklirano. Ostalo ne postoji. Štiklirano.

Vratimo se Ani. Čita knjigu, znači _ima_ knjigu, OOP kaže: `ana.getReadingBook()`. Relacija iz sveta je preslikana u kod.

Ana, nekim čudom, ima više knjiga. Dakle: `ana.getBooks()`. Da li se knjiga koju čita nalazi u ovoj kolekciji (a šta ako je pozajmljena)? Kako bi potražili sledeću knjigu istog pisca? Imamo pristup kolekciji svih knjiga, pa 1) ustanoviti autora trenutne knjige, 2) potražiti sve knjige istog autora 3) izbaciti iz dobijenog podskupa knjigu koja se trenutno čita. Da li je opisana operacija deo biznis logike? Ako jeste, negde mora biti enkapsulirana. Da li je to u `Person`: postoji li `ana.getNextBookOfTheSameAuthorAsReadingBook()`? Ili je to: `ana.getNextBook(markes, hronikaNajavljeneSmrti)`?

Da li postoji tranzitivna relacija između Ane i Markesa? Da li postoji `ana.getBookAuthors()` ili je to, opet, `ana.getBooks().map { it.author }.distinct()`? Pisci bi trebalo takođe da pripadaju `Person`, zar ne? Onda: `ana.getBooksByAuthor(markes)`? Ana ima i omiljene pisce. Da li svaku postojeću relaciju u `Person` dupliramo, na pr. `ana.getBooksByFavoriteAuthors()`?

Ana voli i filmove. Ah, ništa lakše: `ana.getMovies()`. Jedan vikend Ana želi gledati samo ekranizovana dela knjiga koje voli. Ako već emitujemo dve kolekcije: `getBooks()` i `getMovies()` da li postoji: `ana.getMoviesOfFavoriteBookAuthors()`?

Šta je sa obratnom relacijom? Da li `Book` ima kolekciju filmova koji ekraniziju knjigu: `book.getMovies()`? Ili `Movie` sadrži `null`-able referencu na knjigu po kojoj je snimljen: `movie.getBook()`?

Da li svaki put kada dobijemo referencu na `Person` treba da dostavimo sadržaje svih relacija? Da li u redu da se služimo lazy-magijom?

Važnije pitanje: Zašto `Person`,`Book` ili `Movie` uopšte moraju da budu svesni jedno drugog (u _compile time_)? Samo zato što postoji relacija? Ako dodamo novi entitet `Music`, zašto moramo da menjamo `Person` i `Movie` zbog novog modela?

Važnije pitanje: otkuda data klasi dvostruka odgovorst, sopstveno stanje i stanje svih relacija?

---

Namera celog ovog odeljka je da ukaže na nedostatak uobičajenog načina modelovanja i razmišljanja. Na sva gornja pitanja se, naravno, može dati OOP odgovor. Primećuje se zanimljivo svojstvo. Što je domenski rečnik u vezi relacija konkretniji, to nam treba više funkcija. Ujedno `Person` odjednom radi mnogo više toga. Ukoliko krenemo ka generalnijim opisima relacija služeći se opštim kolekcijama, izmeštamo biznis odgovornost van `Person` na milost programera koji se služi kodom.

Narativ oko OOP kao da se fokusira na generalizaciju, koja dovodi do razvodnjavanja API-ja. Generalizacija je uvek udaljavanje od konkretnog. To ne želimo. Biznis sloj bi trebalo da je vrlo konkretan, uvezan, stabilan. Sad je i pravo vreme da p(r)ozovemo [ORM](https://oblac.rs/bas-bas-ne-volim-orm/) alate koji ne znaju za drugačije.

Odjek ovakvog stava je nemerljiv. Kada sva literatura, alati i saradnici ukazuju na isti način razmišljanja, teško je istupiti van.

Zapravo je reč o pomešanim konceptima.

## Relacije i veze nisu isto

Opet mi nedostaju termini, jer postojeće izjednačavamo i ne definišemo precizno.

"Veza" je topološka poveznica kategorija (namerno ne upotrebljavam termin "klasa"). Veze utiskujemo u bazu. Tabele su kategorije podataka. Veze ne zanima kako se one koriste od strane korisnika (softvera). Veze postoje da omoguće pravljenje kakvih god relacija. Veze postoje da bi podatke držale konzistentno. Veze postoje i bez njihove upotrebe.

"Relacija" je logička veza _skupova podataka_. Relacija je uvezivanje konkretnih vrednosti. Relacije su uvek dvosmerne. Relacija ne postoji bez upotrebe. Relacija se bavi biznis logikom, a ne "is"/"has" modelovanjem.

Relacija može da koristi jednu ili više veza. Relacija postoji i bez veze (ha!), ne mora se služiti bilo kakvom eksplicitnom vezom.

Ponavljam: relacije se bave grupama podataka. Relacija "trenutna knjiga koju osoba čita" nije između `Person` i `Book` već između `ana` i `pukovnikuNemaKoDaPiše`. Relacija "omiljene knjige" nije je između `Person` i `List<Book>`, već `ana` i `listOf(...)`. Da li postoji veza između `Person` i `Book` je pitanje _implementacije_.

Kako se programiraju relacije?

---- 

Kompo(t)zicijom.

Kao što kompot može da bude mešavina komada različitih voćki, tako je relacija kompozicija podataka. Kompozicija se zapisuje kao obična `data` klasa koja čuva relaciju. Može biti i `Pair`. Verovatno ne i `Tuple`, jer redosled nije važan.

## Malo o parovima

Da li ima mesta za `Pair` (i ostalim n-torkama) u domenskom jeziku? Omiljeno pitanje za potpirivanje vatre (za kompot).

Bolje napraviti konkretno ime relacije. `FavoriteBooks` je bolje nego `Pair<Person, List<Book>>`. Problem je sa imenovanjem: često nije lako naći pravo ime za relacije. Naročito kada su u igri mnogobrojne varijante sličnog: na jednom mestu nam treba više podataka, na drugom malo manje, na trećem sa jednom izmenom... `Pair` olakšava stvari. Ono što je baš, baš ružno jesu opšta imena komponenti n-torki. (`_1`, `first`...), pa bi bilo kul uraditi dekompoziciju što pre. Zapravo, `Pair` bi trebalo da postoji samo interno, da se samo kompajler njime bavi.

## Rezime

Dodaj kompot u kod. Čitaj kao Ana. :)