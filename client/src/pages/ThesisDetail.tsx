import { Button } from "@/components/ui/button";
import { BookOpen, ArrowLeft, Download, Share2, Copy, Check, FileText, Users, Calendar, Building2, Tag, Quote, Facebook, Linkedin, Mail, Link as LinkIcon } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Design Philosophy: Moderne Minimaliste
 * - Palette: Noir profond, blanc pur, bleu marine, or subtil
 * - Typography: Geist (corps), Playfair Display (titres)
 * - Animations fluides et micro-interactions sophistiquées
 */

// Sample thesis data - in production, this would come from an API
const thesesDatabase: Record<string, any> = {
  "1": {
    id: "1",
    title: "Analyse des politiques de santé publique en Haïti : Impact sur la réduction de la mortalité maternelle",
    author: "Dr. Marie-Josée Dufour",
    year: 2023,
    institution: "Université Quisqueya",
    type: "Thèse de Doctorat",
    discipline: "Santé Publique",
    abstract: "Cette thèse examine les politiques de santé publique mises en place en Haïti et leur impact sur la réduction de la mortalité maternelle au cours des deux dernières décennies. L'étude analyse les données de 50 établissements de santé et inclut des entretiens avec 200 professionnels de la santé. Les résultats montrent une corrélation significative entre l'implémentation de politiques de santé maternelle et la réduction de la mortalité. La recherche propose des recommandations pour améliorer l'accès aux services de santé maternelle en zones rurales.",
    keywords: ["Santé publique", "Mortalité maternelle", "Politiques de santé", "Haïti", "Santé maternelle"],
    url: "https://example.com/thesis/marie-josee-dufour-2023",
    citation: "Dufour, M.-J. (2023). Analyse des politiques de santé publique en Haïti : Impact sur la réduction de la mortalité maternelle. Thèse de doctorat, Université Quisqueya.",
    citationAPA: "Dufour, M.-J. (2023). Analyse des politiques de santé publique en Haïti : Impact sur la réduction de la mortalité maternelle. [Doctoral dissertation, Université Quisqueya].",
    citationMLA: "Dufour, Marie-Josée. \"Analyse des politiques de santé publique en Haïti : Impact sur la réduction de la mortalité maternelle.\" Thèse de doctorat, Université Quisqueya, 2023.",
    pages: 312,
    language: "Français",
    relatedWorks: ["2", "5"],
  },
  "2": {
    id: "2",
    title: "Biodiversité endémique de la Chaîne de la Selle : Conservation et restauration écologique",
    author: "Pierre Dufour",
    year: 2022,
    institution: "Université d'État d'Haïti",
    type: "Thèse de Doctorat",
    discipline: "Écologie",
    abstract: "Étude complète de la biodiversité endémique de la Chaîne de la Selle et des stratégies de conservation et de restauration écologique. La recherche documente 150 espèces endémiques et évalue les menaces à leur survie. L'étude propose un plan de conservation intégré incluant la création de zones protégées et des programmes de restauration. Les résultats soulignent l'importance critique de cette région pour la biodiversité mondiale.",
    keywords: ["Biodiversité", "Écologie", "Conservation", "Chaîne de la Selle", "Restauration écologique"],
    url: "https://example.com/thesis/pierre-dufour-2022",
    citation: "Dufour, P. (2022). Biodiversité endémique de la Chaîne de la Selle : Conservation et restauration écologique. Thèse de doctorat, Université d'État d'Haïti.",
    citationAPA: "Dufour, P. (2022). Biodiversité endémique de la Chaîne de la Selle : Conservation et restauration écologique. [Doctoral dissertation, Université d'État d'Haïti].",
    citationMLA: "Dufour, Pierre. \"Biodiversité endémique de la Chaîne de la Selle : Conservation et restauration écologique.\" Thèse de doctorat, Université d'État d'Haïti, 2022.",
    pages: 298,
    language: "Français",
    relatedWorks: ["1", "6"],
  },
  "3": {
    id: "3",
    title: "Économie haïtienne et stratégies de développement durable : Une analyse comparative",
    author: "Frantz Voltaire",
    year: 2023,
    institution: "Université Quisqueya",
    type: "Thèse de Doctorat",
    discipline: "Économie",
    abstract: "Analyse comparative des stratégies de développement durable en Haïti et dans d'autres pays des Caraïbes. L'étude examine les politiques économiques, les investissements dans les secteurs clés et l'impact sur le développement humain. La recherche identifie les meilleures pratiques et propose un modèle de développement adapté au contexte haïtien, mettant l'accent sur l'agriculture durable et le tourisme écologique.",
    keywords: ["Économie", "Développement durable", "Haïti", "Caraïbes", "Politique économique"],
    url: "https://example.com/thesis/frantz-voltaire-2023",
    citation: "Voltaire, F. (2023). Économie haïtienne et stratégies de développement durable : Une analyse comparative. Thèse de doctorat, Université Quisqueya.",
    citationAPA: "Voltaire, F. (2023). Économie haïtienne et stratégies de développement durable : Une analyse comparative. [Doctoral dissertation, Université Quisqueya].",
    citationMLA: "Voltaire, Frantz. \"Économie haïtienne et stratégies de développement durable : Une analyse comparative.\" Thèse de doctorat, Université Quisqueya, 2023.",
    pages: 276,
    language: "Français",
    relatedWorks: ["1", "8"],
  },
  "4": {
    id: "4",
    title: "Littérature haïtienne contemporaine : Voix et identités culturelles",
    author: "Edwidge Danticat",
    year: 2021,
    institution: "Université de Montréal",
    type: "Thèse de Doctorat",
    discipline: "Littérature",
    abstract: "Étude des voix et des identités culturelles dans la littérature haïtienne contemporaine. La recherche analyse les œuvres d'auteurs haïtiens modernes et leur contribution à la définition de l'identité culturelle. L'étude explore les thèmes de la diaspora, de la résistance et de la résilience dans la littérature haïtienne. Les résultats mettent en évidence le rôle crucial de la littérature dans la préservation et la transmission de la culture haïtienne.",
    keywords: ["Littérature haïtienne", "Identité culturelle", "Voix", "Diaspora", "Culture"],
    url: "https://example.com/thesis/edwidge-danticat-2021",
    citation: "Danticat, E. (2021). Littérature haïtienne contemporaine : Voix et identités culturelles. Thèse de doctorat, Université de Montréal.",
    citationAPA: "Danticat, E. (2021). Littérature haïtienne contemporaine : Voix et identités culturelles. [Doctoral dissertation, Université de Montréal].",
    citationMLA: "Danticat, Edwidge. \"Littérature haïtienne contemporaine : Voix et identités culturelles.\" Thèse de doctorat, Université de Montréal, 2021.",
    pages: 289,
    language: "Français",
    relatedWorks: ["3", "8"],
  },
  "5": {
    id: "5",
    title: "Efficacité des interventions de santé mentale en contexte haïtien",
    author: "Dr. Jean-Claude Toussaint",
    year: 2022,
    institution: "GHESKIO",
    type: "Mémoire de Maîtrise",
    discipline: "Santé Mentale",
    abstract: "Évaluation de l'efficacité des interventions de santé mentale dans le contexte spécifique d'Haïti. L'étude examine 10 programmes de santé mentale et suit 300 participants sur 18 mois. Les résultats montrent que les interventions adaptées au contexte culturel haïtien sont plus efficaces. La recherche propose des recommandations pour améliorer l'accès aux services de santé mentale et former des professionnels locaux.",
    keywords: ["Santé mentale", "Interventions", "Haïti", "Efficacité", "Contexte culturel"],
    url: "https://example.com/thesis/jean-claude-toussaint-2022",
    citation: "Toussaint, J.-C. (2022). Efficacité des interventions de santé mentale en contexte haïtien. Mémoire de maîtrise, GHESKIO.",
    citationAPA: "Toussaint, J.-C. (2022). Efficacité des interventions de santé mentale en contexte haïtien. [Master's thesis, GHESKIO].",
    citationMLA: "Toussaint, Jean-Claude. \"Efficacité des interventions de santé mentale en contexte haïtien.\" Mémoire de maîtrise, GHESKIO, 2022.",
    pages: 245,
    language: "Français",
    relatedWorks: ["1", "3"],
  },
  "6": {
    id: "6",
    title: "Archéologie et patrimoine culturel haïtien : Préservation et valorisation",
    author: "Dr. Alain Beauvoir",
    year: 2023,
    institution: "Université d'État d'Haïti",
    type: "Thèse de Doctorat",
    discipline: "Archéologie",
    abstract: "Étude approfondie du patrimoine archéologique haïtien et des stratégies de préservation et de valorisation. La recherche documente les sites archéologiques importants et propose un plan de conservation. L'étude souligne l'importance de la préservation du patrimoine culturel pour l'identité nationale et le développement du tourisme culturel.",
    keywords: ["Archéologie", "Patrimoine culturel", "Haïti", "Préservation", "Valorisation"],
    url: "https://example.com/thesis/alain-beauvoir-2023",
    citation: "Beauvoir, A. (2023). Archéologie et patrimoine culturel haïtien : Préservation et valorisation. Thèse de doctorat, Université d'État d'Haïti.",
    citationAPA: "Beauvoir, A. (2023). Archéologie et patrimoine culturel haïtien : Préservation et valorisation. [Doctoral dissertation, Université d'État d'Haïti].",
    citationMLA: "Beauvoir, Alain. \"Archéologie et patrimoine culturel haïtien : Préservation et valorisation.\" Thèse de doctorat, Université d'État d'Haïti, 2023.",
    pages: 334,
    language: "Français",
    relatedWorks: ["2", "4"],
  },
  "7": {
    id: "7",
    title: "Éducation et égalité des genres en Haïti : Défis et opportunités",
    author: "Dr. Sylvie Moreau",
    year: 2022,
    institution: "Université Quisqueya",
    type: "Thèse de Doctorat",
    discipline: "Éducation",
    abstract: "Analyse des défis et opportunités pour l'égalité des genres dans l'éducation haïtienne. L'étude examine les politiques éducatives, l'accès à l'éducation pour les filles et les femmes, et l'impact sur le développement socio-économique. La recherche propose des recommandations pour améliorer l'accès à l'éducation de qualité pour tous.",
    keywords: ["Éducation", "Égalité des genres", "Haïti", "Développement", "Politique éducative"],
    url: "https://example.com/thesis/sylvie-moreau-2022",
    citation: "Moreau, S. (2022). Éducation et égalité des genres en Haïti : Défis et opportunités. Thèse de doctorat, Université Quisqueya.",
    citationAPA: "Moreau, S. (2022). Éducation et égalité des genres en Haïti : Défis et opportunités. [Doctoral dissertation, Université Quisqueya].",
    citationMLA: "Moreau, Sylvie. \"Éducation et égalité des genres en Haïti : Défis et opportunités.\" Thèse de doctorat, Université Quisqueya, 2022.",
    pages: 301,
    language: "Français",
    relatedWorks: ["1", "5"],
  },
  "8": {
    id: "8",
    title: "Agriculture durable et sécurité alimentaire en Haïti",
    author: "Dr. Jean-Pierre Leclerc",
    year: 2023,
    institution: "Université d'État d'Haïti",
    type: "Thèse de Doctorat",
    discipline: "Agronomie",
    abstract: "Etude des pratiques agricoles durables et de leur impact sur la securite alimentaire en Haiti. La recherche examine les defis de la production agricole, les solutions innovantes et les politiques de soutien. L'etude propose un modele d'agriculture durable adapte au contexte haitien pour ameliorer la securite alimentaire.",
    keywords: ["Agriculture", "Durabilité", "Sécurité alimentaire", "Haïti", "Agronomie"],
    url: "https://example.com/thesis/jean-pierre-leclerc-2023",
    citation: "Leclerc, J.-P. (2023). Agriculture durable et sécurité alimentaire en Haïti. Thèse de doctorat, Université d'État d'Haïti.",
    citationAPA: "Leclerc, J.-P. (2023). Agriculture durable et sécurité alimentaire en Haïti. [Doctoral dissertation, Université d'État d'Haïti].",
    citationMLA: "Leclerc, Jean-Pierre. \"Agriculture durable et sécurité alimentaire en Haïti.\" Thèse de doctorat, Université d'État d'Haïti, 2023.",
    pages: 315,
    language: "Français",
    relatedWorks: ["3", "6"],
  },
  "9": {
    id: "9",
    title: "Sociologie urbaine et dynamiques sociales en Haïti : Étude des quartiers populaires de Port-au-Prince",
    author: "Dr. Carole Estimé",
    year: 2023,
    institution: "Université Quisqueya",
    type: "Thèse de Doctorat",
    discipline: "Sciences Humaines et Sociales",
    abstract: "Étude approfondie des dynamiques sociales dans les quartiers populaires de Port-au-Prince. La recherche examine les structures sociales, les réseaux communautaires et l'impact des politiques urbaines sur la vie quotidienne. L'étude propose des solutions pour améliorer les conditions de vie et favoriser le développement communautaire durable.",
    keywords: ["Sociologie urbaine", "Dynamiques sociales", "Port-au-Prince", "Quartiers populaires", "Haïti"],
    url: "https://example.com/thesis/carole-estime-2023",
    citation: "Estimé, C. (2023). Sociologie urbaine et dynamiques sociales en Haïti : Étude des quartiers populaires de Port-au-Prince. Thèse de doctorat, Université Quisqueya.",
    citationAPA: "Estimé, C. (2023). Sociologie urbaine et dynamiques sociales en Haïti : Étude des quartiers populaires de Port-au-Prince. [Doctoral dissertation, Université Quisqueya].",
    citationMLA: "Estimé, Carole. \"Sociologie urbaine et dynamiques sociales en Haïti : Étude des quartiers populaires de Port-au-Prince.\" Thèse de doctorat, Université Quisqueya, 2023.",
    pages: 315,
    language: "Français",
    relatedWorks: ["1", "7"],
  },
};

