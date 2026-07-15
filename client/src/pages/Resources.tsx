import { useState } from "react";
import { Link } from "wouter";
import { ExternalLink, Search, BookOpen, Globe, Database, FileText, Archive, Users, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/**
 * Design Philosophy: Université Contemporaine
 * - Palette: Bleu nuit (#1a2f4a), Vert sauge (#7fb069), Blanc cassé (#f5f3f0)
 * - Typography: Playfair Display (titres), Inter (corps)
 * - Ressources académiques en libre accès
 */

const academicResources = [
  {
    id: "scholar",
    name: "Google Scholar",
    url: "https://scholar.google.com",
    description: "Moteur de recherche académique gratuit indexant articles, thèses et livres de toutes disciplines",
    category: "Moteur de recherche",
    icon: Globe,
    color: "from-blue-500/20 to-cyan-500/20",
    features: ["Recherche multidisciplinaire", "Accès à des millions d'articles", "Profils d'auteurs", "Alertes de citations"]
  },
  {
    id: "base",
    name: "BASE (Bielefeld Academic Search Engine)",
    url: "https://www.base-search.net",
    description: "Moteur de recherche multidisciplinaire indexant plus de 350 millions de documents en libre accès",
    category: "Moteur de recherche",
    icon: Database,
    color: "from-green-500/20 to-emerald-500/20",
    features: ["350+ millions de documents", "Multidisciplinaire", "Accès libre", "Métadonnées enrichies"]
  },
  {
    id: "refseek",
    name: "RefSeek",
    url: "https://www.refseek.com",
    description: "Moteur de recherche académique simple et efficace pour articles scientifiques et ressources éducatives",
    category: "Moteur de recherche",
    icon: Globe,
    color: "from-purple-500/20 to-indigo-500/20",
    features: ["Interface simple", "Recherche rapide", "Ressources éducatives", "Accès gratuit"]
  },
  {
    id: "semantic",
    name: "Semantic Scholar",
    url: "https://www.semanticscholar.org",
    description: "Plateforme de recherche alimentée par l'IA pour découvrir et comprendre les articles scientifiques",
    category: "Moteur de recherche",
    icon: Zap,
    color: "from-orange-500/20 to-red-500/20",
    features: ["Technologie IA", "Résumés intelligents", "Recommandations", "Analyse de citations"]
  },
  {
    id: "doaj",
    name: "DOAJ (Directory of Open Access Journals)",
    url: "https://doaj.org",
    description: "Répertoire de journaux en libre accès de haute qualité couvrant toutes les disciplines",
    category: "Répertoire de journaux",
    icon: FileText,
    color: "from-teal-500/20 to-cyan-500/20",
    features: ["20,000+ journaux en accès libre", "Toutes disciplines", "Qualité garantie", "Recherche par sujet"]
  },
  {
    id: "arxiv",
    name: "arXiv",
    url: "https://arxiv.org",
    description: "Archive de prépublications scientifiques en libre accès, principalement en physique, mathématiques et informatique",
    category: "Archive de prépublications",
    icon: Archive,
    color: "from-red-500/20 to-pink-500/20",
    features: ["Accès immédiat", "Prépublications", "STEM", "Communauté active"]
  },
  {
    id: "hal",
    name: "HAL (Archives Ouvertes)",
    url: "https://hal.science",
    description: "Archive ouverte française indexant publications de recherche en libre accès de tous domaines",
    category: "Archive ouverte",
    icon: Archive,
    color: "from-yellow-500/20 to-orange-500/20",
    features: ["Archives françaises", "Multidisciplinaire", "Libre accès", "Métadonnées complètes"]
  },
  {
    id: "pubmed",
    name: "PubMed Central",
    url: "https://www.ncbi.nlm.nih.gov/pmc",
    description: "Archive gratuite de la littérature biomédicale et des sciences de la vie du National Institutes of Health",
    category: "Archive biomédicale",
    icon: Database,
    color: "from-green-500/20 to-lime-500/20",
    features: ["Biomédicale et sciences de la vie", "Archive complète", "Accès libre", "Recherche avancée"]
  },
  {
    id: "core",
    name: "CORE",
    url: "https://core.ac.uk",
    description: "Agrégateur mondial de recherche en libre accès indexant millions d'articles et thèses",
    category: "Agrégateur",
    icon: Globe,
    color: "from-indigo-500/20 to-purple-500/20",
    features: ["Millions de documents", "Accès libre", "Recherche globale", "Analyse de texte"]
  },
  {
    id: "oapen",
    name: "OAPEN Library",
    url: "https://library.oapen.org",
    description: "Bibliothèque numérique de livres académiques en libre accès en sciences humaines et sociales",
    category: "Bibliothèque numérique",
    icon: BookOpen,
    color: "from-blue-500/20 to-indigo-500/20",
    features: ["Livres en accès libre", "Sciences humaines", "Sciences sociales", "Qualité peer-reviewed"]
  },
  {
    id: "doab",
    name: "Directory of Open Access Books",
    url: "https://www.doabooks.org",
    description: "Répertoire international de livres académiques en libre accès de tous domaines",
    category: "Répertoire de livres",
    icon: BookOpen,
    color: "from-pink-500/20 to-rose-500/20",
    features: ["Livres en accès libre", "Multidisciplinaire", "Recherche par sujet", "Qualité vérifiée"]
  },
  {
    id: "wikisource",
    name: "Wikisource - La Bibliothèque Libre",
    url: "https://fr.wikisource.org",
    description: "Bibliothèque numérique collaborative de textes libres en français et autres langues",
    category: "Bibliothèque collaborative",
    icon: BookOpen,
    color: "from-cyan-500/20 to-blue-500/20",
    features: ["Textes libres", "Multilingue", "Collaboratif", "Domaine public"]
  },
  {
    id: "academia",
    name: "Academia.edu",
    url: "https://www.academia.edu",
    description: "Réseau social académique permettant aux chercheurs de partager et découvrir des publications",
    category: "Réseau académique",
    icon: Users,
    color: "from-slate-500/20 to-gray-500/20",
    features: ["Réseau de chercheurs", "Partage de publications", "Profils d'auteurs", "Statistiques de lecture"]
  }
];

const categories = Array.from(new Set(academicResources.map(r => r.category)));

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredResources = academicResources.filter(resource => {
    const matchesSearch = 
      resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = !selectedCategory || resource.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">Echo Academy Haiti</h1>
              <p className="text-xs subtitle text-muted-foreground">Ressources Académiques</p>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-4">
            <Link href="/" className="hover:text-accent transition">Accueil</Link>
            <Link href="/research-portal" className="hover:text-accent transition">Portail Haïti</Link>
            <Button size="sm" className="bg-accent hover:bg-accent/90">Se Connecter</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 leading-tight">
            Ressources Académiques en Libre Accès
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Accédez à 12 plateformes majeures indexant millions de documents scientifiques, articles, thèses et livres en libre accès
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white border-b border-border">
        <div className="container mx-auto px-4">
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Rechercher une ressource..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-3"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                onClick={() => setSelectedCategory(null)}
                size="sm"
              >
                Toutes les catégories
              </Button>
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  size="sm"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => {
              const IconComponent = resource.icon;
              return (
                <Card key={resource.id} className="hover:shadow-lg transition-all duration-300 flex flex-col">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${resource.color}`}>
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {resource.category}
                      </span>
                    </div>
                    <CardTitle className="text-lg">{resource.name}</CardTitle>
                    <CardDescription className="text-sm mt-2">{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <div className="mb-4 flex-1">
                      <p className="text-xs font-semibold text-muted-foreground mb-2">Caractéristiques</p>
                      <ul className="space-y-1">
                        {resource.features.map((feature, idx) => (
                          <li key={idx} className="text-xs text-muted-foreground">
                            • {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button
                      asChild
                      className="w-full bg-accent hover:bg-accent/90 gap-2"
                    >
                      <a href={resource.url} target="_blank" rel="noopener noreferrer">
                        Accéder à la ressource
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">Aucune ressource ne correspond à votre recherche</p>
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-primary mb-6">À propos de ces ressources</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Accès Libre</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Toutes les ressources listées offrent un accès gratuit à des millions de documents scientifiques sans restrictions géographiques.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Multidisciplinaire</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Couvrant tous les domaines de recherche : sciences, technologie, sciences humaines, sciences sociales et bien plus.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Qualité Garantie</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Les ressources indexent des publications peer-reviewed et des travaux académiques de haute qualité.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Mise à Jour Régulière</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Les bases de données sont continuellement mises à jour avec les dernières publications et recherches.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">À propos</h4>
              <p className="text-sm text-white/80">Echo Academy Haiti - Plateforme de recherche haïtienne en libre accès</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Navigation</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li><Link href="/" className="hover:text-white transition">Accueil</Link></li>
                <li><Link href="/research-portal" className="hover:text-white transition">Portail Haïti</Link></li>
                <li><Link href="/collections" className="hover:text-white transition">Collections</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Ressources</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
                <li><Link href="/about" className="hover:text-white transition">À Propos</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <p className="text-sm text-white/80">contact@echoacademy.ht</p>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-sm text-white/80">
            <p>&copy; 2026 Echo Academy Haiti. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
