import api from './api';
import {
  StudentRegisterData,
  TutorRegisterData,
  TutorDocuments
} from '../types/register.types';

// ⚠️ BACKEND REQUIS
const registerService = {

  // POST /auth/register/student — inscription élève/parent
  // → backend crée le compte avec statut "actif"
  // → backend envoie email de bienvenue
  registerStudent: async (data: StudentRegisterData) => {
    const res = await api.post('/auth/register/student', data);
    return res.data;
  },

  // POST /auth/register/tutor — inscription répétiteur
  // → backend crée le compte avec statut "en_attente"
  // → backend stocke les documents sur S3/Cloudinary
  // → backend notifie l'admin pour validation
  // → backend envoie email de confirmation au répétiteur
  registerTutor: async (
    data: TutorRegisterData,
    documents: TutorDocuments
  ) => {
    // Utilise FormData pour envoyer fichiers + données
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    if (documents.cni) formData.append('cni', documents.cni);
    if (documents.diploma) formData.append('diploma', documents.diploma);
    if (documents.photo) formData.append('photo', documents.photo);

    const res = await api.post('/auth/register/tutor', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },

  // GET /auth/check-phone — vérifie si numéro déjà utilisé
  checkPhoneAvailable: async (phone: string) => {
    const res = await api.get('/auth/check-phone', {
      params: { phone }
    });
    return res.data.available;
  },

  // GET /auth/check-email — vérifie si email déjà utilisé
  checkEmailAvailable: async (email: string) => {
    const res = await api.get('/auth/check-email', {
      params: { email }
    });
    return res.data.available;
  },
};

export default registerService;