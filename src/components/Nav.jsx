import React, { useState } from 'react'


import appLogo from '../assets/images/VentixeLogo.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../Contexts/AuthContext'

export const Nav = ({pageName = 'Dashboard', showBackButton}) => {
  const [showMenu, setShowMenu] = useState(false)
  const navigate = useNavigate()
  const {isAuthenticated} = useAuth()
  

  return (
    <nav>
        <div className='logo'>
          <img src={appLogo} />
          <span>Ventixe</span>
        </div>

        <h1 className='pageTitle'>
          {showBackButton && (
            <button
              className='backBtn' 
              onClick={() => navigate(-1)}
              aria-label='Go Back.'>
                <i className="bi bi-arrow-left"></i>
            </button>
          )} 
          {pageName}
        </h1>

        <button 
          className='nav-mobile-menu-btn'
          onClick={() => setShowMenu(!showMenu)}>
            <i className="bi bi-list"></i>
        </button>

        <div className={showMenu ? 'nav-links show' : 'nav-links'}>
          
          <NavLink to="/">
            <i className="bi bi-ticket-perforated"></i> 
            <span>Events</span>
          </NavLink>
          
          {isAuthenticated ? (
            <NavLink to="/dashboard">
              <i className="bi bi-grid"></i> 
              <span>Dashboard</span>
            </NavLink>
          ):(<></>)}
          
          
        </div>
    </nav>
  )
}
