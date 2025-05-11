import React, { useState } from 'react'
import { useForm } from '../customHooks/useForm'

export const Register = () => {

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

  function onSubmit(formData) {
    console.log('Submitted data:', formData);
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
    </form>
  );  
}
