---
title: "Oktobar 1968."
date: 2023-10-15T07:07:07+00:00
categories:
  - Razvoj
tag:
  - razvoj
---

Dok Brajan Adam dečački peva o letu '69 kao najboljim danima ikada, u softverskoj industriji vlada samo-prozvana kriza. Pošto je godina iz naslova pesme samo referenca na seksualni čin, dozvoljeno nam je da je promenimo, te upotrebimo istu pesmu za godinu pre, 1968. Najbolje godine, zar ne?

---

Nije nostalgija razlog zašto se [vraćam na kraj šezdesetih prošlog veka](https://oblac.rs/varljivo-leto-68/) (neću više, obećavam, a i koga briga). Fasciniran sam relevantnošću problema sa kojima su se suočavali tadašnji programeri. Sličnost sa stanjem danas je toliko velika, da sam poželeo da tek na kraju teksta otkrijem izvornu godinu, sve vreme zavaravajući čitaoca da je reč o nekakvim aktuelnim razmišljanjima. Očigledno to ne radim: smisao ne treba dodatno pojačavati radi nedostatka nečije pažnje.

Ukratko: 1968. i 1969. godine se okupila grupa vodećih "softverskih inženjera" (ne, termin nije skovala Margaret Hamilton) kako bi rešila tkzv. _softversku krizu_: razvoj softvera nije uspevao da prati zahteve industrije. Okupljanja nisu urodila plodom - bilo je naivno očekivati da će nekakav okup jednom godišnje napraviti bilo kakvu promenu. Ipak, nije sve bačeno u vodu: ostao je trag razmišljanja o najvažnijim problemima u softverskoj industriji tog vremena.

Red je i da postavimo u fokus i stepen razvitka informatičkih sistema tog doba. Programi su se izvršavali na mejnfrejm računarima (veličine ormana), hardver je bio vrlo bitna komponenta celog sistema, softveri su pisani da rešavaju probleme u industriji (koja je to mogla da priušti), na programima je radilo puno inženjera, koristilo se puno mašinskog koda, ali je bilo i "viših" programskih jezika, projekti su trajali.

Da ne bude zabune: svi učesnici konferencije su i dalje (bili) samo ljudi; ne pravim idole od njih. Ima i potpuno promašenih zapažanja, ali neobično malo. Takođe se oseća breme vremena u razmišljanjima; no to je potpuno u redu, jer su se okupili da reše aktuelan problem, a ne da gledaju u staklenu kuglu.

Iza obe konferencije je ostao pisani izveštaj. Kopkalo me je da ga pročitam i vidim koliko su razmišljanja tada bila drugačija. Sigurno smo napredovali za ovih pedesetak godina, zar ne? Ono što sam zatekao me je zaprepastilo (FOTO, VIDEO). Šalu na stranu, primetna je konvergencija zrelih ideja i zaključaka. Gde su završile?

Izdvojiću delove izveštaja prve konferencije koji su mi zapali za oko. Ima ih mnogo, mnogo više; dobar deo nisam preneo, neke sam verovatno propustio; a i ne bi imalo smisla da sve stavim ovde.

## Isečci

> The dissemination of knowledge is of obvious value — the massive dissemination of error-loaded software is frightening.

Svi učesnici dele ovakav nekakav alarmantno-zabrinjavajući pogled na softverske greške. Greška je tada, jasno, bila skuplja nego danas; no opet, čini mi se da je vladala zdrava doza namere da se dođe do sistema koji ispravno rade.

Danas je greška jeftina - ili, bar, jeftinija. Ispravnost sistema kao da je samo proporcionalna testovima. Umesto da nemamo grešku, pristajemo na "greška nije pronađena". Takav stav implicira izvesnu degradaciju kvaliteta, zar ne?

> Today we tend to go on for years, with tremendous investments to find that the system, which was not well understood to start with, does not work as anticipated. We build systems like the Wright brothers built airplanes — build the whole thing, push it off the cliff, let it crash, and start over again.

Ima dana kada mislim da nismo daleko odmakli. Ostalim danima znam da nismo daleko odmakli.

Možda je to samo stanje stvari, jedini pragmatičan način razvoja? Grnčar nebrojeno puta razbija napravljeno, usavršavajući sebe i predmet koji stvara. Ako je već tako, zašto kao programeri ne "razbijamo" više?

> Programming is still too much of an artistic endeavour. We need a more substantial basis to be taught and monitored in practice on the: (i) structure of programs and the flow of their execution; (ii) shaping of modules and an environment for their testing; (iii) simulation of run time conditions.

Programiranje [nije umetnost](https://oblac.rs/neostvareni-umetnici-razvoja/). Programiranje ne treba da bude umetnost. To što se neko oseća nadahnuto tokom posla u kome sve "klikne" - nije umetnost. Pomisao da programiranje jeste bilo kakva umetnost je ujedno etičko unakažavanje inženjerskog poziva i pogrdno trivijalizovanje umetnosti. Zar nije naša dužnost da slobodne veštine razvoja pretvorimo u precizne, ponovljive, korake?

> There are two classes of system designers. The first, if given five problems will solve them one at a time. The second will come back and announce that these aren’t the real problems, and will eventually propose a solution to the single problem which underlies the original five. This is the ‘system type’ who is great during the initial stages of a design project. However, you had better get rid of him after the first six months if you want to get a working system.

Danas kao da više pričamo o tome _šta_ znamo, nego _kako_ znamo. Na primer, naginjem ovoj drugoj grupi; zato se trudim da uočim kada je dosta, što mi teško polazi od ruke. Dodao bih da postoji potreba za sistemskim tipom razmišljanja na svakoj značajnoj promeni: promena zahteva, početak rada na novom modulu itd. Ove dve (tri, četiri?) grupe neprestano menjaju mesta, ali rade zajedno. Možda ne bi bilo loše početi pričati o tome _kako_ radimo, a ne koliko biblioteka znamo da koristimo?

> The design process is an iterative one. I will tell you one thing which can go wrong with it if you are not in the laboratory. In my terms design consists of:  
> 1. Flowchart until you think you understand the problem.  
> 2. Write code until you realize that you don’t.  
> 3. Go back and re-do the flowchart.  
> 4. Write some more code and iterate to what you feel is the correct solution.

Ostavljam ovde uprkos svim teorijama zavere koje tvrde da se _ikada_ insistiralo da je waterfall jedini pravi način razvoja softvera. Kako je došlo dotle je druga priča, koju nastavljamo da proživljavamo i danas kroz druge aspekte softverskog razvoja.

> The most deadly thing in software is the concept, which almost universally seems to be followed, that you are going to specify what you are going to do, and then do it. And that is where most of our troubles come from. The projects that are called successful, have met their specifications. But those specifications were based upon the designers’ ignorance before they started the job.

Kako znamo da specifikacija zaista odgovara potrebi? Jedini razumni odgovor koji mogu da ponudim: 1) dobijemo feedback što pre moguće 2) prvo implementiramo važnije zahteve. Opet, i ovo je prilično nejasno. Kako znamo šta je važniji zahtev? Kako znamo da je feedback ispravan?

