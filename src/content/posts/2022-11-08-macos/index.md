---
title: "Apple ne voli macOS"
date: 2022-11-08T01:07:03+00:00
slug: "apple-ne-voli-macos"
description: >
  Eplu, bre, kada ćeš više zavoleti macOS?
  Zapisi iz razvoja.
---

Eplu, bre, kada ćeš više zavoleti macOS?

Zapisi iz razvoja.

Napravio sam jednostavnu aplikaciju za macOS ([Clmn](https://clmnapp.com)), delom kako bih i naučio o ekosistemu. Jedan od zahteva je bio da aplikacija izgleda kako sam zamislio: da ne zavisim od podrazumevanih podešavanja i izgleda. Nije reč o nekakvom spejs-šatlu dizajna; više je u pitanju odsustvo viška, minimalizam.

Swift kao jezik je korektan. Ima nekih čudnoća (`in` keyword u lambdama), ali i kul stvari, kao što je dvojako imenovanje argumenata i sl. Kako bilo, piše se lako i tečno.

SwiftUI takođe izgleda poznato, što je dobra stvar. Ekrani se deklarativno opisuju, a stanje ih menja; frejmvork sam radi detekciju promene stanja. Deo koji me malo žulja u svakodnevnom radu - a nije vezan samo za SwiftUI, nego i za ostala slična rešenja - je lepo razdvajanje komponenti. Nekada komponenta zahteva puno argumenata, pa mi je lakše da je samo odvojim u istoj klasi, iako bih radije da bude zasebna. Ili kada se deo funkcionalnosti mora pridodati na okolni kontejner, pa je logika podeljena na dva solidno razdvojena mesta u kodu. Ovo se _sigurno_ može rešiti na pravi način, no kao i uvek u praksi, dešava se da komplikovan ekran ostane komplikovan, a mali ekrani budu lepo razdvojeni.

SwiftUI Data je radio bez glavobolje, osim što je zahtevao da polja budu opciona, što nisam želeo. Podsetilo me je sve na ORM, pa sam radosno prigrabio alternativu, čak i po cenu pozamašne promene koda.

[Fridge](https://github.com/vexy/Fridge) je sjajna alternativa domaćeg autora. Reč je o jednostavnoj, elegantnoj i maloj storage biblioteci. Meni treba samo OM iz ORM: `Fridge` radi baš to - snima i učitava entitete (lokalno ili sa api-ja). I to je sve. Radi bez greške i nametanja. Hvala [Vexy](https://www.linkedin.com/in/veljkotekelerovic/)!

Kreću bolne teme. Dostupne SwiftUI komponente liče na beta verziju koju bi proizvela firma koja nikada nije videla UI. Preterujem iz frustracije, ali stvari rade samo ukoliko se koriste bez većih odstupanja od uobičajenog ponašanja.

Da krenem od `NavigationList`. Radi isključivo ako se ne dira. Čim sam probao da samo malo izmenim izgled side-bar dugmića, nije radilo kako sam zamislio. Imalo je veze da li koristim `List` i/ili `ForEach`. Ne postoji način da se isključi deselektovanje izbora. Ne osvežava sadržaj kada se pokrene aplikacija ukoliko je side-bar bio saklonjen. Na kraju sam napravio svoju komponentu. Ni to nije išlo baš lagano (clip view-a preliva na okolinu, hover poludi i sl), ali na kraju sve radi _mnogo_ bolje.

Ok, možda je navigacija kompleksna stvar za Eplove inženjere. Kako stojimo sa poljem za unos teksta? `TextEdit` kao da je beta verzije firme koja izvozi paradajz, a ne Epla. Kako ima malo opcija za konfiguraciju, morao sam da napišem (opet!) svoju komponentu iznad `NSTextView`. Što se tiče konfiguracije, stvari su bolje - ukoliko zanemarimo džak bagova i mačku pride. Ukoliko je emoji na početku, komponenta poludi. Kurzor ne može da se samo postavi na kraj, već moram da ga 1) sakrijem, 2) async postavim na kraj i 3) vratim mu boju. Zaista, Eple? Neke bagove i dalje ne umem da prevaziđem.

Probaj da dodaš tvoj `About` prozor, a da ne koristiš app delegate. Probaj da postaviš temu, a da se primeni i na `sheet`. Probaj da minimizuješ i vratiš prozor kako treba. Puno sreće ako koristiš `Form`. I tako redom... Neuobičajeno puno toga je potrebno da se _dodatno_ uradi kako bi aplikacija izgledalo bar malkice bolje, a da ne liči na primer iz knjige. Neuobičajemo puno toga je potrebno da se _dodatno_ uradi kako bi samo obećano radilo onako kako je opisano. Inače, Eplovi tutorijali su odlični, interaktivni; ali sve to malo vredi kada je zvanična dokumentacija samo spisak metoda i kratak opis koji mnogo toga ostavlja mašti.

Na kraju: poznato je da treba platiti 99$ godišnje da bi uopšte mogli da postavljate aplikacije na AppStore. Štos je što moja prijava za dev nalog ostala neodgovorena već, evo, mesec dana. Neće Epl moje pare, pa to ti je :)

Zaključak: macOS razvoj je zapostavljen. Vredi uložiti u njega samo ukoliko planirate više aplikacija; broj besmislenih detalja na koje treba vanredno obrati pažnju je nerazumno veliki. Prihvatam da su mobilni uređaji prioritet, ali ne prihvatam izgovore za stanje sa macOS razvojem.
