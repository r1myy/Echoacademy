import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Linkedin, MessageCircle, Mail, Share2 } from "lucide-react";
import { useState } from "react";

interface ShareButtonsProps {
  title: string;
  url: string;
  description?: string;
  author?: string;
  variant?: "default" | "compact" | "icon-only";
  previewImage?: string;
}

/**
 * Composant de partage sur les réseaux sociaux
 * Supporte : Facebook, Twitter, LinkedIn, WhatsApp, Email
 * Utilise les URLs de partage officielles de chaque plateforme
 */
export default function ShareButtons({
  title,
  url,
  description = "",
  author = "",
  variant = "default",
  previewImage = "",
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  // Encoder les paramètres pour les URLs
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);
  const encodedText = encodeURIComponent(`${title}${description ? " - " + description : ""}`);

  // URLs de partage pour chaque plateforme
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}${author ? `&via=${encodeURIComponent(author)}` : ""}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
  };

  // Fonction pour copier le lien
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Fonction pour ouvrir le lien de partage
  const openShareLink = (link: string) => {
    window.open(link, "share", "width=600,height=400");
  };

  if (variant === "icon-only") {
    return (
      <div className="flex flex-col gap-3">
        {previewImage && (
          <div className="rounded-lg overflow-hidden border border-border shadow-sm">
            <img
              src={previewImage}
              alt="Prévisualisation du document"
              className="w-full h-auto max-h-40 object-cover"
            />
          </div>
        )}
        <div className="flex items-center gap-2">
        <button
          onClick={() => openShareLink(shareLinks.facebook)}
          className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
          title="Partager sur Facebook"
          aria-label="Partager sur Facebook"
        >
          <Facebook className="w-5 h-5" />
        </button>
        <button
          onClick={() => openShareLink(shareLinks.twitter)}
          className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
          title="Partager sur Twitter"
          aria-label="Partager sur Twitter"
        >
          <Twitter className="w-5 h-5" />
        </button>
        <button
          onClick={() => openShareLink(shareLinks.linkedin)}
          className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
          title="Partager sur LinkedIn"
          aria-label="Partager sur LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
        </button>
        <button
          onClick={() => openShareLink(shareLinks.whatsapp)}
          className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
          title="Partager sur WhatsApp"
          aria-label="Partager sur WhatsApp"
        >
          <MessageCircle className="w-5 h-5" />
        </button>
        <button
          onClick={() => openShareLink(shareLinks.email)}
          className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
          title="Partager par email"
          aria-label="Partager par email"
        >
          <Mail className="w-5 h-5" />
        </button>
        <button
          onClick={copyToClipboard}
          className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
          title={copied ? "Copié!" : "Copier le lien"}
          aria-label="Copier le lien"
        >
          <Share2 className="w-5 h-5" />
        </button>
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className="flex items-center gap-2 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          onClick={() => openShareLink(shareLinks.facebook)}
          className="gap-2 text-xs"
        >
          <Facebook className="w-4 h-4" />
          Facebook
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => openShareLink(shareLinks.twitter)}
          className="gap-2 text-xs"
        >
          <Twitter className="w-4 h-4" />
          Twitter
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => openShareLink(shareLinks.linkedin)}
          className="gap-2 text-xs"
        >
          <Linkedin className="w-4 h-4" />
          LinkedIn
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => openShareLink(shareLinks.whatsapp)}
          className="gap-2 text-xs"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => openShareLink(shareLinks.email)}
          className="gap-2 text-xs"
        >
          <Mail className="w-4 h-4" />
          Email
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={copyToClipboard}
          className="gap-2 text-xs"
        >
          <Share2 className="w-4 h-4" />
          {copied ? "Copié!" : "Copier"}
        </Button>
      </div>
    );
  }

  // Variante par défaut : boutons complets
  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-foreground">Partager ce document</p>
      <div className="flex items-center gap-3 flex-wrap">
        <Button
          variant="outline"
          onClick={() => openShareLink(shareLinks.facebook)}
          className="gap-2"
        >
          <Facebook className="w-4 h-4" />
          Facebook
        </Button>
        <Button
          variant="outline"
          onClick={() => openShareLink(shareLinks.twitter)}
          className="gap-2"
        >
          <Twitter className="w-4 h-4" />
          Twitter
        </Button>
        <Button
          variant="outline"
          onClick={() => openShareLink(shareLinks.linkedin)}
          className="gap-2"
        >
          <Linkedin className="w-4 h-4" />
          LinkedIn
        </Button>
        <Button
          variant="outline"
          onClick={() => openShareLink(shareLinks.whatsapp)}
          className="gap-2"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </Button>
        <Button
          variant="outline"
          onClick={() => openShareLink(shareLinks.email)}
          className="gap-2"
        >
          <Mail className="w-4 h-4" />
          Email
        </Button>
        <Button
          variant="outline"
          onClick={copyToClipboard}
          className="gap-2"
        >
          <Share2 className="w-4 h-4" />
          {copied ? "Copié!" : "Copier le lien"}
        </Button>
      </div>
    </div>
  );
}
