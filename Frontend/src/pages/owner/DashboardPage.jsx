import { useState } from "react";
import { OwnerLayout } from "../../layouts/OwnerLayout";

export default function OwnerDashboardPage() {
  const [stats] = useState({
    totalVehicles: 2,
    pendingDocuments: 1,
    expiringDocs: 2,
    alerts: 0,
  });

  const [vehicles] = useState([
    {
      plate: "FO-123-ABC",
      brand: "Toyota Corolla",
      status: "active",
      risk: "Faible",
    },
    {
      plate: "FO-555-XYZ",
      brand: "Nissan Altima",
      status: "active",
      risk: "Moyen",
    },
  ]);

  return (
    <OwnerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bonjour Jean 👋</h1>
          <p className="text-gray-500 mt-1">Voici un aperçu de vos véhicules</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            icon="🚗"
            label="Mes véhicules"
            value={stats.totalVehicles}
          />
          <StatCard
            icon="📄"
            label="Documents"
            value={stats.pendingDocuments}
            color="orange"
          />
          <StatCard
            icon="⏳"
            label="En expiration"
            value={stats.expiringDocs}
            color="red"
          />
          <StatCard icon="🔔" label="Alertes" value={stats.alerts} color="green" />
        </div>

        {/* Recent Vehicles */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Mes véhicules</h2>
          <div className="space-y-3">
            {vehicles.map((vehicle) => (
              <VehicleItem key={vehicle.plate} vehicle={vehicle} />
            ))}
          </div>
          <button className="mt-4 w-full py-2 text-brand-700 hover:text-brand-800 font-medium border-t border-gray-200 pt-4">
            Voir tous mes véhicules →
          </button>
        </div>

        {/* Notifications */}
        <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
          <h3 className="font-semibold text-blue-900 mb-2">📢 Notifications</h3>
          <ul className="space-y-1 text-sm text-blue-800">
            <li>✓ Tous vos documents sont à jour</li>
            <li>⚠️ Contrôle technique expire dans 45 jours</li>
          </ul>
        </div>
      </div>
    </OwnerLayout>
  );
}

function StatCard({ icon, label, value, color = "blue" }) {
  const colors = {
    blue: "bg-blue-50 text-blue-700",
    orange: "bg-orange-50 text-orange-700",
    red: "bg-red-50 text-red-700",
    green: "bg-green-50 text-green-700",
  };

  return (
    <div className={`rounded-lg p-4 ${colors[color]} border border-gray-200`}>
      <p className="text-2xl mb-2">{icon}</p>
      <p className="text-xs opacity-75">{label}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}

function VehicleItem({ vehicle }) {
  const riskBadge = {
    Faible: "bg-green-100 text-green-800",
    Moyen: "bg-yellow-100 text-yellow-800",
    Eleve: "bg-red-100 text-red-800",
  };

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div>
        <p className="font-medium text-gray-900">{vehicle.plate}</p>
        <p className="text-xs text-gray-500">{vehicle.brand}</p>
      </div>
      <span className={`px-2 py-1 rounded text-xs font-medium ${riskBadge[vehicle.risk]}`}>
        {vehicle.risk}
      </span>
    </div>
  );
}
