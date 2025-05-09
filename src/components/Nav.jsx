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

        
    </nav>
  )
}
