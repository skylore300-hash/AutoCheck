import { useState } from "react";
import { AdminLayout } from "../../layouts/AdminLayout";

export default function AdminVehiclesPage() {
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      plate: "FO-123-ABC",
      vin: "WVWZZZ3CZ9E123456",
      owner: "Jean Proprietaire",
      city: "Kinshasa",
      status: "active",
      risk: "Faible",
    },
    {
      id: 2,
      plate: "FO-456-DEF",
      vin: "WVWZZZ3CZ9E789012",
      owner: "Marie Dupont",
      city: "Lubumbashi",
      status: "active",
      risk: "Moyen",
    },
    {
      id: 3,
      plate: "FO-789-GHI",
      vin: "WVWZZZ3CZ9E345678",
      owner: "Pierre Banda",
      city: "Goma",
      status: "flagged",
      risk: "Eleve",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVehicles = vehicles.filter(
    (v) =>
      v.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestion Véhicules</h1>
            <p className="text-gray-500 mt-1">
              {vehicles.length} véhicule(s) enregistré(s)
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-brand-700 hover:bg-brand-800 text-white font-medium px-4 py-2 rounded-lg transition-colors"
          >
            + Ajouter véhicule
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Chercher par plaque ou propriétaire..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-lg transition-colors">
            🔍
          </button>
        </div>

        {/* Vehicles Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Plaque
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Propriétaire
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    VIN
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Ville
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Risque
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredVehicles.map((vehicle) => (
                  <VehicleRow key={vehicle.id} vehicle={vehicle} />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Ajouter */}
        {showModal && (
          <Modal onClose={() => setShowModal(false)} />
        )}
      </div>
    </AdminLayout>
  );
}

function VehicleRow({ vehicle }) {
  const riskColor = {
    Faible: "bg-green-100 text-green-800",
    Moyen: "bg-yellow-100 text-yellow-800",
    Eleve: "bg-red-100 text-red-800",
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 text-sm font-medium text-gray-900">
        {vehicle.plate}
      </td>
      <td className="px-6 py-4 text-sm text-gray-600">{vehicle.owner}</td>
      <td className="px-6 py-4 text-sm text-gray-600 font-mono">
        {vehicle.vin.slice(0, 11)}...
      </td>
      <td className="px-6 py-4 text-sm text-gray-600">{vehicle.city}</td>
      <td className="px-6 py-4 text-sm">
        <span className={`px-2 py-1 rounded text-xs font-medium ${riskColor[vehicle.risk]}`}>
          {vehicle.risk}
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

function Modal({ onClose }) {
  const [formData, setFormData] = useState({
    plate: "",
    vin: "",
    owner: "",
    city: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Véhicule ajouté: " + formData.plate);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Ajouter véhicule</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Plaque
            </label>
            <input
              type="text"
              placeholder="ex: FO-123-ABC"
              value={formData.plate}
              onChange={(e) =>
                setFormData({ ...formData, plate: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              VIN
            </label>
            <input
              type="text"
              placeholder="ex: WVWZZZ3CZ9E123456"
              value={formData.vin}
              onChange={(e) => setFormData({ ...formData, vin: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Propriétaire
            </label>
            <input
              type="text"
              placeholder="ex: Jean Dupont"
              value={formData.owner}
              onChange={(e) =>
                setFormData({ ...formData, owner: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ville
            </label>
            <select
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
              required
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
              className="flex-1 bg-brand-700 hover:bg-brand-800 text-white font-medium py-2 rounded-lg transition-colors"
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
