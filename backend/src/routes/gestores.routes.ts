import { Router } from "express";
import GestorController from "../controllers/GestorController";
import { checkAdm, validar } from "../middlewares";

export const gestoresRoutes = Router();

gestoresRoutes.post("/gestor", validar, checkAdm, GestorController.create);
gestoresRoutes.get("/gestores", validar, checkAdm, GestorController.getAll);
gestoresRoutes.post(
  "/findGestor",
  validar,
  checkAdm,
  GestorController.findGestor
);
gestoresRoutes.post("/login", GestorController.login);
