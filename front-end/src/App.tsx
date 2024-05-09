import React from "react";
import { Rotas } from "./routes";
import { AuthProvider } from "./contexts/AuthContext";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Rotas />
    </AuthProvider>
  );
};

export default App;
