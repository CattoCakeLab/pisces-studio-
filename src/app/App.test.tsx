import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { SECTION_DEFINITIONS } from '../config/sections'
import { App } from './App'

describe('App scaffold', () => {
  it('renders one semantic section and navigation target per definition', () => {
    render(<App />)

    for (const section of SECTION_DEFINITIONS) {
      expect(document.getElementById(section.id)).toBeInTheDocument()
      expect(
        screen.getByRole('link', { name: section.ariaLabel }),
      ).toHaveAttribute('href', `#${section.id}`)
    }
  })

  it('uses the shared navigation hook when a nav item is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('link', { name: '前往联系表单' }))

    expect(HTMLElement.prototype.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    })
  })

  it('labels the contact form as a local-only demo', () => {
    render(<App />)
    expect(screen.getByText('Demo 表单不会实际发送信息。')).toBeVisible()
  })
})

