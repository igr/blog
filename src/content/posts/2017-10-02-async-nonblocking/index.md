---
title: 'Asynchronous & Non-blocking'
date: 2017-10-02T09:53:22+00:00
slug: async-nonblocking
description: >
  Asinhronog i neblokirajućeg programiranje nije isto.
---

Oba termina su u upotrebi kada pričamo o sistemima sa paralelnim izvršavanjem operacija. U mnogim slučajevima predstavljaju različiti naziv za istu stvar; ali postoji kontekst u kojem se razlikuju. Ne pomaže to što terminologija u softverskoj industriji nije ujednačena i što je ustanovljena praksa prenaglašavanja naziva zarad popularnosti. U vezi ovih pojmova ima stvari koje mi nisu sasvim jasne, pa je ovo pokušaj da bar koliko-toliko sumiram misli na jednom mestu.

## Non-blocking

Da krenemo od suprotnog pojma: **blocking** operacija je ona na čiji rezultat mora da se sačeka. Na primer:

```java
String content = FileUtil.readFile("fajl.txt");
```

To najčešće znači da trenutni _thread_ čeka (spava) dok blokirajuća metoda ne završi sa radom. Obično se čeka da drugi deo sistema (na pr.: I/O) vrati podatke ili da neki zajednički resurs (baza, _lock_) postane dostupan. To ujedno oslikava problem blokirajućih operacija: pošto se _thread_ ne koristi za rad i pušta se da čeka, iskorišćenost procesora nije potpuna.

Nije nužno da blokirajuća operacija uključuje druge delove sistema. Na primer, kompleksno izračunavanje isto može da bude blokirajuće prirode:

```java
BigDouble double = MathUtil.calculateBigPrime();
```

