import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import tutorDashboardService from '../services/tutorDashboardService';
import {
  TutorStats, CourseRequest, AvailabilitySlot,
  ConfirmedCourse, TutorGroup, RevenueDataPoint, TutorActivity
} from '../types/tutor.types';

const EMPTY_STATS: TutorStats = {
  coursesThisMonth: 0, activeStudents: 0, monthlyRevenue: 0, pendingRequests: 0,
};

export const useTutorDashboard = () => {
  const queryClient = useQueryClient();

  const { data: stats = EMPTY_STATS, isLoading: l1 } = useQuery({
    queryKey: ['tutor-dashboard-stats'],
    queryFn: tutorDashboardService.getStats,
    staleTime: 60 * 1000,
  });

  const { data: requests = [], isLoading: l2 } = useQuery<CourseRequest[]>({
    queryKey: ['tutor-dashboard-requests'],
    queryFn: tutorDashboardService.getRequests,
    staleTime: 30 * 1000,
  });

  const { data: availability = [], isLoading: l3 } = useQuery<AvailabilitySlot[]>({
    queryKey: ['tutor-dashboard-availability'],
    queryFn: tutorDashboardService.getAvailability,
    staleTime: 5 * 60 * 1000,
  });

  const { data: confirmedCourses = [], isLoading: l4 } = useQuery<ConfirmedCourse[]>({
    queryKey: ['tutor-dashboard-confirmed'],
    queryFn: tutorDashboardService.getConfirmedCourses,
    staleTime: 60 * 1000,
  });

  const { data: myGroups = [], isLoading: l5 } = useQuery<TutorGroup[]>({
    queryKey: ['tutor-dashboard-groups'],
    queryFn: tutorDashboardService.getMyGroups,
    staleTime: 60 * 1000,
  });

  const { data: revenueData = [], isLoading: l6 } = useQuery<RevenueDataPoint[]>({
    queryKey: ['tutor-dashboard-revenue'],
    queryFn: tutorDashboardService.getRevenue,
    staleTime: 5 * 60 * 1000,
  });

  const { data: activity = [], isLoading: l7 } = useQuery<TutorActivity[]>({
    queryKey: ['tutor-dashboard-activity'],
    queryFn: tutorDashboardService.getActivity,
    staleTime: 30 * 1000,
  });

  const acceptMutation = useMutation({
    mutationFn: tutorDashboardService.acceptRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tutor-dashboard-requests'] }),
  });

  const refuseMutation = useMutation({
    mutationFn: tutorDashboardService.refuseRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tutor-dashboard-requests'] }),
  });

  const handleAcceptRequest = (requestId: string) => acceptMutation.mutate(requestId);
  const handleRefuseRequest = (requestId: string) => refuseMutation.mutate(requestId);

  const groupRevenue = myGroups.reduce((sum, g) => sum + g.monthlyRevenue, 0);
  const totalGroupStudents = myGroups.reduce((sum, g) => sum + g.currentMembers, 0);

  return {
    loading: l1 || l2 || l3 || l4 || l5 || l6 || l7,
    stats, requests, availability,
    confirmedCourses, myGroups, revenueData, activity,
    groupRevenue, totalGroupStudents,
    handleAcceptRequest, handleRefuseRequest,
  };
};