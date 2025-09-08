
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import MonsterRoster from './MonsterRoster';

export default function DuelMonsterWorld() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState('capture');
  const [playerRank, setPlayerRank] = useState('Bronze Summoner');
  const [summonEnergy, setSummonEnergy] = useState(845);
  const [blankCards, setBlankCards] = useState(8);
  const [selectedStarter, setSelectedStarter] = useState<any>(null);
  const [showStarterSelection, setShowStarterSelection] = useState(true);
  const [showStarterModal, setShowStarterModal] = useState(false);
  const [showCaptureMode, setShowCaptureMode] = useState(false);
  const [showCaptureBattle, setShowCaptureBattle] = useState(false);
  const [showDuelBattle, setShowDuelBattle] = useState(false);
  const [showTradingModal, setShowTradingModal] = useState(false);
  const [targetMonster, setTargetMonster] = useState<any>(null);
  const [hasStarter, setHasStarter] = useState(false);
  const [showProgressionFlow, setShowProgressionFlow] = useState(false);
  const [playerLevel, setPlayerLevel] = useState(1);
  const [arenaRank, setArenaRank] = useState('Bronze Summoner');
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [showLocationDetection, setShowLocationDetection] = useState(false);
  const [detectedMonsters, setDetectedMonsters] = useState<any[]>([]);
  const [currentLocation, setCurrentLocation] = useState<'indoor' | 'outdoor'>('indoor');
  const [playerBattleTeam, setPlayerBattleTeam] = useState<any[]>([]);
  const [battlePhase, setBattlePhase] = useState<'selecting' | 'battle' | 'victory' | 'defeat'>(
    'selecting'
  );
  const [playerHP, setPlayerHP] = useState(100);
  const [monsterHP, setMonsterHP] = useState(100);
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [showMonsterScan, setShowMonsterScan] = useState(false);
  const [showMonsterDetailModal, setShowMonsterDetailModal] = useState(false);
  const [selectedMonsterDetail, setSelectedMonsterDetail] = useState<any>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const isDayTime = () => {
    const hour = currentTime.getHours();
    return hour >= 6 && hour <= 18;
  };

  // Enhanced location-based monster detection
  const indoorMonsters = [
    {
      id: 'house-spirit',
      name: 'House Spirit',
      element: 'Light',
      type: 'Guardian',
      rarity: 'Common',
      power: 800,
      defense: 1200,
      hp: 85,
      maxHp: 100,
      difficulty: 'Easy',
      captureRate: 90,
      location: 'Living Room',
      behavior: 'Friendly protector that guards homes from negative energy',
      abilities: ['Purify', 'Light Shield', 'Blessing Aura'],
      image:
        'Gentle house spirit with warm golden glow protecting family home, friendly guardian entity with comforting presence, domestic protector with light magic aura'
    },
    {
      id: 'shadow-cat',
      name: 'Shadow Cat',
      element: 'Shadow',
      type: 'Familiar',
      rarity: 'Common',
      power: 600,
      defense: 800,
      hp: 90,
      maxHp: 100,
      difficulty: 'Easy',
      captureRate: 85,
      location: 'Bedroom',
      behavior: 'Playful shadow that moves between furniture and walls',
      abilities: ['Shadow Pounce', 'Stealth', 'Night Vision'],
      image:
        'Playful shadow cat moving through bedroom furniture, cute dark familiar with glowing eyes, mischievous shadow creature in cozy home setting'
    },
    {
      id: 'kitchen-imp',
      name: 'Kitchen Imp',
      element: 'Fire',
      type: 'Helper',
      rarity: 'Rare',
      power: 1000,
      defense: 600,
      hp: 75,
      maxHp: 100,
      difficulty: 'Medium',
      captureRate: 70,
      location: 'Kitchen',
      behavior: 'Mischievous imp that plays with cooking flames and utensils',
      abilities: ['Flame Burst', 'Heat Control', 'Cooking Magic'],
      image:
        'Mischievous kitchen imp playing with cooking flames, small fire elemental among kitchen utensils, helpful culinary spirit with flame magic'
    },
    {
      id: 'attic-guardian',
      name: 'Attic Guardian',
      element: 'Earth',
      type: 'Ancient',
      rarity: 'Epic',
      power: 1800,
      defense: 2200,
      hp: 120,
      maxHp: 150,
      difficulty: 'Hard',
      captureRate: 45,
      location: 'Attic',
      behavior: 'Ancient guardian protecting family memories and treasures',
      abilities: ['Memory Shield', 'Dust Storm', 'Ancient Wisdom'],
      image:
        'Ancient attic guardian protecting old family treasures, wise earth elemental among stored memories, mystical protector in dusty attic space'
    }
  ];

  const outdoorMonsters = [
    {
      id: 'garden-sprite',
      name: 'Garden Sprite',
      element: 'Nature',
      type: 'Elemental',
      rarity: 'Common',
      power: 700,
      defense: 900,
      hp: 80,
      maxHp: 100,
      difficulty: 'Easy',
      captureRate: 95,
      location: 'Garden',
      behavior: 'Tends to plants and flowers with gentle nature magic',
      abilities: ['Grow', 'Heal', 'Nature Bond'],
      image:
        'Tiny garden sprite tending to blooming flowers, nature elemental with plant magic, gentle creature in beautiful garden setting'
    },
    {
      id: 'wind-dancer',
      name: 'Wind Dancer',
      element: 'Air',
      type: 'Elemental',
      rarity: 'Rare',
      power: 1200,
      defense: 800,
      hp: 70,
      maxHp: 100,
      difficulty: 'Medium',
      captureRate: 75,
      location: 'Open Field',
      behavior: 'Graceful spirit that rides wind currents and creates breezes',
      abilities: ['Gust', 'Wind Shield', 'Air Dance'],
      image:
        'Graceful wind dancer riding air currents in open field, ethereal air elemental with flowing movement, elegant spirit in windy landscape'
    },
    {
      id: 'street-phantom',
      name: 'Street Phantom',
      element: 'Dark',
      type: 'Urban Spirit',
      rarity: 'Rare',
      power: 1400,
      defense: 1000,
      hp: 95,
      maxHp: 120,
      difficulty: 'Medium',
      captureRate: 60,
      location: 'Street',
      behavior: 'Mysterious entity that haunts urban areas at night',
      abilities: ['Shadow Dash', 'Urban Camouflage', 'Night Terror'],
      image:
        'Mysterious street phantom haunting urban nighttime environment, dark spirit moving through city streets, urban ghost with shadowy presence'
    },
    {
      id: 'park-beast',
      name: 'Park Beast',
      element: 'Nature',
      type: 'Wild',
      rarity: 'Epic',
      power: 2000,
      defense: 1600,
      hp: 140,
      maxHp: 180,
      difficulty: 'Hard',
      captureRate: 40,
      location: 'Park',
      behavior: 'Powerful nature guardian protecting public green spaces',
      abilities: ['Bark Armor', 'Root Bind', 'Nature Rage'],
      image:
        'Powerful park beast guardian protecting green spaces, massive nature elemental with bark armor, wild protector in public park setting'
    },
    {
      id: 'storm-hawk',
      name: 'Storm Hawk',
      element: 'Lightning',
      type: 'Sky Hunter',
      rarity: 'Epic',
      power: 2200,
      defense: 1200,
      hp: 110,
      maxHp: 130,
      difficulty: 'Hard',
      captureRate: 35,
      location: 'Rooftop',
      behavior: 'Majestic lightning bird that soars during thunderstorms',
      abilities: ['Thunder Strike', 'Lightning Speed', 'Storm Call'],
      image:
        'Majestic storm hawk with lightning powers soaring above city rooftops, electric bird with glowing thunder wings, powerful sky hunter in stormy weather'
    }
  ];

  // Battle system
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
    }
  ];

  const detectNearbyMonsters = () => {
    const locationMonsters = currentLocation === 'indoor' ? indoorMonsters : outdoorMonsters;
    const timeModifier = isDayTime() ? 'day' : 'night';

    // Simulate monster detection based on location and time
    const detected = locationMonsters.filter(() => Math.random() > 0.3);
    setDetectedMonsters(detected);
    setShowLocationDetection(true);
  };

  const startBattleWithMonster = (monster: any) => {
    setTargetMonster(monster);
    setShowCaptureBattle(true);
    setShowLocationDetection(false);
    setBattlePhase('battle');
    setPlayerHP(100);
    setMonsterHP(monster.hp);
    setBattleLog([`Wild ${monster.name} appeared!`, `You sent out ${playerTeam[0].name}!`]);
  };

  const performBattleAction = (actionType: 'attack' | 'defend' | 'capture') => {
    if (!targetMonster) return;

    let newBattleLog = [...battleLog];
    let newPlayerHP = playerHP;
    let newMonsterHP = monsterHP;

    switch (actionType) {
      case 'attack':
        const playerDamage = Math.floor(Math.random() * 30) + 20;
        newMonsterHP = Math.max(0, newMonsterHP - playerDamage);
        newBattleLog.push(`${playerTeam[0].name} used Ember Shot! Dealt ${playerDamage} damage!`);

        if (newMonsterHP > 0) {
          const monsterDamage = Math.floor(Math.random() * 25) + 15;
          newPlayerHP = Math.max(0, newPlayerHP - monsterDamage);
          newBattleLog.push(`${targetMonster.name} counterattacked! Dealt ${monsterDamage} damage!`);
        }
        break;

      case 'defend':
        newBattleLog.push(`${playerTeam[0].name} used Heat Shield! Defense increased!`);
        const reducedDamage = Math.floor(Math.random() * 10) + 5;
        newPlayerHP = Math.max(0, newPlayerHP - reducedDamage);
        newBattleLog.push(`${targetMonster.name} attacked but damage was reduced!`);
        break;

      case 'capture':
        if (newMonsterHP < targetMonster.maxHp * 0.3) {
          const captureSuccess = Math.random() < targetMonster.captureRate / 100;
          if (captureSuccess) {
            newBattleLog.push(`Success! ${targetMonster.name} was captured!`);
            setBlankCards((prev) => prev - 1);
            setBattlePhase('victory');
            return;
          } else {
            newBattleLog.push(`${targetMonster.name} broke free from the Blank Card!`);
          }
        } else {
          newBattleLog.push(`${targetMonster.name} is too strong! Weaken it first!`);
        }
        break;
    }

    setPlayerHP(newPlayerHP);
    setMonsterHP(newMonsterHP);
    setBattleLog(newBattleLog);

    // Check battle end conditions
    if (newPlayerHP <= 0) {
      setBattlePhase('defeat');
      newBattleLog.push('You were defeated! Try again with a stronger strategy.');
    } else if (newMonsterHP <= 0) {
      setBattlePhase('victory');
      newBattleLog.push(`${targetMonster.name} was defeated! Perfect time to capture!`);
    }
  };

  const starterMonsters = [
    {
      id: 1,
      name: 'FLARE DRAKE',
      level: 1,
      element: 'Fire',
      type: 'Dragon',
      image:
        'https://readdy.ai/api/search-image?query=Majestic%20red%20fire%20dragon%20with%20glowing%20orange%20eyes%20and%20flame%20patterns%2C%20ancient%20runic%20border%2C%20fantasy%20card%20game%20art%20style%2C%20dark%20volcanic%20background%20with%20lava%20flows%2C%20detailed%20dragon%20scales%2C%20powerful%20wings%20spread%2C%20breathing%20fire%2C%20mystical%20atmosphere%2C%202024-01-15',
      uniqueTraits: ['Lava Immunity', 'Flight Master', 'Alpha Dominant', 'Fire Breather'],
      battleStats: {
        wins: 42,
        losses: 8,
        totalBattles: 50,
        winRate: 84
      }
    }
  ];

  const wildMonsters = [
    {
      id: 'forest-bear',
      name: 'Forest Guardian',
      element: 'Nature',
      difficulty: 'Easy',
      captureRate: 85,
      location: 'Forest Park',
      weakenRequired: false,
      power: 1600,
      cardCost: 1,
      image:
        'Massive forest guardian bear with moss and tree bark covering, nature elemental beast with gentle green eyes, woodland creature with leaf patterns, natural outdoor setting',
      evolutionPath: 'Forest Guardian → Grove Warden → Nature Sovereign'
    },
    {
      id: 'shadow-panther',
      name: 'Shadow Panther',
      element: 'Dark',
      difficulty: 'Medium',
      captureRate: 60,
      location: 'Abandoned Buildings',
      weakenRequired: true,
      power: 2200,
      cardCost: 2,
      image:
        'Sleek shadow panther with dark energy aura, mysterious feline creature with glowing purple eyes, stealth predator with shadow magic effects, gothic atmosphere'
    },
    {
      id: 'crystal-dragon',
      name: 'Crystal Dragon',
      element: 'Ice',
      difficulty: 'Hard',
      captureRate: 35,
      location: 'Mountain Peak',
      weakenRequired: true,
      power: 2800,
      cardCost: 3,
      image:
        'Majestic crystal dragon with ice formations on wings, legendary ice elemental with diamond-like scales, powerful arctic dragon with frost breath, epic mountain backdrop'
    },
    {
      id: 'flame-phoenix',
      name: 'Flame Phoenix',
      element: 'Fire',
      difficulty: 'Legendary',
      captureRate: 15,
      location: 'Volcanic Crater',
      weakenRequired: true,
      power: 3500,
      cardCost: 4,
      image:
        'Magnificent flame phoenix with burning wings, legendary fire bird with solar energy, rebirth creature with golden flames, epic volcanic environment with lava flows'
    },
    {
      id: 'thunder-wolf',
      name: 'Thunder Wolf',
      element: 'Lightning',
      difficulty: 'Medium',
      captureRate: 55,
      location: 'Storm Plains',
      weakenRequired: true,
      power: 2100,
      cardCost: 2,
      image:
        'Electric wolf with glowing lightning patterns, energetic beast with sparking fur, dynamic lightning elemental with fierce expression, thunderstorm background'
    }
  ];

  const activeDuels = [
    {
      id: 'duel-1',
      opponent: 'DragonMaster47',
      rank: 'Silver Duelist',
      monsters: ['Pyro Wyvern Lv.22', 'Thunder Alpha Lv.19', 'Void Stalker Lv.21'],
      element: 'Fire',
      arena: 'Volcanic Arena',
      timeLeft: '2m 45s',
      wager: '3 Blank Cards'
    },
    {
      id: 'duel-2',
      opponent: 'StormCaller91',
      rank: 'Bronze Champion',
      monsters: ['Sky Leviathan Lv.18', 'Forest Guardian Lv.16', 'Crystal Dragon Lv.24'],
      element: 'Air',
      arena: 'Sky Colosseum',
      timeLeft: '5m 12s',
      wager: '2 Evolution Shards'
    },
    {
      id: 'duel-3',
      opponent: 'ShadowHunter23',
      rank: 'Gold Summoner',
      monsters: ['Void Warlord Lv.28', 'Darkness Lord Lv.25', 'Abyss Stalker Lv.23'],
      element: 'Shadow',
      arena: 'Twilight Realm',
      timeLeft: '8m 30s',
      wager: '1 Legendary Relic'
    }
  ];

  const tradeOffers = [
    {
      id: 'trade-1',
      player: 'ElementalKing',
      offering: {
        type: 'Summon Relic',
        monster: 'Inferno Dragon Lv.30',
        bondLevel: 85,
        rarity: 'Epic'
      },
      requesting: {
        type: 'Summon Relic',
        monster: 'Absolute Zero Lv.28+',
        rarity: 'Epic+'
      },
      bondBonus: '+30% EXP for both monsters',
      timeLeft: '1h 45m',
      tradeLocked: false
    },
    {
      id: 'trade-2',
      player: 'MysticBreeder',
      offering: {
        type: 'Blank Cards',
        quantity: 5,
        rarity: 'Premium'
      },
      requesting: {
        type: 'Evolution Relic',
        item: 'Storm Crystal',
        rarity: 'Rare'
      },
      bondBonus: 'Enhanced capture rate',
      timeLeft: '4h 20m',
      tradeLocked: false
    },
    {
      id: 'trade-3',
      player: 'LegendaryCollector',
      offering: {
        type: 'Summon Relic',
        monster: 'Celestial Phoenix Lv.35',
        bondLevel: 100,
        rarity: 'Legendary'
      },
      requesting: {
        type: 'Multiple Relics',
        monsters: ['Epic Dragon', 'Epic Beast', 'Epic Elemental'],
        rarity: 'Epic'
      },
      bondBonus: 'Legendary Bond Transfer',
      timeLeft: '12h 00m',
      tradeLocked: true,
      note: 'One-time trade only - Legendary restriction'
    }
  ];

  const progressionSteps = [
    {
      step: 1,
      title: 'Choose Starter Monster',
      description: 'Select 1 of 5 beginner monsters bound to your First Blank Card',
      icon: '🐲',
      status: hasStarter ? 'complete' : 'current',
      reward: 'First Summon Relic + Permanent Monster Bond'
    },
    {
      step: 2,
      title: 'Explore & Find Blank Cards',
      description: 'Discover Blank Cards in the wild at various locations',
      icon: '📜',
      status: hasStarter ? 'current' : 'locked',
      reward: 'Capture tools + Location mastery'
    },
    {
      step: 3,
      title: 'Encounter Wild Monsters',
      description: 'Find and weaken monsters for Blank Card absorption',
      icon: '🎯',
      status: hasStarter ? 'available' : 'locked',
      reward: 'Monster collection + Blank Card transformation'
    },
    {
      step: 4,
      title: 'Build Your Relic Deck',
      description: 'Collect Summon Relics to create powerful battle deck',
      icon: '🎴',
      status: hasStarter ? 'available' : 'locked',
      reward: 'Battle deck + Strategic combinations'
    },
    {
      step: 5,
      title: 'Enter AR Duels',
      description: 'Summon monsters into real-time AR battlefields',
      icon: '⚔️',
      status: 'locked',
      reward: 'Battle EXP + Blank Cards + Crafting Shards'
    },
    {
      step: 6,
      title: 'Level & Evolve Monsters',
      description: 'Level up through battles and feeding, unlock evolutions',
      icon: '✨',
      status: 'locked',
      reward: 'Monster evolution + Advanced forms + Special abilities'
    },
    {
      step: 7,
      title: 'Trade with Others',
      description: 'Exchange Relics and Blank Cards for Bond Boosts',
      icon: '🤝',
      status: 'locked',
      reward: 'Collection expansion + Bond EXP boost + Rare variants'
    },
    {
      step: 8,
      title: 'Join Legendary Raids',
      description: 'Team up to capture Legendary Relics in epic battles',
      icon: '🌟',
      status: 'locked',
      reward: 'Legendary monsters + Exclusive relics + Master status'
    }
  ];

  const monetizationPacks = [
    {
      name: 'Blank Card Pack',
      price: '$2.99',
      contents: ['5 Premium Blank Cards', 'Enhanced Capture Rate', '1 Rare Evolution Shard'],
      description: 'More chances to capture rare monsters with better success rate',
      icon: '📜',
      color: 'from-gray-600 to-purple-800'
    },
    {
      name: 'Premium Relic Designs',
      price: '$4.99',
      contents: ['Alternate Artwork Pack', '3 Monster Redesigns', 'Exclusive Animations'],
      description: 'Customize your Summon Relics with alternate artwork',
      icon: '🎨',
      color: 'from-blue-600 to-cyan-800'
    },
    {
      name: 'Arena Pass',
      price: '$9.99',
      contents: ['Exclusive PvP Tournaments', 'Double Battle Rewards', 'Premium Arenas'],
      description: 'Enter elite tournaments with rare rewards',
      icon: '🏆',
      color: 'from-orange-600 to-red-800'
    },
    {
      name: 'Evolution Relic Pack',
      price: '$6.99',
      contents: ['3 Evolution Relics', 'Alternate Evolution Paths', 'Special Conditions Unlock'],
      description: 'Unlock unique evolution routes for your monsters',
      icon: '✨',
      color: 'from-purple-600 to-pink-800'
    }
  ];

  const getStepStatus = (status: string) => {
    switch (status) {
      case 'complete':
        return 'bg-green-600 text-white';
      case 'current':
        return 'bg-blue-600 text-white animate-pulse';
      case 'available':
        return 'bg-purple-600 text-white';
      case 'locked':
        return 'bg-gray-600 text-gray-400';
      default:
        return 'bg-gray-600 text-gray-400';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-600';
      case 'Medium':
        return 'bg-yellow-600';
      case 'Hard':
        return 'bg-orange-600';
      case 'Legendary':
        return 'bg-red-600';
      default:
        return 'bg-gray-600';
    }
  };

  const getElementColor = (element: string) => {
    switch (element) {
      case 'Fire':
        return 'from-red-500 to-orange-600';
      case 'Water':
        return 'from-blue-500 to-cyan-600';
      case 'Earth':
        return 'from-green-500 to-emerald-600';
      case 'Air':
        return 'from-gray-400 to-blue-500';
      case 'Light':
        return 'from-yellow-400 to-yellow-600';
      case 'Shadow':
        return 'from-purple-500 to-purple-700';
      case 'Nature':
        return 'from-emerald-500 to-green-600';
      case 'Lightning':
        return 'from-yellow-500 to-orange-500';
      case 'Dark':
        return 'from-purple-600 to-gray-800';
      case 'Ice':
        return 'from-cyan-400 to-blue-600';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  const getTypeAdvantage = (attacker: string, defender: string) => {
    const advantages: Record<string, string[]> = {
      Fire: ['Nature', 'Ice'],
      Air: ['Earth', 'Fire'],
      Light: ['Shadow', 'Dark'],
      Water: ['Fire', 'Earth'],
      Nature: ['Water', 'Earth'],
      Earth: ['Lightning', 'Fire'],
      Shadow: ['Air', 'Light'],
      Lightning: ['Water', 'Air'],
      Ice: ['Nature', 'Dragon'],
      Dark: ['Light', 'Psychic']
    };
    if (advantages[attacker]?.includes(defender)) return 'super';
    if (advantages[defender]?.includes(attacker)) return 'weak';
    return 'normal';
  };

  const handleStarterSelection = (monsterId: number) => {
    const monster = starterMonsters.find((m) => m.id === monsterId);
    setSelectedStarter(monster);
    setHasStarter(true);
    setShowStarterModal(false);
    // Add starter to collection logic here
  };

  const handleCaptureAttempt = (monster: any) => {
    if (monster.weakenRequired) {
      setTargetMonster(monster);
      setShowCaptureBattle(true);
      setShowCaptureMode(false);
    } else {
      const success = Math.random() * 100 < monster.captureRate;
      if (success) {
        setBlankCards((prev) => prev - monster.cardCost);
        alert(`Successfully captured ${monster.name}!`);
      } else {
        alert(`${monster.name} broke free!`);
      }
      setShowCaptureMode(false);
    }
  };

  const handleDuelStart = (duel: any) => {
    setTargetMonster(duel);
    setShowDuelBattle(true);
  };

  const handleMonsterCardClick = (monsterId: string) => {
    const monster = monsterDetails[monsterId as keyof typeof monsterDetails];
    if (monster) {
      setSelectedMonsterDetail(monster);
      setShowMonsterDetailModal(true);
    }
  };

  // Monster Detail Data
  const monsterDetails = {
    'fire-dragon': {
      id: 'fire-dragon',
      name: 'Fire Dragon',
      element: 'Fire',
      type: 'Dragon',
      rarity: 'Epic',
      level: 28,
      power: 1800,
      defense: 1200,
      speed: 85,
      hp: 340,
      maxHp: 340,
      description:
        'A mighty flame dragon with molten lava veins running through its crimson scales. Born in volcanic craters, this ancient creature breathes powerful fire and commands the heat of volcanoes.',
      abilities: [
        {
          name: 'Flame Breath',
          description: 'AoE fire attack that hits all enemies',
          damage: 280,
          type: 'AoE Fire'
        },
        {
          name: 'Molten Scales',
          description: 'Passive - 25% fire resistance',
          effect: 'Passive Reflection',
          type: 'Passive'
        },
        {
          name: 'Dragon Roar',
          description: 'Debuff - reduces enemy attack',
          effect: 'Enemy ATK -30%',
          type: 'Debuff'
        },
        {
          name: 'Inferno Storm',
          description: 'Ultimate fire attack',
          damage: 450,
          type: 'Ultimate AoE'
        }
      ],
      evolutionPath: 'Fire Hatchling → Flame Wyvern → Fire Dragon → Ancient Fire Lord',
      currentEvolution: 2,
      strengths: ['Nature', 'Ice', 'Steel'],
      weaknesses: ['Water', 'Earth', 'Rock'],
      habitat: 'Volcanic Regions, Lava Caves',
      bondLevel: 78,
      experiencePoints: 15420,
      captureDate: '2024-01-15',
      captureLocation: 'Mount Inferno',
      uniqueTraits: ['Lava Immunity', 'Flight Master', 'Alpha Dominant', 'Fire Breather'],
      battleStats: {
        wins: 42,
        losses: 8,
        totalBattles: 50,
        winRate: 84
      },
      image:
        'Majestic fire dragon with crimson scales and molten lava veins, ancient dragon breathing intense flames, epic fire creature with golden eyes, in volcanic environment'
    }
  };

  /* ---------- RENDER LOGIC ---------- */

  if (activeTab === 'roster') {
    return (
      <div className="min-h-screen bg-gray-950 relative overflow-hidden">
        {/* Monster Detail Modal */}
        {showMonsterDetailModal && selectedMonsterDetail && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="bg-gray-900 border-2 border-red-600 rounded-2xl p-6 max-w-sm w-full max-h-[90vh] overflow-y-auto">
              <div className="text-center mb-4">
                <div className="text-3xl mb-2">🐲</div>
                <h3 className="text-xl font-bold text-white mb-2">{selectedMonsterDetail.name}</h3>
                <div className="text-sm text-gray-300">{selectedMonsterDetail.description}</div>
              </div>

              <div className="bg-gray-800/30 rounded-lg p-3 mb-4">
                <div className="flex justify-between text-xs">
                  <div className="text-green-400">Power: {selectedMonsterDetail.power}</div>
                  <div className="text-blue-400">Def: {selectedMonsterDetail.defense}</div>
                </div>
                <div className="flex justify-between text-xs mt-2">
                  <div className="text-yellow-400">Speed: {selectedMonsterDetail.speed}</div>
                  <div className="text-purple-400">HP: {selectedMonsterDetail.hp}/{selectedMonsterDetail.maxHp}</div>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold">
                  ⚔️ Send to Battle
                </button>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold">
                  ✨ Train & Evolve
                </button>
                <button
                  onClick={() => setShowMonsterDetailModal(false)}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Atmospheric Background */}
        <div className="fixed inset-0 pointer-events-none">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{
              backgroundImage: `url(https://readdy.ai/api/search-image?query=Ancient%20magical%20arena%20with%20glowing%20runes%20and%20summoning%20circles%2C%20mystical%20battlefield%20with%20floating%20magical%20energy%20particles%2C%20epic%20fantasy%20colosseum%20with%20holographic%20projections%2C%20cinematic%20light%20with%20golden%20and%20blue%20magical%20effects&width=375&height=812&seq=monster-bg&orientation=portrait)`,
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-transparent to-black/40"></div>
        </div>

        {/* Header */}
        <header className="fixed top-0 w-full bg-black/40 backdrop-blur-md z-50 border-b border-blue-800/30">
          <div className="px-4 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <i className="ri-arrow-left-line text-white text-xl mr-2"></i>
              <span className="text-white font-semibold">Duel Monster World</span>
            </Link>
            <div className="flex items-center space-x-3">
              <div
                className={`text-xs px-2 py-1 rounded-full ${
                  isDayTime() ? 'bg-yellow-600 text-white' : 'bg-purple-700 text-gray-300'
                }`}
              >
                {isDayTime() ? '☀️ Power Boost' : '🌙 Stealth Mode'}
              </div>
              <div className="text-white text-sm">{blankCards} 📜</div>
              <div className="text-white text-sm">{summonEnergy} ⚡</div>
            </div>
          </div>
        </header>

        <MonsterRoster />

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 w-full bg-black/80 backdrop-blur-md border-t border-gray-800 z-50">
          <div className="grid grid-cols-5 px-0 py-2">
            <Link href="/" className="flex flex-col items-center py-2 text-gray-500">
              <i className="ri-home-4-line text-lg mb-1"></i>
              <span className="text-xs">Home</span>
            </Link>
            <button
              onClick={() => setActiveTab('capture')}
              className="flex flex-col items-center py-2 text-gray-500"
            >
              <i className="ri-search-line text-lg mb-1"></i>
              <span className="text-xs">Hunt</span>
            </button>
            <button
              onClick={() => setActiveTab('arena')}
              className="flex flex-col items-center py-2 text-gray-500"
            >
              <i className="ri-sword-line text-lg mb-1"></i>
              <span className="text-xs">Arena</span>
            </button>
            <button
              onClick={() => setActiveTab('roster')}
              className="flex flex-col items-center py-2 text-blue-400"
            >
              <i className="ri-stack-line text-lg mb-1"></i>
              <span className="text-xs">Collection</span>
            </button>
            <button
              onClick={() => setShowProgressionFlow(true)}
              className="flex flex-col items-center py-2 text-gray-500"
            >
              <i className="ri-roadmap-line text-lg mb-1"></i>
              <span className="text-xs">Progress</span>
            </button>
          </div>
        </nav>
      </div>
    );
  }

  if (activeTab === 'arena') {
    return (
      <div className="min-h-screen bg-gray-950 relative overflow-hidden">
        {/* Atmospheric Background */}
        <div className="fixed inset-0 pointer-events-none">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{
              backgroundImage: `url(https://readdy.ai/api/search-image?query=Ancient%20magical%20arena%20with%20glowing%20runes%20and%20summoning%20circles%2C%20mystical%20battlefield%20with%20floating%20magical%20energy%20particles%2C%20epic%20fantasy%20colosseum%20with%20holographic%20projections%2C%20cinematic%20light%20with%20golden%20and%20blue%20magical%20effects&width=375&height=812&seq=arena-bg&orientation=portrait)`,
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-red-900/20 via-transparent to-black/40"></div>
        </div>

        {/* Header */}
        <header className="fixed top-0 w-full bg-black/40 backdrop-blur-md z-50 border-b border-red-800/30">
          <div className="px-4 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <i className="ri-arrow-left-line text-white text-xl mr-2"></i>
              <span className="text-white font-semibold">Duel Monster World</span>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="text-white text-sm">{blankCards} 📜</div>
              <div className="text-white text-sm">{summonEnergy} ⚡</div>
              <div className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${getElementColor(arenaRank)}`}>
                {arenaRank}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="pt-20 px-4 pb-24 relative z-10">
          {/* Active Duels */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">⚔️ Active Duels</h2>
            <div className="space-y-4">
              {activeDuels.map((duel) => (
                <div key={duel.id} className="bg-gray-800/70 border border-gray-700 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-white font-bold">{duel.opponent}</div>
                    <div className={`px-2 py-1 rounded-full bg-gradient-to-r ${getElementColor(duel.element)}`}>
                      {duel.element}
                    </div>
                  </div>
                  <div className="text-gray-400 text-sm mb-3">Rank: {duel.rank}</div>
                  <div className="text-gray-300 text-xs mb-3">Arena: {duel.arena}</div>
                  <div className="flex justify-between items-center mb-3">
                    <div className="text-sm text-gray-400">Time left: {duel.timeLeft}</div>
                    <div className="text-sm text-yellow-400">Wager: {duel.wager}</div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {duel.monsters.map((monster, idx) => (
                      <div key={idx} className="bg-gray-700/50 text-xs px-2 py-1 rounded-full text-white">
                        {monster}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => handleDuelStart(duel)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold"
                  >
                    Accept Duel
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Trading */}
          <section>
            <h2 className="text-xl font-bold text-white mb-4">🤝 Trading Offers</h2>
            <div className="space-y-4">
              {tradeOffers.map((trade) => (
                <div
                  key={trade.id}
                  className={`bg-gray-800/70 rounded-xl p-4 border ${
                    trade.tradeLocked ? 'border-purple-700/50' : 'border-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-white font-bold">{trade.player}</div>
                    <div className="text-sm text-gray-400">{trade.timeLeft}</div>
                  </div>
                  <div className="bg-purple-900/30 border border-purple-700 rounded-lg p-3 mb-3">
                    <div className="text-purple-400 font-semibold text-sm mb-1">Offering</div>
                    <div className="text-white text-xs">
                      {trade.offering.type === 'Summon Relic' && <div>{trade.offering.monster}</div>}
                      {trade.offering.type === 'Blank Cards' && <div>{trade.offering.quantity} Blank Cards</div>}
                      <div className="text-gray-300 mt-1">Rarity: {trade.offering.rarity}</div>
                    </div>
                  </div>

                  <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-3 mb-3">
                    <div className="text-blue-400 font-semibold text-sm mb-1">Requesting</div>
                    <div className="text-white text-xs">
                      {trade.requesting.type === 'Summon Relic' && <div>{trade.requesting.monster}</div>}
                      {trade.requesting.type === 'Evolution Relic' && <div>{trade.requesting.item}</div>}
                      {trade.requesting.type === 'Multiple Relics' && (
                        <div>{trade.requesting.monsters.join(', ')}</div>
                      )}
                      <div className="text-gray-300 mt-1">Rarity: {trade.requesting.rarity}</div>
                    </div>
                  </div>

                  <div className="text-gray-300 text-xs mb-3">{trade.bondBonus}</div>
                  {trade.note && (
                    <div className="text-yellow-400 text-xs mb-3 bg-yellow-900/20 p-2 rounded">{trade.note}</div>
                  )}
                  <button
                    className={`w-full py-2 rounded-lg font-semibold ${
                      trade.tradeLocked
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : 'bg-purple-600 hover:bg-purple-700 text-white'
                    }`}
                    disabled={trade.tradeLocked}
                  >
                    {trade.tradeLocked ? '🔒 Trade Locked' : 'Trade Offer'}
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Duel Battle Modal */}
        {showDuelBattle && targetMonster && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="bg-gray-900 border-2 border-red-600 rounded-2xl p-6 max-w-sm w-full">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">⚔️</div>
                <h3 className="text-xl font-bold text-white mb-2">Duel Battle</h3>
                <p className="text-gray-300 text-sm">
                  Face {targetMonster.opponent} in real-time AR combat!
                </p>
              </div>

              <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 mb-4">
                <div className="text-center text-red-400 font-semibold mb-2">
                  Arena: {targetMonster.arena}
                </div>
                <div className="text-center text-white mb-1">{targetMonster.opponent}</div>
                <div className="text-center text-gray-400 text-sm mb-3">Rank: {targetMonster.rank}</div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {targetMonster.monsters.map((monster: string, idx: number) => (
                    <div key={idx} className="bg-gray-700/50 text-xs px-2 py-1 rounded-full text-white">
                      {monster}
                    </div>
                  ))}
                </div>
                <div className="text-center text-yellow-400 text-sm">Wager: {targetMonster.wager}</div>
              </div>

              <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold">
                Start AR Battle
              </button>
              <button
                onClick={() => setShowDuelBattle(false)}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg mt-2"
              >
                Decline Duel
              </button>
            </div>
          </div>
        )}

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 w-full bg-black/80 backdrop-blur-md border-t border-gray-800 z-50">
          <div className="grid grid-cols-5 px-0 py-2">
            <Link href="/" className="flex flex-col items-center py-2 text-gray-500">
              <i className="ri-home-4-line text-lg mb-1"></i>
              <span className="text-xs">Home</span>
            </Link>
            <button
              onClick={() => setActiveTab('capture')}
              className="flex flex-col items-center py-2 text-gray-500"
            >
              <i className="ri-search-line text-lg mb-1"></i>
              <span className="text-xs">Hunt</span>
            </button>
            <button
              onClick={() => setActiveTab('arena')}
              className="flex flex-col items-center py-2 text-blue-400"
            >
              <i className="ri-sword-line text-lg mb-1"></i>
              <span className="text-xs">Arena</span>
            </button>
            <button
              onClick={() => setActiveTab('roster')}
              className="flex flex-col items-center py-2 text-gray-500"
            >
              <i className="ri-stack-line text-lg mb-1"></i>
              <span className="text-xs">Collection</span>
            </button>
            <button
              onClick={() => setShowProgressionFlow(true)}
              className="flex flex-col items-center py-2 text-gray-500"
            >
              <i className="ri-roadmap-line text-lg mb-1"></i>
              <span className="text-xs">Progress</span>
            </button>
          </div>
        </nav>
      </div>
    );
  }

  if (showCaptureMode) {
    return (
      <div className="min-h-screen bg-gray-950 relative overflow-hidden">
        {/* Atmospheric Background */}
        <div className="fixed inset-0 pointer-events-none">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{
              backgroundImage: `url(https://readdy.ai/api/search-image?query=Ancient%20magical%20arena%20with%20glowing%20runes%20and%20summoning%20circles%2C%20mystical%20battlefield%20with%20floating%20magical%20energy%20particles%2C%20epic%20fantasy%20colosseum%20with%20holographic%20projections%2C%20cinematic%20light%20with%20golden%20and%20blue%20magical%20effects&width=375&height=812&seq=capture-bg&orientation=portrait)`,
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-black/40"></div>
        </div>

        {/* Header */}
        <header className="fixed top-0 w-full bg-black/40 backdrop-blur-md z-50 border-b border-purple-800/30">
          <div className="px-4 py-3 flex items-center justify-between">
            <button onClick={() => setShowCaptureMode(false)} className="flex items-center text-white">
              <i className="ri-arrow-left-line text-xl mr-2"></i>
              <span className="font-semibold">Back to Hunt</span>
            </button>
            <div className="flex items-center space-x-3">
              <div className="text-white text-sm">{blankCards} 📜</div>
              <div className="text-white text-sm">{summonEnergy} ⚡</div>
            </div>
          </div>
        </header>

        {/* Capture Mode Content */}
        <div className="pt-20 px-4 pb-24 relative z-10">
          <div className="text-center mb-6">
            <div className="text-3xl mb-3">🔥</div>
            <h2 className="text-xl font-bold text-white mb-2">Wild Monster Capture</h2>
            <p className="text-gray-300 text-sm">
              Weaken powerful monsters before using Blank Cards to transform them into Summon Relics
            </p>
          </div>

          <div className="space-y-4">
            {wildMonsters.map((monster) => (
              <div key={monster.id} className="bg-gray-800/70 border border-gray-700 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-white font-bold">{monster.name}</div>
                  <div
                    className={`px-2 py-1 rounded-full text-xs ${
                      monster.difficulty === 'Easy'
                        ? 'bg-green-600 text-white'
                        : monster.difficulty === 'Medium'
                        ? 'bg-yellow-600 text-white'
                        : monster.difficulty === 'Hard'
                        ? 'bg-orange-600 text-white'
                        : 'bg-red-600 text-white'
                    }`}
                  >
                    {monster.difficulty}
                  </div>
                </div>
                <div
                  className={`text-xs px-2 py-1 rounded-full inline-block mb-3 bg-gradient-to-r ${getElementColor(
                    monster.element
                  )}`}
                >
                  {monster.element}
                </div>
                <div className="text-gray-300 text-xs mb-3">📍 {monster.location}</div>
                <div className="flex justify-between text-sm mb-3">
                  <div className="text-red-400">⚔️ {monster.power}</div>
                  <div className="text-blue-400">🛡️ {monster.cardCost} Cards</div>
                  <div className="text-yellow-400">🎯 {monster.captureRate}%</div>
                </div>
                <div className="text-gray-400 text-xs mb-4">{monster.evolutionPath}</div>
                <button
                  onClick={() => handleCaptureAttempt(monster)}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold"
                >
                  {monster.weakenRequired ? 'Battle to Weaken' : 'Direct Capture'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Battle Modal */}
        {showCaptureBattle && targetMonster && battlePhase === 'battle' && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="bg-gray-900 border-2 border-red-600 rounded-2xl p-6 max-w-sm w-full">
              <div className="text-center mb-4">
                <div className="text-3xl mb-2">⚔️</div>
                <h3 className="text-xl font-bold text-white mb-2">Monster Battle</h3>
                <p className="text-gray-300 text-sm">Battle to weaken {targetMonster.name}</p>
              </div>

              <div className="space-y-3 mb-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-blue-400 font-semibold">{playerTeam[0].name}</span>
                    <span className="text-blue-400">100/100</span>
                  </div>
                  <div className="bg-gray-700 rounded-full h-3">
                    <div className="bg-blue-400 h-3 rounded-full w-full"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-red-400 font-semibold">{targetMonster.name}</span>
                    <span className="text-red-400">{monsterHP}/{targetMonster.maxHp}</span>
                  </div>
                  <div className="bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-red-400 h-3 rounded-full"
                      style={{ width: `${(monsterHP / targetMonster.maxHp) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-3 mb-4 max-h-32 overflow-y-auto text-gray-300 text-xs">
                {battleLog.slice(-4).map((log, i) => (
                  <div key={i} className="mb-1">
                    {log}
                  </div>
                ))}
              </div>

              <div className="space-y-2 mb-4">
                <button
                  onClick={() => performBattleAction('attack')}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold"
                >
                  🔥 Attack (Ember Shot)
                </button>
                <button
                  onClick={() => performBattleAction('defend')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
                >
                  🛡️ Defend (Heat Shield)
                </button>
                {monsterHP < targetMonster.maxHp * 0.3 && (
                  <button
                    onClick={() => performBattleAction('capture')}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold animate-pulse"
                  >
                    📜 Use Blank Card (Weakened!)
                  </button>
                )}
              </div>

              <button
                onClick={() => {
                  setShowCaptureBattle(false);
                  setBattlePhase('selecting');
                }}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg"
              >
                Retreat
              </button>
            </div>
          </div>
        )}

        {/* Battle Victory */}
        {showCaptureBattle && battlePhase === 'victory' && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="bg-gray-900 border-2 border-green-600 rounded-2xl p-6 max-w-sm w-full">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">🎉</div>
                <h3 className="text-xl font-bold text-white mb-2">Victory!</h3>
                <p className="text-green-400 text-sm">{targetMonster?.name} has been captured!</p>
              </div>

              <div className="bg-green-900/30 border border-green-700 rounded-xl p-4 mb-4">
                <div className="text-center">
                  <div className="text-white font-bold text-lg">{targetMonster?.name}</div>
                  <div className="text-green-400 text-sm">Successfully added to collection!</div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="text-white font-semibold text-sm">Rewards:</div>
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <div className="text-green-400 text-xs">✓ Monster added to roster</div>
                  <div className="text-blue-400 text-xs">✓ +50 Battle EXP</div>
                  <div className="text-purple-400 text-xs">✓ +1 Summon Relic created</div>
                </div>
              </div>

              <button
                onClick={() => {
                  setShowCaptureBattle(false);
                  setBattlePhase('selecting');
                  setTargetMonster(null);
                }}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
              >
                Continue Journey
              </button>
            </div>
          </div>
        )}

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 w-full bg-black/80 backdrop-blur-md border-t border-gray-800 z-50">
          <div className="grid grid-cols-5 px-0 py-2">
            <Link href="/" className="flex flex-col items-center py-2 text-gray-500">
              <i className="ri-home-4-line text-lg mb-1"></i>
              <span className="text-xs">Home</span>
            </Link>
            <button
              onClick={() => setActiveTab('capture')}
              className="flex flex-col items-center py-2 text-blue-400"
            >
              <i className="ri-search-line text-lg mb-1"></i>
              <span className="text-xs">Hunt</span>
            </button>
            <button
              onClick={() => setActiveTab('arena')}
              className="flex flex-col items-center py-2 text-gray-500"
            >
              <i className="ri-sword-line text-lg mb-1"></i>
              <span className="text-xs">Arena</span>
            </button>
            <button
              onClick={() => setActiveTab('roster')}
              className="flex flex-col items-center py-2 text-gray-500"
            >
              <i className="ri-stack-line text-lg mb-1"></i>
              <span className="text-xs">Collection</span>
            </button>
            <button
              onClick={() => setShowProgressionFlow(true)}
              className="flex flex-col items-center py-2 text-gray-500"
            >
              <i className="ri-roadmap-line text-lg mb-1"></i>
              <span className="text-xs">Progress</span>
            </button>
          </div>
        </nav>
      </div>
    );
  }

  /* ---------- MAIN HOMEPAGE ---------- */

  return (
    <div className="min-h-screen bg-gray-950 relative overflow-hidden">
      {/* Atmospheric Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: `url(https://readdy.ai/api/search-image?query=Ancient%20magical%20arena%20with%20glowing%20runes%20and%20summoning%20circles%2C%20mystical%20battlefield%20with%20floating%20magical%20energy%20particles%2C%20epic%20fantasy%20colosseum%20with%20holographic%20projections%20and%20cinematic%20light%20with%20golden%20and%20blue%20magical%20effects&width=375&height=812&seq=monster-bg&orientation=portrait)`,
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-transparent to-black/40"></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full bg-black/40 backdrop-blur-md z-50 border-b border-blue-800/30">
        <div className="px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <i className="ri-arrow-left-line text-white text-xl mr-2"></i>
            <span className="text-white font-semibold">Duel Monster World</span>
          </Link>
          <div className="flex items-center space-x-3">
            <div
              className={`text-xs px-2 py-1 rounded-full ${
                isDayTime() ? 'bg-yellow-600 text-white' : 'bg-purple-700 text-gray-300'
              }`}
            >
              {isDayTime() ? '☀️ Power Boost' : '🌙 Stealth Mode'}
            </div>
            <div className="text-white text-sm">{blankCards} 📜</div>
            <div className="text-white text-sm">{summonEnergy} ⚡</div>
          </div>
        </div>
      </header>

      {/* Monster Scanner Modal */}
      {showMonsterScan && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-gray-900 border-2 border-green-600 rounded-2xl p-6 max-w-sm w-full">
            <div className="text-center mb-4">
              <div className="text-3xl mb-2">📡</div>
              <h3 className="text-xl font-bold text-white mb-2">Monster Scanner</h3>
              <p className="text-gray-300 text-sm">Detecting nearby monsters in your location</p>
            </div>

            <div className="bg-green-900/30 border border-green-700 rounded-xl p-4 mb-4">
              <div className="text-center mb-3">
                <div className="text-green-400 font-semibold">📍 Current Location</div>
                <div className="text-white text-lg capitalize">{currentLocation} Environment</div>
                <div className="text-green-300 text-sm">{isDayTime() ? 'Daytime Detection' : 'Nighttime Detection'}</div>
              </div>

              <div className="flex justify-center space-x-3 mb-4">
                <button
                  onClick={() => setCurrentLocation('indoor')}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                    currentLocation === 'indoor' ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-300'
                  }`}
                >
                  🏠 Indoor
                </button>
                <button
                  onClick={() => setCurrentLocation('outdoor')}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                    currentLocation === 'outdoor' ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-300'
                  }`}
                >
                  🌍 Outdoor
                </button>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <button
                onClick={detectNearbyMonsters}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
              >
                🔍 Scan for Monsters
              </button>
              <button
                onClick={() => setShowMonsterScan(false)}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Location Detection Results */}
      {showLocationDetection && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-gray-900 border-2 border-purple-600 rounded-2xl p-6 max-w-sm w-full max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-4">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="text-xl font-bold text-white mb-2">Monsters Detected!</h3>
              <p className="text-gray-300 text-sm">
                {detectedMonsters.length} monsters found in {currentLocation} environment
              </p>
            </div>

            <div className="space-y-3 mb-6">
              {detectedMonsters.map((monster, index) => (
                <div key={index} className="bg-gray-800/70 border border-gray-700 rounded-xl p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <div
                      className="w-12 h-12 rounded-xl bg-cover bg-center"
                      style={{
                        backgroundImage: `url(https://readdy.ai/api/search-image?query=$%7BencodeURIComponent%28%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20monster.image%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%29%7D&width=48&height=48&seq=${monster.id}-detection&orientation=landscape)`
                      }}
                    ></div>
                    <div className="flex-1">
                      <div className="text-white font-semibold">{monster.name}</div>
                      <div className="text-gray-400 text-sm">{monster.type}</div>
                      <div
                        className={`text-xs px-2 py-1 rounded-full inline-block bg-gradient-to-r ${getElementColor(
                          monster.element
                        )}`}
                      >
                        {monster.element}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-yellow-400 text-sm font-bold">{monster.captureRate}%</div>
                      <div className="text-gray-400 text-xs">Capture</div>
                    </div>
                  </div>

                  <div className="text-gray-300 text-xs mb-3">
                    📍 {monster.location} • {monster.behavior}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-center">
                      <div className="text-red-400 text-sm font-bold">{monster.power}</div>
                      <div className="text-gray-400 text-xs">Attack</div>
                    </div>
                    <div className="text-center">
                      <div className="text-blue-400 text-sm font-bold">{monster.defense}</div>
                      <div className="text-gray-400 text-xs">Defense</div>
                    </div>
                  </div>

                  <div className="flex space-x-2 mt-3">
                    <button
                      onClick={() => startBattleWithMonster(monster)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-semibold"
                    >
                      ⚔️ Battle
                    </button>
                    {monster.difficulty === 'Easy' && (
                      <button
                        onClick={() => {
                          const success = Math.random() < monster.captureRate / 100;
                          if (success) {
                            setBlankCards((prev) => prev - monster.cardCost);
                            alert(`Successfully captured ${monster.name}!`);
                          } else {
                            alert(`${monster.name} broke free!`);
                          }
                          setShowLocationDetection(false);
                        }}
                        className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-sm font-semibold"
                      >
                        📜 Capture
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowLocationDetection(false)}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg"
            >
              Close Scanner
            </button>
          </div>
        </div>
      )}

      {/* Battle Interface */}
      {showCaptureBattle && targetMonster && battlePhase === 'battle' && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-gray-900 border-2 border-red-600 rounded-2xl p-6 max-w-sm w-full">
            <div className="text-center mb-4">
              <div className="text-3xl mb-2">⚔️</div>
              <h3 className="text-xl font-bold text-white mb-2">Monster Battle</h3>
              <p className="text-gray-300 text-sm">Battle to weaken {targetMonster.name}</p>
            </div>

            {/* Battle Status */}
            <div className="space-y-3 mb-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-blue-400 font-semibold">{playerTeam[0].name}</span>
                  <span className="text-blue-400">100/100</span>
                </div>
                <div className="bg-gray-700 rounded-full h-3">
                  <div className="bg-blue-400 h-3 rounded-full w-full"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-red-400 font-semibold">{targetMonster.name}</span>
                  <span className="text-red-400">{monsterHP}/{targetMonster.maxHp}</span>
                </div>
                <div className="bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-red-400 h-3 rounded-full"
                    style={{ width: `${(monsterHP / targetMonster.maxHp) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Battle Log */}
            <div className="bg-gray-800/50 rounded-lg p-3 mb-4 max-h-32 overflow-y-auto text-gray-300 text-xs">
              {battleLog.slice(-4).map((log, i) => (
                <div key={i} className="mb-1">
                  {log}
                </div>
              ))}
            </div>

            {/* Battle Actions */}
            <div className="space-y-2 mb-4">
              <button
                onClick={() => performBattleAction('attack')}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold"
              >
                🔥 Attack
              </button>
              <button
                onClick={() => performBattleAction('defend')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
              >
                🛡️ Defend
              </button>
              {monsterHP < targetMonster.maxHp * 0.3 && (
                <button
                  onClick={() => performBattleAction('capture')}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold animate-pulse"
                >
                  📜 Capture
                </button>
              )}
            </div>

            <button
              onClick={() => {
                setShowCaptureBattle(false);
                setBattlePhase('selecting');
              }}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg"
            >
              Retreat
            </button>
          </div>
        </div>
      )}

      {/* Welcome Section */}
      <section className="pt-20 px-4 py-6 relative z-10">
        <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-2xl p-6 border border-blue-700/50 mb-6">
          <div className="text-center">
            <div className="text-4xl mb-3">🐉</div>
            <h1 className="text-2xl font-bold text-white mb-2">Monster Hunter & Duelist</h1>
            <p className="text-gray-300 text-sm mb-4">
              Battle → Capture → Transform! Master the Blank Card system
            </p>
            {!hasStarter ? (
              <button
                onClick={() => setShowStarterModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-bold text-lg"
              >
                Choose Your Starter Monster
              </button>
            ) : (
              <div className="flex justify-center space-x-3">
                <button
                  onClick={() => setShowMonsterScan(true)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full font-semibold text-sm"
                >
                  📡 Scan Area
                </button>
                <button
                  onClick={() => setActiveTab('arena')}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full font-semibold text-sm"
                >
                  ⚔️ Battle Arena
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Monster Detection Guide */}
      <section className="px-4 py-6 relative z-10">
        <h2 className="text-xl font-bold text-white mb-4">📡 Monster Detection System</h2>
        <div className="space-y-4">
          {/* Indoor Monsters */}
          <div className="bg-blue-900/30 border border-blue-700 rounded-xl p-4">
            <div className="text-center mb-3">
              <div className="text-2xl mb-2">🏠</div>
              <h3 className="text-white font-bold">Indoor Monsters</h3>
              <p className="text-blue-400 text-sm">Household and domestic creatures</p>
            </div>

            <div className="space-y-3">
              {indoorMonsters.slice(0, 2).map((monster, index) => (
                <div key={index} className="bg-gray-800/50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-white font-semibold text-sm">{monster.name}</div>
                    <div className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${getElementColor(monster.element)}`}>
                      {monster.element}
                    </div>
                  </div>
                  <div className="text-gray-300 text-xs mb-2">📍 {monster.location}</div>
                  <div className="text-gray-400 text-xs">{monster.behavior}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Outdoor Monsters */}
          <div className="bg-green-900/30 border border-green-700 rounded-xl p-4">
            <div className="text-center mb-3">
              <div className="text-2xl mb-2">🌍</div>
              <h3 className="text-white font-bold">Outdoor Monsters</h3>
              <p className="text-green-400 text-sm">Wild and urban creatures</p>
            </div>

            <div className="space-y-3">
              {outdoorMonsters.slice(0, 2).map((monster, index) => (
                <div key={index} className="bg-gray-800/50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-white font-semibold text-sm">{monster.name}</div>
                    <div className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${getElementColor(monster.element)}`}>
                      {monster.element}
                    </div>
                  </div>
                  <div className="text-gray-300 text-xs mb-2">📍 {monster.location}</div>
                  <div className="text-gray-400 text-xs">{monster.behavior}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Battle System Guide */}
      <section className="px-4 py-6 relative z-10">
        <h2 className="text-xl font-bold text-white mb-4">⚔️ Battle System</h2>
        <div className="bg-gray-800/70 border border-gray-700 rounded-xl p-4">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">⚔️</span>
              </div>
              <div>
                <div className="text-white font-semibold text-sm">1. Attack Phase</div>
                <div className="text-gray-300 text-xs">Use your monster's abilities to deal damage</div>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">🛡️</span>
              </div>
              <div>
                <div className="text-white font-semibold text-sm">2. Defense Strategy</div>
                <div className="text-gray-300 text-xs">Reduce incoming damage with defensive moves</div>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">📜</span>
              </div>
              <div>
                <div className="text-white font-semibold text-sm">3. Capture Opportunity</div>
                <div className="text-gray-300 text-xs">Use Blank Cards when enemy health is low</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Tips */}
      <section className="px-4 py-6 relative z-10 mb-20">
        <div className="bg-yellow-900/30 border border-yellow-700 rounded-xl p-4">
          <h3 className="text-yellow-400 font-bold mb-3">💡 Detection Tips</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-start space-x-2">
              <span className="text-yellow-400">•</span>
              <span className="text-gray-300">Different monsters appear at different times of day</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-yellow-400">•</span>
              <span className="text-gray-300">Indoor environments have protective and helper spirits</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-yellow-400">•</span>
              <span className="text-gray-300">Outdoor areas contain wild elementals and urban spirits</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-yellow-400">•</span>
              <span className="text-gray-300">Battle to weaken strong monsters before attempting capture</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-yellow-400">•</span>
              <span className="text-gray-300">Easy monsters can be captured directly with Blank Cards</span>
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
            onClick={() => setActiveTab('capture')}
            className="flex flex-col items-center py-2 text-blue-400"
          >
            <i className="ri-search-line text-lg mb-1"></i>
            <span className="text-xs">Hunt</span>
          </button>
          <button
            onClick={() => setActiveTab('arena')}
            className="flex flex-col items-center py-2 text-gray-500"
          >
            <i className="ri-sword-line text-lg mb-1"></i>
            <span className="text-xs">Arena</span>
          </button>
          <button
            onClick={() => setActiveTab('roster')}
            className="flex flex-col items-center py-2 text-gray-500"
          >
            <i className="ri-stack-line text-lg mb-1"></i>
            <span className="text-xs">Collection</span>
          </button>
          <button
            onClick={() => setShowProgressionFlow(true)}
            className="flex flex-col items-center py-2 text-gray-500"
          >
            <i className="ri-roadmap-line text-lg mb-1"></i>
            <span className="text-xs">Progress</span>
          </button>
        </div>
      </nav>

      {/* Starter Selection Modal */}
      {showStarterModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-amber-50 to-orange-100 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-amber-900">Choose Your Starter Monster</h2>
                <button
                  onClick={() => setShowStarterModal(false)}
                  className="text-amber-700 hover:text-amber-900 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {starterMonsters.map((monster) => (
                  <div
                    key={monster.id}
                    className={`cursor-pointer transition-all duration-300 ${
                      selectedStarter?.id === monster.id
                        ? 'transform scale-105 ring-4 ring-blue-500'
                        : 'hover:transform hover:scale-102'
                    }`}
                    onClick={() => setSelectedStarter(monster)}
                  >
                    <div className="bg-gradient-to-b from-amber-900 to-amber-800 rounded-xl p-4 border-4 border-amber-700 relative">
                      {/* Monster Image */}
                      <div className="aspect-[3/4] mb-4 rounded-lg overflow-hidden">
                        <img src={monster.image} alt={monster.name} className="w-full h-full object-cover" />
                      </div>

                      {/* Monster Name */}
                      <div className="bg-amber-800 rounded-lg p-2 mb-3">
                        <h3 className="text-amber-100 font-bold text-center text-lg">{monster.name}</h3>
                      </div>

                      {/* Monster Level */}
                      <div className="bg-amber-700 rounded-lg p-2">
                        <p className="text-amber-100 text-center font-bold">Lv.{monster.level}</p>
                      </div>

                      {/* Selection Indicator */}
                      {selectedStarter?.id === monster.id && (
                        <div className="absolute top-2 right-2 bg-blue-500 rounded-full p-2">
                          <i className="ri-check-line text-white text-xl"></i>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Monster Details */}
              {selectedStarter && (
                <div className="bg-white rounded-xl p-6 mb-6 border-2 border-amber-300">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-2xl font-bold text-amber-900 mb-3">{selectedStarter.name}</h3>
                      <div className="space-y-2 mb-4">
                        <p className="text-amber-800">
                          <span className="font-semibold">Element:</span> {selectedStarter.element}
                        </p>
                        <p className="text-amber-800">
                          <span className="font-semibold">Type:</span> {selectedStarter.type}
                        </p>
                        <p className="text-amber-800">
                          <span className="font-semibold">Level:</span> {selectedStarter.level}
                        </p>
                      </div>
                      <p className="text-amber-700 leading-relaxed">{selectedStarter.description}</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-amber-900 mb-3">Starter Abilities</h4>
                      <div className="space-y-3">
                        {selectedStarter.uniqueTraits.map((trait: string, idx: number) => (
                          <div key={idx} className="bg-amber-50 rounded-lg p-3">
                            <p className="text-amber-800">{trait}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowStarterModal(false)}
                  className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-full font-bold"
                >
                  Cancel
                </button>
                {selectedStarter && (
                  <button
                    onClick={() => handleStarterSelection(selectedStarter.id)}
                    className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full font-bold"
                  >
                    Bond with {selectedStarter.name}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Progression Flow Modal */}
      {showProgressionFlow && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-gray-900 border-2 border-purple-600 rounded-2xl p-6 max-w-sm w-full max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-6">
              <div className="text-3xl mb-2">🗺️</div>
              <h3 className="text-xl font-bold text-white mb-2">Journey Progress</h3>
              <p className="text-gray-300 text-sm">Your path to becoming a Monster Master</p>
            </div>

            <div className="space-y-4 mb-6">
              {progressionSteps.map((step) => (
                <div
                  key={step.step}
                  className={`p-4 rounded-xl border-2 ${
                    step.status === 'complete'
                      ? 'bg-green-900/30 border-green-600'
                      : step.status === 'current'
                      ? 'bg-blue-900/30 border-blue-600 animate-pulse'
                      : step.status === 'available'
                      ? 'bg-purple-900/30 border-purple-600'
                      : 'bg-gray-900/30 border-gray-700'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0 ${getStepStatus(step.status)}`}
                    >
                      {step.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-bold text-sm mb-1">{step.title}</div>
                      <div className="text-gray-300 text-xs mb-2">{step.description}</div>
                      <div className="text-yellow-400 text-xs">🎁 {step.reward}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowProgressionFlow(false)}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold"
            >
              Continue Journey
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
