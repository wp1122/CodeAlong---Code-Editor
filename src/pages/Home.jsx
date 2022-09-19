import React from 'react'

const Home = () => {
  return (
    <div className='homePageWrapper'>
      <div className='formWrapper'>
        <img className='homePageLogo' src="/code-sync.png" alt="site logo"/>
        <h4 className='mainLabel'>Join a room</h4>
        <div className="inputGroup">
          <input type="text" className='inputBox' placeholder='Room Code' />
          <input type="text" className='inputBox' placeholder='Username' />

          <button className='btn joinBtn'>Join</button>
          <span className='createInfo'>Don't have a room code? &nbsp;
          <a href="sdf" className='createNewBtn'>Make a new room.</a>
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