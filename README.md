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

## 🩰 Ballet 1830–1930 — offline Android aplikacija

U mapi [`ballet/`](ballet/README.md) nalazi se druga aplikacija: potpuno offline Android aplikacija o povijesti baleta 1830.–1930. s **48 unakrsno povezanih unosa** (20 baleta, 10 plesača, 6 impresarija i koreografa, 6 kazališta, 6 skladatelja), pretragom i filtrom po vrsti, izvorima i slikama iz javne domene (ili jasno označenim placeholderom). Sadržaj je u zasebnoj datoteci `ballet/data/entries.json`. Izgrađeni potpisani APK: `ballet/android/releases/ballet-1830-1930-1.0.apk` (bez ijedne dozvole, radi offline). Testovi: `node ballet/test/validate.js`.
