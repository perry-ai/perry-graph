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

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div style={{ height: '1000px' }}>
      <Excalidraw />
    </div>
  )
}

export default ExcalidrawWrapper
