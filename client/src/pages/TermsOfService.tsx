import { BookOpen, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function TermsOfService() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-muted rounded-md"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4">
            <Link href="/" className="text-sm hover:text-accent transition font-medium">Accueil</Link>
            <Link href="/about" className="text-sm hover:text-accent transition font-medium">À Propos</Link>
            <Link href="/research-portal" className="text-sm hover:text-accent transition font-medium">Portail Haïti</Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-white">
            <div className="container mx-auto px-4 py-4 space-y-3">
              <Link href="/" className="block text-sm hover:text-accent transition font-medium">Accueil</Link>
              <Link href="/about" className="block text-sm hover:text-accent transition font-medium">À Propos</Link>
              <Link href="/research-portal" className="block text-sm hover:text-accent transition font-medium">Portail Haïti</Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-primary mb-2">Conditions d'Utilisation</h1>
          <p className="text-muted-foreground mb-12">Dernière mise à jour : Avril 2026</p>

          <div className="space-y-8 prose prose-sm max-w-none">
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">1. Acceptation des Conditions</h2>
              <p className="text-muted-foreground mb-4">
                En accédant et en utilisant la plateforme Echo Academy Haiti, vous acceptez de respecter ces conditions d'utilisation. Si vous n'êtes pas d'accord avec l'une de ces conditions, veuillez ne pas utiliser la plateforme.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">2. Utilisation Autorisée</h2>
              <p className="text-muted-foreground mb-4">
                Vous acceptez d'utiliser cette plateforme uniquement à des fins légales et de manière à ne pas violer les droits d'autrui ni restreindre ou inhiber l'utilisation et la jouissance de la plateforme par quiconque. Les comportements interdits incluent :
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Harceler ou causer de la détresse ou de l'inconfort</li>
                <li>Offenser la décence ou la moralité</li>
                <li>Perturber le flux normal de dialogue au sein de notre plateforme</li>
                <li>Télécharger ou transmettre des virus ou tout autre code malveillant</li>
                <li>Collecter ou suivre les informations personnelles d'autrui</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">3. Propriété Intellectuelle</h2>
              <p className="text-muted-foreground mb-4">
                Tous les contenus présents sur la plateforme, y compris les textes, graphiques, logos, images et logiciels, sont la propriété de Echo Academy Haiti ou de ses fournisseurs de contenu et sont protégés par les lois internationales sur les droits d'auteur.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">4. Contenu Utilisateur</h2>
              <p className="text-muted-foreground mb-4">
                Vous conservez tous les droits sur le contenu que vous soumettez, publiez ou affichez sur la plateforme. En soumettant du contenu, vous accordez à Echo Academy Haiti une licence mondiale, non exclusive, libre de droits pour utiliser, copier, modifier et distribuer ce contenu.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">5. Limitation de Responsabilité</h2>
              <p className="text-muted-foreground mb-4">
                Echo Academy Haiti ne sera pas responsable des dommages directs, indirects, accidentels, spéciaux ou consécutifs résultant de votre utilisation ou de votre incapacité à utiliser la plateforme ou les services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">6. Modifications des Conditions</h2>
              <p className="text-muted-foreground mb-4">
                Echo Academy Haiti se réserve le droit de modifier ces conditions à tout moment. Les modifications prendront effet dès leur publication sur la plateforme. Votre utilisation continue de la plateforme après de telles modifications constitue votre acceptation des conditions modifiées.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">7. Résiliation</h2>
              <p className="text-muted-foreground mb-4">
                Echo Academy Haiti peut résilier ou suspendre votre accès à la plateforme à tout moment, pour quelque raison que ce soit, sans préavis ni responsabilité.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">8. Droit Applicable</h2>
              <p className="text-muted-foreground mb-4">
                Ces conditions sont régies par les lois de la République d'Haïti. Tout litige découlant de ou relatif à ces conditions sera soumis à la juridiction exclusive des tribunaux haïtiens.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">9. Contact</h2>
              <p className="text-muted-foreground">
                Pour toute question concernant ces conditions, veuillez nous contacter à : <a href="mailto:contact@echoacademy.ht" className="text-accent hover:underline">contact@echoacademy.ht</a>
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <Link href="/">
              <Button className="bg-primary hover:bg-primary/90 text-white">Retour à l'Accueil</Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">À Propos</h3>
              <ul className="space-y-2 text-sm opacity-90">
                <li><Link href="/about" className="hover:opacity-100">À Propos d'Echo Academy</Link></li>
                <li><Link href="/about" className="hover:opacity-100">Notre Mission</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Ressources</h3>
              <ul className="space-y-2 text-sm opacity-90">
                <li><Link href="/resources" className="hover:opacity-100">Ressources Académiques</Link></li>
                <li><Link href="/blog" className="hover:opacity-100">Echo Blog</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Légal</h3>
              <ul className="space-y-2 text-sm opacity-90">
                <li><Link href="/terms" className="hover:opacity-100">Conditions d'Utilisation</Link></li>
                <li><Link href="/privacy" className="hover:opacity-100">Politique de Confidentialité</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Contact</h3>
              <p className="text-sm opacity-90">Email: contact@echoacademy.ht</p>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-sm opacity-75">
            <p>&copy; 2026 Echo Academy Haiti. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
