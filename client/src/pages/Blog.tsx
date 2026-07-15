import { useState } from "react";
import { Link } from "wouter";
import { BookOpen, ArrowRight, Calendar, Building2, Tag, Search, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import NewsletterSubscribe from "@/components/NewsletterSubscribe";
import CommentSection from "@/components/CommentSection";
import { blogPostsDatabase } from "@/data/blogPosts";

/**
 * Design Philosophy: Moderne Minimaliste
 * - Palette: Noir profond, blanc pur, bleu marine, or subtil
 * - Typography: Geist (corps), Playfair Display (titres)
 * - Animations fluides et micro-interactions sophistiquées
 */

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
