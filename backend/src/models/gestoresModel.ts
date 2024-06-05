import mongoose, { Model, Schema, Document } from "mongoose";

export interface Gestor extends Document {
  idGestor: number;
  name: string;
  email: string;
  password: string;
  role: string;
}

export const gestorSchema = new Schema<Gestor>({
  idGestor: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["user", "adm"],
    default: "user",
  },
});

const gestorModel: Model<Gestor> = mongoose.model<Gestor>(
  "gestore",
  gestorSchema
);

export default gestorModel;
