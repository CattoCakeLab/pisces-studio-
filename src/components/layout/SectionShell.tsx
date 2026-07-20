import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import type { SectionId } from '../../types/content'

interface SectionShellProps extends HTMLAttributes<HTMLElement> {
  id: SectionId
  eyebrow: string
  title: string
  description?: string
  children?: ReactNode
}

export const SectionShell = forwardRef<HTMLElement, SectionShellProps>(
  function SectionShell(
    {
      id,
      eyebrow,
      title,
      description,
      children,
      className = '',
      ...sectionProps
    },
    ref,
  ) {
    const headingId = `${id}-heading`

    return (
      <section
        {...sectionProps}
        ref={ref}
        id={id}
        className={`section-shell ${className}`.trim()}
        aria-labelledby={headingId}
        data-section={id}
      >
        <div className="section-shell__inner">
          <header className="section-shell__header" data-reveal="section-heading">
            <p className="section-shell__eyebrow">{eyebrow}</p>
            <h2 id={headingId}>{title}</h2>
            {description ? <p>{description}</p> : null}
          </header>
          {children}
        </div>
      </section>
    )
  },
)

SectionShell.displayName = 'SectionShell'
