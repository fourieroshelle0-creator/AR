'use client';

import { useState } from 'react';

interface CardMockup {
  id: string;
  name: string;
  type: 'blank' | 'relic';
  rarity: string;
  element?: string;
  visualConcept: string;
  physicalSpecs: {
    material: string;
    surface: string;
    frame: string;
    effects: string[];
  };
  monster?: {
    name: string;
    element: string;
    power: number;
    defense: number;
    level: number;
  };
}

export default function CardMockups() {
  const [selectedCard, setSelectedCard] = useState<string>('basic-blank');
  const [viewMode, setViewMode] = useState<'concept' | 'physical' | 'comparison'>('concept');

  const cardMockups: CardMockup[] = [
    // BLANK CARDS
    {
      id: 'basic-blank',
      name: 'Basic Blank Card',
      type: 'blank',
      rarity: 'Common',
      visualConcept: 'Perfect mirror surface reflecting environment with minimalist silver border and corner runes',
      physicalSpecs: {
        material: 'Polished silver mirror finish',
        surface: 'Reflective like liquid metal with swirling mist beneath',
        frame: 'Simple etched silver border with four corner runes',
        effects: ['Mirror reflection', 'Faint mist swirls', 'Rune pulse when monsters detected']
      }
    },
    {
      id: 'enhanced-blank',
      name: 'Enhanced Blank Card',
      type: 'blank',
      rarity: 'Rare',
      visualConcept: 'Deep blue crystal surface with galaxy patterns and sapphire gem accents at corners',
      physicalSpecs: {
        material: 'Prismatic crystal with mystical energy',
        surface: 'Deep blue with cosmic galaxy patterns visible in depths',
        frame: 'Ornate silver filigree with sapphire corner gems',
        effects: ['Cosmic swirls', 'Heartbeat pulse', 'Starlight reflections']
      }
    },
    {
      id: 'master-blank',
      name: 'Master Blank Card',
      type: 'blank',
      rarity: 'Epic',
      visualConcept: 'Obsidian mirror with molten gold veins and dragon script around the border',
      physicalSpecs: {
        material: 'Obsidian mirror with molten gold veins',
        surface: 'Portal-like depth showing glimpses of monster realms',
        frame: 'Ancient dragon script with ouroboros serpent motifs',
        effects: ['Gold vein pulse', 'Portal glimpses', 'Deep thrumming vibration']
      }
    },
    {
      id: 'divine-blank',
      name: 'Divine Blank Card',
      type: 'blank',
      rarity: 'Legendary',
      visualConcept: 'Opalescent crystal with rainbow aurora and miniature galaxy rotating in infinite depths',
      physicalSpecs: {
        material: 'Opalescent crystal shifting through aurora spectrum',
        surface: 'Miniature galaxy rotating slowly in infinite depths',
        frame: 'Platinum with diamond accents and celestial wing motifs',
        effects: ['Aurora spectrum shift', 'Galaxy rotation', 'Harmonious choir resonance']
      }
    },

    // SUMMON RELICS
    {
      id: 'flare-drake-relic',
      name: 'Flare Drake Summon Relic',
      type: 'relic',
      rarity: 'Rare',
      element: 'Fire',
      visualConcept: 'Young fire dragon with molten lava veins in crimson crystal card with jagged volcanic border',
      physicalSpecs: {
        material: 'Crimson crystal with pulsing lava veins',
        surface: 'Semi-3D holographic dragon that shifts when tilted',
        frame: 'Jagged volcanic rock edges with glowing orange/red cracks',
        effects: ['Dragon blinks and roars', 'Lava veins pulse', 'Heat shimmer around edges']
      },
      monster: {
        name: 'Flare Drake',
        element: 'Fire',
        power: 2400,
        defense: 1800,
        level: 18
      }
    },
    {
      id: 'stone-golem-relic',
      name: 'Stone Golem Summon Relic',
      type: 'relic',
      rarity: 'Epic',
      element: 'Earth',
      visualConcept: 'Massive granite guardian with crystal heart in living moss-covered stone frame',
      physicalSpecs: {
        material: 'Living granite with actual moss growing on frame',
        surface: 'Semi-3D golem shifting between sitting and standing poses',
        frame: 'Weathered stone border with living moss and glowing yellow runes',
        effects: ['Golem nods slowly', 'Crystal heart pulses', 'Moss sways in unfelt breeze']
      },
      monster: {
        name: 'Stone Golem',
        element: 'Earth',
        power: 2100,
        defense: 3200,
        level: 22
      }
    },
    {
      id: 'umbra-fiend-relic',
      name: 'Umbra Fiend Summon Relic',
      type: 'relic',
      rarity: 'Epic',
      element: 'Shadow',
      visualConcept: 'Mischievous imp phasing between solid and smoke in obsidian frame leaking purple mist',
      physicalSpecs: {
        material: 'Obsidian with purple cracks leaking shadow mist',
        surface: 'Semi-3D imp phasing between solid and smoke form',
        frame: 'Black obsidian with actual purple cracks leaking real shadow mist',
        effects: ['Imp grins and waves', 'Phases in and out', 'Purple mist tendrils reach toward viewer']
      },
      monster: {
        name: 'Umbra Fiend',
        element: 'Shadow',
        power: 2600,
        defense: 1600,
        level: 20
      }
    },
    {
      id: 'celestial-phoenix-relic',
      name: 'Celestial Phoenix Summon Relic',
      type: 'relic',
      rarity: 'Legendary',
      element: 'Light',
      visualConcept: 'Divine phoenix in eternal flight within pure crystal containing miniature sun',
      physicalSpecs: {
        material: 'Pure crystal containing miniature sun',
        surface: 'Phoenix in eternal flight with solar flames',
        frame: 'Radiant platinum with celestial script and wing motifs',
        effects: ['Phoenix circles continuously', 'Solar flares pulse', 'Divine light emanates']
      },
      monster: {
        name: 'Celestial Phoenix',
        element: 'Light',
        power: 4200,
        defense: 3800,
        level: 35
      }
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'from-gray-400 to-gray-600 border-gray-500';
      case 'Rare': return 'from-blue-400 to-blue-600 border-blue-500';
      case 'Epic': return 'from-purple-400 to-purple-600 border-purple-500';
      case 'Legendary': return 'from-orange-400 to-orange-600 border-orange-500';
      default: return 'from-gray-400 to-gray-600 border-gray-500';
    }
  };

  const getElementColor = (element?: string) => {
    if (!element) return 'from-gray-500 to-gray-700';
    switch (element) {
      case 'Fire': return 'from-red-500 to-orange-600';
      case 'Earth': return 'from-green-500 to-emerald-600';
      case 'Shadow': return 'from-purple-500 to-purple-700';
      case 'Light': return 'from-yellow-400 to-yellow-600';
      default: return 'from-gray-500 to-gray-700';
    }
  };

  const selectedCardData = cardMockups.find(card => card.id === selectedCard)!;

  return (
    <div className="min-h-screen bg-gray-950 pt-20 pb-24 relative overflow-hidden">
      {/* Atmospheric Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-black/40"></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full bg-black/40 backdrop-blur-md z-50 border-b border-purple-800/30">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <i className="ri-arrow-left-line text-white text-xl mr-2"></i>
            <span className="text-white font-semibold">Card Design Mockups</span>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setViewMode(viewMode === 'concept' ? 'physical' : viewMode === 'physical' ? 'comparison' : 'concept')}
              className="text-white text-sm"
            >
              {viewMode === 'concept' ? '🎨' : viewMode === 'physical' ? '🔬' : '⚖️'}
            </button>
          </div>
        </div>
      </header>

      {/* View Mode Toggle */}
      <section className="pt-20 px-4 py-4 relative z-10">
        <div className="flex bg-gray-800/50 rounded-xl p-1 mb-6">
          <button
            onClick={() => setViewMode('concept')}
            className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all ${
              viewMode === 'concept' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            🎨 Visual Concepts
          </button>
          <button
            onClick={() => setViewMode('physical')}
            className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all ${
              viewMode === 'physical' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            🔬 Physical Specs
          </button>
          <button
            onClick={() => setViewMode('comparison')}
            className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all ${
              viewMode === 'comparison' ? 'bg-green-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            ⚖️ Side by Side
          </button>
        </div>
      </section>

      {/* Card Selection Grid */}
      <section className="px-4 py-6 relative z-10">
        <h2 className="text-xl font-bold text-white mb-4">Select Card Design</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {cardMockups.map((card) => (
            <button
              key={card.id}
              onClick={() => setSelectedCard(card.id)}
              className={`p-3 rounded-xl border-2 transition-all ${
                selectedCard === card.id
                  ? 'border-purple-400 bg-purple-900/30'
                  : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">
                  {card.type === 'blank' ? '📜' : 
                   card.element === 'Fire' ? '🔥' : 
                   card.element === 'Earth' ? '⛰️' : 
                   card.element === 'Shadow' ? '🌑' : 
                   card.element === 'Light' ? '✨' : '🎴'}
                </div>
                <div className="text-white font-semibold text-sm mb-1">{card.name}</div>
                <div className={`text-xs px-2 py-1 rounded-full border ${getRarityColor(card.rarity)}`}>
                  {card.rarity}
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {viewMode === 'concept' && (
        <section className="px-4 py-6 relative z-10">
          {/* Selected Card Concept Display */}
          <div className={`bg-gradient-to-r ${getRarityColor(selectedCardData.rarity).split('border-')[0]} bg-opacity-20 border-2 ${getRarityColor(selectedCardData.rarity).split(' ')[2]} rounded-2xl p-6 mb-6`}>
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">
                {selectedCardData.type === 'blank' ? '📜' : 
                 selectedCardData.element === 'Fire' ? '🔥' : 
                 selectedCardData.element === 'Earth' ? '⛰️' : 
                 selectedCardData.element === 'Shadow' ? '🌑' : 
                 selectedCardData.element === 'Light' ? '✨' : '🎴'}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{selectedCardData.name}</h3>
              <div className="flex justify-center space-x-3">
                <div className={`text-xs px-3 py-1 rounded-full border ${getRarityColor(selectedCardData.rarity)}`}>
                  {selectedCardData.rarity}
                </div>
                {selectedCardData.element && (
                  <div className={`text-xs px-3 py-1 rounded-full bg-gradient-to-r ${getElementColor(selectedCardData.element)} text-white`}>
                    {selectedCardData.element}
                  </div>
                )}
              </div>
            </div>

            {/* Card Visual Mockup */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div 
                  className={`w-56 h-80 rounded-2xl border-4 bg-gradient-to-br shadow-2xl relative overflow-hidden ${getRarityColor(selectedCardData.rarity).split('border-')[0]}`}
                  style={{
                    borderColor: selectedCardData.rarity === 'Legendary' ? '#f97316' :
                                 selectedCardData.rarity === 'Epic' ? '#a855f7' :
                                 selectedCardData.rarity === 'Rare' ? '#3b82f6' : '#6b7280',
                    boxShadow: `0 0 40px ${
                      selectedCardData.rarity === 'Legendary' ? 'rgba(249, 115, 22, 0.6)' :
                      selectedCardData.rarity === 'Epic' ? 'rgba(168, 85, 247, 0.6)' :
                      selectedCardData.rarity === 'Rare' ? 'rgba(59, 130, 246, 0.6)' : 'rgba(107, 114, 128, 0.6)'
                    }, inset 0 0 30px rgba(255, 255, 255, 0.1)`
                  }}
                >
                  {/* Card Content Area */}
                  <div className="w-full h-full rounded-xl relative">
                    {selectedCardData.type === 'blank' ? (
                      // BLANK CARD DESIGNS
                      <div>
                        {selectedCardData.id === 'basic-blank' && (
                          <div 
                            className="w-full h-full bg-cover bg-center rounded-xl"
                            style={{
                              backgroundImage: `url(https://readdy.ai/api/search-image?query=Perfect%20mirror%20surface%20reflecting%20environment%20with%20minimalist%20silver%20border%20and%20glowing%20corner%20runes%2C%20polished%20metal%20card%20with%20liquid%20mercury%20finish%2C%20mystical%20blank%20card%20ready%20for%20monster%20capture%2C%20ethereal%20mist%20swirling%20beneath%20reflective%20surface&width=210&height=300&seq=basic-blank-mockup&orientation=portrait)`
                            }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent transform rotate-45 animate-pulse rounded-xl"></div>
                            <div className="absolute inset-4 border border-gray-400/30 rounded-lg">
                              <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-gray-400/50"></div>
                              <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-gray-400/50"></div>
                              <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-gray-400/50"></div>
                              <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-gray-400/50"></div>
                            </div>
                            <div className="absolute bottom-4 left-4 right-4 text-center">
                              <div className="text-white text-xs font-bold bg-black/50 px-2 py-1 rounded">BLANK CARD</div>
                              <div className="text-gray-300 text-xs mt-1">Ready for Essence</div>
                            </div>
                          </div>
                        )}
                        
                        {selectedCardData.id === 'enhanced-blank' && (
                          <div 
                            className="w-full h-full bg-cover bg-center rounded-xl"
                            style={{
                              backgroundImage: `url(https://readdy.ai/api/search-image?query=Deep%20blue%20prismatic%20crystal%20card%20with%20cosmic%20galaxy%20patterns%20and%20sapphire%20gem%20accents%20at%20corners%2C%20mystical%20energy%20swirling%20within%20depths%2C%20ornate%20silver%20filigree%20border%2C%20enhanced%20blank%20card%20with%20starlight%20reflections&width=210&height=300&seq=enhanced-blank-mockup&orientation=portrait)`
                            }}
                          >
                            <div className="absolute inset-0 bg-blue-500/20 rounded-xl">
                              <div className="absolute inset-2 border-2 border-blue-400/50 rounded-lg">
                                <div className="absolute top-1 left-1 w-4 h-4 bg-blue-600 rounded-full opacity-80"></div>
                                <div className="absolute top-1 right-1 w-4 h-4 bg-blue-600 rounded-full opacity-80"></div>
                                <div className="absolute bottom-1 left-1 w-4 h-4 bg-blue-600 rounded-full opacity-80"></div>
                                <div className="absolute bottom-1 right-1 w-4 h-4 bg-blue-600 rounded-full opacity-80"></div>
                              </div>
                              <div className="absolute bottom-4 left-4 right-4 text-center">
                                <div className="text-blue-300 text-xs font-bold bg-black/50 px-2 py-1 rounded">ENHANCED BLANK</div>
                                <div className="text-blue-200 text-xs mt-1">Cosmic Resonance</div>
                              </div>
                            </div>
                          </div>
                        )}

                        {selectedCardData.id === 'master-blank' && (
                          <div 
                            className="w-full h-full bg-cover bg-center rounded-xl"
                            style={{
                              backgroundImage: `url(https://readdy.ai/api/search-image?query=Obsidian%20mirror%20card%20with%20molten%20gold%20veins%20running%20through%20surface%20and%20ancient%20dragon%20script%20border%2C%20portal-like%20depth%20showing%20glimpses%20of%20monster%20realms%2C%20ouroboros%20serpent%20motifs%2C%20dark%20mystical%20blank%20card%20with%20golden%20energy&width=210&height=300&seq=master-blank-mockup&orientation=portrait)`
                            }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 via-transparent to-purple-900/30 rounded-xl">
                              <div className="absolute inset-2 border-2 border-yellow-600/50 rounded-lg" style={{
                                borderImage: 'repeating-linear-gradient(45deg, transparent, transparent 5px, #ca8a04 5px, #ca8a04 10px) 2'
                              }}>
                              </div>
                              <div className="absolute bottom-4 left-4 right-4 text-center">
                                <div className="text-yellow-400 text-xs font-bold bg-black/50 px-2 py-1 rounded">MASTER BLANK</div>
                                <div className="text-yellow-300 text-xs mt-1">Portal Depths</div>
                              </div>
                            </div>
                          </div>
                        )}

                        {selectedCardData.id === 'divine-blank' && (
                          <div 
                            className="w-full h-full bg-cover bg-center rounded-xl"
                            style={{
                              backgroundImage: `url(https://readdy.ai/api/search-image?query=Opalescent%20crystal%20card%20shifting%20through%20rainbow%20aurora%20spectrum%20with%20miniature%20galaxy%20rotating%20in%20infinite%20depths%2C%20platinum%20border%20with%20diamond%20accents%20and%20celestial%20wing%20motifs%2C%20divine%20blank%20card%20with%20harmonious%20energy%2C%20aurora%20borealis%20effects&width=210&height=300&seq=divine-blank-mockup&orientation=portrait)`
                            }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 via-blue-400/20 to-purple-400/20 rounded-xl animate-pulse">
                              <div className="absolute inset-2 border-2 border-white/70 rounded-lg" style={{
                                background: 'linear-gradient(45deg, #ec4899, #3b82f6, #8b5cf6, #ec4899)',
                                backgroundSize: '400% 400%',
                                animation: 'gradient 3s ease infinite'
                              }}>
                              </div>
                              <div className="absolute bottom-4 left-4 right-4 text-center">
                                <div className="text-white text-xs font-bold bg-black/50 px-2 py-1 rounded">DIVINE BLANK</div>
                                <div className="text-pink-200 text-xs mt-1">Celestial Harmony</div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      // SUMMON RELIC DESIGNS
                      <div>
                        {selectedCardData.id === 'flare-drake-relic' && (
                          <div 
                            className="w-full h-full bg-cover bg-center rounded-xl"
                            style={{
                              backgroundImage: `url(https://readdy.ai/api/search-image?query=Young%20fire%20dragon%20with%20molten%20lava%20veins%20and%20crystalline%20scales%20in%20crimson%20crystal%20card%2C%20semi-3D%20holographic%20dragon%20artwork%20that%20shifts%20when%20viewed%2C%20jagged%20volcanic%20rock%20border%20with%20glowing%20orange%20cracks%2C%20epic%20monster%20trading%20card%20design&width=210&height=300&seq=flare-drake-relic-mockup&orientation=portrait)`
                            }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 rounded-xl">
                              <div className="absolute top-3 left-3 right-3 text-center">
                                <div className="text-white font-bold text-sm">Flare Drake</div>
                                <div className="text-red-300 text-xs">Fire Dragon • Lv.18</div>
                              </div>
                              
                              <div className="absolute bottom-3 left-3 right-3">
                                <div className="flex justify-between mb-2">
                                  <div className="bg-red-600/80 text-white text-xs px-2 py-1 rounded">
                                    ATK: 2400
                                  </div>
                                  <div className="bg-blue-600/80 text-white text-xs px-2 py-1 rounded">
                                    DEF: 1800
                                  </div>
                                </div>
                                <div className="text-center">
                                  <div className="text-yellow-400 text-xs font-semibold">✦ SUMMON RELIC ✦</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {selectedCardData.id === 'stone-golem-relic' && (
                          <div 
                            className="w-full h-full bg-cover bg-center rounded-xl"
                            style={{
                              backgroundImage: `url(https://readdy.ai/api/search-image?query=Massive%20granite%20guardian%20with%20glowing%20crystal%20heart%20and%20ancient%20runes%2C%20living%20moss%20growing%20on%20weathered%20stone%20frame%2C%20semi-3D%20golem%20shifting%20between%20poses%2C%20earth%20elemental%20summon%20relic%20card%20with%20mystical%20blue%20energy&width=210&height=300&seq=stone-golem-relic-mockup&orientation=portrait)`
                            }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 rounded-xl">
                              <div className="absolute top-3 left-3 right-3 text-center">
                                <div className="text-white font-bold text-sm">Stone Golem</div>
                                <div className="text-green-300 text-xs">Earth Guardian • Lv.22</div>
                              </div>
                              
                              <div className="absolute bottom-3 left-3 right-3">
                                <div className="flex justify-between mb-2">
                                  <div className="bg-red-600/80 text-white text-xs px-2 py-1 rounded">
                                    ATK: 2100
                                  </div>
                                  <div className="bg-blue-600/80 text-white text-xs px-2 py-1 rounded">
                                    DEF: 3200
                                  </div>
                                </div>
                                <div className="text-center">
                                  <div className="text-yellow-400 text-xs font-semibold">✦ SUMMON RELIC ✦</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {selectedCardData.id === 'umbra-fiend-relic' && (
                          <div 
                            className="w-full h-full bg-cover bg-center rounded-xl"
                            style={{
                              backgroundImage: `url(https://readdy.ai/api/search-image?query=Mischievous%20shadow%20imp%20phasing%20between%20solid%20and%20smoke%20form%2C%20obsidian%20frame%20with%20purple%20cracks%20leaking%20shadow%20mist%2C%20semi-3D%20demon%20creature%20that%20grins%20and%20waves%2C%20dark%20magic%20summon%20relic%20card%20with%20supernatural%20effects&width=210&height=300&seq=umbra-fiend-relic-mockup&orientation=portrait)`
                            }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 rounded-xl">
                              <div className="absolute top-3 left-3 right-3 text-center">
                                <div className="text-white font-bold text-sm">Umbra Fiend</div>
                                <div className="text-purple-300 text-xs">Shadow Demon • Lv.20</div>
                              </div>
                              
                              <div className="absolute bottom-3 left-3 right-3">
                                <div className="flex justify-between mb-2">
                                  <div className="bg-red-600/80 text-white text-xs px-2 py-1 rounded">
                                    ATK: 2600
                                  </div>
                                  <div className="bg-blue-600/80 text-white text-xs px-2 py-1 rounded">
                                    DEF: 1600
                                  </div>
                                </div>
                                <div className="text-center">
                                  <div className="text-yellow-400 text-xs font-semibold">✦ SUMMON RELIC ✦</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {selectedCardData.id === 'celestial-phoenix-relic' && (
                          <div 
                            className="w-full h-full bg-cover bg-center rounded-xl"
                            style={{
                              backgroundImage: `url(https://readdy.ai/api/search-image?query=Divine%20phoenix%20in%20eternal%20flight%20within%20pure%20crystal%20containing%20miniature%20sun%2C%20radiant%20platinum%20border%20with%20celestial%20wing%20motifs%2C%20legendary%20light%20elemental%20with%20solar%20flames%2C%20magnificent%20phoenix%20summon%20relic%20card%20with%20divine%20energy&width=210&height=300&seq=celestial-phoenix-relic-mockup&orientation=portrait)`
                            }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 rounded-xl">
                              <div className="absolute top-3 left-3 right-3 text-center">
                                <div className="text-white font-bold text-sm">Celestial Phoenix</div>
                                <div className="text-yellow-300 text-xs">Divine Beast • Lv.35</div>
                              </div>
                              
                              <div className="absolute bottom-3 left-3 right-3">
                                <div className="flex justify-between mb-2">
                                  <div className="bg-red-600/80 text-white text-xs px-2 py-1 rounded">
                                    ATK: 4200
                                  </div>
                                  <div className="bg-blue-600/80 text-white text-xs px-2 py-1 rounded">
                                    DEF: 3800
                                  </div>
                                </div>
                                <div className="text-center">
                                  <div className="text-orange-400 text-xs font-semibold">★ LEGENDARY RELIC ★</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* Holographic Border Effect */}
                  <div className="absolute -inset-2 border-2 border-white/20 rounded-3xl animate-pulse"></div>
                  <div className="absolute -inset-4 border border-purple-400/20 rounded-full animate-spin-slow"></div>
                </div>
              </div>
            </div>

            {/* Visual Concept Description */}
            <div className="bg-gray-800/50 rounded-xl p-4">
              <div className="text-purple-400 font-semibold mb-2">Visual Concept</div>
              <div className="text-gray-300 text-sm">{selectedCardData.visualConcept}</div>
            </div>
          </div>
        </section>
      )}

      {viewMode === 'physical' && (
        <section className="px-4 py-6 relative z-10">
          <div className="bg-gray-900/80 border-2 border-blue-600 rounded-2xl p-6">
            <div className="text-center mb-6">
              <div className="text-3xl mb-2">🔬</div>
              <h3 className="text-xl font-bold text-white mb-2">Physical Specifications</h3>
              <p className="text-blue-300 text-sm">{selectedCardData.name}</p>
            </div>

            <div className="space-y-4">
              <div className="bg-blue-900/30 rounded-lg p-4">
                <div className="text-blue-400 font-semibold mb-2">Material Construction</div>
                <div className="text-gray-300 text-sm">{selectedCardData.physicalSpecs.material}</div>
              </div>

              <div className="bg-purple-900/30 rounded-lg p-4">
                <div className="text-purple-400 font-semibold mb-2">Surface Properties</div>
                <div className="text-gray-300 text-sm">{selectedCardData.physicalSpecs.surface}</div>
              </div>

              <div className="bg-green-900/30 rounded-lg p-4">
                <div className="text-green-400 font-semibold mb-2">Frame Design</div>
                <div className="text-gray-300 text-sm">{selectedCardData.physicalSpecs.frame}</div>
              </div>

              <div className="bg-orange-900/30 rounded-lg p-4">
                <div className="text-orange-400 font-semibold mb-2">Special Effects</div>
                <div className="text-gray-300 text-sm space-y-1">
                  {selectedCardData.physicalSpecs.effects.map((effect, index) => (
                    <div key={index} className="ml-2">• {effect}</div>
                  ))}
                </div>
              </div>

              {selectedCardData.monster && (
                <div className="bg-red-900/30 rounded-lg p-4">
                  <div className="text-red-400 font-semibold mb-2">Monster Data</div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-white font-semibold">{selectedCardData.monster.name}</div>
                      <div className="text-gray-300">Level {selectedCardData.monster.level}</div>
                    </div>
                    <div>
                      <div className="text-gray-300">{selectedCardData.monster.element} Element</div>
                      <div className="text-gray-300">{selectedCardData.monster.power}/{selectedCardData.monster.defense}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {viewMode === 'comparison' && (
        <section className="px-4 py-6 relative z-10">
          <div className="bg-gray-900/80 border-2 border-green-600 rounded-2xl p-6">
            <div className="text-center mb-6">
              <div className="text-3xl mb-2">⚖️</div>
              <h3 className="text-xl font-bold text-white mb-2">Blank vs Relic Comparison</h3>
              <p className="text-green-300 text-sm">See the transformation process</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {/* Before: Blank Card */}
              <div className="bg-gray-800/50 rounded-xl p-4">
                <div className="text-center mb-4">
                  <div className="text-gray-300 font-semibold">BEFORE: Blank Card</div>
                  <div className="text-gray-400 text-sm">Ready for monster essence</div>
                </div>
                
                <div className="flex justify-center mb-4">
                  <div 
                    className="w-40 h-56 rounded-xl bg-cover bg-center border-2 border-gray-500"
                    style={{
                      backgroundImage: `url(https://readdy.ai/api/search-image?query=Perfect%20mirror%20surface%20blank%20card%20reflecting%20environment%20with%20mystical%20silver%20border%2C%20polished%20reflective%20card%20ready%20for%20monster%20capture%2C%20ethereal%20mist%20beneath%20glass%20surface%2C%20empty%20magical%20card%20waiting%20for%20essence&width=150&height=210&seq=blank-before-mockup&orientation=portrait)`
                    }}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-transparent via-white/10 to-transparent rounded-xl"></div>
                  </div>
                </div>
                
                <div className="text-center text-gray-300 text-sm">
                  Mirror-like surface reflects reality while detecting monster energy nearby
                </div>
              </div>

              {/* Transformation Arrow */}
              <div className="flex justify-center">
                <div className="flex items-center space-x-2">
                  <div className="text-purple-400 text-sm">Monster Captured</div>
                  <i className="ri-arrow-down-line text-purple-400 text-2xl"></i>
                  <div className="text-purple-400 text-sm">Card Transforms</div>
                </div>
              </div>

              {/* After: Summon Relic */}
              <div className="bg-purple-800/50 rounded-xl p-4">
                <div className="text-center mb-4">
                  <div className="text-purple-300 font-semibold">AFTER: Summon Relic</div>
                  <div className="text-purple-400 text-sm">Monster essence sealed within</div>
                </div>
                
                <div className="flex justify-center mb-4">
                  <div 
                    className="w-40 h-56 rounded-xl bg-cover bg-center border-2 border-purple-500"
                    style={{
                      backgroundImage: `url(https://readdy.ai/api/search-image?query=Transformed%20summon%20relic%20card%20showing%20detailed%20monster%20artwork%20with%20elemental%20frame%20effects%2C%20holographic%20creature%20sealed%20within%20magical%20card%2C%20battle-ready%20monster%20relic%20with%20glowing%20energy%2C%20epic%20trading%20card%20transformation&width=150&height=210&seq=relic-after-mockup&orientation=portrait)`
                    }}
                  >
                    <div className="w-full h-full bg-gradient-to-t from-purple-900/30 to-transparent rounded-xl"></div>
                  </div>
                </div>
                
                <div className="text-center text-purple-300 text-sm">
                  Living artwork with monster that blinks, roars, and responds to viewing angle
                </div>
              </div>
            </div>

            {/* Transformation Benefits */}
            <div className="mt-6 bg-green-900/30 border border-green-700 rounded-lg p-4">
              <div className="text-green-400 font-semibold text-sm mb-3">✨ Transformation Benefits</div>
              <div className="grid grid-cols-1 gap-2 text-xs text-gray-300">
                <div>• Mirror surface becomes living artwork featuring captured monster</div>
                <div>• Element-specific frame design matches monster's power type</div>
                <div>• Semi-3D holographic effects - monster shifts and blinks when tilted</div>
                <div>• Battle-ready card for AR duels and summon sequences</div>
                <div>• Permanent bond between player and monster through card essence</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Technical Production Notes */}
      <section className="px-4 py-6 relative z-10 mb-20">
        <div className="bg-gray-800/50 rounded-xl p-4">
          <h3 className="text-white font-bold mb-3">🏭 Production Specifications</h3>
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-900/30 rounded-lg p-3">
                <div className="text-blue-400 font-semibold mb-1">Physical Dimensions</div>
                <div className="text-gray-300 text-xs space-y-1">
                  <div>• Standard: 6.3cm x 8.8cm (TCG size)</div>
                  <div>• Thickness: 0.8mm premium</div>
                  <div>• Weight: 2.5g per card</div>
                </div>
              </div>
              
              <div className="bg-purple-900/30 rounded-lg p-3">
                <div className="text-purple-400 font-semibold mb-1">Material Technology</div>
                <div className="text-gray-300 text-xs space-y-1">
                  <div>• Holographic foil lamination</div>
                  <div>• UV protection coating</div>
                  <div>• Embedded NFC chips</div>
                </div>
              </div>
            </div>
            
            <div className="bg-orange-900/30 rounded-lg p-3">
              <div className="text-orange-400 font-semibold mb-1">Manufacturing Process</div>
              <div className="text-gray-300 text-xs space-y-1">
                <div>• 8-color printing with metallic inks and glow-in-dark elements</div>
                <div>• Spot UV and foil stamping for premium texture and effects</div>
                <div>• Die-cut corners and embossed details for tactile experience</div>
                <div>• Scratch-resistant coating for durability during gameplay</div>
              </div>
            </div>
            
            <div className="bg-green-900/30 rounded-lg p-3">
              <div className="text-green-400 font-semibold mb-1">Quality Control</div>
              <div className="text-gray-300 text-xs space-y-1">
                <div>• Each card individually inspected for holographic alignment</div>
                <div>• NFC chip functionality tested before packaging</div>
                <div>• Color accuracy verified against digital mockups</div>
                <div>• Durability tested for 1000+ shuffle cycles</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}