export default function ThesisDetail() {
  const { id } = useParams();
  const thesis = thesesDatabase[id || "1"];
  const [selectedCitation, setSelectedCitation] = useState("chicago");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const citationText = 
      selectedCitation === "chicago" ? thesis.citation :
      selectedCitation === "apa" ? thesis.citationAPA :
      thesis.citationMLA;
    
    navigator.clipboard.writeText(citationText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = thesis.title;
    const text = `Découvrez cette thèse intéressante : ${title}`;
    
    switch(platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'email':
        window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + '\n' + url)}`;
        break;
    }
  };

  const relatedTheses = thesis.relatedWorks
    .map((id: string) => thesesDatabase[id])
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/research-portal" className="flex items-center gap-2 hover:opacity-80 transition text-primary">
            <ArrowLeft className="w-5 h-5" />
            <span>Retour au Portail Haïti</span>
          </Link>
          <Button variant="outline" size="sm" onClick={() => window.open(thesis.url, '_blank')}>
            <Download className="w-4 h-4 mr-2" />
            Télécharger
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Title Section */}
        <div className="mb-12">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 leading-tight">{thesis.title}</h1>
              <div className="flex flex-wrap gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span className="font-medium">{thesis.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{thesis.year}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  <span>{thesis.institution}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-sm text-muted-foreground mb-1">Type</div>
                <div className="font-semibold text-primary">{thesis.type}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-sm text-muted-foreground mb-1">Discipline</div>
                <div className="font-semibold text-primary">{thesis.discipline}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-sm text-muted-foreground mb-1">Pages</div>
                <div className="font-semibold text-primary">{thesis.pages}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-sm text-muted-foreground mb-1">Langue</div>
                <div className="font-semibold text-primary">{thesis.language}</div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Abstract */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Quote className="w-5 h-5 text-primary" />
                  Résumé
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed text-lg">{thesis.abstract}</p>
              </CardContent>
            </Card>

            {/* Keywords */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="w-5 h-5 text-primary" />
                  Mots-clés
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {thesis.keywords.map((keyword: string) => (
                    <span
                      key={keyword}
                      className="px-4 py-2 bg-accent text-accent-foreground rounded-full text-sm font-medium hover:shadow-md transition"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Citations */}
            <Card>
              <CardHeader>
                <CardTitle>Citations</CardTitle>
                <CardDescription>Sélectionnez le format de citation préféré</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2 mb-4">
                  {["chicago", "apa", "mla"].map((format) => (
                    <Button
                      key={format}
                      variant={selectedCitation === format ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCitation(format)}
                      className="capitalize"
                    >
                      {format}
                    </Button>
                  ))}
                </div>

                <div className="bg-muted p-4 rounded-lg border border-border">
                  <p className="text-foreground text-sm mb-3 leading-relaxed">
                    {selectedCitation === "chicago" && thesis.citation}
                    {selectedCitation === "apa" && thesis.citationAPA}
                    {selectedCitation === "mla" && thesis.citationMLA}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                    className="w-full"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Copié !
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copier la citation
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Share Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Partager</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare('facebook')}
                    className="flex items-center gap-2 justify-center"
                  >
                    <Facebook className="w-4 h-4" />
                    Facebook
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare('linkedin')}
                    className="flex items-center gap-2 justify-center"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare('twitter')}
                    className="flex items-center gap-2 justify-center"
                  >
                    <Share2 className="w-4 h-4" />
                    Twitter
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare('email')}
                    className="flex items-center gap-2 justify-center"
                  >
                    <Mail className="w-4 h-4" />
                    Email
                  </Button>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  className="w-full"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Lien copié !
                    </>
                  ) : (
                    <>
                      <LinkIcon className="w-4 h-4 mr-2" />
                      Copier le lien
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Related Works */}
            {relatedTheses.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Articles connexes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {relatedTheses.map((related: any) => (
                    <Link
                      key={related.id}
                      href={`/thesis/${related.id}`}
                      className="block p-3 rounded-lg border border-border hover:shadow-md hover:bg-muted transition group"
                    >
                      <div className="font-semibold text-sm text-primary group-hover:underline line-clamp-2">
                        {related.title}
                      </div>
                      <div className="text-xs text-muted-foreground mt-2">
                        {related.author}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {related.year} • {related.discipline}
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Download Section */}
            <Card className="border-2 border-primary">
              <CardHeader>
                <CardTitle className="text-lg">Accès au document</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                  onClick={() => window.open(thesis.url, '_blank')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger le PDF
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Document en libre accès
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
