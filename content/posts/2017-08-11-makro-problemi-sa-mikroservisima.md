---
title: Makro problemi sa mikroservisima
date: 2017-08-11T09:53:22+00:00
slug: makro-problemi-sa-mikroservisima
categories:
  - Mišljenja
  - Razvoj
tags:
  - arhitektura
  - devops
  - docker
  - fowler
  - infrastruktura
  - mikroservisi
  - problemi
  - proizvod
  - razvoj
---

Arhitektura zasnovana na mikroservisima je, kako to [Fowler definiše](https://martinfowler.com/articles/microservices.html):

> ...an approach to developing a single application as a suite of small services, each running in its own process and communicating with lightweight mechanisms, often an HTTP resource API. These services are built around business capabilities and independently deployable by fully automated deployment machinery.

Koncept mikroservisne arhitekture je sasvim u redu (i nije nov, povrh svega). Međutim, često se zanemaruje **kompleksnost** koju mikroservisi unose u razvoj. Čekaj, kakva kompleksnost!? Zar mikroservisi ne bi trebalo da upravo smanje složenost sistema time što ga dele na manje softverske komponente koje su jasno razdvojene?

Da. Misija mikroservisa je i da smanje uvezanost (_coupling_) između komponenata aplikacije. Svaki mikroservis ima svoje okruženje, životni vek (_lifecycle_), procedure. Svaki servis se pojedinačno može optimizovati, skalirati po potrebi, nadograditi itd. bez da to ima uticaja na ostatak aplikacije; u pitanju je nešto što nije lako ostvarivo u aplikaciji sa monolitnom arhitekturom.

Ipak, to je jedna strana medalje. Tamna strana je tamo gde kompleksnost uzvraća udarac i dovodi u pitanje projektne odluke. Pokušaću da sumiram pojedine bolne tačke iz projekata čija je arhitektura zasnovana na mikroservisima. Da budem potpuno fer, neki od ovih projekata su vrlo dinamični, kada se ima u vidu broj različitih komponenti sa kojima se barata u toku rada aplikacije. Ne znači da će i svaki drugi projekat da pati od istih nedostataka - ideja je da bar ukažem na stvari koje zahtevaju **više pažnje** nego što bi se to očekivalo.

## Razvoj

**Spremi se za izolaciju** - ne samo koda mikroservisa, već celog razvoja i procesa objavljivanja komponenti. To uključuje (ali se ne ograničava): razvoj koda, testova, priprema artefakta i, konačno, objavljivanje mikroservisa i njegovo oglašavanje u eko-sistemu projekta. Sada je sve to potrebno uraditi za svaki mikroservis koji čini aplikaciju. Ovo traži određeni nivo kozistencije u procesima razvoja svih komponenti. Budi spreman da uložiš dodatno vreme, naročito na početku projekta, kada izolacija najverovatnije nije prva stvar o kojoj bi razmišljao. Ukoliko izolacija nije izvedena kako treba, projekat lako može da se surva u omanji pakao različitih verzija komponenata koje su čvrsto uvezane - nečega čega smo hteli da se rešimo u samom startu izborom mikroservisne arhitekture.

**Ne zaboravi s kim pričaš** - često se pozivi ka mikroservisima enkapsuliraju da bi sakrili transport, parsiranje rezultata, serijalizaciju argumenata, validaciju itd. Zbog ovoga korišćenje udaljenog (_remote_) API-ja postaje identično pozivima lokalnih metoda. Vizuelno, na mestu korišćenja ne postoji nikakva razlika između poziva lokalne metode ili udaljenog servisa. I to je upravo moguće mesto problema! Lako je zaboraviti šta se zapravo poziva. Mikroservisi počinju da se koriste kao da je lokalni kod: pozivaju se u petljama, učestvuju u sinhronizaciji, transakcijama... Očigledno je da nije isto pozivati lokalni ili udaljeni servis! Poziv udaljenom servisu može da ne uspe u bilo kom trenutku. Sporiji je, sa kašnjenjem na mestima na kojima se to ne očekuje. Redosled izvršavanja je nepredvidiv. Nema _rollback_ opcije kada nastane problem. Poziv udaljenom servisu može čak da vrati i neispravne podatke. Zato svaki put kada se koristi udaljeni mikroservis, mora se biti svestan svi mogućih problema koji mogu da nastanu. **Ne pretpostavi da poziv mikroservisa radi tek tako**. U stvari, teraj se da razmišljaš o tome šta će se dogoditi ukoliko poziv ne uspe i probaj da nađeš rešenja za sve vrste grešaka. Ako zbog svega ovoga kod počne da ima previše “šuma”, to nije razlog da se to ne radi, već je indikacija da bi kod trebalo bolje organizovati. Jednom tako, aplikacija na kojoj sam radio je upadala u nepredviđeno stanje pošto se je jedan od internih poziva među mikroservisima jednostavno prekidao, i to u sredini izvršavanja biznis logike. Nije postojao nikakav kod koji bi uhvatio grešku u transportu, kao ni kod da vrati stanje na prethodno u ovakvim slučajevima. Pošto aplikacija nije znala da se oporavi od neispravnog stanja, prestala je da radi. U produkciji. Nakon drugog dana. Uh.

**Lokalni razvoj više nije samo lokalni** - čest je slučaj da su programeru potrebne ostale komponente aplikacije tokom razvoja svog mikroservisa. To dodatno komplikuje stvari. Duboko sam ubeđen da programer mora da se fokusira samo na svoj zadatak i posao, a ne da gubi vreme na žongliranje sa infrastrukturom. Puno je ovde izazova koje treba rešiti: od startovanja minimalnog broja potrebnih komponenti infrastrukture u lokalu, podešavanje DNS imena servisa, omogućavanje debagovanja i monitoringa, sve do izrade mockup-ova za pojedine mikroservise. Docker će postati i najbolji prijatelj, ali i najveći neprijatelj u isto vreme. Spremi se da uložiš u alate za razvoj, izradu zajedničkih biblioteka, interne registre artefakta, ispravno verzionisanje... Sve da bi programeru pružili slobodu da proizvodi kod bez previše zastoja (i smaranja). Srećan programer je dobar programer 🙂

**Dokumentuj API i komuniciraj** - kao da ti život zavisi od toga! Nauči kako se pravi, objavljuje i održava dobar API i interfejs. Promena API-ja zna da onesposobi druge kompomente; u svetu mikroservisa se to događa u toku rada aplikacije, a ne tokom kompajliranja. Nemoj da čekaš da integracioni test otkrije ove greške. Na pravilan način obaveštavaj tim o izmenama, naročito one koji zavise od tvog mikroservisa. Objasni svoj API, najbolje kroz neki uobičajeni format kao što je [Swagger](https://swagger.io/); dodaj primere korišćenja koji nisu banalni. Ne dozvoli da korisnik tvog API-ja nagađa kako neki poziv radi. Ovo je važno za bilo kakvu arhitekturu, no za mikroservise postaje još važnije. Održavaj i komuniciraj strukturu zavisnosti između komponenti, definiši _upstream/downstream/compile-time/runtime_ zavisnost za svaki mikroservis.

**Integracioni testovi su obavezni**. Ono što bi bio unit test sa _mockup_-ovima u monolitnoj arhitekturi, u svetu mikroservisa je integracioni test. Moraju se testirati interakcije mikroservisa. Broj integracionih testova lako može da eksplodira iznad nivoa upotrebljivosti, kada izvršavanja testova traje nepraktično dugo, čak i za relativno malu količinu koda, čineći CI bolno neupotrebljivim. Važno je znati da ne treba sve da postane integracioni test. Razdvoji koncepte koji se mogu _mockup_-ovati od onih koji baš zahtevaju postojanje ostalih mikroservisa. Ovim se broj integracionih testova može značajno smanjiti, a time i vreme testiranja. Uloži vreme u izradu dobrih _mockup_-ova. Treba težiti da testovi što manje zavise od ostatka infrastrukture i ostalih mikroservisa.

**Stres** je dobar. Što ranije treba uključiti testiranje aplikacije i infrastrukture na stres. Kada broj softverskih komponenti koje komuniciraju preko mreže poraste, nema drugog načina da se ustanovi kako se aplikacija ponaša. Rano stresiranje aplikacije jasno ukazuje na njene slabe tačke. Koristi stres kao meru optimizacije i sredstvo za nalaženje granica sveukupnih performansi. Iskoristi stres da poguraš aplikaciju “preko ivice” i proveriš da li aplikacija zna da se oporavi nakon stresa i potom nastavi da radi.

**Nije sve mikroservis**. Može biti veoma bolno i skupo ukoliko se softverska komponenta dizajnira kao mikroservis, a to u biti nije. Nauči razlike između **mikroservisa** i **modula** i **biblioteka**. Preispituj odluke; ukoliko neki modul, na pr., učestano poziva udaljeni servis koji pruža važnu funkcionalnost aplikaciji, moguće je da je on dobar kandidat da postane biblioteka. Mikroservise treba organizovati oko _biznis_ funkcionalnosti, a ne oko brojčano malog seta nekih funkcionalnosti. Ovo je konceptualna stvar i verovatno svaki programer drugačije razmišlja na temu gde su granice mikroservisa; zato na samom početku projekta treba formirati jasne definicije i prakse koje važe za aplikaciju i komunikaciju između mikroservisa.

**Razvoj traži više vremena**, očigledno. Koliko više? Zavisi od kompleksnosti projekta, broja komponenti i volumena komunikacije među njima; kao i od toga da li su ovde navedene napomene uzete u obzir. Dupliraj estimacije dok se ceo razvojni proces ne ustali.

## Infrastruktura

**Logovanje** se više ne dešava samo u konzoli. Logovanje je sada distribuiran proces koji obično zahteva nekoliko zasebnih komponenata. Infrastruktura za logovanje može da uključi emitere logova, bafere, mesto za skladištenje (_datastore_) i komponente za vizualni prikaz i analizu logova. Različiti mikroservisi loguju u različitim formatima. Sve njih treba sakupiti na jednom mestu i podjednako ih obraditi. Takođe je bitna separacija logova po mikroservisu, ali i po jednoj instanci (kada je mikroservis skaliran). Saobraćaj koji logovi stvaraju nije zanemarljiv, naročito tokom _debug_-ovanja, čak i za mali broj komponenti. Doživeo sam da je fajl sistem na [AWS](https://aws.amazon.com/) bacao `IO` _exception_ samo zato što nije uspevao da pravovremeno _flush_-uje sve logove u fajlove (u pitanju su bili male instance koje se nisu koristili u produkciji).

**Uključi monitoring** od prvog dana. U stvari, nadgledaj aplikaciju od nultog dana! Jedina konstanta u arhtekturi sa mikroservisima je da bilo koja komponenta može da prestane da radi u bilo kom trenutku. Doći do dobrog sistema za monitoring i detekciju grešaka nije naivna stvar; kako god, treba ih uraditi što pre. Mora se imati informacija o tome kako se skup distribuiranih komponenti ponaša i da li ispravno radi. Monitoring bi trebalo da uključi i _health check_ mikroservisa: provera ne samo da li je komponenta aktivna (na pr. da je neki port otvoren), već da li ona takođe radi kako treba. Nadgledanje treba da se bavi celom infrastrukturom sistema, a ne samo komponentama koje se razvijaju. Uključi poruke upozorenja (_alert_) kada nešto nije kako treba. Pokušaj da detektuješ spore pozive, nagle IO promene, kašnjenja na mreži. Monitoring su oči uprte u sistem, otvori ih. Najgora stvar je da produkcija prestane da radi, a nemaš nikakvu ideju gde je greška. Desilo mi se (pre)više puta da dobijem samo SSH pristup na računar sa bukvalno hiljadama kontejenera i zadatak da otkrijem šta je krenulo kako ne treba. Mda, noć je ponekad veoma duga.

**Automatizcija je zakon** i bez nje nema smislenog projekta sa mikroservisima. Zbog broja softverskih i infrastrukturnih komponenti, nemoguće je razvijati bez ikakve automatizacije. Spremi sa na pisanje gomile _shell_ skriptova. Različiti timovi možda imaju različite potrebe za automatizacijom i skriptovima. No automatizacija nisu samo skriptovi. Uključivanje CI/CD infrastrukture je takođe neophodan deo procesa razvoja, samo što sada mora da radi sa svim komponentama.

## Mikro Zaključak

Gornje napomene se smatraju dobrim inženjerskim praksama, koje uvek važe bez obzira na tip arhitekture. Ali stvar je u sledećem: u monolitnoj aplikaciji, ne moraš da ih baš sve implementiraš. Neke se mogu uključiti kasnije, ili u manjem obimu, ili da se čak potpuno izostave. I možeš se izvući s time.

Sa mikroservisima, ne sme se propustiti **ni jedna** od gornjih napomena. Nema jednostavnog načina da se one zaobiđu.

Sa mikroservisima, nije dovoljno biti samo dobar programer - potrebno je biti **vrhunski inženjer**. I ti i tvoj tim morate biti spremni na to.