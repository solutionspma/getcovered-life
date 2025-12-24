'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff, 
  X, 
  MessageCircle,
  Volume2,
  VolumeX,
  Minimize2,
  Maximize2,
  Bot,
  User,
  Loader2,
} from 'lucide-react'

interface VoiceAIWidgetProps {
  agentName?: string
  greeting?: string
  primaryColor?: string
}

type CallStatus = 'idle' | 'connecting' | 'active' | 'ended'

interface Message {
  id: string
  speaker: 'agent' | 'user'
  text: string
  timestamp: Date
}

export function VoiceAIWidget({ 
  agentName = 'Sarah',
  greeting = "Hi! I'm Sarah, your insurance assistant. How can I help you today?",
  primaryColor = '#173860',
}: VoiceAIWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [callStatus, setCallStatus] = useState<CallStatus>('idle')
  const [isMuted, setIsMuted] = useState(false)
  const [isSpeakerOn, setIsSpeakerOn] = useState(true)
  const [messages, setMessages] = useState<Message[]>([])
  const [isListening, setIsListening] = useState(false)
  const [currentTranscript, setCurrentTranscript] = useState('')
  
  // Simulate connecting and greeting
  const startCall = useCallback(async () => {
    setCallStatus('connecting')
    setMessages([])
    
    // Simulate connection delay
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    setCallStatus('active')
    
    // Add greeting message
    setMessages([{
      id: '1',
      speaker: 'agent',
      text: greeting,
      timestamp: new Date(),
    }])
  }, [greeting])
  
  const endCall = useCallback(() => {
    setCallStatus('ended')
    setIsListening(false)
    setCurrentTranscript('')
    
    // Add farewell message
    setMessages((prev) => [...prev, {
      id: String(prev.length + 1),
      speaker: 'agent',
      text: "Thank you for chatting with me! Feel free to come back anytime if you have more questions about life insurance.",
      timestamp: new Date(),
    }])
    
    // Reset after delay
    setTimeout(() => {
      setCallStatus('idle')
    }, 3000)
  }, [])
  
  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev)
  }, [])
  
  const toggleSpeaker = useCallback(() => {
    setIsSpeakerOn((prev) => !prev)
  }, [])

  // Pulse animation when idle
  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: { duration: 2, repeat: Infinity }
  }

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-brand-gold rounded-full shadow-lg shadow-brand-gold/30 flex items-center justify-center group"
          >
            <motion.div animate={pulseAnimation}>
              <MessageCircle className="w-7 h-7 text-brand-navy" />
            </motion.div>
            
            {/* Tooltip */}
            <div className="absolute right-full mr-3 px-3 py-2 bg-brand-navy text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Talk to {agentName}
              <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-brand-navy rotate-45" />
            </div>
            
            {/* Notification Dot */}
            <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={cn(
              'fixed z-50 bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col',
              isExpanded 
                ? 'inset-4 md:inset-8' 
                : 'bottom-6 right-6 w-96 h-[600px] max-h-[80vh]'
            )}
          >
            {/* Header */}
            <div 
              className="p-4 text-white flex items-center justify-between shrink-0"
              style={{ backgroundColor: primaryColor }}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="w-6 h-6" />
                  </div>
                  {callStatus === 'active' && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold">{agentName}</h3>
                  <p className="text-sm text-white/70">
                    {callStatus === 'idle' && 'Insurance Assistant'}
                    {callStatus === 'connecting' && 'Connecting...'}
                    {callStatus === 'active' && 'On Call'}
                    {callStatus === 'ended' && 'Call Ended'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  {isExpanded ? (
                    <Minimize2 className="w-5 h-5" />
                  ) : (
                    <Maximize2 className="w-5 h-5" />
                  )}
                </button>
                <button
                  onClick={() => {
                    if (callStatus === 'active') endCall()
                    setIsOpen(false)
                  }}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {/* Initial State */}
              {callStatus === 'idle' && (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-10 h-10 text-brand-gold" />
                  </div>
                  <h4 className="font-semibold text-brand-navy mb-2">
                    Talk to {agentName}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-6 max-w-xs mx-auto">
                    Get instant answers about life insurance. Click below to start a voice conversation.
                  </p>
                  <Button 
                    variant="secondary" 
                    size="lg"
                    onClick={startCall}
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Start Conversation
                  </Button>
                </div>
              )}

              {/* Connecting State */}
              {callStatus === 'connecting' && (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-brand-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Loader2 className="w-10 h-10 text-brand-navy animate-spin" />
                  </div>
                  <h4 className="font-semibold text-brand-navy mb-2">
                    Connecting to {agentName}...
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Please wait while we connect you.
                  </p>
                </div>
              )}

              {/* Messages */}
              {(callStatus === 'active' || callStatus === 'ended') && messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    'flex gap-3',
                    message.speaker === 'user' && 'flex-row-reverse'
                  )}
                >
                  <div className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center shrink-0',
                    message.speaker === 'agent' ? 'bg-brand-navy text-white' : 'bg-brand-gold text-brand-navy'
                  )}>
                    {message.speaker === 'agent' ? (
                      <Bot className="w-4 h-4" />
                    ) : (
                      <User className="w-4 h-4" />
                    )}
                  </div>
                  <div className={cn(
                    'max-w-[75%] rounded-2xl px-4 py-3',
                    message.speaker === 'agent' 
                      ? 'bg-white border shadow-sm rounded-tl-none' 
                      : 'bg-brand-navy text-white rounded-tr-none'
                  )}>
                    <p className="text-sm">{message.text}</p>
                    <p className={cn(
                      'text-xs mt-1',
                      message.speaker === 'agent' ? 'text-muted-foreground' : 'text-white/60'
                    )}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Current Transcript */}
              {isListening && currentTranscript && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3 flex-row-reverse"
                >
                  <div className="w-8 h-8 rounded-full bg-brand-gold text-brand-navy flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <div className="max-w-[75%] rounded-2xl rounded-tr-none bg-brand-navy/50 text-white px-4 py-3">
                    <p className="text-sm">{currentTranscript}</p>
                    <span className="inline-block w-2 h-4 bg-white/50 ml-1 animate-pulse" />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Call Controls */}
            {callStatus === 'active' && (
              <div className="p-4 bg-white border-t">
                <div className="flex items-center justify-center gap-4">
                  {/* Mute Button */}
                  <button
                    onClick={toggleMute}
                    className={cn(
                      'w-12 h-12 rounded-full flex items-center justify-center transition-colors',
                      isMuted ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    )}
                  >
                    {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </button>

                  {/* End Call Button */}
                  <button
                    onClick={endCall}
                    className="w-16 h-16 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                  >
                    <PhoneOff className="w-6 h-6" />
                  </button>

                  {/* Speaker Button */}
                  <button
                    onClick={toggleSpeaker}
                    className={cn(
                      'w-12 h-12 rounded-full flex items-center justify-center transition-colors',
                      !isSpeakerOn ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    )}
                  >
                    {isSpeakerOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                  </button>
                </div>
                
                {/* Voice Activity Indicator */}
                <div className="mt-4 flex items-center justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 bg-brand-gold rounded-full"
                      animate={{
                        height: isListening ? [12, 24, 12] : 12,
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </div>
                <p className="text-center text-xs text-muted-foreground mt-2">
                  {isListening ? 'Listening...' : 'Tap mic to speak'}
                </p>
              </div>
            )}

            {/* Restart Option */}
            {callStatus === 'ended' && (
              <div className="p-4 bg-white border-t">
                <Button 
                  variant="secondary" 
                  fullWidth
                  onClick={startCall}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Start New Conversation
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
