export interface Projetos {
  Projetos: {
    idProjeto: string; nomeProjeto: string
  }[]
}

export interface respostaDoBanco {
  idProjeto: string;
  NomeProjeto: string;
  "Código Municipio": string;
  UF: string;
  GestorNome: string;
  GestorEmail: string;
  status: "finalizado" | "andamento";
}

export interface ProjetoStatus {
  andamento: string;
  concluidos: string;
  naoAtribuido: string;
  area: string;
}