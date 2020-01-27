---
title: Tri alatke za svaki dan
date: 2017-08-15T09:53:22+00:00
slug: tri-alatke-za-svaki-dan
categories:
  - Alati
tag:
  - alat
  - api
  - devops
  - http
  - json
  - mikroservisi
  - pretraga
  - razvoj
  - rest
  - shell
  - skript
---
Razvoj softvera se odavno prelio iz programerskog kruženja (IDE) u stari, dobri _shell_ . Web aplikacije, REST interfejsi, Docker, git... dobar deo vremena provodim u CLI. [bash](https://www.gnu.org/software/bash/) i [zsh](http://www.zsh.org/) su moj izbor. Evo nekoliko baš sjajnih alata koji su neizostavan deo većine mojih dnevnih _shell_ avantura.

<!--more-->

## HTTPie

Stari, dobri [curl](https://curl.haxx.se/) je našao zamenu! Iako je `curl` gotovo standardni alat za svaki rad iz CLI sa resursima na mreži, nikada mi nije potpuno ‘legao’. Moćan je, bez svake sumnje, no kod korišćenja mi svako malo nešto zasmeta, naročtio kada se JSON podaci šalju tamo-vamo.

[HTTPie](https://httpie.org/) je alat iste namene: HTTP klijent za komandnu liniju. Krase ga intuitivan UI, podrška za JSON, sintaksno bojenje, pluginovi... Od prvog trenutka sam ga zavoleo! Korišćenje je vrlo udobno i logično; očigledan je napor autora da svakodnevnu upotrebu dovedu do perfekcije. Podrška za JSON je tek sjajna stvar. Da ne dužim, evo ilustracije:

```bash
http PUT example.org X-API-Token:123 name=John
```

Reč je o `PUT` pozivu, koji sadrži _header_ `X-API-Token`, a telo poziva je JSON objekat sa jednim ključem, `name`. Nema posebnih flegova, nema mučenja oko formatiranja JSON-a, sve je razumljivo.

## jq

Danas gotovo sve komunicira JSON porukama, koje kad-tad treba parsirati. Tu više `sed`, `awk` ili `grep` ne pomažu. Upoznajte [jq](https://stedolan.github.io/jq/) - moćan procesor JSON podataka! Gotovo da ne postoji nešto što se s njime ne može uraditi. Tu su intuitivni filteri sadržaja, tipovi i varijable, agregacija, ugrađeni operatori i funkcije, matematičke operacije... Evo kako sam ga nedavno upotrebio:

```bash
http $URL/v2/posts | jq '[.[] | {title: .title.rendered, date: .date_gmt}] | sort_by(.date) | reverse'
```

HTTP poziv vraća listu članaka. `jq` prvo mapira svaki ogromni objekat u jednostavniji, sa samo dva ključa, zatim tako dobijenu listu sortira po datumu. Ovo je tek delić mogućnosti, prosto je nemoguće sve ovde ukratko opisati. Još jedna sjajna stvar je ["igralište"](https://jqplay.org/#), gde se `jq` može isprobati uživo.

## Ag

Pretraga fajlova po sadržaju je, jasno, jedna od najčešćih akcija koja se izvodi. Nije toliko vezana za programiranje, ali je neosporno potrebno brzo pronaći deo teksta u moru fajlova.

`grep` radi posao, ali je... spor. Većina je čula za `ack` koji slično radi, ali nešto brže. Ipak, tron pripada alatu [ag - silver searcher](https://github.com/ggreer/the_silver_searcher). Prema merenjima, radi 33% brže nego `ack`! U to sam imao prilike da se uverim nebrojeno puta: brzina je impresivna. No `ag` ne zaostaje ni sa funkcionalnostima, a cenim i način kako izveštava o rezultatima pretrage.
