import useAuth from "../hooks/auth";
import { SignedRoutes } from "./signed.routes";
import { UnsignedRoutes } from "./unsigned.routes";

export function Rotas() {
  const { user } = useAuth();
  return user && user.id ? <SignedRoutes /> : <UnsignedRoutes />;
}
