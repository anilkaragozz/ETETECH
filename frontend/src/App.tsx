import "antd/dist/reset.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "@/features/dashboard/DashboardPage";
import Companies from "@/features/companies/pages/CompanyPage";
import Products from "@/features/products/pages/ProductPage";
import AuthPage from "./features/auth/pages/AuthPage";
import AppLayout from "@/features/layout/components/AppLayout";

import PrivateRoute from "@/components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />

        <Route
          element={
            <PrivateRoute>
              <AppLayout />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/products" element={<Products />} />
          <Route index element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
