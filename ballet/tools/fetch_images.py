#!/usr/bin/env python3
"""Fetch a public-domain image for each entry in ../data/entries.json from Wikimedia Commons.

For every entry, search Commons (File namespace) with the queries below and take the
first result whose licence metadata is Public Domain or CC0 and which is a real
photograph/painting of decent size. The thumbnail (max 900 px wide) is saved to
../data/images/<id>.<ext> and the entry is patched with image file, source page,
licence and credit. Entries with no suitable image keep "image": null and the app
shows a clearly labelled placeholder.

Usage: python3 fetch_images.py   (needs network access to commons.wikimedia.org)
"""
import html
import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, "..", "data")
ENTRIES = os.path.join(DATA, "entries.json")
IMAGES = os.path.join(DATA, "images")
API = "https://commons.wikimedia.org/w/api.php"
UA = {"User-Agent": "VibeBalletApp/1.0 (offline educational app; contact: repo owner) ballet image research"}
THUMB_W = 900
MIN_W = 400

QUERIES = {
    "b-la-sylphide": ["La Sylphide ballet 1832 Taglioni", "Marie Taglioni Sylphide", "La Sylphide ballet poster"],
    "b-giselle": ["Giselle ballet Grisi", "Giselle ballet Wilis", "Carlotta Grisi Giselle 1841"],
    "b-esmeralda": ["La Esmeralda ballet Perrot", "La Esmeralda ballet 1844"],
    "b-pas-de-quatre": ["Pas de Quatre 1845 ballet", "Taglioni Grisi Grahn Cerrito Pas de Quatre"],
    "b-le-corsaire": ["Le Corsaire ballet", "Le Corsaire ballet Mazilier"],
    "b-daughter-of-pharaoh": ["Daughter of the Pharaoh ballet Petipa", "Petipa Pharaoh ballet Bolshoi"],
    "b-don-quixote": ["Don Quixote ballet Petipa", "Don Quichotte ballet Minkus"],
    "b-coppelia": ["Coppélia ballet", "Coppelia ballet 1870"],
    "b-le-carnaval": ["Le Carnaval ballet Saint-Léon", "Delibes Le Carnaval ballet"],
    "b-la-bayadere": ["La Bayadère ballet", "Kingdom of the Shades Bayadère", "Bayadere ballet Petipa Mariinsky"],
    "b-swan-lake": ["Swan Lake ballet 1895 Legnani", "Swan Lake ballet Mariinsky", "Odette Odile Swan Lake"],
    "b-raymonda": ["Raymonda ballet Petipa", "Raymonda ballet Glazunov"],
    "b-sleeping-beauty": ["The Sleeping Beauty ballet Petipa", "Sleeping Beauty ballet 1890 Brianza", "Princess Aurora ballet"],
    "b-nutcracker": ["The Nutcracker ballet 1892", "Nutcracker ballet Mariinsky sugar plum"],
    "b-the-firebird": ["The Firebird ballet 1910", "Firebird ballet Bakst Stravinsky", "Ballets Russes Firebird Karsavina"],
    "b-scheherazade": ["Scheherazade ballet 1910 Fokine", "Shéhérazade ballet Bakst"],
    "b-petrushka": ["Petrushka ballet Nijinsky 1911", "Petrushka ballet Benois"],
    "b-apres-midi-d-un-faune": ["Après-midi d'un faune Nijinsky 1912", "Nijinsky faune ballet"],
    "b-rite-of-spring": ["Rite of Spring ballet 1913 Nijinsky", "Le Sacre du printemps ballet 1913"],
    "b-parade": ["Parade ballet 1917 performance Châtelet", "Parade Massine Diaghilev 1917", "Ballets Russes Parade 1917 photograph"],
    "d-marie-taglioni": ["Marie Taglioni ballerina", "Marie Taglioni 1832", "Taglioni portrait lithograph"],
    "d-carlotta-grisi": ["Carlotta Grisi ballerina", "Carlotta Grisi Giselle"],
    "d-fanny-elssler": ["Fanny Elssler ballerina", "Fanny Elssler cachucha"],
    "d-fanny-cerrito": ["Fanny Cerrito ballerina", "Fanny Cerrito 1840s"],
    "d-lucile-grahn": ["Lucile Grahn ballerina", "Lucile Grahn Pas de Quatre"],
    "d-jules-perrot": ["Jules Perrot", "Jules Perrot choreographer"],
    "d-pierina-legnani": ["Pierina Legnani", "Legnani Swan Lake 1895"],
    "d-anna-pavlova": ["Anna Pavlova ballerina", "Anna Pavlova Dying Swan"],
    "d-vaslav-nijinsky": ["Vaslav Nijinsky", "Nijinsky 1910"],
    "d-mathilde-kschessinska": ["Mathilde Kschessinska", "Kschessinska ballerina"],
    "ic-sergei-diaghilev": ["Sergei Diaghilev", "Diaghilev Ballets Russes"],
    "ic-ivan-vsevolozhsky": ["Ivan Vsevolozhsky", "Vsevolozhsky Imperial Theatres"],
    "ic-marius-petipa": ["Marius Petipa", "Petipa choreographer Mariinsky"],
    "ic-michel-fokine": ["Michel Fokine", "Mikhail Fokine choreographer"],
    "ic-leonide-massine": ["Léonide Massine", "Leonide Massine choreographer"],
    "ic-august-bournonville": ["August Bournonville", "Bournonville portrait"],
    "t-salle-le-peletier": ["Salle Le Peletier", "Le Peletier theatre Paris 1830"],
    "t-palais-garnier": ["Palais Garnier 1875", "Paris Opera Palais Garnier facade 19th century"],
    "t-mariinsky": ["Mariinsky Theatre auditorium interior", "Mariinsky Theatre stage curtain St Petersburg", "Imperial theatre Saint Petersburg interior 19th century", "Mariinsky Theatre building facade"],
    "t-bolshoi": ["Bolshoi Theatre 1856", "Bolshoi Theatre Moscow 19th century"],
    "t-her-majestys": ["Her Majesty's Theatre London 1845", "Her Majesty's Theatre Haymarket 19th century"],
    "t-chatelet": ["Théâtre du Châtelet 1862", "Châtelet theatre Paris 19th century"],
    "c-tchaikovsky": ["Pyotr Ilyich Tchaikovsky 1893", "Tchaikovsky photograph 1880s", "Tchaikovsky portrait"],
    "c-leo-delibes": ["Léo Delibes portrait", "Delibes composer photograph"],
    "c-ludwig-minkus": ["Ludwig Minkus portrait", "Minkus composer photograph"],
    "c-adolphe-adam": ["Adolphe Adam portrait", "Adolphe Adam composer"],
    "c-igor-stravinsky": ["Igor Stravinsky photograph 1915", "Stravinsky 1916 portrait", "Igor Stravinsky 1910s photo", "Stravinsky Nijinsky 1913 photograph"],
    "c-nikolai-rimsky-korsakov": ["Nikolai Rimsky-Korsakov portrait", "Rimsky-Korsakov photo 1900", "Nikolai Rimsky-Korsakov 1908 photograph"],
}


