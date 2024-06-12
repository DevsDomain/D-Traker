import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { PesquisaPapelProps } from '../../types/gestaoDeAcesso';

interface BasicSelectProps extends PesquisaPapelProps {
    value: string; 
    onChange: (value: string) => void; 
    sx?: any; //inserido para caixa de pesquisa em "Meus Projetos"
}

export default function BasicSelect({ handlePesquisaByProjeto, projeto, placeHolder, value, onChange }: BasicSelectProps) {
    const handleChange = (event: SelectChangeEvent) => {
        onChange(event.target.value as string); 
        handlePesquisaByProjeto(event.target.value as string);
    };

    return (
        <Box maxWidth={300} width={300}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{placeHolder}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value} 
                    label={placeHolder}
                    onChange={handleChange}
                >
                    <MenuItem value="">{placeHolder}</MenuItem>
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
