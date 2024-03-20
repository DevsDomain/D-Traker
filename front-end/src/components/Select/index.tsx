import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { PesquisaPapelProps } from '../../types/gestaoDeAcesso';

export default function BasicSelect({ handlePesquisaByPapel, papeis }: PesquisaPapelProps) {
    const [papel, setPapel] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setPapel(event.target.value as string);
        handlePesquisaByPapel(event.target.value as string);
    };

    return (
        <Box minWidth={200}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Papel</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={papel}
                    label="Papel"
                    onChange={handleChange}
                >
                    <MenuItem value={""}>Papel</MenuItem>
                    {papeis.map((papelItem, index) => (
                        papelItem && (
                            <MenuItem key={index} value={papelItem}>{papelItem}</MenuItem>
                        ) 
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
