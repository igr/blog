---
title: CMD vs ENTRYPOINT
date: 2017-11-13T11:01:22+00:00
slug: cmd-vs-entrypoint
categories:
  - Razvoj
tags:
  - docker
  - mikroservisi
---

Stvari su pomalo konfuzne kada su u pitanju ove dve `Dockerfile` instrukcije vrlo slične namene. Hajde da pokušam da ih pojasnim.

<!--more-->

## Pojedinačno

Obavezno je da se definiše bar jedna od ove dve instrukcije. Mogu i obe, ali ne može da ne bude ni jedne. Prosto, moramo reći Dockeru šta se startuje kada se kreira kontejner.

Kada se koristi samo jedna instrukcija (ili `CMD` ili `ENTRYPOINT`), njihov efekat je isti.

    FROM alpine
    ENTRYPOINT echo Zdravo!

Ili:

    FROM alpine
    CMD echo Zdravo!


U oba slučaja (izuzimam sav nebitan Docker output):

```bash
> docker build -t oblac .
> docker run --rm oblac
Zdravo!
```

## Shell vs Exec

Obe instrukcije postoje u dve varijante: u tkzv. _shell_ i _exec_ formi. Gore je korišćena _shell_ forma. Ona izvršava komandu (u našem slučaju: `echo`) unutar `/bin/sh -c`. To je najlakše utvrditi listanjem procesa kontejnera.

    FROM alpine
    ENTRYPOINT ping localhost


Sledeće instrukcije:

```bash
docker build -t oblac .
docker run --rm --name pinger -d oblac
docker exec $(docker ps -q -f "name=pinger") ps
docker stop $(docker ps -q -f "name=pinger")
```

rezultuju:

    PID   USER     TIME   COMMAND
        1 root       0:00 /bin/sh -c ping localhost
        7 root       0:00 ping localhost
        8 root       0:00 ps


U _exec_ formi, instrukcije se drugačije definišu - kao JSON array:

    FROM alpine
    ENTRYPOINT ["ping", "localhost"]


a za rezultat daju:

    PID   USER     TIME   COMMAND
        1 root       0:00 ping localhost
        7 root       0:00 ps


Potpuno isto se dešava ako se koristi `CMD` umesto `ENTRYPOINT`.

Dakle, u _shell_ varijanti, proces `PID 1` je `sh`, dok je u _exec_ varijanti to sama komanda definisana instrukcijom.

Korišćenje _shell_ varijante može da bude problem kada želimo da pošaljemo neki POSIX signal kontejneru, jer `/bin/sh` ne prenosi signale _child_ procesu. Ako, na primer, pritisnemo `Ctrl+C` dok radi _shell_ verzija našeg konterjnera, neće se ništa dogoditi.

Preporučeno je da se koristi _exec_ varijanta `CMD` i `ENTRYPOINT` instrukcija. Međutim, pošto ne koristimo `shell` 1) nemamo _environment_ varijable, kao što je `$PATH` i 2) nemamo mogućnost da koristimo _wildcards_, na primer: `*.jar`. Rešenje je da koristimo punu putanju do komandi i eksplicitno navodimo fajlove.

## Zajedno

Da vidimo kako stoje stvari kada u `Dockerfile` postoje i `ENTRYPOINT` i `CMD`.

Ako se koristi _shell_ format za `ENTRYPOINT` , `CMD` se ignoriše.

Ako se koristi _exec_ format za `ENTRYPOINT`, `CMD` takođe mora biti u _exec_ obliku i jednostavno se dodaje na `ENTRYPOINT`.

    FROM alpine
    ENTRYPOINT ["ls", "/usr"]
    CMD ["/var"]


Rezultat:

```bash
> docker build -t oblac .
> docker run --rm oblac
/usr:
bin
...

/var:
cache
....
```

Izvršena instrukcija je: `ls /usr /var`.

## CLI

I jedna i druga instrukcija definisana u `Dockerfile` se mogu zameniti u komandnoj liniji:

```bash
docker run --entrypoint [novi_entrypoint] foo
docker run foo [nova_cmd] [arg1] [arg2]
```

Očigledno da je zamena `CMD` lakša i intuitivnija.

## Kada šta koristiti?

Koristi `ENTRYPOINT` ako ne želiš da korisnici menjaju proces koji se startuje sa kontejnerom. Dodaj `CMD` za podrazumevani argument. Na primer:

    FROM alpine
    ENTRYPOINT ["ping"]
    CMD ["localhost"]

Koristi samo `CMD` kada želiš da korisnici mogu da lako izmene šta će biti startovano sa kontejnerom. To ima smisla, na primer, kada kontejner može da se koristi za više stvari.

Primeri su [ovde](https://github.com/igr/docker-cats/tree/master/cmd-entrypoint).