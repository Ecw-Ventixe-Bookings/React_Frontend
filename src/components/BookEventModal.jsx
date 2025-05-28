/*
I have used perplexity AI to help me create this modal from scratch
*/

import React, { useEffect } from 'react'

export default function BookEventModal({ isOpen, onClose, children }) {

    if (!isOpen) return null

    // useEffect(() => {
    //     document.body.style.overflow = 'hidden';
    //     return () => { document.body.style.overflow = 'auto'; };
    // }, [])

  return (
    <>
    <div
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 1000,
        }}
      />

      {/* Modal content */}
      <div
        role="dialog"
        aria-modal="true"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#fff',
          padding: '1.5rem',
          borderRadius: '8px',
          maxWidth: '90vw',
          overflowY: 'auto',
          zIndex: 1001,
          boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: '0.5rem',
            right: '0.5rem',
            background: 'transparent',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
          }}
        >
          &times;
        </button>

        {/* Modal children */}
        {children}
      </div>
    </>
  )
}