Računanje se izvršava u istom _threadu_, pa je iskorišćenost _threada_ sada potpuna, ali ostatak programa negde već čeka da se račun završi - blokiranje, dakle, nastaje na drugom mestu. Posle koliko vremena kažemo da je metoda koja se izvršava u istom treadu blokirajuća? Ne postoji jedan odgovor. Ako je u pitanju UI, davno je još ustanovljeno da se odziv od 0.1 sekundi smatra trenutnim, a do jedne sekunde se toleriše. [VertX](http://vertx.io) na primer, dopušta najviše dve sekunde zauzeća tkzv. _event-loop threada_ koji obrađuje HTTP zahteve. Ako imate projektni zahtev da server obrađuje 1000 HTTP zahteva u sekundi, očigledno je da se svaki zahtev mora obraditi za najviše 1 milisekundu.

**Non-blocking** metoda je ona koja ne blokira _thread_, vraća odmah šta god može i dozvoljava da program nastavi sa radom. Operacija koja je pozvana najčešće nije izvršena do kraja u trenutku kada se neblokirajuća method završi, te je ostavljeno programu da sam kompletira dobavljanje rezultata, jednom kada oni budu dostupni.

Termin _non-blocking_ se često odnosi na _pooling_: periodičnu proveru da li je neko stanje spremno za upotrebu:

```java
while (!isDataReady()) {
    socketchannel.read(inputBuffer);
    // uradi nešto, pa ponovo pročitaj
}
```

Da rezimiramo: blokiranje je pojam koje se tiče trajanja izvršavanja operacije, iskorišćenja threadova, čekanja na resurse i zaustavljanja drugih delova programa ili sistema.

## Asynchronous

Asinhrono svojstvo izvršavanja operacija se bavi redosledom toka operacija. **Asihnrona** operacija se izvršava nezavisno od glavnog toka programa, tj. od _threada_ iz kojeg je bila inicirana. Rezultat asinhrone operacije se može očekivati bilo kada, potpuno nezavisno od dela programa koji ju je inicirao. Asinhrona operacija ne implicira da je i neblokirajuća.

Asinhrono opisuje _relaciju_ između dva modula, dva mesta u programu. Kao što kretanje tela ne može da postoji bez referentne tačke, tako i asinhrono izvršavanje mora da ima referentni tok u odnosu na koju nije sinhrono. Kada god pratim priču o asinhronim operacijama, gledam da pronađem tu referentnu tačku ("...asinhrono u odnosu na šta?").

Asinhron način izvršavanja omogućuje i da neku blokirajuću operaciju učinimo da bude neblokirajuća - bar na tom mestu gde je pre postojala blokada. Postoji više softverskih konstrukta za to; o tome drugom prilikom.

Primer: e-mail je asinhrona komunikacija. Kada pošalješ mejl, ne očekuješ odgovor baš istog trenutka. Ali je ova komunikacija blokirajuća, jer ne možeš da nastaviš konverzaciju dok god ne dobiješ odgovor nazad. Onog trenutka kada prestaneš da čekaš na mejl i počneš da radiš nešto drugo, komunikacija postaje asinhrona.

## Zašto non-blocking?

Suština neblokirajuće aplikacije je da ne blokira sistem: uključujući UI, _threadove_, _file descriptore_ itd. Postoji više nivoa u aplikaciji koji se mogu blokirati, tako da treba obratiti pažnju na to šta se zapravo (ne) blokira. Najbolji primer je uporediti tradicionalne i non-blocking web servere.

Tradicionalni web server radi tako što se za svaki HTTP zahtev odvaja po jedan thread u kome _handler_ obrađuje request. Odgovor se sinhrono šalje nazad. Ovo, jasno, zahteva korišćenje velikog broja _threadova_, što ima svojih loših strana: sporije izvršavanje, opterećenje procesora ne programom već sistemskim stvarima, kao što je _context-switch_ i sl. Šta se tu blokira? Da ne komplikujem previše: koriste se blokirajući _file_ deskriptori (tj. soketi); dakle rad sa sistemskim I/O je blokirajuće prirode.

Neblokirajući web server koristi neblokirajući _file_ deskriptore zajedno sa I/O multipleksingom (kao što je _epoll_) - kako bilo, ideja je da se efikasno koristi kernel i tako omogući da se _jedan_ _thread_ koristi za ‘hvatanje’ više sistemskih signala (_eventa_). To znači da je na aplikativnom nivou moguće imati samo jedan _thread_ koji će primati HTTP zahteve. U praksi se dozvoljava postojanje više ovakvih _threadova_ (koji se često zovu _event loop_), i to onoliko koliko procesor ima jezgara, radi potpunijeg iskorišćenja procesora.

Neblokirajući serveri su, po pravilu, značajno boljih performansi: broj _threadova_ je mali, pa je opterećenje procesora manje, manje puta se dešava _context-switch_, troši se manje memorije, propusnost sistema je veća, skaliraju se bolje itd.

Da razbijemo jedan mit: ne znači da je aplikacija neblokirajuća ukoliko se koristi takav server. Kao što je rečeno, blokiranje može da nastane na više nivoa, pa ako su _handleri_ blokirajuće prirode, nismo ništa uradili.

## Da li non-blocking?

Činjenica je da asinhroni kod nije baš trivijalno pisati i razumeti. Nije lako pratiti šta se dešava u message-driven sistemima. U jednom projektu smo probali da sve _handlere_ pišemo na asinhron način: da što pre oslobodimo _event-loop thread_ da ga ne bi blokirali kako bi on nastavio da opslužuje sledeće HTTP zahteve, dok mi još uvek aisnhrono procesiramo prethodni HTTP zahtev. To se svelo na to da _fork-join pool_ preuzme ulogu _working thread poola_. Što opet znači da umesto da pišemo kod kroz `CompletableFuture`, možemo jednostavnije da procesiramo HTTP zahteve u zasebnom, uobičajenom, dinamičkom _thread poolu_. Drugim rečima: iako dobavljanje HTTP zahteva radi na non-blocking način, procesiranje zahteva se izvršava na tradicionalni način, svaki u jednom _threadu_.

Digresija: ovo nije jedini način kako se asinhroni kod može pisati. _Reactive_ princip, recimo, izdvaja message-driven implementaciju u svom (čudnom) manifestu kao neku vrstu preporuke.

Da li to usuđujem da dovodim u pitanje non-blocking web servere?

Izgleda da nisam jedini. Da, svuda ćete naći ono što sam napisao: da je neblokirajući pristup brži, da se bolje skalira i sve već gore napisano. Ali da li je to tačno? Mislim da niko ne zna. Ali evo nešto malo šta znamo. [Ovaj benchmark](https://www.techempower.com/benchmarks/#section=data-r9&hw=peak&test=db) prikazuje da su čisti servleti brži nego, recimo, Undertow (i Skala, kada je bila u listi). [Ovaj blog](https://blog.eveoh.nl/2012/04/some-notes-on-tomcat-connector-performance/) tvrdi da je Tomcatov NIO konektor sporiji. Meni je najpotpunija [ova prezentacija](https://www.slideshare.net/e456/tyma-paulmultithreaded1), koja vrlo zdravorazumski pristupa problemu. [Ovaj rad](https://www.usenix.org/legacy/events/hotos03/tech/full_papers/vonbehren/vonbehren.pdf) praktično kaže da su _eventi_ loša ideja. Opet, u pitanju su subjektivno stavovi koje ne možemo tek tako da usvojimo; ne znamo da li se tiču samo Jave ili je u pitanju Node, da li su rezultati ponovljivi itd.

Ako posle svega ovoga ne znate šta da mislite; pa... dobrodošli u klub 🙂 Nije to bila namera, no svakako je ovo tema kojoj vredi posvetiti pažnju. Voleo bih da u softverskom svetu postoje konkretnija istraživanja koja bi bacila svetlo u mrak ovih nedoumica.
