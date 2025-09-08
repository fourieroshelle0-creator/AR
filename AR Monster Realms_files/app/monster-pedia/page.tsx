'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Monster {
  id: string;
  dexNumber: number;
  name: string;
  element: string;
  type: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';
  world: 'Ghost' | 'Monster' | 'Myth' | 'Alien';
  power: number;
  defense: number;
  speed: number;
  height: string;
  weight: string;
  habitat: string;
  discoveredDate: string;
  captureRate: number;
  status: 'captured' | 'seen' | 'unknown';
  captureCount: number;
  evolutionChain: string[];
  abilities: string[];
  description: string;
  behaviorNotes: string;
  weaknesses: string[];
  strengths: string[];
  image: string;
  firstSeenLocation?: string;
  captureDate?: string;
  bondLevel?: number;
  uniqueTraits: string[];
  weekAdded: number;
  isNewThisWeek: boolean;
}

export default function MonsterPedia() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWorld, setSelectedWorld] = useState<'all' | 'Ghost' | 'Monster' | 'Myth' | 'Alien'>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'captured' | 'seen' | 'unknown'>('all');
  const [sortBy, setSortBy] = useState<'dex' | 'name' | 'rarity' | 'recent'>('dex');
  const [selectedMonster, setSelectedMonster] = useState<Monster | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentWeek, setCurrentWeek] = useState(27);

  // Comprehensive Monster Database
  const monsterDatabase: Monster[] = [
    // Week 25 - Ghost World Monsters
    {
      id: 'ghost-001',
      dexNumber: 1,
      name: 'Whisper Shade',
      element: 'Shadow',
      type: 'Spirit',
      rarity: 'Common',
      world: 'Ghost',
      power: 400,
      defense: 300,
      speed: 80,
      height: '1.2m',
      weight: '0.1kg',
      habitat: 'Old Houses, Attics',
      discoveredDate: '2024-01-01',
      captureRate: 85,
      status: 'captured',
      captureCount: 3,
      evolutionChain: ['Whisper Shade', 'Echo Phantom', 'Void Wraith'],
      abilities: ['Phase Walk', 'Fear Whisper', 'Cold Touch'],
      description: 'A gentle spirit that appears in old houses. It feeds on forgotten memories and shows itself to lonely people seeking comfort.',
      behaviorNotes: 'Appears during twilight hours. Drawn to emotional distress. Can be calmed with warm light and kind words.',
      weaknesses: ['Light', 'Fire', 'Holy'],
      strengths: ['Dark', 'Psychic', 'Ice'],
      image: 'Translucent ghostly figure with wispy form floating in old Victorian house, gentle spirit with soft glowing eyes, ethereal shadow creature with mysterious aura, atmospheric gothic lighting',
      firstSeenLocation: 'Abandoned Victorian Manor',
      captureDate: '2024-01-15',
      bondLevel: 75,
      uniqueTraits: ['Memory Reader', 'Emotion Sensor', 'Phase Shifting'],
      weekAdded: 25,
      isNewThisWeek: false
    },
    {
      id: 'ghost-002',
      dexNumber: 2,
      name: 'Poltergeist Fury',
      element: 'Chaos',
      type: 'Poltergeist',
      rarity: 'Rare',
      world: 'Ghost',
      power: 800,
      defense: 400,
      speed: 95,
      height: '1.8m',
      weight: '0.3kg',
      habitat: 'Kitchens, Active Households',
      discoveredDate: '2024-01-03',
      captureRate: 45,
      status: 'captured',
      captureCount: 1,
      evolutionChain: ['Poltergeist Fury', 'Chaos Wrecker', 'Destruction Lord'],
      abilities: ['Object Throw', 'Energy Burst', 'Telekinesis'],
      description: 'A mischievous spirit that delights in moving objects and creating chaos. Its power grows with the emotional energy around it.',
      behaviorNotes: 'Most active during family arguments. Throws kitchen utensils and slams doors. Can be pacified with humor.',
      weaknesses: ['Order', 'Calm', 'Sacred'],
      strengths: ['Chaos', 'Emotion', 'Kinetic'],
      image: 'Chaotic poltergeist throwing kitchen objects with invisible force, mischievous spirit creating supernatural disturbances, energetic ghost with swirling aura and flying utensils',
      firstSeenLocation: 'Family Kitchen',
      captureDate: '2024-01-20',
      bondLevel: 60,
      uniqueTraits: ['Object Manipulation', 'Emotion Feeding', 'Invisible Force'],
      weekAdded: 25,
      isNewThisWeek: false
    },
    // Week 26 - Monster World Creatures
    {
      id: 'monster-001',
      dexNumber: 3,
      name: 'Ember Drake',
      element: 'Fire',
      type: 'Dragon',
      rarity: 'Rare',
      world: 'Monster',
      power: 1200,
      defense: 800,
      speed: 70,
      height: '2.1m',
      weight: '45kg',
      habitat: 'Volcanic Areas, Hot Springs',
      discoveredDate: '2024-01-10',
      captureRate: 35,
      status: 'captured',
      captureCount: 2,
      evolutionChain: ['Ember Drake', 'Flame Wyvern', 'Inferno Dragon'],
      abilities: ['Fire Breath', 'Heat Wave', 'Molten Scales'],
      description: 'A young dragon with molten veins running through its scales. It can breathe small flames and loves basking in volcanic heat.',
      behaviorNotes: 'Territorial during mating season. Forms packs with family members. Playful with trainers it trusts.',
      weaknesses: ['Water', 'Ice', 'Ground'],
      strengths: ['Grass', 'Bug', 'Steel'],
      image: 'Young fire dragon with molten lava veins running through crimson scales, friendly drake with glowing ember eyes and flaming tail, volcanic dragon in natural habitat',
      firstSeenLocation: 'Volcanic Research Center',
      captureDate: '2024-01-25',
      bondLevel: 85,
      uniqueTraits: ['Lava Immunity', 'Heat Generation', 'Scale Hardening'],
      weekAdded: 26,
      isNewThisWeek: false
    },
    {
      id: 'monster-002',
      dexNumber: 4,
      name: 'Crystal Golem',
      element: 'Earth',
      type: 'Construct',
      rarity: 'Epic',
      world: 'Monster',
      power: 900,
      defense: 1400,
      speed: 40,
      height: '2.8m',
      weight: '200kg',
      habitat: 'Caves, Mountain Peaks',
      discoveredDate: '2024-01-12',
      captureRate: 25,
      status: 'seen',
      captureCount: 0,
      evolutionChain: ['Crystal Golem', 'Diamond Titan', 'Gemstone Colossus'],
      abilities: ['Seismic Slam', 'Crystal Shield', 'Earth Tremor'],
      description: 'An ancient construct made of living crystal. Its body contains rare minerals that glow with inner light.',
      behaviorNotes: 'Extremely territorial. Guards crystal deposits fiercely. Communicates through harmonic vibrations.',
      weaknesses: ['Water', 'Grass', 'Fighting'],
      strengths: ['Fire', 'Electric', 'Poison'],
      image: 'Massive crystal golem with glowing blue veins and geometric crystal formations, ancient earth construct with translucent gemstone body, magical mineral guardian',
      firstSeenLocation: 'Crystal Caverns',
      uniqueTraits: ['Mineral Absorption', 'Harmonic Communication', 'Light Refraction'],
      weekAdded: 26,
      isNewThisWeek: false
    },
    // Week 27 - NEW THIS WEEK! 
    {
      id: 'alien-001',
      dexNumber: 5,
      name: 'Void Stalker',
      element: 'Psychic',
      type: 'Alien Hunter',
      rarity: 'Legendary',
      world: 'Alien',
      power: 1800,
      defense: 1200,
      speed: 95,
      height: '2.5m',
      weight: '80kg',
      habitat: 'Urban Rooftops, Spacecraft',
      discoveredDate: '2024-02-15',
      captureRate: 5,
      status: 'seen',
      captureCount: 0,
      evolutionChain: ['Void Stalker'],
      abilities: ['Mind Probe', 'Phase Cloak', 'Plasma Strike'],
      description: 'An elite alien hunter from the Andromeda sector. Its advanced technology allows it to phase between dimensions.',
      behaviorNotes: 'Hunts alone. Uses stealth technology. Observes human behavior patterns before striking.',
      weaknesses: ['Electric', 'Steel', 'Ghost'],
      strengths: ['Fighting', 'Psychic', 'Normal'],
      image: 'Sleek alien hunter in advanced black armor with glowing purple energy, tall extraterrestrial with high-tech weaponry, menacing otherworldly predator with phase technology',
      firstSeenLocation: 'Downtown Skyscraper',
      uniqueTraits: ['Dimensional Phase', 'Mind Reading', 'Energy Weapons'],
      weekAdded: 27,
      isNewThisWeek: true
    },
    {
      id: 'myth-001',
      dexNumber: 6,
      name: 'Storm Phoenix',
      element: 'Lightning',
      type: 'Mythical Bird',
      rarity: 'Mythic',
      world: 'Myth',
      power: 2200,
      defense: 1600,
      speed: 120,
      height: '3.5m',
      weight: '65kg',
      habitat: 'Mountain Peaks, Storm Clouds',
      discoveredDate: '2024-02-16',
      captureRate: 1,
      status: 'unknown',
      captureCount: 0,
      evolutionChain: ['Storm Phoenix'],
      abilities: ['Thunder Storm', 'Lightning Speed', 'Rebirth Flame'],
      description: 'A legendary phoenix that commands the power of storms. Said to appear only during the most violent thunderstorms.',
      behaviorNotes: 'Extremely rare sighting. Controls weather patterns. Reborn from lightning strikes.',
      weaknesses: ['Rock', 'Ice'],
      strengths: ['Water', 'Flying', 'Steel'],
      image: 'Majestic phoenix with lightning crackling through golden feathers, mythical storm bird with electric aura, legendary creature soaring through thunderclouds',
      uniqueTraits: ['Weather Control', 'Lightning Immunity', 'Immortal Rebirth'],
      weekAdded: 27,
      isNewThisWeek: true
    },
    {
      id: 'ghost-003',
      dexNumber: 7,
      name: 'Shadow Banshee',
      element: 'Dark',
      type: 'Wraith',
      rarity: 'Epic',
      world: 'Ghost',
      power: 1600,
      defense: 800,
      speed: 110,
      height: '1.9m',
      weight: '0.2kg',
      habitat: 'Graveyards, Abandoned Hospitals',
      discoveredDate: '2024-02-17',
      captureRate: 15,
      status: 'unknown',
      captureCount: 0,
      evolutionChain: ['Shadow Banshee', 'Death Wail', 'Soul Reaper'],
      abilities: ['Banshee Scream', 'Soul Drain', 'Death Prophecy'],
      description: 'A tormented spirit that wails for the dying. Its cry can be heard miles away and foretells tragic events.',
      behaviorNotes: 'Appears before deaths. Wails at midnight. Drawn to places of great sorrow.',
      weaknesses: ['Light', 'Holy', 'Music'],
      strengths: ['Dark', 'Ghost', 'Psychic'],
      image: 'Terrifying banshee with flowing tattered robes and glowing hollow eyes, wraith spirit with ethereal scream effects, dark specter in moonlit graveyard',
      uniqueTraits: ['Death Sense', 'Sonic Scream', 'Prophetic Visions'],
      weekAdded: 27,
      isNewThisWeek: true
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'captured': return '✅';
      case 'seen': return '👁️';
      case 'unknown': return '❓';
      default: return '❓';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'captured': return 'text-green-400 bg-green-900/30 border-green-600';
      case 'seen': return 'text-yellow-400 bg-yellow-900/30 border-yellow-600';
      case 'unknown': return 'text-gray-400 bg-gray-900/30 border-gray-600';
      default: return 'text-gray-400 bg-gray-900/30 border-gray-600';
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'text-gray-400 border-gray-600 bg-gray-600/20';
      case 'Rare': return 'text-blue-400 border-blue-600 bg-blue-600/20';
      case 'Epic': return 'text-purple-400 border-purple-600 bg-purple-600/20';
      case 'Legendary': return 'text-orange-400 border-orange-600 bg-orange-600/20';
      case 'Mythic': return 'text-pink-400 border-pink-600 bg-pink-600/20';
      default: return 'text-white border-gray-600 bg-gray-600/20';
    }
  };

  const getWorldColor = (world: string) => {
    switch (world) {
      case 'Ghost': return 'from-purple-500 to-purple-700';
      case 'Monster': return 'from-red-500 to-orange-600';
      case 'Myth': return 'from-blue-500 to-cyan-600';
      case 'Alien': return 'from-green-500 to-emerald-600';
      default: return 'from-gray-500 to-gray-700';
    }
  };

  const filteredMonsters = monsterDatabase.filter(monster => {
    const matchesSearch = monster.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         monster.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         monster.element.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesWorld = selectedWorld === 'all' || monster.world === selectedWorld;
    const matchesStatus = selectedStatus === 'all' || monster.status === selectedStatus;
    
    return matchesSearch && matchesWorld && matchesStatus;
  });

  const sortedMonsters = [...filteredMonsters].sort((a, b) => {
    switch (sortBy) {
      case 'dex': return a.dexNumber - b.dexNumber;
      case 'name': return a.name.localeCompare(b.name);
      case 'rarity': 
        const rarityOrder = { 'Common': 1, 'Rare': 2, 'Epic': 3, 'Legendary': 4, 'Mythic': 5 };
        return rarityOrder[b.rarity as keyof typeof rarityOrder] - rarityOrder[a.rarity as keyof typeof rarityOrder];
      case 'recent': return b.weekAdded - a.weekAdded;
      default: return a.dexNumber - b.dexNumber;
    }
  });

  const collectionStats = {
    total: monsterDatabase.length,
    captured: monsterDatabase.filter(m => m.status === 'captured').length,
    seen: monsterDatabase.filter(m => m.status === 'seen').length,
    unknown: monsterDatabase.filter(m => m.status === 'unknown').length,
    newThisWeek: monsterDatabase.filter(m => m.isNewThisWeek).length
  };

  const completionRate = Math.round((collectionStats.captured / collectionStats.total) * 100);

  return (
    <div className="min-h-screen bg-gray-950 pt-20 pb-24 relative overflow-hidden">
      {/* Atmospheric Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-transparent to-black/40"></div>
      </div>

      {/* Monster Detail Modal */}
      {selectedMonster && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-gray-900 border-2 border-blue-600 rounded-2xl p-6 max-w-sm w-full max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-4">
              <div className="flex justify-between items-center mb-3">
                <div className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(selectedMonster.status)}`}>
                  {getStatusIcon(selectedMonster.status)} {selectedMonster.status.toUpperCase()}
                </div>
                <div className="text-blue-400 text-sm">#{selectedMonster.dexNumber.toString().padStart(3, '0')}</div>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2">{selectedMonster.name}</h3>
              <div className="flex justify-center space-x-2 mb-4">
                <div className={`text-xs px-3 py-1 rounded-full border ${getRarityColor(selectedMonster.rarity)}`}>
                  {selectedMonster.rarity}
                </div>
                <div className={`text-xs px-3 py-1 rounded-full bg-gradient-to-r ${getWorldColor(selectedMonster.world)} text-white`}>
                  {selectedMonster.world} World
                </div>
              </div>
              
              {selectedMonster.isNewThisWeek && (
                <div className="bg-yellow-600 text-black px-3 py-1 rounded-full text-xs font-bold mb-3 animate-pulse">
                  🆕 NEW THIS WEEK!
                </div>
              )}
            </div>

            {/* Monster Image */}
            {selectedMonster.status !== 'unknown' && (
              <div 
                className="h-48 rounded-xl bg-cover bg-center mb-4 border-2 border-blue-400/50"
                style={{
                  backgroundImage: `url(https://readdy.ai/api/search-image?query=$%7BencodeURIComponent%28selectedMonster.image%29%7D&width=300&height=180&seq=${selectedMonster.id}-pedia&orientation=landscape)`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-xl flex items-end p-4">
                  <div className="text-center w-full">
                    <div className="text-white font-bold">{selectedMonster.element} Type</div>
                    <div className="text-blue-300 text-sm">{selectedMonster.type}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Unknown Monster Silhouette */}
            {selectedMonster.status === 'unknown' && (
              <div className="h-48 rounded-xl bg-gray-800 mb-4 border-2 border-gray-600 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-2">❓</div>
                  <div className="text-gray-400 text-sm">Unknown Species</div>
                  <div className="text-gray-500 text-xs">Discover to unlock details</div>
                </div>
              </div>
            )}

            {/* Basic Stats */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center">
                <div className="text-red-400 text-lg font-bold">{selectedMonster.power}</div>
                <div className="text-gray-400 text-xs">Power</div>
              </div>
              <div className="text-center">
                <div className="text-blue-400 text-lg font-bold">{selectedMonster.defense}</div>
                <div className="text-gray-400 text-xs">Defense</div>
              </div>
              <div className="text-center">
                <div className="text-green-400 text-lg font-bold">{selectedMonster.speed}</div>
                <div className="text-gray-400 text-xs">Speed</div>
              </div>
            </div>

            {/* Physical Data */}
            {selectedMonster.status !== 'unknown' && (
              <div className="bg-gray-800/50 rounded-lg p-3 mb-4">
                <div className="text-white font-semibold text-sm mb-2">Physical Data</div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <div className="text-gray-400">Height</div>
                    <div className="text-white">{selectedMonster.height}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Weight</div>
                    <div className="text-white">{selectedMonster.weight}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Habitat</div>
                    <div className="text-white">{selectedMonster.habitat}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Capture Rate</div>
                    <div className="text-white">{selectedMonster.captureRate}%</div>
                  </div>
                </div>
              </div>
            )}

            {/* Description */}
            {selectedMonster.status !== 'unknown' && (
              <div className="mb-4">
                <div className="text-white font-semibold mb-2">Description</div>
                <div className="text-gray-300 text-sm bg-gray-800/30 rounded-lg p-3">
                  {selectedMonster.description}
                </div>
              </div>
            )}

            {/* Abilities */}
            {selectedMonster.status !== 'unknown' && (
              <div className="mb-4">
                <div className="text-white font-semibold mb-2">Abilities</div>
                <div className="flex flex-wrap gap-2">
                  {selectedMonster.abilities.map((ability, index) => (
                    <div key={index} className="bg-blue-600/30 text-blue-300 text-sm px-3 py-1 rounded-lg border border-blue-600/50">
                      {ability}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Evolution Chain */}
            {selectedMonster.status !== 'unknown' && selectedMonster.evolutionChain.length > 1 && (
              <div className="mb-4">
                <div className="text-white font-semibold mb-2">Evolution Chain</div>
                <div className="flex items-center space-x-2 overflow-x-auto">
                  {selectedMonster.evolutionChain.map((evolution, index) => (
                    <div key={index} className="flex items-center">
                      <div className={`text-xs px-2 py-1 rounded-full border whitespace-nowrap ${
                        index === 0 ? 'bg-green-600/30 text-green-300 border-green-600/50' : 'bg-gray-600/30 text-gray-300 border-gray-600/50'
                      }`}>
                        {evolution}
                      </div>
                      {index < selectedMonster.evolutionChain.length - 1 && (
                        <i className="ri-arrow-right-line text-gray-400 mx-1"></i>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Capture Info */}
            {selectedMonster.status === 'captured' && (
              <div className="bg-green-900/30 border border-green-700 rounded-lg p-3 mb-4">
                <div className="text-green-400 font-semibold text-sm mb-2">Capture Record</div>
                <div className="text-gray-300 text-xs space-y-1">
                  <div>First Seen: {selectedMonster.firstSeenLocation}</div>
                  <div>Captured: {selectedMonster.captureDate}</div>
                  <div>Bond Level: {selectedMonster.bondLevel}%</div>
                  <div>Total Captured: {selectedMonster.captureCount}</div>
                </div>
              </div>
            )}

            {/* Weekly Info */}
            <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-3 mb-4">
              <div className="text-blue-400 font-semibold text-sm mb-2">Discovery Info</div>
              <div className="text-gray-300 text-xs">
                Added in Week {selectedMonster.weekAdded} • Discovered: {selectedMonster.discoveredDate}
              </div>
            </div>

            <button
              onClick={() => setSelectedMonster(null)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
            >
              Close Entry
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="fixed top-0 w-full bg-black/40 backdrop-blur-md z-50 border-b border-blue-800/30">
        <div className="px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <i className="ri-arrow-left-line text-white text-xl mr-2"></i>
            <span className="text-white font-semibold">Monster Pedia</span>
          </Link>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="text-white text-xl"
            >
              <i className="ri-filter-3-line"></i>
            </button>
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="text-white text-xl"
            >
              <i className={viewMode === 'grid' ? 'ri-list-check' : 'ri-grid-line'}></i>
            </button>
          </div>
        </div>
      </header>

      {/* Collection Stats */}
      <section className="pt-20 px-4 py-6 relative z-10">
        <div className="bg-gray-800/70 border border-blue-700/50 rounded-xl p-4 mb-6">
          <div className="text-center mb-4">
            <div className="text-3xl mb-2">📖</div>
            <div className="text-white font-bold text-xl">Monster Pedia</div>
            <div className="text-blue-400 text-sm">Comprehensive Monster Database</div>
            <div className="text-gray-300 text-sm mt-2">
              Week {currentWeek} • {collectionStats.newThisWeek} New Entries
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-2 mb-4">
            <div className="text-center">
              <div className="text-white text-lg font-bold">{collectionStats.total}</div>
              <div className="text-gray-400 text-xs">Total</div>
            </div>
            <div className="text-center">
              <div className="text-green-400 text-lg font-bold">{collectionStats.captured}</div>
              <div className="text-gray-400 text-xs">Captured</div>
            </div>
            <div className="text-center">
              <div className="text-yellow-400 text-lg font-bold">{collectionStats.seen}</div>
              <div className="text-gray-400 text-xs">Seen</div>
            </div>
            <div className="text-center">
              <div className="text-gray-400 text-lg font-bold">{collectionStats.unknown}</div>
              <div className="text-gray-400 text-xs">Unknown</div>
            </div>
          </div>
          
          <div className="bg-gray-700 rounded-full h-3 mb-2">
            <div 
              className="bg-gradient-to-r from-blue-600 to-cyan-400 h-3 rounded-full transition-all duration-1000"
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
          <div className="text-center text-blue-400 text-sm">
            Collection Complete: {completionRate}%
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="px-4 py-4 relative z-10">
        <div className="bg-gray-800/50 rounded-xl p-4 mb-4">
          <div className="relative mb-4">
            <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder="Search monsters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
          </div>
          
          {showFilters && (
            <div className="space-y-3">
              <div>
                <label className="text-white text-sm font-semibold mb-2 block">World</label>
                <div className="flex space-x-2">
                  {['all', 'Ghost', 'Monster', 'Myth', 'Alien'].map(world => (
                    <button
                      key={world}
                      onClick={() => setSelectedWorld(world as any)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        selectedWorld === world 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                      }`}
                    >
                      {world === 'all' ? 'All' : world}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="text-white text-sm font-semibold mb-2 block">Status</label>
                <div className="flex space-x-2">
                  {['all', 'captured', 'seen', 'unknown'].map(status => (
                    <button
                      key={status}
                      onClick={() => setSelectedStatus(status as any)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        selectedStatus === status 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                      }`}
                    >
                      {getStatusIcon(status)} {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="text-white text-sm font-semibold mb-2 block">Sort By</label>
                <div className="flex space-x-2">
                  {[
                    { key: 'dex', label: 'Dex #' },
                    { key: 'name', label: 'Name' },
                    { key: 'rarity', label: 'Rarity' },
                    { key: 'recent', label: 'Recent' }
                  ].map(sort => (
                    <button
                      key={sort.key}
                      onClick={() => setSortBy(sort.key as any)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        sortBy === sort.key 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                      }`}
                    >
                      {sort.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Monster Grid */}
      <section className="px-4 relative z-10">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 gap-3">
            {sortedMonsters.map((monster) => (
              <button
                key={monster.id}
                onClick={() => setSelectedMonster(monster)}
                className="bg-gray-800/70 border border-gray-700 rounded-xl p-4 text-left hover:border-blue-600 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-blue-400 text-sm font-bold">
                    #{monster.dexNumber.toString().padStart(3, '0')}
                  </div>
                  <div className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(monster.status)}`}>
                    {getStatusIcon(monster.status)}
                  </div>
                </div>
                
                {monster.isNewThisWeek && (
                  <div className="bg-yellow-600 text-black px-2 py-1 rounded-full text-xs font-bold mb-2 animate-pulse">
                    NEW!
                  </div>
                )}
                
                <div className="mb-3">
                  {monster.status !== 'unknown' ? (
                    <div 
                      className="w-full h-20 rounded-lg bg-cover bg-center"
                      style={{
                        backgroundImage: `url(https://readdy.ai/api/search-image?query=$%7BencodeURIComponent%28monster.image%29%7D&width=120&height=80&seq=${monster.id}-thumb&orientation=landscape)`
                      }}
                    ></div>
                  ) : (
                    <div className="w-full h-20 rounded-lg bg-gray-700 flex items-center justify-center">
                      <div className="text-3xl">❓</div>
                    </div>
                  )}
                </div>
                
                <div className="text-white font-semibold text-sm mb-1">
                  {monster.status === 'unknown' ? '???' : monster.name}
                </div>
                <div className="text-gray-400 text-xs mb-2">
                  {monster.status === 'unknown' ? 'Unknown Type' : monster.type}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className={`text-xs px-2 py-1 rounded-full border ${getRarityColor(monster.rarity)}`}>
                    {monster.rarity}
                  </div>
                  <div className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${getWorldColor(monster.world)} text-white`}>
                    {monster.world}
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {sortedMonsters.map((monster) => (
              <button
                key={monster.id}
                onClick={() => setSelectedMonster(monster)}
                className="w-full bg-gray-800/70 border border-gray-700 rounded-xl p-4 text-left hover:border-blue-600 transition-all"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="text-blue-400 text-sm font-bold mb-1">
                      #{monster.dexNumber.toString().padStart(3, '0')}
                    </div>
                    {monster.status !== 'unknown' ? (
                      <div 
                        className="w-16 h-16 rounded-lg bg-cover bg-center"
                        style={{
                          backgroundImage: `url(https://readdy.ai/api/search-image?query=$%7BencodeURIComponent%28monster.image%29%7D&width=64&height=64&seq=${monster.id}-list&orientation=squarish)`
                        }}
                      ></div>
                    ) : (
                      <div className="w-16 h-16 rounded-lg bg-gray-700 flex items-center justify-center">
                        <div className="text-2xl">❓</div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-white font-semibold">
                        {monster.status === 'unknown' ? '???' : monster.name}
                      </div>
                      <div className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(monster.status)}`}>
                        {getStatusIcon(monster.status)}
                      </div>
                    </div>
                    
                    {monster.isNewThisWeek && (
                      <div className="bg-yellow-600 text-black px-2 py-1 rounded-full text-xs font-bold mb-2 inline-block animate-pulse">
                        NEW THIS WEEK!
                      </div>
                    )}
                    
                    <div className="text-gray-400 text-sm mb-2">
                      {monster.status === 'unknown' ? 'Unknown Species' : `${monster.element} ${monster.type}`}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className={`text-xs px-2 py-1 rounded-full border ${getRarityColor(monster.rarity)}`}>
                        {monster.rarity}
                      </div>
                      <div className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${getWorldColor(monster.world)} text-white`}>
                        {monster.world} World
                      </div>
                      {monster.status === 'captured' && (
                        <div className="text-green-400 text-xs">
                          Bond: {monster.bondLevel}%
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Weekly Update Banner */}
      <section className="px-4 py-6 relative z-10">
        <div className="bg-gradient-to-r from-yellow-900/50 to-orange-900/50 border border-yellow-700 rounded-xl p-4">
          <div className="text-center">
            <div className="text-2xl mb-2">📅</div>
            <h3 className="text-white font-bold mb-2">Weekly Update - Week {currentWeek}</h3>
            <p className="text-yellow-400 text-sm mb-3">
              {collectionStats.newThisWeek} new monsters added this week!
            </p>
            <div className="flex justify-center space-x-2">
              {monsterDatabase.filter(m => m.isNewThisWeek).map(monster => (
                <div key={monster.id} className="text-xs bg-yellow-600/30 text-yellow-300 px-2 py-1 rounded-full">
                  {monster.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Discovery Tips */}
      <section className="px-4 py-6 relative z-10 mb-20">
        <div className="bg-gray-800/50 rounded-xl p-4">
          <h3 className="text-white font-bold mb-3">💡 Discovery Tips</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-start space-x-2">
              <span className="text-blue-400">•</span>
              <span className="text-gray-300">New monsters are added every Monday in weekly updates</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-400">•</span>
              <span className="text-gray-300">Unknown monsters become visible after first sighting in the wild</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-400">•</span>
              <span className="text-gray-300">Complete capture to unlock full monster data and evolution paths</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-400">•</span>
              <span className="text-gray-300">Each world has unique monster types with different behaviors</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-400">•</span>
              <span className="text-gray-300">Higher rarity monsters have lower capture rates but stronger abilities</span>
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
          <Link href="/duel-monster-world" className="flex flex-col items-center py-2 text-gray-500">
            <i className="ri-search-line text-lg mb-1"></i>
            <span className="text-xs">Hunt</span>
          </Link>
          <Link href="/ghost-world" className="flex flex-col items-center py-2 text-gray-500">
            <i className="ri-ghost-line text-lg mb-1"></i>
            <span className="text-xs">Spirits</span>
          </Link>
          <Link href="/monster-pedia" className="flex flex-col items-center py-2 text-blue-400">
            <i className="ri-book-3-line text-lg mb-1"></i>
            <span className="text-xs">Pedia</span>
          </Link>
          <Link href="/player-journey" className="flex flex-col items-center py-2 text-gray-500">
            <i className="ri-roadmap-line text-lg mb-1"></i>
            <span className="text-xs">Journey</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}