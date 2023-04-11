import { useState, useEffect } from "react";

const Body2 = ({ socket }) => {

    const [message, setMessage] = useState("");
    const [sent, sentMessage] = useState([]);

    socket.on('connect', () => {
        console.log(`ID: ${socket.id}`);
    })

    useEffect(() => {
        socket.on('sent', data => {
            sentMessage(
                prev => {
                    return [...prev, data];
                }
            );
        })
    }, [socket]);

    const submit = () => {
        socket.emit('send', { message })
    }

    return (
        <div className="chat"
            style={{ color: 'white', display: 'flex', flexDirection: 'column' }}
        >
            <h1>Here</h1>
            <input
                placeholder="type here!"
                onChange={e => {
                    setMessage(e.target.value);
                }}
                style={{
                    color: 'white',
                    fontSize: '1.2rem'
                }}
            />
            <button
                style={{
                    width: '80px',
                    height: '50px',
                    background: 'white'
                }}
                onClick={submit}
            >click me!</button>
            <h1
                style={{
                    margin: '1rem',
                    white: 'white',
                    fontSize: '2rem',
                    fontFamily: 'cursive'
                }}
            >{sent}</h1>
        </div>
    );
}

export default Body2; 