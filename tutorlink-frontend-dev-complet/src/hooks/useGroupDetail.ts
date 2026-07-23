import { useQuery, useMutation } from "@tanstack/react-query";
import groupeService from "../services/groupeService";
import type { Group, GroupReview } from "../types/group.types";

export const useGroupDetail = (groupId: string) => {
  const { data: group, isLoading: isLoadingGroup, isError: hasGroupError } = useQuery({
    queryKey: ["group-detail", groupId],
    queryFn: () => groupeService.getGroupById(groupId) as Promise<Group>,
    enabled: !!groupId,
  });

  const { data: reviews = [] } = useQuery({
    queryKey: ["group-reviews", groupId],
    queryFn: () => groupeService.getGroupReviews(groupId) as Promise<GroupReview[]>,
    enabled: !!groupId,
  });

  const joinMutation = useMutation({
    mutationFn: (method: "MTN" | "Orange") => groupeService.joinGroup(groupId, method),
  });

  const waitlistMutation = useMutation({
    mutationFn: () => groupeService.joinWaitlist(groupId),
  });

  // Coût individuel équivalent, pour la comparaison tarifaire
  const individualCost = group ? 2000 * 16 : 0; // 2000 FCFA/h * 16h/mois
  const savings = group ? individualCost - group.monthlyPrice : 0;

  const handleJoin = (method: "MTN" | "Orange") => joinMutation.mutate(method);
  const handleWaitlist = () => waitlistMutation.mutate();

  return {
    group,
    reviews,
    isLoadingGroup,
    hasGroupError,
    individualCost,
    savings,
    handleJoin,
    isJoining: joinMutation.isPending,
    joinError: joinMutation.isError,
    handleWaitlist,
    isJoiningWaitlist: waitlistMutation.isPending,
  };
};