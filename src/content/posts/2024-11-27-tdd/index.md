---
title: "Dosta s TDD!"
date: 2024-11-27T01:06:08+00:00
slug: dosta-s-tdd
description: Aman, bre, više... bre. Dosta.
---

Aman, bre, više... bre.

Da krenemo od definicije. Već nailazimo na prepreku: iz nekog razloga softverski inženjerci i programatori ne mogu da se dogovore šta je tačno TDD, pa je neophodno da nas čika Kent nanovo podseća, uz blagonaklon za svaku novu kupljenu mu knjigu. No ne smeta to što imamo različite interpretacija - naprotiv, to je sjajna stvar. Problem je što nemamo mehanizam da ih katalogizujemo: ne treba nam jedna, samo jedna sveta definicija koja će nas raz-produhoviti; već koliko god da ih je, sve dok ih razumemo i razlikujemo.

## TDD: Emerging Architectures

`[TDD-MRGA]` TDD je takva praksa razvoja softvera, u kojoj se rešenja i arhitektura pomaljaju iz sitnih, što sitnijih koraka usložnjava. Kako su koraci usložnjavanja sitni, moguće ih je sprovoditi u kratkim i brzim ciklusima koji započinju testovima, dok se pomenuto usložnjavanje odigrava tokom refaktorisanja. Teško je razumeti koliki je fokus na "sitnim" koracima dok se zaista to ne iskusi.

Najsmelija definicija TDD, koju upravo zbog toga i biram, je i... bajkovita. Softver se ne gradi fokusom na prvi sledeći mikro-korak: tako se dolazi samo do prvog lokalnog maksimuma funkcije, a nikako da konačnog maksimuma u kome je softver kompletiran. Da citiram teču Boba: "Horse shit." Primetio sam da dotični poseže za psovkama kada bude priteran u intelektualni ćošak, kao što je u ovom slučaju bila diskusija na temu TDD sa vanrednim Coplienom. Tečo Bob ostaje uporan da nosi zelenu traku oko ruke i insistira da je TDD preduslov za profesionalni razvoj u 2007. godini, u kojoj je, verovatno, zauvek i ostao. Dakle, `[TDD-MRG]` ne uspeva da dobaci dalje od simpatične ideje; mesto joj je u arhivama, a ne glavama.

## TDD: No Production Code Without Test First

`[TDD-TPC]` TDD je takva praksa razvoja softvera, tokom koje pre nego što se napiše bilo kakav novi produkcioni kod, prvo napiše padajući test. Da dodamo ulje na vatru, stric Kent tvrdi da on to ništa nije izmislio, već je ponovo otkrio dobre prakse iz 50-tih i 60-tih; te se kao jedan od izvora pominje i Dijsktra. Svaki put kada čujem narativ o "sveznajućoj prošlosti o kojoj ne znamo ama baš ništa i može da posluži kao izvrsan izgovor za sve", načuljim uši.

U ovakvoj postavi, `[TDD-TPC]`, sada manje plemenit, predstavlja nekakavu _rutinu_ koje bi trebalo da se pridržavamo; ne više kako bi došli do rezultata, već do boljeg i tačnijeg koda.

Hajdemo prvo od činjenica. Od nekoliko istraživanja i radova koja su sprovedena na temu vrednosti primene TDD rutine na projektima, ni jedan ne nalazi da se kvalitet softvera bilo kako poboljšao. Da ponovim: TDD rutina nema ama baš nikakvog efekta na kvalitet softvera. No okej, softversko inženjerstvo nije grana u kojoj se cene istraživanja i slični radovi; pre je važnije izmisliti kakav temporalni programski jezik, pa da sve bude gotovo juče dok se program piše sutra. Agilno, kako drugačije.

TDD rutina bi imala smisla kada bi postojao samo jedan način razvoja i testiranja softvera - što je teško čak i da formulišem i zamislim kako bi to izgledalo. Drugim rečima, softver nije samo direktno pisanje produkcionog koda. Ne, pisanje softvera više podseća na gradnju kula u pesku, gde svako malo moraš da popraviš strane, te probaš da dodaš zidove, radiš brzo da voda ne odnese, ili pesak se ne osuši, do prvog dejlija na kome talas pogrešnih zahteva ne poklopi sve za sobom. Redosled pisanja unit testova zaista nije važan. Premisa: "kako inače znaš da kod radi to što treba da radi?" nigde ne insistira na bilo kakvoj rutini. Da, pisaćemo testove dok radimo na programu. Da, postoje slučajevi kada je korisno imati ih pre izmena. Da, razmišljaćemo glavom. Da, nećemo da idolizujemo jedno, ah to, jedno, pravilo, koje će nas učiniti mega-epskim-zmaj-programerima.

