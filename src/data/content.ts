import { ServiceItem, Testimonial, BeforeAfterCase, FAQItem, CompanyInfo } from '../types';

export const COMPANY_INFO: CompanyInfo = {
  name: "DuaAri Clean & Service",
  tagline: "Ihr Premium-Partner für erstklassige Gebäudereinigung in Ingolstadt & Region",
  street: "Holznerstraße 11",
  postalCode: "85053",
  city: "Ingolstadt",
  phonePrimary: "+49 (0) 172 913 7116",
  phoneSecondary: "+49 (0) 176 725 56309",
  email: "DuaAricleanservice@gmail.com",
  hours: "Mo - Sa: 07:00 - 20:00 Uhr | Notdienst 24/7",
  coverageArea: [
    "Ingolstadt",
    "Manching",
    "Pfaffenhofen a.d. Ilm",
    "Neuburg a.d. Donau",
    "Eichstätt",
    "Kösching",
    "Gaimersheim",
    "Geisenfeld",
    "Schrobenhausen",
    "München Nord"
  ]
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "unterhaltsreinigung",
    title: "Unterhaltsreinigung",
    category: "commercial",
    badge: "Bestseller",
    popular: true,
    priceFrom: "ab 28,00 € / Std.",
    frequencyRecommendation: "Täglich bis wöchentlich",
    shortDescription: "Regelmäßige, werterhaltende Sauberkeit für Bürogebäude, Geschäftsräume und Praxen.",
    fullDescription: "Unsere Unterhaltsreinigung sichert dauerhafte Frische, absolute Hygiene und einen makellosen ersten Eindruck bei Kunden und Mitarbeitern. Nach einem maßgeschneiderten Reinigungsplan säubern wir Böden, Arbeitsplätze, Sanitäranlagen und Küchenbereiche.",
    iconName: "Sparkles",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=80",
    checklist: [
      "Staub- und Feuchtreinigung aller freien Arbeitsflächen & Tische",
      "Saugen und Wischen aller Bodenbeläge (Parkett, Fliesen, Teppich)",
      "Hygienische Desinfektion und Reinigung der Sanitäranlagen",
      "Auffüllen von Verbrauchsmaterialien (Seife, Papier, Handtücher)",
      "Müllentleerung und fachgerechte Mülltrennung",
      "Feuchtreinigung von Griffen, Schaltern und Türen"
    ],
    benefits: [
      "Feste Reinigungsteams für höchste Diskretion",
      "Flexible Einsatzzeiten außerhalb Ihrer Bürozeiten (früh/spät)",
      "Ökologisch unbedenkliche, materialschonende Pflegemittel"
    ]
  },
  {
    id: "buero-gewerbereinigung",
    title: "Büro- & Gewerbereinigung",
    category: "commercial",
    badge: "Für Unternehmen",
    popular: true,
    priceFrom: "Individuelles Festpreisangebot",
    frequencyRecommendation: "1x bis 5x wöchentlich",
    shortDescription: "Repräsentative Sauberkeit und Wohlfühlatmosphäre für moderne Arbeitsumgebungen.",
    fullDescription: "Ein sauberes Büro fördert Konzentration, senkt Krankheitsausfälle und vermittelt Professionalität. Wir reinigen Kanzleien, Agenturen, Co-Working Spaces und Firmenzentralen zuverlässig nach höchsten Standards.",
    iconName: "Building2",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80",
    checklist: [
      "Ergonomische Tastatur- & Monitor-Oberflächenpflege",
      "Meetingräume und Konferenztechnik einsatzbereit herrichten",
      "Kaffeeküchen, Mikrowellen und Geschirrspülerservice",
      "Glaswände & Raumteiler streifenfrei polieren",
      "Teppichböden tiefensaugen & Fleckentfernung",
      "Empfangsbereich hochglanzpolieren"
    ],
    benefits: [
      "Erprobtes 4-Farb-Hygienesystem gegen Keimverschleppung",
      "Volle Haftpflichtversicherung für jedes Objekt",
      "Transparente monatliche Sammelrechnung"
    ]
  },
  {
    id: "glas-fensterreinigung",
    title: "Glas- & Fensterreinigung",
    category: "special",
    badge: "Streifenfreier Glanz",
    priceFrom: "ab 4,50 € / m² Glasfläche",
    frequencyRecommendation: "Monatlich oder vierteljährlich",
    shortDescription: "Kristallklare Sicht für Schaufenster, Glasfassaden, Wintergärten und Bürofenster.",
    fullDescription: "Streifenfreie Fenster ohne Schlieren, auch an schwer erreichbaren Stellen. Wir reinigen Scheiben inklusive Fensterrahmen, Fensterfalzen, Fensterbänken und Sonnenschutzlamellen mit Profi-Ausrüstung und Osmose-Technologie.",
    iconName: "Maximize2",
    image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1000&q=80",
    checklist: [
      "Innen- und Außenreinigung von Fenstern aller Art",
      "Rahmenreinigung & Falzreinigung (Entfernung von Moos & Ruß)",
      "Schaufenster- und Schaukästenreinigung für den Einzelhandel",
      "Wintergärten & Glasüberdachungen inkl. Moosentfernung",
      "Lamellen- und Jalousien-Reinigung",
      "Einsatz von Reinwasser/Osmose-Technik ohne Chemie"
    ],
    benefits: [
      "Rückstandsfreies Trocknen ohne Kalkflecken",
      "Sicherheitsgeschultes Personal für Höhenarbeiten",
      "Schnelle Ausführung auch bei kurzfristigem Bedarf"
    ]
  },
  {
    id: "baureinigung",
    title: "Baureinigung & Bauendreinigung",
    category: "construction",
    badge: "Bezugsfertig",
    priceFrom: "ab 3,80 € / m²",
    frequencyRecommendation: "Nach Bau- / Sanierungsphase",
    shortDescription: "Grob-, Zwischen- und Feinreinigung für schlüsselfertige Übergaben von Neubauten und Sanierungen.",
    fullDescription: "Nach Bauarbeiten oder Renovierungen befreien wir Ihre Immobilie von Bauschutt, Zementschleiern, Farb- und Lackspritzern, Feinstaub und Kleberesten, damit die Räume pünktlich und makellos bezogen werden können.",
    iconName: "Hammer",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
    checklist: [
      "Bau-Grobreinigung: Entfernung von Mörtelresten & Bauschutt",
      "Bau-Zwischenreinigung für nachfolgende Gewerke",
      "Bau-Feinreinigung / Bauabschlussreinigung bezugsfertig",
      "Beseitigung von Zementschleiern, Silikon- & Farbspritzern",
      "Tiefenentstaubung von Lüftungsrohren, Decken & Nischen",
      "Schutzfolienentfernung von Fenstern, Sanitär und Türen"
    ],
    benefits: [
      "Pünktliche Einhaltung straffer Bauzeitenpläne",
      "Schonende Beseitigung hartnäckiger Baustoffreste",
      "Abnahmegarantie mit Bauleiter-Protokoll"
    ]
  },
  {
    id: "treppenhausreinigung",
    title: "Treppenhausreinigung",
    category: "residential",
    badge: "Hausverwaltungen",
    priceFrom: "ab 18,00 € pro Etage / Monat",
    frequencyRecommendation: "Wöchentlich oder 14-tägig",
    shortDescription: "Zuverlässige Pflege für Hausverwaltungen, Eigentümergemeinschaften und Mehrfamilienhäuser.",
    fullDescription: "Ein gepflegtes Treppenhaus ist die Visitenkarte jedes Wohngebäudes. Wir übernehmen die turnusmäßige Reinigung von Eingangsbereichen, Treppenstufen, Handläufen, Aufzügen und Kellergängen zur Entlastung aller Bewohner.",
    iconName: "Layers",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80",
    checklist: [
      "Kehren und feuchtes Wischen aller Treppen & Podeste",
      "Abwischen von Geländern, Handläufen und Fensterbänken",
      "Reinigung von Hauseingangstüren, Briefkasten- & Klingelanlagen",
      "Spiegel-, Glas- und Aufzugkabinenreinigung",
      "Kellergänge, Waschküchen und Fahrradräume nach Plan",
      "Spinnwebenbeseitigung im gesamten Hausflur"
    ],
    benefits: [
      "Fester Tourenplan & digitaler digitaler Aushang / Nachweis",
      "Attraktive Staffelpreise für größere Liegenschaften",
      "Kein Ärger mehr mit der Kehrwoche unter Mietern"
    ]
  },
  {
    id: "grundreinigung",
    title: "Grund- & Sonderreinigung",
    category: "special",
    badge: "Tiefenreinigung",
    priceFrom: "Individuelle Kalkulation",
    frequencyRecommendation: "1-2 Mal jährlich",
    shortDescription: "Intensive Tiefenreinigung für beanspruchte Böden, Teppiche, Sanitär- und Küchenanlagen.",
    fullDescription: "Wenn die normale Unterhaltsreinigung nicht mehr ausreicht: Wir lösen alte Pflegemittelfilme, entfernen hartnäckige Verschmutzungen maschinell und versiegeln Böden neu für langanhaltenden Schutz.",
    iconName: "ShieldCheck",
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=1000&q=80",
    checklist: [
      "Maschinelle Einscheiben-Grundreinigung von PVC, Linoleum & Fliesen",
      "Neue Einpflege und Polymer-Versiegelung von Hartböden",
      "Sprühextraktion & Shampoonierung von Teppichen & Polstern",
      "Intensiv-Entkalkung und Fugen-Tiefenreinigung in Nassräumen",
      "Reinigung von Heizkörpern, Lampen und Deckenkonstruktionen",
      "Geruchsneutralisation und professionelle Desinfektion"
    ],
    benefits: [
      "Wertsteigerung und Lebensdauer-Verlängerung Ihrer Böden",
      "Einsatz moderner Industriemaschinen",
      "Maßgeschneiderte Schutzversiegelungen"
    ]
  },
  {
    id: "praxisreinigung",
    title: "Praxis- & Hygiene-Reinigung",
    category: "commercial",
    badge: "RKI-Konform",
    priceFrom: "Nach Hygieneplan",
    frequencyRecommendation: "Täglich",
    shortDescription: "Zertifizierte Hygienestandards für Arztpraxen, Labore und therapeutische Einrichtungen.",
    fullDescription: "Höchste Keimfreiheit und strikte Einhaltung der Hygienevorschriften nach Infektionsschutzgesetz und RKI-Richtlinien. Wir desinfizieren Behandlungsräume, Wartezimmer und Sanitärbereiche mit validierten Mitteln.",
    iconName: "HeartPulse",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80",
    checklist: [
      "Wischdesinfektion patientennaher Kontaktflächen & Liegen",
      "Hygienische Reinigung von Empfang, Wartezimmer & Labor",
      "Farblich kodierte Reinigungstücher je Raumtyp",
      "Lückenlose Führung des Desinfektions- & Reinigungsplans",
      "Entsorgung von Praxisabfällen nach Vorschrift",
      "Geräteoberflächen-Schonreinigung"
    ],
    benefits: [
      "Geschultes Personal für medizinische Hygienekonzepte",
      "Geprüfte VAH- und RKI-gelistete Desinfektionsmittel",
      "Sicherheit für Patienten und Praxis-Audits"
    ]
  },
  {
    id: "umzugsreinigung",
    title: "Umzugs- & Endreinigung",
    category: "residential",
    badge: "100% Abnahmegarantie",
    priceFrom: "ab 290,00 € Pauschal",
    frequencyRecommendation: "Einmalig bei Auszug / Einzug",
    shortDescription: "Komplette Wohnungsübergabe ohne Stress mit garantierter Abnahme durch den Vermieter.",
    fullDescription: "Verlassen Sie Ihre alte Wohnung blitzblank. Wir reinigen die gesamte Wohnung inklusive Küche (Backofen, Dunstabzugshaube, Kühlschrank), Bad, Fenstern, Türen und Böden und garantieren eine reibungslose Übergabe.",
    iconName: "Truck",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
    checklist: [
      "Küchenreinigung inkl. Herd, Backofen, Schränke innen/außen",
      "Komplettes Badezimmer inkl. Armaturen, Fliesen & Entkalkung",
      "Fensterputzen inkl. Fensterrahmen und Fensterbänken",
      "Türen, Zargen, Steckdosen und Fußleisten feucht abwischen",
      "Böden saugen und feucht wischen bzw. intensiv reinigen",
      "Persönliche Anwesenheit bei der Vermieter-Abnahme auf Wunsch"
    ],
    benefits: [
      "Kostenlose Nachreinigung falls Vermieter beanstandet",
      "Fester Pauschalpreis ohne versteckte Zusatzkosten",
      "Zeit- und Nervenersparnis beim Umzug"
    ]
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "1",
    name: "Dr. Markus Weber",
    role: "Inhaber & Zahnarzt",
    company: "Zahnarztpraxis Weber & Partner",
    location: "Ingolstadt Zentrum",
    rating: 5,
    text: "DuaAri Clean betreut unsere Praxisräume seit über zwei Jahren. Die Einhaltung der strengen Hygienevorschriften und die Zuverlässigkeit des Teams sind beispielhaft. Ein Partner, auf den man sich 100% verlassen kann!",
    service: "Praxis- & Unterhaltsreinigung",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    date: "Vor 2 Wochen"
  },
  {
    id: "2",
    name: "Sabine Lindner",
    role: "Property Managerin",
    company: "Bayern Immo Verwaltungs GmbH",
    location: "Pfaffenhofen & Ingolstadt",
    rating: 5,
    text: "Wir lassen über 15 Liegenschaften im Bereich Treppenhaus- und Glasreinigung von DuaAri Clean reinigen. Keine Beschwerden mehr von Eigentümern, transparente Protokolle und faire Preise. Absolut empfehlenswert!",
    service: "Treppenhausreinigung & Glasreinigung",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    date: "Vor 1 Monat"
  },
  {
    id: "3",
    name: "Florian Huber",
    role: "Geschäftsführer",
    company: "Huber IT Solutions GmbH",
    location: "Manching",
    rating: 5,
    text: "Unser Großraumbüro und die Besprechungsräume glänzen jeden Morgen perfekt. Besonders schätze ich die Diskretion und die umweltfreundlichen Reinigungsmittel, die keine unangenehmen Gerüche hinterlassen.",
    service: "Büroreinigung",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    date: "Vor 3 Wochen"
  },
  {
    id: "4",
    name: "Elena Petrovic",
    role: "Bauleiterin",
    company: "Alpen Bau & Projektentwicklung",
    location: "Neuburg an der Donau",
    rating: 5,
    text: "Die Bauendreinigung unseres 8-Parteien-Neubaus wurde in Rekordzeit und mit herausragender Gründlichkeit durchgeführt. Zementschleier und Baustaub restlos beseitigt. Übergabe war ein voller Erfolg.",
    service: "Baureinigung",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    date: "Vor 1 Monat"
  },
  {
    id: "5",
    name: "Michael & Claudia Schuster",
    role: "Privatkunden",
    company: "Einfamilienhaus",
    location: "Ingolstadt Süd",
    rating: 5,
    text: "Wir haben die Fenster- und Wintergartenreinigung gebucht. So sauber waren unsere Scheiben seit dem Einzug nicht mehr! Das Team war pünktlich, überaus freundlich und hat sehr sauber gearbeitet.",
    service: "Glas- & Fensterreinigung",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    date: "Vor 2 Monaten"
  }
];

