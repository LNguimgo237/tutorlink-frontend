import api from "./api";
import type {
  TutorGroupDetail,
  GroupStudent,
  GroupFormData,
} from "../types/tutorGroup.tytes";

/** GET /tutor/groups */
export async function getTutorGroups(): Promise<TutorGroupDetail[]> {
  const res = await api.get<TutorGroupDetail[]>("/tutor/groups");
  return res.data;
}

/** GET /tutor/groups/:groupId/students */
export async function getGroupStudents(groupId: string): Promise<GroupStudent[]> {
  const res = await api.get<GroupStudent[]>(`/tutor/groups/${groupId}/students`);
  return res.data;
}

/** POST /tutor/groups */
export async function createGroup(data: GroupFormData): Promise<TutorGroupDetail> {
  const res = await api.post<TutorGroupDetail>("/tutor/groups", data);
  return res.data;
}

/** PUT /tutor/groups/:groupId */
export async function updateGroup(
  groupId: string,
  data: GroupFormData
): Promise<TutorGroupDetail> {
  const res = await api.put<TutorGroupDetail>(`/tutor/groups/${groupId}`, data);
  return res.data;
}

/** DELETE /tutor/groups/:groupId */
export async function deleteGroup(groupId: string): Promise<void> {
  await api.delete(`/tutor/groups/${groupId}`);
}