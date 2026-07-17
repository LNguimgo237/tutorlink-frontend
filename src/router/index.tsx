import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import ProtectedRoute from './ProtectedRoute';

const HomePage    = lazy(() => import('@/pages/home/HomePage'));
const LoginPage   = lazy(() => import('@/pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage'));
const SearchPage  = lazy(() => import('@/pages/search/SearchPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));
const ForgotPasswordPage = lazy(() => import('@/pages/auth/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('@/pages/auth/ResetPasswordPage'));
const ConnexionPage = lazy(() => import('@/pages/auth/LoginPage'));
export const AppRouter = () => (
  <Suspense fallback={<div>Chargement...</div>}>
    <Routes>
      <Route path="/"         element={<HomePage />} />
      <Route path="/login"    element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/search"   element={<SearchPage />} />
      <Route path="*"         element={<NotFoundPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/connexion" element={<ConnexionPage />} />
    </Routes>
  </Suspense>
);