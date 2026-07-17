import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { authService } from '@/services/authService';
import toast from 'react-hot-toast';

const forgotSchema = z.object({
  email: z.string().email('Email invalide'),
});

type ForgotFormData = z.infer<typeof forgotSchema>;

const ForgotPasswordPage = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotFormData>({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = async (data: ForgotFormData) => {
    setIsLoading(true);
    try {
      await authService.forgotPassword(data.email);
      setEmailSent(true);
      toast.success('Email envoyé avec succès !');
    } catch {
      toast.error('Une erreur est survenue, réessayez.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-md p-8">
        {/* En-tête */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-900">TutorLink 🎓</h1>
          <p className="text-gray-500 mt-2">Mot de passe oublié ?</p>
        </div>

        {emailSent ? (
          /* Message de confirmation */
          <div className="text-center space-y-4">
            <div className="text-5xl">📧</div>
            <h2 className="text-lg font-semibold text-gray-800">
              Vérifiez votre boîte mail
            </h2>
            <p className="text-gray-500 text-sm">
              Un lien de réinitialisation a été envoyé à votre adresse email.
            </p>
            <Link
              to="/login"
              className="block w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition text-center"
            >
              Retour à la connexion
            </Link>
          </div>
        ) : (
          /* Formulaire */
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <p className="text-sm text-gray-500">
              Entrez votre email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
            </p>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                {...register('email')}
                type="email"
                placeholder="exemple@email.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            >
              {isLoading ? 'Envoi...' : 'Envoyer le lien'}
            </button>

            <p className="text-center text-sm text-gray-500">
              <Link to="/login" className="text-blue-600 hover:underline">
                Retour à la connexion
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;