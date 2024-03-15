import Card from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import { PesquisaProps } from '../../types/gestaoDeAcesso';


export default function Pesquisa({ placeholder, handlePesquisa }: PesquisaProps) {


    return (
        <Card sx={{ p: 2 }}>
            <OutlinedInput
                defaultValue=""
                fullWidth
                placeholder={placeholder}
                startAdornment={
                    <InputAdornment position="start">
                        <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
                    </InputAdornment>
                }
                sx={{ maxWidth: '450px' }}
                onChange={e => handlePesquisa(e.target.value)}
            />
        </Card>
    )
}