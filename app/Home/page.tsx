/* eslint-disable jsx-a11y/alt-text */
"use client";
import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Plane, 
  School, 
  LogOut,
  Image,
  FileText,
  Sun, 
  Moon,
  Menu,
  Send,
  UserCircle2,
  PlusCircle
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import axios from 'axios';
import { Typewriter } from 'react-simple-typewriter';

export default function ChatbotLayout() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [showWelcome, setShowWelcome] = useState(true);
  const [chatMessages, setChatMessages] = useState<Message[]>([]); // Array of Message type


  // User object for personalization
  const user = {
    name: "John Doe",
    email: "student@example.com"
  };
  interface Message {
    role: "user" | "bot"; // Define allowed roles
    content: string;   
    attachment?: File;    // Message content
  }
  

  const modules = [
    {
      label: "Scholarships",
      icon: <GraduationCap className="h-5 w-5" />,
      href: "#"
    },
    {
      label: "Visa & Immigration",
      icon: <Plane className="h-5 w-5" />,
      href: "#"
    },
    {
      label: "Universities",
      icon: <School className="h-5 w-5" />,
      href: "#"
    },
    {
      label: "Logout",
      icon: <LogOut className="h-5 w-5" />,
      href: "#"
    }
  ];

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Check if user is new or returning
  useEffect(() => {
    const isFirstVisit = localStorage.getItem("isNewUser");
    if (!isFirstVisit) {
      localStorage.setItem("isNewUser", "false");
      setShowWelcome(true);
    } else {
      setShowWelcome(true);
    }
  }, []);

  const handleSendMessage = async () => {
    if (message.trim()) {
      const newMessage: Message = { role: 'user', content: message };
      setChatMessages(prevMessages => [...prevMessages, newMessage]);
      setMessage(""); // Reset input
      setShowWelcome(false);
  
      try {
        console.log('Sending message to API:', message); // Log the message being sent
        const response = await axios.post('/api/AiRoute', { message });
        console.log('API response:', response.data); // Log the full API response
  
        if (response.data && response.data.reply) {
          const processedResponse = response.data.reply;
          const botResponse: Message = { role: 'bot', content: processedResponse };
          setChatMessages(prevMessages => [...prevMessages, botResponse]);
        } else {
          throw new Error('Invalid API response format');
        }
      } catch (error) {
        console.error('Error getting AI response:', error);
        
        let errorMessage = "I'm sorry, but there was an error processing your request. Please try again later.";
        
        if (axios.isAxiosError(error)) {
          console.error('Axios error details:', error.response?.data);
          errorMessage += ` (Status: ${error.response?.status})`;
        }
  
        const errorResponse: Message = {
          role: 'bot',
          content: errorMessage
        };
        setChatMessages(prevMessages => [...prevMessages, errorResponse]);
      }
    }
  };  
    const handleFileUpload = (fileType: string) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = fileType;
        input.onchange = (e: Event) => {
          const file = (e.target as HTMLInputElement).files?.[0];
          if (file) {
            const newMessage: Message = { 
              role: "user", 
              content: `Uploaded ${fileType.split('/')[0]} file: ${file.name}`,
              attachment: file // Add the file as an attachment
            };
            setChatMessages(prevMessages => [...prevMessages, newMessage]); // Append to chatMessages
          }
        };
        input.click();
      };
      
    {chatMessages.map((msg, index) => (
        <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
          <div className={`rounded-lg p-2 mb-2 ${msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-300"}`}>
            <div>{msg.content}</div>
            {msg.attachment && (
              <div className="mt-1">
                <a href={URL.createObjectURL(msg.attachment)} target="_blank" rel="noopener noreferrer">
                  View Attachment: {msg.attachment.name}
                </a>
              </div>
            )}
          </div>
        </div>
      ))}
  
  return (
    <div className={`flex h-screen ${darkMode ? 'dark' : ''} bg-background text-foreground`}>
      {/* Sidebar */}
<Card 
  className={cn(
    "border-r flex flex-col transition-all duration-300 fixed md:relative z-40 h-full",
    isExpanded ? "w-64" : "w-16",
    "md:flex", // Always visible on medium screens and larger
    isMobileMenuOpen ? "flex" : "hidden" // Toggle visibility on mobile
  )}
  onMouseEnter={() => setIsExpanded(true)}
  onMouseLeave={() => setIsExpanded(false)}
>
  <CardContent className="p-4 border-b flex-shrink-0">
    <div className="flex items-center space-x-2">
      <div className="h-5 w-6 bg-primary rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <span className={cn(
        "font-medium transition-opacity duration-300",
        isExpanded ? "opacity-100" : "opacity-0"
      )}>
        Studiverse
      </span>
    </div>
  </CardContent>
  
  {/* Module Links */}
  <ScrollArea className="flex-grow">
    <CardContent className="pt-4 flex flex-col items-end"> {/* Center items */}
      {modules.map((module, idx) => (
        <Button
          key={idx}
          variant="ghost"
          className={cn("w-full mb-1 flex flex-col items-start space-x-2",
          isExpanded ? "justify-start" : "justify-center"
          )} // Center the icon
        >
            <div className="flex justify-start w-full">
            <span className={cn("flex justify-center items-center shrink-0", isExpanded ? "opacity-100" : "opacity-100")}>
                {module.icon}
                </span> {/* Spacing between icon and text */}
            <span className={cn(
              "ml-2 transition-opacity duration-300",
              isExpanded ? "opacity-100" : "opacity-0" // Hide labels when collapsed
            )}>
              {module.label}
            </span>
            </div>
        </Button>
      ))}
    </CardContent>
    {/* Dark Mode Toggle */}
  <CardContent className="p-4 border-t flex-shrink-0">
    <Button 
      variant="ghost"
      onClick={toggleDarkMode} 
      className="w-full mb-1 flex flex-col items-center space-x-2" // Center alignment
    >
        <div className="flex justify-start w-full">
      {darkMode ? <Moon className={cn("flex justify-center items-center h-5 w-5", isExpanded ? "opacity-100" : "opacity-100")} /> : <Sun className="flex justify-center items-center h-5 w-5" />}
      <span className={cn("ml-2 transition-opacity duration-300", isExpanded ? "opacity-100" : "hidden")}>
        {darkMode ? "Dark Mode" : "Light Mode"}
      </span>
      </div>
    </Button>
  </CardContent>
  </ScrollArea>
  
  {/* User Profile Section (Moved here) */}
  <CardContent className="p-4 border-t flex-shrink-0">
    <div className="flex items-center space-x-2">
      <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-neutral-700 flex items-center justify-center flex-shrink-0">
        <UserCircle2 className="h-6 w-6 text-gray-500 dark:text-neutral-400" />
      </div>
      <div className={cn(
        "transition-opacity duration-300 overflow-hidden",
        isExpanded ? "opacity-100" : "opacity-0 w-0"
      )}>
        <div className="text-sm font-medium text-gray-700 dark:text-neutral-200">John Doe</div>
        <div className="text-xs text-gray-500 dark:text-neutral-400">student@example.com</div>
      </div>
    </div>
  </CardContent>

