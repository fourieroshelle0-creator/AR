
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import GhostRoster from './GhostRoster';
import ProfileModal from '../../components/ProfileModal';

export default function GhostWorld() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeGhost, setActiveGhost] = useState<string | null>(null);
  const [playerLevel, setPlayerLevel] = useState('Phantom Slayer');
  const [ghostShards, setGhostShards] = useState(1247);
  const [activeTab, setActiveTab] = useState('hunt');
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const isWitchingHour = () => {
    const hour = currentTime.getHours();
    return hour >= 21 || hour <= 5;
  };

  const ghostTypes = [
    {
      id: 'wraith',
      name: 'Shadow Wraith',
      rarity: 'Common',
      location: 'Residential Streets',
      power: 'Fear Aura',
      image: 'Translucent shadow figure with glowing red eyes floating in dark misty atmosphere, ethereal ghost spirit with flowing dark robes, haunting supernatural entity, photorealistic horror aesthetic, spooky cinematic lighting, isolated on dark background, centered composition'
    },
    {
      id: 'poltergeist',
      name: 'Vengeful Poltergeist',
      rarity: 'Rare',
      location: 'Abandoned Buildings',
      power: 'Object Manipulation',
      image: 'Angry poltergeist spirit surrounded by floating objects and electrical sparks, malevolent ghost with intense energy aura, supernatural phenomenon with telekinetic powers, horror movie aesthetic, dramatic lighting effects, photorealistic 3D rendering'
    },
    {
      id: 'revenant',
      name: 'Ancient Revenant',
      rarity: 'Legendary',
      location: 'Cemeteries',
      power: 'Soul Drain',
      image: 'Ancient undead revenant with decaying robes and spectral chains, powerful undead spirit with glowing skull features, cemetery guardian with dark magic aura, gothic horror aesthetic, moonlit graveyard atmosphere, cinematic quality'
    }
  ];

  const nearbyHaunts = [
    { location: 'Oakwood Cemetery', distance: '0.3km', ghostCount: 7, rarity: 'Legendary', danger: 'High' },
    { location: 'Abandoned Mill', distance: '0.8km', ghostCount: 12, rarity: 'Rare', danger: 'Medium' },
    { location: 'Old Church Ruins', distance: '1.2km', ghostCount: 3, rarity: 'Boss', danger: 'Extreme' },
    { location: 'Elm Street Houses', distance: '0.5km', ghostCount: 18, rarity: 'Common', danger: 'Low' }
  ];

  const exorcismTools = [
    { name: 'Silver Cross', power: 85, type: 'Holy', uses: 23 },
    { name: 'Ritual Candle', power: 72, type: 'Light', uses: 15 },
    { name: 'Sanctified Bell', power: 91, type: 'Sound', uses: 8 },
    { name: 'Blessed Salt', power: 78, type: 'Purify', uses: 31 }
  ];

  const evolutionChain = [
    { stage: 'Spirit', icon: '👻', description: 'Basic captured ghost' },
    { stage: 'Wraith', icon: '💀', description: 'Fed with haunted energy' },
    { stage: 'Specter', icon: '☠️', description: 'Battles under full moon' },
    { stage: 'Revenant', icon: '⚰️', description: 'Cemetery evolution ritual' }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'text-gray-400';
      case 'Rare': return 'text-blue-400';
      case 'Legendary': return 'text-purple-400';
      case 'Boss': return 'text-red-400';
      default: return 'text-white';
    }
  };

  const getDangerColor = (danger: string) => {
    switch (danger) {
      case 'Low': return 'bg-green-600';
      case 'Medium': return 'bg-yellow-600';
      case 'High': return 'bg-orange-600';
      case 'Extreme': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  if (activeTab === 'roster') {
    return (
      <div className="min-h-screen bg-gray-950 relative overflow-hidden">
        {/* Atmospheric Background */}
        <div className="fixed inset-0 pointer-events-none">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{
              backgroundImage: `url(https://readdy.ai/api/search-image?query=Dark%20misty%20cemetery%20atmosphere%20with%20fog%20rolling%20between%20tombstones%2C%20haunting%20gothic%20graveyard%20scene%20with%20ethereal%20mist%20and%20shadows%2C%20spooky%20supernatural%20environment%2C%20atmospheric%20horror%20aesthetic%2C%20moonlit%20night%20scene%20with%20ghostly%20ambiance&width=375&height=812&seq=ghost-bg&orientation=portrait)`
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-black/40"></div>
        </div>

        {/* Header */}
        <header className="fixed top-0 w-full bg-black/40 backdrop-blur-md z-50 border-b border-purple-800/30">
          <div className="px-4 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <i className="ri-arrow-left-line text-white text-xl mr-2"></i>
              <span className="text-white font-semibold">Ghost World</span>
            </Link>
            <div className="flex items-center space-x-3">
              <div className={`text-xs px-2 py-1 rounded-full ${isWitchingHour() ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300'}`}>
                {isWitchingHour() ? '🌙 Witching Hour' : '☀️ Daylight'}
              </div>
              <div className="text-white text-sm">{ghostShards} 💎</div>
            </div>
          </div>
        </header>

        <GhostRoster />

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 w-full bg-black/80 backdrop-blur-md border-t border-gray-800 z-50">
          <div className="grid grid-cols-5 px-0 py-2">
            <Link href="/" className="flex flex-col items-center py-2 text-gray-500">
              <i className="ri-home-4-line text-lg mb-1"></i>
              <span className="text-xs">Home</span>  
            </Link>
            <button 
              onClick={() => setActiveTab('hunt')}
              className="flex flex-col items-center py-2 text-gray-500"
            >
              <i className="ri-map-2-line text-lg mb-1"></i>
              <span className="text-xs">Hunt</span>
            </button>
            <button 
              onClick={() => setActiveTab('roster')}
              className="flex flex-col items-center py-2 text-purple-400"
            >
              <i className="ri-book-line text-lg mb-1"></i>
              <span className="text-xs">Roster</span>
            </button>
            <button className="flex flex-col items-center py-2 text-gray-500">
              <i className="ri-team-line text-lg mb-1"></i>
              <span className="text-xs">Guild</span>
            </button>
            <button 
              onClick={() => setIsProfileOpen(true)}
              className="flex flex-col items-center py-2 text-gray-500"
            >
              <i className="ri-user-line text-lg mb-1"></i>
              <span className="text-xs">Profile</span>
            </button>
          </div>
        </nav>

        <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 relative overflow-hidden">
      {/* Atmospheric Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: `url(https://readdy.ai/api/search-image?query=Dark%20misty%20cemetery%20atmosphere%20with%20fog%20rolling%20between%20tombstones%2C%20haunting%20gothic%20graveyard%20scene%20with%20ethereal%20mist%20and%20shadows%2C%20spooky%20supernatural%20environment%2C%20atmospheric%20horror%20aesthetic%2C%20moonlit%20night%20scene%20with%20ghostly%20ambiance&width=375&height=812&seq=ghost-bg&orientation=portrait)`
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-black/40"></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full bg-black/40 backdrop-blur-md z-50 border-b border-purple-800/30">
        <div className="px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <i className="ri-arrow-left-line text-white text-xl mr-2"></i>
            <span className="text-white font-semibold">Ghost World</span>
          </Link>
          <div className="flex items-center space-x-3">
            <div className={`text-xs px-2 py-1 rounded-full ${isWitchingHour() ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300'}`}>
              {isWitchingHour() ? '🌙 Witching Hour' : '☀️ Daylight'}
            </div>
            <div className="text-white text-sm">{ghostShards} 💎</div>
          </div>
        </div>
      </header>

      {/* AR Camera View Simulation */}
      <section className="pt-20 px-4 py-6 relative z-10">
        <div className="bg-black/60 border-2 border-purple-600/50 rounded-2xl p-4 mb-6">
          <div className="text-center mb-3">
            <div className="text-purple-400 text-sm font-semibold">AR Detection Mode</div>
            <div className="text-white text-xs">Point camera to reveal spirits</div>
          </div>
          <div 
            className="h-48 rounded-xl bg-cover bg-center relative overflow-hidden"
            style={{
              backgroundImage: `url(https://readdy.ai/api/search-image?query=AR%20camera%20view%20of%20dark%20street%20at%20night%20with%20ghostly%20apparitions%20appearing%20as%20translucent%20figures%2C%20supernatural%20entities%20visible%20through%20phone%20screen%20overlay%2C%20spooky%20augmented%20reality%20ghost%20hunting%20interface%2C%20ethereal%20spirits%20materializing%20in%20urban%20environment&width=300&height=180&seq=ar-view&orientation=landscape)`
            }}
          >
            <div className="absolute inset-0 bg-black/20 rounded-xl">
              <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                ● LIVE
              </div>
              <div className="absolute bottom-2 right-2 bg-purple-600/80 text-white text-xs px-2 py-1 rounded-full">
                3 spirits detected
              </div>
              {/* Ghost Detection Indicators */}
              <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-purple-400 rounded-full animate-ping"></div>
              <div className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-red-400 rounded-full animate-ping"></div>
              <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-blue-400 rounded-full animate-ping"></div>
            </div>
          </div>
          <div className="flex justify-center mt-3">
            <Link href="/ar-capture">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full font-semibold">
                Start Ghost Hunt
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Player Status */}
      <section className="px-4 py-4 relative z-10">
        <div className="bg-gray-800/70 border border-purple-700/50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-white font-semibold text-lg">{playerLevel}</div>
              <div className="text-purple-400 text-sm">Level 23 Exorcist</div>
            </div>
            <div className="text-right">
              <div className="text-white font-semibold">47 Ghosts Captured</div>
              <div className="text-gray-400 text-sm">12 Evolved Forms</div>
            </div>
          </div>
          <div className="bg-gray-700 rounded-full h-3 mb-2">
            <div className="bg-gradient-to-r from-purple-600 to-purple-400 h-3 rounded-full w-4/5"></div>
          </div>
          <div className="text-center text-purple-400 text-xs">2,340 / 3,000 XP to Spectral Lord</div>
        </div>
      </section>

      {/* Nearby Haunted Locations */}
      <section className="px-4 py-6 relative z-10">
        <h2 className="text-xl font-bold text-white mb-4">Nearby Haunts</h2>
        <div className="space-y-3">
          {nearbyHaunts.map((haunt, index) => (
            <div key={index} className="bg-gray-800/70 border border-gray-700 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="text-white font-semibold">{haunt.location}</div>
                  <div className="text-gray-400 text-sm">{haunt.distance} away</div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-semibold ${getRarityColor(haunt.rarity)}`}>
                    {haunt.rarity}
                  </div>
                  <div className="text-gray-400 text-xs">{haunt.ghostCount} spirits</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className={`text-xs text-white px-2 py-1 rounded-full ${getDangerColor(haunt.danger)}`}>
                  {haunt.danger} Danger
                </div>
                <Link href="/location-battles">
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full text-sm">
                    Navigate
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ghost Collection */}
      <section className="px-4 py-6 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Your Ghost Collection</h2>
          <button 
            onClick={() => setActiveTab('roster')}
            className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-full text-sm"
          >
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {ghostTypes.map((ghost) => (
            <div 
              key={ghost.id}
              className={`bg-gray-800/70 border rounded-xl p-4 cursor-pointer transition-all ${
                activeGhost === ghost.id ? 'border-purple-500' : 'border-gray-700'
              }`}
              onClick={() => setActiveGhost(activeGhost === ghost.id ? null : ghost.id)}
            >
              <div className="flex items-center space-x-4">
                <div 
                  className="w-16 h-16 rounded-xl bg-cover bg-center flex-shrink-0"
                  style={{
                    backgroundImage: `url(https://readdy.ai/api/search-image?query=$%7Bghost.image%7D&width=64&height=64&seq=${ghost.id}-portrait&orientation=squarish)`
                  }}
                >
                  <div className="w-full h-full bg-black/30 rounded-xl"></div>
                </div>
                <div className="flex-1">
                  <div className="text-white font-semibold">{ghost.name}</div>
                  <div className={`text-sm font-semibold ${getRarityColor(ghost.rarity)}`}>
                    {ghost.rarity}
                  </div>
                  <div className="text-gray-400 text-xs">{ghost.location}</div>
                </div>
                <div className="text-right">
                  <div className="text-purple-400 text-sm font-semibold">{ghost.power}</div>
                  <div className="text-gray-400 text-xs">Special Ability</div>
                </div>
              </div>
              
              {activeGhost === ghost.id && (
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    {evolutionChain.map((stage, index) => (
                      <div key={index} className="text-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-1 ${
                          index <= 1 ? 'bg-purple-600' : 'bg-gray-700'
                        }`}>
                          <span className="text-sm">{stage.icon}</span>
                        </div>
                        <div className="text-white text-xs">{stage.stage}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-sm">
                      Evolve
                    </button>
                    <button className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg text-sm">
                      Release
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Exorcism Tools */}
      <section className="px-4 py-6 relative z-10">
        <h2 className="text-xl font-bold text-white mb-4">Exorcism Arsenal</h2>
        <div className="grid grid-cols-2 gap-3">
          {exorcismTools.map((tool, index) => (
            <div key={index} className="bg-gray-800/70 border border-gray-700 rounded-xl p-4">
              <div className="text-center mb-3">
                <div 
                  className="w-12 h-12 mx-auto rounded-xl bg-cover bg-center mb-2"
                  style={{
                    backgroundImage: `url(https://readdy.ai/api/search-image?query=Mystical%20$%7Btool.name.toLowerCase%28%29%7D%20with%20glowing%20supernatural%20energy%2C%20sacred%20religious%20artifact%20with%20holy%20aura%2C%20detailed%203D%20rendering%20with%20magical%20effects%2C%20isolated%20on%20dark%20background%2C%20centered%20composition%2C%20gothic%20aesthetic&width=48&height=48&seq=${tool.name.toLowerCase().replace(' ', '-')}&orientation=squarish)`
                  }}
                >
                  <div className="w-full h-full bg-gradient-to-br from-yellow-400/20 to-white/10 rounded-xl"></div>
                </div>
                <div className="text-white font-semibold text-sm">{tool.name}</div>
                <div className="text-purple-400 text-xs">{tool.type}</div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Power</span>
                  <span className="text-white">{tool.power}/100</span>
                </div>
                <div className="bg-gray-700 rounded-full h-1">
                  <div 
                    className="bg-gradient-to-r from-yellow-600 to-yellow-400 h-1 rounded-full"
                    style={{ width: `${tool.power}%` }}
                  ></div>
                </div>
                <div className="text-center text-gray-400 text-xs">{tool.uses} uses left</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Guild Wars */}
      <section className="px-4 py-6 relative z-10">
        <div className="bg-gradient-to-r from-red-900/50 to-purple-900/50 rounded-2xl p-6 border border-red-800/50">
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold text-white mb-2">Guild Confrontation</h3>
            <p className="text-gray-300 text-sm">Exorcists vs Necromancers</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-blue-900/30 border border-blue-700 rounded-xl p-3">
              <div className="text-center">
                <div className="text-2xl mb-1">⚡</div>
                <div className="text-white font-semibold text-sm">Exorcists</div>
                <div className="text-blue-400 text-xs">Banish Evil</div>
                <div className="text-white text-lg font-bold mt-1">1,847</div>
                <div className="text-gray-400 text-xs">Active Members</div>
              </div>
            </div>
            
            <div className="bg-purple-900/30 border border-purple-700 rounded-xl p-3">
              <div className="text-center">
                <div className="text-2xl mb-1">💀</div>
                <div className="text-white font-semibold text-sm">Necromancers</div>
                <div className="text-purple-400 text-xs">Control Undead</div>
                <div className="text-white text-lg font-bold mt-1">1,523</div>
                <div className="text-gray-400 text-xs">Active Members</div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-gray-700 rounded-full h-2 mb-2">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full w-3/5"></div>
            </div>
            <div className="text-white text-sm mb-3">Territory Control: 62% Exorcists</div>
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-semibold">
              Join Battle
            </button>
          </div>
        </div>
      </section>

      {/* Boss Raid */}
      <section className="px-4 py-6 relative z-10">
        <div className="bg-black/70 border-2 border-red-600/50 rounded-2xl p-6">
          <div className="text-center mb-4">
            <div className="text-3xl mb-2">🌙</div>
            <h3 className="text-xl font-bold text-white mb-2">Blood Moon Wraith</h3>
            <p className="text-red-400 text-sm">Global Boss Raid - 2h 15m remaining</p>
          </div>
          
          <div 
            className="h-32 rounded-xl bg-cover bg-center mb-4 relative overflow-hidden"
            style={{
              backgroundImage: `url(https://readdy.ai/api/search-image?query=Massive%20ghostly%20wraith%20boss%20with%20blood%20red%20aura%20floating%20above%20city%20skyline%2C%20gigantic%20supernatural%20entity%20with%20flowing%20dark%20energy%2C%20epic%20boss%20battle%20scene%20with%20multiple%20players%20fighting%2C%20cinematic%20horror%20aesthetic%20with%20dramatic%20lighting&width=300&height=120&seq=boss-wraith&orientation=landscape)`
            }}
          >
            <div className="h-full bg-black/40 rounded-xl flex items-end justify-center pb-3">
              <div className="text-center">
                <div className="text-white font-bold text-lg">12,847 Hunters Joined</div>
                <div className="text-red-400 text-sm">Boss Health: 23%</div>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold">
              Join Raid
            </button>
            <button className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-xl font-semibold">
              Spectate
            </button>
          </div>
        </div>
      </section>

      {/* Popular Ghost Locations */}
      <section className="px-4 py-6 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Popular Locations</h2>
          <Link href="/location-battles" className="text-purple-400 text-sm">View All</Link>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800/50 rounded-xl p-4 border border-purple-600/30">
            <div 
              className="h-24 rounded-lg bg-cover bg-center mb-3"
              style={{
                backgroundImage: `url(https://readdy.ai/api/search-image?query=Spooky%20abandoned%20cemetery%20at%20night%20with%20glowing%20purple%20mist%2C%20ghostly%20atmosphere%20with%20tombstones%20and%20ethereal%20fog%2C%20supernatural%20graveyard%20environment%20perfect%20for%20ghost%20hunting&width=150&height=90&seq=cemetery-location&orientation=landscape)`
              }}
            >
              <div className="w-full h-full bg-black/40 rounded-lg flex items-end">
                <div className="p-2">
                  <div className="text-white text-sm font-bold">Whispering Cemetery</div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-purple-400 text-xs">5 Ghost Types</div>
                <div className="text-gray-400 text-xs">2.3km away</div>
              </div>
              <Link href="/location-battles">
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full text-sm">
                  Navigate
                </button>
              </Link>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-4 border border-purple-600/30">
            <div 
              className="h-24 rounded-lg bg-cover bg-center mb-3"
              style={{
                backgroundImage: `url(https://readdy.ai/api/search-image?query=Haunted%20mansion%20at%20midnight%20with%20glowing%20windows%2C%20spooky%20Victorian%20house%20with%20supernatural%20aura%20and%20ghostly%20presence%2C%20abandoned%20building%20perfect%20for%20ghost%20encounters&width=150&height=90&seq=mansion-location&orientation=landscape)`
              }}
            >
              <div className="w-full h-full bg-black/40 rounded-lg flex items-end">
                <div className="p-2">
                  <div className="text-white text-sm font-bold">Haunted Manor</div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-purple-400 text-xs">8 Ghost Types</div>
                <div className="text-gray-400 text-xs">1.8km away</div>
              </div>
              <Link href="/location-battles">
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full text-sm">
                  Navigate
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-black/80 backdrop-blur-md border-t border-gray-800 z-50">
        <div className="grid grid-cols-5 px-0 py-2">
          <Link href="/" className="flex flex-col items-center py-2 text-gray-500">
            <i className="ri-home-4-line text-lg mb-1"></i>
            <span className="text-xs">Home</span>  
          </Link>
          <button 
            onClick={() => setActiveTab('hunt')}
            className="flex flex-col items-center py-2 text-purple-400"
          >
            <i className="ri-map-2-line text-lg mb-1"></i>
            <span className="text-xs">Hunt</span>
          </button>
          <button 
            onClick={() => setActiveTab('roster')}
            className="flex flex-col items-center py-2 text-gray-500"
          >
            <i className="ri-book-line text-lg mb-1"></i>
            <span className="text-xs">Roster</span>
          </button>
          <button className="flex flex-col items-center py-2 text-gray-500">
            <i className="ri-team-line text-lg mb-1"></i>
            <span className="text-xs">Guild</span>
          </button>
          <button 
            onClick={() => setIsProfileOpen(true)}
            className="flex flex-col items-center py-2 text-gray-500"
          >
            <i className="ri-user-line text-lg mb-1"></i>
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </nav>

      <div className="h-20 relative z-10"></div>

      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </div>
  );
}