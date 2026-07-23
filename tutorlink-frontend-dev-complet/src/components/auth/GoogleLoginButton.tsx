import { useEffect, useRef } from 'react';

interface Props {
  onSuccess: (credential: string) => void;
  loading: boolean;
}

// Bouton connexion Google — utilise la librairie officielle Google Identity
const GoogleLoginButton = ({ onSuccess, loading }: Props) => {
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId || !window.google) return;

    // Initialise le client Google Identity Services
    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: (response: { credential: string }) => {
        onSuccess(response.credential);
      },
      auto_select: false,
      cancel_on_tap_outside: true,
    });

    // Rend le bouton Google dans le div référencé
    if (buttonRef.current) {
      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: 'outline',
        size: 'large',
        width: buttonRef.current.offsetWidth,
        text: 'signin_with',
        shape: 'rectangular',
        logo_alignment: 'left',
      });
    }

    return () => {
      window.google?.accounts?.id?.cancel();
    };
  }, [onSuccess]);

  return (
    <div className="w-full">
      {loading ? (
        // État chargement
        <div className="w-full border-2 border-gray-200 rounded-xl
                        py-3 flex items-center justify-center gap-3
                        bg-white text-gray-500">
          <div className="w-5 h-5 border-2 border-gray-300
                          border-t-blue-500 rounded-full animate-spin" />
          <span className="text-sm">Connexion Google en cours...</span>
        </div>
      ) : (
        // Bouton Google officiel
        <div
          ref={buttonRef}
          className="w-full"
          style={{ minHeight: 44 }}
        />
      )}
    </div>
  );
};

// Déclaration TypeScript pour window.google
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: object) => void;
          renderButton: (element: HTMLElement, config: object) => void;
          cancel: () => void;
          prompt: () => void;
        };
      };
    };
  }
}

export default GoogleLoginButton;