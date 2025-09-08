
'use client';

import { useState } from 'react';

interface CardDesign {
  id: string;
  name: string;
  type: 'blank' | 'relic';
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Divine';
  element?: string;
  visualStyle: {
    material: string;
    surface: string;
    frame: string;
    centerpiece: string;
    arEffects: string[];
    lighting: string;
  };
  symbology: {
    runePattern: string;
    elements: string[];
    specialMarks: string[];
  };
  tactileFeel: {
    texture: string;
    weight: string;
    temperature: string;
    hapticFeedback: string;
  };
  transformationEffect?: {
    trigger: string;
    sequence: string[];
    duration: string;
  };
  monster?: {
    name: string;
    element: string;
    artwork: string;
    stats: {
      power: number;
      defense: number;
      level: number;
    };
    holographicEffects: string[];
    frameDesign: string;
  };
}

export default function CardDesignConcepts() {
  const [selectedCard, setSelectedCard] = useState<string>('blank-basic');
  const [viewMode, setViewMode] = useState<'design' | 'ar-preview' | 'transformation'>('design');
  const [showTechnicalSpecs, setShowTechnicalSpecs] = useState(false);
  const [showTransformationDemo, setShowTransformationDemo] = useState(false);
  const [transformationStep, setTransformationStep] = useState(0);

  const cardDesigns: CardDesign[] = [
    // BLANK CARDS (Pre-Capture)
    {
      id: 'blank-basic',
      name: 'Basic Blank Card',
      type: 'blank',
      rarity: 'Common',
      visualStyle: {
        material: 'Polished silver mirror finish - highly reflective like liquid metal',
        surface: 'Pure mirror reflection with faint mist swirling beneath glass surface',
        frame: 'Simple etched silver border with minimalist geometric patterns',
        centerpiece: 'Ghost-like ripples waiting for monster essence, completely reflective',
        arEffects: ['Light bends and ripples across surface', 'Responds to nearby monster energy', 'Runes pulse when capture-ready'],
        lighting: 'Reflects ambient light with ethereal shimmer, creates rainbow prismatic effects'
      },
      symbology: {
        runePattern: 'Four corner runes representing the cardinal elements',
        elements: ['Universal binding sigil in center', 'Infinity loop at bottom for endless potential'],
        specialMarks: ['Crescent moon mark for night captures', 'Solar dot for day captures']
      },
      tactileFeel: {
        texture: 'Smooth glass-like surface with subtle raised rune borders',
        weight: 'Surprisingly heavy for its size - feels substantial and magical',
        temperature: 'Cool to touch, warms slightly when held',
        hapticFeedback: 'Gentle vibration when monster detected, stronger pulse when capture ready'
      },
      transformationEffect: {
        trigger: 'Monster capture completion',
        sequence: [
          'Mirror surface begins to crack like glass',
          'Cracks spread outward in web pattern', 
          'Surface shatters with brilliant light flash',
          'Monster artwork burns into reformed surface',
          'New elemental frame materializes around edges',
          'Card pulses with monster\'s elemental energy'
        ],
        duration: '3-4 seconds'
      }
    },

    // SUMMON RELICS (Post-Capture) - Enhanced with your specifications
    {
      id: 'relic-flare-drake',
      name: 'Flare Drake Summon Relic',
      type: 'relic',
      rarity: 'Rare',
      element: 'Fire',
      visualStyle: {
        material: 'No longer reflective - now displays detailed holographic monster artwork',
        surface: 'Semi-3D holographic dragon that shifts when card is tilted',
        frame: 'Jagged edges glowing red/orange with cracked magma texture',
        centerpiece: 'Flare Drake artwork with living flame effects that flicker constantly',
        arEffects: ['Dragon blinks and roars inside card when viewed in AR', 'Frame pulses when ready to summon', 'Heat shimmer effects around edges'],
        lighting: 'Glows like hot coals with pulsing magma veins, flickers with flame-like intensity'
      },
      symbology: {
        runePattern: 'Draconic fire script spelling dragon\'s true name around border',
        elements: ['Flame spiral in corners', 'Dragon sigil at bottom', 'Volcano symbol for birthplace'],
        specialMarks: ['Three flame tongues for past/present/future', 'Phoenix feather for rebirth', 'Solar crown for fire mastery']
      },
      tactileFeel: {
        texture: 'Warm surface with raised magma texture, jagged frame edges',
        weight: 'Substantial weight suggesting contained volcanic power',
        temperature: 'Noticeably warm to touch, comforting heat',
        hapticFeedback: 'Gentle pulsing like slow dragon heartbeat, rumbles during summon'
      },
      monster: {
        name: 'Flare Drake',
        element: 'Fire',
        artwork: 'Young dragon with molten lava veins, breathing small flames, crystalline scales',
        stats: {
          power: 2400,
          defense: 1800,
          level: 18
        },
        holographicEffects: [
          'Dragon shifts position when card tilted',
          'Eyes follow viewer movement',
          'Small flames flicker from nostrils',
          'Wings spread and fold subtly',
          'Lava veins pulse with heartbeat rhythm'
        ],
        frameDesign: 'Jagged volcanic rock edges with glowing orange/red cracks, magma texture that looks molten'
      }
    },
    {
      id: 'relic-stone-golem',
      name: 'Stone Golem Summon Relic',
      type: 'relic',  
      rarity: 'Epic',
      element: 'Earth',
      visualStyle: {
        material: 'Stone-carved surface with living moss growing on frame edges',
        surface: 'Semi-3D holographic golem that shifts between sitting and standing poses',
        frame: 'Stone-carved border with actual moss and glowing yellow runes',
        centerpiece: 'Massive rocky guardian with glowing crystal heart visible in chest',
        arEffects: ['Golem blinks slowly and nods when viewed in AR', 'Crystal heart pulses with ancient power', 'Moss sways gently in unfelt breeze'],
        lighting: 'Soft blue crystal glow from within stone, earthy moss-green highlights'
      },
      symbology: {
        runePattern: 'Ancient civilization protective ward script carved deep',
        elements: ['Mountain peaks in corners', 'Tree roots connecting all elements', 'Crystal formations'],
        specialMarks: ['Guardian shield symbol', 'Eternal watch eye', 'Flowering vine for life']
      },
      tactileFeel: {
        texture: 'Rough stone surface with actual living moss patches, smooth crystal inlays',
        weight: 'Impressively heavy like holding piece of mountain',
        temperature: 'Cool stone with warm crystal heart area',
        hapticFeedback: 'Deep rumbling vibration like distant earthquake'
      },
      monster: {
        name: 'Stone Golem',
        element: 'Earth',
        artwork: 'Massive granite guardian with crystal veins and moss, ancient protective runes',
        stats: {
          power: 2100,
          defense: 3200,
          level: 22
        },
        holographicEffects: [
          'Slowly shifts between protective stances',
          'Crystal heart brightens when tilted',
          'Moss grows visibly over time',
          'Ancient runes glow in sequence',
          'Eyes track viewer with ancient wisdom'
        ],
        frameDesign: 'Weathered stone border with actual moss growth, yellow runic inscriptions that glow softly'
      }
    },
    {
      id: 'relic-aero-serpent',
      name: 'Aero Serpent Summon Relic',
      type: 'relic',
      rarity: 'Rare',
      element: 'Air',
      visualStyle: {
        material: 'Ethereal surface showing wind currents and mist patterns',
        surface: 'Semi-3D holographic serpent coiling through air currents',
        frame: 'Wispy silver-gray swirls with faint blue lightning flickers',
        centerpiece: 'Serpentine dragon made of visible wind currents and mist',
        arEffects: ['Serpent flows gracefully through air when viewed in AR', 'Lightning crackles along frame edges', 'Mist trails follow card movement'],
        lighting: 'Ethereal blue-white glow with crackling lightning highlights'
      },
      symbology: {
        runePattern: 'Wind script that seems to flow and change in breeze',
        elements: ['Storm clouds in corners', 'Lightning bolt center', 'Wind spiral motifs'],
        specialMarks: ['Thunder crown', 'Storm eye symbol', 'Feather of freedom']
      },
      tactileFeel: {
        texture: 'Smooth surface with raised wind current patterns',
        weight: 'Surprisingly light, feels like it might float away',
        temperature: 'Cool with occasional warm air currents',
        hapticFeedback: 'Gentle breezy vibration like wind through fingers'
      },
      monster: {
        name: 'Aero Serpent',
        element: 'Air',
        artwork: 'Long serpentine dragon made of wind currents with sparkling blue eyes',
        stats: {
          power: 1800,
          defense: 1200,
          level: 16
        },
        holographicEffects: [
          'Coils through visible air currents',
          'Body becomes more/less transparent',
          'Lightning flickers along serpentine form',
          'Eyes sparkle like distant stars',
          'Tail creates small whirlwind effects'
        ],
        frameDesign: 'Wispy silver swirls with blue lightning that actually flickers and moves'
      }
    },
    {
      id: 'relic-runeborn-knight',
      name: 'Runeborn Knight Summon Relic',
      type: 'relic',
      rarity: 'Epic',
      element: 'Light',
      visualStyle: {
        material: 'Radiant surface that glows with inner divine light',
        surface: 'Semi-3D holographic knight in shining armor with glowing sword',
        frame: 'Golden border with radiant white lines like stained glass windows',
        centerpiece: 'Noble knight standing tall with glowing runic sword raised',
        arEffects: ['Knight salutes respectfully when viewed in AR', 'Sword glows brighter during day', 'Armor reflects divine radiance'],
        lighting: 'Brilliant golden radiance like captured sunlight, warming and inspiring'
      },
      symbology: {
        runePattern: 'Divine script of creation around border in flowing gold',
        elements: ['Sun emblems in corners', 'Infinity flames', 'Sacred geometry patterns'],
        specialMarks: ['Crown of stars', 'Eternal flame symbol', 'Shield of honor']
      },
      tactileFeel: {
        texture: 'Smooth with raised golden details that feel warm',
        weight: 'Perfectly balanced, feels righteous in hand',
        temperature: 'Divinely warm, fills holder with sense of hope',
        hapticFeedback: 'Gentle harmonious vibration like distant angelic chorus'
      },
      monster: {
        name: 'Runeborn Knight',
        element: 'Light',
        artwork: 'Humanoid knight in silver armor with glowing golden runes and radiant sword',
        stats: {
          power: 2200,
          defense: 2400,
          level: 20
        },
        holographicEffects: [
          'Raises sword in noble salute',
          'Runes pulse in sequence across armor',
          'Shield reflects divine light',
          'Cape flows with ethereal energy',
          'Eyes emit gentle golden glow'
        ],
        frameDesign: 'Golden stained glass pattern with radiant white lines that actually glow'
      }
    },
    {
      id: 'relic-umbra-fiend',
      name: 'Umbra Fiend Summon Relic',
      type: 'relic',
      rarity: 'Epic',
      element: 'Shadow',
      visualStyle: {
        material: 'Dark surface with purple cracks that seem to leak shadowy mist',
        surface: 'Semi-3D holographic imp that phases between solid and smoke',
        frame: 'Black frame with purple cracks, actual smoke tendrils leaking from edges',
        centerpiece: 'Mischievous imp that grins and changes pose when viewed',
        arEffects: ['Fiend grins and waves when viewed in AR', 'Smoke tendrils reach toward viewer', 'Occasionally phases out of sight'],
        lighting: 'Absorbs light creating shadow aura, purple cracks glow ominously'
      },
      symbology: {
        runePattern: 'Chaos script that seems to writhe and change when observed',
        elements: ['Inverted pentagram corners', 'Bat wing motifs', 'Crescent moon and void star'],
        specialMarks: ['Grinning imp face', 'Smoke spiral for mischief', 'Purple eye for shadow sight']
      },
      tactileFeel: {
        texture: 'Smooth with raised shadow patterns, mysteriously cool',
        weight: 'Surprisingly light, as if partially incorporeal',
        temperature: 'Unnaturally cold, draws heat from surroundings',
        hapticFeedback: 'Irregular mischievous vibrations, playful tapping sensations'
      },
      monster: {
        name: 'Umbra Fiend',
        element: 'Shadow',
        artwork: 'Small imp-like demon with purple energy cracks, shifting between solid and smoke',
        stats: {
          power: 2600,
          defense: 1600,
          level: 20
        },
        holographicEffects: [
          'Phases between solid and smoke form',
          'Grins mischievously at viewer',
          'Purple cracks pulse with dark energy',
          'Occasionally disappears then reappears',
          'Shadow tendrils writhe around form'
        ],
        frameDesign: 'Black obsidian frame with actual purple cracks that leak real shadow mist'
      }
    }
  ];

  const transformationSequence = [
    {
      step: 0,
      title: "Mirror Surface",
      description: "Pristine reflective Blank Card ready for capture",
      visual: "Perfect mirror finish reflecting environment"
    },
    {
      step: 1, 
      title: "Monster Absorbed",
      description: "Monster essence flows into mirror surface",
      visual: "Faint monster silhouette appears in reflection"
    },
    {
      step: 2,
      title: "Cracks Appear",
      description: "Mirror surface begins to fracture like glass",
      visual: "Web of cracks spreads across reflective surface"
    },
    {
      step: 3,
      title: "Surface Shatters",
      description: "Mirror explodes in brilliant flash of light",
      visual: "Brilliant white flash, shards of light flying"
    },
    {
      step: 4,
      title: "Artwork Burns In",
      description: "Monster artwork burns into reformed surface",
      visual: "Detailed holographic monster art appears"
    },
    {
      step: 5,
      title: "Frame Transforms",
      description: "New elemental frame materializes around edges",
      visual: "Element-specific border glows into existence"
    },
    {
      step: 6,
      title: "Summon Relic Complete",
      description: "Card pulses with monster's elemental energy",
      visual: "Final glowing Summon Relic ready for battle"
    }
  ];

  const elementFrameDesigns = [
    {
      element: 'Fire',
      emoji: '🔥',
      design: 'Jagged edges glowing red/orange, cracked magma texture',
      effects: 'Molten lava veins pulse, heat shimmer distortion',
      color: 'from-red-500 to-orange-600'
    },
    {
      element: 'Earth', 
      emoji: '⛰️',
      design: 'Stone-carved border, moss & glowing yellow runes',
      effects: 'Living moss growth, crystal veins glow',
      color: 'from-green-500 to-emerald-600'
    },
    {
      element: 'Air',
      emoji: '🌪️', 
      design: 'Wispy silver-gray swirls, faint blue lightning flickers',
      effects: 'Wind currents visible, lightning crackles',
      color: 'from-gray-400 to-blue-500'
    },
    {
      element: 'Light',
      emoji: '✨',
      design: 'Golden border, radiant white lines like stained glass',
      effects: 'Divine radiance, holy light beams',
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      element: 'Shadow',
      emoji: '🌑',
      design: 'Black frame with purple cracks, smoke tendrils leaking',
      effects: 'Shadow mist seeps out, purple energy pulses',
      color: 'from-purple-500 to-purple-700'
    }
  ];

  const starterRelicExamples = [
    {
      name: 'Flare Drake',
      element: 'Fire',
      description: 'Fiery dragon artwork with glowing magma border that actually feels warm',
      specialEffect: 'Dragon breathes small flames, eyes track viewer'
    },
    {
      name: 'Stone Golem', 
      element: 'Earth',
      description: 'Massive rocky body etched into card with stone-carved border and real moss',
      specialEffect: 'Golem shifts stance, crystal heart pulses with ancient power'
    },
    {
      name: 'Aero Serpent',
      element: 'Air', 
      description: 'Serpent coiling across card face with wispy border and lightning',
      specialEffect: 'Serpent flows through visible wind currents'
    },
    {
      name: 'Runeborn Knight',
      element: 'Light',
      description: 'Silver knight standing tall with golden radiant stained glass frame',
      specialEffect: 'Knight salutes viewer, armor reflects divine light'
    },
    {
      name: 'Umbra Fiend',
      element: 'Shadow',
      description: 'Creepy imp grinning with shadowy border leaking real smoke',
      specialEffect: 'Imp phases between solid and smoke, grins mischievously'
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'from-gray-400 to-gray-600 border-gray-500';
      case 'Rare': return 'from-blue-400 to-blue-600 border-blue-500';
      case 'Epic': return 'from-purple-400 to-purple-600 border-purple-500';
      case 'Legendary': return 'from-orange-400 to-orange-600 border-orange-500';
      case 'Divine': return 'from-pink-400 to-yellow-400 border-pink-500';
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
      case 'Air': return 'from-gray-400 to-blue-500';
      default: return 'from-gray-500 to-gray-700';
    }
  };

  const selectedCardData = cardDesigns.find(card => card.id === selectedCard)!;

  const startTransformationDemo = () => {
    setShowTransformationDemo(true);
    setTransformationStep(0);
    
    const interval = setInterval(() => {
      setTransformationStep(prev => {
        if (prev >= transformationSequence.length - 1) {
          clearInterval(interval);
          setTimeout(() => setShowTransformationDemo(false), 2000);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
  };

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
            <span className="text-white font-semibold">Card Transformation System</span>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowTechnicalSpecs(!showTechnicalSpecs)}
              className="text-white text-sm"
            >
              {showTechnicalSpecs ? '🎨' : '📋'}
            </button>
          </div>
        </div>
      </header>

      {/* Transformation Demo Modal */}
      {showTransformationDemo && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-gray-900 border-2 border-purple-600 rounded-2xl p-6 max-w-sm w-full">
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">✨</div>
              <h3 className="text-2xl font-bold text-white mb-2">Card Transformation</h3>
              <p className="text-purple-300 text-sm">Blank Card → Summon Relic</p>
            </div>

            <div className="mb-6">
              <div className={`w-48 h-72 rounded-2xl mx-auto relative overflow-hidden transition-all duration-1000 ${
                transformationStep <= 3 ? 'bg-gradient-to-br from-gray-300 to-gray-400' : 
                'bg-gradient-to-br from-red-500 to-orange-600'
              }`}>
                {transformationStep <= 1 && (
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/30 to-transparent transform rotate-45 animate-pulse"></div>
                )}
                
                {transformationStep === 2 && (
                  <div className="absolute inset-0">
                    <div className="absolute inset-4 border-8 border-white/50" style={{
                      borderStyle: 'solid',
                      borderImage: 'repeating-linear-gradient(45deg, transparent, transparent 5px, white 5px, white 10px) 8'
                    }}></div>
                  </div>
                )}
                
                {transformationStep === 3 && (
                  <div className="absolute inset-0 bg-white animate-ping"></div>
                )}
                
                {transformationStep >= 4 && (
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(https://readdy.ai/api/search-image?query=Young%20fire%20dragon%20with%20molten%20lava%20veins%20and%20crystalline%20scales%2C%20epic%20monster%20card%20artwork%20with%20flames%2C%20detailed%20fantasy%20creature%20portrait%20with%20volcanic%20background&width=180&height=270&seq=transformation-drake&orientation=portrait)`
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-center">
                      <div className="text-white font-bold">Flare Drake</div>
                      <div className="text-red-300 text-xs">Fire Dragon • Lv.18</div>
                    </div>
                  </div>
                )}
                
                {transformationStep >= 5 && (
                  <div className="absolute -inset-2 border-4 border-red-400 rounded-3xl animate-pulse" style={{
                    borderImage: 'repeating-linear-gradient(45deg, #f87171, #fb923c, #f87171) 4',
                    filter: 'drop-shadow(0 0 20px rgba(248, 113, 113, 0.6))'
                  }}></div>
                )}
              </div>
            </div>

            <div className="text-center mb-4">
              <div className="text-purple-400 font-bold text-lg mb-2">
                {transformationSequence[transformationStep]?.title}
              </div>
              <div className="text-gray-300 text-sm">
                {transformationSequence[transformationStep]?.description}
              </div>
            </div>

            <div className="flex justify-center space-x-1 mb-4">
              {transformationSequence.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index <= transformationStep ? 'bg-purple-400' : 'bg-gray-600'
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* View Mode Toggle */}
      <section className="pt-20 px-4 py-4 relative z-10">
        <div className="flex bg-gray-800/50 rounded-xl p-1 mb-6">
          <button
            onClick={() => setViewMode('design')}
            className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all ${
              viewMode === 'design' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            🎨 Design Details
          </button>
          <button
            onClick={() => setViewMode('transformation')}
            className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all ${
              viewMode === 'transformation' ? 'bg-orange-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            ✨ Transformation
          </button>
          <button
            onClick={() => setViewMode('ar-preview')}
            className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all ${
              viewMode === 'ar-preview' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            📱 AR Effects
          </button>
        </div>
      </section>

      {viewMode === 'transformation' && (
        <>
          {/* Transformation Overview */}
          <section className="px-4 py-6 relative z-10">
            <div className="bg-gradient-to-r from-purple-900/50 to-orange-900/50 border-2 border-purple-500 rounded-2xl p-6 mb-6">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">⚡</div>
                <h2 className="text-2xl font-bold text-white mb-2">Blank Card → Summon Relic</h2>
                <p className="text-purple-300 text-sm">The magical transformation process</p>
              </div>
              
              <button
                onClick={startTransformationDemo}
                className="w-full bg-gradient-to-r from-purple-600 to-orange-600 hover:from-purple-700 hover:to-orange-700 text-white py-3 rounded-lg font-bold text-lg"
              >
                🎬 Watch Transformation Demo
              </button>
            </div>
          </section>

          {/* Transformation Steps */}
          <section className="px-4 py-6 relative z-10">
            <h3 className="text-white font-bold mb-4">🔄 Transformation Sequence</h3>
            <div className="space-y-3">
              {transformationSequence.map((step, index) => (
                <div key={index} className="bg-gray-800/70 border border-gray-700 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center font-bold text-white text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-semibold text-sm mb-1">{step.title}</div>
                      <div className="text-gray-300 text-xs mb-2">{step.description}</div>
                      <div className="bg-purple-900/30 text-purple-300 text-xs px-3 py-1 rounded-full inline-block">
                        {step.visual}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Element-Specific Frame Designs */}
          <section className="px-4 py-6 relative z-10">
            <h3 className="text-white font-bold mb-4">🎨 Element Frame Designs</h3>
            <div className="space-y-4">
              {elementFrameDesigns.map((element, index) => (
                <div key={index} className="bg-gray-800/70 border border-gray-700 rounded-xl p-4">
                  <div className="flex items-start space-x-4">
                    <div className={`w-16 h-24 rounded-lg bg-gradient-to-br ${element.color} border-2 flex items-center justify-center relative overflow-hidden`}>
                      <div className="text-2xl">{element.emoji}</div>
                      <div className="absolute inset-0 bg-black/20 rounded-lg"></div>
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-bold text-lg mb-1">{element.element} Element</div>
                      <div className="text-gray-300 text-sm mb-2">{element.design}</div>
                      <div className="bg-orange-900/30 text-orange-300 text-xs px-3 py-2 rounded-lg">
                        <strong>Special Effects:</strong> {element.effects}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Starter Relic Examples */}
          <section className="px-4 py-6 relative z-10">
            <h3 className="text-white font-bold mb-4">🐉 Starter Monster Relics</h3>
            <div className="space-y-4">
              {starterRelicExamples.map((starter, index) => (
                <div key={index} className="bg-gray-800/70 border border-gray-700 rounded-xl p-4">
                  <div className="flex items-start space-x-4">
                    <div 
                      className={`w-20 h-28 rounded-lg bg-gradient-to-br ${getElementColor(starter.element)} border-2 flex items-center justify-center relative overflow-hidden`}
                      style={{
                        backgroundImage: `url(https://readdy.ai/api/search-image?query=$%7BencodeURIComponent%28starter.name%20%20%20%20fantasy%20monster%20trading%20card%20artwork%20with%20%20%20%20starter.element%20%20%20%20element%20effects%29%7D&width=80&height=112&seq=${starter.name.toLowerCase()}-relic&orientation=portrait)`
                      }}
                    >
                      <div className="absolute inset-0 bg-black/30 rounded-lg"></div>
                      <div className="absolute bottom-1 left-1 right-1 text-center">
                        <div className="text-white text-xs font-bold">{starter.name}</div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-bold text-lg mb-1">{starter.name} Relic</div>
                      <div className={`text-xs px-2 py-1 rounded-full inline-block border mb-2 ${
                        starter.element === 'Fire' ? 'text-red-400 bg-red-900/30 border-red-600' :
                        starter.element === 'Earth' ? 'text-green-400 bg-green-900/30 border-green-600' :
                        starter.element === 'Air' ? 'text-gray-300 bg-gray-900/30 border-gray-500' :
                        starter.element === 'Light' ? 'text-yellow-200 bg-yellow-900/30 border-yellow-500' :
                        'text-purple-500 bg-purple-900/40 border-purple-700'
                      }`}>
                        {starter.element} Element
                      </div>
                      <div className="text-gray-300 text-sm mb-2">{starter.description}</div>
                      <div className="bg-blue-900/30 text-blue-300 text-xs px-3 py-2 rounded-lg">
                        <strong>AR Effect:</strong> {starter.specialEffect}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {viewMode === 'design' && (
        <>
          {/* Card Selection */}
          <section className="px-4 py-6 relative z-10">
            <h2 className="text-xl font-bold text-white mb-4">Card Design System</h2>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {cardDesigns.map((card) => (
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
                       card.element === 'Light' ? '✨' : 
                       card.element === 'Air' ? '🌪️' : '🎴'}
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

          {/* Selected Card Preview */}
          <section className="px-4 py-6 relative z-10">
            <div className={`bg-gradient-to-r ${getRarityColor(selectedCardData.rarity).split('border-')[0]} bg-opacity-20 border-2 ${getRarityColor(selectedCardData.rarity).split(' ')[2]} rounded-2xl p-6 mb-6`}>
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">
                  {selectedCardData.type === 'blank' ? '📜' : 
                   selectedCardData.element === 'Fire' ? '🔥' : 
                   selectedCardData.element === 'Earth' ? '⛰️' : 
                   selectedCardData.element === 'Shadow' ? '🌑' : 
                   selectedCardData.element === 'Light' ? '✨' : 
                   selectedCardData.element === 'Air' ? '🌪️' : '🎴'}
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

              {/* Card Mockup */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div 
                    className={`w-48 h-72 rounded-2xl border-4 bg-gradient-to-br ${getRarityColor(selectedCardData.rarity).split('border-')[0]} shadow-2xl`}
                    style={{
                      borderColor: selectedCardData.rarity === 'Divine' ? '#ec4899' : 
                                   selectedCardData.rarity === 'Legendary' ? '#f97316' :
                                   selectedCardData.rarity === 'Epic' ? '#a855f7' :
                                   selectedCardData.rarity === 'Rare' ? '#3b82f6' : '#6b7280',
                      boxShadow: `0 0 40px ${
                        selectedCardData.rarity === 'Divine' ? 'rgba(236, 72, 153, 0.6)' : 
                        selectedCardData.rarity === 'Legendary' ? 'rgba(249, 115, 22, 0.6)' :
                        selectedCardData.rarity === 'Epic' ? 'rgba(168, 85, 247, 0.6)' :
                        selectedCardData.rarity === 'Rare' ? 'rgba(59, 130, 246, 0.6)' : 'rgba(107, 114, 128, 0.6)'
                      }, inset 0 0 30px rgba(255, 255, 255, 0.1)`
                    }}
                  >
                    {/* Card Surface */}
                    <div className="w-full h-full rounded-xl overflow-hidden relative">
                      {selectedCardData.type === 'blank' ? (
                        <div className="w-full h-full bg-gradient-to-br from-gray-300 via-gray-100 to-gray-300 relative">
                          {/* Mirror Effect */}
                          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/30 to-transparent transform rotate-45 animate-pulse"></div>
                          <div className="absolute inset-4 border border-gray-400/30 rounded-lg">
                            <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-gray-400/50"></div>
                            <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-gray-400/50"></div>
                            <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-gray-400/50"></div>
                            <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-gray-400/50"></div>
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-gray-500 text-xs text-center">
                              <div className="mb-2">✨</div>
                              <div>Mirror</div>
                              <div>Surface</div>
                              <div>Ready</div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div 
                          className="w-full h-full bg-cover bg-center"
                          style={{
                            backgroundImage: `url(https://readdy.ai/api/search-image?query=$%7BencodeURIComponent%28selectedCardData.monster%3F.artwork%20%7C%7C%20fantasy%20monster%20card%20artwork%29%7D&width=180&height=270&seq=${selectedCard}-artwork&orientation=portrait)`
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 rounded-xl"></div>
                          
                          {/* Monster Info */}
                          {selectedCardData.monster && (
                            <>
                              <div className="absolute top-3 left-3 right-3 text-center">
                                <div className="text-white font-bold text-sm">{selectedCardData.monster.name}</div>
                                <div className="text-gray-300 text-xs">{selectedCardData.monster.element} Beast</div>
                              </div>
                              
                              <div className="absolute bottom-3 left-3 right-3">
                                <div className="flex justify-between mb-2">
                                  <div className="bg-red-600/80 text-white text-xs px-2 py-1 rounded">
                                    ATK: {selectedCardData.monster.stats.power}
                                  </div>
                                  <div className="bg-blue-600/80 text-white text-xs px-2 py-1 rounded">
                                    DEF: {selectedCardData.monster.stats.defense}
                                  </div>
                                </div>
                                <div className="text-center">
                                  <div className="text-yellow-400 text-xs font-semibold">✦ SUMMON RELIC ✦</div>
                                  <div className="text-gray-300 text-xs">Level {selectedCardData.monster.stats.level}</div>
                                </div>
                              </div>
                            </>
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
            </div>
          </section>

          {/* Visual Style Details */}
          <section className="px-4 py-6 relative z-10">
            <h3 className="text-white font-bold mb-4">🎨 Visual Design</h3>
            <div className="space-y-4">
              <div className="bg-gray-800/50 rounded-xl p-4">
                <div className="text-purple-400 font-semibold mb-2">Material & Surface</div>
                <div className="text-gray-300 text-sm space-y-1">
                  <div><span className="text-white font-semibold">Material:</span> {selectedCardData.visualStyle.material}</div>
                  <div><span className="text-white font-semibold">Surface:</span> {selectedCardData.visualStyle.surface}</div>
                  <div><span className="text-white font-semibold">Frame:</span> {selectedCardData.visualStyle.frame}</div>
                  <div><span className="text-white font-semibold">Centerpiece:</span> {selectedCardData.visualStyle.centerpiece}</div>
                </div>
              </div>

              {selectedCardData.monster && (
                <div className="bg-gray-800/50 rounded-xl p-4">
                  <div className="text-orange-400 font-semibold mb-2">Holographic Effects</div>
                  <div className="text-gray-300 text-sm space-y-1">
                    {selectedCardData.monster.holographicEffects.map((effect, index) => (
                      <div key={index} className="ml-2">• {effect}</div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-gray-800/50 rounded-xl p-4">
                <div className="text-blue-400 font-semibold mb-2">AR Effects & Lighting</div>
                <div className="text-gray-300 text-sm space-y-1">
                  <div><span className="text-white font-semibold">Lighting:</span> {selectedCardData.visualStyle.lighting}</div>
                  <div className="text-white font-semibold mb-1">AR Effects:</div>
                  {selectedCardData.visualStyle.arEffects.map((effect, index) => (
                    <div key={index} className="ml-2">• {effect}</div>
                  ))}
                </div>
              </div>

              {selectedCardData.transformationEffect && (
                <div className="bg-gray-800/50 rounded-xl p-4">
                  <div className="text-green-400 font-semibold mb-2">Transformation Process</div>
                  <div className="text-gray-300 text-sm space-y-1">
                    <div><span className="text-white font-semibold">Trigger:</span> {selectedCardData.transformationEffect.trigger}</div>
                    <div><span className="text-white font-semibold">Duration:</span> {selectedCardData.transformationEffect.duration}</div>
                    <div className="text-white font-semibold mb-1">Sequence:</div>
                    {selectedCardData.transformationEffect.sequence.map((step, index) => (
                      <div key={index} className="ml-2 text-xs">
                        <span className="text-green-400">{index + 1}.</span> {step}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        </>
      )}

      {viewMode === 'ar-preview' && (
        <section className="px-4 py-6 relative z-10">
          <div className="bg-black/60 border-2 border-blue-600/50 rounded-2xl p-6 mb-6">
            <div className="text-center mb-4">
              <div className="text-blue-400 text-sm font-semibold">AR Experience Preview</div>
              <div className="text-white text-xl font-bold">{selectedCardData.name}</div>
              <div className="text-gray-300 text-sm">How this card appears in AR space</div>
            </div>
            
            <div 
              className="h-64 rounded-2xl bg-cover bg-center border-4 border-blue-400/50 relative overflow-hidden"
              style={{
                backgroundImage: selectedCardData.type === 'blank' 
                  ? `url(https://readdy.ai/api/search-image?query=AR%20camera%20view%20showing%20floating%20reflective%20blank%20card%20with%20mystical%20mirror%20surface%2C%20magical%20runes%20glowing%20around%20edges%2C%20waiting%20to%20capture%20monster%20essence%2C%20ethereal%20mist%20effects%2C%20dramatic%20lighting&width=350&height=250&seq=ar-blank-preview&orientation=landscape)`
                  : `url(https://readdy.ai/api/search-image?query=AR%20holographic%20$%7BselectedCardData.monster%3F.element%20%7C%7C%20monster%7D%20creature%20materializing%20from%20glowing%20card%20in%20real%20environment%2C%203D%20summon%20effect%20with%20particle%20magic%2C%20cinematic%20AR%20battlefield%20with%20dramatic%20lighting&width=350&height=250&seq=ar-${selectedCard}-preview&orientation=landscape)`
              }}
            >
              <div className="absolute inset-0 bg-black/20 rounded-xl">
                <div className="absolute top-4 left-4 bg-blue-600/90 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  AR ACTIVE
                </div>
                
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black/70 rounded-lg p-3">
                    <div className="text-white font-bold text-sm mb-1">
                      {selectedCardData.type === 'blank' ? 'Mirror Reflection Mode' : 'Holographic Projection Active'}
                    </div>
                    <div className="text-gray-300 text-xs">
                      {selectedCardData.type === 'blank' 
                        ? 'Card surface reflects environment, runes pulse when monster detected'
                        : `${selectedCardData.monster?.name} projects in 3D with interactive holographic effects`
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div className="text-white font-semibold">AR Interaction Features:</div>
              {selectedCardData.visualStyle.arEffects.map((effect, index) => (
                <div key={index} className="flex items-center space-x-3 bg-blue-900/30 rounded-lg p-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✨</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-white text-sm">{effect}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Summary Section */}
      <section className="px-4 py-6 relative z-10 mb-20">
        <div className="bg-gradient-to-r from-purple-900/50 to-orange-900/50 border-2 border-purple-500 rounded-2xl p-6">
          <div className="text-center mb-4">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="text-xl font-bold text-white mb-2">Complete Card System</h3>
            <p className="text-purple-300 text-sm">From reflective mirrors to living artworks</p>
          </div>
          
          <div className="space-y-3">
            <div className="bg-purple-800/30 rounded-lg p-3">
              <div className="text-purple-400 font-semibold text-sm mb-1">📜 Mirror Technology</div>
              <div className="text-gray-300 text-xs">
                Blank Cards use perfect mirror surfaces that reflect reality while detecting monster essence nearby
              </div>
            </div>
            
            <div className="bg-orange-800/30 rounded-lg p-3">
              <div className="text-orange-400 font-semibold text-sm mb-1">✨ Transformation Magic</div>
              <div className="text-gray-300 text-xs">
                Mirror cracks → shatters → reforms with captured monster artwork in stunning 3-4 second sequence
              </div>
            </div>
            
            <div className="bg-blue-800/30 rounded-lg p-3">
              <div className="text-blue-400 font-semibold text-sm mb-1">🎨 Living Artwork</div>
              <div className="text-gray-300 text-xs">
                Summon Relics feature semi-3D holographic monsters that shift, blink, and respond to viewing angle
              </div>
            </div>
            
            <div className="bg-green-800/30 rounded-lg p-3">
              <div className="text-green-400 font-semibold text-sm mb-1">🌟 Element Frames</div>
              <div className="text-gray-300 text-xs">
                Each element has unique frame design: Fire=magma cracks, Earth=living moss, Air=lightning, Light=stained glass, Shadow=smoke leaks
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
