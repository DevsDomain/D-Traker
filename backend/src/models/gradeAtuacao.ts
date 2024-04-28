import mongoose, { Model, Schema } from "mongoose";

export interface GradeAtuacao {
    id: number;
    idanalista: Number;
    atribuicao: string;
    status: string;
    validacao: string;
    status_val: string;
    obs: string;
    area_km2: number;
    data_inicial: string;
    data_entrega: string;
    idprojeto: Number; 
    geom: String;
}

const gradeAtuacaoSchema = new Schema<GradeAtuacao>({
    id: { type: Number, required: true },
    idanalista: { type: Number },
    atribuicao: { type: String, required: true },
    status: { type: String, required: true },
    validacao: { type: String, required: true },
    status_val: { type: String, required: true },
    obs: { type: String, required: true },
    area_km2: { type: Number, required: true },
    data_inicial: { type: String },
    data_entrega: { type: String },
    idprojeto: { type: Number, required: true },
    geom: { type: String, required: true }
});



const GradeAtuacaoModel: Model<GradeAtuacao> = mongoose.model<GradeAtuacao>("GradeAtuacao", gradeAtuacaoSchema);

export default GradeAtuacaoModel;
