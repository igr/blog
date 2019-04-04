---
title: Kako čuvati dotfiles
date: 2017-08-03T09:53:22+00:00
slug: kako-cuvati-dotfiles
categories:
  - Saveti
tags:
  - backup
  - dotfiles
  - git
  - osx
  - savet
  - shell
  - sync
---

_dotfiles_ je ime za skup konfiguracionih fajlova na linux operativnim sistemima. Konfiguracija najčešće uključuje podešavanja _shell_-a, skriptove, manje alate i sl. Konfiguracioni fajlovi se nalaze mahom u `$HOME` folderu.

<!--more-->

Problem sa konfiguracijom je njeno čuvanje i sinhronizacija sa drugim računarima. `$HOME` folder sadrži puno ostalih foldera i fajlova, te ih nije lako prosto backup-ovati ili sinhronizovati. Potrebno je sačuvati samo određene fajlove i foldere koji čine konfiguraciju, a sve ostalo prosto ignorisati – što ispada da nije tako trivijalno za sisteme za sinhronizaciju (Dropbox, Resillo Sync).

## Upoznajte homera

**Homer** je procedura koju koristim da čuvam konfiguracione fajlove na GitHub-u. Koristi se jedino `git`.

### Početak

Prvo se pravi lokalni **bare Git repozitorijum** u folderu koji će služiti za skladištenje konfiguracije:

```bash
cd ~
mkdir .homer
cd .homer
git init --bare
git config --local status.showUntrackedFiles no
alias homer='git --git-dir=$HOME/.homer/ --work-tree=$HOME'
```

Dakle, pravi se bare repo koji ignoriše fajlove koji nisu eksplicitno dodati u njega. Alias je samo skraćenica za rad sa ovim repom; kako je `detach`-ovan stalno bi trebalo dodavati navedene parametre. Alias bi trebalo i sačuvati u shell skriptama kako bi bio uvek dostupan.

Ako je sve prošlo kako treba, status se može proveriti sa:

```bash
homer status
```

### Povezivanje sa GitHub-om

Lokalni repo sada treba prebaciti na GitHub.

```bash
homer remote add origin https://github.com/igr/homer.git
homer push -u origin master
```

### Sinhronizacija

Kada konfiguracija treba da se podeli na drugom računaru, potrebno je dovući repo sa GitHub-a:

```bash
cd ~
echo ".homer" >> .gitignore
alias homer='git --git-dir=$HOME/.homer/ --work-tree=$HOME'
git clone --bare https://github.com/igr/homer.git $HOME/.homer
homer config --local status.showUntrackedFiles no
homer checkout
```

Slično kao na početku, sa tom razlikom da se repo sada klonira. Komanda `checkout` može da pravi problema ukoliko postoje lokalni fajlovi koji su takođe prisutni i u repo-u.

### Homer na dan

Raditi sa Homerom je jednostavno.

Dodavanje novih fajlova:

```bash
homer commit -m "bin"
homer push

Izmene se preuzimaju prostim:

```bash
homer pull
```

Homere, Simpson si!

## Homer skripta

Na kraju sam i napravio Homer [skriptu za menadžment dotifles](https://github.com/igr/homer).