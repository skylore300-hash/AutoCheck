import { useState } from "react";
import { SuperAdminLayout } from "../../layouts/SuperAdminLayout";

export default function SuperAdminUsersPage() {
  const [users] = useState([
    {
      id: 1,
      name: "Agent Police Kinshasa",
      email: "police.kinshasa@autocheck.cd",
      role: "police",
      city: "Kinshasa",
      status: "active",
      joinDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Admin Agent Lubumbashi",
      email: "admin.lubumbashi@autocheck.cd",
      role: "agent",
      city: "Lubumbashi",
      status: "active",
      joinDate: "2024-02-01",
    },
    {
      id: 3,
      name: "Jean Proprietaire",
      email: "jean.owner@autocheck.cd",
      role: "owner",
      city: "Kinshasa",
      status: "active",
      joinDate: "2024-03-10",
    },
    {
      id: 4,
      name: "Marie Dupont",
      email: "marie.owner@autocheck.cd",
      role: "owner",
      city: "Goma",
      status: "inactive",
      joinDate: "2024-01-20",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [filterRole, setFilterRole] = useState("all");

  const filteredUsers = users.filter((u) =>
    filterRole === "all" ? true : u.role === filterRole
  );

  return (
    <SuperAdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Gestion Utilisateurs
            </h1>
            <p className="text-gray-500 mt-1">{users.length} utilisateur(s)</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-red-700 hover:bg-red-800 text-white font-medium px-4 py-2 rounded-lg transition-colors"
          >
            + Ajouter utilisateur
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setFilterRole("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filterRole === "all"
                ? "bg-red-700 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Tous
          </button>
          <button
            onClick={() => setFilterRole("police")}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filterRole === "police"
                ? "bg-red-700 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            👮 Police
          </button>
          <button
            onClick={() => setFilterRole("agent")}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filterRole === "agent"
                ? "bg-red-700 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            🏢 Agents
          </button>
          <button
            onClick={() => setFilterRole("owner")}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filterRole === "owner"
                ? "bg-red-700 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            🚗 Propriétaires
          </button>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Nom
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Rôle
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Ville
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <UserRow key={user.id} user={user} />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {showModal && <AddUserModal onClose={() => setShowModal(false)} />}
      </div>
    </SuperAdminLayout>
  );
}

function UserRow({ user }) {
  const roleIcon = {
    police: "👮",
    agent: "🏢",
    owner: "🚗",
    superadmin: "🛠️",
  };

  const statusBadge = {
    active: "bg-green-100 text-green-800",
    inactive: "bg-gray-100 text-gray-800",
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 text-sm font-medium text-gray-900">
        {user.name}
      </td>
      <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
      <td className="px-6 py-4 text-sm">
        <span className="inline-flex items-center gap-2">
          {roleIcon[user.role]} {user.role}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-600">{user.city || "-"}</td>
      <td className="px-6 py-4 text-sm">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${statusBadge[user.status]}`}
        >
          {user.status === "active" ? "Actif" : "Inactif"}
        </span>
      </td>
      <td className="px-6 py-4 text-right space-x-2">
        <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
          Éditer
        </button>
        <button className="text-red-600 hover:text-red-800 font-medium text-sm">
          Supprimer
        </button>
      </td>
    </tr>
  );
}

function AddUserModal({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "agent",
    city: "Kinshasa",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Utilisateur ajouté: " + formData.email);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Ajouter utilisateur
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom complet
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rôle
            </label>
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="police">👮 Police</option>
              <option value="agent">🏢 Agent Admin</option>
              <option value="owner">🚗 Propriétaire</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ville (opt. pour propriétaires)
            </label>
            <select
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option>Kinshasa</option>
              <option>Lubumbashi</option>
              <option>Goma</option>
              <option>Mbuji-Mayi</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-red-700 hover:bg-red-800 text-white font-medium py-2 rounded-lg transition-colors"
            >
              Ajouter
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium py-2 rounded-lg transition-colors"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
