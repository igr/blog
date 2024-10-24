---
title: "IO Monad na Javi"
date: 2024-10-24T01:06:08+00:00
slug: "io-monad-na-javi"
description: >
  Na klupici tik pored ulaza je skrušeno sedeo dečačić i držao sladoled na štapiću. Dečak kao da nije mario za bilo šta; sladoled se topio i lepljivo kapao na pod, a suze su mu musavile rumene obraze.
---

Tek što sam ušao u park, začuo sam ridanje. Na klupici tik pored ulaza je skrušeno sedeo dečačić i držao sladoled na štapiću. Dečak kao da nije mario ni za šta; sladoled se topio i lepljivo kapao na pod, a suze su mu musavile rumene obraze. Prišao sam mu pažljivo: "da li ti treba pomoć?" Dečak je podiglao glavu, pogledao me velikim, tužnim očima, i odgovorio mi pitanjem: "Zašto... šmrc.. zašto u Javi...nema IO Monad?" Taman sam seo do njega da mu objasnim kako stoje stvari, kada se niotkud furiozno stvorila jedna ljuta žena, koja povika upirući prstom u mene: "Ti! Ti si mu otac, Oblače; proklet da si! Eno u školi, neće da se igra OOPa kao ostala normalna deca, prokleti da ti bili geni, a prokleto da je i ono veče naše nesputane, divlje, akademske ljubavi!"

Siguran sam da nikada niste poželeli da znate kako bi izgledao IO Monad u Javi, a kamoli da pročitate nešto o tome. Zato je potreban dramatičan uvod koji ima dvostruku funkciju: da privuče nestalnu pažnju, ali i da posluži kao (labava) metafora: naš protagonista procesira različite spoljašnje IO efekte koji mu se dešavaju u priči.

