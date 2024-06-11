import useAuth from "../hooks/auth";
import { SignedRoutes } from "./signed.routes";
import { UnsignedRoutes } from "./unsigned.routes";

export function Rotas() {
  const { user } = useAuth();
  console.log("User oi", user);
  return user && user.id ? <SignedRoutes /> : <UnsignedRoutes />;
}
