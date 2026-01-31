
import React, { useState } from 'react';
import { Language, QuizQuestion } from '../types';
import { MOCK_QUIZ_QUESTIONS } from '../constants';

interface QuizModuleProps {
  language: Language;
  onComplete: (correct: boolean) => void;
  onBack: () => void;
}

const QuizModule: React.FC<QuizModuleProps> = ({ language, onComplete, onBack }) => {
  const questions = MOCK_QUIZ_QUESTIONS[language.code] || MOCK_QUIZ_QUESTIONS['en'];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentIndex];

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const handleCheck = () => {
    if (selectedOption === null) return;
    setIsAnswered(true);
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    if (isCorrect) setScore(s => s + 1);
    onComplete(isCorrect);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(c => c + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      onBack();
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center py-10 animate-in fade-in duration-700">
      <div className="w-full max-w-4xl bg-white dark:bg-teal-950 rounded-[4rem] border border-teal-50 dark:border-teal-900 p-12 shadow-2xl relative overflow-hidden">
        {/* Progress Bar Top */}
        <div className="absolute top-0 left-0 w-full h-2.5 bg-teal-50 dark:bg-teal-950">
          <div 
            className="h-full bg-primary transition-all duration-700 rounded-r-full shadow-lg shadow-teal-500/30" 
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>

        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-900 flex items-center justify-center text-primary dark:text-teal-300 font-black text-lg">
               {currentIndex + 1}
             </div>
             <span className="text-xs font-black text-teal-300 dark:text-teal-700 uppercase tracking-[0.2em]">
               Daily Checkpoint
             </span>
          </div>
          <div className="text-sm font-black text-primary dark:text-accent bg-teal-50 dark:bg-teal-900/40 px-5 py-2 rounded-full uppercase tracking-tighter shadow-sm">
            SCORE: {score}/{questions.length}
          </div>
        </div>

        <h2 className="text-4xl font-black mb-12 text-slate-800 dark:text-teal-50 leading-tight tracking-tight">{currentQuestion.question}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {currentQuestion.options.map((option, idx) => {
            const isCorrect = idx === currentQuestion.correctAnswer;
            const isSelected = selectedOption === idx;
            
            let cardStyle = 'bg-white dark:bg-teal-900/10 border-2 border-teal-50 dark:border-teal-900 hover:border-accent hover:bg-teal-50/30 text-slate-700 dark:text-teal-100 shadow-sm';
            if (isAnswered) {
              if (isCorrect) cardStyle = 'bg-emerald-50 dark:bg-emerald-950 border-emerald-400 text-emerald-800 dark:text-emerald-300 shadow-emerald-200 dark:shadow-black/20';
              else if (isSelected) cardStyle = 'bg-rose-50 dark:bg-rose-950 border-rose-400 text-rose-800 dark:text-rose-300 shadow-rose-200 dark:shadow-black/20';
              else cardStyle = 'bg-slate-50 dark:bg-teal-950/20 border-teal-50/30 dark:border-teal-900 text-slate-300 dark:text-teal-900 opacity-40';
            } else if (isSelected) {
              cardStyle = 'bg-teal-50 dark:bg-teal-900 border-primary text-primary dark:text-teal-50 shadow-teal-100 dark:shadow-black/40 ring-4 ring-teal-500/10';
            }

            return (
              <button
                key={idx}
                onClick={() => handleOptionClick(idx)}
                disabled={isAnswered}
                className={`p-8 text-left rounded-[2.5rem] border-2 transition-all font-black flex items-center justify-between text-xl ${cardStyle}`}
              >
                {option}
                {isAnswered && (isCorrect || isSelected) && (
                  <div className={`w-10 h-10 ${isCorrect ? 'bg-emerald-500' : 'bg-rose-500'} text-white rounded-full flex items-center justify-center shadow-lg transform scale-110`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {isCorrect 
                        ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path>
                        : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M6 18L18 6M6 6l12 12"></path>
                      }
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className="p-8 bg-teal-50/50 dark:bg-teal-900/20 rounded-[3rem] border border-teal-100 dark:border-teal-800 mb-12 animate-in slide-in-from-top-4">
            <h4 className="font-black text-[10px] text-primary dark:text-accent mb-3 uppercase tracking-[0.3em]">Coach's Insight</h4>
            <p className="text-slate-600 dark:text-teal-100 font-medium leading-relaxed text-lg">{currentQuestion.explanation}</p>
          </div>
        )}

        <div className="flex gap-6">
          <button 
            onClick={onBack}
            className="flex-1 py-5 text-teal-400 dark:text-teal-800 hover:text-teal-600 dark:hover:text-teal-600 font-black text-xl transition-all"
          >
            I'm done for now
          </button>
          {!isAnswered ? (
            <button 
              onClick={handleCheck}
              disabled={selectedOption === null}
              className="flex-[2] py-6 bg-primary hover:bg-teal-600 disabled:bg-teal-200 dark:disabled:bg-teal-950 disabled:opacity-40 text-white rounded-[2.5rem] font-black text-2xl shadow-2xl shadow-teal-500/20 transition-all active:scale-95"
            >
              Verify My Answer
            </button>
          ) : (
            <button 
              onClick={handleNext}
              className="flex-[2] py-6 bg-highlight hover:bg-sky-600 text-white rounded-[2.5rem] font-black text-2xl shadow-2xl shadow-sky-500/20 transition-all active:scale-95"
            >
              {currentIndex < questions.length - 1 ? 'Move to Next' : 'Finish Flow'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizModule;
