'use client';

import { useState, useEffect } from 'react';

interface WeeklyContent {
  week: number;
  newMonsters: Monster[];
  upgradePaths: MonsterUpgrade[];
  sacredItems: SacredItem[];
  newBoss: BossMonster;
  arWorld: ARWorld;
  releaseDate: string;
}

interface Monster {
  id: string;
  name: string;
  type: 'Werewolf' | 'Vampire' | 'Spider' | 'Imp' | 'Fiend' | 'Flying' | 'Specter' | 'Hollow' | 'Eye' | 'Robot' | 'Dinosaur';
  element: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';
  power: number;
  defense: number;
  speed: number;
  level: number;
  abilities: string[];
  realisticFeatures: {
    fluidMovements: string[];
    livingBehaviors: string[];
    environmentalSync: string[];
    lifelikeAnimations: string[];
  };
  captureRequirements: {
    location: string;
    timeOfDay: string;
    weakness: string[];
    strategy: string;
  };
  image: string;
  evolutionPath: string[];
}

interface MonsterUpgrade {
  monsterId: string;
  upgradeName: string;
  requirements: string[];
  newAbilities: string[];
  statBoosts: {
    power: number;
    defense: number;
    speed: number;
  };
  visualChanges: string[];
}

interface SacredItem {
  id: string;
  name: string;
  type: 'Weapon' | 'Armor' | 'Relic' | 'Essence' | 'Crystal';
  rarity: 'Rare' | 'Epic' | 'Legendary' | 'Divine';
  effect: string;
  requirements: string[];
  image: string;
}

interface BossMonster {
  id: string;
  name: string;
  title: string;
  type: string;
  difficulty: 'Epic' | 'Legendary' | 'Mythic' | 'Divine';
  hp: number;
  power: number;
  specialAbilities: string[];
  phases: BossPhase[];
  rewards: string[];
  teamRequirement: number;
  location: string;
  image: string;
}

interface BossPhase {
  phase: number;
  hpThreshold: number;
  description: string;
  abilities: string[];
  environmentChanges: string[];
}

interface ARWorld {
  id: string;
  name: string;
  theme: string;
  environment: string;
  uniqueFeatures: string[];
  nativeMonsters: string[];
  specialMechanics: string[];
  image: string;
}

