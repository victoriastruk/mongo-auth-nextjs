'use client'
import { useEffect, useTransition } from 'react'
import { updateLastActiveTime } from './actions'

export default function ActiveTimeUpdater() {
  const [, startTransition] = useTransition()

  useEffect(() => {
    const interval = setInterval(() => {
      startTransition(() => {
        updateLastActiveTime()
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return null
}
