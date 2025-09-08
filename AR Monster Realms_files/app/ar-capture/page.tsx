
'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useAuth } from '../../lib/auth-context'
import { getAllMonsters, getUserBlankCards, captureMonster, Monster, BlankCard } from '../../lib/supabase'
import AuthModal from '../../components/AuthModal'

export default function ARCapturePage() {
  const { user, profile } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [monsters, setMonsters] = useState<Monster[]>([])
  const [blankCards, setBlankCards] = useState<BlankCard[]>([])
  const [nearbyMonsters, setNearbyMonsters] = useState<Monster[]>([])
  const [selectedCard, setSelectedCard] = useState<BlankCard | null>(null)
  const [captureTarget, setCaptureTarget] = useState<Monster | null>(null)
  const [captureProgress, setCaptureProgress] = useState(0)
  const [isCapturing, setIsCapturing] = useState(false)
  const [captureResult, setCaptureResult] = useState<'success' | 'failed' | null>(null)
  const [loading, setLoading] = useState(true)
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    fetchData()
  }, [user])

  useEffect(() => {
    if (isCameraActive) {
      startCamera()
      generateNearbyMonsters()
    } else {
      stopCamera()
    }

    return () => {
      stopCamera()
    }
  }, [isCameraActive])

  const fetchData = async () => {
    setLoading(true)
    
    const [monstersResult, cardsResult] = await Promise.all([
      getAllMonsters(),
      user ? getUserBlankCards(user.id) : { data: [], error: null }
    ])

    if (monstersResult.data) setMonsters(monstersResult.data)
    if (cardsResult.data) setBlankCards(cardsResult.data)
    
    setLoading(false)
  }

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }
    } catch (error) {
      console.error('Error accessing camera:', error)
      alert('Unable to access camera. Please ensure camera permissions are granted.')
      setIsCameraActive(false)
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach(track => track.stop())
      videoRef.current.srcObject = null
    }
  }

  const generateNearbyMonsters = () => {
    if (monsters.length === 0) return

    // Simulate nearby monsters based on location and rarity
    const nearby = monsters
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(Math.random() * 4) + 2)
      .map(monster => ({
        ...monster,
        distance: Math.floor(Math.random() * 500) + 50,
        spawnTime: Date.now() + Math.random() * 30000
      }))

    setNearbyMonsters(nearby)
  }

  const handleCaptureAttempt = async (monster: Monster) => {
    if (!user || !selectedCard) {
      if (!user) setShowAuthModal(true)
      return
    }

    setCaptureTarget(monster)
    setIsCapturing(true)
    setCaptureProgress(0)
    setCaptureResult(null)

    // Simulate capture process with progress
    const captureInterval = setInterval(() => {
      setCaptureProgress(prev => {
        if (prev >= 100) {
          clearInterval(captureInterval)
          finalizeCaptureAttempt(monster)
          return 100
        }
        return prev + (Math.random() * 15 + 5)
      })
    }, 200)
  }

  const finalizeCaptureAttempt = async (monster: Monster) => {
    if (!user || !selectedCard) return

    // Calculate success rate based on card capture rate and monster difficulty
    const baseSuccessRate = selectedCard.capture_rate
    const difficultyPenalty = monster.capture_difficulty * 10
    const finalSuccessRate = Math.max(baseSuccessRate - difficultyPenalty, 20)
    
    const isSuccess = Math.random() * 100 < finalSuccessRate

    if (isSuccess) {
      const { error } = await captureMonster(
        user.id, 
        monster.id, 
        selectedCard.id, 
        'AR Capture Session'
      )

      if (!error) {
        setCaptureResult('success')
        // Remove used card from available cards
        setBlankCards(prev => prev.filter(card => card.id !== selectedCard.id))
        // Update nearby monsters
        setNearbyMonsters(prev => prev.filter(m => m.id !== monster.id))
      } else {
        setCaptureResult('failed')
      }
    } else {
      setCaptureResult('failed')
      // Still remove the card as it was used
      setBlankCards(prev => prev.filter(card => card.id !== selectedCard.id))
    }

    setTimeout(() => {
      setIsCapturing(false)
      setCaptureTarget(null)
      setCaptureResult(null)
      setCaptureProgress(0)
    }, 3000)
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common':
        return 'border-gray-500 bg-gray-500/20'
      case 'Rare':
        return 'border-blue-500 bg-blue-500/20'
      case 'Epic':
        return 'border-purple-500 bg-purple-500/20'
      case 'Legendary':
        return 'border-orange-500 bg-orange-500/20'
      default:
        return 'border-gray-500 bg-gray-500/20'
    }
  }

  const getCardTypeColor = (cardType: string) => {
    switch (cardType) {
      case 'Basic':
        return 'bg-gray-600 text-gray-200'
      case 'Enhanced':
        return 'bg-blue-600 text-blue-200'
      case 'Master':
        return 'bg-purple-600 text-purple-200'
      case 'Divine':
        return 'bg-orange-600 text-orange-200'
      default:
        return 'bg-gray-600 text-gray-200'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600/30 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-white text-xl">Initializing AR System...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900">
      {/* Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-purple-800/50">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center space-x-2">
            <i className="ri-arrow-left-line text-white text-xl"></i>
            <span className="text-white font-semibold">Back</span>
          </Link>
          
          <div className="text-center">
            <div className="text-white font-bold">📸 AR Capture</div>
            <div className="text-purple-400 text-xs">Real-time Monster Hunting</div>
          </div>

          {user ? (
            <div className="flex items-center space-x-2">
              <div className="text-white text-sm">
                {blankCards.length} 🎫
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm"
            >
              Sign In
            </button>
          )}
        </div>
      </div>

      {/* Camera View */}
      <div className="pt-16 pb-32">
        {!isCameraActive ? (
          <div className="px-4 py-8">
            {/* Welcome Section */}
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">📱</div>
              <h1 className="text-3xl font-bold text-white mb-2">AR Monster Capture</h1>
              <p className="text-gray-300 mb-6">Use your camera to discover and capture monsters in the real world</p>
              
              {user ? (
                <button
                  onClick={() => setIsCameraActive(true)}
                  className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg"
                >
                  🎯 Start AR Hunt
                </button>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-8 py-4 rounded-2xl font-bold text-lg"
                >
                  Sign In to Hunt
                </button>
              )}
            </div>

            {/* Features */}
            <div className="space-y-4 mb-8">
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center">
                    <i className="ri-camera-3-line text-blue-400 text-xl"></i>
                  </div>
                  <div>
                    <div className="text-white font-semibold">Real-time Detection</div>
                    <div className="text-gray-400 text-sm">Monsters appear dynamically in your environment</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center">
                    <i className="ri-magic-line text-purple-400 text-xl"></i>
                  </div>
                  <div>
                    <div className="text-white font-semibold">Strategic Capture</div>
                    <div className="text-gray-400 text-sm">Use different blank cards for higher success rates</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-600/20 rounded-xl flex items-center justify-center">
                    <i className="ri-trophy-line text-green-400 text-xl"></i>
                  </div>
                  <div>
                    <div className="text-white font-semibold">Rare Discoveries</div>
                    <div className="text-gray-400 text-sm">Find legendary monsters in specific locations</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Your Blank Cards */}
            {user && blankCards.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-white mb-4">🎫 Your Capture Cards</h2>
                <div className="grid grid-cols-2 gap-3">
                  {blankCards.slice(0, 4).map((card) => (
                    <div
                      key={card.id}
                      className={`bg-gray-800/70 border-2 rounded-xl p-3 ${
                        selectedCard?.id === card.id ? 'border-purple-500' : 'border-gray-700'
                      }`}
                      onClick={() => setSelectedCard(selectedCard?.id === card.id ? null : card)}
                    >
                      <div className={`text-xs px-2 py-1 rounded-full ${getCardTypeColor(card.card_type)} mb-2 inline-block`}>
                        {card.card_type}
                      </div>
                      <div className="text-white font-semibold text-sm mb-1">{card.rarity} Card</div>
                      <div className="text-green-400 text-xs">✅ {card.capture_rate}% Success Rate</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="relative">
            {/* Camera Stream */}
            <video
              ref={videoRef}
              className="w-full h-screen object-cover"
              autoPlay
              playsInline
              muted
            />
            <canvas ref={canvasRef} className="hidden" />

            {/* AR Overlay */}
            <div className="absolute inset-0">
              {/* Camera Controls */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                <button
                  onClick={() => setIsCameraActive(false)}
                  className="w-12 h-12 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>

                <div className="bg-black/60 backdrop-blur-sm rounded-full px-4 py-2">
                  <span className="text-white text-sm">🎯 {nearbyMonsters.length} Nearby</span>
                </div>

                <button
                  onClick={generateNearbyMonsters}
                  className="w-12 h-12 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
                >
                  <i className="ri-refresh-line text-xl"></i>
                </button>
              </div>

              {/* Monster Detection Markers */}
              {nearbyMonsters.map((monster, index) => (
                <div
                  key={monster.id}
                  className="absolute animate-pulse"
                  style={{
                    left: `${20 + (index * 15) % 60}%`,
                    top: `${30 + (index * 20) % 40}%`,
                  }}
                >
                  <div
                    className={`relative bg-black/80 backdrop-blur-sm border-2 rounded-xl p-3 cursor-pointer transform transition-all hover:scale-110 ${getRarityColor(monster.rarity)}`}
                    onClick={() => handleCaptureAttempt(monster)}
                  >
                    <div className="text-center">
                      <div
                        className="w-16 h-16 rounded-xl bg-cover bg-center mx-auto mb-2"
                        style={{
                          backgroundImage: `url(https://readdy.ai/api/search-image?query=$%7BencodeURIComponent%28%60fantasy%20creature%20$%7Bmonster.element%7D%20$%7Bmonster.type%7D%20digital%20art%20vibrant%20colors%60%29%7D&width=64&height=64&seq=${monster.id}&orientation=squarish)`
                        }}
                      />
                      <div className="text-white font-bold text-sm">{monster.name}</div>
                      <div className="text-xs text-gray-300">{monster.element} • Lv{monster.base_level}</div>
                      <div className="text-xs text-purple-400 mt-1">
                        {Math.floor(50 + Math.random() * 100)}m away
                      </div>
                    </div>
                    
                    {/* Floating indicator */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full animate-ping"></div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <i className="ri-focus-3-line text-white text-xs"></i>
                    </div>
                  </div>
                </div>
              ))}

              {/* Selected Card Display */}
              {selectedCard && (
                <div className="absolute bottom-32 left-4 right-4">
                  <div className="bg-black/80 backdrop-blur-sm border border-purple-500 rounded-xl p-4">
                    <div className="text-center">
                      <div className="text-purple-400 text-sm mb-1">Active Capture Card</div>
                      <div className="text-white font-bold">{selectedCard.card_type} - {selectedCard.rarity}</div>
                      <div className="text-green-400 text-sm">✅ {selectedCard.capture_rate}% Success Rate</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Capture Progress Overlay */}
              {isCapturing && captureTarget && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="bg-black/90 backdrop-blur-sm border-2 border-purple-500 rounded-2xl p-6 text-center max-w-sm mx-4">
                    <div
                      className="w-24 h-24 rounded-xl bg-cover bg-center mx-auto mb-4"
                      style={{
                        backgroundImage: `url(https://readdy.ai/api/search-image?query=$%7BencodeURIComponent%28%60fantasy%20creature%20$%7BcaptureTarget.element%7D%20$%7BcaptureTarget.type%7D%20digital%20art%20vibrant%20colors%60%29%7D&width=96&height=96&seq=${captureTarget.id}&orientation=squarish)`
                      }}
                    />
                    
                    <div className="text-white font-bold text-lg mb-2">Capturing {captureTarget.name}!</div>
                    
                    <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
                      <div
                        className="bg-gradient-to-r from-purple-600 to-cyan-600 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${captureProgress}%` }}
                      />
                    </div>
                    
                    <div className="text-purple-400 text-sm">
                      {captureProgress < 100 ? `${Math.floor(captureProgress)}% Complete` : 'Processing...'}
                    </div>

                    {captureResult && (
                      <div className={`mt-4 p-3 rounded-lg ${
                        captureResult === 'success' 
                          ? 'bg-green-900/50 border border-green-700 text-green-400' 
                          : 'bg-red-900/50 border border-red-700 text-red-400'
                      }`}>
                        {captureResult === 'success' ? (
                          <div>
                            <div className="text-2xl mb-2">🎉</div>
                            <div className="font-bold">Capture Successful!</div>
                            <div className="text-sm">{captureTarget.name} added to your collection</div>
                          </div>
                        ) : (
                          <div>
                            <div className="text-2xl mb-2">💨</div>
                            <div className="font-bold">Capture Failed</div>
                            <div className="text-sm">{captureTarget.name} escaped! Try again with a better card</div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* No Card Selected Warning */}
              {!selectedCard && nearbyMonsters.length > 0 && (
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-orange-900/80 backdrop-blur-sm border border-orange-600 rounded-xl p-3 text-center">
                    <div className="text-orange-400 font-semibold text-sm">⚠️ Select a capture card first!</div>
                    <div className="text-orange-300 text-xs">Choose from your available cards to start capturing</div>
                  </div>
                </div>
              )}

              {/* No Monsters Message */}
              {nearbyMonsters.length === 0 && (
                <div className="absolute bottom-20 left-4 right-4">
                  <div className="bg-blue-900/80 backdrop-blur-sm border border-blue-600 rounded-xl p-4 text-center">
                    <div className="text-blue-400 font-semibold mb-1">🔍 Scanning for monsters...</div>
                    <div className="text-blue-300 text-sm mb-3">Move around to discover new creatures</div>
                    <button
                      onClick={generateNearbyMonsters}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
                    >
                      🎲 Force Scan
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Card Selector */}
      {isCameraActive && user && blankCards.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm border-t border-gray-700 p-4">
          <div className="text-white text-sm font-semibold mb-2">Select Capture Card:</div>
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {blankCards.map((card) => (
              <div
                key={card.id}
                className={`flex-shrink-0 bg-gray-800 border-2 rounded-lg p-2 cursor-pointer transition-all ${
                  selectedCard?.id === card.id ? 'border-purple-500 bg-purple-900/30' : 'border-gray-600'
                }`}
                onClick={() => setSelectedCard(selectedCard?.id === card.id ? null : card)}
              >
                <div className={`text-xs px-2 py-1 rounded-full ${getCardTypeColor(card.card_type)} mb-1`}>
                  {card.card_type}
                </div>
                <div className="text-white text-xs font-semibold">{card.rarity}</div>
                <div className="text-green-400 text-xs">✅ {card.capture_rate}%</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  )
}
