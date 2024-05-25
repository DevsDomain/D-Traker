import mongoose, { Model, Schema } from "mongoose";

export interface ApontamentoAlteracaoType {
    id: number;
    idrevisor: Number;
    idatuacao: string;
    correcao: string;
    data_ordem: string;
    data_entrega: string;
    geom: String;
}

const ApontamentoAlteracaoSchema = new Schema<ApontamentoAlteracaoType>({
    id: { type: Number, required: true },
    idrevisor: { type: Number, required: true },
    idatuacao: { type: String, required: true },
    correcao: { type: String },
    data_ordem: { type: String, required: true },
    data_entrega: { type: String },
    geom: { type: String }
});



const ApontamentoAlteracaoModel: Model<ApontamentoAlteracaoType> = mongoose.model<ApontamentoAlteracaoType>("ApontamentoAlteracao", ApontamentoAlteracaoSchema);

export default ApontamentoAlteracaoModel;
