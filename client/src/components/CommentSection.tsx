import { useState } from "react";
import { MessageCircle, Send, Heart, Reply, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

/**
 * Design Philosophy: Université Contemporaine
 * - Palette: Bleu nuit (#1a2f4a), Vert sauge (#7fb069), Blanc cassé (#f5f3f0)
 * - Typography: Playfair Display (titres), Inter (corps)
 * - Layout: Moderne, accessible, équilibré
 */

interface Comment {
  id: string;
  author: string;
  email: string;
  content: string;
  date: string;
  likes: number;
  replies: Comment[];
  liked?: boolean;
}

interface CommentSectionProps {
  articleId: string;
  articleTitle: string;
}

export default function CommentSection({ articleId, articleTitle }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: "Dr. Marie Dubois",
      email: "marie.dubois@university.ht",
      content: "Excellent article ! Les perspectives présentées sur la recherche haïtienne sont très pertinentes et bien documentées. J'aimerais en savoir plus sur les solutions proposées.",
      date: "2024-05-20",
      likes: 12,
      liked: false,
      replies: [
        {
          id: "1-1",
          author: "Dr. Jean-Claude Beauvoir",
          email: "jc.beauvoir@university.ht",
          content: "Merci Dr. Dubois ! Les solutions sont détaillées dans la section 3 de l'article. N'hésitez pas à nous contacter pour une discussion plus approfondie.",
          date: "2024-05-20",
          likes: 5,
          liked: false,
          replies: []
        }
      ]
    },
    {
      id: "2",
      author: "Prof. Frantz Voltaire",
      email: "f.voltaire@university.ht",
      content: "Une analyse très complète. Je recommande cet article à tous mes étudiants. C'est exactement le type de contenu dont nous avons besoin pour inspirer la prochaine génération de chercheurs.",
      date: "2024-05-19",
      likes: 18,
      liked: false,
      replies: []
    }
  ]);

  const [newComment, setNewComment] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Aujourd'hui";
    if (diffDays === 1) return "Hier";
    if (diffDays < 7) return `Il y a ${diffDays} jours`;
    return date.toLocaleDateString("fr-FR");
  };

  const handleAddComment = () => {
    if (!newComment.trim() || !authorName.trim() || !authorEmail.trim()) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    const comment: Comment = {
      id: Date.now().toString(),
      author: authorName,
      email: authorEmail,
      content: newComment,
      date: new Date().toISOString().split("T")[0],
      likes: 0,
      liked: false,
      replies: []
    };

    setComments([comment, ...comments]);
    setNewComment("");
    setAuthorName("");
    setAuthorEmail("");
  };

  const handleAddReply = (commentId: string) => {
    if (!replyContent.trim() || !authorName.trim() || !authorEmail.trim()) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    const reply: Comment = {
      id: Date.now().toString(),
      author: authorName,
      email: authorEmail,
      content: replyContent,
      date: new Date().toISOString().split("T")[0],
      likes: 0,
      liked: false,
      replies: []
    };

    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [reply, ...comment.replies]
          };
        }
        return comment;
      })
    );

    setReplyContent("");
    setReplyingTo(null);
  };

  const handleLike = (commentId: string) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
            liked: !comment.liked
          };
        }
        return comment;
      })
    );
  };

  const CommentItem = ({ comment, depth = 0 }: { comment: Comment; depth?: number }) => (
    <div className={`${depth > 0 ? "ml-4 md:ml-8 border-l-2 border-primary/20 pl-4" : ""}`}>
      <Card className="border border-border rounded-lg mb-4">
        <CardContent className="pt-6">
          {/* Comment Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-primary">{comment.author}</p>
                <p className="text-xs text-muted-foreground">{formatDate(comment.date)}</p>
              </div>
            </div>
          </div>

          {/* Comment Content */}
          <p className="text-sm text-foreground mb-4 leading-relaxed">{comment.content}</p>

          {/* Comment Actions */}
          <div className="flex items-center gap-4 text-sm">
            <button
              onClick={() => handleLike(comment.id)}
              className={`flex items-center gap-1 transition-colors ${
                comment.liked
                  ? "text-accent"
                  : "text-muted-foreground hover:text-accent"
              }`}
            >
              <Heart className={`w-4 h-4 ${comment.liked ? "fill-current" : ""}`} />
              <span>{comment.likes}</span>
            </button>
            <button
              onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
              className="flex items-center gap-1 text-muted-foreground hover:text-accent transition-colors"
            >
              <Reply className="w-4 h-4" />
              <span>Répondre</span>
            </button>
          </div>

          {/* Reply Form */}
          {replyingTo === comment.id && (
            <div className="mt-4 pt-4 border-t border-border space-y-3">
              <Input
                placeholder="Votre nom"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="text-sm"
              />
              <Input
                type="email"
                placeholder="Votre email"
                value={authorEmail}
                onChange={(e) => setAuthorEmail(e.target.value)}
                className="text-sm"
              />
              <textarea
                placeholder="Votre réponse..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                rows={3}
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="bg-accent hover:bg-accent/90 gap-2"
                  onClick={() => handleAddReply(comment.id)}
                >
                  <Send className="w-4 h-4" />
                  Envoyer
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setReplyingTo(null)}
                >
                  Annuler
                </Button>
              </div>
            </div>
          )}

          {/* Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-4 space-y-3">
              {comment.replies.map((reply) => (
                <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  return (
    <section className="py-12 border-t border-border">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8">
          <MessageCircle className="w-6 h-6 text-accent" />
          <h2 className="text-2xl md:text-3xl font-bold text-primary">
            Commentaires ({comments.length})
          </h2>
        </div>

        {/* Add Comment Form */}
        <Card className="border border-border rounded-lg mb-8 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-lg">Ajouter un commentaire</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Votre nom"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="text-sm"
            />
            <Input
              type="email"
              placeholder="Votre email"
              value={authorEmail}
              onChange={(e) => setAuthorEmail(e.target.value)}
              className="text-sm"
            />
            <textarea
              placeholder="Partagez vos pensées sur cet article..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              rows={4}
            />
            <div className="flex gap-2">
              <Button
                className="bg-accent hover:bg-accent/90 gap-2"
                onClick={handleAddComment}
              >
                <Send className="w-4 h-4" />
                Publier le commentaire
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setNewComment("");
                  setAuthorName("");
                  setAuthorEmail("");
                }}
              >
                Réinitialiser
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Comments List */}
        <div className="space-y-4">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))
          ) : (
            <Card className="border border-border rounded-lg">
              <CardContent className="py-8 text-center text-muted-foreground">
                <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>Aucun commentaire pour le moment. Soyez le premier à commenter !</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Community Guidelines */}
        <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <p className="text-xs text-muted-foreground">
            <strong>Directives communautaires :</strong> Veuillez être respectueux, éviter le spam et les contenus offensants. Les commentaires sont modérés et peuvent être supprimés s'ils ne respectent pas ces directives.
          </p>
        </div>
      </div>
    </section>
  );
}
