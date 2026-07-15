import { useState } from "react";
import { useParams } from "wouter";
import { Link } from "wouter";
import { useEffect } from "react";
import { 
  Share2, Download, BookOpen, Calendar, Building2, User, Tag, 
  Heart, MessageCircle, ExternalLink, Menu, X, Copy, Check,
  Mail, Facebook, Linkedin, Twitter, TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDocumentStats } from "@/hooks/useDocumentStats";
import ShareButtons from "@/components/ShareButtons";
import { getOrGeneratePreviewImage } from "@/lib/generatePreviewImage";

/**
 * Design Philosophy: Université Contemporaine
 * - Palette: Bleu nuit (#1a2f4a), Vert sauge (#7fb069), Blanc cassé (#f5f3f0)
 * - Typography: Playfair Display (titres), Inter (corps)
 * - Pages de détail académiques complètes
 */

// Fonction pour mettre à jour les métadonnées Open Graph
function updateMetaTags(thesis: any, previewImageUrl: string) {
  // Mettre à jour le titre
  document.title = `${thesis.title} - Echo Academy`;
  
  // Mettre à jour ou créer les métadonnées Open Graph
  const updateMetaTag = (property: string, content: string) => {
    let meta = document.querySelector(`meta[property="${property}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('property', property);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  };
  
  const updateMetaName = (name: string, content: string) => {
    let meta = document.querySelector(`meta[name="${name}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', name);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  };
  
  updateMetaTag('og:title', thesis.title);
  updateMetaTag('og:description', thesis.abstract.substring(0, 160) + '...');
  updateMetaTag('og:image', previewImageUrl);
  updateMetaTag('og:type', 'article');
  updateMetaTag('og:url', window.location.href);
  
  updateMetaName('twitter:title', thesis.title);
  updateMetaName('twitter:description', thesis.abstract.substring(0, 160) + '...');
  updateMetaName('twitter:image', previewImageUrl);
  updateMetaName('twitter:card', 'summary_large_image');
  
  updateMetaName('description', thesis.abstract.substring(0, 160) + '...');
}

// Mock data for theses - in a real app, this would come from an API
const thesesData: Record<string, any> = {
  "1": {
    id: "1",
    title: "L'Indépendance d'Haïti: Une Perspective Historique",
    author: "Dr. Jean-Claude Beauvoir",
    year: 2023,
    institution: "Université d'État d'Haïti",
    discipline: "Histoire",
    type: "Mémoire",
    url: "https://uniq.edu.ht/these-alexandra-d-vanessa-pierre/",
    abstract: "Cette thèse examine les événements historiques qui ont conduit à l'indépendance d'Haïti en 1804. À travers une analyse approfondie des sources primaires et secondaires, l'étude explore les contextes politiques, économiques et sociaux qui ont façonné la révolution haïtienne. L'auteur souligne le rôle crucial des figures historiques clés et des mouvements populaires dans la lutte pour la liberté et l'autodétermination.",
    keywords: ["Haïti", "Indépendance", "Révolution", "Histoire", "1804", "Liberté", "Colonialisme"],
    pages: 245,
    language: "Français",
    advisor: "Prof. Marie Dubois",
    committee: ["Prof. Jean-Pierre Alexis", "Dr. Frantz Voltaire"],
    citations: 12,
    downloads: 234,
    likes: 45,
    relatedTheses: ["2", "3"],
    doi: "10.1234/haiti.2023.001",
    issn: "2789-0123",
    abstract_en: "This thesis examines the historical events that led to Haiti's independence in 1804. Through an in-depth analysis of primary and secondary sources, the study explores the political, economic, and social contexts that shaped the Haitian Revolution. The author emphasizes the crucial role of key historical figures and popular movements in the struggle for freedom and self-determination."
  },
  "2": {
    id: "2",
    title: "Biodiversité Marine des Caraïbes",
    author: "Dr. Marie Dubois",
    year: 2024,
    institution: "Université Quisqueya",
    discipline: "Sciences",
    type: "Recherche",
    url: "https://scholar.google.com/scholar?q=marine+biodiversity+caribbean",
    abstract: "Une analyse complète de la faune marine unique des eaux haïtiennes et caribéennes. Cette recherche documente les espèces endémiques, les écosystèmes marins critiques et les menaces à la biodiversité. L'étude propose des stratégies de conservation innovantes pour protéger les ressources marines haïtiennes.",
    keywords: ["Biodiversité", "Marine", "Caraïbes", "Écosystème", "Conservation", "Espèces endémiques"],
    pages: 312,
    language: "Français",
    advisor: "Prof. Pierre Toussaint",
    committee: ["Dr. Jean-Claude Beauvoir", "Prof. Frantz Voltaire"],
    citations: 28,
    downloads: 156,
    likes: 67,
    relatedTheses: ["1", "4"],
    doi: "10.1234/haiti.2024.002",
    issn: "2789-0124"
  },
  "3": {
    id: "3",
    title: "Littérature Haïtienne Contemporaine",
    author: "Prof. Frantz Voltaire",
    year: 2023,
    institution: "Université d'État d'Haïti",
    discipline: "Littérature",
    type: "Mémoire",
    url: "https://base-search.net",
    abstract: "Une exploration des œuvres littéraires haïtiennes du XXIe siècle. Cette étude analyse les thèmes récurrents, les styles narratifs et l'évolution de la littérature haïtienne contemporaine. L'auteur examine comment les écrivains haïtiens contemporains abordent les questions d'identité, de politique et de culture.",
    keywords: ["Littérature", "Haïti", "Contemporain", "Narratif", "Identité", "Culture"],
    pages: 198,
    language: "Français",
    advisor: "Prof. Marie Dubois",
    committee: ["Dr. Jean-Claude Beauvoir"],
    citations: 15,
    downloads: 89,
    likes: 34,
    relatedTheses: ["1"],
    doi: "10.1234/haiti.2023.003",
    issn: "2789-0125"
  },
  "4": {
    id: "4",
    title: "Économie et Développement Durable en Haïti",
    author: "Dr. Pierre Toussaint",
    year: 2024,
    institution: "Université Quisqueya",
    discipline: "Économie",
    type: "Recherche",
    url: "https://arxiv.org",
    abstract: "Stratégies pour un développement économique durable en Haïti. Cette recherche examine les défis économiques actuels, les opportunités de croissance et les politiques nécessaires pour assurer un développement durable. L'étude propose un cadre intégré combinant développement économique et durabilité environnementale.",
    keywords: ["Économie", "Développement durable", "Haïti", "Politique", "Croissance", "Environnement"],
    pages: 267,
    language: "Français",
    advisor: "Prof. Jean-Claude Beauvoir",
    committee: ["Dr. Marie Dubois", "Prof. Frantz Voltaire"],
    citations: 22,
    downloads: 201,
    likes: 56,
    relatedTheses: ["2", "3"],
    doi: "10.1234/haiti.2024.004",
    issn: "2789-0126"
  }
};

export default function ThesisDetailPage() {
  const { id } = useParams();
  const thesis = thesesData[id || ""];
  const [isFavorite, setIsFavorite] = useState(false);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { recordView, recordDownload, getDocumentStats } = useDocumentStats();
  const stats = getDocumentStats(id || "");
  
  // Générer l'image de prévisualisation
  const previewImageUrl = thesis ? getOrGeneratePreviewImage(thesis.id, {
    title: thesis.title,
    author: thesis.author,
    discipline: thesis.discipline,
    year: thesis.year,
    institution: thesis.institution,
    type: thesis.type,
  }) : '';

  // Enregistrer la consultation au chargement de la page
  useEffect(() => {
    if (id && thesis && previewImageUrl) {
      recordView(id);
      // Mettre à jour les métadonnées Open Graph avec l'image générée
      updateMetaTags(thesis, previewImageUrl);
    }
  }, [id, recordView, thesis, previewImageUrl]);

  if (!thesis) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-primary">Echo Academy Haiti</h1>
            </Link>
          </div>
        </header>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold text-primary mb-4">Thèse non trouvée</h1>
          <p className="text-muted-foreground mb-6">La thèse que vous recherchez n'existe pas.</p>
          <Link href="/research-portal">
            <Button className="bg-accent hover:bg-accent/90">Retour au Portail Haïti</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleShare = (platform: string) => {
    const text = `Découvrez cette thèse: ${thesis.title}`;
    const url = window.location.href;
    
    const shareUrls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      email: `mailto:?subject=${encodeURIComponent(thesis.title)}&body=${encodeURIComponent(text + "\n" + url)}`
    };
    
    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank');
    }
  };

  const handleDownload = () => {
    if (id) {
      recordDownload(id);
    }
    window.open(thesis.url, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition">
            <div className="w-10 h-10 rounded-md bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl sm:text-2xl font-bold text-primary">Echo Academy Haiti</h1>
              <p className="text-xs text-muted-foreground">Plateforme de Recherche Haïtienne</p>
            </div>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/research-portal" className="text-sm hover:text-accent transition font-medium">Portail Haïti</Link>
            <Link href="/resources" className="text-sm hover:text-accent transition font-medium">Ressources</Link>
            <Button size="sm" className="bg-accent hover:bg-accent/90">Contact</Button>
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
              <Link href="/research-portal" className="block text-sm hover:text-accent transition font-medium py-2">Portail Haïti</Link>
              <Link href="/resources" className="block text-sm hover:text-accent transition font-medium py-2">Ressources</Link>
              <Button size="sm" className="bg-accent hover:bg-accent/90 w-full">Contact</Button>
            </div>
          </div>
        )}
      </header>

      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Link href="/research-portal">
          <Button variant="outline" size="sm">← Retour au Portail</Button>
        </Link>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title Section */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-3">
                    {thesis.type}
                  </span>
                  <h1 className="text-4xl font-bold text-primary mb-4 leading-tight">
                    {thesis.title}
                  </h1>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={isFavorite ? "bg-red-50 border-red-200" : ""}
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>
                  <div className="relative">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setShareMenuOpen(!shareMenuOpen)}
                    >
                      <Share2 className="w-5 h-5" />
                    </Button>
                    {shareMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border border-border rounded-lg shadow-lg z-10">
                        <button
                          onClick={() => { handleShare("twitter"); setShareMenuOpen(false); }}
                          className="w-full text-left px-4 py-2 hover:bg-muted transition flex items-center gap-2"
                        >
                          <Twitter className="w-4 h-4" /> Twitter
                        </button>
                        <button
                          onClick={() => { handleShare("facebook"); setShareMenuOpen(false); }}
                          className="w-full text-left px-4 py-2 hover:bg-muted transition flex items-center gap-2"
                        >
                          <Facebook className="w-4 h-4" /> Facebook
                        </button>
                        <button
                          onClick={() => { handleShare("linkedin"); setShareMenuOpen(false); }}
                          className="w-full text-left px-4 py-2 hover:bg-muted transition flex items-center gap-2"
                        >
                          <Linkedin className="w-4 h-4" /> LinkedIn
                        </button>
                        <button
                          onClick={() => { handleShare("email"); setShareMenuOpen(false); }}
                          className="w-full text-left px-4 py-2 hover:bg-muted transition flex items-center gap-2"
                        >
                          <Mail className="w-4 h-4" /> Email
                        </button>
                        <button
                          onClick={handleCopyLink}
                          className="w-full text-left px-4 py-2 hover:bg-muted transition flex items-center gap-2 border-t border-border"
                        >
                          {copiedLink ? (
                            <>
                              <Check className="w-4 h-4 text-green-500" /> Copié!
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" /> Copier le lien
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-accent" />
                  <div>
                    <p className="text-xs text-muted-foreground">Auteur</p>
                    <p className="font-medium">{thesis.author}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-accent" />
                  <div>
                    <p className="text-xs text-muted-foreground">Année</p>
                    <p className="font-medium">{thesis.year}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Building2 className="w-4 h-4 text-accent" />
                  <div>
                    <p className="text-xs text-muted-foreground">Institution</p>
                    <p className="font-medium text-sm">{thesis.institution}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Tag className="w-4 h-4 text-accent" />
                  <div>
                    <p className="text-xs text-muted-foreground">Discipline</p>
                    <p className="font-medium">{thesis.discipline}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="abstract" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="abstract">Résumé</TabsTrigger>
                <TabsTrigger value="details">Détails</TabsTrigger>
                <TabsTrigger value="related">Similaires</TabsTrigger>
              </TabsList>

              <TabsContent value="abstract" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Résumé</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">{thesis.abstract}</p>
                    {thesis.abstract_en && (
                      <div className="pt-4 border-t border-border">
                        <p className="text-xs font-semibold text-muted-foreground mb-2">ENGLISH ABSTRACT</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{thesis.abstract_en}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="details" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Informations Académiques</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground mb-1">Directeur de thèse</p>
                        <p className="font-medium">{thesis.advisor}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground mb-1">Pages</p>
                        <p className="font-medium">{thesis.pages}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground mb-1">Langue</p>
                        <p className="font-medium">{thesis.language}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground mb-1">DOI</p>
                        <p className="font-mono text-sm">{thesis.doi}</p>
                      </div>
                    </div>
                    {thesis.committee && thesis.committee.length > 0 && (
                      <div className="pt-4 border-t border-border">
                        <p className="text-xs font-semibold text-muted-foreground mb-2">Comité d'examen</p>
                        <ul className="space-y-1">
                          {thesis.committee.map((member: string, idx: number) => (
                            <li key={idx} className="text-sm">{member}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="related" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Thèses Similaires</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Thèses connexes basées sur les mots-clés et la discipline.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Keywords */}
            <Card>
              <CardHeader>
                <CardTitle>Mots-clés</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {thesis.keywords.map((keyword: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full hover:bg-primary/20 transition cursor-pointer"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Comments Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Commentaires
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Section de commentaires - Bientôt disponible</p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Access Button */}
            <Button
              onClick={handleDownload}
              size="lg"
              className="w-full bg-accent hover:bg-accent/90 gap-2 h-12"
            >
              <Download className="w-5 h-5" />
              Accéder au document
            </Button>

            {/* Stats */}
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <div className="text-center flex-1">
                    <p className="text-2xl font-bold text-primary">{stats.views}</p>
                    <p className="text-xs text-muted-foreground">Consultations</p>
                  </div>
                  <div className="text-center flex-1">
                    <p className="text-2xl font-bold text-accent">{stats.downloads}</p>
                    <p className="text-xs text-muted-foreground">Téléchargements</p>
                  </div>
                  <div className="text-center flex-1">
                    <p className="text-2xl font-bold text-primary">{thesis.citations}</p>
                    <p className="text-xs text-muted-foreground">Citations</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Share Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Partager ce document</CardTitle>
              </CardHeader>
              <CardContent>
                <ShareButtons
                  title={thesis.title}
                  url={window.location.href}
                  description={thesis.abstract.substring(0, 150) + "..."}
                  author={thesis.author}
                  previewImage={previewImageUrl}
                  variant="compact"
                />
              </CardContent>
            </Card>

            {/* Citation Formats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Citer cette thèse</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground">APA</p>
                  <p className="text-xs bg-muted p-2 rounded font-mono">
                    {thesis.author} ({thesis.year}). {thesis.title}. {thesis.institution}.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground">MLA</p>
                  <p className="text-xs bg-muted p-2 rounded font-mono">
                    {thesis.author}. "{thesis.title}." {thesis.institution}, {thesis.year}.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground">Chicago</p>
                  <p className="text-xs bg-muted p-2 rounded font-mono">
                    {thesis.author}. "{thesis.title}." {thesis.institution}, {thesis.year}.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-primary text-white py-12 border-t border-border mt-16">
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
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Ressources</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li><Link href="/resources" className="hover:text-white transition">Ressources</Link></li>
                <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
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
