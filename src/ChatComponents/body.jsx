import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import ToolBar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputBase from '@mui/material/InputBase';
import Chat from './chatSender';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Body({ socket, details }) {

    const [currentMessage, current] = useState("");
    const [messageList, list] = useState([]);
    const send = async (manual, message) => {
        let dataInfo;
        if (manual) {
            dataInfo = {
                message: message,
                direction: 'middle',
                time: (new Date().getHours() > 12 ? new Date().getHours() - 12 : new Date().getHours())
                    + ':' +
                    (new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes())
                    + ' ' +
                    (new Date().getHours() > 12 ? "PM" : "AM"),
                messenger: details.messenger,
                roomID: details.ID
            }

        } else {
            dataInfo = {
                message: currentMessage,
                direction: 'right',
                time: (new Date().getHours() > 12 ? new Date().getHours() - 12 : new Date().getHours())
                    + ':' +
                    (new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes())
                    + ' ' +
                    (new Date().getHours() > 12 ? "PM" : "AM"),
                messenger: details.messenger,
                roomID: details.ID
            }
        }

        await socket.emit('send_message', dataInfo);
        list(prev => {
            return [...prev, dataInfo];
        })
    }


    // const [socketState, setSocketState] = useState(false);
    // useEffect(() => {
    //     console.log(`This useEffect ran successfully!`);
    //     socket.on('emittingInRoom', () => {
    //         console.log(`Connected_inside!`);
    //         // setSocketState(prev => !prev);
    //     });
    // }, []);

    const [disconnect, setDisconnect] = useState({
        disconnect: '',
        state: false
    });

    const [lang, setLang] = useState([]);
    console.log(`Lang: ${lang}`);


    useEffect(() => {
        socket.on('receive_message', data => {
            if (data.direction == 'middle') {
                console.log(`
                Purpose to Introduce the User!
                `);

                list(prev => {
                    return[...perv, data]; 
                })
            } else {
                data.direction = 'left';
                console.log(
                    `RoomID: ${data.roomID}\n
                    Messenger: ${data.messenger}`
                );

                list(prev => {
                    return [...prev, data];
                })
            }

        });
        socket.on('disconnected', data => {
            console.log(`Disconnected: ${data}`);
            console.log(`Disconnecter State: ${disconnect.state}`);
            setDisconnect(prev => {
                return {
                    disconnect: data,
                    state: !prev.state
                }
            });
        });
    }, [socket]);

    const darkTheme = createTheme(
        {
            palette: {
                mode: 'dark'
            }
        }
    );

    return (
        <ThemeProvider theme={darkTheme}>
            <Box
                onSubmit={e => {
                    e.preventDefault();
                }}
                sx={{
                    height: '97vh',
                    display: 'flex',
                    flexWrap: 'wrap',
                    width: '98vw',
                    justifyContent: 'center',
                    overflow: 'hidden'
                }}
            >
                <Paper
                    sx={{
                        background: 'transparent',
                        padding: '1rem',
                        width: '100%',
                        height: '94%',
                        zIndex: 10000,
                        overflow: 'hidden',
                    }}
                    elevation={8} >
                    <AppBar
                        position="static"
                        sx={{
                            background: 'transparent',
                            height: 'auto',
                            width: '100%',
                            p: 1,
                            marginBottom: '1rem'
                        }}
                    >
                        <ToolBar
                        >
                            <Typography
                                variant="h5"
                                component="div"
                                sx={{
                                    ml: 2
                                }}
                            >
                                {`Chat Room: ${details.ID}`}
                            </Typography>
                        </ToolBar>
                    </AppBar>
                    <Container
                        className='messageContainer'
                        maxWidth={'none'}
                        sx={{
                            pt: '12px',
                            pb: '12px',
                            positon: 'relative',
                            height: '76%',
                            overflowY: 'auto',
                            overflowX: 'hidden',
                            marginBottom: '1rem',

                            scrollbarWidth: 'thin',
                            '&::-webkit-scrollbar': {
                                width: '0.4rem'
                            },
                            '&::-webkit-scrollbar-track': {
                                background: '#444'
                            },
                            '&::-webkit-scrollbar-thumb': {
                                backgroundColor: '#333'
                            },
                            '&::webkit0scrollbar-thumb:hover': {
                                backgroundColor: '#555'
                            }
                        }}
                    >
                        {
                            messageList.map(item => {
                                return (
                                    // <Container
                                    //     className='messageContainer'
                                    //     key={key}
                                    //     component="div"
                                    //     sx={{
                                    //         width: 'inherit',
                                    //         display: 'inline-block',
                                    //         transform: (Direction == "right") ? 'translateX(32%)' : 'none'
                                    //     }}
                                    // >
                                    <Chat
                                        key={item.id}
                                        Message={
                                            (item.direction === 'middle')
                                                ?
                                                item.message
                                                :
                                                item.message}
                                        Messenger={item.messenger}
                                        Direction={item.direction}
                                        Time={item.time}
                                    />
                                    // </Container>
                                )
                            }
                            )
                        }
                    </Container>
                    {/* <Box
                        sx={{
                            height: 'auto',
                            borderRadius: 8,
                            borderTopLeftRadius: 0,
                            borderTopRightRadius: 0,
                            borderTop: '1px solid #555555',
                            zIndex: 1000,
                        }}
                    > */}
                    <InputBase
                        style={{
                            fontSize: '1.4rem',
                            height: 'auto',
                            padding: '0.4rem 1rem',
                            marginTop: '1rem',
                            borderRadius: 12,
                            fontFamily: 'cursive',
                            width: '100%',
                            color: 'white',
                        }}
                        placeholder={"Type here..."}
                        value={currentMessage}
                        onChange={e => {
                            current(e.target.value);
                        }}
                        onKeyPress={e => {
                            if (e.key === "Enter") {
                                current('');
                                send();
                            }
                        }}
                    />
                    {/* </Box> */}
                </Paper>
            </Box>
        </ThemeProvider >
    );
}

