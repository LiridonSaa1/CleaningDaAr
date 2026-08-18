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
    title: "Routine cleaning",
    titleDe: "Unterhaltsreinigung",
    titleEn: "Routine cleaning",
    category: "residential",
    badge: "Empfohlen",
    popular: true,
    priceFrom: "ab 28,00 € / Std.",
    frequencyRecommendation: "Regelmäßig nach Wunsch",
    shortDescription: "A clean home or a well-maintained office is the foundation for well-being. We take care of the regular cleaning of your premises according to your desired schedule.",
    shortDescriptionDe: "Ein sauberes Zuhause oder ein gepflegtes Büro ist das Fundament für Wohlbefinden. Wir kümmern uns um die regelmäßige Reinigung Ihrer Räumlichkeiten nach Ihrem Wunschplan.",
    shortDescriptionEn: "A clean home or a well-maintained office is the foundation for well-being. We take care of the regular cleaning of your premises according to your desired schedule.",
    fullDescription: "Unsere Routinereinigung & Unterhaltsreinigung sichert dauerhafte Frische, absolute Hygiene und ein rundum angenehmes Ambiente. Nach einem maßgeschneiderten Reinigungsplan säubern wir Böden, Arbeitsflächen, Sanitäranlagen und Küchenbereiche.",
    iconName: "Sparkles",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=80",
    checklist: [
      "Staub- und Feuchtreinigung aller freien Oberflächen & Tische",
      "Saugen und Wischen aller Bodenbeläge",
      "Hygienische Desinfektion und Reinigung der Sanitäranlagen",
      "Müllentleerung und Mülltrennung",
      "Feuchtreinigung von Griffen, Schaltern und Türen"
    ],
    benefits: [
      "Feste Reinigungsteams für höchste Diskretion",
      "Flexible Einsatzzeiten nach Ihren Wünschen",
      "Ökologisch unbedenkliche, materialschonende Pflegemittel"
    ]
  },
  {
    id: "buero-gewerbereinigung",
    title: "Office and commercial cleaning",
    titleDe: "Büro- & Gewerbereinigung",
    titleEn: "Office and commercial cleaning",
    category: "commercial",
    badge: "Für Unternehmen",
    popular: true,
    priceFrom: "Individuelles Festpreisangebot",
    frequencyRecommendation: "1x bis 5x wöchentlich",
    shortDescription: "A clean workplace is the calling card of your company. We ensure hygienic cleanliness in your offices, practices, or retail spaces.",
    shortDescriptionDe: "Ein sauberer Arbeitsplatz ist die Visitenkarte Ihres Unternehmens. Wir sorgen für hygienische Sauberkeit in Büros, Praxen oder Verkaufsflächen.",
    shortDescriptionEn: "A clean workplace is the calling card of your company. We ensure hygienic cleanliness in your offices, practices, or retail spaces.",
    fullDescription: "Ein sauberes Büro fördert Konzentration, senkt Krankheitsausfälle und vermittelt Professionalität. Wir reinigen Kanzleien, Agenturen, Co-Working Spaces und Firmenzentralen zuverlässig nach höchsten Standards.",
    iconName: "Building2",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80",
    checklist: [
      "Ergonomische Tastatur- & Monitor-Oberflächenpflege",
      "Meetingräume und Konferenztechnik einsatzbereit herrichten",
      "Kaffeeküchen, Mikrowellen und Geschirrspülerservice",
      "Glaswände & Raumteiler streifenfrei polieren",
      "Teppichböden tiefensaugen & Fleckentfernung"
    ],
    benefits: [
      "Erprobtes Hygienekonzept gegen Keimverschleppung",
      "Volle Haftpflichtversicherung für jedes Objekt",
      "Transparente monatliche Sammelrechnung"
    ]
  },
  {
    id: "glas-fensterreinigung",
    title: "Glass and window cleaning",
    titleDe: "Glas- & Fensterreinigung",
    titleEn: "Glass and window cleaning",
    category: "special",
    badge: "Streifenfrei",
    priceFrom: "ab 4,50 € / m²",
    frequencyRecommendation: "Monatlich oder vierteljährlich",
    shortDescription: "We ensure a perfect view. Whether shop windows, conservatories or classic window surfaces - streak-free, including frames and window sills.",
    shortDescriptionDe: "Wir sorgen für perfekten Durchblick. Ob Schaufenster, Wintergärten oder klassische Fensterflächen – streifenfrei, inklusive Rahmen und Fensterbänken.",
    shortDescriptionEn: "We ensure a perfect view. Whether shop windows, conservatories or classic window surfaces - streak-free, including frames and window sills.",
    fullDescription: "Streifenfreie Fenster ohne Schlieren, auch an schwer erreichbaren Stellen. Wir reinigen Scheiben inklusive Fensterrahmen, Fensterfalzen, Fensterbänken und Sonnenschutzlamellen mit Profi-Ausrüstung und Osmose-Technologie.",
    iconName: "Maximize2",
    image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1000&q=80",
    checklist: [
      "Innen- und Außenreinigung von Fenstern aller Art",
      "Rahmenreinigung & Falzreinigung",
      "Schaufensterreinigung für den Einzelhandel",
      "Wintergärten & Glasüberdachungen",
      "Reinwasser/Osmose-Technik ohne Chemie"
    ],
    benefits: [
      "Rückstandsfreies Trocknen ohne Kalkflecken",
      "Sicherheitsgeschultes Personal",
      "Schnelle Ausführung auch bei kurzfristigem Bedarf"
    ]
  },
  {
    id: "baureinigung",
    title: "Construction cleaning",
    titleDe: "Baureinigung",
    titleEn: "Construction cleaning",
    category: "construction",
    badge: "Bezugsfertig",
    priceFrom: "ab 3,80 € / m²",
    frequencyRecommendation: "Nach Bau- / Sanierungsphase",
    shortDescription: "We handle the rough and fine cleaning of your construction site after new construction or renovation. Construction dust and paint residue are removed - ready for occupancy.",
    shortDescriptionDe: "Wir übernehmen die Grob- und Feinreinigung Ihrer Baustelle nach Neubau oder Renovierung. Baustaub und Farbreste werden entfernt – bezugsfertig.",
    shortDescriptionEn: "We handle the rough and fine cleaning of your construction site after new construction or renovation. Construction dust and paint residue are removed - ready for occupancy.",
    fullDescription: "Nach Bauarbeiten oder Renovierungen befreien wir Ihre Immobilie von Bauschutt, Zementschleiern, Farb- und Lackspritzern, Feinstaub und Kleberesten, damit die Räume pünktlich und makellos bezogen werden können.",
    iconName: "Hammer",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80",
    checklist: [
      "Bau-Grobreinigung: Entfernung von Mörtelresten & Bauschutt",
      "Bau-Zwischenreinigung für nachfolgende Gewerke",
      "Bau-Feinreinigung bezugsfertig",
      "Beseitigung von Zementschleiern & Farbspritzern",
      "Schutzfolienentfernung von Fenstern und Sanitär"
    ],
    benefits: [
      "Pünktliche Einhaltung straffer Bauzeitenpläne",
      "Schonende Beseitigung hartnäckiger Baustoffreste",
      "Abnahmegarantie mit Bauleiter-Protokoll"
    ]
  },
  {
    id: "treppenhausreinigung",
    title: "Stairwell cleaning",
    titleDe: "Treppenhausreinigung",
    titleEn: "Stairwell cleaning",
    category: "residential",
    badge: "Hausverwaltungen",
    priceFrom: "ab 18,00 € pro Etage",
    frequencyRecommendation: "Wöchentlich oder 14-tägig",
    shortDescription: "First impressions of a building count. We clean steps, railings, mailboxes and entrance doors regularly and thoroughly.",
    shortDescriptionDe: "Der erste Eindruck eines Gebäudes zählt. Wir reinigen Stufen, Geländer, Briefkästen und Eingangstüren regelmäßig und gründlich.",
    shortDescriptionEn: "First impressions of a building count. We clean steps, railings, mailboxes and entrance doors regularly and thoroughly.",
    fullDescription: "Ein gepflegtes Treppenhaus ist die Visitenkarte jedes Wohngebäudes. Wir übernehmen die turnusmäßige Reinigung von Eingangsbereichen, Treppenstufen, Handläufen, Aufzügen und Kellergängen.",
    iconName: "Layers",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80",
    checklist: [
      "Kehren und feuchtes Wischen aller Treppen & Podeste",
      "Abwischen von Geländern, Handläufen und Fensterbänken",
      "Reinigung von Hauseingangstüren, Briefkasten- & Klingelanlagen",
      "Spiegel-, Glas- und Aufzugkabinenreinigung",
      "Spinnwebenbeseitigung im gesamten Hausflur"
    ],
    benefits: [
      "Fester Tourenplan & digitaler Nachweis",
      "Attraktive Staffelpreise für größere Liegenschaften",
      "Kein Ärger mehr mit der Kehrwoche unter Mietern"
    ]
  },
  {
    id: "grundreinigung",
    title: "Basic cleaning",
    titleDe: "Grundreinigung",
    titleEn: "Basic cleaning",
    category: "special",
    badge: "Tiefenreinigung",
    priceFrom: "Individuelle Kalkulation",
    frequencyRecommendation: "1-2 Mal jährlich",
    shortDescription: "Intensive care for stubborn dirt. Ideal for spring cleaning or when tenants change, to bring floors and surfaces into top condition.",
    shortDescriptionDe: "Intensive Pflege bei hartnäckigem Schmutz. Ideal für den Frühjahrsputz oder beim Mieterwechsel, um Böden und Flächen in Top-Zustand zu bringen.",
    shortDescriptionEn: "Intensive care for stubborn dirt. Ideal for spring cleaning or when tenants change, to bring floors and surfaces into top condition.",
    fullDescription: "Wenn die normale Unterhaltsreinigung nicht mehr ausreicht: Wir lösen alte Pflegemittelfilme, entfernen hartnäckige Verschmutzungen maschinell und versiegeln Böden neu für langanhaltenden Schutz.",
    iconName: "ShieldCheck",
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=1000&q=80",
    checklist: [
      "Maschinelle Einscheiben-Grundreinigung von PVC, Linoleum & Fliesen",
      "Neue Einpflege und Polymer-Versiegelung von Hartböden",
      "Fugen-Tiefenreinigung und Entkalkung in Nassräumen",
      "Reinigung von Heizkörpern und Deckenkonstruktionen",
      "Geruchsneutralisation und Desinfektion"
    ],
    benefits: [
      "Wertsteigerung und Lebensdauer-Verlängerung Ihrer Böden",
      "Einsatz moderner Industriemaschinen",
      "Maßgeschneiderte Schutzversiegelungen"
    ]
  },
  {
    id: "sonderreinigung",
    title: "Special cleaning",
    titleDe: "Sonderreinigung",
    titleEn: "Special cleaning",
    category: "special",
    badge: "Spezial",
    priceFrom: "Nach Vereinbarung",
    frequencyRecommendation: "Nach Bedarf / Event",
    shortDescription: "Do you have specific requirements? Whether it's carpet cleaning, upholstery cleaning, or post-event cleaning - we offer tailor-made solutions for your specific needs.",
    shortDescriptionDe: "Haben Sie spezielle Anforderungen? Ob Teppichreinigung, Polsterreinigung oder Event-Reinigung – wir bieten maßgeschneiderte Lösungen für Ihren spezifischen Bedarf.",
    shortDescriptionEn: "Do you have specific requirements? Whether it's carpet cleaning, upholstery cleaning, or post-event cleaning - we offer tailor-made solutions for your specific needs.",
    fullDescription: "Haben Sie spezifische Anforderungen? Ob Teppichreinigung, Polsterreinigung, Geruchsbeseitigung oder Event-Nachbereitung – wir bieten maßgeschneiderte Sonderreinigungs-Lösungen.",
    iconName: "Sparkles",
    image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=1000&q=80",
    checklist: [
      "Sprühextraktion & Tiefenreinigung von Teppichen & Polstern",
      "Geruchs- & Fleckenentfernung",
      "Spezialdesinfektion nach Hygieneanforderung",
      "Event- und Messereinigung vor/nach Veranstaltungen",
      "Industrieflächen- & Sonderreinigung"
    ],
    benefits: [
      "Moderne Spezialgeräte und Extraktionsverfahren",
      "Erfahrene Spezialkräfte für anspruchsvolle Fälle",
      "Schnelle Verfügbarkeit und maßgeschneiderte Angebote"
    ]
  },
  {
    id: "winterdienst",
    title: "Winter service ensures",
    titleDe: "Winterdienst",
    titleEn: "Winter service ensures",
    category: "special",
    badge: "24/7 Bereitschaft",
    priceFrom: "Saisonale Pauschale",
    frequencyRecommendation: "Täglich bei Schneefall",
    shortDescription: "We take care of snow removal and gritting of sidewalks, parking lots and driveways for you - punctually, thoroughly and reliably.",
    shortDescriptionDe: "Wir übernehmen die Schneeräumung und Streuung von Gehweg, Parkplatz und Zufahrt für Sie – pünktlich, gründlich und zuverlässig.",
    shortDescriptionEn: "We take care of snow removal and gritting of sidewalks, parking lots and driveways for you - punctually, thoroughly and reliably.",
    fullDescription: "Sicher durch den Winter nach den gesetzlichen Räum- und Streupflichten. Wir befreien Ihre Flächen von Schnee und Eis, inklusive Streugutgestellung und Notdienst rund um die Uhr.",
    iconName: "Snowflake",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80",
    checklist: [
      "Schneeräumung von Gehwegen, Parkplätzen & Zufahrten",
      "Streudienst mit umweltgerechtem Streugut / Salz",
      "Kontrollfahrten bei Glatteisgefahr",
      "24/7 Rufbereitschaft bei Wintereinbruch",
      "Beseitigung des Streuguts nach der Wintersaison"
    ],
    benefits: [
      "Rechtssichere Übernahme der gesetzlichen Räumpflicht",
      "Zuverlässige Ausführung früh am Morgen",
      "Moderne Räumgeräte und Handmannschaften"
    ]
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "1",
    name: "Markus Weber",
    role: "Inhaber",
    company: "Praxis Weber",
    location: "Ingolstadt",
    rating: 5,
    text: "Dua & Ari kümmert sich seit über einem Jahr um unsere Büroflächen in Ingolstadt. Absolut pünktlich, gründlich und zuverlässig!",
    service: "Büroreinigung",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    date: "Vor 2 Wochen"
  },
  {
    id: "2",
    name: "Elena Schmidt",
    role: "Hausbesitzerin",
    company: "Privatkundin",
    location: "Ingolstadt",
    rating: 5,
    text: "Die Fensterreinigung in unserem Einfamilienhaus war erstklassig. Streifenfreier Glanz und sehr freundliches Team. Sehr zu empfehlen!",
    service: "Fensterreinigung",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    date: "Vor 1 Monat"
  },
  {
    id: "3",
    name: "Dr. Thomas Huber",
    role: "Geschäftsführer",
    company: "Klinik Huber",
    location: "Ingolstadt",
    rating: 5,
    text: "Hervorragende Grundreinigung nach unserem Umbau. Das Team arbeitet schnell, professionell und mit modernsten Geräten.",
    service: "Grundreinigung",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    date: "Vor 3 Wochen"
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
    category: "general",
    question: "Welche Reinigungsleistungen bieten Sie an?",
    questionDe: "Welche Reinigungsleistungen bieten Sie an?",
    questionEn: "What cleaning services do you offer?",
    answer: "Wir bieten ein umfassendes Spektrum: Unterhaltsreinigung, Büro- & Gewerbereinigung, Glas- & Fensterreinigung, Baureinigung, Treppenhausreinigung, Grundreinigung, Sonderreinigung und Winterdienst.",
    answerDe: "Wir bieten ein umfassendes Spektrum: Unterhaltsreinigung, Büro- & Gewerbereinigung, Glas- & Fensterreinigung, Baureinigung, Treppenhausreinigung, Grundreinigung, Sonderreinigung und Winterdienst.",
    answerEn: "We offer a comprehensive range of services: routine cleaning, office & commercial cleaning, glass & window cleaning, construction cleaning, stairwell cleaning, basic cleaning, special cleaning, and winter service."
  },
  {
    id: "faq-2",
    category: "pricing",
    question: "Wie viel kostet ein Reinigungsservice?",
    questionDe: "Wie viel kostet ein Reinigungsservice?",
    questionEn: "How much does a cleaning service cost?",
    answer: "Unsere Preise richten sich transparent nach Objektgröße, Reinigungsart und Frequenz. Wir bieten faire Festpreise ohne versteckte Zusatzkosten oder stundenbasierte Abrechnungen ab 28 € / Std.",
    answerDe: "Unsere Preise richten sich transparent nach Objektgröße, Reinigungsart und Frequenz. Wir bieten faire Festpreise ohne versteckte Zusatzkosten oder stundenbasierte Abrechnungen ab 28 € / Std.",
    answerEn: "Our pricing is transparent and based on property size, cleaning type, and frequency. We offer fair fixed-price quotes with no hidden costs starting from €28/hr."
  },
  {
    id: "faq-3",
    category: "process",
    question: "Wie buche ich einen Reinigungsservice?",
    questionDe: "Wie buche ich einen Reinigungsservice?",
    questionEn: "How do I book a cleaning service?",
    answer: "Ganz einfach über unseren Online-Angebotsrechner oder das Kontaktformular. Sie wählen den gewünschten Service und erhalten innerhalb von 2-4 Stunden ein unverbindliches Angebot.",
    answerDe: "Ganz einfach über unseren Online-Angebotsrechner oder das Kontaktformular. Sie wählen den gewünschten Service und erhalten innerhalb von 2-4 Stunden ein unverbindliches Angebot.",
    answerEn: "Simply use our online quote calculator or contact form. Select your desired service and receive a non-binding offer within 2-4 hours."
  },
  {
    id: "faq-4",
    category: "security",
    question: "Muss ich während der Reinigung zu Hause sein?",
    questionDe: "Muss ich während der Reinigung zu Hause sein?",
    questionEn: "Do I need to be home during cleaning?",
    answer: "Nein, das ist nicht erforderlich. Durch sichere Schlüsselprotokolle reinigen wir zuverlässig und diskret auch während Ihrer Abwesenheit oder außerhalb Ihrer Bürozeiten.",
    answerDe: "Nein, das ist nicht erforderlich. Durch sichere Schlüsselprotokolle reinigen wir zuverlässig und diskret auch während Ihrer Abwesenheit oder außerhalb Ihrer Bürozeiten.",
    answerEn: "No, that is not necessary. Thanks to our secure key management protocols, we clean reliably and discreetly while you are away or outside business hours."
  },
  {
    id: "faq-5",
    category: "general",
    question: "Bringen Sie Ihre eigenen Reinigungsmittel mit?",
    questionDe: "Bringen Sie Ihre eigenen Reinigungsmittel mit?",
    questionEn: "Do you bring your own cleaning supplies?",
    answer: "Selbstverständlich! Unser Team bringt sämtliche Profi-Reinigungsgeräte sowie umweltfreundliche, pH-neutrale und materialschonende Reinigungsmittel komplett mit.",
    answerDe: "Selbstverständlich! Unser Team bringt sämtliche Profi-Reinigungsgeräte sowie umweltfreundliche, pH-neutrale und materialschonende Reinigungsmittel komplett mit.",
    answerEn: "Absolutely! Our team brings all professional cleaning equipment as well as eco-friendly, pH-neutral, and surface-safe cleaning products."
  },
  {
    id: "faq-6",
    category: "process",
    question: "Kann ich regelmäßige Reinigungen vereinbaren?",
    questionDe: "Kann ich regelmäßige Reinigungen vereinbaren?",
    questionEn: "Can I schedule recurring cleaning services?",
    answer: "Ja, wir bieten hochflexible Intervalle (täglich, wöchentlich, 14-tägig oder monatlich) mit fairen Konditionen und ohne starre Langzeitverträge.",
    answerDe: "Ja, wir bieten hochflexible Intervalle (täglich, wöchentlich, 14-tägig oder monatlich) mit fairen Konditionen und ohne starre Langzeitverträge.",
    answerEn: "Yes, we offer highly flexible schedules (daily, weekly, bi-weekly, or monthly) with fair terms and no rigid long-term contracts."
  },
  {
    id: "faq-7",
    category: "security",
    question: "Sind Ihre Reinigungskräfte geschult und versichert?",
    questionDe: "Sind Ihre Reinigungskräfte geschult und versichert?",
    questionEn: "Are your cleaners trained and insured?",
    answer: "Ja, zu 100%. Unsere Mitarbeiter sind fest angestellt, professionell in modernen Reinigungstechniken geschult und über unsere Betriebshaftpflichtversicherung voll abgesichert.",
    answerDe: "Ja, zu 100%. Unsere Mitarbeiter sind fest angestellt, professionell in modernen Reinigungstechniken geschult und über unsere Betriebshaftpflichtversicherung voll abgesichert.",
    answerEn: "Yes, 100%. Our employees are permanently employed, professionally trained in modern cleaning techniques, and fully covered by our comprehensive liability insurance."
  },
  {
    id: "faq-8",
    category: "general",
    question: "In welchem Umkreis sind Sie im Einsatz?",
    questionDe: "In welchem Umkreis sind Sie im Einsatz?",
    questionEn: "What areas do you serve?",
    answer: "Wir sind im gesamten Raum Ingolstadt sowie im Umkreis von bis zu 60 km im Einsatz (z.B. Manching, Pfaffenhofen, Neuburg, Eichstätt, Kösching, Geisenfeld).",
    answerDe: "Wir sind im gesamten Raum Ingolstadt sowie im Umkreis von bis zu 60 km im Einsatz (z.B. Manching, Pfaffenhofen, Neuburg, Eichstätt, Kösching, Geisenfeld).",
    answerEn: "We serve the entire Ingolstadt region and up to a 60 km radius (including Manching, Pfaffenhofen, Neuburg, Eichstätt, Kösching, Geisenfeld)."
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
