import { useState } from "react";
import { Link } from "wouter";
import { BookOpen, ArrowRight, Calendar, Building2, Tag, Search, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import NewsletterSubscribe from "@/components/NewsletterSubscribe";
import CommentSection from "@/components/CommentSection";

/**
 * Design Philosophy: Moderne Minimaliste
 * - Palette: Noir profond, blanc pur, bleu marine, or subtil
 * - Typography: Geist (corps), Playfair Display (titres)
 * - Animations fluides et micro-interactions sophistiquées
 */

// Blog posts database
const blogPostsDatabase = [
  {
    id: "1",
    title: "Université Quisqueya lance un nouveau programme de recherche en santé publique",
    excerpt: "L'Université Quisqueya annonce le lancement d'un programme de recherche interdisciplinaire visant à améliorer l'accès aux services de santé en Haïti.",
    content: "L'Université Quisqueya a annoncé le lancement d'un nouveau programme de recherche en santé publique qui réunira des chercheurs de plusieurs disciplines. Ce programme vise à développer des solutions innovantes pour améliorer l'accès aux services de santé dans les zones rurales d'Haïti.",
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
    content: "GHESKIO organise une conférence internationale de trois jours réunissant des experts en santé mentale du monde entier. Cette conférence portera sur les approches innovantes pour améliorer l'accès aux services de santé mentale dans les contextes de ressources limitées.",
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
    content: "L'Université d'État d'Haïti a été sélectionnée pour recevoir une subvention de recherche importante destinée à financer un projet de trois ans sur la conservation de la biodiversité. Ce projet impliquera des chercheurs locaux et internationaux.",
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
    content: "L'Université Quisqueya organise un colloque international réunissant des chercheurs, des décideurs politiques et des acteurs de la société civile pour discuter des stratégies visant à améliorer l'égalité des genres dans l'éducation.",
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
    content: "Dans le cadre d'une initiative visant à renforcer la collaboration académique, plusieurs universités haïtiennes ont signé des accords de partenariat avec des institutions de recherche internationales. Ces partenariats faciliteront l'échange de chercheurs et d'étudiants.",
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
    content: "Une équipe d'archéologues de l'Université d'État d'Haïti a annoncé la découverte de plusieurs artefacts importants qui fournissent de nouvelles perspectives sur l'histoire précoloniale et coloniale d'Haïti. Ces découvertes seront exposées au musée national.",
    date: "2024-04-08",
    institution: "Université d'État d'Haïti",
    category: "Découverte",
    author: "Dr. Alain Beauvoir",
    image: "https://images.unsplash.com/photo-1578926078328-123456789012?w=600&h=400&fit=crop",
  },
  {
    id: "7",
    title: "Agriculture durable : nouveaux projets pilotes en Haïti",
    excerpt: "L'Université d'État d'Haïti lance plusieurs projets pilotes visant à promouvoir l'agriculture durable et la sécurité alimentaire dans les zones rurales.",
    content: "L'Université d'État d'Haïti a lancé une série de projets pilotes en partenariat avec les communautés locales pour tester et promouvoir les pratiques d'agriculture durable. Ces projets visent à améliorer la sécurité alimentaire tout en protégeant l'environnement.",
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
    content: "Une nouvelle anthologie de la littérature haïtienne contemporaine a été publiée par un collectif de chercheurs haïtiens et internationaux. Cette anthologie met en avant les voix des auteurs haïtiens modernes et leur contribution à la littérature mondiale.",
    date: "2024-04-01",
    institution: "Université de Montréal",
    category: "Publication",
    author: "Edwidge Danticat",
    image: "https://images.unsplash.com/photo-1507842217343-583f20270319?w=600&h=400&fit=crop",
  },
];

type BlogCategory = "Tous" | "Recherche" | "Événement" | "Financement" | "Partenariat" | "Découverte" | "Projet" | "Publication";

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory>("Tous");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories: BlogCategory[] = ["Tous", "Recherche", "Événement", "Financement", "Partenariat", "Découverte", "Projet", "Publication"];

  // Filter posts based on category and search query
  const getFilteredPosts = () => {
    let posts = blogPostsDatabase;

    // Apply category filter
    if (selectedCategory !== "Tous") {
      posts = posts.filter((post) => post.category === selectedCategory);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      posts = posts.filter((post) => {
        const titleMatch = post.title.toLowerCase().includes(query);
        const excerptMatch = post.excerpt.toLowerCase().includes(query);
        const institutionMatch = post.institution.toLowerCase().includes(query);
        const authorMatch = post.author.toLowerCase().includes(query);
        return titleMatch || excerptMatch || institutionMatch || authorMatch;
      });
    }

    return posts;
  };

  const filteredPosts = getFilteredPosts();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-accent" />
            <h1 className="text-4xl font-bold text-foreground">Echo Blog</h1>
          </div>
          <p className="text-lg text-muted-foreground mb-8">
            Actualités et nouvelles des institutions universitaires et de recherche haïtiennes
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Rechercher par titre, institution ou auteur..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-200"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Effacer la recherche"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Category Filter */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-4">Catégories</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-8">
            {selectedCategory === "Tous" ? "Toutes les actualités" : `Actualités - ${selectedCategory}`}
          </h2>

          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  {/* Featured Image */}
                  <div className="h-48 overflow-hidden bg-muted">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Tag className="w-4 h-4 text-accent" />
                      <span className="text-sm font-medium text-accent">{post.category}</span>
                    </div>
                    <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(post.date).toLocaleDateString("fr-FR")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        <span>{post.institution}</span>
                      </div>
                    </div>

                    <Link href={`/blog/${post.id}`} className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-medium transition-colors">
                      Lire l'article
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    
                    {/* Comments Preview */}
                    <div className="pt-4 border-t border-border">
                      <CommentSection articleId={post.id} articleTitle={post.title} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">Aucun article trouvé pour cette recherche.</p>
            </div>
          )}
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 p-8 rounded-lg bg-card border border-border">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-foreground mb-2">Restez informé</h2>
            <p className="text-muted-foreground mb-6">
              Abonnez-vous à notre newsletter pour recevoir les dernières actualités des institutions universitaires et de recherche haïtiennes directement dans votre boîte de réception.
            </p>
            <NewsletterSubscribe />
          </div>
        </div>
      </div>
    </div>
  );
}
