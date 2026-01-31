
import { UserStats, Language, Message, UserPersona, LearningGoal } from '../types';
import { INITIAL_STATS, SUPPORTED_LANGUAGES } from '../constants';

const KEYS = {
  STATS: 'vaani_user_stats',
  SETTINGS: 'vaani_user_settings',
  CHATS: 'vaani_chats_v1', 
  COMMUNITY_CHATS: 'vaani_community_v1',
  LAST_SYNC: 'vaani_last_sync'
};

export interface UserSettings {
  language: Language;
  persona: UserPersona;
  goal: LearningGoal;
  hasCompletedOnboarding: boolean;
  theme: 'light' | 'dark';
}

class DatabaseService {
  // Stats Management
  getStats(): UserStats {
    const data = localStorage.getItem(KEYS.STATS);
    return data ? JSON.parse(data) : INITIAL_STATS;
  }

  saveStats(stats: UserStats): void {
    localStorage.setItem(KEYS.STATS, JSON.stringify(stats));
    this.updateLastSync();
  }

  // Settings Management
  getSettings(): UserSettings {
    const data = localStorage.getItem(KEYS.SETTINGS);
    return data ? JSON.parse(data) : {
      language: SUPPORTED_LANGUAGES[0],
      persona: 'Student',
      goal: 'Daily Conversation',
      hasCompletedOnboarding: false,
      theme: 'light'
    };
  }

  saveSettings(settings: UserSettings): void {
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
    this.updateLastSync();
  }

  // Chat History Management (Language specific)
  getChatHistory(langCode: string): Message[] {
    const data = localStorage.getItem(`${KEYS.CHATS}_${langCode}`);
    if (!data) return [];
    
    const messages = JSON.parse(data);
    return messages.map((m: any) => ({
      ...m,
      timestamp: new Date(m.timestamp)
    }));
  }

  saveChatHistory(langCode: string, history: Message[]): void {
    localStorage.setItem(`${KEYS.CHATS}_${langCode}`, JSON.stringify(history));
    this.updateLastSync();
  }

  // Community Chat Management
  getCommunityChat(langCode: string): Message[] {
    const data = localStorage.getItem(`${KEYS.COMMUNITY_CHATS}_${langCode}`);
    if (!data) return [];
    
    const messages = JSON.parse(data);
    return messages.map((m: any) => ({
      ...m,
      timestamp: new Date(m.timestamp)
    }));
  }

  saveCommunityChat(langCode: string, history: Message[]): void {
    localStorage.setItem(`${KEYS.COMMUNITY_CHATS}_${langCode}`, JSON.stringify(history));
    this.updateLastSync();
  }

  private updateLastSync() {
    localStorage.setItem(KEYS.LAST_SYNC, new Date().toISOString());
  }

  getLastSync(): string {
    return localStorage.getItem(KEYS.LAST_SYNC) || 'Never';
  }

  reset() {
    localStorage.clear();
    window.location.reload();
  }
}

export const db = new DatabaseService();