[Monad](https://oblac.rs/monad/) je kontejner vrednosti sa bar dve operacije: `lift` kojom se vrednost stavlja u kontejner i `bind` kojom se mapira jedan monad u drugi kakvom funkcijom. Suština Monada je kompozicija. Kroz niz `bind` poziva, ulaz se polako transformiše u rezultat. Najprostije: stavimo vrednost u kontejner kao u kakav lonac i potom dosipamo funkcije kojima modifikujemo vrednost koja se krčka.

Monade postoji svuda. Svaka lista je monad; `Optional`, `Result`, `Either` su takođe monadi. Monad bi, verovatno, bio manje strašan kada se ne bi koristio u nazivu.

## IO

IO Monad je monad za IO operacije; siguran sam da ste ostali bez teksta pred ovakvo jasnom definicijom.

Čiste funkcije zavise samo od ulaza, determinističke su. Upravo su zato bolje od sladoleda od maline: mogu se kombinovati, izvršavati paralelno, zameniti svojim rezultatom. Međutim, program se ne može napisati samo čistim funkcijama: neke moraju da se zaprljaju, jer rade sa ulazima i izlazima. Da bi ovakve spoljne "efekte" držali pod kontrolom, potreban nam je kakav kontejner za odlaganje nuklearnog IO otpada, dakle, monad.

Ovo nije potpuno tačno (a i šta zači "pod kontrolom"?) U ispravnijim programskim jezicima to je i _jedini_ način za rad sa IO. Dakle, ukoliko treba ispisati nešto na ekran, raditi za bazom, generisati slučajan broj - sve su to ne-čiste funkcije, te ih onda stavljamo u IO monade (kontejnere), čime izvršavanje sada postaje odloženo, jer je zamenjeno vrednošću. Jezici u kojima postoje samo čiste funkcije, IO monad je jedini način da se ovakve operacije izvrše.

## Java

Cela zavrzlama ovog teksta je krenula od starog primera na koji sam slučajno nabasao; rekoh, šteta da se baci. Kako bilo, kul praksa za samo-pojašnjavanje principa nekog programskog jezika je implementacija istih u drugom jeziku. Evo kako bi IO monad izgledao u primitivnoj sredini:

```java
public sealed interface IoMonad<T> {
	<R> IoMonad<R> map(Function<T, R> mapper);
	// `>>=` operator
	<R> IoMonad<R> bind(Function<T, IoMonad<R>> mapper);
	// `>>` operator
	default <R> IoMonad<R> then(IoMonad<R> next) {
		return this.bind(ignored -> next);
	}
	static <T> IoMonad<T> of(Callable<T> computation) {
		return new DefaultIoMonad<>(computation);
	}
	T run() throws Exception;
```

Ovo je verovatno jednostavnija implementacija (ceo kod je na linku niže). `map` i `bind` su osnovne operacije monada. `then` je samo skraćenica za `bind` koja ignoriše rezultat prethodnog monada. `run` je metoda koja pokreće izračunavanje - ona, suštinski, nije deo interfejsa; ovde je samo zbog jednostavnosti.

Kako korišćenje izgleda u praksi:

```java
final var game = IoMonad
		.of(() -> out.println("Welcome to the Guessing Game!"))
		.bind(ignored -> generateRandomNumber())
		.map(number -> number + 1)  // [0, 100) -> [1, 100]
		.bind(number -> IoMonad.of(() -> {
			out.println("Guess a number between 1 and 100.");
			return number;
		}))
		.bind(GuessingGame::guessLoop);

try {
	game.run();
} catch (Exception e) {
	e.printStackTrace();
}
```

Ceo kod je prevelik za tekst, imate ga [ovde](https://github.com/igr/void/blob/master/java/src/main/java/v/o/i/d/iomonad/IoMonad.java).

Šta to imamo? Cela igra je samo - vrednost. Sva izvršavanja su odložena za kasnije, kada se igra konačno startuje. Svaki rad sa IO je spakovan u monad i njegovo izvršenje je delegirano. Čiste funkcije se primenjuju kao jednostavna mapiranja. Konačno izvršavanje programa se dešava tek kada se pozove `run` metoda. A ako se razmaštamo, mogli bi da insistiramo da `main` vraća IO monad, koji bi se izvršio van našeg pogleda.

"Ček bre", viknu majka onog dečaka: "Pa ovo je kao `CompletableFuture`!" Aha, liči - jer `CompletableFuture` jeste monad namenjen (i prilagođen) za asinhrono izvršavanje koda.

Kako se u Javi ne može otići dalje, nemamo priliku da "osetimo" potrebu pisanja ovakvog koda. Java kod se formira strukturalnim blokovima, a ne kompozicijom funkcija, te ovakve ideje ne mogu da se prenesu na valjani način, osim kada ne rešavaju konkretan problem: kao što je asinhrono izvršavanje ili korišćenje `List` monade. Sintaksa nam ne brani da činimo šta nam se prohte, pa onda to i radimo.

## Šta iz ovoga možemo naučiti

Šta uplakan dečak može da nauči iz ovoga? Jer, jasno, nema tog Java programera koji bi ovako pisao kod. Tečo Bob bi se morao da odbroji deset zdravo-TDD sesija i opere se svetOOPm vodicom kada bi ugledao ovakav primer. S pravom, nećemo u Javi pisati ovako...

Ako bih se fokusirao samo na IO Monad, Java programeri (plus tečo) bi mogli da obrate pažnju na sledeće:

+ Izuzeci. Nema bacakanja izuzecima - oni se pretaču u domenske greške utkane u rezultate.
+ Pošalji SMS za bolji kod. Pišite čiste funkcije kada god možete. Grupišite IO pozive kada god možete.

Ovde je trenutak da podignete dva prsta za pitanje: da li su metode klase čiste funkcije?

Čistoća funkcije je vezana i sa imutabilnošću: ukoliko funkcija primi argument `A` koji se može promeniti za vreme rada funkcije, onda je funkcija nečista. Ukoliko je stanje klase promenjivo, metode nisu čiste, jok.

"Pa šta, briga me, valjda su objekti važniji!" uzviknu Maricija, majka dečaka; vreme je da joj damo ime i latinsko-američko poreklo. Nisu. Čiste funkcije su mnogostruko vrednije. "Kažeš ti", frknu ona. "Gde ti je taj Bob, bolji je frajer od tebe!"

## Kako zaista izgleda

Pošto je ovaj jedan lagan komad, red je da ga isto tako lagano završimo, veridbom teče Boba i Maricije:

```haskell
import System.Random (randomRIO)

main :: IO ()
main = do
  putStrLn "Welcome to the Guessing Game!"
  number <- randomRIO (1, 100) :: IO Int
  putStrLn "I'm thinking of a number between 1 and 100."
  guessLoop number

guessLoop :: Int -> IO ()
guessLoop number = do
  putStr "Take a guess: "
  guess <- getLine
  case reads guess of
    [(g, "")] -> checkGuess g number
    _ -> do
      putStrLn "Please enter a valid number."
      guessLoop number

checkGuess :: Int -> Int -> IO ()
checkGuess guess number
  | guess < number = do
    putStrLn "Too low! Try again."
    guessLoop number
  | guess > number = do
    putStrLn "Too high! Try again."
    guessLoop number
  | otherwise = putStrLn "You guessed the right number!"
```

Ostatak koda je... nepostojeći: ovo je ceo program :) "Gde su ovde monade? Pa ovo je nekakav proceduralan kod!" Drago mi je da ste primetili. Jezici u kojima je monad prirodna (i ugrađena) stvar, ne zahtevaju da se eksplicitno koriste. Korišćenjem `do` notacije, koja je sintaksni šećer, omogućava se pisanje monadskog koda kao da je običan proceduralni kod. I to je to.

Idemo dalje.
