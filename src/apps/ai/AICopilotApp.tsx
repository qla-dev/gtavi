import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  Bot,
  User,
  Compass,
  Car,
  ShieldAlert,
  Flame,
  HelpCircle,
  Lightbulb
} from 'lucide-react';
import { GTAOSHeader } from '../../os/components/GTAOSHeader';
import { aiService, AIMessage } from '../../services/aiService';

export const AICopilotApp: React.FC = () => {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'welcome_1',
      role: 'assistant',
      content: `⚡ **V.I.C.E. ONLINE (LeonidaOS Cyber Tactical Engine)**

Welcome back. All Leonida orbital satellites, police radio scanners, and underground chop-shop frequencies are locked onto your coordinates.

How can I assist your criminal empire today? Select a prompt below or type any tactical query!`,
      timestamp: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    { label: '🏎️ Fastest supercars in Ocean Beach?', query: 'Where can I find the fastest supercars in Ocean Beach and Vice City?' },
    { label: '💼 Depository Heist Infiltration', query: 'Give me the infiltration checklist for the First Vice Federal Vault heist.' },
    { label: '🚨 Escaping 5-Star Wanted Level', query: 'What are the best tactics for escaping a 5-star police chase in Vice City?' },
    { label: '🌴 Safehouses with Helipads', query: 'Recommend the best safehouses with helipads and boat docks.' },
    { label: '🐊 Leonida Man Urban Legends', query: 'Tell me about the craziest Leonida Man rumors and alligator locations.' }
  ];

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: AIMessage = {
      id: `u_${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const reply = await aiService.askCopilot(textToSend, messages);
      const assistantMsg: AIMessage = {
        id: `a_${Date.now()}`,
        role: 'assistant',
        content: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      const errorMsg: AIMessage = {
        id: `e_${Date.now()}`,
        role: 'assistant',
        content: 'Satellite relay interrupted by local radar interference. Please try again.',
        timestamp: 'Just now'
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[#0E0A22] text-white overflow-hidden select-none">
      {/* Header */}
      <GTAOSHeader
        title="V.I.C.E. Copilot"
        subtitle="Virtual Intelligence Cyber Engine"
        accentColor="#9D67FF"
      />

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        {messages.map((m) => {
          const isUser = m.role === 'user';
          return (
            <div
              key={m.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center space-x-2 mb-1 px-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/50">
                  {isUser ? 'Jason / Lucia' : 'V.I.C.E. Core'}
                </span>
                <span className="text-[9px] text-white/30 font-mono">{m.timestamp}</span>
              </div>

              <div
                className={`max-w-[88%] px-4 py-3 rounded-2xl text-xs leading-relaxed ${
                  isUser
                    ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-br-none shadow-lg shadow-pink-500/20'
                    : 'bg-[#191336] text-white/95 rounded-bl-none border border-purple-500/30 shadow-lg'
                }`}
              >
                <div className="whitespace-pre-wrap">{m.content}</div>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-center space-x-2 text-xs text-purple-400 p-2 animate-pulse">
            <Sparkles size={14} className="animate-spin" />
            <span>V.I.C.E. scanning Leonida satellite networks...</span>
          </div>
        )}

        <div ref={scrollRef} />
      </div>

      {/* Suggested Questions Pills */}
      <div className="px-3 py-2 bg-[#140F2E] border-t border-white/5 flex items-center space-x-2 overflow-x-auto no-scrollbar shrink-0">
        {suggestedPrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(p.query)}
            className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 text-[11px] font-semibold text-purple-300 border border-purple-500/20 whitespace-nowrap active:scale-95 transition-all"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div className="p-3 bg-[#171238] border-t border-white/10 flex items-center space-x-2 shrink-0">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask V.I.C.E. for heist routes, cars, coordinates..."
          className="flex-1 bg-[#100C26] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500/60"
        />
        <button
          onClick={() => handleSend()}
          disabled={loading || !input.trim()}
          className="p-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white disabled:opacity-40 hover:brightness-110 transition-all shadow-md"
        >
          <Send size={15} />
        </button>
      </div>
    </div>
  );
};
