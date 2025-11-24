import { useEffect, useState } from "react";
import {
  Stack,
  Typography,
  TextField,
  Button,
  Alert,
  Autocomplete,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getCustomerListAPI } from "../../services/customer";


interface CustomerOption {
  id: number;
  cpf: string;
  telefone?: string;
  nome?: string;
}

export default function RegisterProduct() {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState<CustomerOption[]>([]);
  const [selectedCpf, setSelectedCpf] = useState<string | null>(null);
  const [produto, setProduto] = useState("");
  const [total, setTotal] = useState<string>("");
  const [dataCompra, setDataCompra] = useState<string>(() => {
    const d = new Date();
    return d.toISOString().slice(0, 10);
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const list = await getCustomerListAPI();
        setCustomers(Array.isArray(list) ? list : []);
      } catch (err: any) {
        console.error("Erro ao buscar clientes:", err);
        setError("Não foi possível carregar clientes.");
      }
    })();
  }, []);

  const validate = () => {
    if (!selectedCpf) return "Selecione o CPF do cliente.";
    if (!produto.trim()) return "Nome do produto é obrigatório.";
    if (!total.trim() || Number.isNaN(Number(total))) return "Informe um valor válido para total.";
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dataCompra)) return "Data inválida. Use YYYY-MM-DD.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        cpf: selectedCpf!,
        produto: produto.trim(),
        total: Number(total),
        comprado_em: dataCompra,
      };

      
      setSuccess("Compra registrada com sucesso.");
      setProduto("");
      setTotal("");
      setDataCompra(new Date().toISOString().slice(0, 10));
    } catch (err: any) {
      console.error("Erro ao registrar compra:", err);
      setError(err?.message || "Erro ao registrar compra.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack sx={{ my: 8, alignItems: "center" }} component="form" onSubmit={handleSubmit}>
      <Typography variant="h4" fontWeight={700} color="#1a568f" sx={{ mb: 3 }}>
        Registrar Compra / Cadastrar Produto
      </Typography>

      {error && <Alert severity="error" sx={{ width: "100%", maxWidth: 600 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ width: "100%", maxWidth: 600 }}>{success}</Alert>}

      <Stack gap={2} sx={{ width: "100%", maxWidth: 600, mt: 1 }}>
        <Autocomplete
          options={customers}
          getOptionLabel={(opt) => opt.nome ? `${opt.cpf} — ${opt.nome}` : `${opt.cpf}`}
          renderInput={(params) => <TextField {...params} label="Cliente (CPF)" required />}
          value={customers.find(c => c.cpf === selectedCpf) ?? null}
          onChange={(_, newVal) => setSelectedCpf(newVal ? newVal.cpf : null)}
          fullWidth
        />

        <TextField
          label="Nome do produto"
          value={produto}
          onChange={(e) => setProduto(e.target.value)}
          required
          fullWidth
        />

        <TextField
          label="Total (R$)"
          value={total}
          onChange={(e) => setTotal(e.target.value)}
          required
          fullWidth
          type="number"
          inputProps={{ step: "0.01", min: "0" }}
        />

        <TextField
          label="Data da compra"
          type="date"
          value={dataCompra}
          onChange={(e) => setDataCompra(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />

        <Stack direction="row" gap={2} justifyContent="flex-end" sx={{ mt: 1 }}>
          <Button variant="outlined" onClick={() => navigate(-1)} disabled={loading}>
            Voltar
          </Button>

          <Button type="submit" variant="contained" sx={{ bgcolor: "#1a568f" }} disabled={loading}>
            {loading ? "Registrando..." : "Registrar Compra"}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
