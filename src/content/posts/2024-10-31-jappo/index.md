---
title: "Jappo"
date: 2024-10-31T01:06:08+00:00
slug: "jappo"
description: >
  Prvi Java open-source projekat koji mi nisu koristili samo tetka Savka i ludi Mane.
---

Prvi Java open-source projekat koji mi nisu koristili samo tetka Savka i ludi Mane iz prizemlja je bio **Jappo**.

Dok je dobar deo današnjih inženjera duboko u sebi i dalje procesirao istinu o Teletabisima tokom adolescencije, poneki od nas, tastaturnih zanatlija, smo usvajali Javu. Dolazili smo iz sveta sadističkih pointera i mazohističkog asemblera. Na novoj javi nam odjednom nedostaju stvari na koje smo navikli: kakav je to novi poredak bez `#define`?

Kada razmisliš, `#define` je kul: određuje kod koji zapravo ulazi u konačan rezultat. Kod koji nije potreban za neko okruženje - njega, prosto, nema. Jasno, ovakva moć otvara Pandorinu kutiju: jedno `#define FALSE TRUE` i ćao programe!

**Jappo** biblioteka je bila Java preprocessor. Našla je interesovanje finske open-source grupacije; domaća, koja god da smo država tada bili, nije postojala. Finci su hostovali projekat i povremeno pomagali oko ispravki. Biblioteka je našla mesto i u proizvodima CISC Semiconductor iz Austrije. Danas te biblioteke odavno nema.

No ovo je priča o nečemu drugome.

## Generisani kod je bolji od

Sečenog hleba? Sladoleda od malina?

"Ljubitelj" je tako bezazlena reč: i Pera Mitić je bio ljubitelj karanfila, pa kako se sve završio? Da se ispravim: za sada _čvrsto_ smatram da je generisan kod "odlična stvar" i da ga nedovoljno koristimo u tradicionalnim programskim jezicima. Generisani kod _nad kojim imamo kontrolu_ je zlato: nije ručno napisan, a postoji, te smanjuje mogućnost za ljudskim greškama. Naravno, korišćenje generisanog koda u projektu mora biti samo preporučeno pravilo, a ne zakon: u svakom trenutku treba biti moguće preći na ručno pisani kod za vanredne potrebe.

Java ekosistem ima podršku za generisanje koda korišćenjem anotacija (ako to već nije unapređeno), što je pomalo meh. Kako bilo, kada se pitam nešto na projektu, koristim generisani kod: najčešće za pretvaranje tkzv. value domenskih tipova u sirove vrednosti pred serijalizaciju: `BookId -> String`.

Nije generisani kod samo generisani sors. Postoje načini da se generiše runtime bajtkod; i zašto da ne!? Poslednji put sam to primenio na GraphQL kontrolerima koji su nam u velikoj većini izravno bili mapirani na biznis komponente: kontroleri su bili neophodni da premoste framework i biznis kod. Jednom generacijom koda smo obrisali 100+ klasa iz projekta. To je stotinu klasa o kojima nije trebalo više voditi računa! Radilo je kao furunče - ekonomično i postojano. Ujedno je dobar primer za DRY, princip koji se ne odnosi samo na fizički istovetan kod, već i na ista ponašanja; što kontroleri svakako dele.

Pošto i dalje niste ubeđeni u benefite generisanog koda, vadim poslednji adut iz rukava. Ne jer tečo-bobovski žudim da se svi slože sa mnom (dapače!), već radi dramskog efekta sledeće izjave: generisani kod zamenjuje refleksiju. Kako bi inače ispravni jezici postigli meta-programiranje? Eto, pogledajte Haskell Template.

## API

Jedino što uspevam da provučem na projektima je generisanje OpenAPI klijenta.

