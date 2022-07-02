---
title: "Karate izazov"
date: 2022-07-02T01:07:03+00:00
categories:
  - Razvoj
tag:
  - razvoj
  - izazov
  - ml
  - ip
  - np
---

Igra Kaladont postaje NP problem kada treba pronaći najduži mogući niz reči.

Spoiler alert: ukoliko kanite upustiti se u izazov, ne čitajte dalje.

<!--more-->

Kada je skup reči veliki (160 hiljada), uobičajeni pristup provere svih mogućih ishoda bi trajao beskonačno. Šta god da smislite, sirovi broj mogućnosti brzo postaje prevelik za svu procesorsku moć koja vam je na raspolaganju. Zanimljivo, tokom eskperimentisanja na tu stranu, brute-force algoritam koji je paralelno koristio sve CPU računara je toliko intezivno radio da je siroti Mek trošio bateriju iako je bio priključen na izvor električne energije.

Problem Kaladonta se može preslikati u ciklični orijentisani graf. Čvorovi su početni i krajnji slogovi (slog je ovde deo reči dužine 2 slova, prema pravilu igre). Grana grafa povezuje dva čvora i predstavlja reč. Reč `oblac` se može predstaviti vezom `(ob)->(ac)`. Ove čvorove identično povezuju sve reči koje isto počinju i završavaju (recimo: `obrazac`). U suštini, same reči nam nisu važne (sadržaj između početka i kraja reči), već samo 1) čvorovi i 2) postojanje veza između njih.

## Alg 1

Ideja je jednostavna. Biramo za sledeći čvor onaj sa najvećim brojem veza do njega. Kada nema dalje, označimo poslednji čvor kao potrošen, te se vratimo nazad. Usput pamtimo dokle smo najdalje došli.

Problem se može modelovati matricom. Kolone i redovi su čvorovi (slogovi), a vrednost ćelije matrice su sve veze (sve reči) između dva čvora.

Ovakav pristup radi brzo: za nekih **300ms** daje povezan niz od `22668` reči. Vreme izvršavanja je dato samo kako bi se uporedilo sa narednim algoritmima.

## Alg 2

Šta ako promenimo logiku odabira sledećeg čvora? Možda maksimum broja veza i nije najbolja funkcija za to?

"Aha" momenat se javio kada sam počeo da razmišljam o _protoku_: broju veza koje prolaze kroz čvorove. Bez matematički potkovanog razloga, odabiram da poredim broj izlaza sa brojem ulaza čvora. Ukoliko je ovaj odnos veći, to je čvor "prohodniji", te postaje bolji kandidat za odabir.

Novi pristup je sporiji, jer zahteva neprestano računanje "prohodnosti" čvora i više ne barata sa celim brojevima. Ipak, za **1500ms** daje niz od `24585` reči. Napredak!

## Alg 3

U međuvremenu sam čitao o algoritmima tkzv. "veštačkih inteligencija" (glupog li naziva). Naslućujem da bi nekakav evolutivni algoritam imao smisla: koji bi birao nasumično jedan od najboljih izbora za sledeći čvor. Informacije o nasumičnosti bi se potom mešale ukoliko daju bolje (duže) rezultate.

Za početak, puštao sam algoritam da samo nasumično bira jedan od dva najbolja sledeća čvora. U jednom trenutku sam za trunku prebacio dosadašnji rezultat: `24590`. Ipak, uplašilo me je trajanje: - ako je 1.5s jedno izračunavanje, a u evoluciji ih imamo bar 10; i to sve izvrtimo bar 1000 puta, dolazim do 250min (4+h) rada.

## Alg 4

Onda sam još čitao; nemam baš nikakve slične softverske veštine koje bi mi pomogle. Moje rešenje je verovatno i naivno, a deo onoga što sledi opisano neprecizno.

Ispostavlja se da postoji problem ranca (_knapsack_) na kome se oprobavaju razni ML algoritmi. On pripada tkzv. Integer Programming (IP) problemima, koji se bave matematičkim programima (?) u kojima su sve varijable celi brojevi. Takav je i problem Kaladonta: sve vreme samo brojimo upotrebljene veze grafa.

Takođe postoji alat GPKL (i razni drugi) u kome možete da opišete matematički model i njegova ograničenja; i prepustite mu da pronađe optimalno rešenje za zadata pravila. To umnogome olakšava rešavanje ukoliko bi postojao način da se graf opiše na takav način.

