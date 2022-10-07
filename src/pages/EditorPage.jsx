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
  const codeRef= useRef(null);
  const location= useLocation();
  const {roomId}= useParams();

  const [clients,setClients]= useState([]);
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

        //User Joined event listening
        socketRef.current.on(ACTIONS.JOINED,
          ({clients,username,socketId})=>{
            if(username!=location.state?.username){
              toast.success(`${username} joined the room.`);
              console.log(`${username} joined testing log`);
            }
            setClients(clients);
            socketRef.current.emit(ACTIONS.SYNC_CODE,{
              code:codeRef.current,
              socketId,
            });
          }
        )
        
        //User left event listening
        socketRef.current.on(ACTIONS.DISCONNECTED,
          ({socketId,username})=>{

              toast.success(`${username} left the room.`);
              console.log(`${username} joined testing log`);
            
            setClients((prev)=>{
              return prev.filter(client=>client.socketId!==socketId)
            });
          }
        );
    };
    init();
    //we have used multiple on listeners, we need to clean them to avoid memory leakage using cleaning function below
    return ()=>{

      socketRef.current.off(ACTIONS.JOINED);
      socketRef.current.off(ACTIONS.DISCONNECTED);
      socketRef.current.disconnect();
    }
  },[])

  async function copyRoomId(){
    try{
      await navigator.clipboard.writeText(roomId);
      toast.success('Copied Room ID');
    }catch(err){
      toast.error('Failed to Copy Room ID');
      console.log(err);
    }
  }

  function leaveRoom(){
    reactNavigtor('/');
  }
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
        <button className='btn copyBtn' onClick={copyRoomId}>Copy Room Code</button>
        <button className='btn leaveBtn' onClick={leaveRoom}>Leave Room</button>
      </div>

      <div className="editorWrap">
        <Editor socketRef={socketRef} roomId={roomId} 
        onCodeChange={(code)=>{
          codeRef.current=code;
        }}/>
      </div>
    </div>

  )
}

export default EditorPage