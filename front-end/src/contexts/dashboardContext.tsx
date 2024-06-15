import React, { createContext, useReducer, useContext, useEffect, ReactNode } from 'react';
import {  getAlteracoes, getMembros, getProjetoStatus,getProjetos} from '../services/dashboardApi';
import { AlteracaoProps } from '../types/alteracao';
import { Filtro, membrosProps } from '../types/membros';
import { ProjetoStatus } from '../types/projetos';
import useAuth from '../hooks/auth';
// DEFINE A ESTRUTURA DO CONTEXTO
interface DashboardState {
    projetos: { key: string; value: string }[];
    filtroProjetos: { key: string; value: string }[];
    alteracoes: AlteracaoProps;
    filteredAlteracoes: AlteracaoProps;
    membros: { key: string; value: string }[];
    filtroMembros: { key: string; value: string }[];
    projetoStatus: ProjetoStatus
    filteredProjetosStatus: ProjetoStatus
    selectedProject: string | null;
    selectedMember: string | null;
 
}

// DEFINE AS AÇÕES DO CONTEXTO
type DashboardAction =
    | { type: 'SET_PROJETOS'; payload: { key: string; value: string }[] }
    | { type: 'SET_FILTERED_PROJETOS'; payload: { key: string; value: string }[] }
    | { type: 'SET_ALTERACOES'; payload: AlteracaoProps }
    | { type: 'SET_FILTERED_ALTERACOES'; payload: AlteracaoProps }
    | { type: 'SET_MEMBROS'; payload: { key: string; value: string }[] }
    | { type: 'SET_FILTRO_MEMBROS'; payload: { key: string; value: string }[] }
    | { type: 'SET_PROJETO_STATUS'; payload: ProjetoStatus }
    | { type: 'SET_FILTERED_PROJETO_STATUS'; payload: ProjetoStatus }
    | { type: 'SET_SELECTED_PROJECT'; payload: string | null }
    | { type: 'SET_SELECTED_MEMBER'; payload: string | null };






// ESTADO INICIAL = ESTRUTURA INICIAL DO CONTEXTO 
const initialState: DashboardState = {
    projetos: [],
    filtroProjetos: [],
    filteredAlteracoes: [],
    alteracoes: [],
    membros: [],
    filtroMembros: [],
    projetoStatus: { andamento: "", concluidos: "", naoAtribuido: "" },
    filteredProjetosStatus: { andamento: "", concluidos: "", naoAtribuido: "" },
    selectedProject: null,
    selectedMember: null,


};

// FUNÇÃO REDUCER
const dashboardReducer = (state: DashboardState, action: DashboardAction): DashboardState => {
    switch (action.type) {
        case 'SET_PROJETOS':
            return { ...state, projetos: action.payload };
        case 'SET_FILTERED_PROJETOS':
            return { ...state, filtroProjetos: action.payload };
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
        case 'SET_FILTERED_PROJETO_STATUS':
            return { ...state, filteredProjetosStatus: action.payload };
            case 'SET_SELECTED_PROJECT':
                return { ...state, selectedProject: action.payload, selectedMember: null }; 
            case 'SET_SELECTED_MEMBER':
                return { ...state, selectedMember: action.payload };
        default:
            return state;
    }
};

// CRIAÇÃO DO CONTEXTO!
interface DashboardContextProps {
    state: DashboardState;
    setFiltroMembros: (value: string) => void;
    setFiltroProjetos: (value: string) => void;
}

const DashboardContext = createContext<DashboardContextProps | undefined>(undefined);

// COMPONENTE PROVIDER
interface DashboardProviderProps {
    children: ReactNode;
}


// PROVIDER
export const DashboardProvider: React.FC<DashboardProviderProps> = ({ children }) => {
    const {user} = useAuth();

    const [state, dispatch] = useReducer(dashboardReducer, initialState);

    useEffect(() => {
        const fetchData = async () => {
            try {

                const projetos = await getProjetos(user.idProjeto,user.role);
                const alteracoes = await getAlteracoes(user.idProjeto,user.role);
                const membros = await getMembros();
                const statusProjeto = await getProjetoStatus("",user.idProjeto,user.role);
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
        dispatch({ type: 'SET_SELECTED_MEMBER', payload: value });

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

        let alteracoes = state.alteracoes

        if (state.selectedProject) {
            const selectedProjectValue = parseInt(state.selectedProject);
            alteracoes = alteracoes.filter(alteracao => alteracao.idMunicipio === selectedProjectValue);
        }

        const filteredAlteracoes = alteracoes.filter(alteracao => alteracao.idanalista === filterValue || alteracao.idRevisor === filterValue);

        dispatch({ type: "SET_FILTERED_ALTERACOES", payload: filteredAlteracoes })
    }



    // FILTRO DE PROJETOS

    const setFiltroProjetos = (value: string) => {
        dispatch({ type: 'SET_SELECTED_PROJECT', payload: value });
        dispatch({ type: 'SET_SELECTED_MEMBER', payload: null });


        const projetosArray: Filtro[] = state.projetos.map(projeto => ({
            key: projeto.key,
            value: projeto.value
        }));

        const filtro = projetosArray.filter(({ key }) => key === value);
        dispatch({ type: 'SET_FILTERED_PROJETOS', payload: filtro });

        filterAlteracoesByProjetos(value);
    };

   

    const filterAlteracoesByProjetos = (value: string) => {
        const filterValue = parseInt(value); 


       const filteredAlteracoes = state.alteracoes.filter(alteracao => alteracao.idMunicipio === filterValue);
        dispatch({ type: "SET_FILTERED_ALTERACOES", payload: filteredAlteracoes })


        getProjetoStatus(value,user.idProjeto,user.role).then((data) => {
            dispatch({ type: "SET_PROJETO_STATUS", payload: data })

        })
    }

    return (
        <DashboardContext.Provider value={{ state, setFiltroMembros, setFiltroProjetos }}>
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
