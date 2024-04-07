export interface PesquisaProps {
    placeholder: string,
    handleInput(typedValue: string): void,
    type:string
}

export interface PesquisaPapelProps {
    handlePesquisaByProjeto(selectedValue: string): void
    projeto:{key:string; value:string}[]
    placeHolder:string;
}

export interface ResponseAdminApi {
    "NomeProjeto": string
    "idProjeto": string,
    "GestorNome": string,
    "GestorId": string,
    "emailGestor": string
    "status": "finalizado" | "andamento"
}

export interface GestoresApiResponse{
    "idGestor": string,
    "nomeGestor": string,
    "emailGestor": string
}
