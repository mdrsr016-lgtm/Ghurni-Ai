import React, { useState, useRef, useEffect } from 'react';
import { 
  RefreshCcw, 
  Image as ImageIcon, 
  ArrowUp, 
  Globe, 
  Map, 
  Compass, 
  DollarSign, 
  Calendar,
  Mountain,
  Coffee,
  Sun,
  Menu,
  Sparkles,
  Plus,
  Mic,
  User as UserIcon
} from 'lucide-react';
import { Message, Suggestion } from '../types';
import { streamChatResponse } from '../services/geminiService';

const SUGGESTIONS: Suggestion[] = [
  { 
    id: '1', 
    title: 'Amalfi Road Trip', 
    icon: 'map', 
    prompt: 'Create a detailed 7-day road trip itinerary for the Amalfi Coast, including must-visit towns like Positano and Ravello, scenic drives, and authentic Italian restaurants.' 
  },
  { 
    id: '2', 
    title: 'Kyoto Hidden Gems', 
    icon: 'compass', 
    prompt: 'I want to visit Kyoto but avoid the crowds. What are some hidden gems, quiet temples, and local spots I should visit instead of the main tourist attractions?' 
  },
  { 
    id: '3', 
    title: 'Vietnam on a Budget', 
    icon: 'dollar', 
    prompt: 'Suggest a 2-week itinerary for Vietnam with a focus on affordable luxury, street food, and cultural experiences. My budget is under $1500 excluding flights.' 
  },
  { 
    id: '4', 
    title: 'Alps Weekend', 
    icon: 'calendar', 
    prompt: 'Plan a romantic weekend getaway itinerary for two in the Swiss Alps. Include scenic hiking trails, a spa visit, and a cozy chalet dinner.' 
  },
  {
    id: '5',
    title: 'NZ Adventure',
    icon: 'mountain',
    prompt: 'Plan an adrenaline-filled trip to New Zealand including bungee jumping in Queenstown, hiking the Routeburn Track, and white-water rafting.'
  },
  {
    id: '6',
    title: 'Oaxaca Culinary',
    icon: 'coffee',
    prompt: 'I want to explore the culinary history of Oaxaca, Mexico. Suggest a 5-day itinerary focused on food markets, mole tasting, and traditional cooking classes.'
  },
  {
    id: '7',
    title: 'Bali Detox',
    icon: 'sun',
    prompt: 'Find me the best quiet beach resorts in Bali for a digital detox retreat, focusing on daily yoga, meditation sessions, and organic food.'
  },
  {
    id: '8',
    title: 'Egypt History',
    icon: 'compass',
    prompt: 'Create a comprehensive historical tour of Egypt starting from the Pyramids in Cairo down to the temples of Luxor and Aswan, including a Nile cruise.'
  }
];

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string = inputValue) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: text,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Add a temporary loading message
      const loadingId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, {
        id: loadingId,
        role: 'model',
        text: '', // Start empty for streaming
        timestamp: Date.now()
      }]);

      let streamedText = '';
      
      await streamChatResponse(messages, text, (chunk) => {
        streamedText += chunk;
        setMessages(prev => prev.map(msg => 
          msg.id === loadingId ? { ...msg, text: streamedText } : msg
        ));
      });

    } catch (error) {
      console.error("Failed to send message", error);
      // Handle error visually if needed
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (prompt: string) => {
    handleSendMessage(prompt);
  };

  return (
    <div className="flex-1 bg-black md:bg-[#F5F5F7] h-full overflow-hidden flex flex-col relative transition-colors duration-300">
      
      {/* Mobile Top Header (Hidden on Desktop) */}
      <div className="flex md:hidden justify-between items-center px-4 py-4 text-white z-10 animate-fade-in-up">
           <div className="flex items-center gap-3">
              <button className="p-2 bg-zinc-800 rounded-full hover:bg-zinc-700 transition-colors">
                 <Menu size={20} className="text-gray-300" />
              </button>
              <button className="px-4 py-2 bg-zinc-800 rounded-full text-sm font-semibold text-purple-300 flex items-center gap-2 hover:bg-zinc-700 transition-colors">
                 <Sparkles size={14} className="fill-purple-300" /> Get Plus
              </button>
           </div>
           <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
                  <RefreshCcw size={20} className="text-white" />
              </button>
              <div className="w-10 h-10 bg-zinc-800 rounded-full text-white flex items-center justify-center border border-zinc-700">
                  <UserIcon size={20} />
              </div>
           </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-4 md:py-12 scroll-smooth">
        <div className="max-w-5xl mx-auto min-h-full flex flex-col">
          
          {/* Welcome Header (Only show if no messages) */}
          {messages.length === 0 && (
            <div className="flex-1 flex flex-col justify-center">
                {/* Desktop Welcome */}
                <div className="hidden md:block mb-12 mt-8 px-2">
                  <div className="animate-fade-in-up">
                     <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-600 text-[11px] font-bold uppercase tracking-wider mb-6 shadow-sm">
                        <Sparkles size={12} className="fill-purple-600" /> 
                        Personal Travel AI
                     </span>
                  </div>
                  <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-4 tracking-tighter animate-fade-in-up animation-delay-200 leading-[1.1]">
                    Hello, <span className="gradient-text">Explorer.</span>
                  </h1>
                  <h2 className="text-2xl md:text-3xl font-medium text-gray-400 mb-8 tracking-tight animate-fade-in-up animation-delay-400">
                    Where would you like to <span className="text-gray-900 font-semibold border-b-2 border-purple-200">go today?</span>
                  </h2>
                </div>

                {/* Mobile Welcome (Centered) */}
                <div className="md:hidden flex flex-col items-center justify-center -mt-20">
                   <h2 className="text-3xl font-bold text-white mb-2 tracking-tight text-center animate-fade-in-up animation-delay-200">
                     <span className="gradient-text">Ghurni Ai</span>
                   </h2>
                   <p className="text-gray-400 text-sm mb-8 animate-fade-in-up animation-delay-400">Your intelligent travel companion</p>
                </div>
            </div>
          )}

          {/* Messages List */}
          {messages.length > 0 && (
            <div className="flex flex-col gap-6 mb-32 animate-fade-in">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-scale-in`}
                >
                  <div 
                    className={`max-w-[85%] p-4 rounded-2xl shadow-sm text-base leading-relaxed whitespace-pre-wrap ${
                      msg.role === 'user' 
                        ? 'bg-zinc-800 text-white md:bg-white md:text-gray-800 md:rounded-br-none border border-transparent md:border-gray-100' 
                        : 'bg-transparent text-gray-300 md:text-gray-800 pl-0'
                    }`}
                  >
                    {msg.role === 'model' && (
                       <div className="flex items-start gap-3">
                         <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shrink-0 mt-1">
                            <span className="text-xs">AI</span>
                         </div>
                         <div className="prose prose-sm md:prose-base max-w-none prose-invert md:prose-neutral">
                           {msg.text || <span className="animate-pulse">Thinking...</span>}
                         </div>
                       </div>
                    )}
                    {msg.role === 'user' && msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Suggestions Grid (Hidden on Mobile to match screenshot clean look, Visible on Desktop) */}
          {messages.length === 0 && (
            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-fade-in-up animation-delay-500 px-2">
              {SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion.prompt)}
                  className="bg-white p-5 rounded-2xl text-left transition-all duration-300 border border-gray-100 hover:border-purple-100 hover:shadow-xl hover:shadow-purple-500/5 hover:-translate-y-1 group h-44 flex flex-col justify-between relative overflow-hidden"
                >
                  <div className="flex justify-between items-start w-full">
                     <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-indigo-500 group-hover:to-pink-500 transition-all duration-500 text-gray-400 group-hover:text-white shadow-sm">
                        {suggestion.icon === 'map' && <Map size={22} />}
                        {suggestion.icon === 'compass' && <Compass size={22} />}
                        {suggestion.icon === 'dollar' && <DollarSign size={22} />}
                        {suggestion.icon === 'calendar' && <Calendar size={22} />}
                        {suggestion.icon === 'mountain' && <Mountain size={22} />}
                        {suggestion.icon === 'coffee' && <Coffee size={22} />}
                        {suggestion.icon === 'sun' && <Sun size={22} />}
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0">
                         <ArrowUp size={20} className="text-gray-300 rotate-45" />
                      </div>
                  </div>
                  
                  <div>
                    <p className="font-bold text-gray-900 text-lg leading-tight mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-pink-600 transition-all duration-300">
                        {suggestion.title}
                    </p>
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed group-hover:text-gray-600">
                      {suggestion.prompt}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}

           {/* Refresh Button (Desktop only) */}
           {messages.length === 0 && (
            <div className="mb-auto hidden md:block animate-fade-in animation-delay-500 px-2">
                <button className="flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-colors text-sm font-medium">
                    <RefreshCcw size={16} />
                    Refresh Ideas
                </button>
            </div>
           )}
        </div>
      </div>

      {/* Desktop Input Area */}
      <div className="hidden md:block absolute bottom-0 left-0 right-0 p-4 md:p-8 bg-gradient-to-t from-[#F5F5F7] via-[#F5F5F7] to-transparent animate-fade-in-up animation-delay-500">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 p-2 md:p-3 transition-all duration-300 focus-within:scale-[1.01] focus-within:shadow-2xl focus-within:border-purple-100">
          <div className="flex items-center justify-between px-3 py-1 mb-2">
             <div className="font-medium text-gray-800 text-sm">Ask whatever you want....</div>
             <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1 text-xs font-medium text-gray-600 cursor-pointer hover:bg-gray-200 transition-colors">
               <Globe size={12} />
               All Web
             </div>
          </div>
          
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="Type your message..."
            className="w-full bg-transparent border-none focus:ring-0 resize-none text-gray-700 min-h-[60px] max-h-[200px] px-3 py-2"
            rows={2}
          />

          <div className="flex items-center justify-between px-2 mt-2">
            <div className="flex items-center gap-4">
               <button className="flex items-center gap-2 text-gray-400 hover:text-purple-600 transition-colors text-sm group">
                 <div className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center group-hover:border-purple-600">
                   <span className="text-lg leading-none mb-0.5">+</span>
                 </div>
                 Add Attachment
               </button>
               <button className="flex items-center gap-2 text-gray-400 hover:text-purple-600 transition-colors text-sm">
                 <ImageIcon size={18} />
                 Use Image
               </button>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-400 font-medium">{inputValue.length}/1000</span>
              <button 
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isLoading}
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-white transition-all transform duration-300 ${
                  inputValue.trim() && !isLoading 
                    ? 'bg-purple-600 hover:bg-purple-700 hover:scale-105 shadow-md' 
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                <ArrowUp size={20} />
              </button>
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
             <p className="text-xs text-gray-400">Ghurni Ai can make mistakes. Consider checking important information.</p>
        </div>
      </div>

      {/* Mobile Input Area (Dark Mode) */}
      <div className="md:hidden absolute bottom-0 left-0 right-0 p-4 bg-black animate-slide-in-up">
        <div className="flex items-center gap-3">
            {/* Plus Button */}
            <button className="w-12 h-12 rounded-full bg-zinc-800 text-white flex items-center justify-center shrink-0 hover:bg-zinc-700 active:scale-95 transition-all">
                <Plus size={24} />
            </button>
            
            {/* Input Pill */}
            <div className="flex-1 bg-zinc-800 rounded-full px-5 h-12 flex items-center relative hover:bg-zinc-750 transition-all border border-transparent focus-within:border-zinc-600 focus-within:scale-[1.02] focus-within:bg-zinc-750">
                <input 
                    className="bg-transparent text-white w-full h-full outline-none placeholder-gray-400 text-base"
                    placeholder="Ask Ghurni Ai"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage();
                      }
                    }}
                />
                <Mic size={20} className="text-white ml-2 cursor-pointer opacity-80 hover:opacity-100 transition-opacity" />
            </div>

            {/* Audio/Headphone Button */}
            <button className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shrink-0 hover:bg-gray-200 active:scale-95 transition-all">
                <div className="flex gap-0.5 items-center">
                    <span className="w-1 h-3 bg-black rounded-full animate-pulse"></span>
                    <span className="w-1 h-5 bg-black rounded-full animate-pulse delay-75"></span>
                    <span className="w-1 h-3 bg-black rounded-full animate-pulse"></span>
                </div>
            </button>
        </div>
      </div>

    </div>
  );
};

export default ChatInterface;