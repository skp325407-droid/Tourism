import React from 'react'
import '../App.css';
import Nav from '../component/Nav';
import {Link} from 'react-router-dom'

function Home(){
  return (
    <div className="hero-background">
        <Nav/>
        <br></br>
        <div className='hero-content'>
          <h1>Welcome</h1>
          
        </div>
        <footer>
        <p>© 2026 My Travel App</p>
      </footer>
        <Link to ="/explore" className="explore-btn">Start Exploring</Link>
    </div>
    
  )
}

export default Home