import React from 'react'
import logo from '../images/logo-black.svg';
import { Link } from 'react-router-dom';
import { accountServices } from '../_services'

const Header = () => {

  return (
    <div>
      <header className="navbar-header">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
          <h1 className="title">Car~Blog</h1>
        </div>
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
            <li className="nav-item"><Link to="/edit-account" className="nav-link">Account</Link></li>
            <li className="nav-item"><Link to="#contact" onClick={(e) => {e.preventDefault(); accountServices.logout()}} className="nav-link">Logout</Link></li>
          </ul>
        </nav>
      </header>
    </div>
  )
}

export default Header