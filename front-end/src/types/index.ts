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
  NomeProjeto: string;
  idProjeto: string;
  GestorId: string;
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
  Logar: (
    mail: string,
    password: string,
    setLoading: Function
  ) => Promise<Response | number>;
  handleLogOut: () => void;
  setUser: (value: UserProps) => void;
}

export interface UserProps {
  id: string;
  name: string;
  email: string;
}
