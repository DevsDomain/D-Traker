import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Pesquisa from "../../components/Pesquisa"
import TabelaGestores from "../../components/TabelaGestores"
import { useState } from "react"
import { gestoresType, gestores } from "../../utils/gestores"
import BasicSelect from '../../components/Select';

export default function GestaoDeAcesso() {
    const [gestoresList, setGestoresList] = useState<gestoresType[]>(gestores)

    function toggleGestor(gestor: gestoresType) {
        gestor.isActive = !gestor.isActive

    }
    function handlePesquisa(value: string) {
        setGestoresList(gestores.filter(({ name }) => name.toLowerCase().includes(value.toLowerCase())))
    }

    function handlePesquisaByPapel(value: string) {
        console.log(value)
        setGestoresList(gestores.filter(({ papel }) => papel.toLowerCase().includes(value.toLowerCase())))
    }

    return (
        <Stack spacing={3}>
            <Stack direction="row" spacing={3}>
                <Stack spacing={3} sx={{ flex: '1 1 auto' }}>
                    <Typography variant="h4">Gestão De Acesso</Typography>
                </Stack>
            </Stack>
            <Stack  spacing={3} direction={"row"} alignItems="center" minWidth={500}>
            <Pesquisa placeholder='Pesquisar gestor por nome' handlePesquisa={handlePesquisa} />
            <BasicSelect handlePesquisaByPapel={handlePesquisaByPapel} />
            </Stack>
            <TabelaGestores gestores={gestoresList} />
        </Stack>



    )
}