/* Hrvatski A1 — curriculum content. CEFR A1 for Croatian. */
"use strict";

const CRO_LEVEL = "A1";

const UNITS = [
  {
    id: 1,
    title: "Pozdravi i osnovne fraze",
    intro: "Naučite se pozdraviti, predstaviti i zahvaliti na hrvatskom. To su prve rečenice koje ćete koristiti svaki dan.",
    grammar: "U hrvatskom jeziku postoje tri roda (muški, ženski, srednji) i dva broja (jednina, množina). Glagol BITI (biti = to be) u prezentu: jesam, jesi, jest, jesmo, jeste, jesu.",
    grammarExamples: ["Ja sam Ana. — I am Ana.", "Ti si iz Hrvatske. — You are from Croatia.", "Mi smo studenti. — We are students."],
    vocab: [
      ["bok", "hi / hello (informal)"], ["zdravo", "hello / hi (informal)"], ["dobro jutro", "good morning"],
      ["dobar dan", "good day"], ["dobra večer", "good evening"], ["laku noć", "good night"],
      ["doviđenja", "goodbye"], ["vidimo se", "see you"], ["hvala", "thank you"], ["molim", "please / you're welcome"],
      ["da", "yes"], ["ne", "no"], ["oprostite", "excuse me / sorry"], ["ne razumijem", "I don't understand"],
      ["kako si?", "how are you? (informal)"], ["kako ste?", "how are you? (formal)"], ["dobro sam", "I'm fine"],
      ["vrlo dobro", "very well"], ["loše sam", "I'm bad"], ["tako-tako", "so-so"],
      ["kako se zoveš?", "what's your name? (informal)"], ["kako se zovete?", "what's your name? (formal)"], ["zovem se…", "my name is…"],
      ["drago mi je", "nice to meet you"], ["također", "too / also"], ["i ja", "me too"],
      ["odakle si?", "where are you from? (informal)"], ["odakle ste?", "where are you from? (formal)"], ["iz… sam", "I'm from…"]
    ],
    dialogue: {
      title: "U kafiću",
      lines: [
        ["Ana", "Bok! Kako si?"], ["Marko", "Bok! Dobro sam, hvala. A ti?"], ["Ana", "Vrlo dobro, hvala! Kako se zoveš?"],
        ["Marko", "Zovem se Marko. A ti?"], ["Ana", "Zovem se Ana. Drago mi je!"], ["Marko", "I meni. Vidimo se!"], ["Ana", "Vidimo se! Bok!"]
      ]
    },
    exercises: [
      { type: "mcq", q: "Kako kažemo 'good morning' na hrvatskom?", options: ["Dobra večer", "Dobro jutro", "Laku noć", "Dobar dan"], answer: 1 },
      { type: "mcq", q: "Što znači 'vidimo se'?", options: ["Goodbye (formal)", "See you", "Good night", "Please"], answer: 1 },
      { type: "mcq", q: "Dopuni: 'Zovem ___ Ana.'", options: ["se", "si", "sam", "ste"], answer: 0 },
      { type: "mcq", q: "Koja je ispravna forma za 'you are' (formalno)?", options: ["si", "ste", "jesam", "jeste"], answer: 1 },
      { type: "fill", q: "Dopuni: '___ mi je!' znači 'nice to meet you'.", answer: "Drago", hint: "Počinje s 'D…'" },
      { type: "fill", q: "'Thank you' na hrvatskom je ___.", answer: "hvala" },
      { type: "match", q: "Poveži hrvatsko s engleskim:", pairs: [["laku noć", "good night"], ["doviđenja", "goodbye"], ["oprostite", "excuse me"], ["ne razumijem", "I don't understand"]] },
      { type: "translate", q: "Prevedi na hrvatski: 'I don't understand.'", answers: ["ne razumijem"] },
      { type: "translate", q: "Prevedi na hrvatski: 'My name is Marko.'", answers: ["zovem se marko"] }
    ],
    quiz: [
      { q: "Kako se kaže 'hello' neformalno?", options: ["Dobar dan", "Bok", "Laku noć", "Doviđenja"], answer: 1 },
      { q: "Što znači 'molim'?", options: ["sorry", "thank you", "please / you're welcome", "yes"], answer: 2 },
      { q: "Dopuni: 'Ja ___ iz Zagreba.' (biti)", options: ["jesam", "jesi", "jest", "jesmo"], answer: 0 },
      { q: "'Kako se zoveš?' znači…", options: ["How are you?", "Where are you from?", "What's your name?", "Nice to meet you"], answer: 2 },
      { q: "Kako odgovaramo na 'Hvala'?", options: ["Hvala", "Molim", "Doviđenja", "Bok"], answer: 1 }
    ]
  },
  {
    id: 2,
    title: "Predstavljanje i brojevi 0–20",
    intro: "Naučite brojeve od 0 do 20 i kako reći koliko vam je godina te odakle ste.",
    grammar: "Brojevi 1–4 mijenjaju imenicu: jedan student, dva studenta, tri studenta, četiri studenta; od 5 nadalje: pet studenata. Godine: 'Imam dvadeset godina.'",
    grammarExamples: ["Imam dvadeset (20) godina. — I am 20 years old.", "Imam dvadeset i jednu godinu. — I am 21.", "Koliko imaš godina? — How old are you?"],
    vocab: [
      ["nula", "0"], ["jedan", "1"], ["dva", "2"], ["tri", "3"], ["četiri", "4"], ["pet", "5"], ["šest", "6"], ["sedam", "7"],
      ["osam", "8"], ["devet", "9"], ["deset", "10"], ["jedanaest", "11"], ["dvanaest", "12"], ["trinaest", "13"],
      ["četrnaest", "14"], ["petnaest", "15"], ["šesnaest", "16"], ["sedamnaest", "17"], ["osamnaest", "18"],
      ["devetnaest", "19"], ["dvadeset", "20"], ["godina", "year"], ["koliko", "how much / how many"],
      ["imam… godina", "I am… years old"], ["zovem se", "my name is"], ["odakle", "from where"],
      ["iz", "from"], ["živim u…", "I live in…"], ["radim kao…", "I work as…"], ["student / studentica", "student (m/f)"],
      ["učitelj / učiteljica", "teacher (m/f)"]
    ],
    dialogue: {
      title: "U razredu",
      lines: [
        ["Ana", "Bok! Ja sam Ana. Kako se zoveš?"], ["Ivan", "Zdravo! Zovem se Ivan. Odakle si?"],
        ["Ana", "Iz Splita sam. A ti?"], ["Ivan", "Iz Zagreba. Koliko imaš godina?"],
        ["Ana", "Imam dvadeset godina. A ti?"], ["Ivan", "Imam dvadeset i tri godine."]
      ]
    },
    exercises: [
      { type: "mcq", q: "Kako kažemo '7'?", options: ["šest", "sedam", "osam", "devet"], answer: 1 },
      { type: "mcq", q: "'Imam ___ godina' — što ide za 15?", options: ["petnaest", "šesnaest", "četrnaest", "sedamnaest"], answer: 0 },
      { type: "mcq", q: "Dopuni: 'Imam dvadeset ___ jednu godinu.' (21)", options: ["i", "ili", "pa", "ali"], answer: 0 },
      { type: "fill", q: "Broj 13 na hrvatskom je ___.", answer: "trinaest" },
      { type: "fill", q: "'How old are you?' = 'Koliko imaš ___?'", answer: "godina" },
      { type: "match", q: "Poveži brojeve:", pairs: [["osam", "8"], ["deset", "10"], ["šesnaest", "16"], ["dvadeset", "20"]] },
      { type: "translate", q: "Prevedi: 'I am 19 years old.'", answers: ["imam devetnaest godina"] },
      { type: "translate", q: "Prevedi: 'Where are you from?' (neformalno)", answers: ["odakle si"] },
      { type: "mcq", q: "Dopuni: 'Ja ___ student.'", options: ["jesam", "jesi", "jest", "jesmo"], answer: 0 }
    ],
    quiz: [
      { q: "Kako kažemo 11?", options: ["jedanaest", "dvanaest", "trinaest", "deset"], answer: 0 },
      { q: "'Koliko imaš godina?' znači…", options: ["What's your name?", "How old are you?", "Where do you live?", "What do you do?"], answer: 1 },
      { q: "Dopuni: 'Imam dvanaest ___.'", options: ["godina", "godinu", "godine", "godina i"], answer: 0 },
      { q: "Kako kažemo 'I live in Zagreb'?", options: ["Živim u Zagrebu", "Živim Zagreb", "Ja Zagreb živim", "U Zagrebu živim ja"], answer: 0 },
      { q: "Broj 20 je…", options: ["dvadeset", "trideset", "četrdeset", "deset"], answer: 0 }
    ]
  },
  {
    id: 3,
    title: "Obitelj i prijatelji",
    intro: "Riječi za članove obitelji i kako opisati svoju obitelj.",
    grammar: "Prisvojne zamjenice: moj/moja/moje, tvoj/tvoja/tvoje, njegov/njegova/njegovo, njezin/njezina/njezino, naš/naša/naše, vaš/vaša/vaše, njihov/njihova/njihovo. Rod i broj zamjenice slažu se s imenicom.",
    grammarExamples: ["Moj brat je student. — My brother is a student.", "Moja sestra živi u Rijeci. — My sister lives in Rijeka.", "Ovo je moja obitelj. — This is my family."],
    vocab: [
      ["obitelj", "family"], ["mama", "mom"], ["tata", "dad"], ["roditelji", "parents"], ["brat", "brother"], ["sestra", "sister"],
      ["sin", "son"], ["kći", "daughter"], ["djed", "grandfather"], ["baka", "grandmother"], ["ujak", "uncle (mother's brother)"],
      ["stric", "uncle (father's brother)"], ["teta", "aunt"], ["rođak", "relative"], ["prijatelj", "friend (m)"],
      ["prijateljica", "friend (f)"], ["djeca", "children"], ["muž", "husband"], ["žena", "wife"], ["partner", "partner"],
      ["velik / velika", "big"], ["mali / mala", "small"], ["mlad / mlada", "young"], ["star / stara", "old"],
      ["sretan / sretna", "happy"], ["dobar / dobra", "good"], ["lijep / lijepa", "beautiful / handsome"]
    ],
    dialogue: {
      title: "O obitelji",
      lines: [
        ["Ana", "Imaš li veliku obitelj?"], ["Marko", "Da, imam. Imam dva brata i jednu sestru."],
        ["Ana", "Gdje živi tvoja obitelj?"], ["Marko", "Moji roditelji žive u Zagrebu, a sestra u Splitu."],
        ["Ana", "Imaš li prijatelje u Splitu?"], ["Marko", "Da, puno prijatelja!"]
      ]
    },
    exercises: [
      { type: "mcq", q: "'Sestra' znači…", options: ["mother", "sister", "daughter", "aunt"], answer: 1 },
      { type: "mcq", q: "Dopuni: '___ brat je student.' (moj)", options: ["Moj", "Moja", "Moje", "Mogu"], answer: 0 },
      { type: "mcq", q: "Dopuni: '___ sestra živi u Rijeci.' (moja)", options: ["Moj", "Moja", "Moje", "Mojim"], answer: 1 },
      { type: "fill", q: "'Grandmother' = ___.", answer: "baka" },
      { type: "fill", q: "'Parents' = ___.", answer: "roditelji" },
      { type: "match", q: "Poveži:", pairs: [["brat", "brother"], ["kći", "daughter"], ["djed", "grandfather"], ["prijateljica", "friend (f)"]] },
      { type: "translate", q: "Prevedi: 'My family is big.'", answers: ["moja obitelj je velika"] },
      { type: "translate", q: "Prevedi: 'I have two brothers.'", answers: ["imam dva brata"] },
      { type: "mcq", q: "Dopuni: 'Ovo je ___ obitelj.' (naša)", options: ["naš", "naša", "naše", "naši"], answer: 1 }
    ],
    quiz: [
      { q: "Kako kažemo 'mother'?", options: ["baka", "mama", "teta", "sestra"], answer: 1 },
      { q: "'Moj tata' — koji je rod od 'tata'?", options: ["ženski", "muški", "srednji", "nema roda"], answer: 1 },
      { q: "Dopuni: '___ prijateljica je iz Splita.' (moja)", options: ["Moj", "Moja", "Moje", "Moju"], answer: 1 },
      { q: "'Djeca' znači…", options: ["children", "friends", "parents", "uncles"], answer: 0 },
      { q: "Kako kažemo 'I have a big family'?", options: ["Imam veliku obitelj", "Imam velik obitelj", "Obitelj je velika imam", "Velika obitelj imam"], answer: 0 }
    ]
  },
  {
    id: 4,
    title: "Hrana, piće i u restoranu",
    intro: "Naučite naručiti hranu i piće, te osnovne riječi za hranu.",
    grammar: "Glagol HTJETI (htjeti = to want): hoću, hoćeš, hoće, hoćemo, hoćete, hoće. Uz njega ide infinitiv: 'Hoću kavu.' Akuzativ ženskog roda završava na -u: kava → kavu, voda → vodu.",
    grammarExamples: ["Hoću kavu. — I want a coffee.", "Što hoćeš piti? — What do you want to drink?", "Račun, molim! — The bill, please!"],
    vocab: [
      ["hrana", "food"], ["piće", "drink / beverage"], ["voda", "water"], ["kava", "coffee"], ["čaj", "tea"], ["sok", "juice"],
      ["pivo", "beer"], ["vino", "wine"], ["mlijeko", "milk"], ["kruh", "bread"], ["sir", "cheese"], ["jaje", "egg"],
      ["meso", "meat"], ["riba", "fish"], ["povrće", "vegetables"], ["voće", "fruit"], ["juha", "soup"], ["salata", "salad"],
      ["sendvič", "sandwich"], ["sladoled", "ice cream"], ["šećer", "sugar"], ["sol", "salt"], ["papar", "pepper"],
      ["restoran", "restaurant"], ["kafić", "café"], ["konoba", "tavern"], ["jelovnik", "menu"], ["račun", "bill"],
      ["stol", "table"], ["konobar / konobarica", "waiter / waitress"], ["ukusno", "delicious"], ["gladan / gladna", "hungry"],
      ["žedan / žedna", "thirsty"], ["rezervirati", "to reserve"], ["za dvoje", "for two"]
    ],
    dialogue: {
      title: "U restoranu",
      lines: [
        ["Konobar", "Dobar dan! Stol za koliko osoba?"], ["Ana", "Dobar dan! Za dvoje, molim."],
        ["Konobar", "Izvolite. Evo jelovnika."], ["Marko", "Hvala. Što preporučujete?"],
        ["Konobar", "Preporučujem ribu i salatu. Vrlo je ukusno."], ["Ana", "Dobro. Hoću juhu i vodu, molim."],
        ["Marko", "Ja ću meso i sok."], ["Konobar", "Odmah dolazi!"]
      ]
    },
    exercises: [
      { type: "mcq", q: "'Voda' znači…", options: ["juice", "water", "wine", "milk"], answer: 1 },
      { type: "mcq", q: "Dopuni: '___ kavu, molim.' (hoću)", options: ["Hoću", "Hoćeš", "Hoće", "Hoćemo"], answer: 0 },
      { type: "mcq", q: "Kako zoveš osobu koja donosi hranu?", options: ["Kuhar", "Konobar", "Student", "Liječnik"], answer: 1 },
      { type: "fill", q: "'The bill, please' = 'Račun, ___!'", answer: "molim" },
      { type: "fill", q: "'Beer' = ___.", answer: "pivo" },
      { type: "match", q: "Poveži:", pairs: [["kruh", "bread"], ["sir", "cheese"], ["riba", "fish"], ["juha", "soup"]] },
      { type: "translate", q: "Prevedi: 'I want a coffee.'", answers: ["hoću kavu"] },
      { type: "translate", q: "Prevedi: 'The bill, please!'", answers: ["račun, molim"] },
      { type: "mcq", q: "'Jesi gladna?' — što znači?", options: ["Are you thirsty?", "Are you hungry?", "Are you happy?", "Are you tired?"], answer: 1 }
    ],
    quiz: [
      { q: "Kako kažemo 'juice'?", options: ["voda", "sok", "čaj", "mlijeko"], answer: 1 },
      { q: "Dopuni: 'Ja ___ sok.' (htjeti)", options: ["hoću", "hoćeš", "hoće", "hoćemo"], answer: 0 },
      { q: "Što znači 'ukusno'?", options: ["expensive", "delicious", "hungry", "cold"], answer: 1 },
      { q: "Kako kažemo 'I am thirsty'? (ženski rod)", options: ["Žedan sam", "Žedna sam", "Gladna sam", "Umorna sam"], answer: 1 },
      { q: "'Jelovnik' je…", options: ["the bill", "the menu", "the table", "the soup"], answer: 1 }
    ]
  },
  {
    id: 5,
    title: "Vrijeme, datum i sat",
    intro: "Naučite pitati koliko je sati, reći datum i opisati vrijeme.",
    grammar: "Vrijeme se kaže s 'sati' (5 i više): 'Sada je pet sati.' Za 1: 'Jedan sat.' Za 2–4: 'dva sata, tri sata, četiri sata'. Dani: ponedjeljak…nedjelja. Mjeseci: siječanj, veljača, ožujak, travanj, svibanj, lipanj, srpanj, kolovoz, rujan, listopad, studeni, prosinac.",
    grammarExamples: ["Koliko je sati? — What time is it?", "Sada je tri sata. — It's three o'clock.", "Ujutro / popodne / navečer — in the morning / afternoon / evening."],
    vocab: [
      ["sat", "clock / hour"], ["minuta", "minute"], ["dan", "day"], ["tjedan", "week"], ["mjesec", "month"], ["godina", "year"],
      ["jutro", "morning"], ["podne", "noon"], ["popodne", "afternoon"], ["večer", "evening"], ["noć", "night"],
      ["ponedjeljak", "Monday"], ["utorak", "Tuesday"], ["srijeda", "Wednesday"], ["četvrtak", "Thursday"], ["petak", "Friday"],
      ["subota", "Saturday"], ["nedjelja", "Sunday"], ["siječanj", "January"], ["veljača", "February"], ["ožujak", "March"],
      ["travanj", "April"], ["svibanj", "May"], ["lipanj", "June"], ["srpanj", "July"], ["kolovoz", "August"],
      ["rujan", "September"], ["listopad", "October"], ["studeni", "November"], ["prosinac", "December"],
      ["sunčano", "sunny"], ["kišovito", "rainy"], ["oblačno", "cloudy"], ["vruće", "hot"], ["hladno", "cold"], ["vjetrovito", "windy"],
      ["Kakvo je vrijeme?", "What's the weather like?"], ["Koliko je sati?", "What time is it?"], ["danas", "today"],
      ["sutra", "tomorrow"], ["jučer", "yesterday"], ["sada", "now"]
    ],
    dialogue: {
      title: "Dogovor za kavu",
      lines: [
        ["Ana", "Bok! Kada možemo ići na kavu?"], ["Marko", "Sutra popodne? U pet sati?"],
        ["Ana", "Odlično! Koji je danas dan?"], ["Marko", "Danas je ponedjeljak, 3. lipnja."],
        ["Ana", "Super. Vidimo se sutra u pet sati!"]
      ]
    },
    exercises: [
      { type: "mcq", q: "'Koliko je sati?' znači…", options: ["What day is it?", "What time is it?", "What's the weather?", "What's the date?"], answer: 1 },
      { type: "mcq", q: "Dopuni: 'Sada je pet ___.'", options: ["sat", "sata", "sati", "satima"], answer: 2 },
      { type: "mcq", q: "Dopuni: 'Sada je dva ___.'", options: ["sat", "sata", "sati", "satima"], answer: 1 },
      { type: "fill", q: "'Monday' = ___.", answer: "ponedjeljak" },
      { type: "fill", q: "'Today' = ___.", answer: "danas" },
      { type: "match", q: "Poveži dane:", pairs: [["petak", "Friday"], ["subota", "Saturday"], ["nedjelja", "Sunday"], ["utorak", "Tuesday"]] },
      { type: "translate", q: "Prevedi: 'What time is it?'", answers: ["koliko je sati"] },
      { type: "translate", q: "Prevedi: 'It's three o'clock.'", answers: ["sada je tri sata", "tri sata je", "sada su tri sata"] },
      { type: "mcq", q: "Kako kažemo 'rainy'?", options: ["sunčano", "kišovito", "vruće", "hladno"], answer: 1 }
    ],
    quiz: [
      { q: "'Jutro' znači…", options: ["evening", "morning", "night", "noon"], answer: 1 },
      { q: "Dopuni: 'Sada je jedan ___.'", options: ["sata", "sat", "sati", "satima"], answer: 1 },
      { q: "Koji je mjesec 'srpanj'?", options: ["June", "July", "August", "September"], answer: 1 },
      { q: "Kako kažemo 'yesterday'?", options: ["danas", "sutra", "jučer", "sada"], answer: 2 },
      { q: "Dopuni: 'Sada je šest ___.'", options: ["sata", "sat", "sati", "satima"], answer: 2 }
    ]
  },
  {
    id: 6,
    title: "Grad, smjerovi i prijevoz",
    intro: "Naučite pitati za put, razumjeti osnovne smjerove i nazive mjesta u gradu.",
    grammar: "Prijedlozi mjesta: U + lokativ (u gradu, u školi), NA + lokativ (na trgu, na stanici), DO + genitiv (do centra). Smjerovi: ravno (straight), lijevo (left), desno (right). Prijevoz u instrumentalu: autobusom, tramvajem, vlakom.",
    grammarExamples: ["Gdje je…? — Where is…?", "Idite ravno, pa lijevo. — Go straight, then left.", "Autobusom / vlakom / tramvajem — by bus / train / tram."],
    vocab: [
      ["grad", "city / town"], ["selo", "village"], ["centar", "center"], ["trg", "square"], ["ulica", "street"], ["adresa", "address"],
      ["stanica", "station / stop"], ["autobusna stanica", "bus station"], ["željeznička stanica", "train station"], ["aerodrom", "airport"],
      ["tržnica", "market"], ["muzej", "museum"], ["bolnica", "hospital"], ["ljekarna", "pharmacy"], ["banka", "bank"],
      ["pošta", "post office"], ["škola", "school"], ["sveučilište", "university"], ["knjižnica", "library"], ["park", "park"],
      ["plaža", "beach"], ["hotel", "hotel"], ["restoran", "restaurant"], ["kafić", "café"], ["lijevo", "left"], ["desno", "right"],
      ["ravno", "straight ahead"], ["blizu", "near"], ["daleko", "far"], ["ovdje", "here"], ["tamo", "there"],
      ["autobus", "bus"], ["tramvaj", "tram"], ["vlak", "train"], ["auto / automobil", "car"], ["taksi", "taxi"],
      ["bicikl", "bicycle"], ["pješke", "on foot"], ["Gdje je…?", "Where is…?"], ["Kako doći do…?", "How to get to…?"]
    ],
    dialogue: {
      title: "Pitanje za put",
      lines: [
        ["Stranac", "Oprostite, gdje je željeznička stanica?"], ["Ana", "Idite ravno ovom ulicom, pa desno. Blizu je."],
        ["Stranac", "Hvala! Je li daleko?"], ["Ana", "Ne, pet minuta pješke."],
        ["Stranac", "Još jednom hvala!"], ["Ana", "Nema na čemu!"]
      ]
    },
    exercises: [
      { type: "mcq", q: "'Gdje je…?' znači…", options: ["How are you?", "Where is…?", "What time is it?", "Who is that?"], answer: 1 },
      { type: "mcq", q: "Dopuni: 'Idite ravno, pa ___.' (lijevo)", options: ["desno", "lijevo", "nazad", "gore"], answer: 1 },
      { type: "mcq", q: "'Blizu' znači…", options: ["far", "near", "here", "there"], answer: 1 },
      { type: "fill", q: "'On foot' = ___.", answer: "pješke" },
      { type: "fill", q: "'Bus station' = autobusna ___.", answer: "stanica" },
      { type: "match", q: "Poveži:", pairs: [["trg", "square"], ["ulica", "street"], ["plaža", "beach"], ["muzej", "museum"]] },
      { type: "translate", q: "Prevedi: 'Go straight, then right.'", answers: ["idite ravno, pa desno"] },
      { type: "translate", q: "Prevedi: 'Where is the pharmacy?'", answers: ["gdje je ljekarna"] },
      { type: "mcq", q: "Kako dođemo do centra bez auta?", options: ["Autobusom ili tramvajem", "Avionom", "Vlakom uvijek", "Ničim"], answer: 0 }
    ],
    quiz: [
      { q: "Kako kažemo 'left'?", options: ["desno", "ravno", "lijevo", "blizu"], answer: 2 },
      { q: "'Daleko' znači…", options: ["near", "here", "far", "there"], answer: 2 },
      { q: "Dopuni: 'Idite ___.' znači 'Go straight.'", options: ["lijevo", "desno", "ravno", "nazad"], answer: 2 },
      { q: "Kako kažemo 'airport'?", options: ["stanica", "aerodrom", "centar", "trg"], answer: 1 },
      { q: "'Pješke' znači…", options: ["by car", "by bus", "on foot", "by bike"], answer: 2 }
    ]
  },
  {
    id: 7,
    title: "Kupovina i cijene",
    intro: "Naučite kupovati, pitati za cijenu i opisati što želite.",
    grammar: "Cijene: 'Koliko košta…?' = How much does… cost? 'Košta pet eura.' Brojevi s valutom: dva eura, tri eura, četiri eura, od 5: pet eura. Hrvatska valuta je euro (EUR). Plaćanje: gotovinom (cash) ili karticom (card).",
    grammarExamples: ["Koliko košta ova majica? — How much is this T-shirt?", "Košta dvadeset eura. — It costs 20 euros.", "Imate li…? — Do you have…?"],
    vocab: [
      ["trgovina", "shop / store"], ["trgovački centar", "shopping mall"], ["cijena", "price"], ["novac", "money"], ["euro", "euro"],
      ["cent", "cent"], ["skupo", "expensive"], ["jeftino", "cheap"], ["popust", "discount"], ["kupiti", "to buy"], ["platiti", "to pay"],
      ["gotovina", "cash"], ["kartica", "card"], ["račun", "receipt / bill"], ["vrećica", "bag"], ["veličina", "size"],
      ["boja", "color"], ["crn / crna", "black"], ["bijel / bijela", "white"], ["crven / crvena", "red"], ["plav / plava", "blue"],
      ["zelen / zelena", "green"], ["žut / žuta", "yellow"], ["majica", "T-shirt"], ["hlače", "pants"], ["haljina", "dress"],
      ["cipele", "shoes"], ["kaput", "coat"], ["šešir", "hat"], ["Koliko košta…?", "How much is…?"], ["Imate li…?", "Do you have…?"],
      ["To je preskupo.", "That's too expensive."], ["Gdje je kabina?", "Where is the fitting room?"], ["Mogu li platiti karticom?", "Can I pay by card?"]
    ],
    dialogue: {
      title: "U trgovini odjeće",
      lines: [
        ["Prodavač", "Dobar dan! Mogu li vam pomoći?"], ["Ana", "Dobar dan! Tražim majicu."],
        ["Prodavač", "Koju boju želite?"], ["Ana", "Plavu, molim. Koliko košta ova?"],
        ["Prodavač", "Dvadeset eura."], ["Ana", "Dobro. Gdje je kabina?"], ["Prodavač", "Tamo, desno."]
      ]
    },
    exercises: [
      { type: "mcq", q: "'Koliko košta…?' znači…", options: ["Where is…?", "How much is…?", "Do you have…?", "What time is it?"], answer: 1 },
      { type: "mcq", q: "'Skupo' znači…", options: ["cheap", "expensive", "free", "nice"], answer: 1 },
      { type: "mcq", q: "Dopuni: 'Košta pet ___.' (euro)", options: ["eura", "euri", "euro", "eur"], answer: 0 },
      { type: "fill", q: "'Cheap' = ___.", answer: "jeftino" },
      { type: "fill", q: "'Shoes' = ___.", answer: "cipele" },
      { type: "match", q: "Poveži boje:", pairs: [["crvena", "red"], ["plava", "blue"], ["žuta", "yellow"], ["zelena", "green"]] },
      { type: "translate", q: "Prevedi: 'How much is this?'", answers: ["koliko košta ovo"] },
      { type: "translate", q: "Prevedi: 'Can I pay by card?'", answers: ["mogu li platiti karticom"] },
      { type: "mcq", q: "'To je preskupo' znači…", options: ["It's very cheap", "That's too expensive", "I want that", "Where is the cashier?"], answer: 1 }
    ],
    quiz: [
      { q: "Kako kažemo 'money'?", options: ["cijena", "novac", "račun", "popust"], answer: 1 },
      { q: "Dopuni: 'Košta dva ___.' (euro)", options: ["eura", "euri", "euro", "eur"], answer: 0 },
      { q: "'Jeftino' znači…", options: ["expensive", "cheap", "free", "slow"], answer: 1 },
      { q: "Kako kažemo 'size'?", options: ["boja", "cijena", "veličina", "vrećica"], answer: 2 },
      { q: "'Imate li…?' znači…", options: ["Do you have…?", "Do you want…?", "Where is…?", "How much…?"], answer: 0 }
    ]
  },
  {
    id: 8,
    title: "Posao, studij i svakodnevica",
    intro: "Opisati svoj posao ili studij te uobičajene dnevne aktivnosti.",
    grammar: "Glagoli na -ati (raditi, učiti, čitati): radim, radiš, radi, radimo, radite, rade. Glagol IĆI (to go): idem, ideš, ide, idemo, idete, idu. Vrijeme: 'Ujutro idem na posao.'",
    grammarExamples: ["Radim kao učitelj. — I work as a teacher.", "Studiram medicinu. — I study medicine.", "Ujutro ustajem u sedam sati. — I get up at seven in the morning."],
    vocab: [
      ["posao", "job / work"], ["raditi", "to work"], ["studirati", "to study"], ["učiti", "to learn / study"], ["škola", "school"],
      ["fakultet", "faculty"], ["ured", "office"], ["sastanak", "meeting"], ["poslodavac", "employer"], ["plaća", "salary"],
      ["radno vrijeme", "working hours"], ["slobodan dan", "day off"], ["odmor", "vacation"], ["putovanje", "travel / trip"],
      ["ustati", "to get up"], ["doručkovati", "to have breakfast"], ["ručati", "to have lunch"], ["večerati", "to have dinner"],
      ["ići", "to go"], ["spavati", "to sleep"], ["čitati", "to read"], ["gledati", "to watch"], ["slušati", "to listen"],
      ["pisati", "to write"], ["telefonirati", "to call"], ["raditi na računalu", "to work on the computer"], ["voziti se", "to commute"],
      ["Što radiš?", "What do you do?"], ["Gdje radiš?", "Where do you work?"], ["Kada počinješ?", "When do you start?"],
      ["Koliko traje…?", "How long does… take?"]
    ],
    dialogue: {
      title: "Razgovor o poslu",
      lines: [
        ["Ana", "Što radiš?"], ["Marko", "Radim kao programer u jednom uredu u centru."],
        ["Ana", "Kada počinješ raditi?"], ["Marko", "U osam sati ujutro. A ti studiraš?"],
        ["Ana", "Da, studiram hrvatski jezik na fakultetu."], ["Marko", "Zanimljivo! Koliko dugo traje studij?"],
        ["Ana", "Tri godine."]
      ]
    },
    exercises: [
      { type: "mcq", q: "'Što radiš?' znači…", options: ["Where do you work?", "What do you do?", "When do you start?", "How are you?"], answer: 1 },
      { type: "mcq", q: "Dopuni: 'Ja ___ kao učitelj.' (raditi)", options: ["radim", "radiš", "radi", "radimo"], answer: 0 },
      { type: "mcq", q: "Dopuni: 'Mi ___ u osam sati.' (ići)", options: ["idem", "ideš", "ide", "idemo"], answer: 3 },
      { type: "fill", q: "'To get up' = ___.", answer: "ustati" },
      { type: "fill", q: "'Vacation' = ___.", answer: "odmor" },
      { type: "match", q: "Poveži:", pairs: [["učiti", "to learn"], ["čitati", "to read"], ["spavati", "to sleep"], ["pisati", "to write"]] },
      { type: "translate", q: "Prevedi: 'I work as a teacher.' (muški rod)", answers: ["radim kao učitelj"] },
      { type: "translate", q: "Prevedi: 'I study medicine.'", answers: ["studiram medicinu"] },
      { type: "mcq", q: "'Ujutro ustajem u sedam sati.' — kada ustaješ?", options: ["Uvečer", "U sedam sati ujutro", "U podne", "Nikad"], answer: 1 }
    ],
    quiz: [
      { q: "Kako kažemo 'job'?", options: ["škola", "posao", "odmor", "plaća"], answer: 1 },
      { q: "Dopuni: 'Ti ___ hrvatski.' (učiti)", options: ["učim", "učiš", "uči", "učimo"], answer: 1 },
      { q: "'Slobodan dan' znači…", options: ["working day", "day off", "Monday", "lunch break"], answer: 1 },
      { q: "Kako kažemo 'to commute'?", options: ["voziti se", "spavati", "čitati", "raditi"], answer: 0 },
      { q: "Dopuni: '___ počinješ raditi?' znači 'When do you start working?'", options: ["Gdje", "Što", "Kada", "Koliko"], answer: 2 }
    ]
  },
  {
    id: 9,
    title: "Zdravlje, tijelo i kod liječnika",
    intro: "Riječi za dijelove tijela i osnovni razgovor kod liječnika.",
    grammar: "Bol se izražava s 'boli me' + imenica: 'Boli me glava.' = My head hurts. Groznica: 'Imam temperaturu.' Lijekovi: 'Uzmite tabletu dva puta dnevno.'",
    grammarExamples: ["Boli me zub. — My tooth hurts.", "Imam temperaturu. — I have a fever.", "Trebam liječnika. — I need a doctor."],
    vocab: [
      ["tijelo", "body"], ["glava", "head"], ["zub", "tooth"], ["oko", "eye"], ["nos", "nose"], ["uho", "ear"], ["usta", "mouth"],
      ["vrat", "neck"], ["ruka", "arm / hand"], ["noga", "leg / foot"], ["trbuh", "stomach"], ["leđa", "back"], ["prst", "finger"],
      ["srce", "heart"], ["zdravlje", "health"], ["bolnica", "hospital"], ["liječnik / liječnica", "doctor (m/f)"], ["hitna pomoć", "emergency care"],
      ["temperatura", "fever / temperature"], ["kašalj", "cough"], ["bol", "pain"], ["lijek", "medicine"], ["tableta", "pill"],
      ["recept", "prescription"], ["osiguranje", "insurance"], ["bolestan / bolesna", "sick"], ["zdrav / zdrava", "healthy"],
      ["Boli me…", "… hurts / I have a pain in…"], ["Imam temperaturu.", "I have a fever."], ["Trebam liječnika.", "I need a doctor."],
      ["Gdje je najbliža ljekarna?", "Where is the nearest pharmacy?"]
    ],
    dialogue: {
      title: "Kod liječnika",
      lines: [
        ["Ana", "Dobar dan! Imam termin u deset sati."], ["Sestra", "Dobar dan! Pričekajte malo, molim."],
        ["Liječnik", "Dobar dan! Što vam je?"], ["Ana", "Boli me glava i imam temperaturu."],
        ["Liječnik", "Dobro. Uzmite ovu tabletu dva puta dnevno."], ["Ana", "Hvala! Koliko košta lijek?"],
        ["Liječnik", "Petnaest eura. Doviđenja!"]
      ]
    },
    exercises: [
      { type: "mcq", q: "'Boli me glava' znači…", options: ["My head hurts", "I have headache medicine", "My hand hurts", "I am healthy"], answer: 0 },
      { type: "mcq", q: "Dopuni: '___ temperaturu.' (imati)", options: ["Imam", "Imaš", "Ima", "Imamo"], answer: 0 },
      { type: "mcq", q: "'Ljekarna' je…", options: ["hospital", "pharmacy", "office", "school"], answer: 1 },
      { type: "fill", q: "'Tooth' = ___.", answer: "zub" },
      { type: "fill", q: "'I need a doctor' = '___ liječnika.'", answer: "Trebam" },
      { type: "match", q: "Poveži dijelove tijela:", pairs: [["ruka", "arm/hand"], ["noga", "leg/foot"], ["uho", "ear"], ["oko", "eye"]] },
      { type: "translate", q: "Prevedi: 'My tooth hurts.'", answers: ["boli me zub"] },
      { type: "translate", q: "Prevedi: 'I have a fever.'", answers: ["imam temperaturu"] },
      { type: "mcq", q: "'Bolesna sam' znači (ženski rod)…", options: ["I am healthy", "I am sick", "I am tired", "I am happy"], answer: 1 }
    ],
    quiz: [
      { q: "Kako kažemo 'head'?", options: ["ruka", "noga", "glava", "zub"], answer: 2 },
      { q: "Dopuni: 'Boli me ___.' znači 'My stomach hurts.'", options: ["glava", "zub", "trbuh", "vrat"], answer: 2 },
      { q: "'Zdrav' znači…", options: ["sick", "healthy", "tired", "hungry"], answer: 1 },
      { q: "Kako kažemo 'medicine'?", options: ["tableta", "recept", "lijek", "bol"], answer: 2 },
      { q: "'Hitna pomoć' je…", options: ["pharmacy", "emergency care", "insurance", "prescription"], answer: 1 }
    ]
  },
  {
    id: 10,
    title: "Putovanja, smještaj i završetak A1",
    intro: "Riječi za putovanja, rezervaciju smještaja i pregled svega što ste naučili na A1 razini.",
    grammar: "Buduće vrijeme: prezent pomoćnog glagola htjeti + infinitiv: 'Sutra ću putovati.' = Tomorrow I will travel. Akuzativ prijedloga 'na': 'rezervaciju na ime Ana'.",
    grammarExamples: ["Putujem u Hrvatsku u srpnju. — I'm traveling to Croatia in July.", "Sutra ću rezervirati hotel. — Tomorrow I'll book a hotel.", "Imam rezervaciju na ime… — I have a reservation under the name…"],
    vocab: [
      ["putovanje", "trip / travel"], ["putovati", "to travel"], ["odmor", "vacation"], ["izlet", "excursion"], ["prtljag", "luggage"],
      ["kovčeg", "suitcase"], ["putovnica", "passport"], ["karta", "ticket"], ["rezervacija", "reservation"], ["hotel", "hotel"],
      ["soba", "room"], ["jednokrevetna soba", "single room"], ["dvokrevetna soba", "double room"], ["recepcija", "reception"],
      ["doručak", "breakfast"], ["uključen", "included"], ["plaža", "beach"], ["more", "sea"], ["otok", "island"], ["planina", "mountain"],
      ["zemlja", "country"], ["glavni grad", "capital city"], ["jezik", "language"], ["riječ", "word"],
      ["rečenica", "sentence"], ["razgovor", "conversation"], ["Imam rezervaciju.", "I have a reservation."], ["Koliko noćenja?", "How many nights?"],
      ["Je li doručak uključen?", "Is breakfast included?"], ["Gdje je soba?", "Where is the room?"], ["Hvala na pomoći!", "Thanks for your help!"]
    ],
    dialogue: {
      title: "Na recepciji hotela",
      lines: [
        ["Ana", "Dobar dan! Imam rezervaciju na ime Ana."], ["Recepcionar", "Dobar dan! Da, dvokrevetna soba za tri noćenja."],
        ["Ana", "Je li doručak uključen?"], ["Recepcionar", "Da, doručak je u cijeni."],
        ["Ana", "Odlično! Gdje je soba?"], ["Recepcionar", "Na trećem katu, soba 305. Uživajte u boravku!"]
      ]
    },
    exercises: [
      { type: "mcq", q: "'Imam rezervaciju' znači…", options: ["I have luggage", "I have a reservation", "I have a ticket", "I have a room key"], answer: 1 },
      { type: "mcq", q: "Dopuni: 'Sutra ___ putovati.' (buduće vrijeme)", options: ["ću", "si", "sam", "je"], answer: 0 },
      { type: "mcq", q: "'Koliko noćenja?' znači…", options: ["How many rooms?", "How many nights?", "How much is the night?", "What floor?"], answer: 1 },
      { type: "fill", q: "'Passport' = ___.", answer: "putovnica" },
      { type: "fill", q: "'Suitcase' = ___.", answer: "kovčeg" },
      { type: "match", q: "Poveži:", pairs: [["more", "sea"], ["otok", "island"], ["planina", "mountain"], ["karta", "ticket"]] },
      { type: "translate", q: "Prevedi: 'I have a reservation under the name Ana.'", answers: ["imam rezervaciju na ime ana"] },
      { type: "translate", q: "Prevedi: 'Is breakfast included?'", answers: ["je li doručak uključen"] },
      { type: "mcq", q: "'Uživajte!' znači…", options: ["Goodbye", "Enjoy your stay", "Please sit", "Hurry up"], answer: 1 }
    ],
    quiz: [
      { q: "Kako kažemo 'trip'?", options: ["putovanje", "soba", "karta", "jezik"], answer: 0 },
      { q: "Dopuni: '___ ću rezervirati hotel.' (sutra)", options: ["Sutra", "Jučer", "Sada", "Nikad"], answer: 0 },
      { q: "'Dvokrevetna soba' je…", options: ["single room", "double room", "reception", "bathroom"], answer: 1 },
      { q: "Kako kažemo 'capital city'?", options: ["glavni grad", "glavna ulica", "veliki grad", "mali grad"], answer: 0 },
      { q: "'Hvala na pomoći!' znači…", options: ["I need help", "Thanks for your help", "Where is the help?", "Help me!"], answer: 1 }
    ]
  }
];

