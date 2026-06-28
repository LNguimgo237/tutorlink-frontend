import { Outlet } from 'react-router-dom';
import TutorSidebar from '../components/tutor/TutorSidebar';

// Layout commun à toutes les pages de l'espace répétiteur
const TutorLayout = () => (
  <div className="flex min-h-screen bg-gray-50">
    <TutorSidebar />
    <main className="flex-1 p-8 overflow-auto">
      <Outlet />
    </main>
  </div>
);

export default TutorLayout;