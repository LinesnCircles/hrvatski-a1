# 🇭🇷 Hrvatski A1 — interaktivni tečaj za polaganje ispita A1

Samostalna web-aplikacija koja vas vodi od nule do CEFR razine **A1** hrvatskog jezika — razine potrebne za polaganje ispita A1 (npr. na Filozofskom fakultetu u Zagrebu ili sličnim ispitima). Bez registracije, bez servera, bez plaćanja: otvorite `index.html` i učite. Napredak se čuva lokalno (localStorage).

## Pokretanje

```bash
# opcija 1: samo otvorite fajl
open index.html            # macOS
xdg-open index.html        # Linux

# opcija 2: lokalni server (preporučeno, zbog enkodiranja)
cd hrvatski-a1
python3 -m http.server 8000
# zatim otvorite http://localhost:8000
```

## Što aplikacija sadrži

| Dio | Sadržaj |
|---|---|
| 📚 **10 jedinica** | Pozdravi, brojevi, obitelj, hrana, vrijeme, grad, kupovina, posao, zdravlje, putovanja — svaka s vokabularom (331 riječ ukupno), gramatikom, dijalogom i **9 vježbi** (višestruki izbor, dopunjavanje, povezivanje, prijevod) te **kvizom** (5 pitanja, prag 60%). |
| 🃏 **Vježbe riječi** | Flashcard sustav s razmaknutim ponavljanjem (spaced repetition, 5 razina); moguće oba smjera HR→EN i EN→HR te filtriranje po jedinici. |
| 💬 **Fraze** | 39 najvažnijih fraza za preživljavanje, s pretragom. |
| 📖 **Gramatika** | Referentne tablice: biti / htjeti / ići / glagoli na -ati, brojevi s imenicama, prisvojne zamjenice, prijedlozi, futur, padeži. |
| 📝 **Probni ispit A1** | 4 dijela kao na stvarnom ispitu (čitanje, gramatika, vokabular, kratki pisani zadatak), 18 automatski ocjenjivih pitanja, prag 60%. |
| 🔊 **Izgovor** | Svaka riječ, fraza i dijalog ima gumb za izgovor hrvatskog (Web Speech API, glas `hr-HR`), uključujući „poslušaj cijeli dijalog". |

## Struktura projekta

```
hrvatski-a1/
├── index.html          # ljuska aplikacije
├── css/style.css       # stilovi (mobilno prilagođeno)
├── js/data.js          # sav sadržaj: 10 jedinica, gramatika, ispit, fraze
├── js/app.js           # motor: router, vježbe, kviz, trener, ispit, izgovor
└── test/validate.js    # testovi (node test/validate.js)
```

## Testiranje

```bash
node test/validate.js
```

Validira strukturu svih jedinica (odgovori unutar opsega, parovi za povezivanje), strukturu probnog ispita i renderira sve rute kroz DOM-shim.

## Napomene

- Izgovor (🔊) zahtijeva preglednik s podrškom za Web Speech API i glasom za hrvatski (Chrome/Edge preuzimaju glasove; Safari ima ugrađeni hrvatski glas).
- Aplikacija je namjerno bez build koraka i bez vanjskih ovisnosti — sve radi offline.

## 📱 Android aplikacija (npr. Samsung telefon)

U mapi `android/` nalazi se izvorni kod male Android aplikacije koja web-tečaj pakira u WebView — na telefonu dobivate pravu ikonu aplikacije, sve radi offline (bez servera), a napredak se i dalje čuva lokalno (localStorage).

- Paket: `com.linesncircles.hrvatskia1` · minSdk 24 · targetSdk 35
- Web-sadržaj (`index.html`, `css/`, `js/`) kopira se u APK tijekom builda (Gradle zadatak `copyWebAssets`), tako da je jedini izvor sadržaja ovaj repozitorij.
- Izgovor (🔊) radi i unutar WebViewa: ako sustav nema Web Speech API, aplikacija koristi ugrađeni Android TTS s glasom `hr-HR` preko `android/app/src/main/assets/polyfill/tts-polyfill.js` (polyfill se spaja ispred `js/app.js`).
- Ikone (šahovnica) generiraju se skriptom `android/tools/gen_icons.py` (`pip install pillow`).

### Build lokalno

```bash
cd android
./gradlew :app:assembleDebug      # treba JDK 17 + Android SDK
# APK: android/app/build/outputs/apk/debug/app-debug.apk
```

### Instalacija na Samsung telefon (sideload)

1. Prebacite `.apk` na telefon (USB, e-mail, cloud).
2. Otvorite fajl na telefonu i dozvolite „Instaliraj nepoznate aplikacije“ za tu aplikaciju (Files/e-mail/…).
3. Dodirnite **Instaliraj** — „Hrvatski A1“ pojavit će se na početnom zaslonu.

Napomena: `assembleDebug` daje debug-potpisani APK, dovoljan za osobnu upotrebu; za Google Play potreban je release-potpisani build.
