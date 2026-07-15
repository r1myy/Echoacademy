import { BookOpen, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Privacy() {
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
          <h1 className="text-4xl font-bold text-primary mb-2">Politique de Confidentialité</h1>
          <p className="text-muted-foreground mb-12">Dernière mise à jour : Avril 2026</p>

          <div className="space-y-8 prose prose-sm max-w-none">
            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">1. Introduction</h2>
              <p className="text-muted-foreground mb-4">
                Echo Academy Haiti (« nous », « notre » ou « nos ») s'engage à protéger votre vie privée. Cette Politique de Confidentialité explique comment nous collectons, utilisons, divulguons et protégeons vos informations lorsque vous visitez notre plateforme.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">2. Informations que Nous Collectons</h2>
              <p className="text-muted-foreground mb-4">
                Nous pouvons collecter des informations vous concernant de plusieurs manières :
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li><strong>Informations que vous nous fournissez directement :</strong> Nom, adresse e-mail, numéro de téléphone, et toute autre information que vous choisissez de partager</li>
                <li><strong>Informations collectées automatiquement :</strong> Adresse IP, type de navigateur, pages visitées, et durée de visite</li>
                <li><strong>Cookies :</strong> Nous utilisons des cookies pour améliorer votre expérience utilisateur</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">3. Utilisation de Vos Informations</h2>
              <p className="text-muted-foreground mb-4">
                Nous utilisons les informations collectées pour :
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Fournir, maintenir et améliorer nos services</li>
                <li>Personnaliser votre expérience utilisateur</li>
                <li>Envoyer des communications de marketing (avec votre consentement)</li>
                <li>Répondre à vos demandes et questions</li>
                <li>Analyser l'utilisation de la plateforme et les tendances</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">4. Partage de Vos Informations</h2>
              <p className="text-muted-foreground mb-4">
                Nous ne vendons, n'échangeons ni ne louons vos informations personnelles à des tiers. Nous pouvons partager vos informations uniquement dans les cas suivants :
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Avec votre consentement explicite</li>
                <li>Pour se conformer à la loi ou aux exigences légales</li>
                <li>Pour protéger nos droits, votre sécurité ou celle d'autrui</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">5. Sécurité de Vos Informations</h2>
              <p className="text-muted-foreground mb-4">
                Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos informations personnelles contre l'accès non autorisé, l'altération, la divulgation ou la destruction. Cependant, aucune méthode de transmission sur Internet n'est 100% sécurisée.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">6. Cookies</h2>
              <p className="text-muted-foreground mb-4">
                Notre plateforme utilise des cookies pour améliorer votre expérience. Vous pouvez configurer votre navigateur pour refuser les cookies, mais cela peut affecter certaines fonctionnalités de la plateforme.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">7. Vos Droits</h2>
              <p className="text-muted-foreground mb-4">
                Vous avez le droit de :
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Accéder à vos informations personnelles</li>
                <li>Corriger les informations inexactes</li>
                <li>Demander la suppression de vos informations</li>
                <li>Vous opposer à certains traitements de vos données</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">8. Modifications de cette Politique</h2>
              <p className="text-muted-foreground mb-4">
                Nous pouvons mettre à jour cette Politique de Confidentialité à tout moment. Les modifications seront publiées sur cette page avec une date de mise à jour révisée.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary mb-4">9. Contact</h2>
              <p className="text-muted-foreground">
                Pour toute question concernant cette Politique de Confidentialité, veuillez nous contacter à : <a href="mailto:contact@echoacademy.ht" className="text-accent hover:underline">contact@echoacademy.ht</a>
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
