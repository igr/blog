---
title: "Pokerica"
date: 2023-06-09T07:07:07+00:00
categories:
  - Razvoj
tag:
  - projekat
  - agilno
  - poker
  - predikcija
---

Prva sekunda je prošla... Milorad je nesvesno zagrizao donju usnu.

<!--more-->

_Milorad je novi igrač, senior dev. Zna dosta, ali još nije upućen u projekat. Oprezan je, pa zato stalno izbaci veći broj. Uočio sam da ima i tik: grize usnu kada u nešto nije siguran; pa će ići na zicer. Dakle, baca 8 ili 13._

Sekunda. Žaklina ne trepećući gleda u kameru.

_Ah, Žak, stara mustra, igra svoju igru. Provalio sam je još pre par sprintova. Čeka da svi izbace svoje brojke, pa nasumično odluči za neku. Ne želi da se bavi ovom igrom, strah ju je u suštini. Unosi uvek neizvesnost; sa njom rezultat može lako da prevagne na stranu na koju ne treba. Hm, hm, Žaki, šta li ćeš danas odabrati..._

Sekunda. Garsija nestrpljivo kucka prstom po stolu.

_Garsija, Španac, je zeznut. Proveo je na projektu dugo i zna mu svaki ćošak. Voli da bude u pravu i da se bori za svoj broj kada je u manjini. Ukoliko dođe do toga, odužiće se ovo planiranje, uh! Valjda će baciti 8, pa će se Žaklina možda ugledati na njega. To su onda dve osmice protiv Miloradove trinaestice. Hm, hm._

Sekund. Tobi već kucka dalje na sleku.

_Tobi je brz i voli da igra na svoju ruku. Amer korejskog porekla, potcenjuje estimacije u nameri da se urade brže, često i zaobilazi pravila kako bi nešto izveo do kraja. Ne nužno i da je najbolje što može, ali šefovi ga vole. Nisam pametan dal' je to dobro ili ne; kako bilo, on će izbaciti petaka, nema greške. Ako Žak povuče na njega, nadrljali smo._

Začuo se glas: "Da vidimo kako glasamo za ovaj tiket..."

_Dang! Nisam stigao da pogledam... Da vidimo: mikroservis, 2-3 nova API poziva, možda nova kolona u bazi; ali zovemo i drugi servis; pa ok, znači... ma 8, da ga nosam, to je to._

----

Igranje pokera za potrebe planiranje je samo igra. Suština ove ceremonije je dobronameran egoistički poriv: verujemo da smo sposobni da iznesemo kompleksnu analizu za infinitezimalno vreme da bi dobili na objektivnosti zajedničkog merenja. I već sama ova rečenica nije suvisla. Ne postoji objektivna estimacija. Nije važno čuti mišljenje svih o svemu, već samo odgovornih o onome šta znaju. Konačno, estimacije izvedena na osnovu rečenice-dve u tiketu je isto što i gledanje u staklenu kuglu zarad uvida u tokove budućnosti: radi samo na vašarima.

Malo o predviđanjima, iz ugla hroničnog estimatičara: nemam još sve posloženo da bih mogao da ponudim jezgrovit odgovor.

+ "Ukupna estimacija" je ona koja se tiče celog proizvoda, uključuje raznorodne aktivnosti i timove. Takva estimacija ima smisla samo kada je okvir, a nikako cilj. Količina napora potrebnog da se odredi tačnija estimacija je često skuplja od vrednosti same estimacije. Projekat može da traje `3`, `6` ili `12` meseci; to mi je jedini odgovor na pitanje koliko izrada _nečega_ košta.
+ "Projektna estimacija" se uspostavlja na projektu, tek posle nekoliko iteracija. Izmišljam formulu brzine izrade, koja je svojstvena samo tom projektu i uključenim timovima. Formula je samo interpolacija prethodnog perioda, to je sve. Iskustvo pomaže u određivanju koefcijenata. Formula može da izgleda kao: `<broj-novih-ekrana> * 1.4 dana + <broj-novih-integracija> * 3 dana + <broj-dopuna-modela> * 0.4 dana + <br-novih-apija> * 0.8 dana`. Neprestano se validira. Odnosi se za tim(ove) i jedan korak razvoja (sprint).
+ "Estimacija zadatka" je uvek `2` dana. Posle tog perioda, sledi nova estimacija, nova dorada zahteva, novo uslagašavanje.


---

Ma ko sam pa ja da kvarim vašarsku zabavu; daj 'vamo tu kuglu 🔮, podeli te karte za poker ♠️♥️!