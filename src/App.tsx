import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./routes/ProtectedRoute";
import AuthLayout from "./modules/auth/components/AuthLayout";
import ReportsList from "./modules/report/components/List/ReportList";
import ReportDetail from "./modules/report/components/Detail/ReportDetail";
import ReportTrends from "./modules/report/components/Trends/ReportTrends";
import MedicineInfoSearch from "./modules/medicine/components/MedicineInfoSearch";
import { getUserByLocalStorage } from "./modules/auth/utils";

const { user } = getUserByLocalStorage();
const DEFAULT_PATIENT_ID = user?.id;

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthLayout />} />
      <Route element={<ProtectedRoute />}>
        {/* 👇 Default route */}
        <Route
          path="/"
          element={<Navigate to={`/reports/${DEFAULT_PATIENT_ID}`} replace />}
        />
        <Route path="reports/:patientId" element={<ReportsList />} />
        <Route path="report/:reportId" element={<ReportDetail />} />
        <Route path="report/trend/:patientId" element={<ReportTrends />} />
        <Route path="medicine" element={<MedicineInfoSearch />} />
      </Route>
    </Routes>
  );
}

export default App;
