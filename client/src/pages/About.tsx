import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Target, Users, Globe, BookOpen, Zap } from "lucide-react";
import { Link } from "wouter";

/**
 * Design Philosophy: Élégance Organique Africaine
 * - Palette: Bleu océan (#1B4965), Jaune soleil (#F4D35E), Rouge passion (#EE964B), Vert jungle (#2D6A4F), Blanc crème (#FFF8F3)
 * - Typography: Crimson Text (titres), Montserrat (sous-titres), Lato (corps)
 * - Formes organiques, courbes fluides, motifs géométriques haïtiens
 */

export default function About() {
  const team = [
    {
      name: "Dr. Jean-Claude Beauvoir",
      role: "Fondateur & Directeur",
      bio: "Historien passionné par la préservation du patrimoine intellectuel haïtien",
      icon: "👨‍🎓"
    },
    {
      name: "Dr. Marie Dubois",
      role: "Responsable Scientifique",
      bio: "Chercheuse en sciences naturelles et coordinatrice des publications",
      icon: "👩‍🔬"
    },
    {
      name: "Prof. Frantz Voltaire",
      role: "Curateur Littéraire",
      bio: "Spécialiste de la littérature haïtienne et des études culturelles",
      icon: "👨‍💼"
    },
    {
      name: "Dr. Pierre Toussaint",
      role: "Responsable Technique",
      bio: "Ingénieur informatique et développeur de solutions numériques",
      icon: "👨‍💻"
    }
  ];

  const values = [
    {
      icon: Globe,
      title: "Accessibilité",
      description: "Rendre le savoir haïtien accessible à tous, sans barrières géographiques ou financières"
    },
    {
      icon: Heart,
      title: "Préservation",
      description: "Préserver et valoriser le patrimoine intellectuel et culturel d'Haïti pour les générations futures"
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Utiliser la technologie pour démocratiser l'accès à la connaissance et aux recherches scientifiques"
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Créer une communauté de chercheurs, d'académiciens et de passionnés du savoir haïtien"
    }
  ];

  const milestones = [
    {
      year: "2020",
      title: "La Vision",
      description: "Naissance de l'idée de créer une plateforme pour préserver et partager le savoir haïtien"
    },
    {
      year: "2021",
      title: "Le Lancement",
      description: "Lancement officiel d'Echo Academy avec les premiers 100 documents"
    },
    {
      year: "2022",
      title: "L'Expansion",
      description: "Croissance à 500+ documents et partenariats avec universités haïtiennes"
    },
    {
      year: "2023",
      title: "La Reconnaissance",
      description: "Reconnaissance internationale et prix pour l'innovation en accès ouvert"
    },
    {
      year: "2024",
      title: "L'Impact",
      description: "Plus de 50,000 utilisateurs et 1,000+ documents en libre accès"
    }
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
            <span className="font-semibold text-accent">À Propos</span>
            <Button variant="ghost" size="sm">Contact</Button>
            <Button size="sm" className="bg-accent hover:bg-accent/90">Se Connecter</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-primary mb-6 leading-tight">
            Notre Histoire
          </h2>
          <p className="text-xl subtitle text-muted-foreground mb-8 max-w-2xl mx-auto">
            Echo Academy Haiti (EAH) est née d'une passion commune : préserver et partager le savoir haïtien avec le monde
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-4xl font-bold text-primary mb-6">Notre Mission</h3>
            <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
              Echo Academy Haiti (EAH) est une plateforme numérique dédiée à la démocratisation du savoir haïtien. Nous croyons que chaque voix, chaque recherche, chaque mémoire contribue à la richesse intellectuelle de notre nation.
            </p>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Notre mission est de créer un espace où les chercheurs, les académiciens et les passionnés peuvent accéder librement à des travaux scientifiques et historiques de qualité, contribuant ainsi à l'avancement de la connaissance et au développement d'Haïti.
            </p>
            <div className="flex gap-4">
              <Button className="bg-accent hover:bg-accent/90">
                Rejoindre la Communauté
              </Button>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                En Savoir Plus
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl transform rotate-3"></div>
            <div className="relative bg-white p-8 rounded-3xl shadow-lg">
              <Target className="w-16 h-16 text-accent mb-4" />
              <h4 className="text-2xl font-bold text-primary mb-4">Nos Objectifs</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold mt-1">✓</span>
                  <span>Rendre accessible le savoir haïtien à tous</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold mt-1">✓</span>
                  <span>Préserver le patrimoine intellectuel d'Haïti</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold mt-1">✓</span>
                  <span>Soutenir la recherche scientifique haïtienne</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent font-bold mt-1">✓</span>
                  <span>Créer une communauté académique dynamique</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-20">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-primary mb-4 text-center">Nos Valeurs</h3>
          <p className="text-lg subtitle text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
            Les principes qui guident chacune de nos actions
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="border-border hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent/20 to-secondary/20 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="container mx-auto px-4 py-20">
        <h3 className="text-4xl font-bold text-primary mb-4 text-center">Notre Parcours</h3>
        <p className="text-lg subtitle text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
          Les étapes clés de l'évolution d'Echo Academy
        </p>
        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-accent"></div>

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div key={index} className={`flex gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                <div className="flex-1 hidden md:block"></div>
                <div className="flex-shrink-0 flex justify-center">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white font-bold shadow-lg">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <Card className="border-border hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <CardTitle className="text-2xl text-primary">{milestone.title}</CardTitle>
                        <span className="label bg-secondary text-primary px-3 py-1 rounded-full font-bold">
                          {milestone.year}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-20">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-primary mb-4 text-center">Notre Équipe</h3>
          <p className="text-lg subtitle text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
            Les passionnés qui font vivre Echo Academy
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="border-border hover:shadow-lg transition-all duration-300 text-center">
                <CardHeader>
                  <div className="text-5xl mb-4 flex justify-center">{member.icon}</div>
                  <CardTitle className="text-xl text-primary">{member.name}</CardTitle>
                  <p className="subtitle text-accent mt-2">{member.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="bg-gradient-to-r from-primary to-accent py-20 text-white">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold mb-12 text-center">Notre Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">50K+</div>
              <p className="subtitle">Utilisateurs Actifs</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">1000+</div>
              <p className="subtitle">Documents Publiés</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">500K+</div>
              <p className="subtitle">Téléchargements</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">40+</div>
              <p className="subtitle">Pays Représentés</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h3 className="text-4xl font-bold text-primary mb-6">Rejoignez Notre Communauté</h3>
        <p className="text-xl subtitle text-muted-foreground mb-8 max-w-2xl mx-auto">
          Contribuez à la préservation et au partage du savoir haïtien. Que vous soyez chercheur, étudiant ou passionné, votre voix compte.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button size="lg" className="bg-accent hover:bg-accent/90">
            Soumettre un Document
          </Button>
          <Link href="/">
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
              Explorer la Bibliothèque
            </Button>
          </Link>
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
    </div>
  );
}
