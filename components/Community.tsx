
import React, { useState, useEffect, useRef } from 'react';
import { Language, Message } from '../types';
import { db } from '../services/db';

interface CommunityProps {
  language: Language;
  onBack: () => void;
}

const MOCK_PEERS = [
  { name: 'Alice', avatar: '👩‍🎓', level: 'Confident', country: '🇺🇸' },
  { name: 'Rahul', avatar: '👨‍💻', level: 'Beginner', country: '🇮🇳' },
  { name: 'Elena', avatar: '👩‍🎨', level: 'Improving', country: '🇪🇸' },
  { name: 'Kento', avatar: '👨‍🍳', level: 'Intermediate', country: '🇯🇵' },
];

const Community: React.FC<CommunityProps> = ({ language, onBack }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const history = db.getCommunityChat(language.code);
    if (history.length > 0) {
      setMessages(history);
    } else {
      // Initial greeting from peers
      setMessages([
        {
          id: 'p1',
          role: 'peer',
          author: 'Alice',
          content: `Hi everyone! I just started learning ${language.name} today. Any tips?`,
          timestamp: new Date(Date.now() - 1000 * 60 * 5)
        },
        {
          id: 'p2',
          role: 'peer',
          author: 'Elena',
          content: `Welcome Alice! I find the Lessons section here really helpful. Focus on the foundations first.`,
          timestamp: new Date(Date.now() - 1000 * 60 * 2)
        }
      ]);
    }
  }, [language.code]);

  useEffect(() => {
    db.saveCommunityChat(language.code, messages);
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, language.code]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    // Random peer reply simulation
    if (Math.random() > 0.4) {
      setTimeout(() => {
        const peer = MOCK_PEERS[Math.floor(Math.random() * MOCK_PEERS.length)];
        const peerMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: 'peer',
          author: peer.name,
          content: `That's interesting! I was thinking the same thing about ${language.name}.`,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, peerMsg]);
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 h-[85vh] animate-in slide-in-from-bottom-6">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white dark:bg-slate-900 rounded-[2.5rem] border-2 border-duoLightGray dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="bg-primary p-6 text-white flex justify-between items-center shadow-md">
          <div className="flex items-center gap-3">
             <span className="text-3xl">💬</span>
             <div>
                <h3 className="text-xl font-black uppercase tracking-tight">Live {language.name} Room</h3>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  <span className="text-[10px] font-black uppercase opacity-80 tracking-widest">1,248 Learners Online</span>
                </div>
             </div>
          </div>
          <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-xl">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-slate-50/30 dark:bg-transparent">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className="flex gap-2 max-w-[85%]">
                {m.role !== 'user' && (
                  <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-xl shadow-sm border border-secondary/20 shrink-0 self-end">
                    {MOCK_PEERS.find(p => p.name === m.author)?.avatar || '👤'}
                  </div>
                )}
                <div className={`p-4 rounded-2xl shadow-sm ${
                  m.role === 'user' 
                    ? 'bg-primary text-white border-b-4 border-primaryDark' 
                    : 'bg-white dark:bg-slate-800 text-duoText dark:text-white border-2 border-duoLightGray dark:border-slate-700'
                }`}>
                  {m.role !== 'user' && (
                    <div className="text-[9px] font-black uppercase text-secondary tracking-widest mb-1">
                      {m.author} • {MOCK_PEERS.find(p => p.name === m.author)?.level}
                    </div>
                  )}
                  <p className="text-sm font-bold leading-relaxed">{m.content}</p>
                  <div className={`text-[8px] mt-2 font-bold uppercase tracking-widest ${m.role === 'user' ? 'text-white/60' : 'text-duoGray'}`}>
                    {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 border-t-2 border-duoLightGray dark:border-slate-800">
           <div className="flex gap-3">
             <input 
               type="text" 
               value={inputValue}
               onChange={(e) => setInputValue(e.target.value)}
               onKeyDown={(e) => e.key === 'Enter' && handleSend()}
               placeholder={`Say something to the ${language.name} community...`}
               className="flex-1 bg-slate-50 dark:bg-slate-800 border-2 border-duoLightGray dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-secondary transition-all dark:text-white"
             />
             <button 
              onClick={handleSend}
              className="p-3 bg-secondary text-white rounded-xl duo-button border-secondaryDark hover:bg-secondaryDark transition-all"
             >
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
             </button>
           </div>
        </div>
      </div>

      {/* Sidebar - Learners Online */}
      <div className="hidden lg:flex flex-col w-72 bg-white dark:bg-slate-900 rounded-[2.5rem] border-2 border-duoLightGray dark:border-slate-800 p-6 shadow-sm h-full overflow-hidden">
         <h4 className="text-xs font-black uppercase tracking-[0.2em] text-duoGray mb-6">Learners Nearby</h4>
         <div className="space-y-4 overflow-y-auto flex-1 custom-scrollbar pr-2">
            {MOCK_PEERS.map((peer, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer group border border-transparent hover:border-duoLightGray dark:hover:border-slate-700">
                 <div className="relative">
                   <div className="w-12 h-12 bg-secondary/5 text-2xl flex items-center justify-center rounded-xl border border-secondary/10 group-hover:scale-110 transition-transform">
                     {peer.avatar}
                   </div>
                   <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center border border-duoLightGray dark:border-slate-700 shadow-sm text-xs">
                     {peer.country}
                   </div>
                 </div>
                 <div className="flex-1">
                    <div className="text-sm font-black text-duoText dark:text-white">{peer.name}</div>
                    <div className="text-[9px] font-black text-primary uppercase tracking-widest">{peer.level}</div>
                 </div>
                 <div className="w-2 h-2 bg-primary rounded-full"></div>
              </div>
            ))}
         </div>
         <div className="mt-8 pt-6 border-t border-duoLightGray dark:border-slate-800">
            <div className="p-4 bg-secondary/5 rounded-2xl border border-secondary/20">
               <div className="text-[10px] font-black text-secondary uppercase tracking-[0.2em] mb-2">Room Goal</div>
               <p className="text-xs font-bold text-duoGray leading-relaxed italic">"Practice using past tense in casual conversation."</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Community;
