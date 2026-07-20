import { useCallback, useRef } from 'react'
import { useCanvasAnimation } from '../../hooks/useCanvasAnimation'
import type { CanvasFrame } from '../../hooks/useCanvasAnimation'
import { createSeededRandom } from '../../lib/seededRandom'

interface HeroCanvasProps {
  active: boolean
  reducedMotion: boolean
}

interface Particle {
  x: number
  y: number
  speed: number
  size: number
  opacity: number
  drift: number
}

function createParticles(width: number, height: number, count: number): Particle[] {
  const random = createSeededRandom(7)
  return Array.from({ length: count }, () => ({
    x: random() * width,
    y: random() * height,
    speed: 0.3 + random() * 0.8,
    size: 1 + random() * 2.5,
    opacity: 0.15 + random() * 0.45,
    drift: (random() - 0.5) * 0.3,
  }))
}

export function HeroCanvas({ active, reducedMotion }: HeroCanvasProps) {
  const particlesRef = useRef<Particle[]>([])
  const layoutRef = useRef({ width: 0, mobile: false })

  const draw = useCallback(
    ({ context, width, height, elapsed }: CanvasFrame) => {
      const mobile = width < 768
      const particleCount = reducedMotion ? 0 : mobile ? 18 : 48

      if (
        particlesRef.current.length !== particleCount ||
        layoutRef.current.width !== width ||
        layoutRef.current.mobile !== mobile
      ) {
        particlesRef.current =
          particleCount > 0
            ? createParticles(width, height, particleCount)
            : []
        layoutRef.current = { width, mobile }
      }

      context.clearRect(0, 0, width, height)

      const glow = context.createRadialGradient(
        width * 0.5,
        height * 0.45,
        0,
        width * 0.5,
        height * 0.45,
        Math.min(width, height) * 0.42,
      )
      glow.addColorStop(0, 'rgb(120 60 200 / 35%)')
      glow.addColorStop(0.45, 'rgb(80 40 140 / 12%)')
      glow.addColorStop(1, 'rgb(8 7 11 / 0%)')
      context.fillStyle = glow
      context.fillRect(0, 0, width, height)

      if (reducedMotion || particlesRef.current.length === 0) return

      const time = elapsed * 0.001

      for (const particle of particlesRef.current) {
        const y =
          ((particle.y + time * particle.speed * 60) % (height + 40)) - 20
        const x = particle.x + Math.sin(time + particle.drift * 10) * 12

        context.fillStyle = `rgb(198 166 255 / ${particle.opacity})`
        context.beginPath()
        context.arc(x, y, particle.size, 0, Math.PI * 2)
        context.fill()
      }

      const rayCount = mobile ? 3 : 5
      for (let index = 0; index < rayCount; index += 1) {
        const offset = (index - (rayCount - 1) / 2) * (mobile ? 40 : 70)
        const rayX = width * 0.5 + offset
        const gradient = context.createLinearGradient(
          rayX,
          -20,
          rayX + offset * 0.15,
          height * 0.75,
        )
        gradient.addColorStop(0, 'rgb(155 92 255 / 0%)')
        gradient.addColorStop(0.35, 'rgb(155 92 255 / 8%)')
        gradient.addColorStop(1, 'rgb(155 92 255 / 0%)')
        context.fillStyle = gradient
        context.fillRect(rayX - 20, 0, 40, height * 0.75)
      }
    },
    [reducedMotion],
  )

  const canvasRef = useCanvasAnimation({
    active,
    reducedMotion,
    draw,
  })

  return (
    <canvas
      ref={canvasRef}
      className="hero-canvas"
      aria-hidden="true"
    />
  )
}
