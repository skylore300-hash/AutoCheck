import { useState, useRef, useEffect } from "react";
import { PoliceLayout } from "../../layouts/PoliceLayout";

export default function PoliceScannerPage() {
  const [scanning, setScanning] = useState(false);
  const [scanType, setScanType] = useState("plate"); // "plate" or "license"
  const videoRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setScanning(true);
      }
    } catch (error) {
      alert("Impossible d'accéder à la caméra: " + error.message);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      setScanning(false);
    }
  };

  const takeSnapshot = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(videoRef.current, 0, 0);
      
      // Simulation de détection
      const detectedText = scanType === "plate" 
        ? "FO-123-ABC" 
        : "Permis: Jean Dupont";
      
      alert(`Détecté: ${detectedText}`);
      stopCamera();
    }
  };

  return (
    <PoliceLayout>
      <div className="px-4 py-4 space-y-4">
        {/* Header avec titre */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Scanner</h2>
          <p className="text-gray-500">Scannez une plaque ou un permis</p>
        </div>

        {/* Type de scan */}
        <div className="flex gap-2">
          <button
            onClick={() => setScanType("plate")}
            className={`flex-1 py-3 rounded-lg font-medium transition-all ${
              scanType === "plate"
                ? "bg-brand-700 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            🚗 Plaque
          </button>
          <button
            onClick={() => setScanType("license")}
            className={`flex-1 py-3 rounded-lg font-medium transition-all ${
              scanType === "license"
                ? "bg-brand-700 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            🪪 Permis
          </button>
        </div>

        {/* Camera view */}
        <div className="bg-black rounded-lg overflow-hidden aspect-video relative">
          {scanning ? (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              {/* Overlay de cadre */}
              <div className="absolute inset-4 border-2 border-yellow-400 rounded-lg opacity-70 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-yellow-400 text-sm font-medium">
                  {scanType === "plate" ? "Alignez la plaque" : "Alignez le permis"}
                </div>
              </div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white">
              <div className="text-center">
                <div className="text-4xl mb-2">📷</div>
                <p>Caméra prête</p>
              </div>
            </div>
          )}
        </div>

        {/* Boutons d'action */}
        <div className="flex gap-3">
          {!scanning ? (
            <button
              onClick={startCamera}
              className="flex-1 bg-brand-700 hover:bg-brand-800 text-white font-medium py-3 rounded-lg transition-colors"
            >
              📷 Démarrer
            </button>
          ) : (
            <>
              <button
                onClick={takeSnapshot}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors"
              >
                ✓ Capturer
              </button>
              <button
                onClick={stopCamera}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-lg transition-colors"
              >
                ✕ Arrêter
              </button>
            </>
          )}
        </div>

        {/* Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-900">
          💡 Conseil: Position la caméra perpendiculairement à la plaque pour
          une meilleure détection
        </div>

        {/* Historique rapide */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Derniers scans</h3>
          <div className="space-y-2">
            <ScanCard plaque="FO-123-ABC" status="✓ En règle" type="vehicle" />
            <ScanCard plaque="FO-456-DEF" status="⚠️ À vérifier" type="vehicle" />
            <ScanCard
              plaque="Permis Jean D."
              status="✓ Valide"
              type="license"
            />
          </div>
        </div>
      </div>
    </PoliceLayout>
  );
}

function ScanCard({ plaque, status, type }) {
  const isValid = status.includes("✓");
  return (
    <div className="bg-white rounded-lg p-3 border border-gray-200 flex items-center justify-between">
      <div>
        <p className="font-medium text-gray-900">{plaque}</p>
        <p className={`text-xs ${isValid ? "text-green-600" : "text-yellow-600"}`}>
          {status}
        </p>
      </div>
      <span className="text-2xl">{type === "vehicle" ? "🚗" : "🪪"}</span>
    </div>
  );
}
