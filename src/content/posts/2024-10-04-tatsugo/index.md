---
title: "8900400"
date: 2024-10-04T01:06:08+00:00
slug: "8900400"
description: "Ovoliko poruka protrči za 2.2 sekunde kroz Tatsugō."
---

Ovoliko poruka protrči za `2.2` sekunde kroz **Tatsugō** - mali, robustan Event-driven engine. `10002` instanci procesira poruke i menja stanja potpuno **lock-free**.

## Postavka

Slutim da _niti_ (threads) i _konzistentno deljeno stanje_ **nisu** dobra kombinacija.

Ako je tako, trebalo bi da polako odmičemo od sveopšte prihvaćenog načina razvoja softvera.

## Razrada

Većina projekata danas prati sledeću formulu:
+ paralelni zahtevi se prepuštaju na obradu nitima,
+ zajednička stanja se čuvaju u bazi,
+ koriste se mehanizmi zaključavanja (i izolacija) kako bi podaci bili konzistentni tokom i nakon obrade zahteva. U mehanizme spadaju sinhro-konstrukti u programskim jezicima i transakcije u bazama.

Zašto ovakav način razvoja boli?

Da bi bilo konzistentno, deljeno stanje se mora "braniti" od paralelnih mutacija: mahom je dozvoljeno paralelno čitanje, ali ne i pisanje. To zahteva upotrebu lokova (zaključavanja). Jedan mehanizam za lokovanje dolazi sa bazom: transakcije, sa svojim nivoima izolacije. Kada podaci nisu u bazi, koristimo razne "thread-safe" mehanizme programskih jezika: `synchronized` i ostale lokove, `volatile` varijable, atomske tipove, synchronized kolekcije, mutekse... Ukratko: zaključavamo kritične sekcije, kako bi različite niti mogle da ih menjaju jedna po jedna.

Osvrnimo se sada na niti. Omogućavaju paralelizam, ali [nije sve jednostavno](https://oblac.rs/koliko-niti-moze-biti/). Niti nam najviše služe da _čekaju_. Zato možemo da napravimo 1000 niti čak i kada imamo tinejdžerski broj CPU jezgra: one čekaju da se nešto desi, najčešće završi kakav IO. Niti, međutim, ne vole da rade više nego što treba. Kada su zaposlene, mogu da odrade samo toliko posla koliko je jezgra. Ovakva drastično asimetrična postavka je problematična: okej za mali saobraćaj, ali čim se upotreba onih 1000 niti poveća, tako raste količina posla i neosporno dolazi do usporavanje obrade, jer se niti sada bore za procesorsko vreme.

Ako u jednačinu uključimo i lokove radi kozistentnosti, dobijamo dodatno mesto gde zadržavamo niti. One sada ne čekaju nešto čega još nema (završetak IO), već čekaju dozvolu za predstojeću mutaciju kako bi podaci bili konzistentni.

Dalji problem sa nitima jeste što je njihovo izršavanje nedeterminističko. Da radimo sa čistim funkcijama to ne bi osetili; međutim, naše niti čekaju spoljne efekte. Rad sa nitima je težak i neprirodan za ljudski `if-then-else` način razmišljanja. Čak i sistemi koji se pažljivo pišu i proveravaju dožive grešku usled paralelnog izvršavanja koda - sistem se nađe u stanju koje je gotovo nemoguće predvideti. Čest odgovor na ovakve greške je dodatno lokovanje, proširivanje kritične sekcije. Dalje, kako, uopšte, dokazati da neterdeministički proces radi kako je zamišljeno?

Da se vratimo bazi. Nivoi izolacije koja baza nudi rešavaju probleme specifične za paralelan rad sa podacima; zapravo nude nivoe izolacije transakcija. Meni "nivoi izolacije" oduvek zvuče čudno: da li su to različiti nivoi u kojima izolacija _ne radi_ kako treba? Šta će nam različiti nivoa nečega što ne radi? Pokazuje se (videti rad: ACIDRain) da današnje baze nude značajno slabiji model od klasične serializacije; i ujedno zahtevaju uključivanje programera u razrešavanje kojekakvih slučaja korišćenja, koji nisu direktno biznis logika. Dalje, baze mogu samo koliko mogu; pametno zaključavanje redova zna da preraste u zaključavanje cele tabele kako korišćenje raste.

Boli, zar ne?

## Alternativa

Zašto mora tako? Šta ako promenimo početne postavke?
+ Stanje NE mora biti sve vreme konzistentno.
+ Baza je samo data-store i ne bavi se izolacijom.
+ Izolacija se pomera sa mesta čuvanja (dosta kasno) na početak obrade (vrlo rano). Drugim rečima, kod se "particioniše" po mestima na kojima se podaci mutiraju.

## Analiza

Eventualna konzistentnost (ili: odložena doslednost) nije nova stvar. Zapravo, stara je koliko i Univerzum: informacija ima brzinu, te ne postoji "sada." Ako je takva priroda svih stvari, zašto, ali zašto insistiramo da podaci budu _uvek_ konzistentni?

Uveđenje odložene doslednosti "olakšava" neke od navedenih problema. Omogućava da se podaci "podele" po mestima na kojima mutiraju. Kako proces obrade odmiče, tako se delovi podataka "sakupljaju", sada u bazi, a ne u programskom sloju. Postojaće zapisi koji će neko vreme biti nepotpuni - i to je potpuno OK.

Idemo dalje. Šta ako izolaciju izmestimo iz baze? Naš Objekat (pravi objekat, ne pseudo-OOP objekat) bi mogao da predstavlja jedan zapis, jediničnu instancu svih mutacija nad jednim konkretnim podatkom (konkretni red iz baze, na primer.) Želimo da ukinemo lokovanje i da ne vodimo računa o tome. Kao kada bi napravili kanal samo za jedan tip izmena; ilustrativno: zasebnu konekciju ka bazi koja vidi samo tabele od interesa. Kao da iscepkamo ukupno stanja na ostrvca, koje svako živi nezavisno od sebe.

Teško je objasniti ovu paralelu... "A-ha" momenat nećete dobiti prostim čitanjem teksta, već modelovanjem. Suštiniski, reč je o razbijanju jedne od najčvršćih i najčešćih kohezija koje postoje u kodu: kohezija podataka.

Međutim, i nakon ostvarivanja izolacije podataka (razbijanje kohezije), ostaje problem paralelnog izvršavanja. Postoje niti koje žele da isto vreme mutiraju podatke. Kako to rešiti?

U redu je. Mislim, rešenje je u redu. _Queue_.

Red predstavlja ultimativni način sinhronizacije - zapravo ukida paralelizam:) Operacije se izvršavaju jedna za drugom, te nema potrebe voditi računa da će jedna pregaziti drugu. A ako je pri tome svaka operacija (komponenta) izolovana za sebe, dolazimo do lepog uspeha: lock-free kod.

