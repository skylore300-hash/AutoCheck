import { useState } from "react";
import { SuperAdminLayout } from "../../layouts/SuperAdminLayout";

export default function SuperAdminLogsPage() {
  const [logs] = useState([
    {
      id: 1,
      level: "info",
      action: "Utilisateur créé",
      user: "superadmin@autocheck.cd",
      email: "new.user@autocheck.cd",
      ip: "192.168.1.100",
      timestamp: "2024-03-24 14:32:15",
    },
    {
      id: 2,
      level: "warning",
      action: "Tentative de connexion échouée",
      user: "unknown",
      email: "test@autocheck.cd",
      ip: "192.168.1.101",
      timestamp: "2024-03-24 14:25:42",
    },
    {
      id: 3,
      level: "success",
      action: "Backup effectué",
      user: "system",
      email: "system@autocheck.cd",
      ip: "localhost",
      timestamp: "2024-03-24 14:00:00",
    },
    {
      id: 4,
      level: "error",
      action: "Erreur API",
      user: "superadmin@autocheck.cd",
      email: "user@autocheck.cd",
      ip: "192.168.1.102",
      timestamp: "2024-03-24 13:45:30",
    },
    {
      id: 5,
      level: "info",
      action: "Véhicule modifié",
      user: "admin@autocheck.cd",
      email: "FO-123-ABC",
      ip: "192.168.1.103",
      timestamp: "2024-03-24 13:20:15",
    },
  ]);

  const [filterLevel, setFilterLevel] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLogs = logs.filter((log) => {
    const levelMatch = filterLevel === "all" || log.level === filterLevel;
    const searchMatch =
      searchTerm === "" ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase());
    return levelMatch && searchMatch;
  });

  return (
    <SuperAdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Logs & Audit</h1>
          <p className="text-gray-500 mt-1">
            Historique des activités système ({logs.length} enregistrements)
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            placeholder="Chercher par action ou utilisateur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <div className="flex gap-2">
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
            >
              <option value="all">Tous les niveaux</option>
              <option value="error">❌ Erreur</option>
              <option value="warning">⚠️ Avertissement</option>
              <option value="success">✅ Succès</option>
              <option value="info">ℹ️ Info</option>
            </select>
            <button className="bg-red-700 hover:bg-red-800 text-white font-medium px-4 py-2 rounded-lg transition-colors">
              📥 Exporter
            </button>
          </div>
        </div>

        {/* Logs Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Action
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Utilisateur
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Détails
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    IP
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Timestamp
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredLogs.map((log) => (
                  <LogRow key={log.id} log={log} />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredLogs.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-500">Aucun log trouvé</p>
          </div>
        )}
      </div>
    </SuperAdminLayout>
  );
}

function LogRow({ log }) {
  const levelColors = {
    error: { bg: "bg-red-50", icon: "❌", text: "text-red-800" },
    warning: { bg: "bg-yellow-50", icon: "⚠️", text: "text-yellow-800" },
    success: { bg: "bg-green-50", icon: "✅", text: "text-green-800" },
    info: { bg: "bg-blue-50", icon: "ℹ️", text: "text-blue-800" },
  };

  const level = levelColors[log.level];

  return (
    <tr className={`${level.bg} hover:opacity-75 transition-opacity`}>
      <td className="px-6 py-4 text-sm font-medium text-gray-900">
        <span className="mr-2">{level.icon}</span>
        {log.action}
      </td>
      <td className="px-6 py-4 text-sm text-gray-600">{log.user}</td>
      <td className="px-6 py-4 text-sm text-gray-600">{log.email}</td>
      <td className="px-6 py-4 text-sm text-gray-600 font-mono">{log.ip}</td>
      <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
        {log.timestamp}
      </td>
    </tr>
  );
}
