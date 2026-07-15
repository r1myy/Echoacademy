import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowLeft, Download, Share2, Copy, Check, FileText, Users, Calendar, Building2, Tag, Quote } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "wouter";

/**
 * Design Philosophy: Élégance Organique Africaine
 * - Palette: Bleu océan (#1B4965), Jaune soleil (#F4D35E), Rouge passion (#EE964B), Vert jungle (#2D6A4F), Blanc crème (#FFF8F3)
 * - Typography: Crimson Text (titres), Montserrat (sous-titres), Lato (corps)
 * - Formes organiques, courbes fluides, motifs géométriques haïtiens
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
    pages: 178,
    language: "Français",
    relatedWorks: ["1", "2"],
  },
  "6": {
    id: "6",
    title: "Géologie et sismicité de la région de Port-au-Prince : Risques et prévention",
    author: "Jean-Pierre Beaumont",
    year: 2023,
    institution: "Université d'État d'Haïti",
    type: "Mémoire de Maîtrise",
    discipline: "Géologie",
    abstract: "Étude de la géologie et de la sismicité de la région de Port-au-Prince avec focus sur les risques et les stratégies de prévention. La recherche analyse les données sismiques des 50 dernières années et évalue la vulnérabilité des structures existantes. L'étude propose des mesures de renforcement parasismique et un plan d'aménagement du territoire réduisant les risques sismiques.",
    keywords: ["Géologie", "Sismicité", "Risques", "Port-au-Prince", "Prévention"],
    url: "https://example.com/thesis/jean-pierre-beaumont-2023",
    citation: "Beaumont, J.-P. (2023). Géologie et sismicité de la région de Port-au-Prince : Risques et prévention. Mémoire de maîtrise, Université d'État d'Haïti.",
    citationAPA: "Beaumont, J.-P. (2023). Géologie et sismicité de la région de Port-au-Prince : Risques et prévention. [Master's thesis, Université d'État d'Haïti].",
    citationMLA: "Beaumont, Jean-Pierre. \"Géologie et sismicité de la région de Port-au-Prince : Risques et prévention.\" Mémoire de maîtrise, Université d'État d'Haïti, 2023.",
    pages: 201,
    language: "Français",
    relatedWorks: ["2", "7"],
  },
  "7": {
    id: "7",
    title: "Qualité de l'eau potable et santé publique en Haïti",
    author: "Pape Gueye",
    year: 2022,
    institution: "Université Quisqueya",
    type: "Mémoire de Maîtrise",
    discipline: "Chimie Analytique",
    abstract: "Analyse de la qualité de l'eau potable en Haïti et son impact sur la santé publique. L'étude teste 200 échantillons d'eau provenant de différentes régions et identifie les contaminants majeurs. La recherche évalue les risques sanitaires et propose des solutions de traitement adaptées au contexte haïtien. Les résultats mettent en évidence l'urgence d'améliorer l'infrastructure d'approvisionnement en eau.",
    keywords: ["Eau potable", "Qualité", "Santé publique", "Chimie", "Contaminants"],
    url: "https://example.com/thesis/pape-gueye-2022",
    citation: "Gueye, P. (2022). Qualité de l'eau potable et santé publique en Haïti. Mémoire de maîtrise, Université Quisqueya.",
    citationAPA: "Gueye, P. (2022). Qualité de l'eau potable et santé publique en Haïti. [Master's thesis, Université Quisqueya].",
    citationMLA: "Gueye, Pape. \"Qualité de l'eau potable et santé publique en Haïti.\" Mémoire de maîtrise, Université Quisqueya, 2022.",
    pages: 189,
    language: "Français",
    relatedWorks: ["1", "5"],
  },
  "8": {
    id: "8",
    title: "Histoire de l'éducation en Haïti : Évolution et perspectives",
    author: "Laënnec Hurbon",
    year: 2021,
    institution: "GRAHN-Monde",
    type: "Thèse de Doctorat",
    discipline: "Histoire",
    abstract: "Étude historique complète de l'évolution de l'éducation en Haïti et ses perspectives futures. La recherche examine les systèmes éducatifs depuis l'indépendance et analyse les réformes majeures. L'étude identifie les défis actuels et propose une vision pour l'amélioration de l'éducation haïtienne. Les résultats soulignent l'importance de l'éducation pour le développement socio-économique d'Haïti.",
    keywords: ["Histoire", "Éducation", "Haïti", "Évolution", "Réformes éducatives"],
    url: "https://example.com/thesis/laennec-hurbon-2021",
    citation: "Hurbon, L. (2021). Histoire de l'éducation en Haïti : Évolution et perspectives. Thèse de doctorat, GRAHN-Monde.",
    citationAPA: "Hurbon, L. (2021). Histoire de l'éducation en Haïti : Évolution et perspectives. [Doctoral dissertation, GRAHN-Monde].",
    citationMLA: "Hurbon, Laënnec. \"Histoire de l'éducation en Haïti : Évolution et perspectives.\" Thèse de doctorat, GRAHN-Monde, 2021.",
    pages: 267,
    language: "Français",
    relatedWorks: ["3", "4"],
  },
};

export default function ThesisDetail() {
  const { id } = useParams();
  const [copied, setCopied] = useState(false);
  const [selectedCitation, setSelectedCitation] = useState("chicago");

  const thesis = thesesDatabase[id || "1"];

  if (!thesis) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/research-portal" className="flex items-center gap-2 hover:opacity-80 transition">
              <ArrowLeft className="w-5 h-5" />
              <span>Retour</span>
            </Link>
          </div>
        </header>
        <main className="container mx-auto px-4 py-12">
          <Card className="text-center">
            <CardContent className="pt-12">
              <p className="text-lg text-muted-foreground mb-4">Mémoire ou thèse non trouvé</p>
              <Link href="/research-portal">
                <Button>Retour au Portail Haïti</Button>
              </Link>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  const handleCopy = () => {
    const citations: Record<string, string> = {
      chicago: thesis.citation,
      apa: thesis.citationAPA,
      mla: thesis.citationMLA,
    };
    navigator.clipboard.writeText(citations[selectedCitation]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => window.open(thesis.url, '_blank')}>
              <Download className="w-4 h-4 mr-2" />
              Télécharger
            </Button>
            <Button variant="outline" size="sm" onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}>
              <Share2 className="w-4 h-4 mr-2" />
              Partager
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Title Section */}
        <div className="mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-primary mb-4">{thesis.title}</h1>
              <div className="flex flex-wrap gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{thesis.author}</span>
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
                <div className="font-semibold">{thesis.type}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-sm text-muted-foreground mb-1">Discipline</div>
                <div className="font-semibold">{thesis.discipline}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-sm text-muted-foreground mb-1">Pages</div>
                <div className="font-semibold">{thesis.pages}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-sm text-muted-foreground mb-1">Langue</div>
                <div className="font-semibold">{thesis.language}</div>
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
                <p className="text-foreground leading-relaxed">{thesis.abstract}</p>
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
                      className="px-3 py-1 bg-accent text-foreground rounded-full text-sm font-medium"
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

                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-foreground text-sm mb-3">
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
            {/* Related Works */}
            {relatedTheses.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Travaux connexes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {relatedTheses.map((related: any) => (
                    <Link
                      key={related.id}
                      href={`/thesis/${related.id}`}
                      className="block p-3 rounded-lg border border-border hover:bg-accent transition"
                    >
                      <div className="font-semibold text-sm text-primary hover:underline">
                        {related.title}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {related.author} ({related.year})
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
                  className="w-full bg-primary hover:bg-primary/90"
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