def api(params):
    params = dict(params, maxlag=5)
    url = API + "?" + urllib.parse.urlencode(params)
    for attempt in range(6):
        try:
            req = urllib.request.Request(url, headers=UA)
            with urllib.request.urlopen(req, timeout=30) as r:
                return json.load(r)
        except urllib.error.HTTPError as e:
            if e.code == 429 and attempt < 5:
                time.sleep(10 * (attempt + 1))
                continue
            raise
        finally:
            time.sleep(1.0)


def license_ok(short):
    s = (short or "").lower()
    return "public domain" in s or "cc0" in s


def strip_tags(s):
    return html.unescape(re.sub(r"<[^>]+>", "", s or "")).strip()


def search(query, limit=8):
    d = api({"action": "query", "format": "json", "list": "search",
             "srsearch": query, "srnamespace": 6, "srlimit": limit})
    return [it["title"] for it in d.get("query", {}).get("search", [])]


def imageinfo(title):
    d = api({"action": "query", "format": "json", "titles": title, "prop": "imageinfo",
             "iiprop": "url|extmetadata|size|mime", "iiurlwidth": THUMB_W})
    pages = d.get("query", {}).get("pages", {})
    if not pages:
        return None
    p = list(pages.values())[0]
    ii = p.get("imageinfo")
    return ii[0] if ii else None


def download(url, dest):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=60) as r, open(dest, "wb") as f:
        while True:
            chunk = r.read(1 << 20)
            if not chunk:
                break
            f.write(chunk)
    return os.path.getsize(dest)


def main():
    with open(ENTRIES, encoding="utf-8") as f:
        data = json.load(f)
    os.makedirs(IMAGES, exist_ok=True)
    only = set(filter(None, os.environ.get("ONLY", "").split(",")))
    got, missed = [], []
    for ent in data["entries"]:
        eid = ent["id"]
        if only and eid not in only:
            continue
        if not only and ent.get("image"):
            continue
        found = None
        for q in QUERIES.get(eid, []):
            for title in search(q):
                ii = imageinfo(title)
                if not ii:
                    continue
                em = ii.get("extmetadata", {})
                lic = em.get("LicenseShortName", {}).get("value", "")
                if not license_ok(lic):
                    continue
                if ii.get("width", 0) < MIN_W or not (ii.get("mime") or "").startswith("image/"):
                    continue
                found = (title, ii, em, lic)
                break
            if found:
                break
        if not found:
            ent["image"] = None
            missed.append(eid)
            print("PLACEHOLDER", eid)
            continue
        title, ii, em, lic = found
        url = ii.get("thumburl") or ii["url"]
        ext = os.path.splitext(urllib.parse.urlparse(url).path)[1].lower() or ".jpg"
        if ext not in (".jpg", ".jpeg", ".png", ".gif", ".webp"):
            ext = ".jpg"
        fname = eid + ext
        dest = os.path.join(IMAGES, fname)
        size = download(url, dest)
        ent["image"] = {
            "file": "images/" + fname,
            "source": ii.get("descriptionurl", ""),
            "licence": lic,
            "credit": strip_tags(em.get("Artist", {}).get("value", "")),
            "commonsTitle": title,
        }
        got.append(eid)
        print("IMG", eid, "<-", title, "|", lic, "|", size, "bytes")
    with open(ENTRIES, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write("\n")
    print("\nwith image: %d / 48, placeholders: %d" % (len(got), len(missed)))
    if missed:
        print("no image for:", ", ".join(missed))


if __name__ == "__main__":
    sys.exit(main())
