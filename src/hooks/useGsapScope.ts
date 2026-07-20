import { useLayoutEffect, useRef } from 'react'
import type { DependencyList } from 'react'
import { gsap } from '../lib/gsap'

export type GsapSetup = () => void

export function useGsapScope<TElement extends HTMLElement>(
  setup: GsapSetup,
  dependencies: DependencyList = [],
) {
  const scope = useRef<TElement>(null)

  useLayoutEffect(() => {
    if (!scope.current) return undefined

    const context = gsap.context(setup, scope)
    return () => context.revert()
    // The caller owns this explicit dependency list, like a native effect hook.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)

  return scope
}