> What is needed is not classical mathematics, but mathematics. Systems should be built in levels and modules, which form a mathematical structure.

Slagali se ili ne, zemlja ostaje okrugla, a program zaista čine matematičke strukture. Ako nam je matematički aparat nadohvat ruke, zašto se ustežemo? Ako nešto može da bude nedvosmisleno, zašto nije?

> Three fundamental design concepts are essential to a maintainable system: modularity, specification, and generality. Modularity helps to isolate functional elements of the system. One module may be debugged, improved, or extended with minimal personnel interaction or system discontinuity. As important as modularity is specification. The key to production success of any modular construct is a rigid specification of the interfaces; the specification, as a side benefit, aids in the maintenance task by supplying the documentation necessary to train, understand, and provide maintenance. From this viewpoint, specification should encompass from the innermost primitive functions outward to the generalized functions such as a general file management system. Generality is essential to satisfy the requirement for extensibility.

Sačuvajte ovo. ❤️

> The approach suggested by Christopher Alexander in his book: Notes on the Synthesis of Form, is to make a tree structure of the decisions, so that you start by considering together those decisions that hang most closely together, and develop components that are sub-systems of your final design. Then you move up one step and combine them into larger units, always based on insight, of some kind, as to which design decisions are related to one another and which ones are not strongly related. I would consider this a very promising approach.

Nisam razmišljao o kombinovanju komponenti na ovakav način. Nekako sam naučen da krenem od šire slike, pa da je usitnjavam. Tako negde i piše, pa, gotovo svuda: problem se deli na korake i onda se oni zasebno rešavaju. Implicitno pretpostavljamo da se odluke preliju na pravi način; jer imamo uvid u celu sliku od samog početka. Implicitno pretpostavljamo i da na ispravan način umemo da podelimo početni problem.

Dugo već sumnjam da to nije ispravan način dekompozicije. Šira slika je uvek generalna, nejasna, neprecizna. Umesto toga, razvoj može krenuti od grančica: spajati ih, uvezivati, menjati, pridruživati. Kako odmičemo, tako se približavamo sve naprednijim funkcionalnostima koje se postavljaju na zdravu osnovu.

