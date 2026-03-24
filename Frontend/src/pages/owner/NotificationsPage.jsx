import { useState } from "react";
import { OwnerLayout } from "../../layouts/OwnerLayout";

export default function OwnerNotificationsPage() {
  const [notifications] = useState([
    {
      id: 1,
      type: "document_expiring",
      title: "Contrôle technique expire bientôt",
      message: "Votre contrôle technique pour FO-123-ABC expire dans 45 jours",
      severity: "warning",
      date: "2024-03-24",
      read: false,
    },
    {
      id: 2,
      type: "document_expired",
      title: "Assurance expirée",
      message: "L'assurance de votre véhicule FO-555-XYZ est expirée depuis 5 jours",
      severity: "critical",
      date: "2024-03-22",
      read: false,
    },
    {
      id: 3,
      type: "scan_completed",
      title: "Scan complété",
      message: "Le scan de votre véhicule FO-123-ABC a été complété par la police",
      severity: "info",
      date: "2024-03-20",
      read: true,
    },
    {
      id: 4,
      type: "status_update",
      title: "Mise à jour de statut",
      message: "Votre dossier a été mis à jour par l'administration",
      severity: "info",
      date: "2024-03-18",
      read: true,
    },
  ]);

  const [filter, setFilter] = useState("all");

  const filteredNotifications = notifications.filter((n) =>
    filter === "all" ? true : n.severity === filter
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <OwnerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-500 mt-1">
              {unreadCount} non lue(s)
            </p>
          </div>
          {unreadCount > 0 && (
            <button className="bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium px-4 py-2 rounded-lg transition-colors text-sm">
              Marquer tout comme lu
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <FilterButton
            label="Tous"
            active={filter === "all"}
            onClick={() => setFilter("all")}
          />
          <FilterButton
            label="🔴 Critiques"
            active={filter === "critical"}
            onClick={() => setFilter("critical")}
          />
          <FilterButton
            label="🟡 Avertissements"
            active={filter === "warning"}
            onClick={() => setFilter("warning")}
          />
          <FilterButton
            label="🔵 Infos"
            active={filter === "info"}
            onClick={() => setFilter("info")}
          />
        </div>

        {/* Notifications */}
        <div className="space-y-3">
          {filteredNotifications.map((notif) => (
            <NotificationCard key={notif.id} notification={notif} />
          ))}
        </div>

        {filteredNotifications.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-500 text-lg">Aucune notification</p>
          </div>
        )}
      </div>
    </OwnerLayout>
  );
}

function NotificationCard({ notification }) {
  const severityMap = {
    critical: {
      bg: "bg-red-50",
      border: "border-red-200",
      icon: "🔴",
      badge: "bg-red-100 text-red-800",
    },
    warning: {
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      icon: "🟡",
      badge: "bg-yellow-100 text-yellow-800",
    },
    info: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      icon: "ℹ️",
      badge: "bg-blue-100 text-blue-800",
    },
  };

  const severity = severityMap[notification.severity];

  return (
    <div
      className={`rounded-lg p-4 border ${severity.bg} ${severity.border} ${
        !notification.read ? "ring-2 ring-offset-2 ring-blue-400" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl">{severity.icon}</span>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900">{notification.title}</h3>
            {!notification.read && (
              <span className="inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
            )}
          </div>
          <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
          <p className="text-xs text-gray-500">{notification.date}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-3 pt-3 border-t border-gray-300/30 flex gap-2">
        {!notification.read && (
          <button className="text-xs font-medium text-blue-700 hover:text-blue-800">
            Marquer comme lu
          </button>
        )}
        <button className="text-xs font-medium text-gray-600 hover:text-gray-800">
          Supprimer
        </button>
      </div>
    </div>
  );
}

function FilterButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
        active
          ? "bg-purple-700 text-white"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
    >
      {label}
    </button>
  );
}
