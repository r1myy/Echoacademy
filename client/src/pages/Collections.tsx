import { useState } from "react";
import { Link } from "wouter";
import { BookOpen, Filter, Grid, List, ChevronRight, Search, X, Tag, Users, Zap, Globe, Leaf, Heart, BookMarked, Download, FileText, File } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { exportToCSV, exportToPDF, exportToBibTeX } from "@/lib/exportUtils";

/**
 * Design Philosophy: Université Contemporaine
 * - Palette: Bleu nuit (#1a2f4a), Vert sauge (#7fb069), Blanc cassé (#f5f3f0)
 * - Typography: Playfair Display (titres), Inter (corps)
 * - Thèmes organisés par domaines de recherche spécifiques
 */

// Define research themes/collections
const researchCollections = [
  {
    id: "health",
    title: "Santé & Bien-être",
    description: "Recherches sur la santé publique, épidémiologie et bien-être en Haïti",
    icon: Heart,
    color: "from-red-500/20 to-pink-500/20",
    borderColor: "border-red-200",
    topics: ["Santé publique", "Mortalité maternelle", "Épidémiologie", "Nutrition", "Santé mentale"],
    resources: [
      { title: "Analyse des politiques de santé publique en Haïti", author: "Dr. Marie-Josée Dufour", year: 2023, institution: "Université Quisqueya" },
      { title: "Épidémiologie des maladies infectieuses en Haïti", author: "Dr. Jean-Claude Toussaint", year: 2022, institution: "Université d'État d'Haïti" }
    ]
  },
  {
    id: "environment",
    title: "Environnement & Écologie",
    description: "Études sur la biodiversité, conservation et restauration écologique",
    icon: Leaf,
    color: "from-green-500/20 to-emerald-500/20",
    borderColor: "border-green-200",
    topics: ["Biodiversité", "Conservation", "Restauration écologique", "Changement climatique", "Ressources naturelles"],
    resources: [
      { title: "Biodiversité endémique de la Chaîne de la Selle", author: "Pierre Dufour", year: 2022, institution: "Université d'État d'Haïti" },
      { title: "Gestion des ressources forestières en Haïti", author: "Dr. Sylvain Marcelin", year: 2023, institution: "Université Quisqueya" }
    ]
  },
  {
    id: "economy",
    title: "Économie & Développement",
    description: "Analyses économiques et stratégies de développement durable",
    icon: Zap,
    color: "from-yellow-500/20 to-orange-500/20",
    borderColor: "border-yellow-200",
    topics: ["Développement durable", "Économie informelle", "Commerce", "Tourisme", "Politique économique"],
    resources: [
      { title: "Économie haïtienne et stratégies de développement durable", author: "Frantz Voltaire", year: 2023, institution: "Université Quisqueya" },
      { title: "Secteur informel et dynamiques économiques urbaines", author: "Dr. Michèle Duvivier", year: 2022, institution: "Université Quisqueya" }
    ]
  },
  {
    id: "culture",
    title: "Culture & Littérature",
    description: "Études sur la littérature, arts et patrimoine culturel haïtien",
    icon: BookMarked,
    color: "from-purple-500/20 to-indigo-500/20",
    borderColor: "border-purple-200",
    topics: ["Littérature haïtienne", "Arts et culture", "Patrimoine", "Identité culturelle", "Traditions"],
    resources: [
      { title: "Littérature haïtienne contemporaine : Voix et identités culturelles", author: "Dr. Edwidge Danticat", year: 2023, institution: "Université Quisqueya" },
      { title: "Patrimoine culturel et mémoire collective en Haïti", author: "Dr. Laënnec Hurbon", year: 2022, institution: "Université d'État d'Haïti" }
    ]
  },
  {
    id: "education",
    title: "Éducation & Pédagogie",
    description: "Recherches sur les systèmes éducatifs et méthodes pédagogiques",
    icon: BookOpen,
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-200",
    topics: ["Systèmes éducatifs", "Pédagogie", "Alphabétisation", "Enseignement supérieur", "Formation professionnelle"],
    resources: [
      { title: "Réforme du système éducatif haïtien : Enjeux et perspectives", author: "Dr. Antenor Firmin", year: 2023, institution: "Université d'État d'Haïti" },
      { title: "Alphabétisation et développement communautaire", author: "Dr. Jacqueline Charles", year: 2022, institution: "Université Quisqueya" }
    ]
  },
  {
    id: "social",
    title: "Sciences Humaines & Sociales",
    description: "Études sociologiques, anthropologiques et historiques",
    icon: Users,
    color: "from-teal-500/20 to-cyan-500/20",
    borderColor: "border-teal-200",
    topics: ["Sociologie urbaine", "Anthropologie", "Histoire", "Dynamiques sociales", "Mouvements sociaux"],
    resources: [
      { title: "Sociologie urbaine et dynamiques sociales en Haïti", author: "Dr. Carole Estimé", year: 2023, institution: "Université Quisqueya" },
      { title: "Anthropologie culturelle et pratiques traditionnelles", author: "Dr. Alfred Métraux", year: 2022, institution: "Université d'État d'Haïti" }
    ]
  },
  {
    id: "agriculture",
    title: "Agriculture & Alimentation",
    description: "Recherches en agronomie, sécurité alimentaire et durabilité",
    icon: Leaf,
    color: "from-lime-500/20 to-green-500/20",
    borderColor: "border-lime-200",
    topics: ["Agronomie", "Sécurité alimentaire", "Agriculture durable", "Agroécologie", "Systèmes alimentaires"],
    resources: [
      { title: "Systèmes agricoles durables et sécurité alimentaire en Haïti", author: "Dr. Gérard Barthélémy", year: 2023, institution: "Université d'État d'Haïti" },
      { title: "Agroécologie et conservation des semences créoles", author: "Dr. Lydia Insanally", year: 2022, institution: "Université Quisqueya" }
    ]
  },
  {
    id: "governance",
    title: "Gouvernance & Politique",
    description: "Études sur les systèmes politiques, gouvernance et institutions",
    icon: Globe,
    color: "from-slate-500/20 to-gray-500/20",
    borderColor: "border-slate-200",
    topics: ["Gouvernance", "Institutions politiques", "Démocratie", "Politiques publiques", "Décentralisation"],
    resources: [
      { title: "Gouvernance locale et participation citoyenne en Haïti", author: "Dr. Laënnec Hurbon", year: 2023, institution: "Université Quisqueya" },
      { title: "Institutions politiques et stabilité démocratique", author: "Dr. Suzy Castor", year: 2022, institution: "Université d'État d'Haïti" }
    ]
  }
];

