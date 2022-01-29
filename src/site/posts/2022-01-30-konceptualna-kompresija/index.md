---
title: "Konceptualna kompresija"
date: 2022-01-30T01:06:08+00:00
categories:
  - Razvoj
tag:
  - konceptualna kompresija
  - razvoj
  - tehnolgija
  - inženjerstvo
---

Iznova se vraćam na jedno od važnijih inženjerskih pitanja.

Zanimljivo je da pitanje nema konačan odgovor. Divergetno, služi da mu se neprestano vraćamo, a odgovaranjem osmišljavamo, ni manje, ni više, dalji napredak.

<!--more-->

> Šta bi trebalo da znam, a šta da zaboravim?

Svi se slažemo da poznavati i, dalje, razumeti neku oblast, tehnologiju, veštinu predstavlja "dobru stvar"™. Učimo da bi razumeli, a zatim da bi naučeno ispravno primenili.

No, učenje je, suštinski, banalno jednostavna aktivnost. Ne omalovažavam sticanje znanja; ono je jedno od retkih transcedentalnih vrednosti koje ljudsko biće može sebi da priušti tokom života. Ipak, učenje je jednosmeran proces, fokusiran na svojstva i kapacitete pojedinačnog ljudskog uma.

Primena naučenog je vrednost koju delimo drugima: kolegama, klijentima, okolini. Poznavanjem neke veštine i znanja, vredni smo trećoj strani koja nije u mogućnosti da je sama stekne.

Upravo je tu prepreka napretku. Poznavanjem specifičnosti smanjujemo domet primene. Ideja napretka je upravo suprotna: smisao je na što većem dometu primene znanja. A kada nečemu povećate domet, ono mora da postane i konceptualno jednostavno, kako bi se prihvatilo i nesmetano upotrebljavalo.

## Umetnost zaboravljanja

Dostizanje pomenute jednostavnosti je **konceptualna kompresija**. Reč je o 'zaboravljanju' specifičnosti, radi dostizanja jednostavnosti.

Konceptualna kompresija je deo svakodnevice. Okruženi smo, na primer, aparatima koji rade na dugme, u svakakvim uslovima, na svakakve načine. Pri tome nimalo ne marimo kako zaista uređaji rade, a često ni koji je ispravan način korišćenja; prosto rade zadovoljavajuće na bilo koji način se upotrebljavali.

Softversko inženjerstvo takođe ne manjka od konceptualne kompresije. Velika je razlika kako su programi bili stvarani pre samo dvadesetak godina, a kako danas. Nekada smo bili pažljivi sa resursima, jer ih nije bilo u izobilju. To je zahtevalo poznavanje načina kako rade virtualne mašine, kolektori đubreta, kakav je konačni mašinski (bajt)kod. Poznavanje algoritama, kompleksnosti, složenosti izvršavanja programa je imalo daleko više smisla. Dozvoljavali smo razne ustupke, kao što su primitivni tipovi, mutabilnost, `null`, obazrivo korišćenje mreže... Programiranje je zahtevalo znanje iz različitih oblasti i pažljivo pisanje koda.

