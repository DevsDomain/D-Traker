import { Router } from "express";
import GestorController from "../controllers/GestorController";

export const gestoresRoutes = Router();

gestoresRoutes.post("/gestor", GestorController.create);
gestoresRoutes.get("/gestores", GestorController.getAll);
gestoresRoutes.post("/findGestor", GestorController.findGestor);
gestoresRoutes.post("/login", GestorController.login);
