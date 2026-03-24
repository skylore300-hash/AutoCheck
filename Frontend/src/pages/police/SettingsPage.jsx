import { useState } from "react";
import { PoliceLayout } from "../../layouts/PoliceLayout";

export default function PoliceSettingsPage() {
  const [settings, setSettings] = useState({
    notifications: true,
    soundAlerts: true,
    vibration: true,
    autoSync: true,
    theme: "light",
  });

  const handleToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <PoliceLayout>
      <div className="px-4 py-4 space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Paramètres</h2>
          <p className="text-gray-500 text-sm">Configuration de l'application</p>
        </div>

        {/* Profile */}
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Profil</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-brand-700 text-white rounded-full flex items-center justify-center font-bold text-lg">
                👮
              </div>
              <div>
                <p className="font-medium text-gray-900">Agent Police</p>
                <p className="text-sm text-gray-500">police@autocheck.cd</p>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Notifications</h3>
          <div className="space-y-3">
            <SettingToggle
              label="Notifications"
              value={settings.notifications}
              onChange={() => handleToggle("notifications")}
            />
            <SettingToggle
              label="Alertes sonores"
              value={settings.soundAlerts}
              onChange={() => handleToggle("soundAlerts")}
            />
            <SettingToggle
              label="Vibration"
              value={settings.vibration}
              onChange={() => handleToggle("vibration")}
            />
          </div>
        </div>

        {/* Synchronisation */}
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Données</h3>
          <div className="space-y-3">
            <SettingToggle
              label="Synchronisation auto"
              value={settings.autoSync}
              onChange={() => handleToggle("autoSync")}
            />
            <button className="w-full text-left p-3 hover:bg-gray-50 rounded transition-colors">
              <p className="font-medium text-gray-900">Espace utilisé</p>
              <p className="text-xs text-gray-500 mt-1">125 MB / 500 MB</p>
            </button>
          </div>
        </div>

        {/* Support */}
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Aide</h3>
          <div className="space-y-2">
            <SettingButton label="❓ Guide d'utilisation" />
            <SettingButton label="📞 Contacter support" />
            <SettingButton label="📄 Conditions d'utilisation" />
            <SettingButton label="ℹ️ À propos" />
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 rounded-lg p-4 border border-red-200">
          <h3 className="font-semibold text-red-900 mb-3">Zone dangereuse</h3>
          <button className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-lg transition-colors text-sm">
            🚪 Déconnexion
          </button>
        </div>

        {/* Version */}
        <p className="text-center text-xs text-gray-500 py-4">
          AutoCheck Police v1.0.0
        </p>
      </div>
    </PoliceLayout>
  );
}

function SettingToggle({ label, value, onChange }) {
  return (
    <button
      onClick={onChange}
      className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded transition-colors"
    >
      <span className="font-medium text-gray-900">{label}</span>
      <div
        className={`w-10 h-6 rounded-full transition-colors ${
          value ? "bg-brand-700" : "bg-gray-300"
        } flex items-center`}
      >
        <div
          className={`w-5 h-5 bg-white rounded-full transition-transform ${
            value ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </div>
    </button>
  );
}

function SettingButton({ label }) {
  return (
    <button className="w-full text-left p-3 hover:bg-gray-50 rounded transition-colors font-medium text-gray-900">
      {label}
    </button>
  );
}
