import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TabelaGestores from "../../components/TabelaGestores"
import { useEffect, useState } from "react"
import BasicSelect from '../../components/Select';
import { fetchAdmin } from '../../services/admin';
import { ResponseAdminApi } from '../../types/gestaoDeAcesso';

export default function GestaoDeAcesso() {
    const [gestoresList, setGestoresList] = useState<ResponseAdminApi[]>([]);
    const [filteredGestoresList, setFilteredGestoresList] = useState<ResponseAdminApi[]>([]);
    const [papeis, setPapeis] = useState<string[]>([]);
    const [selectedPapel, setSelectedPapel] = useState<string>('');

    function handlePesquisaByPapel(value: string) {
        setSelectedPapel(value);
        const filter = gestoresList.filter(({ papel }) => papel === value);

        setFilteredGestoresList(filter);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchAdmin();
                const papeisUnicos: string[] = [...new Set((data as ResponseAdminApi[]).map((item: ResponseAdminApi) => item.papel))];
                setPapeis(papeisUnicos);
                setGestoresList(data);
                setFilteredGestoresList(data);
                console.log(data.map((item: ResponseAdminApi) => {
                    if (!item.papel) {
                        console.log(item)
                    }
                }))
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <Stack spacing={3}>
            <Stack direction="row" spacing={3}>
                <Stack spacing={3} sx={{ flex: '1 1 auto' }}>
                    <Typography variant="h4">Gestão De Acesso</Typography>
                </Stack>
            </Stack>
            <Stack spacing={3} direction={"row"} alignItems="center" minWidth={500}>
                <BasicSelect handlePesquisaByPapel={handlePesquisaByPapel} papeis={papeis} />
            </Stack>
            <TabelaGestores gestores={selectedPapel === '' ? gestoresList : filteredGestoresList} />
        </Stack>
    );
}
