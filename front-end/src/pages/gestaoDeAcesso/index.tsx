import Pesquisa from "../../components/Pesquisa"
import TabelaGestores from "../../components/TabelaGestores"
import { useState } from "react"
import { gestoresType,gestores } from "../../utils/gestores"

export default function GestaoDeAcesso(){
    const [gestoresList, setGestoresList] = useState<gestoresType[]>(gestores)


    function toggleGestor(gestor: gestoresType) {
        gestor.isActive = !gestor.isActive

    }

    function handlePesquisa(value: string) {
        setGestoresList(gestores.filter(({ name }) => name.toLowerCase().includes(value.toLowerCase())))
    }


    return(
        <>
        <Pesquisa placeholder='Pesquisar gestor por nome' handlePesquisa={handlePesquisa} />
        <TabelaGestores gestores={gestoresList}/>
        </>
    )
}