
import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CadastroProduto() {
  const [nome, setNome] = useState<string>("");
  const [valor, setValor] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:8000/produtos/", {
        nome,
        valor: parseFloat(valor),
      });
      alert("Produto cadastrado com sucesso!");
      navigate("/dashboard"); // volta para a página do Dashboard
    } catch (error) {
      alert("Erro ao cadastrar produto");
    }
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Cadastro de Produto
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Nome do Produto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          fullWidth
        />
        <TextField
          label="Valor"
          type="number"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Salvar
        </Button>
      </Box>
    </Container>
  );
}
