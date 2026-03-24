import { useState } from "react";
import { PoliceLayout } from "../../layouts/PoliceLayout";

export default function PoliceScanResultPage() {
  const [result] = useState({
    plate: "FO-123-ABC",
    owner: "Jean Proprietaire",
    vin: "WVWZZZ3CZ9E123456",
    stolen: false,
    risk: "Faible",
    documents: {
      license: { valid: true, expiresIn: 45 },
      insurance: { valid: true, expiresIn: 120 },
      technical: { valid: true, expiresIn: 200 },
    },
  });

  const riskColor = {
    Faible: "bg-green-100 text-green-800 border-green-300",
    Moyen: "bg-yellow-100 text-yellow-800 border-yellow-300",
    Eleve: "bg-red-100 text-red-800 border-red-300",
  };

  return (
    <PoliceLayout>
      <div className="px-4 py-4 space-y-4">
        {/* Status principal */}
        <div className={`rounded-lg p-6 border-2 ${riskColor[result.risk]}`}>
          <div className="text-center">
            <div className="text-4xl mb-2">
              {result.stolen ? "🚨" : "✅"}
            </div>
            <h2 className="text-2xl font-bold mb-1">
              {result.stolen ? "VÉHICULE VOLÉ" : "Véhicule en règle"}
            </h2>
            <p className="text-sm opacity-75">Risque: {result.risk}</p>
          </div>
        </div>

        {/* Info véhicule */}
        <div className="bg-white rounded-lg p-4 space-y-3 border border-gray-200">
          <h3 className="font-semibold text-gray-900">Informations</h3>

          <InfoRow label="Plaque" value={result.plate} />
          <InfoRow label="Propriétaire" value={result.owner} />
          <InfoRow label="VIN" value={result.vin} />
          <InfoRow
            label="Volé"
            value={result.stolen ? "OUI ⚠️" : "Non ✓"}
            valueColor={result.stolen ? "text-red-600" : "text-green-600"}
          />
        </div>

        {/* Documents */}
        <div className="bg-white rounded-lg p-4 space-y-3 border border-gray-200">
          <h3 className="font-semibold text-gray-900">Documents</h3>

          <DocumentRow
            name="Permis de conduire"
            valid={result.documents.license.valid}
            expiresIn={result.documents.license.expiresIn}
          />
          <DocumentRow
            name="Assurance"
            valid={result.documents.insurance.valid}
            expiresIn={result.documents.insurance.expiresIn}
          />
          <DocumentRow
            name="Contrôle technique"
            valid={result.documents.technical.valid}
            expiresIn={result.documents.technical.expiresIn}
          />
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <button className="w-full bg-brand-700 hover:bg-brand-800 text-white font-medium py-3 rounded-lg transition-colors">
            📋 Générer rapport
          </button>
          <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 font-medium py-3 rounded-lg transition-colors">
            🔙 Nouveau scan
          </button>
        </div>

        {/* Notes */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900 font-medium mb-2">Notes d'inspection:</p>
          <textarea
            placeholder="Ajouter des observations..."
            className="w-full p-2 border border-blue-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="4"
          />
        </div>
      </div>
    </PoliceLayout>
  );
}

function InfoRow({ label, value, valueColor = "text-gray-900" }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-100">
      <span className="text-gray-600">{label}</span>
      <span className={`font-medium ${valueColor}`}>{value}</span>
    </div>
  );
}

function DocumentRow({ name, valid, expiresIn }) {
  return (
    <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
      <div>
        <p className="font-medium text-gray-900">{name}</p>
        <p className="text-xs text-gray-500">Expire dans {expiresIn} jours</p>
      </div>
      <span className="text-2xl">{valid ? "✅" : "❌"}</span>
    </div>
  );
}
