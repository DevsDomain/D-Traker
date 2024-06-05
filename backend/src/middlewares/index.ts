import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const secreta = "segredo";

export const tokenizer = (object: any) => jwt.sign(object, secreta);

export const validar = (req: Request, res: Response, next: NextFunction) => {
  const authorization: string | undefined = req.headers.authorization;

  if (!authorization) {
    return res.status(401).send({ error: "Efetue o login para continuar" });
  } else {
    try {
      const [, token] = authorization.split(" ");
      const decoded = <any>jwt.verify(token, secreta);
      if (decoded) {
        res.locals = decoded;
        next();
      } else {
        res.status(401).send({ error: "Não autorizado" });
      }
    } catch (e: any) {
      if (e.message == "jwt malformed") {
        res.status(401).send({ error: "Token inválido" });
      } else {
        res.status(401).send({ error: e.message });
      }
    }
  }
};

export const checkAdm = (_: Request, res: Response, next: NextFunction) => {
  const { role } = res.locals;
  if (role == "adm") {
    next();
  } else {
    res.status(401).send({ error: "Acesso negado" });
  }
};
