// apiService.ts
import { fetchAdmin } from '../services/admin';
import { fetchAlteracoes } from '../services/alteracao';
import { fetchMembros } from '../services/membros';
import { AlteracaoProps } from '../types/alteracao';
import { membrosProps } from '../types/membros';
import { ProjetoStatus } from '../types/projetos';
import { FetchProjetoStatus } from './projetosAndamento';
import { ResponseAdminApi } from '../types/gestaoDeAcesso';

export const getAlteracoes = async (): Promise<AlteracaoProps> => {
    return await fetchAlteracoes();
};

export const getProjetoStatus = async (idProjeto: string = ""): Promise<ProjetoStatus> => {
    return await FetchProjetoStatus(idProjeto)
};

export const getProjetos = async () => {
    const projetos = await fetchAdmin()
    return projetos.map((projeto: ResponseAdminApi) => ({
        key: projeto.idProjeto,
        value: projeto.NomeProjeto
    }));

}

export const getMembros = async () => {
    const membrosApi = await fetchMembros();
    return membrosApi.map((membro: membrosProps) => ({
        key: membro.idUsuario,
        value: membro.nomeUsuario
    }));

};
