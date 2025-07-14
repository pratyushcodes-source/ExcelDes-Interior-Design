import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createChatSession } from '../services/geminiService';
import type { ChatMessage } from '../types';
import { SendIcon, LogoIcon, CloseIcon } from './icons';
import type { Chat } from '@google/genai';

interface DecoraChatbotProps {
  onClose: () => void;
}

const DecoraChatbot: React.FC<DecoraChatbotProps> = ({ onClose }) => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initChat = () => {
      const newChat = createChatSession();
      setChat(newChat);
      setMessages([
        {
          id: 'initial-greeting',
          role: 'model',
          text: 'Hello! I\'m Decora, your AI design assistant. How can I inspire you today? Feel free to ask about styles, colors, or anything else about interior design!',
        },
      ]);
    };
    initChat();
  }, []);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = useCallback(async () => {
    if (!userInput.trim() || isLoading || !chat) return;

    const userMessage: ChatMessage = { id: Date.now().toString(), role: 'user', text: userInput };
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);

    const modelMessageId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: modelMessageId, role: 'model', text: '' }]);

    try {
      const stream = await chat.sendMessageStream({ message: userInput });

      let fullText = '';
      for await (const chunk of stream) {
        fullText += chunk.text;
        setMessages(prev =>
          prev.map(msg =>
            msg.id === modelMessageId ? { ...msg, text: fullText } : msg
          )
        );
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev =>
        prev.map(msg =>
          msg.id === modelMessageId ? { ...msg, text: 'I seem to be having trouble right now. Please try again later.' } : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  }, [userInput, isLoading, chat]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 w-[calc(100%-3rem)] max-w-md h-[70vh] z-50 bg-slate-800 rounded-2xl shadow-2xl flex flex-col transition-transform duration-300 ease-in-out transform-gpu animate-slide-in border border-slate-700">
        <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-slate-900/60 rounded-t-2xl flex-shrink-0">
            <div className="flex items-center gap-3">
                <div className="flex-shrink-0 h-10 w-10 bg-teal-800 rounded-full flex items-center justify-center">
                   <LogoIcon className="h-6 w-6 text-white"/>
                </div>
                <h3 className="font-bold text-lg text-slate-100">Chat with Decora</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 rounded-full hover:bg-slate-600 hover:text-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-[#C17D53]"
              aria-label="Close chat"
            >
              <CloseIcon className="h-6 w-6" />
            </button>
        </div>

      <div
        ref={chatWindowRef}
        className="flex-grow p-4 overflow-y-auto bg-slate-900"
      >
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div key={msg.id} className={`flex items-end gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'model' && (
                <div className="flex-shrink-0 h-8 w-8 bg-slate-600 rounded-full flex items-center justify-center self-start">
                   <LogoIcon className="h-5 w-5 text-slate-300"/>
                </div>
              )}
              <div
                className={`max-w-xs md:max-w-sm px-4 py-2.5 rounded-2xl shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-teal-800 text-white rounded-br-lg'
                    : 'bg-slate-700 text-slate-200 border border-slate-600 rounded-bl-lg'
                }`}
              >
                <p className="text-sm break-words whitespace-pre-wrap">{msg.text}</p>
                 {isLoading && index === messages.length - 1 && (
                    <div className="flex items-center space-x-1 mt-2 ml-1">
                        <span className="h-1.5 w-1.5 bg-slate-500 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                        <span className="h-1.5 w-1.5 bg-slate-500 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                        <span className="h-1.5 w-1.5 bg-slate-500 rounded-full animate-pulse"></span>
                    </div>
                  )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 border-t border-slate-700 bg-slate-800 rounded-b-2xl flex-shrink-0">
        <div className="flex items-center gap-2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask for design advice..."
              disabled={isLoading}
              className="flex-grow w-full px-4 py-3 border border-slate-600 bg-slate-700 text-slate-200 rounded-lg focus:ring-2 focus:ring-[#C17D53] focus:border-[#C17D53] transition disabled:bg-slate-600 placeholder:text-slate-500"
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !userInput.trim()}
              className="flex-shrink-0 bg-[#C17D53] text-white p-3 rounded-lg hover:bg-[#a86b44] transition-all duration-200 active:scale-90 disabled:bg-slate-600 disabled:cursor-not-allowed"
              aria-label="Send message"
            >
              <SendIcon className="h-6 w-6" />
            </button>
        </div>
      </div>
    </div>
  );
};

export default DecoraChatbot;