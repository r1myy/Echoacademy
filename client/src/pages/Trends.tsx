import { useState } from "react";
import { Link } from "wouter";
import { 
  BookOpen, Menu, X, TrendingUp, Download, Eye, 
  ExternalLink, Calendar, Building2, User, Tag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDocumentStats } from "@/hooks/useDocumentStats";

/**
 * Design Philosophy: Université Contemporaine
 * - Palette: Bleu nuit (#1a2f4a), Vert sauge (#7fb069), Blanc cassé (#f5f3f0)
 * - Typography: Playfair Display (titres), Inter (corps)
 * - Pages de tendances et statistiques académiques
 */

// Mock data for theses - same as in ThesisDetailPage
const thesesData: Record<string, any> = {
  "1": {
    id: "1",
    title: "L'Indépendance d'Haïti: Une Perspective Historique",
    author: "Dr. Jean-Claude Beauvoir",
    year: 2023,
    institution: "Université d'État d'Haïti",
    discipline: "Histoire",
    type: "Mémoire",
  },
  "2": {
    id: "2",
    title: "Biodiversité Marine des Caraïbes",
    author: "Dr. Marie Dubois",
    year: 2024,
    institution: "Université Quisqueya",
    discipline: "Sciences",
    type: "Recherche",
  },
  "3": {
    id: "3",
    title: "Littérature Haïtienne Contemporaine",
    author: "Prof. Frantz Voltaire",
    year: 2023,
    institution: "Université d'État d'Haïti",
    discipline: "Littérature",
    type: "Mémoire",
  },
  "4": {
    id: "4",
    title: "Économie et Développement Durable en Haïti",
    author: "Dr. Pierre Toussaint",
    year: 2024,
    institution: "Université Quisqueya",
    discipline: "Économie",
    type: "Recherche",
  },
  "5": {
    id: "5",
    title: "Santé Publique et Accès aux Soins en Haïti",
    author: "Dr. Simone Beaumont",
    year: 2023,
    institution: "GHESKIO",
    discipline: "Santé",
    type: "Thèse",
  },
  "6": {
    id: "6",
    title: "Agriculture Durable et Sécurité Alimentaire",
    author: "Prof. Antoine Toussaint",
    year: 2024,
    institution: "Université d'État d'Haïti",
    discipline: "Agriculture",
    type: "Recherche",
  },
  "7": {
    id: "7",
    title: "Géographie Politique de la Caraïbe",
    author: "Dr. Claude Moreau",
    year: 2023,
    institution: "Université Quisqueya",
    discipline: "Géographie",
    type: "Mémoire",
  },
  "8": {
    id: "8",
    title: "Éducation et Développement Humain",
    author: "Prof. Marie-Louise Janvier",
    year: 2024,
    institution: "Université d'État d'Haïti",
    discipline: "Éducation",
    type: "Recherche",
  },
};

interface TrendItem {
  id: string;
  title: string;
  author: string;
  year: number;
  institution: string;
  discipline: string;
  type: string;
  views: number;
  downloads: number;
  popularity?: number;
}

