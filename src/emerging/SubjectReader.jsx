import React from 'react'
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

const SubjectCard = ({ subjectKey, onSelect, darkMode, isLast }) => {
  const { emoji, subject, title, subtitle, description } =
    subjectMessages[subjectKey]
  // Build the full message block as a single string
  const messageBlock = `${emoji} ${subject}\n${title}\n${subtitle}\n${description}`
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
        margin: `32px auto${isLast ? '' : ' 48px'}`,
        textAlign: 'left',
        boxShadow: darkMode
          ? '0 4px 12px rgba(255,255,255,0.1)'
          : '0 4px 12px rgba(0,0,0,0.1)',
        fontSize: '1.13rem',
        fontWeight: 600,
      }}
    >
      <div
        style={{
          whiteSpace: 'pre-line',
          marginBottom: 0,
        }}
      >
        {messageBlock}
      </div>
      <div style={{ marginTop: 0 }}>
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
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            margin: '8px 0 0 0',
          }}
        >
          <span style={{ fontSize: '1.3rem' }}>➡️</span> [ Open Note ]
        </button>
      </div>
    </div>
  )
}

function SubjectReader() {
  const [darkMode, setDarkMode] = React.useState(false)
  const [selectedSubject, setSelectedSubject] = React.useState(null)
  const [loading, setLoading] = React.useState(false)

  const subjectKeys = Object.keys(subjectMessages)
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

  // Removed unused handleNext and handlePrev

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

  if (selectedSubject) {
    return (
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
        onClick={() => setDarkMode((d) => !d)}
        aria-label="Toggle dark mode"
        style={{ position: 'fixed', top: 10, right: 10, zIndex: 10 }}
      >
        {darkMode ? '🌙 Dark' : '☀️ Light'}
      </button>
      {subjectKeys.map((key, idx, arr) => (
        <SubjectCard
          key={key}
          subjectKey={key}
          onSelect={handleSubjectSelect}
          darkMode={darkMode}
          isLast={idx === arr.length - 1}
        />
      ))}
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
