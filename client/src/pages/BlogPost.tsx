import { Link, useParams } from "wouter";
import { ArrowLeft, Calendar, Building2, Tag, User } from "lucide-react";
import CommentSection from "@/components/CommentSection";
import { blogPostsDatabase } from "@/data/blogPosts";
import NotFound from "@/pages/NotFound";

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const post = blogPostsDatabase.find((p) => p.id === id);

  if (!post) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Link href="/blog" className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-medium transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Retour au blog
        </Link>

        <div className="h-64 md:h-96 overflow-hidden rounded-lg bg-muted mb-8">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Tag className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium text-accent">{post.category}</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">{post.title}</h1>

        <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{new Date(post.date).toLocaleDateString("fr-FR")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            <span>{post.institution}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{post.author}</span>
          </div>
        </div>

        <div className="prose prose-lg max-w-none text-foreground mb-12">
          <p className="leading-relaxed">{post.content}</p>
        </div>

        <div className="pt-8 border-t border-border">
          <CommentSection articleId={post.id} articleTitle={post.title} />
        </div>
      </div>
    </div>
  );
}
