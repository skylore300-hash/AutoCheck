import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function AdminLayout({ children }) {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-brand-700">AutoCheck</h1>
          <p className="text-sm text-gray-500 mt-1">Admin Administratif</p>
        </div>

        <nav className="p-4 space-y-2">
          <NavLink
            icon="📊"
            label="Dashboard"
            href="/admin/dashboard"
            navigate={navigate}
          />
          <NavLink
            icon="🚗"
            label="Gestion Véhicules"
            href="/admin/vehicles"
            navigate={navigate}
          />
          <NavLink
            icon="📄"
            label="Gestion Documents"
            href="/admin/documents"
            navigate={navigate}
          />
          <NavLink
            icon="⚠️"
            label="Alertes"
            href="/admin/alerts"
            navigate={navigate}
          />
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="bg-gray-50 rounded-lg p-3 mb-3">
            <p className="text-sm font-medium text-gray-900">{currentUser?.name}</p>
            <p className="text-xs text-gray-500">{currentUser?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full py-2 px-3 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-sm font-medium transition-colors"
          >
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 p-6">{children}</main>
    </div>
  );
}

function NavLink({ icon, label, href, navigate }) {
  return (
    <button
      onClick={() => navigate(href)}
      className="w-full text-left px-4 py-2 rounded-lg hover:bg-brand-50 text-gray-700 hover:text-brand-700 transition-colors flex items-center gap-3"
    >
      <span className="text-lg">{icon}</span>
      {label}
    </button>
  );
}
