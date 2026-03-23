const API_BASE_URL = import.meta.env.VITE_API_URL || "";

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function computeRisk(status) {
  if (status === "Signale") return "Eleve";
  if (status === "A verifier") return "Moyen";
  return "Faible";
}

export async function checkVehicle(payload) {
  const hasBackend = Boolean(API_BASE_URL);

  if (hasBackend) {
    const response = await fetch(`${API_BASE_URL}/api/vehicles/check`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Echec de verification vehicule");
    }
    return response.json();
  }

  await wait(700);
  const status = payload.query.toLowerCase().includes("x") ? "Signale" : "Conforme";

  return {
    status,
    risk: computeRisk(status),
    vin: payload.query.startsWith("W") ? payload.query : "WVWZZZ1JZXW000001",
    plate: payload.query.length < 8 ? "AB-123-CD" : payload.query,
    owner: status === "Signale" ? "Identite masquee" : "Michel K.",
    accidents: status === "Signale" ? 2 : 0,
    message:
      status === "Signale"
        ? "Vehicule sous surveillance, verification physique recommandee"
        : "Vehicule coherent avec les informations declarees",
  };
}

export async function checkDocument({ docType, city, number, file }) {
  const hasBackend = Boolean(API_BASE_URL);

  if (hasBackend) {
    const formData = new FormData();
    formData.append("doc_type", docType);
    formData.append("city", city);
    formData.append("number", number);
    if (file) formData.append("file", file);

    const response = await fetch(`${API_BASE_URL}/api/scan/document`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Echec de verification document");
    }
    return response.json();
  }

  await wait(800);
  const status = number.toLowerCase().includes("z") ? "A verifier" : "Valide";

  return {
    status,
    risk: computeRisk(status),
    docType,
    holder: status === "Valide" ? "Amina B." : "Inconnu",
    extractedText: file ? "Texte OCR detecte" : "Aucun fichier fourni",
    message:
      status === "Valide"
        ? "Le document semble authentique"
        : "Incoherence OCR detectee, controle manuel requis",
  };
}
