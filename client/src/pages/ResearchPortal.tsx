import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, MapPin, Microscope, Newspaper, FileText, Users, BarChart3, Search, Calendar, ExternalLink, Facebook, Twitter, Linkedin, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { TagsDisplay } from "@/components/TagsDisplay";

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
  const [selectedInstitution, setSelectedInstitution] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("relevance");
  const [selectedKeywords, setSelectedKeywords] = useState<Set<string>>(new Set());
  const [keywordInput, setKeywordInput] = useState<string>("");
  const [yearRange, setYearRange] = useState<{ start: number | null; end: number | null }>({ start: null, end: null });

  // Handle tag selection
  const handleTagClick = (tag: string) => {
    const newTags = new Set(selectedKeywords);
    if (newTags.has(tag)) {
      newTags.delete(tag);
    } else {
      newTags.add(tag);
    }
    setSelectedKeywords(newTags);
  };

  const handleRemoveTag = (tag: string) => {
    const newTags = new Set(selectedKeywords);
    newTags.delete(tag);
    setSelectedKeywords(newTags);
  };

  const handleAddKeyword = () => {
    if (keywordInput.trim()) {
      const newTags = new Set(selectedKeywords);
      newTags.add(keywordInput.trim());
      setSelectedKeywords(newTags);
      setKeywordInput("");
    }
  };

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
      disciplines: ["Agriculture", "Économie", "Ingénierie", "Sciences humaines et sociales"],
      description: "Plateforme hébergeant 5 revues à comité de lecture",
      url: "https://haitinexus.org"
    },
    {
      name: "Le Scientifique",
      type: "Libre accès",
      disciplines: ["Sciences sociales", "Sciences naturelles", "Agriculture", "Sciences humaines et sociales"],
      description: "Créée en 2017, héberge une dizaine de revues haïtiennes",
      url: "https://lescientifique.ht"
    },
    {
      name: "CHARESSO — Revues",
      type: "Libre accès",
      disciplines: ["Sociologie", "Droit", "Sciences politiques", "Sciences humaines et sociales"],
      description: "Publie 4 revues : Temporalités et Sociétés, Enjeux sociétaux",
      url: "https://charesso.ht"
    },
    {
      name: "Haïti Perspectives",
      type: "Libre accès",
      disciplines: ["Développement", "Éducation", "Gouvernance", "Sciences humaines et sociales"],
      description: "Revue du GRAHN, fondée après le séisme de 2010",
      url: "https://grahn.ht"
    },
    {
      name: "Journal of Haitian Studies",
      type: "Accès partiel",
      disciplines: ["Arts", "Humanités", "Sciences sociales", "Sciences humaines et sociales"],
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
    },
    {
      name: "Google Scholar",
      icon: "🔍",
      description: "Moteur de recherche académique indexant millions d'articles et thèses en libre accès",
      categories: "Multidisciplinaire, articles scientifiques, thèses",
      url: "https://scholar.google.com"
    },
    {
      name: "BASE (Bielefeld Academic Search Engine)",
      icon: "🔎",
      description: "Moteur de recherche multidisciplinaire indexant plus de 350 millions de documents",
      categories: "Multidisciplinaire, libre accès, documents académiques",
      url: "https://www.base-search.net"
    },
    {
      name: "RefSeek",
      icon: "📑",
      description: "Moteur de recherche académique spécialisé dans les articles scientifiques et thèses",
      categories: "Articles scientifiques, thèses, recherche",
      url: "https://refseek.com"
    },
    {
      name: "Semantic Scholar",
      icon: "🧠",
      description: "Plateforme IA pour explorer les articles scientifiques et leurs citations",
      categories: "Articles scientifiques, citations, analyse sémantique",
      url: "https://www.semanticscholar.org"
    },
    {
      name: "DOAJ (Directory of Open Access Journals)",
      icon: "📚",
      description: "Répertoire de plus de 17 000 revues scientifiques en libre accès",
      categories: "Revues scientifiques, libre accès, multidisciplinaire",
      url: "https://doaj.org"
    },
    {
      name: "arXiv",
      icon: "📄",
      description: "Archive de prépublications en physique, mathématiques, informatique et autres disciplines",
      categories: "Prépublications, sciences, mathématiques, informatique",
      url: "https://arxiv.org"
    },
    {
      name: "HAL (Archives Ouvertes)",
      icon: "🏛️",
      description: "Plateforme française d'archives ouvertes hébergeant publications et thèses",
      categories: "Publications scientifiques, thèses, archives ouvertes",
      url: "https://hal.archives-ouvertes.fr"
    },
    {
      name: "PubMed Central",
      icon: "🏥",
      description: "Archive gratuite des articles biomédicaux et de sciences de la vie",
      categories: "Biomédecine, sciences de la vie, santé",
      url: "https://www.ncbi.nlm.nih.gov/pmc"
    },
    {
      name: "CORE",
      icon: "⚙️",
      description: "Agrégateur de recherche indexant plus de 200 millions de documents en libre accès",
      categories: "Multidisciplinaire, libre accès, documents académiques",
      url: "https://core.ac.uk"
    },
    {
      name: "OAPEN Library",
      icon: "📖",
      description: "Bibliothèque numérique de livres académiques en libre accès",
      categories: "Livres académiques, libre accès, sciences humaines",
      url: "https://library.oapen.org"
    },
    {
      name: "Directory of Open Access Books",
      icon: "📚",
      description: "Répertoire international de livres académiques en libre accès",
      categories: "Livres académiques, libre accès, multidisciplinaire",
      url: "https://www.doabooks.org"
    },
    {
      name: "Wikisource - La bibliothèque libre",
      icon: "📖",
      description: "Bibliothèque numérique collaborative contenant textes libres et domaine public",
      categories: "Textes libres, domaine public, littérature, histoire",
      url: "https://wikisource.org"
    },
    {
      name: "Academia.edu",
      icon: "👥",
      description: "Réseau social académique pour partager et découvrir articles de recherche",
      categories: "Réseau académique, articles scientifiques, collaboration",
      url: "https://www.academia.edu"
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
      title: "Economie Informelle en Haïti, Marché du Travail et Pauvreté: Analyses Quantitatives",
      author: "Roseman ASPILLAIRE",
      year: 2017,
      institution: "Université Paris-Est Créteil",
      type: "Thèse de Doctorat",
      discipline: "Économie",
      abstract: "Cette thèse examine les aspects de l'économie informelle en Haïti, le marché du travail et la pauvreté à travers une analyse quantitative approfondie.",
      url: "https://theses.fr/2017PESC0122/abes",
      keywords: ["Économie informelle", "Marché du travail", "Pauvreté", "Haïti", "Analyse quantitative", "Développement économique", "Emploi"]
    },
    {
      id: 2,
      title: "Caractérisation du patrimoine génétique des caféiers et de l'agrobiodiversité des systèmes agroforestiers caféicoles haïtiens",
      author: "Claude Patrick Millet",
      year: 2024,
      institution: "Université Quisqueya",
      type: "Thèse de Doctorat",
      discipline: "Agriculture",
      abstract: "Étude complète de la caractérisation génétique des caféiers haïtiens et de l'agrobiodiversité des systèmes agroforestiers.",
      url: "https://uniq.edu.ht/publication-laboratoire-edse/",
      keywords: ["Caféiers", "Agrobiodiversité", "Génétique", "Agriculture haïtienne", "Ressources génétiques", "Agroforesterie", "Biodiversité"]
    },
    {
      id: 3,
      title: "Conditions d'adoption d'innovations dans l'agriculture haïtienne : cas des systèmes agroforestiers structurés par les filières cacao et café",
      author: "Jean Fritzner Amazan",
      year: 2024,
      institution: "Université Quisqueya",
      type: "Thèse de Doctorat",
      discipline: "Agriculture",
      abstract: "Analyse des conditions d'adoption des innovations agricoles en Haïti, avec focus sur les systèmes agroforestiers de cacao et café.",
      url: "https://uniq.edu.ht/publication-laboratoire-edse/",
      keywords: ["Innovations agricoles", "Agroforesterie", "Cacao", "Café", "Adoption technologique", "Systèmes agricoles", "Filières agricoles"]
    },
    {
      id: 4,
      title: "La course aux aires marines protégées dans la Caraïbe insulaire : Cap sur les enjeux de gestion et de gouvernance en Haïti, à Cuba et en Guadeloupe",
      author: "Alexandra Vanessa D. Pierre",
      year: 2024,
      institution: "Université Quisqueya",
      type: "Thèse de Doctorat",
      discipline: "Géographie",
      abstract: "Étude comparative des aires marines protégées dans la Caraïbe, avec focus sur les enjeux de gestion et de gouvernance en Haïti.",
      url: "https://uniq.edu.ht/these-alexandra-d-vanessa-pierre/",
      keywords: ["Aires marines protégées", "Géographie", "Gouvernance", "Caraïbe", "Gestion côtière", "Conservation marine", "Environnement marin"]
    },
    {
      id: 5,
      title: "Responsabilité familiale et Échec scolaire en Haïti : Cas de la commune de Montrouis de 2016 à 2021",
      author: "Claude Milius, Emilio Pierre",
      year: 2021,
      institution: "Haiti Nexus Journals",
      type: "Mémoire de Maîtrise",
      discipline: "Éducation",
      abstract: "Étude des facteurs de responsabilité familiale influençant l'échec scolaire en Haïti, cas d'étude de Montrouis.",
      url: "https://haitinexusjournals.online/index.php/theses-HSS",
      keywords: ["Responsabilité familiale", "Échec scolaire", "Éducation", "Haïti", "Famille", "Rendement scolaire", "Sociologie de l'éducation"]
    },
    {
      id: 6,
      title: "Approche par compétences et rendement scolaire en Haïti : impact de la pratique enseignante. Cas de la classe du secondaire IV au Lycée du Bicentenaire de Saint-Marc (2018 - 2021)",
      author: "Auteur(e) non spécifié",
      year: 2021,
      institution: "Haiti Nexus Journals",
      type: "Mémoire de Maîtrise",
      discipline: "Éducation",
      abstract: "Analyse de l'impact de l'approche par compétences sur le rendement scolaire en Haïti.",
      url: "https://haitinexusjournals.online/index.php/theses-HSS",
      keywords: ["Compétences", "Rendement scolaire", "Pratique enseignante", "Haïti", "Pédagogie", "Formation des enseignants", "Didactique"]
    },
    {
      id: 7,
      title: "Quelques facteurs influençant le rendement des adolescents en milieu scolaire : Cas du 3ème cycle fondamental au C.F.C 2016-2015",
      author: "Auteur(e) non spécifié",
      year: 2016,
      institution: "Haiti Nexus Journals",
      type: "Mémoire de Maîtrise",
      discipline: "Éducation",
      abstract: "Étude des facteurs influençant le rendement des adolescents dans le cycle fondamental en Haïti.",
      url: "https://haitinexusjournals.online/index.php/theses-HSS",
      keywords: ["Rendement scolaire", "Adolescents", "Facteurs", "Éducation", "Psychologie de l'éducation", "Développement adolescent", "Réussite scolaire"]
    },
    {
      id: 8,
      title: "Gestion des déchets et protection de l'environnement en Haïti",
      author: "M. Francois",
      year: 2024,
      institution: "Université française",
      type: "Thèse de Doctorat",
      discipline: "Environnement",
      abstract: "Étude de la gestion des déchets et de la protection de l'environnement en Haïti.",
      url: "https://theses.fr/2024ANTI0991",
      keywords: ["Gestion des déchets", "Environnement", "Protection", "Haïti", "Développement durable", "Pollution", "Écologie"]
    },
    {
      id: 9,
      title: "Dynamics of cholera epidemics in Haiti and Africa",
      author: "S. Moore",
      year: 2016,
      institution: "Université française",
      type: "Thèse de Doctorat",
      discipline: "Santé Publique",
      abstract: "Étude des dynamiques des épidémies de choléra en Haïti et en Afrique.",
      url: "https://theses.fr/2016AIXM5505",
      keywords: ["Choléra", "Épidémiologie", "Santé publique", "Haïti", "Maladies infectieuses", "Épidémie", "Santé communautaire"]
    },
    {
      id: 10,
      title: "Appréhender le risque sismique en Haïti",
      author: "Auteur(e) non spécifié",
      year: 2023,
      institution: "Université française",
      type: "Thèse de Doctorat",
      discipline: "Géologie",
      abstract: "Étude des risques sismiques en Haïti à travers une approche de sismologie participative.",
      url: "https://theses.fr/s351056",
      keywords: ["Risque sismique", "Géologie", "Sismologie", "Haïti", "Prévention des catastrophes", "Tectonique", "Aléas naturels"]
    },
    {
      id: 11,
      title: "Counter-Narratives: Haitians in Economic Transition",
      author: "Patricia Barthaud",
      year: 2020,
      institution: "University of San Francisco",
      type: "Thèse de Doctorat",
      discipline: "Économie",
      abstract: "Analyse des narratifs alternatifs concernant la transition économique des Haïtiens et leur intégration économique.",
      url: "https://scholarworks.usfca.edu/",
      keywords: ["Économie haïtienne", "Transition économique", "Narratifs alternatifs", "Intégration économique", "Diaspora haïtienne", "Développement économique"]
    },
    {
      id: 12,
      title: "Fanm Pa Chita: Mobilities, Intimate Labour, And Political Subjectivities Among Haitian Women on The Move",
      author: "Masaya Llavaneras Blanco",
      year: 2020,
      institution: "Wilfrid Laurier University",
      type: "Thèse de Doctorat",
      discipline: "Sciences humaines et sociales",
      abstract: "Étude des mobilités, du travail intime et des subjectivités politiques des femmes haïtiennes migrantes.",
      url: "https://scholars.wlu.ca/",
      keywords: ["Femmes haïtiennes", "Migration", "Travail intime", "Mobilités", "Études de genre", "Subjectivités politiques", "Diaspora"]
    },
    {
      id: 13,
      title: "Haitian Vodou: 'Pwen' (Magical Charge) in Ritual Context",
      author: "Kimberly Ann Greenough-Hodges",
      year: 2020,
      institution: "University of Texas at Dallas",
      type: "Thèse de Doctorat",
      discipline: "Anthropologie",
      abstract: "Étude anthropologique du Vodou haïtien, en particulier le concept de 'Pwen' (charge magique) dans les contextes rituels.",
      url: "https://utdallas.edu/",
      keywords: ["Vodou", "Anthropologie", "Rituels", "Spiritualité haïtienne", "Culture haïtienne", "Magie", "Religion"]
    },
    {
      id: 14,
      title: "Haiti has more forests than previously reported: land change 2000-2015",
      author: "Ose Pauleus",
      year: 2020,
      institution: "University of Puerto Rico",
      type: "Recherche Scientifique",
      discipline: "Environnement",
      abstract: "Analyse des changements d'utilisation des terres en Haïti révélant une couverture forestière plus importante que préalablement estimée.",
      url: "https://www.upr.edu/",
      keywords: ["Forêts", "Déforestation", "Changements d'utilisation des terres", "Environnement haïtien", "Géographie", "Conservation", "Biodiversité"]
    },
    {
      id: 15,
      title: "Mitan-Morphic: The Study of the Evolution of the Contemporary Haitian Artist in Relation to Historical Trauma",
      author: "Petrouchka Louise Leslie Moise",
      year: 2020,
      institution: "Louisiana State University",
      type: "Thèse de Doctorat",
      discipline: "Arts",
      abstract: "Étude de l'évolution des artistes haïtiens contemporains en relation avec les traumatismes historiques et la résilience culturelle.",
      url: "https://www.lsu.edu/",
      keywords: ["Arts haïtiens", "Artistes contemporains", "Trauma historique", "Culture haïtienne", "Résilience", "Expression artistique", "Identité"]
    },
    {
      id: 16,
      title: "Livelihoods in the Balance: Haitians, Haitian-Dominicans and Precarious Work in the Dominican Republic",
      author: "Effie Smith",
      year: 2020,
      institution: "Penn State University",
      type: "Mémoire de Master",
      discipline: "Sociologie",
      abstract: "Analyse des moyens de subsistance précaires des travailleurs haïtiens et haïtiens-dominicains en République Dominicaine.",
      url: "https://www.psu.edu/",
      keywords: ["Travail précaire", "Haïtiens en République Dominicaine", "Moyens de subsistance", "Migration", "Conditions de travail", "Batey", "Sociologie du travail"]
    },
    {
      id: 17,
      title: "Deconstructing Language Ideologies with Self-Reflective Writing in an ESL Classroom in Haiti",
      author: "Javid Buchanan",
      year: 2019,
      institution: "CUNY City College",
      type: "Thèse de Doctorat",
      discipline: "Éducation",
      abstract: "Analyse critique des idéologies linguistiques dans l'enseignement de l'anglais en Haïti à travers l'écriture réflexive.",
      url: "https://www.ccny.cuny.edu/",
      keywords: ["Linguistique", "Idéologies linguistiques", "Enseignement de l'anglais", "Créole haïtien", "Éducation", "Multilinguisme", "Pédagogie critique"]
    },
    {
      id: 18,
      title: "The Issue of Language in Haitian Education: An inquiry into the factors Hindering Haitian Creole Usage in Primary Schooling",
      author: "William Vince Dewar",
      year: 2019,
      institution: "Florida State University",
      type: "Mémoire de Master",
      discipline: "Éducation",
      abstract: "Enquête sur les obstacles à l'utilisation du créole haïtien dans l'enseignement primaire en Haïti.",
      url: "https://www.fsu.edu/",
      keywords: ["Créole haïtien", "Éducation primaire", "Politique linguistique", "Enseignement", "Langue maternelle", "Haïti", "Pédagogie"]
    },
    {
      id: 19,
      title: "Haiti's Disempowerment: A Consideration towards Social Awareness and Agricultural Development",
      author: "Veronica Ann Rousseau Hackenbruch",
      year: 2019,
      institution: "Harvard University",
      type: "Mémoire de Master",
      discipline: "Développement",
      abstract: "Analyse de l'autonomisation sociale et du développement agricole en Haïti comme stratégies de réduction de la vulnérabilité.",
      url: "https://www.harvard.edu/",
      keywords: ["Développement agricole", "Autonomisation", "Conscience sociale", "Haïti", "Développement durable", "Agriculture", "Résilience"]
    },
    {
      id: 20,
      title: "Fanm ak Pouvwa: Images of Women in Haitian Sovereignty",
      author: "Eva Heppelmann",
      year: 2019,
      institution: "University of California-Los Angeles",
      type: "Thèse de Doctorat",
      discipline: "Sciences humaines et sociales",
      abstract: "Étude des images et représentations des femmes dans la souveraineté haïtienne et la construction identitaire nationale.",
      url: "https://www.ucla.edu/",
      keywords: ["Femmes haïtiennes", "Souveraineté", "Identité nationale", "Études de genre", "Représentations", "Empowerment", "Culture haïtienne"]
    },
    {
      id: 21,
      title: "Agronomic Performance And Genetic Diversity Of Common Bean (Phaseolus Vulgaris) Varieties In Haiti",
      author: "Riphine Mainviel",
      year: 2019,
      institution: "University of Florida",
      type: "Mémoire de Master",
      discipline: "Agriculture",
      abstract: "Étude de la performance agronomique et de la diversité génétique des variétés de haricots communs cultivés en Haïti.",
      url: "https://www.ufl.edu/",
      keywords: ["Haricots", "Génétique", "Agriculture haïtienne", "Diversité génétique", "Performance agronomique", "Cultures vivrières", "Biodiversité"]
    },
    {
      id: 22,
      title: "The Role of Migration-Related Stress in Depression Among Haitian Immigrants in Florida",
      author: "Chercheur(e) non spécifié(e)",
      year: 2018,
      institution: "Université américaine",
      type: "Recherche Scientifique",
      discipline: "Santé",
      abstract: "Étude du rôle du stress lié à la migration dans la dépression chez les immigrants haïtiens en Floride.",
      url: "https://scholarworks.waldenu.edu/",
      keywords: ["Santé mentale", "Migration", "Stress", "Dépression", "Immigrants haïtiens", "Psychologie", "Santé publique"]
    },
    {
      id: 23,
      title: "An In-Depth Analysis Of The Lived Experience Of Agricultural Undergraduate Students in Haiti",
      author: "Chercheur(e) non spécifié(e)",
      year: 2018,
      institution: "Université haïtienne",
      type: "Recherche Scientifique",
      discipline: "Éducation",
      abstract: "Analyse approfondie des expériences vécues par les étudiants de premier cycle en agriculture en Haïti.",
      url: "https://uniq.edu.ht/",
      keywords: ["Éducation agricole", "Expériences étudiantes", "Agriculture haïtienne", "Formation professionnelle", "Enseignement supérieur", "Haïti"]
    },
    {
      id: 24,
      title: "An anthropological investigation of mental health in Haiti: Language measurement, and the socio-spiritual world",
      author: "Chercheur(e) non spécifié(e)",
      year: 2017,
      institution: "Université américaine",
      type: "Recherche Scientifique",
      discipline: "Anthropologie",
      abstract: "Investigation anthropologique de la santé mentale en Haïti intégrant les dimensions linguistiques et spirituelles.",
      url: "https://www.anthropology.org/",
      keywords: ["Santé mentale", "Anthropologie", "Spiritualité", "Culture haïtienne", "Langue créole", "Bien-être", "Médecine traditionnelle"]
    },
    {
      id: 25,
      title: "The Role And Effectiveness Of The Haitian Diaspora In The Development Of Haiti",
      author: "Chercheur(e) non spécifié(e)",
      year: 2016,
      institution: "Université haïtienne",
      type: "Recherche Scientifique",
      discipline: "Développement",
      abstract: "Analyse du rôle et de l'efficacité de la diaspora haïtienne dans le développement économique et social d'Haïti.",
      url: "https://www.uniq.edu.ht/",
      keywords: ["Diaspora haïtienne", "Développement", "Remises", "Investissements", "Coopération internationale", "Haïti", "Engagement diasporique"]
    },
    {
      id: 26,
      title: "Transnational space and sexuality: an Analysis of same-sex Intimate Cross-border Relationships among Men in Haïti",
      author: "Carlo Handy Charles",
      year: 2023,
      institution: "McMaster University (Canada)",
      type: "Thèse de Doctorat",
      discipline: "Sciences Sociales",
      abstract: "Analyse des relations intimes transnationalles entre hommes haïtiens et leurs partenaires migrants à travers la diaspora haïtienne.",
      url: "https://hal.science/tel-04429694v1",
      keywords: ["Sexualité", "Diaspora", "Migrations", "Relations transnationalles", "Haïti", "Genre", "Identité"]
    },
    {
      id: 27,
      title: "Produire l'information sur Haïti en contexte d'insécurité (2019-2024): usages de WhatsApp et reconfiguration du travail journalistique",
      author: "Danaxon Joachim",
      year: 2024,
      institution: "Université de France",
      type: "Thèse de Doctorat",
      discipline: "Journalisme",
      abstract: "Étude sur la production d'information en Haïti dans un contexte d'insécurité, avec focus sur l'utilisation de WhatsApp et la reconfiguration du travail journalistique.",
      url: "https://hal.science/tel-04919082v1",
      keywords: ["Journalisme", "Insécurité", "WhatsApp", "Communication", "Haïti", "Médias", "Information"]
    },
    {
      id: 28,
      title: "Analyse des services éducatifs préscolaires et de la formation du personnel éducateur/enseignant dans le Sud-Est d'Haïti",
      author: "Magdala Jean Baptiste",
      year: 2024,
      institution: "Université d'État d'Haïti",
      type: "Thèse de Doctorat",
      discipline: "Éducation",
      abstract: "Analyse complète des services éducatifs préscolaires et de la formation des enseignants dans la région du Sud-Est d'Haïti.",
      url: "https://hal.science/tel-04629556v1",
      keywords: ["Éducation préscolaire", "Formation enseignante", "Sud-Est Haïti", "Pédagogie", "Développement de l'enfant", "Qualité éducative", "Ressources humaines"]
    },
    {
      id: 29,
      title: "Tectonic evolution, fault architecture, and paleo-fluid circulation in transpressive systems - southern Haiti",
      author: "Richard Wessels",
      year: 2018,
      institution: "Université Sorbonne (France)",
      type: "Thèse de Doctorat",
      discipline: "Géologie",
      abstract: "Étude de l'évolution tectonique, de l'architecture des failles et de la circulation des fluides paléo dans les systèmes transpressifs du sud d'Haïti.",
      url: "https://hal.science/tel-02484820v2",
      keywords: ["Tectonique", "Géologie", "Failles", "Fluides géothermiques", "Haïti", "Géodynamique", "Sismologie"]
    },
    {
      id: 30,
      title: "Économie verte, éradication de l'extrême pauvreté et développement durable en Haïti: Théories et évidences empiriques",
      author: "Philippe Simon",
      year: 2020,
      institution: "Université d'Antioche (France)",
      type: "Thèse de Doctorat",
      discipline: "Économie",
      abstract: "Analyse théorique et empirique de l'économie verte, de l'éradication de la pauvreté extrême et du développement durable en Haïti.",
      url: "https://hal.science/tel-05005789v1",
      keywords: ["Économie verte", "Pauvreté", "Développement durable", "Haïti", "Environnement", "Développement économique", "Durabilité"]
    },
    {
      id: 31,
      title: "My subject is Haïti, the Black Republic: l'expérience haïtienne des militants noirs-américains (1804-1893)",
      author: "Claire Bourhis-Mariotti",
      year: 2013,
      institution: "Université Paris 1 Panthéon-Sorbonne (France)",
      type: "Thèse de Doctorat",
      discipline: "Histoire",
      abstract: "Étude historique de l'expérience haïtienne des militants noirs-américains du 19ème siècle et leur engagement pour la liberté.",
      url: "https://hal.science/tel-01455099v1",
      keywords: ["Histoire", "Activisme noir", "États-Unis", "Haïti", "Liberté", "Diaspora", "Relations internationales"]
    },
    {
      id: 32,
      title: "La maternité adolescente à Haïti: Facteurs sociaux, économiques et culturels",
      author: "David Jean Simon",
      year: 2022,
      institution: "Université Paris 1 Panthéon-Sorbonne (France)",
      type: "Thèse de Doctorat",
      discipline: "Santé Publique",
      abstract: "Analyse des facteurs sociaux, économiques et culturels influençant la maternité adolescente en Haïti.",
      url: "https://hal.science/tel-03977718v1",
      keywords: ["Maternité adolescente", "Santé reproductive", "Haïti", "Facteurs sociaux", "Développement", "Genre", "Santé publique"]
    },
    {
      id: 33,
      title: "Dynamique d'une frontière transformante dans un contexte de collision oblique: étude de la limite nord de la plaque Caraïbe",
      author: "Jordane Corbeau",
      year: 2015,
      institution: "Université Paris Diderot (France)",
      type: "Thèse de Doctorat",
      discipline: "Géologie",
      abstract: "Étude géodynamique de la frontière transformante nord de la plaque Caraïbe et ses implications sismiques pour Haïti.",
      url: "https://hal.science/tel-01413773v1",
      keywords: ["Géodynamique", "Plaque Caraïbe", "Sismologie", "Tectonique", "Haïti", "Géologie", "Risques naturels"]
    },
    {
      id: 34,
      title: "Monographie hydrologique d'Haïti: analyse et prédétermination des pluies et crues fortes",
      author: "Ralph Bathelemy",
      year: 2023,
      institution: "Université Côte d'Azur (France)",
      type: "Thèse de Doctorat",
      discipline: "Environnement",
      abstract: "Monographie complète de l'hydrologie haïtienne avec analyse des pluies et prédiction des crues fortes.",
      url: "https://hal.science/tel-04361205v2",
      keywords: ["Hydrologie", "Pluies", "Crues", "Environnement", "Haïti", "Changement climatique", "Risques hydrologiques"]
    },
    {
      id: 35,
      title: "La décentralisation en Haïti à l'aune de l'expérience décentralisatrice française",
      author: "Jacques Alain Mondésir",
      year: 2024,
      institution: "Université de Lorraine (France)",
      type: "Thèse de Doctorat",
      discipline: "Gouvernance",
      abstract: "Analyse comparative de la décentralisation en Haïti et en France, avec implications pour la gouvernance locale.",
      url: "https://hal.science/tel-04942873v1",
      keywords: ["Décentralisation", "Gouvernance", "Politique locale", "Haïti", "France", "Administration publique", "Développement territorial"]
    },
    {
      id: 36,
      title: "Démocratisation et inégalités scolaires dans les pays en voie de développement. Le cas d'Haïti",
      author: "Mardochée Pierre",
      year: 2021,
      institution: "Université Paris-Sud (France)",
      type: "Thèse de Doctorat",
      discipline: "Éducation",
      abstract: "Étude des relations entre démocratisation et inégalités scolaires en Haïti et dans les pays en développement.",
      url: "https://hal.science/tel-03537776v1",
      keywords: ["Inégalités scolaires", "Démocratisation", "Éducation", "Haïti", "Développement", "Accès à l'éducation", "Équité"]
    },
    {
      id: 37,
      title: "La gestion juridique des risques et des catastrophes naturelles en Haïti: défaillances et solutions",
      author: "Eland Guerrier",
      year: 2021,
      institution: "Université de Franche-Comté (France)",
      type: "Thèse de Doctorat",
      discipline: "Droit",
      abstract: "Analyse juridique de la gestion des risques et catastrophes naturelles en Haïti, identifiant les défaillances et proposant des solutions.",
      url: "https://hal.science/tel-05242678v1",
      keywords: ["Droit", "Gestion des catastrophes", "Risques naturels", "Haïti", "Cadre juridique", "Gouvernance", "Prévention"]
    },
    {
      id: 38,
      title: "Relations entre systèmes tectoniques et sédimentaires à la limite Nord de la plaque Caraïbe",
      author: "Alana Oliveira de Sa",
      year: 2023,
      institution: "Sorbonne Université (France)",
      type: "Thèse de Doctorat",
      discipline: "Géosciences",
      abstract: "Étude des relations entre systèmes tectoniques et sédimentaires à la limite nord de la plaque Caraïbe avec implications pour Haïti.",
      url: "https://hal.science/tel-04504931v1",
      keywords: ["Géosciences", "Tectonique", "Sédimentologie", "Plaque Caraïbe", "Haïti", "Géodynamique", "Géologie marine"]
    },
    {
      id: 39,
      title: "Contribution à la compréhension de l'aléa sismique en Haïti à partir d'une analyse de la sismicité régionale",
      author: "Sylvert Paul",
      year: 2024,
      institution: "Université Côte d'Azur & Université d'État d'Haïti",
      type: "Thèse de Doctorat",
      discipline: "Sismologie",
      abstract: "Analyse complète de la sismicité régionale pour améliorer la compréhension de l'aléa sismique en Haïti.",
      url: "https://hal.science/tel-04996483v1",
      keywords: ["Sismologie", "Aléa sismique", "Sismicité", "Haïti", "Tremblements de terre", "Géophysique", "Prévention"]
    },
    {
      id: 40,
      title: "Haitian Vodou: 'Pwen' (Magical Charge) in Ritual Context",
      author: "Kimberly Ann Greenough-Hodges",
      year: 2020,
      institution: "University of Texas at Dallas (États-Unis)",
      type: "Thèse de Doctorat",
      discipline: "Anthropologie",
      abstract: "Étude anthropologique du Vodou haïtien, particulièrement du concept de 'Pwen' (charge magique) dans les contextes rituels.",
      url: "https://www.utdallas.edu/",
      keywords: ["Vodou", "Spiritualité", "Rituel", "Anthropologie", "Haïti", "Culture", "Religion"]
    },
    {
      id: 41,
      title: "Fanm ak Pouvwa: Images of Women in Haitian Sovereignty",
      author: "Eva Heppelmann",
      year: 2019,
      institution: "University of California-Los Angeles (États-Unis)",
      type: "Thèse de Doctorat",
      discipline: "Études Culturelles",
      abstract: "Analyse des images et représentations des femmes haïtiennes dans le contexte de la souveraineté nationale.",
      url: "https://www.ucla.edu/",
      keywords: ["Femmes", "Souveraineté", "Genre", "Haïti", "Culture", "Identité", "Représentation"]
    },
    {
      id: 42,
      title: "Mitan-Morphic: The Study of the Evolution of the Contemporary Haitian Artist in Relation to Historical Trauma",
      author: "Petrouchka Louise Leslie Moise",
      year: 2020,
      institution: "Louisiana State University (États-Unis)",
      type: "Thèse de Doctorat",
      discipline: "Arts",
      abstract: "Étude de l'évolution de l'artiste haïtien contemporain en relation avec les traumas historiques du pays.",
      url: "https://www.lsu.edu/",
      keywords: ["Arts", "Trauma historique", "Artistes haïtiens", "Culture", "Haïti", "Expression artistique", "Identité culturelle"]
    },
    {
      id: 43,
      title: "Agronomic Performance And Genetic Diversity Of Common Bean (Phaseolus Vulgaris) Varieties In Haiti",
      author: "Riphine Mainviel",
      year: 2019,
      institution: "University of Florida (États-Unis)",
      type: "Thèse de Doctorat",
      discipline: "Agriculture",
      abstract: "Étude de la performance agronomique et de la diversité génétique des variétés de haricots communs en Haïti.",
      url: "https://www.ufl.edu/",
      keywords: ["Agriculture", "Génétique", "Haricots", "Diversité génétique", "Haïti", "Cultures vivrières", "Sécurité alimentaire"]
    },
    {
      id: 44,
      title: "Analysis of Haitian Perceptions Related to Sexual Abuse and Exploitation Perpetrated by UN Peacekeepers during MINUSTAH",
      author: "Letizia Canciani",
      year: 2023,
      institution: "Università degli Studi di Padova (Italie)",
      type: "Thèse de Doctorat",
      discipline: "Droits Humains",
      abstract: "Analyse des perceptions haïtiennes concernant les abus sexuels et l'exploitation par les casques bleus de l'ONU durant MINUSTAH.",
      url: "https://thesis.unipd.it/",
      keywords: ["Droits humains", "Abus sexuels", "MINUSTAH", "ONU", "Haïti", "Justice", "Victimes"]
    },
    {
      id: 45,
      title: "Relations entre Haïtiens et Dominicains dans la région frontalière nord",
      author: "Catherine Bourgeois",
      year: 2016,
      institution: "Université Libre de Bruxelles (Belgique)",
      type: "Thèse de Doctorat",
      discipline: "Droit",
      abstract: "Analyse des relations entre Haïtiens et Dominicains dans la région frontalière nord et implications juridiques et sociales.",
      url: "https://cv.hal.science/catherine-bourgeois",
      keywords: ["Droit", "Frontière", "Relations internationales", "Haïti", "République Dominicaine", "Gouvernance", "Coopération régionale"]
    },
    {
      id: 46,
      title: "La question des services sociaux dans le processus d'urbanisation accéléré de la Commune de Ouanaminthe",
      author: "Simbert ARISTIDE",
      year: 2014,
      institution: "Université d'État d'Haïti",
      type: "Mémoire de Licence",
      discipline: "Service Social",
      abstract: "Analyse des services sociaux dans le contexte d'urbanisation accélérée de la commune de Ouanaminthe.",
      url: "https://classiques.uqam.ca/contemporains/etudes_haitiennes/",
      keywords: ["Services sociaux", "Urbanisation", "Ouanaminthe", "Développement urbain", "Haïti", "Politique sociale"]
    },
    {
      id: 47,
      title: "Droit au logement et personnes déplacées - Camp d'hébergement de Delmas 33 après le séisme de 2010",
      author: "Kensy BIEN-AIMÉ",
      year: 2016,
      institution: "Université d'État d'Haïti",
      type: "Mémoire de Licence",
      discipline: "Travail Social",
      abstract: "Analyse du cadre de vie et des droits sociaux des personnes déplacées vivant dans le camp d'hébergement de Delmas 33 après le séisme du 12 janvier 2010.",
      url: "https://classiques.uqam.ca/contemporains/etudes_haitiennes/",
      keywords: ["Logement", "Personnes déplacées", "Séisme 2010", "Droits sociaux", "Haïti", "Camps d'hébergement"]
    },
    {
      id: 48,
      title: "Impacts des activités agricoles sur l'écosystème du Parc National La Visite en Haïti",
      author: "Christin CALIXTE",
      year: 2015,
      institution: "Université Senghor (Alexandrie, Égypte)",
      type: "Mémoire de Master",
      discipline: "Environnement",
      abstract: "Analyse des impacts des activités agricoles sur l'écosystème du Parc National La Visite, particulièrement la forêt feuillue de Bérac.",
      url: "https://classiques.uqam.ca/contemporains/etudes_haitiennes/",
      keywords: ["Agriculture", "Écosystème", "Parc National La Visite", "Forêt", "Biodiversité", "Environnement", "Haïti"]
    },
    {
      id: 49,
      title: "Représentations sociales des hommes par rapport aux femmes dans les proverbes créoles haïtiens",
      author: "Muselène CARILUS",
      year: 2017,
      institution: "Université Senghor",
      type: "Mémoire de Master",
      discipline: "Anthropologie",
      abstract: "Analyse des représentations sociales des hommes par rapport aux femmes dans les proverbes créoles haïtiens.",
      url: "https://classiques.uqam.ca/contemporains/etudes_haitiennes/",
      keywords: ["Genre", "Proverbes créoles", "Représentations sociales", "Culture haïtienne", "Communication", "Haïti"]
    },
    {
      id: 50,
      title: "Potentialités touristiques et développement socio-économique de la commune de Cayes-Jacmel",
      author: "Jean-Ony CÉLESTIN",
      year: 2016,
      institution: "CLACSO (Haïti)",
      type: "Mémoire de Master",
      discipline: "Tourisme",
      abstract: "Analyse des potentialités touristiques et des perspectives de développement socio-économique de la commune de Cayes-Jacmel.",
      url: "https://classiques.uqam.ca/contemporains/etudes_haitiennes/",
      keywords: ["Tourisme", "Développement économique", "Cayes-Jacmel", "Potentialités touristiques", "Haïti", "Développement local"]
    },
    {
      id: 51,
      title: "Exploration de la vulnérabilité de la paysannerie haïtienne dans le contexte du changement climatique",
      author: "Thony CHÉRILUS",
      year: 2015,
      institution: "Université d'État d'Haïti",
      type: "Mémoire",
      discipline: "Environnement",
      abstract: "Exploration de la vulnérabilité de la paysannerie haïtienne dans le contexte du changement climatique et de l'adaptation.",
      url: "https://classiques.uqam.ca/contemporains/etudes_haitiennes/",
      keywords: ["Changement climatique", "Paysannerie", "Vulnérabilité", "Agriculture", "Adaptation", "Haïti"]
    },
    {
      id: 52,
      title: "L'application du système interaméricain de protection des droits de l'homme par la République d'Haïti",
      author: "Esther CRIBE",
      year: 2016,
      institution: "Université d'État d'Haïti",
      type: "Mémoire",
      discipline: "Droit",
      abstract: "Analyse de l'application du système interaméricain de protection des droits de l'homme par la République d'Haïti.",
      url: "https://classiques.uqam.ca/contemporains/etudes_haitiennes/",
      keywords: ["Droits humains", "Système interaméricain", "Droit international", "Haïti", "Gouvernance", "Justice"]
    },
    {
      id: 53,
      title: "Stratégies de communication de vente des agents de marketing dans les autobus de transport en commun en Haïti",
      author: "Kendson DANJOU",
      year: 2015,
      institution: "Université d'État d'Haïti",
      type: "Mémoire",
      discipline: "Communication",
      abstract: "Analyse des stratégies de communication de vente utilisées par les agents de marketing dans les autobus de transport en commun en Haïti.",
      url: "https://classiques.uqam.ca/contemporains/etudes_haitiennes/",
      keywords: ["Communication commerciale", "Marketing", "Transport", "Stratégies de vente", "Haïti"]
    },
    {
      id: 54,
      title: "Communication participative, protection des ressources patrimoniales et développement local",
      author: "Ricarson DORCÉ",
      year: 2014,
      institution: "Université d'État d'Haïti",
      type: "Mémoire",
      discipline: "Communication",
      abstract: "Analyse de la communication participative comme outil de protection des ressources patrimoniales et de développement local en Haïti.",
      url: "https://classiques.uqam.ca/contemporains/etudes_haitiennes/",
      keywords: ["Communication participative", "Patrimoine", "Développement local", "Ressources culturelles", "Haïti"]
    },
    {
      id: 55,
      title: "La psychologie de l'enfant en domesticité",
      author: "Ricarson DORCÉ",
      year: 2014,
      institution: "Université d'État d'Haïti",
      type: "Mémoire",
      discipline: "Psychologie",
      abstract: "Analyse psychologique des enfants en situation de domesticité en Haïti et impacts sur leur développement personnel.",
      url: "https://classiques.uqam.ca/contemporains/etudes_haitiennes/",
      keywords: ["Enfants en domesticité", "Psychologie", "Protection de l'enfance", "Développement personnel", "Haïti"]
    },
    {
      id: 56,
      title: "Analyse ethnologique des rites et rituels dans les élections présidentielles de 2010-2011 à Port-au-Prince",
      author: "James ENGE",
      year: 2013,
      institution: "Université d'État d'Haïti",
      type: "Mémoire",
      discipline: "Anthropologie",
      abstract: "Analyse ethnologique des rites et rituels observés dans les élections présidentielles de 2010-2011 à Port-au-Prince.",
      url: "https://classiques.uqam.ca/contemporains/etudes_haitiennes/",
      keywords: ["Élections", "Rituels", "Anthropologie", "Politique", "Port-au-Prince", "Haïti"]
    },
    {
      id: 57,
      title: "Les préférences commerciales unilatérales des États-Unis au profit d'Haïti",
      author: "Woodkend EUGENE",
      year: 2014,
      institution: "Université d'État d'Haïti",
      type: "Mémoire",
      discipline: "Économie",
      abstract: "Analyse des préférences commerciales unilatérales accordées par les États-Unis au profit d'Haïti et leurs impacts économiques.",
      url: "https://classiques.uqam.ca/contemporains/etudes_haitiennes/",
      keywords: ["Commerce international", "États-Unis", "Haïti", "Préférences commerciales", "Économie"]
    },
    {
      id: 58,
      title: "Les repatriements massifs d'Haïtiens de 1991 à 2011 - Responsabilité internationale et droit interaméricain",
      author: "Johnson JEAN-BAPTISTE",
      year: 2014,
      institution: "Université d'État d'Haïti",
      type: "Mémoire de Licence",
      discipline: "Droit",
      abstract: "Analyse des repatriements massifs d'Haïtiens de 1991 à 2011 et responsabilité internationale des États dominicain et haïtien au regard du droit interaméricain.",
      url: "https://classiques.uqam.ca/contemporains/etudes_haitiennes/",
      keywords: ["Repatriements", "Migrations", "Droit international", "Droits humains", "Haïti", "République Dominicaine"]
    },
    {
      id: 59,
      title: "Représentation de soi chez les jeunes en domesticité dès la troisième enfance",
      author: "Samuel JEAN-BAPTISTE",
      year: 2014,
      institution: "Université d'État d'Haïti",
      type: "Mémoire",
      discipline: "Psychologie",
      abstract: "Analyse de la représentation de soi chez les jeunes âgés de 14 à 17 ans en situation de domesticité dès la troisième enfance.",
      url: "https://classiques.uqam.ca/contemporains/etudes_haitiennes/",
      keywords: ["Enfants en domesticité", "Identité", "Psychologie", "Jeunesse", "Haïti", "Protection de l'enfance"]
    },
    {
      id: 60,
      title: "Migrations estudiantines et expériences du logement à Port-au-Prince",
      author: "Williamson LAFORTUNE",
      year: 2015,
      institution: "Université d'État d'Haïti",
      type: "Mémoire",
      discipline: "Sociologie",
      abstract: "Analyse des migrations estudiantines et des expériences du logement des étudiants migrants à Port-au-Prince.",
      url: "https://classiques.uqam.ca/contemporains/etudes_haitiennes/",
      keywords: ["Migrations", "Étudiants", "Logement", "Port-au-Prince", "Urbanisme", "Haïti"]
    }
  ];

  const statistics = [
    { label: "Institutions de Recherche", value: "20+" },
    { label: "Revues Scientifiques", value: "15+" },
    { label: "Laboratoires", value: "14" },
    { label: "Mémoires et Thèses", value: "60+" }
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
  const uniqueInstitutions = Array.from(new Set(thesesAndDissertations.map(t => t.institution))).sort();
  const uniqueTypes = Array.from(new Set(thesesAndDissertations.map(t => t.type))).sort();
  const allKeywords = Array.from(new Set(thesesAndDissertations.flatMap(t => t.keywords))).sort();
  const minYear = Math.min(...thesesAndDissertations.map(t => t.year));
  const maxYear = Math.max(...thesesAndDissertations.map(t => t.year));

  // Advanced filtering for theses and dissertations
  const getFilteredTheses = () => {
    return thesesAndDissertations.filter(thesis => {
      const matchesSearch = !searchQuery || 
        thesis.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        thesis.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        thesis.abstract.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesDiscipline = !selectedDiscipline || thesis.discipline === selectedDiscipline;
      const matchesType = !selectedType || thesis.type === selectedType;
      const matchesInstitution = !selectedInstitution || thesis.institution === selectedInstitution;
      
      const matchesYear = !selectedYear || thesis.year === selectedYear;
      const matchesYearRange = !(yearRange.start || yearRange.end) || 
        ((!yearRange.start || thesis.year >= yearRange.start) && 
         (!yearRange.end || thesis.year <= yearRange.end));
      
      const matchesKeywords = selectedKeywords.size === 0 || 
        Array.from(selectedKeywords).some(keyword => 
          thesis.keywords.some(k => k.toLowerCase().includes(keyword.toLowerCase())));
      
      return matchesSearch && matchesDiscipline && matchesType && matchesInstitution && 
             (matchesYear || matchesYearRange) && matchesKeywords;
    });
  };

  const filteredTheses = getFilteredTheses();



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
          <TabsList className="grid w-full grid-cols-6 mb-8">
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
            <TabsTrigger value="theses" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Mémoires</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Ressources</span>
            </TabsTrigger>
            <TabsTrigger value="press" className="flex items-center gap-2">
              <Newspaper className="w-4 h-4" />
              <span className="hidden sm:inline">Presse</span>
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

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Dépôts Documentaires</CardTitle>
                  <CardDescription>Accédez aux ressources documentaires et dépôts institutionnels</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {repositories.map((repo, index) => (
                      <div key={index} className="p-4 border border-border rounded-lg hover:border-accent transition">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="text-3xl">{repo.icon}</div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground">{repo.name}</h4>
                            <p className="text-xs text-muted-foreground mt-1">{repo.description}</p>
                          </div>
                        </div>
                        <p className="text-xs text-accent font-semibold mb-3">Catégories : {repo.categories}</p>
                        <Button 
                          size="sm"
                          className="w-full bg-accent hover:bg-accent/90"
                          onClick={() => window.open(repo.url, '_blank')}
                        >
                          Accéder
                        </Button>
                      </div>
                    ))}
                  </div>
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
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                  <label className="text-sm font-semibold text-foreground mb-2 block">Filtrer par institution</label>
                  <select
                    value={selectedInstitution || ""}
                    onChange={(e) => setSelectedInstitution(e.target.value || null)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  >
                    <option value="">Toutes les institutions</option>
                    {uniqueInstitutions.map((institution) => (
                      <option key={institution} value={institution}>
                        {institution}
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
                <div className="md:col-span-4">
                  <label className="text-sm font-semibold text-foreground mb-2 block">Plage d'années</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="De"
                      min={minYear}
                      max={maxYear}
                      value={yearRange.start || ""}
                      onChange={(e) => setYearRange({ ...yearRange, start: e.target.value ? parseInt(e.target.value) : null })}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                    />
                    <input
                      type="number"
                      placeholder="À"
                      min={minYear}
                      max={maxYear}
                      value={yearRange.end || ""}
                      onChange={(e) => setYearRange({ ...yearRange, end: e.target.value ? parseInt(e.target.value) : null })}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-foreground mb-2 block">Filtrer par mots-clés</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Ajouter un mot-clé..."
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && keywordInput.trim()) {
                        handleAddKeyword();
                      }
                    }}
                    className="flex-1 px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  />
                  <Button
                    onClick={handleAddKeyword}
                    className="bg-accent hover:bg-accent/90"
                    size="sm"
                  >
                    Ajouter
                  </Button>
                </div>
                {selectedKeywords.size > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {Array.from(selectedKeywords).map((keyword) => (
                      <span key={keyword} className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-2">
                        {keyword}
                        <button
                          onClick={() => handleRemoveTag(keyword)}
                          className="ml-1 hover:text-primary/70"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
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
