import mongoose, { Model, Schema } from "mongoose";

export interface Gestor {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    password: string;
}

const gestorSchema = new Schema<Gestor>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const gestorModel: Model<Gestor> = mongoose.model("gestor", gestorSchema)

export default gestorModel;