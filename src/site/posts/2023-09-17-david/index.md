---
title: "U čemu greši Dejvid H. Hanson"
date: 2023-09-17T07:07:07+00:00
categories:
  - Razvoj
tag:
  - razvoj
---

Nedavno je Dejvid H. Hanson, ko-osnivač kompanije 37signal, odlučio da iz projekta uklone TypeScript u koristi JavaScripta.

<!--more-->

Nije da me nešto posebno zanima čime se dotični bavi; tu i tamo pročitam njegovu objavu. Dejvid jasno i, kako se čini, transparentno deli razmišljanja, tehnološka rešenja koja su upotrebili i odluke koje su sproveli. Iskreno, bilo bi sjajno kada bi imali više sličnog sadržaja: uvide u skorašnje probleme sa kojima se timovi suočavaju i donešene odluke, pa makar još i ne bile potvrđene u produkciji. Lako je deliti kada sve jednom počne da radi kako treba :)

Igrom slučaja, do pomenute odluke o odbacivanju TypeScripta sam došao putem YouTube podkasta koji se bavi ovom temom. Pomislio sam da će to biti jedno kratko konzumiranje tokom vožnje liftom; međutim, sve šta je Dejvid govorio me je teralo da slušam dalje - i to ne iz dobrog razloga.

Dejvid je, naravno, slobodan da radi kako mu se prohte. Iz nekog razloga njihova odluka je izazvala veću reakciju nego što bi očekivali. Tu je loptica na našoj strani - programeri su zaljubljeni u alatke, i, kako ispada, spremni da troše vreme i energiju na agresivno ubeđivanje "svih ostalih" da je baš njihova, jedina, dragocena alatka najbolja. Najdalje koliko se time može dobaciti je da postaneš Golum; to je sve.

Da se vratimo na sadržaj podkasta. Dejvid:

+ _ne voli_ da radi sa tipovima, _voli_ dinamičke jezike kao što su Ruby i JavaScript. Ono šta voli je "sloboda" koju mu ti jezici pružaju.
+ smatra da je mala razlika između statičkih/dinamičkih jezika. Programeri godinama diskutuju šta je bolje i dalje ne postoji koncenzus.
+ naglašava da je u pitanju njegov/njihov izbor, kao i za slične pređašnje "kontraverzne" odluke. Njihov posao, njihova stvar. Tako je i u drugim profesijama (kuvanje). Tako je i sa navijanjem za neki sportski tim.
+ smatra da je važno uživanje u pisanju koda; jer ako ne uživaš u nečemu, treba ga odbaciti.
+ bilo bi dosadno kada bi svi programirali na isti način. Ne postoji diverzitet, uzbudljivost. Japan je divno drugačiji, ali se Dejvid ipak vraća u US.
+ daje ceo projekat za dž, jer je biblioteka otvorenog koda; neki ne prepoznaju vrednost i bune se, iako je poklon.

Zvuči razumno?

## Prvo, OpenSource

OpenSource nije samo otvoreni kod. Svakako nije nikakav poklon - takva naracija je pogrešna. Svako korišćenje je vezivanje. To je OK, ali hajde da batalimo nepotrebnu romantiku.

Dalje, nije dovoljno da OpenSource bude samo otvoreni kod. Treba nam još atributa. Da li je to interni projekat koji delimo: ti dobijaš rešenje, mi dobijamo tvoje vreme, korišćenje, testiranje; nemaš udela u odlučivanju kuda projekat ide? Ili zaista rešavamo nekakav biznis problem, na najbolji način zarad većine? Kako znamo da je bolje? Ili samo otvaramo kod radi transparentnosti? Koja su nam načela projekta?

Otvoreni kod nije besplatan. Neko uvek ulaže vreme u njega.

Ovde bih da stanem; tema je daleko složenija od onoga što Dejvid naivno (i pogrešno) saopštava.

## Drugo, tipovi

Da bih podjednostavio pojmove, razmišljam na sledeći način:

+ u statičnim jezicima, _izrazi_ imaju tip. Postoje pravila za određivanje tipa (ili skupa tipova) svakog izraza. Ukoliko dođe do neslaganja tipova, program se smatra neispravnim. U nekim jezicima (Haskell) postoje načini da se zaključi o tipovima izraza bez potrebe da se oni eksplicitno navode, što rezultuje "prijatnijim" kodom.
+ u dinamičkim jezicima, _vrednosti_ imaju tip. Tip je definisan tokom podataka kroz program dok se izvršava. Svaka vrednost može da bude bilo kojeg tipa.

Da li bi voleo da budeš siguran u ishod `snežana.jede(jabuku)`?

Da bude sasvim jasno: nema dvojbe šta je kvalitetnije. Statički jezici nude proveru ispravnosti koda prilikom kompajliranja. Bukvalno svaki put kada otkucaš bilo šta u svom IDE, tipovi bivaju provereni.

_To_ je, već, poklon.

Korišćenje bilo čega drugog je samo prečica. One su takođe OK, dok god ih razumemo, svesni smo posledica i nije nam previše stalo da li će Snežana zagristi otrovnu jabuku.

## Treće, uživanje

To šta voliš ne mora da je ispravno. To što voliš je prolazno. Ne možeš znati o stvarima koje ne znaš. Uživanje se uči, kao i sve drugo.

Nauka je precizna. Možeš da je voliš ili mrziš, ali 1 + 1 je 2, svetlost je talas/čestica, a Zemlja ravna.

Tehnologija nije tu da nekoga zabavi. Tehnologija je tu da bude primenjena nauka u službi čoveka, ma koliko teško to bilo za ostvariti. U Svemir letimo zato što je teško. Umetnost konzumiramo bez da žvaćemo slatkiše. Programiramo da bi bilo ispravno, a ne šareno.

Kada sam prvi put radio sa Skalom, bolelo je. Psovao sam, udario kuče koje nemam, razbio skupocenu vazu sa ostrva Murano koju nikada nisam kupio, dramio i kukao na sav glas. Međutim, to je deo puta na kome te čeka ishod: preciznost, ispravnost, jasnoća. Nisam vanredno pametan pa da ne budem ponizan pred ovakvim darovima.

## Ili si deo problema, ili si deo rešenja

Nije ovo osuda odluke koju je dotični sproveo u delo. Razumljivo je da ima problema sa TypeScriptom; od BabeSkripta ne možeš napraviti devojku. Slobodan je da čini kako mu se prohte.

Ovo je osuda nedostatku **tehnološke etike** koja bi naša struka trebalo da ima: neznanje se ne može pravdati ličnim preferencama.

Drug Dejvid ne bi trebalo da se bavi javnim traženjem izgovora za svoje odluke. Dosta je bilo priznati: "mi ne znamo za bolje." I to bi bilo sasvim dovoljno, taman za jednu vožnju liftom.
