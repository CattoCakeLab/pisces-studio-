import { useCallback, useEffect, useRef, useState } from 'react'
import type { SectionId } from '../types/content'

interface UseSectionNavigationOptions {
  reducedMotion?: boolean
}

export function useSectionNavigation(
  sectionIds: readonly SectionId[],
  { reducedMotion = false }: UseSectionNavigationOptions = {},
) {
  const [activeSection, setActiveSection] = useState<SectionId>(
    sectionIds[0] ?? 'home',
  )
  const visibleSections = useRef(new Map<SectionId, number>())

  useEffect(() => {
    const visibility = visibleSections.current
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id as SectionId

          if (entry.isIntersecting) {
            visibility.set(id, entry.intersectionRatio)
          } else {
            visibility.delete(id)
          }
        }

        const nextSection = [...visibility.entries()].sort(
          ([, ratioA], [, ratioB]) => ratioB - ratioA,
        )[0]?.[0]

        if (nextSection) {
          setActiveSection(nextSection)
        }
      },
      {
        rootMargin: '-25% 0px -55% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    )

    for (const id of sectionIds) {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    }

    return () => {
      observer.disconnect()
      visibility.clear()
    }
  }, [sectionIds])

  const scrollToSection = useCallback(
    (id: SectionId) => {
      document.getElementById(id)?.scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'start',
      })
    },
    [reducedMotion],
  )

  return { activeSection, scrollToSection }
}
