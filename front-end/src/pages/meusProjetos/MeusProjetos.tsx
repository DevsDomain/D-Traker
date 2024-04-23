import React from 'react';
import { Box } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const MeusProjetos: React.FC = () => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <>
        <Box
            height="90vh"
            paddingLeft={smDown ? theme.spacing(4) : theme.spacing(35)} // Use a variável smDown para determinar o valor do espaçamento
        >
            <h1>MEUS PROJETOS</h1>
        </Box>
        </>
    );
};

export default MeusProjetos;