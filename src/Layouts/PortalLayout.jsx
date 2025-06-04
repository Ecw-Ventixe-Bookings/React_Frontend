import React from 'react'
import {Nav} from '../components/Nav'
import {Header} from '../components/Header'
import {Footer} from '../components/Footer'
import { Outlet, useLocation } from 'react-router-dom'
import CookieConsent from 'react-cookie-consent'

function PortalLayout() {
  const location = useLocation()

  const getCurrentPageName = () => {
    if (location.pathname === '/') return 'Events'

    const path = location.pathname.substring(1).split('/')[0]
    return path.charAt(0).toUpperCase() + path.substring(1)
  }

  const pageName = getCurrentPageName()
  const showBackButton = /^\/events\/[^/]+$/.test(location.pathname);

  return (
    <div className='portal-wrapper'>
        <CookieConsent>This website use essential cookies for handling authentication</CookieConsent>
        <Nav pageName = {pageName} showBackButton={showBackButton} />
        <Header pageName = {pageName} showBackButton={showBackButton} />
            <main>
                <Outlet />
            </main>
        <Footer />
    </div>
  )
}

export default PortalLayout