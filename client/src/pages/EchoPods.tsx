import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Mic, Play, Clock, User, Calendar, Search, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useState } from "react";

/**
 * Design Philosophy: Élégance Organique Africaine
 * - Palette: Bleu océan, Jaune soleil, Rouge passion, Vert jungle, Blanc crème
 * - Typography: Crimson Text (titres), Montserrat (sous-titres), Lato (corps)
 * - Formes organiques, courbes fluides, motifs géométriques haïtiens
 */

export default function EchoPods() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const podcasts = [
    {
      id: 1,
      title: "Réflexions sur l'Avenir de l'Éducation en Haïti",
      guest: "Dr. Jean-Pierre Beaumont",
      role: "Professeur d'Éducation, UEH",
      category: "Éducation",
      date: "2026-04-15",
      duration: "45 min",
      description: "Une discussion approfondie sur les défis et les opportunités de l'éducation haïtienne au 21e siècle.",
      audioUrl: "https://example.com/podcast/episode-1.mp3",
      imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
      tags: ["Éducation", "Innovation", "Haïti"]
    },
    {
      id: 2,
      title: "L'Économie Haïtienne : Enjeux et Perspectives",
      guest: "Mme. Marie-Josée Dufour",
      role: "Économiste, Université Quisqueya",
      category: "Économie",
      date: "2026-04-08",
      duration: "52 min",
      description: "Analyse des tendances économiques actuelles et des stratégies de développement durable pour Haïti.",
      audioUrl: "https://example.com/podcast/episode-2.mp3",
      imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
      tags: ["Économie", "Développement", "Politique"]
    },
    {
      id: 3,
      title: "Littérature Haïtienne Contemporaine",
      guest: "Prof. Edwidge Danticat",
      role: "Écrivaine et Critique Littéraire",
      category: "Littérature",
      date: "2026-04-01",
      duration: "48 min",
      description: "Exploration des voix contemporaines de la littérature haïtienne et leur impact global.",
      audioUrl: "https://example.com/podcast/episode-3.mp3",
      imageUrl: "https://images.unsplash.com/photo-1507842217343-583f20270319?w=400&h=300&fit=crop",
      tags: ["Littérature", "Culture", "Arts"]
    },
    {
      id: 4,
      title: "Santé Publique et Recherche Médicale en Haïti",
      guest: "Dr. Pape Gueye",
      role: "Directeur de GHESKIO",
      category: "Santé",
      date: "2026-03-25",
      duration: "56 min",
      description: "Discussion sur les initiatives de recherche médicale et l'amélioration de la santé publique haïtienne.",
      audioUrl: "https://example.com/podcast/episode-4.mp3",
      imageUrl: "https://images.unsplash.com/photo-1576091160550-112173f7f869?w=400&h=300&fit=crop",
      tags: ["Santé", "Recherche", "Médecine"]
    },
    {
      id: 5,
      title: "Technologie et Innovation en Haïti",
      guest: "Ing. Frantz Voltaire",
      role: "Fondateur de TechHaiti",
      category: "Technologie",
      date: "2026-03-18",
      duration: "41 min",
      description: "Comment la technologie peut transformer l'économie et la société haïtienne.",
      audioUrl: "https://example.com/podcast/episode-5.mp3",
      imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop",
      tags: ["Technologie", "Innovation", "Startup"]
    },
    {
      id: 6,
      title: "Histoire et Mémoire Collective",
      guest: "Prof. Laënnec Hurbon",
      role: "Historien et Sociologue",
      category: "Histoire",
      date: "2026-03-11",
      duration: "54 min",
      description: "Réflexions sur l'histoire haïtienne et l'importance de la mémoire collective.",
      audioUrl: "https://example.com/podcast/episode-6.mp3",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      tags: ["Histoire", "Mémoire", "Culture"]
    },
    {
      id: 7,
      title: "Environnement et Développement Durable",
      guest: "Dr. Lydia Polgreen",
      role: "Experte en Environnement",
      category: "Environnement",
      date: "2026-03-04",
      duration: "47 min",
      description: "Enjeux environnementaux haïtiens et stratégies de développement durable.",
      audioUrl: "https://example.com/podcast/episode-7.mp3",
      imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
      tags: ["Environnement", "Durabilité", "Écologie"]
    },
    {
      id: 8,
      title: "Jeunesse et Mobilité Sociale en Haïti",
      guest: "Mlle. Stephanie Balmir",
      role: "Étudiante Chercheure, UNAH",
      category: "Société",
      date: "2026-02-25",
      duration: "39 min",
      description: "Perspectives des jeunes haïtiens sur l'éducation, l'emploi et les opportunités.",
      audioUrl: "https://example.com/podcast/episode-8.mp3",
      imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
      tags: ["Jeunesse", "Société", "Éducation"]
    }
  ];

  const categories = ["all", "Éducation", "Économie", "Littérature", "Santé", "Technologie", "Histoire", "Environnement", "Société"];

  const filteredPodcasts = podcasts.filter(podcast => {
    const matchesSearch = podcast.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         podcast.guest.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         podcast.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || podcast.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const stats = [
    { label: "Épisodes", value: podcasts.length },
    { label: "Catégories", value: categories.length - 1 },
    { label: "Heures de Contenu", value: Math.round(podcasts.reduce((sum, p) => sum + parseInt(p.duration), 0) / 60) },
    { label: "Invités Experts", value: podcasts.length }
  ];

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
            <Link href="/echopods" className="font-semibold text-accent">EchoPods</Link>
            <Button variant="ghost" size="sm">Contact</Button>
            <Button size="sm" className="bg-accent hover:bg-accent/90">Se Connecter</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Mic className="w-12 h-12 text-accent" />
            <h2 className="text-5xl md:text-6xl font-bold text-primary leading-tight">
              EchoPods
            </h2>
          </div>
          <p className="text-2xl subtitle text-accent mb-4">Voix de la Pensée Haïtienne</p>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Écoutez les entretiens exclusifs avec des chercheurs, des intellectuels et des étudiants qui façonnent la réflexion sur Haïti
          </p>
          
          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Rechercher par titre, invité ou sujet..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Tabs */}
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 lg:grid-cols-9">
              {categories.map(category => (
                <TabsTrigger key={category} value={category} className="text-xs">
                  {category === "all" ? "Tous" : category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </section>

      {/* Podcasts Grid */}
      <section className="container mx-auto px-4 py-12">
        {filteredPodcasts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPodcasts.map((podcast) => (
              <Card key={podcast.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
                <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
                  <img 
                    src={podcast.imageUrl} 
                    alt={podcast.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Button 
                      size="lg" 
                      className="rounded-full bg-accent hover:bg-accent/90"
                      onClick={() => window.open(podcast.audioUrl, '_blank')}
                    >
                      <Play className="w-6 h-6" />
                    </Button>
                  </div>
                </div>
                
                <CardHeader className="flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <CardTitle className="text-lg line-clamp-2">{podcast.title}</CardTitle>
                    <span className="bg-accent/20 text-accent px-2 py-1 rounded text-xs font-semibold whitespace-nowrap">
                      {podcast.category}
                    </span>
                  </div>
                  <CardDescription className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4" />
                    {podcast.guest}
                  </CardDescription>
                  <p className="text-xs text-muted-foreground italic">{podcast.role}</p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">{podcast.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(podcast.date).toLocaleDateString("fr-FR")}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {podcast.duration}
                    </div>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    {podcast.tags.map(tag => (
                      <span key={tag} className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Button 
                    className="w-full bg-accent hover:bg-accent/90 gap-2"
                    onClick={() => window.open(podcast.audioUrl, '_blank')}
                  >
                    <Play className="w-4 h-4" />
                    Écouter l'Épisode
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Mic className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">Aucun podcast ne correspond à votre recherche.</p>
          </div>
        )}
      </section>

      {/* Subscribe Section */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-12 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-primary mb-4">S'abonner à EchoPods</h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Recevez les nouveaux épisodes directement dans votre application de podcast préférée
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-accent hover:bg-accent/90 gap-2">
              <ExternalLink className="w-4 h-4" />
              Apple Podcasts
            </Button>
            <Button className="bg-accent hover:bg-accent/90 gap-2">
              <ExternalLink className="w-4 h-4" />
              Spotify
            </Button>
            <Button className="bg-accent hover:bg-accent/90 gap-2">
              <ExternalLink className="w-4 h-4" />
              Google Podcasts
            </Button>
            <Button className="bg-accent hover:bg-accent/90 gap-2">
              <ExternalLink className="w-4 h-4" />
              RSS Feed
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary/5 border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-primary mb-4">À Propos</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-accent transition">À Propos d'EAH</Link></li>
                <li><Link href="/about" className="hover:text-accent transition">Notre Mission</Link></li>
                <li><Link href="/about" className="hover:text-accent transition">Équipe</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-primary mb-4">Ressources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/research-portal" className="hover:text-accent transition">Portail Haïti</Link></li>
                <li><Link href="/biblio-recherche" className="hover:text-accent transition">Biblio-Recherche</Link></li>
                <li><Link href="/statistics" className="hover:text-accent transition">Statistiques</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-primary mb-4">Communauté</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-accent transition">Facebook</a></li>
                <li><a href="#" className="hover:text-accent transition">Twitter</a></li>
                <li><a href="#" className="hover:text-accent transition">LinkedIn</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-primary mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="mailto:info@echoacademyhaiti.com" className="hover:text-accent transition">Email</a></li>
                <li><a href="tel:+509-1234-5678" className="hover:text-accent transition">Téléphone</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 Echo Academy Haiti. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
