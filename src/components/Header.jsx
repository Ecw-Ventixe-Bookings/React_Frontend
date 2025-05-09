import React from 'react'

export const Header = ({pageName = 'Dashboard'}) => {
  return (
    <header>
        <h4>{pageName}</h4>
    </header>
  )
}