Danas to više nije slučaj. Sve od navedenog je kompresovano napretkom. Poznavanje algoritama služi samo za [intervjue za posao](https://stopcodinginterviews.com), programe pišemo [bez da mnogo pazimo](https://oblac.rs/stilske-vezbe/), resursa ima na pretek. Brzo možemo da sagradimo aplikaciju koristiće dostupne API-je: ne moramo da uopšte i razumemo kako radi [analiza teksta](https://github.com/igr/parlo) ili [prepoznavanje lica](https://github.com/igr/hey-you), dovoljno je da to primenimo. Kada razmisliš, JavaScript je jedna takva kompresija - prost programski jezik koji svako može da razume bez većeg napora, a koji se naslanja na svima dostupan ekosistem Interneta. Na drugu stranu, programski jezici koji zahtevaju šire poznavanje sintaksnih zavrzlama, kao što je to, paz' sada, Skala, _nisu_ konceptualna kompresija. Programiranje se danas uči iz video tutorijala; svako može da sklepa sebi potreban kod, bilo to u Ekselu ili na nekoj platformi.

Ukratko: moguće je biti produktivan i uraditi dosta bez specijalizovanog znanja.

## Kompresija boli

Pre nego što nastavim: konceptualna kompresija je "dobra stvar"™. Tu nema dvojbe.

Problem, i pitanje kojim se bavim sa početka teksta, je: _šta od postojećih koncepata treba kompresovati_?

Jedna od osobina konceptualne kompresije je to da se odigrava u budućnosti. Sadašnji koncepti kojima se bavimo su ti koje treba pojednostaviti, zarad boljitka koji se _ne vidi sada_, već dolazi. Zato je teško razmišljati na tu temu. Ako se u (ne)jednačinu doda i sve veći broj tehnologija i svakakvih rešenja kojima smo okruženi, budućnost postaje zamagljena, nejasna, nepredvidiva. U takvim vremenskim uslovima se put tek nazire.

Primer: smatram da sve vezano sa implementacijom memorijskih jedinica treba da [postane prošlost](https://oblac.rs/volatile-nije-programiranje/). Programiranje paralelnih radnji ne bi trebalo da se bavi nitima i procesorima. Mrežni interfejsi (REST, GraphQL) bi trebalo da su transparentni. Meta-programiranje bi moglo da dobije više našeg prostora, gde programiramo domenski jezik, u kome tek stvarmo rešenje.

Međutim, mnoge, mnoge koncepte softverskog razvoja ne umem da procenim. Kontraverzna tema je skladištenje podataka: baze i SQL. Baze su danas toliko dobre i brze, da se tek sa pristojno velikom količinom pohranjenog sadržaja javlja potreba za pravilnom upotrebom. Ilustracije radi: poznata firma je tek sa milionskim brojem korisnika došla do momenta kada su se uopšte i primetili efekti loše definisanih indeksa. Dalje, da li je poznavanje SQL danas neophodnost? [Baš ne volim ORM](https://oblac.rs/bas-bas-ne-volim-orm/), no svako malo se zapitam - nije li ORM konceptualna kompresija programiranja baza? Dalje, moderne desktop aplikaciju su sve više pisane multi-platformskim kodom. Moderni editori lepo rade i lepo izgledaju, ali se muče sa fajlovima od dvadesetak megabajta i stotinak hiljada redova. Takvih problema nisam imao pre dvadesetak godina. Da li je u toku kompresija?

Drugi problem konceptualne kompresije je to što pojednostavljanjem nešto gubimo. To je u redu: gubimo _sada_, zarad toga da bude bolje _sutra_. No kako ne znamo šta treba kompresovati, još teže je odlučiti čega se, zapravo odreći.

Konceptualna kompresija je jedna od retkih procesa gde višegodišnje iskustvo i specijalizovano znanje zapravo _smeta_. Naviknuti na jedne obrasce razvoja, teško prihvatamo druge. Zato je i teško odreći se nečega, teško je da budemo objektivni iza iskustva. Ako bi me danas pitao, ne bih odrekao SQL-a; ali jesam zaboravio gomilu specifičnosti SQLa i neke od baza. Da li to iz mene govori samo [matori developer](https://oblac.rs/senor-don-kihot/) koji ne prihvata neminovnost razvoja? Možda nove generacije programera i NE treba da znaju SQL, kao što ne znaju ni različite algoritme za sortiranje, kao što ne pomišljaju na bajtove i bitove?

Konceptualna kompresija boli. Teško je proceniti i uložiti u ispravan pravac napretka. Usled mnoštva novina koje, zapravo, i nisu novine, već komercijalno nametanje sopstvenih rešenja, rizikujemo da propustimo ispravan put.

## Biće...

... šta biti mora. Bar da mislimo o tome.

Idemo dalje.
