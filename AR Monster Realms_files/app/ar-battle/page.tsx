
'use client';

import { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Box } from '@react-three/drei';
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

export default function ARBattle() {
  const [isARActive, setIsARActive] = useState(false);
  const [demoMode, setDemoMode] = useState(false);
  const [selectedMonster, setSelectedMonster] = useState<string | null>(null);
  const [battleState, setBattleState] = useState<'selecting' | 'battling' | 'result'>('selecting');
  const [playerHP, setPlayerHP] = useState(100);
  const [enemyHP, setEnemyHP] = useState(100);
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  const monsters = [
    { id: '1', name: 'Fire Dragon', power: 85, element: 'Fire', color: '#ff4444' },
    { id: '2', name: 'Water Serpent', power: 78, element: 'Water', color: '#4444ff' },
    { id: '3', name: 'Earth Golem', power: 92, element: 'Earth', color: '#44ff44' },
    { id: '4', name: 'Lightning Wolf', power: 80, element: 'Electric', color: '#ffff44' },
  ];

  const startARMode = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsARActive(true);
      }
    } catch (error) {
      console.log('Camera access denied or not available');
      setDemoMode(true);
    }
  };

  const selectMonster = (monsterId: string) => {
    setSelectedMonster(monsterId);
    setBattleState('battling');
    startBattle(monsterId);
  };

  const startBattle = (monsterId: string) => {
    const selectedMon = monsters.find((m) => m.id === monsterId);
    const enemyMon = monsters[Math.floor(Math.random() * monsters.length)];

    setBattleLog([`${selectedMon?.name} vs ${enemyMon.name}!`, 'Battle begins!']);

    const battleInterval = setInterval(() => {
      const playerDamage = Math.floor(Math.random() * 25) + 10;
      const enemyDamage = Math.floor(Math.random() * 25) + 10;

      setEnemyHP((prev) => {
        const newHP = Math.max(0, prev - playerDamage);
        if (newHP <= 0) {
          setBattleState('result');
          setBattleLog((prev) => [...prev, `${selectedMon?.name} wins!`]);
          clearInterval(battleInterval);
        }
        return newHP;
      });

      setPlayerHP((prev) => {
        const newHP = Math.max(0, prev - enemyDamage);
        if (newHP <= 0) {
          setBattleState('result');
          setBattleLog((prev) => [...prev, `${enemyMon.name} wins!`]);
          clearInterval(battleInterval);
        }
        return newHP;
      });

      setBattleLog((prev) => [
        ...prev.slice(-3),
        `${selectedMon?.name} deals ${playerDamage} damage!`,
        `${enemyMon.name} deals ${enemyDamage} damage!`,
      ]);
    }, 2000);
  };

  const resetBattle = () => {
    setBattleState('selecting');
    setSelectedMonster(null);
    setPlayerHP(100);
    setEnemyHP(100);
    setBattleLog([]);
  };

  // Cleanup video stream when component unmounts
  useEffect(() => {
    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Demo Monster Component for 3D display
  const DemoMonster = ({
    monster,
    position,
  }: {
    monster: any;
    position: [number, number, number];
  }) => (
    <group position={position}>
      <Box args={[1, 1.5, 0.5]} position={[0, 0.75, 0]}>
        <meshStandardMaterial color={monster.color} />
      </Box>
      <Text position={[0, 2, 0]} fontSize={0.3} color="white" anchorX="center" anchorY="middle">
        {monster.name}
      </Text>
      <Text position={[0, -0.5, 0]} fontSize={0.2} color="yellow" anchorX="center" anchorY="middle">
        Power: {monster.power}
      </Text>
    </group>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-black text-white relative overflow-hidden">
      {/* Background Effects */}
      <div
        className={`absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M20 20c0-11.046-8.954-20-20-20v20h20z"/%3E%3C/g%3E%3C/svg%3E')] opacity-20`}
      ></div>

      {/* Header */}
      <div className="relative z-10 p-4">
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center">
              <i className="ri-arrow-left-line text-xl"></i>
            </div>
            <span className="text-lg font-semibold">AR Battle Arena</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center">
              <i className="ri-settings-3-line text-xl"></i>
            </div>
          </div>
        </div>

        {/* Mode Selection */}
        {!isARActive && !demoMode && (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500 rounded-full">
              <i className="ri-camera-3-line text-4xl"></i>
            </div>
            <h2 className="text-2xl font-bold mb-4">Choose Battle Mode</h2>
            <p className="text-gray-300 mb-8 px-4">
              Experience epic monster battles in AR or demo mode
            </p>

            <div className="space-y-4 px-4">
              <button
                onClick={startARMode}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3"
              >
                <i className="ri-camera-3-line text-xl"></i>
                Start AR Battle
              </button>

              <button
                onClick={() => setDemoMode(true)}
                className="w-full bg-gradient-to-r from-green-600 to-teal-600 py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3"
              >
                <i className="ri-play-circle-line text-xl"></i>
                Demo Mode
              </button>
            </div>

            <div className="mt-8 p-4 bg-black/30 rounded-2xl mx-4">
              <p className="text-sm text-gray-300">
                <i className="ri-information-line mr-2"></i>
                AR mode requires camera access. Demo mode works without camera for testing.
              </p>
            </div>
          </div>
        )}

        {/* AR Mode */}
        {isARActive && (
          <div className="relative">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-96 rounded-2xl object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 border-2 border-white/50 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-sm">Point at surface</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Demo Mode */}
        {demoMode && (
          <div className="space-y-6">
            {/* 3D Battle Arena */}
            <div className="h-80 bg-black/40 rounded-2xl overflow-hidden">
              <Canvas camera={{ position: [0, 2, 5], fov: 75 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <OrbitControls enablePan={false} enableZoom={false} />

                {/* Battle Arena */}
                <Box args={[6, 0.1, 4]} position={[0, -1, 0]}>
                  <meshStandardMaterial color="#444" />
                </Box>

                {/* Player Monster */}
                {selectedMonster && (
                  <DemoMonster
                    monster={monsters.find((m) => m.id === selectedMonster)}
                    position={[-2, 0, 1]}
                  />
                )}

                {/* Enemy Monster */}
                {battleState !== 'selecting' && (
                  <DemoMonster monster={monsters[1]} position={[2, 0, 1]} />
                )}
              </Canvas>
            </div>

            {/* Battle Status */}
            {battleState !== 'selecting' && (
              <div className="bg-black/40 rounded-2xl p-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-300">Your Monster</p>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${playerHP}%` }}
                      ></div>
                    </div>
                    <p className="text-xs mt-1">{playerHP}/100 HP</p>
                  </div>

                  <div className="w-12 h-12 flex items-center justify-center">
                    <i className="ri-sword-line text-2xl text-yellow-400"></i>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-gray-300">Enemy</p>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                      <div
                        className="bg-red-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${enemyHP}%` }}
                      ></div>
                    </div>
                    <p className="text-xs mt-1">{enemyHP}/100 HP</p>
                  </div>
                </div>

                {/* Battle Log */}
                <div className="bg-black/50 rounded-lg p-3 h-20 overflow-y-auto">
                  {battleLog.map((log, index) => (
                    <p key={index} className="text-xs text-gray-300 mb-1">
                      {log}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Monster Selection */}
            {battleState === 'selecting' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-center">Select Your Monster</h3>
                <div className="grid grid-cols-2 gap-4">
                  {monsters.map((monster) => (
                    <button
                      key={monster.id}
                      onClick={() => selectMonster(monster.id)}
                      className="bg-black/40 rounded-2xl p-4 text-center hover:bg-black/60 transition-all"
                    >
                      <div
                        className="w-16 h-16 rounded-full mx-auto mb-2"
                        style={{ backgroundColor: monster.color }}
                      ></div>
                      <h4 className="font-semibold text-sm">{monster.name}</h4>
                      <p className="text-xs text-gray-300">{monster.element}</p>
                      <p className="text-xs text-yellow-400">Power: {monster.power}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Battle Result */}
            {battleState === 'result' && (
              <div className="text-center space-y-4">
                <div className="w-20 h-20 mx-auto flex items-center justify-center bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full">
                  <i className="ri-trophy-line text-3xl"></i>
                </div>
                <h3 className="text-2xl font-bold">Battle Complete!</h3>
                <button
                  onClick={resetBattle}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 py-3 rounded-2xl font-semibold"
                >
                  Battle Again
                </button>
              </div>
            )}

            {/* Demo Mode Controls */}
            <div className="flex gap-4">
              <button
                onClick={resetBattle}
                className="flex-1 bg-gray-700 py-3 rounded-2xl font-semibold flex items-center justify-center gap-2"
              >
                <i className="ri-refresh-line"></i>
                Reset
              </button>
              <button
                onClick={() => setDemoMode(false)}
                className="flex-1 bg-purple-600 py-3 rounded-2xl font-semibold flex items-center justify-center gap-2"
              >
                <i className="ri-camera-3-line"></i>
                Try AR
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
