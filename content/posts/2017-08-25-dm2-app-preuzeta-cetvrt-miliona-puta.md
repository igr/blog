---
title: 'DM2 - app preuzeta četvrt miliona puta'
date: 2017-08-25T09:53:22+00:00
slug: dm2-app-preuzeta-cetvrt-miliona-puta
categories:
  - Prikaz
tags:
  - alat
  - open-source
  - windows
---

Bilo je vreme kada sam prilično vladao Windows platformom i bio upućen u mnoge detalje i specifičnosti operativnog sistema (ko se još seća [BOZOSLIVEHERE](https://blogs.msdn.microsoft.com/oldnewthing/20031015-00/?p=42163)?). U to doba sam pravio male Windows aplikacije u čistom C-u (ponekad i u asembleru). Jedna od tih aplikacija je i **DM2** (_DialogMate2_). Reč je o miksu fukncionalnosti (za šta sam izgleda [talentovan](http://jodd.org)🙂 koje se najviše tiču upravljana prozorima aplikacija, prioritetom procesa, unapređenjem dijaloga za otvaranje i snimanje fajlova itd.; a kako je program bio proširiv _pluginovima_, mogao je, na kraju, da radi svašta nešto. Funkcionalnost na koju sam ponosan je tkzv. _floating windows_, jedinstveni način minimizacije prozora u male, transparentne ikone koje se slobodno razmeštaju po ekranu; što je, bar meni, značajno lakše za svakodnevni rad nego minimizacija u taskbar. Zanimljivo je da je ovaj koncept prvi put viđen u **DM2** i nikada posle.

Iako se aplikacija odavno ne razvija, dobijam informacije da se i dalje koristi; nedavno je brojka preuzimanja prešla vrednost od 250.000. Priznajem da sam potpuno zaboravio na nju i da nije bilo nedavnog neobično srdačnog pisma jednog od korisnika tako bi se i nastavilo. To me je sve pokrenulo da prebacim sors na [Github](https://github.com/igr/dm2) u nadi da će se naći neko bi nastavio razvoj, ali i da napišem ovih par linija.

> **DM2** is my favorite utility among all because it offers a massive set of features... Despite not being updated from early 2007, I still cant do without... Highly recommended for any user who want to put some order on taskbar.

## SourceForge

U to doba nije bilo puno izbora gde postaviti open-source projekat. [SF](http://sourceforge.net) je bio gotovo jedino mesto za to i svi su ga koristili. Ako želite da znate kako je SF izgledao nekada, dosta je da ga posetite danas - malo šta se izmenilo. Drugim rečima, SF je bio i ostao jako neudoban za razvoj projekata. No, od negde je trebalo da se počne.

## Prvi korisnici

Ne sećam se tačno kako sam došao do prvih korisnika. Da budem iskren, aplikaciju sam pravio za sebe, te nisam mnogo mario da li je drugi korsite. Objavio sam je na par popularnih mesta koji su objavljivali Windows _freeware_ i portabilne kolekcije aplikacija i to je bilo sve. Izgleda da je **DM2** zapao za oko i na par mesta je izašao pozitivan prikaz programa, što je uzrokovalo hiljade preuzimanja mesečno.

## Flyfancy

Zanimljivo je kako _open-source_ koncept može da zavara: čini vam se da kada objavite nešto pod OS licencom to znači da će se naći mnogo onih koji bi se aktivno bavili projektom i pomagali vam. Nažalost, ovo se retko dešava; _open-source_ je zapravo drugi naziv za samotne noći provedene sa računarom:) U slučaju **DM2** je bilo korisnika koji su slali manje ispravke, ali je većina razvoja bila na meni. Sve dok se nije pojavio **flyfancy**, čovek za koga nikada nisam saznao ko je i šta je i čime se bavi; sem da je iz Kine. On je uskočio u projekat i značajno ga unapredio, toliko da ga danas smatram ko-autorom, iako je došao u poslednjoj četvrtini.

Raditi sa kineskim programerima zahteva izvesnu dozu... imaginacije 🙂 Ako ne vladaju engleskim jezikom kako treba, ponekada bude teško protumačiti “šta je pisac hteo da kaže”. Sva sreća, sa kodom nije bilo takvih prepreka, pa smo lepo gradili našu aplikaciju. Negde 2007. godine smo doživeli bum od 10.000 preuzimanja, što je bilo lepo videti.

## Klon

**DM2** je objavljen pod GPL licencom. To nije smetalo jednom drugom kinezu da napravi _identičan_ klon programa, nazove ga drugačije i da na vrlo mudar način traži novac. Naime, GPL licenca dozvoljava izmene programa, sve dok su one jasno označene; a rezultat takođe mora biti objavljen pod istom licencom. Kada sam saznao za klon, potražio sam pomoć iz GNU centra Amerike; naravno, u Srbiji (ili kako-nam-se-već-tada-zvala-država) nisu postojali zakoni kojim bi nešto mogao da preduzmem; a kako zapravo nisam mario rešio sam da kontaktiram stvaraoca klona i ukažem mu da je prekršio licencu. Nisam očekivao odgovor, ali se kinez javio i rekao da, zapravo, ne krši licencu, jer: 1) sve izmene je dokumentovao i objavio pod GPL kodom, a 2) to što mi je izgledalo da traži novac za program, u stvari je bilo traženje naplate za podršku (šta god to značilo); vešto napisane na takav način da se to ne razume odmah. Šta više, on je identičnu stvar uradio sa ostalim popularnim open-source i besplatnim programima, i priznao da na taj način pokušava da zaradi. Na to mi nije ostalo ništa drugo do da slegnem ramenima i poželim mu sreću.

## Svet Kompjutera

Jedina stvar koja me je pogodila je bila kada je časopis [Svet Kompjutera](http://www.sk.rs/) objavio mali prikaz upravo gore pomenutog klona **DM2**. Prilično slepo (i naivno) verujem da bi mi sami trebalo da podržavano sve što nastaje lokalno, a ima nekog smisla. Pisao sam im u nadi da će ispraviti grešku u sledećem broju, bar nekom fusnotom, čime bi, eto, ukazali na program nastao na našim prostorima. Do toga nikada nije došlo. Tja.

## I Na Kraju, Kraj

Kako su paralelno rasla moja interesovanja za druge oblasti softverskog inženjerstva, rad na **DM2** se usporio i u jednom trenutku je potpuno obustavljen. No, **DM2** je nastavio da živi takav, kakav je; i čak se i dan-danas, toliko godina kasnije, preuzima i koristi. Ja odavno ne koristim Windows platformu tako da nemam ni načina da nastavim bilo kakav razvoj. Ko zna, možda će sa prebacivanjem na Github doći do neke promene.

Hvala **DM2**, bilo je zabavno.