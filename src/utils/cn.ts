/**
 * Utilitaire de fusion de classes Tailwind
 * Combine clsx (classes conditionnelles) + tailwind-merge (supprime les conflits)
 * Usage : cn('px-4 py-2', isActive && 'bg-primary', className)
 */
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
