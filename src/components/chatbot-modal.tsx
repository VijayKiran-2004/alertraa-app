'use client';

import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { X, Send, AlertCircle } from 'lucide-react';
// import { healthSummaryQuery } from '@/ai/flows/health-summary-query'; // Disabled for static export
import { cn } from '@/lib/utils';

interface ChatbotModalProps {
  onClose: () => void;
  isDarkMode: boolean;
}

interface Message {
  role: 'user' | 'ai';
  text: string;
}

const predefinedAnswers: Record<string, string> = {
  "What are some diet tips for managing high blood pressure?":
    "To manage high blood pressure, it's recommended to:\n\n*   **Reduce sodium intake:** Avoid processed foods and limit salt.\n*   **Eat potassium-rich foods:** Bananas, spinach, and sweet potatoes are great choices.\n*   **Follow the DASH diet:** This diet emphasizes fruits, vegetables, whole grains, and lean proteins.",
  "Can you suggest a simple walking plan for beginners?":
    "Of course! Here’s a simple walking plan to get you started:\n\n*   **Week 1:** Start with a 15-minute walk at a comfortable pace, 5 days a week.\n*   **Week 2:** Increase your walk to 20 minutes.\n*   **Week 3:** Walk for 25 minutes.\n*   **Week 4:** Aim for a 30-minute walk. After this, you can gradually increase your pace or duration.",
  "What precautions should I take with my penicillin allergy?":
    "If you have a penicillin allergy, it's crucial to:\n\n*   **Inform all healthcare providers:** Make sure your doctors, dentists, and pharmacists are aware of your allergy.\n*   **Wear a medical alert bracelet:** This can provide vital information in an emergency.\n*   **Know the signs of a reaction:** Be aware of symptoms like hives, swelling, or difficulty breathing and seek immediate medical attention if they occur.",
  "What is the average resting heart rate?":
    "A normal resting heart rate for adults ranges from **60 to 100 beats per minute (bpm)**. Generally, a lower heart rate at rest implies more efficient heart function and better cardiovascular fitness. For example, a well-trained athlete might have a normal resting heart rate closer to 40 bpm.",
};

export default function ChatbotModal({ onClose, isDarkMode }: ChatbotModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: "Hello! I'm Alertraa's health assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showFaqs, setShowFaqs] = useState(true);
  const [isSlidingIn, setIsSlidingIn] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsSlidingIn(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleClose = () => {
    setIsSlidingIn(false);
    setTimeout(onClose, 300);
  };

  const faqs = [
    "What are some diet tips for managing high blood pressure?",
    "Can you suggest a simple walking plan for beginners?",
    "What precautions should I take with my penicillin allergy?",
    "What is the average resting heart rate?",
  ];

  const handleSendMessage = async (query: string) => {
    if (!query.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text: query };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setShowFaqs(false);

    // Check for predefined answer
    if (predefinedAnswers[query]) {
        setTimeout(() => {
            const aiResponse: Message = { role: 'ai', text: predefinedAnswers[query] };
            setMessages(prev => [...prev, aiResponse]);
            setIsLoading(false);
        }, 1000);
        return;
    }

    try {
      // AI disabled for static export - use predefined responses
      const errorResponse: Message = { role: 'ai', text: "AI assistant is currently unavailable in this deployment. Please try the predefined questions above." };
      setMessages(prev => [...prev, errorResponse]);
      // const aiResponseText = await healthSummaryQuery(query);
      // const aiResponse: Message = { role: 'ai', text: aiResponseText };
      // setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error fetching from AI assistant:', error);
      const errorResponse: Message = { role: 'ai', text: "There was an error connecting to the health assistant. Please try again later." };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const modalBgClasses = isDarkMode ? 'bg-card text-white' : 'bg-white text-slate-900';
  const chatBubbleClasses = isDarkMode ? 'bg-slate-700' : 'bg-gray-100';
  const inputClasses = isDarkMode ? 'bg-slate-700 text-white placeholder-slate-400 border-slate-600' : 'bg-gray-100 text-slate-900 placeholder-gray-500 border-gray-300';
  const sendButtonClasses = 'bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 animate-gradient-xy';

  return (
    <div className="fixed inset-0 backdrop-blur-md flex items-center justify-end z-50">
       <div
        className={cn(
          "absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-primary/20 via-accent/10 to-transparent pointer-events-none transition-opacity duration-300",
          isSlidingIn ? "opacity-100" : "opacity-0"
        )}
        style={{
            maskImage: 'radial-gradient(ellipse at bottom, black 30%, transparent 80%)',
        }}
      />
      <div 
        className={cn(
          "p-6 rounded-l-2xl shadow-xl w-full sm:w-3/4 md:w-1/2 lg:w-1/3 h-full flex flex-col transition-transform duration-300 ease-out",
          isSlidingIn ? 'translate-x-0' : 'translate-x-full',
          modalBgClasses
        )}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-headline font-bold">Health Assistant</h2>
          <button onClick={handleClose} className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-200'}`}>
            <X size={24} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto space-y-4 p-2 mb-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`p-3 rounded-xl max-w-[85%] text-sm prose prose-sm dark:prose-invert ${msg.role === 'user' ? 'bg-primary text-white' : chatBubbleClasses}`}>
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            </div>
          ))}
          {showFaqs && (
            <div className="space-y-2 pt-4">
              <h3 className="font-semibold px-2">Frequently Asked Questions</h3>
              {faqs.map((q, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(q)}
                  className={`block w-full text-left p-3 rounded-lg transition-colors duration-200 ${isDarkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                >
                  {q}
                </button>
              ))}
            </div>
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className={`p-3 rounded-xl max-w-[80%] ${chatBubbleClasses} text-sm flex items-center`}>
                <AlertCircle className="inline-block animate-spin mr-2" size={16} /> Thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(input); }} className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className={`flex-1 p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary ${inputClasses}`}
            disabled={isLoading}
          />
          <button type="submit" className={`p-3 rounded-xl font-bold ${sendButtonClasses} disabled:opacity-50`} disabled={isLoading || !input.trim()}>
            <Send size={24} />
          </button>
        </form>
      </div>
    </div>
  );
}
