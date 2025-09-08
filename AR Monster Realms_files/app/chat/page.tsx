'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'in-game';
  level: number;
  rank: string;
  lastSeen?: string;
}

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  type: 'text' | 'voice' | 'image' | 'monster-share' | 'trade-request';
  timestamp: Date;
  duration?: number; // for voice messages
  voiceUrl?: string;
  monsterData?: any;
  tradeData?: any;
  isRead: boolean;
}

interface ChatRoom {
  id: string;
  name: string;
  type: 'direct' | 'group' | 'guild' | 'global';
  participants: User[];
  lastMessage?: ChatMessage;
  unreadCount: number;
  description?: string;
}

export default function ChatSystem() {
  const [activeRoom, setActiveRoom] = useState<string>('global-chat');
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState<User | null>(null);
  const [voiceBlob, setVoiceBlob] = useState<Blob | null>(null);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewChat, setShowNewChat] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Mock current user
  const currentUser: User = {
    id: 'current-user',
    name: 'DragonMaster',
    avatar: 'Player avatar with gaming headset and monster collection badge, profile picture style',
    status: 'online',
    level: 25,
    rank: 'Legendary Hunter'
  };

  // Mock chat rooms
  const chatRooms: ChatRoom[] = [
    {
      id: 'global-chat',
      name: 'Global Chat',
      type: 'global',
      participants: [],
      unreadCount: 12,
      description: 'Chat with players worldwide'
    },
    {
      id: 'ghost-hunters',
      name: 'Ghost Hunters Guild',
      type: 'guild',
      participants: [],
      unreadCount: 3,
      description: 'Ghost World specialists'
    },
    {
      id: 'trading-hub',
      name: 'Trading Hub',
      type: 'group',
      participants: [],
      unreadCount: 8,
      description: 'Buy, sell, and trade monsters'
    },
    {
      id: 'direct-shadowhunter',
      name: 'ShadowHunter23',
      type: 'direct',
      participants: [{
        id: 'shadowhunter23',
        name: 'ShadowHunter23',
        avatar: 'Cool gamer with dark themed avatar and shadow monster companion',
        status: 'online',
        level: 28,
        rank: 'Shadow Master'
      }],
      unreadCount: 1
    },
    {
      id: 'direct-firemage',
      name: 'FireMage91',
      type: 'direct',
      participants: [{
        id: 'firemage91',
        name: 'FireMage91',
        avatar: 'Fire-themed player avatar with flame monster and magic staff',
        status: 'in-game',
        level: 22,
        rank: 'Flame Warrior'
      }],
      unreadCount: 0
    }
  ];

  // Mock users for new chat
  const allUsers: User[] = [
    {
      id: 'stormcaller88',
      name: 'StormCaller88',
      avatar: 'Lightning-themed player with storm elemental companion',
      status: 'online',
      level: 30,
      rank: 'Storm Lord'
    },
    {
      id: 'crystalkeeper',
      name: 'CrystalKeeper',
      avatar: 'Crystal-themed player with gem monster collection',
      status: 'offline',
      level: 19,
      rank: 'Crystal Collector',
      lastSeen: '2 hours ago'
    },
    {
      id: 'voidwalker77',
      name: 'VoidWalker77',
      avatar: 'Dark void-themed player with cosmic monster pets',
      status: 'in-game',
      level: 35,
      rank: 'Void Master'
    }
  ];

  // Mock messages
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      senderId: 'shadowhunter23',
      senderName: 'ShadowHunter23',
      senderAvatar: 'Cool gamer with dark themed avatar and shadow monster companion',
      content: 'Hey everyone! Just caught a legendary Blood Moon Wraith! 🌙👻',
      type: 'text',
      timestamp: new Date(Date.now() - 300000),
      isRead: true
    },
    {
      id: '2',
      senderId: 'firemage91',
      senderName: 'FireMage91',
      senderAvatar: 'Fire-themed player avatar with flame monster and magic staff',
      content: 'No way! Where did you find it?',
      type: 'text',
      timestamp: new Date(Date.now() - 240000),
      isRead: true
    },
    {
      id: '3',
      senderId: 'shadowhunter23',
      senderName: 'ShadowHunter23',
      senderAvatar: 'Cool gamer with dark themed avatar and shadow monster companion',
      content: '',
      type: 'voice',
      timestamp: new Date(Date.now() - 180000),
      duration: 8,
      voiceUrl: 'mock-voice-url-1',
      isRead: true
    },
    {
      id: '4',
      senderId: 'stormcaller88',
      senderName: 'StormCaller88',
      senderAvatar: 'Lightning-themed player with storm elemental companion',
      content: 'Anyone want to trade? I have extra Storm Phoenix eggs 🥚⚡',
      type: 'text',
      timestamp: new Date(Date.now() - 120000),
      isRead: true
    },
    {
      id: '5',
      senderId: 'current-user',
      senderName: 'DragonMaster',
      senderAvatar: 'Player avatar with gaming headset and monster collection badge, profile picture style',
      content: 'Check out my new Fire Drake evolution! 🔥🐉',
      type: 'monster-share',
      timestamp: new Date(Date.now() - 60000),
      monsterData: {
        name: 'Inferno Drake',
        level: 45,
        element: 'Fire',
        rarity: 'Epic',
        image: 'Majestic fire dragon with molten lava veins and epic flame aura'
      },
      isRead: true
    }
  ]);

  const emojis = ['😀', '😂', '🔥', '⚡', '👻', '🐉', '💎', '⭐', '🎮', '🏆', '💪', '👍', '❤️', '🎉', '🌟', '⚔️'];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setVoiceBlob(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Microphone access required for voice messages');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    }
  };

  const sendVoiceMessage = () => {
    if (voiceBlob && recordingTime > 0) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        senderId: currentUser.id,
        senderName: currentUser.name,
        senderAvatar: currentUser.avatar,
        content: '',
        type: 'voice',
        timestamp: new Date(),
        duration: recordingTime,
        voiceUrl: URL.createObjectURL(voiceBlob),
        isRead: false
      };
      setMessages(prev => [...prev, newMessage]);
      setVoiceBlob(null);
      setRecordingTime(0);
    }
  };

  const sendTextMessage = () => {
    if (message.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        senderId: currentUser.id,
        senderName: currentUser.name,
        senderAvatar: currentUser.avatar,
        content: message.trim(),
        type: 'text',
        timestamp: new Date(),
        isRead: false
      };
      setMessages(prev => [...prev, newMessage]);
      setMessage('');
    }
  };

  const playVoiceMessage = (messageId: string, voiceUrl: string) => {
    if (isPlaying === messageId) {
      setIsPlaying(null);
      return;
    }

    const audio = new Audio(voiceUrl);
    setIsPlaying(messageId);
    
    audio.onended = () => {
      setIsPlaying(null);
    };
    
    audio.play().catch(() => {
      setIsPlaying(null);
      alert('Unable to play voice message');
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'in-game': return 'bg-blue-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getRoomIcon = (type: string) => {
    switch (type) {
      case 'global': return '🌍';
      case 'guild': return '⚔️';
      case 'group': return '👥';
      case 'direct': return '💬';
      default: return '💬';
    }
  };

  const createNewChat = () => {
    if (selectedUsers.length === 0) return;
    
    // Mock creating new chat room
    const newRoom: ChatRoom = {
      id: `new-chat-${Date.now()}`,
      name: selectedUsers.length === 1 ? allUsers.find(u => u.id === selectedUsers[0])?.name || 'New Chat' : 'Group Chat',
      type: selectedUsers.length === 1 ? 'direct' : 'group',
      participants: allUsers.filter(u => selectedUsers.includes(u.id)),
      unreadCount: 0
    };
    
    chatRooms.push(newRoom);
    setActiveRoom(newRoom.id);
    setShowNewChat(false);
    setSelectedUsers([]);
  };

  const activeRoomData = chatRooms.find(room => room.id === activeRoom);
  const filteredUsers = allUsers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-950 relative overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 w-full bg-black/40 backdrop-blur-md z-50 border-b border-purple-800/30">
        <div className="px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <i className="ri-arrow-left-line text-white text-xl mr-2"></i>
            <span className="text-white font-semibold">Chat System</span>
          </Link>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowNewChat(true)}
              className="text-white text-xl"
            >
              <i className="ri-add-line"></i>
            </button>
            <div className="text-purple-400 text-sm">🟢 {currentUser.name}</div>
          </div>
        </div>
      </header>

      {/* New Chat Modal */}
      {showNewChat && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-gray-900 border-2 border-purple-600 rounded-2xl p-6 max-w-sm w-full max-h-[80vh] overflow-hidden">
            <div className="text-center mb-4">
              <div className="text-2xl mb-2">💬</div>
              <h3 className="text-xl font-bold text-white mb-2">Start New Chat</h3>
              <p className="text-gray-300 text-sm">Select players to chat with</p>
            </div>

            {/* Search */}
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search players..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none pr-10"
              />
              <i className="ri-search-line absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>

            {/* User List */}
            <div className="max-h-60 overflow-y-auto mb-4">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all ${
                    selectedUsers.includes(user.id) ? 'bg-purple-600/30 border border-purple-500' : 'hover:bg-gray-800/50'
                  }`}
                  onClick={() => {
                    setSelectedUsers(prev => 
                      prev.includes(user.id) 
                        ? prev.filter(id => id !== user.id)
                        : [...prev, user.id]
                    );
                  }}
                >
                  <div className="relative">
                    <div 
                      className="w-10 h-10 rounded-full bg-cover bg-center"
                      style={{
                        backgroundImage: `url(https://readdy.ai/api/search-image?query=$%7BencodeURIComponent%28user.avatar%29%7D&width=40&height=40&seq=${user.id}-avatar&orientation=squarish)`
                      }}
                    ></div>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-gray-900 ${getStatusColor(user.status)}`}></div>
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-semibold text-sm">{user.name}</div>
                    <div className="text-gray-400 text-xs">
                      {user.status === 'offline' ? user.lastSeen : `${user.rank} • Lv.${user.level}`}
                    </div>
                  </div>
                  {selectedUsers.includes(user.id) && (
                    <i className="ri-check-line text-purple-400"></i>
                  )}
                </div>
              ))}
            </div>

            {/* Selected Count */}
            {selectedUsers.length > 0 && (
              <div className="bg-purple-900/30 border border-purple-700 rounded-lg p-3 mb-4">
                <div className="text-purple-400 text-sm">
                  {selectedUsers.length} player{selectedUsers.length > 1 ? 's' : ''} selected
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowNewChat(false);
                  setSelectedUsers([]);
                  setSearchQuery('');
                }}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={createNewChat}
                disabled={selectedUsers.length === 0}
                className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white py-2 rounded-lg font-semibold"
              >
                Start Chat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Profile Modal */}
      {showUserProfile && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-gray-900 border-2 border-purple-600 rounded-2xl p-6 max-w-sm w-full">
            <div className="text-center mb-4">
              <div className="relative inline-block mb-3">
                <div 
                  className="w-20 h-20 rounded-full bg-cover bg-center mx-auto"
                  style={{
                    backgroundImage: `url(https://readdy.ai/api/search-image?query=$%7BencodeURIComponent%28showUserProfile.avatar%29%7D&width=80&height=80&seq=${showUserProfile.id}-profile&orientation=squarish)`
                  }}
                ></div>
                <div className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-4 border-gray-900 ${getStatusColor(showUserProfile.status)}`}></div>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{showUserProfile.name}</h3>
              <div className="text-purple-400 text-sm mb-2">{showUserProfile.rank}</div>
              <div className="text-gray-400 text-sm">Level {showUserProfile.level}</div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="bg-gray-800/50 rounded-lg p-3">
                <div className="text-gray-400 text-xs mb-1">Status</div>
                <div className="text-white text-sm capitalize">{showUserProfile.status}</div>
              </div>
              
              {showUserProfile.status === 'offline' && showUserProfile.lastSeen && (
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <div className="text-gray-400 text-xs mb-1">Last Seen</div>
                  <div className="text-white text-sm">{showUserProfile.lastSeen}</div>
                </div>
              )}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowUserProfile(null)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg"
              >
                Close
              </button>
              <button
                onClick={() => {
                  // Create direct chat with this user
                  setShowUserProfile(null);
                }}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="pt-16 pb-20 flex h-screen">
        {/* Chat Rooms Sidebar */}
        <div className="w-full max-w-xs bg-gray-900/50 border-r border-gray-800 overflow-y-auto">
          <div className="p-4">
            <h2 className="text-white font-bold mb-4">Chats</h2>
            <div className="space-y-2">
              {chatRooms.map((room) => (
                <div
                  key={room.id}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    activeRoom === room.id ? 'bg-purple-600/30 border border-purple-500' : 'hover:bg-gray-800/50'
                  }`}
                  onClick={() => setActiveRoom(room.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-xl">{getRoomIcon(room.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="text-white font-semibold text-sm truncate">{room.name}</div>
                        {room.unreadCount > 0 && (
                          <div className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-2">
                            {room.unreadCount}
                          </div>
                        )}
                      </div>
                      {room.description && (
                        <div className="text-gray-400 text-xs truncate">{room.description}</div>
                      )}
                      {room.lastMessage && (
                        <div className="text-gray-400 text-xs truncate mt-1">
                          {room.lastMessage.type === 'voice' ? '🎤 Voice message' : room.lastMessage.content}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="bg-gray-900/50 border-b border-gray-800 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-xl">{getRoomIcon(activeRoomData?.type || 'direct')}</div>
                <div>
                  <div className="text-white font-semibold">{activeRoomData?.name}</div>
                  {activeRoomData?.type === 'direct' && activeRoomData.participants[0] && (
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(activeRoomData.participants[0].status)}`}></div>
                      <div className="text-gray-400 text-xs">{activeRoomData.participants[0].status}</div>
                    </div>
                  )}
                  {activeRoomData?.description && (
                    <div className="text-gray-400 text-xs">{activeRoomData.description}</div>
                  )}
                </div>
              </div>
              <button className="text-gray-400 hover:text-white">
                <i className="ri-more-line text-xl"></i>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-xs ${msg.senderId === currentUser.id ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <button 
                    onClick={() => {
                      const user = allUsers.find(u => u.id === msg.senderId);
                      if (user) setShowUserProfile(user);
                    }}
                    className="flex-shrink-0"
                  >
                    <div 
                      className="w-8 h-8 rounded-full bg-cover bg-center"
                      style={{
                        backgroundImage: `url(https://readdy.ai/api/search-image?query=$%7BencodeURIComponent%28msg.senderAvatar%29%7D&width=32&height=32&seq=${msg.senderId}-msg-avatar&orientation=squarish)`
                      }}
                    ></div>
                  </button>
                  <div className={`${msg.senderId === currentUser.id ? 'text-right' : ''}`}>
                    <div className="text-gray-400 text-xs mb-1">
                      {msg.senderName} • {formatTime(msg.timestamp)}
                    </div>
                    
                    {msg.type === 'text' && (
                      <div className={`p-3 rounded-2xl ${
                        msg.senderId === currentUser.id 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-gray-800 text-white'
                      }`}>
                        {msg.content}
                      </div>
                    )}
                    
                    {msg.type === 'voice' && (
                      <div className={`p-3 rounded-2xl flex items-center space-x-2 ${
                        msg.senderId === currentUser.id 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-gray-800 text-white'
                      }`}>
                        <button
                          onClick={() => msg.voiceUrl && playVoiceMessage(msg.id, msg.voiceUrl)}
                          className="flex-shrink-0"
                        >
                          <i className={`text-xl ${
                            isPlaying === msg.id ? 'ri-pause-fill' : 'ri-play-fill'
                          }`}></i>
                        </button>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <div className="flex-1 h-1 bg-white/20 rounded-full">
                              <div className={`h-1 rounded-full transition-all ${
                                isPlaying === msg.id ? 'bg-white animate-pulse' : 'bg-white/40'
                              } w-1/3`}></div>
                            </div>
                            <div className="text-xs">{formatDuration(msg.duration || 0)}</div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {msg.type === 'monster-share' && msg.monsterData && (
                      <div className={`p-3 rounded-2xl ${
                        msg.senderId === currentUser.id 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-gray-800 text-white'
                      }`}>
                        <div className="flex items-center space-x-3 mb-2">
                          <div 
                            className="w-12 h-12 rounded-lg bg-cover bg-center"
                            style={{
                              backgroundImage: `url(https://readdy.ai/api/search-image?query=$%7BencodeURIComponent%28msg.monsterData.image%29%7D&width=48&height=48&seq=monster-share-${msg.id}&orientation=squarish)`
                            }}
                          ></div>
                          <div>
                            <div className="font-semibold">{msg.monsterData.name}</div>
                            <div className="text-xs opacity-80">
                              {msg.monsterData.element} • Lv.{msg.monsterData.level} • {msg.monsterData.rarity}
                            </div>
                          </div>
                        </div>
                        <div className="text-sm">{msg.content}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Voice Recording Overlay */}
          {isRecording && (
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-40">
              <div className="bg-gray-900 border-2 border-red-600 rounded-2xl p-8 text-center">
                <div className="text-4xl mb-4 animate-pulse">🎤</div>
                <div className="text-white font-bold text-xl mb-2">Recording...</div>
                <div className="text-red-400 text-lg mb-6">{formatDuration(recordingTime)}</div>
                <div className="flex space-x-4">
                  <button
                    onClick={stopRecording}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-full font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      stopRecording();
                      setTimeout(sendVoiceMessage, 100);
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Message Input */}
          <div className="bg-gray-900/50 border-t border-gray-800 p-4">
            {voiceBlob && (
              <div className="bg-gray-800 rounded-lg p-3 mb-3 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <i className="ri-mic-fill text-red-400"></i>
                  <span className="text-white text-sm">Voice message recorded ({formatDuration(recordingTime)})</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setVoiceBlob(null);
                      setRecordingTime(0);
                    }}
                    className="text-gray-400 hover:text-white"
                  >
                    <i className="ri-close-line"></i>
                  </button>
                  <button
                    onClick={sendVoiceMessage}
                    className="text-purple-400 hover:text-purple-300"
                  >
                    <i className="ri-send-plane-fill"></i>
                  </button>
                </div>
              </div>
            )}
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="text-gray-400 hover:text-white p-2"
              >
                <i className="ri-emotion-line text-xl"></i>
              </button>
              
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendTextMessage()}
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-full border border-gray-700 focus:border-purple-500 focus:outline-none"
                />
                {showEmojiPicker && (
                  <div className="absolute bottom-full mb-2 left-0 bg-gray-800 border border-gray-700 rounded-lg p-3 grid grid-cols-8 gap-2">
                    {emojis.map((emoji, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setMessage(prev => prev + emoji);
                          setShowEmojiPicker(false);
                        }}
                        className="text-xl hover:bg-gray-700 rounded p-1"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <button
                onClick={startRecording}
                className="text-gray-400 hover:text-red-400 p-2 transition-colors"
              >
                <i className="ri-mic-line text-xl"></i>
              </button>
              
              <button
                onClick={sendTextMessage}
                disabled={!message.trim()}
                className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white p-2 rounded-full"
              >
                <i className="ri-send-plane-fill text-xl"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}