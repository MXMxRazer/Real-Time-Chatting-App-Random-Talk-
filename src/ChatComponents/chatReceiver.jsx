import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Receiver = ({ rMessage }) => {

    return (
        <Box
            sx={{
                p: 1,
                display: 'flex',
                justifyContent: 'flex-end'
            }}
        >
            <Paper
                elevation={12}
                component="div"
                sx={{
                    display: 'inline-flex',
                    maxWidth: '70%',
                }}
            >
                <Container
                    sx={{
                        p: 1.6,
                        borderRadius: '4px',
                        background: 'transparent',
                        backgroundColor: '#0165E1'
                    }}
                >
                    <Typography
                        variant="p"
                        component="div"
                        sx={{
                            backgroundColor: '#0165E1',
                            textDecoration: 'none',
                            fontFamily: 'cursive',
                            fontSize: '1rem'
                        }}
                    >
                        {rMessage}
                    </Typography>
                </Container>
            </Paper>
        </Box>
    );
}

export default Receiver; 