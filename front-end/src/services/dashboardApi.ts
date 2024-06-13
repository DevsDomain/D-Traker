// apiService.ts
import { fetchAdmin } from '../services/admin';
import { fetchAlteracoes } from '../services/alteracao';
import { fetchMembros } from '../services/membros';
import { AlteracaoProps } from '../types/alteracao';
import { membrosProps } from '../types/membros';
import { ProjetoStatus } from '../types/projetos';
import { FetchProjetoStatus } from './projetosAndamento';
import { ResponseAdminApi } from '../types/gestaoDeAcesso';

export const getAlteracoes = async (idProjeto: string, role: string): Promise<AlteracaoProps> => {
    let alteracoes: AlteracaoProps = await fetchAlteracoes();
    console.log("ALTERACOESSSS", alteracoes)
    if (role !== 'adm') {
        console.log(idProjeto)
        alteracoes = alteracoes.filter((alteracao) => alteracao.idMunicipio === Number(idProjeto));

    }
    return alteracoes
};

export const getProjetoStatus = async (idProjeto: string = "", idProjetoGestor: string, role: string): Promise<ProjetoStatus> => {
    let projetos: ProjetoStatus = await FetchProjetoStatus(idProjeto)
    console.log("ANTES DO FILTRO",projetos)

    if (role !== 'adm') {
        projetos = await FetchProjetoStatus(idProjetoGestor)
    }
    console.log("APÓS O FILTRO",projetos)
    return projetos;
};

export const getProjetos = async (idProjeto: string, role: string) => {
    let projetos = await fetchAdmin()

    if (role !== 'adm') {
        projetos = projetos.filter((projeto: ResponseAdminApi) => projeto.idProjeto === idProjeto)
    }
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
