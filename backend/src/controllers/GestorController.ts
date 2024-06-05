import { Request, Response } from "express";
import gestorModel, { Gestor } from "../models/gestoresModel";
import jwt from "jsonwebtoken";
import { tokenizer } from "../middlewares";

class GestorController {
  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const gestores = await gestorModel.find({});
      const responseGestor = gestores.map((gestor: Gestor) => ({
        nomeGestor: gestor.name,
        emailGestor: gestor.email,
        idGestor: gestor.idGestor,
      }));
      return res.status(201).json(responseGestor);
    } catch (error: any) {
      return res.status(500).json({ err: error.message });
    }
  }

  async findGestor(req: Request, res: Response): Promise<Response> {
    try {
      const { idGestor } = req.body;
      const gestor = await gestorModel.findOne({ idGestor });

      if (!gestor) {
        return res.status(400).json("Gestor não encontrado!");
      }
      return res.status(201).json(gestor);
    } catch (error: any) {
      return res.status(500).json({ err: error.message });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, password, role } = req.body;

      // Verifica se o e-mail já está cadastrado
      const userExists = await gestorModel.findOne({ email });
      if (userExists) {
        return res.status(400).json("Usuário já cadastrado!");
      }

      const ultimoID = await gestorModel
        .findOne({})
        .sort({ idGestor: -1 })
        .limit(1);

      let idGestor: number = 1;

      if (ultimoID) {
        idGestor = ultimoID.idGestor + 1;
      }

      const gestor = new gestorModel({ idGestor, name, email, password, role });
      const response = await gestor.save();

      return res.status(201).json(response);
    } catch (error: any) {
      return res.status(500).json(error.message);
    }
  }
  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;

      // Verifica se o gestor existe com base no e-mail fornecido
      const gestor = await gestorModel.findOne({ email });

      if (!gestor) {
        return res.status(404).json({ message: "Gestor não encontrado!" });
      }

      // Verifica se a senha fornecida está correta
      if (gestor.password !== password) {
        return res.status(401).json({ message: "Credenciais inválidas!" });
      }
      // Se o gestor existe e a senha está correta, gera o token JWT
      const token = tokenizer({
        id: gestor._id,
        email: gestor.email,
        role: gestor.role,
      });

      // Retorna os dados do gestor e o token JWT
      return res.status(200).json({
        id: gestor._id,
        name: gestor.name,
        email: gestor.email,
        token: token,
        role: gestor.role,
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default new GestorController();
