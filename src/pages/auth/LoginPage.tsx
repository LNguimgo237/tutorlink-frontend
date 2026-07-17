import LoginForm from '@/components/forms/LoginForm';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-md p-8">
        {/* En-tête */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-900">TutorLink </h1>
          <p className="text-gray-500 mt-2">Welcome Back!</p>
        </div>

        {/* Formulaire */}
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;