</Card>

      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Top Bar */}
        <div className="h-14 border-b flex items-center justify-between px-4">
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
          <h1 className="text-lg font-semibold ml-4 md:ml-0">
          STUDIVERSE
          </h1>
        </div>
        
        {/* Chat Content */}
        <ScrollArea className="flex-1 p-4">
          {showWelcome && (
            <Card className="mb-4">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-2 text-center">
                  Welcome, {user.name}!
                </h2>
                <p className="text-muted-foreground text-center">
                  Start chatting to begin your journey with Studiverse.
                </p>
              </CardContent>
            </Card>
          )}

{chatMessages.map((msg, index) => (
  <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
    <div className={`inline-block max-w-full sm:max-w-md lg:max-w-lg xl:max-w-2xl break-words rounded-lg p-4 shadow ${msg.role === 'user' ? 'bg-green-600 text-white rounded-br-none' : 'bg-gray-100 text-black rounded-bl-none'}`}>
      {msg.role === 'bot' && index === chatMessages.length - 1 ? (
        <Typewriter
          words={[msg.content]}
          loop={1}
          cursor={false}
          typeSpeed={1}
          deleteSpeed={50}
          delaySpeed={500}
        />
      ) : (
        <div className="message-content">
          {msg.content.split('\n').map((line, lineIndex) => {
            // Check for bold text
            if (line.includes('**')) {
              const parts = line.split(/\*\*(.*?)\*\*/g);
              return (
                <div key={lineIndex} className="flex flex-col">
                  {parts.map((part, partIndex) => (
                    part.startsWith('**') ? (
                      <strong key={partIndex}>{part.replace('**', '')}</strong>
                    ) : (
                      <span key={partIndex}>{part}</span>
                    )
                  ))}
                </div>
              );
            }

            // Check for list items
            if (line.startsWith('*')) {
              return (
                <div key={lineIndex} className="flex items-start">
                  <span className="mr-2">•</span> {/* Bullet point */}
                  <span>{line.slice(1).trim()}</span> {/* Remove the asterisk */}
                </div>
              );
            }

            // Handle links
            if (line.includes('[') && line.includes(']')) {
              const linkText = line.split('[')[1].split(']')[0];
              const url = line.split('(')[1].replace(')', '');
              return (
                <a key={lineIndex} href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  {linkText}
                </a>
              );
            }

            // Default rendering
            return (
              <div key={lineIndex}>
                {line}
              </div>
            );
          })}
        </div>
      )}
    </div>
  </div>
))}





        </ScrollArea>
        
        {/* Input Area */}
        <div className="border-t p-4">
          <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <PlusCircle className="h-4 w-4" />
                <span className="sr-only">Add file</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleFileUpload('text/*')}>
                <FileText className="mr-2 h-4 w-4" />
                <span>Document</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFileUpload('image/*')}>
                <Image className="mr-2 h-4 w-4" />
                <span>Image</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
            <Input 
              type="text" 
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} className="hidden sm:flex">
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
