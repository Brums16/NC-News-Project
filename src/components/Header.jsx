import React from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../contexts/user';
import Navbar from './Navbar';
import accountIcon from '../images/account-icon.jpg'

function Header() {

  const {user, setUser} = useContext(UserContext)



  return (
    <header>
     
      <nav>


        <h3>
        <Link to="/" className = 'header-home-link'>NC News</Link>
        </h3>
        
        <div id="header-links-div">
        <h3 className="header-link">
        <Link to="/articles">Articles</Link>
        </h3>
        <h3 className="header-link">
        <Link to="/topics">Topics</Link>
        </h3>
        
        
        <h3 className="header-link">
        <Link to="/user"> {user.name}</Link>
        </h3>
        </div>
        </nav>
        </header>
  )
}

export default Header