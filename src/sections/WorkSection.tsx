import { useRef } from 'react'
import { SectionShell } from '../components/layout/SectionShell'
import { gsap } from '../lib/gsap'
import { useGsapScope } from '../hooks/useGsapScope'
import type { Project, SectionMeta } from '../types/content'

interface WorkSectionProps {
  section: SectionMeta
  projects: Project[]
  reducedMotion: boolean
}

export function WorkSection({
  section,
  projects,
  reducedMotion,
}: WorkSectionProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  const scopeRef = useGsapScope<HTMLElement>(() => {
    if (reducedMotion) return

    gsap.from('[data-project-card]', {
      opacity: 0,
      y: 40,
      duration: 0.85,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '[data-slot="project-carousel"]',
        start: 'top 80%',
      },
    })
  }, [reducedMotion, projects])

  const scrollByCard = (direction: 'prev' | 'next') => {
    const track = trackRef.current
    if (!track) return

    const card = track.querySelector<HTMLElement>('[data-project-card]')
    const cardWidth = card?.offsetWidth ?? track.clientWidth * 0.85
    const gap = 24
    const offset = direction === 'next' ? cardWidth + gap : -(cardWidth + gap)

    track.scrollBy({
      left: offset,
      behavior: reducedMotion ? 'auto' : 'smooth',
    })
  }

  return (
    <SectionShell
      ref={scopeRef}
      id="work"
      className="work-section"
      eyebrow={section.eyebrow}
      title={section.title}
      description={section.description}
    >
      <div className="project-carousel" data-slot="project-carousel">
        <div className="project-carousel__controls">
          <button
            type="button"
            className="project-carousel__button"
            aria-label="上一个作品"
            onClick={() => scrollByCard('prev')}
          >
            ←
          </button>
          <button
            type="button"
            className="project-carousel__button"
            aria-label="下一个作品"
            onClick={() => scrollByCard('next')}
          >
            →
          </button>
        </div>
        <div className="project-carousel__viewport">
          <div
            ref={trackRef}
            className="project-carousel__track"
            role="region"
            aria-roledescription="carousel"
            aria-label="作品列表"
            tabIndex={0}
          >
            {projects.map((project) => (
              <article
                key={project.id}
                className="project-card"
                data-project-card
                aria-label={project.subtitle}
              >
                <div className="project-card__visual">
                  <p className="project-card__title-en">{project.title}</p>
                </div>
                <div className="project-card__body">
                  <h3>{project.subtitle}</h3>
                  <p className="project-card__summary">{project.summary}</p>
                  {project.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
