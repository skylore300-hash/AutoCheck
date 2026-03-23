import MetricCard from "../components/MetricCard";
import { useVerification } from "../context/VerificationContext";
import { toCsv } from "../utils/format";

export default function ReportsPage() {
  const { history } = useVerification();

  const byCity = history.reduce((acc, item) => {
    acc[item.city] = (acc[item.city] || 0) + 1;
    return acc;
  }, {});

  const byType = history.reduce(
    (acc, item) => {
      acc[item.kind] += 1;
      return acc;
    },
    { vehicle: 0, document: 0 }
  );

  const highRisk = history.filter((item) => item.risk === "Eleve").length;

  const exportCsv = () => {
    const csv = toCsv(history);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "autocheck-report.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-3xl">Rapports</h2>
          <p className="mt-1 text-sm text-ink/70">Synthese operationnelle exploitable par votre backend.</p>
        </div>
        <button
          type="button"
          onClick={exportCsv}
          className="rounded-xl bg-ink px-4 py-2 text-sm font-semibold text-white"
        >
          Exporter CSV
        </button>
      </header>

      <section className="grid gap-4 md:grid-cols-4">
        <MetricCard label="Total controles" value={history.length} />
        <MetricCard label="Vehicules" value={byType.vehicle} />
        <MetricCard label="Documents" value={byType.document} />
        <MetricCard label="Risque eleve" value={highRisk} />
      </section>

      <section className="rounded-2xl border border-ink/10 bg-paper p-5">
        <h3 className="text-lg font-semibold">Repartition par ville</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {Object.keys(byCity).length === 0 && (
            <p className="text-sm text-ink/70">Aucune donnee disponible.</p>
          )}
          {Object.entries(byCity).map(([city, count]) => (
            <div key={city} className="rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm">
              <div className="flex items-center justify-between">
                <span>{city}</span>
                <strong>{count}</strong>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
