import React, { useState } from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';
import toast from 'react-hot-toast';
import { useLocation,useNavigate, Navigate, useParams } from 'react-router-dom';
import ACTIONS from '../Actions';
import Client from '../components/Client';
import Editor from "../components/Editor";
import { initSocket } from '../socket';


const EditorPage = () => {

  const socketRef= useRef(null);
  const location= useLocation();
  const {roomId}= useParams();
  const reactNavigtor= useNavigate();

  useEffect(()=>{
    const init= async () => {
        socketRef.current = await initSocket();
        socketRef.current.on('connect_error', (err) => handleErrors(err));
        socketRef.current.on('connect_failed', (err) => handleErrors(err));

        function handleErrors(e) {
          console.log('socket error', e);
          toast.error('Socket connection failed, try again later.');
          reactNavigtor('/');
      }


        socketRef.current.emit(ACTIONS.JOIN, {
          roomId,
          username:location.state?.username,

        });
    }
    init();
  },[])

  const [clients,setClients]= useState([
    {socketId:1,username:'John'},
    {socketId:2,username:'Tyson'},
    // {socketId:3,username:'Mike Savage'},
  ]);

  if(!location.state){
    return <Navigate to="/" />;
  }


  return (
    <div className="mainWrap">
      <div className="aside">
        <div className="asideInner">
          <div className="logo">
            <img src="/code-sync.png" alt="logo" className='logoImage'/>
          </div>
      
          <h3>Connected</h3>
          <div className="clientsList">
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username}/>
              ))}
          </div>
        </div>
        <button className='btn copyBtn'>Copy Room Code</button>
        <button className='btn leaveBtn'>Leave Room</button>
      </div>

      <div className="editorWrap">
        <Editor/>
      </div>
    </div>

  )
}

export default EditorPage