import { Route, Routes } from "react-router-dom";
import Login from "../pages/login";

export function UnsignedRoutes() {
  console.log("aqui");
  return (
    <>
      <Routes>
        <Route path="*" element={<Login />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}