export const BEFORE_AFTER_CASES: BeforeAfterCase[] = [
  {
    id: "case-office",
    title: "Büroboden & Konferenzraum Tiefenreinigung",
    subtitle: "Kanzlei Ingolstadt – 320 m²",
    category: "Büroreinigung",
    beforeImg: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=800&q=80",
    afterImg: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    metrics: { label: "Glanzgrad & Hygiene", value: "100% Wiederhergestellt" },
    description: "Vollständige Entfernung alter Laufstraßen und Polymerbeschichtung mit neuem Seidenglanz-Schutzfinish."
  },
  {
    id: "case-glass",
    title: "Fassaden- & Panoramafenster Osmosereinigung",
    subtitle: "Gewerbepark Ingolstadt – 180 m² Glas",
    category: "Glasreinigung",
    beforeImg: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    afterImg: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80",
    metrics: { label: "Lichtdurchlässigkeit", value: "+45% Streifenfrei" },
    description: "Rückstandsfreie Beseitigung hartnäckiger Umweltschadstoffe, Kalkablagerungen und Pollenfilm ohne Chemie."
  },
  {
    id: "case-construction",
    title: "Bauendreinigung nach Kernsanierung",
    subtitle: "Wohnanlage Neuburg – 540 m²",
    category: "Baureinigung",
    beforeImg: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    afterImg: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    metrics: { label: "Baufeinstaub", value: "0% Rückstände" },
    description: "Schlüsselfertige Übergabe: Beseitigung von Zementschleiern, Farbklecksen und vollständige Feinstaub-Entfernung."
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    id: "faq-1",
    category: "pricing",
    question: "Wie schnell erhalte ich ein individuelles Angebot?",
    answer: "In der Regel erhalten Sie innerhalb von 2 bis 4 Stunden nach Ihrer Anfrage über unseren Online-Rechner oder unser Kontaktformular ein detailliertes und transparentes Festpreis-Angebot. Bei komplexeren Objekten bieten wir vorab eine kostenfreie und unverbindliche Vor-Ort-Besichtigung an."
  },
  {
    id: "faq-2",
    category: "security",
    question: "Sind Ihre Mitarbeiter versichert und geschult?",
    answer: "Ja, zu 100%. All unsere Mitarbeiter sind fest angestellt, geschult im professionellen Umgang mit modernsten Reinigungstechniken und Sicherheitsstandards sowie über unsere umfassende Betriebshaftpflichtversicherung (bis zu 5 Mio. € Personen- und Sachschäden) abgesichert."
  },
  {
    id: "faq-3",
    category: "general",
    question: "Bringen Sie alle Reinigungsmittel und Geräte selbst mit?",
    answer: "Selbstverständlich! Unser Team bringt sämtliche Profi-Reinigungsgeräte (Industriesauger, Einscheibenmaschinen, Osmoseanlagen) sowie umweltfreundliche, pH-neutrale und materialgerechte Reinigungsmittel mit. Sie müssen sich um nichts kümmern."
  },
  {
    id: "faq-4",
    category: "process",
    question: "Können die Reinigungen auch außerhalb der Geschäftszeiten stattfinden?",
    answer: "Ja, maximale Flexibilität ist unsere Stärke. Wir reinigen gerne früh morgens vor Arbeitsbeginn, abends nach Feierabend oder am Wochenende, sodass Ihr Geschäftsbetrieb völlig ungestört bleibt."
  },
  {
    id: "faq-5",
    category: "process",
    question: "Gibt es feste Vertragslaufzeiten oder Kündigungsfristen?",
    answer: "Für einmalige Einsätze (wie Bau- oder Umzugsreinigungen) gibt es keinerlei Vertragsbindung. Bei regelmäßigen Unterhaltsreinigungen bieten wir faire und flexible Vertragsmodelle mit kurzen Kündigungsfristen, da wir durch unsere Qualität und nicht durch starre Verträge überzeugen."
  },
  {
    id: "faq-6",
    category: "general",
    question: "In welchem Umkreis ist DuaAri Clean & Service im Einsatz?",
    answer: "Wir sind im gesamten Raum Ingolstadt sowie im Umkreis von ca. 60 km aktiv – einschließlich Manching, Pfaffenhofen an der Ilm, Neuburg an der Donau, Eichstätt, Kösching, Geisenfeld und dem Münchener Norden."
  },
  {
    id: "faq-7",
    category: "security",
    question: "Wie läuft die Schlüsselübergabe und Diskretion ab?",
    answer: "Wir arbeiten mit sicheren Schlüsselprotokollen und strengen Datenschutz- und Diskretionsvereinbarungen. Viele unserer Kunden vertrauen uns seit Jahren die Reinigung ihrer Geschäfts- und Privaträume in ihrer Abwesenheit an."
  }
];