export default function Trends() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getMostViewed, getMostDownloaded, getMostPopular } = useDocumentStats();

  const mostViewedDocs = getMostViewed(10);
  const mostDownloadedDocs = getMostDownloaded(10);
  const mostPopularDocs = getMostPopular(10);

  // Enrichir les données avec les informations des thèses
  const enrichTrendData = (trendItems: any[]): TrendItem[] => {
    return trendItems.map((item) => {
      const thesis = thesesData[item.id];
      return {
        id: item.id,
        title: thesis?.title || "Document inconnu",
        author: thesis?.author || "Auteur inconnu",
        year: thesis?.year || 0,
        institution: thesis?.institution || "Institution inconnue",
        discipline: thesis?.discipline || "Discipline inconnue",
        type: thesis?.type || "Type inconnu",
        views: item.views || 0,
        downloads: item.downloads || 0,
        popularity: item.popularity || 0,
      };
    });
  };

  const TrendCard = ({ item, rank, metric }: { item: TrendItem; rank: number; metric: "views" | "downloads" | "popularity" }) => {
    const value = metric === "views" ? item.views : metric === "downloads" ? item.downloads : item.popularity || 0;
    const icon = metric === "views" ? Eye : Download;
    const Icon = icon;

    return (
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <span className="text-lg font-bold text-primary">#{rank}</span>
            </div>
            <div className="flex-1 min-w-0">
              <Link href={`/thesis-detail/${item.id}`}>
                <h3 className="font-semibold text-primary hover:text-accent transition line-clamp-2 cursor-pointer">
                  {item.title}
                </h3>
              </Link>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1 flex-wrap">
                <span className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {item.author}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Building2 className="w-3 h-3" />
                  {item.institution}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
                  {item.discipline}
                </span>
                <span className="px-2 py-1 bg-accent/10 text-accent rounded text-xs font-medium">
                  {item.type}
                </span>
              </div>
            </div>
            <div className="flex-shrink-0 text-right">
              <div className="flex items-center gap-1 text-accent font-bold text-lg">
                <Icon className="w-5 h-5" />
                {value}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {metric === "views" ? "Consultations" : metric === "downloads" ? "Téléchargements" : "Popularité"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition">
            <img src="/logo.jpeg" alt="Echo Academy Haiti" className="h-10 w-auto" />
            <div className="hidden sm:block">
              <h1 className="text-xl sm:text-2xl font-bold text-primary">Echo Academy Haiti</h1>
              <p className="text-xs text-muted-foreground">Plateforme de Recherche Haïtienne</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/research-portal" className="text-sm hover:text-accent transition font-medium">
              Portail Haïti
            </Link>
            <Link href="/trends" className="text-sm hover:text-accent transition font-medium text-accent font-bold">
              Tendances
            </Link>
            <Link href="/resources" className="text-sm hover:text-accent transition font-medium">
              Ressources
            </Link>
            <Button size="sm" className="bg-accent hover:bg-accent/90">
              Contact
            </Button>
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
              <Link href="/research-portal" className="block text-sm hover:text-accent transition font-medium py-2">
                Portail Haïti
              </Link>
              <Link href="/trends" className="block text-sm hover:text-accent transition font-medium py-2 text-accent font-bold">
                Tendances
              </Link>
              <Link href="/resources" className="block text-sm hover:text-accent transition font-medium py-2">
                Ressources
              </Link>
              <Button size="sm" className="bg-accent hover:bg-accent/90 w-full">
                Contact
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-8 h-8 text-accent" />
            <h1 className="text-4xl md:text-5xl font-bold text-primary">Tendances de Recherche</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Découvrez les documents les plus consultés et téléchargés de notre plateforme. Ces tendances reflètent les intérêts de recherche actuels de la communauté académique haïtienne.
          </p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Consultations</p>
                  <p className="text-3xl font-bold text-primary">
                    {mostViewedDocs.reduce((sum, item) => sum + item.views, 0)}
                  </p>
                </div>
                <Eye className="w-8 h-8 text-accent/50" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Téléchargements</p>
                  <p className="text-3xl font-bold text-primary">
                    {mostDownloadedDocs.reduce((sum, item) => sum + item.downloads, 0)}
                  </p>
                </div>
                <Download className="w-8 h-8 text-accent/50" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Documents Actifs</p>
                  <p className="text-3xl font-bold text-primary">
                    {new Set([...mostViewedDocs, ...mostDownloadedDocs].map((d) => d.id)).size}
                  </p>
                </div>
                <BookOpen className="w-8 h-8 text-accent/50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trends Tabs */}
        <Tabs defaultValue="popular" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="popular" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Les Plus Populaires</span>
              <span className="sm:hidden">Populaires</span>
            </TabsTrigger>
            <TabsTrigger value="viewed" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">Les Plus Consultés</span>
              <span className="sm:hidden">Consultés</span>
            </TabsTrigger>
            <TabsTrigger value="downloaded" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Les Plus Téléchargés</span>
              <span className="sm:hidden">Téléchargés</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="popular" className="space-y-4">
            {enrichTrendData(mostPopularDocs).length > 0 ? (
              enrichTrendData(mostPopularDocs).map((item, idx) => (
                <TrendCard key={item.id} item={item} rank={idx + 1} metric="popularity" />
              ))
            ) : (
              <Card>
                <CardContent className="pt-6 text-center py-12">
                  <BookOpen className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-muted-foreground">Aucune donnée de tendance disponible pour le moment.</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Commencez à consulter et télécharger des documents pour voir les tendances.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="viewed" className="space-y-4">
            {enrichTrendData(mostViewedDocs).length > 0 ? (
              enrichTrendData(mostViewedDocs).map((item, idx) => (
                <TrendCard key={item.id} item={item} rank={idx + 1} metric="views" />
              ))
            ) : (
              <Card>
                <CardContent className="pt-6 text-center py-12">
                  <Eye className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-muted-foreground">Aucune consultation enregistrée pour le moment.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="downloaded" className="space-y-4">
            {enrichTrendData(mostDownloadedDocs).length > 0 ? (
              enrichTrendData(mostDownloadedDocs).map((item, idx) => (
                <TrendCard key={item.id} item={item} rank={idx + 1} metric="downloads" />
              ))
            ) : (
              <Card>
                <CardContent className="pt-6 text-center py-12">
                  <Download className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-muted-foreground">Aucun téléchargement enregistré pour le moment.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <div className="mt-16 bg-primary/5 border border-primary/20 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">Explorez Notre Collection Complète</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Découvrez plus de 60 thèses et mémoires haïtiens en accès libre. Utilisez notre portail de recherche avancée pour trouver les ressources qui correspondent à vos besoins.
          </p>
          <Link href="/research-portal">
            <Button size="lg" className="bg-accent hover:bg-accent/90">
              Accéder au Portail Haïti
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-primary text-white py-12 border-t border-border mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <Link href="/" className="flex items-center gap-2 mb-4 hover:opacity-80 transition">
                <img src="/logo.jpeg" alt="Echo Academy Haiti" className="h-10 w-auto" />
              </Link>
              <p className="text-sm text-white/80">
                La plateforme de référence pour la recherche haïtienne. Accès libre à 60+ thèses et mémoires académiques.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Plateforme</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li>
                  <Link href="/research-portal" className="hover:text-white transition">
                    Portail Haïti
                  </Link>
                </li>
                <li>
                  <Link href="/trends" className="hover:text-white transition">
                    Tendances
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className="hover:text-white transition">
                    Ressources
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">À Propos</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li>
                  <Link href="/about" className="hover:text-white transition">
                    À Propos
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition">
                    Politique de Confidentialité
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition">
                    Conditions d'Utilisation
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <p className="text-sm text-white/80">
                Email: info@echoacademy.ht
              </p>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-sm text-white/80">
            <p>&copy; 2024 Echo Academy Haiti. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
