import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, BookOpen, Menu, X, ArrowRight, TrendingUp, Eye, Download } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import NewsletterSubscribe from "@/components/NewsletterSubscribe";
import { useDocumentStats } from "@/hooks/useDocumentStats";
import ShareButtons from "@/components/ShareButtons";

/**
 * Design Philosophy: Université Contemporaine
 * - Palette: Bleu nuit (#1a2f4a), Vert sauge (#7fb069), Blanc cassé (#f5f3f0)
 * - Typography: Playfair Display (titres), Inter (corps)
 * - Layout: Minimaliste, épuré, accessible
 * - Ambiance: Académique, professionnelle, claire
 */

export default function Home() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getMostPopular } = useDocumentStats();
  const topTrends = getMostPopular(3);

  // Données d'exemple pour les documents
  const documents = [
    {
      id: 1,
      title: "L'Indépendance d'Haïti: Une Perspective Historique",
      author: "Dr. Jean-Claude Beauvoir",
      category: "Histoire",
      type: "Mémoire",
      date: "2023",
      description: "Une étude approfondie sur les événements qui ont mené à l'indépendance haïtienne en 1804."
    },
    {
      id: 2,
      title: "Biodiversité Marine des Caraïbes",
      author: "Dr. Marie Dubois",
      category: "Sciences",
      type: "Recherche",
      date: "2024",
      description: "Une analyse complète de la faune marine unique des eaux haïtiennes."
    },
    {
      id: 3,
      title: "Littérature Haïtienne Contemporaine",
      author: "Prof. Frantz Voltaire",
      category: "Littérature",
      type: "Mémoire",
      date: "2023",
      description: "Une exploration des œuvres littéraires haïtiennes du XXIe siècle."
    },
    {
      id: 4,
      title: "Économie et Développement Durable en Haïti",
      author: "Dr. Pierre Toussaint",
      category: "Économie",
      type: "Recherche",
      date: "2024",
      description: "Stratégies pour un développement économique durable en Haïti."
    }
  ];

  const filteredDocuments = documents.filter(doc =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition">
            <img src="/logo.jpeg" alt="Echo Academy Haiti" className="h-12 w-auto flex-shrink-0" />
            <div className="hidden sm:block">
              <h1 className="text-xl sm:text-2xl font-bold text-primary">Echo Academy Haiti</h1>
              <p className="text-xs text-muted-foreground">Plateforme de Recherche Haïtienne</p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-lg font-bold text-primary">Echo Academy</h1>
            </div>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4 flex-wrap">
            <Link href="/" className="text-sm lg:text-base hover:text-accent transition font-medium">Accueil</Link>
            <Link href="/about" className="text-sm lg:text-base hover:text-accent transition font-medium">À Propos</Link>
            <Link href="/research-portal" className="text-sm lg:text-base hover:text-accent transition font-medium">Portail Haïti</Link>
            <Link href="/collections" className="text-sm lg:text-base hover:text-accent transition font-medium">Collections</Link>
            <Link href="/resources" className="text-sm lg:text-base hover:text-accent transition font-medium">Ressources</Link>
            <Link href="/biblio-recherche" className="text-sm lg:text-base hover:text-accent transition font-medium">Biblio-Recherche</Link>
            <Link href="/events" className="text-sm lg:text-base hover:text-accent transition font-medium">Événements</Link>
            <Link href="/echopods" className="text-sm lg:text-base hover:text-accent transition font-medium">EchoPods</Link>
            <Link href="/blog" className="text-sm lg:text-base hover:text-accent transition font-medium">Echo Blog</Link>
            <Button variant="ghost" size="sm" className="text-primary hover:text-accent">Contact</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-muted rounded-md transition"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-white">
            <div className="container mx-auto px-4 py-4 space-y-3">
              <Link href="/" className="block text-sm hover:text-accent transition font-medium py-2">Accueil</Link>
              <Link href="/about" className="block text-sm hover:text-accent transition font-medium py-2">À Propos</Link>
              <Link href="/research-portal" className="block text-sm hover:text-accent transition font-medium py-2">Portail Haïti</Link>
              <Link href="/collections" className="block text-sm hover:text-accent transition font-medium py-2">Collections</Link>
              <Link href="/resources" className="block text-sm hover:text-accent transition font-medium py-2">Ressources</Link>
              <Link href="/biblio-recherche" className="block text-sm hover:text-accent transition font-medium py-2">Biblio-Recherche</Link>
              <Link href="/events" className="block text-sm hover:text-accent transition font-medium py-2">Événements</Link>
              <Link href="/echopods" className="block text-sm hover:text-accent transition font-medium py-2">EchoPods</Link>
              <Link href="/blog" className="block text-sm hover:text-accent transition font-medium py-2">Echo Blog</Link>
              <Button size="sm" className="bg-accent hover:bg-accent/90 w-full text-sm">Contact</Button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section - Minimaliste */}
      <section className="bg-gradient-to-b from-background to-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 leading-tight">
              La Plateforme de Recherche Haïtienne
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Explorez les mémoires, thèses et recherches scientifiques haïtiens en libre accès. Connectez-vous à l'écosystème académique haïtien.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/research-portal">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-md px-8 py-6 font-medium flex items-center gap-2">
                  Commencer <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary/5 rounded-md px-8 py-6 font-medium">
                En Savoir Plus
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-primary text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">25+</div>
              <p className="text-sm md:text-base opacity-90">Thèses & Mémoires</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">5+</div>
              <p className="text-sm md:text-base opacity-90">Institutions</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">8+</div>
              <p className="text-sm md:text-base opacity-90">Disciplines</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">100%</div>
              <p className="text-sm md:text-base opacity-90">Accès Libre</p>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Search Section */}
      <section className="bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-primary mb-2 text-center">Moteur de Recherche Avancé</h2>
            <p className="text-muted-foreground text-center mb-8">Explorez 25+ thèses et mémoires haïtiens avec des filtres avancés</p>
            
            <div className="space-y-4">
              {/* Main Search */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-accent w-5 h-5" />
                <Input
                  placeholder="Rechercher par titre, auteur, mots-clés..."
                  className="pl-12 py-6 text-lg border-2 border-accent/30 focus:border-accent focus:ring-accent rounded-lg bg-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {/* Quick Filters */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Link href="/research-portal?discipline=Economie">
                  <Button variant="outline" className="w-full border-accent/50 hover:border-accent hover:bg-accent/10 text-sm">Economie</Button>
                </Link>
                <Link href="/research-portal?discipline=Education">
                  <Button variant="outline" className="w-full border-accent/50 hover:border-accent hover:bg-accent/10 text-sm">Education</Button>
                </Link>
                <Link href="/research-portal?discipline=Environnement">
                  <Button variant="outline" className="w-full border-accent/50 hover:border-accent hover:bg-accent/10 text-sm">Environnement</Button>
                </Link>
                <Link href="/research-portal?discipline=Sciences%20humaines%20et%20sociales">
                  <Button variant="outline" className="w-full border-accent/50 hover:border-accent hover:bg-accent/10 text-sm">Sciences Sociales</Button>
                </Link>
              </div>
              
              {/* Search Button */}
              <Link href="/research-portal" className="block">
                <Button className="w-full bg-accent hover:bg-accent/90 text-white py-6 text-lg font-medium rounded-lg">
                  Recherche Avancée <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-16">
        {/* Quick Links */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-primary mb-8">Accédez à nos ressources</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Link href="/research-portal">
              <Card className="border border-border hover:shadow-lg hover:border-accent transition-all duration-300 rounded-lg cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Mémoires & Thèses</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Explorez notre collection complète de mémoires et thèses académiques haïtiens.</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/collections">
              <Card className="border border-border hover:shadow-lg hover:border-accent transition-all duration-300 rounded-lg cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Collections Thématiques</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Découvrez nos collections organisées par domaine, institution et année.</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/blog">
              <Card className="border border-border hover:shadow-lg hover:border-accent transition-all duration-300 rounded-lg cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">Echo Blog</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Restez informé des dernières actualités académiques et événements haïtiens.</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/trends">
              <Card className="border border-border hover:shadow-lg hover:border-accent transition-all duration-300 rounded-lg cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="text-xl text-primary flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-accent" />
                    Tendances
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Découvrez les documents les plus consultés et téléchargés de notre plateforme.</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Top Trends Section */}
        {topTrends.length > 0 && (
          <div className="border-t border-border pt-16 mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-primary flex items-center gap-2">
                <TrendingUp className="w-8 h-8 text-accent" />
                Documents Tendances
              </h2>
              <Link href="/trends">
                <Button variant="outline" className="border-accent text-accent hover:bg-accent/10">
                  Voir tous les tendances <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {topTrends.map((trend, idx) => (
                <Link key={trend.id} href={`/thesis-detail/${trend.id}`}>
                  <Card className="border border-border hover:shadow-lg hover:border-accent transition-all duration-300 rounded-lg cursor-pointer h-full">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-bold rounded-full">#{idx + 1}</span>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Eye className="w-4 h-4" />
                          <span>{trend.views}</span>
                        </div>
                      </div>
                      <CardTitle className="text-lg text-primary line-clamp-2">Document #{trend.id}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <Download className="w-4 h-4" />
                        <span>{trend.downloads} téléchargements</span>
                      </div>
                      <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/5 rounded-md text-sm">
                        Consulter
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Documents Récents */}
        <div className="border-t border-border pt-16">
          <h2 className="text-3xl font-bold text-primary mb-8">Documents Récents</h2>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3 bg-muted rounded-md">
              <TabsTrigger value="all" className="rounded-sm">Tous</TabsTrigger>
              <TabsTrigger value="memoirs" className="rounded-sm">Mémoires</TabsTrigger>
              <TabsTrigger value="research" className="rounded-sm">Recherches</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredDocuments.map((doc) => (
                  <Card key={doc.id} className="border border-border hover:shadow-lg transition-all duration-300 rounded-lg">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full">{doc.type}</span>
                        <span className="text-xs text-muted-foreground">{doc.date}</span>
                      </div>
                      <CardTitle className="text-lg text-primary">{doc.title}</CardTitle>
                      <CardDescription className="text-muted-foreground">{doc.author}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{doc.description}</p>
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/5 rounded-md">
                          Consulter
                        </Button>
                        <ShareButtons
                          title={doc.title}
                          url={`${window.location.origin}/thesis-detail/${doc.id}`}
                          description={doc.description}
                          author={doc.author}
                          variant="icon-only"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="memoirs" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredDocuments.filter(d => d.type === "Mémoire").map((doc) => (
                  <Card key={doc.id} className="border border-border hover:shadow-lg transition-all duration-300 rounded-lg">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full">{doc.type}</span>
                        <span className="text-xs text-muted-foreground">{doc.date}</span>
                      </div>
                      <CardTitle className="text-lg text-primary">{doc.title}</CardTitle>
                      <CardDescription className="text-muted-foreground">{doc.author}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{doc.description}</p>
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/5 rounded-md">
                          Consulter
                        </Button>
                        <ShareButtons
                          title={doc.title}
                          url={`${window.location.origin}/thesis-detail/${doc.id}`}
                          description={doc.description}
                          author={doc.author}
                          variant="icon-only"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="research" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredDocuments.filter(d => d.type === "Recherche").map((doc) => (
                  <Card key={doc.id} className="border border-border hover:shadow-lg transition-all duration-300 rounded-lg">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full">{doc.type}</span>
                        <span className="text-xs text-muted-foreground">{doc.date}</span>
                      </div>
                      <CardTitle className="text-lg text-primary">{doc.title}</CardTitle>
                      <CardDescription className="text-muted-foreground">{doc.author}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{doc.description}</p>
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/5 rounded-md">
                          Consulter
                        </Button>
                        <ShareButtons
                          title={doc.title}
                          url={`${window.location.origin}/thesis-detail/${doc.id}`}
                          description={doc.description}
                          author={doc.author}
                          variant="icon-only"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-primary text-white py-16 mt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Restez Informé</h2>
            <p className="text-lg opacity-90 mb-8">Recevez les dernières actualités académiques et publications haïtiennes directement dans votre boîte mail.</p>
            <NewsletterSubscribe />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <Link href="/" className="flex items-center gap-2 mb-4 hover:opacity-80 transition">
                <img src="/logo.jpeg" alt="Echo Academy Haiti" className="h-10 w-auto" />
              </Link>
              <p className="text-sm text-muted-foreground">La plateforme de référence pour la recherche haïtienne. Accès libre à 60+ thèses et mémoires académiques.</p>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-4">Ressources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/research-portal" className="hover:text-accent transition">Portail Haïti</Link></li>
                <li><Link href="/collections" className="hover:text-accent transition">Collections</Link></li>
                <li><Link href="/blog" className="hover:text-accent transition">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-4">À Propos</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-accent transition">À Propos</Link></li>
                <li><Link href="/events" className="hover:text-accent transition">Événements</Link></li>
                <li><Link href="/contact" className="hover:text-accent transition">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-primary mb-4">Légal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-accent transition">Conditions d'utilisation</a></li>
                <li><a href="#" className="hover:text-accent transition">Politique de confidentialité</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Echo Academy. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
