import { SectionShell } from '../components/layout/SectionShell'
import { gsap } from '../lib/gsap'
import { useGsapScope } from '../hooks/useGsapScope'
import type { Profile, SectionMeta } from '../types/content'

interface ProfilesSectionProps {
  section: SectionMeta
  profiles: Profile[]
  reducedMotion: boolean
}

export function ProfilesSection({
  section,
  profiles,
  reducedMotion,
}: ProfilesSectionProps) {
  const scopeRef = useGsapScope<HTMLElement>(() => {
    if (reducedMotion) return

    gsap.from('[data-profile-card]', {
      opacity: 0,
      y: 48,
      duration: 0.9,
      stagger: 0.18,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '[data-slot="profile-grid"]',
        start: 'top 78%',
      },
    })
  }, [reducedMotion, profiles])

  return (
    <SectionShell
      ref={scopeRef}
      id="profiles"
      eyebrow={section.eyebrow}
      title={section.title}
      description={section.description}
    >
      <div className="content-grid content-grid--two" data-slot="profile-grid">
        {profiles.map((profile) => (
          <article key={profile.id} className="profile-card" data-profile-card>
            <div className="profile-card__avatar" aria-hidden="true">
              {profile.name.slice(0, 1)}
            </div>
            <p className="profile-card__role">{profile.role}</p>
            <h3>{profile.name}</h3>
            <p>{profile.bio}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  )
}
