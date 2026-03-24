import { useState } from "react";
import { SuperAdminLayout } from "../../layouts/SuperAdminLayout";

export default function SuperAdminSystemPage() {
  const [services] = useState([
    { name: "API Backend", status: "online", uptime: 99.9, responseTime: 145 },
    { name: "Base de données", status: "online", uptime: 99.8, responseTime: 52 },
    { name: "Cache Redis", status: "online", uptime: 99.95, responseTime: 8 },
    { name: "Service OCR", status: "online", uptime: 98.5, responseTime: 1200 },
    { name: "Queue Email", status: "online", uptime: 99.7, responseTime: 32 },
  ]);

  const [diskUsage] = useState({
    used: 750,
    total: 1000,
    percentage: 75,
  });

  return (
    <SuperAdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion Système</h1>
          <p className="text-gray-500 mt-1">Monitoring des services et ressources</p>
        </div>

        {/* System Health */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <HealthCard
            label="CPU"
            value="45%"
            status="normal"
          />
          <HealthCard
            label="Mémoire"
            value="62%"
            status="warning"
          />
          <HealthCard
            label="Disque"
            value={`${diskUsage.percentage}%`}
            status="warning"
          />
        </div>

        {/* Services Status */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            État des services
          </h2>
          <div className="space-y-3">
            {services.map((service) => (
              <ServiceItem key={service.name} service={service} />
            ))}
          </div>
        </div>

        {/* Storage Usage */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Utilisation disque
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                {diskUsage.used} GB / {diskUsage.total} GB
              </span>
              <span className="text-sm text-gray-600">{diskUsage.percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full ${
                  diskUsage.percentage > 80 ? "bg-red-600" : "bg-green-600"
                }`}
                style={{ width: `${diskUsage.percentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ActionButton icon="💾" label="Lancer backup maintenant" />
          <ActionButton icon="🔄" label="Redémarrer services" />
          <ActionButton icon="📊" label="Télécharger logs" />
          <ActionButton icon="⚙️" label="Paramètres avancés" />
        </div>
      </div>
    </SuperAdminLayout>
  );
}

function HealthCard({ label, value, status }) {
  const statusColor = {
    normal: "bg-green-50 text-green-700 border-green-200",
    warning: "bg-yellow-50 text-yellow-700 border-yellow-200",
    critical: "bg-red-50 text-red-700 border-red-200",
  };

  const statusIcon = {
    normal: "✅",
    warning: "⚠️",
    critical: "🚨",
  };

  return (
    <div className={`rounded-lg p-4 border ${statusColor[status]}`}>
      <p className="text-sm font-medium opacity-75">{label}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
      <p className="text-xs mt-2">{statusIcon[status]} {status}</p>
    </div>
  );
}

function ServiceItem({ service }) {
  return (
    <div className="p-3 border border-gray-200 rounded-lg flex items-center justify-between">
      <div>
        <p className="font-medium text-gray-900">{service.name}</p>
        <p className="text-xs text-gray-500 mt-1">
          Uptime: {service.uptime}% • Réponse: {service.responseTime}ms
        </p>
      </div>
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${
          service.status === "online"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {service.status === "online" ? "✓ En ligne" : "✕ Hors ligne"}
      </span>
    </div>
  );
}

function ActionButton({ icon, label }) {
  return (
    <button className="bg-white hover:shadow-md border border-gray-200 rounded-lg p-4 transition-all hover:border-red-300 text-left">
      <div className="text-2xl mb-2">{icon}</div>
      <p className="font-medium text-sm text-gray-900">{label}</p>
    </button>
  );
}
