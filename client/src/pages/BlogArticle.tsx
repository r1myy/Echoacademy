import { useParams, Link } from "wouter";
import { BookOpen, ArrowLeft, Calendar, Building2, User, Share2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CommentSection from "@/components/CommentSection";
import ShareButtons from "@/components/ShareButtons";

/**
 * Design Philosophy: Moderne Minimaliste
 * - Palette: Noir profond, blanc pur, bleu marine, or subtil
 * - Typography: Geist (corps), Playfair Display (titres)
 * - Animations fluides et micro-interactions sophistiquées
 */

// Blog posts database - same as in Blog.tsx
const blogPostsDatabase = [
  {
    id: "1",
    title: "Université Quisqueya lance un nouveau programme de recherche en santé publique",
    excerpt: "L'Université Quisqueya annonce le lancement d'un programme de recherche interdisciplinaire visant à améliorer l'accès aux services de santé en Haïti.",
    content: "L'Université Quisqueya a annoncé le lancement d'un nouveau programme de recherche en santé publique qui réunira des chercheurs de plusieurs disciplines. Ce programme vise à développer des solutions innovantes pour améliorer l'accès aux services de santé dans les zones rurales d'Haïti.\n\nLe programme comprendra trois axes de recherche principaux :\n\n1. **Accès aux services de santé** : Étudier les barrières à l'accès aux services de santé et développer des stratégies pour les surmonter.\n\n2. **Santé maternelle et infantile** : Améliorer les résultats en matière de santé maternelle et infantile dans les zones rurales.\n\n3. **Maladies infectieuses** : Développer des approches novatrices pour la prévention et le traitement des maladies infectieuses.\n\nCe programme bénéficiera d'un financement de 500 000 dollars sur cinq ans et impliquera des partenariats avec des institutions internationales.",
    date: "2024-04-20",
    institution: "Université Quisqueya",
    category: "Recherche",
    author: "Dr. Marie-Josée Dufour",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop",
  },
  {
    id: "2",
    title: "GHESKIO organise une conférence internationale sur la santé mentale",
    excerpt: "GHESKIO accueillera une conférence internationale réunissant des experts en santé mentale pour discuter des défis spécifiques au contexte caribéen.",
    content: "GHESKIO organise une conférence internationale de trois jours réunissant des experts en santé mentale du monde entier. Cette conférence portera sur les approches innovantes pour améliorer l'accès aux services de santé mentale dans les contextes de ressources limitées.\n\nLa conférence comprendra :\n\n- Des présentations plénières de leaders mondiaux en santé mentale\n- Des ateliers interactifs sur les meilleures pratiques\n- Des discussions sur les défis spécifiques au contexte caribéen\n- Des opportunités de réseautage pour les professionnels de la santé mentale\n\nLa conférence se tiendra du 15 au 17 mai 2024 à Port-au-Prince.",
    date: "2024-04-18",
    institution: "GHESKIO",
    category: "Événement",
    author: "Dr. Jean-Claude Toussaint",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
  },
  {
    id: "3",
    title: "Université d'État d'Haïti reçoit une subvention pour la recherche en écologie",
    excerpt: "L'Université d'État d'Haïti a reçu une subvention majeure pour financer un projet de recherche sur la conservation de la biodiversité de la Chaîne de la Selle.",
    content: "L'Université d'État d'Haïti a été sélectionnée pour recevoir une subvention de recherche importante destinée à financer un projet de trois ans sur la conservation de la biodiversité. Ce projet impliquera des chercheurs locaux et internationaux.\n\nLe projet se concentrera sur :\n\n- L'étude des écosystèmes uniques de la Chaîne de la Selle\n- La documentation des espèces endémiques et menacées\n- Le développement de stratégies de conservation\n- L'engagement des communautés locales dans la protection de la biodiversité\n\nCette subvention de 250 000 dollars permettra de former une nouvelle génération de chercheurs en écologie haïtienne.",
    date: "2024-04-15",
    institution: "Université d'État d'Haïti",
    category: "Financement",
    author: "Pierre Dufour",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop",
  },
  {
    id: "4",
    title: "Colloque sur l'éducation et l'égalité des genres en Haïti",
    excerpt: "Un colloque international se tiendra à l'Université Quisqueya pour discuter des défis et opportunités pour l'égalité des genres dans l'éducation haïtienne.",
    content: "L'Université Quisqueya organise un colloque international réunissant des chercheurs, des décideurs politiques et des acteurs de la société civile pour discuter des stratégies visant à améliorer l'égalité des genres dans l'éducation.\n\nLe colloque abordera :\n\n- Les défis actuels de l'égalité des genres dans l'éducation haïtienne\n- Les meilleures pratiques internationales\n- Les stratégies de politique éducative\n- L'engagement des parties prenantes\n\nCe colloque se tiendra du 25 au 27 mai 2024.",
    date: "2024-04-12",
    institution: "Université Quisqueya",
    category: "Événement",
    author: "Dr. Sylvie Moreau",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
  },
  {
    id: "5",
    title: "Nouvelle initiative de partenariat entre universités haïtiennes et internationales",
    excerpt: "Plusieurs universités haïtiennes ont signé des accords de partenariat avec des institutions internationales pour renforcer la collaboration en recherche et en enseignement.",
    content: "Dans le cadre d'une initiative visant à renforcer la collaboration académique, plusieurs universités haïtiennes ont signé des accords de partenariat avec des institutions de recherche internationales. Ces partenariats faciliteront l'échange de chercheurs et d'étudiants.\n\nLes universités impliquées :\n\n- Université d'État d'Haïti\n- Université Quisqueya\n- Université de Montréal\n- Université de Paris\n\nCes partenariats ouvriront de nouvelles opportunités pour la recherche collaborative et l'enseignement supérieur en Haïti.",
    date: "2024-04-10",
    institution: "Universités haïtiennes",
    category: "Partenariat",
    author: "Équipe de coordination",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
  },
  {
    id: "6",
    title: "Archéologie haïtienne : découvertes importantes à Port-au-Prince",
    excerpt: "Des archéologues haïtiens ont découvert des artefacts importants qui éclairent la préhistoire et l'histoire coloniale d'Haïti.",
    content: "Une équipe d'archéologues de l'Université d'État d'Haïti a annoncé la découverte de plusieurs artefacts importants qui fournissent de nouvelles perspectives sur l'histoire précoloniale et coloniale d'Haïti. Ces découvertes seront exposées au musée national.\n\nLes découvertes incluent :\n\n- Des poteries taïno datant de 500 ans\n- Des outils en pierre préhistoriques\n- Des artefacts coloniaux\n\nCes découvertes contribueront à une meilleure compréhension de l'histoire haïtienne et de la culture taïno.",
    date: "2024-04-08",
    institution: "Université d'État d'Haïti",
    category: "Découverte",
    author: "Dr. Alain Beauvoir",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
  },
  {
    id: "7",
    title: "Agriculture durable : nouveaux projets pilotes en Haïti",
    excerpt: "L'Université d'État d'Haïti lance plusieurs projets pilotes visant à promouvoir l'agriculture durable et la sécurité alimentaire dans les zones rurales.",
    content: "L'Université d'État d'Haïti a lancé une série de projets pilotes en partenariat avec les communautés locales pour tester et promouvoir les pratiques d'agriculture durable. Ces projets visent à améliorer la sécurité alimentaire tout en protégeant l'environnement.\n\nLes projets incluent :\n\n- L'agroforesterie\n- L'agriculture biologique\n- La gestion de l'eau\n- La conservation des sols\n\nCes initiatives bénéficieront directement à plus de 5 000 agriculteurs dans les zones rurales.",
    date: "2024-04-05",
    institution: "Université d'État d'Haïti",
    category: "Projet",
    author: "Dr. Jean-Pierre Leclerc",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&h=400&fit=crop",
  },
  {
    id: "8",
    title: "Littérature haïtienne : nouvelle anthologie de chercheurs haïtiens",
    excerpt: "Une nouvelle anthologie de la littérature haïtienne contemporaine a été publiée, mettant en avant les voix des auteurs haïtiens contemporains.",
    content: "Une nouvelle anthologie de la littérature haïtienne contemporaine a été publiée par un collectif de chercheurs haïtiens et internationaux. Cette anthologie met en avant les voix des auteurs haïtiens modernes et leur contribution à la littérature mondiale.\n\nL'anthologie comprend :\n\n- Des extraits d'œuvres littéraires haïtiennes contemporaines\n- Des essais critiques\n- Des interviews d'auteurs\n- Une bibliographie complète\n\nCette anthologie sera utilisée dans les universités du monde entier pour enseigner la littérature haïtienne.",
    date: "2024-04-01",
    institution: "Université de Montréal",
    category: "Publication",
    author: "Edwidge Danticat",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&h=400&fit=crop",
  },
];

export default function BlogArticle() {
  const params = useParams();
  const articleId = params.id;
  
  const article = blogPostsDatabase.find((post) => post.id === articleId);

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Article non trouvé</h1>
          <p className="text-muted-foreground mb-6">L'article que vous recherchez n'existe pas.</p>
          <Link href="/blog" className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-medium">
            <ArrowLeft className="w-4 h-4" />
            Retour au blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-medium mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Retour au blog
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-accent" />
            <span className="text-sm font-medium text-accent bg-accent/10 px-3 py-1 rounded-full">
              {article.category}
            </span>
          </div>
          
          <h1 className="text-4xl font-bold text-foreground mb-4">{article.title}</h1>
          
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(article.date).toLocaleDateString("fr-FR")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              <span>{article.institution}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{article.author}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Featured Image */}
            <div className="mb-8 rounded-lg overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-96 object-cover"
              />
            </div>

            {/* Article Content */}
            <Card className="mb-8">
              <CardContent className="pt-6">
                <div className="prose prose-sm max-w-none text-foreground">
                  {article.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Share Section */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="w-5 h-5" />
                  Partager cet article
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ShareButtons
                  title={article.title}
                  url={window.location.href}
                  description={article.excerpt}
                  author={article.author}
                  variant="compact"
                />
              </CardContent>
            </Card>

            {/* Comments Section */}
            <Card>
              <CardHeader>
                <CardTitle>Commentaires</CardTitle>
              </CardHeader>
              <CardContent>
                <CommentSection articleId={article.id} articleTitle={article.title} />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Article Info Card */}
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-lg">À propos de cet article</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Catégorie</h3>
                  <p className="text-sm text-muted-foreground">{article.category}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Institution</h3>
                  <p className="text-sm text-muted-foreground">{article.institution}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Auteur</h3>
                  <p className="text-sm text-muted-foreground">{article.author}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Date de publication</h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(article.date).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
