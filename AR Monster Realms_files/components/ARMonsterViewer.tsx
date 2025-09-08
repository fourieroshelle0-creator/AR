
'use client';

import { useState, useRef, useEffect } from 'react';

interface ARMonsterViewerProps {
  monster: {
    id: string;
    name: string;
    level: number;
    type: string;
    element: string;
    model: string;
  };
  onClose: () => void;
}

export default function ARMonsterViewer({ monster, onClose }: ARMonsterViewerProps) {
  const [isARActive, setIsARActive] = useState(false);
  const [animationState, setAnimationState] = useState<'idle' | 'attack' | 'special'>('idle');
  const videoRef = useRef<HTMLVideoElement>(null);

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

  const triggerAnimation = (type: 'attack' | 'special') => {
    setAnimationState(type);
    setTimeout(() => setAnimationState('idle'), 3000);
  };

  return (
    <div className="fixed inset-0 bg-black z-50">
      {/* AR Camera View */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* AR Overlay */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-black/50 backdrop-blur-sm">
          <button onClick={onClose} className="text-white">
            <i className="ri-close-line text-2xl"></i>
          </button>
          <h1 className="text-white font-bold text-lg">AR {monster.name}</h1>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-white text-sm">LIVE</span>
          </div>
        </div>

        {/* AR Content */}
        <div className="flex-1 relative">
          {!isARActive ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-24 h-24 bg-blue-600/20 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <i className="ri-camera-line text-4xl text-blue-400"></i>
                </div>
                <h2 className="text-white text-xl font-bold mb-4">Activate AR Camera</h2>
                <p className="text-gray-300 mb-6">View your monster in 3D reality</p>
                <button
                  onClick={startARCamera}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold"
                >
                  Start AR
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* 3D Monster Visualization Area */}
              <div className="absolute inset-4 border-2 border-blue-400/50 rounded-lg flex items-center justify-center">
                <div className="text-center relative">
                  {/* Monster Avatar */}
                  <div className="w-48 h-48 mb-4 relative">
                    <img
                      src={`https://readdy.ai/api/search-image?query=Realistic%203D%20$%7Bmonster.name%7D%20$%7Bmonster.element%7D%20$%7Bmonster.type%7D%20monster%20in%20augmented%20reality%2C%20holographic%20projection%2C%20futuristic%20AR%20display%2C%20floating%20monster%2C%20transparent%20hologram%20effect%2C%20high-tech%20overlay%2C%20sci-fi%20aesthetic%2C%20detailed%203D%20rendering&width=300&height=300&seq=${monster.id}-ar&orientation=squarish`}
                      alt={monster.name}
                      className={`w-full h-full object-contain rounded-lg ${
                        animationState === 'attack' ? 'animate-pulse' : 
                        animationState === 'special' ? 'animate-bounce' : ''
                      }`}
                    />
                    
                    {/* AR Effects */}
                    <div className="absolute inset-0 border border-blue-400/30 rounded-lg animate-pulse"></div>
                    <div className="absolute -inset-2 border border-blue-300/20 rounded-lg animate-ping"></div>
                    
                    {/* Animation Effects */}
                    {animationState === 'attack' && (
                      <div className="absolute inset-0 bg-red-500/20 rounded-lg animate-pulse"></div>
                    )}
                    {animationState === 'special' && (
                      <div className="absolute inset-0 bg-purple-500/20 rounded-lg animate-bounce"></div>
                    )}
                  </div>

                  {/* Monster Info */}
                  <div className="bg-black/80 backdrop-blur-sm rounded-lg p-4">
                    <h3 className="text-white font-bold text-xl">{monster.name}</h3>
                    <p className="text-blue-300">Level {monster.level} {monster.type}</p>
                    <p className="text-gray-300 text-sm">{monster.element} Element</p>
                  </div>

                  {/* AR Indicators */}
                  <div className="absolute -top-4 -left-4 w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                  <div className="absolute -top-4 -right-4 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                  <div className="absolute -bottom-4 -left-4 w-4 h-4 bg-purple-500 rounded-full animate-pulse"></div>
                  <div className="absolute -bottom-4 -right-4 w-4 h-4 bg-yellow-500 rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* Animation Controls */}
              <div className="absolute bottom-20 left-4 right-4">
                <div className="bg-black/80 backdrop-blur-sm rounded-lg p-4">
                  <h4 className="text-white font-bold mb-3 text-center">Monster Animations</h4>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => setAnimationState('idle')}
                      className={`p-3 rounded-lg font-bold transition-all ${
                        animationState === 'idle' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-600 text-gray-300'
                      }`}
                    >
                      <i className="ri-pause-line text-xl block mb-1"></i>
                      <span className="text-xs">Idle</span>
                    </button>
                    <button
                      onClick={() => triggerAnimation('attack')}
                      className={`p-3 rounded-lg font-bold transition-all ${
                        animationState === 'attack' 
                          ? 'bg-red-600 text-white' 
                          : 'bg-gray-600 text-gray-300'
                      }`}
                    >
                      <i className="ri-sword-line text-xl block mb-1"></i>
                      <span className="text-xs">Attack</span>
                    </button>
                    <button
                      onClick={() => triggerAnimation('special')}
                      className={`p-3 rounded-lg font-bold transition-all ${
                        animationState === 'special' 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-gray-600 text-gray-300'
                      }`}
                    >
                      <i className="ri-magic-line text-xl block mb-1"></i>
                      <span className="text-xs">Special</span>
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Instructions */}
        {isARActive && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-blue-600/80 backdrop-blur-sm rounded-lg p-3 text-center">
              <p className="text-white text-sm">
                <i className="ri-information-line mr-2"></i>
                Point camera at flat surface to see your monster in 3D
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
