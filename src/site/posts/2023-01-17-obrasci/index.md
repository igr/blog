---
title: "Obrasci"
date: 2023-01-17T01:07:03+00:00
categories:
  - Razvoj
tag:
  - komunikacija
  - organizacija
  - programiranje
  - obrasci
---

Kako vreme odmiče, sve je manje toga što vredi izdvojiti kao zaista važno. Tako je i sa softverskim razvojem.

<!--more-->

Prepoznavanje obrazaca je jedna od fantastičnih kognitivnih sposobnosti svih živih bića. Predstavlja neophodni kapacitet svakog učenja. Kako je konačna svrha učenja neka akcija, možemo (poetično) reći da je prepoznavanje obrazaca preduslov inteligentnom životu.

Ljudi su, kao i ostali živi stvorovi, bića obrazaca. Nekada ih zovemo navikama ili osobinama; obrasci prestavljaju inherentnu komfort zonu, utočište od nepoznatog. Obrasci nas čine onime što jesmo. S druge strane, svaki iskorak iz poznatih obrazaca donosi novi materijal za učenje i uspostavljanje nekih novih obrazaca. Svrha kreativnosti i hrabrosti je upravo činjenje ovakvih iskoraka.

Obrasci su svuda oko nas za nas. Od lepote zlatnog preseka, preko harmonije zvučnih skala, igre rečima, jasnoće programskog koda, pa do onoga što danas nazivamo AI - mi smo bića obrazaca.

---- 

U toku rada na manjem projektu, koji nije kompleksan, ali je sadržajan, uočavam interesantno zapažanje. Kao i svaki softverski projekat, možemo ga podeliti na dve celine: arhitekturu ne-domenskih funkcionalnosti (kako je kod struktuiran, tehnikalije, konverzije itd.) i implementaciju domenskih zahteva i poslovnih pravila (funkcionalnosti, šta kod zapravo radi.) Projekat je pisan od nule, sa fokusom da bude "kako treba" - šta god to značilo. U prvom trenutku se čini da nema većih izazova (što je dobra stvar); imam jasnu ideju kako postaviti projekat, te za svega par dana dolazim do bogatog radnog tehnološkog steka. Zaveden prvobitnom brzinom, očekujem da se tempo razvoja nastavi.

Naravno, to se ne dešava. Razvoj neumitno usporava: ne u postavci projekta, već u implementaciji domenske funkcionalnosti. Zanemario sam nepoznato: poslovnu logiku koja se (agilno) odmotavala i definisala kako je projekat odmicao.

Drugim rečima, oslonio sam se na pogrešnu pretpostavku da iskustvo značajno utiče na izradu implementacije domenske funkcionalnosti. Svakako da se godine osete te se razvoj ne sapliće; ali analiza domena i pretakanje u kod je svaki put iznova izazov.

Zašto je tako? Upravo zbog poznatih i nepoznatih obrazaca. Iskustvo je deo znanja, koje počiva na prepoznavanju obrazaca. Ne-funkcionalni zahtevi su slični; ponavljaju se. Biznis logika je, naravno, svaki put različita, nova. Potrebno je razumeti šta se razvija: prepoznati nove obrasce i učiti iz njih.

---- 

Još jedna ilustracija iz projekta: dozvolio sam da uspostavim arhitekturu neopterećen prethodnim isksutvom. Zanimljivo, došao sam do gotovo identičnog rešenja kakvog sam nedavno implementirao nekim drugim tehnologijama. Obrasci su se ponavili.

Tada sam se zapitao: da li bi i domensku logiku napisao na isti način, ako bi igrom slučaja trebalo napraviti identičan softver? Kada bih ponovo pisao program iz početka, šta bi bilo drugačije?

Vrlo verovatno ne bih napisao istu implementaciju. Kada bih živeo Dan mrmota, verovatno bih tek kroz nekoliko iteracija došao do one, jedne, potpunije i ponovljive (ali ne nužno i najtačnije) implementacije domena i poslovne logike.

Obrascima je potrebno vreme da se uspostave.

---- 