Graf je matrica. Granična vrednost za svaku ćeliju je broj veza između dva čvora. Razmišljanje o protocima je pomoglo, jer daje još jedno ograničenje za model: na rezultujućoj putanji broj ulaza i izlaza u odabrani čvor mora biti isti! Zadatak se pretvara u maksimizaciju vrednosti ćelija matrice (njihovog zbira) uz data ograničenja.

Ovakav model je nepotpun: nedostaje ograničenje da rezultujući niz bude i povezan. To nisam umeo da da predstavim modelom; ostavio sam za sledeću iteraciju algoritma. Umesto toga, dakle, puštam da GPKL pronađe rešenje delimičnog modela. Onda ostaje da utvrdim da li je rešenje korektno, tj. da li postoji neprekidna putanja kroz rešenje. Ukoliko ona ne postoji, dopunjujem model ograničenjem koje odbacuje trenutno rešenje i pokrećem ga ponovo.

Potrebno je 3 iteracije da dođemo do rešenja koje daje neprekidnu (i najdužu) putanju kroz graf. Sve to traje razumno brzo; reč je o minutama. Sada nastupa, kako se ispostavlja, intezivniji deo: izvući putanju iz rezultujućeg grafa. Na netu se mogu naći algoritmi za ovaj problem. Kod sam prepisao i prilagodio. Kako ovde nema prečica, izračunavanje putanje obilazi sve čvorove, vodi računa o cikličnim putanjama i... baš dugo traje.

Dolazim do rešenja od `26552` reči za nekih **1h50m**.

Zadovoljavajuće. Probao bih da optimizujem ekstrakciju putanje koja uzima više od 90% vremena proračuna; no, šta-je-tu-je.

## Izazov

Jedna regionalna firma upućuje sličan javan izazov - na dobronameran i pristojan način. To je, svakako, mnogo bolje od plitko-duhovitih ne-inženjerskih sadržaja koji se prelivaju sa poslovnih mreža. Ipak, pitam se, šta se iz ovog izazova može zaključiti o učesniku izazova? U mom slučaju, da sam samo predugo rudario; mogao sam da potpuno promašim pristup (i jesam nekoliko puta) i nikada ne dođem do rešenja (uzimajući u obzir da se ovo radi u tkzv. slobodno vreme). Da li je to vrednost koja je danas na ceni? To me je sve podsetilo na drugu, ovaj put domaću firmu, koja daje nekakav NP problem kao test za intervju za posao (rešava se primenom A\* algoritma). Firma se ne bavi sličnim softverskim alatkama, a ni ne dobacuje daleko s inježerskim veštinama; šta to onda govori?

---- 

Izdvajam neke zanimljivosti sa ovog puta.

Prvo, modeli i tipovi. Problem Kaladonta prosto zove da se svuda koriste stringovi, karakteri i liste, mape... Pogrešno, pogrešno, pogrešno. Možda interesantniji softverski izazov bi bio da se prikaže konkretan algoritam (rešenje), pa da modelujemo program i tipove po njemu. Kako bilo, i ovde treba napraviti lep tipski model domena problema. Nikada dovoljno tipova:)

Kada god neko izvršavanje traje dugo, bilo bi zgodno podeliti posao u korake na takav način da je moguće sačuvati među-rezultate. Štedimo vreme time što algoritam možemo da pokrenemo u sredini rada. Jedno mesto je očigledno - nakon pronalaženja GPKL rezultata; izazov bi bio isto uraditi za algoritam utrvđivanja niza.

Refaktoring zahteva _izuzetno_ pažnje. Jedan štos je uspostavljanje tkzv. "zlatnog mastera". Kada imamo ovakvo (rekurzivno) izvršavanje koje traje i/ili barata velikom količinom podataka, zapisujemo 'trace' rada, trenutna stanja i sl. u nekakav fajl. Nakon refaktoringa se tok izvršavanja poredi sa zlatnim masterom, čime se utvrđuje da sve radi kao pre. Inače, ova tehnika se često koristi prilikom rada sa legacy kodom. (Ha, voleo bih da vidim TDD sveštenike u ovom problemu!).

Toliko. Idemo dalje.