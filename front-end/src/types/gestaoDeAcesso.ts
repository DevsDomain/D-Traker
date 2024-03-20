export interface PesquisaProps {
    placeholder: string,
    handlePesquisa(typedValue: string): void
}

export interface PesquisaPapelProps {
    handlePesquisaByPapel(selectedValue: string): void
    papeis:string[]
}

export interface ResponseAdminApi {
    "idProjeto": string
    "idPropriedade": number,
    "papel": string,
    "status": "finalizado" | "andamento"
}
