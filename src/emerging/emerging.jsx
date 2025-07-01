import React from 'react'
import './emerging.scss'
import PDFViewer from './PDFViewer'

// Only detect mobile by user agent, not by screen size
const isMobile = () =>
  /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
    navigator.userAgent,
  )

const Emerging = () => {
  if (!isMobile()) {
    return (
      <div
        className="emerging-container modern-emerging"
        style={{
          background: '#fff',
          minHeight: '40vh',
          color: '#222',
          boxShadow: '0 4px 24px rgba(25, 118, 210, 0.08)',
          padding: '32px 16px',
          borderRadius: '18px',
          maxWidth: '700px',
          margin: '32px auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
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
    )
  }
  // Mobile: use PDF.js viewer for in-app, read-only PDF viewing
  return (
    <div
      className="emerging-container modern-emerging"
      style={{
        background: '#fff',
        minHeight: '60vh',
        color: '#222',
        boxShadow: '0 4px 24px rgba(25, 118, 210, 0.08)',
        padding: '32px 16px',
        borderRadius: '18px',
        maxWidth: '700px',
        margin: '32px auto',
      }}
    >
      <h1
        style={{
          color: '#1976d2',
          fontSize: '2.2rem',
          marginBottom: '18px',
          letterSpacing: '1px',
          fontWeight: 700,
        }}
      >
        Emerging Technology A to Z Tutorial
      </h1>
      <PDFViewer url={'/emerging.pdf'} />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          marginTop: '18px',
        }}
      >
        <span
          style={{
            color: '#1976d2',
            fontWeight: 600,
            fontSize: '1.1rem',
          }}
        >
          <svg
            width="20"
            height="20"
            fill="#1976d2"
            style={{
              verticalAlign: 'middle',
              marginRight: '4px',
            }}
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-2.83.48-5.48-1.51-5.96-4.34-.09-.52.36-.93.88-.93.44 0 .81.32.88.75.36 2.13 2.5 3.45 4.5 2.83 1.5-.47 2.5-1.96 2.5-3.58 0-1.62-1-3.11-2.5-3.58-2-.62-4.14.7-4.5 2.83-.07.43-.44.75-.88.75-.52 0-.97-.41-.88-.93.48-2.83 3.13-4.82 5.96-4.34 2.83.48 4.82 3.13 4.34 5.96-.48 2.83-3.13 4.82-5.96 4.34z" />
          </svg>
          For viewing only inside the mini app
        </span>
      </div>
      <p
        style={{
          color: '#555',
          fontSize: '1rem',
          marginTop: '18px',
          lineHeight: 1.7,
        }}
      >
        <b>Note:</b> PDF is rendered in-app for reading only. No download
        required.
        <br />
        If you see any issues, try refreshing or using Telegram's in-app
        browser.
      </p>
    </div>
  )
}

export default Emerging
