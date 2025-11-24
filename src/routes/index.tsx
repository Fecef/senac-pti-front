import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import CustomerDetail from "../pages/customerDetail";
import RegisterCustomer from "../pages/RegisterCustomer";
import RegisterProduct from "../pages/RegisterProduct";



export function RoutesMain() {
  return (
    <Routes>
      <Route index path="/senac-pti-front/" element={<Dashboard />} />
      <Route index path="/customer/:cpf" element={<CustomerDetail />} />
      <Route path="/cadastrar-cliente" element={<RegisterCustomer />} />
      <Route path="/cadastrar-produto" element={<RegisterProduct />} />

    </Routes>
  );
}
