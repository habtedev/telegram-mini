import React from 'react'

const EmergingWelcome = ({ onOpen }) => (
  <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'inherit' }}>
    <div style={{ fontSize: '2rem' }}>
      🎉 <b>Welcome!</b> 🎉
    </div>
    <div style={{ fontSize: '1.5rem', margin: '1rem 0' }}>
      ✨ <b>A to Z Tutorial!</b>
    </div>
    <div style={{ fontSize: '1.2rem', margin: '0.5rem 0' }}>
      <b>Emerging Technology</b>
    </div>
    <div style={{ color: '#555', marginTop: '1rem' }}>
      All Chapters In Amharic & English
    </div>
    <button
      style={{
        marginTop: '2rem',
        padding: '0.75rem 2rem',
        fontSize: '1rem',
        background: '#1976d2',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      }}
      onClick={onOpen}
    >
      Open Note
    </button>
  </div>
)

export default EmergingWelcome
