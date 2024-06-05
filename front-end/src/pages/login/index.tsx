import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useAuth from "../../hooks/auth";
import { loginGestor } from "../../controller/loginGestor";
import { api } from "../../services";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setUser } = useAuth();
  const { setRole } = useAuth();

  const handleLogin = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await loginGestor(email, password);

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data));
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
        setUser(response.data);
        setRole(response.data.role);
      }
    } catch (error) {
      setError("Credenciais inválidas. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Grid
        container
        component="main"
        sx={{ height: "100vh", backgroundColor: "#000000" }}
      >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={false}
          md={7}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "blue" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ color: "white" }}>
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleLogin}
              sx={{ mt: 1, maxWidth: "400px" }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  sx: {
                    color: "black", // Define a cor do texto
                    backgroundColor: email ? "#ffffff" : "#dbe6f0", // Define o fundo como cinza se o email estiver vazio
                  },
                }}
                InputLabelProps={{
                  sx: {
                    color: "blue", // Define a cor do rótulo
                    position: "absolute", // Posiciona o rótulo acima da linha da caixa
                    top: "-8px", // Ajusta a posição vertical do rótulo
                  },
                }}
                sx={{
                  "& .MuiInputBase-root": {
                    borderColor: "blue", // Define a cor da borda
                    borderWidth: "2px", // Define a largura da borda
                    borderStyle: "solid", // Define o estilo da borda como sólida
                  },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  sx: {
                    color: "black", // Define a cor do texto
                    backgroundColor: password ? "#ffffff" : "#dbe6f0",
                  },
                }}
                InputLabelProps={{
                  sx: {
                    color: "blue", // Define a cor do rótulo
                    position: "absolute", // Posiciona o rótulo acima da linha da caixa
                    top: "-8px", // Ajusta a posição vertical do rótulo
                  },
                }}
                sx={{
                  "& .MuiInputBase-root": {
                    borderColor: "blue", // Define a cor da borda
                    borderWidth: "2px", // Define a largura da borda
                    borderStyle: "solid", // Define o estilo da borda como sólida
                  },
                }}
              />
              {error && (
                <Typography variant="body2" color="error">
                  {error}
                </Typography>
              )}
              <FormControlLabel
                control={
                  <Checkbox
                    value="remember"
                    color="primary"
                    sx={{ color: "white" }}
                  />
                }
                label={
                  <Typography variant="body2" sx={{ color: "white" }}>
                    Remember me
                  </Typography>
                }
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
                style={{
                  backgroundColor: "blue",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2" style={{ color: "white" }}>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2" style={{ color: "white" }}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={5}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            alignItems="center"
            sx={{ height: "50%", width: "50%" }} // Adiciona espaçamento à direita
          >
            <img
              src="/dtracker-192x192-semfundo.png"
              alt="Logo"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <Typography
              variant="h6"
              component="h2"
              sx={{
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "240%",
              }}
            >
              D TRACKER
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Login;
