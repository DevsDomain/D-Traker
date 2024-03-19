import mongoose, { Document, Model, Schema, mongo } from "mongoose";

interface Geometry {
    type: string;
    coordinates: number[][][][];
}

export interface Feature {
    _id:mongoose.Types.ObjectId
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

export interface GradeAtuacaoCruzeiro {
    type: string;
    _id: mongoose.Types.ObjectId;
    name: string;
    crs: any; // Adjust based on the actual structure
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


const gradeAtuacaoCruzeiroSchema = new Schema<GradeAtuacaoCruzeiro>({
    type: { type: String, required: true },
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    crs: { type: Object }, // Adjust type accordingly based on the actual structure
    features: { type: [featureSchema], required: true }
});

const GradeAtuacaoCruzeiroModel: Model<GradeAtuacaoCruzeiro> = mongoose.model("grade_atuacao_cruzeiro", gradeAtuacaoCruzeiroSchema);

export default GradeAtuacaoCruzeiroModel;
