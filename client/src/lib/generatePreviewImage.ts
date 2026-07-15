/**
 * Service de génération d'images de prévisualisation pour le partage social
 * Génère des images uniques avec les métadonnées du document
 */

interface PreviewImageOptions {
  title: string;
  author: string;
  discipline: string;
  year: number;
  institution: string;
  type: 'Mémoire' | 'Recherche' | 'Thèse';
}

/**
 * Génère une image de prévisualisation en utilisant Canvas
 * Les images sont générées côté client et converties en data URL
 */
export function generatePreviewImage(options: PreviewImageOptions): string {
  const canvas = document.createElement('canvas');
  const width = 1200;
  const height = 630;
  
  canvas.width = width;
  canvas.height = height;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  
  // Gradient de fond (bleu nuit à vert sauge)
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#1a2f4a');
  gradient.addColorStop(1, '#7fb069');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  // Ajouter un motif de texture subtile
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
  for (let i = 0; i < 100; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const size = Math.random() * 3;
    ctx.fillRect(x, y, size, size);
  }
  
  // Logo/Badge type de document
  const badgeY = 50;
  const badgeX = 50;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.fillRect(badgeX, badgeY, 200, 50);
  
  ctx.fillStyle = '#f5f3f0';
  ctx.font = 'bold 16px Geist';
  ctx.textAlign = 'left';
  ctx.fillText(options.type.toUpperCase(), badgeX + 15, badgeY + 32);
  
  // Année
  ctx.fillStyle = 'rgba(245, 243, 240, 0.8)';
  ctx.font = '14px Geist';
  ctx.textAlign = 'right';
  ctx.fillText(`${options.year}`, width - 50, badgeY + 32);
  
  // Titre principal
  ctx.fillStyle = '#f5f3f0';
  ctx.font = 'bold 48px Playfair Display';
  ctx.textAlign = 'left';
  
  // Wrapper le texte du titre
  const titleLines = wrapText(ctx, options.title, width - 100, 48);
  let titleY = 150;
  titleLines.slice(0, 3).forEach((line, index) => {
    ctx.fillText(line, 50, titleY + index * 60);
  });
  
  // Ligne séparatrice
  ctx.strokeStyle = '#7fb069';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(50, titleY + 180);
  ctx.lineTo(width - 50, titleY + 180);
  ctx.stroke();
  
  // Auteur et institution
  ctx.fillStyle = '#f5f3f0';
  ctx.font = 'bold 18px Geist';
  ctx.textAlign = 'left';
  ctx.fillText(`Par ${options.author}`, 50, titleY + 230);
  
  ctx.fillStyle = 'rgba(245, 243, 240, 0.9)';
  ctx.font = '16px Geist';
  ctx.fillText(options.institution, 50, titleY + 270);
  
  // Discipline
  ctx.fillStyle = 'rgba(245, 243, 240, 0.8)';
  ctx.font = '14px Geist';
  ctx.fillText(`Discipline: ${options.discipline}`, 50, titleY + 310);
  
  // Logo/Branding en bas
  ctx.fillStyle = 'rgba(245, 243, 240, 0.6)';
  ctx.font = 'bold 20px Playfair Display';
  ctx.textAlign = 'right';
  ctx.fillText('Echo Academy', width - 50, height - 40);
  
  ctx.fillStyle = 'rgba(245, 243, 240, 0.4)';
  ctx.font = '12px Geist';
  ctx.fillText('Plateforme de Recherche Haïtienne', width - 50, height - 15);
  
  // Convertir le canvas en data URL
  return canvas.toDataURL('image/png', 0.95);
}

/**
 * Wrapper le texte pour qu'il tienne dans une largeur donnée
 */
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  fontSize: number
): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';
  
  words.forEach((word) => {
    const testLine = currentLine + (currentLine ? ' ' : '') + word;
    const metrics = ctx.measureText(testLine);
    
    if (metrics.width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  });
  
  if (currentLine) {
    lines.push(currentLine);
  }
  
  return lines;
}

/**
 * Cache les images générées en mémoire et localStorage
 */
const previewCache = new Map<string, string>();
const STORAGE_PREFIX = 'echo-preview-';
const CACHE_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 jours

/**
 * Génère ou récupère une image de prévisualisation du cache
 */
export function getOrGeneratePreviewImage(
  documentId: string,
  options: PreviewImageOptions
): string {
  const cacheKey = `preview-${documentId}`;
  
  // Vérifier le cache en mémoire
  if (previewCache.has(cacheKey)) {
    return previewCache.get(cacheKey)!;
  }
  
  // Vérifier le localStorage
  try {
    const storageKey = STORAGE_PREFIX + documentId;
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      const { data, timestamp } = JSON.parse(stored);
      // Vérifier si le cache n'a pas expiré
      if (Date.now() - timestamp < CACHE_EXPIRY) {
        previewCache.set(cacheKey, data);
        return data;
      } else {
        localStorage.removeItem(storageKey);
      }
    }
  } catch (e) {
    // Ignorer les erreurs de localStorage
  }
  
  // Générer une nouvelle image
  const imageDataUrl = generatePreviewImage(options);
  previewCache.set(cacheKey, imageDataUrl);
  
  // Sauvegarder dans localStorage
  try {
    const storageKey = STORAGE_PREFIX + documentId;
    localStorage.setItem(
      storageKey,
      JSON.stringify({
        data: imageDataUrl,
        timestamp: Date.now(),
      })
    );
  } catch (e) {
    // Ignorer les erreurs de localStorage (quota dépassé, etc.)
  }
  
  return imageDataUrl;
}

/**
 * Convertit une data URL en blob pour le téléchargement ou l'upload
 */
export function dataUrlToBlob(dataUrl: string): Blob {
  const parts = dataUrl.split(',');
  const mimeType = parts[0].match(/:(.*?);/)?.[1] || 'image/png';
  const bstr = atob(parts[1]);
  const n = bstr.length;
  const u8arr = new Uint8Array(n);
  
  for (let i = 0; i < n; i++) {
    u8arr[i] = bstr.charCodeAt(i);
  }
  
  return new Blob([u8arr], { type: mimeType });
}

/**
 * Crée une URL blob à partir d'une data URL
 */
export function dataUrlToBlobUrl(dataUrl: string): string {
  const blob = dataUrlToBlob(dataUrl);
  return URL.createObjectURL(blob);
}
