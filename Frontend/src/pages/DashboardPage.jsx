import { Link } from "react-router-dom";
import MetricCard from "../components/MetricCard";
import ResultBadge from "../components/ResultBadge";
import { useVerification } from "../context/VerificationContext";
import { formatDateTime } from "../utils/format";

export default function DashboardPage() {
  const { history } = useVerification();

  const vehicleCount = history.filter((item) => item.kind === "vehicle").length;
  const documentCount = history.filter((item) => item.kind === "document").length;
  const highRiskCount = history.filter((item) => item.risk === "Eleve").length;
  const latest = history.slice(0, 4);

  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <p className="inline-flex rounded-full bg-stamp px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em]">
          AutoCheck Hub
        </p>
        <h2 className="font-display text-4xl leading-tight">Vue operationnelle</h2>
        <p className="max-w-3xl text-sm text-ink/70 md:text-base">
          Espace central pour suivre les controles vehicules et documents avant validation
          definitive par votre backend.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-4">
        <MetricCard label="Controles totaux" value={history.length} />
        <MetricCard label="Vehicules" value={vehicleCount} />
        <MetricCard label="Documents" value={documentCount} />
        <MetricCard label="Risque eleve" value={highRiskCount} hint="A verifier rapidement" />
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-2xl border border-ink/10 bg-paper p-5">
          <h3 className="text-lg font-semibold">Actions rapides</h3>
          <div className="mt-4 grid gap-3">
            <Link
              to="/verification/vehicule"
              className="rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-white"
            >
              Verifier un vehicule
            </Link>
            <Link
              to="/verification/document"
              className="rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-white"
            >
              Verifier un document
            </Link>
            <Link
              to="/rapports"
              className="rounded-xl border border-ink/20 px-4 py-3 text-sm font-semibold"
            >
              Ouvrir les rapports
            </Link>
          </div>
        </article>

        <article className="rounded-2xl border border-ink/10 bg-paper p-5">
          <h3 className="text-lg font-semibold">Dernieres verifications</h3>
          {latest.length === 0 && (
            <p className="mt-3 text-sm text-ink/70">Aucune verification pour le moment.</p>
          )}
          <div className="mt-3 space-y-3">
            {latest.map((item) => (
              <div key={item.id} className="rounded-xl border border-ink/10 bg-white p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold">{item.query}</p>
                  <ResultBadge risk={item.risk} />
                </div>
                <p className="mt-1 text-xs text-ink/70">
                  {item.kind === "vehicle" ? "Vehicule" : "Document"} · {item.city} · {item.status}
                </p>
                <p className="mt-1 text-xs text-ink/60">{formatDateTime(item.createdAt)}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
