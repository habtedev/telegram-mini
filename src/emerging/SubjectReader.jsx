import React, { useState, useEffect } from 'react'
import './emerging.scss'
import PDFViewerScrollable from './PDFViewerScrollable'

const subjectMessages = {
  emerging: {
    title: '🎉  Welcome!  🎉',
    subtitle: '✨ A to Z Tutorial!',
    description: 'Emerging Technology\n\nAll Chapters In Amharic & English',
    button: 'Open Note',
  },
  atoz: {
    title: '🎉  Welcome!  🎉',
    subtitle: '✨ Antropology Tutorial!',
    description: 'Antro\n\nAll Chapters In Amharic & English',
    button: 'Open Note',
  },
  civic: {
    title: '🎉  Welcome!  🎉',
    subtitle: '✨ Civics Tutorial!',
    description: 'Civic\n\nAll Chapters In Amharic & English',
    button: 'Open Civics Note',
  },
  global: {
    title: '🎉  Welcome!  🎉',
    subtitle: '✨ Global Tutorial!',
    description: 'Global\n\nAll Chapters In Amharic & English',
    button: 'Open Global Note',
  },
  logic: {
    title: '🎉  Welcome!  🎉',
    subtitle: '✨ Logic and Critical Thinking Tutorial',
    description: 'Logic\n\nAll Chapters In Amharic & English',
    button: 'Open Logic Note',
  },
}

function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name)
}

const ModernLoading = ({ show }) => {
  if (!show) return null
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 180,
        color: '#1976d2',
        fontSize: '1.2em',
        fontWeight: 600,
        zIndex: 1000,
        background: 'rgba(255,255,255,0.95)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <div style={{ fontSize: '2.5em', marginBottom: 8 }}>⏳🌀✨📚🚀🔄</div>
      <div
        style={{
          fontSize: '1.2em',
          color: '#1976d2',
          fontWeight: 'bold',
        }}
      >
        Loading your note...
      </div>
      <svg
        width="60"
        height="60"
        viewBox="0 0 60 60"
        style={{ margin: '18px 0' }}
      >
        <circle
          cx="30"
          cy="30"
          r="24"
          stroke="#1976d2"
          strokeWidth="6"
          fill="none"
          strokeDasharray="113"
          strokeDashoffset="30"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 30 30"
            to="360 30 30"
            dur="1s"
            repeatCount="indefinite"
          />
        </circle>
        <circle
          cx="30"
          cy="30"
          r="16"
          stroke="#ffb300"
          strokeWidth="4"
          fill="none"
          strokeDasharray="70"
          strokeDashoffset="20"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="360 30 30"
            to="0 30 30"
            dur="1.2s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
      <div style={{ color: '#ffb300', fontSize: '1.1em' }}>
        Please wait while we prepare your note!
      </div>
    </div>
  )
}

const SubjectPicker = ({ onSelect, current }) => (
  <div
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
      justifyContent: 'center',
      margin: '18px 0',
    }}
  >
    {Object.keys(subjectMessages).map((key) => (
      <button
        key={key}
        className={`subject-btn${current === key ? ' selected' : ''}`}
        style={{
          padding: '8px 16px',
          borderRadius: '20px',
          border: current === key ? '2px solid #1976d2' : '1px solid #bbb',
          background: current === key ? '#e3f2fd' : '#fff',
          color: '#1976d2',
          fontWeight: 600,
          cursor: 'pointer',
        }}
        onClick={() => onSelect(key)}
      >
        {subjectMessages[key].subtitle.replace('✨ ', '')}
      </button>
    ))}
  </div>
)

