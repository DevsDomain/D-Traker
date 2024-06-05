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
  role: string | null;
  setRole: (value: string | null) => void;
}

export interface UserProps {
  id: string;
  name: string;
  email: string;
  role: string | null;
}
