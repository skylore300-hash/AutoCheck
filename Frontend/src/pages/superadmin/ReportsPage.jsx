import { useState } from "react";
import { SuperAdminLayout } from "../../layouts/SuperAdminLayout";

export default function SuperAdminReportsPage() {
  const [reportType, setReportType] = useState("users");

  const [reports] = useState({
    users: {
      total: 156,
      byRole: {
        police: 45,
        agent: 32,
        owner: 68,
        superadmin: 11,
      },
      growth: {
        thisMonth: 12,
        lastMonth: 8,
      },
    },
    vehicles: {
      total: 5420,
      byCity: {
        kinshasa: 2100,
        lubumbashi: 1500,
        goma: 980,
        mbuji: 840,
      },
      status: {
        active: 5200,
        flagged: 220,
      },
    },
    scans: {
      today: 1240,
      thisWeek: 8340,
      thisMonth: 34200,
      averagePerDay: 1157,
    },
  });

  return (
    <SuperAdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Rapports</h1>
            <p className="text-gray-500 mt-1">Statistiques et analyses</p>
          </div>
          <button className="bg-red-700 hover:bg-red-800 text-white font-medium px-4 py-2 rounded-lg transition-colors">
            📥 Exporter PDF
          </button>
        </div>

        {/* Report Type Selector */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setReportType("users")}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              reportType === "users"
                ? "bg-red-700 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            👥 Utilisateurs
          </button>
          <button
            onClick={() => setReportType("vehicles")}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              reportType === "vehicles"
                ? "bg-red-700 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            🚗 Véhicules
          </button>
          <button
            onClick={() => setReportType("scans")}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              reportType === "scans"
                ? "bg-red-700 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            📱 Scans
          </button>
        </div>

        {/* Report Content */}
        {reportType === "users" && <UsersReport data={reports.users} />}
        {reportType === "vehicles" && (
          <VehiclesReport data={reports.vehicles} />
        )}
        {reportType === "scans" && <ScansReport data={reports.scans} />}
      </div>
    </SuperAdminLayout>
  );
}

function UsersReport({ data }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Total Users */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Total utilisateurs
        </h2>
        <p className="text-4xl font-bold text-indigo-700">{data.total}</p>
        <p className="text-sm text-gray-500 mt-2">
          +{data.growth.thisMonth} ce mois (+{data.growth.lastMonth} dernier mois)
        </p>
      </div>

      {/* By Role */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Par rôle
        </h2>
        <div className="space-y-3">
          {Object.entries(data.byRole).map(([role, count]) => (
            <div key={role} className="flex items-center justify-between">
              <span className="text-sm text-gray-600 capitalize">{role}</span>
              <span className="font-bold text-gray-900">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Growth Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:col-span-2">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Tendance mensuelle
        </h2>
        <div className="h-64 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Graphique de croissance (à implémenter)</p>
        </div>
      </div>
    </div>
  );
}

function VehiclesReport({ data }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Total Vehicles */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Total véhicules
        </h2>
        <p className="text-4xl font-bold text-blue-700">{data.total}</p>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Actifs</span>
            <span className="font-medium">{data.status.active}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Signalés</span>
            <span className="font-medium text-red-700">{data.status.flagged}</span>
          </div>
        </div>
      </div>

      {/* By City */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Par ville
        </h2>
        <div className="space-y-2">
          {Object.entries(data.byCity).map(([city, count]) => (
            <CityBar
              key={city}
              city={city.charAt(0).toUpperCase() + city.slice(1)}
              count={count}
              total={data.total}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ScansReport({ data }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <StatBox label="Scans aujourd'hui" value={data.today} color="purple" />
      <StatBox label="Cette semaine" value={data.thisWeek} color="blue" />
      <StatBox label="Ce mois" value={data.thisMonth} color="green" />
      <StatBox label="Moyenne/jour" value={data.averagePerDay} color="indigo" />
    </div>
  );
}

function CityBar({ city, count, total }) {
  const percentage = (count / total) * 100;
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{city}</span>
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

function StatBox({ label, value, color }) {
  const colors = {
    purple: "bg-purple-50 text-purple-700 border-purple-200",
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    green: "bg-green-50 text-green-700 border-green-200",
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-200",
  };

  return (
    <div className={`rounded-lg p-6 border ${colors[color]}`}>
      <p className="text-sm font-medium opacity-75">{label}</p>
      <p className="text-4xl font-bold mt-2">{value}</p>
    </div>
  );
}
