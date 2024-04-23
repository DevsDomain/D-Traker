import { Request, Response } from 'express';
import gestorModel, { Gestor } from '../models/gestores';

class AuthController {
    async login(req: Request, res: Response): Promise<Response> {
        try {
            const { email, password } = req.body;

            // Verifica se o gestor existe com base no e-mail fornecido
            const gestor = await gestorModel.findOne({ email });

            if (!gestor) {
                return res.status(404).json({ message: 'Gestor não encontrado!' });
            }

            // Verifica se a senha fornecida está correta
            if (gestor.password !== password) {
                return res.status(401).json({ message: 'Credenciais inválidas!' });
            }

            // Se o gestor existe e a senha está correta, retorna os dados do gestor
            return res.status(200).json({
                id: gestor._id,
                name: gestor.name,
                email: gestor.email
                // Você pode adicionar mais campos conforme necessário
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

export default new AuthController();
