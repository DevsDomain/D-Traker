import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/login";

export function UnsignedRoutes() {
  console.log("aqui");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Login />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
