---
title: "Varljivo leto '68"
date: 2021-06-08T01:06:08+00:00
categories:
  - Razvoj
tag:
  - razvoj
---

O ovome ne učimo u školama.

<!--more-->

Šezdesetih godina prošlog veka, svet softverskih inženjera je doživeo "softversku krizu" (termin koji je tada skovan): inženjeri nisu više bili u mogućnosti da proizvode softver koji se od njih tražio. Cena hardvera (računarskih mejnfrejmova generalne namene) je drastično opala; dok je cena izrade softvera vrtoglavo rasla.

Dijkstra je ukazao na izvor problema: "Programiranje je bila veština koja se razvijala intuitivno. Do 1968. je postalo jasno da takve prakse nisu adekvatne. Osmišljen je novi stil dizajna po kome se program i njegova ispravnost razvijaju paralelno. To je bio značajan korak napred."

Kompleksnost projekata (biznisa) je rasla, a softverski razvoj to nije mogao da isprati. Identifikovani su sledeći problemi:

+ projekti su probijali budžete i vremenske rokove,
+ softver je bio neefikasan, slabog kvaliteta, a često nije odgovarao zahtevima,
+ projekte je bilo teško pratiti, a kod teško održavati.

Zvuči poznato?

Održane su i dve varljive NATO konferencije softverskih inženjera ('68. i '69. godine). Odatle su adresirani problemi i pokrenuti neki procesi za njihovo prevazilaženje. Zanimljivo je (i važno) o čemu se tada [diskutovalo](https://oblac.rs/zasto-pristajemo-na-los-softver/)... Nisam siguran u rezultat koji nam je ostavljen: da li postoji, te da li smo ga razumeli.

Kriza je jaka reč. Poziva na akciju, hitno rešavanje. Ne mogu da se ne zapitam: jesmo li prevazišli krizu šezdesetih?

Danas je kôd svuda oko nas; utoliko je važnije da znamo šta se dešava(lo) sa razvojem softvera. Kako i sam učestvujem u manufakturi softverskog koda već dugo, pomalo sumorno zaključujem da ne vidim značajnu razliku od pre 10 ili 20 godina. Da, računari su danas daleko moćniji, postoji zilion alata, postoji mreža svih mreža i uređaja, no i dalje ne doživljavam da je naš svakodnevni posao produktivniji, kao ni da proizveden kôd lakše doseže željenu vrednost. Uočavam upravo suprotno; više nego što bih to želeo da priznam.

## CHAOS

> Oni koji ne pamte prošlost osuđeni su da je ponavljaju.

Način pamćenja prošlosti jeste i: _analiza_.

Devedestih godina prošlog veka, desetak godina stara istraživačko-savetodavna internacionalna grupa The Standish Group, objavljuje prvi CHAOS izveštaj - koji se bavi presekom stanja softverske industrije u privatnom i javnom sektoru. Izveštaji se obnavljaju svakih par godina.

Izveštaji za devedesete nisu sjajni: tek nekih `16%` projekata je završeno uspešno (prema značenju koji grupa definiše). Vremenom, broj uspešnih softverskih projekata raste, da bi se u poslednjoj dekadi duplirao: `30+%`. Međutim, od pre par godina, CHAOS izveštaj uvodi novu metriku za uspešnost projekata - uzima u obzir kombinaciju zadovoljstva naručioca i povratak vrednosti. To obara broj uspešnih projekata na `14%` u 2017.

(Navedene brojke, godine i tumačenje treba uzeti s rezervom: CHAOS izveštaji nisu slobodno dostupni.)

CHAOS izveštaj predviđa i skorašnji kraj tkzv. agilnog perioda. Nagoveštava se sledeći period razvoja, **Flow**, koji bi trajao 20-tak godina. U njemu neće biti budžeta projekata, projektnih planova, projektnih menadžera i Scrum mastera. Softverski razvoj će biti poput kakvog toka: funkcionalna specifikacija ulazi na jedan kraj, a na drugoj izlazi rezultat. Promene se dešavaju sve vreme, u malim koracima. Ovo bi trebalo da odstrani čak 90% troškova projekta.

CHAOS izveštaji se besomučno citiraju kao jedini-izvor-istine. Nažalost, podaci 60-tak godina dugog istraživanja nisu javni; te izveštaje treba shvatiti isključivo kao mišljenja grupe. Postoje analize ovih izveštaja koje ih opovrgavaju i ukazuju na krupne nedostatke u zaključcima. Kako bilo, CHAOS-u je došao kraj; neće ih više biti.

Trebalo bi da bude više ovakvih - otvorenih - istraživanja. Zapravo, mnoga i postoje, ali nam, eto, nisu važna. Jer, vlažni snovi su React ili turanje `Optional`, a istraživanja nam se bave platama i brojem potrošenih loptica za stoni fudbal.

## I šta sad?

Muče me dva pitanja:

+ koliko se efikasno proizvodi vrednost?
+ kolika je zaista proizvedena vrednost?

Jasno je da ne postoje univerzalne inženjerske metode i tehnike, koje odgovaraju svim softverskim kompanijama. Nebrojeno metoda i alata je evoluiralo za ovih pola veka softverskog razvoja. Tome se nema šta protivurečiti.

Ipak, nerado prihvatam da to opravdava postojanje _hiljada_ programskih jezika i sigurno još veći broj različitih metoda i tehnika razvoja softvera. Ponavljam, nesumljiv je napredak razvoja softvera, ali se plašim da i dalje... nismo savim sigurni šta se to, zapravo, dešava. Da citiram komentar jednog od učesnika konferencije tog varljivog leta: "Pravimo (softverske) sisteme na način kako su braća Rajt pravila avione - napravimo ih cele, gurnemo sa ivice, pustimo da se slupaju; i započnemo sve ispočetka".

Da nastavim misao dalje: softversko inženjerstvo je _najmanje_ ono što mislimo da jeste. To nije aktivnost u kojoj sedite ispred računara za tastaturom i proizvodite kod. Razumevanje zahteva, testiranje, ispravke pogrešnih zaključaka, interpretacija rezultata, merenja, jasnoća komunukacije, koordinacija, dokumentacija... su aktivnosti kojima se razvija softverski sistem. Navodim omiljen citat koji ide tome u prilog (Maurice Wilkes):

> As soon as we started programming, we found to our surprise that it wasn’t as easy to get programs right as we had thought. Debugging had to be discovered. I can remember the exact instant when I realized that a large part of my life from then on was going to be spent in finding mistakes in my own programs.

----

Ako bih trebalo da [ZDRUM](https://zdrum.work)-nem pola veka softverskog razvoja u jedno geslo, ono bi bilo:

> Do something small, useful, now.

Isto kao što je to bilo i varljivog leta '68.
