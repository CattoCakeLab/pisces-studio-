export type SectionId =
  | 'home'
  | 'profiles'
  | 'ripples'
  | 'work'
  | 'contact'

export interface NavItem {
  id: SectionId
  label: string
  ariaLabel: string
}

export interface HeroContent {
  eyebrow: string
  title: string
  description: string
  actionLabel: string
  sideLabels: [string, string]
  scrollHint: string
}

export interface SectionMeta {
  eyebrow: string
  title: string
  description: string
  hint?: string
}

export interface Profile {
  id: string
  name: string
  role: string
  bio: string
  imageSrc?: string
}

export interface Post {
  id: string
  title: string
  excerpt: string
  publishedAt: string
  tags: string[]
}

export interface Project {
  id: string
  title: string
  subtitle: string
  summary: string
  body: string[]
}

export interface ContactContent {
  eyebrow: string
  title: string
  description: string
  nameLabel: string
  emailLabel: string
  messageLabel: string
  submitLabel: string
  demoNotice: string
  successMessage: string
  emailErrorMessage: string
  requiredErrorMessage: string
}

export interface SiteContent {
  siteName: string
  hero: HeroContent
  sections: {
    profiles: SectionMeta
    ripples: SectionMeta
    work: SectionMeta
  }
  profiles: Profile[]
  posts: Post[]
  projects: Project[]
  contact: ContactContent
  footer: {
    copyright: string
    tagline: string
  }
}
