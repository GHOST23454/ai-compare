'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { useLang } from '@/context/LangContext';

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { lang } = useLang();

  // Çeviriler
  const texts = {
    tr: {
      title: 'AI Asistan',
      placeholder: 'Bir mesaj yazın...',
      welcome: 'Merhaba! Ben AI Compare asistanı. Sana en uygun yapay zeka aracını bulmanda veya aklındaki soruları cevaplamada yardımcı olabilirim. Ne sormak istersin?',
    },
    en: {
      title: 'AI Assistant',
      placeholder: 'Type a message...',
      welcome: 'Hello! I am the AI Compare assistant. I can help you find the best AI tool for you or answer your questions. What would you like to ask?',
    }
  };

  const currentTexts = texts[lang as keyof typeof texts] || texts.tr;

  // Karşılama mesajı (Dil değişince güncellenir)
  useEffect(() => {
    if (isOpen) {
      setMessages([
        { role: 'assistant', text: currentTexts.welcome }
      ]);
    }
  }, [isOpen, lang, currentTexts.welcome]);

  // Mesaj geldiğinde en alta kaydır
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    
    // Kullanıcının mesajını ekrana ekle
    const newMessages = [...messages, { role: 'user' as const, text: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // API'ye gönderilecek mesaj formatını hazırla (Groq OpenAI formatı ister)
      const apiMessages = newMessages.map((msg) => ({
        role: msg.role,
        content: msg.text,
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await response.json();

      if (data.text) {
        setMessages((prev) => [...prev, { role: 'assistant', text: data.text }]);
      } else {
        setMessages((prev) => [...prev, { role: 'assistant', text: 'Üzgünüm, şu an cevap veremiyorum.' }]);
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, { role: 'assistant', text: 'Bir hata oluştu. Lütfen tekrar deneyin.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Sohbet Butonu */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 md:bottom-8 md:right-24 w-14 h-14 rounded-full bg-gradient-to-r from-neon-purple to-neon-cyan text-white shadow-lg flex items-center justify-center hover:scale-110 transition z-50 ${isOpen ? 'hidden' : 'flex'}`}
        aria-label="Sohbeti Aç"
      >
        <MessageSquare size={24} />
      </button>

      {/* Sohbet Penceresi */}
      {isOpen && (
        <div className="fixed z-50 flex flex-col overflow-hidden glass shadow-2xl border border-white/20 inset-0 w-full h-full rounded-none md:inset-auto md:bottom-6 md:right-6 md:w-[380px] md:h-[550px] md:rounded-2xl">
          
          {/* Başlık */}
          <div className="bg-gradient-to-r from-neon-purple to-neon-cyan p-4 flex items-center justify-between text-white shrink-0">
            <div className="flex items-center gap-2 font-semibold">
              <Bot size={20} />
              <span>{currentTexts.title}</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded transition cursor-pointer">
              <X size={20} />
            </button>
          </div>

          {/* Mesajlar */}
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 bg-black/40">
            {messages.map((msg, index) => (
              <div key={index} className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-neon-cyan/20 flex items-center justify-center flex-shrink-0">
                    <Bot size={16} className="text-neon-cyan" />
                  </div>
                )}
                <div className={`p-3 rounded-2xl max-w-[80%] text-sm ${
                  msg.role === 'user' 
                    ? 'bg-gradient-to-br from-neon-purple to-neon-pink text-white rounded-br-none' 
                    : 'bg-white/10 text-gray-200 rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2 justify-start">
                <div className="w-8 h-8 rounded-full bg-neon-cyan/20 flex items-center justify-center flex-shrink-0">
                  <Bot size={16} className="text-neon-cyan" />
                </div>
                <div className="p-3 rounded-2xl bg-white/10 text-gray-200 rounded-bl-none flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Giriş Alanı */}
          <form onSubmit={handleSend} className="p-3 bg-black/60 border-t border-white/10 flex gap-2 shrink-0">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={currentTexts.placeholder}
              className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-neon-cyan transition"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-10 h-10 rounded-full bg-neon-cyan text-black flex items-center justify-center hover:scale-105 transition disabled:opacity-50 cursor-pointer"
            >
              <Send size={18} />
            </button>
          </form>

        </div>
      )}
    </>
  );
}