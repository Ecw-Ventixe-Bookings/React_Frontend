import React from 'react'
import {Nav} from '../components/Nav'
import {Header} from '../components/Header'
import {Footer} from '../components/Footer'
import { Outlet, useLocation } from 'react-router-dom'

function PortalLayout() {
  const location = useLocation()

  const getCurrentPageName = () => {
    if (location.pathname === '/') return 'Dashboard'

    const path = location.pathname.substring(1).split('/')[0]
    return path.charAt(0).toUpperCase() + path.substring(1)
  }

  const pageName = getCurrentPageName()

  return (
    <div className='portal-wrapper'>
        <Nav pageName = {pageName} />
        <Header pageName = {pageName} />
            <main>
                <Outlet />
            </main>
        <Footer />
    </div>
  )
}

export default PortalLayout