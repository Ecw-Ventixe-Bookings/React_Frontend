import React from 'react'
import { Outlet } from 'react-router-dom'
import CookieConsent from 'react-cookie-consent'


function CenterLayout() {
  return (

    <div className='center-wrapper'>
        <CookieConsent>This website use essential cookies for handling authentication</CookieConsent>        
        <main>
            <Outlet />
        </main>
    </div>
  )

}

export default CenterLayout
