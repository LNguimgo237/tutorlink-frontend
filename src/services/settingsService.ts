import api from "./api";
import type {
  TutorProfile,
  TutorSubjectSetting,
  ChangePasswordData,
  NotificationPreferences,
} from "../types/settings.types";

/** GET /tutor/profile */
export async function getTutorProfile(): Promise<TutorProfile> {
  const res = await api.get<TutorProfile>("/tutor/profile");
  return res.data;
}

/** PUT /tutor/profile */
export async function updateTutorProfile(data: TutorProfile): Promise<TutorProfile> {
  const res = await api.put<TutorProfile>("/tutor/profile", data);
  return res.data;
}

/** GET /tutor/subjects */
export async function getTutorSubjects(): Promise<TutorSubjectSetting[]> {
  const res = await api.get<TutorSubjectSetting[]>("/tutor/subjects");
  return res.data;
}

/** POST /tutor/subjects */
export async function addTutorSubject(
  name: string,
  level: string
): Promise<TutorSubjectSetting> {
  const res = await api.post<TutorSubjectSetting>("/tutor/subjects", { name, level });
  return res.data;
}

/** DELETE /tutor/subjects/:subjectId */
export async function removeTutorSubject(subjectId: string): Promise<void> {
  await api.delete(`/tutor/subjects/${subjectId}`);
}

/** PUT /tutor/security/password */
export async function changePassword(data: ChangePasswordData): Promise<void> {
  await api.put("/tutor/security/password", data);
}

/** GET /tutor/notifications/preferences */
export async function getNotificationPreferences(): Promise<NotificationPreferences> {
  const res = await api.get<NotificationPreferences>("/tutor/notifications/preferences");
  return res.data;
}

/** PUT /tutor/notifications/preferences */
export async function updateNotificationPreferences(
  prefs: NotificationPreferences
): Promise<NotificationPreferences> {
  const res = await api.put<NotificationPreferences>("/tutor/notifications/preferences", prefs);
  return res.data;
}