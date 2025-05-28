import React, { useState } from 'react'
import { useForm } from '../customHooks/useForm'
import { Link, useNavigate } from 'react-router-dom';
import { apiBaseUrls } from '../helpers/apiHelper';


export const Register = () => {
  const navigate = useNavigate()

  const {
    values,
    errors,
    handleChange,
    handleSubmit
  } = useForm({
    email: '',
    password: '',
    confirmPassword: ''
  });

  async function onSubmit(formData) {
    const res = await fetch(apiBaseUrls.CreateAccount, {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    if (res.ok) navigate(`/confirm-email/${formData.email}`)
  }

  return (
    <form className='' onSubmit={handleSubmit(onSubmit)}>
      <span className='title'>Register</span>

      <div className='input-group'>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          data-validation="email"
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div className='input-group'>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          data-validation="password"
          value={values.password}
          onChange={handleChange}
        />
        {errors.password && <span className="error">{errors.password}</span>}
      </div>

      <div className='input-group'>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          data-validation="confirmPassword"
          value={values.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
      </div>

      <button type='submit' className='btn btn-primary'>Register</button>

      <p>Already have an account? <Link to={"/login"}>Log in</Link></p>

    </form>
  );  
}
