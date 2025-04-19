'use client'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import '@excalidraw/excalidraw/index.css'

const Excalidraw = dynamic(
  () => import('@excalidraw/excalidraw').then((mod) => mod.Excalidraw),
  {
    ssr: false,
    loading: () => <div>Loading Excalidraw...</div>,
  },
)

const ExcalidrawWrapper: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false)
  const [initialData, setInitialData] = useState(null)

  useEffect(() => {
    setIsMounted(true)
    fetch('/excali/index.excalidraw', { cache: 'no-cache' })
      .then(res => res.json())
      .then(data => setInitialData(data))
      .catch(console.error)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div style={{ height: '1000px' }}>
      <Excalidraw initialData={initialData} />
    </div>
  )
}

export default ExcalidrawWrapper
