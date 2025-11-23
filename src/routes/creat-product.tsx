import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CadastroCliente from "./pages/CadastroCliente";
import CadastroProduto from "./pages/CadastroProduto";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cadastro-cliente" element={<CadastroCliente />} />
        <Route path="/cadastro-produto" element={<CadastroProduto />} />
      </Routes>
    </Router>
  );
}

export default App;
