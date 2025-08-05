// Utility to force all parent containers to 100vw on mobile
function forceFullWidthOnMobile(ref) {
  if (typeof window === 'undefined' || window.innerWidth > 600) return
  let el = ref?.current
  while (el && el !== document.body) {
    el.style.width = '100vw'
    el.style.maxWidth = '100vw'
    el.style.margin = '0'
    el.style.padding = '0'
    el = el.parentElement
  }
}
import React, { useEffect, useState, useRef } from 'react'
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist/build/pdf'
import workerSrc from 'pdfjs-dist/build/pdf.worker.mjs?url'
import 'pdfjs-dist/web/pdf_viewer.css'
import './PDFViewer.scss'
import PropTypes from 'prop-types'

GlobalWorkerOptions.workerSrc = workerSrc

const PDFViewerScrollable = ({ url, darkMode }) => {
  const [numPages, setNumPages] = useState(null)
  const [pages, setPages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const containerRef = useRef(null)

  useEffect(() => {
    let isMounted = true
    setLoading(true)
    setError(null)
    setPages([])
    getDocument(url)
      .promise.then(async (pdf) => {
        if (!isMounted) return
        setNumPages(pdf.numPages)
        const loadedPages = []
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i)
          const viewport = page.getViewport({ scale: 2.0 })
          const canvas = document.createElement('canvas')
          const context = canvas.getContext('2d')
          canvas.height = viewport.height
          canvas.width = viewport.width
          await page.render({ canvasContext: context, viewport }).promise
          loadedPages.push(canvas.toDataURL())
        }
        if (isMounted) {
          setPages(loadedPages)
          setLoading(false)
        }
      })
      .catch((err) => {
        setError('Failed to load PDF. ' + (err?.message || ''))
        setLoading(false)
      })
    return () => {
      isMounted = false
    }
  }, [url])

  // Force all parents to 100vw on mobile after mount
  useEffect(() => {
    forceFullWidthOnMobile(containerRef)
  }, [pages])

  return (
    <div
      className={`pdf-viewer-scrollable${darkMode ? ' dark' : ''}`}
      style={{
        width: window.innerWidth <= 600 ? '100vw' : '100%',
        maxWidth: window.innerWidth <= 600 ? '100vw' : '100%',
        minHeight: 300,
        margin: 0,
        padding: 0,
      }}
      ref={containerRef}
    >
      {loading && (
        <div className="pdf-loading">
          <div className="pdf-spinner" />
          Loading PDF...
        </div>
      )}
      {error && <div className="pdf-error">{error}</div>}
      {!loading && !error && (
        <div className="pdf-pages-scrollable">
          {pages.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`PDF page ${idx + 1}`}
              className="pdf-page-img"
              style={{
                width: window.innerWidth <= 600 ? '100vw' : '100%',
                maxWidth: window.innerWidth <= 600 ? '100vw' : '100%',
                minWidth: window.innerWidth <= 600 ? '100vw' : '100%',
                margin: 0,
                marginBottom: 0,
                borderRadius: window.innerWidth <= 600 ? 0 : 8,
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                background: darkMode ? '#222' : '#fff',
                fontWeight: 900,
                display: 'block',
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

PDFViewerScrollable.propTypes = {
  url: PropTypes.string.isRequired,
  darkMode: PropTypes.bool,
}

export default PDFViewerScrollable
