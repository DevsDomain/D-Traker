interface Alteracao {
    idMunicipio:number;
    idProjeto: number;
    idAlteracao: number;
    data_entregue_atuacao: string;
    data_ordem_retrabalho: string;
    idanalista: number;
    idRevisor: number;

}
export type AlteracaoProps = ReadonlyArray<Alteracao>;
