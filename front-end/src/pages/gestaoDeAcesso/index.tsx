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
import { cadastrarGestor } from '../../controller/cadastrarGestor';
import { atribuirGestorProjeto } from '../../controller/linkGestorProjeto';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

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

    // VINCULAR GESTOR A PROJETO
    const [idGestor, setIdGestor] = useState<string>('');
    const [idProjeto, setIdProjeto] = useState<string>('');
    const [role, setRole] = useState("user")

    function handlePesquisaByProjeto(value: string) {
        setSelectedProjeto(value);
        const filter = gestoresList.filter(({ idProjeto }) => idProjeto === value);

        setFilteredGestoresList(filter);
    }

    function selectedProjetoGestor(value: string) {
        setIdProjeto(value)
    }

    function selectedGestor(value: string) {
        setIdGestor(value)
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

    const handleChange = (event: SelectChangeEvent) => {
        setRole(event.target.value)
    }

    async function CadastarGestor() {
        try {
            const response = await cadastrarGestor(gestorNome, gestorMail, gestorPassword,role);
            if (response.status === 201) {
                setGestores(prevGestores => [...prevGestores, { key: response.data.idGestor, value: gestorNome }])
                alert("Gestor Cadastrado com sucesso!")
            }

        } catch (error: any) {
            console.error("Erro ao cadastrar gestor:", error);
            alert("Erro: " + error.message);
        }
    }

    async function AtribuirGestorProjeto() {
        try {
            const response = await atribuirGestorProjeto(idGestor, idProjeto)
            if (response.status === 201) {
                alert("Atribuido com sucesso!")
                window.location.reload()
            }
        } catch (error: any) {
            console.error("Erro ao vincular gestor a projeto", error.message);
            alert("Erro: " + error.message);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const projetos = await fetchAdmin();
                const gestores = await fetchGestores();

                const projetosUnicos: { key: string; value: string }[] = projetos.map((projeto: ResponseAdminApi) => ({
                    key: projeto.idProjeto,
                    value: projeto.NomeProjeto
                }));

                const gestoresUnicos: { key: string; value: string }[] = gestores.map((gestor: GestoresApiResponse) => ({
                    key: gestor.idGestor,
                    value: gestor.nomeGestor
                }));

                setProjeto(projetosUnicos);
                setGestores(gestoresUnicos);
                setGestoresList(projetos);
                setFilteredGestoresList(projetos);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    return (

        <Stack spacing={3} margin="2% auto" marginLeft="25%">

            <Stack spacing={3}>
                <Typography variant="h4">Gestores e projetos</Typography>
                <BasicSelect onChange={handlePesquisaByProjeto} value={selectedProjeto} handlePesquisaByProjeto={selectedProjetoGestor} projeto={projeto} placeHolder='Selecione o Projeto' />
                <TabelaGestores gestores={selectedProjeto === '' ? gestoresList : filteredGestoresList} />
            </Stack>

            <Stack direction="row" spacing={10} pl={1}>

                <Stack spacing={3} >
                    <Typography variant="h5">Cadastrar novo gestor(a)</Typography>
                    <Input placeholder='Nome do gestor(a)' handleInput={handleGestorNome} type='text' />
                    <Input placeholder='email' handleInput={handleGestorMail} type='email' />
                    <Input placeholder='senha' handleInput={handleGestorPassword} type='password' />
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Atribuição</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={role}
                            label="Age"
                            onChange={handleChange}
                        >
                            <MenuItem value={"adm"}>Administrador</MenuItem>
                            <MenuItem value={"user"}>Usuário</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="outlined" onClick={() => CadastarGestor()} >Cadastrar</Button>
                </Stack>

                <Stack spacing={3}>
                    <Typography variant="h5">Vincular gestor a um projeto</Typography>
                    <BasicSelect onChange={handlePesquisaByProjeto} value={selectedProjeto} handlePesquisaByProjeto={selectedProjetoGestor} projeto={projeto} placeHolder='Selecione o Projeto' />
                    <BasicSelect onChange={handleGestorNome} value={idGestor || ""} handlePesquisaByProjeto={selectedGestor} projeto={gestores} placeHolder='Selecione o Gestor' />
                    <Button variant="outlined" style={{ width: 300 }} onClick={() => AtribuirGestorProjeto()}>Atribuir</Button>
                </Stack>

            </Stack>
        </Stack>

    );
}
