import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

const AuthLayout = ({ children, title = 'TutorLink 🎓', subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-md p-8">
        {/* En-tête */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-900">{title}</h1>
          {subtitle && (
            <p className="text-gray-500 mt-2">{subtitle}</p>
          )}
        </div>

        {/* Contenu */}
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;