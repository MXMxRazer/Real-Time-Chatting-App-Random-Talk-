import { Container, Box, Paper, Typography, createTheme, ThemeProvider, TextField, Button } from '@mui/material';
import { useState } from 'react';
import Body from './body';
import { useEffect } from 'react';

const Home = ({ socket }) => {

    const request = async (userInfo) => {
        try {
            const URL = 'http://localhost:3000';
            console.log(`URL: ${URL}`);
            console.log(`UserInfo: ${JSON.stringify(userInfo)}`);
            const response = await fetch(URL, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userInfo)
            })
            const json = await response.json();
            if (json.status != 200) {
                shower(prev => true); 
            } 
            console.log(json);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        socket.on('emit', data => console.log(`Data: ${data}`));
        socket.on('joinedUserData', (data) => {
            console.log(`Username : ${data.user} joined room with ID: ${data.room}`);
        })
    }, [socket]);

    const [name, namer] = useState("");
    const [rom, romer] = useState("");
    const [details, det] = useState({
        messenger: '',
        ID: ''
    });
    const [show, shower] = useState(false);

    const home = (
        <Container
            maxWidth={'xs'}
            sx={{
                height: '92vh',
                overflow: 'hidden'
            }}
        >
            <Box
                sx={{
                    height: 'inherit',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Paper
                    elevation={20}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '2rem',
                        backgroundColor: 'rgb(45, 42, 42)',
                        borderRadius: '8px',
                        userSelect: 'none',
                    }}
                >
                    <Typography
                        variant="h1"
                        sx={{
                            textAlign: 'center',
                            color: '#1778F2',
                            padding: '0.2rem    0.8rem',
                            fontFamily: 'cursive',
                            fontSize: '5rem',
                        }}
                    >
                        Welcome
                    </Typography>
                    <Typography
                        variant="h6"
                        mb={'2rem'}
                        sx={{
                            textAlign: 'center',
                            color: '#1778F2',
                            padding: '0rem 0.8rem 1rem 0.8rem',
                            fontFamily: 'cursive',
                        }}
                    >
                        to Random Talk
                    </Typography>
                    <Box
                        component={"div"}
                        onSubmit={e => {
                            e.preventDefault();
                        }
                        }
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <TextField
                            id="outlined-basic-name"
                            label="Name"
                            variant="filled"
                            sx={{
                                '& > :not(style)': {
                                    backgroundColor: 'transparent',
                                    color: 'gray',
                                    borderBottomColor: 'gray',
                                    marginBottom: '1rem'
                                }
                            }}
                            value={name}
                            onChange={e => {
                                namer(e.target.value);
                            }}
                        />
                        <TextField
                            id="outlined-basic-Room-id"
                            label="Room ID"
                            variant="filled"
                            type="text"
                            sx={{
                                '& > :not(style)': {
                                    backgroundColor: 'transparent',
                                    color: 'gray'
                                }
                            }}
                            value={rom}
                            onChange={e => {
                                romer(e.target.value);
                            }}
                        />
                    </Box>
                    <Box
                        mt={"2.8rem"}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <button
                            id="login_button"
                            style={{
                                width: '60%',
                                color: 'white',
                                padding: '0.2rem',
                                borderRadius: '8px',
                                border: '1px solid grey',
                                backgroundColor: 'green',
                                cursor: 'pointer'
                            }}
                            onClick={(e) => {
                                console.log(e.target);
                                det(prev => {
                                    return {
                                        ...prev,
                                        messenger: name,
                                        ID: rom
                                    }
                                });
                                const sendingThisToServer = {
                                    sender: name,
                                    senderId: rom
                                };
                                request(sendingThisToServer);
                                const serverUserData = { messenger: name, roomId: rom }
                                socket.emit('join_room', serverUserData);
                                console.log(`Room: ${rom}`);
                                namer('');
                                romer('');
                            }}
                        >
                            <Typography
                                variant={'subtitle1'}
                                align={'center'}
                                sx={{
                                    fontSize: '1.2rem',
                                    background: 'green'
                                }}
                            >
                                Enter
                            </Typography>
                        </button>
                    </Box>
                </Paper>
            </Box >
        </Container>
    );

    const body = (
        <Body
            socket={socket}
            details={details}
        />
    )

    return (
        <>
            {
                (!!show)
                    ?
                    (body)
                    :
                    (home)
            }
        </>
    );
}

export default Home; 