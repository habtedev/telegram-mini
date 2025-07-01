import React, { useEffect, useRef, useState } from 'react'
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist/build/pdf'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker?worker'
import 'pdfjs-dist/web/pdf_viewer.css'

// Set the workerSrc property using the imported worker
GlobalWorkerOptions.workerSrc = pdfjsWorker

const PDFViewer = ({ url }) => {
  const canvasRef = useRef(null)
  const [pageNum, setPageNum] = useState(1)
  const [numPages, setNumPages] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let pdf = null
    setLoading(true)
    getDocument(url).promise.then((loadedPdf) => {
      pdf = loadedPdf
      setNumPages(pdf.numPages)
      renderPage(pageNum)
    })

    function renderPage(num) {
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

    renderPage(pageNum)
  }, [url, pageNum])

  const goToPrevPage = () => setPageNum((prev) => Math.max(prev - 1, 1))
  const goToNextPage = () => setPageNum((prev) => Math.min(prev + 1, numPages))

  return (
    <div style={{ textAlign: 'center' }}>
      {loading && <div>Loading PDF...</div>}
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          maxWidth: 400,
          borderRadius: 8,
          background: '#fff',
        }}
      />
      <div style={{ margin: '12px 0' }}>
        <button
          onClick={goToPrevPage}
          disabled={pageNum <= 1}
          style={{ marginRight: 8 }}
        >
          Prev
        </button>
        <span>
          Page {pageNum} of {numPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={pageNum >= numPages}
          style={{ marginLeft: 8 }}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default PDFViewer
