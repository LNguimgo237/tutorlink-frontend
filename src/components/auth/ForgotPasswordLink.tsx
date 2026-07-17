import { Link } from 'react-router-dom';

const ForgotPasswordLink = () => {
  return (
    <div className="text-right">
      <Link
        to="/forgot-password"
        className="text-sm text-blue-600 hover:underline"
      >
        Mot de passe oublié ?
      </Link>
    </div>
  );
};

export default ForgotPasswordLink;