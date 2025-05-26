import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Header = ({pageName = 'Dashboard', showBackButton}) => {
  const navigate = useNavigate()

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

    </header>
  )
}
