/**
 * Link Checker Utility
 * Vérifie l'intégrité des liens dans l'application
 */

export interface LinkCheckResult {
  url: string;
  status: 'ok' | 'error' | 'timeout' | 'unknown';
  statusCode?: number;
  message?: string;
  timestamp: number;
}

export interface BlogLink {
  id: string;
  title: string;
  url: string;
  type: 'article' | 'category' | 'search' | 'external';
}

// Cache pour éviter les vérifications répétées
const linkCheckCache = new Map<string, LinkCheckResult>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Vérifie si un lien est accessible
 */
export async function checkLink(url: string): Promise<LinkCheckResult> {
  // Vérifier le cache
  const cached = linkCheckCache.get(url);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached;
  }

  const result: LinkCheckResult = {
    url,
    status: 'unknown',
    timestamp: Date.now(),
  };

  try {
    // Pour les liens internes, vérifier avec une requête HEAD
    if (url.startsWith('/')) {
      const response = await fetch(url, {
        method: 'HEAD',
        mode: 'no-cors',
      });
      
      if (response.ok || response.status === 404) {
        result.status = response.ok ? 'ok' : 'error';
        result.statusCode = response.status;
        result.message = response.statusText;
      } else {
        result.status = 'error';
        result.statusCode = response.status;
        result.message = response.statusText;
      }
    } else {
      // Pour les liens externes, utiliser une simple vérification
      result.status = 'ok';
      result.message = 'Lien externe (non vérifié)';
    }
  } catch (error) {
    result.status = 'timeout';
    result.message = error instanceof Error ? error.message : 'Erreur de vérification';
  }

  // Mettre en cache le résultat
  linkCheckCache.set(url, result);
  return result;
}

/**
 * Vérifie plusieurs liens en parallèle
 */
export async function checkMultipleLinks(urls: string[]): Promise<LinkCheckResult[]> {
  const promises = urls.map(url => checkLink(url));
  return Promise.all(promises);
}

/**
 * Génère la liste des liens du blog à vérifier
 */
export function generateBlogLinks(): BlogLink[] {
  const links: BlogLink[] = [];

  // Liens principaux du blog
  links.push({
    id: 'blog-home',
    title: 'Page d\'accueil du blog',
    url: '/blog',
    type: 'article',
  });

  // Liens des articles (1-8)
  for (let i = 1; i <= 8; i++) {
    links.push({
      id: `blog-article-${i}`,
      title: `Article ${i}`,
      url: `/blog/${i}`,
      type: 'article',
    });
  }

  // Liens des catégories
  const categories = ['Tous', 'Recherche', 'Événement', 'Financement', 'Partenariat', 'Découverte', 'Projet', 'Publication'];
  categories.forEach(category => {
    links.push({
      id: `blog-category-${category.toLowerCase()}`,
      title: `Catégorie: ${category}`,
      url: `/blog?category=${encodeURIComponent(category)}`,
      type: 'category',
    });
  });

  return links;
}

/**
 * Vérifie tous les liens du blog
 */
export async function checkAllBlogLinks(): Promise<Map<string, LinkCheckResult>> {
  const blogLinks = generateBlogLinks();
  const results = new Map<string, LinkCheckResult>();

  for (const link of blogLinks) {
    const result = await checkLink(link.url);
    results.set(link.id, result);
  }

  return results;
}

/**
 * Obtient un résumé des erreurs de liens
 */
export function getSummary(results: Map<string, LinkCheckResult>): {
  total: number;
  ok: number;
  errors: number;
  timeouts: number;
  errorLinks: LinkCheckResult[];
} {
  let ok = 0;
  let errors = 0;
  let timeouts = 0;
  const errorLinks: LinkCheckResult[] = [];

  results.forEach(result => {
    if (result.status === 'ok') {
      ok++;
    } else if (result.status === 'error') {
      errors++;
      errorLinks.push(result);
    } else if (result.status === 'timeout') {
      timeouts++;
      errorLinks.push(result);
    }
  });

  return {
    total: results.size,
    ok,
    errors,
    timeouts,
    errorLinks,
  };
}

/**
 * Formate un rapport de vérification des liens
 */
export function formatReport(results: Map<string, LinkCheckResult>): string {
  const summary = getSummary(results);
  let report = `\n📊 Rapport de Vérification des Liens du Blog\n`;
  report += `${'='.repeat(50)}\n`;
  report += `Total: ${summary.total} | ✅ OK: ${summary.ok} | ❌ Erreurs: ${summary.errors} | ⏱️ Timeouts: ${summary.timeouts}\n`;
  report += `${'='.repeat(50)}\n`;

  if (summary.errorLinks.length > 0) {
    report += `\n⚠️ Liens avec Erreurs:\n`;
    summary.errorLinks.forEach(link => {
      report += `  - ${link.url} (${link.status}) - ${link.message}\n`;
    });
  } else {
    report += `\n✅ Tous les liens sont fonctionnels!\n`;
  }

  return report;
}

/**
 * Efface le cache
 */
export function clearCache(): void {
  linkCheckCache.clear();
}
