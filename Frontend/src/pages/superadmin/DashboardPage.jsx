import { useState } from "react";
import { SuperAdminLayout } from "../../layouts/SuperAdminLayout";

export default function SuperAdminDashboardPage() {
  const [stats] = useState({
    totalUsers: 156,
    totalVehicles: 5420,
    totalDocuments: 23100,
    scansToday: 1240,
    systemUptime: 99.8,
    averageResponseTime: 245,
  });

  return (
    <SuperAdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard Global
          </h1>
          <p className="text-gray-500 mt-1">
            Vue d'ensemble du système AutoCheck
          </p>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard
            icon="👥"
            label="Utilisateurs"
            value={stats.totalUsers}
            color="indigo"
          />
          <StatCard
            icon="🚗"
            label="Véhicules"
            value={stats.totalVehicles}
            color="blue"
          />
          <StatCard
            icon="📄"
            label="Documents"
            value={stats.totalDocuments}
            color="green"
          />
          <StatCard
            icon="📱"
            label="Scans aujourd'hui"
            value={stats.scansToday}
            color="purple"
          />
          <StatCard
            icon="⚡"
            label="Uptime"
            value={`${stats.systemUptime}%`}
            color="emerald"
          />
          <StatCard
            icon="⏱️"
            label="Temps réponse"
            value={`${stats.averageResponseTime}ms`}
            color="rose"
          />
        </div>

        {/* System Health */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* By Role */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Utilisateurs par rôle
            </h2>
            <div className="space-y-3">
              <RoleBar label="👮 Police" count={45} total={stats.totalUsers} />
              <RoleBar label="🏢 Agents admin" count={32} total={stats.totalUsers} />
              <RoleBar label="🚗 Propriétaires" count={68} total={stats.totalUsers} />
              <RoleBar label="🛠️ Super admins" count={11} total={stats.totalUsers} />
            </div>
          </div>

          {/* Cities Distribution */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Véhicules par ville
            </h2>
            <div className="space-y-3">
              <CityBar label="Kinshasa" count={2100} total={stats.totalVehicles} />
              <CityBar label="Lubumbashi" count={1500} total={stats.totalVehicles} />
              <CityBar label="Goma" count={980} total={stats.totalVehicles} />
              <CityBar label="Mbuji-Mayi" count={840} total={stats.totalVehicles} />
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Activité système
          </h2>
          <div className="space-y-2 text-sm">
            <LogEntry level="info" message="Backup hebdomadaire complété" time="il y a 2h" />
            <LogEntry level="success" message="Tous les services en ligne" time="il y a 4h" />
            <LogEntry level="warning" message="Utilisation disque: 76%" time="il y a 6h" />
            <LogEntry level="success" message="Synchronisation BDD réussie" time="il y a 8h" />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickAction icon="👥" label="Ajouter utilisateur" />
          <QuickAction icon="🗄️" label="Backup maintenant" />
          <QuickAction icon="📊" label="Générer rapport" />
          <QuickAction icon="⚙️" label="Paramètres système" />
        </div>
      </div>
    </SuperAdminLayout>
  );
}

function StatCard({ icon, label, value, color }) {
  const colorMap = {
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-200",
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    green: "bg-green-50 text-green-700 border-green-200",
    purple: "bg-purple-50 text-purple-700 border-purple-200",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
    rose: "bg-rose-50 text-rose-700 border-rose-200",
  };

  return (
    <div className={`rounded-lg p-6 border ${colorMap[color]}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium opacity-75">{label}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <span className="text-3xl">{icon}</span>
      </div>
    </div>
  );
}

function RoleBar({ label, count, total }) {
  const percentage = (count / total) * 100;
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-900">{label}</span>
        <span className="text-sm text-gray-600">{count}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-red-600 h-2 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

function CityBar({ label, count, total }) {
  const percentage = (count / total) * 100;
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-900">{label}</span>
        <span className="text-sm text-gray-600">{count}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

function LogEntry({ level, message, time }) {
  const levelColors = {
    info: "text-blue-700 bg-blue-50",
    success: "text-green-700 bg-green-50",
    warning: "text-yellow-700 bg-yellow-50",
    error: "text-red-700 bg-red-50",
  };

  const levelIcons = {
    info: "ℹ️",
    success: "✅",
    warning: "⚠️",
    error: "❌",
  };

  return (
    <div className={`p-2 rounded ${levelColors[level]}`}>
      <div className="flex items-center gap-2">
        <span>{levelIcons[level]}</span>
        <span className="flex-1">{message}</span>
        <span className="text-xs opacity-75">{time}</span>
      </div>
    </div>
  );
}

function QuickAction({ icon, label }) {
  return (
    <button className="bg-white hover:shadow-md border border-gray-200 rounded-lg p-4 transition-all hover:border-red-300">
      <div className="text-2xl mb-2">{icon}</div>
      <p className="font-medium text-sm text-gray-900">{label}</p>
    </button>
  );
}
