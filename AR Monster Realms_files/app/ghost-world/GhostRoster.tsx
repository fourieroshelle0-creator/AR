
'use client';

import { useState } from 'react';

interface Ghost {
  id: string;
  name: string;
  type: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  look: string;
  behavior: string;
  abilities: string[];
  evolution: string[];
  image: string;
  captured: boolean;
  level?: number;
  // Enhanced Horror Sound System
  soundProfile: {
    idleSounds: string[];
    screamTypes: string[];
    attackSounds: string[];
    environmentalAudio: string[];
    hauntingSounds: string[];
    defeatSound: string;
    summonSound: string;
    voiceType: 'Whisper' | 'Scream' | 'Moan' | 'Cackle' | 'Howl' | 'Wail' | 'Hiss';
    horrorLevel: 'Creepy' | 'Scary' | 'Terrifying' | 'Nightmare';
    audioFrequency: string;
    psychologicalEffects: string[];
  };
}

export default function GhostRoster() {
  const [selectedGhost, setSelectedGhost] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'all' | 'captured'>('all');
  const [showSoundPreview, setShowSoundPreview] = useState(false);
  const [selectedSoundGhost, setSelectedSoundGhost] = useState<Ghost | null>(null);

  const ghostRoster: Ghost[] = [
    {
      id: 'shade',
      name: 'Shade',
      type: 'Shadow Spirit',
      rarity: 'Common',
      look: 'Dark shadow-like figure with glowing red eyes',
      behavior: 'Lurks in corners, suddenly rushes at player',
      abilities: ['Fear Drain', 'Shadow Cling'],
      evolution: ['Shade', 'Wraith', 'Revenant'],
      image: 'Dark ethereal shadow figure with piercing glowing red eyes emerging from darkness, translucent black mist form with menacing presence, supernatural entity with flowing dark energy, photorealistic horror aesthetic, spooky atmospheric lighting',
      captured: true,
      level: 12,
      soundProfile: {
        idleSounds: [
          'Soft whispers that seem to come from behind you',
          'Faint scratching sounds like nails on glass',
          'Cold breathing that sends chills down your spine',
          'Distant echoes of forgotten voices'
        ],
        screamTypes: [
          'AHHHHHHHH! - Bone-chilling shriek that makes you jump',
          'Ssssssssss... - Hissing whisper full of malice',
          'You cannot escape me... - Sinister voice echoing around you'
        ],
        attackSounds: [
          'Fear Drain: Psychological screaming + your heartbeat gets louder',
          'Shadow Cling: Grasping sounds + darkness consuming everything',
          'Rush Attack: Sudden wind + terrifying shriek getting closer'
        ],
        environmentalAudio: [
          'Temperature drops with icy breath sounds',
          'Shadows seem to whisper your name',
          'Electronics flicker with supernatural interference'
        ],
        hauntingSounds: [
          'Doors creaking open by themselves',
          'Footsteps following you but no one there',
          'Your own voice calling back to you distorted'
        ],
        defeatSound: 'Fading whisper: "I\'ll be back..." dissolving into silence',
        summonSound: 'Cold wind + multiple whispers + darkness gathering',
        voiceType: 'Whisper',
        horrorLevel: 'Creepy',
        audioFrequency: 'Constant whispers, sudden loud scares every 8-12 seconds',
        psychologicalEffects: [
          'Makes you look over your shoulder',
          'Creates sense of being watched',
          'Builds paranoid anxiety'
        ]
      }
    },
    {
      id: 'poltergeist',
      name: 'Poltergeist',
      type: 'Chaos Spirit',
      rarity: 'Rare',
      look: 'Invisible entity, objects fly around before distorted humanoid appears',
      behavior: 'Throws AR objects at player with violent energy',
      abilities: ['Object Toss', 'Knockback Blast'],
      evolution: ['Poltergeist', 'Chaos Spirit', 'Phantom Overlord'],
      image: 'Angry poltergeist spirit surrounded by floating furniture and electrical sparks, invisible malevolent ghost with telekinetic powers, supernatural phenomenon with intense energy aura, photorealistic 3D rendering with dramatic lighting effects',
      captured: true,
      level: 8,
      soundProfile: {
        idleSounds: [
          'Objects rattling and moving on their own',
          'Electrical buzzing and flickering lights',
          'Sudden banging sounds from nowhere',
          'Dishes breaking and furniture sliding'
        ],
        screamTypes: [
          'CRASH! BANG! - Violent destruction sounds',
          'GET OUT! GET OUT! - Furious shouting ghost voice',
          'Why won\'t you LEAVE?! - Frustrated supernatural yelling'
        ],
        attackSounds: [
          'Object Toss: Items flying + glass breaking + angry yelling',
          'Knockback Blast: Explosion + furniture sliding + evil laughter',
          'Rage Mode: Multiple objects crashing + demented screaming'
        ],
        environmentalAudio: [
          'All electronics go haywire with static',
          'Temperature fluctuates wildly',
          'Lights flicker in angry patterns'
        ],
        hauntingSounds: [
          'Cabinets slamming open and shut',
          'Books flying off shelves',
          'Phone ringing with no one calling'
        ],
        defeatSound: 'Massive crash of everything falling + "NOOOOO!" fading away',
        summonSound: 'Chaos eruption + objects flying + maniacal laughter',
        voiceType: 'Scream',
        horrorLevel: 'Scary',
        audioFrequency: 'Constant chaos sounds, violent outbursts every 5-8 seconds',
        psychologicalEffects: [
          'Makes you afraid to touch anything',
          'Creates feeling of home invasion',
          'Builds rage and frustration anxiety'
        ]
      }
    },
    {
      id: 'veil-maiden',
      name: 'Veil Maiden',
      type: 'Sorrowful Spirit',
      rarity: 'Epic',
      look: 'Ghostly woman in tattered white veil, face hidden until screaming',
      behavior: 'Appears calm, then lunges with terrifying scream',
      abilities: ['Hypnotic Lure', 'Sonic Wail'],
      evolution: ['Veil Maiden', 'Banshee', 'Wailing Queen'],
      image: 'Ghostly woman in flowing tattered white wedding veil with hidden face, ethereal bride spirit with sorrowful aura, supernatural entity in moonlit cemetery, gothic horror aesthetic with misty atmosphere, cinematic quality',
      captured: false,
      soundProfile: {
        idleSounds: [
          'Soft sobbing that tugs at your heart',
          'Wedding music playing faintly in the distance',
          'Gentle humming of a lullaby turned sinister',
          'Silk rustling like a wedding dress'
        ],
        screamTypes: [
          'WAAAAAAAHHHHHHH! - Devastating banshee wail that pierces your soul',
          'Why did you leave me?! - Heartbroken cry that echoes forever',
          'Join me in eternal sorrow! - Hypnotic yet terrifying invitation'
        ],
        attackSounds: [
          'Hypnotic Lure: Beautiful singing that becomes distorted + your vision blurs',
          'Sonic Wail: Glass-shattering scream + phone vibrates violently',
          'Bride\'s Fury: Wedding bells + screaming + veil whipping in wind'
        ],
        environmentalAudio: [
          'Wedding flowers wilting with sad music',
          'Mirror reflections show her pain',
          'Cold tears seem to fall from sky'
        ],
        hauntingSounds: [
          'Wedding bells ringing at midnight',
          'Bridal march playing backwards',
          'Champagne glasses breaking one by one'
        ],
        defeatSound: 'Final heartbroken wail fading to peaceful humming',
        summonSound: 'Bridal music + mournful crying + ethereal appearance',
        voiceType: 'Wail',
        horrorLevel: 'Terrifying',
        audioFrequency: 'Deceptive calm then sudden terrifying screams every 10-15 seconds',
        psychologicalEffects: [
          'Creates deep sadness and empathy',
          'Makes you question love and loss',
          'Builds dread of abandonment'
        ]
      }
    },
    {
      id: 'hauntling',
      name: 'Hauntling',
      type: 'Child Spirit',
      rarity: 'Common',
      look: 'Small child-like shadow with glowing hands',
      behavior: 'Giggles faintly, runs around before attacking',
      abilities: ['Energy Drain', 'Fear Shock'],
      evolution: ['Hauntling', 'Ghast', 'Soul Reaper'],
      image: 'Small child-like shadow spirit with glowing ethereal hands, innocent yet haunting ghostly figure, supernatural child entity with mysterious aura, dark fantasy aesthetic with soft glowing effects, atmospheric horror scene',
      captured: true,
      level: 15,
      soundProfile: {
        idleSounds: [
          'Innocent childlike giggling that becomes unsettling',
          'Playground sounds echoing from nowhere',
          'Tiny footsteps running in circles',
          'Toys playing music boxes by themselves'
        ],
        screamTypes: [
          'Hee hee hee... - Creepy child laughter that never stops',
          'Play with me! - Demanding child voice with sinister undertone',
          'You can\'t hide from me! - Sing-song voice that\'s deeply disturbing'
        ],
        attackSounds: [
          'Energy Drain: Child crying + your energy being sucked away',
          'Fear Shock: Sudden scream + toy breaking + electrical zap',
          'Tag Attack: "You\'re it!" + running footsteps + ghostly tackle'
        ],
        environmentalAudio: [
          'Toys move and play by themselves',
          'Children\'s voices singing nursery rhymes',
          'Balls bouncing down empty hallways'
        ],
        hauntingSounds: [
          'Music box playing in the middle of night',
          'Child calling "Mommy?" from empty rooms',
          'Tricycle wheels squeaking slowly'
        ],
        defeatSound: 'Sad child crying fading to peaceful sleep',
        summonSound: 'Playground laughter + toy sounds + innocent appearance',
        voiceType: 'Cackle',
        horrorLevel: 'Creepy',
        audioFrequency: 'Playful sounds constantly, scary moments every 6-10 seconds',
        psychologicalEffects: [
          'Makes innocent things seem threatening',
          'Creates fear of childhood memories',
          'Builds protective parental instincts'
        ]
      }
    },
    {
      id: 'spectral-hound',
      name: 'Spectral Hound',
      type: 'Beast Spirit',
      rarity: 'Rare',
      look: 'Black skeletal dog with ghostly blue flames',
      behavior: 'Circles player growling, then charges with flames',
      abilities: ['Shadow Bite', 'Flame Howl'],
      evolution: ['Spectral Hound', 'Hellhound', 'Cerberus Phantom'],
      image: 'Black skeletal ghost dog with glowing blue spectral flames, supernatural hellhound with ethereal fire aura, menacing beast spirit with glowing eyes, gothic horror aesthetic with dramatic lighting, photorealistic 3D rendering',
      captured: false,
      soundProfile: {
        idleSounds: [
          'Low supernatural growling that vibrates through you',
          'Paws padding on surfaces that echo from hell',
          'Chains dragging behind invisible collar',
          'Bones clicking together as it moves'
        ],
        screamTypes: [
          'HOOOOOWWWWLLLLL! - Bone-chilling wolf howl from the abyss',
          'GRRRRRRR! - Deep, threatening growl that shakes your core',
          'Death comes for you! - Demonic dog voice with supernatural echo'
        ],
        attackSounds: [
          'Shadow Bite: Vicious snarling + snapping jaws + supernatural chomp',
          'Flame Howl: Demonic howling + blue fire crackling + hellish echo',
          'Charge Attack: Running paws + growing flames + impact roar'
        ],
        environmentalAudio: [
          'Blue flames flicker with hellish sounds',
          'Ground burns with each paw step',
          'Supernatural heat distorts air with sounds'
        ],
        hauntingSounds: [
          'Howling at midnight moon',
          'Scratching at doors that won\'t open',
          'Sniffing and tracking your scent'
        ],
        defeatSound: 'Final howl fading to peaceful dog whimper',
        summonSound: 'Hellish portal + demonic howl + flame eruption',
        voiceType: 'Howl',
        horrorLevel: 'Scary',
        audioFrequency: 'Constant growling, howls every 7-12 seconds',
        psychologicalEffects: [
          'Makes you fear loyal animals turning evil',
          'Creates primal fear of being hunted',
          'Builds anxiety about hellish pursuit'
        ]
      }
    },
    {
      id: 'blood-moon-wraith',
      name: 'Blood Moon Wraith',
      type: 'Legendary Boss',
      rarity: 'Legendary',
      look: 'Towering skeletal figure cloaked in mist with blood-red aura',
      behavior: 'Appears in sky during Blood Moon events, phone-shaking screams',
      abilities: ['Life Drain', 'Terror Wave', 'Soul Lock'],
      evolution: ['Legendary Only'],
      image: 'Massive towering skeletal wraith with blood-red aura floating above city skyline, gigantic supernatural boss entity with flowing dark mist robes, epic horror scene with dramatic crimson lighting, cinematic quality with atmospheric effects',
      captured: false,
      soundProfile: {
        idleSounds: [
          'Ominous blood moon music with orchestral horror',
          'Wind howling through ancient bones',
          'Distant screams of a thousand souls',
          'Reality itself groaning under its presence'
        ],
        screamTypes: [
          'MORTAL SOULS, TREMBLE! - Voice that shakes the entire world',
          'THE BLOOD MOON RISES! - Declaration that fills you with dread',
          'YOUR TIME HAS COME! - Judgment that penetrates your very soul'
        ],
        attackSounds: [
          'Life Drain: Thousands screaming + your life being pulled away',
          'Terror Wave: Reality breaking + psychological horror sounds',
          'Soul Lock: Chains from hell + your soul being imprisoned'
        ],
        environmentalAudio: [
          'Blood moon casts red light with ominous humming',
          'Entire city falls silent in fear',
          'Reality warps with supernatural distortion'
        ],
        hauntingSounds: [
          'Clock towers chiming death tolls',
          'All electronics broadcasting static screams',
          'Every shadow moving independently'
        ],
        defeatSound: 'Reality-shattering death scream echoing across dimensions',
        summonSound: 'Apocalyptic music + dimensional tear + world-ending roar',
        voiceType: 'Moan',
        horrorLevel: 'Nightmare',
        audioFrequency: 'Constant apocalyptic ambiance, world-shaking events every 15-20 seconds',
        psychologicalEffects: [
          'Creates existential dread about death',
          'Makes you question reality itself',
          'Builds fear of cosmic insignificance'
        ]
      }
    },
    {
      id: 'mirror-phantom',
      name: 'Mirror Phantom',
      type: 'Reflection Spirit',
      rarity: 'Epic',
      look: 'Appears only in reflective surfaces, distorted face',
      behavior: 'Manifests in phone screen reflections, reaches out',
      abilities: ['Reality Shift', 'Mirror Trap'],
      evolution: ['Mirror Phantom', 'Glass Wraith', 'Reflection Lord'],
      image: 'Ghostly figure emerging from broken mirror with distorted reflection, supernatural entity with fragmented glass shards floating around, ethereal spirit with silver-blue glow, gothic horror aesthetic with shattered mirror effects',
      captured: true,
      level: 6,
      soundProfile: {
        idleSounds: [
          'Glass tinkling like wind chimes',
          'Your own voice echoing back distorted',
          'Mirror surfaces rippling like water',
          'Reflections whispering secrets'
        ],
        screamTypes: [
          'Look at yourself! - Your own voice but wrong and terrifying',
          'Break the glass! - Distorted plea that sounds like you',
          'Which one is real? - Question that makes you doubt reality'
        ],
        attackSounds: [
          'Reality Shift: Glass breaking + world distorting + your voice screaming',
          'Mirror Trap: Reflections laughing + glass prison + echoing despair',
          'Shard Attack: Glass cutting air + reflections multiplying + confusion'
        ],
        environmentalAudio: [
          'All reflective surfaces show different realities',
          'Mirrors crack when you approach',
          'Your reflection moves independently'
        ],
        hauntingSounds: [
          'Someone knocking from inside mirrors',
          'Your reflection mouthing different words',
          'Glass surfaces fogging with breath from inside'
        ],
        defeatSound: 'All mirrors shattering + your true reflection returning',
        summonSound: 'Mirror surface rippling + glass forming + reflection emerging',
        voiceType: 'Whisper',
        horrorLevel: 'Terrifying',
        audioFrequency: 'Mirror effects constantly, reality breaks every 8-14 seconds',
        psychologicalEffects: [
          'Makes you afraid of your own reflection',
          'Creates doubt about what is real',
          'Builds fear of self-identity'
        ]
      }
    },
    {
      id: 'cemetery-keeper',
      name: 'Cemetery Keeper',
      type: 'Guardian Spirit',
      rarity: 'Epic',
      look: 'Hooded figure with ancient lantern, face hidden in shadows',
      behavior: 'Patrols graveyard locations, judges player worthiness',
      abilities: ['Soul Judge', 'Graveyard Mist'],
      evolution: ['Cemetery Keeper', 'Death Warden', 'Eternal Guardian'],
      image: 'Hooded cemetery keeper spirit holding glowing ancient lantern, mysterious guardian figure in dark robes among tombstones, supernatural protector with ethereal light, gothic graveyard scene with atmospheric fog',
      captured: false,
      soundProfile: {
        idleSounds: [
          'Ancient lantern creaking in the wind',
          'Footsteps crunching on gravel paths',
          'Whispered prayers in forgotten languages',
          'Wind through tombstones carrying voices'
        ],
        screamTypes: [
          'Who disturbs the eternal rest? - Ancient, wise voice filled with authority',
          'Prove your worth, living soul! - Challenge that tests your courage',
          'The dead must not be disturbed! - Warning that carries weight of ages'
        ],
        attackSounds: [
          'Soul Judge: Ancient chanting + your heart being weighed + judgment bell',
          'Graveyard Mist: Fog rising + whispered names + ghostly procession',
          'Lantern Blast: Holy light + protective ward + cleansing fire'
        ],
        environmentalAudio: [
          'Tombstones humming with ancient power',
          'Flowers wilting and blooming in cycles',
          'Ground shifting with restless dead'
        ],
        hauntingSounds: [
          'Church bells tolling at midnight',
          'Mourners crying from different eras',
          'Shovels digging in the distance'
        ],
        defeatSound: 'Respectful bow + lantern dimming + peaceful acceptance',
        summonSound: 'Ancient ritual + lantern lighting + graveyard awakening',
        voiceType: 'Moan',
        horrorLevel: 'Scary',
        audioFrequency: 'Solemn ambiance constantly, judgment moments every 12-18 seconds',
        psychologicalEffects: [
          'Creates respect for death and afterlife',
          'Makes you question your own mortality',
          'Builds reverence for the deceased'
        ]
      }
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'text-gray-400 border-gray-600';
      case 'Rare': return 'text-blue-400 border-blue-600';
      case 'Epic': return 'text-purple-400 border-purple-600';
      case 'Legendary': return 'text-orange-400 border-orange-600';
      default: return 'text-white border-gray-600';
    }
  };

  const getRarityBg = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'bg-gray-600/20';
      case 'Rare': return 'bg-blue-600/20';
      case 'Epic': return 'bg-purple-600/20';
      case 'Legendary': return 'bg-orange-600/20';
      default: return 'bg-gray-600/20';
    }
  };

  const getHorrorLevelColor = (horrorLevel: string) => {
    switch (horrorLevel) {
      case 'Creepy': return 'text-green-400 bg-green-900/30';
      case 'Scary': return 'text-yellow-400 bg-yellow-900/30';
      case 'Terrifying': return 'text-orange-400 bg-orange-900/30';
      case 'Nightmare': return 'text-red-400 bg-red-900/30';
      default: return 'text-gray-400 bg-gray-900/30';
    }
  };

  const handleSoundPreview = (ghost: Ghost) => {
    setSelectedSoundGhost(ghost);
    setShowSoundPreview(true);
  };

  const filteredGhosts = viewMode === 'captured' 
    ? ghostRoster.filter(ghost => ghost.captured)
    : ghostRoster;

  const capturedCount = ghostRoster.filter(ghost => ghost.captured).length;
  const totalCount = ghostRoster.length;

  return (
    <div className="min-h-screen bg-gray-950 pt-20 pb-24">
      {/* Horror Sound Preview Modal */}
      {showSoundPreview && selectedSoundGhost && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-gray-900 border-2 border-red-600 rounded-2xl p-6 max-w-sm w-full max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-4">
              <div className="text-3xl mb-2">👻</div>
              <h3 className="text-xl font-bold text-white mb-2">Horror Sound Profile</h3>
              <p className="text-red-300 text-sm">{selectedSoundGhost.name} Terror Experience</p>
            </div>

            {/* Horror Level & Voice Type */}
            <div className="flex space-x-3 mb-4">
              <div className={`flex-1 text-center py-2 px-3 rounded-lg border text-xs ${getHorrorLevelColor(selectedSoundGhost.soundProfile.horrorLevel)}`}>
                {selectedSoundGhost.soundProfile.horrorLevel}
              </div>
              <div className="flex-1 text-center py-2 px-3 rounded-lg border text-xs bg-purple-900/30 text-purple-300">
                {selectedSoundGhost.soundProfile.voiceType}
              </div>
            </div>

            {/* Audio Frequency */}
            <div className="bg-gray-800/50 rounded-lg p-3 mb-4">
              <div className="text-white font-semibold text-sm mb-1">👻 Terror Frequency</div>
              <div className="text-gray-300 text-xs">{selectedSoundGhost.soundProfile.audioFrequency}</div>
            </div>

            {/* Horror Sound Categories */}
            <div className="space-y-3 mb-4">
              {/* Idle Sounds */}
              <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-3">
                <div className="text-gray-400 font-semibold text-sm mb-2">😴 Haunting Ambiance</div>
                {selectedSoundGhost.soundProfile.idleSounds.map((sound, index) => (
                  <div key={index} className="text-gray-300 text-xs mb-1 flex items-start">
                    <span className="text-gray-400 mr-2">•</span>
                    <span>{sound}</span>
                  </div>
                ))}
              </div>

              {/* Scream Types */}
              <div className="bg-red-900/30 border border-red-700 rounded-lg p-3">
                <div className="text-red-400 font-semibold text-sm mb-2">😱 Terror Screams</div>
                {selectedSoundGhost.soundProfile.screamTypes.map((scream, index) => (
                  <div key={index} className="text-gray-300 text-xs mb-1 flex items-start">
                    <span className="text-red-400 mr-2">•</span>
                    <span>{scream}</span>
                  </div>
                ))}
              </div>

              {/* Attack Sounds */}
              <div className="bg-orange-900/30 border border-orange-700 rounded-lg p-3">
                <div className="text-orange-400 font-semibold text-sm mb-2">⚡ Attack Audio</div>
                {selectedSoundGhost.soundProfile.attackSounds.map((attack, index) => (
                  <div key={index} className="text-gray-300 text-xs mb-1 flex items-start">
                    <span className="text-orange-400 mr-2">•</span>
                    <span>{attack}</span>
                  </div>
                ))}
              </div>

              {/* Haunting Sounds */}
              <div className="bg-purple-900/30 border border-purple-700 rounded-lg p-3">
                <div className="text-purple-400 font-semibold text-sm mb-2">🏚️ Haunting Effects</div>
                {selectedSoundGhost.soundProfile.hauntingSounds.map((haunt, index) => (
                  <div key={index} className="text-gray-300 text-xs mb-1 flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    <span>{haunt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Psychological Effects */}
            <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-3 mb-4">
              <div className="text-blue-400 font-semibold text-sm mb-2">🧠 Psychological Impact</div>
              {selectedSoundGhost.soundProfile.psychologicalEffects.map((effect, index) => (
                <div key={index} className="text-gray-300 text-xs mb-1 flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>{effect}</span>
                </div>
              ))}
            </div>

            {/* Special Sounds */}
            <div className="bg-green-900/30 border border-green-700 rounded-lg p-3 mb-4">
              <div className="text-green-400 font-semibold text-sm mb-2">✨ Special Audio Events</div>
              <div className="space-y-1 text-xs">
                <div className="text-gray-300"><span className="text-yellow-400">👻 Summon:</span> {selectedSoundGhost.soundProfile.summonSound}</div>
                <div className="text-gray-300"><span className="text-red-400">💀 Defeat:</span> {selectedSoundGhost.soundProfile.defeatSound}</div>
              </div>
            </div>

            {/* Preview Buttons */}
            <div className="space-y-2 mb-4">
              <button className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg text-sm">
                👻 Preview Haunting Sounds
              </button>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm">
                😱 Preview Terror Scream
              </button>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-sm">
                🏚️ Test Paranormal Activity
              </button>
            </div>

            <button
              className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg"
              onClick={() => setShowSoundPreview(false)}
            >
              Close Horror Preview
            </button>
          </div>
        </div>
      )}

      {/* Header Stats */}
      <section className="px-4 py-6">
        <div className="bg-gray-800/70 border border-purple-700/50 rounded-xl p-4 mb-6">
          <div className="text-center">
            <div className="text-3xl mb-2">📖</div>
            <div className="text-white font-bold text-xl">Ghost Codex</div>
            <div className="text-purple-400 text-sm">Horror Sound & Scream System</div>
            <div className="text-gray-300 text-sm mt-2">
              {capturedCount} / {totalCount} Captured ({Math.round((capturedCount / totalCount) * 100)}%)
            </div>
            <div className="bg-gray-700 rounded-full h-2 mt-2">
              <div 
                className="bg-gradient-to-r from-purple-600 to-purple-400 h-2 rounded-full"
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
              viewMode === 'all'
                ? 'bg-purple-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            All Ghosts ({totalCount})
          </button>
          <button
            onClick={() => setViewMode('captured')}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
              viewMode === 'captured'
                ? 'bg-purple-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Captured ({capturedCount})
          </button>
        </div>
      </section>

      {/* Ghost Grid */}
      <section className="px-4">
        <div className="grid grid-cols-1 gap-4">
          {filteredGhosts.map((ghost) => (
            <div
              key={ghost.id}
              className={`bg-gray-800/70 border-2 rounded-xl p-4 cursor-pointer transition-all ${
                selectedGhost === ghost.id
                  ? `${getRarityColor(ghost.rarity).split(' ')[1]} bg-opacity-30`
                  : 'border-gray-700 hover:border-gray-600'
              } ${!ghost.captured ? 'opacity-60' : ''}`}
              onClick={() => setSelectedGhost(selectedGhost === ghost.id ? null : ghost.id)}
            >
              <div className="flex items-start space-x-4">
                <div className="relative">
                  <div
                    className="w-20 h-20 rounded-xl bg-cover bg-center flex-shrink-0"
                    style={{
                      backgroundImage: `url(https://readdy.ai/api/search-image?query=$%7Bghost.image%7D&width=80&height=80&seq=${ghost.id}-roster&orientation=squarish)`,
                    }}
                  >
                    <div className={`w-full h-full rounded-xl ${getRarityBg(ghost.rarity)}`}>
                      {!ghost.captured && (
                        <div className="w-full h-full bg-black/60 rounded-xl flex items-center justify-center">
                          <i className="ri-question-mark text-gray-400 text-2xl"></i>
                        </div>
                      )}
                    </div>
                  </div>
                  {ghost.captured && ghost.level && (
                    <div className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                      {ghost.level}
                    </div>
                  )}
                  {/* Horror Level Indicator */}
                  {ghost.captured && (
                    <div className={`absolute top-0 left-0 text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse ${getHorrorLevelColor(ghost.soundProfile.horrorLevel).split(' ')[1]}`}>
                      👻
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className={`font-bold ${getRarityColor(ghost.rarity).split(' ')[0]}`}>
                      {ghost.captured ? ghost.name : '???'}
                    </div>
                    {ghost.captured && (
                      <div className="flex items-center space-x-1">
                        <div className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                          Captured
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="text-gray-400 text-sm mb-1">
                    {ghost.captured ? ghost.type : 'Unknown Type'}
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className={`text-xs px-2 py-1 rounded-full inline-block border ${getRarityColor(ghost.rarity)}`}>
                      {ghost.rarity}
                    </div>
                    {ghost.captured && (
                      <div className={`text-xs px-2 py-1 rounded-full ${getHorrorLevelColor(ghost.soundProfile.horrorLevel)}`}>
                        {ghost.soundProfile.horrorLevel}
                      </div>
                    )}
                    {ghost.captured && (
                      <div className="text-xs px-2 py-1 rounded-full bg-gray-600/30 text-gray-300">
                        {ghost.soundProfile.voiceType}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {selectedGhost === ghost.id && ghost.captured && (
                <div className="mt-4 pt-4 border-t border-gray-700 space-y-4">
                  {/* Description */}
                  <div>
                    <div className="text-white font-semibold mb-2">Appearance</div>
                    <div className="text-gray-300 text-sm">{ghost.look}</div>
                  </div>

                  {/* AR Behavior */}
                  <div>
                    <div className="text-white font-semibold mb-2">AR Behavior</div>
                    <div className="text-gray-300 text-sm">{ghost.behavior}</div>
                  </div>

                  {/* Horror Sound Profile */}
                  <div>
                    <div className="text-white font-semibold mb-2">👻 Horror Audio Profile</div>
                    <div className="bg-red-900/30 border border-red-700 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-red-400 font-semibold text-sm">Terror Level</div>
                        <div className={`text-xs px-2 py-1 rounded-full ${getHorrorLevelColor(ghost.soundProfile.horrorLevel)}`}>
                          {ghost.soundProfile.horrorLevel}
                        </div>
                      </div>
                      <div className="text-gray-300 text-xs mb-2">
                        Voice: {ghost.soundProfile.voiceType} • {ghost.soundProfile.audioFrequency}
                      </div>
                      <div className="space-y-1 text-xs">
                        <div className="text-gray-400">👻 Haunting: {ghost.soundProfile.idleSounds[0]}</div>
                        <div className="text-red-400">😱 Scream: {ghost.soundProfile.screamTypes[0]}</div>
                      </div>
                      <button
                        onClick={() => handleSoundPreview(ghost)}
                        className="w-full mt-2 bg-red-600 hover:bg-red-700 text-white py-1 rounded text-xs"
                      >
                        🎧 Full Horror Preview
                      </button>
                    </div>
                  </div>

                  {/* Psychological Effects */}
                  <div>
                    <div className="text-white font-semibold mb-2">🧠 Psychological Impact</div>
                    <div className="space-y-1">
                      {ghost.soundProfile.psychologicalEffects.map((effect, index) => (
                        <div key={index} className="text-blue-300 text-xs bg-blue-900/20 px-2 py-1 rounded border border-blue-700/30">
                          {effect}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Abilities */}
                  <div>
                    <div className="text-white font-semibold mb-2">Abilities</div>
                    <div className="flex flex-wrap gap-2">
                      {ghost.abilities.map((ability, index) => (
                        <span
                          key={index}
                          className="bg-purple-600/30 text-purple-300 text-xs px-3 py-1 rounded-full border border-purple-600/50"
                        >
                          {ability}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Evolution Chain */}
                  <div>
                    <div className="text-white font-semibold mb-2">Evolution Path</div>
                    <div className="flex items-center space-x-2">
                      {ghost.evolution.map((stage, index) => (
                        <div key={index} className="flex items-center">
                          <div className={`text-xs px-2 py-1 rounded-full ${
                            index === 0 ? 'bg-green-600/30 text-green-300 border border-green-600/50' : 'bg-gray-600/30 text-gray-400 border border-gray-600/50'
                          }`}>
                            {stage}
                          </div>
                          {index < ghost.evolution.length - 1 && (
                            <i className="ri-arrow-right-line text-gray-400 mx-1"></i>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 pt-2">
                    <button 
                      onClick={() => handleSoundPreview(ghost)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm"
                    >
                      👻 Horror Audio
                    </button>
                    {ghost.rarity !== 'Legendary' && (
                      <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-sm font-semibold">
                        Evolve
                      </button>
                    )}
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-semibold">
                      Battle
                    </button>
                    <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm">
                      Release
                    </button>
                  </div>
                </div>
              )}

              {selectedGhost === ghost.id && !ghost.captured && (
                <div className="mt-4 pt-4 border-t border-gray-700 text-center">
                  <div className="text-gray-400 text-sm mb-3">
                    This ghost hasn't been captured yet. Find it in the wild!
                  </div>
                  <div className="text-gray-500 text-xs mb-3">
                    Hint: Look for {ghost.type.toLowerCase()} entities in {
                      ghost.rarity === 'Legendary' ? 'special raid events' :
                      ghost.rarity === 'Epic' ? 'sacred locations' :
                      ghost.rarity === 'Rare' ? 'abandoned buildings' : 'residential areas'
                    }
                  </div>
                  <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-3 mb-3">
                    <div className="text-red-400 font-semibold text-sm mb-1">👻 Horror Experience</div>
                    <div className="text-gray-300 text-xs">
                      When captured, this ghost will bring its full terror arsenal with realistic screams and psychological horror effects.
                    </div>
                  </div>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                    👻 Start Hunt
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Collection Stats */}
      <section className="px-4 py-6">
        <div className="bg-gray-800/50 rounded-xl p-4">
          <h3 className="text-white font-bold mb-3">Collection Progress</h3>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-gray-400 text-lg font-bold">
                {ghostRoster.filter(g => g.rarity === 'Common' && g.captured).length}
              </div>
              <div className="text-gray-500 text-xs">Common</div>
            </div>
            <div>
              <div className="text-blue-400 text-lg font-bold">
                {ghostRoster.filter(g => g.rarity === 'Rare' && g.captured).length}
              </div>
              <div className="text-gray-500 text-xs">Rare</div>
            </div>
            <div>
              <div className="text-purple-400 text-lg font-bold">
                {ghostRoster.filter(g => g.rarity === 'Epic' && g.captured).length}
              </div>
              <div className="text-gray-500 text-xs">Epic</div>
            </div>
            <div>
              <div className="text-orange-400 text-lg font-bold">
                {ghostRoster.filter(g => g.rarity === 'Legendary' && g.captured).length}
              </div>
              <div className="text-gray-500 text-xs">Legendary</div>
            </div>
          </div>
        </div>
      </section>

      {/* Horror Audio System Info */}
      <section className="px-4 py-6 mb-20">
        <div className="bg-gray-800/50 rounded-xl p-4">
          <h3 className="text-white font-bold mb-3">👻 Horror Audio System</h3>
          
          <div className="grid grid-cols-1 gap-4 mb-4">
            <div className="bg-red-900/30 border border-red-700 rounded-lg p-3">
              <div className="text-red-400 font-semibold text-sm mb-2">😱 Terror Features</div>
              <div className="text-gray-300 text-xs space-y-1">
                <div>• Realistic screams and horror sound effects</div>
                <div>• Psychological audio that builds genuine fear</div>
                <div>• Environmental haunting with spatial audio</div>
                <div>• Phone vibration sync with terror moments</div>
                <div>• Adaptive horror levels based on ghost type</div>
              </div>
            </div>

            <div className="bg-purple-900/30 border border-purple-700 rounded-lg p-3">
              <div className="text-purple-400 font-semibold text-sm mb-2">🔊 Voice Categories</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="text-gray-300">Whisper: Creepy, unsettling voices</div>
                <div className="text-gray-300">Scream: Loud, terrifying outbursts</div>
                <div className="text-gray-300">Moan: Deep, sorrowful sounds</div>
                <div className="text-gray-300">Cackle: Maniacal, disturbing laughs</div>
                <div className="text-gray-300">Howl: Primal, bone-chilling calls</div>
                <div className="text-gray-300">Hiss: Sharp, threatening sounds</div>
              </div>
            </div>

            <div className="bg-orange-900/30 border border-orange-700 rounded-lg p-3">
              <div className="text-orange-400 font-semibold text-sm mb-2">🏚️ Paranormal Effects</div>
              <div className="text-gray-300 text-xs space-y-1">
                <div>• Objects moving with realistic sound effects</div>
                <div>• Electronic interference and static</div>
                <div>• Temperature changes with audio cues</div>
                <div>• Mirror and reflection distortions</div>
              </div>
            </div>
          </div>

          <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-3">
            <div className="text-blue-400 font-semibold text-sm mb-2">🧠 Psychological Horror</div>
            <div className="text-gray-300 text-xs space-y-1">
              <div>• Each ghost creates specific psychological responses</div>
              <div>• Sound design that triggers primal fears</div>
              <div>• Builds tension through audio timing and silence</div>
              <div>• Creates lasting impression and memorable encounters</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
