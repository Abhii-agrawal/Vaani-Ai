
import React from 'react';
import { LearningMode } from '../types';

interface ModeSelectionProps {
  onSelect: (mode: LearningMode) => void;
}

const ModeSelection: React.FC<ModeSelectionProps> = ({ onSelect }) => {
  const modes = [
    {
      id: LearningMode.LESSONS,
      title: 'Foundations',
      description: 'Relaxed, structured lessons to build your base at your own pace.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
        </svg>
      ),
      color: 'bg-teal-50 dark:bg-teal-900/30',
      iconColor: 'text-primary',
      border: 'hover:border-primary ring-primary/10'
    },
    {
      id: LearningMode.CONVERSATION,
      title: 'Oral Coach',
      description: 'A safe space to speak and practice everyday talk. No pressure!',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
        </svg>
      ),
      color: 'bg-cyan-50 dark:bg-cyan-900/30',
      iconColor: 'text-accent',
      border: 'hover:border-accent ring-accent/10'
    },
    {
      id: LearningMode.QUIZ,
      title: 'Gentle Recap',
      description: 'Quick, friendly challenges to see how much you’ve absorbed.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
        </svg>
      ),
      color: 'bg-emerald-50 dark:bg-emerald-900/30',
      iconColor: 'text-emerald-500',
      border: 'hover:border-emerald-500 ring-emerald-500/10'
    },
    {
      id: LearningMode.WRITING,
      title: 'Deep Thoughts',
      description: 'Write stories or diaries. We’ll help you refine your expression.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
        </svg>
      ),
      color: 'bg-sky-50 dark:bg-sky-900/30',
      iconColor: 'text-highlight',
      border: 'hover:border-highlight ring-highlight/10'
    }
  ];

  return (
    <div className="py-12 animate-in slide-in-from-bottom-12 duration-700">
      <h2 className="text-4xl font-black text-center mb-12 text-slate-800 dark:text-teal-50 tracking-tighter">Choose Your Learning Flow</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => onSelect(mode.id)}
            className={`group relative flex flex-col p-10 bg-white dark:bg-teal-950/40 border-2 border-teal-50 dark:border-teal-900/50 rounded-[3rem] text-left transition-all hover:scale-[1.05] shadow-sm hover:shadow-2xl dark:shadow-black/40 hover:ring-8 ${mode.border}`}
          >
            <div className={`w-16 h-16 ${mode.color} ${mode.iconColor} rounded-[1.5rem] flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform`}>
              {mode.icon}
            </div>
            <h3 className="text-2xl font-black mb-4 text-slate-800 dark:text-teal-50 leading-tight tracking-tight">{mode.title}</h3>
            <p className="text-slate-500 dark:text-teal-200/40 text-sm leading-relaxed mb-10 font-medium">
              {mode.description}
            </p>
            <div className={`mt-auto flex items-center ${mode.iconColor} font-black text-[10px] uppercase tracking-[0.2em]`}>
              Start Flow
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ModeSelection;
