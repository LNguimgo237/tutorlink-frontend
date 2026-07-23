// ============================================================
// FICHIER : src/mocks/browser.ts
// RÔLE    : Crée le "faux serveur" qui va tourner dans le
//           navigateur et intercepter les appels réseau.
//           C'est ce fichier qu'on démarre depuis main.tsx.
// ============================================================

import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);