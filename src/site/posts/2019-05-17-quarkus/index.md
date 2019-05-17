---
title: "Quarkus"
date: 2019-05-17T09:52:43+00:00
slug: quarkus
categories:
  - Razvoj
tags:
  - java
  - mikroservisi
  - tehnologija
  - cloud
---

[Quarkus](https://quarkus.io) je Kubernetes-Native Java framework prilagođen za GraalVM i HotSpot, sačinjen od najboljih Java biblioteka i standarda. Namera Quarkusa je da Javu načini vodećom platformom u Kubernetes i serverless okruženjima, a da u isto vreme ponudi programerima jedinstveni reaktivan i imperativan programerski model, koji optimalno adresira široki spektar distribuiranih arhitektura.
<!--more-->

Vredi izdvojiti da Quarkus dolazi iz Crvenog Kapčeta (Red Hat); zbog naglaska na K8s i Openshift. 

## Java framework

Kao prvo, Quarkus je Java framework. Ne, u ovom slučaju nije "još-jedan"; prati standarde koje postoje u Javi i JEE i koristi poznate biblioteke koje je svako imao prilike da sretne. To značajno olakšava početak - zaparavo, skoro da i nema šta da se uči da bi se radilo sa Quarkusom.

Druga stvar je da se funkcionalnosti frameworka dodaju u projekat instaliranjem tkzv. [ekstenzija](https://quarkus.io/extensions/). Instaliranje je puko dodavanje zavisnosti u `build` fajl na Quarkus biblioteku koja wrappuje postojeću biblioteku i time čini stvari još jednostavnijim za rad. Na primer, ukoliko treba uključiti `RESTEasy JSON-B`, instalira se `io.quarkus:quarkus-resteasy-jsonb` ekstenzija, koja sa sobom donosi sve zavisnosti i podešavanja, te je sve odmah spremno za rad.

Naravno, u projekat je moguće uključiti i 3rd party biblioteke koje nemaju svoju Quarkus ekstenziju. To radi očekivano bez problema - osim ako ne koristite Graal; više o tome kasnije. 

Evo nekih primera kako izgleda raditi sa Quarkusom.  
    
Konfiguracioni parametri koriste Microprofile:

```java
@ConfigProperty(name = "greetings.message")
String message;
```

Dependency Injection je dat kroz CDI v2.0 subset - nepotpuna, ali dovoljna implementacija:

```java
@ApplicationScoped
public class HelloService {}
...
@Inject
HelloService greetingService;
```

JSON je dan kroz JSONB:

```java
@POST
@Consumes(MediaType.APPLICATION_JSON)
public Response create(Sauce sauce) {
};
```

Perzistencija ispod ima JPA, Hibernate i Panache

```java
@Entity
public class Cloud extends PanacheEntity {}
...
Cloud cloud = new Cloud("Fluffy");
cloud.persist();
Cloud.findAll().list();
```

Tu su još ekstenzije za REST klijenta, validaciju (Hibernate Validator); a postoji opcija za Reactive programming kroz MicroProfile spec, logovanje...

Poslednja stvar na koju bih skrenu pažnju je class-reloading u `dev` modu rada. Naime, Quarkus aplikacija se (za sada) **ne** može startovati iz IDE-a (remote debugging radi, naravno). U toku razvoja Quarkus startovan u `dev` modu prati sve izmene na klasama, resursima, konfiguracijama. Izmene se rekompajliraju i aplikacija se restartuje. Sve ovo radi jako dobro, možda nešto najbolje takvo što sam do sada imao prilike do probam.

## GraalVM

Važna činjenica je da je Quarkus optimizovan i prilagošen za [GraalVM](https://www.graalvm.org) (i SubstrateVM). Šta to tačno znači?

Pa, od samog početka od kada se kreira kostur projekta, postoji način da se napravi _native_ artifact - izvršni program aplikacije:

```shell
./mvnw clean package -Pnative
```

Izvršni program je značajno manji od uobičajenog `fat`-jara koji se inače kreira, i, jasno, radi _mnogo_ brže. Zapravo, ceo Quarkus radi izuzetno brzo, bilo u uobičajenom ili _native_ obliku!

Primera radi, startovanje servera i aplikacije, koje zna da bude notorno dugo, u slučaju Quarkusa traje:

```
INFO  [io.quarkus]] (main) Quarkus 0.14.0 started in 1.285s. Listening on: http://[::]:8080
INFO  [io.quarkus]] (main) Installed features: [cdi, jaeger, kubernetes, resteasy, resteasy-jsonb 
```

a kao _native_ kod:

```
INFO  [io.quarkus]] (main) Quarkus 0.14.0 started in 0.027s. Listening on: http://[::]:8080
INFO  [io.quarkus]] (main) Installed features: [cdi, jaeger, kubernetes, resteasy, resteasy-jsonb, smallrye-health, smallrye-opentracing]
``` 

Da, nije greška, server je startovan za 27 milisekundi. Da, Graal kida :)

Da li moramo negde da platimo za ovu brzinu? Naravno. Kompajliranje Graal-om u _native_ kod zna da značajno potraje. To nije nešto što treba raditi u toku razvoja. Kako kod i broj biblioteka raste, vreme kompiranje _native_ programa se drastično povećava. Zato njega treba ostaviti za produkciju.

Drugi problem je da sve ne-Quarkus zavisnosti nemaju garanciju da rade sa Graal-om. Naravno, u većini slučajeva to nije problem, no dešava se da neka biblioteka prosto ne može da se kompajlira u _native_ kod.

Nazad na optimizaciju: ne čini je samo _native_ kod. Tu su i druge optimizacije, kao na primer analiza metapodataka prilikom kompajliranja i zamena refleksija konkretnim pozivima (gde je moguće) itd. Sve to bi trebalo da proizvede optimizovaniji kod, čak i kada se izvršava u osnovnom obliku, kao Java jar. 

## Docker, K8s, OpenShift

U kosturu projekta su uključeni i `Dockerfile` za java i _native_ Docker imidž. Pored toga, Quarkus ima ekstenzije koje daje uobičajene funkcije u cloud okruženju. Tako na primer, postoji metrika (MicroProfile), trejsovanje izvršavanja (OpenTracing, Jaeger), Health Checks... Ponavljam, svaka se dodaje instaliranjem Quarkus ekstenzije. Podešavanja se pišu u `application.properties`.

Ostatak priče nema posebnosti koje su vezane za Quarkus. Igre radi, napravio sam Docker imidž i deploy-ovao ga na lokalni `minishift`:

```shell
# create new project
oc new-project quarkus --display-name="Hello Quarkus App"

# Create new binary
oc new-build --binary --name=hello-quarkus -l app=hello-quarkus

# Update Dockerfile location
oc patch bc/hello-quarkus -p '{"spec":{"strategy":{"dockerStrategy":{"dockerfilePath":"src/main/docker/Dockerfile.native"}}}}'

# Start build by pushing the Quarkus app to OpenShift
oc start-build hello-quarkus --from-dir=. --follow

# Deploy it as an OpenShift app
oc new-app --image-stream=quarkus/hello-quarkus

# Expose services
oc expose service hello-quarkus
oc get route
```

Ništa novo.

## Zašto Quarkus?

Quarkus je još mlada platforma; intenzivno se radi na njoj. Možda je najbolji odgovor na pitanje "Zašto?" upravo sledeći citat:

> _Not_ trying to _reinvent_ the enterprise world, and using familiar technology, but with a _highly-optimized implementation_.
   
Brzina i lakoća razvoja, ekstenzije i Graal čine ga vrlo zanimljivim za razvoj. Nedostatak je, možda, vezivanje za vendora, te razvoj i širenje fukncionalnosti zavisi od njega i open-source zajednice. 

GitHub: [hello-quarkus](https://github.com/igr/hello-quarkus)
