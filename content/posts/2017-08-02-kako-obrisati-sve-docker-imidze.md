---
title: Kako obrisati sve Docker imidže
date: 2017-08-02T09:53:22+00:00
slug: kako-obrisati-sve-docker-imidze
categories:
  - Saveti
tags:
  - devops
  - docker
  - savet
---

Kada se jednom zaustave i uklone svi Docker kontejneri:

```bash
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
```

ostaje gomila Docker imidža. Svuda preporučuju sledeću komandu za brisanje svih imidža (čak je i sam imam u aliasima):

```bash
docker rmi $(docker images -a -q)
```

Međutim, ona ne radi u slučaju kada je isti imidž tagovan više puta. [Komanda](https://docs.docker.com/engine/reference/commandline/image_prune/) koju bi trebalo koristiti je:

```bash
docker image prune -a
```

Ovim se brišu **baš svi** imidži koji se ne koriste, bez obzira da li su tagovani više puta.