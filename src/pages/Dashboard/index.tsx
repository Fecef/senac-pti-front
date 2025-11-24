import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getCustomerListAPI } from "../../services/customer";
import { useEffect, useState, useCallback } from "react";
import { Stack, Typography, Button, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

export interface Customer {
  id: number;
  cpf: string;
  telefone: string;
  ultima_compra: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
  setLoading(true);
  setError(null);
  try {
    const data = await getCustomerListAPI();
    if (!Array.isArray(data)) throw new Error("Resposta inesperada do servidor.");
    setCustomers(data);
  } catch (err: any) {
    console.error(err);
    setError(err?.message || "Erro ao buscar clientes");
    setCustomers([]);
  } finally {
    setLoading(false);
  }
}, []);


  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <Stack sx={{ my: 10, alignItems: "center", gap: 4 }}>
        <Typography variant="h4" fontWeight={700} color="#1a568f">
          DASHBOARD
        </Typography>
        <div style={{ padding: 40 }}>Carregando...</div>
      </Stack>
    );
  }

  if (error) {
    return (
      <Stack sx={{ my: 10, alignItems: "center", gap: 4 }}>
        <Typography variant="h4" fontWeight={700} color="#1a568f">
          DASHBOARD
        </Typography>
        <Alert severity="error" sx={{ width: "100%", maxWidth: 900 }}>
          {error}
        </Alert>
        <Stack direction="row" gap={2} sx={{ mt: 2 }}>
          <Button variant="contained" sx={{ bgcolor: "#1a568f" }} onClick={() => navigate("/customer")}>
            Cadastrar Cliente
          </Button>
          <Button variant="contained" sx={{ bgcolor: "#1a568f" }} onClick={() => navigate("/product")}>
            Cadastrar Produto
          </Button>
          <Button variant="outlined" onClick={() => fetchData()}>Tentar novamente</Button>
        </Stack>
      </Stack>
    );
  }

  return (
    <Stack sx={{ my: 10, alignItems: "center", gap: 4 }}>
      <Typography variant="h4" fontWeight={700} color="#1a568f">
        DASHBOARD
      </Typography>

      <Stack direction="row" gap={2}>
        <Button
          variant="contained"
          sx={{ bgcolor: "#1a568f" }}
          onClick={() => navigate("/customer")}
        >
          Cadastrar Cliente
        </Button>

        <Button
          variant="contained"
          sx={{ bgcolor: "#1a568f" }}
          onClick={() => navigate("/product")}
        >
          Cadastrar Produto
        </Button>
      </Stack>

      <TableContainer component={Paper} sx={{ width: "100%", maxWidth: 900 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: "#1a568f" }}>
            <TableRow>
              <TableCell align="center" sx={{ color: "#fff", fontWeight: 800 }}>
                ID
              </TableCell>
              <TableCell align="center" sx={{ color: "#fff", fontWeight: 800 }}>
                CPF
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
            {customers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  Nenhum cliente encontrado.
                </TableCell>
              </TableRow>
            ) : (
              customers.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    if (row.cpf) navigate(`/customer/${row.cpf}`);
                  }}
                >
                  <TableCell align="center">{row.id}</TableCell>
                  <TableCell align="center">{row.cpf}</TableCell>
                  <TableCell align="center">{row.telefone}</TableCell>
                  <TableCell align="center">{row.ultima_compra}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
