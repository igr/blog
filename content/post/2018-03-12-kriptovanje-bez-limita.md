---
title: Kriptovanje bez limita
date: 2018-03-12T12:12:22+00:00
slug: kriptovanje-bez-limita
categories:
  - Razvoj
tags:
  - aes
  - enkripcija
  - java
  - java8
  - java9
  - jce
  - jodd
  - konfiguracija
  - kriptovanje
  - razvoj
---

Java odavno dolazi sa setom kripto-algoritama; interfejsi i implementacije su sadržane u “_Java Cryptography Extension_” (JCE) celini koja je sastavni deo JRE-a. Tu se mogu naći algoritmi za enkripciju, generisanje ključeva, heševa, potpisa itd.

Za simetrično kriptovanje sadržaja koristim `AES` enkripciju, podržanu u JCE. Inicijalizacija enkriptora i dekriptora izgleda nekako ovako (preuzeto iz [Jodd-a](http://jodd.org)):

```java
// create the key
KeySpec keySpec = new PBEKeySpec(passPhrase, SecureRandom.getSeed(8), 65536, 256);
SecretKey tmp = SecretKeyFactory
    .getInstance("PBKDF2WithHmacSHA256")
    .generateSecret(keySpec);
SecretKey secret = new SecretKeySpec(tmp.getEncoded(), "AES");

// encryptor
ecipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
ecipher.init(Cipher.ENCRYPT_MODE, secret);
AlgorithmParameters params = ecipher.getParameters();
byte[] iv = params.getParameterSpec(IvParameterSpec.class).getIV();

// decryptor
dcipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
dcipher.init(Cipher.DECRYPT_MODE, secret, new IvParameterSpec(iv));
```

Ovaj kod bi trebalo da daje solidno jaku enkripciju: `AES-256` (dostupni maksimum), `PBKDF2` (prirodno spor) i `SHA256` (dobra _hash_ funkcija). Ne mora se biti kripto stručnjak da bi se ovako nešto sklopilo u Javi i zatim koristilo.

Osim što postoji jedan problem:

    Exception in thread "main" java.security.InvalidKeyException: Illegal key size

Zbog kojekakvih pravnih zavrzlama, Java dozvoljava samo najslabiji nivo enkripcije: `AES-128`. Ključevi dužine `192` i `256` nisu dozvoljeni, te kod rezultuje gornjom greškom.

## Oslobađanje Ključeva

Problem se rešava preuzimanjem [posebnog dodatka](http://www.oracle.com/technetwork/java/javase/downloads/jce8-download-2133166.html) kojim sadrži tkzv: “_Java Cryptography Extension Unlimited Strength Jurisdiction Policy Files_”. Reč je o verzijama sigurnosnih `policy` jar-ova koji nemaju ograničenja za dužinu ključeva.

Ovo je dugo vremena bilo i jedino rešenje - prilično rogobatno, složite ćete se. Ipak se direktno zamenjuju JRE jar-ovi!

Konačno, Java 8 **u151** i **u152** sadrži ovaj dodatak u JRE. Podrazumevano stanje “pune snage” kriptovanja je isključeno, a uključuje se na sledeći način:

```java
Security.setProperty("crypto.policy", "unlimited");
```

Parametar se mora podesiti pre inicijalizacije JCE. Alternativa je da se ovaj parametar uključi u `<jre_home>/lib/security/java.security` fajlu.

Najzad, u Javi 8 **u162** je ovaj parametar podrazumevano uključen, te napokon ne treba ništa posebno učiniti da se koriste dugački ključevi. Isto važi i za Javu **9**: kriptovanje bez limita je sadržano i uključeno.