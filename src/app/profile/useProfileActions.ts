import { Dispatch, SetStateAction } from 'react';
import { UserProfile } from '../../types';

interface UseProfileActionsOptions {
  profile: UserProfile | null;
  setProfile: Dispatch<SetStateAction<UserProfile | null>>;
  openProfile: () => void;
  closeProfile: () => void;
}

export function useProfileActions({ profile, setProfile, openProfile, closeProfile }: UseProfileActionsOptions) {
  const saveProfile = (nextProfile: Omit<UserProfile, 'joinedAt' | 'favoriteTopics'>) => {
    setProfile((current) => ({
      name: nextProfile.name,
      level: nextProfile.level,
      goal: nextProfile.goal,
      weeklyGoal: nextProfile.weeklyGoal,
      favoriteTopics: current?.favoriteTopics ?? [],
      joinedAt: current?.joinedAt ?? new Date().toISOString(),
    }));
    closeProfile();
  };

  const logout = () => {
    setProfile(null);
    closeProfile();
  };

  const toggleFavoriteTopic = (topicId: string) => {
    if (!profile) {
      openProfile();
      return;
    }

    setProfile((current) => {
      if (!current) {
        return current;
      }

      const alreadyFavorite = current.favoriteTopics.includes(topicId);
      return {
        ...current,
        favoriteTopics: alreadyFavorite
          ? current.favoriteTopics.filter((id) => id !== topicId)
          : [...current.favoriteTopics, topicId],
      };
    });
  };

  return {
    saveProfile,
    logout,
    toggleFavoriteTopic,
  };
}
