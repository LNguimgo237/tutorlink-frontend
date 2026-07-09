import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuthStore } from '../store/adminAuthStore';
import adminAuthService from '../services/adminAuthService';

export const useAdminAuth = () => {
  const [isOtpStep, setIsOtpStep] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setAdminAuth } = useAdminAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (data: { email: string; password: string }) => {
    setLoading(true);
    setError('');
    try {
      await adminAuthService.login(data);   // ← appel réel désormais
      setEmail(data.email);
      setIsOtpStep(true);
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Identifiants invalides.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (otp: string) => {
    setLoading(true);
    setError('');
    try {
      const res = await adminAuthService.verifyOtp({ email, otp }); // ← appel réel désormais
      setAdminAuth(res.token);
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Code incorrect.");
    } finally {
      setLoading(false);
    }
  };

  return { isOtpStep, error, loading, handleLogin, handleVerifyOtp };
};