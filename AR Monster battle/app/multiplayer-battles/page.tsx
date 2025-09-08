'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface MultiplayerBattle {
  id: string;
  location: {
    name: string;
    type: 'indoor' | 'outdoor' | 'urban' | 'nature' | 'historic';
    coordinates: { lat: number; lng: number };
    environmentalEffects: any[];
    weatherCondition: string;
  };
  challenger: {
    id: string;
    username: string;
    level: number;
    rank: string;
    selectedMonster: any;
    position: { x: number; y: number };
    ready: boolean;
  };
  opponent: {
    id: string;
    username: string;
    level: number;
    rank: string;
    selectedMonster: any;
    position: { x: number; y: number };
    ready: boolean;
  } | null;
  battleState: 'waiting' | 'positioning' | 'combat' | 'finished';
  currentTurn: 'challenger' | 'opponent';
  turnTimer: number;
  wager: {
    type: 'blank_cards' | 'experience' | 'items';
    amount: number;
    items?: string[];
  };
  spectators: string[];
  createdAt: string;
}

interface PlayerPosition {
  x: number;
  y: number;
  terrainType: 'normal' | 'elevated' | 'water' | 'cover' | 'hazard';
  advantages: string[];
  disadvantages: string[];
}

export default function MultiplayerBattles() {
  const [activeTab, setActiveTab] = useState<'nearby' | 'create' | 'spectate'>('nearby');
  const [currentBattle, setCurrentBattle] = useState<MultiplayerBattle | null>(null);
  const [nearbyBattles, setNearbyBattles] = useState<MultiplayerBattle[]>([]);
  const [playerPosition, setPlayerPosition] = useState<PlayerPosition>({ x: 25, y: 75, terrainType: 'normal', advantages: [], disadvantages: [] });
  const [opponentPosition, setOpponentPosition] = useState<PlayerPosition>({ x: 75, y: 25, terrainType: 'normal', advantages: [], disadvantages: [] });
  const [battlePhase, setBattlePhase] = useState<'lobby' | 'positioning' | 'combat' | 'spectating'>('lobby');
  const [turnTimer, setTurnTimer] = useState(30);
  const [playerHP, setPlayerHP] = useState(100);
  const [opponentHP, setOpponentHP] = useState(100);
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [showCreateBattle, setShowCreateBattle] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [selectedWager, setSelectedWager] = useState<any>(null);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [isSpectating, setIsSpectating] = useState(false);
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [challengeTarget, setChallengeTarget] = useState<any>(null);
  const [connectedPlayers, setConnectedPlayers] = useState<any[]>([]);
  const [realTimeUpdates, setRealTimeUpdates] = useState<string[]>([]);

  // Mock player data
  const currentPlayer = {
    id: 'player-1',
    username: 'DragonMaster',
    level: 15,
    rank: 'Silver Duelist',
    monsters: [
      {
        id: 'flare-drake',
        name: 'Flare Drake',
        element: 'Fire',
        power: 1200,
        defense: 900,
        hp: 100,
        maxHp: 100,
        abilities: ['Ember Shot', 'Flame Tail', 'Heat Shield']
      },
      {
        id: 'stone-golem',
        name: 'Stone Golem',
        element: 'Earth',
        power: 800,
        defense: 1400,
        hp: 120,
        maxHp: 120,
        abilities: ['Boulder Toss', 'Seismic Slam', 'Stone Skin']
      }
    ]
  };

  // Available battle locations
  const battleLocations = [
    {
      id: 'central-park',
      name: 'Central Park Meadow',
      type: 'nature',
      coordinates: { lat: 40.7829, lng: -73.9654 },
      environmentalEffects: [
        { name: 'Nature\'s Blessing', type: 'healing', element: 'Nature' },
        { name: 'Open Sky', type: 'attack', element: 'Air' }
      ],
      weatherCondition: 'sunny',
      capacity: 8,
      currentPlayers: 3,
      image: 'Central Park meadow with tactical AR battle grid overlay, players positioned for monster combat, nature environment with trees and grass, sunny weather with realistic lighting'
    },
    {
      id: 'times-square',
      name: 'Times Square Plaza',
      type: 'urban',
      coordinates: { lat: 40.7580, lng: -73.9855 },
      environmentalEffects: [
        { name: 'Urban Echo', type: 'speed', element: 'Sound' },
        { name: 'Neon Power', type: 'attack', element: 'Lightning' }
      ],
      weatherCondition: 'night',
      capacity: 12,
      currentPlayers: 7,
      image: 'Times Square at night with holographic battle arena, neon lights and digital billboards, urban tactical combat zone, multiplayer AR battle environment'
    },
    {
      id: 'brooklyn-bridge',
      name: 'Brooklyn Bridge Walkway',
      type: 'outdoor',
      coordinates: { lat: 40.7061, lng: -73.9969 },
      environmentalEffects: [
        { name: 'Wind Currents', type: 'speed', element: 'Air' },
        { name: 'High Ground', type: 'attack', element: 'All' }
      ],
      weatherCondition: 'windy',
      capacity: 6,
      currentPlayers: 2,
      image: 'Brooklyn Bridge walkway transformed into AR battle arena, wind effects and elevated combat platform, epic city skyline backdrop, tactical positioning on bridge structure'
    },
    {
      id: 'museum-hall',
      name: 'Natural History Museum',
      type: 'historic',
      coordinates: { lat: 40.7813, lng: -73.9739 },
      environmentalEffects: [
        { name: 'Ancient Power', type: 'defense', element: 'Light' },
        { name: 'Echo Chamber', type: 'attack', element: 'Sound' }
      ],
      weatherCondition: 'indoor',
      capacity: 10,
      currentPlayers: 5,
      image: 'Museum great hall with ancient artifacts and AR battle effects, historic environment with columns and displays, educational battle arena with mystical lighting'
    }
  ];

  // Mock nearby battles
  const mockNearbyBattles: MultiplayerBattle[] = [
    {
      id: 'battle-1',
      location: battleLocations[0],
      challenger: {
        id: 'player-2',
        username: 'ShadowHunter',
        level: 18,
        rank: 'Gold Summoner',
        selectedMonster: {
          name: 'Void Stalker',
          element: 'Shadow',
          power: 1800,
          level: 22
        },
        position: { x: 30, y: 70 },
        ready: true
      },
      opponent: null,
      battleState: 'waiting',
      currentTurn: 'challenger',
      turnTimer: 0,
      wager: {
        type: 'blank_cards',
        amount: 3
      },
      spectators: ['WatcherOne', 'BattleFan92'],
      createdAt: '2 minutes ago'
    },
    {
      id: 'battle-2',
      location: battleLocations[1],
      challenger: {
        id: 'player-3',
        username: 'ElementalKing',
        level: 22,
        rank: 'Platinum Master',
        selectedMonster: {
          name: 'Storm Phoenix',
          element: 'Lightning',
          power: 2200,
          level: 28
        },
        position: { x: 45, y: 60 },
        ready: true
      },
      opponent: {
        id: 'player-4',
        username: 'IceQueen',
        level: 20,
        rank: 'Gold Champion',
        selectedMonster: {
          name: 'Frost Dragon',
          element: 'Ice',
          power: 2000,
          level: 25
        },
        position: { x: 55, y: 40 },
        ready: true
      },
      battleState: 'combat',
      currentTurn: 'opponent',
      turnTimer: 18,
      wager: {
        type: 'experience',
        amount: 500
      },
      spectators: ['BattleWatcher', 'CombatFan', 'DragonLover', 'TacticalMind'],
      createdAt: '8 minutes ago'
    },
    {
      id: 'battle-3',
      location: battleLocations[2],
      challenger: {
        id: 'player-5',
        username: 'BridgeGuardian',
        level: 16,
        rank: 'Silver Champion',
        selectedMonster: {
          name: 'Wind Serpent',
          element: 'Air',
          power: 1600,
          level: 19
        },
        position: { x: 20, y: 80 },
        ready: false
      },
      opponent: null,
      battleState: 'waiting',
      currentTurn: 'challenger',
      turnTimer: 0,
      wager: {
        type: 'items',
        amount: 1,
        items: ['Storm Crystal']
      },
      spectators: [],
      createdAt: '5 minutes ago'
    }
  ];

  const wagerOptions = [
    { type: 'blank_cards', amount: 2, label: '2 Blank Cards', risk: 'Low' },
    { type: 'blank_cards', amount: 5, label: '5 Blank Cards', risk: 'Medium' },
    { type: 'experience', amount: 300, label: '300 Experience', risk: 'Low' },
    { type: 'experience', amount: 800, label: '800 Experience', risk: 'High' },
    { type: 'items', amount: 1, items: ['Evolution Shard'], label: 'Evolution Shard', risk: 'Medium' },
    { type: 'items', amount: 1, items: ['Legendary Relic'], label: 'Legendary Relic', risk: 'Extreme' }
  ];

  useEffect(() => {
    setNearbyBattles(mockNearbyBattles);
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      const updates = [
        `${mockNearbyBattles[1].challenger.username} used Thunder Strike!`,
        `${mockNearbyBattles[1].opponent?.username} repositioned for defense`,
        `New battle created at ${battleLocations[3].name}`,
        `${mockNearbyBattles[0].challenger.username} is still waiting for challenger`,
        `Spectator joined battle at ${battleLocations[1].name}`
      ];
      setRealTimeUpdates(prev => [updates[Math.floor(Math.random() * updates.length)], ...prev.slice(0, 4)]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (battlePhase === 'combat') {
      const timer = setInterval(() => {
        setTurnTimer(prev => {
          if (prev <= 1) {
            performBattleAction('defend');
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [battlePhase]);

  const joinBattle = (battle: MultiplayerBattle) => {
    if (battle.opponent) {
      // Join as spectator
      setIsSpectating(true);
      setCurrentBattle(battle);
      setBattlePhase('spectating');
    } else {
      // Join as opponent
      setCurrentBattle({
        ...battle,
        opponent: {
          id: currentPlayer.id,
          username: currentPlayer.username,
          level: currentPlayer.level,
          rank: currentPlayer.rank,
          selectedMonster: currentPlayer.monsters[0],
          position: { x: 75, y: 25 },
          ready: false
        }
      });
      setBattlePhase('positioning');
    }
  };

  const createBattle = () => {
    if (!selectedLocation || !selectedWager) return;

    const newBattle: MultiplayerBattle = {
      id: `battle-${Date.now()}`,
      location: selectedLocation,
      challenger: {
        id: currentPlayer.id,
        username: currentPlayer.username,
        level: currentPlayer.level,
        rank: currentPlayer.rank,
        selectedMonster: currentPlayer.monsters[0],
        position: { x: 25, y: 75 },
        ready: false
      },
      opponent: null,
      battleState: 'waiting',
      currentTurn: 'challenger',
      turnTimer: 0,
      wager: selectedWager,
      spectators: [],
      createdAt: 'Just now'
    };

    setCurrentBattle(newBattle);
    setNearbyBattles(prev => [newBattle, ...prev]);
    setShowCreateBattle(false);
    setBattlePhase('positioning');
  };

  const challengePlayer = (playerId: string) => {
    setChallengeTarget(playerId);
    setShowChallengeModal(true);
  };

  const sendChallenge = () => {
    if (!challengeTarget || !selectedLocation || !selectedWager) return;
    
    alert(`Challenge sent to ${challengeTarget}! They have 30 seconds to respond.`);
    setShowChallengeModal(false);
  };

  const calculatePositionalAdvantage = (pos: PlayerPosition, opponentPos: PlayerPosition) => {
    const distance = Math.sqrt(Math.pow(pos.x - opponentPos.x, 2) + Math.pow(pos.y - opponentPos.y, 2));
    let advantages = [];
    let disadvantages = [];

    if (distance > 60) {
      advantages.push('Long Range Advantage (+20% ranged damage)');
    } else if (distance < 30) {
      advantages.push('Close Combat Bonus (+15% melee damage)');
    }

    if (pos.terrainType === 'elevated') {
      advantages.push('High Ground (+25% all damage)');
    }
    if (pos.terrainType === 'cover') {
      advantages.push('Cover Bonus (+30% defense)');
    }
    if (pos.terrainType === 'hazard') {
      disadvantages.push('Hazardous Terrain (-15% defense)');
    }

    return { advantages, disadvantages };
  };

  const moveToPosition = (x: number, y: number) => {
    let terrainType: PlayerPosition['terrainType'] = 'normal';
    
    // Determine terrain based on position and location
    if (selectedLocation?.type === 'nature') {
      if (y < 30) terrainType = 'elevated'; // Hills
      if (x > 70 && y > 70) terrainType = 'cover'; // Trees
    } else if (selectedLocation?.type === 'urban') {
      if (x < 30 || x > 70) terrainType = 'cover'; // Buildings
      if (y < 20) terrainType = 'elevated'; // Elevated platforms
    }

    const newPosition: PlayerPosition = { x, y, terrainType, advantages: [], disadvantages: [] };
    const advantage = calculatePositionalAdvantage(newPosition, opponentPosition);
    newPosition.advantages = advantage.advantages;
    newPosition.disadvantages = advantage.disadvantages;
    
    setPlayerPosition(newPosition);
  };

  const startCombat = () => {
    setBattlePhase('combat');
    setTurnTimer(30);
    setBattleLog([
      'Battle begins!',
      'Positioning advantages calculated',
      `${currentPlayer.username}'s turn - 30 seconds`
    ]);
  };

  const performBattleAction = (actionType: 'attack' | 'defend' | 'special' | 'reposition') => {
    let newLog = [...battleLog];
    let damage = 0;

    switch (actionType) {
      case 'attack':
        damage = Math.floor(Math.random() * 30) + 20;
        // Apply positional bonuses
        playerPosition.advantages.forEach(advantage => {
          if (advantage.includes('25%')) damage *= 1.25;
          if (advantage.includes('20%')) damage *= 1.2;
          if (advantage.includes('15%')) damage *= 1.15;
        });
        
        setOpponentHP(prev => Math.max(0, prev - Math.floor(damage)));
        newLog.push(`${currentPlayer.username} attacks for ${Math.floor(damage)} damage!`);
        break;
        
      case 'defend':
        newLog.push(`${currentPlayer.username} defends, reducing incoming damage!`);
        break;
        
      case 'special':
        damage = Math.floor(Math.random() * 40) + 30;
        setOpponentHP(prev => Math.max(0, prev - damage));
        newLog.push(`${currentPlayer.username} uses special ability for ${damage} damage!`);
        break;
        
      case 'reposition':
        newLog.push(`${currentPlayer.username} repositions for tactical advantage!`);
        setBattlePhase('positioning');
        return;
    }

    setBattleLog(newLog);
    setTurnTimer(30);

    if (opponentHP <= 0) {
      newLog.push('Victory! Battle completed!');
      setBattleLog(newLog);
    }
  };

  const getElementColor = (element: string) => {
    switch (element) {
      case 'Fire': return 'from-red-500 to-orange-600';
      case 'Earth': return 'from-green-500 to-emerald-600';
      case 'Air': return 'from-gray-400 to-blue-500';
      case 'Shadow': return 'from-purple-500 to-purple-700';
      case 'Lightning': return 'from-yellow-500 to-orange-500';
      case 'Ice': return 'from-cyan-400 to-blue-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getBattleStateColor = (state: string) => {
    switch (state) {
      case 'waiting': return 'text-yellow-400';
      case 'positioning': return 'text-blue-400';
      case 'combat': return 'text-red-400';
      case 'finished': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getLocationIcon = (type: string) => {
    switch (type) {
      case 'nature': return '🌳';
      case 'urban': return '🏙️';
      case 'historic': return '🏛️';
      case 'outdoor': return '🌤️';
      case 'indoor': return '🏢';
      default: return '📍';
    }
  };

  if (battlePhase !== 'lobby') {
    return (
      <div className="min-h-screen bg-gray-950 relative overflow-hidden">
        {/* Battle Interface */}
        <div className="fixed inset-0 bg-black z-[100] flex flex-col">
          
          {/* Battle Header */}
          <div className="bg-black/90 p-4 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setBattlePhase('lobby')}
                className="text-white"
              >
                <i className="ri-arrow-left-line text-xl mr-2"></i>
                Back to Lobby
              </button>
              <div className="text-center">
                <div className="text-white font-bold">{currentBattle?.location.name}</div>
                <div className="text-gray-400 text-sm">{battlePhase === 'spectating' ? 'Spectating' : 'Active Battle'}</div>
              </div>
              <div className="text-right">
                {battlePhase === 'combat' && (
                  <div className="text-red-400 font-bold text-lg animate-pulse">{turnTimer}s</div>
                )}
                <div className="text-gray-400 text-sm">{currentBattle?.spectators.length || 0} watching</div>
              </div>
            </div>
          </div>

          {/* AR Battle View */}
          <div className="flex-1 relative">
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(https://readdy.ai/api/search-image?query=$%7BcurrentBattle%3F.location.image%7D&width=375&height=600&seq=${currentBattle?.location.id}-multiplayer&orientation=portrait)`
              }}
            >
              <div className="absolute inset-0 bg-black/20">
                
                {/* Battle Status Overlay */}
                <div className="absolute top-4 left-4 right-4">
                  <div className="bg-black/80 rounded-lg p-3">
                    <div className="grid grid-cols-2 gap-4">
                      {/* Player 1 */}
                      <div className="text-center">
                        <div className="text-blue-400 font-bold">{currentBattle?.challenger.username}</div>
                        <div className="text-gray-300 text-sm">{currentBattle?.challenger.rank}</div>
                        <div className="bg-gray-700 rounded-full h-2 mt-1">
                          <div 
                            className="bg-blue-400 h-2 rounded-full transition-all"
                            style={{ width: `${isSpectating ? 85 : playerHP}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      {/* Player 2 */}
                      <div className="text-center">
                        <div className="text-red-400 font-bold">
                          {currentBattle?.opponent?.username || 'Waiting...'}
                        </div>
                        <div className="text-gray-300 text-sm">
                          {currentBattle?.opponent?.rank || 'No opponent'}
                        </div>
                        <div className="bg-gray-700 rounded-full h-2 mt-1">
                          <div 
                            className="bg-red-400 h-2 rounded-full transition-all"
                            style={{ width: `${isSpectating ? 72 : opponentHP}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Positioning Phase */}
                {battlePhase === 'positioning' && (
                  <div className="absolute inset-x-4 bottom-32">
                    <div className="bg-black/90 rounded-xl p-4">
                      <div className="text-center mb-4">
                        <div className="text-blue-400 font-bold text-lg">Tactical Positioning</div>
                        <div className="text-gray-300 text-sm">Choose your position for maximum advantage</div>
                      </div>

                      {/* Tactical Grid */}
                      <div className="relative bg-gray-800/50 rounded-lg p-2 mb-4" style={{ height: '200px' }}>
                        <div className="absolute inset-0 p-2">
                          <div className="grid grid-cols-4 grid-rows-4 gap-1 h-full">
                            {Array.from({ length: 16 }, (_, i) => {
                              const x = (i % 4) * 25 + 12.5;
                              const y = Math.floor(i / 4) * 25 + 12.5;
                              const isPlayerPos = Math.abs(x - playerPosition.x) < 15 && Math.abs(y - playerPosition.y) < 15;
                              const isOpponentPos = Math.abs(x - opponentPosition.x) < 15 && Math.abs(y - opponentPosition.y) < 15;
                              
                              return (
                                <button
                                  key={i}
                                  onClick={() => moveToPosition(x, y)}
                                  className={`w-full h-full rounded border-2 transition-all ${
                                    isPlayerPos ? 'bg-blue-600 border-blue-400' :
                                    isOpponentPos ? 'bg-red-600 border-red-400' :
                                    'bg-gray-700/50 border-gray-600 hover:bg-gray-600/50'
                                  }`}
                                >
                                  {isPlayerPos && <span className="text-white text-xs">👤</span>}
                                  {isOpponentPos && <span className="text-white text-xs">👥</span>}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Position Advantages */}
                      {playerPosition.advantages.length > 0 && (
                        <div className="bg-green-900/30 border border-green-700 rounded-lg p-3 mb-3">
                          <div className="text-green-400 font-semibold text-sm mb-1">Tactical Advantages:</div>
                          {playerPosition.advantages.map((advantage, idx) => (
                            <div key={idx} className="text-green-300 text-xs">{advantage}</div>
                          ))}
                        </div>
                      )}

                      <div className="flex space-x-3">
                        <button
                          onClick={() => setPlayerPosition(prev => ({ ...prev, ready: true }))}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold"
                        >
                          ✓ Ready for Battle
                        </button>
                        <button
                          onClick={startCombat}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold"
                          disabled={!currentBattle?.opponent}
                        >
                          ⚔️ Start Combat
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Combat Phase */}
                {battlePhase === 'combat' && (
                  <div className="absolute inset-x-4 bottom-32">
                    <div className="bg-black/90 rounded-xl p-4">
                      
                      {/* Turn Indicator */}
                      <div className="text-center mb-4">
                        <div className="text-white font-bold text-xl">Your Turn</div>
                        <div className="text-red-400 text-3xl font-bold animate-pulse">{turnTimer}</div>
                        <div className="text-gray-400 text-sm">seconds remaining</div>
                      </div>

                      {/* Battle Actions */}
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <button
                          onClick={() => performBattleAction('attack')}
                          className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold"
                        >
                          🔥 Attack
                        </button>
                        <button
                          onClick={() => performBattleAction('defend')}
                          className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
                        >
                          🛡️ Defend
                        </button>
                        <button
                          onClick={() => performBattleAction('special')}
                          className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold"
                        >
                          ✨ Special
                        </button>
                        <button
                          onClick={() => performBattleAction('reposition')}
                          className="bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold"
                        >
                          🎯 Reposition
                        </button>
                      </div>

                      {/* Environmental Effects */}
                      <div className="bg-purple-900/30 border border-purple-700 rounded-lg p-2">
                        <div className="text-purple-400 text-xs font-semibold mb-1">Environmental Effects:</div>
                        <div className="flex space-x-2">
                          {currentBattle?.location.environmentalEffects.map((effect, idx) => (
                            <div key={idx} className="bg-purple-800/50 text-purple-300 text-xs px-2 py-1 rounded">
                              {effect.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Spectating Interface */}
                {battlePhase === 'spectating' && (
                  <div className="absolute inset-x-4 bottom-32">
                    <div className="bg-black/90 rounded-xl p-4">
                      <div className="text-center mb-4">
                        <div className="text-purple-400 font-bold text-lg">👁️ Spectating Battle</div>
                        <div className="text-gray-300 text-sm">
                          {currentBattle?.challenger.username} vs {currentBattle?.opponent?.username}
                        </div>
                      </div>

                      {/* Current Turn Info */}
                      <div className="bg-gray-800/50 rounded-lg p-3 mb-4">
                        <div className="text-center">
                          <div className="text-white font-semibold">
                            {currentBattle?.currentTurn === 'challenger' ? currentBattle.challenger.username : currentBattle?.opponent?.username}'s Turn
                          </div>
                          <div className="text-red-400 text-2xl font-bold">{currentBattle?.turnTimer || 0}s</div>
                        </div>
                      </div>

                      {/* Spectator Actions */}
                      <div className="grid grid-cols-2 gap-3">
                        <button className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm">
                          👍 Cheer
                        </button>
                        <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-sm">
                          💬 Chat
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Battle Log */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black/80 rounded-lg p-3 max-h-24 overflow-y-auto">
                    <div className="text-yellow-400 text-xs font-semibold mb-1">Battle Log:</div>
                    {battleLog.slice(-3).map((log, idx) => (
                      <div key={idx} className="text-gray-300 text-xs">{log}</div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Monster Selection */}
          <div className="bg-black/90 p-4 border-t border-gray-800">
            <div className="flex space-x-3 overflow-x-auto">
              {currentPlayer.monsters.map((monster) => (
                <div key={monster.id} className="flex-shrink-0 bg-gray-800 border border-gray-700 rounded-lg p-3 min-w-[120px]">
                  <div className="text-center">
                    <div className="text-2xl mb-1">
                      {monster.element === 'Fire' ? '🔥' : '⛰️'}
                    </div>
                    <div className="text-white text-xs font-semibold">{monster.name}</div>
                    <div className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${getElementColor(monster.element)} mt-1`}>
                      {monster.element}
                    </div>
                    <div className="text-gray-400 text-xs mt-1">
                      {monster.power}⚔️ {monster.defense}🛡️
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 pt-20 pb-24 relative overflow-hidden">
      {/* Atmospheric Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/20 via-transparent to-black/40"></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full bg-black/40 backdrop-blur-md z-50 border-b border-red-800/30">
        <div className="px-4 py-3 flex items-center justify-between">
          <Link href="/duel-monster-world" className="flex items-center">
            <i className="ri-arrow-left-line text-white text-xl mr-2"></i>
            <span className="text-white font-semibold">Multiplayer Battles</span>
          </Link>
          <div className="flex items-center space-x-3">
            <div className="text-green-400 text-sm">● {nearbyBattles.length} Live</div>
            <div className="text-white text-sm">👥 {connectedPlayers.length}</div>
          </div>
        </div>
      </header>

      {/* Create Battle Modal */}
      {showCreateBattle && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-gray-900 border-2 border-blue-600 rounded-2xl p-6 max-w-sm w-full max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-4">
              <div className="text-3xl mb-2">⚔️</div>
              <h3 className="text-xl font-bold text-white mb-2">Create Battle</h3>
              <p className="text-gray-300 text-sm">Set up your multiplayer challenge</p>
            </div>

            {/* Location Selection */}
            <div className="mb-4">
              <div className="text-white font-semibold mb-2">Choose Location:</div>
              <div className="space-y-2">
                {battleLocations.map((location) => (
                  <button
                    key={location.id}
                    onClick={() => setSelectedLocation(location)}
                    className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                      selectedLocation?.id === location.id ? 'border-blue-500 bg-blue-900/30' : 'border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{getLocationIcon(location.type)}</span>
                        <div className="text-white font-semibold text-sm">{location.name}</div>
                      </div>
                      <div className="text-gray-400 text-xs">
                        {location.currentPlayers}/{location.capacity}
                      </div>
                    </div>
                    <div className="text-gray-300 text-xs">
                      {location.environmentalEffects.length} environmental effects • {location.weatherCondition}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Wager Selection */}
            <div className="mb-6">
              <div className="text-white font-semibold mb-2">Set Wager:</div>
              <div className="space-y-2">
                {wagerOptions.map((wager, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedWager(wager)}
                    className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                      selectedWager === wager ? 'border-purple-500 bg-purple-900/30' : 'border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-white text-sm">{wager.label}</div>
                      <div className={`text-xs px-2 py-1 rounded-full ${
                        wager.risk === 'Low' ? 'bg-green-900/50 text-green-400' :
                        wager.risk === 'Medium' ? 'bg-yellow-900/50 text-yellow-400' :
                        wager.risk === 'High' ? 'bg-orange-900/50 text-orange-400' :
                        'bg-red-900/50 text-red-400'
                      }`}>
                        {wager.risk} Risk
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowCreateBattle(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={createBattle}
                disabled={!selectedLocation || !selectedWager}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold disabled:opacity-50"
              >
                Create Battle
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Challenge Modal */}
      {showChallengeModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-gray-900 border-2 border-red-600 rounded-2xl p-6 max-w-sm w-full">
            <div className="text-center mb-4">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="text-xl font-bold text-white mb-2">Challenge Player</h3>
              <p className="text-gray-300 text-sm">Send direct battle challenge to {challengeTarget}</p>
            </div>

            {/* Quick Challenge Options */}
            <div className="space-y-3 mb-6">
              <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold">
                ⚔️ Quick Match (Auto Location)
              </button>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold">
                🎯 Custom Challenge
              </button>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowChallengeModal(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={sendChallenge}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-bold"
              >
                Send Challenge
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <section className="pt-20 px-4 py-4 relative z-10">
        <div className="flex bg-gray-800/50 rounded-xl p-1 mb-6">
          <button
            onClick={() => setActiveTab('nearby')}
            className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'nearby' ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            ⚔️ Nearby Battles ({nearbyBattles.length})
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'create' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            🆕 Create Battle
          </button>
          <button
            onClick={() => setActiveTab('spectate')}
            className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'spectate' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            👁️ Spectate
          </button>
        </div>
      </section>

      {/* Real-time Updates Feed */}
      <section className="px-4 py-4 relative z-10">
        <div className="bg-gray-900/70 border border-green-700 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="text-green-400 font-bold">🔴 Live Updates</div>
            <div className="text-green-400 text-sm animate-pulse">● LIVE</div>
          </div>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {realTimeUpdates.map((update, idx) => (
              <div key={idx} className="text-gray-300 text-sm flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <div>{update}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      {activeTab === 'nearby' && (
        <section className="px-4 py-4 relative z-10">
          <h2 className="text-xl font-bold text-white mb-4">⚔️ Active Battles Nearby</h2>
          <div className="space-y-4">
            {nearbyBattles.map((battle) => (
              <div key={battle.id} className="bg-gray-800/70 border border-gray-700 rounded-xl p-4">
                
                {/* Battle Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{getLocationIcon(battle.location.type)}</div>
                    <div>
                      <div className="text-white font-semibold">{battle.location.name}</div>
                      <div className="text-gray-400 text-sm">{battle.createdAt}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold text-sm ${getBattleStateColor(battle.battleState)}`}>
                      {battle.battleState.toUpperCase()}
                    </div>
                    {battle.battleState === 'combat' && (
                      <div className="text-red-400 text-sm animate-pulse">⏰ {battle.turnTimer}s</div>
                    )}
                  </div>
                </div>

                {/* Players */}
                <div className="grid grid-cols-2 gap-4 mb-3">
                  {/* Challenger */}
                  <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-3">
                    <div className="text-center">
                      <div className="text-blue-400 font-bold text-sm">{battle.challenger.username}</div>
                      <div className="text-gray-300 text-xs">{battle.challenger.rank}</div>
                      <div className="mt-2">
                        <div className="text-white text-xs font-semibold">{battle.challenger.selectedMonster.name}</div>
                        <div className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${getElementColor(battle.challenger.selectedMonster.element)} mt-1`}>
                          {battle.challenger.selectedMonster.element}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Opponent */}
                  <div className="bg-red-900/30 border border-red-700 rounded-lg p-3">
                    <div className="text-center">
                      {battle.opponent ? (
                        <>
                          <div className="text-red-400 font-bold text-sm">{battle.opponent.username}</div>
                          <div className="text-gray-300 text-xs">{battle.opponent.rank}</div>
                          <div className="mt-2">
                            <div className="text-white text-xs font-semibold">{battle.opponent.selectedMonster.name}</div>
                            <div className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${getElementColor(battle.opponent.selectedMonster.element)} mt-1`}>
                              {battle.opponent.selectedMonster.element}
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="text-gray-500 font-bold text-sm">Waiting...</div>
                          <div className="text-gray-600 text-xs">Open Slot</div>
                          <div className="mt-2">
                            <div className="text-gray-500 text-xs">No opponent yet</div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Battle Details */}
                <div className="flex items-center justify-between mb-3">
                  <div className="text-purple-400 text-sm">
                    Wager: {battle.wager.amount} {battle.wager.type.replace('_', ' ')}
                  </div>
                  <div className="text-gray-400 text-sm">
                    👁️ {battle.spectators.length} watching
                  </div>
                </div>

                {/* Environmental Effects */}
                <div className="mb-4">
                  <div className="text-gray-400 text-xs mb-1">Environmental Effects:</div>
                  <div className="flex space-x-2 overflow-x-auto">
                    {battle.location.environmentalEffects.map((effect, idx) => (
                      <div key={idx} className="bg-purple-900/30 text-purple-300 text-xs px-2 py-1 rounded-full whitespace-nowrap">
                        {effect.name}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  {!battle.opponent ? (
                    <button
                      onClick={() => joinBattle(battle)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold text-sm"
                    >
                      ⚔️ Join Battle
                    </button>
                  ) : (
                    <button
                      onClick={() => joinBattle(battle)}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold text-sm"
                    >
                      👁️ Spectate ({battle.spectators.length})
                    </button>
                  )}
                  <button
                    onClick={() => challengePlayer(battle.challenger.username)}
                    className="px-4 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg text-sm"
                  >
                    ⚡ Challenge
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {activeTab === 'create' && (
        <section className="px-4 py-4 relative z-10">
          <h2 className="text-xl font-bold text-white mb-4">🆕 Create New Battle</h2>
          
          {/* Quick Create */}
          <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-700 rounded-xl p-6 mb-6">
            <div className="text-center mb-4">
              <div className="text-3xl mb-2">⚔️</div>
              <h3 className="text-white font-bold text-lg">Start Your Battle</h3>
              <p className="text-gray-300 text-sm">Challenge players at your location</p>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={() => setShowCreateBattle(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-bold text-lg"
              >
                🎯 Custom Battle Setup
              </button>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold">
                ⚡ Quick Match (Auto Setup)
              </button>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold">
                🏆 Tournament Mode
              </button>
            </div>
          </div>

          {/* Available Locations */}
          <div className="mb-6">
            <h3 className="text-white font-bold mb-3">📍 Available Battle Locations</h3>
            <div className="space-y-3">
              {battleLocations.map((location) => (
                <div key={location.id} className="bg-gray-800/70 border border-gray-700 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{getLocationIcon(location.type)}</div>
                      <div>
                        <div className="text-white font-semibold">{location.name}</div>
                        <div className="text-gray-400 text-sm capitalize">{location.type} Environment</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 text-sm font-bold">
                        {location.currentPlayers}/{location.capacity}
                      </div>
                      <div className="text-gray-400 text-xs">Players</div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 mb-3">
                    {location.environmentalEffects.map((effect, idx) => (
                      <div key={idx} className="bg-purple-900/30 text-purple-300 text-xs px-2 py-1 rounded">
                        {effect.name}
                      </div>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => {
                      setSelectedLocation(location);
                      setShowCreateBattle(true);
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-semibold"
                  >
                    Create Battle Here
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeTab === 'spectate' && (
        <section className="px-4 py-4 relative z-10">
          <h2 className="text-xl font-bold text-white mb-4">👁️ Live Battles to Watch</h2>
          
          {/* Featured Battle */}
          <div className="bg-gradient-to-r from-red-900/50 to-purple-900/50 border border-red-700 rounded-xl p-6 mb-6">
            <div className="text-center mb-4">
              <div className="text-red-400 font-bold text-sm animate-pulse">🔴 FEATURED LIVE BATTLE</div>
              <div className="text-white font-bold text-lg">Epic Championship Match</div>
              <div className="text-gray-300 text-sm">ElementalKing vs IceQueen at Times Square</div>
            </div>
            
            <div className="flex justify-center space-x-4 mb-4">
              <div className="text-center">
                <div className="text-2xl mb-1">⚡</div>
                <div className="text-yellow-400 font-bold">ElementalKing</div>
                <div className="text-gray-300 text-sm">Storm Phoenix Lv.28</div>
              </div>
              <div className="text-center">
                <div className="text-4xl text-red-400 animate-pulse">VS</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">❄️</div>
                <div className="text-cyan-400 font-bold">IceQueen</div>
                <div className="text-gray-300 text-sm">Frost Dragon Lv.25</div>
              </div>
            </div>
            
            <div className="text-center mb-4">
              <div className="text-purple-400 text-lg font-bold">👁️ 847 viewers</div>
              <div className="text-gray-400 text-sm">Turn 12 • IceQueen's turn in 15s</div>
            </div>
            
            <button
              onClick={() => {
                const featuredBattle = nearbyBattles.find(b => b.battleState === 'combat');
                if (featuredBattle) joinBattle(featuredBattle);
              }}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold text-lg"
            >
              📺 Watch Live Battle
            </button>
          </div>

          {/* Other Live Battles */}
          <div className="space-y-3">
            {nearbyBattles.filter(b => b.battleState === 'combat' || b.battleState === 'positioning').map((battle) => (
              <div key={battle.id} className="bg-gray-800/70 border border-purple-700 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-white font-semibold">{battle.location.name}</div>
                    <div className="text-purple-400 text-sm">
                      {battle.challenger.username} vs {battle.opponent?.username || 'Waiting'}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-purple-400 font-bold">👁️ {battle.spectators.length}</div>
                    <div className="text-gray-400 text-xs">watching</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="text-gray-300 text-sm">
                    Wager: {battle.wager.amount} {battle.wager.type.replace('_', ' ')}
                  </div>
                  <div className={`text-sm ${getBattleStateColor(battle.battleState)}`}>
                    {battle.battleState === 'combat' ? `Turn ${Math.floor(Math.random() * 15) + 1}` : 'Setting up'}
                  </div>
                </div>
                
                <button
                  onClick={() => joinBattle(battle)}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold"
                >
                  👁️ Spectate Battle
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Multiplayer Features Guide */}
      <section className="px-4 py-6 relative z-10 mb-20">
        <div className="bg-orange-900/30 border border-orange-700 rounded-xl p-4">
          <h3 className="text-orange-400 font-bold mb-3">🎮 Multiplayer Features</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">⚔️</span>
              </div>
              <div>
                <div className="text-white font-semibold">Real-time PvP Combat</div>
                <div className="text-gray-300 text-xs">30-second turns with live positioning and tactical decisions</div>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">👁️</span>
              </div>
              <div>
                <div className="text-white font-semibold">Live Spectating</div>
                <div className="text-gray-300 text-xs">Watch battles in real-time with chat and reactions</div>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">📍</span>
              </div>
              <div>
                <div className="text-white font-semibold">Location-based Battles</div>
                <div className="text-gray-300 text-xs">Fight at real-world locations with environmental advantages</div>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">🏆</span>
              </div>
              <div>
                <div className="text-white font-semibold">Wagering System</div>
                <div className="text-gray-300 text-xs">Bet blank cards, experience, or rare items on battle outcomes</div>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-yellow-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">⚡</span>
              </div>
              <div>
                <div className="text-white font-semibold">Direct Challenges</div>
                <div className="text-gray-300 text-xs">Challenge specific players for instant PvP matches</div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}