import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../Contexts/AuthContext'

export const Header = ({pageName = 'Dashboard', showBackButton}) => {
  const navigate = useNavigate()
  const {isAuthenticated, user, logout} = useAuth()

  return (
    <header>
        <h4>
          {showBackButton && (
            <button
              className='backBtn' 
              onClick={() => navigate(-1)}
              aria-label='Go Back.'>
                <i className="bi bi-arrow-left"></i>
            </button>
          )} 
          {showBackButton ? 'Event Details' : pageName}
        </h4>

          {isAuthenticated ? (
            <div className='header-links'>
              <p>{user.email}</p>
              <button className='btn btn-primary' onClick={logout}>Logout</button>
            </div>
            
          ) : (
            <div className='header-links'>
            <Link to={'/login'} >Login</Link>
            <Link to={'/register'} >Register</Link>
            </div>
          )}

    </header>
  )
}
