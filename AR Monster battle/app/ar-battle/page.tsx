
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface Monster {
  id: string;
  name: string;
  level: number;
  type: string;
  element: string;
  model: string;
  attacks: Attack[];
  health: number;
  maxHealth: number;
}

interface Attack {
  name: string;
  damage: number;
  animation: string;
  effects: string[];
}

export default function ARBattlePage() {
  const [isARActive, setIsARActive] = useState(false);
  const [selectedMonster, setSelectedMonster] = useState<Monster | null>(null);
  const [battleState, setBattleState] = useState<'selection' | 'summoning' | 'battle' | 'victory'>('selection');
  const [playerMonster, setPlayerMonster] = useState<Monster | null>(null);
  const [opponentMonster, setOpponentMonster] = useState<Monster | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const playerMonsters: Monster[] = [
    {
      id: '1',
      name: 'Flare Drake',
      level: 1,
      type: 'Dragon',
      element: 'Fire',
      model: '3d-flare-drake',
      attacks: [
        { name: 'Flame Burst', damage: 80, animation: 'flame-burst', effects: ['fire-explosion', 'ember-rain'] },
        { name: 'Dragon Roar', damage: 60, animation: 'roar-shockwave', effects: ['sound-waves', 'intimidate'] }
      ],
      health: 100,
      maxHealth: 100
    },
    {
      id: '2',
      name: 'Stone Golem',
      level: 1,
      type: 'Construct',
      element: 'Earth',
      model: '3d-stone-golem',
      attacks: [
        { name: 'Boulder Smash', damage: 90, animation: 'boulder-throw', effects: ['rock-shatter', 'ground-crack'] },
        { name: 'Earth Shield', damage: 40, animation: 'defensive-stance', effects: ['stone-barrier', 'defense-boost'] }
      ],
      health: 120,
      maxHealth: 120
    },
    {
      id: '3',
      name: 'Aero Serpent',
      level: 1,
      type: 'Dragon',
      element: 'Air',
      model: '3d-aero-serpent',
      attacks: [
        { name: 'Wind Slash', damage: 70, animation: 'tornado-spin', effects: ['wind-blades', 'air-pressure'] },
        { name: 'Lightning Strike', damage: 85, animation: 'electric-dive', effects: ['lightning-bolt', 'shock-wave'] }
      ],
      health: 90,
      maxHealth: 90
    }
  ];

  const startARCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsARActive(true);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  };

  const summonMonster = (monster: Monster) => {
    setSelectedMonster(monster);
    setBattleState('summoning');
    setIsAnimating(true);
    
    setTimeout(() => {
      setPlayerMonster(monster);
      setOpponentMonster({
        id: 'opp1',
        name: 'Shadow Beast',
        level: 1,
        type: 'Fiend',
        element: 'Dark',
        model: '3d-shadow-beast',
        attacks: [
          { name: 'Dark Claw', damage: 75, animation: 'claw-strike', effects: ['shadow-slash', 'dark-energy'] }
        ],
        health: 95,
        maxHealth: 95
      });
      setBattleState('battle');
      setIsAnimating(false);
    }, 3000);
  };

  const executeAttack = (attack: Attack) => {
    setIsAnimating(true);
    setTimeout(() => {
      if (opponentMonster) {
        const newHealth = Math.max(0, opponentMonster.health - attack.damage);
        setOpponentMonster({...opponentMonster, health: newHealth});
        if (newHealth === 0) {
          setBattleState('victory');
        }
      }
      setIsAnimating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black/80 z-10"></div>
      
      {/* AR Camera View */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* AR Overlay UI */}
      <div className="relative z-20 h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-black/50 backdrop-blur-sm">
          <Link href="/duel-monster-world" className="text-white">
            <i className="ri-arrow-left-line text-2xl"></i>
          </Link>
          <h1 className="text-white font-bold text-lg">AR Monster Battle</h1>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-white text-sm">LIVE AR</span>
          </div>
        </div>

        {/* Monster Selection */}
        {battleState === 'selection' && (
          <div className="flex-1 flex flex-col justify-center items-center p-4">
            <div className="text-center mb-8">
              <h2 className="text-white text-2xl font-bold mb-2">Choose Your Battle Monster</h2>
              <p className="text-gray-300">Select a monster card to summon into AR</p>
            </div>

            {!isARActive ? (
              <button
                onClick={startARCamera}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg mb-8 flex items-center space-x-2"
              >
                <i className="ri-camera-line text-xl"></i>
                <span>Start AR Camera</span>
              </button>
            ) : (
              <div className="grid grid-cols-1 gap-4 w-full max-w-sm">
                {playerMonsters.map((monster) => (
                  <div
                    key={monster.id}
                    onClick={() => summonMonster(monster)}
                    className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-xl p-4 cursor-pointer transform hover:scale-105 transition-all duration-300 border-2 border-amber-400"
                  >
                    <div className="bg-gradient-to-b from-orange-800 to-red-900 rounded-lg p-3 mb-3 h-32 flex items-center justify-center relative overflow-hidden">
                      <img
                        src={`https://readdy.ai/api/search-image?query=Realistic%203D%20$%7Bmonster.name%7D%20$%7Bmonster.element%7D%20$%7Bmonster.type%7D%20monster%2C%20fantasy%20creature%2C%20detailed%20textures%2C%20dramatic%20lighting%2C%20battle%20ready%20pose%2C%20high%20quality%203D%20render%2C%20cinematic%20composition%2C%20dark%20fantasy%20aesthetic&width=200&height=150&seq=${monster.id}-card&orientation=landscape`}
                        alt={monster.name}
                        className="w-full h-full object-cover rounded"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                    <div className="text-center">
                      <h3 className="text-white font-bold text-lg">{monster.name}</h3>
                      <p className="text-amber-200">Lv.{monster.level}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Summoning Animation */}
        {battleState === 'summoning' && (
          <div className="flex-1 flex flex-col justify-center items-center p-4">
            <div className="relative">
              <div className="w-64 h-80 bg-gradient-to-b from-amber-600 to-orange-600 rounded-xl p-4 transform rotate-12 animate-pulse">
                <div className="bg-gradient-to-b from-orange-800 to-red-900 rounded-lg h-48 mb-4 flex items-center justify-center overflow-hidden">
                  <img
                    src={`https://readdy.ai/api/search-image?query=Realistic%203D%20$%7BselectedMonster%3F.name%7D%20$%7BselectedMonster%3F.element%7D%20$%7BselectedMonster%3F.type%7D%20monster%2C%20fantasy%20creature%2C%20detailed%20textures%2C%20dramatic%20lighting%2C%20battle%20ready%20pose%2C%20high%20quality%203D%20render%2C%20cinematic%20composition%2C%20dark%20fantasy%20aesthetic&width=300&height=200&seq=${selectedMonster?.id}-summon&orientation=landscape`}
                    alt={selectedMonster?.name}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-white font-bold text-xl">{selectedMonster?.name}</h3>
                  <p className="text-amber-200">Lv.{selectedMonster?.level}</p>
                </div>
              </div>
              <div className="absolute inset-0 border-4 border-blue-400 rounded-xl animate-ping"></div>
            </div>
            <div className="mt-8 text-center">
              <h2 className="text-white text-2xl font-bold mb-2">Summoning Monster...</h2>
              <p className="text-blue-300">Monster materializing in AR space</p>
              <div className="flex justify-center items-center mt-4 space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}

        {/* AR Battle Interface */}
        {battleState === 'battle' && playerMonster && opponentMonster && (
          <div className="flex-1 flex flex-col">
            {/* Monster Health Bars */}
            <div className="p-4 space-y-4">
              {/* Opponent Monster */}
              <div className="bg-red-600/80 backdrop-blur-sm rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-bold">{opponentMonster.name}</span>
                  <span className="text-red-200">Lv.{opponentMonster.level}</span>
                </div>
                <div className="bg-black/50 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-red-500 h-full transition-all duration-500"
                    style={{width: `${(opponentMonster.health / opponentMonster.maxHealth) * 100}%`}}
                  ></div>
                </div>
                <div className="text-right text-white text-sm mt-1">
                  {opponentMonster.health}/{opponentMonster.maxHealth} HP
                </div>
              </div>

              {/* Player Monster */}
              <div className="bg-blue-600/80 backdrop-blur-sm rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-bold">{playerMonster.name}</span>
                  <span className="text-blue-200">Lv.{playerMonster.level}</span>
                </div>
                <div className="bg-black/50 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-blue-500 h-full transition-all duration-500"
                    style={{width: `${(playerMonster.health / playerMonster.maxHealth) * 100}%`}}
                  ></div>
                </div>
                <div className="text-right text-white text-sm mt-1">
                  {playerMonster.health}/{playerMonster.maxHealth} HP
                </div>
              </div>
            </div>

            {/* AR Battle Visualization */}
            <div className="flex-1 relative">
              <div className="absolute inset-4 border-2 border-blue-400/50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full animate-pulse mb-4 flex items-center justify-center">
                    <i className="ri-eye-line text-2xl text-blue-400"></i>
                  </div>
                  <p className="text-white/70">3D Monsters Battling in AR</p>
                  <p className="text-blue-300 text-sm">Point camera at flat surface</p>
                </div>
              </div>

              {isAnimating && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-yellow-400/20 w-32 h-32 rounded-full animate-ping"></div>
                  <div className="absolute">
                    <i className="ri-flashlight-line text-4xl text-yellow-400 animate-bounce"></i>
                  </div>
                </div>
              )}
            </div>

            {/* Attack Controls */}
            <div className="p-4 bg-black/80 backdrop-blur-sm">
              <h3 className="text-white font-bold mb-3 text-center">Choose Attack</h3>
              <div className="grid grid-cols-2 gap-3">
                {playerMonster.attacks.map((attack, index) => (
                  <button
                    key={index}
                    onClick={() => executeAttack(attack)}
                    disabled={isAnimating}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-lg font-bold disabled:opacity-50 transform hover:scale-105 transition-all duration-200"
                  >
                    <div className="text-center">
                      <i className="ri-sword-line text-2xl mb-2 block"></i>
                      <div className="text-sm">{attack.name}</div>
                      <div className="text-xs text-purple-200 mt-1">{attack.damage} DMG</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Victory Screen */}
        {battleState === 'victory' && (
          <div className="flex-1 flex flex-col justify-center items-center p-4">
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-yellow-500 rounded-full flex items-center justify-center mb-4 mx-auto animate-bounce">
                <i className="ri-trophy-line text-4xl text-white"></i>
              </div>
              <h2 className="text-yellow-400 text-3xl font-bold mb-2">VICTORY!</h2>
              <p className="text-white text-lg">Your {playerMonster?.name} wins!</p>
            </div>

            <div className="space-y-4 w-full max-w-sm">
              <button
                onClick={() => setBattleState('selection')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full font-bold"
              >
                Battle Again
              </button>
              <Link href="/tournaments" className="block">
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-full font-bold">
                  Enter Tournament
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
