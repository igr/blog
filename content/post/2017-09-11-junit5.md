---
title: JUnit 5
date: 2017-09-11T09:53:22+00:00
slug: junit5
categories:
  - Prikaz
  - Razvoj
tags:
  - framework
  - junit
  - prikaz
  - razvoj
  - test
---

Izgleda da je [Jupiter](https://www.nasa.gov/jupiter/) ove godine zvezda sunčevog sistema. [JUnit](http://junit.org/junit5/), softverski alat za pisanje unit-testova, je koliko juče doživeo peto izdanje, na kome se radilo čak dve godine. Sastoji se od platforme i od, eto, _Jupitera_, kako su već nazvali kombinaciju novog programskog modela za pisanje testova i modela za proširivanje u vidu ekstenzija. Evo sažetka novosti.

<!--more-->

## Setup

Nova verzija donosi nova imena artefakata i Java paketa. Da krenemo od Gradle skripta, u kome se novi JUnit potražuje sa:

```
group: 'org.junit.jupiter', name: 'junit-jupiter-engine', version: '5.0.0'
```

ili, ako vam je Maven bliži:

```xml
<dependency>
	<groupId>org.junit.jupiter</groupId>
	<artifactId>junit-jupiter-engine</artifactId>
	<version>5.0.0</version>
</dependency>
```

Novi paketi su:

```java
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
```

Kao što rekoh, družićemo se s Jupiterom 🙂 I da ne zaboravim - novi JUnit zahteva Javu 8!

## Testiranje, uopšteno

Suština je ostala ista: test metode se označavaju `@Test` anotacijom, a za proveru ispravnosti se koriste statičke metode iz `Assertions` klase. Novost je da test klasa više ne mora da bude javna (`public`).

Tu je i anotacija `@DisplayName` za kratak opis namenjen ispisu na ekran, koja se može postaviti i na metode i na klase.

Metode za proveru tačnosti (aserti) su unapređene. Za početak, umesto poruke se može koristiti lambda izraz koji vraća poruku:

```java
assertTrue(foo > 7, () -> "Value must be greater then 7");
```

Primer nije najbolji pošto ovo ima smisla onda kada se poruka konstruiše iz delova, pa se na ovaj način to odlaže do trenutka kada poruka zaista zatreba, čime se dobija na performansama.

Interesantnija je nova metoda, `assertAll`:

```java
assertAll("foo-bar",
	() -> assertTrue(foo > 7),
	() -> assertEquals(bar == 12)
);
```

Ovde će se izvršiti svi izlistani testovi, bez obzira da li je neki u međuvremenu pao; a u slučaju greške baciće _exception_ sa informacijama o svim nastalim greškama.

Za testiranje nizova i kolekcija, tu su metode: `assertArrayEquals` i `assertIterableEquals()`. Interesantna je mogućnost testiranja liste stringova naspram regularnog izraza:

```java
List<String> expectedLines = Collections.singletonList("(.*)@(.*)");
List<String> emails = Arrays.asList("igor@gmail.com");
assertLinesMatch(expectedLines, emails);
```

Pošto JUnit 5 radi na Javi 8, to znači i da je moguće koristiti `default` metode kao test metode, kao i da se one mogu označiti JUnit anotacijama. Ova mogućnost može da značajno unapredi organizaciju test koda.

## Assumptions

Pretpostavke (_assumption_) kontrolišu izvršavanje testa na osnovu datog uslova:

```java
assumeTrue(external != null);
assertEquals(3, external.foo);
...
assumingThat(
	external != null,
	() -> assertEquals(3, external.foo);
);
```

Drugim rečima, ukoliko pretpostavka nije ispunjena, test se prekida (baca se `TestAbortedException`). To ne znači da je test neuspešan, već samo da nisu ispunjeni preduslovi za njegovo izvršenje. Najčešće se ovakav test prosto označi na poseban način (da je izuzet iz testiranja). Pretpostavke se koriste da potvrde stanja koja su definisana van testova, a neophodna su da bi test ispravno radio; no nisu u direktnoj vezi sa onim što se testira.

## Exceptions

Konačno je dodata pomoć za testiranju _exceptiona_:

```java
Throwable throwable = assertThrows(SomeException.class, () -> {
	callMethodThatThrowsSomeException();
});
```

Nema više dosadnih `try`-`catch` blokova ili `@Expected` anotacija.

## Disabled

Nova anotacija za isključivanje testova je `@Disabled`. Ekvivalentna je nekadašnoj `@Ignore` anotaciji.

## Nested testovi

Ugnježdeni testovi su još jedan način kako se testovi mogu grupisati i kojima se definišu veze između ovih grupa. Primera radi, zamislite da imamo biznis klasu `BookService` sa par metoda: `addBook()`, `updateBook()`, `deleteBook()`. Test sa ugnježdenim testovima bi mogao biti napisan ovako:

```java
public class TestBookService {
	@Nested
	@DisplayName("Test Add Feature")
	class AddFeature {
		@Test
		void testBookNameMissing()...
	}

	@Nested
	@DisplayName("Test Update Feature")
	class UpdateFeature {
		@Test
		void testChangeBookName()...
	}
}
```

Ugnježdeni testovi su prosto inner klase testne klase.

## Tagovi

Dalje, tagovi. Pre smo imali kategorije, sada imamo tagove - još jedan način da se testovi grupišu i potom filtriraju:

```java
@Tag("Test case")
public class TaggedTest {
	@Test
	@Tag("important")
	void testMethod()...
}
```

Testovi se sada mogu uključiti i isključiti prostim navođenjem liste tagova.

## Zbogom `Runner`, `Rule` i `ClassRule`!

Jedna od stvari koja mi se baš dopala je to da je JUnit 5 izbacio `Runner`, `Rule` i `ClassRule` klase. Nikada mi se sasvim nije dopalo kako se koriste u praksi. U novoj verziji JUnit-a one su mudro zamenjene samo jednim koceptom - modelom za ekstenzije.

Ekstenzije se primenjuju deklarativno, anotacijom test klase ili metode s `@ExtendedWith`. Na primer, ukoliko imamo test kome neka polja u klasi treba inicijalizovati mokupovima, može se napisati sledeće:

```java
@ExtendedWith(MockitoExtension.class)
class MyMockedTest {
	@Mock
	Book book;
	...
}
```

## Before i After

Uveden je red u anotacije kojima se označavaju metode kojima se test inicijalizuje i finalizuje. Nove anotacije su: `BeforeEach`, `@BeforeAll`, `@AfterEach`, `@AfterAll`. Jednostavno i jasno čemu služe.

Novi JUnit radi kao i do sada: kreira novu instancu svake test klase pre izvršenja _svake_ test metode. Ovakav način rada je podrazumevani i naziva se "_per-method_". No ovo se može promeniti: kada se testna klasa označi sa `@TestInstance(Lifecycle.PER_CLASS)`, JUnit prelazi na "_per-class_" način rada. U ovom modu se za svaku testnu klasu pravi samo jedna instanca.

## Dinamički testovi

Slična ideji `Parameterized` testova, Junit 5 donosi `@TestFactory` i dinamičke testove:

```java
@TestFactory
public Stream<DynamicTest> createStringGetLengthTests() {
	final String[][] data = {
		{"oblac", "5"},
		{"jodd", "4"},
		{"", "0"}
	};
	return Stream.of(data).map(in -> dynamicTest(
		"test: " + in[0],
		() -> assertEquals(in[1], String.valueOf(in.getLength(in[0]))));
}
```

`@TestFactory`, kao što mu i ime kaže, proizvodi niz dinamičkih testova.

## Ponavljači

Testovi se sada mogu ponavljati ukoliko se označe sa `@RepeatedTest`:

```java
@RepeatedTest(3)
public void test(RepetitionInfo info) {
	assertTrue(1 == 1);
	logger.info("Repetition #" + info.getCurrentRepetition());
}
```

Test metod sada dozvoljava argument tipa `RepetitionInfo` koji sadrži meta-podatke u vezi ponavljanja. Još nisam sasvim siguran kada bih koristio ovu mogućnost, no vremenom će se to pojasniti.

## Dependency Injection

Osim `RepetitionInfo`, JUnit5 test metode dozvoljavaju parametre tipa `TestInfo` i `TestReporter`. Ove klase sadrže meta-podatke koji se tiču samog testa (klasa, metoda, ime...).

## Ispod haube

JUnit 5 nije samo tek unapređena verzija JUnita. Suština nove verzije zapravo leži u novoj arhitekturi. JUnit 5 je konstruisan tako da dozvoljava korišćenje drugih testnih biblioteka i različitih implementacija. Dok god se one nastavljaju na JUnit 5 arhitekturu, postaje moguće imati izbor i promeniti testnu biblioteku bez izmene koda. To olakašava posao i okruženjima za razvoj (IDE), pošto bi se testovati tretirali i izvršavali na isti način, bez obzira na implementaciju.

Iza svega stoji i [Open Test Alliance](https://github.com/ota4j-team/opentest4j) incijativa, zvanično telo za standardizaciju testova.

## Sedi, pet!

JUnit 5 definitivno predstavlja značajan pomak i prekretnicu u sferi unit testova. Imam utisak da su stvari sada konceptualno ujednačene. Drago mi je što se autori nisu libili da promene ili izbace neke stvari koje su i mene samog žuljale, te i da su zamenjene očigledno promišljenim novim funkcionalnostima, koje čine razvoj lakšim. Ne znam kako vi, ali ću koliko danas započeti sa nadogradnjom na projektima na kojima radim.