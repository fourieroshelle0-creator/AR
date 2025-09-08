'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../lib/auth-context';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('stats');
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState('Ghost Hunter');
  const [selectedAvatar, setSelectedAvatar] = useState(0);

  const avatars = [
    { icon: '👻', name: 'Spirit Walker', rarity: 'Common' },
    { icon: '💀', name: 'Bone Collector', rarity: 'Rare' },
    { icon: '⚡', name: 'Exorcist', rarity: 'Epic' },
    { icon: '🌙', name: 'Night Hunter', rarity: 'Legendary' },
    { icon: '🔮', name: 'Mystic Seer', rarity: 'Mythic' },
    { icon: '⚰️', name: 'Death Lord', rarity: 'Divine' }
  ];

  const achievements = [
    { name: 'First Ghost', description: 'Capture your first spirit', icon: '👻', unlocked: true, date: '2024-01-15' },
    { name: 'Night Hunter', description: 'Hunt during witching hour 10 times', icon: '🌙', unlocked: true, date: '2024-01-20' },
    { name: 'Exorcist Master', description: 'Banish 100 evil spirits', icon: '⚡', unlocked: true, date: '2024-02-03' },
    { name: 'Ghost Whisperer', description: 'Communicate with ancient spirits', icon: '💬', unlocked: false },
    { name: 'Cemetery Guardian', description: 'Protect 5 graveyards', icon: '⚰️', unlocked: false },
    { name: 'Spectral Lord', description: 'Reach maximum hunter level', icon: '👑', unlocked: false }
  ];

  const statistics = [
    { label: 'Ghosts Captured', value: '47', icon: '👻' },
    { label: 'Spirits Banished', value: '123', icon: '⚡' },
    { label: 'Haunts Cleared', value: '18', icon: '🏚️' },
    { label: 'Boss Defeats', value: '5', icon: '💀' },
    { label: 'Guild Battles Won', value: '32', icon: '⚔️' },
    { label: 'Rare Encounters', value: '8', icon: '🌟' }
  ];

  const inventory = [
    { name: 'Ghost Shards', amount: 1247, icon: '💎', type: 'currency' },
    { name: 'Ectoplasm', amount: 89, icon: '🧪', type: 'material' },
    { name: 'Holy Water', amount: 23, icon: '💧', type: 'consumable' },
    { name: 'Silver Cross', amount: 1, icon: '✟', type: 'equipment' },
    { name: 'Ritual Candles', amount: 15, icon: '🕯️', type: 'consumable' },
    { name: 'Ancient Tome', amount: 3, icon: '📜', type: 'artifact' }
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      onClose();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Save profile logic would go here
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'text-gray-400';
      case 'Rare': return 'text-blue-400';
      case 'Epic': return 'text-purple-400';
      case 'Legendary': return 'text-yellow-400';
      case 'Mythic': return 'text-red-400';
      case 'Divine': return 'text-pink-400';
      default: return 'text-white';
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-sm h-full max-h-[90vh] bg-gray-900 rounded-2xl border border-purple-700/50 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-900/50 to-gray-900 p-4 border-b border-purple-700/50">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-bold text-white">Profile</h2>
              <button 
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center hover:bg-gray-800 rounded-full transition-colors"
              >
                <i className="ri-close-line text-white text-xl"></i>
              </button>
            </div>
            
            {/* Player Info */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center text-2xl">
                  {avatars[selectedAvatar].icon}
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">23</span>
                </div>
              </div>
              <div className="flex-1">
                {isEditing ? (
                  <input
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1 text-white text-sm w-full"
                    placeholder="Enter name"
                  />
                ) : (
                  <div>
                    <div className="text-white font-semibold">{playerName}</div>
                    <div className="text-purple-400 text-sm">Phantom Slayer</div>
                    <div className="text-gray-400 text-xs">{user?.email}</div>
                  </div>
                )}
              </div>
              <button
                onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-lg text-sm"
              >
                {isEditing ? 'Save' : 'Edit'}
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-gray-800">
            {[
              { id: 'stats', name: 'Stats', icon: 'ri-bar-chart-line' },
              { id: 'achievements', name: 'Awards', icon: 'ri-trophy-line' },
              { id: 'inventory', name: 'Items', icon: 'ri-treasure-map-line' },
              { id: 'settings', name: 'Settings', icon: 'ri-settings-3-line' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 text-xs font-semibold transition-colors ${
                  activeTab === tab.id 
                    ? 'text-purple-400 border-b-2 border-purple-400' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <i className={`${tab.icon} text-sm block mb-1`}></i>
                {tab.name}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === 'stats' && (
              <div className="space-y-4">
                {/* Level Progress */}
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-semibold">Level 23</span>
                    <span className="text-purple-400 text-sm">2,340 / 3,000 XP</span>
                  </div>
                  <div className="bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-600 to-purple-400 h-2 rounded-full w-4/5"></div>
                  </div>
                  <div className="text-center text-gray-400 text-xs mt-1">Next: Spectral Lord</div>
                </div>

                {/* Statistics Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {statistics.map((stat, index) => (
                    <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-xl p-3">
                      <div className="text-center">
                        <div className="text-2xl mb-1">{stat.icon}</div>
                        <div className="text-white font-bold text-lg">{stat.value}</div>
                        <div className="text-gray-400 text-xs">{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Hunter Rank */}
                <div className="bg-gradient-to-r from-purple-900/30 to-gray-800/50 border border-purple-700/50 rounded-xl p-4">
                  <div className="text-center">
                    <div className="text-3xl mb-2">👑</div>
                    <div className="text-white font-bold text-lg">Hunter Rank: Gold</div>
                    <div className="text-purple-400 text-sm">Top 15% Globally</div>
                    <div className="text-gray-400 text-xs mt-1">847 Battle Points</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'achievements' && (
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div 
                    key={index} 
                    className={`border rounded-xl p-4 ${
                      achievement.unlocked 
                        ? 'bg-gray-800/50 border-purple-700/50' 
                        : 'bg-gray-800/20 border-gray-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                        achievement.unlocked ? 'bg-purple-600' : 'bg-gray-700'
                      }`}>
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <div className={`font-semibold ${achievement.unlocked ? 'text-white' : 'text-gray-500'}`}>
                          {achievement.name}
                        </div>
                        <div className={`text-xs ${achievement.unlocked ? 'text-gray-300' : 'text-gray-600'}`}>
                          {achievement.description}
                        </div>
                        {achievement.unlocked && achievement.date && (
                          <div className="text-purple-400 text-xs mt-1">
                            Unlocked: {achievement.date}
                          </div>
                        )}
                      </div>
                      {achievement.unlocked && (
                        <div className="w-6 h-6 flex items-center justify-center bg-green-600 rounded-full">
                          <i className="ri-check-line text-white text-sm"></i>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'inventory' && (
              <div className="space-y-3">
                {inventory.map((item, index) => (
                  <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-xl bg-gray-700 flex items-center justify-center text-xl">
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-semibold">{item.name}</div>
                        <div className="text-purple-400 text-xs capitalize">{item.type}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-bold">{item.amount}</div>
                        <div className="text-gray-400 text-xs">owned</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-4">
                {/* Avatar Selection */}
                {isEditing && (
                  <div className="mb-6">
                    <div className="text-white font-semibold mb-3">Choose Avatar</div>
                    <div className="grid grid-cols-3 gap-3">
                      {avatars.map((avatar, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedAvatar(index)}
                          className={`p-3 rounded-xl border transition-all ${
                            selectedAvatar === index
                              ? 'border-purple-500 bg-purple-900/30'
                              : 'border-gray-700 bg-gray-800/50'
                          }`}
                        >
                          <div className="text-2xl mb-1">{avatar.icon}</div>
                          <div className="text-white text-xs">{avatar.name}</div>
                          <div className={`text-xs ${getRarityColor(avatar.rarity)}`}>
                            {avatar.rarity}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Settings Options */}
                <div className="space-y-3">
                  <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-semibold">Sound Effects</div>
                        <div className="text-gray-400 text-xs">Ghost sounds & battle audio</div>
                      </div>
                      <button className="w-12 h-6 bg-purple-600 rounded-full relative">
                        <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                      </button>
                    </div>
                  </div>

                  <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-semibold">AR Vibration</div>
                        <div className="text-gray-400 text-xs">Haptic feedback during hunts</div>
                      </div>
                      <button className="w-12 h-6 bg-purple-600 rounded-full relative">
                        <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                      </button>
                    </div>
                  </div>

                  <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-semibold">Night Mode</div>
                        <div className="text-gray-400 text-xs">Darker theme for night hunting</div>
                      </div>
                      <button className="w-12 h-6 bg-gray-600 rounded-full relative">
                        <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5"></div>
                      </button>
                    </div>
                  </div>

                  <button className="w-full bg-gray-800/50 border border-gray-700 rounded-xl p-4 text-left">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-semibold">Privacy Settings</div>
                        <div className="text-gray-400 text-xs">Manage data & location</div>
                      </div>
                      <i className="ri-arrow-right-s-line text-gray-400"></i>
                    </div>
                  </button>

                  <button className="w-full bg-gray-800/50 border border-gray-700 rounded-xl p-4 text-left">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-semibold">Help & Support</div>
                        <div className="text-gray-400 text-xs">FAQ, tutorials, contact</div>
                      </div>
                      <i className="ri-arrow-right-s-line text-gray-400"></i>
                    </div>
                  </button>
                </div>

                {/* Sign Out Button */}
                <div className="pt-4 border-t border-gray-700">
                  <button
                    onClick={handleSignOut}
                    className="w-full bg-red-600/20 border border-red-600/50 hover:bg-red-600/30 text-red-400 py-3 rounded-xl font-semibold transition-colors"
                  >
                    <i className="ri-logout-box-r-line mr-2"></i>
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}