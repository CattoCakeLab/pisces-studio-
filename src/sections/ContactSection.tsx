import { useState, type FormEvent } from 'react'
import { SectionShell } from '../components/layout/SectionShell'
import type { ContactContent } from '../types/content'

interface ContactSectionProps {
  content: ContactContent
  footer: {
    copyright: string
    tagline: string
  }
}

export function ContactSection({ content, footer }: ContactSectionProps) {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const name = String(formData.get('name') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim()
    const message = String(formData.get('message') ?? '').trim()

    if (!name || !email || !message) {
      setStatus('error')
      setErrorMessage(content.requiredErrorMessage)
      return
    }

    const emailInput = form.elements.namedItem('email') as HTMLInputElement
    if (!emailInput.checkValidity()) {
      setStatus('error')
      setErrorMessage(content.emailErrorMessage)
      return
    }

    setStatus('success')
    setErrorMessage('')
    form.reset()
  }

  return (
    <>
      <SectionShell
        id="contact"
        className="contact-section"
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.description}
      >
        <form className="contact-form" noValidate onSubmit={handleSubmit}>
          <label>
            {content.nameLabel}
            <input name="name" autoComplete="name" required />
          </label>
          <label>
            {content.emailLabel}
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label>
            {content.messageLabel}
            <textarea name="message" rows={5} required />
          </label>
          <button type="submit">{content.submitLabel}</button>
          <p className="contact-form__notice">{content.demoNotice}</p>
          {status === 'success' ? (
            <p
              className="contact-form__feedback contact-form__feedback--success"
              role="status"
            >
              {content.successMessage}
            </p>
          ) : null}
          {status === 'error' ? (
            <p
              className="contact-form__feedback contact-form__feedback--error"
              role="alert"
            >
              {errorMessage}
            </p>
          ) : null}
        </form>
      </SectionShell>
      <footer className="site-footer">
        <p>{footer.copyright}</p>
        <p>{footer.tagline}</p>
      </footer>
    </>
  )
}
