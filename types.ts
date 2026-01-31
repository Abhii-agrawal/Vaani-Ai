
export enum AppView {
  LANDING = 'LANDING',
  ONBOARDING = 'ONBOARDING',
  MODE_SELECTION = 'MODE_SELECTION',
  LEARNING = 'LEARNING',
  QUIZ = 'QUIZ',
  PROGRESS = 'PROGRESS',
  LESSONS = 'LESSONS',
  COMMUNITY = 'COMMUNITY'
}

export enum LearningMode {
  CONVERSATION = 'CONVERSATION',
  QUIZ = 'QUIZ',
  WRITING = 'WRITING',
  LESSONS = 'LESSONS'
}

export type UserPersona = 'Child' | 'Student' | 'Professional' | 'Elder';
export type LearningGoal = 'Daily Conversation' | 'Travel' | 'Office' | 'Academic';

export interface Language {
  code: string;
  name: string;
  flag: string;
}

export interface Message {
  id: string;
  role: 'user' | 'model' | 'peer';
  content: string;
  author?: string; // For community chat
  correction?: string;
  explanation?: string;
  timestamp: Date;
}

export interface UserStats {
  sessionsCompleted: number;
  accuracy: number;
  wordsLearned: number;
  streak: number;
  confidence: number; // 0-100
  level: 'Beginner' | 'Improving' | 'Confident';
  mistakesHistory: {original: string, corrected: string, topic: string}[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

// Added LessonQuestion interface to fix import errors in LessonModule.tsx
export interface LessonQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface LessonContent {
  id: string;
  title: string;
  description: string;
  content: string;
  questions: LessonQuestion[];
}

export interface LessonUnit {
  id: string;
  title: string;
  lessons: LessonContent[];
}
