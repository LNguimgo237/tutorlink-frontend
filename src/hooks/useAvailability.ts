import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import availabilityService from '../services/availabilityService';
import { DayAvailability, TimeSlotOption, AvailabilityStats } from '../types/availability.types';

export const TIME_SLOTS: TimeSlotOption[] = [
  { id: 's1', startTime: '08h', endTime: '10h', label: '08h – 10h' },
  { id: 's2', startTime: '10h', endTime: '12h', label: '10h – 12h' },
  { id: 's3', startTime: '12h', endTime: '14h', label: '12h – 14h' },
  { id: 's4', startTime: '14h', endTime: '16h', label: '14h – 16h' },
  { id: 's5', startTime: '16h', endTime: '18h', label: '16h – 18h' },
  { id: 's6', startTime: '18h', endTime: '20h', label: '18h – 20h' },
  { id: 's7', startTime: '20h', endTime: '22h', label: '20h – 22h' },
];

const DAYS: { day: string; label: string }[] = [
  { day: 'LUN', label: 'Lundi' }, { day: 'MAR', label: 'Mardi' },
  { day: 'MER', label: 'Mercredi' }, { day: 'JEU', label: 'Jeudi' },
  { day: 'VEN', label: 'Vendredi' }, { day: 'SAM', label: 'Samedi' },
  { day: 'DIM', label: 'Dimanche' },
];

// Grille vide par défaut — utilisée le temps que le backend réponde,
// ou pour un répétiteur qui n'a encore rien configuré.
const EMPTY_AVAILABILITY: DayAvailability[] = DAYS.map(d => ({
  day: d.day, label: d.label,
  slots: TIME_SLOTS.map(s => ({ slotId: s.id, available: false })),
}));

export const useAvailability = () => {
  const [saved, setSaved] = useState(false);

  const { data: fetched } = useQuery<DayAvailability[]>({
    queryKey: ['tutor-availability'],
    queryFn: availabilityService.getAvailability,
    staleTime: 5 * 60 * 1000,
  });

  const [availability, setAvailability] = useState<DayAvailability[]>(EMPTY_AVAILABILITY);

  useEffect(() => {
    if (fetched && fetched.length > 0) setAvailability(fetched);
  }, [fetched]);

  const toggleSlot = (dayIndex: number, slotId: string) => {
    setAvailability(prev => prev.map((day, i) => {
      if (i !== dayIndex) return day;
      return { ...day, slots: day.slots.map(s => s.slotId === slotId ? { ...s, available: !s.available } : s) };
    }));
    setSaved(false);
  };

  const selectAllDay = (dayIndex: number) => {
    setAvailability(prev => prev.map((day, i) =>
      i !== dayIndex ? day : { ...day, slots: day.slots.map(s => ({ ...s, available: true })) }
    ));
    setSaved(false);
  };

  const clearDay = (dayIndex: number) => {
    setAvailability(prev => prev.map((day, i) =>
      i !== dayIndex ? day : { ...day, slots: day.slots.map(s => ({ ...s, available: false })) }
    ));
    setSaved(false);
  };

  const saveMutation = useMutation({
    mutationFn: () => availabilityService.saveAvailability(availability),
    onSuccess: () => setSaved(true),
  });

  const handleSave = () => saveMutation.mutate();

  const totalSlots = availability.reduce((sum, day) => sum + day.slots.filter(s => s.available).length, 0);
  const totalHoursPerWeek = totalSlots * 2;
  const totalHoursPerMonth = totalHoursPerWeek * 4;
  const maxMonthlyRevenue = totalHoursPerMonth * 2000;

  const stats: AvailabilityStats = {
    totalSlotsPerWeek: totalSlots, totalHoursPerWeek, totalHoursPerMonth, maxMonthlyRevenue,
  };

  return {
    availability, stats,
    saving: saveMutation.isPending, saved,
    toggleSlot, selectAllDay, clearDay, handleSave,
  };
};