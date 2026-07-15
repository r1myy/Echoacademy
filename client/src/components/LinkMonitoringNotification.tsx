import { useCallback, useEffect, useState } from 'react';
import { AlertCircle, CheckCircle2, X } from 'lucide-react';
import { useLinkMonitoring } from '@/hooks/useLinkMonitoring';

/**
 * Composant de notification pour les erreurs de liens
 * Affiche les résultats de la surveillance des liens du blog
 */
export default function LinkMonitoringNotification() {
  const [showNotification, setShowNotification] = useState(false);
  const [expandDetails, setExpandDetails] = useState(false);

  // onSuccess/onError must stay referentially stable: useLinkMonitoring's
  // effect depends (transitively) on them, so a new function each render
  // re-triggers the effect and causes an infinite update loop.
  const handleSuccess = useCallback((summary: { errors: number } | null) => {
    if (summary && summary.errors > 0) {
      setShowNotification(true);
    }
  }, []);

  const handleError = useCallback((error: string) => {
    console.error('Erreur de monitoring:', error);
  }, []);

  const monitoring = useLinkMonitoring({
    autoStart: true,
    interval: 60 * 60 * 1000, // Vérifier toutes les heures
    onSuccess: handleSuccess,
    onError: handleError,
  });

  // Masquer automatiquement la notification après 10 secondes si pas d'erreurs
  useEffect(() => {
    if (showNotification && monitoring.summary && monitoring.summary.errors === 0) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [showNotification, monitoring.summary]);

  if (!showNotification || !monitoring.summary) {
    return null;
  }

  const hasErrors = monitoring.summary.errors > 0 || monitoring.summary.timeouts > 0;
  const bgColor = hasErrors ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200';
  const textColor = hasErrors ? 'text-red-800' : 'text-green-800';
  const iconColor = hasErrors ? 'text-red-500' : 'text-green-500';

  return (
    <div className={`fixed bottom-4 right-4 max-w-md border rounded-lg shadow-lg p-4 ${bgColor} z-50 animate-in slide-in-from-bottom-4`}>
      <div className="flex items-start gap-3">
        {hasErrors ? (
          <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconColor}`} />
        ) : (
          <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconColor}`} />
        )}

        <div className="flex-1">
          <h3 className={`font-semibold ${textColor} mb-1`}>
            {hasErrors ? 'Erreurs détectées' : 'Tous les liens sont OK'}
          </h3>

          <p className={`text-sm ${textColor} mb-2`}>
            {monitoring.summary.total} liens vérifiés: {monitoring.summary.ok} ✅
            {monitoring.summary.errors > 0 && ` | ${monitoring.summary.errors} ❌`}
            {monitoring.summary.timeouts > 0 && ` | ${monitoring.summary.timeouts} ⏱️`}
          </p>

          {hasErrors && (
            <button
              onClick={() => setExpandDetails(!expandDetails)}
              className={`text-sm font-medium ${textColor} hover:underline mb-2`}
            >
              {expandDetails ? 'Masquer détails' : 'Voir détails'}
            </button>
          )}

          {expandDetails && monitoring.summary.errorLinks.length > 0 && (
            <div className={`mt-2 pt-2 border-t ${hasErrors ? 'border-red-200' : 'border-green-200'}`}>
              <p className={`text-xs font-semibold ${textColor} mb-1`}>Liens avec erreurs:</p>
              <ul className={`text-xs ${textColor} space-y-1`}>
                {monitoring.summary.errorLinks.slice(0, 5).map((link, idx) => (
                  <li key={idx} className="break-words">
                    • {link.url} ({link.status})
                  </li>
                ))}
                {monitoring.summary.errorLinks.length > 5 && (
                  <li className="text-xs italic">
                    ... et {monitoring.summary.errorLinks.length - 5} autres
                  </li>
                )}
              </ul>
            </div>
          )}

          <p className={`text-xs ${textColor} opacity-75 mt-2`}>
            Dernière vérification: {monitoring.lastCheckTime ? new Date(monitoring.lastCheckTime).toLocaleTimeString('fr-FR') : 'En cours...'}
          </p>
        </div>

        <button
          onClick={() => setShowNotification(false)}
          className={`flex-shrink-0 ${textColor} hover:opacity-70 transition-opacity`}
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {monitoring.isChecking && (
        <div className="mt-2 pt-2 border-t border-opacity-20 border-current">
          <p className={`text-xs ${textColor} animate-pulse`}>Vérification en cours...</p>
        </div>
      )}
    </div>
  );
}
