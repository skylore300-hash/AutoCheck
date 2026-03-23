import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="rounded-2xl border border-ink/10 bg-paper p-6">
      <h2 className="font-display text-3xl">Page introuvable</h2>
      <p className="mt-2 text-sm text-ink/70">La route demandee n'existe pas dans cette version frontend.</p>
      <Link to="/" className="mt-4 inline-flex rounded-xl bg-ink px-4 py-2 text-sm font-semibold text-white">
        Retour au tableau de bord
      </Link>
    </div>
  );
}
