import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BookOpen, Calendar, MapPin, Users, Search, ExternalLink, Bell } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

/**
 * Design Philosophy: Élégance Organique Africaine
 * - Palette: Bleu océan, Jaune soleil, Rouge passion, Vert jungle, Blanc crème
 * - Typography: Crimson Text (titres), Montserrat (sous-titres), Lato (corps)
 * - Formes organiques, courbes fluides, motifs géométriques haïtiens
 */

export default function Events() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 1)); // May 2026
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const events = [
    {
      id: 1,
      title: "Colloque International sur la Recherche Haïtienne",
      type: "Colloque",
      date: "2026-05-15",
      time: "09:00",
      location: "Université d'État d'Haïti, Port-au-Prince",
      organizer: "UEH",
      description: "Un colloque international réunissant chercheurs et académiciens pour discuter des avancées en recherche haïtienne.",
      attendees: 250,
      url: "https://ueh.edu.ht/events",
      category: "Recherche"
    },
    {
      id: 2,
      title: "Séminaire sur les Sciences Sociales en Haïti",
      type: "Séminaire",
      date: "2026-05-22",
      time: "14:00",
      location: "Université Quisqueya, Port-au-Prince",
      organizer: "Université Quisqueya",
      description: "Séminaire explorant les tendances actuelles en sciences sociales et leur application en Haïti.",
      attendees: 120,
      url: "https://uniq.edu.ht/events",
      category: "Sciences Sociales"
    },
    {
      id: 3,
      title: "Conférence sur l'Innovation Technologique en Haïti",
      type: "Conférence",
      date: "2026-06-05",
      time: "10:00",
      location: "Université de Technologie d'Haïti (UNITECH), Port-au-Prince",
      organizer: "UNITECH",
      description: "Conférence mettant en avant les innovations technologiques et les startups haïtiennes.",
      attendees: 180,
      url: "https://unitech.edu.ht/events",
      category: "Technologie"
    },
    {
      id: 4,
      title: "Atelier de Formation en Méthodologie de Recherche",
      type: "Atelier",
      date: "2026-06-12",
      time: "09:00",
      location: "GHESKIO, Port-au-Prince",
      organizer: "GHESKIO",
      description: "Atelier pratique sur les méthodologies de recherche modernes et l'analyse de données.",
      attendees: 80,
      url: "https://gheskio.org/events",
      category: "Formation"
    },
    {
      id: 5,
      title: "Symposium sur la Santé Publique en Haïti",
      type: "Symposium",
      date: "2026-06-20",
      time: "08:00",
      location: "Université Adventiste d'Haïti (UNAH), Port-au-Prince",
      organizer: "UNAH",
      description: "Symposium international sur les enjeux de santé publique et les solutions innovantes en Haïti.",
      attendees: 200,
      url: "https://unah.edu.ht/events",
      category: "Santé"
    },
    {
      id: 6,
      title: "Conférence sur la Littérature Haïtienne Contemporaine",
      type: "Conférence",
      date: "2026-07-01",
      time: "15:00",
      location: "Université Lumière (ULUM), Port-au-Prince",
      organizer: "ULUM",
      description: "Conférence célébrant les auteurs haïtiens contemporains et l'évolution de la littérature haïtienne.",
      attendees: 150,
      url: "https://www.ulum.edu.ht/events",
      category: "Littérature"
    },
    {
      id: 7,
      title: "Atelier sur l'Économie Numérique en Haïti",
      type: "Atelier",
      date: "2026-07-10",
      time: "10:00",
      location: "Université Inuka, Port-au-Prince",
      organizer: "Université Inuka",
      description: "Atelier explorant les opportunités et défis de l'économie numérique pour Haïti.",
      attendees: 100,
      url: "https://www.inuka.edu.ht/events",
      category: "Économie"
    },
    {
      id: 8,
      title: "Colloque sur l'Environnement et le Développement Durable",
      type: "Colloque",
      date: "2026-07-25",
      time: "09:00",
      location: "CHARESSO, Port-au-Prince",
      organizer: "CHARESSO",
      description: "Colloque international sur les enjeux environnementaux et les stratégies de développement durable en Haïti.",
      attendees: 220,
      url: "https://charesso.org/events",
      category: "Environnement"
    }
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || event.type === filterType;
    return matchesSearch && matchesType;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  };

  const eventTypes = ["Colloque", "Séminaire", "Conférence", "Atelier", "Symposium"];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary/10 to-accent/10 border-b border-border">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">Echo Academy Haiti</h1>
              <p className="text-xs text-muted-foreground">EAH - Savoir Haïtien</p>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-accent transition">Accueil</Link>
            <Link href="/about" className="text-sm font-medium hover:text-accent transition">À Propos</Link>
            <Link href="/research-portal" className="text-sm font-medium hover:text-accent transition">Portail Haïti</Link>
            <Link href="/biblio-recherche" className="text-sm font-medium hover:text-accent transition">Biblio-Recherche</Link>
            <Link href="/statistics" className="text-sm font-medium hover:text-accent transition">Statistiques</Link>
            <Link href="/events" className="text-sm font-medium text-accent">Événements</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/5 to-accent/5 py-12 border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary mb-4">Événements Académiques</h2>
          <p className="text-lg text-muted-foreground">
            Découvrez les conférences, séminaires et colloques pertinents en Haïti
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Rechercher des événements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 py-6 text-lg border-border focus:ring-accent"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button
              variant={filterType === "all" ? "default" : "outline"}
              onClick={() => setFilterType("all")}
              className={filterType === "all" ? "bg-accent hover:bg-accent/90" : ""}
            >
              Tous les Événements
            </Button>
            {eventTypes.map(type => (
              <Button
                key={type}
                variant={filterType === type ? "default" : "outline"}
                onClick={() => setFilterType(type)}
                className={filterType === type ? "bg-accent hover:bg-accent/90" : ""}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="container mx-auto px-4 py-8">
        {filteredEvents.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-muted-foreground text-lg">Aucun événement ne correspond à votre recherche.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {filteredEvents.map(event => (
              <Card key={event.id} className="hover:shadow-lg transition-all duration-300 overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Event Date */}
                    <div className="flex-shrink-0 md:w-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-4 text-center">
                      <div className="text-sm font-semibold text-muted-foreground uppercase">
                        {new Date(event.date).toLocaleDateString("fr-FR", { month: "short" })}
                      </div>
                      <div className="text-3xl font-bold text-primary">
                        {new Date(event.date).getDate()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {event.time}
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-primary mb-1">{event.title}</h3>
                          <div className="flex gap-2 mb-3">
                            <span className="inline-block px-3 py-1 bg-accent/20 text-accent text-xs font-semibold rounded-full">
                              {event.type}
                            </span>
                            <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-full">
                              {event.category}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-4">{event.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4 text-accent" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Users className="w-4 h-4 text-accent" />
                          <span>{event.attendees} participants attendus</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <BookOpen className="w-4 h-4 text-accent" />
                          <span>Organisé par {event.organizer}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="bg-accent hover:bg-accent/90 flex items-center gap-2"
                          onClick={() => window.open(event.url, "_blank")}
                        >
                          En Savoir Plus
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex items-center gap-2"
                        >
                          <Bell className="w-4 h-4" />
                          Rappel
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Upcoming Events Stats */}
      <section className="container mx-auto px-4 py-12">
        <h3 className="text-2xl font-bold text-primary mb-8">Statistiques des Événements</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="py-6">
              <p className="text-3xl font-bold text-primary mb-2">{events.length}</p>
              <p className="text-sm text-muted-foreground">Événements à venir</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="py-6">
              <p className="text-3xl font-bold text-accent mb-2">{events.reduce((sum, e) => sum + e.attendees, 0)}</p>
              <p className="text-sm text-muted-foreground">Participants attendus</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="py-6">
              <p className="text-3xl font-bold text-red-500 mb-2">{new Set(events.map(e => e.organizer)).size}</p>
              <p className="text-sm text-muted-foreground">Institutions organisatrices</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="py-6">
              <p className="text-3xl font-bold text-green-600 mb-2">{new Set(events.map(e => e.category)).size}</p>
              <p className="text-sm text-muted-foreground">Domaines couverts</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary/5 to-accent/5 py-12 border-t border-border mt-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-primary mb-4">Vous organisez un événement ?</h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Contactez-nous pour lister votre événement académique sur Echo Academy Haiti.
          </p>
          <Button size="lg" className="bg-accent hover:bg-accent/90">
            Soumettre un Événement
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-primary/5 to-accent/5 border-t border-border mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-primary mb-4">À Propos</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-accent transition">À Propos d'Echo Academy</Link></li>
                <li><Link href="/" className="hover:text-accent transition">Accueil</Link></li>
                <li><a href="#" className="hover:text-accent transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-primary mb-4">Ressources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/research-portal" className="hover:text-accent transition">Portail Recherche</Link></li>
                <li><Link href="/biblio-recherche" className="hover:text-accent transition">Biblio-Recherche</Link></li>
                <li><Link href="/statistics" className="hover:text-accent transition">Statistiques</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-primary mb-4">Événements</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/events" className="hover:text-accent transition">Tous les Événements</Link></li>
                <li><a href="#" className="hover:text-accent transition">Soumettre un Événement</a></li>
                <li><a href="#" className="hover:text-accent transition">Calendrier</a></li>
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