export default function WeeklyContentSystem() {
  const [currentWeek, setCurrentWeek] = useState(1);
  const [selectedContent, setSelectedContent] = useState<'monsters' | 'upgrades' | 'items' | 'boss' | 'world'>('monsters');
  const [showPreview, setShowPreview] = useState(false);
  const [previewMonster, setPreviewMonster] = useState<Monster | null>(null);

  // Weekly Content Schedule
  const weeklyContent: WeeklyContent[] = [
    {
      week: 1,
      releaseDate: 'January 8, 2024',
      newMonsters: [
        {
          id: 'shadow-werewolf',
          name: 'Shadow Werewolf',
          type: 'Werewolf',
          element: 'Dark',
          rarity: 'Epic',
          power: 2800,
          defense: 2200,
          speed: 95,
          level: 25,
          abilities: ['Moonlight Howl', 'Shadow Leap', 'Pack Call', 'Feral Rage'],
          realisticFeatures: {
            fluidMovements: [
              'Prowls on all fours with realistic wolf gait',
              'Smooth transition from standing to crouching',
              'Natural head movements tracking prey',
              'Fluid tail swishing showing emotional state'
            ],
            livingBehaviors: [
              'Sniffs air detecting scents in AR space',
              'Ears twitch responding to sounds',
              'Eyes glow brighter during full moon phases',
              'Paces restlessly when agitated'
            ],
            environmentalSync: [
              'Casts realistic shadows that move with lighting',
              'Footprints appear on soft surfaces',
              'Reflects in mirrors and water',
              'Breath visible in cold environments'
            ],
            lifelikeAnimations: [
              'Chest rises and falls with breathing',
              'Blinks naturally with varying intervals',
              'Scratches behind ear with hind leg',
              'Stretches and yawns when idle'
            ]
          },
          captureRequirements: {
            location: 'Forest during nighttime',
            timeOfDay: 'Night (8 PM - 6 AM)',
            weakness: ['Silver weapons', 'Holy light', 'Loud sounds'],
            strategy: 'Weaken with silver attacks, capture during vulnerable howling animation'
          },
          image: 'Realistic werewolf with dark fur prowling through moonlit forest, anthropomorphic wolf creature with glowing yellow eyes, detailed fur texture with fluid movement, cinematic horror atmosphere',
          evolutionPath: ['Shadow Werewolf', 'Alpha Werewolf', 'Lunar Beast Lord']
        },
        {
          id: 'crimson-vampire',
          name: 'Crimson Vampire',
          type: 'Vampire',
          element: 'Blood',
          rarity: 'Legendary',
          power: 3200,
          defense: 1800,
          speed: 88,
          level: 30,
          abilities: ['Blood Drain', 'Mist Form', 'Hypnotic Gaze', 'Bat Swarm'],
          realisticFeatures: {
            fluidMovements: [
              'Glides gracefully without visible footsteps',
              'Cape billows naturally in wind',
              'Elegant hand gestures when casting spells',
              'Smooth transformation into bat form'
            ],
            livingBehaviors: [
              'Avoids sunlight, seeks shadows',
              'Eyes track blood sources',
              'Fangs extend when hungry',
              'Recoils from holy symbols'
            ],
            environmentalSync: [
              'No reflection in mirrors',
              'Casts no shadow in sunlight',
              'Mist form interacts with air currents',
              'Eyes glow red in darkness'
            ],
            lifelikeAnimations: [
              'Hair moves with supernatural grace',
              'Fingers tap impatiently when waiting',
              'Licks lips when targeting prey',
              'Adjusts collar and smooths clothing'
            ]
          },
          captureRequirements: {
            location: 'Gothic buildings or graveyards',
            timeOfDay: 'Night only (sunlight weakens)',
            weakness: ['Garlic', 'Holy water', 'Sunlight', 'Wooden stakes'],
            strategy: 'Use holy items to weaken, capture when in mist form vulnerability'
          },
          image: 'Elegant vampire lord with crimson cape in gothic cathedral, pale aristocratic figure with glowing red eyes, detailed Victorian clothing with supernatural grace, dramatic lighting with shadow effects',
          evolutionPath: ['Crimson Vampire', 'Vampire Lord', 'Ancient Nosferatu']
        },
        {
          id: 'giant-arachnid',
          name: 'Giant Arachnid',
          type: 'Spider',
          element: 'Poison',
          rarity: 'Rare',
          power: 2400,
          defense: 2800,
          speed: 72,
          level: 22,
          abilities: ['Web Trap', 'Venom Strike', 'Wall Crawl', 'Silk Bind'],
          realisticFeatures: {
            fluidMovements: [
              'Eight legs move in realistic spider coordination',
              'Climbs walls with natural spider locomotion',
              'Spins webs with authentic silk-producing motion',
              'Pedipalps move when sensing vibrations'
            ],
            livingBehaviors: [
              'Feels vibrations through web networks',
              'Grooms legs with mandibles',
              'Eyes track movement independently',
              'Produces silk constantly for web maintenance'
            ],
            environmentalSync: [
              'Webs stick to real surfaces',
              'Casts multiple shadows from legs',
              'Moves faster on textured surfaces',
              'Detects vibrations from player movement'
            ],
            lifelikeAnimations: [
              'Abdomen pulses with breathing',
              'Chelicerae flex and move naturally',
              'Legs twitch when sensing prey',
              'Body sways slightly when stationary'
            ]
          },
          captureRequirements: {
            location: 'Dark corners, basements, caves',
            timeOfDay: 'Any time (prefers darkness)',
            weakness: ['Fire', 'Ice', 'Loud vibrations'],
            strategy: 'Avoid web traps, use fire attacks to clear webs, capture when molting'
          },
          image: 'Massive realistic spider with detailed exoskeleton in dark cave environment, eight-legged arachnid with intricate web patterns, menacing creature with multiple eyes, atmospheric cave lighting',
          evolutionPath: ['Giant Arachnid', 'Web Weaver', 'Arachne Queen']
        }
      ],
      upgradePaths: [
        {
          monsterId: 'flare-drake',
          upgradeName: 'Volcanic Awakening',
          requirements: ['Level 20+', 'Volcanic Relic', '5 Fire Victories'],
          newAbilities: ['Magma Pool', 'Volcanic Eruption'],
          statBoosts: { power: 400, defense: 200, speed: 10 },
          visualChanges: ['Larger size', 'Lava flowing from scales', 'Glowing cracks on body']
        }
      ],
      sacredItems: [
        {
          id: 'moonlight-blade',
          name: 'Moonlight Blade',
          type: 'Weapon',
          rarity: 'Legendary',
          effect: '+50% damage to Dark creatures, glows during night battles',
          requirements: ['Defeat 10 Werewolves', 'Full Moon Ritual'],
          image: 'Ethereal silver sword glowing with moonlight energy, ornate blade with lunar runes, mystical weapon with celestial aura'
        }
      ],
      newBoss: {
        id: 'alpha-lycanthrope',
        name: 'Alpha Lycanthrope',
        title: 'The Moon\'s Chosen',
        type: 'Werewolf Lord',
        difficulty: 'Legendary',
        hp: 15000,
        power: 4500,
        specialAbilities: ['Pack Summon', 'Lunar Eclipse', 'Howl of Madness'],
        phases: [
          {
            phase: 1,
            hpThreshold: 100,
            description: 'Human form with werewolf abilities',
            abilities: ['Silver Claws', 'Intimidating Roar'],
            environmentChanges: ['Forest becomes darker']
          },
          {
            phase: 2,
            hpThreshold: 60,
            description: 'Full werewolf transformation',
            abilities: ['Pack Call', 'Moonlight Howl', 'Feral Charge'],
            environmentChanges: ['Moon appears overhead', 'Howling echoes']
          },
          {
            phase: 3,
            hpThreshold: 25,
            description: 'Enraged alpha state',
            abilities: ['Lunar Eclipse', 'Shadow Leap', 'Pack Frenzy'],
            environmentChanges: ['Multiple werewolves appear', 'Eclipse darkens area']
          }
        ],
        rewards: ['Alpha Fang Relic', 'Lycanthrope Blood Essence', 'Moonlight Armor'],
        teamRequirement: 4,
        location: 'Moonlit Forest Clearing',
        image: 'Massive alpha werewolf lord standing in moonlit forest clearing, towering lycanthrope with silver fur and glowing eyes, pack leader with ancient scars, epic boss encounter atmosphere'
      },
      arWorld: {
        id: 'shadow-realm',
        name: 'Shadow Realm',
        theme: 'Dark Fantasy',
        environment: 'Twisted gothic landscape with perpetual twilight',
        uniqueFeatures: [
          'Gravity shifts in certain areas',
          'Shadows come alive as monsters',
          'Time moves differently',
          'Light sources drain energy'
        ],
        nativeMonsters: ['Shadow Werewolf', 'Crimson Vampire', 'Specter Knights'],
        specialMechanics: [
          'Shadow magic enhances Dark monsters',
          'Light attacks deal double damage',
          'Stealth mechanics for hunting',
          'Day/night cycle affects monster strength'
        ],
        image: 'Gothic shadow realm with twisted spires and floating islands, dark fantasy landscape with purple mists, supernatural environment with ethereal lighting'
      }
    },
    {
      week: 2,
      releaseDate: 'January 15, 2024',
      newMonsters: [
        {
          id: 'chaos-imp',
          name: 'Chaos Imp',
          type: 'Imp',
          element: 'Chaos',
          rarity: 'Common',
          power: 1200,
          defense: 800,
          speed: 90,
          level: 15,
          abilities: ['Mischief Magic', 'Teleport Strike', 'Chaos Bolt'],
          realisticFeatures: {
            fluidMovements: [
              'Bounces and hops with impish energy',
              'Wings flutter rapidly for hovering',
              'Tail swishes mischievously',
              'Quick darting movements'
            ],
            livingBehaviors: [
              'Giggles randomly during idle',
              'Plays pranks on nearby objects',
              'Scratches behind horns',
              'Counts treasure obsessively'
            ],
            environmentalSync: [
              'Leaves small scorch marks when teleporting',
              'Interacts with fire sources',
              'Reflects in shiny surfaces',
              'Creates small whirlwinds when flying'
            ],
            lifelikeAnimations: [
              'Wings beat continuously for flight',
              'Eyes dart around looking for mischief',
              'Rubs hands together when plotting',
              'Stretches wings when tired'
            ]
          },
          captureRequirements: {
            location: 'Urban areas with fire sources',
            timeOfDay: 'Any time',
            weakness: ['Holy water', 'Iron', 'Order magic'],
            strategy: 'Predict teleport patterns, use area attacks'
          },
          image: 'Small mischievous imp with bat wings and horns, red-skinned creature with glowing eyes, playful demon with spiked tail, urban fantasy setting',
          evolutionPath: ['Chaos Imp', 'Mischief Fiend', 'Chaos Lord']
        },
        {
          id: 'storm-eagle',
          name: 'Storm Eagle',
          type: 'Flying',
          element: 'Lightning',
          rarity: 'Epic',
          power: 3000,
          defense: 1600,
          speed: 98,
          level: 28,
          abilities: ['Lightning Dive', 'Thunder Wing', 'Storm Call', 'Wind Slash'],
          realisticFeatures: {
            fluidMovements: [
              'Soars with realistic bird flight physics',
              'Wings adjust to wind currents',
              'Banking turns and diving attacks',
              'Perches naturally on surfaces'
            ],
            livingBehaviors: [
              'Preens feathers with beak',
              'Calls to other birds in area',
              'Hunts for food while idle',
              'Builds nests on high surfaces'
            ],
            environmentalSync: [
              'Creates wind effects when flying',
              'Lightning illuminates surroundings',
              'Feathers ruffle in actual wind',
              'Casts realistic flying shadow'
            ],
            lifelikeAnimations: [
              'Head turns tracking movement',
              'Talons grip and release surfaces',
              'Beak opens when calling',
              'Feathers bristle when threatened'
            ]
          },
          captureRequirements: {
            location: 'High altitudes, mountains, skyscrapers',
            timeOfDay: 'Stormy weather preferred',
            weakness: ['Ground attacks', 'Ice', 'Wind disruption'],
            strategy: 'Ground with ice attacks, capture during landing'
          },
          image: 'Majestic storm eagle with lightning crackling through feathers, powerful bird of prey with electric aura, soaring through storm clouds with dramatic lighting',
          evolutionPath: ['Storm Eagle', 'Thunder Hawk', 'Sky Sovereign']
        },
        {
          id: 'hollow-specter',
          name: 'Hollow Specter',
          type: 'Specter',
          element: 'Ghost',
          rarity: 'Rare',
          power: 2200,
          defense: 1000,
          speed: 85,
          level: 20,
          abilities: ['Phase Walk', 'Soul Drain', 'Haunting Wail', 'Ectoplasm'],
          realisticFeatures: {
            fluidMovements: [
              'Floats with ethereal grace',
              'Phases in and out of visibility',
              'Robes billow without wind',
              'Glides through solid objects'
            ],
            livingBehaviors: [
              'Whispers incoherently when idle',
              'Reaches toward living beings',
              'Flickers when emotional',
              'Leaves cold spots in air'
            ],
            environmentalSync: [
              'Temperature drops in presence',
              'Electronics malfunction nearby',
              'No reflection or shadow',
              'Passes through walls'
            ],
            lifelikeAnimations: [
              'Hollow eye sockets glow dimly',
              'Tattered robes sway mysteriously',
              'Mouth moves during wailing',
              'Hands gesture eerily'
            ]
          },
          captureRequirements: {
            location: 'Abandoned buildings, graveyards, hospitals',
            timeOfDay: 'Night (2 AM - 4 AM peak)',
            weakness: ['Holy magic', 'Salt', 'Iron', 'Bright lights'],
            strategy: 'Use holy attacks during manifestation, capture when solid'
          },
          image: 'Ethereal hollow specter with tattered robes floating in abandoned building, ghostly figure with empty eye sockets, supernatural entity with ectoplasmic aura',
          evolutionPath: ['Hollow Specter', 'Banshee', 'Phantom King']
        }
      ],
      upgradePaths: [
        {
          monsterId: 'stone-golem',
          upgradeName: 'Ancient Awakening',
          requirements: ['Level 25+', 'Ancient Relic', '3 Earth Boss Victories'],
          newAbilities: ['Seismic Slam', 'Stone Army'],
          statBoosts: { power: 300, defense: 600, speed: -5 },
          visualChanges: ['Glowing runes cover body', 'Moss garden on shoulders', 'Crystal formations']
        }
      ],
      sacredItems: [
        {
          id: 'chaos-orb',
          name: 'Chaos Orb',
          type: 'Relic',
          rarity: 'Epic',
          effect: 'Random beneficial effect each battle, +25% chaos magic damage',
          requirements: ['Capture 20 Chaos monsters', 'Chaos Ritual'],
          image: 'Swirling orb of chaotic energy with unpredictable colors, mystical sphere with crackling magical power'
        }
      ],
      newBoss: {
        id: 'sky-tyrant',
        name: 'Sky Tyrant',
        title: 'Lord of Storms',
        type: 'Legendary Eagle',
        difficulty: 'Epic',
        hp: 12000,
        power: 4200,
        specialAbilities: ['Hurricane Summon', 'Lightning Storm', 'Wind Barrier'],
        phases: [
          {
            phase: 1,
            hpThreshold: 100,
            description: 'Aerial superiority mode',
            abilities: ['Lightning Dive', 'Wind Slash'],
            environmentChanges: ['Storm clouds gather', 'Wind increases']
          },
          {
            phase: 2,
            hpThreshold: 50,
            description: 'Storm lord transformation',
            abilities: ['Hurricane Summon', 'Thunder Wing'],
            environmentChanges: ['Lightning strikes ground', 'Rain begins']
          }
        ],
        rewards: ['Storm Feather', 'Lightning Essence', 'Wind Crown'],
        teamRequirement: 3,
        location: 'Mountain Peak During Storm',
        image: 'Colossal storm eagle surrounded by lightning and hurricane winds, legendary bird boss with electric feathers, dramatic storm environment'
      },
      arWorld: {
        id: 'sky-citadel',
        name: 'Sky Citadel',
        theme: 'Floating Islands',
        environment: 'Ancient ruins floating in endless sky with storm clouds',
        uniqueFeatures: [
          'Gravity wells between islands',
          'Storm barriers',
          'Wind tunnels for travel',
          'Lightning-powered mechanisms'
        ],
        nativeMonsters: ['Storm Eagle', 'Wind Sprites', 'Lightning Elementals'],
        specialMechanics: [
          'Flying advantage for winged monsters',
          'Weather affects battle conditions',
          'Island-hopping exploration',
          'Altitude affects oxygen for some monsters'
        ],
        image: 'Floating island citadel with ancient ruins in stormy sky, aerial kingdom with lightning bridges, mystical architecture in clouds'
      }
    }
  ];

  const getCurrentWeekContent = () => {
    return weeklyContent[currentWeek - 1] || weeklyContent[0];
  };

  const getMonsterTypeIcon = (type: string) => {
    switch (type) {
      case 'Werewolf': return '🐺';
      case 'Vampire': return '🧛';
      case 'Spider': return '🕷️';
      case 'Imp': return '👹';
      case 'Fiend': return '😈';
      case 'Flying': return '🦅';
      case 'Specter': return '👻';
      case 'Hollow': return '💀';
      case 'Eye': return '👁️';
      case 'Robot': return '🤖';
      case 'Dinosaur': return '🦕';
      default: return '👾';
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

  const getElementColor = (element: string) => {
    switch (element) {
      case 'Dark': return 'from-purple-500 to-purple-700';
      case 'Blood': return 'from-red-600 to-red-800';
      case 'Poison': return 'from-green-600 to-green-800';
      case 'Chaos': return 'from-pink-500 to-purple-600';
      case 'Lightning': return 'from-yellow-400 to-orange-500';
      case 'Ghost': return 'from-gray-400 to-purple-500';
      default: return 'from-gray-500 to-gray-700';
    }
  };

  const currentContent = getCurrentWeekContent();

  return (
    <div className="min-h-screen bg-gray-950 pt-20 pb-24 relative overflow-hidden">
      {/* Atmospheric Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-black/40"></div>
      </div>

      {/* Monster Preview Modal */}
      {showPreview && previewMonster && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-gray-900 border-2 border-purple-600 rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">{getMonsterTypeIcon(previewMonster.type)}</div>
              <h3 className="text-2xl font-bold text-white mb-2">{previewMonster.name}</h3>
              <div className="flex justify-center space-x-2 mb-4">
                <div className={`text-xs px-3 py-1 rounded-full border ${getRarityColor(previewMonster.rarity)}`}>
                  {previewMonster.rarity}
                </div>
                <div className={`text-xs px-3 py-1 rounded-full bg-gradient-to-r ${getElementColor(previewMonster.element)} text-white`}>
                  {previewMonster.element}
                </div>
              </div>
            </div>

            {/* Monster Visualization */}
            <div 
              className="h-48 rounded-xl bg-cover bg-center mb-4 border-2 border-purple-400/50"
              style={{
                backgroundImage: `url(https://readdy.ai/api/search-image?query=$%7BencodeURIComponent%28previewMonster.image%29%7D&width=350&height=180&seq=${previewMonster.id}-preview&orientation=landscape)`
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-xl flex items-end p-4">
                <div className="text-center w-full">
                  <div className="text-white font-bold">Level {previewMonster.level}</div>
                  <div className="text-purple-300 text-sm">{previewMonster.type} Type</div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center">
                <div className="text-red-400 text-lg font-bold">{previewMonster.power}</div>
                <div className="text-gray-400 text-xs">Power</div>
              </div>
              <div className="text-center">
                <div className="text-blue-400 text-lg font-bold">{previewMonster.defense}</div>
                <div className="text-gray-400 text-xs">Defense</div>
              </div>
              <div className="text-center">
                <div className="text-green-400 text-lg font-bold">{previewMonster.speed}</div>
                <div className="text-gray-400 text-xs">Speed</div>
              </div>
            </div>

            {/* Abilities */}
            <div className="mb-4">
              <div className="text-white font-semibold mb-2">Battle Abilities</div>
              <div className="space-y-1">
                {previewMonster.abilities.map((ability, index) => (
                  <div key={index} className="bg-purple-600/30 text-purple-300 text-sm px-3 py-1 rounded-lg">
                    {ability}
                  </div>
                ))}
              </div>
            </div>

            {/* Realistic Features */}
            <div className="mb-4">
              <div className="text-white font-semibold mb-2">🎬 Lifelike Features</div>
              <div className="space-y-2">
                <div className="bg-green-900/30 border border-green-700 rounded-lg p-3">
                  <div className="text-green-400 font-semibold text-sm mb-1">Fluid Movements</div>
                  {previewMonster.realisticFeatures.fluidMovements.slice(0, 2).map((movement, index) => (
                    <div key={index} className="text-gray-300 text-xs">• {movement}</div>
                  ))}
                </div>
                <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-3">
                  <div className="text-blue-400 font-semibold text-sm mb-1">Living Behaviors</div>
                  {previewMonster.realisticFeatures.livingBehaviors.slice(0, 2).map((behavior, index) => (
                    <div key={index} className="text-gray-300 text-xs">• {behavior}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Capture Requirements */}
            <div className="mb-4">
              <div className="text-white font-semibold mb-2">📍 Capture Info</div>
              <div className="bg-orange-900/30 border border-orange-700 rounded-lg p-3">
                <div className="text-orange-400 text-sm font-semibold mb-1">Location: {previewMonster.captureRequirements.location}</div>
                <div className="text-gray-300 text-xs mb-1">Time: {previewMonster.captureRequirements.timeOfDay}</div>
                <div className="text-gray-300 text-xs mb-1">Weakness: {previewMonster.captureRequirements.weakness.join(', ')}</div>
                <div className="text-yellow-300 text-xs">{previewMonster.captureRequirements.strategy}</div>
              </div>
            </div>

            <button
              onClick={() => setShowPreview(false)}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold"
            >
              Close Preview
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="fixed top-0 w-full bg-black/40 backdrop-blur-md z-50 border-b border-purple-800/30">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <i className="ri-arrow-left-line text-white text-xl mr-2"></i>
            <span className="text-white font-semibold">Weekly Content System</span>
          </div>
          <div className="text-purple-400 text-sm">Week {currentWeek}</div>
        </div>
      </header>

      {/* Week Navigation */}
      <section className="pt-20 px-4 py-4 relative z-10">
        <div className="bg-gray-800/70 border border-purple-700/50 rounded-xl p-4 mb-6">
          <div className="text-center mb-4">
            <div className="text-purple-400 text-sm font-semibold">Content Release Schedule</div>
            <div className="text-white text-xl font-bold">Week {currentWeek} - {currentContent.releaseDate}</div>
            <div className="text-gray-300 text-sm">New monsters, upgrades, and AR worlds every week!</div>
          </div>
          
          <div className="flex justify-center space-x-2">
            <button
              onClick={() => setCurrentWeek(Math.max(1, currentWeek - 1))}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
              disabled={currentWeek === 1}
            >
              ← Previous
            </button>
            <div className="flex space-x-1">
              {weeklyContent.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentWeek(index + 1)}
                  className={`w-8 h-8 rounded-full ${
                    currentWeek === index + 1 ? 'bg-purple-600' : 'bg-gray-600'
                  } text-white text-sm`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentWeek(Math.min(weeklyContent.length, currentWeek + 1))}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
              disabled={currentWeek === weeklyContent.length}
            >
              Next →
            </button>
          </div>
        </div>
      </section>

      {/* Content Type Toggle */}
      <section className="px-4 py-4 relative z-10">
        <div className="flex bg-gray-800/50 rounded-xl p-1 mb-6 overflow-x-auto">
          <button
            onClick={() => setSelectedContent('monsters')}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
              selectedContent === 'monsters' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            🐺 New Monsters
          </button>
          <button
            onClick={() => setSelectedContent('upgrades')}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
              selectedContent === 'upgrades' ? 'bg-orange-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            ⬆️ Upgrades
          </button>
          <button
            onClick={() => setSelectedContent('items')}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
              selectedContent === 'items' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            ⚔️ Sacred Items
          </button>
          <button
            onClick={() => setSelectedContent('boss')}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
              selectedContent === 'boss' ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            👑 Weekly Boss
          </button>
          <button
            onClick={() => setSelectedContent('world')}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
              selectedContent === 'world' ? 'bg-green-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            🌍 New AR World
          </button>
        </div>
      </section>

      {/* New Monsters Section */}
      {selectedContent === 'monsters' && (
        <section className="px-4 py-6 relative z-10">
          <h2 className="text-xl font-bold text-white mb-4">🐺 New Monster Types - Week {currentWeek}</h2>
          <div className="space-y-4">
            {currentContent.newMonsters.map((monster, index) => (
              <div key={index} className="bg-gray-800/70 border border-gray-700 rounded-xl p-4">
                <div className="flex items-start space-x-4">
                  <div 
                    className="w-24 h-24 rounded-lg bg-cover bg-center cursor-pointer"
                    style={{
                      backgroundImage: `url(https://readdy.ai/api/search-image?query=$%7BencodeURIComponent%28monster.image%29%7D&width=96&height=96&seq=${monster.id}-thumbnail&orientation=squarish)`
                    }}
                    onClick={() => {
                      setPreviewMonster(monster);
                      setShowPreview(true);
                    }}
                  >
                    <div className="w-full h-full bg-black/20 rounded-lg flex items-center justify-center">
                      <div className="text-3xl">{getMonsterTypeIcon(monster.type)}</div>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-white font-bold text-lg">{monster.name}</div>
                      <div className={`text-xs px-2 py-1 rounded-full border ${getRarityColor(monster.rarity)}`}>
                        {monster.rarity}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${getElementColor(monster.element)} text-white`}>
                        {monster.element}
                      </div>
                      <div className="text-gray-400 text-sm">{monster.type} Type</div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <div className="text-center">
                        <div className="text-red-400 text-sm font-bold">{monster.power}</div>
                        <div className="text-gray-400 text-xs">PWR</div>
                      </div>
                      <div className="text-center">
                        <div className="text-blue-400 text-sm font-bold">{monster.defense}</div>
                        <div className="text-gray-400 text-xs">DEF</div>
                      </div>
                      <div className="text-center">
                        <div className="text-green-400 text-sm font-bold">{monster.speed}</div>
                        <div className="text-gray-400 text-xs">SPD</div>
                      </div>
                    </div>

                    <div className="bg-green-900/30 border border-green-700 rounded-lg p-2 mb-2">
                      <div className="text-green-400 font-semibold text-xs mb-1">🎬 Realistic Features</div>
                      <div className="text-gray-300 text-xs">
                        {monster.realisticFeatures.fluidMovements[0]}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => {
                        setPreviewMonster(monster);
                        setShowPreview(true);
                      }}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-sm font-semibold"
                    >
                      View Full Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Monster Upgrades Section */}
      {selectedContent === 'upgrades' && (
        <section className="px-4 py-6 relative z-10">
          <h2 className="text-xl font-bold text-white mb-4">⬆️ Monster Upgrades - Week {currentWeek}</h2>
          <div className="space-y-4">
            {currentContent.upgradePaths.map((upgrade, index) => (
              <div key={index} className="bg-gray-800/70 border border-orange-700 rounded-xl p-4">
                <div className="text-center mb-4">
                  <div className="text-2xl mb-2">✨</div>
                  <div className="text-white font-bold text-lg">{upgrade.upgradeName}</div>
                  <div className="text-orange-400 text-sm">Enhanced evolution path</div>
                </div>

                <div className="space-y-3">
                  <div className="bg-orange-900/30 border border-orange-700 rounded-lg p-3">
                    <div className="text-orange-400 font-semibold text-sm mb-2">Requirements</div>
                    {upgrade.requirements.map((req, idx) => (
                      <div key={idx} className="text-gray-300 text-xs">• {req}</div>
                    ))}
                  </div>

                  <div className="bg-purple-900/30 border border-purple-700 rounded-lg p-3">
                    <div className="text-purple-400 font-semibold text-sm mb-2">New Abilities</div>
                    {upgrade.newAbilities.map((ability, idx) => (
                      <div key={idx} className="text-gray-300 text-xs">• {ability}</div>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-red-900/30 border border-red-700 rounded-lg p-2 text-center">
                      <div className="text-red-400 text-sm font-bold">+{upgrade.statBoosts.power}</div>
                      <div className="text-gray-400 text-xs">Power</div>
                    </div>
                    <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-2 text-center">
                      <div className="text-blue-400 text-sm font-bold">+{upgrade.statBoosts.defense}</div>
                      <div className="text-gray-400 text-xs">Defense</div>
                    </div>
                    <div className="bg-green-900/30 border border-green-700 rounded-lg p-2 text-center">
                      <div className="text-green-400 text-sm font-bold">{upgrade.statBoosts.speed > 0 ? '+' : ''}{upgrade.statBoosts.speed}</div>
                      <div className="text-gray-400 text-xs">Speed</div>
                    </div>
                  </div>

                  <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-3">
                    <div className="text-yellow-400 font-semibold text-sm mb-2">Visual Changes</div>
                    {upgrade.visualChanges.map((change, idx) => (
                      <div key={idx} className="text-gray-300 text-xs">• {change}</div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Sacred Items Section */}
      {selectedContent === 'items' && (
        <section className="px-4 py-6 relative z-10">
          <h2 className="text-xl font-bold text-white mb-4">⚔️ Sacred Items - Week {currentWeek}</h2>
          <div className="space-y-4">
            {currentContent.sacredItems.map((item, index) => (
              <div key={index} className="bg-gray-800/70 border border-blue-700 rounded-xl p-4">
                <div className="flex items-start space-x-4">
                  <div 
                    className="w-20 h-20 rounded-lg bg-cover bg-center"
                    style={{
                      backgroundImage: `url(https://readdy.ai/api/search-image?query=$%7BencodeURIComponent%28item.image%29%7D&width=80&height=80&seq=${item.id}-icon&orientation=squarish)`
                    }}
                  >
                    <div className="w-full h-full bg-black/20 rounded-lg flex items-center justify-center">
                      <div className="text-2xl">
                        {item.type === 'Weapon' ? '⚔️' : 
                         item.type === 'Armor' ? '🛡️' : 
                         item.type === 'Relic' ? '🔮' : 
                         item.type === 'Essence' ? '💎' : '🔯'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-white font-bold text-lg">{item.name}</div>
                      <div className={`text-xs px-2 py-1 rounded-full border ${getRarityColor(item.rarity)}`}>
                        {item.rarity}
                      </div>
                    </div>
                    
                    <div className="text-blue-400 text-sm mb-2">{item.type}</div>
                    
                    <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-3 mb-3">
                      <div className="text-blue-400 font-semibold text-sm mb-1">Effect</div>
                      <div className="text-gray-300 text-xs">{item.effect}</div>
                    </div>
                    
                    <div className="bg-orange-900/30 border border-orange-700 rounded-lg p-3">
                      <div className="text-orange-400 font-semibold text-sm mb-1">Requirements</div>
                      {item.requirements.map((req, idx) => (
                        <div key={idx} className="text-gray-300 text-xs">• {req}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Weekly Boss Section */}
      {selectedContent === 'boss' && (
        <section className="px-4 py-6 relative z-10">
          <h2 className="text-xl font-bold text-white mb-4">👑 Weekly Boss - Week {currentWeek}</h2>
          <div className="bg-gray-800/70 border-2 border-red-700 rounded-xl p-6">
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">👑</div>
              <div className="text-white font-bold text-2xl mb-2">{currentContent.newBoss.name}</div>
              <div className="text-red-400 text-lg mb-2">{currentContent.newBoss.title}</div>
              <div className={`text-sm px-3 py-1 rounded-full border inline-block ${getRarityColor(currentContent.newBoss.difficulty)}`}>
                {currentContent.newBoss.difficulty} Boss
              </div>
            </div>

            <div 
              className="h-48 rounded-xl bg-cover bg-center mb-6 border-2 border-red-400/50"
              style={{
                backgroundImage: `url(https://readdy.ai/api/search-image?query=$%7BencodeURIComponent%28currentContent.newBoss.image%29%7D&width=350&height=180&seq=${currentContent.newBoss.id}-boss&orientation=landscape)`
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-xl flex items-end p-4">
                <div className="text-center w-full">
                  <div className="text-white font-bold text-lg">{currentContent.newBoss.type}</div>
                  <div className="text-red-300 text-sm">{currentContent.newBoss.location}</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-red-900/30 border border-red-700 rounded-lg p-3 text-center">
                <div className="text-red-400 text-xl font-bold">{currentContent.newBoss.hp.toLocaleString()}</div>
                <div className="text-gray-400 text-sm">Health Points</div>
              </div>
              <div className="bg-orange-900/30 border border-orange-700 rounded-lg p-3 text-center">
                <div className="text-orange-400 text-xl font-bold">{currentContent.newBoss.power.toLocaleString()}</div>
                <div className="text-gray-400 text-sm">Attack Power</div>
              </div>
            </div>

            <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-4 mb-4">
              <div className="text-yellow-400 font-semibold mb-2">👥 Team Requirement: {currentContent.newBoss.teamRequirement} Players</div>
              <div className="text-gray-300 text-sm">This boss requires coordinated team strategy to defeat</div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="text-white font-semibold">Boss Phases:</div>
              {currentContent.newBoss.phases.map((phase, index) => (
                <div key={index} className="bg-purple-900/30 border border-purple-700 rounded-lg p-3">
                  <div className="text-purple-400 font-semibold text-sm mb-1">
                    Phase {phase.phase} ({phase.hpThreshold}% HP)
                  </div>
                  <div className="text-gray-300 text-xs mb-2">{phase.description}</div>
                  <div className="text-gray-400 text-xs">
                    Abilities: {phase.abilities.join(', ')}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-green-900/30 border border-green-700 rounded-lg p-4">
              <div className="text-green-400 font-semibold mb-2">🎁 Victory Rewards</div>
              <div className="grid grid-cols-1 gap-1">
                {currentContent.newBoss.rewards.map((reward, index) => (
                  <div key={index} className="text-gray-300 text-sm">• {reward}</div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* New AR World Section */}
      {selectedContent === 'world' && (
        <section className="px-4 py-6 relative z-10 mb-20">
          <h2 className="text-xl font-bold text-white mb-4">🌍 New AR World - Week {currentWeek}</h2>
          <div className="bg-gray-800/70 border-2 border-green-700 rounded-xl p-6">
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">🌍</div>
              <div className="text-white font-bold text-2xl mb-2">{currentContent.arWorld.name}</div>
              <div className="text-green-400 text-lg mb-2">{currentContent.arWorld.theme}</div>
              <div className="text-gray-300 text-sm">{currentContent.arWorld.environment}</div>
            </div>

            <div 
              className="h-48 rounded-xl bg-cover bg-center mb-6 border-2 border-green-400/50"
              style={{
                backgroundImage: `url(https://readdy.ai/api/search-image?query=$%7BencodeURIComponent%28currentContent.arWorld.image%29%7D&width=350&height=180&seq=${currentContent.arWorld.id}-world&orientation=landscape)`
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-xl flex items-end p-4">
                <div className="text-center w-full">
                  <div className="text-white font-bold text-lg">Immersive AR Environment</div>
                  <div className="text-green-300 text-sm">Explore in augmented reality</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
                <div className="text-blue-400 font-semibold mb-2">🌟 Unique Features</div>
                {currentContent.arWorld.uniqueFeatures.map((feature, index) => (
                  <div key={index} className="text-gray-300 text-sm">• {feature}</div>
                ))}
              </div>

              <div className="bg-purple-900/30 border border-purple-700 rounded-lg p-4">
                <div className="text-purple-400 font-semibold mb-2">👾 Native Monsters</div>
                <div className="flex flex-wrap gap-2">
                  {currentContent.arWorld.nativeMonsters.map((monster, index) => (
                    <div key={index} className="bg-purple-600/30 text-purple-300 text-xs px-2 py-1 rounded-full">
                      {monster}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-orange-900/30 border border-orange-700 rounded-lg p-4">
                <div className="text-orange-400 font-semibold mb-2">⚙️ Special Mechanics</div>
                {currentContent.arWorld.specialMechanics.map((mechanic, index) => (
                  <div key={index} className="text-gray-300 text-sm">• {mechanic}</div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}