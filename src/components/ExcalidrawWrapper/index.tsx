'use client'
import { convertToExcalidrawElements } from '@excalidraw/excalidraw'
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

  // console.info(convertToExcalidrawElements([{
  //   type: 'rectangle',
  //   id: 'rect-1',
  //   x: 100,
  //   y: 100,
  //   width: 186.47265625,
  //   height: 141.9765625,
  //   strokeColor: '#000000',
  //   backgroundColor: 'transparent',
  //   fillStyle: 'hachure',
  //   strokeWidth: 1,
  //   strokeStyle: 'solid',
  //   roughness: 1,
  //   opacity: 100,
  //   groupIds: [],
  // }]))

  return (
    <div style={{ height: '500px', width: '500px' }}>
      <Excalidraw />
    </div>
  )
}

export default ExcalidrawWrapper
