import { useState } from "react";
import { Stack, Typography, TextField, Button, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { postCustomerAPI } from "../../services/customer";

export default function RegisterCustomer() {
  const navigate = useNavigate();

  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!cpf.trim()) return "CPF é obrigatório.";
    if (!/^\d{11}$/.test(cpf)) return "CPF deve ter 11 dígitos.";

    if (!telefone.trim()) return "Telefone é obrigatório.";
    if (!/^\d{8,13}$/.test(telefone)) return "Telefone precisa ter entre 8 e 13 dígitos.";

    return null;
  };

  const clearForm = () => {
    setCpf("");
    setTelefone("");
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const validation = validate();
    if (validation) {
      setError(validation);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        cpf,
        telefone,
      };

      await postCustomerAPI(payload);

      setSuccess("Cliente cadastrado com sucesso!");
    } catch (err: any) {
      console.error(err);
      setError("Erro ao cadastrar cliente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack sx={{ my: 8, alignItems: "center" }}>
      <Typography variant="h4" fontWeight={700} color="#1a568f" sx={{ mb: 4 }}>
        Cadastro de Cliente
      </Typography>

      <Stack
        component="form"
        onSubmit={handleSubmit}
        sx={{ width: "100%", maxWidth: 600 }}
        gap={2}
      >
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}

        <TextField
          label="CPF (somente números)"
          value={cpf}
          onChange={(e) => setCpf(e.target.value.replace(/\D/g, ""))}
          inputProps={{ maxLength: 11 }}
          required
        />

        <TextField
          label="Telefone (somente números)"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value.replace(/\D/g, ""))}
          required
        />

        <Stack direction="row" gap={2} justifyContent="flex-end" sx={{ mt: 2 }}>
          <Button variant="outlined" onClick={() => navigate(-1)} disabled={loading}>
            Voltar
          </Button>

          <Button
            type="submit"
            variant="contained"
            sx={{ bgcolor: "#1a568f" }}
            disabled={loading}
          >
            {loading ? "Salvando..." : "Cadastrar"}
          </Button>
        </Stack>
        {success && (
          <Stack direction="row" gap={2} justifyContent="flex-end" sx={{ mt: 1 }}>
            <Button
              variant="outlined"
              onClick={() => clearForm()}
            >
              Cadastrar outro
            </Button>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}
