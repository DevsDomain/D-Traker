import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { PesquisaPapelProps } from '../../types/gestaoDeAcesso';

export default function BasicSelect({ handlePesquisaByProjeto, projeto,placeHolder }: PesquisaPapelProps) {
    const [projetos, setProjeto] = React.useState('');

    console.log(projeto)

    const handleChange = (event: SelectChangeEvent) => {
        setProjeto(event.target.value as string);
        handlePesquisaByProjeto(event.target.value as string);
    };

    return (
        <Box maxWidth={300}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{placeHolder}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={projetos}
                    label="Projeto"
                    onChange={handleChange}
                >
                    <MenuItem value={""}>{placeHolder}</MenuItem>
                    {projeto.map((item, index) => (
                        item && (
                            <MenuItem key={index} value={item.key}>{item.value}</MenuItem>
                        ) 
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
