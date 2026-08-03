/**
 * DOMAIN: Realtime Messaging & Disappearing Payload Contract
 * 
 * Manages Socket.IO messaging payload contracts, disappearing message timers,
 * and read receipt event domain models.
 */

export interface ChatMessageDomainPayload {
  id: string;
  senderId: string;
  receiverId: string;
  matchId: string;
  content: string;
  isVoiceNote: boolean;
  voiceDurationSec?: number;
  disappearingTimerSec?: number; // E.g. 60s, 300s, 86400s (24h)
  createdAt: Date;
  expiresAt?: Date;
}

export class MessagingDomain {
  /**
   * Computes disappearing message expiration date based on selected timer.
   */
  static computeExpirationDate(disappearingTimerSec?: number): Date | undefined {
    if (!disappearingTimerSec || disappearingTimerSec <= 0) {
      return undefined;
    }
    const expiresAt = new Date();
    expiresAt.setSeconds(expiresAt.getSeconds() + disappearingTimerSec);
    return expiresAt;
  }

  /**
   * Validates message payload rules prior to DB persistence & Socket.IO broadcast.
   */
  static validateMessagePayload(payload: {
    content: string;
    isVoiceNote?: boolean;
  }): { isValid: boolean; reason?: string } {
    if (!payload.isVoiceNote && (!payload.content || payload.content.trim().length === 0)) {
      return { isValid: false, reason: 'Message content cannot be empty' };
    }

    if (payload.content && payload.content.length > 4000) {
      return { isValid: false, reason: 'Message exceeds maximum length of 4000 characters' };
    }

    return { isValid: true };
  }
}
