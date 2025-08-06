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
  // Unified layout for all subjects
  // Subject name for line 3
  const subjectName =
    subject === 'emerging' ? 'Emerging Technology'
    : subject === 'atoz' ? 'Antropology'
    : subject === 'civic' ? 'Civics'
    : subject === 'global' ? 'Global'
    : subject === 'logic' ? 'Logic and Critical Thinking'
    : 'Emerging Technology';
  // Subtitle for line 2
  const subtitle = subject === 'logic' ? '✨ Logic and Critical Thinking' : '✨ A to Z Tutorial!';
  return (
    <div style={{ position: 'relative' }}>
      <ModernLoading show={loading} />
      {!loading && (
        <div
          className={`emerging-container modern-emerging${darkMode ? ' dark' : ''}`}
          style={{ minHeight: '60vh', maxWidth: '700px', margin: '32px auto' }}
        >
          <button
            className="dark-toggle"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            {darkMode ? '🌙 Dark' : '☀️ Light'}
          </button>
          <div style={{ marginBottom: 18 }}>
            <div
              style={{
                color: darkMode ? '#90caf9' : '#1976d2',
                fontSize: '2.5rem',
                fontWeight: 900,
                letterSpacing: '1.2px',
              }}
            >
              🎉 Welcome! 🎉
            </div>
            <div
              style={{
                color: darkMode ? '#90caf9' : '#1976d2',
                fontSize: '2rem',
                fontWeight: 800,
                margin: '12px 0 8px 0',
              }}
            >
              {subtitle}
            </div>
            <div
              style={{
                color: darkMode ? '#bbb' : '#555',
                fontSize: '1.5rem',
                fontWeight: 700,
                margin: '8px 0',
              }}
            >
              {subjectName}
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
            <b>Note:</b> PDF is rendered in-app for reading only. No download required.
            <br />
            If you see any issues, try refreshing or using Telegram's in-app browser.
          </p>
          <button className="open-note-btn" style={{ marginTop: 18 }}>Open Note</button>
        </div>
      )}
    </div>
  )
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

  // Only detect mobile by user agent, not by screen size
  if (!isMobile()) {
    return (
      <div
        className={`emerging-container modern-emerging${darkMode ? ' dark' : ''}`}
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
          <h2 style={{ color: '#d32f2f', fontWeight: 700 }}>
            This content is only available on mobile devices inside the Telegram Mini App.
          </h2>
          <p style={{ color: '#555', fontSize: '1rem', marginTop: '18px' }}>
            Please open this link on your mobile device using Telegram.
            <br />
            <b>Note:</b> If you see this message on mobile, try refreshing or using Telegram's in-app browser.
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
          className={`emerging-container modern-emerging${darkMode ? ' dark' : ''}`}
          style={{ minHeight: '60vh', maxWidth: '700px', margin: '32px auto' }}
        >
          <button
            className="dark-toggle"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            {darkMode ? '🌙 Dark' : '☀️ Light'}
          </button>
          <div style={{ marginBottom: 18 }}>
            <div
              style={{
                color: darkMode ? '#90caf9' : '#1976d2',
                fontSize: '2.5rem',
                fontWeight: 900,
                letterSpacing: '1.2px',
              }}
            >
              🎉 Welcome! 🎉
            </div>
            <div
              style={{
                color: darkMode ? '#90caf9' : '#1976d2',
                fontSize: '2rem',
                fontWeight: 800,
                margin: '12px 0 8px 0',
              }}
            >
              {subtitle}
            </div>
            <div
              style={{
                color: darkMode ? '#bbb' : '#555',
                fontSize: '1.5rem',
                fontWeight: 700,
                margin: '8px 0',
              }}
            >
              {subjectName}
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
            <b>Note:</b> PDF is rendered in-app for reading only. No download required.
            <br />
            If you see any issues, try refreshing or using Telegram's in-app browser.
          </p>
          <button className="open-note-btn" style={{ marginTop: 18 }}>Open Note</button>
        </div>
      )}
    </div>
  )


export default SubjectReader;
