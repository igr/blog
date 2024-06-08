---
title: "Commitment Contract Open Source"
date: 2022-11-13T01:07:03+00:00
slug: "commitment-contract-open-source"
description: >
  Postoji aspekt otvorenog koda (i autorskog sadržaja) koji zahteva pažnju.
---

Postoji aspekt otvorenog koda (i autorskog sadržaja) koji zahteva pažnju.

Najbolje početi sa primerom.

Postgres dozvoljava kreiranje Enum tipova. JPA to ne kapira, jer je Hibernate; pa smo dužni da sami pišemo podršku. Poznata osoba u Java svetu, pride i Java Champion, koji je sve svoje izgradio na pomenutim tehnologijama, nudi open-source biblioteku koja podržava Postgres Enum tipove.

Enumi u programskim jezicima se često pišu velikim slovima. U SQL to i nije čest slučaj; i sam preferiram mala slova za imena entiteta. Pomoćna biblioteka radi samo ukoliko su enum tipovi u bazi definisani isto velikim slovima. Na Githubu postoji prijavljen problem, čak i kod koji bi mogao biti upotrebljen. Problem do danas nije rešen.

Na prvu loptu frustrira što ovakav jednostavan problem ne nalazi rešenje. Zaista, reč je o pola sata posla za onoga ko poznaje kod biblioteke. Međutim, autor ne rešava ovaj problem. Vrlo je direktan i iskren pri tome: ako nemaš vremena da prijaviš PR, nema ni on vremena da se bavi time. Svakako, ukoliko platiš konsalting, izaći će ti u susret. U isto vreme, autor nalazi vremena da na ličnom nalogu tvitne spisak zemalja odakle dolazi najviše posetilaca na njegov blog - sadržaj neprilagođen onome što liči da je njegova misija (bar tako može da izgleda).

Zastanimo ovde i oslušnimo: na koju stranu nam idu misli? Da li je ovo ok? Da li je fer? Da li je u pitanju zloupotreba popularnosti? Da li cenimo iskrenost?

Autoru ne možemo ama baš ništa zameriti. Otvoreni kod nosi sa sobom pretpostavku da su autori voljni da rade na projektu, te i da neće zloupotrebiti pažnju. Naivni (ja) veruju u to. Pragmatični ne, oni planiraju.

## Vrednost otvorenog koda

Otvoreni kod je više od koda na Githubu - to je pokret, ideologija, ideja. No to nije danas tema. Želim da pričamo o _održivosti vrednosti_.

Šta činimo da (p)održavamo vrednosti koje konzumiramo?

Projekat otvorenog koda koji malo ko koristi, ne dobacuje dalje do vrednosti koju samo autor pronalazi. Na drugoj strani spektra su projekti koji moraju da budu otvorenog koda bez obzira na njihovu vrednost - na primer, softver koji je u vlasništvu građana.

Šta je, međutim, sa svim onom silnim projektima između ove dve krajnosti? To su projekti koji daju vrednost, koriste se, rešavaju problem. Tu vrednost slabo prepoznajemo; prihvatamo je zdravo za gotovo. Takav stav nije održiv. Nažalost, tehnološke firme danas su poremetile sisteme vrednosti - prihvatamo da prodajemo našu pažnju, najskuplji resurs koji posedujemo, za sadržaj koji nam se servira zarad kratkoročne dopaminske (e)re(a)kcije. Ovo gura u zapećak i poimanje vrednosti otvorenog koda i autorskog sadržaja.

Društvo koje ne ceni otvoreni kod (sadržaj), ne može biti otvoreno.

Rešenje nije jednostavno, ali se nazire - onaj kome vredi i ko može ima delić odgovornosti da podrži besplatan rad na biblioteci. Neki projekti će naći svoje patreone; VetX mi pada na pamet. Neki projekti će prevazići magičnu granicu samo-održivosti prodajom konsultantskih usluga. Takvih projekata nema puno. Da li to možda znači da samo oni zaslužuju da postoje?

## Commitment Contract

Ne želim da pričam ni o sponzorisanju projekata - problem zahteva ozbiljnu promenu razumevanja konzumiranja, a teško je pogledati se u ogledalo.

Pričam o strani autora, održavaoca biblioteke. Manjka mi komunikacija namere; što je čudno naspram tolike energije uložene u komunikaciju upotrebe, tj. licenciranja. Dakle, reč je o upostavljanju nekakvog dogovora za održavanje koji bi eksplicitno i iskreno predstavio trenutno stanje stvari. Slično kao što postoje licence otvorenog koda, tako bi postojala i naznaka - skala - "održivosti" projekta. Kroz nju autor sam naznačava koliko je u mogućnosti da se bavi projektom. Ovo se, naravno, vremenom menja. Nekada je u pitanju samo održavanje koda i ispravljanje postojećih grešaka. Nekada je povremeno dodavanje najtraženijih dopuna, do, recimo desetak sati mesečno. A nekada si prosto potpuno u tome i želiš da priuštiš da popraviš sve prijavljene bagove što pre.

Ovakav jedan ugovor-dogovor je vredan za obe strane. Autoru, jer ga tera da promisli i izmeri (ko je to pomenuo OKR?) koliko sebe zaista ulaže; poznato je da održavati biblioteku otvorenog koda pored svih obaveza koje dan nanese nije nimalo jednostavno; u mom slučaju je dovodilo i do depresivnih perioda nakon svakog većeg izdanja biblioteka. S druge strane, korisnici biblioteke dobiju nekakvo obećanje na koje mogu da računaju i šta mogu da očekuju. Ujedno može da posluži i kao opomena da bi neki projekat mogao da nastavi da živi. Dvosmerna komunikacija ostvarena.

Ovakav dogovor važi ne samo za kod, nego i svaki autorski rad koji je javno dostupan. Kako smatram da pisanje bloga ne treba da bude ventil, već iskaz razmišljanja; trošim neuobičajeno puno vremena na pisanje ovih stranica. Da primenim onda ideju iz teksta: obećavam da ću pisati bar do kraja godine.
