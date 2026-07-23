/**
 * PlaceholderLink.tsx
 * ----------------------
 * Lien temporaire utilise tant que react-router-dom n'est pas branche.
 * Empeche le saut de page provoque par href="#" (preventDefault).
 *
 * [BACKEND/ROUTER] A remplacer par <Link to="..."> de react-router-dom
 * une fois le routeur configure (M1 Leonel) :
 *   <PlaceholderLink className="btn-primary">Texte</PlaceholderLink>
 *   devient
 *   <Link to="/search" className="btn-primary">Texte</Link>
 */

import type { AnchorHTMLAttributes, ReactNode } from 'react'

interface PlaceholderLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
}

export default function PlaceholderLink({
  children,
  onClick,
  ...props
}: PlaceholderLinkProps) {
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault()
        onClick?.(e)
      }}
      {...props}
    >
      {children}
    </a>
  )
}