> Begin with skeletal coding: Rather than aiming at finished code, the first coding steps should be aimed at exploring interfaces, sizes of critical modules, complexity, and adequacy of the modules... Some critical items should be checked out, preferably on the hardware if it is available. If it is not, simulation is an alternative. The contributions of this step should be insight and experience, with the aim of exploring feasibility.

Deo koji se nadovezuje na prethodni. Hajde da odemo korak dalje - koliko puta ste odbacili inicijalni kod, usled boljeg razumevanja problema? Danas svuda pričamo o efikasnosti, koju iz nepoznatog razloga ujedno izjednačavamo sa što manjim brojem izmena postojećeg koga, zašta čak postoji i metrika. Kada dozvoljavamo tektonske izmene projekta? Kao da jedino mali projekti i oni pravljeni od strane sramotno bogatih kompanija mogu sebi to da priušte?

> The most frequently used definition — that a program is a sequence of instructions — forces one to ignore the role of data in the program. A better definition is that a program is a set of transformations and other relationships over sets of data and container structures. At least this definition guides the designer to break up a program design problem into the problems of establishing the various data and container structures required, and defining the operators over them. The definition requires that attention be paid to the properties of the data regardless of the containers (records, words, sectors, etc.), the properties of the containers themselves, and the properties of the data when combined with containers.

Sačuvajte ovo. ❤️

> It’s not sensible to make software better by making hardware better.

Baš interesantna opaska. Ako hardver postane _značajno_ jeftiniji, da li je opravdana degradacija kvaliteta softvera? Zavisi, naravno. Gde je granica? Da li je tamo gde je razumevanje koda bolje? Kako to da kod nije mogao da bude razumljiv i bez oslanjanja na poboljšanje hardvera?

> A standard joke in the industry is that a program typically remains 90% debugged for about 25% of the total implementation time.

😀

> The basic structure of the software, including modular divisions and interfaces, should be determined and documented before a coding begins. Specifications for modules and interfaces can be described in English, carefully phrased to avoid ambiguities.

Nedvosmileno svi učesnici ukazuju na to da je dokumentacija neophodni, neizostavni deo programiranja. Da li je tako i danas?

Uvid u neophodnost dokumentacije ilustruje primer koji se javlja kasnije u izveštaju. Na početku projektu svaki član tima je dobio fasciklu sa tek po kojim papirom. Nakon nekog vremena, programerska dokumentacija u fascikli je "težila" čak 4000 strana. Na održavanje dokumentacije je odlazilo 10%-20% vremena, ali je "totalno vredelo".

Kada se poslednji put radili sa dokumentacijom od bar 500 _održavanih_ strana? Možda 100? Koliko procenata vremena utrošite na pisanje razvojne dokumentacije (pre i tokom razvoja)?

> One type of error we have to contend with is inconsistency of specifications. I think it is probably impossible to specify a system completely free of ambiguities, certainly so if we use a natural language, such as English. If we had decent specification languages, which were non-ambiguous, perhaps this source of error could be avoided.

Odlično nadovezivanje na prethodnu misao. Govorni jezik je evoluirao samo dotle da prenosi tek dovoljno potrebnih informacija kako bi slušalac tek dovoljno dobro razumeo o čemu je reč. Govorni jezik, dakle, nije dovoljno precizan. Postojanje posebnog jezika za dokumentaciju bi imalo smisla; a to bi mogao da bude nekakav high-level jezik koji je ujedno i implementacija projekta, zar ne?

> The conclusion is that making the predocumentation at the proper moment, and using it, will improve the efficiency with which you construct your whole thing incredibly. One may wonder, if this is so obvious, why doesn’t it happen? I would suggest that the reason why many programmers experience the making of predocumentation as an additional burden, instead of a tool, is that whatever predocumentation he produces can never be used mechanically. Only if we provide him with more profitable means, preferably mechanical, for using predocumentation, only then will the spiritual barrier be crossed.

Sačuvajte ovo. ❤️

> There is a principle, a kind of corollary to Parkinson’s Law, called the Peter Principle, named after a high school principal in Long Island. It goes like this: ‘In the real world people are eventually promoted to their final level of incompetence’. That is, if a person is extremely competent at the particular level he happens to be working at, he is immediately promoted. This brings upon him additional responsibility. If he does well at that job he is eventually promoted again, and again, until he reaches the level where he no longer performs satisfactorily, and he is never promoted again. So people are left in a state of incompetence. This, in part, is the problem of any big project area.

Zvuči poznato?