export const STATS_DATA = [
  { label: "Zufriedene Kunden", value: "350+", icon: "Users" },
  { label: "Gereinigte m² pro Jahr", value: "450.000+", icon: "Building" },
  { label: "Jahre Erfahrung & Expertise", value: "8+", icon: "Award" },
  { label: "Kundenzufriedenheit", value: "99.4%", icon: "Star" }
];

export const VALUES_DATA = [
  {
    title: "Beste Ergebnisse garantieren",
    description: "Höchste Reinigungsstandards und modernste Verfahren für kompromisslose Sauberkeit in jedem Detail.",
    icon: "BadgePercent",
    image: "/src/assets/images/cleaning_team_center_1786973615973.jpg"
  },
  {
    title: "Schneller & sauberer Service",
    description: "Pünktliche Ausführung, flexible Einsatzzeiten und reibungslose Abläufe ohne Unterbrechung.",
    icon: "Clock",
    image: "/src/assets/images/cleaning_supplies_bucket_1786967492256.jpg"
  },
  {
    title: "Erfahrenes Expertenteam",
    description: "Geschultes, fest angestelltes und versichertes Fachpersonal für absolute Verlässlichkeit und Hygiene.",
    icon: "UserCheck",
    image: "/src/assets/images/cleanza_cleaner_portrait_1786962649189.jpg"
  },
  {
    title: "100% Zufriedenheit",
    description: "Kostenlose Nachbesserung bei jeglicher Beanstandung – Qualität und Vertrauen an erster Stelle.",
    icon: "Leaf",
    image: "/public/images/cleaning-tools.jpg"
  }
];
