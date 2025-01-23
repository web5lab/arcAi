import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { formatTimestamp, robotThoughts } from '../utils/botUtils';
import botLogo from '../assets/chatbot.png'
import {  X, Send, Command, HelpCircle, Wallet, Coins, Code, Activity} from 'lucide-react';

export const FloatingBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentThought, setCurrentThought] = useState(robotThoughts[0]);
  const [showCommands, setShowCommands] = useState(false);
  const [messages, setMessages] = useState([{
    type: 'bot',
    content: "Hi! I'm ArcAi assistant. I know all about blockchain, web development",
    timestamp: new Date()
  }]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const controls = useAnimation();
  const commands = [
    {
      command: '/help',
      description: 'Show available commands',
      icon: <HelpCircle className="w-4 h-4" />,
    },
    {
      command: '/price',
      description: 'Check INF token price',
      icon: <Coins className="w-4 h-4" />,
    },
    {
      command: '/wallet',
      description: 'Get wallet connection info',
      icon: <Wallet className="w-4 h-4" />,
    },
    {
      command: '/stats',
      description: 'View network statistics',
      icon: <Activity className="w-4 h-4" />,
    },
    {
      command: '/docs',
      description: 'Access developer documentation',
      icon: <Code className="w-4 h-4" />,
    }
  ];
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!isOpen) {
      const moveInterval = setInterval(() => {
        const newX = Math.random() * 100 - 50;
        const newY = Math.random() * 100 - 50;

        controls.start({
          x: newX,
          y: newY,
          transition: { duration: 2, ease: "easeInOut" }
        });
      }, 3000);

      const thoughtInterval = setInterval(() => {
        const randomThought = robotThoughts[Math.floor(Math.random() * robotThoughts.length)];
        setCurrentThought(randomThought);
      }, 4000);

      return () => {
        clearInterval(moveInterval);
        clearInterval(thoughtInterval);
      };
    }
  }, [isOpen, controls]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot thinking
    setTimeout(() => {
      const botResponse = "hi";
      const botMessage = {
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-20 right-8 z-50">
      {isOpen ? (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gray-800/95 backdrop-blur-sm border border-gray-700 rounded-lg w-80 shadow-xl"
        >
          <div className="p-4 border-b border-gray-700 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <img src={botLogo} className="w-10 h-10 text-white" />
              <span className="text-white font-medium">ArcAi's Assistant</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="h-96 p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`${message.type === 'user'
                    ? 'bg-blue-500/50 ml-auto'
                    : 'bg-gray-700/50 mr-auto'
                    } rounded-lg p-3 max-w-[80%]`}
                >
                  <p className="text-white text-sm">{message.content}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {formatTimestamp(message.timestamp)}
                  </p>
                </div>
              ))}
              {isTyping && (
                <div className="bg-gray-700/50 rounded-lg p-3 mr-auto max-w-[80%]">
                  <motion.div
                    className="flex space-x-1"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <div className="w-2 h-2 bg-gray-400 rounded-full" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full" />
                  </motion.div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="p-2 border-t border-gray-700 relative">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-400"
              />
               <button
              type="button"
              onClick={() => setShowCommands(!showCommands)}
              className="bg-blue-500 hover:bg-blue-600 text-white  rounded-lg transition-colors p-2"
            >
              <Command className="w-5 h-5" />
            </button>
              <button
                onClick={handleSendMessage}
                className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <div className='w-full flex justify-center items-center mt-1  opacity-50'>
            <a className=' underline cursor-pointer'>Powered By ArcAi</a>
            </div>
          
            {showCommands && (
            <div className="absolute bottom-[calc(100%+1rem)] left-4 right-4 bg-gray-900 border border-blue-500/80 rounded-lg overflow-hidden shadow-xl max-h-48 overflow-y-auto">
              <div className="p-2 space-y-0.5">
                {commands.map((cmd, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setInputValue(cmd.command);
                      setShowCommands(false);
                    }}
                    className="w-full flex items-center p-2 hover:bg-gray-800/50 rounded transition-colors text-left"
                  >
                    <span className="p-1.5 bg-blue-500/10 rounded mr-2 group-hover:bg-green-500/20 transition-colors">
                      {cmd.icon}
                    </span>
                    <div>
                      <div className="font-mono text-blue-400 group-hover:text-blue-300">{cmd.command}</div>
                      <div className="text-xs text-blue-300/60">{cmd.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
          </div>
          
        </motion.div>
      ) : (
        <div className="relative">
          <motion.div
            animate={controls}
            className="relative"
            whileHover={{ scale: 1.1 }}
            drag
            dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-full bg-gradient-to-r from-blue-500 to-cyan-400 right-0 mb-2  rounded-lg p-2 text-sm w-48 shadow-lg"
            >
              <div className="relative">
                <p className="text-white">{currentThought}</p>

              </div>
            </motion.div>


            <button
              onClick={() => setIsOpen(true)}
              className={`
          group relative w-16 h-16 rounded-full
          flex items-center justify-center
          shadow-lg hover:shadow-xl
          hover:scale-110 active:scale-95
        
        `}
            >
              <img src={botLogo} className="w-16 h-16 text-white" />

              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-full bg-blue-500 blur-xl opacity-40 group-hover:opacity-60 transition-opacity -z-10" />

              {/* Pulse Effect */}
              <div className="absolute inset-0 rounded-full animate-ping bg-blue-500 opacity-20" />
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};
