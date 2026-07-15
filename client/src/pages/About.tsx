import { BookOpen, Heart, Eye, Lightbulb, Users, Globe, ArrowLeft, Menu, X } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

/**
 * Design Philosophy: Université Contemporaine
 * - Palette: Bleu nuit (#1a2f4a), Vert sauge (#7fb069), Blanc cassé (#f5f3f0)
 * - Typography: Playfair Display (titres), Inter (corps)
 * - Layout: Moderne, accessible, équilibré
 * - Ambiance: Académique, professionnelle, inspirante
 */

export default function About() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const values = [
    {
      icon: Eye,
      title: "Accessibilité",
      description: "Rendre la recherche haïtienne accessible à tous, sans barrières financières ou géographiques."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Promouvoir les nouvelles idées et les approches novatrices dans la recherche académique haïtienne."
    },
    {
      icon: Heart,
      title: "Engagement",
      description: "Soutenir les chercheurs haïtiens et valoriser leurs contributions à la connaissance mondiale."
    },
    {
      icon: Globe,
      title: "Inclusivité",
      description: "Créer un espace où toutes les voix académiques haïtiennes sont entendues et respectées."
    }
  ];

  const team = [
    {
      name: "Dr. Marie-Josée Dufour",
      role: "Directrice Générale",
      bio: "Spécialiste en santé publique avec 15 ans d'expérience en recherche académique haïtienne."
    },
    {
      name: "Prof. Jean-Claude Beauvoir",
      role: "Directeur de la Recherche",
      bio: "Historien renommé et expert en documentation des archives haïtiennes."
    },
    {
      name: "Dr. Pierre Toussaint",
      role: "Directeur des Partenariats",
      bio: "Économiste spécialisé dans le développement durable et les politiques haïtiennes."
    },
    {
      name: "Prof. Frantz Voltaire",
      role: "Directeur Éditorial",
      bio: "Littéraire et critique, responsable de la curation des contenus académiques."
    }
  ];

  const milestones = [
    {
      year: "2020",
      title: "Les Origines",
      description: "Fondation d'Echo Academy par un collectif de chercheurs haïtiens passionnés par la valorisation du savoir local."
    },
    {
      year: "2021",
      title: "Expansion Numérique",
      description: "Lancement de la plateforme numérique permettant l'accès gratuit à des centaines de publications académiques."
    },
    {
      year: "2023",
      title: "Transformation",
      description: "Évolution vers une plateforme complète avec portail avancé, blog, collections thématiques et outils collaboratifs."
    },
    {
      year: "2024",
      title: "Vision Globale",
      description: "Reconnaissance comme plateforme de référence avec partenariats internationaux et communauté croissante."
    }
  ];

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
            <Link href="/about" className="text-sm lg:text-base text-accent transition font-medium">À Propos</Link>
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
              <Link href="/about" className="block text-sm text-accent transition font-medium py-2">À Propos</Link>
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

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6 leading-tight">
              À Propos d'Echo Academy
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Découvrez notre mission de valoriser et d'amplifier la voix de la recherche académique haïtienne
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-20">
        {/* Mission Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-primary mb-6">Notre Mission</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Echo Academy est une plateforme numérique dédiée à la valorisation et à la diffusion de la recherche académique haïtienne. Nous croyons que le savoir haïtien est une richesse qui doit être accessible à tous, chercheurs, étudiants, décideurs et citoyens.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Notre mission est de créer un écosystème académique inclusif où les voix haïtiennes sont amplifiées, les recherches sont valorisées, et les idées circulent librement pour contribuer au développement du pays et à la connaissance mondiale.
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663441725136/AK8d9c4wnXxLYV3xzmH4Xc/section-research-contemporary-WjrgQWQj9NWB437zs9GPaJ.webp"
                alt="Recherche académique"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* History Section */}
        <div className="max-w-4xl mx-auto mb-20 border-t border-border pt-20">
          <h2 className="text-4xl font-bold text-primary mb-12 text-center">Notre Histoire</h2>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="border-l-4 border-accent pl-6">
                <h3 className="text-2xl font-bold text-primary mb-2">{milestone.year} - {milestone.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{milestone.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="max-w-6xl mx-auto mb-20 border-t border-border pt-20">
          <h2 className="text-4xl font-bold text-primary mb-12 text-center">Nos Valeurs</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="border border-border hover:shadow-lg transition-all duration-300 rounded-lg">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-2">
                      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                      <CardTitle className="text-xl text-primary">{value.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Team Section */}
        <div className="max-w-6xl mx-auto border-t border-border pt-20">
          <h2 className="text-4xl font-bold text-primary mb-12 text-center">Notre Équipe</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="border border-border hover:shadow-lg transition-all duration-300 rounded-lg">
                <CardHeader>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-primary">{member.name}</CardTitle>
                      <p className="text-sm text-accent font-semibold">{member.role}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="bg-primary text-white py-16 mt-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Notre Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">9+</div>
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

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-primary mb-6">Rejoignez Notre Communauté</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Que vous soyez chercheur, étudiant ou simplement curieux, explorez la richesse de la recherche académique haïtienne et contribuez à notre mission.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/research-portal">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-md px-8 py-6 font-medium">
                Explorer les Recherches
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary/5 rounded-md px-8 py-6 font-medium">
              Nous Contacter
            </Button>
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
