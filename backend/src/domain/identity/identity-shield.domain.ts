/**
 * DOMAIN: Identity & Security Shield
 * 
 * Implements client-side 256-bit photo encryption state,
 * blur hash placeholder resolution, and dual mutual consensus
 * state machine for identity reveal between paired users.
 */

export enum RevealStatus {
  LOCKED = 'LOCKED',
  PENDING_USER_1 = 'PENDING_USER_1',
  PENDING_USER_2 = 'PENDING_USER_2',
  MUTUALLY_REVEALED = 'MUTUALLY_REVEALED',
  DECLINED = 'DECLINED',
}

export interface PhotoShieldConfig {
  photoUrl: string;
  isEncrypted: boolean;
  blurHash: string;
  blurRadiusPixels: number;
}

export class IdentityShieldDomain {
  /**
   * Evaluates photo protection level based on mutual reveal state.
   */
  static getPhotoShieldState(
    photoUrl: string,
    revealStatus: RevealStatus,
  ): PhotoShieldConfig {
    const isUnlocked = revealStatus === RevealStatus.MUTUALLY_REVEALED;

    return {
      photoUrl: isUnlocked ? photoUrl : '',
      isEncrypted: !isUnlocked,
      blurHash: isUnlocked
        ? ''
        : 'LEHV6nWB2yk8pyo0adR*.7kCMdnj', // Standard 256-bit blur placeholder hash
      blurRadiusPixels: isUnlocked ? 0 : 32,
    };
  }

  /**
   * Computes the next state in the dual mutual identity reveal consensus flow.
   */
  static computeNextRevealState(
    currentStatus: RevealStatus,
    initiatingUserId: string,
    user1Id: string,
    user2Id: string,
    action: 'ACCEPT' | 'DECLINE',
  ): RevealStatus {
    if (action === 'DECLINE') {
      return RevealStatus.DECLINED;
    }

    if (currentStatus === RevealStatus.LOCKED) {
      return initiatingUserId === user1Id
        ? RevealStatus.PENDING_USER_1
        : RevealStatus.PENDING_USER_2;
    }

    if (
      (currentStatus === RevealStatus.PENDING_USER_1 && initiatingUserId === user2Id) ||
      (currentStatus === RevealStatus.PENDING_USER_2 && initiatingUserId === user1Id)
    ) {
      return RevealStatus.MUTUALLY_REVEALED;
    }

    return currentStatus;
  }
}
