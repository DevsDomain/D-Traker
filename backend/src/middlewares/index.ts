import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const secreta = "segredo";

export const tokenizer = (object: any) =>
  jwt.sign(object, secreta, { expiresIn: "1h" });

export const validar = (req: Request, res: Response, next: NextFunction) => {
  // o token enviado pelo cliente no header da requisição
  const authorization: any = req.headers.authorization;

  try {
    // autorização no formato Bearer token
    const [, token] = authorization.split(" ");
    const decodificado = <any>jwt.verify(token, secreta);
    if (decodificado) {
      res.locals = decodificado;
      next();
    } else {
      res.status(401).send({ error: "Não autorizado" });
    }
  } catch (e: any) {
    res.status(401).send({ error: e.message });
  }
};