Ovo nije rekla moja malenkost, već striko Kent. U intervjuu iz 2019. Kent priznaje da je prestao da se pridržava striktnih TDD rutina. Zanimljiva je opaska da postoji vreme polu-raspada programske linije - ako zanemarimo nepotrebnu pseudo-naučnu metaforu za opis vreme trajanja linije koda. Dakle, ako pišemo linije kojima isprobavamo, modeliramo, razmišljamo... takve linije koda nemaju dugačak vek i bivaju brzo zamenjene ili promenjene. Njima ne treba teret TDD rutine. Jedino pravilo koje imamo je: razmišljaj. Ne kažem ja, već Kent. A i IBM.

## TDD: istorija 1

Prva TDD referenca koja se pominje je svemirski program Mercury, 1959-1963. Programi su se tada pisali (bušili) na tkzv. "punch" karticama, koje su se, potom, pohranljivale u računar. Jerry Weinberg i njegov tim su radili na softverskom projektu i, po njegovim rečima, trudili su se da pišu testove ranije, kako bi redukovali ciklus: kodiranje-testiranje-ispravka, koji je u to vreme bio skup.

Za prodavca usisivača, đinđuva i TDD-a, ovo je dovoljna potvrda, konačni dokaz. Zanemarićemo to da se ovde rešava jedan skupi, manuelni proces, kakav više ne postoji. Zanemarićemo i to da je Jerry Wenberg, u istom mejlu svega par redova kasnije rekao da je zasluga za visoki stepen ispravnosti softvera (95%) to da je rađen pair-programming, kao i code i test reviews. Najveći problem, svojstven za to doba, je bio prebacivanje 6 miliona ručno pisanih kartica u pomenute punch kartice. Drugi problem, po njegovim rečima, je nepostojanje jednog izvora istine; problem sa kojim se i dalje svakodnevno suočavamo. Šta, dakle, zaključujemo: single-source-of-truth, pair programming, code reviews i testiranje koda. To je, već, nešto što može biti celokupna rutina; fokus samo na testove je odmahivanje rukom koje se može jedino opravdati nezrelošću.

## TDD: istorija 2

Ma šta tu prodaješ maglu, Oblače, evo Dijsktra je lepo rekao, citiram: "the programmer should let correctness proof and program grow hand in hand." Ako ovo nije ultimativni dokaz da je TDD rutina, tj. obavezan test pre produkcijskog koda, obavezan deo softverskog razvoja, onda nemaš pojma, Oblače.

Kada prodaješ usisivače, đinđuve i TDD, siguran sam da negde u novčaniku držiš ovaj citat. Ej, Dijkstra je to rekao, _microfoon laten vallen_!

Hajde da ostavimo po strani taj usivač i pročitamo "The Humble Programmer" (EWD340), rad iz koga je pomenuti citat. Dijkstra se bavi kompleksnošću razvoja softvera, proces tokom kojeg moramo prihvatiti bolnu činjenicu našeg intelektualnog limita. Navodi različite odgovore kako bi se ovaj proces kako-tako mogao savladati: od jednostavnosti u softverskom dizajnu, do negovanja kolaboracije. Od oko 200+ rečenica koliko ih je u radu, Dijkstra se u svega par bavi testovima kao jednim od potrebnih alata, naglašavajući upotrebu testova _tokom_ razvoja, bez ikakvog osvrta na kakavu TDD rutinu o kojoj pričamo. Da, trebamo testove. Ne, ne trebamo magičnu rutinu. Da, treba da razmišljamo o testovima.

## Šta preostane?

Softversko inženjerstvo nije kuvanje čorbe po receptu: dve kašike SOLIDa, kuvaj na TDD vatri, u Heksagonalnoj šerpi.

Jasno je da želimo da imamo pravila igre: da bi prestali da razmišljamo o "kako" i fokusiramo se na kod-za-juče. Nemam dobre vesti: "kako" pravila ne postoje.
