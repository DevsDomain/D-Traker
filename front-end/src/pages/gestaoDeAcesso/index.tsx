import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TabelaGestores from "../../components/TabelaGestores"
import { useEffect, useState } from "react"
import BasicSelect from '../../components/Select';
import { fetchAdmin } from '../../services/admin';
import { GestoresApiResponse, ResponseAdminApi } from '../../types/gestaoDeAcesso';
import Input from '../../components/Input';
import { fetchGestores } from '../../services/gestores';

export default function GestaoDeAcesso() {
    const [gestoresList, setGestoresList] = useState<ResponseAdminApi[]>([]);
    const [filteredGestoresList, setFilteredGestoresList] = useState<ResponseAdminApi[]>([]);
    const [projeto, setProjeto] = useState<{ key: string; value: string }[]>([]);
    const [selectedProjeto, setSelectedProjeto] = useState<string>('');
    const [gestores, setGestores] = useState<{ key: string; value: string }[]>([]);

    // CADASTRAR GESTOR
    const [gestorNome, setGestorNome] = useState<string>('');
    const [gestorMail, setGestorMail] = useState<string>('');
    const [gestorPassword, setGestorPassword] = useState<string>('');


    function handlePesquisaByProjeto(value: string) {
        setSelectedProjeto(value);
        const filter = gestoresList.filter(({ idProjeto }) => idProjeto === value);

        setFilteredGestoresList(filter);
    }

    function selectedProjetoGestor(value: string) {
        console.log("ID DO PROJETO", value)
    }

    function selectedGestor(value: string) {
        console.log("ID DO GESTOR", value)
    }

    function handleGestorNome(value: string) {
        setGestorNome(value);
    }

    function handleGestorMail(value: string) {
        setGestorMail(value);
    }

    function handleGestorPassword(value: string) {
        setGestorPassword(value);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchAdmin();
                const gestores = await fetchGestores();
                const projetosUnicos: { key: string; value: string }[] = data.map((projeto: ResponseAdminApi) => ({
                    key: projeto.idProjeto,
                    value: projeto.NomeProjeto
                }));

                const gestoresUnicos: { key: string; value: string }[] = gestores.map((gestor: GestoresApiResponse) => ({
                    key: gestor.idGestor,
                    value: gestor.nomeGestor
                }));

                setProjeto(projetosUnicos);
                setGestores(gestoresUnicos);
                setGestoresList(data);
                setFilteredGestoresList(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    return (
        <Stack spacing={3} margin="5% auto" maxWidth={"100vw"} justifyContent="space-evenly">


            <Stack display={"flex"} direction="row" spacing={10} alignItems="center" justifyContent="space-evenly">
                <Stack spacing={3} direction={"column"} alignItems="left" minWidth={500}>
                    <Typography variant="h4">Gestores e projetos</Typography>
                    <BasicSelect handlePesquisaByProjeto={handlePesquisaByProjeto} projeto={projeto} placeHolder='Projeto' />
                    <TabelaGestores gestores={selectedProjeto === '' ? gestoresList : filteredGestoresList} />


                    <Typography variant="h4">Vincular gestor a um projeto</Typography>
                    <BasicSelect handlePesquisaByProjeto={selectedProjetoGestor} projeto={projeto} placeHolder='Selecione o Projeto' />
                    <BasicSelect handlePesquisaByProjeto={selectedGestor} projeto={gestores} placeHolder='Selecione o Gestor' />
                    <Button variant="outlined" style={{ width: 300 }}>Atribuir</Button>



                </Stack>

                <Stack spacing={2}>
                    <Typography variant="h4">Cadastrar novo gestor(a)</Typography>
                    <Input placeholder='Nome do gestor(a)' handleInput={handleGestorNome} type='text' />
                    <Input placeholder='email' handleInput={handleGestorMail} type='email' />
                    <Input placeholder='senha' handleInput={handleGestorPassword} type='password' />

                    <Button variant="outlined" >Cadastrar</Button>
                </Stack>
            </Stack>
        </Stack>

    );
}
