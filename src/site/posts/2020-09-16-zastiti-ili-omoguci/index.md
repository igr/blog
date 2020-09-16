---
title: "Zašti ili omogući"
date: 2020-09-17T01:07:03+00:00
categories:
  - Razvoj
tag:
  - razvoj
  - programiranje
  - java
  - oop
---

Sledeće parče koda je preuzeto iz živog projekta (imena su izmenjena, kao u svakom dobrom filmu). Reč je o delu zajedničke biblioteke koja se koristi u svim mikroservisima.

<!--more-->

```java
public class Important {
  Important(ConfigProvider configProvider) {
    this.token = configProvider.get("TOKEN");
    // ...
  }
  public Important() {
    this(ConfigProviders.DEFAULT);
  }
  // ...
}
```

Postoje dva konstruktora. Jedan je javni, bez argumenata i koristi uobičajenu konfiguraciju - koja se ne može (!) menjati u kodu, jer dolazi iz sistemskih varijabli. Drugi konstruktor nije javni i dozvoljava da se konfiguracija dostavi kroz argument.

Da li postoji neki problem?

## Očima developera

Da. Kao developer ne mogu da koristim `Important` sa dostavljenom, izmenjenom konfiguracijom. U toku razvoja je često potrebno probati i menjati uobičajenu konfiguraciju - bar zarad nekog testa. Glupo je zahtevati da svi programeri imaju isto podešene sistemske varijable i onda dodatno troše vreme na održavanje toga.

## Očima projektnog rukovodioca

Ne. Kao tehničko lice odgovorno za projekat, ne želim da developeri koriste bilo koju drugu konfiguraciju osim uobičajene, koja se dobavlja iz sistemskih varijabli. U suprotnom rizikujem da se negde konfiguracija podesi na način koji nije u skladu sa ostatkom infrastrukture.

## Ko je u pravu?

Krenimo redom.

Ako konfiguracija nije predviđena da se menja, onda je upitno postojanje alternativnog ne-javnog konstruktora i klase `ConfigProvider`: šta opravdava njeno postojanje ako se koristi samo interno i prenosi vrednosti iz sistemskih varijabli? No, hajde da ovo izuzmemo iz razmatranja.

Oba pristupa su validna. Nema smisla sputavati developera u razvoju, a opet je opravdana uniformnost potrebna u produkciji. Dakle, klasa treba da ima različite _oblike_ (tj. ponašanje) zavisno od _okruženja_. Različiti oblici su polimorfizam. To upućuje na promenu vidljivosti konstruktora na `protected` i postojanje nekakve `DevImportant` klase koja ima javni konstruktor:

```java
public class DevImportant extends Important {
  public DevImportant(ConfigProvider configProvider) {
    super(configProvider);
  }
  // ...
}
```

Nažalost, ovo ne rešava drugi problem. Postojanje ove klase ne sprečava da se ona pojavi u produkciji. Kako to rešiti?

Jedno rešenje bi bilo postojanje zasebnog dodatka biblioteke, koji sadrži samo `Dev` klase. Ovakva biblioteka bi mogla biti uključena u toku lokalnog razvoja, a izostavljena prilikom bildovanja produkcione verzije - to i nije tako teško uraditi u Gradle skriptu.

Alternativa je statička analiza koda u potrazi za neprimerenim korišćenjima. Ovo je koncept o kojem često razmišljam: mogućnost da se zadaju pravila korišćenja koda na projektu; no tako nešto još nije dovoljno sazrelo i nije odmaklo od lova na potencijalne bagove i mahom sintaksne nedoumice.

## Polivizum

Programski jezik, nažalost, nema šta da nam ponudi kao rešenje - on ne poznaje koncept 'okruženja'. Kod je jedan, gde god ga koristili. Ne može da ne čudi ova činjenica, s obzirom da ovakvi problemi postoje odvajkad.

Zar ne bi bilo baš kul kada bi jezik to podržavao sam od sebe? Naime, `DevImportant` ipak nije posebno _ponašanje_ klase. Ona se ponaša isto, samo koristimo OOP da bi razrešili problem sa _vidljivošću_ pojedinih delova koda. Klasa se, u suštini, ponaša identično.

Zar ne bilo baš kul kada bi postojao koncept **Polyvisum** (lat _visum_ == vidljivost)? Kod koji se različito _vidi_ zavisno od _okruženje_. Tako, na primer, gornji kod bi mogao da izgleda ovako:

```java
public class Important {

  public(dev) Important(ConfigProvider configProvider) {
    this.token = configProvider.get("TOKEN");
  }
  public Important() {
    this(ConfigProviders.DEFAULT);
  }
}
```

Zašto ostati na predefinisanim, u jezik uklesanim ključnim rečima? Zašto ne bi mogli da definišemo naše ključne reči koje se tiču vidljivosti: `publicDev`?

Drugim rečima, koncept vidljivosti koja je utkan u sve OOP je skučen i neiskorišćen. Trećim rečima, onima kojima zapravo hoću da ostavim čitaoca u razmišljanju: koncept **meta programiranja** u modernim jezicima je potpuno i nepravedno zapostavljen.
