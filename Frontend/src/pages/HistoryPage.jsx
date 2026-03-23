import ResultBadge from "../components/ResultBadge";
import { useVerification } from "../context/VerificationContext";
import { formatDateTime } from "../utils/format";

export default function HistoryPage() {
  const { history, clearHistory } = useVerification();

  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-3xl">Historique des controles</h2>
          <p className="mt-1 text-sm text-ink/70">Traçabilite locale des verifications effectuees.</p>
        </div>
        <button
          type="button"
          onClick={clearHistory}
          className="rounded-xl border border-ink/20 px-4 py-2 text-sm font-semibold"
        >
          Vider l'historique
        </button>
      </header>

      {history.length === 0 && (
        <article className="rounded-2xl border border-ink/10 bg-paper p-6 text-sm text-ink/70">
          Aucun enregistrement pour le moment.
        </article>
      )}

      <div className="grid gap-3">
        {history.map((item) => (
          <article key={item.id} className="rounded-2xl border border-ink/10 bg-paper p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-semibold">{item.query}</p>
              <ResultBadge risk={item.risk} />
            </div>
            <p className="mt-1 text-sm text-ink/75">
              {item.kind === "vehicle" ? "Vehicule" : "Document"} · {item.city} · {item.status}
            </p>
            <p className="mt-1 text-xs text-ink/60">{formatDateTime(item.createdAt)}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
