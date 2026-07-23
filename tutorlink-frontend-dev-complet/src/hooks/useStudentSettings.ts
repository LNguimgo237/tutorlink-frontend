import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import studentSettingsService from '../services/studentSettingsService';
import {
  SettingsSection, StudentProfile,
  NotificationPreferences, PasswordChangeData,
  PrivacySettings
} from '../types/studentSettings.types';

const EMPTY_PROFILE: StudentProfile = {
  name: '', email: '', phone: '', level: '', quartier: '', bio: '',
};
const DEFAULT_NOTIF: NotificationPreferences = {
  emailReservation: true, emailMessage: true,
  smsReminder: true, smsPayment: true, pushNotifications: false,
};
const DEFAULT_PRIVACY: PrivacySettings = {
  showProfileToTutors: true, showInReviews: true, allowDataExport: true,
};

export const useStudentSettings = () => {
  const [activeSection, setActiveSection] = useState<SettingsSection>('profil');

  const [profile, setProfile] = useState<StudentProfile>(EMPTY_PROFILE);
  const [notifPrefs, setNotifPrefs] = useState<NotificationPreferences>(DEFAULT_NOTIF);
  const [privacy, setPrivacy] = useState<PrivacySettings>(DEFAULT_PRIVACY);

  useEffect(() => {
    studentSettingsService.getProfile().then(setProfile).catch(() => {});
    studentSettingsService.getNotificationPrefs().then(setNotifPrefs).catch(() => {});
    studentSettingsService.getPrivacySettings().then(setPrivacy).catch(() => {});
  }, []);

  const [passwordData, setPasswordData] = useState<PasswordChangeData>({
    currentPassword: '', newPassword: '', confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const saveProfileMutation = useMutation({
    mutationFn: () => studentSettingsService.updateProfile(profile),
    onSuccess: () => {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: () => studentSettingsService.changePassword(passwordData),
    onSuccess: () => {
      setPasswordSuccess(true);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    },
    onError: () => setPasswordError("Mot de passe actuel incorrect."),
  });

  const notifMutation = useMutation({ mutationFn: studentSettingsService.updateNotificationPrefs });
  const privacyMutation = useMutation({ mutationFn: studentSettingsService.updatePrivacySettings });
  const deleteAccountMutation = useMutation({ mutationFn: studentSettingsService.deleteAccount });

  const handleSaveProfile = () => saveProfileMutation.mutate();

  const handleChangePassword = () => {
    setPasswordError('');
    setPasswordSuccess(false);
    if (passwordData.newPassword.length < 8) {
      setPasswordError('Le mot de passe doit contenir au moins 8 caractères.');
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('Les mots de passe ne correspondent pas.');
      return;
    }
    changePasswordMutation.mutate();
  };

  const toggleNotifPref = (key: keyof NotificationPreferences) => {
    setNotifPrefs(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      notifMutation.mutate(updated);
      return updated;
    });
  };

  const togglePrivacy = (key: keyof PrivacySettings) => {
    setPrivacy(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      privacyMutation.mutate(updated);
      return updated;
    });
  };

  const handleDeleteAccount = () => {
    deleteAccountMutation.mutate();
    setShowDeleteConfirm(false);
  };

  return {
    activeSection, setActiveSection,
    profile, setProfile,
    passwordData, setPasswordData,
    passwordError, passwordSuccess,
    notifPrefs, privacy,
    saving: saveProfileMutation.isPending || changePasswordMutation.isPending,
    saved,
    showDeleteConfirm, setShowDeleteConfirm,
    handleSaveProfile, handleChangePassword,
    toggleNotifPref, togglePrivacy,
    handleDeleteAccount,
  };
};