import { Outlet } from 'react-router-dom';
import StudentSidebar from '../components/student/StudentSidebar';
import ThemeToggle from '../components/ui/ThemeToggle';
// Layout commun à toutes les pages de l'espace élève
const StudentLayout = () => (
  <div className="flex min-h-screen bg-gray-50">
    {/* Sidebar gauche */}
    <ThemeToggle />
    <StudentSidebar />

    {/* Contenu principal */}
    <main className="flex-1 p-8 overflow-auto">
      <Outlet />
    </main>
  </div>
);

export default StudentLayout;