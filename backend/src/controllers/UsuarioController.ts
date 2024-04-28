import { Request, Response } from 'express';
import usuarioModel, { Usuario } from '../models/usuariosModel';


class UsuarioController {

    async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const usuarios = await usuarioModel.find({});
            const responseUsuario = usuarios.map((usuario: Usuario) => ({
                idUsuario: usuario.idUsuario,
                nomeUsuario: usuario.name,
                emailUsuario: usuario.email,
                phoneUsuario: usuario.telefone
            }))
            return res.status(201).json(responseUsuario);
        } catch (error: any) {
            return res.status(500).json({ err: error.message });
        }
    }

    async findOneUsuario(req: Request, res: Response): Promise<Response> {
        try {
            const { idUsuario } = req.body;
            const usuario = await usuarioModel.findOne({idUsuario})

            if (!usuario) {
                return res.status(400).json("Gestor não encontrado!");
            }
            return res.status(201).json(usuario);
        } catch (error: any) {
            return res.status(500).json({ err: error.message })
        }
    }


}


export default new UsuarioController();