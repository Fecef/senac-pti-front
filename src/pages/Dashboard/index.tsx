import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getCustomerListAPI } from "../../services/customer";
import { useEffect, useState } from "react";
import { Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
export interface Customer {
  id: number;
  cpf: string;
  telefone: string;
  ultima_compra: string; // ou Date, se você converter
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getCustomerListAPI();
    setCustomers(data);
  };

  return (
    <Stack sx={{ my: 10, alignItems: "center", gap: 4 }}>
      <Typography variant="h4" fontWeight={700} color="#1a568f">
        DASHBOARD
      </Typography>

      <TableContainer component={Paper}>
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
