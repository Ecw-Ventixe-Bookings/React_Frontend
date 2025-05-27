/*
ChatGpt and ClaudeAi has been used to create this page, the code has been altered and checked by a human.
*/

import React, { useRef, useState } from 'react'

export default function ConfirmEmail() {
    const [code, setCode] = useState(["", "", "", "", "", ""])
    const inputsRef = useRef([])

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredCode = code.join('');
    console.log('Verifying code:', enteredCode);

    // TODO: Replace with real API call
    // fetch('/api/verify', { method: 'POST', body: JSON.stringify({ code: enteredCode }) })
  };

  return (
    <form className='confirm-email-form' onSubmit={handleSubmit}>
        <button className='clear-verification-inputs' onClick={handleReset}>
            <i class="bi bi-x-circle"></i>
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
        <button className='confirm-email-btn' type="submit">Verify</button>
    </form>
  );
}


