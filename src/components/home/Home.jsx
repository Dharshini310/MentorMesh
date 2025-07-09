import React from 'react'

import './Home.css'
import Navbar from '../navbar/NavBar'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <div className='b_body'>
        <div className='bodyLeft'>
        <h1>Your Network for Career Navigation</h1>
        <p id='para'>A Community for Career Development</p>
        <button id='getStart'>Start Reading</button>
        </div>
        <div className='bodyRight'>
        
        <img src="https://res.cloudinary.com/dtejtkhk0/image/upload/v1751885367/image1_dexbsk.png" alt="img" />
        </div>
      </div>
    </div>
  )
}

export default Home