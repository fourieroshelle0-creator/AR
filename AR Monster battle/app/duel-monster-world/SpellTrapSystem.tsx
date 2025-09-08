
'use client';

import { useState, useEffect } from 'react';

interface SpellTrapCard {
  id: string;
  name: string;
  type: 'Spell' | 'Trap';
  subtype: 'Normal' | 'Quick-Play' | 'Continuous' | 'Field' | 'Equip' | 'Counter' | 'Ritual';
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  level?: number; // New: Trap card levels
  cost: number;
  effect: string;
  detailedEffect: string;
  activation: string;
  levelProgression?: {
    level1: string;
    level2: string;
    level3: string;
  };
  arEffect: string;
  cooldown: number;
  duration?: number;
  targetType: 'Monster' | 'Player' | 'Field' | 'All' | 'Hand' | 'Deck';
  cardArt: string;
  soundEffect: string;
  obtained: boolean;
  timesUsed?: number;
  effectiveness?: number;
}

interface ActiveEffect {
  cardId: string;
  cardName: string;
  type: 'Spell' | 'Trap';
  level?: number;
  timeRemaining: number;
  description: string;
  visual: string;
}

export default function SpellTrapSystem() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'spells' | 'traps' | 'active' | 'deck'>('traps');
  const [showActivationModal, setShowActivationModal] = useState(false);
  const [activationTarget, setActivationTarget] = useState<SpellTrapCard | null>(null);
  const [selectedTrapLevel, setSelectedTrapLevel] = useState<number>(1);
  const [activeEffects, setActiveEffects] = useState<ActiveEffect[]>([]);
  const [showCraftingModal, setShowCraftingModal] = useState(false);
  const [battlePhase, setBattlePhase] = useState<'Main' | 'Battle' | 'End'>('Main');

  const spellCards: SpellTrapCard[] = [
    // NORMAL SPELLS
    {
      id: 'monster-reborn',
      name: 'Spirit Resurrection',
      type: 'Spell',
      subtype: 'Normal',
      rarity: 'Epic',
      cost: 8,
      effect: 'Revive 1 defeated monster from your graveyard with 50% HP',
      detailedEffect: 'Select 1 monster that was defeated this duel and return it to the battlefield with half its original HP. The revived monster gains +500 ATK until end of turn.',
      activation: 'Main Phase only',
      arEffect: 'Ghost energy swirls around selected monster, materializing it back into AR space with ethereal glow',
      cooldown: 3,
      targetType: 'Monster',
      cardArt: 'Mystical resurrection spell with ghostly energy reviving fallen monster, ethereal spirits guiding creature back to life, dramatic necromancy magic with purple energy effects',
      soundEffect: 'Mystical resurrection chimes + ghostly whispers + monster roar returning to life',
      obtained: true,
      timesUsed: 12,
      effectiveness: 87
    },
    {
      id: 'power-surge',
      name: 'Volcanic Power Surge',
      type: 'Spell',
      subtype: 'Normal',
      rarity: 'Rare',
      cost: 4,
      effect: 'Target monster gains +1000 ATK and piercing damage for 3 turns',
      detailedEffect: 'Choose 1 monster on the field. It gains +1000 ATK and its attacks deal damage even if blocked for 3 turns. Fire-type monsters gain an additional +500 ATK.',
      activation: 'Main Phase or Quick-Play during Battle Phase',
      arEffect: 'Target monster becomes wreathed in flames, size increases slightly, red energy aura pulses with power',
      cooldown: 2,
      targetType: 'Monster',
      cardArt: 'Monster surrounded by volcanic energy and power flames, dramatic ATK boost visualization with erupting volcanic background, epic power enhancement spell',
      soundEffect: 'Volcanic eruption + power charging sound + monster roar intensifying',
      obtained: true,
      timesUsed: 34,
      effectiveness: 92
    }
  ];

  const trapCards: SpellTrapCard[] = [
    // LEVELED TRAP CARDS - THE CAGE SERIES
    {
      id: 'the-cage-lv1',
      name: 'The Cage',
      type: 'Trap',
      subtype: 'Normal',
      rarity: 'Common',
      level: 1,
      cost: 3,
      effect: 'Trap 1 enemy monster for 1 turn - cannot attack or use abilities',
      detailedEffect: 'Select 1 enemy monster. It becomes trapped in an energy cage for 1 turn and cannot attack, defend, or use any abilities. Monster takes 200 damage at start of each trapped turn.',
      activation: 'When opponent declares an attack or activates monster ability',
      levelProgression: {
        level1: 'Traps monster for 1 turn with basic energy cage',
        level2: 'Traps monster for 2 turns with reinforced steel cage',
        level3: 'Traps monster for 3 turns with unbreakable crystal prison'
      },
      arEffect: 'Glowing energy bars materialize around target monster, creating visible cage that pulses with containment energy',
      cooldown: 4,
      targetType: 'Monster',
      cardArt: 'Energy cage trapping monster with glowing bars and containment field, Level 1 basic trap with simple energy prison, tactical control trap card design',
      soundEffect: 'Energy cage materializing + monster struggling sounds + containment field humming',
      obtained: true,
      timesUsed: 28,
      effectiveness: 85
    },
    {
      id: 'the-cage-lv2',
      name: 'The Cage',
      type: 'Trap',
      subtype: 'Normal',
      rarity: 'Rare',
      level: 2,
      cost: 5,
      effect: 'Trap 1 enemy monster for 2 turns - cannot attack or use abilities',
      detailedEffect: 'Select 1 enemy monster. It becomes trapped in a reinforced steel cage for 2 turns and cannot attack, defend, or use any abilities. Monster takes 300 damage at start of each trapped turn.',
      activation: 'When opponent declares an attack or activates monster ability',
      levelProgression: {
        level1: 'Traps monster for 1 turn with basic energy cage',
        level2: 'Traps monster for 2 turns with reinforced steel cage',
        level3: 'Traps monster for 3 turns with unbreakable crystal prison'
      },
      arEffect: 'Heavy steel bars with reinforced locks materialize around monster, cage appears more solid and imposing than Level 1',
      cooldown: 5,
      targetType: 'Monster',
      cardArt: 'Reinforced steel cage with heavy locks trapping monster, Level 2 enhanced prison with metal bars and stronger containment, upgraded trap design',
      soundEffect: 'Heavy steel cage slamming shut + stronger containment field + monster roaring in frustration',
      obtained: true,
      timesUsed: 15,
      effectiveness: 90
    },
    {
      id: 'the-cage-lv3',
      name: 'The Cage',
      type: 'Trap',
      subtype: 'Normal',
      rarity: 'Epic',
      level: 3,
      cost: 8,
      effect: 'Trap 1 enemy monster for 3 turns - cannot attack or use abilities',
      detailedEffect: 'Select 1 enemy monster. It becomes trapped in an unbreakable crystal prison for 3 turns and cannot attack, defend, or use any abilities. Monster takes 500 damage at start of each trapped turn and loses 200 ATK permanently.',
      activation: 'When opponent declares an attack or activates monster ability',
      levelProgression: {
        level1: 'Traps monster for 1 turn with basic energy cage',
        level2: 'Traps monster for 2 turns with reinforced steel cage',
        level3: 'Traps monster for 3 turns with unbreakable crystal prison'
      },
      arEffect: 'Brilliant crystal prison materializes with rainbow refractions, completely encasing monster in unbreakable barrier',
      cooldown: 7,
      targetType: 'Monster',
      cardArt: 'Unbreakable crystal prison with rainbow refractions trapping monster, Level 3 ultimate cage with perfect crystal barriers, maximum security containment',
      soundEffect: 'Crystal prison forming with harmonic chimes + absolute containment field + monster muffled cries',
      obtained: false,
      effectiveness: 0
    },

    // LEVELED TRAP CARDS - SHADOW BIND SERIES
    {
      id: 'shadow-bind-lv1',
      name: 'Shadow Bind',
      type: 'Trap',
      subtype: 'Continuous',
      rarity: 'Common',
      level: 1,
      cost: 4,
      effect: 'Reduce 1 enemy monster ATK by 500 for 1 turn',
      detailedEffect: 'Target 1 enemy monster. Dark tendrils wrap around it, reducing ATK by 500 for 1 turn. If monster tries to attack while bound, it takes 300 damage.',
      activation: 'Activate face-down, trigger when needed',
      levelProgression: {
        level1: 'Reduces ATK by 500 for 1 turn with shadow tendrils',
        level2: 'Reduces ATK by 800 for 2 turns with shadow chains',
        level3: 'Reduces ATK by 1200 for 3 turns with shadow imprisonment'
      },
      arEffect: 'Dark shadow tendrils emerge from ground, wrapping around monster\'s limbs and creating binding effect',
      cooldown: 3,
      duration: 1,
      targetType: 'Monster',
      cardArt: 'Shadow tendrils emerging from darkness to bind monster, Level 1 basic shadow magic with dark energy restraints, supernatural binding trap',
      soundEffect: 'Shadow tendrils emerging + dark magic humming + monster struggling against bonds',
      obtained: true,
      timesUsed: 22,
      effectiveness: 78
    },
    {
      id: 'shadow-bind-lv2',
      name: 'Shadow Bind',
      type: 'Trap',
      subtype: 'Continuous',
      rarity: 'Rare',
      level: 2,
      cost: 6,
      effect: 'Reduce 1 enemy monster ATK by 800 for 2 turns',
      detailedEffect: 'Target 1 enemy monster. Heavy shadow chains wrap around it, reducing ATK by 800 for 2 turns. Monster cannot use special abilities while chained.',
      activation: 'Activate face-down, trigger when needed',
      levelProgression: {
        level1: 'Reduces ATK by 500 for 1 turn with shadow tendrils',
        level2: 'Reduces ATK by 800 for 2 turns with shadow chains',
        level3: 'Reduces ATK by 1200 for 3 turns with shadow imprisonment'
      },
      arEffect: 'Heavy shadow chains materialize, completely restraining monster with thick dark metal links',
      cooldown: 4,
      duration: 2,
      targetType: 'Monster',
      cardArt: 'Heavy shadow chains binding monster with dark metal links, Level 2 enhanced shadow prison with stronger restraints, upgraded binding magic',
      soundEffect: 'Heavy chains materializing + dark metal clanking + monster roaring in defiance',
      obtained: true,
      timesUsed: 11,
      effectiveness: 88
    },
    {
      id: 'shadow-bind-lv3',
      name: 'Shadow Bind',
      type: 'Trap',
      subtype: 'Continuous',
      rarity: 'Epic',
      level: 3,
      cost: 9,
      effect: 'Reduce 1 enemy monster ATK by 1200 for 3 turns',
      detailedEffect: 'Target 1 enemy monster. Complete shadow imprisonment engulfs it, reducing ATK by 1200 for 3 turns. Monster becomes completely immobilized and takes 400 damage each turn.',
      activation: 'Activate face-down, trigger when needed',
      levelProgression: {
        level1: 'Reduces ATK by 500 for 1 turn with shadow tendrils',
        level2: 'Reduces ATK by 800 for 2 turns with shadow chains',
        level3: 'Reduces ATK by 1200 for 3 turns with shadow imprisonment'
      },
      arEffect: 'Complete shadow prison engulfs monster, creating dark void around creature with swirling shadow energy',
      cooldown: 6,
      duration: 3,
      targetType: 'Monster',
      cardArt: 'Complete shadow imprisonment with swirling dark void engulfing monster, Level 3 ultimate shadow prison with total restraint, maximum binding power',
      soundEffect: 'Shadow void opening + complete imprisonment sound + monster muffled within dark prison',
      obtained: false,
      effectiveness: 0
    },

    // LEVELED TRAP CARDS - ELEMENTAL BARRIER SERIES
    {
      id: 'elemental-barrier-lv1',
      name: 'Elemental Barrier',
      type: 'Trap',
      subtype: 'Counter',
      rarity: 'Common',
      level: 1,
      cost: 3,
      effect: 'Reduce incoming damage by 50% for 1 turn',
      detailedEffect: 'When opponent attacks, activate this barrier to reduce all damage to your monsters by 50% for 1 turn. Works against 1 attack only.',
      activation: 'When receiving damage - Chain priority',
      levelProgression: {
        level1: 'Reduces damage by 50% for 1 turn, blocks 1 attack',
        level2: 'Reduces damage by 70% for 2 turns, blocks 2 attacks',
        level3: 'Reduces damage by 90% for 3 turns, blocks 3 attacks'
      },
      arEffect: 'Shimmering elemental shield appears in front of your monsters, deflecting incoming attacks with energy',
      cooldown: 4,
      targetType: 'Player',
      cardArt: 'Shimmering elemental shield deflecting attacks, Level 1 basic barrier with energy deflection, protective counter trap',
      soundEffect: 'Energy shield activation + attack deflection + protective barrier humming',
      obtained: true,
      timesUsed: 19,
      effectiveness: 82
    },
    {
      id: 'elemental-barrier-lv2',
      name: 'Elemental Barrier',
      type: 'Trap',
      subtype: 'Counter',
      rarity: 'Rare',
      level: 2,
      cost: 5,
      effect: 'Reduce incoming damage by 70% for 2 turns',
      detailedEffect: 'When opponent attacks, activate this stronger barrier to reduce all damage to your monsters by 70% for 2 turns. Works against up to 2 attacks.',
      activation: 'When receiving damage - Chain priority',
      levelProgression: {
        level1: 'Reduces damage by 50% for 1 turn, blocks 1 attack',
        level2: 'Reduces damage by 70% for 2 turns, blocks 2 attacks',
        level3: 'Reduces damage by 90% for 3 turns, blocks 3 attacks'
      },
      arEffect: 'Reinforced elemental dome materializes around your side, creating stronger protective field with multiple layers',
      cooldown: 5,
      targetType: 'Player',
      cardArt: 'Reinforced elemental dome with multiple protective layers, Level 2 enhanced barrier with stronger energy field, upgraded defense system',
      soundEffect: 'Reinforced barrier activation + multiple layer formation + stronger protective field',
      obtained: true,
      timesUsed: 8,
      effectiveness: 91
    },
    {
      id: 'elemental-barrier-lv3',
      name: 'Elemental Barrier',
      type: 'Trap',
      subtype: 'Counter',
      rarity: 'Epic',
      level: 3,
      cost: 8,
      effect: 'Reduce incoming damage by 90% for 3 turns',
      detailedEffect: 'When opponent attacks, activate this ultimate barrier to reduce all damage to your monsters by 90% for 3 turns. Works against up to 3 attacks and reflects 25% damage back.',
      activation: 'When receiving damage - Chain priority',
      levelProgression: {
        level1: 'Reduces damage by 50% for 1 turn, blocks 1 attack',
        level2: 'Reduces damage by 70% for 2 turns, blocks 2 attacks',
        level3: 'Reduces damage by 90% for 3 turns, blocks 3 attacks'
      },
      arEffect: 'Absolute elemental fortress manifests with perfect crystal barriers that reflect attacks back at enemies',
      cooldown: 7,
      targetType: 'Player',
      cardArt: 'Absolute elemental fortress with perfect crystal barriers reflecting attacks, Level 3 ultimate defense with maximum protection, supreme barrier magic',
      soundEffect: 'Ultimate fortress activation + perfect barrier formation + attack reflection resonance',
      obtained: false,
      effectiveness: 0
    },

    // UNIQUE NON-LEVELED TRAPS
    {
      id: 'mirror-force',
      name: 'Reflection Barrier',
      type: 'Trap',
      subtype: 'Normal',
      rarity: 'Epic',
      cost: 6,
      effect: 'When opponent attacks, destroy all their attacking monsters',
      detailedEffect: 'Activate when opponent declares an attack. Destroy all monsters your opponent controls in Attack Position. They take 500 damage for each monster destroyed.',
      activation: 'When opponent attacks - Face-down until triggered',
      arEffect: 'Massive energy barrier appears, reflecting attack back at enemy monsters causing them to shatter',
      cooldown: 4,
      targetType: 'Monster',
      cardArt: 'Powerful energy barrier reflecting attacks back at enemies, defensive trap magic with mirror-like energy shield, classic protection trap',
      soundEffect: 'Energy barrier activation + reflection sound + enemy monsters destruction',
      obtained: true,
      timesUsed: 15,
      effectiveness: 94
    },
    {
      id: 'void-hole',
      name: 'Dimensional Void Trap',
      type: 'Trap',
      subtype: 'Normal',
      rarity: 'Legendary',
      cost: 8,
      effect: 'Banish all monsters on the field for 2 turns, then return them',
      detailedEffect: 'Remove all monsters from play for 2 turns. They return to the field in the same positions with full HP. Players cannot summon monsters while this effect is active.',
      activation: 'Any time - Emergency field clear',
      arEffect: 'Portal opens in center of field, sucking all monsters into dimensional void with swirling energy',
      cooldown: 6,
      targetType: 'All',
      cardArt: 'Dimensional portal opening on battlefield sucking monsters into void, space-time distortion trap with swirling void energy, reality manipulation trap',
      soundEffect: 'Portal opening + dimensional vacuum + reality warping sounds',
      obtained: false,
      effectiveness: 0
    }
  ];

  const getCurrentDeck = () => {
    return [...spellCards, ...trapCards].filter(card => card.obtained);
  };

  const getActiveSpellTraps = () => {
    return activeEffects;
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'text-gray-400 border-gray-600 bg-gray-600/20';
      case 'Rare': return 'text-blue-400 border-blue-600 bg-blue-600/20';
      case 'Epic': return 'text-purple-400 border-purple-600 bg-purple-600/20';
      case 'Legendary': return 'text-orange-400 border-orange-600 bg-orange-600/20';
      default: return 'text-gray-400 border-gray-600 bg-gray-600/20';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Spell': return 'text-green-400 bg-green-900/30 border-green-600';
      case 'Trap': return 'text-red-400 bg-red-900/30 border-red-600';
      default: return 'text-gray-400 bg-gray-900/30 border-gray-600';
    }
  };

  const getLevelColor = (level?: number) => {
    if (!level) return '';
    switch (level) {
      case 1: return 'text-white bg-gray-700 border-gray-500';
      case 2: return 'text-yellow-300 bg-yellow-800/30 border-yellow-600';
      case 3: return 'text-purple-300 bg-purple-800/30 border-purple-600';
      default: return 'text-white bg-gray-700 border-gray-500';
    }
  };

  const getSubtypeIcon = (subtype: string) => {
    switch (subtype) {
      case 'Normal': return '📜';
      case 'Quick-Play': return '⚡';
      case 'Continuous': return '🔄';
      case 'Field': return '🌍';
      case 'Equip': return '⚔️';
      case 'Counter': return '🛡️';
      case 'Ritual': return '✨';
      default: return '📝';
    }
  };

  const handleCardActivation = (card: SpellTrapCard) => {
    setActivationTarget(card);
    if (card.type === 'Trap' && card.level) {
      setSelectedTrapLevel(1); // Start at level 1
    }
    setShowActivationModal(true);
  };

  const executeCardEffect = () => {
    if (!activationTarget) return;
    
    // For leveled traps, use the selected level
    const effectLevel = activationTarget.type === 'Trap' && activationTarget.level ? selectedTrapLevel : 1;
    
    // Add to active effects if continuous
    if (activationTarget.subtype === 'Continuous' || activationTarget.subtype === 'Field') {
      const newEffect: ActiveEffect = {
        cardId: activationTarget.id,
        cardName: activationTarget.name,
        type: activationTarget.type,
        level: effectLevel,
        timeRemaining: effectLevel, // Duration equals level for leveled traps
        description: `${activationTarget.effect} (Level ${effectLevel})`,
        visual: activationTarget.arEffect
      };
      setActiveEffects(prev => [...prev, newEffect]);
    }
    
    setShowActivationModal(false);
    setActivationTarget(null);
    setSelectedTrapLevel(1);
  };

  const currentCards = viewMode === 'spells' ? spellCards : 
                     viewMode === 'traps' ? trapCards : 
                     viewMode === 'active' ? [] :
                     getCurrentDeck();

  const spellCount = spellCards.filter(c => c.obtained).length;
  const trapCount = trapCards.filter(c => c.obtained).length;
  const totalCards = spellCards.length + trapCards.length;
  const ownedCards = spellCount + trapCount;

  // Group trap cards by name for level display
  const groupedTraps = trapCards.reduce((acc, card) => {
    const baseName = card.name;
    if (!acc[baseName]) {
      acc[baseName] = [];
    }
    acc[baseName].push(card);
    return acc;
  }, {} as Record<string, SpellTrapCard[]>);

  return (
    <div className="min-h-screen bg-gray-950 pt-20 pb-24 relative overflow-hidden">
      {/* Atmospheric Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-black/40"></div>
        {activeEffects.length > 0 && (
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-red-500/5 animate-pulse"></div>
        )}
      </div>

      {/* Enhanced Card Activation Modal with Level Selection */}
      {showActivationModal && activationTarget && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-gray-900 border-2 border-purple-600 rounded-2xl p-6 max-w-sm w-full max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">{getSubtypeIcon(activationTarget.subtype)}</div>
              <h3 className="text-xl font-bold text-white mb-2">Activate {activationTarget.type}</h3>
              <p className="text-purple-300 text-sm">{activationTarget.name}</p>
              {activationTarget.level && (
                <div className="text-yellow-400 text-xs mt-1">Leveled Trap Card</div>
              )}
            </div>

            {/* Level Selection for Trap Cards */}
            {activationTarget.type === 'Trap' && activationTarget.level && (
              <div className="mb-4">
                <div className="text-white font-semibold text-sm mb-2">Select Trap Level:</div>
                <div className="flex space-x-2">
                  {[1, 2, 3].map((level) => (
                    <button
                      key={level}
                      onClick={() => setSelectedTrapLevel(level)}
                      disabled={level > (activationTarget.level || 1)}
                      className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all border-2 ${
                        selectedTrapLevel === level
                          ? 'bg-red-600 text-white border-red-500'
                          : level <= (activationTarget.level || 1)
                          ? 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
                          : 'bg-gray-800 text-gray-500 border-gray-700 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      Lv.{level}
                    </button>
                  ))}
                </div>
                
                {/* Level Effect Preview */}
                {activationTarget.levelProgression && (
                  <div className="mt-3 bg-red-900/30 border border-red-700 rounded-lg p-3">
                    <div className="text-red-400 font-semibold text-xs mb-1">Level {selectedTrapLevel} Effect:</div>
                    <div className="text-gray-300 text-xs">
                      {selectedTrapLevel === 1 ? activationTarget.levelProgression.level1 :
                       selectedTrapLevel === 2 ? activationTarget.levelProgression.level2 :
                       activationTarget.levelProgression.level3}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Card Preview */}
            <div 
              className={`w-full h-40 rounded-xl bg-cover bg-center mb-4 border-2 ${getRarityColor(activationTarget.rarity).split(' ')[1]}`}
              style={{
                backgroundImage: `url(https://readdy.ai/api/search-image?query=$%7BencodeURIComponent%28activationTarget.cardArt%29%7D&width=300&height=150&seq=${activationTarget.id}-activation&orientation=landscape)`
              }}
            >
              <div className="w-full h-full bg-gradient-to-t from-black/70 to-transparent rounded-xl flex items-end p-3">
                <div className="text-center w-full">
                  <div className="text-white font-bold text-sm">{activationTarget.name}</div>
                  <div className={`text-xs px-2 py-1 rounded-full border inline-block mt-1 ${getTypeColor(activationTarget.type)}`}>
                    {activationTarget.type} • {activationTarget.subtype}
                    {activationTarget.level && ` • Lv.${selectedTrapLevel}`}
                  </div>
                </div>
              </div>
            </div>

            {/* Effect Details */}
            <div className="space-y-3 mb-4">
              <div className="bg-purple-900/30 border border-purple-700 rounded-lg p-3">
                <div className="text-purple-400 font-semibold text-sm mb-1">⚡ Effect</div>
                <div className="text-gray-300 text-xs">
                  {activationTarget.type === 'Trap' && activationTarget.level 
                    ? `${activationTarget.effect} (Level ${selectedTrapLevel} selected)`
                    : activationTarget.detailedEffect
                  }
                </div>
              </div>

              <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-3">
                <div className="text-blue-400 font-semibold text-sm mb-1">📱 AR Visualization</div>
                <div className="text-gray-300 text-xs">{activationTarget.arEffect}</div>
              </div>

              <div className="bg-green-900/30 border border-green-700 rounded-lg p-3">
                <div className="text-green-400 font-semibold text-sm mb-1">🎵 Sound Effect</div>
                <div className="text-gray-300 text-xs">{activationTarget.soundEffect}</div>
              </div>
            </div>

            {/* Activation Requirements */}
            <div className="bg-gray-800/70 rounded-lg p-3 mb-4">
              <div className="text-white font-semibold text-sm mb-2">⚙️ Activation Requirements</div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">Cost:</span>
                  <span className="text-yellow-400">
                    {activationTarget.type === 'Trap' && activationTarget.level 
                      ? `${activationTarget.cost + (selectedTrapLevel - 1) * 2} MP`
                      : `${activationTarget.cost} MP`
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Timing:</span>
                  <span className="text-blue-400">{activationTarget.activation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Target:</span>
                  <span className="text-green-400">{activationTarget.targetType}</span>
                </div>
                {activationTarget.cooldown > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Cooldown:</span>
                    <span className="text-red-400">{activationTarget.cooldown} turns</span>
                  </div>
                )}
                {activationTarget.type === 'Trap' && activationTarget.level && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Duration:</span>
                    <span className="text-purple-400">{selectedTrapLevel} turn{selectedTrapLevel > 1 ? 's' : ''}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Activation Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={executeCardEffect}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-bold"
              >
                ⚡ Activate{activationTarget.level ? ` Lv.${selectedTrapLevel}` : ''}
              </button>
              <button
                onClick={() => setShowActivationModal(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="fixed top-0 w-full bg-black/40 backdrop-blur-md z-50 border-b border-purple-800/30">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <i className="ri-arrow-left-line text-white text-xl mr-2"></i>
            <span className="text-white font-semibold">Leveled Trap System</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-purple-400 text-sm">{ownedCards}/{totalCards}</div>
            <div className="text-green-400 text-sm">{activeEffects.length} Active</div>
          </div>
        </div>
      </header>

      {/* Battle Phase Indicator */}
      <section className="pt-20 px-4 py-4 relative z-10">
        <div className="bg-gray-800/70 border border-yellow-600 rounded-xl p-3 mb-4">
          <div className="flex items-center justify-between">
            <div className="text-yellow-400 font-semibold">Current Phase:</div>
            <div className="flex space-x-2">
              {['Main', 'Battle', 'End'].map((phase) => (
                <button
                  key={phase}
                  onClick={() => setBattlePhase(phase as any)}
                  className={`px-3 py-1 rounded-lg text-sm font-semibold transition-all ${
                    battlePhase === phase 
                      ? 'bg-yellow-600 text-white' 
                      : 'bg-gray-700 text-gray-400 hover:text-white'
                  }`}
                >
                  {phase}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* View Mode Toggle */}
      <section className="px-4 py-2 relative z-10">
        <div className="flex bg-gray-800/50 rounded-xl p-1 mb-6">
          <button
            onClick={() => setViewMode('spells')}
            className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all ${
              viewMode === 'spells' ? 'bg-green-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            🪄 Spells ({spellCount})
          </button>
          <button
            onClick={() => setViewMode('traps')}
            className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all ${
              viewMode === 'traps' ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            🕳️ Leveled Traps ({trapCount})
          </button>
          <button
            onClick={() => setViewMode('active')}
            className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all ${
              viewMode === 'active' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            ⚡ Active ({activeEffects.length})
          </button>
          <button
            onClick={() => setViewMode('deck')}
            className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all ${
              viewMode === 'deck' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            📚 Deck ({ownedCards})
          </button>
        </div>
      </section>

      {/* Active Effects Display */}
      {viewMode === 'active' && (
        <section className="px-4 py-6 relative z-10">
          <div className="bg-blue-900/30 border-2 border-blue-600 rounded-2xl p-6 mb-6">
            <div className="text-center mb-4">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="text-xl font-bold text-white mb-2">Active Effects</h3>
              <p className="text-blue-300 text-sm">Currently active spells and traps with levels</p>
            </div>

            {activeEffects.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                <div className="text-4xl mb-3">💫</div>
                <div className="text-lg mb-2">No Active Effects</div>
                <div className="text-sm">Activate leveled traps to see them here</div>
              </div>
            ) : (
              <div className="space-y-3">
                {activeEffects.map((effect, index) => (
                  <div key={index} className={`border-2 rounded-xl p-4 ${getTypeColor(effect.type)}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="text-white font-bold">{effect.cardName}</div>
                        {effect.level && (
                          <div className={`text-xs px-2 py-1 rounded-full border ${getLevelColor(effect.level)}`}>
                            Lv.{effect.level}
                          </div>
                        )}
                      </div>
                      <div className="text-yellow-400 text-sm">
                        {effect.timeRemaining === 999 ? '∞' : `${effect.timeRemaining} turns`}
                      </div>
                    </div>
                    <div className="text-gray-300 text-sm mb-2">{effect.description}</div>
                    <div className="bg-gray-800/50 rounded-lg p-2">
                      <div className="text-blue-400 text-xs font-semibold mb-1">📱 AR Effect:</div>
                      <div className="text-gray-300 text-xs">{effect.visual}</div>
                    </div>
                    <button
                      onClick={() => setActiveEffects(prev => prev.filter((_, i) => i !== index))}
                      className="mt-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
                    >
                      ❌ End Effect
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Leveled Traps Display */}
      {viewMode === 'traps' && (
        <section className="px-4 py-6 relative z-10">
          <div className="bg-red-900/30 border-2 border-red-600 rounded-2xl p-6 mb-6">
            <div className="text-center mb-4">
              <div className="text-3xl mb-2">🕳️</div>
              <h3 className="text-xl font-bold text-white mb-2">Leveled Trap System</h3>
              <p className="text-red-300 text-sm">Same trap, different power levels - choose your strategy</p>
            </div>
          </div>

          {/* Grouped Trap Cards by Name */}
          <div className="space-y-6">
            {Object.entries(groupedTraps).map(([trapName, trapLevels]) => (
              <div key={trapName} className="bg-gray-800/70 border border-gray-700 rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-white font-bold text-lg">{trapName}</div>
                  <div className="text-red-400 text-sm">
                    {trapLevels.length} Level{trapLevels.length > 1 ? 's' : ''} Available
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {trapLevels.map((card) => (
                    <div
                      key={card.id}
                      className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                        selectedCard === card.id
                          ? `${getRarityColor(card.rarity).split(' ')[1]} bg-opacity-30`
                          : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                      } ${!card.obtained ? 'opacity-60' : ''}`}
                      onClick={() => setSelectedCard(selectedCard === card.id ? null : card.id)}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="relative">
                          <div
                            className={`w-20 h-28 rounded-xl bg-cover bg-center flex-shrink-0 border-2 ${getRarityColor(card.rarity).split(' ')[1]}`}
                            style={{
                              backgroundImage: `url(https://readdy.ai/api/search-image?query=$%7BencodeURIComponent%28card.cardArt%29%7D&width=80&height=110&seq=${card.id}-thumb&orientation=portrait)`
                            }}
                          >
                            <div className={`w-full h-full rounded-xl ${getRarityColor(card.rarity).split(' ')[2]}`}>
                              {!card.obtained && (
                                <div className="w-full h-full bg-black/60 rounded-xl flex items-center justify-center">
                                  <i className="ri-question-mark text-gray-400 text-xl"></i>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {/* Level Indicator */}
                          {card.level && (
                            <div className={`absolute -top-2 -left-2 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 ${getLevelColor(card.level)}`}>
                              {card.level}
                            </div>
                          )}
                          
                          {/* Cost */}
                          <div className="absolute -top-2 -right-2 bg-yellow-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                            {card.cost}
                          </div>

                          {/* Usage Stats */}
                          {card.obtained && card.timesUsed && (
                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-green-400 text-xs px-2 py-1 rounded-full">
                              {card.timesUsed}x
                            </div>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <div className={`font-bold ${getRarityColor(card.rarity).split(' ')[0]}`}>
                              {card.obtained ? `${card.name} Level ${card.level}` : '???'}
                            </div>
                            {card.obtained && card.effectiveness && (
                              <div className="text-xs px-2 py-1 rounded-full bg-green-600/30 text-green-300">
                                {card.effectiveness}% Effective
                              </div>
                            )}
                          </div>
                          <div className="text-gray-400 text-sm mb-2">
                            {card.obtained ? `${card.type} • ${card.subtype}` : 'Unknown Card'}
                          </div>
                          <div className="flex items-center space-x-2 mb-2">
                            <div className={`text-xs px-2 py-1 rounded-full border ${getRarityColor(card.rarity)}`}>
                              {card.rarity}
                            </div>
                            <div className={`text-xs px-2 py-1 rounded-full border ${getTypeColor(card.type)}`}>
                              {card.type}
                            </div>
                            {card.level && (
                              <div className={`text-xs px-2 py-1 rounded-full border ${getLevelColor(card.level)}`}>
                                Level {card.level}
                              </div>
                            )}
                          </div>
                          {card.obtained && (
                            <div className="text-gray-300 text-sm">{card.effect}</div>
                          )}
                        </div>
                      </div>

                      {selectedCard === card.id && card.obtained && (
                        <div className="mt-4 pt-4 border-t border-gray-700 space-y-4">
                          {/* Level Progression Display */}
                          {card.levelProgression && (
                            <div>
                              <div className="text-white font-semibold mb-2">📈 Level Progression</div>
                              <div className="space-y-2">
                                {Object.entries(card.levelProgression).map(([levelKey, effect], index) => (
                                  <div key={levelKey} className={`p-3 rounded-lg border ${
                                    index + 1 === card.level ? 'bg-red-800/30 border-red-600' : 'bg-gray-800/30 border-gray-700'
                                  }`}>
                                    <div className="flex items-center justify-between mb-1">
                                      <div className={`font-semibold text-sm ${
                                        index + 1 === card.level ? 'text-red-400' : 'text-gray-400'
                                      }`}>
                                        Level {index + 1}
                                        {index + 1 === card.level && <span className="ml-2 text-xs">(Current)</span>}
                                      </div>
                                      <div className="text-yellow-400 text-xs">
                                        {card.cost + index * 2} MP
                                      </div>
                                    </div>
                                    <div className="text-gray-300 text-xs">{effect}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* AR Visualization */}
                          <div>
                            <div className="text-white font-semibold mb-2">📱 AR Experience</div>
                            <div className="text-gray-300 text-sm bg-blue-900/20 px-3 py-2 rounded-lg border border-blue-700/30">
                              {card.arEffect}
                            </div>
                          </div>

                          {/* Activation Requirements */}
                          <div>
                            <div className="text-white font-semibold mb-2">⚙️ Requirements</div>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="bg-gray-800/50 rounded-lg p-2">
                                <div className="text-yellow-400 text-xs font-semibold">Base Cost</div>
                                <div className="text-white text-sm">{card.cost} MP</div>
                              </div>
                              <div className="bg-gray-800/50 rounded-lg p-2">
                                <div className="text-blue-400 text-xs font-semibold">Target</div>
                                <div className="text-white text-sm">{card.targetType}</div>
                              </div>
                              <div className="bg-gray-800/50 rounded-lg p-2">
                                <div className="text-green-400 text-xs font-semibold">Timing</div>
                                <div className="text-white text-xs">{card.activation}</div>
                              </div>
                              {card.cooldown > 0 && (
                                <div className="bg-gray-800/50 rounded-lg p-2">
                                  <div className="text-red-400 text-xs font-semibold">Cooldown</div>
                                  <div className="text-white text-sm">{card.cooldown} turns</div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex space-x-2 pt-2">
                            <button
                              onClick={() => handleCardActivation(card)}
                              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-semibold"
                            >
                              ⚡ Activate Level {card.level}
                            </button>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                              📚 Add to Deck
                            </button>
                          </div>
                        </div>
                      )}

                      {selectedCard === card.id && !card.obtained && (
                        <div className="mt-4 pt-4 border-t border-gray-700 text-center">
                          <div className="text-gray-400 text-sm mb-3">
                            This Level {card.level} trap card hasn't been obtained yet.
                          </div>
                          <div className="text-gray-500 text-xs mb-3">
                            Upgrade from Level {card.level! - 1} or find in booster packs
                          </div>
                          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                            🔍 Search for Upgrade
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Leveled Trap System Explanation */}
      <section className="px-4 py-6 relative z-10 mb-20">
        <div className="bg-gradient-to-r from-purple-900/50 to-red-900/50 border-2 border-red-500 rounded-2xl p-6">
          <div className="text-center mb-4">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="text-xl font-bold text-white mb-2">Unique Leveled Trap System</h3>
            <p className="text-red-300 text-sm">Strategic depth through progressive power scaling</p>
          </div>
          
          <div className="space-y-3">
            <div className="bg-red-800/30 rounded-lg p-3">
              <div className="text-red-400 font-semibold text-sm mb-1">🕳️ Same Trap, Multiple Levels</div>
              <div className="text-gray-300 text-xs">
                Each trap card comes in 3 levels - same concept, increasing power and duration. Level 1 = 1 turn effect, Level 2 = 2 turns, Level 3 = 3 turns.
              </div>
            </div>
            
            <div className="bg-yellow-800/30 rounded-lg p-3">
              <div className="text-yellow-400 font-semibold text-sm mb-1">💰 Progressive Cost System</div>
              <div className="text-gray-300 text-xs">
                Higher levels cost more MP - Level 1 = base cost, Level 2 = +2 MP, Level 3 = +4 MP. Choose strategy vs resources.
              </div>
            </div>
            
            <div className="bg-purple-800/30 rounded-lg p-3">
              <div className="text-purple-400 font-semibold text-sm mb-1">⚡ Strategic Choices</div>
              <div className="text-gray-300 text-xs">
                Use Level 1 for quick disruption, Level 2 for control, Level 3 for game-changing lockdown. Different situations need different levels.
              </div>
            </div>
            
            <div className="bg-blue-800/30 rounded-lg p-3">
              <div className="text-blue-400 font-semibold text-sm mb-1">🎨 Unique Visual Progression</div>
              <div className="text-gray-300 text-xs">
                Each level has distinct AR effects - The Cage: energy bars → steel prison → crystal fortress. Shadow Bind: tendrils → chains → void imprisonment.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
