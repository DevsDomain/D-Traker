import mongoose, { Model, Schema, Document } from "mongoose";

export interface Usuario extends Document {
    idUsuario: number,
    name: string;
    email: string;
    telefone: string
}

export const usuarioSchema = new Schema<Usuario>({
    idUsuario: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    telefone: { type: String, required: true }
});

const usuarioModel: Model<Usuario> = mongoose.model<Usuario>("usuario", usuarioSchema)

export default usuarioModel;
