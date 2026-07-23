import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuthStore } from '../store/adminAuthStore';

export const useAdminAuth = () => {
  const [isOtpStep, setIsOtpStep] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { setAdminAuth } = useAdminAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (data: { email: string; password: string }) => {
    setEmail(data.email);
    setIsOtpStep(true);
  };

  const handleVerifyOtp = async (otp: string) => {
    if (otp === '123456') {
      setAdminAuth('fake-token');
      navigate('/admin/dashboard');
    } else {
      setError('Code incorrect');
    }
  };

  return { isOtpStep, error, loading: false, handleLogin, handleVerifyOtp };
};