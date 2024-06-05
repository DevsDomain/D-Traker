import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AcessoNegado = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        textAlign="center"
      >
        <Typography variant="h3" gutterBottom>
          Acesso Negado
        </Typography>
        <Typography variant="body1" gutterBottom>
          Você não tem permissão para acessar esta página.
        </Typography>
        <Button variant="contained" color="error" onClick={handleGoBack}>
          Voltar ao Dashboard
        </Button>
      </Box>
    </Container>
  );
};

export default AcessoNegado;
