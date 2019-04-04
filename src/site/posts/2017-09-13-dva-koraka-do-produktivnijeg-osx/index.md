---
title: Dva koraka do produktivnijeg OSX
date: 2017-09-13T09:53:22+00:00
slug: dva-koraka-do-produktivnijeg-osx
categories:
  - Alati
  - Saveti
tags:
  - alfred
  - osx
  - produktivnost
  - savet
  - shell
---
Urbana legenda kaže da je jedan od osnivača Gugla (nije jasno koji) sažeo premisu većine (u tome vreme budućih) proizvoda na sledeći način:

<!--more-->

> Ne pamti, već potraži!

Da se vratim korak nazad. Za očekivati je da čovek razmišlja kako da optimizuje svoje radno okruženje, u kome provodi toliko vremena. Tu su prečice, skraćenice, aliasi, pomoćni programi... šta sve ne. Čime god se bavili, dve stvari su deo svačije svakodnevice: izvršavanje CLI komandi i operacije nad fajlovima.

## Zaboravi aliase!

Ako boravite u konzoli, poželećete da ubrzate rad s komandama koje često koristite. Dobar primer su `git` ili `docker`, imaju pregršt opcija. Svako od nas, opet, ima svoj neki set opcija koje iznova i iznova koristi.

Za takve stvari se obično koriste [aliasi](https://en.wikipedia.org/wiki/Alias_(command)). Najčešće se dugačke komande zamenjuju aliasima, često imenovanim vrlo kratko (2-3 slova). Na primer:

```bash
alias lsf=' for f in *; do [[ -f "$f" ]] && ls -- "$f"; done'
alias lt=' ls -lhart'
alias dpsa='docker ps -a --format "table {{.ID}}\t{{.Image}}\t{{.Status}}\t{{.Names}}"'
```

Komande ponekada imaju i poseban način za definisanje skraćenica, kao što to ima `git` u `.gitconfig`.

Šta je ovde problem? Pa, vremenom, broj aliasa i skraćenica postaje nezanemarljiv. Tako sam, na primer, u jednom trenutku imao toliko aliasa da ako bih otkucao dva ili tri nasumična slova, bila bi velika šansa da sam zapravo potrefio ime nekog od aliasa! Naravno, posle par dana nekorišćenja određene grupe srodnih aliasa, one bi prosto izbledele iz pamćenja; eto mene ponovo na početku, gde zbog nemogućnosti da se setim aliasa, opet pišem celu komandu.

Da bih rešio ovaj problem, promenio sam pristup i primenio gore citiranu mudrost tvoraca Gugla. Počeo sam da koristim [zsh](http://www.zsh.org) - _shell_ koji kida. Aliase sam rezervisao samo za stvari koje koristim baš često. Sve drugo i što je iole komplesnije, pišem u skriptama. Tu je i kvaka: skripte nazivam dugačkim, opisnim imenima. Koristim [Yoda](http://www.starwars.com/databank/yoda) način izražavanja: prvo ide objekat, sledi akcija nad njim, pa opciono argumenti. Na primer:

```bash
docker-clean-nuclear.sh
osx-bootstrap.sh
git-delete-local-merged.sh
```

Pretraga i _autocomplete_ u `zsh` rade sjajno; kada mi nešto zatreba jednostavno počnem da kucam šta želim da uradim i _autocomplete_ odradi svoj posao. `Zsh` ima _fuzzy_ pretragu tako da je dovoljno otkucati, na primer, samo `git-dllo` da se locira gornji skript.

Ako bismo otišli korak dalje, preporučio bih [fzf](https://github.com/junegunn/fzf), koji se sasvim lepo uklapa u ovaj pristup.

## Alfrede, uradi!

Raditi s fajlovima u grafičkom okruženju često izgleda ovako: prvo se pokrene program koji treba da ih koristi/obradi, pa se u njemu otvore fajlovi ili se tu prevuku. Prirodnije je obratno: izabrati prvo fajlove, pa tek onda operaciju nad njima. OSX podržava ovaj koncept u vidu [servisa](https://www.macosxautomation.com/services/). Ali... imam par problema s njima. Prvi problem sa servisima je da ne mogu jednostavno da dođem do njih koristeći samo tastaturu. Broj servisa takođe vremenom može da poraste, te se gomilaju (naizgleda bez reda) u jednom te istom meniju. Kada konačno uspem da dođem do menija kojekakvim _hackovima_, nema inteligentnije pretrage po njemu, pa se na kraju sve svodi na to da gledanjem tražim ime akcije koja mi treba. Ne postoji ni lak način da prosledim opcije akciji. Sve u svemu, nije baš produktivno.

Osim što [Alfred](https://www.alfredapp.com) (moj verni, dugogodišnji prijatelj) može da potraži i pretraži gotovo šta god zamislili, ima još jednu sjajnu funkcionalnost: _File Actions_. Reč je o akcijama nad grupom fajlova. Najbolje da to objasnim na primeru.

Ponekada imam potrebu da smanjim dimenzije slika (Retina i skaliranje i sve to). Želeo sam da imam sledeću mogućnost: selektujem fajlove, otkucam nameru tj. ime akcije (ovde: _resize_) i izaberem jedan od ponuđenih procenata za meru umanjenja slike; sve to samo pomoću tastature. O, da. Može Alfred to:

![](alfred-resize.png)Evo koji su koraci:

  + Sve počinje selektovanjem fajlova u _bilo kom_ programu (dakle, ne samo `Finder`). Posebna Alfredova prečica za rad sa selektovanim fajlovima je `CMD+ALT+\`. Ona otvara spisak akcija koje se mogu izvršiti na izabranim fajlovima. Naravno, akcije se mogu filtrirati po tipovima fajlova; ova konkretna radi samo za fajlove koji su po tipu grafičkog formata. Izbor akcije se radi kao i sve drugo u Alfredu: jednostavnim kucanjem delova naziva (opet _fuzzy_), strelicama itd.
  + Sledeći korak je smeštanje imena fajlova.u privremeni fajl. Naime, varijable u Alfredu su samo stringovi, i jedini način da niz fajlova ostane niz je da ih snimimo u privremeni fajl. Dobra stvar je da se ovo može uraditi skriptom, tako da se ovaj korak jednostavno dodaje.
  + Potom sledi izbor procenta smanjenja. Reč je o jednostavnoj listi (50%, 25%,...) koja se pojavljuje kao i sve drugo u Alfredovom interfejsu, te se takođe lako bira željeni procenat.
  + Konačno, pripremaju se argumenti za finalni korak. Ovde ih imamo dva: izabrani procenat i ime privremenog fajla sa listom izabranih fajlova.
  + Ostaje još samo da pozovemo spoljni shell skript da odradi posao.

Sjajno, zar ne?