const GRAMMAR_REFERENCE = [
  {
    title: "Glagol BITI (to be) — prezent",
    rows: [["ja", "jesam", "I am"], ["ti", "jesi", "you are (inf.)"], ["on/ona/ono", "jest / je", "he/she/it is"], ["mi", "jesmo", "we are"], ["vi", "jeste", "you are (pl./form.)"], ["oni/one/ona", "jesu", "they are"]]
  },
  {
    title: "Glagol HTJETI (to want) — prezent",
    rows: [["ja", "hoću", "I want"], ["ti", "hoćeš", "you want"], ["on/ona/ono", "hoće", "he/she/it wants"], ["mi", "hoćemo", "we want"], ["vi", "hoćete", "you want"], ["oni/one/ona", "hoće", "they want"]]
  },
  {
    title: "Glagol IĆI (to go) — prezent",
    rows: [["ja", "idem", "I go"], ["ti", "ideš", "you go"], ["on/ona/ono", "ide", "he/she/it goes"], ["mi", "idemo", "we go"], ["vi", "idete", "you go"], ["oni/one/ona", "idu", "they go"]]
  },
  {
    title: "Glagoli na -ati (raditi, učiti, čitati…)",
    rows: [["ja", "radim / učim / čitam", "I work / learn / read"], ["ti", "radiš / učiš / čitaš", ""], ["on/ona/ono", "radi / uči / čita", ""], ["mi", "radimo / učimo / čitamo", ""], ["vi", "radite / učite / čitate", ""], ["oni/one/ona", "rade / uče / čitaju", ""]]
  },
  {
    title: "Brojevi 1–5 i imenice",
    rows: [["1", "jedan student", "one student"], ["2", "dva studenta", "two students"], ["3–4", "tri / četiri studenta", ""], ["5+", "pet studenata", "five students"]]
  },
  {
    title: "Prisvojne zamjenice (moj, tvoj…)",
    rows: [["muški rod", "moj brat", "my brother"], ["ženski rod", "moja sestra", "my sister"], ["srednji rod", "moje dijete", "my child"], ["mi", "naša obitelj", "our family"], ["vi", "vaš grad", "your city"]]
  },
  {
    title: "Prijedlozi mjesta",
    rows: [["u + lokativ", "u gradu, u školi", "in the city, at school"], ["na + lokativ", "na trgu, na plaži", "on the square, at the beach"], ["do + genitiv", "do centra", "to the center"], ["kod + genitiv", "kod liječnika", "at the doctor's"]]
  },
  {
    title: "Buduće vrijeme (futur)",
    rows: [["ja", "ću + infinitiv: ću raditi", "I will work"], ["ti", "ćeš raditi", "you will work"], ["on", "će raditi", "he will work"], ["mi", "ćemo raditi", "we will work"]]
  },
  {
    title: "Padeži — pregled za A1",
    rows: [["nominativ", "Tko? Što? — Ana, stol", "who? what?"], ["akuzativ", "Koga? Što? — vidim Anu, kavu", "whom? what? (object)"], ["lokativ", "Gdje? — u gradu, na stolu", "where?"], ["instrumental", "S kim? Čime? — autobusom", "with whom? by what?"]]
  }
];

