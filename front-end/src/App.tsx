import React from 'react';
import { Box } from '@mui/system';
import { useTheme } from '@mui/material/styles'; // Importe useTheme
import useMediaQuery from '@mui/material/useMediaQuery'; // Importe useMediaQuery

const App: React.FC = () => {
    const theme = useTheme(); // Use o hook useTheme
    const smDown = useMediaQuery(theme.breakpoints.down('sm')); // Use o hook useMediaQuery para verificar se a tela é pequena
    console.log("Helloooo ");
    return (
        <Box
            height="90vh"
            paddingLeft={smDown ? theme.spacing(4) : theme.spacing(35)} // Use a variável smDown para determinar o valor do espaçamento
        >
            <h1>D-TRACKER MAIN PAGE</h1>
        </Box>
    );
};

export default App;