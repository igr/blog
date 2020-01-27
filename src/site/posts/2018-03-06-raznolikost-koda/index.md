---
title: Raznolikost koda
date: 2018-03-06T10:33:22+00:00
slug: raznolikost-koda
categories:
  - Razvoj
tag:
  - kvalitet
  - mikroservisi
  - različitost
  - razvoj
---

Raznovrsnost je popularna tema. Na sve strane se priča o razumevanju, poštovanju i dopuštanju razlika u svim sferama. Kritika nije zaobišla ni IT industriju, tradicionalno prihvaćenu kao muški posao. Ilustracija: tokom organizovanja [konferencije](http://heapcon.io) nam je nemalo puta zanemareno što nemamo veći broj ženskih predavača, kao da je to nešto na šta možemo da utičemo. Dakle, napred raznolikost!

<!--more-->

Zašto smo onda toliko isključivi kada je u pitanju kod?

## Svi kao jedan

Kratak rez. Neodređeno vreme dana. Tišinu narušava zvuk rada na tastaturi i šum sistema za ventilaciju. Redovi programera sedi za jednoličnim stolovima i proizvode kod, najbolje što umeju. Kod se komituje, testira i šalje kao _pull request_. Svi završavaju na jednom mestu, kod CTO-a firme. On je iskodirao prve verzije softvera na kome sada radi 50-tak ljudi; njegova mora da se poštuje. Nebrojeno puta je odbio _pull request_ samo zato što nije propušten kroz poseban formater koda, napravljen prema njegovim zahtevima - jer postojeći formateri nisu dovoljno dobri za njega. Metode i polja moraju biti sortirani po abecednom redu i nikako drugačije. Svuda se primenjuju glomazni obrasci za mikro-optimizacije, iako često nisu potrebne. Nebitno je koliko metoda ima u klasi ukoliko se tiču istog modela. Dozvoljena je bizinis logika u JSP, sve dok se importi sortiraju na poseban način. Pisanje komentara je strogo zabranjeno. Takođe se dešava da CTO tokom revizije izmeni kod da bi bio "u njegovom stilu" ne stižući da se udubi u samu logiku koda. Rezultat revizije koji završi na _master_ grani zato ponekad ne radi ispravno i ono što je programer prvobitno osmislio. Pošto je broj programera veliki, zapošljava se čovek čiji je jedini zadatak da pregleda kod pre CTO-a (moguće zahvaljujuće različitim vremenskim zonama) i da sredi što više stvari koje ispadaju iz šablona. "Njemu se to ne bi svidelo" je komentar kojim novi revizor vraća _pull request_ programerima na doradu. _Jednoobrazni kod_ je postao prećutna mantra cele firme.

Neverovatno, zar ne?

Pomenuti CTO je ponosan na to što je postigao. Smatra "učenjem drugih" to što pišu kod na isti način kao i on. S druge strane, nema nikakvog razumnog opravdanja ni merila za ovakvu pedantnost. Proizvod nije nimalo bolji, šta više. Timovi nisu efikasni. Broj grešaka se ne umanjuje. Iskustvo razvoja nije na zavidnom nivou.

No nije to ono što želim da istaknem.

_Učauravanje_. Ovakav pristup je doveo, slobodno mogu da to kažem, do jednoobraznog načina razmišljanja. Programeri bivaju asimilovani i vremenom ideje, način razmišljanja i programiranja počinju da liče na jedno(g). I biva sve teže bilo šta promeniti. Jer nema upliva novih, svežih, _drugačijih_ ideja. Nema diskusije, nema zdravih konflikta. Nema primene poznatih obrazaca i rešenja ukoliko CTO to ne odobri. Nema _leadershipa_. Jer jednoobraznost je _zarazna_! Na projektima koji nisu direktno pod kontrolom ovog CTO-a, vođe tima se ponašaju na identičan način: policijski precizno proveravaju svaki komit i mere svaku odluku, zanemarujući _vrednost_ koju proizvod treba da donese. Takav jedan jednoobrazni _mindset_ na pomenutom projektu košta firmu 300 000 $ godišnje (ugrubo, slobodna procena) i svi su u redu s time, jer, hej, kod je baš sjajno formatiran.

"Klonirani razvoj" je kako nazivam ovakav razvojni sistem.

## Omogućiti diverzitet

Prihvatamo da se razlikujemo, ali kao da nam nije jasno da svako drugačije piše kod. Da se razumemo: ne pričamo ovde o arhitekturi i okvirima koda, niti o programerskim obrascima i "lošim mirisima" u kodu. Kada je kod nekvalitetan, treba ga menjati! Ovde pričam o onom svakodnevnom kodu, koji se inkrementalno dodaje na postojeći; pričam o ispravkama grešaka ili promenama; koji su svi zajedno na istom nivou kvaliteta kao postojeći kod. Ponavljam: ne mislim da treba dozvoliti haos da svako piše kako mu naiđe. Već da treba da evoluiramo i prihvatimo različita rešenja ukoliko ne umanjuju vrednost projekta. Mi programeri često ne vidimo dalje od sorsa, i sve merimo samo kroz njega. A to često nije pravi (niti jedini) aršin.

Čak i najjednoobrazniji (kakva reč!) kod posle nekog vremena gubi na _razumevanju_ - što je upravo ono protiv čega se jednoobraznost navodno bori. Drugim rečima: kod neće biti značajno razumljiviji samo zato što je formalno jednoobrazan. O čitljivosti koda nekom drugom prilikom.

Interesantno je da u vezi sa slobodom razvoja pronalazim vrednost u, ni manje ni više, mikroservisima! Kako bi razvoj mikroservisa trebalo da bude izolovan, eto divnog načina da se bar mikroservisnom timu prepusti razvoj, arhitektura, čak i izbor tehnologije. Sve što spoljni svet zanima je API, tu su određeni parametri performansi i ponašanja koje mora da obezbedi. Ostalo postaje nevažno: ako kod poštuje granice, imaš potpunu slobodu da napraviš stvari na najbolji način.

Monolitna struktura dozvoljava slično ukoliko je modularna. Nema možda toliko mogućnosti za različite tehnologije i arhitekturu; no to i dalje ne umanjuje mogućnost davanja slobode izradi modula.

## Kazualnost diverziteta

Šta bi bila posledica prihvatanja različitosti razvoja?

Sloboda razvoja nameće odgovornost za kod. Odgovornost implicira veću angažovanost (deo je i usavršavanje). Angažovanost je na korak od proaktivnosti. Ostvarenje proaktivnosti rezultuje poverenjem. Koje dozvoljava slobodu razvoja.

Krug. Pozitivna sprega.
