export interface CustomCursorProps {
  enabled: boolean
}

export function CustomCursor({ enabled }: CustomCursorProps) {
  return (
    <div
      className="custom-cursor-slot"
      aria-hidden="true"
      data-enabled={enabled}
      data-cursor-root
    />
  )
}
