
import React from 'react';
import { UserStats } from '../types';

interface ProgressTrackerProps {
  stats: UserStats;
  onBack: () => void;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ stats, onBack }) => {
  return (
    <div className="flex-1 py-12 animate-in fade-in duration-700 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-5xl font-black tracking-tighter">Your Learning Story</h2>
        <button 
          onClick={onBack} 
          className="p-4 bg-white dark:bg-teal-900/40 rounded-[1.5rem] border border-teal-100 dark:border-teal-800 shadow-sm text-primary transition-transform hover:scale-110"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="p-10 bg-gradient-to-br from-primary to-accent rounded-[3.5rem] text-white shadow-2xl shadow-teal-300 dark:shadow-black/60 relative overflow-hidden group">
           <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>
           <div className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80 mb-2">Speaking Confidence</div>
           <div className="text-6xl font-black mb-6">{stats.confidence}%</div>
           <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden shadow-inner">
             <div className="h-full bg-white rounded-full shadow-lg" style={{ width: `${stats.confidence}%` }}></div>
           </div>
           <div className="mt-4 text-xs font-bold opacity-70">You're becoming so natural! Keep it up.</div>
        </div>
        
        <div className="p-10 bg-white dark:bg-teal-950/40 rounded-[3.5rem] border border-teal-50 dark:border-teal-900 shadow-sm hover:shadow-xl transition-all">
           <div className="text-[10px] font-black uppercase tracking-[0.3em] text-teal-400 dark:text-teal-700 mb-2">Active Vocabulary</div>
           <div className="text-6xl font-black text-slate-800 dark:text-teal-50 mb-4">{stats.wordsLearned}</div>
           <div className="flex items-center gap-2 text-emerald-500 font-black text-sm">
             <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
             +12 new phrases this week
           </div>
        </div>
        
        <div className="p-10 bg-white dark:bg-teal-950/40 rounded-[3.5rem] border border-teal-50 dark:border-teal-900 shadow-sm hover:shadow-xl transition-all">
           <div className="text-[10px] font-black uppercase tracking-[0.3em] text-teal-400 dark:text-teal-700 mb-2">Fluency Level</div>
           <div className="text-4xl font-black text-primary uppercase tracking-tighter mb-4">{stats.level}</div>
           <div className="flex gap-2 mb-4">
              <span className="w-8 h-2 bg-primary rounded-full"></span>
              <span className="w-8 h-2 bg-primary rounded-full"></span>
              <span className="w-8 h-2 bg-teal-100 dark:bg-teal-900 rounded-full"></span>
              <span className="w-8 h-2 bg-teal-100 dark:bg-teal-900 rounded-full"></span>
           </div>
           <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">Next Milestone: Fluid Speaker</div>
        </div>
      </div>

      <div className="bg-white dark:bg-teal-950/40 p-12 rounded-[4rem] border border-teal-50 dark:border-teal-900 shadow-sm">
        <h3 className="text-2xl font-black mb-10 text-slate-800 dark:text-teal-50 tracking-tight">Growth Insight</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
             {[
               { label: 'Natural Flow', status: 'Rising Fast', color: 'text-primary', val: 85 },
               { label: 'Grammar Tone', status: 'Improving', color: 'text-highlight', val: 65 },
               { label: 'Pronunciation', status: 'Excellent', color: 'text-emerald-500', val: 92 }
             ].map((trend, i) => (
               <div key={i}>
                 <div className="flex justify-between items-center mb-3">
                   <span className="font-black text-slate-700 dark:text-teal-100 text-lg tracking-tight">{trend.label}</span>
                   <span className={`text-[10px] font-black uppercase tracking-widest ${trend.color}`}>{trend.status}</span>
                 </div>
                 <div className="w-full h-2 bg-teal-50 dark:bg-teal-900 rounded-full">
                    <div className={`h-full rounded-full ${trend.color.replace('text', 'bg')}`} style={{ width: `${trend.val}%` }}></div>
                 </div>
               </div>
             ))}
          </div>
          <div className="bg-teal-50/30 dark:bg-teal-900/10 p-8 rounded-[3rem] border border-teal-50/50 dark:border-teal-800 flex flex-col justify-center text-center">
            <div className="text-5xl mb-6">🏆</div>
            <h4 className="text-xl font-black mb-3">Keep Going!</h4>
            <p className="text-slate-500 dark:text-teal-200/50 leading-relaxed font-medium">
              You've spoken more this week than 80% of other learners. Your persistence is paying off!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;
