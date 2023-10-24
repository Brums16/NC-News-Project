import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function Header() {
    

  return (
    <header>
     
      <nav>
      <div className='header-links-div'>
  <Link to="/" className = 'header-link'>Home</Link>
  <Link to="/articles" className = "header-link">Articles</Link>
  </div>

        <h1>
        <Link to="/" className = 'header-link'>NC News</Link>
        </h1>
        <h3>
        <Link to="/user" className = 'header-link'>User</Link>
        </h3>
        </nav>
    </header>
  )
}

export default Header