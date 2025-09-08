'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface LocationBattle {
  id: string;
  locationName: string;
  locationType: 'indoor' | 'outdoor' | 'urban' | 'nature' | 'historic';
  coordinates: { lat: number; lng: number };
  environmentalEffects: {
    name: string;
    description: string;
    bonusType: 'attack' | 'defense' | 'speed' | 'healing';
    elementBonus?: string;
    penaltyType?: 'attack' | 'defense' | 'speed';
    penaltyElement?: string;
  }[];
  availableMonsters: any[];
  battleTerrain: string;
  weatherCondition: 'sunny' | 'rainy' | 'cloudy' | 'stormy' | 'night';
  difficultyModifier: number;
  rewards: {
    experience: number;
    blankCards: number;
    specialItems: string[];
  };
  activeOpponents: any[];
}

interface BattlePosition {
  x: number;
  y: number;
  terrainType: 'normal' | 'elevated' | 'water' | 'fire' | 'shadow' | 'light';
  effects: string[];
}

export default function LocationBattles() {
  const [currentLocation, setCurrentLocation] = useState<LocationBattle | null>(null);
  const [playerPosition, setPlayerPosition] = useState<BattlePosition>({ x: 50, y: 80, terrainType: 'normal', effects: [] });
  const [monsterPosition, setMonsterPosition] = useState<BattlePosition>({ x: 50, y: 20, terrainType: 'normal', effects: [] });
  const [battlePhase, setBattlePhase] = useState<'positioning' | 'combat' | 'victory' | 'defeat'>('positioning');
  const [selectedMonster, setSelectedMonster] = useState<any>(null);
  const [turnTimer, setTurnTimer] = useState(30);
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [playerHP, setPlayerHP] = useState(100);
  const [monsterHP, setMonsterHP] = useState(100);
  const [showLocationDetection, setShowLocationDetection] = useState(false);
  const [detectedLocations, setDetectedLocations] = useState<LocationBattle[]>([]);
  const [environmentalBonus, setEnvironmentalBonus] = useState<string>('');
  const [tacticalAdvantage, setTacticalAdvantage] = useState<string>('');
  const [showCameraView, setShowCameraView] = useState(false);
  const [battleIntensity, setBattleIntensity] = useState(1);
  const [showElementFilter, setShowElementFilter] = useState(false);
  const [selectedElement, setSelectedElement] = useState<string>('');

  // Location-based battle environments
  const battleLocations: LocationBattle[] = [
    {
      id: 'central-park',
      locationName: 'Central Park',
      locationType: 'nature',
      coordinates: { lat: 40.7829, lng: -73.9654 },
      environmentalEffects: [
        {
          name: 'Nature\'s Blessing',
          description: 'Trees and grass provide healing energy',
          bonusType: 'healing',
          elementBonus: 'Nature'
        },
        {
          name: 'Open Sky',
          description: 'Clear visibility enhances Air element attacks',
          bonusType: 'attack',
          elementBonus: 'Air'
        },
        {
          name: 'Urban Interference',
          description: 'City noise disrupts Shadow element concentration',
          penaltyType: 'attack',
          penaltyElement: 'Shadow'
        }
      ],
      availableMonsters: [
        {
          id: 'park-guardian',
          name: 'Park Guardian',
          element: 'Nature',
          power: 1800,
          defense: 2200,
          hp: 120,
          maxHp: 120,
          abilities: ['Leaf Storm', 'Root Bind', 'Photosynthesis'],
          locationBonus: '+30% healing in nature locations'
        }
      ],
      battleTerrain: 'Grassy fields with scattered trees and benches for cover',
      weatherCondition: 'sunny',
      difficultyModifier: 1.2,
      rewards: {
        experience: 150,
        blankCards: 2,
        specialItems: ['Nature Essence', 'Park Token']
      },
      activeOpponents: []
    },
    {
      id: 'downtown-plaza',
      locationName: 'Downtown Plaza',
      locationType: 'urban',
      coordinates: { lat: 40.7580, lng: -73.9855 },
      environmentalEffects: [
        {
          name: 'Concrete Jungle',
          description: 'Hard surfaces amplify Earth element power',
          bonusType: 'attack',
          elementBonus: 'Earth'
        },
        {
          name: 'Light Pollution',
          description: 'Bright city lights weaken Shadow creatures',
          penaltyType: 'defense',
          penaltyElement: 'Shadow'
        },
        {
          name: 'Electric Grid',
          description: 'Power lines enhance Lightning attacks',
          bonusType: 'speed',
          elementBonus: 'Lightning'
        }
      ],
      availableMonsters: [
        {
          id: 'urban-phantom',
          name: 'Urban Phantom',
          element: 'Shadow',
          power: 2100,
          defense: 1600,
          hp: 95,
          maxHp: 95,
          abilities: ['Neon Dash', 'Shadow Merge', 'City Camouflage'],
          locationBonus: '+25% speed in urban areas'
        }
      ],
      battleTerrain: 'Concrete plaza with fountains, benches, and building shadows',
      weatherCondition: 'cloudy',
      difficultyModifier: 1.4,
      rewards: {
        experience: 200,
        blankCards: 3,
        specialItems: ['Urban Crystal', 'Metro Pass']
      },
      activeOpponents: []
    },
    {
      id: 'museum-hall',
      locationName: 'Museum Great Hall',
      locationType: 'historic',
      coordinates: { lat: 40.7794, lng: -73.9632 },
      environmentalEffects: [
        {
          name: 'Ancient Resonance',
          description: 'Historical artifacts enhance Light element magic',
          bonusType: 'attack',
          elementBonus: 'Light'
        },
        {
          name: 'Marble Acoustics',
          description: 'Sound echoes provide tactical awareness',
          bonusType: 'defense'
        },
        {
          name: 'Sacred Ground',
          description: 'Blessed space weakens Dark creatures',
          penaltyType: 'attack',
          penaltyElement: 'Dark'
        }
      ],
      availableMonsters: [
        {
          id: 'marble-sentinel',
          name: 'Marble Sentinel',
          element: 'Light',
          power: 2400,
          defense: 2800,
          hp: 140,
          maxHp: 140,
          abilities: ['Divine Ray', 'Marble Shield', 'Ancient Wisdom'],
          locationBonus: '+40% defense in historic locations'
        }
      ],
      battleTerrain: 'Grand hall with columns, statues, and elevated galleries',
      weatherCondition: 'cloudy',
      difficultyModifier: 1.6,
      rewards: {
        experience: 250,
        blankCards: 4,
        specialItems: ['Ancient Relic', 'Museum Key', 'Historical Tome']
      },
      activeOpponents: []
    },
    {
      id: 'rooftop-garden',
      locationName: 'Rooftop Garden',
      locationType: 'outdoor',
      coordinates: { lat: 40.7505, lng: -73.9934 },
      environmentalEffects: [
        {
          name: 'High Altitude',
          description: 'Elevated position enhances Air element abilities',
          bonusType: 'speed',
          elementBonus: 'Air'
        },
        {
          name: 'Wind Currents',
          description: 'Strong winds disrupt Fire attacks',
          penaltyType: 'attack',
          penaltyElement: 'Fire'
        },
        {
          name: 'Sky Access',
          description: 'Direct sunlight empowers Light creatures',
          bonusType: 'healing',
          elementBonus: 'Light'
        }
      ],
      availableMonsters: [
        {
          id: 'sky-hawk',
          name: 'Sky Hawk',
          element: 'Air',
          power: 2200,
          defense: 1400,
          hp: 85,
          maxHp: 85,
          abilities: ['Wind Dive', 'Aerial Strike', 'Storm Call'],
          locationBonus: 'Can retreat to unreachable positions'
        }
      ],
      battleTerrain: 'Garden with plant barriers and multiple elevation levels',
      weatherCondition: 'stormy',
      difficultyModifier: 1.8,
      rewards: {
        experience: 300,
        blankCards: 5,
        specialItems: ['Wind Crystal', 'Storm Feather', 'Sky Map']
      },
      activeOpponents: []
    },
    {
      id: 'subway-station',
      locationName: 'Abandoned Subway Station',
      locationType: 'indoor',
      coordinates: { lat: 40.7549, lng: -73.9840 },
      environmentalEffects: [
        {
          name: 'Underground Echoes',
          description: 'Sound-based attacks are amplified',
          bonusType: 'attack'
        },
        {
          name: 'Darkness Advantage',
          description: 'Shadow creatures gain stealth bonuses',
          bonusType: 'speed',
          elementBonus: 'Shadow'
        },
        {
          name: 'Confined Space',
          description: 'Large creatures have reduced mobility',
          penaltyType: 'speed'
        }
      ],
      availableMonsters: [
        {
          id: 'tunnel-wraith',
          name: 'Tunnel Wraith',
          element: 'Shadow',
          power: 2600,
          defense: 1800,
          hp: 110,
          maxHp: 110,
          abilities: ['Echo Scream', 'Phase Walk', 'Darkness Cloak'],
          locationBonus: 'Can phase through walls in underground areas'
        }
      ],
      battleTerrain: 'Subway tunnels with train tracks and utility pipes',
      weatherCondition: 'night',
      difficultyModifier: 2.0,
      rewards: {
        experience: 400,
        blankCards: 6,
        specialItems: ['Shadow Essence', 'Tunnel Map', 'Underground Pass']
      },
      activeOpponents: []
    }
  ];

  const playerTeam = [
    {
      id: 'flare-drake-player',
      name: 'Flare Drake',
      element: 'Fire',
      power: 1200,
      defense: 900,
      hp: 100,
      maxHp: 100,
      abilities: ['Ember Shot', 'Flame Tail', 'Heat Shield']
    },
    {
      id: 'stone-golem-player',
      name: 'Stone Golem', 
      element: 'Earth',
      power: 800,
      defense: 1400,
      hp: 120,
      maxHp: 120,
      abilities: ['Boulder Toss', 'Seismic Slam', 'Stone Skin']
    },
    {
      id: 'aero-serpent-player',
      name: 'Aero Serpent',
      element: 'Air',
      power: 1000,
      defense: 800,
      hp: 100,
      maxHp: 100,
      abilities: ['Gale Slash', 'Sky Dive', 'Mist Form']
    }
  ];

  // Element types for filtering
  const elements = ['Fire', 'Water', 'Earth', 'Air', 'Lightning', 'Nature', 'Shadow', 'Light'];

  useEffect(() => {
    if (battlePhase === 'combat') {
      const timer = setInterval(() => {
        setTurnTimer(prev => {
          if (prev <= 1) {
            // Auto-defend if time runs out
            performBattleAction('defend');
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [battlePhase, turnTimer]);

  const detectNearbyLocations = () => {
    // Simulate GPS detection of nearby battle locations
    let detected = battleLocations.filter(() => Math.random() > 0.4);
    
    // Apply element filter if selected
    if (selectedElement) {
      detected = detected.filter(location => 
        location.availableMonsters.some(monster => monster.element === selectedElement) ||
        location.environmentalEffects.some(effect => effect.elementBonus === selectedElement)
      );
    }
    
    setDetectedLocations(detected);
    setShowLocationDetection(true);
  };

  const handleElementFilter = (element: string) => {
    if (selectedElement === element) {
      setSelectedElement(''); // Deselect if clicking the same element
    } else {
      setSelectedElement(element);
    }
    setShowElementFilter(false);
  };

  const selectBattleLocation = (location: LocationBattle) => {
    setCurrentLocation(location);
    setShowLocationDetection(false);
    setShowCameraView(true);
    
    // Initialize battle state
    setPlayerHP(selectedMonster?.maxHp || 100);
    setMonsterHP(location.availableMonsters[0]?.maxHp || 100);
    setBattleLog([
      `Entered ${location.locationName}`,
      `Environmental effects active: ${location.environmentalEffects.length} conditions`,
      `Wild ${location.availableMonsters[0]?.name} appeared!`
    ]);
    setBattlePhase('positioning');
  };

  const calculatePositionalBonus = (playerPos: BattlePosition, monsterPos: BattlePosition) => {
    const distance = Math.sqrt(
      Math.pow(playerPos.x - monsterPos.x, 2) + Math.pow(playerPos.y - monsterPos.y, 2)
    );
    
    let bonus = '';
    let advantage = '';
    
    // Distance-based tactics
    if (distance > 60) {
      bonus = 'Long Range: +20% ranged attack damage';
      advantage = 'safe-distance';
    } else if (distance < 30) {
      bonus = 'Close Combat: +15% melee damage, +10% speed';
      advantage = 'close-combat';
    }
    
    // Terrain advantages
    if (playerPos.terrainType === 'elevated' && monsterPos.terrainType !== 'elevated') {
      bonus += ' | High Ground: +25% all damage';
      advantage = 'elevated';
    }
    
    // Element matching
    if (selectedMonster && currentLocation) {
      const elementBonus = currentLocation.environmentalEffects.find(
        effect => effect.elementBonus === selectedMonster.element
      );
      if (elementBonus) {
        bonus += ` | ${elementBonus.name}: +${elementBonus.bonusType} bonus`;
      }
    }
    
    setEnvironmentalBonus(bonus);
    setTacticalAdvantage(advantage);
  };

  const movePlayerPosition = (x: number, y: number) => {
    const newPosition = { ...playerPosition, x, y };
    
    // Determine terrain type based on position
    if (currentLocation?.locationType === 'nature' && y < 40) {
      newPosition.terrainType = 'elevated'; // Hills/trees
    } else if (currentLocation?.locationType === 'urban' && x > 70) {
      newPosition.terrainType = 'elevated'; // Building steps
    } else {
      newPosition.terrainType = 'normal';
    }
    
    setPlayerPosition(newPosition);
    calculatePositionalBonus(newPosition, monsterPosition);
  };

  const startCombatPhase = () => {
    setBattlePhase('combat');
    setTurnTimer(30);
    const newLog = [...battleLog, 'Combat phase started!', `Turn timer: 30 seconds`];
    
    if (environmentalBonus) {
      newLog.push(`Tactical advantage: ${environmentalBonus}`);
    }
    
    setBattleLog(newLog);
  };

  const performBattleAction = (actionType: 'attack' | 'defend' | 'special' | 'reposition') => {
    if (!selectedMonster || !currentLocation) return;
    
    let newBattleLog = [...battleLog];
    let newPlayerHP = playerHP;
    let newMonsterHP = monsterHP;
    
    // Calculate damage with environmental modifiers
    const getEnvironmentalModifier = () => {
      let modifier = 1.0;
      
      currentLocation.environmentalEffects.forEach(effect => {
        if (effect.elementBonus === selectedMonster.element) {
          if (effect.bonusType === 'attack') modifier += 0.3;
          if (effect.bonusType === 'defense') modifier += 0.2;
        }
        if (effect.penaltyElement === selectedMonster.element) {
          if (effect.penaltyType === 'attack') modifier -= 0.2;
        }
      });
      
      // Positional bonuses
      if (tacticalAdvantage === 'elevated') modifier += 0.25;
      if (tacticalAdvantage === 'close-combat') modifier += 0.15;
      if (tacticalAdvantage === 'safe-distance') modifier += 0.2;
      
      return modifier;
    };
    
    const envModifier = getEnvironmentalModifier();
    
    switch (actionType) {
      case 'attack':
        const baseDamage = Math.floor(Math.random() * 30) + 20;
        const modifiedDamage = Math.floor(baseDamage * envModifier);
        newMonsterHP = Math.max(0, newMonsterHP - modifiedDamage);
        
        newBattleLog.push(
          `${selectedMonster.name} used ${selectedMonster.abilities[0]}!`,
          `Dealt ${modifiedDamage} damage! (${envModifier > 1 ? '+' : ''}${Math.round((envModifier - 1) * 100)}% env. modifier)`
        );
        
        if (newMonsterHP > 0) {
          const counterDamage = Math.floor(Math.random() * 25) + 15;
          newPlayerHP = Math.max(0, newPlayerHP - counterDamage);
          newBattleLog.push(`${currentLocation.availableMonsters[0].name} counterattacked! Dealt ${counterDamage} damage!`);
        }
        break;
        
      case 'defend':
        newBattleLog.push(`${selectedMonster.name} used ${selectedMonster.abilities[2]}! Defense increased!`);
        const reducedDamage = Math.floor(Math.random() * 8) + 3;
        newPlayerHP = Math.max(0, newPlayerHP - reducedDamage);
        newBattleLog.push(`Enemy attack was greatly reduced!`);
        break;
        
      case 'special':
        const specialDamage = Math.floor(Math.random() * 40) + 30;
        const modifiedSpecial = Math.floor(specialDamage * envModifier);
        newMonsterHP = Math.max(0, newMonsterHP - modifiedSpecial);
        
        newBattleLog.push(
          `${selectedMonster.name} used ${selectedMonster.abilities[1]}!`,
          `Special attack dealt ${modifiedSpecial} damage!`
        );
        break;
        
      case 'reposition':
        // Allow player to change position mid-battle
        newBattleLog.push(`${selectedMonster.name} repositioned for tactical advantage!`);
        setBattlePhase('positioning');
        return;
    }
    
    setPlayerHP(newPlayerHP);
    setMonsterHP(newMonsterHP);
    setBattleLog(newBattleLog);
    setTurnTimer(30);
    
    // Check battle end conditions
    if (newPlayerHP <= 0) {
      setBattlePhase('defeat');
      newBattleLog.push('Defeated! Try repositioning for better tactical advantage.');
    } else if (newMonsterHP <= 0) {
      setBattlePhase('victory');
      newBattleLog.push(`Victory! ${currentLocation.availableMonsters[0].name} defeated!`);
      setBattleIntensity(prev => Math.min(prev + 0.5, 3));
    }
  };

  const getElementColor = (element: string) => {
    switch (element) {
      case 'Fire': return 'from-red-500 to-orange-600';
      case 'Water': return 'from-blue-500 to-cyan-600';
      case 'Earth': return 'from-green-500 to-emerald-600'; 
      case 'Air': return 'from-gray-400 to-blue-500';
      case 'Shadow': return 'from-purple-500 to-purple-700';
      case 'Light': return 'from-yellow-400 to-yellow-600';
      case 'Nature': return 'from-emerald-500 to-green-600';
      case 'Lightning': return 'from-yellow-500 to-orange-500';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getElementIcon = (element: string) => {
    switch (element) {
      case 'Fire': return '🔥';
      case 'Water': return '💧';
      case 'Earth': return '⛰️';
      case 'Air': return '🌪️';
      case 'Shadow': return '🌑';
      case 'Light': return '✨';
      case 'Nature': return '🌿';
      case 'Lightning': return '⚡';
      default: return '🔮';
    }
  };

  const getLocationTypeIcon = (type: string) => {
    switch (type) {
      case 'nature': return '🌳';
      case 'urban': return '🏙️';
      case 'historic': return '🏛️';
      case 'outdoor': return '🌤️';
      case 'indoor': return '🏢';
      default: return '📍';
    }
  };

  const getWeatherIcon = (weather: string) => {
    switch (weather) {
      case 'sunny': return '☀️';
      case 'rainy': return '🌧️';
      case 'cloudy': return '☁️';
      case 'stormy': return '⛈️';
      case 'night': return '🌙';
      default: return '🌤️';
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 pt-20 pb-24 relative overflow-hidden">
      {/* Atmospheric Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-transparent to-black/40"></div>
        {battlePhase === 'combat' && (
          <div className="absolute inset-0 bg-red-500/5 animate-pulse"></div>
        )}
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full bg-black/40 backdrop-blur-md z-50 border-b border-blue-800/30">
        <div className="px-4 py-3 flex items-center justify-between">
          <Link href="/duel-monster-world" className="flex items-center">
            <i className="ri-arrow-left-line text-white text-xl mr-2"></i>
            <span className="text-white font-semibold">Location Battles</span>
          </Link>
          <div className="flex items-center space-x-3">
            {battlePhase === 'combat' && (
              <div className="text-red-400 text-sm font-bold animate-pulse">
                ⏰ {turnTimer}s
              </div>
            )}
            <div className="text-white text-sm">⚔️ Intensity x{battleIntensity}</div>
          </div>
        </div>
      </header>

      {/* Element Filter Modal */}
      {showElementFilter && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-gray-900 border-2 border-purple-600 rounded-2xl p-6 max-w-sm w-full">
            <div className="text-center mb-6">
              <div className="text-3xl mb-2">🔮</div>
              <h3 className="text-xl font-bold text-white mb-2">Filter by Element</h3>
              <p className="text-gray-300 text-sm">Find locations with specific elemental advantages</p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {elements.map((element) => (
                <button
                  key={element}
                  onClick={() => handleElementFilter(element)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedElement === element
                      ? `border-${element === 'Fire' ? 'red' : 'purple'}-500 bg-gradient-to-br ${getElementColor(element)}/20`
                      : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">{getElementIcon(element)}</div>
                    <div className="text-white font-semibold text-sm">{element}</div>
                  </div>
                </button>
              ))}
            </div>

            {selectedElement && (
              <div className="bg-purple-900/30 border border-purple-600 rounded-lg p-3 mb-4">
                <div className="text-purple-400 text-sm text-center">
                  Filtering locations with {selectedElement} element advantages
                </div>
              </div>
            )}

            <div className="flex space-x-3">
              <button
                onClick={() => setSelectedElement('')}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg"
              >
                Clear Filter
              </button>
              <button
                onClick={() => setShowElementFilter(false)}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg"
              >
                Apply Filter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Location Detection Modal */}
      {showLocationDetection && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-gray-900 border-2 border-blue-600 rounded-2xl p-6 max-w-sm w-full max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-4">
              <div className="text-3xl mb-2">📍</div>
              <h3 className="text-xl font-bold text-white mb-2">Battle Locations Detected</h3>
              <p className="text-gray-300 text-sm">
                {detectedLocations.length} locations available for AR battles
                {selectedElement && ` (${selectedElement} filtered)`}
              </p>
            </div>

            {detectedLocations.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-3">🔍</div>
                <div className="text-gray-400 mb-2">No locations found</div>
                <div className="text-gray-500 text-sm mb-4">
                  {selectedElement ? 
                    `No locations with ${selectedElement} element advantages nearby` :
                    'Try moving to a different area or clear element filter'
                  }
                </div>
                <button
                  onClick={() => setSelectedElement('')}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Clear Element Filter
                </button>
              </div>
            ) : (
              <div className="space-y-3 mb-6">
                {detectedLocations.map((location, index) => (
                  <div key={index} className="bg-gray-800/70 border border-gray-700 rounded-xl p-4">
                    <div className="flex items-start space-x-3 mb-3">
                      <div className="text-2xl">{getLocationTypeIcon(location.locationType)}</div>
                      <div className="flex-1">
                        <div className="text-white font-semibold">{location.locationName}</div>
                        <div className="text-gray-400 text-sm capitalize">{location.locationType} Environment</div>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="text-xs">{getWeatherIcon(location.weatherCondition)}</div>
                          <div className="text-yellow-400 text-xs">
                            Difficulty: x{location.difficultyModifier}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="text-purple-400 text-xs font-semibold mb-2">Environmental Effects:</div>
                      <div className="space-y-1">
                        {location.environmentalEffects.slice(0, 2).map((effect, idx) => (
                          <div key={idx} className="bg-purple-900/30 text-purple-300 text-xs px-2 py-1 rounded">
                            {effect.name}: {effect.description}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="text-red-400 text-xs font-semibold mb-1">Wild Monster:</div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleElementFilter(location.availableMonsters[0]?.element)}
                          className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${getElementColor(location.availableMonsters[0]?.element)} hover:opacity-80 transition-opacity`}
                        >
                          {location.availableMonsters[0]?.element}
                        </button>
                        <div className="text-white text-sm font-semibold">
                          {location.availableMonsters[0]?.name}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-xs text-center mb-3">
                      <div>
                        <div className="text-green-400 font-bold">+{location.rewards.experience}</div>
                        <div className="text-gray-400">EXP</div>
                      </div>
                      <div>
                        <div className="text-purple-400 font-bold">{location.rewards.blankCards}</div>
                        <div className="text-gray-400">Cards</div>
                      </div>
                      <div>
                        <div className="text-orange-400 font-bold">{location.rewards.specialItems.length}</div>
                        <div className="text-gray-400">Items</div>
                      </div>
                    </div>

                    <button
                      onClick={() => selectBattleLocation(location)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-semibold"
                    >
                      ⚔️ Enter Battle Arena
                    </button>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => setShowLocationDetection(false)}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* AR Camera Battle View */}
      {showCameraView && currentLocation && (
        <div className="fixed inset-0 bg-black z-[100] flex flex-col">
          
          {/* AR Battle Environment */}
          <div className="flex-1 relative">
            <div 
              className="w-full h-full bg-cover bg-center relative"
              style={{
                backgroundImage: `url(https://readdy.ai/api/search-image?query=AR%20battle%20arena%20$%7BcurrentLocation.locationName%7D%20with%20tactical%20positioning%20grid%20overlay%2C%20$%7BcurrentLocation.battleTerrain%7D%2C%20monsters%20fighting%20in%20realistic%20$%7BcurrentLocation.locationType%7D%20environment%2C%20cinematic%20lighting%20with%20$%7BcurrentLocation.weatherCondition%7D%20weather%20effects&width=375&height=600&seq=${currentLocation.id}-battle&orientation=portrait)`
              }}
            >
              <div className="absolute inset-0 bg-black/20">
                
                {/* Location Info Overlay */}
                <div className="absolute top-4 left-4 right-4 flex justify-between">
                  <div className="bg-black/70 rounded-lg px-3 py-2">
                    <div className="text-white font-bold text-sm">{currentLocation.locationName}</div>
                    <div className="text-gray-300 text-xs">
                      {getLocationTypeIcon(currentLocation.locationType)} {currentLocation.locationType} • {getWeatherIcon(currentLocation.weatherCondition)} {currentLocation.weatherCondition}
                    </div>
                  </div>
                  <div className="bg-black/70 rounded-lg px-3 py-2 text-center">
                    <div className="text-yellow-400 font-bold text-sm">x{currentLocation.difficultyModifier}</div>
                    <div className="text-gray-300 text-xs">Difficulty</div>
                  </div>
                </div>

                {/* Battle Phase UI */}
                {battlePhase === 'positioning' && (
                  <div className="absolute inset-x-4 bottom-32">
                    <div className="bg-black/80 rounded-xl p-4 mb-4">
                      <div className="text-center mb-3">
                        <div className="text-blue-400 font-bold text-lg">Tactical Positioning</div>
                        <div className="text-gray-300 text-sm">Choose your position for maximum advantage</div>
                      </div>
                      
                      {/* Tactical Grid */}
                      <div className="relative bg-gray-800/50 rounded-lg p-4 mb-4" style={{ height: '200px' }}>
                        <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-1 p-2">
                          {Array.from({ length: 16 }, (_, i) => {
                            const x = (i % 4) * 25 + 12.5;
                            const y = Math.floor(i / 4) * 25 + 12.5;
                            const isPlayerPos = Math.abs(x - playerPosition.x) < 15 && Math.abs(y - playerPosition.y) < 15;
                            const isMonsterPos = Math.abs(x - monsterPosition.x) < 15 && Math.abs(y - monsterPosition.y) < 15;
                            
                            return (
                              <button
                                key={i}
                                onClick={() => movePlayerPosition(x, y)}
                                className={`w-full h-full rounded border-2 transition-all ${
                                  isPlayerPos ? 'bg-blue-600 border-blue-400' :
                                  isMonsterPos ? 'bg-red-600 border-red-400' :
                                  'bg-gray-700/50 border-gray-600 hover:bg-gray-600/50'
                                }`}
                              >
                                {isPlayerPos && <span className="text-white text-xs">👤</span>}
                                {isMonsterPos && <span className="text-white text-xs">👹</span>}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {environmentalBonus && (
                        <div className="bg-green-900/30 border border-green-700 rounded-lg p-3 mb-3">
                          <div className="text-green-400 font-semibold text-sm">Tactical Advantage:</div>
                          <div className="text-green-300 text-xs">{environmentalBonus}</div>
                        </div>
                      )}

                      <button
                        onClick={startCombatPhase}
                        className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold"
                        disabled={!selectedMonster}
                      >
                        ⚔️ Begin Combat!
                      </button>
                    </div>
                  </div>
                )}

                {/* Combat Phase UI */}
                {battlePhase === 'combat' && (
                  <div className="absolute inset-x-4 bottom-32">
                    <div className="bg-black/80 rounded-xl p-4">
                      
                      {/* Health Bars */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-blue-400">{selectedMonster?.name}</span>
                            <span className="text-blue-400">{playerHP}/{selectedMonster?.maxHp}</span>
                          </div>
                          <div className="bg-gray-700 rounded-full h-3">
                            <div 
                              className="bg-blue-400 h-3 rounded-full transition-all duration-500"
                              style={{ width: `${(playerHP / (selectedMonster?.maxHp || 100)) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-red-400">{currentLocation.availableMonsters[0]?.name}</span>
                            <span className="text-red-400">{monsterHP}/{currentLocation.availableMonsters[0]?.maxHp}</span>
                          </div>
                          <div className="bg-gray-700 rounded-full h-3">
                            <div 
                              className="bg-red-400 h-3 rounded-full transition-all duration-500"
                              style={{ width: `${(monsterHP / (currentLocation.availableMonsters[0]?.maxHp || 100)) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      {/* Turn Timer */}
                      <div className="text-center mb-4">
                        <div className="text-white font-bold text-2xl animate-pulse">{turnTimer}</div>
                        <div className="text-gray-400 text-xs">seconds remaining</div>
                      </div>

                      {/* Battle Actions */}
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <button
                          onClick={() => performBattleAction('attack')}
                          className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold text-sm"
                        >
                          🔥 Attack
                        </button>
                        <button
                          onClick={() => performBattleAction('defend')}
                          className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold text-sm"
                        >
                          🛡️ Defend
                        </button>
                        <button
                          onClick={() => performBattleAction('special')}
                          className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold text-sm"
                        >
                          ✨ Special
                        </button>
                        <button
                          onClick={() => performBattleAction('reposition')}
                          className="bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold text-sm"
                        >
                          🎯 Reposition
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Victory/Defeat UI */}
                {(battlePhase === 'victory' || battlePhase === 'defeat') && (
                  <div className="absolute inset-x-4 bottom-32">
                    <div className="bg-black/80 rounded-xl p-6 text-center">
                      <div className="text-4xl mb-3">
                        {battlePhase === 'victory' ? '🎉' : '💥'}
                      </div>
                      <div className={`text-2xl font-bold mb-2 ${
                        battlePhase === 'victory' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {battlePhase === 'victory' ? 'Victory!' : 'Defeated!'}
                      </div>
                      
                      {battlePhase === 'victory' && currentLocation && (
                        <div className="space-y-2 mb-4">
                          <div className="text-green-300 text-sm">Battle Rewards:</div>
                          <div className="grid grid-cols-3 gap-2 text-xs">
                            <div className="bg-green-900/30 rounded p-2">
                              <div className="text-green-400 font-bold">+{currentLocation.rewards.experience}</div>
                              <div className="text-gray-400">Experience</div>
                            </div>
                            <div className="bg-purple-900/30 rounded p-2">
                              <div className="text-purple-400 font-bold">{currentLocation.rewards.blankCards}</div>
                              <div className="text-gray-400">Blank Cards</div>
                            </div>
                            <div className="bg-orange-900/30 rounded p-2">
                              <div className="text-orange-400 font-bold">{currentLocation.rewards.specialItems.length}</div>
                              <div className="text-gray-400">Special Items</div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex space-x-3">
                        <button
                          onClick={() => {
                            setShowCameraView(false);
                            setCurrentLocation(null);
                            setBattlePhase('positioning');
                          }}
                          className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold"
                        >
                          Exit Arena
                        </button>
                        {battlePhase === 'defeat' && (
                          <button
                            onClick={() => {
                              setBattlePhase('positioning');
                              setPlayerHP(selectedMonster?.maxHp || 100);
                              setMonsterHP(currentLocation?.availableMonsters[0]?.maxHp || 100);
                            }}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
                          >
                            Try Again
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Environmental Effects Display */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black/60 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="text-purple-400 text-xs font-semibold">Environmental Effects:</div>
                      <div className="text-gray-400 text-xs">{currentLocation.environmentalEffects.length} active</div>
                    </div>
                    <div className="flex space-x-2 mt-2 overflow-x-auto">
                      {currentLocation.environmentalEffects.map((effect, index) => (
                        <div key={index} className="bg-purple-900/30 text-purple-300 text-xs px-2 py-1 rounded-full whitespace-nowrap">
                          {effect.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Battle Log */}
                <div className="absolute top-20 left-4 right-4">
                  <div className="bg-black/60 rounded-lg p-3 max-h-32 overflow-y-auto">
                    {battleLog.slice(-4).map((log, index) => (
                      <div key={index} className="text-gray-300 text-xs mb-1">{log}</div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Monster Selection Bar */}
          <div className="bg-black/90 p-4">
            <div className="flex space-x-3 overflow-x-auto">
              {playerTeam.map((monster) => (
                <button
                  key={monster.id}
                  onClick={() => setSelectedMonster(monster)}
                  className={`flex-shrink-0 bg-gray-800 border-2 rounded-lg p-3 transition-all ${
                    selectedMonster?.id === monster.id ? 'border-blue-400' : 'border-gray-700'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-1">
                      {monster.element === 'Fire' ? '🔥' : 
                       monster.element === 'Earth' ? '⛰️' : '🌪️'}
                    </div>
                    <div className="text-white text-xs font-semibold">{monster.name}</div>
                    <div className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${getElementColor(monster.element)} mt-1`}>
                      {monster.element}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Welcome Section */}
      <section className="pt-20 px-4 py-6 relative z-10">
        <div className="bg-gradient-to-r from-blue-900/50 to-red-900/50 rounded-2xl p-6 border border-blue-700/50 mb-6">
          <div className="text-center">
            <div className="text-4xl mb-3">⚔️</div>
            <h1 className="text-2xl font-bold text-white mb-2">Real Location Battles</h1>
            <p className="text-gray-300 text-sm mb-4">
              Use your surroundings for tactical advantage in AR combat
            </p>
            
            {/* Element Filter Button */}
            <div className="flex items-center justify-center space-x-3 mb-4">
              <button
                onClick={() => setShowElementFilter(true)}
                className={`px-4 py-2 rounded-full border-2 transition-all ${
                  selectedElement 
                    ? `border-${selectedElement === 'Fire' ? 'red' : 'purple'}-500 bg-gradient-to-r ${getElementColor(selectedElement)}/20 text-white`
                    : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gray-500'
                }`}
              >
                {selectedElement ? (
                  <span className="flex items-center space-x-2">
                    <span>{getElementIcon(selectedElement)}</span>
                    <span className="text-sm">{selectedElement} Filter</span>
                  </span>
                ) : (
                  <span className="flex items-center space-x-2">
                    <i className="ri-filter-3-line"></i>
                    <span className="text-sm">Filter Elements</span>
                  </span>
                )}
              </button>
            </div>

            <button
              onClick={detectNearbyLocations}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-bold text-lg"
            >
              📍 Find Battle Locations
            </button>
          </div>
        </div>
      </section>

      {/* Location Types Guide */}
      <section className="px-4 py-6 relative z-10">
        <h2 className="text-xl font-bold text-white mb-4">🌍 Battle Environment Types</h2>
        <div className="space-y-4">
          
          <div className="bg-green-900/30 border border-green-700 rounded-xl p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="text-2xl">🌳</div>
              <div>
                <div className="text-white font-bold">Nature Locations</div>
                <div className="text-green-400 text-sm">Parks, forests, outdoor spaces</div>
              </div>
            </div>
            <div className="text-gray-300 text-sm space-y-1">
              <div>• Nature/Earth elements gain +30% healing</div>
              <div>• Air attacks enhanced by open sky</div>
              <div>• Shadow creatures weakened by sunlight</div>
            </div>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="text-2xl">🏙️</div>
              <div>
                <div className="text-white font-bold">Urban Locations</div>
                <div className="text-gray-400 text-sm">Downtown, plazas, city centers</div>
              </div>
            </div>
            <div className="text-gray-300 text-sm space-y-1">
              <div>• Earth element amplified by concrete</div>
              <div>• Lightning enhanced by power grids</div>
              <div>• Shadow weakened by light pollution</div>
            </div>
          </div>

          <div className="bg-yellow-900/30 border border-yellow-700 rounded-xl p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="text-2xl">🏛️</div>
              <div>
                <div className="text-white font-bold">Historic Locations</div>
                <div className="text-yellow-400 text-sm">Museums, monuments, old buildings</div>
              </div>
            </div>
            <div className="text-gray-300 text-sm space-y-1">
              <div>• Light element boosted by sacred energy</div>
              <div>• Enhanced tactical awareness</div>
              <div>• Dark creatures suffer penalties</div>
            </div>
          </div>

        </div>
      </section>

      {/* Tactical Combat Guide */}
      <section className="px-4 py-6 relative z-10">
        <h2 className="text-xl font-bold text-white mb-4">⚡ Tactical Combat System</h2>
        <div className="bg-gray-800/70 border border-gray-700 rounded-xl p-4">
          <div className="space-y-4">
            
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">📍</span>
              </div>
              <div>
                <div className="text-white font-semibold text-sm">1. Positioning Phase</div>
                <div className="text-gray-300 text-xs">Choose your position on the tactical grid for maximum advantage</div>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">🎯</span>
              </div>
              <div>
                <div className="text-white font-semibold text-sm">2. Environmental Bonuses</div>
                <div className="text-gray-300 text-xs">High ground (+25%), close combat (+15%), element matching (+30%)</div>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">⚔️</span>
              </div>
              <div>
                <div className="text-white font-semibold text-sm">3. Real-Time Combat</div>
                <div className="text-gray-300 text-xs">30-second turns with attack, defend, special, and repositioning options</div>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">🌟</span>
              </div>
              <div>
                <div className="text-white font-semibold text-sm">4. Location Rewards</div>
                <div className="text-gray-300 text-xs">Experience, Blank Cards, and location-specific special items</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Battle Tips */}
      <section className="px-4 py-6 relative z-10 mb-20">
        <div className="bg-orange-900/30 border border-orange-700 rounded-xl p-4">
          <h3 className="text-orange-400 font-bold mb-3">💡 Tactical Tips</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-start space-x-2">
              <span className="text-orange-400">•</span>
              <span className="text-gray-300">Study environmental effects before positioning</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-orange-400">•</span>
              <span className="text-gray-300">Match your monster's element to location bonuses</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-orange-400">•</span>
              <span className="text-gray-300">Use elevation and distance for strategic advantage</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-orange-400">•</span>
              <span className="text-gray-300">Reposition mid-battle to adapt to changing conditions</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-orange-400">•</span>
              <span className="text-gray-300">Different locations offer unique rewards and challenges</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}