import mongoose, { Model, Schema } from "mongoose";

export interface Municipio {
    id: number;
    cd_mun: string;
    nm_mun: string;
    sigla_uf: string;
    area_km2: number;
    idgestor:number;
    geom: String;
}

const MunicipioSchema = new Schema<Municipio>({
    id: { type: Number, required: true },
    cd_mun: { type: String, required: true },
    nm_mun: { type: String, required: true },
    sigla_uf: { type: String, required: true },
    idgestor: { type: Number, required: true },
    geom: { type: String, required: true }
});



const MunicipioModel: Model<Municipio> = mongoose.model<Municipio>("Municipio", MunicipioSchema);

export default MunicipioModel;
