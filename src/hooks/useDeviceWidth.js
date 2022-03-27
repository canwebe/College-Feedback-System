import { useState } from 'react'
import { useEffect } from 'react/cjs/react.production.min'

export default function useDeviceWidth() {
  const [width, setWidth] = useState()

  const hasWindow = typeof window !== undefined

  const getWidth = () => {
    const width = hasWindow ? window.innerWidth() : null
    setWidth(width)
  }

  useEffect(() => {
    if (hasWindow) {
      window.addEventListener('resize', getWidth)
      return () => window.removeEventListener('resize', getWidth)
    }
  }, [hasWindow])

  return width
}
