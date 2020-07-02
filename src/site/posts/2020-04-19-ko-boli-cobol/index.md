---
title: "Ko boli Kobol"
date: 2020-04-19T01:07:03+00:00
categories:
  - Stav
meta:
  img: "ig.png"
tag:
  - društvo
  - razvoj
  - tehnologija
  - cobol
---

COBOL. Članak koji sam napisao za [StartIt](https://startit.rs/sta-raditi-s-220-milijardi-linija-cobol-koda-nista/), malko poboljšan; da ostane i ovde.

<!--more-->

Ovih dana se u nemalom broju američkih država pojavila hitna potražnja za COBOL programerima. S obzirom da je reč o programskom jeziku koji je koncipiran krajem 50-tih godina prošlog veka - pre nekih 60 godina - ovakva potražnja predstavlja neobičan presedan.

## Zašto COBOL

Krenimo ispočetka. COBOL je jezik koji je 60-tih korišćen na mainframe računarima, mahom u poslovnim sistemima: bankama, ili sistemima koje koriste uprave država. Ovi kompjuterski sistemi, od kojih su neki napravljeni 70-tih, još uvek su u upotrebi. Prema [Reuters-ovom izveštaju](http://fingfx.thomsonreuters.com/gfx/rngs/USA-BANKS-COBOL/010040KH18J/index.html) iz 2017. više od 40% američkih bankarskih sistema još uvek radi u COBOL-u; preko 80% transakcija karticama se obavlja uz pomoć COBOL koda, a 95% ATM aparata je kodirano ovim jezikom. Sumarno, to je nekih _220 milijardi_ programskih linija COBOL koda koji je još uvek u upotrebi - samo u Americi.

COBOL je dizajniran par godina nakon FORTRAN-a, jezika kojeg su koristili mahom inženjeri; na dosta načina ova dva jezika liče jedan na drugi (što je ujedno i nekakav uvid u to davno doba softverskog razvoja). Ideja iza COBOLa je bila na mestu: stvoriti standardizovani poslovni kompjuterski jezik koji će se koristiti na širokom spektru računara; dakle, portabilan jezik za obradu podataka. Iz te namere dolazi i njegovo ime: `COmputer Business Oriented Language`. Na razvoju jezika su radili predstavnici korporacija, ali i ministarstvo odbrane Sjedinjenih Država. COBOL je trebalo da bude privremeno rešenje, usputna stanica; no pomenuto ministartstvo je pasivno-agresivno forsiralo proizvođače računara da pružaju podršku za COBOL, odbijajući da iznajme ili kupe sistem koji ne bi imao COBOL kompajler - ukoliko ne dokažu da on na neki način narušava performanse sistema. Za svega godinu dana, COBOL kreće na neumitan put da se susretne sa svojom sudbinom - i postane industrijski standard, i - možda - najkorišćeniji programski jezik ikada.

Jezik je ubrzo doživeo prva poboljšanja, kao što je bila mogućnost kreiranja izveštaja, što ga je učinilo još popularnijim. Krajem 60tih nastaje i prvi ANSI standard jezika; od tada je standard doživeo nekoliko revizija i dopuna, na svakih, ugrubo, desetak godina. Poslednja revizija je bila 2014., što i nije tako davno. COBOL je jedan od prvih kompjuterskih jezika "višeg nivoa", u kome se program piše rečnikom koji više liči na govorni (engleski) nego na mašinske komande, što je za to vreme bila novina i vredna stvar. Takođe ima jaku podršku za procesiranje podataka ugrađenu u sam jezik; zamenjuje veliku količinu posla baratanja podacima koja se u to doba radila mahom ručno. Jezik su podržavali proizvođači mainframe računara, među kojima se izdvaja IBM; on nastavlja da do danas proizvodi nove verzije mainframe rešenja. Sve je to dovelo do toga da se COBOL usadi u velikom broju kompjuterskih sistema nastalim u narednim dekadama, od kojih neki obavljaju neumoljivo važne poslovne ili državne funkcije.

## COBOL kao programski jezik

COBOL je, u suštini, jednostavan programski jezik. Ta jednostavnost, na svoj način, održava sve te milijarde linija koda; čineći ga jasnim, i usudio bih se reći, manjim otpornim na propuste. Da ne bude zabune: greši se podjednako u COBOLu kao i u bilo kom drugom modernom jeziku, ali samo odsustvo kompleksnijih koncepata čini jezik otpornijim, te stoga i lakšim za razumevanje i održavanje. Kako se COBOL razvijao, tako je uključivao i složenije koncepte; objektno-orijentisana svojstva stiče, na primer, u izdanju iz 2002. godine.

Danas nam program pisan u COBOLu izgleda rogobatno, čak i na trenutke bolno. Sintaksa je vrlo 'pričljiva', dokumentacija je nepotpuna... Daleko je od toga da je _kul_; popularnost COBOLa je poslednjih 20tak godina na niskom nivou. On ostaje jezik mainframe računara, prosto zatrpan u lavini modernih kompjuterskih jezika i rešenja kojima smo od skora preplavljeni. Fokus razvoja softvera je mahom pomeren na web, oblake; procesorska moć je daleko jača nego ranije; sve to zahteva novije koncepte i iznedrava drugačije programske jezike.

COBOL kao programski jezik i dalje živi. Iako nije postojao kao softver otvorenog koda u 80tim i 90tim, stvari se menjaju, te danas postoji i GNU verzija kompajlera. Postoje okruženja ili dodaci za razvoj COBOLa na svim operativnim sistemima; kao i on-line zajednice koje i dalje neguju veštine razvoja softvera u ovom programskom jeziku.

## Šta raditi sa 200 milijardi linija COBOL koda?

To je upravo pitanje koje muči amerikance.

Korak nazad. Svest o korišćenju zastarelih (_legacy_) rešenja svakako postoji. 92 od 100 najboljih američkih banaka i dalje koriste mainframe računare, od toga 70% njih su Fortune 500 kompanije. Ako se prihvati da je COBOL pregazilo vreme, i da mainframe računare treba zameniti manjim serverima i cloud-računarima, zašto se to onda za sve ovo vreme nije desilo?

Zanimljivo je da u Americi postoji telo koje se bavi i evaluacijom održivosti sistema: _Government Accountability Office_. GAO je u više navrata izveštavao da postoje sistemi u vlasništvu države kojima je preko potreban dobar remont. Odeljenje za edukaciju, na primer, procesira studente na sistemu iz 1973. - koga održava 18 kontraktora i koji zahteva poseban hardver, te ga je teško integrisati sa modernim softverskim rešenjima. GAO smatra COBOL zastarelim programskim jezikom, što oslikava i uporedni problem nalaženja novih programera. Sa ovakvim deficitom radne snage, specijalisti za COBOL postaju preskupi.

Vratimo se na pitanje: zašto onda jednostavno ne napustimo COBOL i prosto migriramo na nove, moderne kompjuterske sisteme i rešenja?

Zato što bi to bilo skupo. Da naglasim: pre-sku-po je. Commonwealth Banka Australije je zamenila svoju COBOL platformu 2012.; za to joj je trebalo pet godina, a poduhvat je koštao 750 miliona dolara. Na drugom mestu, migracija sličnog sistema na Java platformu je trajala četiri godine, i nije još bila završena.

Zaključak se nameće sam: migracija sa stare platforme nije trivijalna niti jeftina stvar. Dok poslovni svet možda i može sebi da to priušti, silne državne institucije (Amerike) to, jednostavno, nisu u stanju. Odeljenje za unutrašnju bezbednost Amerike, na primer, koristi IBM z10 mainframe iz 2008. godine na kome se vrte programi pisani u COBOLu. Administracija socijalne službe Amerike ima u službi 60 miliona linija COBOL koda. Slično stanje je i sa drugim kompjuterskim sistemima državnih institucija Amerike; koriste se sistemi koji su stari i 40-tak godina.

COBOL je tu i, kako izgleda, neće biti zamenjen još dugo vremena.

## Zašto sada?

U kriznim vremenima količina podataka koja se obrađuje je značajno uvećana. Primera radi, usled nadošlog talasa nezaposlenosti, količina prijava u New Yersey-ju se povećala 1600%, gde je 580 hiljada ljudi podnelo odgovarajuće zahteve upravi u kratkom roku.

Stari sistemi jednostavno ne mogu da podnesu ovakvu promenu saobraćaja. Zapravo, to ne može ni jedan sistem ukoliko nije od početka dizajniran na takav način. S druge strane, dizajnirati robusne sisteme je kompleksna stvar sama po sebi, te time sporija i skuplja za razvoj. Nažalost, u svetu koji želi sve za juče, trend kvaliteta razvoja softvara ne raste; no to je tema koja zaslužuje zasebnu razradu.

Ovakvo stanje stvari zahteva da se postojeći sistemi u vanrednim okolnostima korišćenja održavaju: nadgledaju, poprave ili ubrzaju. Manjak programera učinilo je da korisnici pogođeni uvećanim saobraćajem, prvenstveno državne institucije, javno vape za pristupačnim COBOL programerima. Odnedavno se na sve strane postavljaju on-line kursevi COBOLa; u tome prednjači IBM kome je, jasno, stalo da poveća bazu svojih korisnika.

Prethodni put kada je COBOL bio aktuelan je bilo na prelasku u 2000. godinu, povodom tkzv. Y2K greške. Industrija je imala vremena da se spremi za tako nešto, te je čak od 80tih počela da radi na tome. U slučaju iznenadnih kriza, kao što je ova pandemija, nije bilo mesta za pripremu.

## Šta možemo da naučimo?

Ostaje nam da iz svega ovoga nešto i naučimo.

Mi, programeri, bivamo opsednuti đinđuvama softverskih novina. "Programeri su kao deca" - rekao mi je jednom CTO jedne singapurske banke - "jure unaokolo kao sumanuti: vidi ovo, vidi ono - privučeni tehnološkim novotarijama, a vrlo lako se poseku i nešto polome", odgovarajući mi na pitanje o usvajanju novih tehnologija u njihovom bankarskom sistemu. I nije u krivu. Industrija ne mari da li se tvoj kod može napisati na ovaj ili onaj način - nju zanima da li će tvoj kod raditi i posle 20 godina i da li će i tada biti nekog ko će razumeti šta tu piše. Industrija je ta koja daje vrednost dobranom delu koda, na kraju krajeva. Tako, na primer: Java je novi COBOL i - ovo ću priznati samo jednom - Oracle zaista radi dobru stvar: održava čvrstu kompatibilnost sa starijim verzijama i jako oprezno uvodi novine. Prvi ja blatim Javu na sva usta kao najdosadniji moderni jezik na svetu; ali to iz mene govori (dosadni) koder, a ne inženjer.

Zato moramo biti pažljivi - _jako pažljivi_ - sa tehnologijama koje usvajamo i koje postaju standard. Nisam siguran da li je organski pristup i pravi: kada usvajamo nešto samo zato što je popularno. Uzmimo Python na primer. Zamislite koliko bi koštalo industriju da prebaci programe iz verzije 2 u verziju 3, da su izabrale Python kao jezik za svoje kompjuterske sisteme. Ili pak AngularJS, promašeni koncept koji je bačen u korpu. Zato, ponavljam, moramo biti pažljivi sa time šta usvajamo. Nekada _više_ nije i _bolje_.

Možemo još nešto da naučimo iz svega ovoga, a tiče se našeg svakodnevnog rada. Ako ništa drugo, bar da mi, koji razvijamo softver, ne zaboravimo podjednako važne vrednosti svakog kompjuterskog sistema: robusnost i održivost. **Piši kod koji želiš da te nadživi**. S druge strane, u robusnost i kvalitet se mora ulagati. "Što je brzo, to je i kuso", reče stari COBOL programer.

## BONUS: COBOL u praksi

GNU Cobol se na OSX lako instalira: `brew install gnu-cobol`. Kao editor možete koristit Sublime ili VS Code, oba imaju podršku za COBOL; za potonjeg je ona naprednija od prostog prepoznavanja sintakse.

To je to, spremni ste da budete stari.

Hajde da pogledamo kako izgleda jedan COBOL program:

```plaintext
        IDENTIFICATION DIVISION.
        PROGRAM-ID. HELLO.
        DATA DIVISION.
          WORKING-STORAGE SECTION.
          *> 9 — numeric A — alphabetic X — alphanumeric V — decimal S — sign
          01 NUM-VAR PIC S9(3)V9(2).
          01 COUNT1 PIC 9(2) VALUE 0.
          01 NUM PIC 9(9).
          01 TEXT-VAR PIC X(8) VALUE 'OBLAC.RS'.
          01 STR1 PIC X(8).
          01 STR2 PIC X(8).
          01 GROUP-VAR.
            05 BROJ PIC 9(3) VALUE 173.
            05 NAZIV PIC X(15) VALUE 'LALALAND'.
          01 CHECK-VAL PIC 9(9).
            88 PASS VALUES ARE 044 THRU 100.
            88 FAIL VALUES ARE 000 THRU 43.
        PROCEDURE DIVISION.
          DISPLAY 'CIAO COBOL'.
          MOVE 2.1 TO NUM-VAR.
          DISPLAY "NUM VAR : "NUM-VAR.
          DISPLAY "TEXT VAR : "TEXT-VAR.
          DISPLAY "GROUP VAR : "GROUP-VAR.
          COMPUTE NUM = (NUM-VAR * NUM-VAR).
          DISPLAY "MUL : "NUM.

          IF NUM > 3 AND NUM LESS THAN 100 THEN
            DISPLAY "Da!"
          END-IF

          MOVE NUM TO CHECK-VAL
          IF FAIL
            DISPLAY "Ups"
          END-IF

          INSPECT TEXT-VAR TALLYING COUNT1 FOR CHARACTERS.
          DISPLAY "Broji : "COUNT1.
          INSPECT TEXT-VAR REPLACING ALL 'C' BY 'K'.
          UNSTRING TEXT-VAR DELIMITED BY '.'
            INTO STR1, STR2
          END-UNSTRING.
          DISPLAY STR1

          PERFORM FN WITH TEST AFTER UNTIL COUNT1=0.
        STOP RUN.

        FN.
          DISPLAY 'Hi!'.
          SUBTRACT 1 FROM COUNT1.
```

Pre svega, ovo nije greška - prve kolone u programu su rezervisane i ne koriste se prilikom pisanja koda. Sedma kolona je takođe posebna. Kod se piše od osme kolone. Sve se piše velikim slovima, pa je zgodno uključiti Caps-Lock :)

COBOL program je podeljen na celine (`DIVISION`). U prvoj deklarišemo promenljive. Ne postoje unapred definisani tipovi, već se tip podatka definiše odmah pri deklaraciji. Zanimljive su i grupne varijable (liče na strukture), kao i neka vrsta `enum` varijable (`CHECK_VAL`).

U proceduralnom delu se piše program. Gornji radi neke osnovne računske radnje i pitalice. Rad sa stringovima je posebno zametan; potrebno je puno toga napisati za jednostavne manipulacije. Poslednje prikazano je kako se procedura pozova više puta, u petlji.

Ono zašta je COBOL napravljen je i obrada podataka, a to znači rad sa fajlovima. Sam jezik ima ugrađen u sebe rad sa fajlovima i zapisima. Evo kako to izgleda:

```plaintext
       IDENTIFICATION DIVISION.
       PROGRAM-ID. FILES.

       ENVIRONMENT DIVISION.
         INPUT-OUTPUT SECTION.
           FILE-CONTROL.
             SELECT ZAPISI ASSIGN TO 'zapisi.txt'
             ORGANIZATION IS SEQUENTIAL.

       DATA DIVISION.
         FILE SECTION.
           FD ZAPISI.
           01 ZAPISI-STRUCT.
             02 UID PIC 9(6).
             02 NOTE PIC X(30).
             02 ACCOUNT.
               03 AMOUNT PIC 9(6)V9(2).
               03 BALANCE PIC 9(6)V9(2).
             02 ACCOUNT-ID PIC 9(7).
             02 ACCOUNT-OWNER PIC A(50).

         WORKING-STORAGE SECTION.
           01 ZAPISI-RECORD.
             02 UID PIC 9(6) VALUE 123456.
             02 NOTE PIC X(30) VALUE 'TESTIRAM'.
             02 ACCOUNT.
               03 AMOUNT PIC 9(6)V9(2) VALUE 000173.98.
               03 BALANCE PIC 9(6)V9(2) VALUE 000173.12.
             02 ACCOUNT-ID PIC 9(7).
             02 ACCOUNT-OWNER PIC A(50).

       PROCEDURE DIVISION.
         DISPLAY 'WRITING RECORD: 'ZAPISI-RECORD.
         OPEN OUTPUT ZAPISI
           WRITE ZAPISI-STRUCT FROM ZAPISI-RECORD
         CLOSE ZAPISI

       STOP RUN.
```

Gornji program upisuje sadržaj u fajl. Fajlovi sa kojima se barata su obični, struktuirani tekstualni fajlovi; ako ih otvorite garantujem nalet vajba osamdesetih (ako ste ih uopšte doživeli).

Gornji programi se kompajliraju sa `cobc -x <ime>.cob` čime se dobija izvršni program.
