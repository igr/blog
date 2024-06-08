---
title: "A onda su došli DevOpsi"
date: 2022-10-12T01:07:03+00:00
slug: "a-onda-su-dosli-devopsi"
description: >
  Kao da sve nije već bilo dovoljno komplikovano.
---

Kao da sve nije već bilo dovoljno komplikovano.

p.s. nijedan DevOps nije nastradao tokom pisanja ovog teksta.

Koji je glavni zadatak DevOpsa? Ne, nije da postavi i održava infrastrukturu. **Već da je zakloni.**

DevOps i dalje sadrži "Dev" u nazivu. Da se podsetimo, "Dev" je skraćenica od "Development", što znači "razvoj". Sva pravila i dobre prakse programiranja i dalje da važe.

Jedna od najvrednijih praksi u razvoju je razdvajanje domena. Ko je odgovoran zašta. Ko od koga ište. Dva kruga i strelica; izvor i destinacija. Izvor kaže _šta_ mu treba. Destinacija je zadužena za _kako_ će dostaviti traženo.

Zato postoji API na bekendu. Korisnik je frontend. Web stranicu ne zanima ni koji programski jezik koristimo, ni kako čuvamo podatke, ni kako ih mapiramo, ni koje obrasce programiranja koristimo, dal' je iza monolit ili farma servisa. Web stranicu zanima samo da dobije traženo. Bekend API se ravna prema potrebama stranice. I to je okej.

Bekend na sličan način konzumira infrastrukturu. Bekendu treba baza, udaljeni fajl repozitoriji, event busovi, sakupljanje grešaka, logova, mogućnost skaliranja, pajplajn za razvoj... Bekend ne zanima gde su instance, kako se podešavaju, gde se čuvaju tajne, koja tehnologija se koristi, koji alati, koji repositorijumi su u upotrebi. Na isti način kao što frontend komunicira sa bekendom, tako i bekend želi da komunicira sa infrom.

Štos je u tome što za `FE->BE` komunikaciju imamo jasan protokol: REST, GraphQL ili šta god već treće. Za `BE->Infra` komunikaciju imamo samo... pa, DevOpsa.

Kažu da ako od alata imaš samo čekić, svaki problem liči na ekser. Umesto da zaklanjaju infrastrukturu, DevOps je širom otvara. Rešenja koja dolaze zahtevaju od bekenda da dobrano zagrize u njihov domen, upozna se alatkama i načinima kako rade. Rešenja DevOpsa su, sumarno, samo spisak koraka. "Ako hoćeš da uradiš to, onda prvo uradi ovo i ono". "To ti je sve na wikiju i u fajlu i na drajvu", kaže DevOps. "Samo promeni fajlove u 2 repoa, tamo, to je XYZ format." "Dodaj u ovaj kubernetes manifest." "Koja je to AWS rola?" "Promeni Jenkins konfiguraciju." I tako redom. Preliva se infra domen svuda u bekend.

DevOps rešenje je _procedura_. Lak izgovor za ne biti dev. To nije okej. Procedura je implementacija. Nije interfejs.

Ako bi ovakav stav preneli na `FE->BE` komunikaciju, to bi izgledalo ovako nekako. Umesto API-ja, bekend bi postavio programski obrazac u bilo kom programskom jeziku, a frontend bi sam pisao kod ili SQL upit za podatke koji mu trebaju.

Zaigrani svojim igračkama, DevOpsi zaboravljaju na `Dev` deo svog inženjerskog poziva. DevOps rešenja ne bi trebalo da su procedure.

Bez namere da povredim nečija osećanja: hajde da zasučemo rukave i bacimo se i na programiranje, može? Vreme je već.
