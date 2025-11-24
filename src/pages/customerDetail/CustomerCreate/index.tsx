import React, { useState } from "react";
import {Container,Typography,TextField,Button,Box,} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CadastroCliente() {
  const [nome, setNome] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:8000/clientes/", {
        nome,
        cpf,
        telefone,
      });
      alert("Cliente cadastrado com sucesso!");
      navigate("/dashboard"); // volta para a página do Dashboard
    } catch (error) {
      alert("Erro ao cadastrar cliente");
    }
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Cadastro de Cliente
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          fullWidth
        />
        <TextField
          label="CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          fullWidth
        />
        <TextField
          label="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Salvar
        </Button>
      </Box>
    </Container>
  );
}