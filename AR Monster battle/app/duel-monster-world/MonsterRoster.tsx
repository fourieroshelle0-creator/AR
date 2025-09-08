
'use client';

import { useState } from 'react';

interface Monster {
  id: string;
  name: string;
  element: string;
  type: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  power: number;
  defense: number;
  level: number;
  ability: string[];
  description: string;
  evolution: string[];
  summonCost: number;
  image: string;
  captured: boolean;
  weakTo: string[];
  strongTo: string[];
  captureMethod?: string;
  relicType?: 'Summon Relic' | 'Blank Card';
  bondLevel?: number;
  evolutionRequirement?: string;
  tradeLocked?: boolean;
  tradeBonus?: number;
  // Enhanced Sound System
  soundProfile: {
    idleSounds: string[];
    battleCries: string[];
    attackSounds: string[];
    hurtSounds: string[];
    defeatSound: string;
    summonSound: string;
    evolutionSound?: string;
    environmentalAudio: string[];
    voiceType: 'Roar' | 'Screech' | 'Howl' | 'Whisper' | 'Rumble' | 'Chirp' | 'Hiss';
    volume: 'Quiet' | 'Normal' | 'Loud' | 'Thunderous';
    audioFrequency: string; // How often sounds play
  };
}

export default function MonsterRoster() {
  const [selectedMonster, setSelectedMonster] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'all' | 'captured' | 'relics'>('all');
  const [showEvolutionModal, setShowEvolutionModal] = useState(false);
  const [showTradeModal, setShowTradeModal] = useState(false);
  const [evolutionTarget, setEvolutionTarget] = useState<Monster | null>(null);
  const [showSoundPreview, setShowSoundPreview] = useState(false);
  const [selectedSoundMonster, setSelectedSoundMonster] = useState<Monster | null>(null);

  const monsterCollection: Monster[] = [
    {
      id: 'flare-drake',
      name: 'Flare Drake',
      element: 'Fire',
      type: 'Dragon',
      rarity: 'Rare',
      power: 2400,
      defense: 1800,
      level: 18,
      ability: ['Fire Breath', 'Lava Burst'],
      description:
        'A winged lizard with molten lava veins running through its crystalline scales. Its breath can melt steel and create volcanic eruptions.',
      evolution: ['Flare Drake', 'Pyro Wyvern', 'Inferno Dragon'],
      summonCost: 6,
      image:
        'Majestic fire dragon with molten lava veins and crystalline scales, winged lizard breathing flames, volcanic eruption background, epic fantasy beast with glowing red eyes, photorealistic 3D rendering with dramatic lighting',
      captured: true,
      weakTo: ['Water', 'Ice'],
      strongTo: ['Nature', 'Earth'],
      captureMethod: 'Weakened then absorbed with Blank Card',
      relicType: 'Summon Relic',
      bondLevel: 85,
      evolutionRequirement: 'Level 25 + Volcanic Relic',
      tradeLocked: false,
      tradeBonus: 150,
      soundProfile: {
        idleSounds: [
          'Deep rumbling purr with crackling ember effects',
          'Soft flame whoosh with occasional spark pops',
          'Gentle dragon breathing with warm air sounds',
          'Low volcanic growl every 8-10 seconds'
        ],
        battleCries: [
          'ROAAAARRR! - Mighty dragon roar that shakes the phone',
          'Feel the volcanic fury! - Deep dragon voice with fire crackling',
          'Burn in eternal flames! - Menacing roar with lava bubbling'
        ],
        attackSounds: [
          'Fire Breath: WHOOOOSH + crackling flames + sizzling heat',
          'Lava Burst: BOOM! + molten rock impacts + steam hissing',
          'Claw Swipe: SLASH + fire trail whoosh + ember sparks'
        ],
        hurtSounds: [
          'Wounded dragon roar with pain - GRAAAHHH!',
          'Defensive hiss with flame sputter',
          'Angry snarl with diminished fire effects'
        ],
        defeatSound: 'Long mournful dragon wail fading to ember whispers',
        summonSound: 'Explosive volcanic eruption + triumphant dragon roar',
        evolutionSound: 'Epic transformation roar with intensifying flames',
        environmentalAudio: [
          'Footsteps create sizzling sounds on ground',
          'Breathing creates heat shimmer audio effects',
          'Wings flapping sound like controlled fire'
        ],
        voiceType: 'Roar',
        volume: 'Thunderous',
        audioFrequency: 'Every 6-8 seconds when idle, continuous in battle'
      }
    },
    {
      id: 'stone-golem',
      name: 'Stone Golem',
      element: 'Earth',
      type: 'Construct',
      rarity: 'Epic',
      power: 2100,
      defense: 3200,
      level: 22,
      ability: ['Ground Slam', 'Stone Wall'],
      description:
        'A towering rock giant with glowing cracks revealing inner magical energy. Ancient runes of protection cover its massive form.',
      evolution: ['Stone Golem', 'Titan Golem', 'Colossus of Ruin'],
      summonCost: 8,
      image:
        'Massive stone golem with glowing magical cracks and ancient runes, towering rock giant with crystalline energy core, epic earth elemental guardian, cinematic fantasy aesthetic with mystical lighting',
      captured: true,
      weakTo: ['Water', 'Nature'],
      strongTo: ['Fire', 'Lightning'],
      captureMethod: 'Direct absorption with Blank Card',
      relicType: 'Summon Relic',
      bondLevel: 92,
      evolutionRequirement: 'Level 30 + Ancient Stone Relic',
      tradeLocked: false,
      tradeBonus: 200,
      soundProfile: {
        idleSounds: [
          'Deep stone grinding and creaking joints',
          'Low rumbling like distant earthquake',
          'Crystal veins humming with magical resonance',
          'Heavy breathing sounds like wind through caves'
        ],
        battleCries: [
          'THUUUMMMMM! - Deep earthshaking roar',
          'Ancient power awakens! - Echoing stone voice',
          'Tremble before the mountain! - Booming declaration'
        ],
        attackSounds: [
          'Ground Slam: CRASH! + earthquake rumble + stone cracking',
          'Stone Wall: BOOM! + rocks grinding + dust settling',
          'Boulder Throw: WHOMP! + whistling air + thunderous impact'
        ],
        hurtSounds: [
          'Stone cracking sounds with pained groan',
          'Crystal ringing with distress chimes',
          'Defensive rumble with falling pebbles'
        ],
        defeatSound: 'Massive stone collapse with echoing crash and crystal shards',
        summonSound: 'Earthquake rumble + stones rising + triumphant stone roar',
        evolutionSound: 'Mountain-shaking transformation with crystal harmonics',
        environmentalAudio: [
          'Each step creates mini-earthquake sounds',
          'Runes pulse with mystical chiming',
          'Stone grinding sounds when moving'
        ],
        voiceType: 'Rumble',
        volume: 'Thunderous',
        audioFrequency: 'Every 10-12 seconds when idle, continuous in battle'
      }
    },
    {
      id: 'umbra-fiend',
      name: 'Umbra Fiend',
      element: 'Shadow',
      type: 'Fiend',
      rarity: 'Epic',
      power: 2600,
      defense: 1600,
      level: 20,
      ability: ['Fear Strike', 'Shadow Bind'],
      description:
        'A demonic beast cloaked in shifting darkness. Its presence alone can drain the will to fight from even the bravest warriors.',
      evolution: ['Umbra Fiend', 'Abyss Stalker', 'Void Warlord'],
      summonCost: 7,
      image:
        'Demonic shadow creature with shifting darkness aura, menacing fiend with glowing purple eyes, shadow magic effects swirling around beast, gothic horror aesthetic with supernatural darkness',
      captured: true,
      weakTo: ['Light', 'Holy'],
      strongTo: ['Psychic', 'Ghost'],
      captureMethod: 'Weakened in Abandoned Cathedral then absorbed',
      relicType: 'Summon Relic',
      bondLevel: 78,
      evolutionRequirement: 'Level 28 + Shadow Essence Relic',
      tradeLocked: false,
      tradeBonus: 180,
      soundProfile: {
        idleSounds: [
          'Sinister whispers that seem to come from everywhere',
          'Dark energy crackling like evil electricity',
          'Soft demonic chuckling in the shadows',
          'Shadow mist swirling with supernatural hissing'
        ],
        battleCries: [
          'HEHEHEHEHEHE! - Maniacal demonic laughter',
          'Your soul is mine! - Distorted demonic voice',
          'Embrace the darkness! - Echoing shadow whisper'
        ],
        attackSounds: [
          'Fear Strike: Psychological scream + mental distortion effects',
          'Shadow Bind: Chains rattling + darkness consuming sound',
          'Dark Claw: Slashing with supernatural shriek'
        ],
        hurtSounds: [
          'Angry demonic hiss with shadow crackling',
          'Frustrated evil laugh turning to snarl',
          'Shadow dispersing with whispered curses'
        ],
        defeatSound: 'Demonic wail fading to sinister whispered threats',
        summonSound: 'Portal opening + evil laughter + shadow energy explosion',
        evolutionSound: 'Demonic transformation scream with shadow portal effects',
        environmentalAudio: [
          'Footsteps create whispered voices',
          'Shadows seem to laugh softly',
          'Dark energy pulses with heartbeat rhythm'
        ],
        voiceType: 'Whisper',
        volume: 'Normal',
        audioFrequency: 'Every 5-7 seconds when idle, constant whispers in battle'
      }
    },
    {
      id: 'forest-guardian',
      name: 'Forest Guardian',
      element: 'Nature',
      type: 'Beast',
      rarity: 'Common',
      power: 1600,
      defense: 2200,
      level: 12,
      ability: ['Nature Heal', 'Thorn Shield'],
      description:
        'A massive forest bear covered in moss and bark. Guardian of ancient woodlands with the power to command plant life.',
      evolution: ['Forest Guardian', 'Grove Warden', 'Nature Sovereign'],
      summonCost: 4,
      image:
        'Massive forest guardian bear with moss and tree bark covering, nature elemental beast with gentle green eyes, woodland creature with leaf patterns, natural outdoor setting with mystical forest atmosphere',
      captured: true,
      weakTo: ['Fire', 'Ice'],
      strongTo: ['Water', 'Earth'],
      captureMethod: 'Easy absorption - Forest Park',
      relicType: 'Summon Relic',
      bondLevel: 65,
      evolutionRequirement: 'Level 20 + Nature Crystal',
      tradeLocked: false,
      tradeBonus: 100,
      soundProfile: {
        idleSounds: [
          'Gentle bear huffing with wind through leaves',
          'Peaceful forest ambiance with bird songs',
          'Soft growling mixed with rustling vegetation',
          'Nature magic humming like summer breeze'
        ],
        battleCries: [
          'GRRROOOOWWWWL! - Protective bear roar',
          'Nature protect us! - Wise, deep forest voice',
          'Feel the forest\'s wrath! - Booming nature call'
        ],
        attackSounds: [
          'Nature Heal: Gentle chimes + flowing water + bird song',
          'Thorn Shield: Branches creaking + leaves rustling + sharp thorns',
          'Claw Swipe: Bear growl + wind through trees'
        ],
        hurtSounds: [
          'Wounded bear whimper with falling leaves',
          'Sad nature sounds like dying forest',
          'Defensive growl with protective plant rustling'
        ],
        defeatSound: 'Mournful bear call fading to peaceful forest silence',
        summonSound: 'Forest awakening + triumphant bear roar + nature magic',
        evolutionSound: 'Forest growth sounds with majestic nature transformation',
        environmentalAudio: [
          'Footsteps sound like walking on forest floor',
          'Breathing creates gentle wind effects',
          'Movement causes plants to rustle and grow'
        ],
        voiceType: 'Rumble',
        volume: 'Normal',
        audioFrequency: 'Every 8-10 seconds when idle, nature sounds continuous'
      }
    },
    {
      id: 'shadow-panther',
      name: 'Shadow Panther',
      element: 'Dark',
      type: 'Beast',
      rarity: 'Rare',
      power: 2200,
      defense: 1400,
      level: 16,
      ability: ['Shadow Strike', 'Stealth Prowl'],
      description:
        'A sleek feline predator that moves through shadows. Its dark energy can phase through physical barriers and strike from anywhere.',
      evolution: ['Shadow Panther', 'Void Stalker', 'Darkness Lord'],
      summonCost: 5,
      image:
        'Sleek shadow panther with dark energy aura, mysterious feline creature with glowing purple eyes, stealth predator with shadow magic effects, gothic atmosphere with supernatural darkness',
      captured: false,
      weakTo: ['Light', 'Holy'],
      strongTo: ['Psychic', 'Ghost'],
      captureMethod: 'Requires weakening before absorption',
      relicType: 'Blank Card',
      soundProfile: {
        idleSounds: [
          'Low predatory purring with shadow crackling',
          'Soft padding footsteps that suddenly stop',
          'Quiet shadow energy humming',
          'Occasional low hunting growl'
        ],
        battleCries: [
          'HIIISSSSSS! - Menacing panther hiss',
          'From the shadows! - Whispered predator voice',
          'You cannot escape! - Echoing stealth threat'
        ],
        attackSounds: [
          'Shadow Strike: Whoosh + panther snarl + darkness impact',
          'Stealth Prowl: Complete silence then sudden pounce',
          'Claw Attack: Fast slashing + shadow energy crackle'
        ],
        hurtSounds: [
          'Angry panther yowl with shadow dispersal',
          'Defensive hissing with dark energy sparks',
          'Pained cat cry echoing from shadows'
        ],
        defeatSound: 'Fading panther growl dissolving into shadow whispers',
        summonSound: 'Shadow portal + fierce panther roar + stealth energy',
        environmentalAudio: [
          'Nearly silent footsteps with shadow traces',
          'Breathing creates dark mist sounds',
          'Movement phases between reality and shadow'
        ],
        voiceType: 'Hiss',
        volume: 'Quiet',
        audioFrequency: 'Every 12-15 seconds when idle, sudden sounds in battle'
      }
    },
    {
      id: 'celestial-phoenix',
      name: 'Celestial Phoenix',
      element: 'Light',
      type: 'Legendary Beast',
      rarity: 'Legendary',
      power: 4200,
      defense: 3800,
      level: 35,
      ability: ['Solar Flare', 'Phoenix Rebirth', 'Divine Judgment'],
      description:
        'An immortal phoenix that burns with celestial fire. This legendary creature can resurrect itself and commands the power of the sun itself.',
      evolution: ['Celestial Phoenix'],
      summonCost: 15,
      image:
        'Magnificent celestial phoenix with golden solar flames, legendary divine bird with radiant wings, heavenly fire creature with cosmic energy aura, epic celestial environment with golden light effects',
      captured: true,
      weakTo: ['Void', 'Chaos'],
      strongTo: ['Shadow', 'Dark'],
      captureMethod: 'Legendary Raid Victory + Master Blank Card',
      relicType: 'Summon Relic',
      bondLevel: 100,
      evolutionRequirement: 'Cannot Evolve - Legendary Form',
      tradeLocked: true,
      tradeBonus: 0,
      soundProfile: {
        idleSounds: [
          'Majestic phoenix song like heavenly choir',
          'Divine fire crackling with celestial harmonics',
          'Gentle wing flapping with golden wind chimes',
          'Sacred energy humming with otherworldly beauty'
        ],
        battleCries: [
          'KIRAAAAAAAA! - Divine phoenix cry that inspires awe',
          'By the light eternal! - Celestial voice of pure energy',
          'Witness divine power! - Majestic declaration with solar flare'
        ],
        attackSounds: [
          'Solar Flare: Massive energy explosion + blinding light + divine chorus',
          'Phoenix Rebirth: Resurrection music + flames roaring + triumphant cry',
          'Divine Judgment: Heavenly thunder + solar beam + judgment bells'
        ],
        hurtSounds: [
          'Pained phoenix cry that still sounds beautiful',
          'Defensive solar energy with protective warmth',
          'Wounded song that turns to determination'
        ],
        defeatSound: 'Legendary phoenix requiem fading to eternal silence',
        summonSound: 'Heavenly portal + divine phoenix cry + solar explosion',
        evolutionSound: 'Already at perfect legendary form',
        environmentalAudio: [
          'Wing beats create gentle solar wind effects',
          'Feathers falling sound like golden rain',
          'Divine presence creates celestial ambiance'
        ],
        voiceType: 'Chirp',
        volume: 'Thunderous',
        audioFrequency: 'Continuous divine presence, never silent'
      }
    },
    {
      id: 'crystal-dragon',
      name: 'Crystal Dragon',
      element: 'Ice',
      type: 'Dragon',
      rarity: 'Epic',
      power: 2800,
      defense: 2400,
      level: 25,
      ability: ['Frost Breath', 'Crystal Prison'],
      description:
        'A majestic dragon whose scales are formed from pure ice crystals. Its breath can instantly freeze entire battlefields.',
      evolution: ['Crystal Dragon', 'Glacier Wyrm', 'Absolute Zero'],
      summonCost: 9,
      image:
        'Majestic crystal dragon with ice formations on wings, legendary ice elemental with diamond-like scales, powerful arctic dragon with frost breath, epic mountain backdrop with aurora effects',
      captured: false,
      weakTo: ['Fire', 'Lightning'],
      strongTo: ['Water', 'Nature'],
      captureMethod: 'Hard absorption - Mountain Peak requires multiple Blank Cards',
      relicType: 'Blank Card',
      soundProfile: {
        idleSounds: [
          'Ice crystals chiming like wind chimes',
          'Cold wind whistling through crystal scales',
          'Gentle freezing sounds with magical resonance',
          'Dragon breathing creating frost effects'
        ],
        battleCries: [
          'KRRRRAAAAA! - Piercing ice dragon roar',
          'Feel the eternal winter! - Crystalline dragon voice',
          'Freeze in absolute zero! - Cold, commanding declaration'
        ],
        attackSounds: [
          'Frost Breath: Blizzard wind + ice forming + crystalline impact',
          'Crystal Prison: Ice cracking + prison forming + trapped echoes',
          'Ice Claw: Slashing + ice shards + freezing effects'
        ],
        hurtSounds: [
          'Pained ice dragon cry with crystal breaking',
          'Defensive ice barrier with frustrated roar',
          'Wounded crystalline screech with falling ice'
        ],
        defeatSound: 'Majestic ice dragon death song with crystal collapse',
        summonSound: 'Blizzard storm + crystal formation + triumphant ice roar',
        environmentalAudio: [
          'Footsteps create ice cracking sounds',
          'Wing beats generate freezing wind',
          'Scales chime together like ice bells'
        ],
        voiceType: 'Roar',
        volume: 'Loud',
        audioFrequency: 'Every 7-9 seconds when idle, ice sounds continuous'
      }
    },
    {
      id: 'spark-wolf',
      name: 'Spark Wolf',
      element: 'Lightning',
      type: 'Beast',
      rarity: 'Common',
      power: 1800,
      defense: 1200,
      level: 14,
      ability: ['Thunder Bolt', 'Speed Burst'],
      description:
        'An electric wolf with lightning patterns across its fur. Its speed is unmatched and its bite carries powerful electrical charges.',
      evolution: ['Spark Wolf', 'Storm Hound', 'Thunder Alpha'],
      summonCost: 4,
      image:
        'Electric wolf with glowing lightning patterns, energetic starter beast with sparking fur, dynamic lightning elemental with fierce but friendly expression, dramatic lighting effects with electrical storms',
      captured: true,
      weakTo: ['Earth', 'Ground'],
      strongTo: ['Water', 'Flying'],
      captureMethod: 'Starter monster - First Blank Card bond',
      relicType: 'Summon Relic',
      bondLevel: 70,
      evolutionRequirement: 'Level 18 + Storm Crystal',
      tradeLocked: false,
      tradeBonus: 120,
      soundProfile: {
        idleSounds: [
          'Playful wolf panting with electrical crackling',
          'Lightning energy humming through fur',
          'Quick excited yips with spark effects',
          'Energetic breathing with static electricity'
        ],
        battleCries: [
          'AWOOOOOO! - Energetic wolf howl with thunder',
          'Lightning strikes! - Excited wolf voice with electricity',
          'Feel the storm! - Playful yet fierce electrical bark'
        ],
        attackSounds: [
          'Thunder Bolt: ZAP! + thunder crack + electrical discharge',
          'Speed Burst: Zoom! + wind rush + lightning trail',
          'Electric Bite: Snap! + electrical surge + sparking teeth'
        ],
        hurtSounds: [
          'Pained wolf whimper with sparks fading',
          'Defensive growl with electrical interference',
          'Hurt yip with static crackling'
        ],
        defeatSound: 'Sad wolf whine fading to gentle electrical hum',
        summonSound: 'Lightning strike + enthusiastic wolf howl + energy surge',
        evolutionSound: 'Thunder transformation with powerful electrical storm',
        environmentalAudio: [
          'Paws create tiny lightning strikes on ground',
          'Tail wagging generates electric sparks',
          'Fur constantly crackling with friendly electricity'
        ],
        voiceType: 'Howl',
        volume: 'Normal',
        audioFrequency: 'Every 4-6 seconds when idle, excited sounds in battle'
      }
    }
  ];

  const evolutionRelics = [
    { name: 'Volcanic Relic', element: 'Fire', rarity: 'Epic', obtained: true },
    { name: 'Ancient Stone Relic', element: 'Earth', rarity: 'Legendary', obtained: false },
    { name: 'Shadow Essence Relic', element: 'Shadow', rarity: 'Epic', obtained: true },
    { name: 'Nature Crystal', element: 'Nature', rarity: 'Rare', obtained: true },
    { name: 'Storm Crystal', element: 'Lightning', rarity: 'Rare', obtained: true },
    { name: 'Frozen Heart Relic', element: 'Ice', rarity: 'Epic', obtained: false }
  ];

  const tradeOffers = [
    {
      player: 'DragonMaster47',
      offering: 'Pyro Wyvern (Lv.22)',
      requesting: 'Storm Hound',
      bondBonus: '+25% EXP for both monsters',
      timeLeft: '2h 15m'
    },
    {
      player: 'ShadowHunter92',
      offering: 'Void Stalker (Lv.19)',
      requesting: 'Grove Warden',
      bondBonus: '+30% EXP for both monsters',
      timeLeft: '5h 42m'
    },
    {
      player: 'IceQueen88',
      offering: 'Glacier Wyrm (Lv.28)',
      requesting: 'Inferno Dragon',
      bondBonus: '+35% EXP for both monsters',
      timeLeft: '12h 30m'
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common':
        return 'text-gray-400 border-gray-600';
      case 'Rare':
        return 'text-blue-400 border-blue-600';
      case 'Epic':
        return 'text-purple-400 border-purple-600';
      case 'Legendary':
        return 'text-orange-400 border-orange-600';
      default:
        return 'text-white border-gray-600';
    }
  };

  const getRarityBg = (rarity: string) => {
    switch (rarity) {
      case 'Common':
        return 'bg-gray-600/20';
      case 'Rare':
        return 'bg-blue-600/20';
      case 'Epic':
        return 'bg-purple-600/20';
      case 'Legendary':
        return 'bg-orange-600/20';
      default:
        return 'bg-gray-600/20';
    }
  };

  const getElementColor = (element: string) => {
    switch (element) {
      case 'Fire':
        return 'text-red-400 bg-red-900/30 border-red-600';
      case 'Water':
        return 'text-blue-400 bg-blue-900/30 border-blue-600';
      case 'Earth':
        return 'text-green-400 bg-green-900/30 border-green-600';
      case 'Lightning':
        return 'text-yellow-400 bg-yellow-900/30 border-yellow-600';
      case 'Ice':
        return 'text-cyan-400 bg-cyan-900/30 border-cyan-600';
      case 'Dark':
        return 'text-purple-400 bg-purple-900/30 border-purple-600';
      case 'Light':
        return 'text-yellow-200 bg-yellow-900/30 border-yellow-500';
      case 'Nature':
        return 'text-emerald-400 bg-emerald-900/30 border-emerald-600';
      case 'Shadow':
        return 'text-purple-500 bg-purple-900/40 border-purple-700';
      default:
        return 'text-gray-400 bg-gray-900/30 border-gray-600';
    }
  };

  const getRelicTypeColor = (relicType: string) => {
    switch (relicType) {
      case 'Summon Relic':
        return 'bg-blue-600/30 text-blue-300 border-blue-600/50';
      case 'Blank Card':
        return 'bg-gray-600/30 text-gray-300 border-gray-600/50';
      default:
        return 'bg-gray-600/30 text-gray-300 border-gray-600/50';
    }
  };

  const getBondColor = (bondLevel: number) => {
    if (bondLevel >= 90) return 'text-orange-400 bg-orange-900/30';
    if (bondLevel >= 70) return 'text-purple-400 bg-purple-900/30';
    if (bondLevel >= 50) return 'text-blue-400 bg-blue-900/30';
    return 'text-gray-400 bg-gray-900/30';
  };

  const getVolumeColor = (volume: string) => {
    switch (volume) {
      case 'Quiet': return 'text-gray-400 bg-gray-900/30';
      case 'Normal': return 'text-blue-400 bg-blue-900/30';
      case 'Loud': return 'text-orange-400 bg-orange-900/30';
      case 'Thunderous': return 'text-red-400 bg-red-900/30';
      default: return 'text-gray-400 bg-gray-900/30';
    }
  };

  const canEvolve = (monster: Monster) => {
    if (!monster.captured || monster.evolution.length <= 1) return false;
    if (monster.rarity === 'Legendary') return false;
    
    const requirement = monster.evolutionRequirement || '';
    const levelMatch = requirement.match(/Level (\d+)/);
    const requiredLevel = levelMatch ? parseInt(levelMatch[1]) : 999;
    
    return monster.level >= requiredLevel;
  };

  const handleEvolution = (monster: Monster) => {
    setEvolutionTarget(monster);
    setShowEvolutionModal(true);
  };

  const handleSoundPreview = (monster: Monster) => {
    setSelectedSoundMonster(monster);
    setShowSoundPreview(true);
  };

  const filteredMonsters = (() => {
    switch (viewMode) {
      case 'captured':
        return monsterCollection.filter((monster) => monster.captured);
      case 'relics':
        return monsterCollection.filter((monster) => monster.captured && monster.relicType === 'Summon Relic');
      default:
        return monsterCollection;
    }
  })();

  const capturedCount = monsterCollection.filter((monster) => monster.captured).length;
  const relicCount = monsterCollection.filter((monster) => monster.captured && monster.relicType === 'Summon Relic').length;
  const totalCount = monsterCollection.length;

  return (
    <div className="min-h-screen bg-gray-950 pt-20 pb-24">
      {/* Sound Preview Modal */}
      {showSoundPreview && selectedSoundMonster && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-gray-900 border-2 border-green-600 rounded-2xl p-6 max-w-sm w-full max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-4">
              <div className="text-3xl mb-2">🔊</div>
              <h3 className="text-xl font-bold text-white mb-2">Monster Sound Profile</h3>
              <p className="text-green-300 text-sm">{selectedSoundMonster.name} Audio Experience</p>
            </div>

            {/* Voice Type & Volume */}
            <div className="flex space-x-3 mb-4">
              <div className={`flex-1 text-center py-2 px-3 rounded-lg border text-xs ${getVolumeColor(selectedSoundMonster.soundProfile.volume)}`}>
                {selectedSoundMonster.soundProfile.voiceType} Voice
              </div>
              <div className={`flex-1 text-center py-2 px-3 rounded-lg border text-xs ${getVolumeColor(selectedSoundMonster.soundProfile.volume)}`}>
                {selectedSoundMonster.soundProfile.volume} Volume
              </div>
            </div>

            {/* Audio Frequency */}
            <div className="bg-gray-800/50 rounded-lg p-3 mb-4">
              <div className="text-white font-semibold text-sm mb-1">🎵 Audio Frequency</div>
              <div className="text-gray-300 text-xs">{selectedSoundMonster.soundProfile.audioFrequency}</div>
            </div>

            {/* Sound Categories */}
            <div className="space-y-3 mb-4">
              {/* Idle Sounds */}
              <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-3">
                <div className="text-blue-400 font-semibold text-sm mb-2">😴 Idle Ambiance</div>
                {selectedSoundMonster.soundProfile.idleSounds.map((sound, index) => (
                  <div key={index} className="text-gray-300 text-xs mb-1 flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>{sound}</span>
                  </div>
                ))}
              </div>

              {/* Battle Cries */}
              <div className="bg-red-900/30 border border-red-700 rounded-lg p-3">
                <div className="text-red-400 font-semibold text-sm mb-2">⚔️ Battle Cries</div>
                {selectedSoundMonster.soundProfile.battleCries.map((cry, index) => (
                  <div key={index} className="text-gray-300 text-xs mb-1 flex items-start">
                    <span className="text-red-400 mr-2">•</span>
                    <span>{cry}</span>
                  </div>
                ))}
              </div>

              {/* Attack Sounds */}
              <div className="bg-orange-900/30 border border-orange-700 rounded-lg p-3">
                <div className="text-orange-400 font-semibold text-sm mb-2">💥 Attack Audio</div>
                {selectedSoundMonster.soundProfile.attackSounds.map((attack, index) => (
                  <div key={index} className="text-gray-300 text-xs mb-1 flex items-start">
                    <span className="text-orange-400 mr-2">•</span>
                    <span>{attack}</span>
                  </div>
                ))}
              </div>

              {/* Environmental Audio */}
              <div className="bg-green-900/30 border border-green-700 rounded-lg p-3">
                <div className="text-green-400 font-semibold text-sm mb-2">🌍 Environmental Sync</div>
                {selectedSoundMonster.soundProfile.environmentalAudio.map((env, index) => (
                  <div key={index} className="text-gray-300 text-xs mb-1 flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    <span>{env}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Special Sounds */}
            <div className="bg-purple-900/30 border border-purple-700 rounded-lg p-3 mb-4">
              <div className="text-purple-400 font-semibold text-sm mb-2">✨ Special Audio Events</div>
              <div className="space-y-1 text-xs">
                <div className="text-gray-300"><span className="text-yellow-400">🎺 Summon:</span> {selectedSoundMonster.soundProfile.summonSound}</div>
                <div className="text-gray-300"><span className="text-red-400">💔 Defeat:</span> {selectedSoundMonster.soundProfile.defeatSound}</div>
                {selectedSoundMonster.soundProfile.evolutionSound && (
                  <div className="text-gray-300"><span className="text-purple-400">⬆️ Evolution:</span> {selectedSoundMonster.soundProfile.evolutionSound}</div>
                )}
              </div>
            </div>

            {/* Preview Buttons */}
            <div className="space-y-2 mb-4">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm">
                🎵 Preview Idle Sounds
              </button>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm">
                ⚔️ Preview Battle Cry
              </button>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm">
                🔊 Test Environmental Audio
              </button>
            </div>

            <button
              className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg"
              onClick={() => setShowSoundPreview(false)}
            >
              Close Audio Preview
            </button>
          </div>
        </div>
      )}

      {/* Evolution Modal */}
      {showEvolutionModal && evolutionTarget && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-gray-900 border-2 border-purple-600 rounded-2xl p-6 max-w-sm w-full">
            <div className="text-center mb-4">
              <div className="text-3xl mb-2">✨</div>
              <h3 className="text-xl font-bold text-white mb-2">Monster Evolution</h3>
              <p className="text-gray-300 text-sm">Transform your monster to its next form</p>
            </div>

            <div className="bg-purple-900/30 border border-purple-700 rounded-xl p-4 mb-4">
              <div className="text-center mb-3">
                <div className="text-white font-bold">{evolutionTarget.name}</div>
                <div className="text-gray-400 text-sm">Level {evolutionTarget.level}</div>
              </div>
              <div className="flex items-center justify-center space-x-3 mb-3">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-lg bg-purple-600/30 mb-1"></div>
                  <div className="text-xs text-gray-400">Current</div>
                </div>
                <i className="ri-arrow-right-line text-purple-400 text-xl"></i>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-lg bg-orange-600/30 mb-1"></div>
                  <div className="text-xs text-gray-400">Evolved</div>
                </div>
              </div>
              <div className="text-center text-purple-400 text-sm">
                Next Form: {evolutionTarget.evolution[1] || 'Max Level'}
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="text-white font-semibold text-sm">Evolution Requirements:</div>
              <div className="bg-gray-800/50 rounded-lg p-3">
                <div className="text-gray-300 text-xs">{evolutionTarget.evolutionRequirement}</div>
              </div>
              
              {/* Evolution Sound Preview */}
              <div className="bg-green-900/30 border border-green-700 rounded-lg p-3">
                <div className="text-green-400 font-semibold text-xs mb-1">🎵 Evolution Audio</div>
                <div className="text-gray-300 text-xs">{evolutionTarget.soundProfile.evolutionSound || 'Epic transformation sounds with enhanced voice'}</div>
              </div>
              
              <div className="text-green-400 text-xs">✓ Requirements Met - Evolution Available!</div>
            </div>

            <div className="flex space-x-3">
              <button
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold"
                onClick={() => setShowEvolutionModal(false)}
              >
                ✨ Evolve Now
              </button>
              <button
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg"
                onClick={() => setShowEvolutionModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Trade Modal */}
      {showTradeModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-gray-900 border-2 border-blue-600 rounded-2xl p-6 max-w-sm w-full max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-4">
              <div className="text-3xl mb-2">🤝</div>
              <h3 className="text-xl font-bold text-white mb-2">Monster Trading</h3>
              <p className="text-gray-300 text-sm">Trade Summon Relics with other players</p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="text-white font-semibold">Active Trade Offers:</div>
              {[
                {
                  player: 'DragonMaster47',
                  offering: 'Pyro Wyvern (Lv.22)',
                  requesting: 'Storm Hound',
                  bondBonus: '+25% EXP for both monsters',
                  timeLeft: '2h 15m'
                },
                {
                  player: 'ShadowHunter92',
                  offering: 'Void Stalker (Lv.19)',
                  requesting: 'Grove Warden',
                  bondBonus: '+30% EXP for both monsters',
                  timeLeft: '5h 42m'
                },
                {
                  player: 'IceQueen88',
                  offering: 'Glacier Wyrm (Lv.28)',
                  requesting: 'Inferno Dragon',
                  bondBonus: '+35% EXP for both monsters',
                  timeLeft: '12h 30m'
                }
              ].map((offer, index) => (
                <div key={index} className="bg-blue-900/30 border border-blue-700 rounded-xl p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-white font-semibold text-sm">{offer.player}</div>
                    <div className="text-blue-400 text-xs">{offer.timeLeft}</div>
                  </div>
                  <div className="text-gray-300 text-xs mb-2">
                    Offers: {offer.offering} → Wants: {offer.requesting}
                  </div>
                  <div className="text-green-400 text-xs mb-3">{offer.bondBonus}</div>
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-1 rounded text-xs">
                      Accept Trade
                    </button>
                    <button className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-xs">
                      Counter
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-3 mb-4">
              <div className="text-yellow-400 font-semibold text-sm mb-1">📜 Blank Card Transformation</div>
              <div className="text-gray-300 text-xs space-y-1">
                <div>• Captured monsters transform Blank Cards into Summon Relics</div>
                <div>• Trade Summon Relics to gain bond bonuses and rare variants</div>
                <div>• Both monsters gain increased EXP from trading bonds</div>
                <div>• Access to regional monsters through global marketplace</div>
              </div>
            </div>

            <button
              className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg"
              onClick={() => setShowTradeModal(false)}
            >
              Close Trading
            </button>
          </div>
        </div>
      )}

      {/* Header Stats */}
      <section className="px-4 py-6">
        <div className="bg-gray-800/70 border border-blue-700/50 rounded-xl p-4 mb-6">
          <div className="text-center">
            <div className="text-3xl mb-2">🐉</div>
            <div className="text-white font-bold text-xl">Monster Collection</div>
            <div className="text-blue-400 text-sm">Realistic Sound & Voice System</div>
            <div className="text-gray-300 text-sm mt-2">
              {capturedCount} / {totalCount} Captured ({Math.round((capturedCount / totalCount) * 100)}%)
            </div>
            <div className="bg-gray-700 rounded-full h-2 mt-2">
              <div
                className="bg-gradient-to-r from-blue-600 to-cyan-400 h-2 rounded-full"
                style={{ width: `${(capturedCount / totalCount) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex bg-gray-800/50 rounded-xl p-1 mb-6">
          <button
            onClick={() => setViewMode('all')}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
              viewMode === 'all' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            All ({totalCount})
          </button>
          <button
            onClick={() => setViewMode('captured')}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
              viewMode === 'captured' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Captured ({capturedCount})
          </button>
          <button
            onClick={() => setViewMode('relics')}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
              viewMode === 'relics' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Battle Deck ({relicCount})
          </button>
        </div>

        {/* Quick Actions */}
        <div className="flex space-x-3 mb-6">
          <button
            onClick={() => setShowEvolutionModal(true)}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-sm font-semibold"
          >
            ✨ Evolution Lab
          </button>
          <button
            onClick={() => setShowTradeModal(true)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-semibold"
          >
            🤝 Trading Hub
          </button>
        </div>
      </section>

      {/* Monster Grid */}
      <section className="px-4">
        <div className="grid grid-cols-1 gap-4">
          {filteredMonsters.map((monster) => (
            <div
              key={monster.id}
              className={`bg-gray-800/70 border-2 rounded-xl p-4 cursor-pointer transition-all ${
                selectedMonster === monster.id
                  ? `${getRarityColor(monster.rarity).split(' ')[1]} bg-opacity-30`
                  : 'border-gray-700 hover:border-gray-600'
              } ${!monster.captured ? 'opacity-60' : ''}`}
              onClick={() => setSelectedMonster(selectedMonster === monster.id ? null : monster.id)}
            >
              <div className="flex items-start space-x-4">
                <div className="relative">
                  <div
                    className="w-20 h-20 rounded-xl bg-cover bg-center flex-shrink-0"
                    style={{
                      backgroundImage: `url(https://readdy.ai/api/search-image?query=$%7Bmonster.image%7D&width=80&height=80&seq=${monster.id}-roster&orientation=squarish)`,
                    }}
                  >
                    <div className={`w-full h-full rounded-xl ${getRarityBg(monster.rarity)}`}>
                      {!monster.captured && (
                        <div className="w-full h-full bg-black/60 rounded-xl flex items-center justify-center">
                          <i className="ri-question-mark text-gray-400 text-2xl"></i>
                        </div>
                      )}
                    </div>
                  </div>
                  {monster.captured && (
                    <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                      {monster.level}
                    </div>
                  )}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-yellow-400 text-xs font-bold bg-gray-900 px-2 py-1 rounded-full">
                    {monster.summonCost}⚡
                  </div>
                  {monster.captured && canEvolve(monster) && (
                    <div className="absolute top-0 right-0 bg-purple-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
                      ✨
                    </div>
                  )}
                  {/* Sound Indicator */}
                  {monster.captured && (
                    <div className={`absolute top-0 left-0 text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse ${getVolumeColor(monster.soundProfile.volume).split(' ')[1]}`}>
                      🔊
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className={`font-bold ${getRarityColor(monster.rarity).split(' ')[0]}`}>
                      {monster.captured ? monster.name : '???'}
                    </div>
                    {monster.captured && (
                      <div className="flex items-center space-x-1">
                        {monster.tradeLocked && (
                          <div className="text-xs px-2 py-1 rounded-full bg-red-600/30 text-red-300 border border-red-600/50">
                            🔐 Locked
                          </div>
                        )}
                        <div className={`text-xs px-2 py-1 rounded-full border ${getRelicTypeColor(monster.relicType || 'Blank Card')}`}>
                          {monster.relicType}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="text-gray-400 text-sm mb-1">
                    {monster.captured ? monster.type : 'Unknown Type'}
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className={`text-xs px-2 py-1 rounded-full border ${getRarityColor(monster.rarity)}`}>
                      {monster.rarity}
                    </div>
                    {monster.captured && (
                      <div className={`text-xs px-2 py-1 rounded-full border ${getElementColor(monster.element)}`}>
                        {monster.element}
                      </div>
                    )}
                    {monster.captured && (
                      <div className={`text-xs px-2 py-1 rounded-full ${getVolumeColor(monster.soundProfile.volume)}`}>
                        {monster.soundProfile.voiceType}
                      </div>
                    )}
                  </div>
                  {monster.captured && monster.bondLevel && (
                    <div className="flex items-center space-x-2 mb-2">
                      <div className={`text-xs px-2 py-1 rounded-full ${getBondColor(monster.bondLevel)}`}>
                        💖 Bond: {monster.bondLevel}%
                      </div>
                      {monster.tradeBonus && monster.tradeBonus > 0 && (
                        <div className="text-xs px-2 py-1 rounded-full bg-green-600/30 text-green-300">
                          +{monster.tradeBonus} EXP
                        </div>
                      )}
                    </div>
                  )}
                  {monster.captured && (
                    <div className="flex items-center space-x-4 text-xs">
                      <div className="text-red-400">⚔️ {monster.power}</div>
                      <div className="text-blue-400">🛡️ {monster.defense}</div>
                    </div>
                  )}
                </div>
              </div>

              {selectedMonster === monster.id && monster.captured && (
                <div className="mt-4 pt-4 border-t border-gray-700 space-y-4">
                  {/* Description */}
                  <div>
                    <div className="text-white font-semibold mb-2">Monster Lore</div>
                    <div className="text-gray-300 text-sm">{monster.description}</div>
                  </div>

                  <div>
                    <div className="text-white font-semibold mb-2">📜 Capture Story</div>
                    <div className="text-gray-300 text-sm bg-purple-900/20 px-3 py-2 rounded-lg border border-purple-700/30">
                      {monster.captureMethod}
                    </div>
                  </div>

                  {/* Sound Profile Preview */}
                  <div>
                    <div className="text-white font-semibold mb-2">🔊 Sound Profile</div>
                    <div className="bg-green-900/30 border border-green-700 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-green-400 font-semibold text-sm">Audio Experience</div>
                        <div className={`text-xs px-2 py-1 rounded-full ${getVolumeColor(monster.soundProfile.volume)}`}>
                          {monster.soundProfile.volume}
                        </div>
                      </div>
                      <div className="text-gray-300 text-xs mb-2">
                        Voice: {monster.soundProfile.voiceType} • Frequency: {monster.soundProfile.audioFrequency}
                      </div>
                      <div className="space-y-1 text-xs">
                        <div className="text-blue-400">🎵 Idle: {monster.soundProfile.idleSounds[0]}</div>
                        <div className="text-red-400">⚔️ Battle: {monster.soundProfile.battleCries[0]}</div>
                      </div>
                      <button
                        onClick={() => handleSoundPreview(monster)}
                        className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white py-1 rounded text-xs"
                      >
                        🎧 Full Audio Preview
                      </button>
                    </div>
                  </div>

                  {/* Evolution Chain with Progress */}
                  <div>
                    <div className="text-white font-semibold mb-2">Evolution Path</div>
                    <div className="space-y-2">
                      {monster.evolution.map((stage, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div
                              className={`text-xs px-2 py-1 rounded-full ${
                                index === 0
                                  ? 'bg-green-600/30 text-green-300 border border-green-600/50'
                                  : index === 1 && canEvolve(monster)
                                  ? 'bg-purple-600/30 text-purple-300 border border-purple-600/50'
                                  : index === 1
                                  ? 'bg-gray-600/30 text-gray-400 border border-gray-600/50'
                                  : 'bg-gray-600/30 text-gray-400 border border-gray-600/50'
                              }`}
                            >
                              {stage}
                            </div>
                            {index === 0 && (
                              <div className="text-green-400 text-xs">Current</div>
                            )}
                            {index === 1 && canEvolve(monster) && (
                              <div className="text-purple-400 text-xs animate-pulse">✨ Ready!</div>
                            )}
                          </div>
                          {index < monster.evolution.length - 1 && (
                            <i className="ri-arrow-right-line text-gray-400"></i>
                          )}
                        </div>
                      ))}
                    </div>
                    {monster.evolutionRequirement && (
                      <div className="mt-2 text-xs text-gray-400">
                        Next Evolution: {monster.evolutionRequirement}
                      </div>
                    )}
                  </div>

                  {/* Bond Level Progress */}
                  {monster.bondLevel && (
                    <div>
                      <div className="text-white font-semibold mb-2">Monster Bond</div>
                      <div className="bg-gray-700 rounded-full h-3 mb-2">
                        <div
                          className={`h-3 rounded-full ${
                            monster.bondLevel >= 90 ? 'bg-orange-400' :
                            monster.bondLevel >= 70 ? 'bg-purple-400' :
                            monster.bondLevel >= 50 ? 'bg-blue-400' : 'bg-gray-400'
                          }`}
                          style={{ width: `${monster.bondLevel}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs">
                        <div className={getBondColor(monster.bondLevel).split(' ')[0]}>
                          Bond Level: {monster.bondLevel}%
                        </div>
                        <div className="text-gray-400">
                          {monster.bondLevel >= 90 ? 'Perfect Bond' :
                           monster.bondLevel >= 70 ? 'Strong Bond' :
                           monster.bondLevel >= 50 ? 'Good Bond' : 'Building Trust'}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Battle Abilities */}
                  <div>
                    <div className="text-white font-semibold mb-2">Battle Abilities</div>
                    <div className="space-y-2">
                      {monster.ability.map((ability, index) => (
                        <div
                          key={index}
                          className="bg-blue-600/30 text-blue-300 text-sm px-3 py-2 rounded-lg border border-blue-600/50"
                        >
                          <span className="font-semibold">{ability}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 pt-2">
                    <button 
                      onClick={() => handleSoundPreview(monster)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm"
                    >
                      🔊 Audio
                    </button>
                    {canEvolve(monster) && (
                      <button 
                        onClick={() => handleEvolution(monster)}
                        className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-sm font-semibold"
                      >
                        ✨ Evolve Monster
                      </button>
                    )}
                    {monster.relicType === 'Summon Relic' && (
                      <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-semibold">
                        Add to Deck
                      </button>
                    )}
                    {!monster.tradeLocked && (
                      <button 
                        onClick={() => setShowTradeModal(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
                      >
                        🤝 Trade
                      </button>
                    )}
                  </div>
                </div>
              )}

              {selectedMonster === monster.id && !monster.captured && (
                <div className="mt-4 pt-4 border-t border-gray-700 text-center">
                  <div className="text-gray-400 text-sm mb-3">
                    This monster hasn't been captured yet. Use Blank Cards to absorb it!
                  </div>
                  <div className="text-gray-500 text-xs mb-3">
                    {monster.captureMethod}
                  </div>
                  <div className="bg-purple-900/20 border border-purple-700/30 rounded-lg p-3 mb-3">
                    <div className="text-purple-400 font-semibold text-sm mb-1">📜 Blank Card Process</div>
                    <div className="text-gray-300 text-xs">
                      Once captured, your Blank Card will transform into a Summon Relic featuring this monster's essence, ready for AR battles with full sound effects.
                    </div>
                  </div>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                    📜 Start Hunt
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Evolution Relics Collection */}
      <section className="px-4 py-6">
        <h3 className="text-white font-bold mb-3">✨ Evolution Relics</h3>
        <div className="bg-gray-800/50 rounded-xl p-4">
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: 'Volcanic Relic', element: 'Fire', rarity: 'Epic', obtained: true },
              { name: 'Ancient Stone Relic', element: 'Earth', rarity: 'Legendary', obtained: false },
              { name: 'Shadow Essence Relic', element: 'Shadow', rarity: 'Epic', obtained: true },
              { name: 'Nature Crystal', element: 'Nature', rarity: 'Rare', obtained: true },
              { name: 'Storm Crystal', element: 'Lightning', rarity: 'Rare', obtained: true },
              { name: 'Frozen Heart Relic', element: 'Ice', rarity: 'Epic', obtained: false }
            ].map((relic, index) => (
              <div key={index} className={`border rounded-lg p-3 ${relic.obtained ? 'border-green-600 bg-green-900/20' : 'border-gray-600 bg-gray-800/30'}`}>
                <div className="flex items-center justify-between mb-1">
                  <div className={`text-sm font-semibold ${relic.obtained ? 'text-green-400' : 'text-gray-400'}`}>
                    {relic.name}
                  </div>
                  <div className={`text-xs ${relic.obtained ? 'text-green-400' : 'text-gray-500'}`}>
                    {relic.obtained ? '✓' : '✗'}
                  </div>
                </div>
                <div className={`text-xs px-2 py-1 rounded-full border inline-block ${getElementColor(relic.element)}`}>
                  {relic.element} {relic.rarity}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Audio System Info */}
      <section className="px-4 py-6 mb-20">
        <div className="bg-gray-800/50 rounded-xl p-4">
          <h3 className="text-white font-bold mb-3">🔊 Advanced Audio System</h3>
          
          <div className="grid grid-cols-1 gap-4 mb-4">
            <div className="bg-green-900/30 border border-green-700 rounded-lg p-3">
              <div className="text-green-400 font-semibold text-sm mb-2">🎵 Realistic Sound Features</div>
              <div className="text-gray-300 text-xs space-y-1">
                <div>• Each monster has unique voice type and volume level</div>
                <div>• Dynamic battle cries that trigger during combat</div>
                <div>• Environmental audio sync with monster movements</div>
                <div>• Contextual hurt sounds and defeat audio</div>
                <div>• Special evolution and summon sound effects</div>
              </div>
            </div>

            <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-3">
              <div className="text-blue-400 font-semibold text-sm mb-2">🔊 Voice Categories</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="text-gray-300">Roar: Dragons, powerful beasts</div>
                <div className="text-gray-300">Howl: Wolves, pack hunters</div>
                <div className="text-gray-300">Hiss: Sneaky, stealth creatures</div>
                <div className="text-gray-300">Whisper: Shadow, demonic entities</div>
                <div className="text-gray-300">Rumble: Earth, stone creatures</div>
                <div className="text-gray-300">Chirp: Divine, celestial beings</div>
              </div>
            </div>

            <div className="bg-orange-900/30 border border-orange-700 rounded-lg p-3">
              <div className="text-orange-400 font-semibold text-sm mb-2">📱 Audio Integration</div>
              <div className="text-gray-300 text-xs space-y-1">
                <div>• Phone vibration sync with monster roars and attacks</div>
                <div>• Adaptive volume based on environment and time</div>
                <div>• Directional audio for AR spatial positioning</div>
                <div>• Background ambiance matching monster elements</div>
              </div>
            </div>
          </div>

          <div className="bg-purple-900/30 border border-purple-700 rounded-lg p-3">
            <div className="text-purple-400 font-semibold text-sm mb-2">✨ Immersive Experience</div>
            <div className="text-gray-300 text-xs space-y-1">
              <div>• Monsters respond to your voice and presence with audio cues</div>
              <div>• Battle intensity increases sound effects and frequency</div>
              <div>• Evolution transformations feature epic audio crescendos</div>
              <div>• Trading and bonding unlocks new monster vocalizations</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
