import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Intro from './introduction';

const Sender = ({ Message, Direction, Time, Messenger }) => {

    const userIntroLayout = (
        <Intro
            messenger={Message}
        />
    );

    const userMessageLayout = (
        <Box
            className={"messageBox"}
            component="div"
            sx={{
                p: 1,
                width: '100%',
                position: 'relative',
                left: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: (Direction == "right") ? "flex-end" : "flex-start"
            }}
        >
            <Typography
                variant='caption'
                color={'#888'}
                sx={{
                    fontStyle: 'italic',
                    transform: (Direction == "right") ? 'translateX(-6%)' : 'translateX(6%)'
                }}
            >
                {Messenger}
            </Typography>
            <Paper
                elevation={3}
                component="div"
                sx={{
                    display: 'inline-flex',
                    maxWidth: '48%',
                }}
            >
                <Container
                    sx={{
                        p: 1.6,
                        borderRadius: '8px',
                        background: (Direction == "right") ? " #4267B2" : '#444'
                    }}
                >
                    <Typography
                        variant="p"
                        component="div"
                        sx={{
                            fontFamily: 'cursive',
                            fontSize: '1rem',
                            background: 'transparent'
                        }}
                    >
                        {Message}
                    </Typography>
                </Container>
            </Paper>
            <Typography
                variant="small"
                sx={{
                    position: 'relative',
                    width: '68%',
                    display: 'flex',
                    padding: '0.3rem 0.2rem',
                    fontSize: '0.8rem',
                    color: 'darkgray',
                    fontFamily: 'cursive',
                    justifyContent: (Direction == "right") ? "flex-end" : "flex-start"
                }}
            >
                {Time}
            </Typography>
        </Box>
    );

    const renderFunction = () => {
        if (Direction === 'middle') {
            return userIntroLayout
        }

        return userMessageLayout
    };

    return (
        renderFunction()
    );
}

export default Sender; 