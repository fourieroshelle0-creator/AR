
'use client';

import { useState } from 'react';

interface AREffectCardProps {
  effect: {
    id: string;
    name: string;
    type: 'spell' | 'trap' | 'artifact' | 'weapon';
    description: string;
    animation: string;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
  };
  onActivate: (effectId: string) => void;
}

export default function AREffectCard({ effect, onActivate }: AREffectCardProps) {
  const [isActivated, setIsActivated] = useState(false);

  const getRarityColors = () => {
    switch (effect.rarity) {
      case 'common': return 'from-gray-600 to-gray-800 border-gray-500';
      case 'rare': return 'from-blue-600 to-blue-800 border-blue-500';
      case 'epic': return 'from-purple-600 to-purple-800 border-purple-500';
      case 'legendary': return 'from-yellow-600 to-yellow-800 border-yellow-500';
      default: return 'from-gray-600 to-gray-800 border-gray-500';
    }
  };

  const getTypeIcon = () => {
    switch (effect.type) {
      case 'spell': return 'ri-magic-line';
      case 'trap': return 'ri-shield-line';
      case 'artifact': return 'ri-ancient-gate-line';
      case 'weapon': return 'ri-sword-line';
      default: return 'ri-star-line';
    }
  };

  const handleActivate = () => {
    setIsActivated(true);
    onActivate(effect.id);
    setTimeout(() => setIsActivated(false), 3000);
  };

  return (
    <div 
      className={`relative w-full h-80 bg-gradient-to-b ${getRarityColors()} rounded-xl border-2 cursor-pointer transform transition-all duration-300 ${
        isActivated ? 'scale-110 animate-pulse' : 'hover:scale-105'
      }`}
      onClick={handleActivate}
    >
      {/* Card Frame */}
      <div className="absolute inset-2 border border-amber-400/30 rounded-lg"></div>
      
      {/* Rarity Glow */}
      <div className={`absolute inset-0 rounded-xl opacity-20 ${
        effect.rarity === 'legendary' ? 'animate-pulse' : ''
      }`}></div>

      {/* Card Content */}
      <div className="relative z-10 p-4 h-full flex flex-col">
        {/* Card Image */}
        <div className="flex-1 mb-4 relative overflow-hidden rounded-lg bg-black/30">
          <img
            src={`https://readdy.ai/api/search-image?query=Realistic%203D%20$%7Beffect.name%7D%20$%7Beffect.type%7D%20card%2C%20magical%20$%7Beffect.type%7D%20with%20glowing%20effects%2C%20fantasy%20card%20game%20artwork%2C%20detailed%20magical%20item%2C%20mystical%20energy%2C%20dark%20fantasy%20aesthetic%2C%20card%20game%20illustration%2C%20high%20quality%20render&width=200&height=150&seq=${effect.id}-card&orientation=landscape`}
            alt={effect.name}
            className="w-full h-full object-cover"
          />
          
          {/* Type Icon */}
          <div className="absolute top-2 right-2 w-8 h-8 bg-black/80 rounded-full flex items-center justify-center">
            <i className={`${getTypeIcon()} text-white text-sm`}></i>
          </div>

          {/* Activation Effect */}
          {isActivated && (
            <div className="absolute inset-0 bg-yellow-400/50 animate-pulse flex items-center justify-center">
              <div className="text-white text-2xl font-bold animate-bounce">ACTIVATED!</div>
            </div>
          )}
        </div>

        {/* Card Info */}
        <div className="text-center">
          <h3 className="text-white font-bold text-lg mb-1">{effect.name}</h3>
          <div className={`inline-block px-2 py-1 rounded text-xs font-bold mb-2 ${
            effect.rarity === 'common' ? 'bg-gray-500' :
            effect.rarity === 'rare' ? 'bg-blue-500' :
            effect.rarity === 'epic' ? 'bg-purple-500' :
            'bg-yellow-500'
          }`}>
            {effect.rarity.toUpperCase()}
          </div>
          <p className="text-gray-300 text-xs leading-tight">{effect.description}</p>
        </div>

        {/* AR Effect Indicators */}
        <div className="absolute top-2 left-2 flex space-x-1">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
        </div>
      </div>

      {/* Runic Border */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1 left-1 w-6 h-6 border-l-2 border-t-2 border-amber-400/50"></div>
        <div className="absolute top-1 right-1 w-6 h-6 border-r-2 border-t-2 border-amber-400/50"></div>
        <div className="absolute bottom-1 left-1 w-6 h-6 border-l-2 border-b-2 border-amber-400/50"></div>
        <div className="absolute bottom-1 right-1 w-6 h-6 border-r-2 border-b-2 border-amber-400/50"></div>
      </div>
    </div>
  );
}
