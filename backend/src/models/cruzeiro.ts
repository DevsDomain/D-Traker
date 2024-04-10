import mongoose, { Model, Schema } from "mongoose";
import { Gestor, gestorSchema } from "./gestores";
interface Geometry {
    type: string;
    coordinates: number[][][][];
}

export interface Feature {
    _id: mongoose.Types.ObjectId
    type: string;
    properties: Properties;
    geometry: Geometry;
}

export interface Properties {
    id: number;
    atribuicao: string;
    status: string;
    validacao: string;
    status_val: string;
    obs: string;
    area_km2: number;
}

export interface GradeAtuacao {
    type: string;
    _id: mongoose.Types.ObjectId;
    name: string;
    crs: any; // Adjust based on the actual structure
    gestor: Gestor;
    features: Feature[];
}

const geometrySchema = new Schema<Geometry>({
    type: { type: String, required: true },
    coordinates: { type: [[[[Number]]]], required: true }
});

const featureSchema = new Schema<Feature>({
    type: { type: String, required: true },
    properties: {
        id: { type: Number, required: true },
        atribuicao: { type: String, required: true },
        status: { type: String, required: true },
        validacao: { type: String, required: true },
        status_val: { type: String, required: true },
        obs: { type: String, required: true },
        area_km2: { type: Number, required: true }
    },
    geometry: { type: geometrySchema, required: true }
});


const gradeAtuacaoSchema = new Schema<GradeAtuacao>({
    type: { type: String, required: true },
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    crs: { type: Object },
    gestor: { type: gestorSchema },
    features: { type: [featureSchema], required: true }
});

const GradeAtuacaoModel: Model<GradeAtuacao> = mongoose.model("grade_atuacao", gradeAtuacaoSchema);

export default GradeAtuacaoModel;
