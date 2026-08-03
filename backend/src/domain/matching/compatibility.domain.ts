/**
 * DOMAIN: Compatibility & Matching Engine
 * 
 * Handles multi-vector avatar theme compatibility scoring,
 * icebreaker prerequisite validation, and neighborhood radius boundary checks.
 */

export interface AvatarTraits {
  theme: 'Cyberpunk' | 'Anime' | 'Pixel Art' | 'Fantasy' | 'Minimal' | 'Cute' | 'Modern';
  hairColor: string;
  eyeColor: string;
  frameStyle: string;
  accessories: string[];
}

export interface CompatibilityScoreResult {
  scorePercentage: number;
  chemistryTier: 'HIGH_CHEMISTRY' | 'BALANCED' | 'EXPLORATORY';
  sharedTraits: string[];
  icebreakerRequired: boolean;
}

export class CompatibilityDomain {
  /**
   * Computes compatibility score between two vector avatar trait profiles.
   */
  static calculateCompatibility(
    traitsA: AvatarTraits,
    traitsB: AvatarTraits,
  ): CompatibilityScoreResult {
    let rawScore = 60; // Base baseline
    const sharedTraits: string[] = [];

    // Theme affinity
    if (traitsA.theme === traitsB.theme) {
      rawScore += 25;
      sharedTraits.push(`Both love ${traitsA.theme} aesthetics`);
    } else {
      rawScore += 10;
    }

    // Trait matching
    if (traitsA.frameStyle === traitsB.frameStyle) {
      rawScore += 10;
      sharedTraits.push(`Matching ${traitsA.frameStyle} frame style`);
    }

    // Shared accessories check
    const commonAccessories = traitsA.accessories.filter((acc) =>
      traitsB.accessories.includes(acc),
    );
    if (commonAccessories.length > 0) {
      rawScore += 10;
      sharedTraits.push(`Shared style: ${commonAccessories.join(', ')}`);
    }

    const finalScore = Math.min(Math.max(rawScore, 50), 99);
    let chemistryTier: CompatibilityScoreResult['chemistryTier'] = 'EXPLORATORY';

    if (finalScore >= 85) {
      chemistryTier = 'HIGH_CHEMISTRY';
    } else if (finalScore >= 70) {
      chemistryTier = 'BALANCED';
    }

    return {
      scorePercentage: finalScore,
      chemistryTier,
      sharedTraits,
      icebreakerRequired: true, // Always require icebreaker to unlock messaging
    };
  }

  /**
   * Calculates privacy-safe neighborhood radius distance in kilometers.
   * Prevents precise GPS tracking by rounding coordinates to a safe radius zone.
   */
  static calculateSafeDistanceKm(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const R = 6371; // Earth radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const exactKm = R * c;

    // Privacy Shield: Round to nearest 2km zone to protect user exact location
    return Math.max(1, Math.round(exactKm / 2) * 2);
  }
}
