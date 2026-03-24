import { useState } from "react";
import { AdminLayout } from "../../layouts/AdminLayout";

export default function AdminAlertsPage() {
  const [alerts] = useState([
    {
      id: 1,
      type: "Véhicule volé",
      plate: "FO-456-DEF",
      owner: "Unknown",
      severity: "high",
      date: "2024-03-24 14:32",
      status: "active",
    },
    {
      id: 2,
      type: "Permis expiré",
      plate: "FO-123-ABC",
      owner: "Jean Proprietaire",
      severity: "medium",
      date: "2024-03-24 12:15",
      status: "active",
    },
    {
      id: 3,
      type: "Assurance non valide",
      plate: "FO-789-GHI",
      owner: "Pierre Banda",
      severity: "medium",
      date: "2024-03-23 10:45",
      status: "resolved",
    },
    {
      id: 4,
      type: "Contrôle technique expiré",
      plate: "FO-999-ZZZ",
      owner: "Marie Dupont",
      severity: "low",
      date: "2024-03-22 09:30",
      status: "resolved",
    },
  ]);

  const [filterStatus, setFilterStatus] = useState("active");

  const filteredAlerts = alerts.filter((a) =>
    filterStatus === "all" ? true : a.status === filterStatus
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Alertes</h1>
          <p className="text-gray-500 mt-1">
            {filteredAlerts.length} alerte(s) - Gestion des problèmes détectés
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilterStatus("active")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterStatus === "active"
                ? "bg-red-700 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            🔴 Actives ({alerts.filter((a) => a.status === "active").length})
          </button>
          <button
            onClick={() => setFilterStatus("resolved")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterStatus === "resolved"
                ? "bg-green-700 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            ✓ Résolues ({alerts.filter((a) => a.status === "resolved").length})
          </button>
          <button
            onClick={() => setFilterStatus("all")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterStatus === "all"
                ? "bg-blue-700 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Toutes ({alerts.length})
          </button>
        </div>

        {/* Alerts Grid */}
        <div className="grid grid-cols-1 gap-4">
          {filteredAlerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </div>

        {filteredAlerts.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-500 text-lg">Aucune alerte</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

function AlertCard({ alert }) {
  const severityMap = {
    high: {
      bg: "bg-red-50",
      border: "border-red-200",
      badge: "bg-red-100 text-red-800",
      icon: "🚨",
    },
    medium: {
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      badge: "bg-yellow-100 text-yellow-800",
      icon: "⚠️",
    },
    low: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      badge: "bg-blue-100 text-blue-800",
      icon: "ℹ️",
    },
  };

  const severity = severityMap[alert.severity];

  return (
    <div className={`rounded-lg p-4 border ${severity.bg} ${severity.border}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3">
          <span className="text-2xl">{severity.icon}</span>
          <div>
            <h3 className="font-semibold text-gray-900">{alert.type}</h3>
            <p className="text-sm text-gray-600 mt-1">
              Plaque: <span className="font-mono font-medium">{alert.plate}</span>
            </p>
            <p className="text-sm text-gray-600">
              Propriétaire: {alert.owner}
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${severity.badge}`}>
            {alert.severity === "high" && "Critique"}
            {alert.severity === "medium" && "Moyen"}
            {alert.severity === "low" && "Faible"}
          </span>
          <p className="text-xs text-gray-500 mt-2">{alert.date}</p>
        </div>
      </div>

      <div className="flex gap-2 pt-3 border-t border-gray-200">
        <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
          Voir détails
        </button>
        {alert.status === "active" && (
          <>
            <button className="text-sm font-medium text-green-600 hover:text-green-800">
              Marquer comme résolu
            </button>
            <button className="text-sm font-medium text-red-600 hover:text-red-800">
              Escaler
            </button>
          </>
        )}
      </div>
    </div>
  );
}
