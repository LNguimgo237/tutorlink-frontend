export interface TutorProfile {
  id: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  bio: string;
  subjects: string[];
  location: string;
  hourlyRate: number;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
}

export interface SearchFilters {
  subject?: string;
  level?: string;
  location?: string;
}