
import React, { useState, useEffect } from 'react';
import { AppView, LearningMode, Language, UserStats, UserPersona, LearningGoal } from './types';
import { SUPPORTED_LANGUAGES } from './constants';
import { db, UserSettings } from './services/db';
import Landing from './components/Landing';
import Onboarding from './components/Onboarding';
import ModeSelection from './components/ModeSelection';
import ChatInterface from './components/ChatInterface';
import QuizModule from './components/QuizModule';
import ProgressTracker from './components/ProgressTracker';
import LessonModule from './components/LessonModule';
import Community from './components/Community';

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentView, setCurrentView] = useState<AppView>(AppView.LANDING);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(SUPPORTED_LANGUAGES[0]);
  const [siteLanguage, setSiteLanguage] = useState('English');
  const [selectedMode, setSelectedMode] = useState<LearningMode | null>(null);
  const [userPersona, setUserPersona] = useState<UserPersona>('Student');
  const [userGoal, setUserGoal] = useState<LearningGoal>('Daily Conversation');
  const [userStats, setUserStats] = useState<UserStats>(db.getStats());
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const settings = db.getSettings();
    setSelectedLanguage(settings.language);
    setUserPersona(settings.persona);
    setUserGoal(settings.goal);
    setIsDarkMode(settings.theme === 'dark');
    
    if (settings.hasCompletedOnboarding) {
      setCurrentView(AppView.LESSONS); 
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  useEffect(() => {
    if (!isLoaded) return;
    const settings: UserSettings = {
      language: selectedLanguage,
      persona: userPersona,
      goal: userGoal,
      hasCompletedOnboarding: currentView !== AppView.LANDING && currentView !== AppView.ONBOARDING,
      theme: isDarkMode ? 'dark' : 'light'
    };
    db.saveSettings(settings);
    setIsSyncing(true);
    const timer = setTimeout(() => setIsSyncing(false), 800);
    return () => clearTimeout(timer);
  }, [selectedLanguage, userPersona, userGoal, currentView, isDarkMode, isLoaded]);

  const handleStartLearning = () => setCurrentView(AppView.ONBOARDING);

  const handleCompleteOnboarding = (persona: UserPersona, goal: LearningGoal, language: Language) => {
    setUserPersona(persona);
    setUserGoal(goal);
    setSelectedLanguage(language);
    setCurrentView(AppView.LESSONS);
  };

  const updateStats = (newStats: Partial<UserStats>) => {
    const updated = { ...userStats, ...newStats };
    setUserStats(updated);
    db.saveStats(updated);
  };

  if (!isLoaded) return null;

  const isLanding = currentView === AppView.LANDING;
  const isOnboarding = currentView === AppView.ONBOARDING;
  const showSidebar = !isLanding && !isOnboarding;

  const navItems = [
    { view: AppView.LESSONS, label: 'LEARN', icon: '🏠' },
    { view: AppView.LEARNING, label: 'CONVERSE', icon: '🗣️' },
    { view: AppView.QUIZ, label: 'QUIZ', icon: '📝' },
    { view: AppView.PROGRESS, label: 'PROFILE', icon: '👤' },
    { view: AppView.COMMUNITY, label: 'COMMUNITY', icon: '👥' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-darkBg flex flex-col md:flex-row transition-all duration-300">
      {showSidebar && (
        <aside className="hidden md:flex flex-col w-64 border-r-2 border-duoLightGray dark:border-slate-800 p-4 bg-white dark:bg-darkBg fixed h-full z-40">
          <div className="px-4 mb-8">
            <button onClick={() => setCurrentView(AppView.LANDING)} className="text-2xl font-black text-primary tracking-tight">vaaniAI</button>
          </div>
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => setCurrentView(item.view)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-black text-sm transition-all border-2 border-transparent ${
                  currentView === item.view 
                    ? 'bg-secondary/10 text-secondary border-secondary/30' 
                    : 'text-duoGray hover:bg-duoLightGray dark:hover:bg-slate-800'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </aside>
      )}

      <div className={`flex-1 flex flex-col ${showSidebar ? 'md:ml-64' : ''}`}>
        {showSidebar && (
          <header className="sticky top-0 z-50 bg-white dark:bg-darkBg border-b-2 border-duoLightGray dark:border-slate-800 px-6 py-2 flex justify-between items-center">
            <div className="flex items-center gap-6">
               <button className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-duoLightGray dark:hover:bg-slate-800 transition-colors">
                  <span className="text-2xl">{selectedLanguage.flag}</span>
               </button>
               {isSyncing && (
                  <div className="flex items-center gap-1.5 text-[9px] font-black text-primary uppercase tracking-widest animate-pulse">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    Syncing
                  </div>
               )}
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 font-black text-orange-500">
                <span>🔥</span>
                <span>{userStats.streak}</span>
              </div>
              <div className="flex items-center gap-2 font-black text-secondary">
                <span>💎</span>
                <span>930</span>
              </div>
              <div className="flex items-center gap-2 font-black text-rose-500">
                <span>❤️</span>
                <span>5</span>
              </div>
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-full hover:bg-duoLightGray dark:hover:bg-slate-800">
                 {isDarkMode ? '🌞' : '🌙'}
              </button>
            </div>
          </header>
        )}

        <div className={`flex-1 overflow-y-auto ${isLanding ? '' : 'p-4'}`}>
          {currentView === AppView.LANDING && <Landing onStart={handleStartLearning} />}
          {currentView === AppView.ONBOARDING && <Onboarding onComplete={handleCompleteOnboarding} />}
          {currentView === AppView.LESSONS && <LessonModule language={selectedLanguage} onBack={() => setCurrentView(AppView.LANDING)} />}
          {currentView === AppView.LEARNING && (
            <ChatInterface 
              language={selectedLanguage} 
              mode={LearningMode.CONVERSATION} 
              persona={userPersona}
              goal={userGoal}
              onBack={() => setCurrentView(AppView.LESSONS)}
              onUpdateStats={updateStats}
            />
          )}
          {currentView === AppView.QUIZ && <QuizModule language={selectedLanguage} onComplete={(c) => {}} onBack={() => setCurrentView(AppView.LESSONS)} />}
          {currentView === AppView.PROGRESS && <ProgressTracker stats={userStats} onBack={() => setCurrentView(AppView.LESSONS)} />}
          {currentView === AppView.COMMUNITY && <Community language={selectedLanguage} onBack={() => setCurrentView(AppView.LESSONS)} />}
        </div>
        
        {showSidebar && (
          <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-darkBg border-t-2 border-duoLightGray dark:border-slate-800 p-2 flex justify-around z-50">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => setCurrentView(item.view)}
                className={`p-2 rounded-xl text-2xl ${currentView === item.view ? 'bg-secondary/10' : ''}`}
              >
                {item.icon}
              </button>
            ))}
          </nav>
        )}
      </div>
    </div>
  );
};

export default App;
