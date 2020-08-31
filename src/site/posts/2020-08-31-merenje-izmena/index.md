---
title: "Merenje izmene"
date: 2020-08-31T01:07:03+00:00
categories:
  - Razvoj
tag:
  - razvoj
  - izmena
  - programiranje
  - merenje
---

Rešavaš grešku na produkciji. Spreman si da komituješ ispravku. Utom uočiš prost, ali ne i trivijalan 'code smell' koji bi da počistiš.

Šta ćeš uraditi? Da li ćeš uključiti i čišćenje koda sa ispravkom?

<!--more-->

Evo sličnog pitanja. Postoje 2 izmene na čekanju:

1. jedna sadrži `100` novih linija u jednom fajlu.
2. druga sadrži izmene u `3` fajla, svega `14` dodatih linija, `28` obrisanih, na `4` različita mesta.

Koji je od ova dva pull-requesta "lakši"?

## Dva put meri

Verovatno ste u oba slučaja došli do nekog odgovora u glavi: mogli bi da odgovorite na pitanja da su vam predočena na projektu ili u razgovoru za posao.

Nažalost, pogrešili ste. Odgovor nije tačan.

Huh!? Tako je: kako god da odgovorite na pitanje, niste u pravu. Odgovor do koga ste došli je zasnovan na 'osećaju', potpomognut iskustvom. Takav odgovor nas svrstava u zanatlije. Gde je tu nauka?

Ako obratimo pažnju na drugo pitanje - čak i bez predstave o kodu i istoriji - rezonovali bi da je prva izmena kognitivno "lakša". Druga izmena zahteva veći napor, te i razumevanje onoga šta menjamo. Kako bilo, takvo rezonovanje treba pretvoriti u metriku koja to nedvosmisleno potvrduje.

Drugim rečima: možemo li izmeriti uticaj izmena koda?

Ne postoji apsolutna skala kojom se ovako nešto može meriti - jer je nemoguće imati univerzalnu referentnu vrednost. Zato bi trebalo iznaći _relativne_ metrike, koje važe za projekat, tim, pojedinca. Mnogo toga se može meriti.

`Code Churn` je termin koji označava izmenu nedavno napisanog koda. Kada inženjer promeni takav kod (na pr. napisan u poslednje 3 nedelje), praktično anulira sav uloženi napor za sve te linije koda koje su prepisane i obrisane: one kao da i nisu ni postojale.

Zanimljva je i `TT100` - vreme potrebno programeru da napiše 100 produktivnih linija koda. Ono se smanjuje vremenom. Međutim, ukoliko ovo vreme sadrži i `Code Churn` i njega treba akumulirati u merenje. To što napišeš 100 linija za sat vremena ne znači mnogo ako si time obrisao posao koji je prethodno oduzeo dva sata; šta više, u minusu si s vremenom.

Dalje, kako izmeriti uticaj (_impact_) izmene? Da li postoji _važniji_ deo koda? Koja je razumna granica za pokrivenost koda testovima? Da li je vreme koda do produkcije isto važno za odluku o izmeni? Koliko kompleksnost koda utiče na domet izmene?


# CIA, snajka

Merenje uticaja izmena se odavno izučava - o CIA (Change Impact Analysis) se prvi put piše sredinom devedestih godina prošlog veka. Postoje ustraživanja na temu; no ne vidim da ih uvrštavamo u svakodnevne prakse. Dizajn paterni su i dalje mnogo više kul.

Merenje CIA je svakako kompleksno. No pokazuje se da čak i jednostavne metrike mogu da ukažu na kvalitet rezultata. Prosto brojanje dodatih, oduzetih i, naročito, izmenjenih linija - koje je lako izvući iz modernog VCSa - su u korelaciji sa brojem naknadno utrvđenih grešaka, kako istraživanja potvrđuju.

Važno je da se ne zaboravi ideja merenja. CIA nikada neće moći da bespogovorno oceni izmenu, ali je tu da podigne crvene zastavice, kako bi srenula pažnju na moguće propuste. To nikako nije mala vrednost.

Zato, na kraju, da naglasim o čemu pričam: imamo priliku da uvedemo metriku koda i rada inženjera. Zato: hajde da u odgovore na pitanja sa početka teksta uvrstimo i analizu, kako bi se što manje oslanjali na 'osećaj'. Hajde da delimo važna saznanja i iskustva na ovu temu.

Počni da meriš kod.
