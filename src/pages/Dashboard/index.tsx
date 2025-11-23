import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getCustomerListAPI } from "../../services/customer";
import { useEffect, useState } from "react";
import { Stack, Typography,Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export interface Customer {
  id: number;
  cpf: string;
  telefone: string;
  ultima_compra: string; // ou Date, se você converter
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<Customer[]>([]);

    // Estados para cliente
  const [openCliente, setOpenCliente] = useState(false);
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
 
// estados para produto
const [openProduto, setOpenProduto] = useState(false);
const [produtoNome, setProdutoNome] = useState("");
const [produtoValor, setProdutoValor] = useState("");

useEffect(() => {
  fetchData();
}, []);

const fetchData = async () => {
  const data = await getCustomerListAPI();
  setCustomers(data);
};

  const handleClickOpenCliente = () => setOpenCliente(true);
  const handleCloseCliente = () => setOpenCliente(false);
  
  const handleSubmit = async () => {
  try {
    await axios.post("http://localhost:8000/clientes/", {nome,cpf,telefone});
    alert("Cliente cadastrado com sucesso!");
    setNome(""); setCpf(""); setTelefone("");
    setOpenCliente(false);
    fetchData(); // atualiza a tabela
  } catch (error) {
    alert("Erro ao cadastrar cliente");
  }
};
  // produto
const handleClickOpenProduto = () => setOpenProduto(true);
const handleCloseProduto = () => setOpenProduto(false);

const handleSubmitProduto = async () => {
  try {
    await axios.post("http://localhost:8000/produtos/", {
      nome: produtoNome,
      valor: parseFloat(produtoValor),
    });
    alert("Produto cadastrado com sucesso!");
    setProdutoNome(""); setProdutoValor("");
    setOpenProduto(false);
  } catch (error) {
    alert("Erro ao cadastrar produto");
  }
};

return (
    <Stack sx={{ my: 10, alignItems: "center", gap: 4 }}>
      <Typography variant="h4" fontWeight={700} color="#1a568f">
        DASHBOARD
      </Typography>

      <Button variant="contained" color="primary" onClick={handleClickOpenCliente}>
  Cadastrar Cliente
</Button>

<Dialog open={openCliente} onClose={handleCloseCliente}>
  <DialogTitle>Cadastro de Cliente</DialogTitle>
  <DialogContent>
    <TextField label="Nome" fullWidth margin="normal" value={nome} onChange={(e) => setNome(e.target.value)}/>
    <TextField label="CPF" fullWidth margin="normal" value={cpf} onChange={(e) => setCpf(e.target.value)}/>
    <TextField label="Telefone" fullWidth margin="normal" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
  </DialogContent>
  <DialogActions>

    <Button onClick={handleCloseCliente} color="secondary">Cancelar</Button>
    <Button onClick={handleSubmitCliente} variant="contained" color="primary">Salvar</Button>
  </DialogActions>
</Dialog>

  /* Botão de cadastro de produto */
  <Button variant="contained" color="secondary" onClick={handleClickOpenProduto}>
  Cadastrar Produto
</Button>
<Dialog open={openProduto} onClose={handleCloseProduto}>
  <DialogTitle>Cadastro de Produto</DialogTitle>
  <DialogContent>
    <TextField label="Nome do Produto" fullWidth margin="normal" value={produtoNome} onChange={(e) => setProdutoNome(e.target.value)} />
    <TextField label="Valor" type="number" fullWidth margin="normal" value={produtoValor} onChange={(e) => setProdutoValor(e.target.value)} />
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseProduto} color="secondary">Cancelar</Button>
    <Button onClick={handleSubmitProduto} variant="contained" color="primary">Salvar</Button>
  </DialogActions>
</Dialog>

/* Tabela de clientes *
  <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }}>
      <TableHead sx={{ bgcolor: "#1a568f" }}>
        <TableRow>
          <TableCell align="center" sx={{ color: "#fff", fontWeight: 800 }}>ID
            </TableCell>
            <TableCell align="center" sx={{ color: "#fff", fontWeight: 800 }}>CPF
              </TableCell>
              <TableCell align="center" sx={{ color: "#fff", fontWeight: 800 }}>
                Telefone
              </TableCell>
              <TableCell align="center" sx={{ color: "#fff", fontWeight: 800 }}>
                Última Compra
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/customer/${row.cpf}`)}
              >
                <TableCell align="center">{row.id}</TableCell>
                <TableCell align="center">{row.cpf}</TableCell>
                <TableCell align="center">{row.telefone}</TableCell>
                <TableCell align="center">{row.ultima_compra}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
