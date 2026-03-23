import ResultBadge from "../components/ResultBadge";
import { useVerification } from "../context/VerificationContext";
import { formatDateTime } from "../utils/format";

export default function AlertsPage() {
  const { history } = useVerification();

  const alerts = history.filter((item) => item.risk === "Eleve" || item.status === "A verifier");

  return (
    <div className="space-y-5">
      <header>
        <h2 className="font-display text-3xl">Alertes prioritaires</h2>
        <p className="mt-1 text-sm text-ink/70">
          Liste des dossiers a traiter en urgence par l'administration.
        </p>
      </header>

      {alerts.length === 0 && (
        <article className="rounded-2xl border border-ink/10 bg-paper p-6 text-sm text-ink/70">
          Aucune alerte active. Les derniers controles sont stables.
        </article>
      )}

      <div className="grid gap-3">
        {alerts.map((item) => (
          <article key={item.id} className="rounded-2xl border border-red-200 bg-red-50 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-semibold text-red-900">{item.query}</p>
              <ResultBadge risk={item.risk} />
            </div>
            <p className="mt-1 text-sm text-red-900/80">
              {item.kind === "vehicle" ? "Vehicule" : "Document"} · {item.city} · {item.status}
            </p>
            <p className="mt-1 text-xs text-red-900/70">{formatDateTime(item.createdAt)}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
