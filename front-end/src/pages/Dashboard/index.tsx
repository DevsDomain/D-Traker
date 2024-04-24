import React from 'react';
import { Box } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ReferenceDateDefaultBehavior from '../../components/SeletorData';

const Dashboard: React.FC = () => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <>
            
            <Box
                height="90vh"
                marginLeft={smDown ? 0 : theme.spacing(35)}
                marginTop={theme.spacing(4)} // Adicionando margem acima
                paddingLeft={smDown ? theme.spacing(2) : theme.spacing(4)} // Adicionando margem à esquerda responsiva
            >
              
                <ReferenceDateDefaultBehavior/>
                
            </Box>
        </>
    );
};

export default Dashboard;