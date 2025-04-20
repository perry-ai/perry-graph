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
      .then(data => {
        // Merge default appState parameters (e.g., zoom, scrollX, scrollY)
        const updatedData = {
          ...data,
          appState: {
            ...(data.appState || {}),
            // 界面初始化位置可以采用下面参数进行画布缩放, 在初始化的initialData.appState中添加以下三个参数
            zoom: 0.2, // 缩放级别
            scrollX: -1000, // 滚动位置X
            scrollY: 1500, // 滚动位置Y
          },
        }
        setInitialData(updatedData)
      })
      .catch(console.error)
  }, [])

  if (!isMounted) {
    return null
  }

  // 如果希望Excalidraw仅查看，需要加上属性viewModeEnabled
  // <Excalidraw initialData={initialData} theme="dark" viewModeEnabled langCode="zh-CN" />
  return (
    <div style={{ height: '1000px' }}>
      <Excalidraw initialData={initialData} theme="dark" langCode="zh-CN" />
    </div>
  )
}

export default ExcalidrawWrapper
