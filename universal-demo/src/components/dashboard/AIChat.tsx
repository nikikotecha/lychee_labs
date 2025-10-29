'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, TrendingUp, AlertTriangle, Package, Users } from 'lucide-react';
import { ChatMessage } from '@/lib/types';

// Sample AI responses for demo
const sampleResponses = {
  'delivery': 'Based on current data, your on-time delivery rate is 87.5%, which is below the target of 95%. The main factors affecting delivery performance are: 1) Component shortages at Pacific Manufacturing (causing 5-day delays), 2) Quality issues requiring re-work at 3 suppliers. I recommend implementing dual-sourcing for critical components and enhanced quality monitoring.',
  'quality': 'Your overall quality score is 92.1%, showing a positive trend (+1.8% this month). Milano Fashion Group leads with 98% quality score. However, Pacific Manufacturing has dropped to 82%. I suggest immediate quality review and potential supplier development programs.',
  'risk': 'Current high-risk areas: 1) Over-reliance on single suppliers for critical components (Pacific Manufacturing handles 40% of electronics), 2) Geopolitical risks in Bangladesh affecting Bengal Crafts Ltd, 3) Material shortages in sustainable hoodie production. Recommended actions: diversify supplier base, establish regional backup suppliers, and implement predictive risk monitoring.',
  'suppliers': 'You have 4 active suppliers with varying performance levels. Alpine Textiles GmbH shows excellent performance (94% reliability, 96% quality). Pacific Manufacturing needs attention due to recent performance decline. I recommend conducting quarterly supplier reviews and implementing performance improvement plans.',
  'forecast': 'Based on historical data and current trends, I predict: 1) 15% increase in demand for sustainable products next quarter, 2) Potential supply constraints in electronics due to component shortages, 3) Quality improvements expected from Milano Fashion Group initiatives. Recommend adjusting production plans accordingly.',
};

export function AIChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI supply chain assistant. I can help you analyze performance, identify risks, and provide actionable recommendations. What would you like to know about your supply chain?',
      type: 'ai',
      timestamp: new Date().toISOString(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: input,
      type: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = generateAIResponse(input);
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: response,
        type: 'ai',
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('delivery') || input.includes('on-time')) {
      return sampleResponses.delivery;
    } else if (input.includes('quality') || input.includes('defect')) {
      return sampleResponses.quality;
    } else if (input.includes('risk') || input.includes('alert')) {
      return sampleResponses.risk;
    } else if (input.includes('supplier') || input.includes('vendor')) {
      return sampleResponses.suppliers;
    } else if (input.includes('forecast') || input.includes('predict')) {
      return sampleResponses.forecast;
    } else {
      return 'I can help you with various supply chain topics including delivery performance, quality metrics, risk assessment, supplier management, and demand forecasting. What specific area would you like to explore?';
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickActions = [
    { label: 'Analyze delivery performance', icon: Package },
    { label: 'Check supplier quality scores', icon: Users },
    { label: 'Identify supply chain risks', icon: AlertTriangle },
    { label: 'Forecast demand trends', icon: TrendingUp },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 p-6 border-b border-gray-200 bg-white">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">AI Supply Chain Assistant</h1>
            <p className="text-sm text-gray-600">Get insights and recommendations for your supply chain</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-3xl flex space-x-3 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.type === 'user' ? 'bg-blue-500' : 'bg-orange-500'
              }`}>
                {message.type === 'user' ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Bot className="w-4 h-4 text-white" />
                )}
              </div>
              <div className={`rounded-lg p-4 ${
                message.type === 'user' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white border border-gray-200'
              }`}>
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <p className={`text-xs mt-2 ${
                  message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {new Date(message.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-3xl flex space-x-3">
              <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {messages.length === 1 && (
        <div className="flex-shrink-0 p-6 bg-white border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-3">Quick actions:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  onClick={() => setInput(action.label)}
                  className="flex items-center space-x-2 p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Icon className="w-4 h-4 text-orange-500" />
                  <span className="text-sm">{action.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="flex-shrink-0 p-6 bg-white border-t border-gray-200">
        <div className="flex space-x-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about your supply chain performance, risks, or get recommendations..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            disabled={isTyping}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="kulfi-button-primary flex items-center justify-center w-10 h-10 p-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
