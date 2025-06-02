/*
ChatGpt and ClaudeAi has been used to create this page, the code has been altered and checked by a human.
*/

import React, { useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { apiBaseUrls } from '../helpers/apiHelper';
import Loader from '../components/Loader';

export default function ConfirmEmail() {
    const [code, setCode] = useState(["", "", "", "", "", ""])
    const inputsRef = useRef([])
    const navigate = useNavigate()
    const {email} = useParams()
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (value, index) => {
    if (/^\d?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const newCode = [...code];
      newCode[index - 1] = '';
      setCode(newCode);
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleReset = () => {
    setCode(['', '', '', '', '', '']);
    inputsRef.current[0]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)

    try {
      const enteredCode = code.join('');

      const jsonData =JSON.stringify( {
        code: enteredCode,
        email: email
      })

      const res = await fetch(`${apiBaseUrls.authService}/verify`, {
        method: "POST",
        headers: { 'content-type': 'application/json' },
        body: jsonData
      })

      if (res.ok) navigate("/login")
    }

    catch (error) {

    }

    finally {
      setIsLoading(false)
    }
    
  };

  return (
    <form className='confirm-email-form' onSubmit={handleSubmit}>
      <button className='clear-verification-inputs' onClick={handleReset}>
        <i className="bi bi-x-circle"></i>
      </button>

      <div className="verification-input-group" >
        {code.map((digit, idx) => (
          <input
            key={idx}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e.target.value, idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            ref={(el) => (inputsRef.current[idx] = el)}
          />
            ))}
        </div>
        
        <div>
            <p>Check your email for a verification code</p>
        </div>           
{/* confirm-email-btn */}
        <button className='btn btn-primary' type="submit">
          {isLoading
            ? (
              <Loader />
            )
            : (
              'Verify'
            )}
        </button>
    </form>
  );
}


