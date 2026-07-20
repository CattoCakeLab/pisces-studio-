import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'

export interface CanvasFrame {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  width: number
  height: number
  devicePixelRatio: number
  elapsed: number
  delta: number
}

export type CanvasDraw = (frame: CanvasFrame) => void

interface UseCanvasAnimationOptions {
  active: boolean
  reducedMotion: boolean
  draw?: CanvasDraw
  maxDevicePixelRatio?: number
}

export function useCanvasAnimation({
  active,
  reducedMotion,
  draw,
  maxDevicePixelRatio = 2,
}: UseCanvasAnimationOptions): RefObject<HTMLCanvasElement | null> {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drawRef = useRef<CanvasDraw | undefined>(draw)

  useEffect(() => {
    drawRef.current = draw
  }, [draw])

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')

    if (!canvas || !context) return undefined

    let frameId = 0
    let startedAt = performance.now()
    let previousTime = startedAt
    let width = 0
    let height = 0
    let devicePixelRatio = 1

    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      width = bounds.width
      height = bounds.height
      devicePixelRatio = Math.min(
        window.devicePixelRatio || 1,
        maxDevicePixelRatio,
      )

      canvas.width = Math.max(1, Math.round(width * devicePixelRatio))
      canvas.height = Math.max(1, Math.round(height * devicePixelRatio))
      context.setTransform(
        devicePixelRatio,
        0,
        0,
        devicePixelRatio,
        0,
        0,
      )
    }

    const render = (time: number) => {
      const delta = Math.min(64, time - previousTime)
      previousTime = time

      drawRef.current?.({
        canvas,
        context,
        width,
        height,
        devicePixelRatio,
        elapsed: time - startedAt,
        delta,
      })

      if (active && !reducedMotion) {
        frameId = window.requestAnimationFrame(render)
      }
    }

    const resizeObserver = new ResizeObserver(() => {
      resize()
      if (!active || reducedMotion) render(performance.now())
    })

    resize()
    resizeObserver.observe(canvas)
    startedAt = performance.now()
    previousTime = startedAt
    render(startedAt)

    return () => {
      window.cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
    }
  }, [active, maxDevicePixelRatio, reducedMotion])

  return canvasRef
}