> The system being produced will tend to have a structure which mirrors the structure of the group that is producing it, whether or not this was intended. One should take advantage of this fact, and then deliberately design the group structure so as to achieve the desired system structure.

Zanimljivo “hakovanje” Konvejevog zakona (koji nije, zapravo, zakon; već uočeni obrazac.) Da generalizujemo: ako postoji nekakav obrazac u timu/firmu, onda ga vredi namerno iskoristiti. Osim ako obrazac koči razvoj. Kako onda znamo koji obrazac ima smisla iskoristiti? Čija je dužnost da se brine o tome?

> A design requirement for our Electronic Switching System was that it should not have more than two hours system downtime (both software and hardware) in 40 years.

Zapanjujući podatak. Zastanite za trenutak i odgovorite za sebe: šta bi sve promenili u svakodnevnom radu kada bi ovo bio zahtev? A potom odgovorite: da li vam je potreban ovakav zahtev da bi primenili zamišljene promene?

> A man can communicate with about five colleagues on a software project without too much difficulty. Likewise he can supervise about five people and know pretty well what they are doing. One would structure 120 people in three levels, in which no man is talking to more than about eight people, both across his level and up and down — which is well within our capabilities I think, since most of the communication will go across rather than down.

Prosta matematika malih timova: komunikaciju čine _izvodljivom_. Sve van obima malog tima postaje šum. U pitanju je ljudsko ograničenje, ne mašinsko.

> So, in a system which will take a long time to complete, for example a year, nobody should be allowed to function permanently at one level, but should percolate. In a situation where code actually has to be produced, nobody should be allowed in the system who doesn’t write some given number of lines of code per month.

Onog trenutka kada prestaneš da programiraš u produkciji, zastao si. Ne postoji drugačiji način vežbanja veština, šta god da je u pitanju. Kada stojiš, veština se vremenom prirodno rasipa. **Use it or loose it.**

Bilo da si postao menadžer ili YT influenser, tvoje veštine razvoja stagniraju. U slučaju prvog, može biti opravdano novim karijernim putem. U slučaju drugog - da li je etički korektno "prodavati" ono čime se više ne baviš?

> My motto is 'do something small, useful, now.'

❤️

> The danger of writing a special piece of software to expedite production is that we have a project within a project. Often the inner project is more interesting and it is certainly more volatile in design. Thus it is never really complete, as its effectiveness is not known until it is used. This makes it extremely difficult to make deadlines and stick to them.

Nepopularan lični stav je da in-house projekti ne služe mnogo čemu. Nekada davno sam mislio potpuno drugačije: video sam ih kao obaveznu aktivnost koju svaka firma dostojna svog imena _mora_ da sprovodi. Na kraju, to je zgodno mesto da učimo jedni od drugih, zar ne?

In-house projekti su morsko prase: niti su projekti, niti su proizvodi. Radi ko, kad i kako stigne. Jedva opravdaju svoje postojanje. Ubedite me u suprotno :)

> The initial release of a software system should work well (albeit with limited facilities) and must contain the basic system philosophies that ensure orderly growth.

Da li je ovo prva definicija MVPa?

> The economics of software development are such that the cost of maintenance frequently exceeds that of the original development.

Ovo vidim kao efekat toga da svaka prečica danas košta u budućnosti. To je OK, valjda, ukoliko su ti očekivanja poravnata. Ako ti je u redu da danas trčiš brže (jer, novac), onda ti je isto tako u redu da ćeš uskoro hodati sporije.
 
> Testing is a very inefficient way of convincing oneself of the correctness of a program.

Sačuvajte ovo. ❤️

> Personally, after 18 years in the business I would like just once, just once, to be able to do the same thing again. Just once to try an evolutionary step instead of a confounded revolutionary one.

Stavio bih ovde smajlija, ali nisam siguran kojeg.

> We, in the Netherlands, have the title Mathematical Engineer. Software engineering seems to be the activity for the Mathematical Engineer par excellence. This seems to fit perfectly. On the one hand, we have all the aspects of an engineering activity, in that you are making something and want to see that it really works. On the other hand, our basic tools are mathematical in nature.

Stari latini kažu: "Nomen est omen." Da li nam je naziv profesije ujedno i usud?

> Most of the designers of manufacturers’ software are designing, I think, for their own benefit — they are literally playing games. They have no conception of validating their design before sending it out, or even evaluating the design in the light of potential use. The real problem is training the people to do the design. Most designers of software are damn well incompetent, one way or another.

Liči mi da se sve više bavimo prečicama: kako zanemariti ispravno zarad već nekog proizvoljnog izgovora. Igramo se, zar ne? 