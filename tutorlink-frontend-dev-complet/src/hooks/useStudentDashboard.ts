import { useQuery } from '@tanstack/react-query';
import studentService from '../services/studentService';
import {
  StudentStats, UpcomingCourse,
  StudentGroup, SubjectProgress, RecentActivity
} from '../types/student.types';

const EMPTY_STATS: StudentStats = {
  totalHours: 0, activeTutors: 0, currentAverage: 0, upcomingCourses: 0,
};

export const useStudentDashboard = () => {
  const { data: stats = EMPTY_STATS, isLoading: l1 } = useQuery({
    queryKey: ['student-stats'],
    queryFn: studentService.getStats,
    staleTime: 60 * 1000,
  });

  const { data: upcomingCourses = [], isLoading: l2 } = useQuery<UpcomingCourse[]>({
    queryKey: ['student-upcoming-courses'],
    queryFn: studentService.getUpcomingCourses,
    staleTime: 60 * 1000,
  });

  const { data: myGroups = [], isLoading: l3 } = useQuery<StudentGroup[]>({
    queryKey: ['student-dashboard-groups'],
    queryFn: studentService.getMyGroups,
    staleTime: 60 * 1000,
  });

  const { data: progress = [], isLoading: l4 } = useQuery<SubjectProgress[]>({
    queryKey: ['student-progress'],
    queryFn: studentService.getProgress,
    staleTime: 5 * 60 * 1000,
  });

  const { data: recentActivity = [], isLoading: l5 } = useQuery<RecentActivity[]>({
    queryKey: ['student-activity'],
    queryFn: studentService.getRecentActivity,
    staleTime: 30 * 1000,
  });

  return {
    loading: l1 || l2 || l3 || l4 || l5,
    stats, upcomingCourses, myGroups, progress, recentActivity,
  };
};