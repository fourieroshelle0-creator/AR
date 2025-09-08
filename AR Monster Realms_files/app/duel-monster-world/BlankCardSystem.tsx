
'use client';

import { useState, useEffect } from 'react';

interface CaptureAttempt {
  monsterId: string;
  cardId: string;
  success: boolean;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Legendary';
  timing: 'Perfect' | 'Good' | 'Poor';
}

interface BlankCard {
  id: string;
  type: 'Basic' | 'Enhanced' | 'Master' | 'Divine';
  rarity: string;
  captureRate: number;
  isActive: boolean;
  pokeBallStyle: boolean;
  throwPower: number;
  capturedMonster?: any;
}

interface Monster {
  id: string;
  name: string;
  element: string;
  power: number;
  defense: number;
  hp: number;
  maxHp: number;
  difficulty: string;
  weakened: boolean;
  capturable: boolean;
  description: string;
  battleCry: string;
  currentAction: 'idle' | 'attacking' | 'defending' | 'stunned';
  captureWindow: boolean;
  escapeChance: number;
}

export default function BlankCardSystem() {
  const [gamePhase, setGamePhase] = useState<'monitoring' | 'aiming' | 'throwing' | 'capturing' | 'success' | 'failure'>('monitoring');
  const [selectedCard, setSelectedCard] = useState<BlankCard | null>(null);
  const [targetMonster, setTargetMonster] = useState<Monster | null>(null);
  const [throwPower, setThrowPower] = useState(0);
  const [captureProgress, setCaptureProgress] = useState(0);
  const [throwTiming, setThrowTiming] = useState<'Perfect' | 'Good' | 'Poor' | null>(null);
  const [cardInventory, setCardInventory] = useState(20); // Start with 20 cards
  const [showShop, setShowShop] = useState(false);
  const [throwTrajectory, setThrowTrajectory] = useState({ x: 0, y: 0 });
  const [cardInFlight, setCardInFlight] = useState(false);
  const [monsterReaction, setMonsterReaction] = useState<'calm' | 'alert' | 'aggressive' | 'captured'>('calm');
  const [shakingEffect, setShakingEffect] = useState(0);
  const [captureRoll, setCaptureRoll] = useState<number[]>([]);
  const [showTransformation, setShowTransformation] = useState(false);
  const [transformationStep, setTransformationStep] = useState(0);
  const [capturedMonsterData, setCapturedMonsterData] = useState<Monster | null>(null);

  const blankCards: BlankCard[] = [
    {
      id: 'pokeball-basic',
      type: 'Basic',
      rarity: 'Common',
      captureRate: 45,
      isActive: true,
      pokeBallStyle: true,
      throwPower: 70
    },
    {
      id: 'pokeball-great',
      type: 'Enhanced',
      rarity: 'Rare',
      captureRate: 65,
      isActive: true,
      pokeBallStyle: true,
      throwPower: 85
    },
    {
      id: 'pokeball-ultra',
      type: 'Master',
      rarity: 'Epic',
      captureRate: 85,
      isActive: true,
      pokeBallStyle: true,
      throwPower: 95
    },
    {
      id: 'pokeball-master',
      type: 'Divine',
      rarity: 'Legendary',
      captureRate: 100,
      isActive: true,
      pokeBallStyle: true,
      throwPower: 100
    }
  ];

  const wildMonster: Monster = {
    id: 'flare-drake-wild',
    name: 'Wild Flare Drake',
    element: 'Fire',
    power: 2400,
    defense: 1800,
    hp: 85,
    maxHp: 100,
    difficulty: 'Medium',
    weakened: false,
    capturable: true,
    description: 'A fierce dragon breathing molten flames',
    battleCry: 'ROOOAARRR! The flames of fury burn eternal!',
    currentAction: 'idle',
    captureWindow: false,
    escapeChance: 35
  };

  // Monitor monster behavior for capture opportunities
  useEffect(() => {
    const monsterBehavior = setInterval(() => {
      setTargetMonster(prev => {
        if (!prev) return prev;
        
        const actions: Array<'idle' | 'attacking' | 'defending' | 'stunned'> = ['idle', 'attacking', 'defending', 'stunned'];
        const newAction = actions[Math.floor(Math.random() * actions.length)];
        
        // Capture windows are best during 'stunned' and 'idle'
        const captureWindow = newAction === 'stunned' || (newAction === 'idle' && Math.random() > 0.7);
        
        return {
          ...prev,
          currentAction: newAction,
          captureWindow,
          escapeChance: newAction === 'attacking' ? 60 : newAction === 'stunned' ? 15 : 35
        };
      });
    }, 2000);

    return () => clearInterval(monsterBehavior);
  }, []);

  const getCardDesign = (card: BlankCard) => {
    switch (card.type) {
      case 'Basic': return {
        gradient: 'from-red-500 to-red-700',
        border: 'border-red-400',
        glow: 'shadow-red-400/50',
        ballColor: 'bg-gradient-to-b from-red-400 via-white to-red-600'
      };
      case 'Enhanced': return {
        gradient: 'from-blue-500 to-blue-700', 
        border: 'border-blue-400',
        glow: 'shadow-blue-400/50',
        ballColor: 'bg-gradient-to-b from-blue-400 via-white to-blue-600'
      };
      case 'Master': return {
        gradient: 'from-yellow-500 to-yellow-700',
        border: 'border-yellow-400', 
        glow: 'shadow-yellow-400/50',
        ballColor: 'bg-gradient-to-b from-yellow-400 via-white to-yellow-600'
      };
      case 'Divine': return {
        gradient: 'from-purple-500 to-purple-700',
        border: 'border-purple-400',
        glow: 'shadow-purple-400/50', 
        ballColor: 'bg-gradient-to-b from-purple-400 via-white to-purple-600'
      };
      default: return {
        gradient: 'from-gray-500 to-gray-700',
        border: 'border-gray-400',
        glow: 'shadow-gray-400/50',
        ballColor: 'bg-gradient-to-b from-gray-400 via-white to-gray-600'
      };
    }
  };

  const getTimingBonus = (timing: string) => {
    switch (timing) {
      case 'Perfect': return 25;
      case 'Good': return 10;
      case 'Poor': return -15;
      default: return 0;
    }
  };

  const startAiming = (card: BlankCard) => {
    if (cardInventory <= 0) {
      alert('No Blank Cards remaining! Visit the shop to buy more.');
      return;
    }
    
    setSelectedCard(card);
    setGamePhase('aiming');
    setTargetMonster(wildMonster);
  };

  const chargePower = () => {
    setGamePhase('throwing');
    setThrowPower(0);
    
    const powerInterval = setInterval(() => {
      setThrowPower(prev => {
        if (prev >= 100) {
          clearInterval(powerInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    // Auto-throw after 3 seconds if player doesn't act
    setTimeout(() => {
      clearInterval(powerInterval);
      if (gamePhase === 'throwing') {
        executeThrow();
      }
    }, 3000);
  };

  const executeThrow = () => {
    if (!selectedCard || !targetMonster) return;
    
    // Calculate timing based on monster's current state
    let timing: 'Perfect' | 'Good' | 'Poor';
    if (targetMonster.captureWindow && targetMonster.currentAction === 'stunned') {
      timing = 'Perfect';
    } else if (targetMonster.captureWindow || targetMonster.currentAction === 'idle') {
      timing = 'Good';
    } else {
      timing = 'Poor';
    }
    
    setThrowTiming(timing);
    setCardInFlight(true);
    setCardInventory(prev => prev - 1); // Use one card
    
    // Animate throw trajectory
    setTimeout(() => {
      setCardInFlight(false);
      startCaptureSequence(timing);
    }, 1500);
  };

  const startCaptureSequence = (timing: 'Perfect' | 'Good' | 'Poor') => {
    if (!selectedCard || !targetMonster) return;
    
    setGamePhase('capturing');
    setMonsterReaction('alert');
    
    // Calculate final capture rate
    const baseRate = selectedCard.captureRate;
    const timingBonus = getTimingBonus(timing);
    const powerBonus = Math.floor(throwPower / 10);
    const healthPenalty = Math.floor((targetMonster.hp / targetMonster.maxHp) * 20);
    
    const finalRate = Math.min(95, Math.max(10, baseRate + timingBonus + powerBonus - healthPenalty));
    
    // Pokéball shaking animation (3 rolls)
    const rolls: number[] = [];
    let shakeCount = 0;
    
    const shakeInterval = setInterval(() => {
      const roll = Math.random() * 100;
      rolls.push(roll);
      shakeCount++;
      
      setShakingEffect(shakeCount);
      setCaptureRoll(rolls);
      
      if (shakeCount >= 3) {
        clearInterval(shakeInterval);
        
        // Final capture determination
        const success = rolls.every(roll => roll < finalRate);
        
        setTimeout(() => {
          if (success) {
            setGamePhase('success');
            setMonsterReaction('captured');
            setCapturedMonsterData(targetMonster);
            startCardTransformation();
          } else {
            setGamePhase('failure');
            setMonsterReaction('aggressive');
            // Monster breaks free and might flee
            setTimeout(() => {
              setGamePhase('monitoring');
              setMonsterReaction('calm');
              setSelectedCard(null);
            }, 2000);
          }
        }, 1000);
      }
    }, 1200);
  };

  const startCardTransformation = () => {
    setShowTransformation(true);
    setTransformationStep(0);
    
    const transformationSequence = [
      { step: 0, duration: 1000 }, // Blank mirror card
      { step: 1, duration: 800 },  // Cracks appear
      { step: 2, duration: 500 },  // Surface shatters
      { step: 3, duration: 300 },  // Brilliant flash
      { step: 4, duration: 1200 }, // Monster artwork burns in
      { step: 5, duration: 800 },  // Element frame materializes
      { step: 6, duration: 1500 }  // Final Summon Relic complete
    ];

    let currentStep = 0;
    const nextStep = () => {
      if (currentStep < transformationSequence.length - 1) {
        currentStep++;
        setTransformationStep(currentStep);
        setTimeout(nextStep, transformationSequence[currentStep].duration);
      } else {
        // Transformation complete
        setTimeout(() => {
          setShowTransformation(false);
          setTransformationStep(0);
        }, 2000);
      }
    };

    setTimeout(nextStep, transformationSequence[0].duration);
  };

  const purchaseCards = () => {
    // In a real app, this would integrate with payment processing
    const confirmed = confirm('Purchase 50 Blank Cards for $1.00?');
    if (confirmed) {
      setCardInventory(prev => prev + 50);
      setShowShop(false);
      alert('Success! 50 Blank Cards added to your inventory.');
    }
  };

  const resetCapture = () => {
    setGamePhase('monitoring');
    setSelectedCard(null);
    setThrowPower(0);
    setThrowTiming(null);
    setCardInFlight(false);
    setMonsterReaction('calm');
    setShakingEffect(0);
    setCaptureRoll([]);
    setCapturedMonsterData(null);
  };

  return (
    <div className="min-h-screen bg-gray-950 pt-20 pb-24 relative overflow-hidden">
      {/* Dynamic Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/20 via-transparent to-black/40"></div>
        {gamePhase === 'capturing' && (
          <div className={`absolute inset-0 animate-pulse ${
            shakingEffect > 0 ? 'bg-red-500/10' : 'bg-purple-500/10'
          }`}></div>
        )}
        {monsterReaction === 'aggressive' && (
          <div className="absolute inset-0 bg-red-600/20 animate-pulse"></div>
        )}
      </div>

      {/* Card Transformation Modal */}
      {showTransformation && capturedMonsterData && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-gray-900 border-2 border-purple-600 rounded-2xl p-6 max-w-sm w-full">
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">✨</div>
              <h3 className="text-2xl font-bold text-white mb-2">Card Transformation</h3>
              <p className="text-purple-300 text-sm">Blank Card → Summon Relic</p>
            </div>

            <div className="mb-6 flex justify-center">
              <div className="relative">
                {/* Transformation Animation */}
                <div className={`w-48 h-72 rounded-2xl relative overflow-hidden transition-all duration-500 ${
                  transformationStep <= 2 
                    ? 'bg-gradient-to-br from-gray-300 to-gray-500 border-4 border-gray-400' 
                    : 'bg-gradient-to-br from-red-500 to-orange-600 border-4 border-red-400'
                }`}>
                  
                  {/* Step 0-1: Mirror Surface */}
                  {transformationStep <= 1 && (
                    <div className="absolute inset-0">
                      {/* Mystical runes around border */}
                      <div className="absolute inset-2 border border-gray-400/50 rounded-lg">
                        {/* Corner runes */}
                        <div className="absolute top-1 left-1 text-gray-500 text-xs">◊</div>
                        <div className="absolute top-1 right-1 text-gray-500 text-xs">◊</div>
                        <div className="absolute bottom-1 left-1 text-gray-500 text-xs">◊</div>
                        <div className="absolute bottom-1 right-1 text-gray-500 text-xs">◊</div>
                      </div>
                      
                      {/* Mirror reflection effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent transform rotate-45 animate-pulse"></div>
                      
                      {/* Step 1: Cracks begin to appear */}
                      {transformationStep === 1 && (
                        <div className="absolute inset-0">
                          <div className="absolute inset-4 border-8 border-white/30" style={{
                            borderStyle: 'solid',
                            borderImage: 'repeating-linear-gradient(45deg, transparent, transparent 3px, white 3px, white 6px) 8'
                          }}></div>
                        </div>
                      )}
                      
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-gray-500 text-center">
                          <div className="text-2xl mb-2">📜</div>
                          <div className="text-xs">Blank Card</div>
                          <div className="text-xs">Mirror Surface</div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Step 2: Surface Shatters */}
                  {transformationStep === 2 && (
                    <div className="absolute inset-0 bg-white animate-ping"></div>
                  )}
                  
                  {/* Step 3: Brilliant Flash */}
                  {transformationStep === 3 && (
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-200 to-white animate-pulse"></div>
                  )}
                  
                  {/* Step 4+: Monster Artwork Appears */}
                  {transformationStep >= 4 && (
                    <div className="absolute inset-0">
                      <div 
                        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
                        style={{
                          backgroundImage: `url(https://readdy.ai/api/search-image?query=Young%20fire%20dragon%20with%20molten%20lava%20veins%2C%20crystalline%20scales%20glowing%20with%20inner%20fire%2C%20breathing%20small%20flames%2C%20epic%20fantasy%20monster%20card%20artwork%20with%20volcanic%20background%2C%20detailed%20creature%20portrait&width=180&height=270&seq=transformation-flare-drake&orientation=portrait)`,
                          opacity: transformationStep >= 4 ? 1 : 0
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30"></div>
                        
                        {/* Monster Info */}
                        <div className="absolute top-3 left-3 right-3 text-center">
                          <div className="text-white font-bold text-sm">{capturedMonsterData.name}</div>
                          <div className="text-red-300 text-xs">{capturedMonsterData.element} Beast</div>
                        </div>
                        
                        <div className="absolute bottom-3 left-3 right-3">
                          <div className="flex justify-between mb-2">
                            <div className="bg-red-600/80 text-white text-xs px-2 py-1 rounded">
                              ATK: {capturedMonsterData.power}
                            </div>
                            <div className="bg-blue-600/80 text-white text-xs px-2 py-1 rounded">
                              DEF: {capturedMonsterData.defense}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-yellow-400 text-xs font-semibold">✦ SUMMON RELIC ✦</div>
                            <div className="text-gray-300 text-xs">Fire Element</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Step 5+: Element Frame Materializes */}
                  {transformationStep >= 5 && (
                    <div className="absolute -inset-2 transition-all duration-800">
                      <div className="w-full h-full border-4 border-red-400 rounded-3xl" style={{
                        background: 'linear-gradient(45deg, #f87171, #fb923c, #f87171)',
                        backgroundSize: '200% 200%',
                        animation: 'gradient 3s ease infinite',
                        filter: 'drop-shadow(0 0 20px rgba(248, 113, 113, 0.8))'
                      }}></div>
                    </div>
                  )}
                  
                  {/* Step 6: Final Glow Effect */}
                  {transformationStep >= 6 && (
                    <div className="absolute -inset-4 border border-red-400/60 rounded-full animate-pulse opacity-50"></div>
                  )}
                </div>
              </div>
            </div>

            <div className="text-center mb-4">
              <div className="text-purple-400 font-bold text-lg mb-2">
                {transformationStep === 0 ? 'Mirror Surface Ready' :
                 transformationStep === 1 ? 'Essence Absorption' :
                 transformationStep === 2 ? 'Surface Fracturing' :
                 transformationStep === 3 ? 'Magical Restructure' :
                 transformationStep === 4 ? 'Monster Artwork Emerging' :
                 transformationStep === 5 ? 'Element Frame Forming' :
                 'Summon Relic Complete!'}
              </div>
              <div className="text-gray-300 text-sm">
                {transformationStep <= 1 ? 'Blank card detecting monster essence...' :
                 transformationStep === 2 ? 'Mirror surface breaking apart...' :
                 transformationStep === 3 ? 'Brilliant magical energy released...' :
                 transformationStep === 4 ? 'Monster spirit binding to card...' :
                 transformationStep === 5 ? 'Fire element frame materializing...' :
                 'Transformation complete! Ready for battle.'}
              </div>
            </div>

            <div className="flex justify-center space-x-1 mb-4">
              {[0,1,2,3,4,5,6].map((step) => (
                <div
                  key={step}
                  className={`w-2 h-2 rounded-full transition-all ${
                    step <= transformationStep ? 'bg-purple-400' : 'bg-gray-600'
                  }`}
                ></div>
              ))}
            </div>

            {transformationStep >= 6 && (
              <div className="text-center">
                <button
                  onClick={() => {
                    setShowTransformation(false);
                    setTransformationStep(0);
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold"
                >
                  🎉 Amazing! Continue
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Header */}
      <header className="fixed top-0 w-full bg-black/40 backdrop-blur-md z-50 border-b border-red-800/30">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <i className="ri-arrow-left-line text-white text-xl mr-2"></i>
            <span className="text-white font-semibold">Pokéball Capture System</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-red-400 text-sm flex items-center">
              <span className="w-4 h-4 bg-red-500 rounded-full mr-1"></span>
              {cardInventory} Cards
            </div>
            <button
              onClick={() => setShowShop(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-full text-sm"
            >
              💰 Shop
            </button>
          </div>
        </div>
      </header>

      {/* Card Shop Modal */}
      {showShop && (
        <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4">
          <div className="bg-gray-900 border-2 border-green-600 rounded-2xl p-6 max-w-sm w-full">
            <div className="text-center mb-6">
              <div className="text-4xl mb-2">🛒</div>
              <h2 className="text-2xl font-bold text-white mb-2">Blank Card Shop</h2>
              <p className="text-gray-400 text-sm">Stock up on capture essentials</p>
            </div>

            <div className="bg-gray-800/70 border border-gray-700 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl">📜</span>
                  </div>
                  <div>
                    <div className="text-white font-bold">50 Blank Cards</div>
                    <div className="text-gray-400 text-sm">Mirror surface capture cards</div>
                  </div>
                </div>
                <div className="text-green-400 font-bold text-xl">$1.00</div>
              </div>
              
              <div className="text-gray-300 text-sm mb-4">
                Perfect for extended hunting sessions. Each card transforms with captured monster artwork.
              </div>
              
              <button
                onClick={purchaseCards}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold"
              >
                💳 Purchase Now
              </button>
            </div>

            <div className="text-center text-gray-400 text-xs mb-4">
              💡 Pro tip: Perfect timing during monster's stunned state increases capture rate by 25%
            </div>

            <button
              onClick={() => setShowShop(false)}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg"
            >
              Close Shop
            </button>
          </div>
        </div>
      )}

      {/* Monster Encounter Area */}
      <section className="px-4 py-6 relative z-10">
        <div className="bg-black/60 border-2 border-red-600/50 rounded-2xl p-4 mb-6">
          <div className="text-center mb-3">
            <div className="text-red-400 text-sm font-semibold">Wild Monster Encounter</div>
            <div className="text-white text-xs">Wait for the perfect moment to throw</div>
          </div>
          
          {/* Monster Display */}
          <div className="relative">
            <div 
              className={`h-48 rounded-xl bg-cover bg-center relative overflow-hidden border-2 transition-all duration-300 ${
                monsterReaction === 'aggressive' ? 'border-red-500 animate-pulse' :
                monsterReaction === 'alert' ? 'border-yellow-500' :
                monsterReaction === 'captured' ? 'border-green-500' :
                'border-red-400/50'
              }`}
              style={{
                backgroundImage: `url(https://readdy.ai/api/search-image?query=Wild%20fire%20dragon%20in%20natural%20habitat%20breathing%20flames%20with%20intense%20glowing%20eyes%2C%20realistic%20monster%20in%20wilderness%20environment%2C%20dramatic%20lighting%20with%20fire%20effects%20around%20creature&width=300&height=180&seq=wild-flare-drake&orientation=landscape)`
              }}
            >
              <div className="absolute inset-0 bg-black/20 rounded-xl">
                {/* Monster Status UI */}
                <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                  🎯 {targetMonster?.name || wildMonster.name}
                </div>
                <div className="absolute top-2 right-2 bg-purple-600/80 text-white text-xs px-2 py-1 rounded-full">
                  HP: {targetMonster?.hp || wildMonster.hp}/{targetMonster?.maxHp || wildMonster.maxHp}
                </div>
                
                {/* Current Action Indicator */}
                <div className="absolute bottom-2 left-2">
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    (targetMonster?.currentAction || wildMonster.currentAction) === 'stunned' ? 'bg-green-600/80 text-white animate-pulse' :
                    (targetMonster?.currentAction || wildMonster.currentAction) === 'attacking' ? 'bg-red-600/80 text-white' :
                    (targetMonster?.currentAction || wildMonster.currentAction) === 'defending' ? 'bg-blue-600/80 text-white' :
                    'bg-gray-600/80 text-white'
                  }`}>
                    {(targetMonster?.currentAction || wildMonster.currentAction) === 'stunned' ? '😵 Stunned - Perfect!' :
                     (targetMonster?.currentAction || wildMonster.currentAction) === 'attacking' ? '⚔️ Attacking' :
                     (targetMonster?.currentAction || wildMonster.currentAction) === 'defending' ? '🛡️ Defending' :
                     '😐 Idle'}
                  </div>
                </div>
                
                {/* Capture Window Indicator */}
                {(targetMonster?.captureWindow || wildMonster.captureWindow) && (
                  <div className="absolute bottom-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full animate-bounce">
                    ✨ CAPTURE WINDOW!
                  </div>
                )}

                {/* Flying Card Animation */}
                {cardInFlight && selectedCard && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`w-12 h-12 rounded-full ${getCardDesign(selectedCard).ballColor} border-2 ${getCardDesign(selectedCard).border} animate-bounce transform transition-all duration-1500`}>
                      <div className="w-full h-full rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-black rounded-full"></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Shaking Effect during Capture */}
                {gamePhase === 'capturing' && shakingEffect > 0 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`w-16 h-16 rounded-full ${getCardDesign(selectedCard!).ballColor} border-4 ${getCardDesign(selectedCard!).border} ${
                      shakingEffect % 2 === 0 ? 'animate-bounce' : 'animate-pulse'
                    }`}>
                      <div className="w-full h-full rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 bg-black rounded-full"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pokéball Selection */}
      <section className="px-4 py-6 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Select Your Pokéball</h2>
          <div className="text-red-400 text-sm">Strategic Timing Required</div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          {blankCards.map((card) => {
            const design = getCardDesign(card);
            return (
              <button
                key={card.id}
                onClick={() => startAiming(card)}
                disabled={gamePhase === 'capturing' || cardInventory <= 0}
                className={`relative p-4 rounded-2xl border-2 transition-all ${
                  selectedCard?.id === card.id
                    ? `${design.border} bg-gradient-to-br ${design.gradient}/30`
                    : `border-gray-700 bg-gray-800/50 hover:${design.border}`
                } ${gamePhase === 'capturing' || cardInventory <= 0 ? 'opacity-50' : ''}`}
              >
                {/* Pokéball Design */}
                <div className="relative mb-3 flex justify-center">
                  <div className={`w-16 h-16 rounded-full ${design.ballColor} border-4 ${design.border} shadow-lg ${design.glow} shadow-lg`}>
                    <div className="w-full h-full rounded-full flex items-center justify-center relative">
                      {/* Ball center button */}
                      <div className="w-4 h-4 bg-black rounded-full border-2 border-white"></div>
                      {/* Ball separator line */}
                      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-black transform -translate-y-1/2"></div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className={`font-bold text-sm mb-1 bg-gradient-to-r ${design.gradient} bg-clip-text text-transparent`}>
                    {card.type} Ball
                  </div>
                  <div className="text-gray-300 text-xs mb-2">{card.rarity}</div>
                  <div className="text-green-400 text-xs">
                    {card.captureRate}% Base Rate
                  </div>
                  <div className="text-purple-400 text-xs">
                    Power: {card.throwPower}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Throw Interface */}
      {gamePhase === 'aiming' && (
        <section className="px-4 py-6 relative z-10">
          <div className="bg-gray-900/80 border-2 border-yellow-600 rounded-2xl p-6">
            <div className="text-center mb-6">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="text-xl font-bold text-white mb-2">Aim Your Pokéball</h3>
              <p className="text-gray-300 text-sm">Wait for the perfect moment, then charge your throw!</p>
            </div>

            {/* Monster Behavior Guide */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-green-900/30 border border-green-600 rounded-lg p-3">
                <div className="text-green-400 font-bold text-sm mb-1">Perfect Timing</div>
                <div className="text-green-300 text-xs">Monster is stunned (+25% rate)</div>
              </div>
              <div className="bg-blue-900/30 border border-blue-600 rounded-lg p-3">
                <div className="text-blue-400 font-bold text-sm mb-1">Good Timing</div>
                <div className="text-blue-300 text-xs">Monster is idle (+10% rate)</div>
              </div>
              <div className="bg-orange-900/30 border border-orange-600 rounded-lg p-3">
                <div className="text-orange-400 font-bold text-sm mb-1">Poor Timing</div>
                <div className="text-orange-300 text-xs">Monster is defending (-15% rate)</div>
              </div>
              <div className="bg-red-900/30 border border-red-600 rounded-lg p-3">
                <div className="text-red-400 font-bold text-sm mb-1">Bad Timing</div>
                <div className="text-red-300 text-xs">Monster is attacking (-15% rate)</div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button 
                onClick={chargePower}
                className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-lg font-semibold"
              >
                ⚡ Charge Throw
              </button>
              <button 
                onClick={() => setGamePhase('monitoring')}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold"
              >
                ❌ Cancel
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Power Charging Interface */}
      {gamePhase === 'throwing' && (
        <section className="px-4 py-6 relative z-10">
          <div className="bg-gray-900/80 border-2 border-purple-600 rounded-2xl p-6">
            <div className="text-center mb-6">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="text-xl font-bold text-white mb-2">Charging Throw Power</h3>
              <p className="text-gray-300 text-sm">Release at the right moment for maximum effectiveness!</p>
            </div>

            {/* Power Meter */}
            <div className="mb-6">
              <div className="bg-gray-700 rounded-full h-6 mb-2 relative">
                <div 
                  className={`h-6 rounded-full transition-all duration-100 ${
                    throwPower < 30 ? 'bg-red-500' :
                    throwPower < 70 ? 'bg-yellow-500' :
                    throwPower < 90 ? 'bg-green-500' :
                    'bg-purple-500'
                  }`}
                  style={{ width: `${throwPower}%` }}
                ></div>
                {/* Perfect zone indicator */}
                <div className="absolute top-0 left-[70%] w-[20%] h-6 border-2 border-green-400/50 rounded"></div>
              </div>
              <div className="text-center">
                <div className="text-white font-bold text-lg">{Math.floor(throwPower)}% Power</div>
                <div className="text-gray-400 text-sm">
                  {throwPower < 30 ? 'Too Weak' :
                   throwPower < 70 ? 'Getting There' :
                   throwPower < 90 ? 'Perfect Zone!' :
                   'Maximum Power!'}
                </div>
              </div>
            </div>

            <button 
              onClick={executeThrow}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold"
            >
              🎯 THROW NOW!
            </button>
          </div>
        </section>
      )}

      {/* Capture Sequence */}
      {gamePhase === 'capturing' && (
        <section className="px-4 py-6 relative z-10">
          <div className="bg-gray-900/80 border-2 border-red-600 rounded-2xl p-6">
            <div className="text-center mb-6">
              <div className="text-4xl mb-2">
                {shakingEffect === 0 ? '⚪' :
                 shakingEffect === 1 ? '🔴' :
                 shakingEffect === 2 ? '🟠' :
                 '🟢'}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {shakingEffect === 0 ? 'Pokéball Thrown!' :
                 shakingEffect < 3 ? `Shake ${shakingEffect}/3` :
                 'Final Shake...'}
              </h3>
              <p className="text-gray-300 text-sm">
                {throwTiming && `${throwTiming} timing! ${getTimingBonus(throwTiming) >= 0 ? '+' : ''}${getTimingBonus(throwTiming)}% bonus`}
              </p>
            </div>

            {/* Capture Roll Display */}
            {captureRoll.length > 0 && (
              <div className="mb-6">
                <div className="text-white font-semibold text-sm mb-2">Capture Rolls:</div>
                <div className="grid grid-cols-3 gap-2">
                  {captureRoll.map((roll, index) => (
                    <div key={index} className={`text-center p-2 rounded ${
                      roll < (selectedCard?.captureRate || 50) ? 'bg-green-600/30 border border-green-500' : 'bg-red-600/30 border border-red-500'
                    }`}>
                      <div className="text-white text-sm font-bold">{Math.floor(roll)}</div>
                      <div className={`text-xs ${roll < (selectedCard?.captureRate || 50) ? 'text-green-400' : 'text-red-400'}`}>
                        {roll < (selectedCard?.captureRate || 50) ? 'Success' : 'Failed'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="text-center text-gray-400 text-sm">
              {shakingEffect < 3 ? 'Monster is struggling...' : 'Determining final result...'}
            </div>
          </div>
        </section>
      )}

      {/* Success/Failure Results */}
      {(gamePhase === 'success' || gamePhase === 'failure') && (
        <section className="px-4 py-6 relative z-10">
          <div className={`bg-gray-900/80 border-2 rounded-2xl p-6 ${
            gamePhase === 'success' ? 'border-green-600' : 'border-red-600'
          }`}>
            <div className="text-center mb-6">
              <div className="text-4xl mb-2">
                {gamePhase === 'success' ? '🎉' : '💨'}
              </div>
              <h3 className={`text-xl font-bold mb-2 ${
                gamePhase === 'success' ? 'text-green-400' : 'text-red-400'
              }`}>
                {gamePhase === 'success' ? 'Capture Successful!' : 'Monster Broke Free!'}
              </h3>
              <p className="text-gray-300 text-sm">
                {gamePhase === 'success' 
                  ? 'The Wild Flare Drake has been captured! Watch your Blank Card transform into a Summon Relic!' 
                  : 'The monster escaped! Try again with better timing or a stronger Pokéball.'
                }
              </p>
            </div>

            {gamePhase === 'success' && (
              <div className="bg-green-900/30 border border-green-600 rounded-xl p-4 mb-4">
                <div className="text-center">
                  <div className="text-green-400 font-bold mb-2">Monster Captured!</div>
                  <div className="text-white font-semibold">Flare Drake</div>
                  <div className="text-gray-300 text-sm">Fire Type • Level 15</div>
                  <div className="text-green-400 text-xs mt-2">✨ Card will transform shortly</div>
                </div>
              </div>
            )}

            <div className="flex space-x-3">
              <button 
                onClick={resetCapture}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
              >
                🔄 Continue Hunting
              </button>
              {gamePhase === 'success' && (
                <button 
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold"
                >
                  📋 View Collection
                </button>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Pokéball Strategy Guide */}
      <section className="px-4 py-6 relative z-10">
        <div className="bg-gray-800/50 rounded-xl p-4">
          <h3 className="text-white font-bold mb-3">🎯 Blank Card System Guide</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-start space-x-2">
              <span className="text-red-400">•</span>
              <span className="text-gray-300">Cards start as mirror surfaces and transform when monsters are captured</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-red-400">•</span>
              <span className="text-gray-300">Watch monster behavior - stunned state gives Perfect timing (+25%)</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-red-400">•</span>
              <span className="text-gray-300">Charge throw power to 70-90% for optimal effectiveness</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-red-400">•</span>
              <span className="text-gray-300">Higher tier Pokéballs have better base capture rates</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-red-400">•</span>
              <span className="text-gray-300">Each throw uses one card - stock up in the shop for $1/50 cards</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-red-400">•</span>
              <span className="text-gray-300">Successful captures create unique Summon Relic cards with monster artwork</span>
            </div>
          </div>
        </div>
      </section>

      {/* Inventory Status */}
      <section className="px-4 py-6 relative z-10">
        <div className="bg-gray-800/50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-bold">Card Inventory</h3>
              <div className="text-gray-400 text-sm">
                {cardInventory} Blank Cards remaining
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-lg">📜</span>
              </div>
              <div className="text-white font-bold text-lg">{cardInventory}</div>
            </div>
          </div>
          
          {cardInventory <= 5 && (
            <div className="mt-3 bg-orange-900/30 border border-orange-600 rounded-lg p-3">
              <div className="text-orange-400 text-sm font-semibold">⚠️ Running Low!</div>
              <div className="text-orange-300 text-xs">Stock up in the shop - 50 cards for just $1</div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
