import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import AdminProtectedRoute from './AdminProtectedRoute';

const HomePage       = lazy(() => import('@/pages/home/HomePage'));
const LoginPage      = lazy(() => import('@/pages/auth/LoginPage'));
const RegisterPage   = lazy(() => import('@/pages/auth/RegisterPage'));
const SearchPage     = lazy(() => import('@/pages/search/SearchPage'));
const NotFoundPage   = lazy(() => import('@/pages/NotFoundPage'));
const AdminLoginPage = lazy(() => import('@/pages/admin/AdminLoginPage'));
const AdminDashboardPage =lazy(()=> import('../pages/admin/AdminDashboardPage'));
const AdminUsersPage = lazy(() => import('../pages/admin/AdminUsersPage'));
const AdminTutorsPage = lazy(() => import('../pages/admin/AdminTutorsPage'));

export const AppRouter = () => (
  <Suspense fallback={<div>Chargement...</div>}>
    <Routes>
      {/* Routes publiques */}
      <Route path="/"         element={<HomePage />} />
      <Route path="/login"    element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/search"   element={<SearchPage />} />

      {/* Routes admin */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route element={<AdminProtectedRoute />}/>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<div><AdminDashboardPage/></div>} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/tutors" element={<AdminTutorsPage />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Suspense>
);