const SubjectReader = () => {
  const [darkMode, setDarkMode] = useState(false)
  const toggleDarkMode = () => setDarkMode((d) => !d)

  // Use state for subject and pdf, and update on URL change
  const [subject, setSubject] = useState(
    getQueryParam('subject') === 'civics'
      ? 'civic'
      : getQueryParam('subject') || 'emerging',
  )
  const [pdf, setPdf] = useState(
    getQueryParam('pdf') === 'civics.pdf'
      ? 'civic.pdf'
      : getQueryParam('pdf') || 'emerging.pdf',
  )
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [subject, pdf])

  useEffect(() => {
    const onUrlChange = () => {
      const subj =
        getQueryParam('subject') === 'civics'
          ? 'civic'
          : getQueryParam('subject') || 'emerging'
      const pdfFile =
        getQueryParam('pdf') === 'civics.pdf'
          ? 'civic.pdf'
          : getQueryParam('pdf') || 'emerging.pdf'
      setSubject(subj)
      setPdf(pdfFile)
    }
    window.addEventListener('popstate', onUrlChange)
    window.addEventListener('pushstate', onUrlChange)
    window.addEventListener('replacestate', onUrlChange)
    window.addEventListener('hashchange', onUrlChange)
    return () => {
      window.removeEventListener('popstate', onUrlChange)
      window.removeEventListener('pushstate', onUrlChange)
      window.removeEventListener('replacestate', onUrlChange)
      window.removeEventListener('hashchange', onUrlChange)
    }
  }, [])

  const msg = subjectMessages[subject] || subjectMessages['emerging']

  // Only detect mobile by user agent, not by screen size
  const isMobile = () =>
    /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
      navigator.userAgent,
    )

  // Add a handler to change subject and update URL
  const handleSubjectSelect = (key) => {
    let realKey = key === 'civics' ? 'civic' : key
    let realPdf = key === 'civics' ? 'civic.pdf' : `${key}.pdf`
    setSubject(realKey)
    setPdf(realPdf)
    const params = new URLSearchParams(window.location.search)
    params.set('subject', realKey)
    params.set('pdf', realPdf)
    window.history.replaceState({}, '', `${window.location.pathname}?${params}`)
  }

  if (!isMobile()) {
    return (
      <div
        className={`emerging-container modern-emerging${
          darkMode ? ' dark' : ''
        }`}
        style={{
          minHeight: '40vh',
          maxWidth: '700px',
          margin: '32px auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <button
          className="dark-toggle"
          onClick={toggleDarkMode}
          aria-label="Toggle dark mode"
        >
          {darkMode ? '🌙 Dark' : '☀️ Light'}
        </button>
        <div style={{ width: '100%' }}>
          {/* <SubjectPicker onSelect={handleSubjectSelect} current={subject} /> */}
          <h2 style={{ color: '#d32f2f', fontWeight: 700 }}>
            This content is only available on mobile devices inside the Telegram
            Mini App.
          </h2>
          <p style={{ color: '#555', fontSize: '1rem', marginTop: '18px' }}>
            Please open this link on your mobile device using Telegram.
            <br />
            <b>Note:</b> If you see this message on mobile, try refreshing or
            using Telegram's in-app browser.
          </p>
        </div>
      </div>
    )
  }
  // Mobile: use PDF.js viewer for in-app, read-only PDF viewing
  return (
    <div style={{ position: 'relative' }}>
      <ModernLoading show={loading} />
      {!loading && (
        <div
          className={`emerging-container modern-emerging${
            darkMode ? ' dark' : ''
          }`}
          style={{ minHeight: '60vh', maxWidth: '700px', margin: '32px auto' }}
        >
          <button
            className="dark-toggle"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            {darkMode ? '🌙 Dark' : '☀️ Light'}
          </button>
          {/* Custom layout for 'logic' subject */}
          {subject === 'logic' ? (
            <>
              <div style={{ marginBottom: 18 }}>
                <div
                  style={{
                    color: darkMode ? '#90caf9' : '#1976d2',
                    fontSize: '2.5rem',
                    fontWeight: 900,
                    letterSpacing: '1.2px',
                  }}
                >
                  🎉  Welcome!  🎉
                </div>
                <div
                  style={{
                    color: darkMode ? '#90caf9' : '#1976d2',
                    fontSize: '2rem',
                    fontWeight: 800,
                    margin: '12px 0 8px 0',
                  }}
                >
                  ✨ Logic and Critical Thinking!
                </div>
                <div
                  style={{
                    color: darkMode ? '#bbb' : '#555',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    margin: '8px 0',
                  }}
                >
                  Logic
                </div>
                <div
                  style={{
                    color: darkMode ? '#bbb' : '#555',
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    margin: '8px 0 0 0',
                  }}
                >
                  All Chapters In Amharic & English
                </div>
              </div>
              <PDFViewerScrollable url={`/${pdf}`} darkMode={darkMode} />
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  marginTop: '18px',
                }}
              >
                <span className="info-badge">
                  <svg
                    width="20"
                    height="20"
                    fill={darkMode ? '#90caf9' : '#1976d2'}
                    style={{ verticalAlign: 'middle', marginRight: '4px' }}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-2.83.48-5.48-1.51-5.96-4.34-.09-.52.36-.93.88-.93.44 0 .81.32.88.75.36 2.13 2.5 3.45 4.5 2.83 1.5-.47 2.5-1.96 2.5-3.58 0-1.62-1-3.11-2.5-3.58-2-.62-4.14.7-4.5 2.83-.07.43-.44.75-.88.75-.52 0-.97-.41-.88-.93.48-2.83 3.13-4.82 5.96-4.34 2.83.48 4.82 3.13 4.34 5.96-.48 2.83-3.13 4.82-5.96 4.34z" />
                  </svg>
                  For viewing only inside the mini app
                </span>
              </div>
              <p
                style={{
                  color: darkMode ? '#bbb' : '#555',
                  fontSize: '1rem',
                  marginTop: '18px',
                  lineHeight: 1.7,
                }}
              >
                <b>Note:</b> PDF is rendered in-app for reading only. No
                download required.
                <br />
                If you see any issues, try refreshing or using Telegram's in-app
                browser.
              </p>
              <button className="open-note-btn" style={{ marginTop: 18 }}>
                {msg.button}
              </button>
            </>
          ) : (
            <>
              <h1
                style={{
                  color: darkMode ? '#90caf9' : '#1976d2',
                  fontSize: '2.7rem',
                  marginBottom: '22px',
                  letterSpacing: '1.2px',
                  fontWeight: 900,
                }}
              >
                {msg.title}
              </h1>
              <h2
                style={{
                  color: darkMode ? '#90caf9' : '#1976d2',
                  fontSize: '2rem',
                  marginBottom: '16px',
                  fontWeight: 800,
                }}
              >
                {msg.subtitle}
              </h2>
              <p
                style={{
                  color: darkMode ? '#bbb' : '#555',
                  fontSize: '1.25rem',
                  marginTop: '22px',
                  lineHeight: 1.8,
                  fontWeight: 700,
                }}
              >
                {msg.description}
              </p>
              <PDFViewerScrollable url={`/${pdf}`} darkMode={darkMode} />
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  marginTop: '18px',
                }}
              >
                <span className="info-badge">
                  <svg
                    width="20"
                    height="20"
                    fill={darkMode ? '#90caf9' : '#1976d2'}
                    style={{ verticalAlign: 'middle', marginRight: '4px' }}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-2.83.48-5.48-1.51-5.96-4.34-.09-.52.36-.93.88-.93.44 0 .81.32.88.75.36 2.13 2.5 3.45 4.5 2.83 1.5-.47 2.5-1.96 2.5-3.58 0-1.62-1-3.11-2.5-3.58-2-.62-4.14.7-4.5 2.83-.07.43-.44.75-.88.75-.52 0-.97-.41-.88-.93.48-2.83 3.13-4.82 5.96-4.34 2.83.48 4.82 3.13 4.34 5.96-.48 2.83-3.13 4.82-5.96 4.34z" />
                  </svg>
                  For viewing only inside the mini app
                </span>
              </div>
              <p
                style={{
                  color: darkMode ? '#bbb' : '#555',
                  fontSize: '1rem',
                  marginTop: '18px',
                  lineHeight: 1.7,
                }}
              >
                <b>Note:</b> PDF is rendered in-app for reading only. No
                download required.
                <br />
                If you see any issues, try refreshing or using Telegram's in-app
                browser.
              </p>
              <button className="open-note-btn">{msg.button}</button>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default SubjectReader
