import { useState } from "react";
import { OwnerLayout } from "../../layouts/OwnerLayout";

export default function OwnerVehiclesPage() {
  const [vehicles] = useState([
    {
      id: 1,
      plate: "FO-123-ABC",
      brand: "Toyota Corolla",
      year: 2018,
      vin: "WVWZZZ3CZ9E123456",
      status: "active",
      risk: "Faible",
      documents: {
        license: { valid: true, expiresIn: 45 },
        insurance: { valid: true, expiresIn: 120 },
        technical: { valid: true, expiresIn: 200 },
      },
    },
    {
      id: 2,
      plate: "FO-555-XYZ",
      brand: "Nissan Altima",
      year: 2020,
      vin: "WVWZZZ3CZ9E789012",
      status: "active",
      risk: "Moyen",
      documents: {
        license: { valid: true, expiresIn: 30 },
        insurance: { valid: false, expiresIn: -5 },
        technical: { valid: true, expiresIn: 150 },
      },
    },
  ]);

  return (
    <OwnerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mes Véhicules</h1>
          <p className="text-gray-500 mt-1">{vehicles.length} véhicule(s)</p>
        </div>

        {/* Vehicles List */}
        <div className="space-y-4">
          {vehicles.map((vehicle) => (
            <VehicleDetailCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </div>
    </OwnerLayout>
  );
}

function VehicleDetailCard({ vehicle }) {
  const [expanded, setExpanded] = useState(false);

  const riskBadge = {
    Faible: "bg-green-100 text-green-800",
    Moyen: "bg-yellow-100 text-yellow-800",
    Eleve: "bg-red-100 text-red-800",
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      {/* Header */}
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div>
          <p className="font-bold text-lg text-gray-900">{vehicle.plate}</p>
          <p className="text-sm text-gray-600">
            {vehicle.brand} • {vehicle.year}
          </p>
        </div>
        <div className="text-right">
          <span className={`px-2 py-1 rounded text-xs font-medium ${riskBadge[vehicle.risk]}`}>
            {vehicle.risk}
          </span>
          <p className="text-2xl mt-1">{expanded ? "▲" : "▼"}</p>
        </div>
      </div>

      {/* Details */}
      {expanded && (
        <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
          {/* VIN */}
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">VIN</p>
            <p className="font-mono text-sm text-gray-900">{vehicle.vin}</p>
          </div>

          {/* Documents Status */}
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">
              État des documents
            </p>
            <div className="space-y-2">
              <DocumentStatus
                name="Permis de conduire"
                valid={vehicle.documents.license.valid}
                expiresIn={vehicle.documents.license.expiresIn}
              />
              <DocumentStatus
                name="Assurance"
                valid={vehicle.documents.insurance.valid}
                expiresIn={vehicle.documents.insurance.expiresIn}
              />
              <DocumentStatus
                name="Contrôle technique"
                valid={vehicle.documents.technical.valid}
                expiresIn={vehicle.documents.technical.expiresIn}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-3 border-t border-gray-200">
            <button className="flex-1 text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-2 rounded transition-colors">
              📋 Voir détails
            </button>
            <button className="flex-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 rounded transition-colors">
              ⚙️ Gérer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function DocumentStatus({ name, valid, expiresIn }) {
  const isExpired = expiresIn < 0;
  const isExpiring = expiresIn < 30 && expiresIn >= 0;

  let statusColor = "bg-green-50 text-green-800 border-green-200";
  let statusIcon = "✅";
  let statusText = "Valide";

  if (isExpired) {
    statusColor = "bg-red-50 text-red-800 border-red-200";
    statusIcon = "❌";
    statusText = `Expiré depuis ${Math.abs(expiresIn)} j`;
  } else if (isExpiring) {
    statusColor = "bg-yellow-50 text-yellow-800 border-yellow-200";
    statusIcon = "⚠️";
    statusText = `Expire dans ${expiresIn} j`;
  }

  return (
    <div className={`p-2 rounded border ${statusColor}`}>
      <div className="flex items-center justify-between">
        <p className="font-medium text-sm">{name}</p>
        <span className="text-lg">{statusIcon}</span>
      </div>
      <p className="text-xs mt-1 opacity-75">{statusText}</p>
    </div>
  );
}
