import { useState } from "react";
import { AdminLayout } from "../../layouts/AdminLayout";

export default function AdminDashboardPage() {
  const [stats] = useState({
    totalVehicles: 1243,
    totalDocuments: 5420,
    activeAlerts: 23,
    pendingReports: 7,
    dailyScans: 156,
    successRate: 94.5,
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
          <p className="text-gray-500 mt-1">Vue d'ensemble du système</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            icon="⚠️"
            label="Alertes actives"
            value={stats.activeAlerts}
            color="red"
          />
          <StatCard
            icon="📊"
            label="Rapports en attente"
            value={stats.pendingReports}
            color="purple"
          />
          <StatCard
            icon="📱"
            label="Scans aujourd'hui"
            value={stats.dailyScans}
            color="indigo"
          />
          <StatCard
            icon="✅"
            label="Taux de succès"
            value={`${stats.successRate}%`}
            color="emerald"
          />
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Alertes récentes */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              ⚠️ Alertes récentes
            </h2>
            <div className="space-y-3">
              <AlertItem
                title="Véhicule signalé volé"
                plaque="FO-456-DEF"
                severity="high"
              />
              <AlertItem
                title="Permis expiré"
                plaque="FO-123-ABC"
                severity="medium"
              />
              <AlertItem
                title="Assurance non valide"
                plaque="FO-789-GHI"
                severity="medium"
              />
            </div>
            <button className="mt-4 text-brand-700 hover:text-brand-800 font-medium text-sm">
              Voir toutes les alertes →
            </button>
          </div>

          {/* Activité récente */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              📋 Activité récente
            </h2>
            <div className="space-y-3">
              <ActivityItem
                action="Nouveau véhicule ajouté"
                details="FO-999-ZZZ par Agent 1"
                time="il y a 2h"
              />
              <ActivityItem
                action="Document modifié"
                details="Permis de Jean Dupont"
                time="il y a 4h"
              />
              <ActivityItem
                action="Scan effectué"
                details="Plaque FO-123-ABC"
                time="il y a 6h"
              />
            </div>
            <button className="mt-4 text-brand-700 hover:text-brand-800 font-medium text-sm">
              Voir l'historique →
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickButton icon="➕" label="Ajouter véhicule" />
          <QuickButton icon="📄" label="Ajouter document" />
          <QuickButton icon="🔍" label="Rechercher" />
          <QuickButton icon="📊" label="Exporter données" />
        </div>
      </div>
    </AdminLayout>
  );
}

function StatCard({ icon, label, value, color }) {
  const colorMap = {
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    green: "bg-green-50 text-green-700 border-green-200",
    red: "bg-red-50 text-red-700 border-red-200",
    purple: "bg-purple-50 text-purple-700 border-purple-200",
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-200",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
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

function AlertItem({ title, plaque, severity }) {
  const severityColor = {
    high: "bg-red-100 text-red-800 border-l-4 border-red-500",
    medium: "bg-yellow-100 text-yellow-800 border-l-4 border-yellow-500",
    low: "bg-blue-100 text-blue-800 border-l-4 border-blue-500",
  };

  return (
    <div className={`p-3 rounded ${severityColor[severity]}`}>
      <p className="font-medium">{title}</p>
      <p className="text-sm opacity-75">{plaque}</p>
    </div>
  );
}

function ActivityItem({ action, details, time }) {
  return (
    <div className="p-3 border-l-2 border-gray-300 hover:border-brand-700 transition-colors">
      <p className="font-medium text-gray-900">{action}</p>
      <p className="text-sm text-gray-500">{details}</p>
      <p className="text-xs text-gray-400 mt-1">{time}</p>
    </div>
  );
}

function QuickButton({ icon, label }) {
  return (
    <button className="bg-white hover:shadow-md border border-gray-200 rounded-lg p-4 transition-all hover:border-brand-300">
      <div className="text-2xl mb-2">{icon}</div>
      <p className="font-medium text-sm text-gray-900">{label}</p>
    </button>
  );
}
