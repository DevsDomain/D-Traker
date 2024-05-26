// apiService.ts
import { respostaDoBanco } from '../types/projetos';
import { fetchAdmin } from '../services/admin';
import { fetchAlteracoes } from '../services/alteracao';
import { fetchMembros } from '../services/membros';
import { AlteracaoProps } from '../types/alteracao';
import { membrosProps } from '../types/membros';
import { ProjetoStatus } from '../types/projetos';
import { FetchProjetoStatus } from './projetosAndamento';

export const getAdminData = async () => {
    const dadosAdmin = await fetchAdmin();
    return dadosAdmin.map((cidade: respostaDoBanco) => ({
        idProjeto: cidade.idProjeto,
        nomeProjeto: cidade.NomeProjeto
    }));
};

export const getAlteracoes = async (): Promise<AlteracaoProps> => {
    return await fetchAlteracoes();
};

export const getProjetoStatus = async(idProjeto:string = ""): Promise<ProjetoStatus> => {
    return await FetchProjetoStatus(idProjeto)
};

export const getMembros = async () => {
    const membrosApi = await fetchMembros();
    return membrosApi.map((membro: membrosProps) => ({
        key: membro.idUsuario,
        value: membro.nomeUsuario
    }));

};
