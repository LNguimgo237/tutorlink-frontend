import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import AdminProtectedRoute from './AdminProtectedRoute';
import TutorLayout from '../layouts/TutorLayout';
import TutorProtectedRoute from './TutorProtectedRoute';


const HomePage       = lazy(() => import('@/pages/home/HomePage'));
const LoginPage      = lazy(() => import('@/pages/auth/LoginPage'));
const RegisterPage   = lazy(() => import('@/pages/auth/RegisterPage'));
const SearchPage     = lazy(() => import('@/pages/search/SearchPage'));
const NotFoundPage   = lazy(() => import('@/pages/NotFoundPage'));
const AdminLoginPage = lazy(() => import('@/pages/admin/AdminLoginPage'));
const AdminDashboardPage =lazy(()=> import('../pages/admin/AdminDashboardPage'));
const AdminUsersPage = lazy(() => import('../pages/admin/AdminUsersPage'));
const AdminTutorsPage = lazy(() => import('../pages/admin/AdminTutorsPage'));
const AdminReservationsPage = lazy(() => import('../pages/admin/AdminReservationsPage'));
const AdminReportsPage = lazy(() => import('../pages/admin/AdminReportsPage'));
const GroupsPage = lazy(() => import('../pages/groups/GroupsPage'));
const GroupDetailPage = lazy(() => import('../pages/groups/GroupDetailPage'));
const AdminGroupsPage = lazy(() => import('../pages/admin/AdminGroupsPage'));
const TutorDashboardPage = lazy(() => import('../pages/tutor/TutorDashboardPage'));
const TutorAvailabilityPage = lazy(() => import('../pages/tutor/TutorAvailabilityPage'));
const TutorRequestsPage = lazy(() => import('../pages/tutor/TutorRequestsPage'));
const TutorGroupsPage = lazy(()=> import('../pages/tutor/TutorGroupsPage'));
export const AppRouter = () => (
  <Suspense fallback={<div>Chargement...</div>}>
    <Routes>
      {/* Routes publiques */}
      <Route path="/"         element={<HomePage />} />
      <Route path="/login"    element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/search"   element={<SearchPage />} />
       <Route path="/groupes"       element={<GroupsPage />} />
      <Route path="/groupes/:id"   element={<GroupDetailPage />} />
      {/* Routes admin */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route element={<AdminProtectedRoute />}/>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<div><AdminDashboardPage/></div>} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/tutors" element={<AdminTutorsPage />} />
          <Route path="/admin/reservations" element={<AdminReservationsPage />} />
          <Route path="/admin/reports" element={<AdminReportsPage />} />
            <Route path="/admin/groups"       element={<AdminGroupsPage />} /> 
            </Route>
            <Route element = {<TutorProtectedRoute />} />
  <Route element={<TutorLayout />}>
    <Route path="/repetiteur/dashboard" element={<TutorDashboardPage />} />
    <Route path="/repetiteur/disponibilites" element={<TutorAvailabilityPage />} />
    <Route path="/repetiteur/demandes" element={<TutorRequestsPage />} />
    <Route path="/repetiteur/mes-groupes" element={<TutorGroupsPage />} />
  </Route>

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Suspense>
);