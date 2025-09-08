'use client';

import { useState, useEffect } from 'react';

interface Monster {
  id: string;
  name: string;
  element: string;
  level: number;
  currentHp: number;
  maxHp: number;
  energy: number;
  maxEnergy: number;
  power: number;
  defense: number;
  speed: number;
  abilities: BattleAbility[];
  statusEffects: StatusEffect[];
  position: { x: number; y: number; z: number };
  facing: 'left' | 'right';
  animation: string;
  isPlayer: boolean;
}

interface BattleAbility {
  id: string;
  name: string;
  type: 'attack' | 'defense' | 'special';
  element: string;
  damage: number;
  energyCost: number;
  cooldown: number;
  currentCooldown: number;
  range: number;
  areaEffect: boolean;
  effects: string[];
  animation: string;
  soundEffect: string;
  description: string;
}

interface StatusEffect {
  id: string;
  name: string;
  type: 'buff' | 'debuff';
  duration: number;
  value: number;
  description: string;
}

interface BattleLog {
  id: string;
  timestamp: number;
  type: 'damage' | 'heal' | 'status' | 'ability' | 'system';
  message: string;
  value?: number;
  critical?: boolean;
}

export default function RealisticBattle() {
  const [battlePhase, setBattlePhase] = useState<'preparation' | 'combat' | 'victory' | 'defeat'>('preparation');
  const [selectedAction, setSelectedAction] = useState<'attack' | 'defend' | 'special' | null>(null);
  const [selectedAbility, setSelectedAbility] = useState<BattleAbility | null>(null);
  const [playerMonster, setPlayerMonster] = useState<Monster | null>(null);
  const [enemyMonster, setEnemyMonster] = useState<Monster | null>(null);
  const [battleLog, setBattleLog] = useState<BattleLog[]>([]);
  const [currentTurn, setCurrentTurn] = useState<'player' | 'enemy'>('player');
  const [animationQueue, setAnimationQueue] = useState<string[]>([]);
  const [battleEffects, setBattleEffects] = useState<string[]>([]);
  const [cameraShake, setCameraShake] = useState(false);
  const [slowMotion, setSlowMotion] = useState(false);
  const [criticalHit, setCriticalHit] = useState(false);
  const [turnTimer, setTurnTimer] = useState(30);
  const [combatReady, setCombatReady] = useState(false);

  // Initialize monsters
  useEffect(() => {
    const player: Monster = {
      id: 'player-flare-drake',
      name: 'Flare Drake',
      element: 'Fire',
      level: 18,
      currentHp: 2400,
      maxHp: 2400,
      energy: 100,
      maxEnergy: 100,
      power: 2400,
      defense: 1800,
      speed: 75,
      position: { x: -150, y: 0, z: 0 },
      facing: 'right',
      animation: 'idle',
      isPlayer: true,
      statusEffects: [],
      abilities: [
        {
          id: 'fire-breath',
          name: 'Fire Breath',
          type: 'attack',
          element: 'Fire',
          damage: 450,
          energyCost: 25,
          cooldown: 2,
          currentCooldown: 0,
          range: 200,
          areaEffect: false,
          effects: ['burn'],
          animation: 'fire-breath',
          soundEffect: 'dragon-roar-flames',
          description: 'Breathes scorching flames that may burn the target'
        },
        {
          id: 'lava-burst',
          name: 'Lava Burst',
          type: 'special',
          element: 'Fire',
          damage: 650,
          energyCost: 40,
          cooldown: 4,
          currentCooldown: 0,
          range: 150,
          areaEffect: true,
          effects: ['burn', 'knockback'],
          animation: 'lava-eruption',
          soundEffect: 'volcanic-explosion',
          description: 'Creates a volcanic eruption dealing area damage'
        },
        {
          id: 'flame-shield',
          name: 'Flame Shield',
          type: 'defense',
          element: 'Fire',
          damage: 0,
          energyCost: 30,
          cooldown: 3,
          currentCooldown: 0,
          range: 0,
          areaEffect: false,
          effects: ['fire-immunity', 'reflect-damage'],
          animation: 'defensive-flames',
          soundEffect: 'fire-barrier',
          description: 'Creates a protective flame barrier'
        }
      ]
    };

    const enemy: Monster = {
      id: 'enemy-frost-wyvern',
      name: 'Frost Wyvern',
      element: 'Ice',
      level: 20,
      currentHp: 2800,
      maxHp: 2800,
      energy: 100,
      maxEnergy: 100,
      power: 2600,
      defense: 2200,
      speed: 65,
      position: { x: 150, y: 0, z: 0 },
      facing: 'left',
      animation: 'idle',
      isPlayer: false,
      statusEffects: [],
      abilities: [
        {
          id: 'frost-breath',
          name: 'Frost Breath',
          type: 'attack',
          element: 'Ice',
          damage: 480,
          energyCost: 25,
          cooldown: 2,
          currentCooldown: 0,
          range: 200,
          areaEffect: false,
          effects: ['freeze'],
          animation: 'ice-breath',
          soundEffect: 'ice-dragon-roar',
          description: 'Breathes freezing ice that may freeze the target'
        },
        {
          id: 'blizzard-storm',
          name: 'Blizzard Storm',
          type: 'special',
          element: 'Ice',
          damage: 550,
          energyCost: 45,
          cooldown: 5,
          currentCooldown: 0,
          range: 300,
          areaEffect: true,
          effects: ['freeze', 'slow'],
          animation: 'blizzard-storm',
          soundEffect: 'arctic-storm',
          description: 'Summons a devastating blizzard storm'
        },
        {
          id: 'ice-armor',
          name: 'Ice Armor',
          type: 'defense',
          element: 'Ice',
          damage: 0,
          energyCost: 35,
          cooldown: 4,
          currentCooldown: 0,
          range: 0,
          areaEffect: false,
          effects: ['ice-immunity', 'damage-reduction'],
          animation: 'ice-armor',
          soundEffect: 'ice-crystal-form',
          description: 'Encases in protective ice armor'
        }
      ]
    };

    setPlayerMonster(player);
    setEnemyMonster(enemy);
  }, []);

  // Turn timer
  useEffect(() => {
    if (battlePhase === 'combat' && currentTurn === 'player' && turnTimer > 0) {
      const timer = setTimeout(() => setTurnTimer(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (turnTimer === 0 && currentTurn === 'player') {
      // Auto-defend if player doesn't act
      handleDefend();
    }
  }, [turnTimer, currentTurn, battlePhase]);

  // Animation system
  useEffect(() => {
    if (animationQueue.length > 0) {
      const currentAnimation = animationQueue[0];
      
      // Execute animation
      setTimeout(() => {
        setAnimationQueue(prev => prev.slice(1));
      }, getAnimationDuration(currentAnimation));
    }
  }, [animationQueue]);

  const getAnimationDuration = (animation: string): number => {
    const durations: { [key: string]: number } = {
      'fire-breath': 2500,
      'lava-eruption': 3000,
      'ice-breath': 2500,
      'blizzard-storm': 4000,
      'defensive-flames': 1500,
      'ice-armor': 1500,
      'attack': 1200,
      'hit': 800,
      'dodge': 1000,
      'defeat': 3000,
      'victory': 2500
    };
    return durations[animation] || 1000;
  };

  const addBattleLog = (type: BattleLog['type'], message: string, value?: number, critical?: boolean) => {
    const log: BattleLog = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      type,
      message,
      value,
      critical
    };
    setBattleLog(prev => [log, ...prev.slice(0, 9)]);
  };

  const calculateDamage = (attacker: Monster, defender: Monster, ability: BattleAbility): number => {
    // Base damage calculation
    let damage = ability.damage;
    
    // Level scaling
    damage = damage * (1 + (attacker.level - defender.level) * 0.05);
    
    // Element effectiveness
    const effectiveness = getElementEffectiveness(ability.element, defender.element);
    damage = damage * effectiveness;
    
    // Critical hit chance
    const critChance = 0.15 + (attacker.speed - defender.speed) * 0.001;
    const isCritical = Math.random() < critChance;
    if (isCritical) {
      damage = damage * 1.5;
      setCriticalHit(true);
      setTimeout(() => setCriticalHit(false), 1000);
    }
    
    // Defense calculation
    const defenseMitigation = defender.defense / (defender.defense + 1000);
    damage = damage * (1 - defenseMitigation);
    
    // Status effect modifiers
    defender.statusEffects.forEach(effect => {
      if (effect.type === 'debuff' && effect.name === 'vulnerable') {
        damage = damage * 1.3;
      }
    });
    
    return Math.max(1, Math.floor(damage));
  };

  const getElementEffectiveness = (attackElement: string, defenseElement: string): number => {
    const effectiveness: { [key: string]: { [key: string]: number } } = {
      'Fire': { 'Ice': 2.0, 'Nature': 1.5, 'Water': 0.5, 'Earth': 1.0 },
      'Ice': { 'Fire': 0.5, 'Nature': 1.5, 'Water': 1.0, 'Earth': 1.0 },
      'Water': { 'Fire': 2.0, 'Ice': 1.0, 'Nature': 0.5, 'Earth': 1.5 },
      'Nature': { 'Water': 2.0, 'Earth': 1.5, 'Fire': 0.5, 'Ice': 0.5 },
      'Earth': { 'Lightning': 2.0, 'Fire': 1.0, 'Water': 0.5, 'Nature': 0.5 }
    };
    
    return effectiveness[attackElement]?.[defenseElement] || 1.0;
  };

  const executeAbility = async (caster: Monster, target: Monster, ability: BattleAbility) => {
    if (!playerMonster || !enemyMonster) return;
    
    // Energy check
    if (caster.energy < ability.energyCost) {
      addBattleLog('system', `${caster.name} doesn't have enough energy!`);
      return;
    }
    
    // Cooldown check
    if (ability.currentCooldown > 0) {
      addBattleLog('system', `${ability.name} is on cooldown!`);
      return;
    }
    
    // Consume energy
    if (caster.isPlayer) {
      setPlayerMonster(prev => prev ? { ...prev, energy: prev.energy - ability.energyCost } : null);
    } else {
      setEnemyMonster(prev => prev ? { ...prev, energy: prev.energy - ability.energyCost } : null);
    }
    
    // Set cooldown
    ability.currentCooldown = ability.cooldown;
    
    // Animation sequence
    setAnimationQueue(prev => [...prev, ability.animation]);
    
    // Visual effects
    setBattleEffects(prev => [...prev, `${ability.element}-effect`]);
    
    // Camera shake for powerful attacks
    if (ability.damage > 500) {
      setCameraShake(true);
      setTimeout(() => setCameraShake(false), 800);
    }
    
    // Slow motion for special abilities  
    if (ability.type === 'special') {
      setSlowMotion(true);
      setTimeout(() => setSlowMotion(false), 2000);
    }
    
    await new Promise(resolve => setTimeout(resolve, getAnimationDuration(ability.animation)));
    
    if (ability.type === 'attack' || ability.type === 'special') {
      // Calculate and apply damage
      const damage = calculateDamage(caster, target, ability);
      
      if (target.isPlayer) {
        setPlayerMonster(prev => prev ? {
          ...prev,
          currentHp: Math.max(0, prev.currentHp - damage)
        } : null);
      } else {
        setEnemyMonster(prev => prev ? {
          ...prev,
          currentHp: Math.max(0, prev.currentHp - damage)
        } : null);
      }
      
      // Hit animation
      setAnimationQueue(prev => [...prev, 'hit']);
      
      const effectiveness = getElementEffectiveness(ability.element, target.element);
      let effectivenessText = '';
      if (effectiveness > 1.5) effectivenessText = 'Super effective! ';
      else if (effectiveness < 0.75) effectivenessText = 'Not very effective... ';
      
      addBattleLog('damage', `${effectivenessText}${caster.name} deals ${damage} damage to ${target.name}!`, damage, criticalHit);
      
      // Apply status effects
      ability.effects.forEach(effect => {
        if (Math.random() < 0.3) { // 30% chance for status effects
          applyStatusEffect(target, effect);
        }
      });
    }
    
    // Clear visual effects
    setTimeout(() => {
      setBattleEffects(prev => prev.filter(effect => !effect.includes(ability.element)));
    }, 3000);
    
    // Check for battle end
    checkBattleEnd();
  };

  const applyStatusEffect = (target: Monster, effectName: string) => {
    const statusEffects: { [key: string]: StatusEffect } = {
      'burn': {
        id: 'burn',
        name: 'Burn',
        type: 'debuff',
        duration: 3,
        value: 50,
        description: 'Takes fire damage each turn'
      },
      'freeze': {
        id: 'freeze',
        name: 'Freeze',
        type: 'debuff',
        duration: 2,
        value: 0,
        description: 'Cannot act for 2 turns'
      },
      'vulnerable': {
        id: 'vulnerable',
        name: 'Vulnerable',
        type: 'debuff',
        duration: 3,
        value: 30,
        description: 'Takes 30% more damage'
      }
    };
    
    const effect = statusEffects[effectName];
    if (effect) {
      if (target.isPlayer) {
        setPlayerMonster(prev => prev ? {
          ...prev,
          statusEffects: [...prev.statusEffects.filter(e => e.id !== effect.id), effect]
        } : null);
      } else {
        setEnemyMonster(prev => prev ? {
          ...prev,
          statusEffects: [...prev.statusEffects.filter(e => e.id !== effect.id), effect]
        } : null);
      }
      
      addBattleLog('status', `${target.name} is affected by ${effect.name}!`);
    }
  };

  const checkBattleEnd = () => {
    if (playerMonster && playerMonster.currentHp <= 0) {
      setBattlePhase('defeat');
      setAnimationQueue(prev => [...prev, 'defeat']);
      addBattleLog('system', 'Your monster has been defeated!');
    } else if (enemyMonster && enemyMonster.currentHp <= 0) {
      setBattlePhase('victory');
      setAnimationQueue(prev => [...prev, 'victory']);
      addBattleLog('system', 'Victory! Enemy monster defeated!');
    }
  };

  const handleAttack = (ability: BattleAbility) => {
    if (!playerMonster || !enemyMonster) return;
    
    executeAbility(playerMonster, enemyMonster, ability);
    setCurrentTurn('enemy');
    setTurnTimer(30);
    
    // Enemy AI turn after delay
    setTimeout(() => {
      handleEnemyTurn();
    }, 3000);
  };

  const handleDefend = () => {
    if (!playerMonster) return;
    
    // Restore energy and reduce incoming damage
    setPlayerMonster(prev => prev ? {
      ...prev,
      energy: Math.min(prev.maxEnergy, prev.energy + 20),
      statusEffects: [...prev.statusEffects, {
        id: 'defend',
        name: 'Defending',
        type: 'buff',
        duration: 1,
        value: 50,
        description: 'Reduces incoming damage by 50%'
      }]
    } : null);
    
    setAnimationQueue(prev => [...prev, 'defend']);
    addBattleLog('system', `${playerMonster.name} takes a defensive stance!`);
    
    setCurrentTurn('enemy');
    setTurnTimer(30);
    
    setTimeout(() => {
      handleEnemyTurn();
    }, 1500);
  };

  const handleEnemyTurn = () => {
    if (!enemyMonster || !playerMonster) return;
    
    // Simple AI: Choose random available ability
    const availableAbilities = enemyMonster.abilities.filter(
      ability => ability.currentCooldown === 0 && enemyMonster.energy >= ability.energyCost
    );
    
    if (availableAbilities.length > 0) {
      const randomAbility = availableAbilities[Math.floor(Math.random() * availableAbilities.length)];
      executeAbility(enemyMonster, playerMonster, randomAbility);
    } else {
      // Enemy defends if no abilities available
      setEnemyMonster(prev => prev ? {
        ...prev,
        energy: Math.min(prev.maxEnergy, prev.energy + 25)
      } : null);
      addBattleLog('system', `${enemyMonster.name} recovers energy!`);
    }
    
    // Reduce cooldowns
    setPlayerMonster(prev => prev ? {
      ...prev,
      abilities: prev.abilities.map(ability => ({
        ...ability,
        currentCooldown: Math.max(0, ability.currentCooldown - 1)
      }))
    } : null);
    
    setEnemyMonster(prev => prev ? {
      ...prev,
      abilities: prev.abilities.map(ability => ({
        ...ability,
        currentCooldown: Math.max(0, ability.currentCooldown - 1)
      }))
    } : null);
    
    // Apply status effect damage
    processStatusEffects();
    
    setCurrentTurn('player');
    setTurnTimer(30);
  };

  const processStatusEffects = () => {
    // Process player status effects
    if (playerMonster) {
      playerMonster.statusEffects.forEach(effect => {
        if (effect.name === 'Burn') {
          const damage = effect.value;
          setPlayerMonster(prev => prev ? {
            ...prev,
            currentHp: Math.max(0, prev.currentHp - damage)
          } : null);
          addBattleLog('damage', `${playerMonster.name} takes ${damage} burn damage!`, damage);
        }
      });
      
      // Reduce status effect durations
      setPlayerMonster(prev => prev ? {
        ...prev,
        statusEffects: prev.statusEffects
          .map(effect => ({ ...effect, duration: effect.duration - 1 }))
          .filter(effect => effect.duration > 0)
      } : null);
    }
    
    // Process enemy status effects
    if (enemyMonster) {
      enemyMonster.statusEffects.forEach(effect => {
        if (effect.name === 'Burn') {
          const damage = effect.value;
          setEnemyMonster(prev => prev ? {
            ...prev,
            currentHp: Math.max(0, prev.currentHp - damage)
          } : null);
          addBattleLog('damage', `${enemyMonster.name} takes ${damage} burn damage!`, damage);
        }
      });
      
      setEnemyMonster(prev => prev ? {
        ...prev,
        statusEffects: prev.statusEffects
          .map(effect => ({ ...effect, duration: effect.duration - 1 }))
          .filter(effect => effect.duration > 0)
      } : null);
    }
  };

  const startBattle = () => {
    setBattlePhase('combat');
    setCombatReady(true);
    addBattleLog('system', 'Battle begins! Choose your action!');
  };

  const resetBattle = () => {
    setBattlePhase('preparation');
    setCombatReady(false);
    setCurrentTurn('player');
    setTurnTimer(30);
    setBattleLog([]);
    setAnimationQueue([]);
    setBattleEffects([]);
    
    // Reset monsters to full health
    if (playerMonster) {
      setPlayerMonster(prev => prev ? {
        ...prev,
        currentHp: prev.maxHp,
        energy: prev.maxEnergy,
        statusEffects: [],
        abilities: prev.abilities.map(ability => ({ ...ability, currentCooldown: 0 }))
      } : null);
    }
    
    if (enemyMonster) {
      setEnemyMonster(prev => prev ? {
        ...prev,
        currentHp: prev.maxHp,
        energy: prev.maxEnergy,
        statusEffects: [],
        abilities: prev.abilities.map(ability => ({ ...ability, currentCooldown: 0 }))
      } : null);
    }
  };

  const getElementColor = (element: string) => {
    const colors: { [key: string]: string } = {
      'Fire': 'from-red-500 to-orange-600',
      'Ice': 'from-cyan-400 to-blue-600',
      'Water': 'from-blue-400 to-blue-600',
      'Nature': 'from-green-400 to-emerald-600',
      'Earth': 'from-amber-600 to-yellow-600',
      'Lightning': 'from-yellow-400 to-purple-400',
      'Shadow': 'from-purple-500 to-purple-700',
      'Light': 'from-yellow-200 to-yellow-400'
    };
    return colors[element] || 'from-gray-400 to-gray-600';
  };

  if (!playerMonster || !enemyMonster) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading battle...</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-950 relative overflow-hidden ${cameraShake ? 'animate-pulse' : ''} ${slowMotion ? 'transition-all duration-2000' : 'transition-all duration-300'}`}>
      {/* Dynamic Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/20 via-transparent to-blue-900/20"></div>
        
        {/* Battle Effects */}
        {battleEffects.includes('Fire-effect') && (
          <div className="absolute inset-0 bg-red-600/20 animate-pulse"></div>
        )}
        {battleEffects.includes('Ice-effect') && (
          <div className="absolute inset-0 bg-blue-600/20 animate-pulse"></div>
        )}
        
        {criticalHit && (
          <div className="absolute inset-0 bg-yellow-400/30 animate-ping"></div>
        )}
      </div>

      {/* Header UI */}
      <header className="fixed top-0 w-full bg-black/40 backdrop-blur-md z-50 border-b border-red-800/30">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <i className="ri-arrow-left-line text-white text-xl mr-2"></i>
            <span className="text-white font-semibold">Realistic AR Battle</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-purple-400 text-sm">
              {battlePhase === 'combat' ? `Turn: ${currentTurn}` : battlePhase.toUpperCase()}
            </div>
            {battlePhase === 'combat' && currentTurn === 'player' && (
              <div className="text-red-400 text-sm font-bold">
                ⏱️ {turnTimer}s
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Battle Arena */}
      <section className="pt-20 px-4 relative z-10">
        <div className="min-h-[400px] relative">
          {/* Arena Background */}
          <div 
            className="absolute inset-0 rounded-2xl bg-cover bg-center"
            style={{
              backgroundImage: `url(https://readdy.ai/api/search-image?query=Epic%20fantasy%20battle%20arena%20with%20dramatic%20lighting%2C%20realistic%203D%20battlefield%20environment%2C%20volcanic%20and%20icy%20terrain%20split%2C%20cinematic%20battle%20scene%20background%20with%20atmospheric%20effects&width=375&height=400&seq=battle-arena-bg&orientation=landscape)`
            }}
          >
            <div className="absolute inset-0 bg-black/40 rounded-2xl"></div>
          </div>
          
          {/* Player Monster */}
          <div className={`absolute left-8 bottom-8 transition-all duration-500 ${playerMonster.animation === 'hit' ? 'animate-bounce' : ''} ${playerMonster.animation === 'fire-breath' ? 'scale-110' : ''}`}>
            <div 
              className="w-32 h-32 rounded-xl bg-cover bg-center relative"
              style={{
                backgroundImage: `url(https://readdy.ai/api/search-image?query=Fierce%20fire%20dragon%20in%20battle%20stance%20breathing%20flames%2C%20dynamic%20combat%20pose%2C%20realistic%203D%20monster%20with%20molten%20lava%20veins%2C%20epic%20fantasy%20creature%20ready%20for%20battle&width=128&height=128&seq=player-dragon-battle&orientation=squarish)`
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-red-900/30 to-transparent rounded-xl"></div>
              
              {/* Health Bar */}
              <div className="absolute -top-8 left-0 right-0">
                <div className="bg-gray-800/90 rounded-full p-1">
                  <div className="bg-gray-700 rounded-full h-2 relative">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-red-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(playerMonster.currentHp / playerMonster.maxHp) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-white text-xs text-center mt-1">
                  {playerMonster.currentHp} / {playerMonster.maxHp}
                </div>
              </div>
              
              {/* Energy Bar */}
              <div className="absolute -bottom-8 left-0 right-0">
                <div className="bg-gray-800/90 rounded-full p-1">
                  <div className="bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(playerMonster.energy / playerMonster.maxEnergy) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-blue-400 text-xs text-center mt-1">
                  ⚡ {playerMonster.energy} / {playerMonster.maxEnergy}
                </div>
              </div>
              
              {/* Status Effects */}
              {playerMonster.statusEffects.length > 0 && (
                <div className="absolute -top-12 left-0 right-0 flex justify-center space-x-1">
                  {playerMonster.statusEffects.map((effect, index) => (
                    <div key={index} className={`w-4 h-4 rounded-full text-xs flex items-center justify-center ${
                      effect.type === 'buff' ? 'bg-green-600' : 'bg-red-600'
                    }`}>
                      {effect.duration}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="text-center mt-2">
              <div className="text-white font-bold text-sm">{playerMonster.name}</div>
              <div className="text-red-400 text-xs">Lv.{playerMonster.level}</div>
            </div>
          </div>
          
          {/* Enemy Monster */}
          <div className={`absolute right-8 bottom-8 transition-all duration-500 ${enemyMonster.animation === 'hit' ? 'animate-bounce' : ''} ${enemyMonster.animation === 'ice-breath' ? 'scale-110' : ''}`}>
            <div 
              className="w-32 h-32 rounded-xl bg-cover bg-center relative"
              style={{
                backgroundImage: `url(https://readdy.ai/api/search-image?query=Majestic%20ice%20dragon%20with%20crystal%20formations%2C%20frost%20breath%20attack%20pose%2C%20realistic%20fantasy%20creature%20with%20icy%20blue%20scales%2C%20powerful%20arctic%20wyvern%20in%20battle%20stance&width=128&height=128&seq=enemy-ice-dragon&orientation=squarish)`
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent rounded-xl"></div>
              
              {/* Health Bar */}
              <div className="absolute -top-8 left-0 right-0">
                <div className="bg-gray-800/90 rounded-full p-1">
                  <div className="bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-red-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(enemyMonster.currentHp / enemyMonster.maxHp) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-white text-xs text-center mt-1">
                  {enemyMonster.currentHp} / {enemyMonster.maxHp}
                </div>
              </div>
              
              {/* Energy Bar */}
              <div className="absolute -bottom-8 left-0 right-0">
                <div className="bg-gray-800/90 rounded-full p-1">
                  <div className="bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(enemyMonster.energy / enemyMonster.maxEnergy) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-blue-400 text-xs text-center mt-1">
                  ⚡ {enemyMonster.energy} / {enemyMonster.maxEnergy}
                </div>
              </div>
              
              {/* Status Effects */}
              {enemyMonster.statusEffects.length > 0 && (
                <div className="absolute -top-12 left-0 right-0 flex justify-center space-x-1">
                  {enemyMonster.statusEffects.map((effect, index) => (
                    <div key={index} className={`w-4 h-4 rounded-full text-xs flex items-center justify-center ${
                      effect.type === 'buff' ? 'bg-green-600' : 'bg-red-600'
                    }`}>
                      {effect.duration}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="text-center mt-2">
              <div className="text-white font-bold text-sm">{enemyMonster.name}</div>
              <div className="text-blue-400 text-xs">Lv.{enemyMonster.level}</div>
            </div>
          </div>
          
          {/* Element Effectiveness Display */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
            <div className="bg-black/70 rounded-xl p-3 text-center">
              <div className="text-white text-sm mb-1">Element Matchup</div>
              <div className="flex items-center space-x-2">
                <div className={`px-3 py-1 rounded-full text-xs bg-gradient-to-r ${getElementColor(playerMonster.element)} text-white`}>
                  {playerMonster.element}
                </div>
                <span className="text-white">VS</span>
                <div className={`px-3 py-1 rounded-full text-xs bg-gradient-to-r ${getElementColor(enemyMonster.element)} text-white`}>
                  {enemyMonster.element}
                </div>
              </div>
              <div className="text-xs mt-1 text-yellow-400">
                {getElementEffectiveness(playerMonster.element, enemyMonster.element) > 1 ? 'Super Effective!' :
                 getElementEffectiveness(playerMonster.element, enemyMonster.element) < 1 ? 'Not Very Effective' :
                 'Normal Damage'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Battle Controls */}
      {battlePhase === 'preparation' && (
        <section className="px-4 py-6 relative z-10">
          <div className="bg-gray-900/80 border-2 border-purple-600 rounded-2xl p-6">
            <div className="text-center mb-6">
              <div className="text-4xl mb-2">⚔️</div>
              <h2 className="text-2xl font-bold text-white mb-2">Battle Preparation</h2>
              <p className="text-gray-300 text-sm">Get ready for intense AR combat!</p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="bg-red-900/30 border border-red-700 rounded-lg p-4">
                <div className="text-red-400 font-semibold mb-2">🔥 Your Monster</div>
                <div className="text-white font-bold">{playerMonster.name}</div>
                <div className="text-gray-300 text-sm">Level {playerMonster.level} • {playerMonster.element} Element</div>
                <div className="text-sm mt-2">HP: {playerMonster.maxHp} | Power: {playerMonster.power} | Defense: {playerMonster.defense}</div>
              </div>
              
              <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
                <div className="text-blue-400 font-semibold mb-2">🧊 Enemy Monster</div>
                <div className="text-white font-bold">{enemyMonster.name}</div>
                <div className="text-gray-300 text-sm">Level {enemyMonster.level} • {enemyMonster.element} Element</div>
                <div className="text-sm mt-2">HP: {enemyMonster.maxHp} | Power: {enemyMonster.power} | Defense: {enemyMonster.defense}</div>
              </div>
            </div>
            
            <button
              onClick={startBattle}
              className="w-full bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 text-white py-4 rounded-lg font-bold text-lg"
            >
              🚀 Start Realistic Battle!
            </button>
          </div>
        </section>
      )}

      {battlePhase === 'combat' && currentTurn === 'player' && (
        <section className="px-4 py-6 relative z-10">
          {/* Action Selection */}
          {!selectedAction && (
            <div className="bg-gray-900/80 border-2 border-yellow-600 rounded-2xl p-6 mb-4">
              <div className="text-center mb-4">
                <div className="text-yellow-400 font-bold text-lg">Choose Your Action</div>
                <div className="text-gray-300 text-sm">Time remaining: {turnTimer}s</div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setSelectedAction('attack')}
                  className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold"
                >
                  ⚔️ Attack
                </button>
                <button
                  onClick={() => setSelectedAction('special')}
                  className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold"
                >
                  ✨ Special
                </button>
                <button
                  onClick={handleDefend}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
                >
                  🛡️ Defend
                </button>
                <button
                  onClick={() => setSelectedAction('special')}
                  className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
                >
                  💚 Items
                </button>
              </div>
            </div>
          )}
          
          {/* Ability Selection */}
          {selectedAction && (
            <div className="bg-gray-900/80 border-2 border-purple-600 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-white font-bold">Select Ability</div>
                <button
                  onClick={() => setSelectedAction(null)}
                  className="text-gray-400 hover:text-white"
                >
                  ← Back
                </button>
              </div>
              
              <div className="space-y-3">
                {playerMonster.abilities
                  .filter(ability => selectedAction === 'attack' ? ability.type === 'attack' : 
                                   selectedAction === 'special' ? ability.type === 'special' || ability.type === 'defense' : true)
                  .map((ability) => (
                    <button
                      key={ability.id}
                      onClick={() => handleAttack(ability)}
                      disabled={ability.currentCooldown > 0 || playerMonster.energy < ability.energyCost}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                        ability.currentCooldown > 0 || playerMonster.energy < ability.energyCost
                          ? 'border-gray-600 bg-gray-800/50 opacity-50 cursor-not-allowed'
                          : `border-${ability.element === 'Fire' ? 'red' : 'blue'}-600 bg-${ability.element === 'Fire' ? 'red' : 'blue'}-900/30 hover:bg-${ability.element === 'Fire' ? 'red' : 'blue'}-900/50`
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-white font-bold">{ability.name}</div>
                        <div className="flex items-center space-x-2">
                          <div className="text-blue-400 text-sm">⚡{ability.energyCost}</div>
                          {ability.currentCooldown > 0 && (
                            <div className="text-red-400 text-sm">🕐{ability.currentCooldown}</div>
                          )}
                        </div>
                      </div>
                      <div className="text-gray-300 text-sm mb-2">{ability.description}</div>
                      <div className="flex items-center space-x-3">
                        {ability.damage > 0 && (
                          <div className="text-red-400 text-sm">💥 {ability.damage}</div>
                        )}
                        <div className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${getElementColor(ability.element)} text-white`}>
                          {ability.element}
                        </div>
                        {ability.areaEffect && (
                          <div className="text-xs px-2 py-1 rounded-full bg-orange-600/30 text-orange-300 border border-orange-600/50">
                            AOE
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Battle Log */}
      <section className="px-4 py-6 relative z-10">
        <div className="bg-gray-900/80 border border-gray-700 rounded-xl p-4">
          <div className="text-white font-semibold mb-3">📜 Battle Log</div>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {battleLog.map((log) => (
              <div
                key={log.id}
                className={`text-sm p-2 rounded ${
                  log.type === 'damage' ? log.critical ? 'bg-yellow-900/30 text-yellow-300' : 'bg-red-900/30 text-red-300' :
                  log.type === 'status' ? 'bg-purple-900/30 text-purple-300' :
                  log.type === 'system' ? 'bg-blue-900/30 text-blue-300' :
                  'bg-gray-800/30 text-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{log.message}</span>
                  {log.value && (
                    <span className="font-bold">
                      {log.critical && '⚡'}{log.value}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Battle End Screens */}
      {(battlePhase === 'victory' || battlePhase === 'defeat') && (
        <section className="px-4 py-6 relative z-10">
          <div className={`bg-gray-900/80 border-2 rounded-2xl p-6 ${
            battlePhase === 'victory' ? 'border-green-600' : 'border-red-600'
          }`}>
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">
                {battlePhase === 'victory' ? '🎉' : '💀'}
              </div>
              <h2 className={`text-3xl font-bold mb-2 ${
                battlePhase === 'victory' ? 'text-green-400' : 'text-red-400'
              }`}>
                {battlePhase === 'victory' ? 'VICTORY!' : 'DEFEAT!'}
              </h2>
              <p className="text-gray-300">
                {battlePhase === 'victory' 
                  ? 'Your monster has emerged victorious in this epic battle!' 
                  : 'Your monster fought bravely but was defeated this time.'
                }
              </p>
            </div>
            
            {battlePhase === 'victory' && (
              <div className="bg-green-900/30 border border-green-700 rounded-xl p-4 mb-4">
                <div className="text-green-400 font-semibold mb-2">🎁 Battle Rewards</div>
                <div className="space-y-1 text-sm">
                  <div className="text-gray-300">• +850 EXP</div>
                  <div className="text-gray-300">• +125 Gold Coins</div>
                  <div className="text-gray-300">• Rare Battle Relic (Fire Crystal)</div>
                  <div className="text-gray-300">• Monster Bond Level +5</div>
                </div>
              </div>
            )}
            
            <div className="flex space-x-3">
              <button
                onClick={resetBattle}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold"
              >
                🔄 Battle Again
              </button>
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold">
                🏠 Return Home
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Battle Features Guide */}
      <section className="px-4 py-6 relative z-10 mb-20">
        <div className="bg-gray-800/50 rounded-xl p-4">
          <h3 className="text-white font-bold mb-3">⚔️ Realistic Battle Features</h3>
          <div className="grid grid-cols-1 gap-3 text-sm">
            <div className="bg-red-900/30 rounded-lg p-3">
              <div className="text-red-400 font-semibold">🎬 Cinematic Combat</div>
              <div className="text-gray-300 text-xs">
                Dynamic camera shakes, slow-motion special attacks, critical hit effects, and element-based visual explosions
              </div>
            </div>
            <div className="bg-blue-900/30 rounded-lg p-3">
              <div className="text-blue-400 font-semibold">⚡ Strategic Depth</div>
              <div className="text-gray-300 text-xs">
                Energy management, ability cooldowns, status effects, element effectiveness, and turn-based tactical decisions
              </div>
            </div>
            <div className="bg-green-900/30 rounded-lg p-3">
              <div className="text-green-400 font-semibold">🎯 Real-time Feedback</div>
              <div className="text-gray-300 text-xs">
                Live battle log, damage numbers, health/energy bars, status effect tracking, and turn timer pressure
              </div>
            </div>
            <div className="bg-purple-900/30 rounded-lg p-3">
              <div className="text-purple-400 font-semibold">🔊 Immersive Audio</div>
              <div className="text-gray-300 text-xs">
                Element-specific sound effects, monster roars, ability audio cues, and environmental battle ambiance
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}