Gde je red, tu su i poruke, tj. eventi. Uvođenjem reda drastično menjamo arhitekturu: komponente sada šalju jedna drugoj poruke. Nema statičkog uvezivanja komponenti u compile-time.

Nije li izvršavanje po redu sporije? Verovatno kod malog saobraćaja, kada nije ni važno. Ostanite još uz tekst, sledi primer koji adresira ovo pitanje.

Da li smo to ukinuli niti? Nismo! One su i dalje tu i dozvoljavaju paralenu obradu, čekanje na IO i sve ostalo. Ali zbog izolacije više ne brinemo o preklapanju: svaka nit se bavi svojim stanjem. Svaki red može biti jedna nit.

Jbg, ovo nije nasrećnije predstavljanje (n)ove paragime: mnogo toga sam sabio u par paragrafa. Ako ste još tu, posvetite pažnju sledećem konkretnom primeru, jer pojašnjava dosta toga.

## Tatsugō & Game of Life

Ko šta radi, ja modeliram Game of Life. Posle mnogih nedelja, došao sam do zanimljivog frameworka (**Tatsugō**) koji objedinjuje različite koncepte i dozvoljava da se primeni opisana paradigma.

Primer je zamišljen na sledeći način.

GoL igra zahteva tablu ćelija (`Cell`). Svaka ćelija ima svoje stanje: može biti živa ili mrtva. Svaka ćelija isključive brine o svom stanju. Takođe, svaka ćelija ima svoju jedinstvenu adresu koja je, u ovom slučaju, jednaka koordinatama ćelije. Ćelije nemaju pojma o drugim ćelijama, samo znaju sa koliko ćelija su okružene.

Cela tabela se pamti u komponenti `Grid`, matrici. Matrica sadrži celokupno stanje ploče za igri. Matrica je zapravo duplikat stanja, ali i istorija svih stanja ćelija. Duplikat upravo zbog potpune izolacije - matrica ne potražuje stanje od ćelija, već ga dobija! Dalje, dovoljna je samo jedna instanca ove komponente. Matrica brine o tome kada je generacija gotova, kao i kada je završena poslednja generacija igre.

Svaka ćelija obaveštava matricu kada dođe do promene stanja. Matrica prima poruke od ćelija, revidira svoje stanje tabele, a potom šalje svim okolnim ćelijama poruku o novom stanju njihovog suseda. Matrica takođe prati kada je jedna generacija završena, kako bi je ispisala.

Poslednja komponenta igre je jednostavan statističar - brojač sivh poslatih evenata.

## Implementacija

Zanimljivo je kako je sistem modelovan.

U osnovi sistema mora da postoji nekakav `Bus` kojim se šalju eventovi. Date su dve implementacije; prva koristi "vruć" flow koji delegira eventove svim pretplatnicima. Druga implementacija je običan red (`Channel` u Kotlinu). Šta mislite koja implementacija je brža? Red!

Da krenemo od statističara: uobičajeni event handler. Prosto broji eventove.

Matrica se modeluje kao `Queue`, red. Prihvata sve evente koji su za nju i obrađuje ih jedan po jedan. Nema bojazni da će se u isto vreme menjati stanje. Kod je potpuno lock-free!

Konačno, ćelije su aktori. Svaki opet prati samo svoje stanje. `Fleet` je komponenta koja vodi računa o životnom veku ćelija i slanju poruka na pravu adresu. Zanimljivo, pošto ćelije mogu da rade nezavisno, dugo sam smatrao da ih je moguće paralelizovati. To je, naravno, moguće, ali kako se ispostavilo - potpuno nepotrebno. Rezultati paralelizovanog rada je besmisleno duže izvršavanje koda; od čega mi je laknulo, te sam vratio da se i te poruke aktora obrađuju serijski, po redu.

Sa samo pet jednostavnih apstrakcija dobijamo event-driven framework koji spaja event handlere, redove i aktore; i brutalno brzo obrađuje poruke jer je lock-free i ne zahteva sinhronizaciju posla.

## Sors

Sors: [https://github.com/igr/tatsugo](https://github.com/igr/tatsugo)

Idemo dalje.
