import { SectionShell } from '../components/layout/SectionShell'
import { gsap } from '../lib/gsap'
import { useGsapScope } from '../hooks/useGsapScope'
import type { Post, SectionMeta } from '../types/content'

interface RipplesSectionProps {
  section: SectionMeta
  posts: Post[]
  reducedMotion: boolean
}

export function RipplesSection({
  section,
  posts,
  reducedMotion,
}: RipplesSectionProps) {
  const scopeRef = useGsapScope<HTMLElement>(() => {
    if (reducedMotion) return

    gsap.from('[data-post-card]', {
      opacity: 0,
      y: 40,
      duration: 0.85,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '[data-slot="post-grid"]',
        start: 'top 80%',
      },
    })
  }, [reducedMotion, posts])

  return (
    <SectionShell
      ref={scopeRef}
      id="ripples"
      eyebrow={section.eyebrow}
      title={section.title}
      description={section.description}
    >
      <div className="content-grid content-grid--three" data-slot="post-grid">
        {posts.map((post) => (
          <article key={post.id} className="post-card" data-post-card>
            <time className="post-card__date" dateTime={post.publishedAt}>
              {post.publishedAt}
            </time>
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
            <ul className="post-card__tags">
              {post.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </SectionShell>
  )
}
