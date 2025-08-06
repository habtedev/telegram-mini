import React, { useState } from 'react'
import './emerging.scss'
import PDFViewerScrollable from './PDFViewerScrollable'

const subjectMessages = {
  emerging: {
    emoji: '📘',
    subject: 'Emerging Technology',
    title: '🎉 Welcome! 🎉',
    subtitle: '✨ A to Z Tutorial!',
    description: 'Emerging Technology\nAll Chapters In Amharic & English',
    button: 'Open Note',
    pdf: 'emerging.pdf',
  },
  atoz: {
    emoji: '📙',
    subject: 'Antropology',
    title: '🎉 Welcome! 🎉',
    subtitle: '✨ A to Z Tutorial!',
    description: 'Antropology\nAll Chapters In Amharic & English',
    button: 'Open Note',
    pdf: 'antro.pdf',
  },
  civic: {
    emoji: '📗',
    subject: 'Civics',
    title: '🎉 Welcome! 🎉',
    subtitle: '✨ A to Z Tutorial!',
    description: 'Civics\nAll Chapters In Amharic & English',
    button: 'Open Note',
    pdf: 'civic.pdf',
  },
  global: {
    emoji: '🌍',
    subject: 'Global',
    title: '🎉 Welcome! 🎉',
    subtitle: '✨ A to Z Tutorial!',
    description: 'Global\nAll Chapters In Amharic & English',
    button: 'Open Note',
    pdf: 'global.pdf',
  },
  logic: {
    emoji: '📕',
    subject: 'Logic and Critical Thinking',
    title: '🎉 Welcome! 🎉',
    subtitle: '✨ A to Z Tutorial!',
    description:
      'Logic and Critical Thinking\nAll Chapters In Amharic & English',
    button: 'Open Note',
    pdf: 'Logic and Critical Thinking.pdf',
  },
}

const SubjectCard = ({ subjectKey, onSelect, darkMode }) => {
  const { emoji, subject, title, subtitle, description } =
    subjectMessages[subjectKey]
  const [line1, line2] = description.split('\n')
  return (
    <div
      className="subject-card"
      style={{
        background: darkMode ? '#1e1e1e' : '#fff',
        color: darkMode ? '#fff' : '#333',
        border: `2px solid ${darkMode ? '#444' : '#ddd'}`,
        borderRadius: '16px',
        padding: '20px',
        maxWidth: '400px',
        margin: '32px auto',
        textAlign: 'center',
        boxShadow: darkMode
          ? '0 4px 12px rgba(255,255,255,0.1)'
          : '0 4px 12px rgba(0,0,0,0.1)',
      }}
    >
      <div style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 6 }}>
        {emoji} {subject}
      </div>
      <div style={{ fontSize: '1.8rem', fontWeight: 700 }}>{title}</div>
      <div style={{ fontSize: '1.2rem', margin: '8px 0', color: '#1976d2' }}>
        {subtitle}
      </div>
      <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>{line1}</div>
      <div style={{ fontSize: '1.1rem', marginBottom: 12 }}>{line2}</div>
      <button
        onClick={() => onSelect(subjectKey)}
        style={{
          padding: '10px 24px',
          borderRadius: '30px',
          background: '#1976d2',
          color: '#fff',
          border: 'none',
          fontWeight: 'bold',
          cursor: 'pointer',
          fontSize: '1.1rem',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          margin: '0 auto',
        }}
      >
        <span style={{ fontSize: '1.3rem' }}>➡️</span> [ Open Note ]
      </button>
    </div>
  )
}

function SubjectReader() {
  const [darkMode, setDarkMode] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [loading, setLoading] = useState(false)

  const isMobile = () =>
    /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
      navigator.userAgent,
    )

  const handleSubjectSelect = (key) => {
    setLoading(true)
    setTimeout(() => {
      setSelectedSubject(key)
      setLoading(false)
    }, 500)
  }

  const toggleDarkMode = () => setDarkMode((d) => !d)

  if (!isMobile()) {
    return (
      <div
        className={`emerging-container modern-emerging${
          darkMode ? ' dark' : ''
        }`}
      >
        <h2>
          Open this mini app in Telegram on your mobile device for the best
          experience.
        </h2>
      </div>
    )
  }

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: darkMode ? '#181818' : '#f5f5f5',
      }}
    >
      <button
        className="dark-toggle"
        onClick={toggleDarkMode}
        aria-label="Toggle dark mode"
        style={{ position: 'fixed', top: 10, right: 10, zIndex: 10 }}
      >
        {darkMode ? '🌙 Dark' : '☀️ Light'}
      </button>
      {!selectedSubject && (
        <div>
          {Object.keys(subjectMessages).map((key) => (
            <SubjectCard
              key={key}
              subjectKey={key}
              onSelect={handleSubjectSelect}
              darkMode={darkMode}
            />
          ))}
        </div>
      )}
      {selectedSubject && (
        <div style={{ maxWidth: '700px', margin: '32px auto' }}>
          <PDFViewerScrollable
            url={`/${subjectMessages[selectedSubject].pdf}`}
            darkMode={darkMode}
          />
          <button
            onClick={() => setSelectedSubject(null)}
            style={{
              marginTop: 24,
              padding: '10px 20px',
              borderRadius: '30px',
              background: '#1976d2',
              color: '#fff',
              border: 'none',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Back to Subjects
          </button>
        </div>
      )}
      {loading && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.2)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              background: '#fff',
              padding: 32,
              borderRadius: 16,
              fontSize: 24,
            }}
          >
            Loading...
          </div>
        </div>
      )}
    </div>
  )
}

export default SubjectReader
