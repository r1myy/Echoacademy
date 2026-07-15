import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Globe, Search, ExternalLink } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

/**
 * Design Philosophy: Élégance Organique Africaine
 * - Palette: Bleu océan, Jaune soleil, Rouge passion, Vert jungle, Blanc crème
 * - Typography: Crimson Text (titres), Montserrat (sous-titres), Lato (corps)
 * - Formes organiques, courbes fluides, motifs géométriques haïtiens
 */

export default function BiblioRecherche() {
  const [searchQuery, setSearchQuery] = useState("");

  const libraries = {
    haiti: [
      {
        name: "Bibliothèque Nationale d'Haïti",
        country: "Haïti",
        description: "Dépôt légal et collection nationale d'Haïti",
        url: "https://bnh.ht",
        access: "Libre accès"
      },
      {
        name: "Bibliothèque de l'Université d'État d'Haïti",
        country: "Haïti",
        description: "Collection académique et ressources de recherche",
        url: "https://ueh.edu.ht/bibliotheque",
        access: "Libre accès"
      }
    ],
    quebec: [
      {
        name: "Bibliothèque et Archives nationales du Québec (BAnQ)",
        country: "Québec",
        description: "Plus grande bibliothèque du Québec avec accès numérique",
        url: "https://www.banq.qc.ca",
        access: "Libre accès partiel"
      },
      {
        name: "Université du Québec à Montréal (UQAM) - Bibliothèque",
        country: "Québec",
        description: "Ressources académiques et collections numériques",
        url: "https://www.uqam.ca/bibliotheques",
        access: "Libre accès"
      },
      {
        name: "Université McGill - Bibliothèques",
        country: "Québec",
        description: "Collections internationales et ressources en ligne",
        url: "https://www.mcgill.ca/library",
        access: "Libre accès partiel"
      },
      {
        name: "Université Laval - Bibliothèques",
        country: "Québec",
        description: "Ressources académiques et bases de données",
        url: "https://www.bibl.ulaval.ca",
        access: "Libre accès partiel"
      },
      {
        name: "Concordia University - Bibliothèques",
        country: "Québec",
        description: "Collections numériques et ressources académiques",
        url: "https://library.concordia.ca",
        access: "Libre accès partiel"
      },
      {
        name: "Bibliothèque de Québec",
        country: "Québec",
        description: "Réseau de bibliothèques publiques de la Ville de Québec avec collections numériques",
        url: "https://www.bibliothequedequebec.qc.ca/bibliotheques/",
        access: "Libre accès"
      }
    ],
    canada: [
      {
        name: "Bibliothèque et Archives Canada",
        country: "Canada",
        description: "Patrimoine documentaire canadien en ligne",
        url: "https://www.bac-lac.gc.ca",
        access: "Libre accès"
      },
      {
        name: "Université de Toronto - Bibliothèques",
        country: "Canada",
        description: "Collections académiques et ressources numériques",
        url: "https://www.library.utoronto.ca",
        access: "Libre accès partiel"
      },
      {
        name: "Université de Colombie-Britannique - Bibliothèques",
        country: "Canada",
        description: "Ressources académiques internationales",
        url: "https://www.library.ubc.ca",
        access: "Libre accès partiel"
      },
      {
        name: "Université de l'Alberta - Bibliothèques",
        country: "Canada",
        description: "Collections numériques et ressources de recherche",
        url: "https://www.library.ualberta.ca",
        access: "Libre accès partiel"
      }
    ],
    france: [
      {
        name: "Bibliothèque Nationale de France (BnF)",
        country: "France",
        description: "Gallica - Bibliothèque numérique française",
        url: "https://gallica.bnf.fr",
        access: "Libre accès"
      },
      {
        name: "OpenEdition Books",
        country: "France",
        description: "Plateforme de publication en libre accès",
        url: "https://books.openedition.org",
        access: "Libre accès"
      },
      {
        name: "HAL (Hyper Articles en Ligne)",
        country: "France",
        description: "Archive ouverte multidisciplinaire",
        url: "https://hal.archives-ouvertes.fr",
        access: "Libre accès"
      },
      {
        name: "Persée",
        country: "France",
        description: "Portail de revues scientifiques en libre accès",
        url: "https://www.persee.fr",
        access: "Libre accès"
      },
      {
        name: "Université Paris-Sorbonne - Bibliothèques",
        country: "France",
        description: "Collections académiques et ressources numériques",
        url: "https://www.sorbonne-universite.fr/bibliotheques",
        access: "Libre accès partiel"
      }
    ],
    francophone: [
      {
        name: "Agence Universitaire de la Francophonie (AUF)",
        country: "Monde Francophone",
        description: "Ressources académiques francophones",
        url: "https://www.auf.org",
        access: "Libre accès"
      },
      {
        name: "Université de Genève - Bibliothèques",
        country: "Suisse",
        description: "Collections académiques suisses",
        url: "https://www.unige.ch/biblio",
        access: "Libre accès partiel"
      },
      {
        name: "Université Libre de Bruxelles - Bibliothèques",
        country: "Belgique",
        description: "Ressources académiques belges",
        url: "https://www.ulb.be/fr/bibliotheques",
        access: "Libre accès partiel"
      },
      {
        name: "Université de Dakar - Bibliothèques",
        country: "Sénégal",
        description: "Ressources académiques africaines",
        url: "https://www.ucad.sn/bibliotheques",
        access: "Libre accès partiel"
      },
      {
        name: "Bibliothèque Numérique Francophone",
        country: "Monde Francophone",
        description: "Ressources documentaires francophones",
        url: "https://www.bnf-francophone.org",
        access: "Libre accès"
      }
    ]
  };

  const allLibraries = [
    ...libraries.haiti,
    ...libraries.quebec,
    ...libraries.canada,
    ...libraries.france,
    ...libraries.francophone
  ];

  const filteredLibraries = allLibraries.filter(lib =>
    lib.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lib.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lib.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const LibraryCard = ({ library }: { library: (typeof allLibraries)[0] }) => (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-lg mb-1">{library.name}</CardTitle>
            <CardDescription className="text-sm">{library.country}</CardDescription>
          </div>
          <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
            {library.access}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{library.description}</p>
        <Button
          className="w-full bg-accent hover:bg-accent/90 gap-2"
          onClick={() => window.open(library.url, '_blank')}
        >
          <ExternalLink className="w-4 h-4" />
          Accéder
        </Button>
      </CardContent>
    </Card>
  );

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
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-accent transition">Accueil</Link>
            <Link href="/about" className="text-sm font-medium hover:text-accent transition">À Propos</Link>
            <Link href="/research-portal" className="text-sm font-medium hover:text-accent transition">Portail Haïti</Link>
            <Link href="/biblio-recherche" className="text-sm font-medium text-accent">Biblio-Recherche</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/5 to-accent/5 py-12 border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary mb-4">Biblio-Recherche</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Accédez aux bibliothèques numériques en libre accès du Canada, Québec, France et du monde francophone
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Rechercher une bibliothèque..."
                className="pl-12 py-3"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">Tous</span>
            </TabsTrigger>
            <TabsTrigger value="haiti" className="flex items-center gap-2">
              <span className="hidden sm:inline">Haïti</span>
            </TabsTrigger>
            <TabsTrigger value="quebec" className="flex items-center gap-2">
              <span className="hidden sm:inline">Québec</span>
            </TabsTrigger>
            <TabsTrigger value="canada" className="flex items-center gap-2">
              <span className="hidden sm:inline">Canada</span>
            </TabsTrigger>
            <TabsTrigger value="france" className="flex items-center gap-2">
              <span className="hidden sm:inline">France</span>
            </TabsTrigger>
            <TabsTrigger value="francophone" className="flex items-center gap-2">
              <span className="hidden sm:inline">Francophone</span>
            </TabsTrigger>
          </TabsList>

          {/* All Libraries Tab */}
          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredLibraries.length > 0 ? (
                filteredLibraries.map((lib, idx) => (
                  <LibraryCard key={idx} library={lib} />
                ))
              ) : (
                <Card className="md:col-span-2">
                  <CardContent className="py-8 text-center text-muted-foreground">
                    Aucune bibliothèque trouvée pour votre recherche.
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Haiti Tab */}
          <TabsContent value="haiti" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {libraries.haiti.map((lib, idx) => (
                <LibraryCard key={idx} library={lib} />
              ))}
            </div>
          </TabsContent>

          {/* Quebec Tab */}
          <TabsContent value="quebec" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {libraries.quebec.map((lib, idx) => (
                <LibraryCard key={idx} library={lib} />
              ))}
            </div>
          </TabsContent>

          {/* Canada Tab */}
          <TabsContent value="canada" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {libraries.canada.map((lib, idx) => (
                <LibraryCard key={idx} library={lib} />
              ))}
            </div>
          </TabsContent>

          {/* France Tab */}
          <TabsContent value="france" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {libraries.france.map((lib, idx) => (
                <LibraryCard key={idx} library={lib} />
              ))}
            </div>
          </TabsContent>

          {/* Francophone Tab */}
          <TabsContent value="francophone" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {libraries.francophone.map((lib, idx) => (
                <LibraryCard key={idx} library={lib} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Statistics Section */}
      <section className="bg-gradient-to-r from-primary/5 to-accent/5 py-12 border-t border-border mt-12">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-primary mb-8 text-center">Statistiques</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="py-6 text-center">
                <p className="text-3xl font-bold text-accent mb-2">{libraries.haiti.length}</p>
                <p className="text-sm text-muted-foreground">Haïti</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="py-6 text-center">
                <p className="text-3xl font-bold text-accent mb-2">{libraries.quebec.length}</p>
                <p className="text-sm text-muted-foreground">Québec</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="py-6 text-center">
                <p className="text-3xl font-bold text-accent mb-2">{libraries.canada.length}</p>
                <p className="text-sm text-muted-foreground">Canada</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="py-6 text-center">
                <p className="text-3xl font-bold text-accent mb-2">{libraries.france.length}</p>
                <p className="text-sm text-muted-foreground">France</p>
              </CardContent>
            </Card>
          </div>
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
