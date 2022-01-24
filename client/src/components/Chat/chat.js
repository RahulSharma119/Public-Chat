import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import './chat.css';
import {InfoBar} from '../InfoBar/infobar';
import Input from '../Input/input';
import Messages from '../Messages/messages';

let socket;

export const Chat = () => {
  const [name,setName] = useState('');
  const [room,setRoom] = useState('');
  const [message,setMessage] = useState('');
  const [messages,setMessages] = useState([]);
  const ENDPOINT = 'http://localhost:5000/';

  useEffect( () => {
    const {name,room} = queryString.parse(window.location.search);
    socket = io.connect(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit('join',{name , room}, ({ error }) => {
      console.log(error);
    });

    return () => {
      socket.emit('disconnect');
      socket.off();
    }
  },[ENDPOINT,window.location.search]);


  useEffect(()=>{
    socket.on('message', (message) => {
      setMessages([...messages,message]);
    });
  },[messages]);

  const sendMessage = (event) => {
    event.preventDefault();
    if(message){
      socket.emit('sendMessage', message, ()=>setMessage(''));
    }
  }


  return(
    <div className='outerContainer'>
      <div className='container'>
        <InfoBar room ={room}/>
        <Messages messages={messages} name={name}/>
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
   )

 }

 export default Chat;