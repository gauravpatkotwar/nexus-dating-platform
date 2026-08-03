// NEXUS Compatibility Algorithm

export interface UserPreferences {
  ageMin: number;
  ageMax: number;
  maxDistanceKm: number;
  lifestyle: string[];
  interests: string[];
  relationshipGoal: string;
  schedulePreference: string;
}

export interface UserProfileData {
  id: string;
  username: string;
  age: number;
  distanceKm: number;
  lifestyle: string[];
  interests: string[];
  relationshipGoal: string;
  schedulePreference: string;
  communicationStyle: string;
}

export function calculateCompatibilityScore(
  user: UserPreferences,
  candidate: UserProfileData
): number {
  let score = 50; // Base score

  // 1. Age match
  if (candidate.age >= user.ageMin && candidate.age <= user.ageMax) {
    score += 15;
  } else {
    score -= 10;
  }

  // 2. Distance weight
  if (candidate.distanceKm <= user.maxDistanceKm) {
    score += 10;
  } else {
    score -= 5;
  }

  // 3. Shared interests
  const commonInterests = candidate.interests.filter((i) =>
    user.interests.includes(i)
  );
  score += Math.min(commonInterests.length * 5, 20);

  // 4. Relationship Goal Alignment
  if (candidate.relationshipGoal === user.relationshipGoal) {
    score += 15;
  }

  // 5. Lifestyle overlap (e.g. Night Owl, Fitness, Coffee Lover)
  const commonLifestyle = candidate.lifestyle.filter((l) =>
    user.lifestyle.includes(l)
  );
  score += Math.min(commonLifestyle.length * 4, 12);

  // Ensure score stays bounded between 65% and 99% for high chemistry impression
  return Math.min(Math.max(Math.round(score), 65), 99);
}
