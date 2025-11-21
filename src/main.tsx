import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Header } from "./components/header/header";
import { Container } from "@mui/material";
import { GlobalStyles } from "@mui/material";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyles
        styles={{
          body: { backgroundColor: "#efefef", margin: 0 },
        }}
      />
      <Header />
      <Container>
        <App />
      </Container>
    </BrowserRouter>
  </React.StrictMode>
);
