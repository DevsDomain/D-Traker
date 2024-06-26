export interface PesquisaProps {
  placeholder: string;
  handleInput(typedValue: string): void;
  type: string;
}

export interface PesquisaPapelProps {
  handlePesquisaByProjeto(selectedValue: string): void;
  projeto: { key: string; value: string }[];
  placeHolder: string;
}

export interface ResponseAdminApi {
  idGestor:string;
  idProjeto: string;
  NomeProjeto: string;
  "Código Municipio": string;
  UF: string;
  GestorNome: string;
  GestorEmail: string;
  status: "finalizado" | "andamento";
}

export interface GestoresApiResponse {
  idGestor: string;
  nomeGestor: string;
  emailGestor: string;
}

export interface AuthContextProps {
  user: UserProps;
  handleLogOut: () => void;
  setUser: (value: UserProps) => void;
  role: string;
  setRole: (value: string) => void;
  token: string;
  setToken: (value: string) => void;
}

export interface UserProps {
  id: string;
  name: string;
  email: string;
  role: string;
  token: string;
  idProjeto:string;
}
