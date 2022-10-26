---
title: "Dve programerske ideje"
date: 2022-10-26T01:07:03+00:00
categories:
  - Lično
tag:
  - razvoj
  - programiranje
  - lagarto
  - jodd
---

Dve ideje koje delim pre nego što ću ih, nažalost, baciti u korpu za otpatke.

<!--more-->

## Lagarto

Open-source biblioteka koja se često koristi je [Lagarto](https://lagarto.jodd.org/) - od svih koje sam objavio, na nju odlazi `15%` preuzimanja (nekih `750k` mesečno). Reč je o parseru (X)HTML-a. Alternative u vreme kada je nastala nisu bile zadovoljavajuće. Java je nudila neupotrebljivo spor (samo)-XML parser. `jSoup`, rešenje za koje se svi prvo uhvate, nudi samo rad sa DOM stablom. Gledajući njegov sors, nije mi nešto "legao". Ne sećam se detalja; može biti da sam samo pomislio da može bolje i brže, bez valjane analize.

Kako bilo, `Lagarto` je iskodiran po HTML5 specifikaciji. Nudi nekoliko načina rada: 1) "stream" procesiranje, u toku parsiranja, 2) kroz formirano DOM stablo i 3) kroz interfejs sablasno sličan jQuery-ju. Jasno, prvi pristup je brži i manje memorijski zahtevan, druga dva pristupa su udobnija. Pored parsiranja HTML-a, radi opciono i "popravke" neispravnih sadržaja na sličan način kako ih tumači i browser.

`Lagarto` dolazi sa dve prijateljske biblioteke: `CSSelly` (parser CSS3 selektora) i `Jerry` (pomenuti jQuery u Javi). Zanimljivo, `Jerry` je toliko sličan, da su za testove korišćeni copy+paste primeri iz zvanične jQuery dokumentacije. Jedan od korisnika je čak poterao pravi jQuery skript na tadašnjoj JavaScript JVM implementaciji.

Performanse biblioteke, jedan od ciljeva kojem sam stremio, jesu odlične. Poslednji feedback vredan pažnje je bio sledeći. Preuzete su početne stranice milion najbolje rangiranih sajtova i pušten je `Lagarto` na njih. Sve je prošlo kako treba, a brže od ostalih korišćenih biblioteka. Još uvek čuvam `12.3GB` kompresovanih stranica kako bih mogao da ponovim ogled :)

**Šta bi bilo, kad bi bilo.**

Projektu je potreban očigledan rad na gotovo nepostojećem sadržaju koji bi "prodavao" biblioteku - dokumentaciji, web stranici itd. Međutim, ima jedna _fantastična_ stvar koja se može uraditi.

Naime, specifikacija HTML-a je napisana vrlo precizno, ujednačeno i algoritamski. Reč je o velikoj state-mašini (što svaki parser i jeste) i pravilima za svako stanje. Pokazalo se da se tekstualna pravila preslikavaju gotovo identično u kod!

Fantastična ideja i njene zveri je sledeća: napraviti procesor specifikacije, čak ne treba ni NLP upotrebiti. Rezultat bi bio parser u nekakvom pseudo-jeziku; parser je samo stanje i jednostavan rad sa nizom karaktera. Iz takvog rezultata bi se potom generisala implementacija u _bilo_ koji programski jezik! Ne samo da bi `Lagarto` bio tehnološki-agnostičan, već bi uvek bio i ažuriran prema poslednjoj verziji HTML specifikacije. Wow!

Zašto ne stvarati sintaksu nekog poznatog parsera (pa svakako već koristim jFlex za `CSSelly`)? Razlika je što takva definicija nije jezički agnostična. S druge strane, state-mašina HTML nije kompleksna, samo je ogromna. Mada, ko zna, možda je i to izvodljivo; vredi probati.

Krivo mi je što neću imati prilike da vidim dokle sve ova ideja može da dobaci.

## DTL

Kažu da je programiranje == podaci i algoritmi. Vremenom, algoritmi su se zaturili, pa danas mahom samo baratamo podacima. Kada malo pogledaš, većina programa koje danas pišemo jeste samo _transformacija_ podataka iz jednog oblika u drugi.

Zašto onda koristimo programske jezike opšte namene?

`DTL` je samo ideja; dogurao sam ne dalje od probnih primera. `Data Transformation Language` bi bio nekakav tehnički-agnostičan jezik koji opisuje _transformaciju_ podataka. Da pojasnim.

U aplikaciji postoje granice. Preko granica se prenose podaci, jer delovi aplikacije (moduli, servisi...) komuniciraju. Svaka strana granice definiše šta emituje, tj. koje podatke nudi. Definiciju podataka čini opis šeme, tipova itd.

Nad definicijom podataka postavljamo operacije - konkretna upotreba podataka. To su načini čitanja i modifikacije podataka. Postoji konačan broj načina konzumiranja podataka. Naš jezik i ne mora da pokrije sve slučajeve, dosta je da ih pokrije dovoljno. Operacije se grupišu u atomske celine. I to je sve.

To bi izgledalo ovako nekako. Bekend opisuje podatke koje nudi kroz API. U toj definiciji se nalazi šema svih modela. FE, kao korisnik, definiše 1) šta konzumira i 2) šta menja. Podseća sve na OpenAPI, s tom razlikom što je `DTL` zapravo jezik koji opisuje konkretnu upotrebu, a ne samo moguću. Dalje, `DTL` se može napisati za komunikaciju istog bekenda i drugih upstream servisa ili baze. Na taj način je celokupni protok podataka od izvora do kraja definisan _istim_ jezikom.

`DTL` kaže: uzmi _ono_ odande i promeni ga u _ovo_.

Šta raditi sa `DTL`? Generisati kod! Svaki prelaz ima svoju implementaciju. FE/BE je na pr. TypeScript klijent i SpringBoot API. BE/DB prelaz je JPA/SQL. BE/Servis prelaz je Java i Go API s druge strane. Itd.

Da, generisani sadržaj neće biti super-sjajan. Ali bi trebalo da je brzina izrade višestruko veća. Danas se puno vremena troši na potpuno iste radnje, iznova: mapiraj ulaze u modele, konvertuj modele u druge, pretoči u bazu i nazad.

`DTL` bi trebalo da opiše celokupni tok transformacije podataka, od izvora do upotrebe. On ujedno služi i kao formalna definicija sistema, pošto se bavi obema stranam u komunikaciji preko granica.

Ideja o `DTL` ne može daleko da dobaci; svestan sam toga. Ipak, ima nečeg golicavo interesantnog, našta pomislim svaki put kada napišem još-jedan-enpoint.
