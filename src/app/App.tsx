import { SiteHeader } from '../components/layout/SiteHeader'
import { SECTION_IDS } from '../config/sections'
import { siteContent } from '../content/siteContent'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useSectionNavigation } from '../hooks/useSectionNavigation'
import { ContactSection } from '../sections/ContactSection'
import { HeroSection } from '../sections/HeroSection'
import { ProfilesSection } from '../sections/ProfilesSection'
import { RipplesSection } from '../sections/RipplesSection'
import { WorkSection } from '../sections/WorkSection'

export function App() {
  const reducedMotion = useReducedMotion()
  const { activeSection, scrollToSection } = useSectionNavigation(SECTION_IDS, {
    reducedMotion,
  })

  return (
    <>
      <a className="skip-link" href="#home">
        跳到主要内容
      </a>
      <SiteHeader
        siteName={siteContent.siteName}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />
      <main>
        <HeroSection content={siteContent.hero} reducedMotion={reducedMotion} />
        <ProfilesSection
          section={siteContent.sections.profiles}
          profiles={siteContent.profiles}
          reducedMotion={reducedMotion}
        />
        <RipplesSection
          section={siteContent.sections.ripples}
          posts={siteContent.posts}
          reducedMotion={reducedMotion}
        />
        <WorkSection
          section={siteContent.sections.work}
          projects={siteContent.projects}
          reducedMotion={reducedMotion}
        />
        <ContactSection
          content={siteContent.contact}
          footer={siteContent.footer}
        />
      </main>
    </>
  )
}
