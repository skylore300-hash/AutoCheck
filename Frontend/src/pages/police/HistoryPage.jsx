import { useState } from "react";
import { PoliceLayout } from "../../layouts/PoliceLayout";

export default function PoliceHistoryPage() {
  const [scans] = useState([
    {
      id: 1,
      plate: "FO-123-ABC",
      type: "vehicle",
      date: "2024-03-24 14:32",
      risk: "Faible",
      status: "✓ En règle",
    },
    {
      id: 2,
      plate: "FO-456-DEF",
      type: "vehicle",
      date: "2024-03-24 13:15",
      risk: "Moyen",
      status: "⚠️ À vérifier",
    },
    {
      id: 3,
      plate: "Permis: Jean D.",
      type: "license",
      date: "2024-03-24 12:45",
      risk: "Faible",
      status: "✓ Valide",
    },
    {
      id: 4,
      plate: "FO-789-GHI",
      type: "vehicle",
      date: "2024-03-23 16:20",
      risk: "Eleve",
      status: "🚨 Problème",
    },
  ]);

  const riskIcon = {
    Faible: "🟢",
    Moyen: "🟡",
    Eleve: "🔴",
  };

  return (
    <PoliceLayout>
      <div className="px-4 py-4 space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Historique</h2>
          <p className="text-gray-500 text-sm">
            {scans.length} scan(s) enregistré(s)
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button className="px-4 py-2 bg-brand-700 text-white rounded-full text-sm font-medium whitespace-nowrap">
            Tous
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium whitespace-nowrap hover:bg-gray-300">
            Véhicules
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium whitespace-nowrap hover:bg-gray-300">
            Permis
          </button>
        </div>

        {/* Timeline */}
        <div className="space-y-3">
          {scans.map((scan) => (
            <div
              key={scan.id}
              className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">
                      {scan.type === "vehicle" ? "🚗" : "🪪"}
                    </span>
                    <div>
                      <p className="font-semibold text-gray-900">{scan.plate}</p>
                      <p className="text-xs text-gray-500">{scan.date}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl mb-1">{riskIcon[scan.risk]}</div>
                  <p className="text-xs font-medium text-gray-600">
                    {scan.risk}
                  </p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-sm font-medium text-gray-700">{scan.status}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="space-y-2 pt-4">
          <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-3 rounded-lg transition-colors border border-blue-200">
            📊 Exporter rapport
          </button>
          <button className="w-full bg-red-50 hover:bg-red-100 text-red-700 font-medium py-3 rounded-lg transition-colors border border-red-200">
            🗑️ Effacer l'historique
          </button>
        </div>
      </div>
    </PoliceLayout>
  );
}