Sledeća ilustracija dolazi iz rada na potpuno drugačijem projektu. Iz razloga u koje neću ulaziti sada, jedno vreme sam proveo programirajući par mikroservisa gotovo bez poznavanja biznis domena i razumevanja šta to pravimo. Zvuči nemoguće, ali nije tako. Pronašao sam uobičajene obrasce u kodu: ovde se prenose parametri, tamo se zove servis, eno tamo se dodaje kolona u bazi. I to je bilo sasvim dovoljno da zadovoljavajuće dobro odgovaram na dodeljene zadatke.

Ne treba da nas ovo čudi: mašinsko učenje (AI) upravo tako radi. Prepoznaje obrasce bez izistinskog razumevanja konteksta.

----

Svi znamo za softverske obrasce (design patterns), omiljene alatke mladih programera. Zaista, čine nam se kao deus-ex-machina: nevešti kod odjednom dobija strukturu, pravila. Ulivaju nam sigurnost, jer upućuju na to kako nešto treba valjano uraditi.

Obrasci iz knjiga (singletonu, factory...) su tek mršavi početak; izolovani u par klasa. Kako se projekat razvija, neprestano se javljaju novi obrasci, dalekosežniji, važniji. Reč je o obrascima koji se provlače kroz više modula, često u vezi su sa biznis logikom. Počeću od tehničkih: kako ispravno logovati, jedinstveni način obrade grešaka i izuzetaka, provera uslova operacija, prenos konteksta... do onih koji se odnose na biznis pravila: da li dva skupa sličnih API-ja na isti način vraćaju rezultat, šta se izvršava u pozadini, da li pravimo CRUD ili rasparačavamo operacije... Štos je što za ovakve obrasce nemamo katalog, spisak pravila. Niti su naše alatke zrele da takva pravila uobličimo na takav način kojim bi se nedvosmisleno primenila na projekat.

Dolazim do žiže razmišljanja:

> Razvoj softvera je uspostavljanje obrazaca.

Ova trivijalna izjava je zapravo bremenita ideja koja prožima svaki deo razvoja softvera. Programeri rade da uspostave obrasce u projektu; ne samo da program radi zahtevano, već i da kod bude takav da je jasan (poklapa sa obrascima koje smo naučili do sada) i ujednačen (obrasci na dva različita mesta u projektu su slični). Zato su tipovi i imenovanje važni, jer su alat za uspostavljanje obrazaca. Zato je projekat u kome se zna gde šta (po)stoji vredniji; jer komunicira obrasce. Efikasan razvoj postaje onda kada su obrasci uspostavljeni i jasni. To ne znači da se ne mogu naurušiti! Dapače, neprestano se radi na održavanju kohezije obrazaca i neprestano se traži postoje li neki novi.

Ovo razmišljanje je zapravo nadogradnja prethodnog: da je razvoj softvera komunikacija programera putem koda. Komunikacija na projektu je upravo to: skup nekakvih obrazaca razmene informacija. Komunikacija nije stalno ista i ne može biti ista, jer zavisi od aktera, članova tima, kulture, znanja i pregršt drugih faktora. Dugo sam se pitao kako je moguće da na različitim projektima mi sami različito komuniciramo, koristimo drastično različite alatke, nekada više-manje uspešno? Zašto ne možemo lako da ponovimo dobra iskustva? Upravo jer je potrebno uspostaviti obrasce iznova.

---- 

Da se vratimo na praktični deo, svakodnevni rad na kodu. Uspostavljanje obrazaca zahteva [neprestani refaktoring](https://oblac.rs/refactoring-enabled-development-aka-red/). Proces razvoja mora da osnaži ovakav pristup.

Jedna ideja mi razbuktava maštu: vreme je da radimo na alatkama koje definišu obrasce u projektu. Postojeći alati (vidljivost, paketi, moduli...) nisu dovoljni. Ako pustimo mašti na volju, svašta nešto možemo zamisliti: od generisanja koda do mašinskog učenja specifičnih obrazaca. Svaki projekat bi, praktično, bio podeljen u dve celine: _meta-projekat_ i sam projekat. Prvi bi se bavio upravo obrascima, drugi bi se bavio konkretnom implementacijom. Pisanje implementacije bi bilo navođeno obrascima i alatima. Dopunski efekat je da se pravila meta-projekta mogu akumulirati i ponovo primeniti, čime bi ubrzli razvoj sledećih projekata.

Ima toliko toga još da se kaže na ovu temu; ali nikako da dođe na red.