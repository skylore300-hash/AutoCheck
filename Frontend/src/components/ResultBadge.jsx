const toneClass = {
  Faible: "bg-emerald-100 text-emerald-800",
  Moyen: "bg-amber-100 text-amber-800",
  Eleve: "bg-red-100 text-red-800",
};

export default function ResultBadge({ risk }) {
  const classes = toneClass[risk] || "bg-slate-100 text-slate-800";
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${classes}`}>
      Risque: {risk}
    </span>
  );
}
