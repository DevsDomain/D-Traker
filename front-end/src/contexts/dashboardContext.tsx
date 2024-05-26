import React, { createContext, useReducer, useContext, useEffect, ReactNode } from 'react';
import { getAdminData, getAlteracoes, getMembros, getProjetoStatus } from '../services/dashboardApi';
import { AlteracaoProps } from '../types/alteracao';
import { Filtro } from '../types/membros';
import { ProjetoStatus } from '../types/projetos';

// DEFINE A ESTRUTURA DO CONTEXTO
interface DashboardState {
    projetos: { idProjeto: string; nomeProjeto: string }[];
    alteracoes: AlteracaoProps;
    filteredAlteracoes: AlteracaoProps;
    membros: { key: string; value: string }[];
    filtroMembros: { key: string; value: string }[];
    projetoStatus: ProjetoStatus
    //filteredProjetosStatus: ProjetoStatus

}

// DEFINE AS AÇÕES DO CONTEXTO
type DashboardAction =
    | { type: 'SET_PROJETOS'; payload: { idProjeto: string; nomeProjeto: string }[] }
    | { type: 'SET_ALTERACOES'; payload: AlteracaoProps }
    | { type: 'SET_FILTERED_ALTERACOES'; payload: AlteracaoProps }
    | { type: 'SET_MEMBROS'; payload: { key: string; value: string }[] }
    | { type: 'SET_FILTRO_MEMBROS'; payload: { key: string; value: string }[] }
    | { type: 'SET_PROJETO_STATUS'; payload: ProjetoStatus }




// ESTADO INICIAL = ESTRUTURA INICIAL DO CONTEXTO 
const initialState: DashboardState = {
    projetos: [],
    filteredAlteracoes: [],
    alteracoes: [],
    membros: [],
    filtroMembros: [],
    projetoStatus: { andamento: "", concluidos: "", naoAtribuido: "" },
    //filteredProjetosStatus:[]


};

// FUNÇÃO REDUCER
const dashboardReducer = (state: DashboardState, action: DashboardAction): DashboardState => {
    switch (action.type) {
        case 'SET_PROJETOS':
            return { ...state, projetos: action.payload };
        case 'SET_ALTERACOES':
            return { ...state, alteracoes: action.payload };
        case 'SET_MEMBROS':
            return { ...state, membros: action.payload };
        case 'SET_FILTRO_MEMBROS':
            return { ...state, filtroMembros: action.payload };
        case 'SET_FILTERED_ALTERACOES':
            return { ...state, filteredAlteracoes: action.payload };
        case 'SET_PROJETO_STATUS':
            return { ...state, projetoStatus: action.payload };
        default:
            return state;
    }
};

// CRIAÇÃO DO CONTEXTO!
interface DashboardContextProps {
    state: DashboardState;
    setFiltroMembros: (value: string) => void;
}

const DashboardContext = createContext<DashboardContextProps | undefined>(undefined);

// COMPONENTE PROVIDER
interface DashboardProviderProps {
    children: ReactNode;
}


// PROVIDER
export const DashboardProvider: React.FC<DashboardProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(dashboardReducer, initialState);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const projetos = await getAdminData();
                const alteracoes = await getAlteracoes();
                const membros = await getMembros();
                const statusProjeto = await getProjetoStatus();
                dispatch({ type: 'SET_PROJETOS', payload: projetos });
                dispatch({ type: 'SET_ALTERACOES', payload: alteracoes });
                dispatch({ type: 'SET_MEMBROS', payload: membros });
                dispatch({ type: 'SET_PROJETO_STATUS', payload: statusProjeto });

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const setFiltroMembros = (value: string) => {
        const membrosArray: Filtro[] = state.membros.map(membro => ({
            key: membro.key,
            value: membro.value
        }));

        const filtro = membrosArray.filter(({ key }) => key === value);
        dispatch({ type: 'SET_FILTRO_MEMBROS', payload: filtro });

        filterAlteracoesByMembro(value);

    };

    const filterAlteracoesByMembro = (value: string) => {
        const filterValue = parseInt(value);

        const filteredAlteracoes = state.alteracoes.filter(alteracao => alteracao.idanalista === filterValue || alteracao.idRevisor === filterValue);
        console.log(filteredAlteracoes.length, "LENGTH")

        dispatch({ type: "SET_FILTERED_ALTERACOES", payload: filteredAlteracoes })
    }

    return (
        <DashboardContext.Provider value={{ state, setFiltroMembros }}>
            {children}
        </DashboardContext.Provider>
    );
};

// Custom hook to use the dashboard context
export const useDashboard = (): DashboardContextProps => {
    const context = useContext(DashboardContext);
    if (context === undefined) {
        throw new Error('useDashboard must be used within a DashboardProvider');
    }
    return context;
};
