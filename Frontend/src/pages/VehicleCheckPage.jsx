import { useState } from "react";
import ResultBadge from "../components/ResultBadge";
import { useVerification } from "../context/VerificationContext";
import { checkVehicle } from "../services/autocheckApi";

export default function VehicleCheckPage() {
  const { addVerification } = useVerification();
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("Kinshasa");
  const [reason, setReason] = useState("Achat");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await checkVehicle({ query, city, reason });
      const record = {
        id: crypto.randomUUID(),
        kind: "vehicle",
        query,
        city,
        status: response.status,
        risk: response.risk,
        details: response,
        createdAt: new Date().toISOString(),
      };
      setResult(record);
      addVerification(record);
    } catch (err) {
      setError(err.message || "Erreur inattendue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <header>
        <h2 className="font-display text-3xl">Verification vehicule</h2>
        <p className="mt-1 text-sm text-ink/70">Controle VIN ou plaque avec retour statut et risque.</p>
      </header>

      <div className="grid gap-5 md:grid-cols-[1fr_0.95fr]">
        <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-ink/10 bg-paper p-5">
          <Field label="VIN ou plaque">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              required
              placeholder="Ex: AB-123-CD ou WVWZZZ..."
              className="w-full rounded-xl border border-ink/15 px-3 py-2.5 text-sm"
            />
          </Field>

          <Field label="Ville">
            <select
              value={city}
              onChange={(event) => setCity(event.target.value)}
              className="w-full rounded-xl border border-ink/15 px-3 py-2.5 text-sm"
            >
              <option>Kinshasa</option>
              <option>Lubumbashi</option>
              <option>Goma</option>
              <option>Mbuji-Mayi</option>
            </select>
          </Field>

          <Field label="Motif">
            <select
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              className="w-full rounded-xl border border-ink/15 px-3 py-2.5 text-sm"
            >
              <option>Achat</option>
              <option>Controle routier</option>
              <option>Mise a jour dossier</option>
            </select>
          </Field>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-white disabled:opacity-70"
          >
            {loading ? "Verification en cours..." : "Verifier maintenant"}
          </button>
          {error && <p className="text-sm text-red-700">{error}</p>}
        </form>

        <article className="rounded-2xl border border-ink/10 bg-white p-5">
          <h3 className="text-lg font-semibold">Resultat</h3>
          {!result && <p className="mt-3 text-sm text-ink/70">Aucun resultat pour l'instant.</p>}

          {result && (
            <div className="mt-4 space-y-3 text-sm">
              <p className="font-semibold">{result.query}</p>
              <ResultBadge risk={result.risk} />
              <Info label="Statut" value={result.status} />
              <Info label="Proprietaire" value={result.details.owner} />
              <Info label="Accidents" value={result.details.accidents} />
              <Info label="Message" value={result.details.message} />
            </div>
          )}
        </article>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink/80">{label}</span>
      {children}
    </label>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-lg border border-ink/10 bg-paper px-3 py-2">
      <p className="text-xs uppercase tracking-[0.13em] text-ink/60">{label}</p>
      <p className="mt-1">{value}</p>
    </div>
  );
}
