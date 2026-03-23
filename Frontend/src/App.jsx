import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppShell from "./components/AppShell";
import { VerificationProvider } from "./context/VerificationContext";
import AlertsPage from "./pages/AlertsPage";
import DashboardPage from "./pages/DashboardPage";
import DocumentCheckPage from "./pages/DocumentCheckPage";
import HistoryPage from "./pages/HistoryPage";
import NotFoundPage from "./pages/NotFoundPage";
import ReportsPage from "./pages/ReportsPage";
import VehicleCheckPage from "./pages/VehicleCheckPage";

function App() {
  return (
    <VerificationProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppShell />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/verification/vehicule" element={<VehicleCheckPage />} />
            <Route path="/verification/document" element={<DocumentCheckPage />} />
            <Route path="/historique" element={<HistoryPage />} />
            <Route path="/alertes" element={<AlertsPage />} />
            <Route path="/rapports" element={<ReportsPage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </VerificationProvider>
  );
}

export default App;
