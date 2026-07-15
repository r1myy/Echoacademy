import { useState, useEffect, useCallback } from 'react';

export interface DocumentStats {
  views: number;
  downloads: number;
  lastViewed: string;
  lastDownloaded?: string;
}

export interface DocumentStatsRecord {
  [documentId: string]: DocumentStats;
}

const STATS_STORAGE_KEY = 'echo_academy_document_stats';
const DOCUMENT_VIEWS_KEY = 'echo_academy_document_views';

/**
 * Hook pour gérer les statistiques de consultation et téléchargement des documents
 * Utilise localStorage pour la persistance des données
 */
export function useDocumentStats() {
  const [stats, setStats] = useState<DocumentStatsRecord>({});

  // Charger les statistiques depuis localStorage au montage
  useEffect(() => {
    const savedStats = localStorage.getItem(STATS_STORAGE_KEY);
    if (savedStats) {
      try {
        setStats(JSON.parse(savedStats));
      } catch (error) {
        console.error('Erreur lors du chargement des statistiques:', error);
      }
    }
  }, []);

  // Sauvegarder les statistiques dans localStorage
  const saveStats = useCallback((newStats: DocumentStatsRecord) => {
    try {
      localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(newStats));
      setStats(newStats);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des statistiques:', error);
    }
  }, []);

  // Enregistrer une consultation
  const recordView = useCallback((documentId: string) => {
    setStats((prevStats) => {
      const updated = { ...prevStats };
      const current = updated[documentId] || { views: 0, downloads: 0, lastViewed: '' };
      
      updated[documentId] = {
        ...current,
        views: current.views + 1,
        lastViewed: new Date().toISOString(),
      };

      saveStats(updated);
      return updated;
    });
  }, [saveStats]);

  // Enregistrer un téléchargement
  const recordDownload = useCallback((documentId: string) => {
    setStats((prevStats) => {
      const updated = { ...prevStats };
      const current = updated[documentId] || { views: 0, downloads: 0, lastViewed: '' };
      
      updated[documentId] = {
        ...current,
        downloads: current.downloads + 1,
        lastDownloaded: new Date().toISOString(),
      };

      saveStats(updated);
      return updated;
    });
  }, [saveStats]);

  // Obtenir les statistiques d'un document
  const getDocumentStats = useCallback((documentId: string): DocumentStats => {
    return stats[documentId] || { views: 0, downloads: 0, lastViewed: '' };
  }, [stats]);

  // Obtenir les documents les plus consultés
  const getMostViewed = useCallback((limit: number = 10) => {
    return Object.entries(stats)
      .sort(([, a], [, b]) => b.views - a.views)
      .slice(0, limit)
      .map(([id, stat]) => ({ id, ...stat }));
  }, [stats]);

  // Obtenir les documents les plus téléchargés
  const getMostDownloaded = useCallback((limit: number = 10) => {
    return Object.entries(stats)
      .sort(([, a], [, b]) => b.downloads - a.downloads)
      .slice(0, limit)
      .map(([id, stat]) => ({ id, ...stat }));
  }, [stats]);

  // Obtenir les documents les plus populaires (combinaison views + downloads)
  const getMostPopular = useCallback((limit: number = 10) => {
    return Object.entries(stats)
      .map(([id, stat]) => ({
        id,
        ...stat,
        popularity: stat.views + stat.downloads * 2, // Poids plus élevé pour les téléchargements
      }))
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, limit);
  }, [stats]);

  // Réinitialiser les statistiques (pour le développement)
  const resetStats = useCallback(() => {
    localStorage.removeItem(STATS_STORAGE_KEY);
    setStats({});
  }, []);

  // Obtenir toutes les statistiques
  const getAllStats = useCallback(() => stats, [stats]);

  return {
    stats,
    recordView,
    recordDownload,
    getDocumentStats,
    getMostViewed,
    getMostDownloaded,
    getMostPopular,
    resetStats,
    getAllStats,
  };
}
