/**
 * aiService.ts  (M7 - Willer Pegasus)
 * -------------------------------------
 * Service de l'assistant IA TutorLink.
 * Utilise l'API Anthropic (Claude) directement depuis le frontend.
 *
 * IMPORTANT SECURITE :
 * La cle API ne doit PAS etre exposee en production.
 * [BACKEND] En production : passer par un endpoint proxy backend
 *   POST /api/ai/chat → le backend appelle Anthropic avec la cle secrete
 *   Cela evite d'exposer la cle dans le bundle JS du navigateur.
 *
 * Pour la demo / developpement : la cle est lue depuis .env
 * Creer un fichier .env a la racine du projet :
 *   VITE_ANTHROPIC_API_KEY=sk-ant-...
 */

export interface AiMessage {
  role: 'user' | 'assistant'
  content: string
}

// Prompt systeme : definit la personnalite et le contexte de l'assistant
const SYSTEM_PROMPT = `Tu es l'assistant intelligent de TutorLink, une plateforme de mise en relation entre eleves/parents et repetiteurs a Dschang, Cameroun.

Ton role :
- Aider les eleves et parents a trouver le bon repetiteur selon leurs besoins
- Repondre aux questions sur les matieres scolaires (mathematiques, physique, anglais, francais, SVT, informatique...)
- Expliquer le fonctionnement de la plateforme TutorLink
- Donner des conseils de methode de travail et de revision
- Aider a formuler des messages pour les repetiteurs
- Informer sur les tarifs (generalement entre 2500 et 5000 FCFA par heure)
- Mentionner les quartiers de Dschang si pertinent (Centre, Foto, Ngui, Tsinkop, Foreke)

Reponds toujours en francais, de facon claire, bienveillante et adaptee au contexte scolaire camerounais.
Sois concis (maximum 3-4 phrases par reponse sauf si l'utilisateur demande une explication detaillee).
Si la question concerne une matiere scolaire, propose une explication simple et un exemple concret.`

/**
 * Envoie un message a l'assistant IA et retourne la reponse.
 * @param history  Historique complet de la conversation (sans le systeme)
 * @returns        Texte de la reponse de l'assistant
 */
export async function askAiAssistant(history: AiMessage[]): Promise<string> {
  // [BACKEND] En production, remplacer par :
  // const res = await axios.post('/api/ai/chat', { messages: history })
  // return res.data.content

  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY as string | undefined

  if (!apiKey) {
    // Mode demo sans cle API : reponses simulees
    return simulateDemoResponse(history[history.length - 1]?.content ?? '')
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      // En-tete requis pour les appels depuis le navigateur
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages: history,
    }),
  })

  if (!response.ok) {
    throw new Error(`Erreur API: ${response.status}`)
  }

  const data = await response.json()
  // Extrait le texte de la reponse
  const textBlock = data.content?.find(
    (block: { type: string }) => block.type === 'text'
  )
  return textBlock?.text ?? "Je n'ai pas pu generer une reponse."
}

/**
 * Reponses simulees pour la demo (sans cle API).
 * Permet de tester l'interface sans configurer l'API.
 */
function simulateDemoResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase()

  if (msg.includes('repetiteur') || msg.includes('trouver')) {
    return "Je peux vous aider a trouver le repetiteur ideal ! Dites-moi la matiere, le niveau scolaire et votre quartier a Dschang. Notre plateforme compte plus de 248 repetiteurs verifies."
  }
  if (msg.includes('math') || msg.includes('algebre') || msg.includes('geometrie')) {
    return "Pour les mathematiques, je recommande de commencer par revoir les bases du chapitre avant d'attaquer les exercices. Voulez-vous que je vous explique un concept precis ou que je vous recommande un repetiteur specialise ?"
  }
  if (msg.includes('physique') || msg.includes('chimie')) {
    return "La physique-chimie necessite de bien comprendre les formules avant de les appliquer. Mme Tchana Sylvie, doctorante a l'UDs, est excellente pour cette matiere (3000 FCFA/h, quartier Foto)."
  }
  if (msg.includes('anglais')) {
    return "Pour progresser en anglais, la pratique orale est essentielle. Mlle Fotso Aline utilise une methode immersive tres efficace (2800 FCFA/h, Centre Dschang). Voulez-vous voir son profil ?"
  }
  if (msg.includes('tarif') || msg.includes('prix') || msg.includes('fcfa') || msg.includes('cout')) {
    return "Les tarifs sur TutorLink varient entre 2500 et 5000 FCFA par heure selon la matiere et le niveau. Le paiement se fait via MTN Mobile Money ou Orange Money apres confirmation du cours."
  }
  if (msg.includes('bonjour') || msg.includes('salut') || msg.includes('bonsoir')) {
    return "Bonjour ! Je suis l'assistant TutorLink. Je peux vous aider a trouver un repetiteur, repondre a vos questions scolaires ou vous expliquer comment fonctionne la plateforme. Comment puis-je vous aider ?"
  }
  if (msg.includes('bac') || msg.includes('bepc') || msg.includes('examen')) {
    return "Pour la preparation au BAC ou BEPC, il est conseille de commencer les revisions 3 mois avant. Nos repetiteurs proposent des seances intensives de preparation. Quelle matiere vous pose le plus de difficultes ?"
  }
  if (msg.includes('inscription') || msg.includes('compte') || msg.includes('creer')) {
    return "Pour creer votre compte TutorLink, cliquez sur 'Creer un compte' en haut de la page. L'inscription est gratuite et prend moins de 2 minutes. Vous pouvez vous inscrire en tant qu'eleve, parent ou repetiteur."
  }

  return "Bonne question ! En tant qu'assistant TutorLink, je suis la pour vous aider a trouver le bon repetiteur ou repondre a vos questions scolaires. Pouvez-vous preciser votre demande ?"
}
