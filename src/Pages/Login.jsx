import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { apiBaseUrls } from '../helpers/apiHelper';
import { useAuth } from '../Contexts/AuthContext';
import {Loader} from '../components/Loader';


export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const {login} = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true)

    try {
      const res = await fetch(`${apiBaseUrls.authService}/login`, {
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
          login(jwt)
          navigate('/')
        }
      }
    }

    catch (error) {

    }

    finally {
      setIsLoading(false)
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

      <button type='submit' className='btn btn-primary' disabled={isLoading}>
        {isLoading
          ? (
            <Loader />
          )
          : (
            'Login'
          )}
      </button>

      <p>Dont have an account? <Link to={"/register"}>Create one</Link></p>
    </form>
  )
}
