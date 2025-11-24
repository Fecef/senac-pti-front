import { Routes, Route } from "react-router-dom";
import CustomerDetail from "../pages/customerDetail";
import RegisterCustomer from "../pages/RegisterCustomer";
import RegisterProduct from "../pages/RegisterProduct";
import Dashboard from "../pages/dashboard";

export function RoutesMain() {
  return (
    <Routes>
      <Route index path="/" element={<Dashboard />} />
      <Route index path="/customer/:cpf" element={<CustomerDetail />} />
      <Route path="/customer" element={<RegisterCustomer />} />
      <Route path="/product" element={<RegisterProduct />} />
    </Routes>
  );
}
