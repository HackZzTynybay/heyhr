
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import MainLayout from '@/components/MainLayout';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send, X } from 'lucide-react';

const OrganizationLayout: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState('');
  
  // Mock chat data
  const chatMessages = [
    { id: 1, sender: 'John Doe', message: 'Hi there! How can I help you today?', time: '10:30 AM', isMe: false },
    { id: 2, sender: 'You', message: 'I need help with setting up my department structure', time: '10:32 AM', isMe: true },
    { id: 3, sender: 'John Doe', message: 'Sure, I can help you with that. What specific questions do you have?', time: '10:33 AM', isMe: false },
  ];
  
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };
  
  return (
    <MainLayout>
      <div className="relative flex w-full max-w-7xl mx-auto">
        {/* Chat panel */}
        <div 
          className={`fixed md:relative z-30 h-full md:h-auto w-[300px] bg-white border-r border-gray-200 shadow-md transform transition-transform duration-300 ease-in-out ${
            isChatOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          <div className="flex flex-col h-[calc(100vh-4rem)]">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="font-medium">Team Chat</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                className="md:hidden"
                onClick={toggleChat}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((chat) => (
                <div 
                  key={chat.id} 
                  className={`flex ${chat.isMe ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${chat.isMe ? 'bg-blue-500 text-white' : 'bg-gray-100'} rounded-lg p-3`}>
                    {!chat.isMe && (
                      <div className="flex items-center mb-1">
                        <Avatar className="h-5 w-5 mr-2">
                          <AvatarFallback className="text-xs">
                            {chat.sender.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-medium">{chat.sender}</span>
                      </div>
                    )}
                    <p className="text-sm">{chat.message}</p>
                    <p className={`text-xs mt-1 ${chat.isMe ? 'text-blue-100' : 'text-gray-500'}`}>{chat.time}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-gray-200">
              <div className="flex">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 mr-2"
                />
                <Button size="sm" className="px-2">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile chat toggle button */}
        <div className="md:hidden fixed bottom-4 left-4 z-40">
          <Button 
            onClick={toggleChat} 
            size="sm" 
            className="rounded-full w-12 h-12 flex items-center justify-center bg-blue-500 hover:bg-blue-600"
          >
            <MessageCircle className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Main content */}
        <div className={`space-y-6 w-full transition-all duration-300 ${
          isChatOpen ? 'ml-0 md:ml-[300px]' : 'ml-0'
        }`}>
          <Outlet />
        </div>
      </div>
    </MainLayout>
  );
};

export default OrganizationLayout;
