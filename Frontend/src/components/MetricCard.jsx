export default function MetricCard({ label, value, hint }) {
  return (
    <div className="rounded-2xl border border-ink/10 bg-white/75 p-4">
      <p className="text-xs uppercase tracking-[0.14em] text-ink/60">{label}</p>
      <p className="mt-2 text-2xl font-bold text-ink">{value}</p>
      {hint && <p className="mt-1 text-xs text-ink/70">{hint}</p>}
    </div>
  );
}
