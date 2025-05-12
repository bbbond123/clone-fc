import { gsap } from 'gsap'

export const animateOpen = (
  target: HTMLElement,
  isMobile: boolean,
  options: { onComplete?: () => void } = {}
) => {
  const ease = isMobile ? 'power1.out' : 'power2.out' // Simpler easing for mobile
  const duration = isMobile ? 0.4 : 0.8 // Shorter duration for mobile
  gsap.fromTo(
    target,
    { x: 0 },
    {
      x: isMobile ? '50%' : '100%',
      duration,
      ease,
      willChange: 'transform',
      overwrite: 'auto', // Prevent animation conflicts
      ...options,
    }
  )
}

export const animateDropBanner = (
  target: HTMLElement,
  options: { onComplete?: () => void } = {}
) => {
  gsap.fromTo(
    target,
    { y: -50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out',
      willChange: 'transform, opacity',
      ...options,
    }
  )
} 