import React from 'react'
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <footer>
        <strong>Copyright &copy; 2025 McThunder</strong>

        <div className='privacy-links'>
          <Link to="/">Privacy Policy</Link>
          <Link to="/">Terms And Conditions</Link>          
        </div>
        <div className='social-links'>
          <a href="#"><i className="bi bi-facebook"></i></a>
          <a href="#"><i className="bi bi-twitter-x"></i></a>
          <a href="#"><i className="bi bi-instagram"></i></a>
          <a href="#"><i className="bi bi-youtube"></i></a>
          <a href="#"><i className="bi bi-linkedin"></i></a>
        </div>
    </footer>
  )
}
