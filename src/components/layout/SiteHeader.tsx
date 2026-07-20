import type { MouseEvent } from 'react'
import { SECTION_DEFINITIONS } from '../../config/sections'
import type { SectionId } from '../../types/content'

interface SiteHeaderProps {
  siteName: string
  activeSection: SectionId
  onNavigate: (id: SectionId) => void
}

export function SiteHeader({
  siteName,
  activeSection,
  onNavigate,
}: SiteHeaderProps) {
  const handleNavigation = (
    event: MouseEvent<HTMLAnchorElement>,
    id: SectionId,
  ) => {
    event.preventDefault()
    onNavigate(id)
  }

  return (
    <header className="site-header">
      <a
        className="site-header__brand"
        href="#home"
        onClick={(event) => handleNavigation(event, 'home')}
      >
        {siteName}
      </a>
      <nav aria-label="页面区块导航">
        <ul className="site-header__nav-list">
          {SECTION_DEFINITIONS.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-label={item.ariaLabel}
                aria-current={activeSection === item.id ? 'location' : undefined}
                onClick={(event) => handleNavigation(event, item.id)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

