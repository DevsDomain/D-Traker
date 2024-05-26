import React, { createContext, useReducer, useContext, useEffect, ReactNode } from 'react';
import { getAdminData, getAlteracoes, getMembros } from '../services/dashboardApi';
import { AlteracaoProps } from '../types/alteracao';
import { Filtro } from '../types/membros';

// DEFINE A ESTRUTURA DO CONTEXTO
interface DashboardState {
    projetos: { idProjeto: string; nomeProjeto: string }[];
    alteracoes: AlteracaoProps;
    membros: { key: string; value: string }[];
    filtroMembros: { key: string; value: string }[];
    filteredAlteracoes: AlteracaoProps;

}

// DEFINE AS AÇÕES DO CONTEXTO
type DashboardAction =
    | { type: 'SET_PROJETOS'; payload: { idProjeto: string; nomeProjeto: string }[] }
    | { type: 'SET_ALTERACOES'; payload: AlteracaoProps }
    | { type: 'SET_MEMBROS'; payload: { key: string; value: string }[] }
    | { type: 'SET_FILTRO_MEMBROS'; payload: { key: string; value: string }[];}
    | { type: 'SET_FILTERED_ALTERACOES'; payload: AlteracaoProps };


// ESTADO INICIAL = ESTRUTURA INICIAL DO CONTEXTO 
const initialState: DashboardState = {
    projetos: [],
    alteracoes: [],
    membros: [],
    filtroMembros: [],
    filteredAlteracoes: [],

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
                dispatch({ type: 'SET_PROJETOS', payload: projetos });
                dispatch({ type: 'SET_ALTERACOES', payload: alteracoes });
                dispatch({ type: 'SET_MEMBROS', payload: membros });
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
        dispatch({ type: 'SET_FILTRO_MEMBROS', payload: filtro});

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
