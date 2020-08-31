import React, {useState, useEffect} from 'react'
import queryString from 'query-string'
import io from 'socket.io-client';
import './Chat.css'
import Infobar from '../Infobar/Infobar'
import Input from '../Input/Input'
import Messages from '../Messages/Messages'

let socket;

const Chat = ({location}) => { //location is from props, is an object with url
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'localhost:5000'
    useEffect(() => {
        const {name, room} = queryString.parse(location.search); //search refers to url params
        socket = io(ENDPOINT);
        setName(name);
        setRoom(room);
        socket.emit('join', {name, room}, () => console.log(`${name} joined.`));
        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [ENDPOINT, location.search])

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message])
        });
    }, []);
    
    const sendMessage = (event) => {
        event.preventDefault();
        if(message){
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    return (
        <div className='outerContainer'>
            <div className='container'>
                <Infobar roomName={room}/>
                <Messages messages={messages} name={name}/>
                <Input message={message} sendMessage={sendMessage} setMessage={setMessage}/>
            </div>
        </div>
    )
}

export default Chat