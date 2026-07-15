import { useState } from "react";
import { Mail, Check, AlertCircle } from "lucide-react";

/**
 * Design Philosophy: Moderne Minimaliste
 * - Palette: Noir profond, blanc pur, bleu marine, or subtil
 * - Typography: Geist (corps), Playfair Display (titres)
 * - Animations fluides et micro-interactions sophistiquées
 */

type SubscriptionStatus = "idle" | "loading" | "success" | "error";

export default function NewsletterSubscribe() {
  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<SubscriptionStatus>("idle");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      setMessage("Veuillez entrer une adresse email valide.");
      return;
    }

    setStatus("loading");

    // Simulate API call - in production, this would send to a backend
    setTimeout(() => {
      // Simulate success
      setStatus("success");
      setMessage("Merci de votre abonnement ! Vous recevrez bientôt nos actualités.");
      setEmail("");

      // Reset after 5 seconds
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 5000);
    }, 1000);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1 relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            <input
              type="email"
              placeholder="Votre adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading" || status === "success"}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-200 disabled:opacity-50"
              aria-label="Adresse email pour la newsletter"
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="px-6 py-3 rounded-lg bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            aria-label="S'abonner à la newsletter"
          >
            {status === "loading" ? "Abonnement..." : "S'abonner"}
          </button>
        </div>

        {/* Status Messages */}
        {status === "success" && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 animate-fade-in-up">
            <Check className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm">{message}</p>
          </div>
        )}

        {status === "error" && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 animate-fade-in-up">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm">{message}</p>
          </div>
        )}
      </form>

      <p className="text-xs text-muted-foreground mt-3">
        Nous respectons votre confidentialité. Désinscrivez-vous à tout moment.
      </p>
    </div>
  );
}
