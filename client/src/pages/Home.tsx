import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, BookOpen, Archive, Microscope, Heart, Clock, Home as HomeIcon, Grid3x3, Bookmark, User } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

/**
 * Design Philosophy: Élégance Organique Africaine
 * - Palette: Bleu océan (#1B4965), Jaune soleil (#F4D35E), Rouge passion (#EE964B), Vert jungle (#2D6A4F), Blanc crème (#FFF8F3)
 * - Typography: Crimson Text (titres), Montserrat (sous-titres), Lato (corps)
 * - Formes organiques, courbes fluides, motifs géométriques haïtiens
 * - Animations douces et naturelles
 */

export default function Home() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Données d'exemple pour les documents
  const documents = [
    {
      id: 1,
      title: "L'Indépendance d'Haïti: Une Perspective Historique",
      author: "Dr. Jean-Claude Beauvoir",
      category: "Histoire",
      type: "Mémoire",
      date: "2023",
      description: "Une étude approfondie sur les événements qui ont mené à l'indépendance haïtienne en 1804.",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663441725136/AK8d9c4wnXxLYV3xzmH4Xc/icon-documents-knGR5HKUJscVTKHQBz2ozK.webp"
    },
    {
      id: 2,
      title: "Biodiversité Marine des Caraïbes",
      author: "Dr. Marie Dubois",
      category: "Sciences",
      type: "Recherche",
      date: "2024",
      description: "Une analyse complète de la faune marine unique des eaux haïtiennes.",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663441725136/AK8d9c4wnXxLYV3xzmH4Xc/icon-research-YnXT2kQJbmHdZUHoiAsd4M.webp"
    },
    {
      id: 3,
      title: "Littérature Haïtienne Contemporaine",
      author: "Prof. Frantz Voltaire",
      category: "Littérature",
      type: "Mémoire",
      date: "2023",
      description: "Une exploration des œuvres littéraires haïtiennes du XXIe siècle.",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663441725136/AK8d9c4wnXxLYV3xzmH4Xc/icon-archives-ZTZTdVGiAcbvX4NxrxMgcs.webp"
    },
    {
      id: 4,
      title: "Économie et Développement Durable en Haïti",
      author: "Dr. Pierre Toussaint",
      category: "Économie",
      type: "Recherche",
      date: "2024",
      description: "Stratégies pour un développement économique durable en Haïti.",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663441725136/AK8d9c4wnXxLYV3xzmH4Xc/icon-documents-knGR5HKUJscVTKHQBz2ozK.webp"
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
            <Link href="/research-portal" className="hover:text-accent transition">Portail Haïti</Link>
            <Link href="/biblio-recherche" className="hover:text-accent transition">Biblio-Recherche</Link>
            <Link href="/statistics" className="hover:text-accent transition">Statistiques</Link>
            <Link href="/events" className="hover:text-accent transition">Événements</Link>
            <Link href="/echopods" className="hover:text-accent transition">EchoPods</Link>
            <Button variant="ghost" size="sm">Contact</Button>
            <Button size="sm" className="bg-accent hover:bg-accent/90">Se Connecter</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663441725136/AK8d9c4wnXxLYV3xzmH4Xc/hero-banner-7AWsoL8axmfT9ZhAa3yWDR.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />
        <div className="relative container mx-auto px-4 py-20 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-primary mb-6 leading-tight">
            Echo Academy Haiti
          </h2>
            <p className="text-xl subtitle text-muted-foreground mb-8 max-w-2xl mx-auto">
              La plateforme de référence pour explorer les mémoires et recherches scientifiques haïtiens en libre accès
            </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-accent hover:bg-accent/90">
              Commencer l'Exploration
            </Button>
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
              En Savoir Plus
            </Button>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="bg-white border-b border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Rechercher des documents, auteurs..."
                className="pl-12 py-6 text-lg border-border focus:ring-accent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-16">
        {/* Catégories Principales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="border-border hover:shadow-lg transition-shadow duration-300 cursor-pointer transform hover:-translate-y-1">
            <CardHeader className="pb-4">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Documents</CardTitle>
              <CardDescription>Mémoires et thèses</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Explorez une vaste collection de mémoires et de travaux académiques sur Haïti.
              </p>
              <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
                Parcourir
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border hover:shadow-lg transition-shadow duration-300 cursor-pointer transform hover:-translate-y-1">
            <CardHeader className="pb-4">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center mb-4">
                <Archive className="w-8 h-8 text-secondary" />
              </div>
              <CardTitle className="text-2xl">Archives</CardTitle>
              <CardDescription>Collections historiques</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Accédez aux archives numériques et aux documents historiques importants.
              </p>
              <Button variant="outline" className="w-full border-secondary text-secondary hover:bg-secondary/10">
                Consulter
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border hover:shadow-lg transition-shadow duration-300 cursor-pointer transform hover:-translate-y-1">
            <CardHeader className="pb-4">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-accent/20 to-secondary/20 flex items-center justify-center mb-4">
                <Microscope className="w-8 h-8 text-accent" />
              </div>
              <CardTitle className="text-2xl">Recherches</CardTitle>
              <CardDescription>Études scientifiques</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Découvrez les dernières recherches scientifiques menées sur Haïti.
              </p>
              <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent/10">
                Explorer
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Documents Récents */}
        <div>
          <h3 className="text-3xl font-bold text-primary mb-2">Documents Récents</h3>
          <p className="subtitle text-muted-foreground mb-8">Les derniers ajouts à notre bibliothèque</p>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3 bg-muted">
              <TabsTrigger value="all">Tous</TabsTrigger>
              <TabsTrigger value="memoirs">Mémoires</TabsTrigger>
              <TabsTrigger value="research">Recherches</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {filteredDocuments.map((doc) => (
                  <Card
                    key={doc.id}
                    className="border-border overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                  >
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
                      <img
                        src={doc.image}
                        alt={doc.title}
                        className="w-full h-full object-cover opacity-80"
                      />
                      <div className="absolute top-4 right-4">
                        <span className="label bg-accent text-white px-3 py-1 rounded-full">
                          {doc.type}
                        </span>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg line-clamp-2">{doc.title}</CardTitle>
                      <CardDescription className="text-sm">
                        Par {doc.author} • {doc.date}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {doc.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="label bg-secondary/20 text-primary px-3 py-1 rounded-full">
                          {doc.category}
                        </span>
                        <Button size="sm" className="bg-accent hover:bg-accent/90">
                          Lire
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="memoirs" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredDocuments.filter(d => d.type === "Mémoire").map((doc) => (
                  <Card key={doc.id} className="border-border hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="text-lg">{doc.title}</CardTitle>
                      <CardDescription>Par {doc.author}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full bg-accent hover:bg-accent/90">Consulter</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="research" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredDocuments.filter(d => d.type === "Recherche").map((doc) => (
                  <Card key={doc.id} className="border-border hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="text-lg">{doc.title}</CardTitle>
                      <CardDescription>Par {doc.author}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full bg-accent hover:bg-accent/90">Consulter</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-primary to-accent py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <p className="subtitle">Documents</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">150+</div>
              <p className="subtitle">Auteurs</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">25+</div>
              <p className="subtitle">Catégories</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <p className="subtitle">Libre Accès</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-primary mb-4">À Propos</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition">Notre Mission</a></li>
                <li><a href="#" className="hover:text-primary transition">L'Équipe</a></li>
                <li><a href="#" className="hover:text-primary transition">Partenaires</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-primary mb-4">Ressources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition">Guide d'Utilisation</a></li>
                <li><a href="#" className="hover:text-primary transition">FAQ</a></li>
                <li><a href="#" className="hover:text-primary transition">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-primary mb-4">Légal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition">Conditions</a></li>
                <li><a href="#" className="hover:text-primary transition">Confidentialité</a></li>
                <li><a href="#" className="hover:text-primary transition">Cookies</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-primary mb-4">Nous Suivre</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition">Facebook</a></li>
                <li><a href="#" className="hover:text-primary transition">Twitter</a></li>
                <li><a href="#" className="hover:text-primary transition">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Echo Academy Haiti (EAH). Tous droits réservés.</p>
          </div>
        </div>
      </footer>

      {/* Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border md:hidden">
        <div className="flex justify-around items-center py-3">
          <button className="flex flex-col items-center gap-1 text-primary">
            <HomeIcon className="w-5 h-5" />
            <span className="label">Accueil</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary">
            <Grid3x3 className="w-5 h-5" />
            <span className="label">Catégories</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary">
            <Bookmark className="w-5 h-5" />
            <span className="label">Favoris</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary">
            <User className="w-5 h-5" />
            <span className="label">Profil</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
