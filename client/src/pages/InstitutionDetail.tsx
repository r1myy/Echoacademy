import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Mail, Phone, Globe, Users, BookOpen, Lightbulb, ArrowLeft, ExternalLink } from "lucide-react";
import { useRoute, useLocation } from "wouter";
import { Link } from "wouter";

/**
 * Design Philosophy: Élégance Organique Africaine
 * - Palette: Bleu océan (#1B4965), Jaune soleil (#F4D35E), Rouge passion (#EE964B), Vert jungle (#2D6A4F), Blanc crème (#FFF8F3)
 * - Typography: Crimson Text (titres), Montserrat (sous-titres), Lato (corps)
 */

export default function InstitutionDetail() {
  const [, params] = useRoute("/institution/:id");
  const [, setLocation] = useLocation();

  // Institution data with publications and projects
  const institutionsData: Record<string, any> = {
    "gheskio": {
      id: "gheskio",
      name: "GHESKIO (Groupe Haïtien d'Étude du Sarcome de Kaposi et des Infections Opportunistes)",
      type: "Centre de Recherche Spécialisé",
      location: "Port-au-Prince, Haïti",
      email: "info@gheskio.org",
      phone: "+509 2940-1414",
      website: "https://www.gheskio.org",
      director: "Dr. Jean W. Pape",
      founded: "1982",
      description: "GHESKIO est un centre de recherche leader en Haïti, spécialisé dans la recherche sur le VIH/SIDA, les maladies infectieuses et la santé publique. L'institution est reconnue internationalement pour ses contributions significatives à la compréhension et au traitement des maladies infectieuses.",
      laboratories: 3,
      staff: 150,
      publications: [
        {
          id: 1,
          title: "Efficacité des nouveaux antiviraux dans le contexte haïtien",
          authors: "Pape JW, Johnson WD, et al.",
          year: 2025,
          journal: "The Lancet Infectious Diseases",
          doi: "10.1016/S1473-3099(25)00001-X"
        },
        {
          id: 2,
          title: "Épidémiologie du VIH en Haïti : Tendances et perspectives",
          authors: "Modeste JF, Dufour MJ, et al.",
          year: 2024,
          journal: "AIDS Reviews",
          doi: "10.1007/s13337-024-00789-3"
        },
        {
          id: 3,
          title: "Tuberculose et VIH : Co-infection en Haïti",
          authors: "Pape JW, Liautaud B, et al.",
          year: 2024,
          journal: "Clinical Infectious Diseases",
          doi: "10.1093/cid/ciad123"
        },
        {
          id: 4,
          title: "Santé maternelle et prévention de la transmission mère-enfant du VIH",
          authors: "Johnson WD, Pape JW, et al.",
          year: 2023,
          journal: "Maternal and Child Health Journal",
          doi: "10.1007/s10995-023-03654-1"
        }
      ],
      projects: [
        {
          id: 1,
          title: "Étude longitudinale sur l'impact du changement climatique sur les maladies infectieuses",
          status: "En cours",
          startDate: "2024",
          endDate: "2027",
          funding: "NIH, Fondation Gates",
          description: "Étude de 5 ans examinant comment le changement climatique affecte la transmission des maladies infectieuses en Haïti."
        },
        {
          id: 2,
          title: "Programme de formation des chercheurs haïtiens",
          status: "En cours",
          startDate: "2023",
          endDate: "2026",
          funding: "Agence Française de Développement",
          description: "Formation de 50 jeunes chercheurs haïtiens dans les domaines de la virologie et de l'immunologie."
        },
        {
          id: 3,
          title: "Développement d'un vaccin contre les souches locales du VIH",
          status: "Planifié",
          startDate: "2026",
          endDate: "2030",
          funding: "IAVI, Fondation Bill & Melinda Gates",
          description: "Projet de recherche ambitieux visant à développer un vaccin adapté aux souches de VIH circulant en Haïti."
        }
      ]
    },
    "quisqueya": {
      id: "quisqueya",
      name: "Université Quisqueya",
      type: "Université Privée",
      location: "Port-au-Prince, Haïti",
      email: "info@uniq.edu.ht",
      phone: "+509 2813-4000",
      website: "https://www.uniq.edu.ht",
      director: "Dr. Lyonel Trouillot",
      founded: "1988",
      description: "Université Quisqueya est l'une des plus grandes universités privées d'Haïti, offrant des programmes d'études supérieures dans les sciences, l'ingénierie, la médecine et les sciences sociales. L'institution est engagée dans la recherche et le développement.",
      laboratories: 4,
      staff: 200,
      publications: [
        {
          id: 1,
          title: "Analyse de la qualité de l'eau potable en Haïti",
          authors: "Toussaint JC, Dufour MJ, et al.",
          year: 2024,
          journal: "Water Research",
          doi: "10.1016/j.watres.2024.121234"
        },
        {
          id: 2,
          title: "Essais cliniques de nouveaux traitements pour la dengue",
          authors: "Dufour MJ, Voltaire F, et al.",
          year: 2024,
          journal: "Tropical Medicine and International Health",
          doi: "10.1111/tmi.13987"
        },
        {
          id: 3,
          title: "Économie haïtienne : Stratégies de développement durable",
          authors: "Voltaire F, Toussaint JC, et al.",
          year: 2023,
          journal: "Journal of Development Economics",
          doi: "10.1016/j.jdeveco.2023.102987"
        }
      ],
      projects: [
        {
          id: 1,
          title: "Système d'approvisionnement en eau potable durable",
          status: "En cours",
          startDate: "2024",
          endDate: "2027",
          funding: "Banque Mondiale, USAID",
          description: "Projet de développement d'un système d'approvisionnement en eau potable durable pour les zones rurales d'Haïti."
        },
        {
          id: 2,
          title: "Centre d'excellence en ingénierie",
          status: "En cours",
          startDate: "2023",
          endDate: "2025",
          funding: "Gouvernement haïtien, Coopération canadienne",
          description: "Création d'un centre d'excellence en ingénierie pour former les ingénieurs de demain."
        }
      ]
    },
    "ueh": {
      id: "ueh",
      name: "Université d'État d'Haïti (UEH)",
      type: "Université Publique",
      location: "Port-au-Prince, Haïti",
      email: "info@ueh.edu.ht",
      phone: "+509 2812-4000",
      website: "https://www.ueh.edu.ht",
      director: "Dr. Rénald Lubéus",
      founded: "1820",
      description: "L'Université d'État d'Haïti est la plus ancienne université d'Haïti et l'institution d'enseignement supérieur publique principale. Elle offre des programmes dans les sciences, l'ingénierie, les sciences humaines et les sciences sociales.",
      laboratories: 5,
      staff: 300,
      publications: [
        {
          id: 1,
          title: "Biodiversité endémique d'Haïti : Conservation et protection",
          authors: "Dufour P, Beaumont JP, et al.",
          year: 2024,
          journal: "Conservation Biology",
          doi: "10.1111/cobi.14321"
        },
        {
          id: 2,
          title: "Géologie et sismicité de la région des Caraïbes",
          authors: "Beaumont JP, Gueye P, et al.",
          year: 2023,
          journal: "Journal of Geophysical Research",
          doi: "10.1029/2023JB027654"
        }
      ],
      projects: [
        {
          id: 1,
          title: "Réserve naturelle de la Selle : Protection et restauration",
          status: "En cours",
          startDate: "2024",
          endDate: "2028",
          funding: "UNESCO, Conservation International",
          description: "Projet de protection et de restauration de la réserve naturelle de la Selle, zone de biodiversité critique."
        }
      ]
    }
  };

  const institutionId = params?.id;
  const institution = institutionId ? institutionsData[institutionId] : null;

  if (!institution) {
    return (
      <div className="min-h-screen flex flex-col">
        <header className="bg-white border-b border-border">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center font-bold text-white">EAH</div>
              <span className="font-bold text-lg hidden sm:inline">Echo Academy Haiti</span>
            </Link>
            <Button variant="ghost" onClick={() => setLocation("/research-portal")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
          </div>
        </header>
        <main className="flex-1 container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Institution non trouvée</h1>
          <p className="text-muted-foreground mb-6">L'institution demandée n'existe pas.</p>
          <Button onClick={() => setLocation("/research-portal")}>Retour au Portail Haïti</Button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center font-bold text-white">EAH</div>
            <span className="font-bold text-lg hidden sm:inline">Echo Academy Haiti</span>
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => setLocation("/research-portal")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-8 mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">{institution.name}</h1>
            <p className="text-lg text-muted-foreground mb-6">{institution.description}</p>
            
            {/* Key Information */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4">
                <div className="text-sm text-muted-foreground mb-1">Type</div>
                <div className="font-semibold">{institution.type}</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-sm text-muted-foreground mb-1">Fondée</div>
                <div className="font-semibold">{institution.founded}</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-sm text-muted-foreground mb-1">Laboratoires</div>
                <div className="font-semibold">{institution.laboratories}</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-sm text-muted-foreground mb-1">Personnel</div>
                <div className="font-semibold">{institution.staff}</div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card>
              <CardHeader>
                <CardTitle>Informations de Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">Localisation</p>
                    <p>{institution.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">Email</p>
                    <a href={`mailto:${institution.email}`} className="text-accent hover:underline">{institution.email}</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">Téléphone</p>
                    <p>{institution.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">Site Web</p>
                    <a href={institution.website} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline flex items-center gap-1">
                      Visiter <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Administration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">Directeur</p>
                    <p>{institution.director}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="publications" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="publications" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Publications ({institution.publications.length})</span>
              <span className="sm:hidden">{institution.publications.length}</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              <span className="hidden sm:inline">Projets ({institution.projects.length})</span>
              <span className="sm:hidden">{institution.projects.length}</span>
            </TabsTrigger>
          </TabsList>

          {/* Publications Tab */}
          <TabsContent value="publications" className="space-y-6">
            <div className="space-y-4">
              {institution.publications.map((pub: any) => (
                <Card key={pub.id} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg">{pub.title}</CardTitle>
                    <CardDescription>{pub.authors}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm"><span className="font-semibold">Journal:</span> {pub.journal}</p>
                      <p className="text-sm"><span className="font-semibold">Année:</span> {pub.year}</p>
                      <p className="text-sm"><span className="font-semibold">DOI:</span> <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">{pub.doi}</a></p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="space-y-4">
              {institution.projects.map((project: any) => (
                <Card key={project.id} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                        <CardDescription>{project.description}</CardDescription>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        project.status === "En cours" ? "bg-green-100 text-green-800" :
                        project.status === "Planifié" ? "bg-blue-100 text-blue-800" :
                        "bg-gray-100 text-gray-800"
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground mb-1">Période</p>
                        <p className="text-sm">{project.startDate} - {project.endDate}</p>
                      </div>
                      <div className="md:col-span-3">
                        <p className="text-xs font-semibold text-muted-foreground mb-1">Financement</p>
                        <p className="text-sm">{project.funding}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white py-12 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">&copy; 2026 Echo Academy Haiti. Tous droits réservés.</p>
          <p className="text-sm opacity-80">EAH - Savoir Haïtien</p>
        </div>
      </footer>
    </div>
  );
}
