---
title: "Optimizacija StackOverflow"
date: 2022-10-28T01:07:03+00:00
categories:
  - Razvoj
tag:
  - razvoj
  - programiranje
  - optimizacija
  - stackoverflow
---

Propušteno zicer pitanje.

<!--more-->

StackOverflow je poznat i po tome da ga pokreće monolit. Prema onome što sam čuo, reč je o nekih desetak skaliranih instanci monolitne aplikacije i baze iza. To je sve što je potrebno za jedan od najposećenijih sajtova na svetu (u prvih 200).

Ovaj podatak ne iznenađuje; pobornik sam `WYNIWYU` (vini-viju) pristupa - What You Need Is What You Use. Skraćenicu je skovao ili Džobs ili ja; podseća nas na to da se ne zalećemo, već promislimo. Da li nam treba, šta dobijamo, šta gubimo. Što više odgovora imamo to odluku čini _stabilnijom_; to je možda jedna od najvažnijih odlika dobrog softverskog dizajna.

Nedavno sam slušao intervju sa inženjerkom pomenute firme. Očekivano, pričalo se i o monolitu, zdravom rezonovanju: tim StackOverflow ne odbacuje mikroservise; neprestano, po njenim rečima, istražuje i meri šta bi _njima_ takvo rešenje donelo - i do sada nemaju potrebu za promenom arhitekture.

U toku intervjua, inženjerka je pomenula jedan od razloga zašto im monolit radi: optimizacija koda (i infrastrukture). Navodno, tim piše kod koji je optimizovan. To mi je odmah uhvatilo pažnju - nažalost, voditelj je olako prešao preko odgovora, a priča se nastavila dalje.

> Koliko nas "košta" optimizacija?

Optimizacija ima svoju težinu. Kao i za izbor arhitekture, moraju da postoje odgovori.

Kako se meri uspešnost optimizacije? Kao neko [opsednut performansama koda](https://github.com/igr/java-benchmarks), znam da to uopšte nije jednostavno niti brzo (dobar JMH test samo jedne pretpostavke zna da traje desetak minuta). Dalje, optimizacija uvek narušava strukturu koda. Kod se razlaže, uvećava, i neosporno - kvari. Svašta sam video: od korišćenja samo statičkih metoda, preko eksplicitnog korišćenja `append()` umesto `+` za združivanje stringova, do mutiranja svakakvih objekata kako bi se GC okinuo što manje puta. Kako uopšte uporediti kvalitet koda i dobre performanse? Da li su ove dve metrike povezane?

Optimizacija takođe traži precizna očekivanja, pretpostavku. Svaki put kada mi traže da odziv stranice bude koliko-god-delova-sekunde, samo slegnem ramenima. Taj zahtev apsolutno ništa ne znači; mogli su da zatraže i da odziv bude plavog ukusa. Pravi zahtev bi uvrstio i očekivani saobraćaj za pomenuti odziv, statistički raspored saobraćaja, vrednosti [percentila](https://oblac.rs/koji-si-percentil/) odziva, kao i broj drop-outa - nabrajam onako iz glave.

Kako uopšte znamo da neki deo koda zaista utiče na performanse celog sistema? Šta ako se on, na primer, izvršava u pozadini: da li traje jednu sekundu ili jednu desetinku možda uopšte nema nikakvog uticaja na ceo sistem. (Naravno, nije ovo izgovor da pišemo svakav kod.)

Rezultate ogleda optimizacije se neprestano moraju proveravati. Tehnologija napreduje, stvari se menjaju; neki zaključci prestaju da imaju vrednost. Da li onda radimo refaktoring koda unazad i otklanjamo nepotrebnu optimizaciju? Na ovu temu: postoji izveštaj izvesnog inženjera Gugla napravljen pre desetak godina koji meri i dokazuje da na današnjim procesorima multi-threading ne predstavlja problem kakvim se predstavlja, te da za NIO načinom rada (broj threadova == broj procesora) nema i potrebe. Zanimljivo, nikada nije bilo ikakvog odgovora na ovaj izveštaj; niti znam da se nešto smisleno promenilo. Ne znam da li je ova konkretan izveštaj ispravan; no pitam se, koliko takvih ideja uzimamo zdravo-za-gotovo? Retko koja odluka u svetu tehnologija prolazi kroz kakav peer-review, kao što je slučaj sa naučnim radovima. Iz nekog čudnog razloga, programeri toliko žude da budu shvaćeni kao [umetnici](https://oblac.rs/neostvareni-umetnici-razvoja/), a nimalo [naučnici](https://oblac.rs/pisanje-programa-umetnost-ili-nauka/).

Optimizacija je detalj koga svi članovi tima moraju biti svesni, kako ne bi narušili postojeće. To tek zahteva dodatnu komunikaciju. Treba objasniti: nećemo koristiti uobičajena rešenja, već naše. Kako ćeš to predstaviti tako da svi _prihvate_ odluku na ispravan način?

Da li je StackOverflow mogao da prođe sa manje optimizacije, ali sa par servera više? Da li je cena rada tih par servera veća od cene sporijeg razvoja i [optimizacijom nagriženog koda](https://oblac.rs/optimizacija-i-realizacija/)?

Pandorina kutija pitanja zjapi otvorena.