
'use client';

import { useState, useEffect } from 'react';

interface StoryboardScene {
  id: number;
  title: string;
  description: string;
  duration: string;
  visualEffects: string[];
  audioEffects: string[];
  playerActions: string[];
  cinematicDetails: string[];
  image: string;
}

interface SummonScene {
  id: number;
  title: string;
  description: string;
  duration: string;
  visualEffects: string[];
  audioEffects: string[];
  cinematicDetails: string[];
  image: string;
}

export default function ARCaptureStoryboard() {
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);
  const [activeFlow, setActiveFlow] = useState<'capture' | 'summon'>('capture');
  const [currentSummonScene, setCurrentSummonScene] = useState(0);
  const [isSummonPlaying, setIsSummonPlaying] = useState(false);

  const storyboardScenes: StoryboardScene[] = [
    {
      id: 1,
      title: "🌫️ THE ENCOUNTER",
      description: "Player enters cemetery AR zone - wild Ghost Beast materializes in the mist",
      duration: "3-4 seconds",
      visualEffects: [
        "AR fog rolls across phone screen from edges",
        "Ghost Beast fades in with ethereal transparency",
        "Environment darkens with supernatural atmosphere",
        "Purple energy particles drift around creature"
      ],
      audioEffects: [
        "Deep atmospheric rumble",
        "Ghostly whispers in background",
        "Beast's low, menacing growl",
        "Phone vibrates with creature's presence"
      ],
      playerActions: [
        "Point camera at AR zone",
        "Ghost detection overlay appears",
        "Targeting crosshairs lock onto beast"
      ],
      cinematicDetails: [
        "Beast appears 6 feet away in real space",
        "Semi-transparent with glowing purple veins",
        "Moves with floating, ethereal animation",
        "Eyes track player movement realistically"
      ],
      image: "AR camera view of misty cemetery with ghostly beast materializing from fog, supernatural creature emerging in augmented reality overlay, spooky graveyard environment with ethereal purple mist, player phone screen showing ghost detection interface"
    },
    {
      id: 2,
      title: "⚔️ WEAKEN PHASE",
      description: "Strategic battle to weaken the beast before capture attempt",
      duration: "15-30 seconds",
      visualEffects: [
        "Combat UI appears with health bars",
        "Beast flashes red when taking damage",
        "Glitchy aura appears around weakened beast",
        "Movement becomes slower and unstable"
      ],
      audioEffects: [
        "Battle music intensifies",
        "Beast roars with each hit",
        "Electrical glitch sounds when weakening",
        "Success chime when capture-ready"
      ],
      playerActions: [
        "Tap to cast spells/attacks",
        "Dodge beast's counterattacks",
        "Monitor beast's health status",
        "Wait for 'Capture Ready' indicator"
      ],
      cinematicDetails: [
        "Beast becomes more transparent when weak",
        "Purple energy starts flickering",
        "Movements become jerky and glitched",
        "Capture prompt appears when ready"
      ],
      image: "AR battle scene with player fighting ghostly beast using magical attacks, weakened supernatural creature with glitchy unstable aura, combat interface showing health bars and capture readiness, dramatic lighting with spell effects"
    },
    {
      id: 3,
      title: "📜 BLANK CARD ACTIVATION",
      description: "The magical moment - player summons their Blank Card into AR space",
      duration: "2-3 seconds",
      visualEffects: [
        "Player swipes upward gesture",
        "Blank Card materializes and floats forward",
        "Card surface becomes mirror-like and reflective",
        "Mystical runes appear around card edges"
      ],
      audioEffects: [
        "Magical summoning chime",
        "Ethereal wind sound as card appears",
        "Soft humming of ancient magic",
        "Runes pulse with musical tones"
      ],
      playerActions: [
        "Swipe upward to activate card",
        "Watch card float into position",
        "Prepare for capture ritual"
      ],
      cinematicDetails: [
        "Card hovers 3 feet in front of player",
        "Surface reflects real environment like mirror",
        "Golden runes glow softly around border",
        "Card gently rotates in AR space"
      ],
      image: "Blank Card floating in AR space with mirror-like reflective surface, mystical golden runes glowing around edges, magical summoning effect with ethereal particles, player hand gesture activating the card in cemetery setting"
    },
    {
      id: 4,
      title: "👻 MIRROR REFLECTION",
      description: "Ghost Beast's essence appears faintly in the mirror surface",
      duration: "2-3 seconds",
      visualEffects: [
        "Beast's reflection materializes in card mirror",
        "Reflection is distorted and flickering",
        "Mirror surface ripples like water",
        "Purple energy flows between beast and card"
      ],
      audioEffects: [
        "Mystical water ripple sounds",
        "Beast's distant echo from mirror",
        "Magical resonance building",
        "Faint capture music begins"
      ],
      playerActions: [
        "Observe the reflection forming",
        "Position card to capture best angle",
        "Prepare for capture mini-game"
      ],
      cinematicDetails: [
        "Reflection appears gradually, not instantly",
        "Beast looks directly at player through mirror",
        "Surface shows distorted, supernatural version",
        "Energy connection visible between real and reflection"
      ],
      image: "Ghost Beast's distorted reflection appearing in the mirror-like Blank Card surface, ethereal creature looking through dimensional portal, rippling mirror effect with purple energy, mystical connection forming between reality and card"
    },
    {
      id: 5,
      title: "✨ CAPTURE RITUAL",
      description: "Interactive mini-game to seal the beast - player must align mystical runes",
      duration: "5-8 seconds",
      visualEffects: [
        "Runes spin rapidly around card edges",
        "Player must tap runes in correct sequence",
        "Each success makes reflection stronger",
        "Failures create cracks in mirror surface"
      ],
      audioEffects: [
        "Rune activation chimes",
        "Success/failure sound feedback",
        "Beast struggling sounds from mirror",
        "Magical intensity building with each success"
      ],
      playerActions: [
        "Tap spinning runes in correct order",
        "React quickly to changing patterns",
        "3-5 successful taps required",
        "Fail too many times = capture fails"
      ],
      cinematicDetails: [
        "6 runes spin clockwise around card",
        "Each rune glows when tappable",
        "Success = rune locks in place with flash",
        "Beast reflection grows more solid with progress"
      ],
      image: "Interactive rune mini-game with glowing symbols spinning around the Blank Card, player tapping mystical runes in sequence, capture ritual in progress with magical energy effects, beast reflection strengthening in mirror"
    },
    {
      id: 6,
      title: "🌪️ THE SEAL",
      description: "Final capture moment - beast is pulled into the mirror dimension",
      duration: "3-4 seconds",
      visualEffects: [
        "Mirror reflection suddenly grabs the real beast",
        "Beast screams as it's pulled toward card",
        "Swirling vortex effect around card",
        "Beast stretches and warps as it enters mirror"
      ],
      audioEffects: [
        "Beast's final terrified roar",
        "Dimensional portal sucking sound",
        "Reality tearing/warping effects",
        "Magical crescendo as beast disappears"
      ],
      playerActions:[
        "Watch the dramatic capture sequence",
        "Beast is pulled from AR into card",
        "Prepare for mirror shatter effect"
      ],
      cinematicDetails: [
        "Beast is stretched like taffy into card",
        "Purple energy spirals create vortex",
        "Real beast disappears from AR space",
        "Card vibrates violently in player's view"
      ],
      image: "Ghost Beast being dramatically pulled into the mirror Card with swirling vortex effects, creature stretching and warping as it enters dimensional portal, purple energy spiral with reality distortion, climactic capture moment"
    },
    {
      id: 7,
      title: "💥 MIRROR SHATTER",
      description: "The mirror surface explodes into brilliant light fragments",
      duration: "1-2 seconds",
      visualEffects: [
        "Mirror surface cracks like glass",
        "Explosive shatter with light shards",
        "Fragments fly outward then freeze mid-air",
        "Blinding purple flash fills screen"
      ],
      audioEffects: [
        "Glass shattering sound effect",
        "Magical explosion boom",
        "Crystalline tinkling of fragments",
        "Phone vibrates with impact"
      ],
      playerActions: [
        "Experience the dramatic shatter",
        "Brief screen flash effect",
        "Anticipate the transformation"
      ],
      cinematicDetails: [
        "Shards reflect purple light",
        "Each fragment shows piece of beast",
        "Time slows during shatter effect",
        "Screen briefly goes white"
      ],
      image: "Blank Card mirror surface shattering into brilliant light fragments, explosive glass shards with purple magical energy, dramatic breaking effect with beast essence trapped in pieces, crystalline light effects"
    },
    {
      id: 8,
      title: "🎴 TRANSFORMATION",
      description: "Shattered pieces reform - Blank Card becomes a Summon Relic",
      duration: "3-4 seconds",
      visualEffects: [
        "Fragments spin and reform instantly",
        "Card now glows in beast's element color",
        "Beast artwork burns into card surface",
        "Golden 'Summon Relic' text appears"
      ],
      audioEffects: [
        "Magical reformation chimes",
        "Beast's essence humming in card",
        "Success fanfare music",
        "Gentle magical resonance"
      ],
      playerActions: [
        "Watch the miraculous transformation",
        "Card now shows captured beast",
        "Ready for battle deployment"
      ],
      cinematicDetails: [
        "Card surface shows detailed beast artwork",
        "Purple glow pulses from within card",
        "Beast's eyes seem to follow player",
        "Card hovers proudly in AR space"
      ],
      image: "Transformed Summon Relic card glowing with purple energy showing detailed Ghost Beast artwork, magical reformation complete with creature essence sealed inside, golden text reading Summon Relic, mystical achievement glow"
    },
    {
      id: 9,
      title: "🏆 VICTORY DISPLAY",
      description: "Card spins and settles into player's deck with monster showcase",
      duration: "2-3 seconds",
      visualEffects: [
        "Card spins dramatically in AR space",
        "Settles gracefully into player's deck UI",
        "Monster close-up animation appears",
        "Victory sparkles and celebration effects"
      ],
      audioEffects: [
        "Triumphant victory chime",
        "Monster's signature roar echoes",
        "Deck slot filling sound",
        "Achievement unlock sound"
      ],
      playerActions: [
        "Watch victory celebration",
        "Card automatically added to collection",
        "Monster stats displayed briefly"
      ],
      cinematicDetails: [
        "Card spins 360 degrees before settling",
        "Beast appears in 3D doing signature pose",
        "Snarling/roaring animation for 2-3 seconds",
        "Collection UI updates with new entry"
      ],
      image: "Captured monster doing victory pose in AR with spinning Summon Relic card settling into deck UI, Ghost Beast snarling triumphantly, collection interface showing new addition, celebration effects with sparkles and achievement glow"
    }
  ];

  const summonFlowScenes: SummonScene[] = [
    {
      id: 1,
      title: "🃏 CARD DRAW",
      description: "Player selects monster - Summon Relic card floats forward, glowing",
      duration: "2 seconds",
      visualEffects: [
        "Player taps to select monster from deck",
        "Summon Relic card floats forward into AR space",
        "Card glows with contained monster energy",
        "AR environment dims briefly for dramatic effect"
      ],
      audioEffects: [
        "Card selection chime",
        "Mystical energy humming",
        "Environment dimming sound",
        "Anticipation music builds"
      ],
      cinematicDetails: [
        "Card rises from deck UI into 3D space",
        "Glowing aura matches monster's element",
        "Background lighting dims to focus on card",
        "Player can see beast silhouette in card"
      ],
      image: "Player selecting Summon Relic card from deck interface, glowing card floating forward in AR space, dimmed environment focusing on magical card energy, mystical selection interface with dramatic lighting"
    },
    {
      id: 2,
      title: "✨ CARD TRANSFORMATION",
      description: "Card enlarges, hovering, glowing in element color with energy leaks",
      duration: "2-3 seconds",
      visualEffects: [
        "Card enlarges to 150% size while hovering",
        "Intense glow in monster's element color",
        "Glowing cracks spread across card surface",
        "Energy begins leaking from the cracks"
      ],
      audioEffects: [
        "Magical energy building sound",
        "Card transformation humming",
        "Crackling energy effects",
        "Element-specific sound building"
      ],
      cinematicDetails: [
        "Card rotates slowly while enlarging",
        "Cracks appear like breaking glass",
        "Element energy (fire/shadow/ice) leaks out",
        "Card vibrates with contained power"
      ],
      image: "Enlarged Summon Relic card hovering with glowing cracks and element energy leaking out, magical transformation with purple shadow energy escaping, card rotation animation with dramatic power buildup, mystical energy effects"
    },
    {
      id: 3,
      title: "💥 SUMMONING BURST",
      description: "Card shatters like glass, forming elemental summoning circle",
      duration: "1-2 seconds",
      visualEffects: [
        "Card shatters explosively like glass",
        "Shards fly outward forming summoning circle",
        "Element-specific burst effects activate",
        "Summoning circle glows on AR ground"
      ],
      audioEffects: [
        "Explosive glass shattering",
        "Element-specific burst sound",
        "Summoning circle activation",
        "Power release boom"
      ],
      cinematicDetails: [
        "Fire: Flames spiral out in tornado pattern",
        "Earth: Stone erupts from ground in circle",
        "Air: Tornado spins around summoning point",
        "Light: Blinding flash with divine rays",
        "Shadow: Black smoke explosion with purple energy"
      ],
      image: "Explosive card shattering with glass shards forming glowing summoning circle, element-specific burst effects with shadow smoke explosion, dramatic AR summoning ritual with magical energy patterns, mystical circle activation"
    },
    {
      id: 4,
      title: "🐉 MONSTER ARRIVAL",
      description: "Monster erupts from card fragments with signature entrance move",
      duration: "3-4 seconds",
      visualEffects: [
        "Monster erupts dramatically from summoning circle",
        "Performs signature entrance move",
        "AR battlefield stabilizes around monster",
        "Monster takes position beside/behind player"
      ],
      audioEffects: [
        "Monster's signature roar/cry",
        "Entrance move sound effects",
        "Battlefield stabilization sounds",
        "Monster positioning audio"
      ],
      cinematicDetails: [
        "Ghost Beast: Emerges with ethereal wail, phases through reality",
        "Fire Dragon: Breathes fire upward in victory",
        "Earth Golem: Pounds ground, shaking AR environment",
        "Monster does signature pose/attack animation"
      ],
      image: "Ghost Beast erupting from summoning circle with ethereal emergence, monster performing signature entrance move with dramatic roar, AR battlefield with creature positioned beside player, epic summoning completion scene"
    },
    {
      id: 5,
      title: "⚔️ BATTLE READY",
      description: "Camera zooms out, monster enters idle stance, HUD updates",
      duration: "2-3 seconds",
      visualEffects: [
        "Camera zooms out to show full battlefield",
        "Monster settles into idle battle stance",
        "Player HUD updates with monster stats",
        "Battle interface becomes active"
      ],
      audioEffects: [
        "Camera zoom sound effect",
        "Monster idle breathing/sounds",
        "HUD activation chimes",
        "Battle ready confirmation"
      ],
      cinematicDetails: [
        "Wide shot showing player and monster together",
        "Monster breathing/idle animations begin",
        "Stats display: HP, abilities, element type",
        "Combat controls become available"
      ],
      image: "Wide AR battlefield view with summoned Ghost Beast in battle ready stance beside player, updated HUD showing monster stats and abilities, complete battle interface with tactical information, epic ready-for-combat scene"
    }
  ];

  const playCaptureStoryboard = () => {
    setIsPlaying(true);
    setCurrentScene(0);
    
    const interval = setInterval(() => {
      setCurrentScene(prev => {
        if (prev >= storyboardScenes.length - 1) {
          setIsPlaying(false);
          clearInterval(interval);
          return 0;
        }
        return prev + 1;
      });
    }, 3000);
  };

  const playSummonFlow = () => {
    setIsSummonPlaying(true);
    setCurrentSummonScene(0);
    
    const interval = setInterval(() => {
      setCurrentSummonScene(prev => {
        if (prev >= summonFlowScenes.length - 1) {
          setIsSummonPlaying(false);
          clearInterval(interval);
          return 0;
        }
        return prev + 1;
      });
    }, 2500);
  };

  const nextScene = () => {
    if (activeFlow === 'capture') {
      setCurrentScene(prev => (prev + 1) % storyboardScenes.length);
    } else {
      setCurrentSummonScene(prev => (prev + 1) % summonFlowScenes.length);
    }
  };

  const prevScene = () => {
    if (activeFlow === 'capture') {
      setCurrentScene(prev => prev === 0 ? storyboardScenes.length - 1 : prev - 1);
    } else {
      setCurrentSummonScene(prev => prev === 0 ? summonFlowScenes.length - 1 : prev - 1);
    }
  };

  const currentStoryScene = activeFlow === 'capture' ? storyboardScenes[currentScene] : summonFlowScenes[currentSummonScene];
  const totalScenes = activeFlow === 'capture' ? storyboardScenes.length : summonFlowScenes.length;
  const currentIndex = activeFlow === 'capture' ? currentScene : currentSummonScene;

  return (
    <div className="min-h-screen bg-gray-950 pt-20 pb-24 relative overflow-hidden">
      {/* Atmospheric Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-black/40"></div>
        {(isPlaying || isSummonPlaying) && (
          <div className="absolute inset-0 bg-purple-500/5 animate-pulse"></div>
        )}
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full bg-black/40 backdrop-blur-md z-50 border-b border-purple-800/30">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <i className="ri-arrow-left-line text-white text-xl mr-2"></i>
            <span className="text-white font-semibold">AR Cinematic Flows</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-purple-400 text-sm">Scene {currentIndex + 1}/{totalScenes}</div>
            <button
              onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
              className="text-white text-sm"
            >
              {showTechnicalDetails ? '📱' : '🎬'}
            </button>
          </div>
        </div>
      </header>

      {/* Flow Toggle */}
      <section className="pt-20 px-4 py-4 relative z-10">
        <div className="flex bg-gray-800/50 rounded-xl p-1 mb-6">
          <button
            onClick={() => setActiveFlow('capture')}
            className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all ${
              activeFlow === 'capture' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            📜 Capture Flow (9 Scenes)
          </button>
          <button
            onClick={() => setActiveFlow('summon')}
            className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all ${
              activeFlow === 'summon' ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            ⚔️ Battle Summon (5 Scenes)
          </button>
        </div>
      </section>

      {/* Main Storyboard Display */}
      <section className="px-4 py-6 relative z-10">
        {/* Scene Title Card */}
        <div className={`bg-gradient-to-r ${activeFlow === 'capture' ? 'from-purple-900/50 to-indigo-900/50 border-purple-500' : 'from-red-900/50 to-orange-900/50 border-red-500'} border-2 rounded-2xl p-6 mb-6`}>
          <div className="text-center mb-4">
            <div className="text-4xl mb-3">🎬</div>
            <h1 className="text-2xl font-bold text-white mb-2">
              {activeFlow === 'capture' ? 'AR Capture Cinematic' : 'AR Battle Summon Flow'}
            </h1>
            <p className="text-purple-300 text-sm">
              {activeFlow === 'capture' ? 'From Wild Encounter to Summon Relic' : 'From Card Selection to Battle Ready'}
            </p>
          </div>
          
          <div className="flex justify-center space-x-3">
            <button
              onClick={activeFlow === 'capture' ? playCaptureStoryboard : playSummonFlow}
              disabled={isPlaying || isSummonPlaying}
              className={`${activeFlow === 'capture' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-red-600 hover:bg-red-700'} text-white px-6 py-3 rounded-full font-semibold disabled:opacity-50`}
            >
              {(isPlaying || isSummonPlaying) ? '▶️ Playing...' : `🎬 Play ${activeFlow === 'capture' ? 'Capture' : 'Summon'} Flow`}
            </button>
            <button
              onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-full"
            >
              📋 Details
            </button>
          </div>
        </div>

        {/* Current Scene Display */}
        <div className={`bg-gray-900/80 border-2 ${activeFlow === 'capture' ? 'border-purple-600' : 'border-red-600'} rounded-2xl p-6 mb-6`}>
          <div className="text-center mb-4">
            <div className="text-3xl mb-2">{currentStoryScene.title.split(' ')[0]}</div>
            <h2 className="text-xl font-bold text-white mb-2">{currentStoryScene.title}</h2>
            <p className="text-gray-300 text-sm mb-2">{currentStoryScene.description}</p>
            <div className="text-purple-400 text-xs">Duration: {currentStoryScene.duration}</div>
          </div>

          {/* Scene Visualization */}
          <div className="relative mb-6">
            <div 
              className={`h-64 rounded-2xl bg-cover bg-center border-4 ${activeFlow === 'capture' ? 'border-purple-400/50' : 'border-red-400/50'} relative overflow-hidden`}
              style={{
                backgroundImage: `url(https://readdy.ai/api/search-image?query=$%7BencodeURIComponent%28currentStoryScene.image%29%7D&width=350&height=250&seq=scene-${activeFlow}-${currentStoryScene.id}&orientation=landscape)`,
                boxShadow: (isPlaying || isSummonPlaying) ? '0 0 40px rgba(147, 51, 234, 0.8)' : '0 0 20px rgba(147, 51, 234, 0.4)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 rounded-xl"></div>
              
              {/* Scene Overlay Info */}
              <div className={`absolute top-4 left-4 ${activeFlow === 'capture' ? 'bg-purple-600/90' : 'bg-red-600/90'} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                Scene {currentStoryScene.id}
              </div>
              
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <div className="text-white font-bold text-lg mb-1">{currentStoryScene.title.slice(2)}</div>
                <div className="text-purple-300 text-sm">{currentStoryScene.duration}</div>
              </div>

              {/* Playing Indicator */}
              {((isPlaying && activeFlow === 'capture' && currentScene === currentStoryScene.id - 1) || 
                (isSummonPlaying && activeFlow === 'summon' && currentSummonScene === currentStoryScene.id - 1)) && (
                <div className={`absolute inset-0 border-4 ${activeFlow === 'capture' ? 'border-purple-400' : 'border-red-400'} rounded-xl animate-pulse`}></div>
              )}
            </div>
          </div>

          {/* Scene Navigation */}
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={prevScene}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
            >
              ← Previous
            </button>
            
            <div className="flex space-x-2">
              {(activeFlow === 'capture' ? storyboardScenes : summonFlowScenes).map((_, index) => (
                <button
                  key={index}
                  onClick={() => activeFlow === 'capture' ? setCurrentScene(index) : setCurrentSummonScene(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === currentIndex ? (activeFlow === 'capture' ? 'bg-purple-400' : 'bg-red-400') : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={nextScene}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
            >
              Next →
            </button>
          </div>
        </div>

        {/* Technical Details Panel */}
        {showTechnicalDetails && (
          <div className="bg-gray-800/90 border border-gray-700 rounded-xl p-6 mb-6">
            <h3 className="text-white font-bold mb-4">📱 Technical Implementation Details</h3>
            
            <div className="space-y-4">
              {/* Visual Effects */}
              <div>
                <div className="text-purple-400 font-semibold mb-2">🎨 Visual Effects</div>
                <div className="space-y-1">
                  {currentStoryScene.visualEffects.map((effect, index) => (
                    <div key={index} className="text-gray-300 text-sm flex items-start">
                      <span className="text-purple-400 mr-2">•</span>
                      <span>{effect}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Audio Effects */}
              <div>
                <div className="text-blue-400 font-semibold mb-2">🔊 Audio Effects</div>
                <div className="space-y-1">
                  {currentStoryScene.audioEffects.map((audio, index) => (
                    <div key={index} className="text-gray-300 text-sm flex items-start">
                      <span className="text-blue-400 mr-2">•</span>
                      <span>{audio}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Player Actions (only for capture flow) */}
              {activeFlow === 'capture' && 'playerActions' in currentStoryScene && (
                <div>
                  <div className="text-green-400 font-semibold mb-2">👆 Player Actions</div>
                  <div className="space-y-1">
                    {(currentStoryScene as StoryboardScene).playerActions.map((action, index) => (
                      <div key={index} className="text-gray-300 text-sm flex items-start">
                        <span className="text-green-400 mr-2">•</span>
                        <span>{action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Cinematic Details */}
              <div>
                <div className="text-yellow-400 font-semibold mb-2">🎬 Cinematic Details</div>
                <div className="space-y-1">
                  {currentStoryScene.cinematicDetails.map((detail, index) => (
                    <div key={index} className="text-gray-300 text-sm flex items-start">
                      <span className="text-yellow-400 mr-2">•</span>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Flow Comparison */}
        <div className="bg-gradient-to-r from-gray-800/70 to-purple-800/70 border border-purple-600 rounded-xl p-6">
          <h3 className="text-white font-bold mb-4">✨ Complete AR Experience</h3>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-purple-900/30 border border-purple-700 rounded-lg p-4">
              <div className="text-purple-400 font-semibold text-sm mb-2">📜 Capture Flow (9 Scenes)</div>
              <div className="text-gray-300 text-xs">
                Complete journey from wild encounter to transformed Summon Relic. Includes victory display with monster showcase and deck integration.
              </div>
            </div>

            <div className="bg-red-900/30 border border-red-700 rounded-lg p-4">
              <div className="text-red-400 font-semibold text-sm mb-2">⚔️ Battle Summon (5 Scenes)</div>
              <div className="text-gray-300 text-xs">
                Cinematic monster deployment from Summon Relic card to battle-ready creature. Features element-specific burst effects and signature entrance moves.
              </div>
            </div>

            <div className="bg-green-900/30 border border-green-700 rounded-lg p-4">
              <div className="text-green-400 font-semibold text-sm mb-2">🎬 Seamless Integration</div>
              <div className="text-gray-300 text-xs">
                Both flows connect perfectly - captured monsters become battle-ready relics with personalized summon animations. Each creature remembers its capture story.
              </div>
            </div>

            <div className="bg-orange-900/30 border border-orange-700 rounded-lg p-4">
              <div className="text-orange-400 font-semibold text-sm mb-2">🌟 Element Variations</div>
              <div className="text-gray-300 text-xs">
                Fire: Flame spirals + volcanic roars | Earth: Stone eruptions + ground shaking | Shadow: Smoke explosions + ethereal wails | Light: Divine flashes + celestial chimes
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}