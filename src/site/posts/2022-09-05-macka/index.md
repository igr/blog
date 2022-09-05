---
title: "Razvoj, rukovođenje, vizije"
date: 2022-09-05T01:07:03+00:00
categories:
  - Razvoj
tag:
  - razvoj
  - rukovođenje
  - komunikacija
---

Iz života programera.

<!--more-->

Kada CEO firme uvrsti floskulu "Kupac na prvom mestu" na prvo mesto (😬) liderskih principa firme za koju radite, postoje dve moguće reakcije. Prva uključuje ushićenje, posvećenost i nadahnutost.

Ovakve vizije su fokusirane ka spolja - onima koji nalaze vrednost u vašem proizvodu. To je u redu; nećete čuti ništa novo. Važnije je šta to konkretno znači za radnike firme i proces rada, no ostavljamo C-nivou da brine o tome.

Manjkaju vizije koje su usmerene ka unutra. Pogledati se i adresirati probleme. One koje se zaista tiču vašeg svakodnevnog rada i učinkovitosti. Evo odmah primera; dolazi sa istog mesta kojim komanduje nadahnuti CEO.

Upoznajmo se s akterima. Odeljenje `Infra` je zaduženo za AWS, konfiguracije, skaliranja, prava pristupa... Odelenje `Support` je zaduženo za rešavanje produkcijskih problema na aplikacijama koje se vrte na infrastrukturama.

Jedan od uobičajenih problema je vezan za prava pristupa: aplikativna komponenta ne može da pristupi resursima. Kako se slučaj rešava? Čitaj pažljivo.

`Infra` pravi poduže uputsvo na delimično zapuštenom, a svakako preobimnom wikiju. Detaljno se opisuju koraci: šta treba uraditi na AWS, pa na nekom GitHub-u, o čemu voditi računa, kako ne pokvariti prava drugima itd.; dokument obiluje AWS terminima i svime onime čime nas AWS neumorno zatrpava kako bi mogao da naplaćuje [skupe sertifikate](https://oblac.rs/ugrozene-vrste/) umesto da unapredi korisničko iskustvo. Svako iz `Support` tima, dakle, bi trebalo da sam podesi prava pristupa - ukoliko, ironično, uopšte ima dovoljno prava za konkretan slučaj.

Čini mi se da je ovo nekakav uobičajen primer komunikacije dva razvojna odelenja. Snabdevač (ovde je to `Infra` tim) postavlja potrošaču (`Support` tim) praksu i pravila - zapravo, API (!) - za korišćenje njegovog domena. Šta mi pa sada tu nije okej, aman, zaman?

Smer komunikacije je pogrešan.

Ako se vratimo našem nadahnutom CEO-u, vidimo da potrošač diktira poslovanje; to je okej. Zašto je takav pristup rezervisan samo za spoljne aktere? Zašto se isto ne primenjuje na timove?

To znači sledeće. `Support` _ne treba da zna_ da postoji AWS, a kamoli kako se on konfiguriše. `Support` zna samo za 1) korisnikov identifikator i 2) skup resursa kojima pristupa. Kako će to zaista biti uvezano, u kojim fajlovima, repoima, sistemima - to sve nije njegov zadatak, odgovornost, znanje.

Ako napravimo paralelu sa razvojem koda, reč je o starom, dobrom, zlatnom pravilu da je uzvodni sistem _implementacioni detalj_. Infrastruktura bi trebalo da bude _implementacioni detalj_ - što više puta ponovimo, možda će se nam se zalepiti. API (komunikaciju) definiše korisnik (ovde: `Support`), koristeći svoj domenski rečnik. Kupac je taj koji kaže _šta mu treba_, a ne i _kako_.

Kada komunikacija nije ovako postavljena, dešava se da se trivijalni problemi, kao što je pravo pristupa, rešavaju... za nepoverovati... nedeljama. Svi srećni i zadovoljni.

Retko gde postoji nadahnuta vizija razvoja; a tamo gde je ima bude pretočena u glagolski oblik potencijal, da se programeri ne bi našli uvređeni. Vizije kao da su rezervisane samo za kompanijske all-hands (all-hands, jer nam ne trebaju all-heads) sastanke i PowerPoint prezentacije.