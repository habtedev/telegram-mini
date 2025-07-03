import React, { useEffect, useRef, useState } from 'react'
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist/build/pdf'
import workerSrc from 'pdfjs-dist/build/pdf.worker.mjs?url'
import 'pdfjs-dist/web/pdf_viewer.css'
import './PDFViewer.scss'
import PropTypes from 'prop-types'

// Set the workerSrc property using the imported worker URL
GlobalWorkerOptions.workerSrc = workerSrc

const PDFViewer = ({ url, darkMode }) => {
  const canvasRef = useRef(null)
  // Use a unique key for each PDF file
  const pdfKey = `pdf_last_page_${url}`
  // Restore last page from localStorage if available
  const [pageNum, setPageNum] = useState(() => {
    const saved = localStorage.getItem(pdfKey)
    return saved ? parseInt(saved, 10) : 1
  })
  const [numPages, setNumPages] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Load PDF and set initial page only once on mount/url change
  useEffect(() => {
    let pdf = null
    setLoading(true)
    setError(null)
    getDocument(url)
      .promise.then((loadedPdf) => {
        pdf = loadedPdf
        setNumPages(loadedPdf.numPages)
        // Clamp to valid page if saved page is out of range
        let saved = localStorage.getItem(pdfKey)
        let startPage = saved ? parseInt(saved, 10) : 1
        if (startPage < 1) startPage = 1
        if (startPage > loadedPdf.numPages) startPage = loadedPdf.numPages
        setPageNum(startPage)
        renderPage(startPage)
      })
      .catch((err) => {
        setError('Failed to load PDF. ' + (err?.message || ''))
        setLoading(false)
      })

    function renderPage(num) {
      if (!pdf) return
      pdf.getPage(num).then((page) => {
        const viewport = page.getViewport({ scale: 1.5 })
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        canvas.height = viewport.height
        canvas.width = viewport.width
        page
          .render({ canvasContext: context, viewport })
          .promise.then(() => setLoading(false))
      })
    }
  }, [url, pdfKey])

  // Render page when pageNum changes (after initial load)
  useEffect(() => {
    if (!numPages || loading || error) return
    getDocument(url).promise.then((pdf) => {
      pdf.getPage(pageNum).then((page) => {
        const viewport = page.getViewport({ scale: 1.5 })
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        canvas.height = viewport.height
        canvas.width = viewport.width
        page.render({ canvasContext: context, viewport })
      })
    })
  }, [pageNum, numPages, url, loading, error])

  // Save page number to localStorage on change (per PDF)
  useEffect(() => {
    if (pageNum && numPages) {
      localStorage.setItem(pdfKey, pageNum)
    }
  }, [pageNum, numPages, pdfKey])

  const goToPrevPage = () => setPageNum((prev) => Math.max(prev - 1, 1))
  const goToNextPage = () => setPageNum((prev) => Math.min(prev + 1, numPages))

  return (
    <div
      className={`pdf-viewer-modern${darkMode ? ' dark' : ''}`}
      style={{ textAlign: 'center' }}
    >
      <div style={{ fontSize: '0.9em', color: '#888', marginBottom: 8 }}>
        <b>Debug PDF URL:</b> {url}
      </div>
      {loading && (
        <div className="pdf-loading">
          <div className="pdf-progress-bar">
            <div className="pdf-progress-bar-inner pdf-animated" />
          </div>
          Loading PDF...
        </div>
      )}
      {error && <div className="pdf-error">{error}</div>}
      <canvas
        ref={canvasRef}
        className="pdf-canvas"
        style={{
          display: error ? 'none' : 'block',
        }}
      />
      {!error && (
        <div className="pdf-controls">
          <button
            onClick={goToPrevPage}
            disabled={pageNum <= 1}
            className="pdf-btn pdf-btn-prev"
          >
            <svg
              width="20"
              height="20"
              fill="currentColor"
              style={{ verticalAlign: 'middle', marginRight: 6 }}
              viewBox="0 0 24 24"
            >
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
            Prev
          </button>
          <span className="pdf-page-info">
            Page {pageNum} of {numPages}
          </span>
          <button
            onClick={goToNextPage}
            disabled={pageNum >= numPages}
            className="pdf-btn pdf-btn-next"
          >
            Next
            <svg
              width="20"
              height="20"
              fill="currentColor"
              style={{ verticalAlign: 'middle', marginLeft: 6 }}
              viewBox="0 0 24 24"
            >
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}

PDFViewer.propTypes = {
  url: PropTypes.string.isRequired,
  darkMode: PropTypes.bool,
}

export default PDFViewer
