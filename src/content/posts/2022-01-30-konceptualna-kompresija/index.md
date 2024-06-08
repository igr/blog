---
title: "Konceptualna kompresija"
date: 2022-01-30T01:06:08+00:00
slug: konceptualna-kompresija
description: >
  Iznova se vraćam na jedno od važnijih inženjerskih pitanja.
  Zanimljivo je da pitanje nema konačan odgovor. Divergetno, služi da mu se neprestano vraćamo, a odgovaranjem osmišljavamo, ni manje, ni više, dalji napredak.
---

Iznova se vraćam na jedno od važnijih inženjerskih pitanja.

Zanimljivo je da pitanje nema konačan odgovor. Divergetno, služi da mu se neprestano vraćamo, a odgovaranjem osmišljavamo, ni manje, ni više, dalji napredak.

> Šta bi trebalo da znam, a šta da zaboravim?

Svi se slažemo da poznavati i razumeti neku oblast, tehnologiju, veštinu predstavlja "dobru stvar"™. Učimo da bi razumeli, a zatim naučeno primenili.

No, učenje je, suštinski, jednostavna (ali zahtevna) aktivnost. Ne omalovažavam sticanje znanja; ono je jedno od retkih transcedentalnih vrednosti koje ljudsko biće može sebi da priušti tokom života. Ipak, učenje je jednosmeran proces, fokusiran na svojstva i kapacitete pojedinačnog ljudskog uma.

Primena naučenog je vrednost koju delimo drugima: kolegama, klijentima, okolini. Poznavanjem neke veštine i znanja, vredni smo trećoj strani koja nije u mogućnosti da je sama stekne.

Upravo je tu prepreka napretku. Poznavanjem specifičnosti smanjujemo domet primene. Ideja napretka je upravo suprotna: fokus je na što većem dometu primene znanja. A kada nečemu povećate domet, ono mora da postane i konceptualno jednostavno, kako bi se prihvatilo i nesmetano upotrebljavalo.

## Umetnost zaboravljanja

Dostizanje pomenute jednostavnosti je **konceptualna kompresija**. Reč je o 'zaboravljanju' specifičnosti, radi dostizanja jednostavnosti.

Konceptualna kompresija je deo svakodnevice. Okruženi smo, na primer, aparatima koji rade na dugme, u svakakvim uslovima, na svakakve načine. Pri tome nimalo ne marimo kako zaista uređaji rade, a često ni koji je ispravan način korišćenja; prosto rade zadovoljavajuće na bilo koji način se upotrebljavali.

Softversko inženjerstvo takođe ne manjka od konceptualne kompresije. Velika je razlika kako su programi bili stvarani pre samo dvadesetak godina, a kako danas. Nekada smo bili pažljivi sa resursima, jer ih nije bilo u izobilju. To je zahtevalo poznavanje načina kako rade virtualne mašine, kolektori đubreta, soketi, kompajleri, kakav je konačni mašinski (bajt)kod. Poznavanje algoritama, kompleksnosti, složenosti izvršavanja programa je imalo daleko više smisla. Dozvoljavali smo razne ustupke, kao što su primitivni tipovi, mutabilnost, `null`, obazrivo korišćenje mreže... Programiranje je zahtevalo znanje iz različitih oblasti i precizan kod.

