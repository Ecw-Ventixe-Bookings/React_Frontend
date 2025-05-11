import React, { useState } from 'react'

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e) {
    e.preventDefault();
    
    console.log(`${email} <${password}>`)
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
    </form>
  )
}