const EXAM = {
  title: "Probni ispit — Hrvatski jezik, razina A1",
  intro: "Ovaj probni ispit oponaša strukturu stvarnog A1 ispita: razumijevanje čitanja, gramatika, vokabular i kratki pisani zadatak. Za prolaz je potrebno najmanje 60% točnih odgovora. Sretno!",
  passingScore: 60,
  sections: [
    {
      name: "1. Razumijevanje čitanja (Reading)",
      questions: [
        { q: "Tekst: 'Marko je iz Zagreba. On je student i ima dvadeset godina. Voli kavu i čitati.' — Odakle je Marko?", options: ["Iz Splita", "Iz Zagreba", "Iz Rijeke", "Iz Europe"], answer: 1 },
        { q: "Isti tekst — koliko Marko ima godina?", options: ["Dvadeset i jedna", "Devetnaest", "Dvadeset", "Trideset"], answer: 2 },
        { q: "Isti tekst — što Marko voli?", options: ["Pivo i meso", "Kavu i čitanje", "Nogomet", "Spavanje"], answer: 1 },
        { q: "Tekst: 'Ana radi kao učiteljica u školi u Splitu. Ujutro ustaje u sedam sati.' — Gdje Ana radi?", options: ["U uredu", "U kafiću", "U školi u Splitu", "Kod kuće"], answer: 2 },
        { q: "Isti tekst — kada Ana ustaje?", options: ["U šest sati", "U sedam sati ujutro", "U osam sati", "U podne"], answer: 1 }
      ]
    },
    {
      name: "2. Gramatika (Grammar)",
      questions: [
        { q: "Dopuni: 'Ja ___ iz Hrvatske.' (biti)", options: ["jesam", "jesi", "jest", "jesmo"], answer: 0 },
        { q: "Dopuni: 'Hoću ___.' (kava, akuzativ)", options: ["kava", "kavu", "kave", "kavi"], answer: 1 },
        { q: "Dopuni: 'Sada je četiri ___.'", options: ["sat", "sata", "sati", "satima"], answer: 1 },
        { q: "Dopuni: '___ brat živi u Rijeci.' (moj)", options: ["Moj", "Moja", "Moje", "Moji"], answer: 0 },
        { q: "Dopuni: 'Idite ravno, pa ___.' znači 'go left'", options: ["desno", "lijevo", "tamo", "ovdje"], answer: 1 },
        { q: "Dopuni: 'Boli me ___.' znači 'My head hurts.'", options: ["zub", "noga", "glava", "ruka"], answer: 2 },
        { q: "Dopuni: 'Imam dvadeset ___ jednu godinu.' znači 'I am 21.'", options: ["i", "ili", "pa", "ali"], answer: 0 },
        { q: "Dopuni: 'Sutra ___ putovati u Split.' (buduće vrijeme)", options: ["ću", "sam", "si", "bih"], answer: 0 }
      ]
    },
    {
      name: "3. Rječnik u kontekstu (Vocabulary in context)",
      questions: [
        { q: "U restoranu kažete: '___ , molim!'", options: ["Jelovnik", "Račun", "Stol", "Vodu"], answer: 1 },
        { q: "Kod liječnika kažete: '___ temperaturu.'", options: ["Imam", "Boli", "Trebam", "Vidim"], answer: 0 },
        { q: "U trgovini: 'Koliko ___ ova haljina?'", options: ["košta", "je", "ima", "imaš"], answer: 0 },
        { q: "Pitate za put: '___ je kolodvor?'", options: ["Tko", "Što", "Gdje", "Kada"], answer: 2 },
        { q: "Na recepciji: 'Je li ___ uključen?' (doručak)", options: ["cijena", "doručak", "noćenje", "soba"], answer: 1 }
      ]
    },
    {
      name: "4. Kratki pisani zadatak (Short writing)",
      questions: [
        { q: "Napiši 3–5 rečenica o sebi (ime, odakle si, koliko imaš godina, što radiš ili studiraš).", type: "writing", modelAnswer: "Zovem se Ana. Iz Zagreba sam. Imam dvadeset godina. Studiram hrvatski jezik." }
      ]
    }
  ]
};

