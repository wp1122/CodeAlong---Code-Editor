import React, { useState } from 'react'
import {v4 as uuid} from "uuid";
const Home = () => {

  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const createNewRoom = (e) => {
    e.preventDefault();//prevent reload
    const id= uuid();
    setRoomId(id);
  }

  return (
    <div className='homePageWrapper'>
      <div className='formWrapper'>
        <img className='homePageLogo' src="/code-sync.png" alt="site logo"/>
        <h4 className='mainLabel'>Join a room</h4>
        <div className="inputGroup">
          <input type="text" className='inputBox' placeholder='Room Code' value={roomId} onChange={(e)=>setRoomId(e.target.value)} />
          <input type="text" className='inputBox' placeholder='Username' value={username} onChange={(e)=>setUsername(e.target.value)}/>

          <button className='btn joinBtn'>Join</button>
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