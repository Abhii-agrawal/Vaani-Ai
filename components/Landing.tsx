
import React from 'react';
import { SUPPORTED_LANGUAGES } from '../constants';

interface LandingProps {
  onStart: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-20 bg-white dark:bg-darkBg">
        <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          <div className="flex-1 flex justify-center order-2 lg:order-1">
             <div className="relative w-full max-w-md animate-float">
                <div className="w-full aspect-square bg-primary/10 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
                <div className="relative text-[160px] text-center select-none">🦜</div>
                <div className="absolute -top-10 -right-10 text-6xl animate-bounce delay-75">🌍</div>
                <div className="absolute top-20 -left-10 text-6xl animate-bounce delay-150">💡</div>
             </div>
          </div>
          <div className="flex-1 text-center lg:text-left order-1 lg:order-2">
            <h1 className="text-3xl md:text-5xl font-black mb-10 text-duoText dark:text-white leading-[1.2]">
              The free, fun, and effective way to learn a language!
            </h1>
            <div className="flex flex-col gap-4 max-w-sm mx-auto lg:mx-0">
              <button 
                onClick={onStart}
                className="w-full py-4 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-wider duo-button border-primaryDark hover:bg-primaryDark/90"
              >
                Get Started
              </button>
              <button className="w-full py-4 bg-white dark:bg-slate-800 text-secondary border-2 border-duoLightGray dark:border-slate-700 rounded-2xl font-black text-sm uppercase tracking-wider duo-button hover:bg-duoLightGray/50">
                I already have an account
              </button>
            </div>
          </div>
        </div>

        {/* Language Bar */}
        <div className="w-full mt-32 border-y border-duoLightGray dark:border-slate-800 py-6 overflow-hidden">
           <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 px-6 opacity-60">
              <button className="text-duoGray"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"></path></svg></button>
              <div className="flex flex-1 justify-center gap-10 overflow-x-auto no-scrollbar py-2">
                {SUPPORTED_LANGUAGES.map(lang => (
                  <div key={lang.code} className="flex items-center gap-3 whitespace-nowrap group cursor-pointer hover:opacity-100 transition-opacity">
                    <span className="text-2xl group-hover:scale-110 transition-transform">{lang.flag}</span>
                    <span className="text-xs font-black uppercase tracking-widest text-duoGray group-hover:text-duoText">{lang.name}</span>
                  </div>
                ))}
              </div>
              <button className="text-duoGray"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"></path></svg></button>
           </div>
        </div>
      </section>

      {/* Feature Section 1 */}
      <section className="py-24 px-6 border-b border-duoLightGray dark:border-slate-800">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-6">
            <h2 className="text-4xl md:text-5xl font-black text-primary leading-tight">free. fun. effective.</h2>
            <p className="text-lg text-duoGray dark:text-slate-400 font-bold leading-relaxed">
              Learning with VaaniAI is fun, and <span className="text-secondary cursor-pointer border-b-2 border-secondary/30">research shows that it works</span>! 
              With quick, bite-sized sessions, you'll earn confidence and unlock new levels while gaining real-world communication skills.
            </p>
          </div>
          <div className="flex-1 flex justify-center">
             <div className="w-64 h-96 bg-duoLightGray dark:bg-slate-800 rounded-[30px] border-[8px] border-duoLightGray dark:border-slate-800 shadow-2xl relative">
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-1 bg-duoGray/20 rounded-full"></div>
                <div className="mt-12 p-4 space-y-4">
                  <div className="h-4 bg-primary/20 rounded w-2/3"></div>
                  <div className="flex gap-2">
                    <div className="w-12 h-12 bg-secondary/20 rounded-xl"></div>
                    <div className="flex-1 space-y-2 py-2">
                      <div className="h-3 bg-duoGray/20 rounded w-full"></div>
                      <div className="h-3 bg-duoGray/20 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="p-4 bg-white dark:bg-slate-900 rounded-xl shadow-sm text-center font-black text-primary text-sm uppercase">#1 Global Tutor</div>
                </div>
                <div className="absolute -bottom-6 -right-6 text-7xl">🦉</div>
             </div>
          </div>
        </div>
      </section>

      {/* Feature Section 2 */}
      <section className="py-24 px-6 border-b border-duoLightGray dark:border-slate-800 bg-slate-50 dark:bg-slate-900/10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row-reverse items-center gap-16">
          <div className="flex-1 space-y-6">
            <h2 className="text-4xl md:text-5xl font-black text-primary leading-tight">backed by science</h2>
            <p className="text-lg text-duoGray dark:text-slate-400 font-bold leading-relaxed">
              We use a combination of research-backed teaching methods and delightful content to create flows that effectively teach reading, writing, listening, and speaking skills!
            </p>
          </div>
          <div className="flex-1 flex justify-center">
             <div className="text-[180px] drop-shadow-2xl">🧪</div>
          </div>
        </div>
      </section>

      {/* Feature Section 3 */}
      <section className="py-24 px-6 border-b border-duoLightGray dark:border-slate-800">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-6">
            <h2 className="text-4xl md:text-5xl font-black text-primary leading-tight">stay motivated</h2>
            <p className="text-lg text-duoGray dark:text-slate-400 font-bold leading-relaxed">
              We make it easy to form a habit of language learning with game-like features, fun challenges, and reminders from our friendly AI tutor, Vaani.
            </p>
          </div>
          <div className="flex-1 flex justify-center">
             <div className="text-[180px] drop-shadow-2xl animate-bounce">🔥</div>
          </div>
        </div>
      </section>

       {/* Feature Section 4 */}
       <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row-reverse items-center gap-16">
          <div className="flex-1 space-y-6">
            <h2 className="text-4xl md:text-5xl font-black text-primary leading-tight">personalized learning</h2>
            <p className="text-lg text-duoGray dark:text-slate-400 font-bold leading-relaxed">
              Combining the best of AI and language science, lessons are tailored to help you learn at just the right level and pace.
            </p>
          </div>
          <div className="flex-1 flex justify-center">
             <div className="flex gap-4">
                <div className="text-8xl p-8 bg-white dark:bg-slate-800 border-4 border-duoLightGray dark:border-slate-700 rounded-duo duo-button border-duoLightGray">👵</div>
                <div className="text-8xl p-8 bg-white dark:bg-slate-800 border-4 border-duoLightGray dark:border-slate-700 rounded-duo duo-button border-duoLightGray">👳‍♂️</div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