Nijedan klijent za koga sam radio, a više ih je nego što priznajem, nije pridavao "developer-friendly" pažnju OpenAPI-ju. Sve se završavalo na objavljivanju OpenAPI šeme: neke su bile perfektne, neke su bile poput uvenulog karanfila. Kako bilo, sve se tu završavalo. Kada je reč o javnim API-jima, to može biti dovoljno. Međutim, drastično je drugačije kada su u pitanju interni servis projekta.

Tokom razvoja, API interfejsi se učestano menjaju. Kako ispada, potpuno je okej plaćati sate i sate programera da precrtava OpenAPI šemu u kod projekta. Da, to je ono spajanje stringova, serijalizacija i deserijalizacija; i tako ukrug. Tek boli kada se API menja: treba prvo ustanoviti izmene. Tek je žurka kada je prenosni sadržaj netipiziran, pa jedan isti JSON može malo imati neka polja, malo ne, a malo su različitih tipova. Iz mog iskustva, ovo se sve smatra korektnom praksom.

Ne.

Ručno pisanje klijenta za interne API je skupa budalaština. Ako postoje alati koji mogu da generišu pristojnu biblioteku dok si rekao "karanfil" i - pajz sad - koja uvek može biti ažurirana: zašto oberučke ne prihvatiti takav dar? Dalje, kada je reč o internim projektima firme, uveo bih pravilo da svaki servis koji objavi API, takođe mora da objavi ažurirane biblioteke u svakom od korišćenih programskih jezika. Tada OpenAPI šema čak i nije potrebna za deljenje; ha!

## Efikasno upucavanje stopala pri trčanju

Svako ko je koristio popularni generator OpenAPI klijenta zna da specifikacija 3.0 nije u potpunosti implementirana za sve jezike: postoje ćoškovi koje generator ne isporučuje kako treba. Jedan od njih je takođe poznat: Java generator ne može da izgeneriše ispravan API koji se služi s `Content-Type` kao diskriminatorom poziva:

```yaml
 requestBody:
   content:
     application/cat+json:
       schema:
         $ref: '#/components/schemas/cat'
     application/dog+json:
       schema:
         $ref: '#/components/schemas/dog'
   required: true
```

Postoje dve opcije:

1. Platiti za pronalaženje boljeg alata ili poduhvat nadogradnje postojećeg.
2. Zameniti definiciju koja ne prolazi ekvivalentnom koja prolazi generator koda u upotrebi.

Kako prvi izbor jedino može da bude opcija pod dva, pokušam sledeće: "Znate, mi generišemo klijenta za ovaj interni API, značajno bi nam uštedelo vreme ako bi izmenili taj i taj deo funkcionalno istom definicijom", trepnem dva puta i dodam: "pogotovo jer i vi sami generišete OpenAPI iz koda." Pogodite koji je _jedini_ odgovor koji sam dobio, na potpuno različitim projektima, sa potpuno različitim klijentima i potpuno različitim domenima: "Jok".

Jedan put sam dobio i obrazloženje: insistiranje na validnosti definicije. To je argument na koji se, na prvi pogled, nema šta odgovoriti. Ispravna je definicija, a to što tamo neki alat ne radi, nije problem našeg tima.

Ne.

Tvoj API, tvoj problem. Tačnije: _naš_ API, _naš_ problem. Ako je reč o internoj komunikaciji servisa, postoji toliko drugih stvari na kojima moramo insistirati pre nego što dođemo na to da se bavimo _stilovima_ definisanja ispravnog internog OpenAPI-ja.

> Insistiranje na preciznosti je esencijalno. Mudrost je razumeti razlike između preciznosti. Postoji preciznost koja umanjuje [nedoumicu](https://oblac.rs/kognitivna-entropija/). Postoji preciznost koja ima adekvatnu zamenu i nema opravdanje. Mudrost je razlučiti.

## Za neverne Tome

Generisanje koda je sjajna stvar. Većina programera danas svakodnevno koristi generisan kod, zahvaljući alatu koji se nedavno pojavio: A(jdT)I.

Ono šta smo propustili kao struka je da dobacimo do meta-programiranja pre pojave halucinacija.

Idemo dalje.
