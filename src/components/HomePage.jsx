import React from 'react'
import { useState } from 'react'
import globe from '../images/globe.png'
import nclogo from '../images/northcoderslogo.jpg'
import { Link } from 'react-router-dom'

function HomePage() {
    

  return (
    <section id="homepage-main"><div id="tagline-boxes">
      <div id="tagline">
      <h1>Bringing you the latest and greatest news from across the globe</h1>
        </div>
      <div id="homepage-boxes">
      <div id="homepage-box-1" className="homepage-box">
      <p className="italic-box">FOR GENERALISTS</p>
      <h3>Start reading articles today</h3>
      <p>Click the button to read some fascinating new articles</p>
      <button className="homepage-box-button"><Link to="/articles" className="homepage-link">Start Reading Now</Link></button>
        </div>
        
      <div id="homepage-box-1" className="homepage-box">
      <p className="italic-box">FOR SPECIALISTS</p>
      <h3>Browse our interesting articles by topic</h3>
      <p>Click the button to learn more about a topic of your choice!</p>
      <button className="homepage-box-button"><Link to="/topics" className="homepage-link">View All Topics</Link></button>
        </div>
      </div>
      </div>
      <img src={globe}>
        </img>
        </section>

  )
}

export default HomePage