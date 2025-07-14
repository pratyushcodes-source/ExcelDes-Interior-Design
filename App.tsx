import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import RoomDesigner from './components/RoomDesigner';
import DecoraChatbot from './components/DecoraChatbot';
import { ChatBubbleIcon } from './components/icons';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-slate-900">
      <Header />
      <main className="flex-grow">
        <RoomDesigner />
      </main>
      <Footer />

      {/* Chatbot Toggle Button */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 bg-[#C17D53] text-white p-4 rounded-full shadow-lg hover:bg-[#a86b44] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C17D53] transition-all duration-200 hover:scale-110 z-50"
          aria-label="Open chat"
        >
          <ChatBubbleIcon className="h-8 w-8" />
        </button>
      )}

      {/* Chatbot Window */}
      {isChatOpen && <DecoraChatbot onClose={() => setIsChatOpen(false)} />}
    </div>
  );
}

export default App;