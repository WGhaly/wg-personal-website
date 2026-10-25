'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

/** Weighted, smooth scrolling on desktop. Off for touch and reduced motion, where native scrolling is better. */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce), (pointer: coarse)').matches) return
    const lenis = new Lenis({ lerp: 0.1 })
    let raf = requestAnimationFrame(function loop(t) {
      lenis.raf(t)
      raf = requestAnimationFrame(loop)
    })
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])
  return null
}
