import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = login(email, password);
      // Rediriger vers le dashboard du rôle
      navigate(`/${user.role}/dashboard`);
    } catch (err) {
      setError(err.message || "Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (demoEmail) => {
    const demoPass = {
      "police@autocheck.cd": "police123",
      "admin@autocheck.cd": "admin123",
      "owner@autocheck.cd": "owner123",
      "superadmin@autocheck.cd": "superadmin123",
    }[demoEmail];

    setEmail(demoEmail);
    setPassword(demoPass);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-blue-50 flex items-center justify-center p-4">
      {/* Décoration orbes */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-brand-900 mb-2">AutoCheck</h1>
          <p className="text-gray-600">Système de Vérification Automobile</p>
        </div>

        {/* Card Login */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/50">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Connexion</h2>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                placeholder="votre@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-700 hover:bg-brand-800 disabled:bg-gray-400 text-white font-medium py-2 rounded-lg transition-colors"
            >
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm">Démo</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Demo Users */}
          <div className="space-y-2">
            <p className="text-xs text-gray-600 text-center mb-3">Comptes de démonstration :</p>

            <button
              type="button"
              onClick={() => handleDemoLogin("police@autocheck.cd")}
              className="w-full p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200"
            >
              <div className="font-medium text-blue-900">👮 Police Routière</div>
              <div className="text-xs text-blue-700">police@autocheck.cd</div>
            </button>

            <button
              type="button"
              onClick={() => handleDemoLogin("admin@autocheck.cd")}
              className="w-full p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors border border-green-200"
            >
              <div className="font-medium text-green-900">🏢 Agent Administratif</div>
              <div className="text-xs text-green-700">admin@autocheck.cd</div>
            </button>

            <button
              type="button"
              onClick={() => handleDemoLogin("owner@autocheck.cd")}
              className="w-full p-3 text-left bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors border border-purple-200"
            >
              <div className="font-medium text-purple-900">🚗 Propriétaire</div>
              <div className="text-xs text-purple-700">owner@autocheck.cd</div>
            </button>

            <button
              type="button"
              onClick={() => handleDemoLogin("superadmin@autocheck.cd")}
              className="w-full p-3 text-left bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-200"
            >
              <div className="font-medium text-red-900">🛠️ Super Administrateur</div>
              <div className="text-xs text-red-700">superadmin@autocheck.cd</div>
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-xs mt-6">
          © 2024 AutoCheck - Système d'administration automobile
        </p>
      </div>
    </div>
  );
}
