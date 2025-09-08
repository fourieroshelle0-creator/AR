'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface NavigationMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NavigationMenu({ isOpen, onClose }: NavigationMenuProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { pathname } = useRouter();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const menuItems = [
    {
      section: 'AR Worlds',
      items: [
        { name: 'Ghost World', href: '/ghost-world', icon: '👻', color: 'text-purple-400', description: 'Hunt spirits & exorcise demons' },
        { name: 'Duel Monster World', href: '/duel-monster-world', icon: '🐉', color: 'text-red-400', description: 'Summon creatures for battles' },
        { name: 'Divine Artifacts', href: '/divine-artifacts', icon: '⚡', color: 'text-yellow-400', description: 'Collect legendary relics' }
      ]
    },
    {
      section: 'Battle System',
      items: [
        { name: 'Location Battles', href: '/location-battles', icon: '📍', color: 'text-blue-400', description: 'GPS-based combat zones' },
        { name: 'Multiplayer Battles', href: '/multiplayer-battles', icon: '⚔️', color: 'text-orange-400', description: 'Real-time PvP combat' },
        { name: 'Tournaments', href: '/tournaments', icon: '🏆', color: 'text-gold-400', description: 'Competitive championships' }
      ]
    },
    {
      section: 'Collection & Progress',
      items: [
        { name: 'Monster-Pedia', href: '/monster-pedia', icon: '📚', color: 'text-green-400', description: 'Complete creature database' },
        { name: 'Monster Shop', href: '/monster-shop', icon: '🛒', color: 'text-pink-400', description: 'Buy cards & equipment' },
        { name: 'Player Journey', href: '/player-journey', icon: '🗺️', color: 'text-cyan-400', description: 'Track your adventure' }
      ]
    },
    {
      section: 'Capture Tools',
      items: [
        { name: 'AR Capture', href: '/ar-capture', icon: '📱', color: 'text-indigo-400', description: 'Camera monster hunting' },
        { name: 'Chat Assistant', href: '/chat', icon: '💬', color: 'text-teal-400', description: 'Get gameplay help' }
      ]
    }
  ];

  const getCurrentWorldBonus = () => {
    const hour = currentTime.getHours();
    if (hour >= 20 || hour <= 6) return { world: 'Ghost World', bonus: 'Night Boost', icon: '🌙', color: 'text-purple-400' };
    if (hour >= 7 && hour <= 18) return { world: 'Monster World', bonus: 'Day Boost', icon: '☀️', color: 'text-orange-400' };
    return { world: 'All Worlds', bonus: 'Balanced', icon: '⚖️', color: 'text-gray-400' };
  };

  const currentBonus = getCurrentWorldBonus();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={onClose}
      ></div>

      {/* Menu Panel */}
      <div className="fixed top-0 right-0 w-80 h-full bg-gray-900 border-l border-gray-700 z-50 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gray-900 border-b border-gray-700 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="font-['Pacifico'] text-xl text-white">AR Realms</div>
            <button 
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center hover:bg-gray-800 rounded-full transition-colors"
            >
              <i className="ri-close-line text-white text-xl"></i>
            </button>
          </div>
          
          {/* Current Time Bonus */}
          <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{currentBonus.icon}</span>
                <div>
                  <div className={`font-semibold text-sm ${currentBonus.color}`}>{currentBonus.bonus}</div>
                  <div className="text-gray-400 text-xs" suppressHydrationWarning={true}>
                    {currentTime.toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white text-xs font-semibold">Active World</div>
                <div className="text-gray-300 text-xs">{currentBonus.world}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Content */}
        <div className="p-4 space-y-6">
          {menuItems.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <div className="text-white font-bold text-sm mb-3 px-2">
                {section.section}
              </div>
              <div className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <Link
                    key={itemIndex}
                    href={item.href}
                    onClick={onClose}
                    className="block hover:bg-gray-800/50 rounded-lg p-3 transition-colors border border-transparent hover:border-gray-700"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-lg">
                        <span className="text-lg">{item.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`font-semibold text-sm ${item.color}`}>
                          {item.name}
                        </div>
                        <div className="text-gray-400 text-xs mt-1 leading-relaxed">
                          {item.description}
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <i className="ri-arrow-right-s-line text-gray-500 text-lg"></i>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* Quick Stats */}
          <div className="border-t border-gray-700 pt-4">
            <div className="text-white font-bold text-sm mb-3 px-2">
              Quick Stats
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-xl font-bold text-purple-400">12</div>
                  <div className="text-gray-400 text-xs">Monsters Captured</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-red-400">847</div>
                  <div className="text-gray-400 text-xs">Battle Points</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-blue-400">5</div>
                  <div className="text-gray-400 text-xs">Worlds Unlocked</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-green-400">Gold</div>
                  <div className="text-gray-400 text-xs">Hunter Rank</div>
                </div>
              </div>
            </div>
          </div>

          {/* Active Events */}
          <div className="border-t border-gray-700 pt-4">
            <div className="text-white font-bold text-sm mb-3 px-2">
              Active Events
            </div>
            <div className="space-y-2">
              <div className="bg-purple-900/30 border border-purple-700 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <span>🌙</span>
                    <span className="text-white font-semibold text-sm">Blood Moon</span>
                  </div>
                  <span className="text-purple-400 text-xs">2h 15m</span>
                </div>
                <div className="text-gray-300 text-xs">Ghost spawn rate +200%</div>
              </div>
              
              <div className="bg-red-900/30 border border-red-700 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <span>⚔️</span>
                    <span className="text-white font-semibold text-sm">Battle Tournament</span>
                  </div>
                  <span className="text-red-400 text-xs">6h 42m</span>
                </div>
                <div className="text-gray-300 text-xs">Championship elimination rounds</div>
              </div>
            </div>
          </div>

          {/* Settings & Options */}
          <div className="border-t border-gray-700 pt-4 pb-8">
            <div className="text-white font-bold text-sm mb-3 px-2">
              Settings
            </div>
            <div className="space-y-2">
              <button className="w-full flex items-center space-x-3 hover:bg-gray-800/50 rounded-lg p-3 transition-colors">
                <div className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-lg">
                  <i className="ri-settings-3-line text-gray-400"></i>
                </div>
                <div className="flex-1 text-left">
                  <div className="text-white font-semibold text-sm">Game Settings</div>
                  <div className="text-gray-400 text-xs">Audio, graphics, controls</div>
                </div>
              </button>
              
              <button className="w-full flex items-center space-x-3 hover:bg-gray-800/50 rounded-lg p-3 transition-colors">
                <div className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-lg">
                  <i className="ri-user-line text-gray-400"></i>
                </div>
                <div className="flex-1 text-left">
                  <div className="text-white font-semibold text-sm">Profile</div>
                  <div className="text-gray-400 text-xs">Avatar, achievements, stats</div>
                </div>
              </button>
              
              <button className="w-full flex items-center space-x-3 hover:bg-gray-800/50 rounded-lg p-3 transition-colors">
                <div className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-lg">
                  <i className="ri-help-line text-gray-400"></i>
                </div>
                <div className="flex-1 text-left">
                  <div className="text-white font-semibold text-sm">Help & Support</div>
                  <div className="text-gray-400 text-xs">FAQ, tutorials, contact</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}