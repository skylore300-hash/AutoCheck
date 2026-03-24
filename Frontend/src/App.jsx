import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { VerificationProvider } from "./context/VerificationContext";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";

// Police Pages
import PoliceScannerPage from "./pages/police/ScannerPage";
import PoliceScanResultPage from "./pages/police/ResultPage";
import PoliceHistoryPage from "./pages/police/HistoryPage";
import PoliceSettingsPage from "./pages/police/SettingsPage";

// Admin Pages
import AdminDashboardPage from "./pages/admin/DashboardPage";
import AdminVehiclesPage from "./pages/admin/VehiclesPage";
import AdminDocumentsPage from "./pages/admin/DocumentsPage";
import AdminAlertsPage from "./pages/admin/AlertsPage";

// Owner Pages
import OwnerDashboardPage from "./pages/owner/DashboardPage";
import OwnerVehiclesPage from "./pages/owner/VehiclesPage";
import OwnerNotificationsPage from "./pages/owner/NotificationsPage";

// Super Admin Pages
import SuperAdminDashboardPage from "./pages/superadmin/DashboardPage";
import SuperAdminUsersPage from "./pages/superadmin/UsersPage";
import SuperAdminSystemPage from "./pages/superadmin/SystemPage";
import SuperAdminReportsPage from "./pages/superadmin/ReportsPage";
import SuperAdminLogsPage from "./pages/superadmin/LogsPage";

function AppRoutes() {
  const { isAuthenticated, currentUser } = useAuth();

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      {/* Police Routes */}
      {currentUser?.role === "police" && (
        <>
          <Route path="/police/scanner" element={<PoliceScannerPage />} />
          <Route path="/police/result" element={<PoliceScanResultPage />} />
          <Route path="/police/history" element={<PoliceHistoryPage />} />
          <Route path="/police/settings" element={<PoliceSettingsPage />} />
          <Route path="/" element={<Navigate to="/police/scanner" replace />} />
        </>
      )}

      {/* Admin Routes */}
      {currentUser?.role === "agent" && (
        <>
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/vehicles" element={<AdminVehiclesPage />} />
          <Route path="/admin/documents" element={<AdminDocumentsPage />} />
          <Route path="/admin/alerts" element={<AdminAlertsPage />} />
          <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        </>
      )}

      {/* Owner Routes */}
      {currentUser?.role === "owner" && (
        <>
          <Route path="/owner/dashboard" element={<OwnerDashboardPage />} />
          <Route path="/owner/vehicles" element={<OwnerVehiclesPage />} />
          <Route path="/owner/notifications" element={<OwnerNotificationsPage />} />
          <Route path="/" element={<Navigate to="/owner/dashboard" replace />} />
        </>
      )}

      {/* Super Admin Routes */}
      {currentUser?.role === "superadmin" && (
        <>
          <Route path="/superadmin/dashboard" element={<SuperAdminDashboardPage />} />
          <Route path="/superadmin/users" element={<SuperAdminUsersPage />} />
          <Route path="/superadmin/system" element={<SuperAdminSystemPage />} />
          <Route path="/superadmin/reports" element={<SuperAdminReportsPage />} />
          <Route path="/superadmin/logs" element={<SuperAdminLogsPage />} />
          <Route path="/" element={<Navigate to="/superadmin/dashboard" replace />} />
        </>
      )}

      <Route path="/login" element={<Navigate to="/" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <VerificationProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </VerificationProvider>
    </AuthProvider>
  );
}

export default App;
