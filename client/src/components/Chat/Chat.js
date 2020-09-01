import React, {useState, useEffect} from 'react'
import queryString from 'query-string'
import io from 'socket.io-client';
import './Chat.css'
import Infobar from '../Infobar/Infobar'
import Input from '../Input/Input'
import Messages from '../Messages/Messages'
import TextContainer from '../TextContainer/TextContainer'

let socket;

const Chat = ({location}) => { //location is from props, is an object with url
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const ENDPOINT = 'localhost:5000'
    useEffect(() => {
        const {name, room} = queryString.parse(location.search); //search refers to url params
        socket = io(ENDPOINT);
        setName(name);
        setRoom(room);
        socket.emit('join', {name, room}, (error) => {
            if(error){
                window.location.href = '/';
                alert(error);
            };
        });
        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [ENDPOINT, location.search])

    useEffect(() => {
        socket.on('message', message => {
            setMessages(messages => [ ...messages, message ]);
        });
        socket.on('roomData', (data) => {
            setUsers(data.users);
        })
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
            <TextContainer users={users}/>
        </div>
    )
}

export default Chat