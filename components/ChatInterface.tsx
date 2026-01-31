import React, { useState, useRef, useEffect } from 'react';
import { Language, LearningMode, Message, UserPersona, LearningGoal } from '../types';
import { gemini } from '../services/geminiService';
import { db } from '../services/db';

interface ChatInterfaceProps {
  language: Language;
  mode: LearningMode;
  persona: UserPersona;
  goal: LearningGoal;
  onBack: () => void;
  onUpdateStats: (stats: any) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ language, mode, persona, goal, onBack, onUpdateStats }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [review, setReview] = useState<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize from "Backend"
  useEffect(() => {
    const history = db.getChatHistory(language.code);
    if (history.length > 0) {
      setMessages(history);
    } else {
      setMessages([
        {
          id: 'init',
          role: 'model',
          content: `Hello there! I'm so excited to be your ${persona} coach for ${language.name}. We'll work on your ${goal} skills together. What would you like to talk about today?`,
          timestamp: new Date()
        }
      ]);
    }
  }, [language.code, persona, goal]);

  // Persist to "Backend" whenever history changes
  useEffect(() => {
    if (messages.length > 0) {
      db.saveChatHistory(language.code, messages);
    }
  }, [messages, language.code]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isLoading, review]);

  const handleSend = async (textOverride?: string) => {
    const text = textOverride || inputValue;
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Fix: Filter and cast roles to 'user' | 'model' to match GeminiService expectations.
      // Although this chat only uses user/model, the shared Message type includes 'peer'.
      const hist = messages
        .filter(m => m.role === 'user' || m.role === 'model')
        .map(m => ({ role: m.role as 'user' | 'model', content: m.content }));
      const response = await gemini.generateTutorResponse(language, mode, persona, goal, text, hist);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', content: response, timestamp: new Date() }]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEndConversation = async () => {
    setIsLoading(true);
    try {
      // Fix: Filter and cast roles to 'user' | 'model' to match GeminiService expectations.
      const hist = messages
        .filter(m => m.role === 'user' || m.role === 'model')
        .map(m => ({ role: m.role as 'user' | 'model', content: m.content }));
      const analysis = await gemini.generateReview(language, hist);
      setReview(analysis);
      onUpdateStats({ confidence: analysis.confidenceScore });
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const simulateVoiceInput = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      handleSend("Hi professor, can we practice some phrases for ordering food?");
    }, 2500);
  };

  return (
    <div className="flex-1 flex flex-col h-[78vh] bg-white dark:bg-[#042f2e] rounded-[3rem] border border-duoLightGray dark:border-slate-800 overflow-hidden shadow-2xl relative">
      {/* Header */}
      <div className="px-8 py-4 border-b border-duoLightGray dark:border-slate-800 flex justify-between items-center bg-white/50 dark:bg-[#042f2e]/50 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
          </div>
          <div>
            <div className="text-lg font-black text-duoText dark:text-white leading-tight">{language.name} Coach</div>
            <div className="text-[9px] text-primary font-black uppercase tracking-[0.2em]">{persona} • {goal}</div>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleEndConversation} 
            className="px-4 py-2 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-[10px] font-black uppercase tracking-wider rounded-xl duo-button border-rose-200 dark:border-rose-900 hover:bg-rose-100 transition-all"
          >
            End & Review
          </button>
          <button onClick={onBack} className="p-2 hover:bg-duoLightGray dark:hover:bg-slate-800 text-duoGray rounded-xl transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-slate-50/30 dark:bg-transparent">
        {messages.map(m => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}>
            <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm text-sm font-bold leading-relaxed ${
              m.role === 'user' 
                ? 'bg-white dark:bg-slate-800 text-duoText dark:text-white border-2 border-duoLightGray dark:border-slate-700' 
                : 'bg-primary/10 dark:bg-primary/20 border-2 border-primary/20 text-duoText dark:text-white'
            }`}>
              {m.content}
              <div className="text-[9px] mt-2 opacity-30 font-bold uppercase tracking-widest">
                {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-2 items-center text-primary font-black text-[9px] uppercase tracking-widest ml-4">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></span>
            Vaani is typing...
          </div>
        )}
        
        {review && (
          <div className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border-4 border-duoLightGray dark:border-slate-800 shadow-2xl animate-in zoom-in-95 max-w-xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center text-2xl">✨</div>
              <h4 className="text-xl font-black text-duoText dark:text-white">Session Review</h4>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
               <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border-2 border-duoLightGray dark:border-slate-700 text-center">
                 <div className="text-[9px] text-duoGray uppercase font-black tracking-widest mb-1">New Proficiency</div>
                 <div className="text-3xl font-black text-primary">+{Math.round(Math.random() * 5 + 2)}%</div>
               </div>
               <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border-2 border-duoLightGray dark:border-slate-700 text-center">
                 <div className="text-[9px] text-duoGray uppercase font-black tracking-widest mb-1">Coach Score</div>
                 <div className="text-3xl font-black text-secondary">{review.confidenceScore}%</div>
               </div>
            </div>

            <div className="space-y-4">
              <div className="text-[10px] font-black uppercase text-duoGray tracking-[0.2em] px-2">Key Improvements</div>
              {review.corrections.map((c: any, i: number) => (
                <div key={i} className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border-2 border-duoLightGray dark:border-slate-700">
                  <div className="text-xs text-duoGray line-through mb-1 font-bold italic opacity-60">"{c.original}"</div>
                  <div className="text-sm font-black text-primary mb-2">Better: "{c.improved}"</div>
                  <div className="text-xs text-duoText dark:text-slate-400 font-bold leading-relaxed">💡 {c.why}</div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => {
                setReview(null);
                setMessages([
                  ...messages,
                  { id: Date.now().toString(), role: 'model', content: "That review looked great! Ready to keep practicing?", timestamp: new Date() }
                ]);
              }} 
              className="mt-8 w-full py-4 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-wider duo-button border-primaryDark"
            >
              Continue Practice
            </button>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-[#042f2e] border-t border-duoLightGray dark:border-slate-800">
        <div className="max-w-4xl mx-auto flex gap-3 items-center">
          <button 
            onClick={simulateVoiceInput}
            className={`p-4 rounded-xl transition-all duo-button border-2 ${
              isRecording 
                ? 'bg-rose-500 text-white border-rose-700 animate-pulse' 
                : 'bg-white dark:bg-slate-800 text-primary border-duoLightGray dark:border-slate-700 hover:bg-slate-50'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-20a3 3 0 00-3 3v8a3 3 0 006 0V5a3 3 0 00-3-3z"></path></svg>
          </button>
          <div className="flex-1 relative">
            <input 
              type="text" 
              value={inputValue} 
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Type your response..."
              className="w-full bg-slate-50 dark:bg-slate-900 px-6 py-4 rounded-xl focus:outline-none border-2 border-duoLightGray dark:border-slate-700 text-sm font-bold placeholder:text-duoGray dark:text-white"
            />
          </div>
          <button 
            onClick={() => handleSend()} 
            disabled={!inputValue.trim() || isLoading} 
            className="p-4 bg-secondary disabled:bg-duoGray text-white rounded-xl duo-button border-secondaryDark disabled:border-duoGray transition-all active:scale-95"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;