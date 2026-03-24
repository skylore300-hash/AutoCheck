import { useState } from "react";
import { AdminLayout } from "../../layouts/AdminLayout";

export default function AdminDocumentsPage() {
  const [documents] = useState([
    {
      id: 1,
      type: "Permis",
      holder: "Jean Proprietaire",
      number: "CD123456",
      expiresIn: 45,
      status: "valid",
    },
    {
      id: 2,
      type: "Assurance",
      holder: "Marie Dupont",
      number: "ASS789012",
      expiresIn: 120,
      status: "valid",
    },
    {
      id: 3,
      type: "Contrôle technique",
      holder: "Pierre Banda",
      number: "CT345678",
      expiresIn: -10,
      status: "expired",
    },
  ]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Gestion Documents
            </h1>
            <p className="text-gray-500 mt-1">
              {documents.length} document(s) en base
            </p>
          </div>
          <button className="bg-brand-700 hover:bg-brand-800 text-white font-medium px-4 py-2 rounded-lg transition-colors">
            + Ajouter document
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <FilterTab label="Tous" active />
          <FilterTab label="Valides" />
          <FilterTab label="Expirant" />
          <FilterTab label="Expirés" />
        </div>

        {/* Documents List */}
        <div className="grid grid-cols-1 gap-4">
          {documents.map((doc) => (
            <DocumentCard key={doc.id} document={doc} />
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}

function DocumentCard({ document }) {
  const statusColor = {
    valid: "bg-green-50 border-green-200",
    expiring: "bg-yellow-50 border-yellow-200",
    expired: "bg-red-50 border-red-200",
  };

  const statusBadge = {
    valid: "✓ Valide",
    expiring: "⚠️ Expire bientôt",
    expired: "❌ Expiré",
  };

  const badgeColor = {
    valid: "bg-green-100 text-green-800",
    expiring: "bg-yellow-100 text-yellow-800",
    expired: "bg-red-100 text-red-800",
  };

  return (
    <div
      className={`bg-white rounded-lg p-4 border ${statusColor[document.status]}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">{document.type}</h3>
          <p className="text-sm text-gray-600">{document.number}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            badgeColor[document.status]
          }`}
        >
          {statusBadge[document.status]}
        </span>
      </div>

      <div className="flex items-center justify-between text-sm">
        <p className="text-gray-600">Titulaire: {document.holder}</p>
        <p className="text-gray-500">
          {document.expiresIn > 0
            ? `Expire dans ${document.expiresIn} jours`
            : `Expiré depuis ${Math.abs(document.expiresIn)} jours`}
        </p>
      </div>

      <div className="mt-3 flex gap-2">
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          Éditer
        </button>
        <button className="text-sm text-red-600 hover:text-red-800 font-medium">
          Supprimer
        </button>
      </div>
    </div>
  );
}

function FilterTab({ label, active = false }) {
  return (
    <button
      className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
        active
          ? "bg-brand-700 text-white"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
    >
      {label}
    </button>
  );
}