export default function Collections() {
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filter collections based on search
  const filteredCollections = researchCollections.filter(collection =>
    collection.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    collection.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    collection.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const selectedCollectionData = researchCollections.find(c => c.id === selectedCollection);

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
              <p className="text-xs subtitle text-muted-foreground">Collections Thématiques</p>
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
            Collections Thématiques
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Explorez les ressources de recherche organisées par domaines spécifiques pour découvrir facilement les études qui vous intéressent
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-8 bg-white border-b border-border">
        <div className="container mx-auto px-4">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Rechercher une collection ou un domaine..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-3"
            />
          </div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          {!selectedCollection ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCollections.map((collection) => {
                  const IconComponent = collection.icon;
                  return (
                    <Card
                      key={collection.id}
                      className={`hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 ${collection.borderColor}`}
                      onClick={() => setSelectedCollection(collection.id)}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between mb-3">
                          <div className={`p-3 rounded-lg bg-gradient-to-br ${collection.color}`}>
                            <IconComponent className="w-6 h-6 text-primary" />
                          </div>
                          <ChevronRight className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <CardTitle className="text-xl">{collection.title}</CardTitle>
                        <CardDescription className="text-sm mt-2">{collection.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs font-semibold text-muted-foreground mb-2">Domaines clés</p>
                            <div className="flex flex-wrap gap-2">
                              {collection.topics.slice(0, 3).map((topic, idx) => (
                                <span key={idx} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                                  {topic}
                                </span>
                              ))}
                              {collection.topics.length > 3 && (
                                <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                                  +{collection.topics.length - 3}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {collection.resources.length} ressources disponibles
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              {filteredCollections.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground">Aucune collection ne correspond à votre recherche</p>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Collection Detail View */}
              <div className="mb-8">
                <Button
                  variant="outline"
                  onClick={() => setSelectedCollection(null)}
                  className="mb-6"
                >
                  ← Retour aux collections
                </Button>

                {selectedCollectionData && (
                  <div>
                    <div className="flex items-start gap-6 mb-8">
                      <div className={`p-4 rounded-lg bg-gradient-to-br ${selectedCollectionData.color}`}>
                        {(() => {
                          const IconComponent = selectedCollectionData.icon;
                          return <IconComponent className="w-8 h-8 text-primary" />;
                        })()}
                      </div>
                      <div className="flex-1">
                        <h2 className="text-4xl font-bold text-primary mb-2">{selectedCollectionData.title}</h2>
                        <p className="text-lg text-muted-foreground mb-4">{selectedCollectionData.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {selectedCollectionData.topics.map((topic, idx) => (
                            <span key={idx} className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                              {topic}
                            </span>
                          ))}
                        </div>
                        {/* Export Buttons */}
                        <div className="flex flex-wrap gap-3">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => exportToCSV(
                              selectedCollectionData.resources.map(r => ({
                                title: r.title,
                                author: r.author,
                                year: r.year,
                                institution: r.institution,
                                type: 'Thèse/Mémoire',
                                discipline: 'Recherche'
                              })),
                              selectedCollectionData.title
                            )}
                            className="gap-2"
                          >
                            <Download className="w-4 h-4" />
                            Exporter CSV
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => exportToPDF(
                              selectedCollectionData.resources.map(r => ({
                                title: r.title,
                                author: r.author,
                                year: r.year,
                                institution: r.institution,
                                type: 'Thèse/Mémoire',
                                discipline: 'Recherche'
                              })),
                              selectedCollectionData.title
                            )}
                            className="gap-2"
                          >
                            <FileText className="w-4 h-4" />
                            Exporter TXT
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => exportToBibTeX(
                              selectedCollectionData.resources.map(r => ({
                                title: r.title,
                                author: r.author,
                                year: r.year,
                                institution: r.institution,
                                type: 'Thèse/Mémoire',
                                discipline: 'Recherche'
                              })),
                              selectedCollectionData.title
                            )}
                            className="gap-2"
                          >
                            <File className="w-4 h-4" />
                            Exporter BibTeX
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Resources in Collection */}
                    <div className="mt-12">
                      <h3 className="text-2xl font-bold text-primary mb-6">Ressources de cette collection</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {selectedCollectionData.resources.map((resource, idx) => (
                          <Card key={idx} className="hover:shadow-lg transition-all duration-300">
                            <CardHeader>
                              <CardTitle className="text-lg">{resource.title}</CardTitle>
                              <CardDescription className="text-sm mt-2">
                                <div className="space-y-1">
                                  <p><strong>Auteur:</strong> {resource.author}</p>
                                  <p><strong>Institution:</strong> {resource.institution}</p>
                                  <p><strong>Année:</strong> {resource.year}</p>
                                </div>
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <Button className="w-full bg-accent hover:bg-accent/90">
                                Consulter la ressource
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
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
              <h4 className="font-bold mb-4">Collections</h4>
              <ul className="space-y-2 text-sm text-white/80">
                {researchCollections.slice(0, 3).map(collection => (
                  <li key={collection.id}><Link href="#" className="hover:text-white transition">{collection.title}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Ressources</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li><Link href="/research-portal" className="hover:text-white transition">Portail Haïti</Link></li>
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
