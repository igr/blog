---
title: "Olako shvaćeni pokloni otvorenog koda"
date: 2020-05-12T01:07:03+00:00
slug: olako-shvaceni-pokloni-otvorenog-koda
description: >
  Naučeni da samo tražimo, ne prepoznajemo kada nam se nešto nudi. Kada uzimamo, zaboravljamo da vratimo.
---

Naučeni da samo tražimo, ne prepoznajemo kada nam se nešto nudi. Kada uzimamo, zaboravljamo da vratimo.

U trenutku kada razmišljam koliko ima smisla i dalje održavati 10+ godina stare projekte, te sam na ivici pomalo (s)umorne odluke da sve to već jednom obrišem sa GitHub-a, izlazi nova verzija IntelliJ IDEA, 2020.1. Donosi i malu novinu - podršku za jedan od frejmworka koji sam pravio. Podrška je tek minimalna, ali je tu.

Nedugo potom, nalazim [članak na inženjerskom blogu Uber-a](https://eng.uber.com/open-source-principles/) koji predstavlja aktivnosti i principe kojih se drže u vezi sa open-source kodom. Među početnim stavkama stoji:

> "Uber first" - Open source activities, especially open sourcing proprietary software, should bring value to Uber.

Jedan od komentara na blogu je kritikovao ovu tačku: iako je pohvalno što kompanija pokazuje ozbiljno zanimanje za open-source, ona ipak stavlja sebe ispred open-source zajednice.

Šta sve ovo ilustruje?

## Otvoreni kod uspeva... ili ne?

Otvoreni kod je lošeg kvaliteta. Eto, izrekao sam to. Da bi kod bio dobar, mora se neprestano pleviti. Ne postoji garant kvaliteta otvorenog koda: kao metrika nam služi broj zvezdica na GitHub-u ili to što ga Velika Firma™ koristi. Svako malo isplivavaju greške: ne tako davno Heartbleed je iskrvario po svim infrastrukturama interneta. Nema ovde mnogo mudrosti, stvari su jednostavne: kvalitet zahteva resurse. Loš kvalitet biva zataškan uspešnim primerima (šta god 'uspešno' značilo). Ova činjenicama me brine: poslednjih godina se pravi drama od open-source; za to vreme količina dostupnog, polu-skuvanog koda eksponencijalno raste. GitHub je nedavno [arhivirao](https://archiveprogram.github.com) (na hiljadu godina!) svoje repozitorijume u cilju očuvanja open-source koda. Kao da će oni naprečac nestati? Kakva je vrednost koda starog 1000 godina? Zašto ne arhiviramo stetoskope ili rezače za olovke?

Otvoreni kod nije napravljen besplatno. Drugim rečima, iza 'uspelih' open-source rešenja (ma šta 'uspešno' značilo), stoje resursi koje je neko na neki način platio. Treba razvejati tu naivnu sliku da na open-source projektima rade ljudi širom sveta, zarad nekakvog sveopšteg boljitka. To nije slučaj. Šta više, ljudi (takvi kakvi smo) retko zapravo i prepoznaju nove ideje i inovacije. Svojevremeno sam bio izvrnut ismevanju na nekom forumu, jer sam koristio anotacije za uvezivanje komponenti u DI kontejneru (prvi takav, po mom saznanju) - Spring je u to vreme uveliko radio isključivo sa XML-om. Par godina kasnije, niko više nije koristio XML. Tja.

Projekat otvorenog koda je projekat kao i svaki drugi. Nema nikavu početnu prednost. Kod je samo jedna od mnogih komponenti projekta. Projekat neće biti uspešniji ukoliko je otvorenog koda, sam od sebe. Tako gledano, nejasni su strahovi kompanija koje odlučuju da NE otvore kod. Jedan od najčešćih razloga se navodi strah od konkurencije. Zaboravljaju da od koda do uspešnog proizvoda ima još o-la-la koraka.

Otvoreni kod je marketing. Velika Firma™ može sebi da priušti da otvori - ono što poželi. To dobro zvuči i daleko odzvanja. No licemerno je tvrditi da podržavaš otvoreni kod, dok je zatvoren proizvod koji prodaješ.

Besplatna dostupnost open-source artefakta je večiti kamen spoticanja - ili kamen mudrosti, neizostavna nota svake OS diskusije. Mora se napraviti razlika između _besplatnog_ i _otvorenog_. Prvo je stav, drugo je način distribucije. Besplatna dostupnost artefakta na svojevrsan način izjeda sebe samu. Svaki put kada ga upotrebimo besplatno, a da na neki način ne (uz)vratimo, činimo težim da artefakt i ostane besplatan. Ponoviću: svaka upotreba open-source biblioteke u tvom projektu razjeda temelje open-source ideje.

Pazi sada: besplatan otvoreni kod je besplatan samo ukoliko tvoje vreme ne vredi ništa.

Razbacane, ali ne i olake, misli nad kojima se treba otvoreno zamisliti.

## Grozni ja

Ukoliko sada prekinete sa čitanjem, ostaće utisak da ne gledam blagonaklono na otvoreni kod.

`3.3` miliona linija otvorenog koda koje sam napisao govori drugačije.

Open-source mora da ostane i opstane.

Open-source nije jednosmerna ideja. Nije puko davanje. Svako korišćenje otvorenog koda ~~treba~~ mora se platiti ili uzvratiti. To važi kako za firme, tako i za pojedince. Zato je onaj komentar na Uber blogu sa početka u isto vreme i na mestu i nije. Uber vraća nazad. Da li autor komentara to radi? S druge strane, zašto korporacija odlučuje šta je vredno održavanja?

Mora se naći održivi i razumni način razvoja i održavanja otvorenog koda. Mora se povećati kvalitet otvorenog koda. Moramo negovati vrednosti postojećeg koda. Moramo razviti profesionalnu hrabrost da koristimo i nepopularan kod. Danas nemam odgovor "kako" sve to uraditi. No znam da moramo da promenimo stav po tom pitanju. Sa promenom namere, bar dajemo šansu da dođemo do pravog rešenja.

Zato: šta ste vi uradili za open-source?
