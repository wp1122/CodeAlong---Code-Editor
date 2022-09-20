import React, { useState } from 'react'
import Client from '../components/Client';
import Editor from "../components/Editor";

const EditorPage = () => {

  const [clients,setClients]= useState([
    {socketId:1,username:'John'},
    {socketId:2,username:'Tyson'},
    // {socketId:3,username:'Mike Savage'},
  ]);
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