Danas to više nije slučaj. Sve od navedenog je kompresovano napretkom. Poznavanje algoritama služi samo za [intervjue za posao](https://stopcodinginterviews.com), programe pišemo [bez da mnogo pazimo](https://oblac.rs/stilske-vezbe/), resursa ima na pretek. Brzo možemo da sastavimo aplikaciju koristiće dostupne API-je: ne moramo da uopšte i razumemo kako radi [analiza teksta](https://github.com/igr/parlo) ili [prepoznavanje lica](https://github.com/igr/hey-you), dovoljno je da to primenimo. Programiranje se danas uči iz video tutorijala; svako može da sklepa sebi potreban kod, bilo to u Ekselu ili na nekoj platformi. Kada razmisliš, JavaScript je jedna takva kompresija - prost programski jezik koji svako može da razume bez većeg napora, a koji se naslanja na svima dostupan ekosistem Interneta. Na drugu stranu, programski jezici koji zahtevaju šire poznavanje specifičnih sintaksnih zavrzlama, kao što je to, paz' sada, Skala, nisu konceptualna kompresija. AWS je dvostruki primer: sažima koncepte raznih rešenja i resursa, zbog čega vredi; ali nameće svojstvene specifičnosti upotrebe, zbog čega ne predstavlja napredak.

Ukratko: danas je moguće biti produktivan i uraditi dosta bez specijalizovanog znanja.

## Kompresija boli

Pre nego što nastavim: konceptualna kompresija je "dobra stvar"™. Tu nema dvojbe; čini neophodnu komponentu evolucije.

Problem, i pitanje kojim se bavim sa početka teksta, je: _šta od postojećih koncepata treba kompresovati_?

Jedno od svojstava konceptualnog sažimanja je da je ono primenjivo tek u budućnosti. Aktuelni koncepti kojima se bavimo su ti koje treba pojednostaviti, zarad boljitka koji se _ne vidi odmah_, već tek u vremenu koje dolazi. Zato je teško razmišljati na tu temu. Treba razlučiti šta od postojećeg zaista vredi, da bi ga održavali i ostavili da traje. Ako se u (ne)jednačinu doda i sve veći broj tehnologija i svakakvih rešenja kojima smo okruženi, budućnost postaje zamagljena, nejasna, nepredvidiva. U takvim vremenskim uslovima se put samo nazire.

Primeri: smatram da sve vezano sa implementacijom memorijskih jedinica treba da [postane prošlost](https://oblac.rs/volatile-nije-programiranje/). Programiranje paralelnih radnji ne bi trebalo da se bavi nitima i procesorima. Komunikacijski interfejsi (REST, GraphQL) bi trebalo da su transparentni. Meta-programiranje bi moglo da dobije više prostora; da programiramo domenski jezik, u kome tek stvarmo rešenje. Ako gledam još dalje: programiranje treba da postane low-code, low-intelect, low-skill veština, labavih sintaksnih pravila; gde svaki domen ima svoj tehnički (a ne programerski) jezik kojim se upravlja. Zvanje "programer" kakvog danas poznajemo bi postala specifična veština, kojom bi se retko ko bavio. Izrečeno na drugi način: svi bi postali programeri.

Kontraverzna tema je skladištenje podataka: baze i SQL. Baze su danas toliko dobre i brze, da se tek sa pristojno velikom količinom pohranjenog sadržaja javlja potreba za pravilnom upotrebom. Ilustracije radi: poznata firma je tek sa milionskim brojem korisnika došla do momenta kada su se primetili efekti loše definisanih indeksa. Zanimljivo da to jeste evolucija, disrupcija koncepta: fokus prebačen na koncept "magične kutije" za podatke, a ne na to kako da kutija efikasno obrađuje podatke. Dalje, da li je poznavanje SQL danas neophodnost? [Baš ne volim ORM](https://oblac.rs/bas-bas-ne-volim-orm/), no svako malo se zapitam - nije li ORM konceptualna kompresija programiranja baza? Dalje, moderne desktop aplikaciju su često pisane multi-platformskim kodom. Editori tako lepo izgledaju, ali se muče sa fajlovima od tek dvadesetak megabajta i stotinak hiljada redova. Takvih problema nije bilo pre dvadesetak godina, kada se, apsurdno, vodilo računa o svakom bajtu. Da li je u toku kompresija koncepta?

Drugi problem konceptualne kompresije je to što pojednostavljanjem nešto gubimo. To je u redu: gubimo _sada_, zarad toga da bude bolje _sutra_. No kako ne znamo tačno šta treba sažeti, još teže je odlučiti čega se odreći.

Konceptualna kompresija je jedna od retkih procesa gde višegodišnje iskustvo i specijalizovano znanje zapravo _odmaže_. Naviknuti na jedne obrasce razvoja, teško prihvatamo druge. Teško je napustiti iskustvo nagomilano za ceo jedan radni vek i postići valjanu objektivnost. Ako bi me danas pitali, ne bih odrekao SQL-a; ali jesam zaboravio gomilu specifičnosti upotreba. Da li to iz mene govori samo [matori developer](https://oblac.rs/senor-don-kihot/) koji ne prihvata neminovnost razvoja? Ili sam ležeran sa zaboravljanjem, jer sam sve to nekada znao u prste? Možda nove generacije programera i ne treba da znaju SQL, kao što ne znaju ni različite algoritme za sortiranje, kao što ne pomišljaju na bajtove i bitove?

Na trenutak, degradacija kognitivnih sposobnosti programera deluje zastrašujuće. Važne programe pišu programeri koji imaju značajno manje iskustva nego ranije. Kažem (gutam knedlu, ipak): to je _možda_ okej. Podrazumeva dve stvari: da su koncepti tehonologija toliko sažvakani da je svakome omogućeno da brzo postane produktivan programer. Važnije: oslobađaju se mentalni kapaciteti koji sada mogu biti upotrebljeni za nešto novo, drugo, "dobro"™! Imamo pod prstima tehnološku magiju koja je pre samo dvadesetak godina bila domen fantastike - hajde da je iskoristimo za nešto što nisu samo besmislene video-nadopune ega. Konceptualna kompresija se odigrava pred nama, dužni smo da je razumemo. Zato je svaka edukacija mladih usmerena isključivo na programiranje fundametalno [pogrešna](https://oblac.rs/ne-ucite-decu-programiranju/). Trebamo da razvijamo preostale kapacitete, koji nam se sve više otvaraju, te i da bi se otvarali. No da bi razumeli kuda sve dalje, čini se da je potrebno... baš ono iskustvo koje je istisnuto? Pitanja, pitanja...

I tako ukrug.

Konceptualna kompresija boli. Teško je proceniti i uložiti u pravac vredan napretka. Usled mnoštva tehnoloških novina koje, zapravo, i nisu novine, već komercijalno nametanje rešenja, rizikujemo da propustimo ispravan put.

## Biće...

... šta biti mora. Bar da radimo na tome.

Idemo dalje.
