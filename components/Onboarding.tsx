
import React, { useState } from 'react';
import { UserPersona, LearningGoal, Language } from '../types';
import { SUPPORTED_LANGUAGES } from '../constants';

interface OnboardingProps {
  onComplete: (persona: UserPersona, goal: LearningGoal, language: Language) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [persona, setPersona] = useState<UserPersona>('Student');
  const [goal, setGoal] = useState<LearningGoal>('Daily Conversation');
  const [language, setLanguage] = useState<Language>(SUPPORTED_LANGUAGES[0]);

  const personas: {id: UserPersona, icon: string, desc: string}[] = [
    { id: 'Child', icon: '🧒', desc: 'Simple words & games' },
    { id: 'Student', icon: '🎓', desc: 'Academic & deep' },
    { id: 'Professional', icon: '💼', desc: 'Formal & work-ready' },
    { id: 'Elder', icon: '👵', desc: 'Patient & classic' },
  ];

  const goals: LearningGoal[] = ['Daily Conversation', 'Travel', 'Office', 'Academic'];

  return (
    <div className="flex-1 flex flex-col items-center py-16 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <h2 className="text-3xl font-black mb-12 text-center text-duoText dark:text-white">Let's set up your profile!</h2>

      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Language */}
        <section>
          <h3 className="font-black text-xs uppercase tracking-widest text-duoGray mb-6">Target Language</h3>
          <div className="space-y-3">
            {SUPPORTED_LANGUAGES.map(lang => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center gap-4 duo-button ${
                  language.code === lang.code 
                    ? 'border-secondary bg-secondary/5 text-secondary border-secondaryDark' 
                    : 'border-duoLightGray dark:border-slate-700 hover:bg-duoLightGray/30'
                }`}
              >
                <span className="text-xl">{lang.flag}</span>
                <span className="font-black text-sm uppercase">{lang.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Persona */}
        <section>
          <h3 className="font-black text-xs uppercase tracking-widest text-duoGray mb-6">Who's learning?</h3>
          <div className="space-y-3">
            {personas.map(p => (
              <button
                key={p.id}
                onClick={() => setPersona(p.id)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center gap-4 duo-button ${
                  persona === p.id 
                    ? 'border-primary bg-primary/5 text-primary border-primaryDark' 
                    : 'border-duoLightGray dark:border-slate-700 hover:bg-duoLightGray/30'
                }`}
              >
                <span className="text-xl">{p.icon}</span>
                <div>
                  <div className="font-black text-sm uppercase">{p.id}</div>
                  <div className="text-[10px] opacity-60 font-bold">{p.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Goal */}
        <section>
          <h3 className="font-black text-xs uppercase tracking-widest text-duoGray mb-6">Your goal</h3>
          <div className="space-y-3">
            {goals.map(g => (
              <button
                key={g}
                onClick={() => setGoal(g)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all duo-button ${
                  goal === g 
                    ? 'border-secondary bg-secondary/5 text-secondary border-secondaryDark' 
                    : 'border-duoLightGray dark:border-slate-700 hover:bg-duoLightGray/30'
                }`}
              >
                <span className="font-black text-sm uppercase">{g}</span>
              </button>
            ))}
          </div>
        </section>
      </div>

      <button 
        onClick={() => onComplete(persona, goal, language)}
        className="mt-20 px-20 py-5 bg-primary text-white rounded-2xl font-black text-xl uppercase tracking-wider duo-button border-primaryDark hover:bg-primaryDark/90 transform hover:scale-105 active:scale-95"
      >
        Continue
      </button>
    </div>
  );
};

export default Onboarding;
