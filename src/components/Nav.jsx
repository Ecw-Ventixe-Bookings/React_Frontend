import React from 'react'

import appLogo from '../assets/images/VentixeLogo.svg'
import { NavLink } from 'react-router-dom'

export const Nav = () => {
  return (
    <nav>
        <div className='logo'>
          <img src={appLogo} />
          <span>Ventixe</span>
        </div>

        <div className='nav-links'>
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
