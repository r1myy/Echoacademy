import { useEffect, useState, useCallback, useRef } from 'react';
import {
  checkAllBlogLinks,
  LinkCheckResult,
  getSummary,
  formatReport,
  clearCache,
} from '@/lib/linkChecker';

export interface LinkMonitoringState {
  isMonitoring: boolean;
  isChecking: boolean;
  lastCheckTime: number | null;
  results: Map<string, LinkCheckResult>;
  summary: {
    total: number;
    ok: number;
    errors: number;
    timeouts: number;
    errorLinks: LinkCheckResult[];
  } | null;
  error: string | null;
}

interface UseLinkMonitoringOptions {
  autoStart?: boolean;
  interval?: number; // en millisecondes
  onError?: (error: string) => void;
  onSuccess?: (summary: LinkMonitoringState['summary']) => void;
}

/**
 * Hook personnalisé pour surveiller les liens du blog
 */
export function useLinkMonitoring(options: UseLinkMonitoringOptions = {}) {
  const {
    autoStart = true,
    interval = 60 * 60 * 1000, // 1 heure par défaut
    onError,
    onSuccess,
  } = options;

  const [state, setState] = useState<LinkMonitoringState>({
    isMonitoring: autoStart,
    isChecking: false,
    lastCheckTime: null,
    results: new Map(),
    summary: null,
    error: null,
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Effectue une vérification des liens
   */
  const checkLinks = useCallback(async () => {
    setState(prev => ({ ...prev, isChecking: true, error: null }));

    try {
      const results = await checkAllBlogLinks();
      const summary = getSummary(results);

      setState(prev => ({
        ...prev,
        isChecking: false,
        lastCheckTime: Date.now(),
        results,
        summary,
        error: null,
      }));

      // Appeler le callback de succès
      if (onSuccess) {
        onSuccess(summary);
      }

      // Afficher le rapport dans la console
      console.log(formatReport(results));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la vérification des liens';
      setState(prev => ({
        ...prev,
        isChecking: false,
        error: errorMessage,
      }));

      if (onError) {
        onError(errorMessage);
      }

      console.error('Erreur lors de la vérification des liens:', err);
    }
  }, [onError, onSuccess]);

  /**
   * Démarre le monitoring automatique
   */
  const startMonitoring = useCallback(() => {
    setState(prev => ({ ...prev, isMonitoring: true }));

    // Effectuer une première vérification immédiatement
    checkLinks();

    // Configurer l'intervalle de vérification
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      checkLinks();
    }, interval);
  }, [checkLinks, interval]);

  /**
   * Arrête le monitoring automatique
   */
  const stopMonitoring = useCallback(() => {
    setState(prev => ({ ...prev, isMonitoring: false }));

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  /**
   * Réinitialise le cache et effectue une nouvelle vérification
   */
  const resetAndCheck = useCallback(() => {
    clearCache();
    checkLinks();
  }, [checkLinks]);

  /**
   * Effet pour démarrer/arrêter le monitoring
   */
  useEffect(() => {
    if (autoStart) {
      startMonitoring();
    }

    return () => {
      stopMonitoring();
    };
  }, [autoStart, startMonitoring, stopMonitoring]);

  return {
    ...state,
    checkLinks,
    startMonitoring,
    stopMonitoring,
    resetAndCheck,
  };
}
