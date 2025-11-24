import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {Button, FormControl, Stack, TextField, Typography,} from "@mui/material";
import { getCustomerDetailsAPI, removeCustomerAPI, updateCustomerAPI,} from "../../services/customer";
import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface Historico {
  comprado_em: string;
}
interface Compra {
  id: string;
  produto: string;
  total_comprado: number;
  historico: Historico[];
}
interface Customer {
  id: number;
  cpf: string;
  telefone: string;
  compras: Compra[];
}

export default function CustomerDetail() {
  const navigate = useNavigate();
  const [produtoNome, setProdutoNome] = useState("");
  const [historico, setHistorico] = useState<Historico[]>([]);
  const { cpf } = useParams();
  const [customer, setCustomer] = useState<Customer>({
    id: 0,
    cpf: "",
    telefone: "",
    compras: [],
  });

  useEffect(() => {
    fetchData();
  }, [cpf]);

  const fetchData = async () => {
    if (!cpf) return;
    const res = await getCustomerDetailsAPI(cpf);
    setCustomer(res);
  };

  const handleSubmit = async () => {
    if (!cpf) return;
    const payload = { cpf: customer.cpf, telefone: customer.telefone };
    await updateCustomerAPI(cpf, payload);
    toast.success("Cliente alterado com sucesso");
    navigate(`/customer/${customer.cpf}`); 
  };

  const handleChange =
    (field: keyof Customer) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setCustomer({ ...customer, [field]: e.target.value });
    };

  const removeCustomer = async (cpf: string) => {
    await removeCustomerAPI(cpf);
    toast.success("Cliente removido com sucesso");
    navigate(`/customer/`);
  };

  return (
    <Stack
      direction="row"
      justifyContent="center"
      sx={{ my: 10, gap: 4, flexWrap: "wrap" }}
    >
      <Stack
        sx={{
          maxWidth: 400,
          gap: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold" color="#1a568f">
          Detalhes do Cliente
        </Typography>

        <FormControl>
          <TextField
            id="outlined-basic"
            label="CPF"
            variant="outlined"
            value={customer.cpf}
            onChange={handleChange("cpf")}
          />
        </FormControl>

        <FormControl>
          <TextField
            id="outlined-basic"
            label="Telefone"
            variant="outlined"
            value={customer.telefone}
            onChange={handleChange("telefone")}
          />
        </FormControl>

        <Button variant="contained" onClick={handleSubmit}>
          Salvar alterações
        </Button>

        <Button
          variant="contained"
          sx={{ bgcolor: "red" }}
          onClick={() => removeCustomer(customer.cpf)}
        >
          Apagar Cliente
        </Button>
      </Stack>

      <Stack
        sx={{
          width: 300,
          gap: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold" color="#1a568f">
          Histórico de Consumo
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ bgcolor: "#1a568f" }}>
              <TableRow>
                <TableCell
                  align="center"
                  sx={{ color: "#fff", fontWeight: 800 }}
                >
                  Produto
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "#fff", fontWeight: 800 }}
                >
                  Total de Compras
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customer.compras.map((compra) => (
                <TableRow
                  key={compra.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setProdutoNome(compra.produto);
                    setHistorico(compra.historico);
                  }}
                >
                  <TableCell align="center">{compra.produto}</TableCell>
                  <TableCell align="center">{compra.total_comprado}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>

      {produtoNome && (
        <Stack
          sx={{
            width: 300,
            gap: 3,
          }}
        >
          <Typography variant="h5" fontWeight="bold" color="#1a568f">
            Frequencia
          </Typography>

          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ bgcolor: "#1a568f" }}>
                <TableRow>
                  <TableCell
                    align="center"
                    sx={{ color: "#fff", fontWeight: 800 }}
                  >
                    {produtoNome}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {historico.map((row) => (
                  <TableRow
                    key={row.comprado_em}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="center">{row.comprado_em}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      )}
    </Stack>
  );
}
