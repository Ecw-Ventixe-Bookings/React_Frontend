import React, { useState } from 'react'

import appLogo from '../assets/images/VentixeLogo.svg'
import { NavLink } from 'react-router-dom'

export const Nav = ({pageName = 'Dashboard'}) => {
  const [showMenu, setShowMenu] = useState(false)

  

  return (
    <nav>
        <div className='logo'>
          <img src={appLogo} />
          <span>Ventixe</span>
        </div>

        <h1 className='pageTitle'>{pageName}</h1>

        <button 
          className='nav-mobile-menu-btn'
          onClick={() => setShowMenu(!showMenu)}>
            <i className="bi bi-list"></i>
        </button>

        <div className={showMenu ? 'nav-links show' : 'nav-links'}>
          <NavLink to="/">
            <i className="bi bi-grid"></i> 
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/events">
            <i className="bi bi-ticket-perforated"></i> 
            <span>Events</span>
          </NavLink>
        </div>
    </nav>
  )
}