const PHRASES = [
  ["Bok! / Zdravo!", "Hi!"], ["Dobar dan!", "Good day!"], ["Dobra večer!", "Good evening!"],
  ["Laku noć!", "Good night!"], ["Doviđenja!", "Goodbye!"], ["Vidimo se!", "See you!"],
  ["Hvala (velika)!", "Thank you (very much)!"], ["Molim.", "Please. / You're welcome."],
  ["Oprostite.", "Excuse me. / Sorry."], ["Ne razumijem.", "I don't understand."],
  ["Možete li ponoviti?", "Can you repeat? (formal)"], ["Govorite li engleski?", "Do you speak English?"],
  ["Ne govorim hrvatski (dobro).", "I don't speak Croatian (well)."], ["Polako, molim.", "Slowly, please."],
  ["Kako se kaže…?", "How do you say…?"], ["Što znači…?", "What does… mean?"],
  ["Drago mi je!", "Nice to meet you!"], ["Čestitam!", "Congratulations!"], ["Sretan rođendan!", "Happy birthday!"],
  ["Dobar tek!", "Enjoy your meal!"], ["Živjeli!", "Cheers!"], ["Nazdravlje!", "Bless you! (sneeze)"],
  ["Račun, molim!", "The bill, please!"], ["Još jedno, molim.", "One more, please."],
  ["Gdje je WC?", "Where is the toilet?"], ["Koliko košta?", "How much is it?"],
  ["Gdje mogu…?", "Where can I…?"], ["Imate li…?", "Do you have…?"],
  ["Boli me ovdje.", "It hurts here."], ["Trebam liječnika.", "I need a doctor."],
  ["Zovite policiju!", "Call the police!"], ["Zovite hitnu!", "Call an ambulance!"],
  ["Gdje je najbliža…?", "Where is the nearest…?"], ["Idite ravno.", "Go straight."],
  ["Okrenite lijevo / desno.", "Turn left / right."], ["Hvala na pomoći!", "Thanks for your help!"],
  ["Nema na čemu.", "You're welcome. / No problem."], ["Sve najbolje!", "All the best!"], ["Sretan put!", "Have a good trip!"]
];

const ALL_VOCAB = UNITS.flatMap(u => u.vocab.map(([hr, en]) => ({ hr, en, unit: u.id, unitTitle: u.title })));
