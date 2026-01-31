
import React, { useState } from 'react';
import { Language, LessonUnit, LessonContent, LessonQuestion } from '../types';
import { MOCK_LESSONS } from '../constants';

interface LessonModuleProps {
  language: Language;
  onBack: () => void;
}

const LessonModule: React.FC<LessonModuleProps> = ({ language, onBack }) => {
  const units = MOCK_LESSONS[language.code] || [];
  const [selectedLesson, setSelectedLesson] = useState<LessonContent | null>(null);
  const [activeStep, setActiveStep] = useState<'READING' | 'QUIZ' | 'SUMMARY'>('READING');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const handleStartLesson = (lesson: LessonContent) => {
    setSelectedLesson(lesson);
    setActiveStep('READING');
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setCorrectCount(0);
  };

  // Node styles based on position in a "snaking" path
  const getMeanderClass = (index: number) => {
    const positions = [
      'translate-x-0',
      'translate-x-12',
      'translate-x-20',
      'translate-x-12',
      'translate-x-0',
      '-translate-x-12',
      '-translate-x-20',
      '-translate-x-12'
    ];
    return positions[index % positions.length];
  };

  if (selectedLesson) {
    // This part remains similar to before but with refreshed Duo styles
    const currentQuestion = selectedLesson.questions[currentQuestionIndex];

    return (
      <div className="fixed inset-0 z-[100] bg-white dark:bg-darkBg flex flex-col p-6 overflow-y-auto">
        <div className="max-w-3xl mx-auto w-full">
          <div className="flex items-center gap-4 mb-8">
            <button onClick={() => setSelectedLesson(null)} className="p-2 text-duoGray hover:text-duoText">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <div className="flex-1 h-4 bg-duoLightGray dark:bg-slate-800 rounded-full overflow-hidden">
               <div className="h-full bg-primary transition-all duration-500" style={{ width: `${((currentQuestionIndex + 1) / selectedLesson.questions.length) * 100}%` }}></div>
            </div>
            <div className="text-rose-500 font-black flex items-center gap-1">❤️ 5</div>
          </div>

          {activeStep === 'READING' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-3xl font-black mb-6 text-duoText dark:text-white">{selectedLesson.title}</h2>
              <div className="p-8 bg-white dark:bg-slate-800 border-4 border-duoLightGray dark:border-slate-700 rounded-[30px] shadow-sm mb-12 text-xl leading-relaxed font-bold text-duoText dark:text-slate-200">
                {selectedLesson.content}
              </div>
              <button 
                onClick={() => setActiveStep('QUIZ')}
                className="w-full py-5 bg-primary text-white rounded-2xl font-black text-xl uppercase tracking-wider duo-button border-primaryDark"
              >
                Let's Go!
              </button>
            </div>
          )}

          {activeStep === 'QUIZ' && currentQuestion && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
               <h3 className="text-2xl font-black mb-10 text-duoText dark:text-white">{currentQuestion.question}</h3>
               <div className="space-y-4 mb-12">
                  {currentQuestion.options.map((option, idx) => (
                    <button
                      key={idx}
                      disabled={isAnswered}
                      onClick={() => setSelectedOption(idx)}
                      className={`w-full p-6 text-left rounded-2xl border-4 font-black text-lg transition-all duo-button ${
                        selectedOption === idx 
                          ? 'bg-secondary/5 border-secondary text-secondary' 
                          : 'bg-white dark:bg-slate-800 border-duoLightGray dark:border-slate-700 hover:bg-duoLightGray/30'
                      } ${isAnswered && idx === currentQuestion.correctAnswer ? 'bg-emerald-50 border-emerald-500 text-emerald-600' : ''}
                        ${isAnswered && selectedOption === idx && idx !== currentQuestion.correctAnswer ? 'bg-rose-50 border-rose-500 text-rose-600' : ''}`}
                    >
                      <span className="inline-block w-8 h-8 border-2 border-duoLightGray rounded-lg mr-4 text-center leading-7 text-xs">{idx + 1}</span>
                      {option}
                    </button>
                  ))}
               </div>
               
               {!isAnswered ? (
                 <button 
                   onClick={() => {
                     setIsAnswered(true);
                     if (selectedOption === currentQuestion.correctAnswer) setCorrectCount(c => c + 1);
                   }}
                   disabled={selectedOption === null}
                   className="w-full py-5 bg-primary disabled:bg-duoGray text-white rounded-2xl font-black text-xl uppercase tracking-wider duo-button border-primaryDark"
                 >
                   Check
                 </button>
               ) : (
                 <div className={`p-6 -mx-6 -mb-6 mt-12 ${selectedOption === currentQuestion.correctAnswer ? 'bg-emerald-100' : 'bg-rose-100'} transition-all`}>
                    <div className="max-w-3xl mx-auto flex items-center justify-between">
                       <div>
                         <h4 className={`text-2xl font-black ${selectedOption === currentQuestion.correctAnswer ? 'text-emerald-700' : 'text-rose-700'}`}>
                           {selectedOption === currentQuestion.correctAnswer ? 'Great job!' : 'Correction:'}
                         </h4>
                         {! (selectedOption === currentQuestion.correctAnswer) && <p className="text-rose-600 font-bold">{currentQuestion.explanation}</p>}
                       </div>
                       <button 
                        onClick={() => {
                          if (currentQuestionIndex < selectedLesson.questions.length - 1) {
                            setCurrentQuestionIndex(i => i + 1);
                            setIsAnswered(false);
                            setSelectedOption(null);
                          } else {
                            setActiveStep('SUMMARY');
                          }
                        }}
                        className={`px-12 py-4 rounded-2xl font-black text-white uppercase duo-button ${selectedOption === currentQuestion.correctAnswer ? 'bg-emerald-500 border-emerald-700' : 'bg-rose-500 border-rose-700'}`}
                       >
                         Continue
                       </button>
                    </div>
                 </div>
               )}
            </div>
          )}

          {activeStep === 'SUMMARY' && (
            <div className="text-center py-20 animate-in zoom-in-95">
               <div className="text-9xl mb-12">🎉</div>
               <h2 className="text-4xl font-black mb-4 text-duoText dark:text-white uppercase">Lesson Complete!</h2>
               <p className="text-xl text-duoGray font-bold mb-12">You've earned +10 XP and improved your {language.name} skills!</p>
               <button 
                 onClick={() => setSelectedLesson(null)}
                 className="px-20 py-5 bg-primary text-white rounded-2xl font-black text-xl uppercase tracking-wider duo-button border-primaryDark"
               >
                 Done
               </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 flex flex-col items-center">
      {units.map((unit, uIdx) => (
        <div key={unit.id} className="w-full mb-16 flex flex-col items-center">
          {/* Unit Header Banner */}
          <div className={`w-full p-6 rounded-2xl mb-12 text-white shadow-lg ${uIdx % 2 === 0 ? 'bg-primary' : 'bg-purple-500'}`}>
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-lg font-black uppercase tracking-wider">Section 3, Unit {uIdx + 1}</h3>
              <button className="text-xs font-black uppercase opacity-80 border-2 border-white/30 rounded-lg px-3 py-1">Guidebook</button>
            </div>
            <p className="text-2xl font-black">{unit.title}</p>
          </div>

          {/* Vertical Path of Lesson Nodes */}
          <div className="relative flex flex-col items-center space-y-12">
            {/* Draw a subtle snaking line if desired, but here we just align nodes */}
            {unit.lessons.map((lesson, lIdx) => (
              <div key={lesson.id} className={`group relative ${getMeanderClass(lIdx)}`}>
                <button
                  onClick={() => handleStartLesson(lesson)}
                  className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-xl transition-transform hover:scale-110 active:scale-95 border-b-[8px] border-black/10 
                    ${lIdx === 0 ? 'bg-primary border-primaryDark text-white' : 'bg-duoLightGray dark:bg-slate-800 text-duoGray opacity-60'}`}
                >
                  {lIdx === 0 ? '⭐' : '📖'}
                </button>
                {/* Tooltip on hover/active - simple version */}
                <div className="absolute top-1/2 left-full ml-6 -translate-y-1/2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all whitespace-nowrap z-10">
                   <div className="bg-primary text-white p-4 rounded-2xl shadow-xl relative duo-button border-primaryDark">
                      <div className="font-black mb-1">{lesson.title}</div>
                      <div className="text-xs opacity-90 font-bold">START +10 XP</div>
                      <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-4 h-4 bg-primary rotate-45"></div>
                   </div>
                </div>
              </div>
            ))}
            
            {/* Chest Node at end of unit */}
            <div className={`w-20 h-20 rounded-full bg-yellow-400 border-b-[8px] border-yellow-600 flex items-center justify-center text-4xl opacity-80 ${getMeanderClass(unit.lessons.length)}`}>
               📦
            </div>
            
            {/* Duo Character Mascot floating nearby */}
            <div className="absolute -left-32 bottom-20 animate-float hidden lg:block pointer-events-none">
               <div className="text-8xl">🦜</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LessonModule;
