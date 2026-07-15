import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, Users, BookOpen, Globe } from "lucide-react";
import { Link } from "wouter";

/**
 * Design Philosophy: Élégance Organique Africaine
 * - Palette: Bleu océan, Jaune soleil, Rouge passion, Vert jungle, Blanc crème
 * - Typography: Crimson Text (titres), Montserrat (sous-titres), Lato (corps)
 * - Formes organiques, courbes fluides, motifs géométriques haïtiens
 */

export default function Statistics() {
  // Données pour les ressources par type
  const resourcesByType = [
    { name: "Mémoires", value: 450, color: "#1B4965" },
    { name: "Articles", value: 320, color: "#F4D35E" },
    { name: "Thèses", value: 280, color: "#EE964B" },
    { name: "Rapports", value: 190, color: "#2D6A4F" },
    { name: "Livres", value: 160, color: "#E63946" }
  ];

  // Données pour les domaines couverts
  const domainsCovered = [
    { name: "Sciences Sociales", count: 320 },
    { name: "Sciences Naturelles", count: 280 },
    { name: "Littérature", count: 210 },
    { name: "Histoire", count: 195 },
    { name: "Économie", count: 170 },
    { name: "Santé", count: 155 },
    { name: "Éducation", count: 140 },
    { name: "Technologie", count: 110 }
  ];

  // Données pour les tendances d'accès mensuelles
  const accessTrends = [
    { month: "Jan", accès: 2400, utilisateurs: 1200 },
    { month: "Fév", accès: 3200, utilisateurs: 1800 },
    { month: "Mar", accès: 4100, utilisateurs: 2200 },
    { month: "Avr", accès: 3800, utilisateurs: 2100 },
    { month: "Mai", accès: 5200, utilisateurs: 2800 },
    { month: "Juin", accès: 6100, utilisateurs: 3200 },
    { month: "Juil", accès: 7200, utilisateurs: 3800 },
    { month: "Août", accès: 6800, utilisateurs: 3600 },
    { month: "Sep", accès: 8100, utilisateurs: 4200 },
    { month: "Oct", accès: 8900, utilisateurs: 4600 },
    { month: "Nov", accès: 9200, utilisateurs: 4800 },
    { month: "Déc", accès: 10100, utilisateurs: 5200 }
  ];

  // Données pour les institutions partenaires
  const institutionsData = [
    { name: "UEH", publications: 180 },
    { name: "GHESKIO", publications: 220 },
    { name: "Université Quisqueya", publications: 150 },
    { name: "CHARESSO", publications: 120 },
    { name: "GRAHN", publications: 95 },
    { name: "ITH", publications: 85 }
  ];

  // Données pour les régions géographiques
  const geographicData = [
    { name: "Haïti", value: 1200, color: "#1B4965" },
    { name: "Québec", value: 850, color: "#F4D35E" },
    { name: "Canada", value: 620, color: "#EE964B" },
    { name: "France", value: 540, color: "#2D6A4F" },
    { name: "Monde Francophone", value: 390, color: "#E63946" }
  ];

  // Statistiques clés
  const keyStats = [
    { label: "Total Ressources", value: "1,400+", icon: BookOpen, color: "text-primary" },
    { label: "Utilisateurs Actifs", value: "5,200+", icon: Users, color: "text-accent" },
    { label: "Domaines Couverts", value: "8+", icon: Globe, color: "text-red-500" },
    { label: "Croissance Annuelle", value: "+42%", icon: TrendingUp, color: "text-green-600" }
  ];

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
            <Link href="/biblio-recherche" className="text-sm font-medium hover:text-accent transition">Biblio-Recherche</Link>
            <Link href="/statistics" className="text-sm font-medium text-accent">Statistiques</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/5 to-accent/5 py-12 border-b border-border">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary mb-4">Statistiques et Tendances</h2>
          <p className="text-lg text-muted-foreground">
            Découvrez les données et tendances de la plateforme Echo Academy Haiti
          </p>
        </div>
      </section>

      {/* Key Statistics */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {keyStats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Card key={idx} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="py-6">
                  <div className="flex items-start justify-between mb-4">
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  <p className="text-3xl font-bold text-primary mb-2">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Charts Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Resources by Type */}
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle>Ressources par Type</CardTitle>
              <CardDescription>Distribution des ressources disponibles</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={resourcesByType}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {resourcesByType.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Domains Covered */}
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle>Domaines Couverts</CardTitle>
              <CardDescription>Distribution par domaine académique</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={domainsCovered}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#1B4965" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Access Trends */}
        <Card className="hover:shadow-lg transition-all duration-300 mb-8">
          <CardHeader>
            <CardTitle>Tendances d'Accès Annuelles</CardTitle>
            <CardDescription>Accès et utilisateurs actifs par mois</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={accessTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="accès" stroke="#1B4965" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="utilisateurs" stroke="#F4D35E" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Institutions and Geographic Data */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Institutions */}
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle>Institutions Partenaires</CardTitle>
              <CardDescription>Publications par institution</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={institutionsData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={120} />
                  <Tooltip />
                  <Bar dataKey="publications" fill="#EE964B" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Geographic Distribution */}
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle>Distribution Géographique</CardTitle>
              <CardDescription>Ressources par région</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={geographicData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {geographicData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Insights Section */}
      <section className="container mx-auto px-4 py-12">
        <h3 className="text-2xl font-bold text-primary mb-8">Insights Clés</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg">Croissance Rapide</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                La plateforme a connu une croissance de 42% cette année, avec un accès mensuel qui a augmenté de 320% depuis janvier.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg">Engagement Utilisateur</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Les utilisateurs actifs ont augmenté de 433% au cours de l'année, démontrant un engagement croissant avec la plateforme.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg">Diversité Académique</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Les ressources couvrent 8+ domaines académiques, avec les sciences sociales représentant 23% des publications totales.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary/5 to-accent/5 py-12 border-t border-border mt-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-primary mb-4">Contribuer à Echo Academy Haiti</h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Vous avez des ressources académiques à partager ? Rejoignez notre communauté et aidez à enrichir le savoir haïtien.
          </p>
          <Button size="lg" className="bg-accent hover:bg-accent/90">
            Soumettre une Ressource
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
