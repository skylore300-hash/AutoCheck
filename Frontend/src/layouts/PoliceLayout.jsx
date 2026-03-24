import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function PoliceLayout({ children }) {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header mobile */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold text-brand-700">AutoCheck Police</h1>
          <button
            onClick={handleLogout}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="pb-24">{children}</main>

      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around">
        <NavButton
          icon="🔍"
          label="Scanner"
          active
          onClick={() => navigate("/police/scanner")}
        />
        <NavButton
          icon="📋"
          label="Historique"
          onClick={() => navigate("/police/history")}
        />
        <NavButton icon="⚙️" label="Paramètres" onClick={() => navigate("/police/settings")} />
      </nav>
    </div>
  );
}

function NavButton({ icon, label, onClick, active = false }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-3 flex flex-col items-center gap-1 text-xs font-medium transition-colors ${
        active
          ? "text-brand-700 bg-brand-50"
          : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
      }`}
    >
      <span className="text-xl">{icon}</span>
      {label}
    </button>
  );
}
