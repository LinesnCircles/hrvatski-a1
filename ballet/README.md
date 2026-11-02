# 🩰 Ballet 1830–1930 — offline Android app

A fully offline, permission-free Android app about 100 years of ballet history (1830–1930).
It contains **48 cross-linked entries** of five types, each with dates, a history, links to
related entries, cited sources, and a public-domain image (source + licence) — or a clearly
labelled placeholder when no free image exists.

| Type | Count | Entries |
|---|---|---|
| Ballets | 20 | La Sylphide, Giselle, La Esmeralda, Pas de Quatre, Le Corsaire, The Daughter of Pharaoh, Don Quixote, Coppélia, Le Carnaval, La Bayadère, Swan Lake, Raymonda, The Sleeping Beauty, The Nutcracker, The Firebird, Scheherazade, Petrushka, L'Après-midi d'un faune, The Rite of Spring, Parade |
| Dancers | 10 | Marie Taglioni, Carlotta Grisi, Fanny Elssler, Fanny Cerrito, Lucile Grahn, Jules Perrot, Pierina Legnani, Anna Pavlova, Vaslav Nijinsky, Mathilde Kschessinska |
| Impresarios & choreographers | 6 | Sergei Diaghilev, Ivan Vsevolozhsky, Marius Petipa, Michel Fokine, Léonide Massine, August Bournonville |
| Theatres | 6 | Salle Le Peletier, Palais Garnier, Mariinsky Theatre, Bolshoi Theatre, Her Majesty's Theatre (London), Théâtre du Châtelet |
| Composers | 6 | Tchaikovsky, Delibes, Minkus, Adolphe Adam, Stravinsky, Rimsky-Korsakov |

**Why these entries:** the 20 ballets trace the three great eras inside the period — the
Romantic ballets of Paris and London (1832–1873), the Russian classical era at the Bolshoi
and Mariinsky (1862–1898), and the Ballets Russes in Paris (1910–1917) — picking the works
that premiered at the six theatres and were scored by the six composers, so the cross-links
form one connected graph (178 links). The dancers are the stars who created or defined those
ballets (Taglioni→La Sylphide, Grisi→Giselle, Legnani→Swan Lake 1895, Nijinsky→Petrushka/
Faun/Rite, Pavlova, …); the impresarios/choreographers are the men who shaped the repertoire
(Perrot is listed under dancers as the era's greatest male dancer). Ballets carry a synopsis;
all other entries carry a history.

## Layout

```
ballet/
├── data/entries.json      # ALL content — the separate data file (48 entries)
├── data/images/*.jpg      # 47 public-domain images (see licensing below)
├── web/                   # offline UI (index.html + css + js) — search, type filter, cross-links
├── android/               # Android project (WebView wrapper, NO permissions, signed release)
│   └── releases/ballet-1830-1930-1.0.apk   # built, signed APK (ready to install)
├── tools/fetch_images.py  # how the images were fetched + licence-checked (Wikimedia Commons)
└── test/validate.js       # node ballet/test/validate.js — data + UI smoke tests
```

The Android build copies `web/` and `data/` into the APK assets at build time
(Gradle task `copyAppAssets`), so this directory is the single source of truth.

## Images & licensing

Every image was fetched from **Wikimedia Commons** and accepted only if its licence metadata
is **Public domain or CC0**; each entry records `source` (the Commons file page), `licence`
and `credit`. 47 of 48 entries have such an image. **Le Carnaval (1873)** had no suitable
free image, so its entry shows a clearly labelled placeholder instead of an unlicensed or
invented image. Re-run `python3 ballet/tools/fetch_images.py` to reproduce the fetch.

## Build & install

```bash
# tests (no dependencies)
node ballet/test/validate.js

# Android APK (JDK 17 + Android SDK; release signing needs android/keystore.properties,
# otherwise use :app:assembleDebug for a debug-signed build)
cd ballet/android && ./gradlew :app:assembleRelease
# APK: ballet/android/app/build/outputs/apk/release/app-release.apk
```

Install on a Samsung phone: transfer `ballet/android/releases/ballet-1830-1930-1.0.apk`
(or open its raw URL on the `vibe/ballet-1830-1930-4e0a2a` branch in the phone browser),
allow "Install unknown apps" for the source app, tap **Install**. The app requests
**no permissions** and works fully offline.

The APK is signed with a self-signed release key (`CN=LinesnCircles Ballet1830`);
the keystore itself is not committed (`android/keystore.properties` + `*.jks` are gitignored).
