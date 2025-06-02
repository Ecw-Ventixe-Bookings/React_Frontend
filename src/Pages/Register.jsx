import React, { useState } from 'react'
import { useForm } from '../customHooks/useForm'
import { Link, useNavigate } from 'react-router-dom';
import { apiBaseUrls } from '../helpers/apiHelper';
import {Loader} from '../components/Loader';


export const Register = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const {
    values,
    errors,
    handleChange,
    handleSubmit
  } = useForm({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  async function onSubmit(formData) {
    setIsLoading(true)

    try {
      const res = await fetch(`${apiBaseUrls.authService}/register`, {
        method: "POST",
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (res.ok) navigate(`/confirm-email/${formData.email}`)
    }

    catch (error) {

    }

    finally {
      setIsLoading(false)
    }

    
  }

  return (
    <form className='' onSubmit={handleSubmit(onSubmit)}>
      <span className='title'>Register</span>

      <div className='input-group'>
          <label htmlFor='firstName'>First Name</label>
          <input 
              id='firstName'
              data-validation="firstName"
              value={values.firstName}
              onChange={handleChange}
          />
          {errors.firstName && <span className="error">{errors.firstName}</span>}
      </div>

      <div className='input-group'>
          <label htmlFor='lastName'>Last Name</label>
          <input 
              id='lastName'
              data-validation="lastName"
              value={values.lastName}
              onChange={handleChange}
          />
          {errors.lastName && <span className="error">{errors.lastName}</span>}
      </div>

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

      <button type='submit' className='btn btn-primary' disabled={isLoading}>
        {isLoading 
          ? (
            <>
              <Loader />
            </>
          ) 
          : (
            'Register'
          )}
      
      </button>

      <p>Already have an account? <Link to={"/login"}>Log in</Link></p>

    </form>
  );  
}
