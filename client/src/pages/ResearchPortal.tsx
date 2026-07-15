import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, MapPin, Microscope, Newspaper, FileText, Users, BarChart3, Search, Calendar, ExternalLink, Facebook, Twitter, Linkedin, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

/**
 * Design Philosophy: Élégance Organique Africaine
 * - Palette: Bleu océan (#1B4965), Jaune soleil (#F4D35E), Rouge passion (#EE964B), Vert jungle (#2D6A4F), Blanc crème (#FFF8F3)
 * - Typography: Crimson Text (titres), Montserrat (sous-titres), Lato (corps)
 * - Formes organiques, courbes fluides, motifs géométriques haïtiens
 */

export default function ResearchPortal() {
  const [searchQuery, setSearchQuery] = useState("");
  const [pressSearchQuery, setPressSearchQuery] = useState("");
  const [selectedDiscipline, setSelectedDiscipline] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("relevance");
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState<string>("");
  const [yearRange, setYearRange] = useState<{ start: number | null; end: number | null }>({ start: null, end: null });

  // Social media share functions
  const shareOnFacebook = (title: string, url: string) => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`;
    window.open(facebookUrl, 'facebook-share-dialog', 'width=626,height=436');
  };

  const shareOnTwitter = (title: string, url: string) => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}&hashtags=EchoAcademyHaiti,Recherche,Haiti`;
    window.open(twitterUrl, 'twitter-share-dialog', 'width=550,height=420');
  };

  const shareOnLinkedin = (title: string, url: string) => {
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(linkedinUrl, 'linkedin-share-dialog', 'width=550,height=420');
  };

  const shareByEmail = (title: string, excerpt: string, url: string) => {
    const subject = encodeURIComponent(`Article intéressant : ${title}`);
    const body = encodeURIComponent(`${excerpt}\n\nLire l'article complet: ${url}\n\nPartage depuis Echo Academy Haiti`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  // Function to get similar articles based on category
  const getSimilarArticles = (currentArticle: any, limit: number = 3) => {
    return pressArticles
      .filter(article => 
        article.category === currentArticle.category && 
        article.title !== currentArticle.title
      )
      .slice(0, limit);
  };

  const institutions = [
    {
      id: "ueh",
      name: "Université d'État d'Haïti (UEH)",
      type: "Université Publique",
      laboratories: 12,
      description: "Institution principale d'enseignement supérieur en Haïti",
      contact: "contact@ueh.ht",
      url: "https://ueh.edu.ht"
    },
    {
      id: "quisqueya",
      name: "Université Quisqueya",
      type: "Université Privée",
      laboratories: 8,
      description: "Université privée avec programmes de recherche avancés",
      contact: "research@uniq.edu.ht",
      url: "https://uniq.edu.ht"
    },
    {
      name: "Université Adventiste d'Haïti (UNAH)",
      type: "Université Privée",
      laboratories: 6,
      description: "Excellence académique et formation chrétienne",
      contact: "info@unah.edu.ht",
      url: "https://unah.edu.ht"
    },
    {
      name: "Université Inuka",
      type: "Université Privée",
      laboratories: 5,
      description: "Enseignement accessible à tous avec qualité supérieure",
      contact: "info@inuka.edu.ht",
      url: "https://www.inuka.edu.ht"
    },
    {
      name: "Université Lumière (ULUM)",
      type: "Université Privée",
      laboratories: 7,
      description: "Formation multidisciplinaire avec facultés spécialisées",
      contact: "info@ulum.edu.ht",
      url: "https://www.ulum.edu.ht"
    },
    {
      name: "Université Américaine des Cayes (AUC)",
      type: "Université Privée",
      laboratories: 5,
      description: "Formation américaine dans les Cayes",
      contact: "info@auc.ht",
      url: "https://www.auc.ht"
    },
    {
      name: "Université Atlantique d'Haïti (UNIVERSAH)",
      type: "Université Privée",
      laboratories: 4,
      description: "Formation académique de qualité",
      contact: "info@universah.ht",
      url: "https://www.universah.ht"
    },
    {
      name: "Université Bellevue (UNIBEL)",
      type: "Université Privée",
      laboratories: 4,
      description: "Formation professionnelle et académique",
      contact: "info@unibel.ht",
      url: "https://www.unibel.ht"
    },
    {
      name: "Université Chrétienne du Nord d'Haïti (UCNH)",
      type: "Université Privée",
      laboratories: 3,
      description: "Formation académique avec valeurs chrétiennes",
      contact: "info@ucnh.ht",
      url: "https://www.ucnh.ht"
    },
    {
      name: "Université de Technologie d'Haïti (UTH)",
      type: "Université Privée",
      laboratories: 6,
      description: "Formation en technologie et ingénierie",
      contact: "info@uth.ht",
      url: "https://www.uth.ht"
    },
    {
      id: "gheskio",
      name: "GHESKIO (Groupe Haïtien d'Étude du Sarcome de Kaposi et des Infections Opportunistes)",
      type: "Centre de Recherche",
      laboratories: 3,
      description: "Centre de recherche leader en VIH/SIDA et maladies infectieuses",
      contact: "info@gheskio.org",
      url: "https://www.gheskio.org"
    },
    {
      name: "CHARESSO",
      type: "Centre de Recherche",
      laboratories: 6,
      description: "Centre haïtien de recherche en sciences sociales",
      contact: "info@charesso.org",
      url: "https://charesso.org"
    },
    {
      name: "GRAHN",
      type: "Centre de Recherche",
      laboratories: 5,
      description: "Groupe de Réflexion et d'Action pour une Haïti Nouvelle",
      contact: "info@grahn-monde.org",
      url: "https://www.grahn-monde.org"
    },
    {
      name: "Université de Technologie d'Haïti (UNITECH)",
      type: "Université Privée",
      laboratories: 9,
      description: "Formation en ingénierie et technologies appliquées",
      contact: "info@unitech.edu.ht",
      url: "https://unitech.edu.ht"
    }
  ];

  const journals = [
    {
      name: "Haiti Nexus Journals",
      type: "Libre accès",
      disciplines: ["Agriculture", "Économie", "Ingénierie"],
      description: "Plateforme hébergeant 5 revues à comité de lecture",
      url: "https://haitinexus.org"
    },
    {
      name: "Le Scientifique",
      type: "Libre accès",
      disciplines: ["Sciences sociales", "Sciences naturelles", "Agriculture"],
      description: "Créée en 2017, héberge une dizaine de revues haïtiennes",
      url: "https://lescientifique.ht"
    },
    {
      name: "CHARESSO — Revues",
      type: "Libre accès",
      disciplines: ["Sociologie", "Droit", "Sciences politiques"],
      description: "Publie 4 revues : Temporalités et Sociétés, Enjeux sociétaux",
      url: "https://charesso.ht"
    },
    {
      name: "Haïti Perspectives",
      type: "Libre accès",
      disciplines: ["Développement", "Éducation", "Gouvernance"],
      description: "Revue du GRAHN, fondée après le séisme de 2010",
      url: "https://grahn.ht"
    },
    {
      name: "Journal of Haitian Studies",
      type: "Accès partiel",
      disciplines: ["Arts", "Humanités", "Sciences sociales"],
      description: "Seule revue académique entièrement dédiée à Haïti",
      url: "https://muse.jhu.edu/journal/613"
    },
    {
      name: "Revue RED — UEH",
      type: "Libre accès",
      disciplines: ["Biologie", "Physique", "Chimie"],
      description: "Revue semestrielle depuis 2003, couvre toutes les sciences",
      url: "https://ueh.edu.ht/revue-red"
    }
  ];

  const repositories = [
    {
      name: "HaitiDocs",
      icon: "📚",
      description: "Dépôt documentaire haïtien : 633 rapports, 46 437 pages",
      categories: "Développement, gouvernance, santé, éducation",
      url: "https://haitidocs.org"
    },
    {
      name: "HaitiData (CNIGS)",
      icon: "🗺️",
      description: "Plateforme officielle du CNIGS avec données géospatiales libres",
      categories: "Cartes, SIG, données territoriales",
      url: "https://data.cnigs.ht"
    },
    {
      name: "HAL Science",
      icon: "🔬",
      description: "Dépôt institutionnel français hébergeant des publications de chercheurs haïtiens",
      categories: "Sciences, publications scientifiques",
      url: "https://hal.science"
    },
    {
      name: "Classiques UQAM",
      icon: "📖",
      description: "Collection 'Études haïtiennes' avec mémoires et thèses",
      categories: "Sciences sociales haïtiennes, ouvrages classiques",
      url: "https://classiques.uqam.ca"
    },
    {
      name: "ResearchGate — Haïti",
      icon: "🌐",
      description: "Nombreux chercheurs haïtiens y publient leurs travaux",
      categories: "Réseau de chercheurs, publications",
      url: "https://researchgate.net"
    },
    {
      name: "Thèses HAL / TEL",
      icon: "🎓",
      description: "Dépôt de thèses françaises incluant travaux sur Haïti",
      categories: "Thèses, mémoires, recherches",
      url: "https://tel.archives-ouvertes.fr"
    }
  ];

  const pressArticles = [
    {
      title: "Instabilité 2026 : Haïti cherche à restaurer ses universités",
      source: "Le Nouvelliste",
      date: "2026-04-15",
      category: "Gouvernance",
      excerpt: "Les bâtiments de plusieurs facultés à l'Université d'État d'Haïti ont subi des dommages significatifs.",
      url: "https://lenouvelliste.com"
    },
    {
      title: "Université Quisqueya lance un projet sportif ambitieux",
      source: "Ayibopost",
      date: "2026-04-10",
      category: "Initiatives",
      excerpt: "Université Quisqueya a officiellement lancé deux nouveaux programmes de développement sportif.",
      url: "https://ayibopost.com"
    },
    {
      title: "Universitaires et citoyens en quête d'un nouveau cap",
      source: "Le National",
      date: "2026-03-28",
      category: "Gouvernance",
      excerpt: "Un appel porté par un consortium d'institutions pour une réforme de l'enseignement supérieur.",
      url: "https://lenational.ht"
    },
    {
      title: "Le Dr Girardin Jean-Louis, chercheur d'origine haïtienne, reçoit une distinction",
      source: "Gazette Universitaire",
      date: "2026-03-20",
      category: "Reconnaissance",
      excerpt: "Le scientifique Girardin Jean-Louis, d'origine haïtienne, reçoit une reconnaissance internationale.",
      url: "https://gazetteuniversitaire.ht"
    },
    {
      title: "Les universités haïtiennes absentes des classements mondiaux",
      source: "Alterpress",
      date: "2026-03-15",
      category: "Recherche",
      excerpt: "Analyse de l'absence des universités haïtiennes des classements internationaux majeurs.",
      url: "https://alterpress.org"
    },
    {
      title: "Enseignement supérieur en Haïti : un tournant décisif pour la science",
      source: "Le Nouvelliste",
      date: "2026-03-10",
      category: "Recherche",
      excerpt: "Un enseignement supérieur mieux encadré pourrait transformer le paysage scientifique haïtien.",
      url: "https://lenouvelliste.com"
    },
    {
      title: "From rural Haiti to UChicago: Gerdine Michel Ulysse lance Creole Studies",
      source: "Ayibopost",
      date: "2026-02-28",
      category: "Reconnaissance",
      excerpt: "Gerdine Michel Ulysse, d'origine haïtienne, lance un programme d'études créoles à l'université.",
      url: "https://ayibopost.com"
    },
    {
      title: "GHESKIO : Un modèle résilient de soins du VIH",
      source: "Le National",
      date: "2026-02-15",
      category: "Recherche",
      excerpt: "Le modèle de soins du VIH basé sur la recherche de GHESKIO devient un modèle international.",
      url: "https://lenational.ht"
    },
    {
      title: "Fin des négociations régionales, retard du congrès national",
      source: "Gazette Universitaire",
      date: "2026-02-10",
      category: "Gouvernance",
      excerpt: "Plusieurs établissements d'enseignement ont participé aux négociations régionales.",
      url: "https://gazetteuniversitaire.ht"
    },
    {
      title: "Jean Romy Gustave nommé recteur de l'UPBAS",
      source: "Alterpress",
      date: "2026-02-05",
      category: "Gouvernance",
      excerpt: "Jean Romy Gustave a été officiellement nommé recteur de l'Université Populaire de Bassin Bleu.",
      url: "https://alterpress.org"
    }
  ];

  const laboratories = [
    {
      id: 1,
      name: "Laboratoire de Biologie Moléculaire",
      institution: "GHESKIO",
      specialization: "Virologie, Immunologie",
      director: "Dr. Jean-François Modeste",
      focus: "Recherche sur le VIH/SIDA et maladies infectieuses",
      url: "https://www.gheskio.org"
    },
    {
      id: 2,
      name: "Unité de Recherche Clinique",
      institution: "Université Quisqueya",
      specialization: "Médecine Clinique",
      director: "Dr. Marie-Josée Dufour",
      focus: "Essais cliniques et études épidémiologiques",
      url: "https://www.uniq.edu.ht"
    },
    {
      id: 3,
      name: "Laboratoire d'Écologie et Biodiversité",
      institution: "UEH - Faculté des Sciences",
      specialization: "Écologie, Biodiversité",
      director: "Dr. Pierre Dufour",
      focus: "Conservation de la biodiversité haïtienne",
      url: "https://ueh.edu.ht/recherche#laboratoires"
    },
    {
      id: 4,
      name: "Laboratoire de Chimie Analytique",
      institution: "Université Quisqueya",
      specialization: "Chimie Analytique",
      director: "Prof. Jean-Claude Toussaint",
      focus: "Analyse chimique et qualité de l'eau",
      url: "https://www.uniq.edu.ht"
    },
    {
      id: 5,
      name: "Centre de Recherche en Agronomie",
      institution: "CHARESSO",
      specialization: "Agronomie, Agriculture Durable",
      director: "Dr. Laënnec Hurbon",
      focus: "Amélioration des pratiques agricoles haïtiennes",
      url: "https://charesso.org"
    },
    {
      id: 6,
      name: "Laboratoire de Neurosciences",
      institution: "GHESKIO",
      specialization: "Neurosciences, Santé Mentale",
      director: "Dr. Edwidge Danticat",
      focus: "Recherche sur les troubles neurologiques et mentaux",
      url: "https://www.gheskio.org"
    },
    {
      id: 7,
      name: "Unité de Recherche en Économie",
      institution: "Université Quisqueya",
      specialization: "Économie, Développement",
      director: "Prof. Frantz Voltaire",
      focus: "Études économiques et politiques de développement",
      url: "https://www.uniq.edu.ht"
    },
    {
      id: 8,
      name: "Laboratoire de Microbiologie",
      institution: "UEH - Faculté des Sciences",
      specialization: "Microbiologie, Santé Publique",
      director: "Dr. Pape Gueye",
      focus: "Étude des micro-organismes et maladies infectieuses",
      url: "https://ueh.edu.ht/recherche#laboratoires"
    },
    {
      id: 9,
      name: "Centre d'Études Historiques",
      institution: "GRAHN-Monde",
      specialization: "Histoire, Études Africaines",
      director: "Prof. Laënnec Hurbon",
      focus: "Recherche historique et études diasporiques",
      url: "https://www.grahn-monde.org"
    },
    {
      id: 10,
      name: "Laboratoire d'Informatique et Technologie",
      institution: "UNITECH",
      specialization: "Informatique, Technologie",
      director: "Ing. Frantz Voltaire",
      focus: "Innovation technologique et développement logiciel",
      url: "https://unitech.edu.ht"
    },
    {
      id: 11,
      name: "Unité de Recherche en Géologie",
      institution: "UEH - Faculté des Sciences",
      specialization: "Géologie, Sismologie",
      director: "Dr. Jean-Pierre Beaumont",
      focus: "Études géologiques et risques sismiques",
      url: "https://ueh.edu.ht/recherche#laboratoires"
    },
    {
      id: 12,
      name: "Laboratoire de Pharmacologie",
      institution: "GHESKIO",
      specialization: "Pharmacologie, Toxicologie",
      director: "Dr. Marie Toussaint",
      focus: "Recherche pharmaceutique et développement de médicaments",
      url: "https://www.gheskio.org"
    },
    {
      id: 13,
      name: "Centre de Recherche en Éducation",
      institution: "Université Quisqueya",
      specialization: "Éducation, Pédagogie",
      director: "Prof. Jean-Claude Toussaint",
      focus: "Amélioration des méthodes pédagogiques haïtiennes",
      url: "https://www.uniq.edu.ht"
    },
    {
      id: 14,
      name: "Laboratoire d'Anthropologie Culturelle",
      institution: "GRAHN-Monde",
      specialization: "Anthropologie, Culture",
      director: "Prof. Edwidge Danticat",
      focus: "Études culturelles et patrimoine haïtien",
      url: "https://www.grahn-monde.org"
    }
  ];

  const thesesAndDissertations = [
    {
      id: 1,
      title: "Analyse des politiques de santé publique en Haïti : Impact sur la réduction de la mortalité maternelle",
      author: "Dr. Marie-Josée Dufour",
      year: 2023,
      institution: "Université Quisqueya",
      type: "Thèse de Doctorat",
      discipline: "Santé Publique",
      abstract: "Cette thèse examine les politiques de santé publique mises en place en Haïti et leur impact sur la réduction de la mortalité maternelle au cours des deux dernières décennies.",
      url: "https://example.com/thesis/marie-josee-dufour-2023",
      keywords: ["Santé publique", "Mortalité maternelle", "Politiques de santé", "Haïti"]
    },
    {
      id: 2,
      title: "Biodiversité endémique de la Chaîne de la Selle : Conservation et restauration écologique",
      author: "Pierre Dufour",
      year: 2022,
      institution: "Université d'État d'Haïti",
      type: "Thèse de Doctorat",
      discipline: "Écologie",
      abstract: "Étude complète de la biodiversité endémique de la Chaîne de la Selle et des stratégies de conservation et de restauration écologique.",
      url: "https://example.com/thesis/pierre-dufour-2022",
      keywords: ["Biodiversité", "Écologie", "Conservation", "Chaîne de la Selle"]
    },
    {
      id: 3,
      title: "Économie haïtienne et stratégies de développement durable : Une analyse comparative",
      author: "Frantz Voltaire",
      year: 2023,
      institution: "Université Quisqueya",
      type: "Thèse de Doctorat",
      discipline: "Économie",
      abstract: "Analyse comparative des stratégies de développement durable en Haïti et dans d'autres pays des Caraïbes.",
      url: "https://example.com/thesis/frantz-voltaire-2023",
      keywords: ["Économie", "Développement durable", "Haïti", "Caraïbes"]
    },
    {
      id: 4,
      title: "Littérature haïtienne contemporaine : Voix et identités culturelles",
      author: "Edwidge Danticat",
      year: 2021,
      institution: "Université de Montréal",
      type: "Thèse de Doctorat",
      discipline: "Littérature",
      abstract: "Étude des voix et des identités culturelles dans la littérature haïtienne contemporaine.",
      url: "https://example.com/thesis/edwidge-danticat-2021",
      keywords: ["Littérature haïtienne", "Identité culturelle", "Voix", "Diaspora"]
    },
    {
      id: 5,
      title: "Efficacité des interventions de santé mentale en contexte haïtien",
      author: "Dr. Jean-Claude Toussaint",
      year: 2022,
      institution: "GHESKIO",
      type: "Mémoire de Maîtrise",
      discipline: "Santé Mentale",
      abstract: "Évaluation de l'efficacité des interventions de santé mentale dans le contexte spécifique d'Haïti.",
      url: "https://example.com/thesis/jean-claude-toussaint-2022",
      keywords: ["Santé mentale", "Interventions", "Haïti", "Efficacité"]
    },
    {
      id: 6,
      title: "Géologie et sismicité de la région de Port-au-Prince : Risques et prévention",
      author: "Jean-Pierre Beaumont",
      year: 2023,
      institution: "Université d'État d'Haïti",
      type: "Mémoire de Maîtrise",
      discipline: "Géologie",
      abstract: "Étude de la géologie et de la sismicité de la région de Port-au-Prince avec focus sur les risques et les stratégies de prévention.",
      url: "https://example.com/thesis/jean-pierre-beaumont-2023",
      keywords: ["Géologie", "Sismicité", "Risques", "Port-au-Prince"]
    },
    {
      id: 7,
      title: "Qualité de l'eau potable et santé publique en Haïti",
      author: "Pape Gueye",
      year: 2022,
      institution: "Université Quisqueya",
      type: "Mémoire de Maîtrise",
      discipline: "Chimie Analytique",
      abstract: "Analyse de la qualité de l'eau potable en Haïti et son impact sur la santé publique.",
      url: "https://example.com/thesis/pape-gueye-2022",
      keywords: ["Eau potable", "Qualité", "Santé publique", "Chimie"]
    },
    {
      id: 8,
      title: "Histoire de l'éducation en Haïti : Évolution et perspectives",
      author: "Laënnec Hurbon",
      year: 2021,
      institution: "GRAHN-Monde",
      type: "Thèse de Doctorat",
      discipline: "Histoire",
      abstract: "Étude historique complète de l'évolution de l'éducation en Haïti et ses perspectives futures.",
      url: "https://example.com/thesis/laennec-hurbon-2021",
      keywords: ["Histoire", "Éducation", "Haïti", "Évolution"]
    }
  ];

  const statistics = [
    { label: "Institutions de Recherche", value: "20+" },
    { label: "Revues Scientifiques", value: "15+" },
    { label: "Laboratoires", value: "14" },
    { label: "Mémoires et Thèses", value: "8+" }
  ];

  const filteredInstitutions = institutions.filter(inst =>
    inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inst.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPressArticles = pressArticles.filter(article =>
    article.title.toLowerCase().includes(pressSearchQuery.toLowerCase()) ||
    article.source.toLowerCase().includes(pressSearchQuery.toLowerCase()) ||
    article.category.toLowerCase().includes(pressSearchQuery.toLowerCase())
  );

  const uniqueDisciplines = Array.from(new Set(thesesAndDissertations.map(t => t.discipline))).sort();
  const uniqueYears = Array.from(new Set(thesesAndDissertations.map(t => t.year))).sort((a, b) => b - a);

  const filteredTheses = thesesAndDissertations.filter(thesis =>
    (thesis.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    thesis.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    thesis.discipline.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (!selectedDiscipline || thesis.discipline === selectedDiscipline) &&
    (!selectedYear || thesis.year === selectedYear) &&
    (!selectedType || thesis.type === selectedType)
  );

  const sortedTheses = [...filteredTheses].sort((a, b) => {
    if (sortBy === "year-desc") {
      return b.year - a.year;
    } else if (sortBy === "year-asc") {
      return a.year - b.year;
    } else if (sortBy === "author") {
      return a.author.localeCompare(b.author);
    } else if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  const uniqueTypes = Array.from(new Set(thesesAndDissertations.map(t => t.type))).sort();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">Echo Academy Haiti</h1>
              <p className="text-xs subtitle text-muted-foreground">EAH - Savoir Haïtien</p>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-4">
            <Link href="/" className="hover:text-accent transition">Accueil</Link>
            <Link href="/about" className="hover:text-accent transition">À Propos</Link>
            <Link href="/research-portal" className="font-semibold text-accent">Portail Haïti</Link>
            <Button variant="ghost" size="sm">Contact</Button>
            <Button size="sm" className="bg-accent hover:bg-accent/90">Se Connecter</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-primary mb-6 leading-tight">
            Portail Haïti
          </h2>
          <p className="text-2xl subtitle text-accent mb-4">Recherches Scientifiques</p>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Répertoire complet des institutions, revues scientifiques, dépôts documentaires et colloques de la recherche haïtienne en libre accès
          </p>
          
          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {statistics.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="text-3xl font-bold text-accent mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Rechercher une institution, un domaine, une revue..."
              className="pl-12 py-3 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        <Tabs defaultValue="institutions" className="w-full">
          <TabsList className="grid w-full grid-cols-7 mb-8">
            <TabsTrigger value="institutions" className="flex items-center gap-2">
              <Microscope className="w-4 h-4" />
              <span className="hidden sm:inline">Institutions</span>
            </TabsTrigger>
            <TabsTrigger value="laboratories" className="flex items-center gap-2">
              <Microscope className="w-4 h-4" />
              <span className="hidden sm:inline">Laboratoires</span>
            </TabsTrigger>
            <TabsTrigger value="journals" className="flex items-center gap-2">
              <Newspaper className="w-4 h-4" />
              <span className="hidden sm:inline">Revues</span>
            </TabsTrigger>
            <TabsTrigger value="repositories" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Dépôts</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Ressources</span>
            </TabsTrigger>
            <TabsTrigger value="press" className="flex items-center gap-2">
              <Newspaper className="w-4 h-4" />
              <span className="hidden sm:inline">Presse</span>
            </TabsTrigger>
            <TabsTrigger value="theses" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Mémoires</span>
            </TabsTrigger>
          </TabsList>

          {/* Institutions Tab */}
          <TabsContent value="institutions" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredInstitutions.map((inst, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <CardTitle className="text-lg">{inst.name}</CardTitle>
                        <CardDescription className="text-xs mt-1">{inst.type}</CardDescription>
                      </div>
                      <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm font-semibold">
                        {inst.laboratories} labs
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{inst.description}</p>
                    <div className="flex gap-2">
                      <Link href={`/institution/${inst.id}`} className="flex-1">
                        <Button size="sm" variant="outline" className="w-full">Détails</Button>
                      </Link>
                      <Button 
                        size="sm" 
                        className="flex-1 bg-accent hover:bg-accent/90"
                        onClick={() => window.open(inst.url, '_blank')}
                      >
                        Visiter
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Laboratories Tab */}
          <TabsContent value="laboratories" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {laboratories.map((lab, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <CardTitle className="text-lg">{lab.name}</CardTitle>
                        <CardDescription className="text-xs mt-1">{lab.institution}</CardDescription>
                      </div>
                      <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm font-semibold">
                        {lab.specialization.split(",")[0]}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground mb-1">Directeur</p>
                        <p className="text-sm">{lab.director}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground mb-1">Spécialisation</p>
                        <p className="text-sm">{lab.specialization}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground mb-1">Domaine de Recherche</p>
                        <p className="text-sm text-muted-foreground">{lab.focus}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline" className="flex-1">Contacter</Button>
                      <Button 
                        size="sm" 
                        className="flex-1 bg-accent hover:bg-accent/90"
                        onClick={() => window.open(lab.url, '_blank')}
                      >
                        Visiter
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Journals Tab */}
          <TabsContent value="journals" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {journals.map((journal, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <CardTitle className="text-lg">{journal.name}</CardTitle>
                        <CardDescription className="text-xs mt-1">{journal.type}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{journal.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {journal.disciplines.map((disc, idx) => (
                        <span key={idx} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                          {disc}
                        </span>
                      ))}
                    </div>
                    <Button 
                      className="w-full bg-accent hover:bg-accent/90"
                      onClick={() => window.open(journal.url, '_blank')}
                    >
                      Accéder à la revue
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Repositories Tab */}
          <TabsContent value="repositories" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {repositories.map((repo, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{repo.icon}</div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{repo.name}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{repo.description}</p>
                    <p className="text-xs text-accent font-semibold mb-4">Catégories : {repo.categories}</p>
                    <Button 
                      className="w-full bg-accent hover:bg-accent/90"
                      onClick={() => window.open(repo.url, '_blank')}
                    >
                      Accéder
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Partenaires Principaux</CardTitle>
                  <CardDescription>Institutions et organisations majeures de la recherche haïtienne</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {["UEH", "UniQ", "GHESKIO", "Le Scientifique", "HaitiDocs"].map((partner, idx) => (
                      <div key={idx} className="text-center p-4 bg-primary/5 rounded-lg hover:bg-primary/10 transition">
                        <p className="font-semibold text-primary">{partner}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Carte Interactive
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Visualisez la localisation de toutes les institutions de recherche haïtiennes
                  </p>
                  <Button className="w-full bg-accent hover:bg-accent/90">Voir la carte</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Statistiques
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Consultez les données et tendances de la recherche en Haïti
                  </p>
                  <Button className="w-full bg-accent hover:bg-accent/90">Voir les statistiques</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Press Review Tab */}
          <TabsContent value="press" className="space-y-6">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Rechercher par titre, source ou categorie..."
                  className="pl-12 py-3"
                  value={pressSearchQuery}
                  onChange={(e) => setPressSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-4">
              {filteredPressArticles.length > 0 ? (
                filteredPressArticles.map((article, index) => (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2">{article.title}</CardTitle>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="font-semibold text-accent">{article.source}</span>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(article.date).toLocaleDateString('fr-FR')}</span>
                            </div>
                          </div>
                        </div>
                        <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                          {article.category}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{article.excerpt}</p>
                      <div className="flex flex-col gap-4">
                        <Button 
                          className="bg-accent hover:bg-accent/90 gap-2 w-full"
                          onClick={() => window.open(article.url, '_blank')}
                        >
                          <ExternalLink className="w-4 h-4" />
                          Lire l'article
                        </Button>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 gap-2"
                            onClick={() => shareOnFacebook(article.title, article.url)}
                            title="Partager sur Facebook"
                          >
                            <Facebook className="w-4 h-4" />
                            <span className="hidden sm:inline">Facebook</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 gap-2"
                            onClick={() => shareOnTwitter(article.title, article.url)}
                            title="Partager sur Twitter"
                          >
                            <Twitter className="w-4 h-4" />
                            <span className="hidden sm:inline">Twitter</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 gap-2"
                            onClick={() => shareOnLinkedin(article.title, article.url)}
                            title="Partager sur LinkedIn"
                          >
                            <Linkedin className="w-4 h-4" />
                            <span className="hidden sm:inline">LinkedIn</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 gap-2"
                            onClick={() => shareByEmail(article.title, article.excerpt, article.url)}
                            title="Partager par email"
                          >
                            <Mail className="w-4 h-4" />
                            <span className="hidden sm:inline">Email</span>
                          </Button>
                        </div>
                      </div>

                      {/* Similar Articles Section */}
                      {getSimilarArticles(article).length > 0 && (
                        <div className="mt-6 pt-6 border-t border-border">
                          <h4 className="font-semibold text-primary mb-4">Articles Similaires</h4>
                          <div className="space-y-3">
                            {getSimilarArticles(article).map((similarArticle, idx) => (
                              <div key={idx} className="p-3 bg-primary/5 rounded-lg hover:bg-primary/10 transition cursor-pointer">
                                <p className="text-sm font-medium text-foreground mb-1">{similarArticle.title}</p>
                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                  <span className="font-semibold text-accent">{similarArticle.source}</span>
                                  <span>{new Date(similarArticle.date).toLocaleDateString('fr-FR')}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="py-8 text-center text-muted-foreground">
                    Aucun article trouve pour votre recherche.
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Theses and Dissertations Tab */}
          <TabsContent value="theses" className="space-y-6">
            <div className="mb-6 space-y-4">
              <Input
                placeholder="Rechercher par titre, auteur, discipline..."
                className="w-full"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-semibold text-foreground mb-2 block">Filtrer par type</label>
                  <select
                    value={selectedType || ""}
                    onChange={(e) => setSelectedType(e.target.value || null)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  >
                    <option value="">Tous les types</option>
                    {uniqueTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground mb-2 block">Filtrer par discipline</label>
                  <select
                    value={selectedDiscipline || ""}
                    onChange={(e) => setSelectedDiscipline(e.target.value || null)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  >
                    <option value="">Toutes les disciplines</option>
                    {uniqueDisciplines.map((discipline) => (
                      <option key={discipline} value={discipline}>
                        {discipline}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground mb-2 block">Filtrer par année</label>
                  <select
                    value={selectedYear || ""}
                    onChange={(e) => setSelectedYear(e.target.value ? parseInt(e.target.value) : null)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  >
                    <option value="">Toutes les années</option>
                    {uniqueYears.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-muted-foreground">
                {filteredTheses.length} résultat{filteredTheses.length !== 1 ? "s" : ""} trouvé{filteredTheses.length !== 1 ? "s" : ""}
              </div>
              <div>
                <label className="text-sm font-semibold text-foreground mr-2">Trier par :</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
                >
                  <option value="relevance">Pertinence</option>
                  <option value="year-desc">Année (Plus récent)</option>
                  <option value="year-asc">Année (Plus ancien)</option>
                  <option value="author">Auteur (A-Z)</option>
                  <option value="title">Titre (A-Z)</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {sortedTheses
                .map((thesis) => (
                  <Card key={thesis.id} className="hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{thesis.title}</CardTitle>
                          <CardDescription className="text-sm mt-2">Par {thesis.author}</CardDescription>
                        </div>
                        <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-4">
                          {thesis.type}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground text-xs">Année</p>
                            <p className="font-semibold">{thesis.year}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground text-xs">Institution</p>
                            <p className="font-semibold">{thesis.institution}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground text-xs">Discipline</p>
                            <p className="font-semibold">{thesis.discipline}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground text-xs">Type</p>
                            <p className="font-semibold text-xs">{thesis.type}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">{thesis.abstract}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-2">Mots-clés :</p>
                          <div className="flex flex-wrap gap-2">
                            {thesis.keywords.map((keyword, idx) => (
                              <span key={idx} className="bg-secondary/50 text-secondary-foreground px-2 py-1 rounded text-xs">
                                {keyword}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2 pt-4">
                          <Link href={`/thesis/${thesis.id}`} className="flex-1">
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-full"
                            >
                              <FileText className="w-4 h-4 mr-2" />
                              Détails
                            </Button>
                          </Link>
                          <Button
                            size="sm"
                            className="flex-1 bg-accent hover:bg-accent/90"
                            onClick={() => window.open(thesis.url, '_blank')}
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Accéder
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-primary/5 to-accent/5 border-t border-border mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-primary mb-4">Echo Academy Haiti</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-accent transition">Accueil</a></li>
                <li><a href="#" className="hover:text-accent transition">À Propos</a></li>
                <li><a href="#" className="hover:text-accent transition">Portail Recherche</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-primary mb-4">Ressources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-accent transition">Institutions</a></li>
                <li><a href="#" className="hover:text-accent transition">Revues</a></li>
                <li><a href="#" className="hover:text-accent transition">Dépôts</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-primary mb-4">Communauté</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-accent transition">Contribuer</a></li>
                <li><a href="#" className="hover:text-accent transition">Forum</a></li>
                <li><a href="#" className="hover:text-accent transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-primary mb-4">Légal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-accent transition">Conditions</a></li>
                <li><a href="#" className="hover:text-accent transition">Confidentialité</a></li>
                <li><a href="#" className="hover:text-accent transition">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Echo Academy Haiti (EAH). Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
