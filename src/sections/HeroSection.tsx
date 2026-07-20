import { useEffect, useState } from 'react'
import { HeroCanvas } from '../components/effects/HeroCanvas'
import { gsap } from '../lib/gsap'
import { useGsapScope } from '../hooks/useGsapScope'
import type { HeroContent } from '../types/content'

interface HeroSectionProps {
  content: HeroContent
  reducedMotion: boolean
}

export function HeroSection({ content, reducedMotion }: HeroSectionProps) {
  const [active, setActive] = useState(true)

  const scopeRef = useGsapScope<HTMLElement>(() => {
    if (reducedMotion) return

    gsap.from('[data-hero-reveal]', {
      opacity: 0,
      y: 32,
      duration: 1.1,
      stagger: 0.14,
      ease: 'power3.out',
    })

    gsap.from('[data-hero-side]', {
      opacity: 0,
      duration: 1.4,
      delay: 0.35,
      ease: 'power2.out',
    })

    gsap.to('[data-hero-scroll-hint]', {
      y: 8,
      opacity: 0.45,
      duration: 1.6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  }, [reducedMotion])

  useEffect(() => {
    const section = scopeRef.current
    if (!section) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry?.isIntersecting ?? false),
      { threshold: 0.05 },
    )
    observer.observe(section)

    return () => observer.disconnect()
  }, [scopeRef])

  return (
    <section
      ref={scopeRef}
      id="home"
      className="section-shell hero-section"
      aria-labelledby="home-heading"
      data-section="home"
    >
      <HeroCanvas active={active} reducedMotion={reducedMotion} />
      <div className="hero-section__side-label hero-section__side-label--left" data-hero-side>
        {content.sideLabels[0]}
      </div>
      <div className="hero-section__side-label hero-section__side-label--right" data-hero-side>
        {content.sideLabels[1]}
      </div>
      <div className="section-shell__inner hero-section__content">
        <p className="section-shell__eyebrow" data-hero-reveal>
          {content.eyebrow}
        </p>
        <h1 id="home-heading" data-hero-reveal>
          {content.title}
        </h1>
        <p className="hero-section__description" data-hero-reveal>
          {content.description}
        </p>
        <a className="hero-section__cta" href="#profiles" data-hero-reveal>
          {content.actionLabel}
        </a>
      </div>
      <p className="hero-section__scroll-hint" data-hero-scroll-hint aria-hidden="true">
        {content.scrollHint}
      </p>
    </section>
  )
}
