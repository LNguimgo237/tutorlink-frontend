/**
 * useDocumentTitle.ts  (M7 - Willer Pegasus)
 * ----------------------------------------------
 * Met a jour le titre de l'onglet navigateur avec le nombre total
 * de messages non lus, pour alerter l'utilisateur meme si l'onglet
 * n'est pas actif (changement d'onglet, autre fenetre...).
 *
 * Exemple : "(3) Messagerie TutorLink"
 */

import { useEffect } from 'react'

const BASE_TITLE = 'Messagerie TutorLink'

export function useDocumentTitle(unreadCount: number) {
  useEffect(() => {
    document.title = unreadCount > 0
      ? `(${unreadCount}) ${BASE_TITLE}`
      : BASE_TITLE

    // Restaure le titre par defaut au demontage du composant
    return () => {
      document.title = BASE_TITLE
    }
  }, [unreadCount])
}
