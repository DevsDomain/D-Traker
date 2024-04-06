export interface PesquisaProps {
    placeholder: string,
    handlePesquisa(typedValue: string): void
}

export interface PesquisaPapelProps {
    handlePesquisaByPapel(selectedValue: string): void
    papeis: string[]
}

export interface ResponseAdminApi {
    "NomeProjeto": string
    "idProjeto": string,
    "GestorNome": string,
    "GestorId": string
    "status": "finalizado" | "andamento"
}
