import React, { useState } from 'react'
import {v4 as uuid} from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const navigate= useNavigate();
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const createNewRoom = (e) => {
    e.preventDefault();//prevent reload
    const id= uuid();
    setRoomId(id);
    toast.success("Created a new room");
  }

  const joinRoom = () =>{
    if(!roomId){
      toast.error("Enter a valid room code");
      return;
    }
    if(!username){
      toast.error("Enter a valid username");
      return;
    }
    
    navigate(`/editor/${roomId}`,{
      state:{
        username,
      }
    })
  }

  const handleInputEnter = (e) => {
    if(e.code==="Enter"){
      joinRoom();
    }
  }

  return (
    <div className='homePageWrapper'>
      <div className='formWrapper'>
        <img className='homePageLogo' src="/code-sync.png" alt="site logo"/>
        <h4 className='mainLabel'>Join a room</h4>

        <div className="inputGroup">
          <input type="text" className='inputBox' placeholder='Room Code' value={roomId} onChange={(e)=>setRoomId(e.target.value)} 
          onKeyUp={handleInputEnter}
          />

          <input type="text" className='inputBox' placeholder='Username' value={username} onChange={(e)=>setUsername(e.target.value)}
          onKeyUp={handleInputEnter}/>

          <button className='btn joinBtn' onClick={joinRoom}>Join</button>

          <span className='createInfo'>Don't have a room code? &nbsp;
          <a onClick={createNewRoom} href="sdf" className='createNewBtn'>Make a new room.</a>
          </span>

        </div>
      </div>
      <footer>
        <h4>Built with 💛 for fellow coders! ~ AC </h4>
      </footer>
    </div>
  )
}

export default Home