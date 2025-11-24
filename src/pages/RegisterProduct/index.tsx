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
import { postProductAPI } from "../../services/product";

interface CustomerOption {
  cpf: string;
}

export default function RegisterProduct() {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState<CustomerOption[]>([]);
  const [selectedCpf, setSelectedCpf] = useState<string | null>(null);
  const [produtos, setProdutos] = useState<string[]>([""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const list = await getCustomerListAPI();
        setCustomers(Array.isArray(list) ? list : []);
      } catch (err) {
        console.error("Erro ao buscar clientes:", err);
        setError("Não foi possível carregar clientes.");
      }
    })();
  }, []);

  const validate = () => {
    if (!selectedCpf) return "Selecione o CPF do cliente.";
    return null;
  };

  const handleAddProduto = () => {
    setProdutos((prev) => [...prev, ""]);
  };

  const handleProdutoChange = (index: number, value: string) => {
    setProdutos((prev) => {
      const novo = [...prev];
      novo[index] = value;
      return novo;
    });
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
        cliente_cpf: selectedCpf!,
        produtos: produtos,
      };
      console.info(payload)
      await postProductAPI(payload);
      setSuccess("Compra registrada com sucesso.");
      setProdutos([""]);
    } catch (err:any) {
      console.error("Erro ao registrar compra:", err);
      setError(err?.message || "Erro ao registrar compra.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack
      sx={{ my: 8, alignItems: "center" }}
      component="form"
      onSubmit={handleSubmit}
    >
      <Typography variant="h4" fontWeight={700} color="#1a568f" sx={{ mb: 3 }}>
        Registrar Compra
      </Typography>

      {error && (
        <Alert severity="error" sx={{ width: "100%", maxWidth: 600 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ width: "100%", maxWidth: 600 }}>
          {success}
        </Alert>
      )}

      <Stack gap={2} sx={{ width: "100%", maxWidth: 600, mt: 1 }}>
        <Autocomplete
          options={customers}
          getOptionLabel={(opt) => opt.cpf}
          renderInput={(params) => (
            <TextField {...params} label="Cliente (CPF)" required />
          )}
          value={customers.find((c) => c.cpf === selectedCpf) ?? null}
          onChange={(_, newVal) => setSelectedCpf(newVal ? newVal.cpf : null)}
          fullWidth
        />
          
         {produtos.map((produto, index) => (
          <TextField
            key={index}
            label={`Produto ${index + 1}`}
            value={produto}
            onChange={(e) => handleProdutoChange(index, e.target.value)}
            required
            fullWidth
          />
        ))}

        <Button
          variant="outlined"
          onClick={handleAddProduto}
          sx={{ textTransform: "none" }}
        >
          + Adicionar outro produto
        </Button>


        <Stack direction="row" gap={2} justifyContent="flex-end" sx={{ mt: 1 }}>
          <Button
            variant="outlined"
            onClick={() => navigate(-1)}
            disabled={loading}
          >
            Voltar
          </Button>

          <Button
            type="submit"
            variant="contained"
            sx={{ bgcolor: "#1a568f" }}
            disabled={loading}
          >
            {loading ? "Registrando..." : "Registrar Compra"}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
