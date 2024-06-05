import useAuth from "../hooks/auth";
import { SignedRoutes } from "./signed.routes";
import { UnsignedRoutes } from "./unsigned.routes";

export function Rotas() {
  const { user, role } = useAuth();

  return user && user.id ? (
    <SignedRoutes user={user} role={role} />
  ) : (
    <UnsignedRoutes />
  );
}
