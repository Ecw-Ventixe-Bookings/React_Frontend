import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { apiBaseUrls } from '../helpers/apiHelper';

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault();
    
    console.log(`${email} <${password}>`)

    const res = await fetch(apiBaseUrls.Login, {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify( {
        "email": email,
        "password": password
      } )
    })

    if (res.ok) {
      const jwt = await res.text()

      if (jwt) {
        localStorage.setItem('token', jwt)
        
        const claims = JSON.parse( atob(jwt.split('.')[1]) )
        console.log(`Welcome: ${claims.email} <${claims.role}>`)
        navigate('/')
      }
    }
  }

  return (
    <form className='' onSubmit={handleSubmit}>
      <span className='title'>Login</span>

      <div className='input-group'>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          onChange={e => setEmail(e.target.value)}
        />
      </div>

      <div className='input-group'>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={e => setPassword(e.target.value)}
        />
      </div>

      <button type='submit' className='btn btn-primary'>Login</button>

      <p>Dont have an account? <Link to={"/register"}>Create one</Link></p>
    </form>
  )
}
