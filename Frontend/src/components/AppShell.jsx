import { NavLink, Outlet } from "react-router-dom";

const navItems = [
  { to: "/", label: "Tableau de bord" },
  { to: "/verification/vehicule", label: "Verification vehicule" },
  { to: "/verification/document", label: "Verification document" },
  { to: "/historique", label: "Historique" },
  { to: "/alertes", label: "Alertes" },
  { to: "/rapports", label: "Rapports" },
];

export default function AppShell() {
  return (
    <main className="min-h-screen bg-canvas text-ink">
      <div className="orb orb-left" />
      <div className="orb orb-right" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-4 py-5 md:grid-cols-[260px_1fr] md:px-8 md:py-8">
        <aside className="rounded-3xl border border-ink/10 bg-paper/85 p-4 backdrop-blur-md md:sticky md:top-6 md:h-fit">
          <h1 className="font-display text-2xl">AutoCheck</h1>
          <p className="mt-1 text-xs text-ink/65">Verification vehicules et documents</p>

          <nav className="mt-5 grid gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `rounded-xl px-3 py-2 text-sm font-medium transition ${
                    isActive ? "bg-ink text-white" : "bg-white/60 text-ink hover:bg-stamp"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <section className="rounded-3xl border border-ink/10 bg-white/85 p-5 shadow-[0_30px_80px_rgba(15,23,42,0.08)] md:p-8">
          <Outlet />
        </section>
      </div>
    </main>
  );
}
