import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import CustomerDetail from "../pages/customerDetail";

export function RoutesMain() {
  return (
    <Routes>
      <Route index path="/" element={<Dashboard />} />
      <Route index path="/customer/:cpf" element={<CustomerDetail />} />
    </Routes>
  );
}
