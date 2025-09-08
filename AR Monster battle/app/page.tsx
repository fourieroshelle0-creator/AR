'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '../lib/auth-context'
import NavigationMenu from '../components/NavigationMenu'
import AuthModal from '../components/AuthModal'
import MonsterCollection from '../components/MonsterCollection'

export default function HomePage() {
  const { user, profile } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [onboardingStep, setOnboardingStep] = useState(0)
  const [selectedWorld, setSelectedWorld] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const [currentTime, setCurrentTime] = useState('')
  const [timeBonus, setTimeBonus] = useState({ world: 'All Worlds', bonus: 'Balanced', icon: '⚖️', color: 'blue' })

  useEffect(() => {
    setMounted(true)
    
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}))
      
      const hour = now.getHours()
      if (hour >= 20 || hour < 6) {
        setTimeBonus({ world: 'Ghost World', bonus: 'Night Boost', icon: '🌙', color: 'purple' })
      } else if (hour >= 7 && hour <= 18) {
        setTimeBonus({ world: 'Monster World', bonus: 'Day Boost', icon: '☀️', color: 'orange' })
      } else {
        setTimeBonus({ world: 'All Worlds', bonus: 'Balanced', icon: '⚖️', color: 'blue' })
      }
    }

    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const onboardingSteps = [
    {
      title: "🌟 Welcome to the AR Realm!",
      description: "Step into a world where fantasy creatures exist in your reality",
      content: "Use your phone's camera to discover and capture magical monsters hiding in the real world around you.",
      image: "Welcome to augmented reality monster hunting game with magical creatures appearing in real world environment, fantasy AR experience with mystical portal effects, epic adventure begins screen with glowing magical elements",
      action: "Begin Journey"
    },
    {
      title: "🗺️ Choose Your Starting World",
      description: "Each world offers unique monsters and adventures",
      content: "Select your preferred hunting ground - each world has different creatures, challenges, and rewards waiting to be discovered.",
      image: "Multiple mystical worlds selection screen with floating portals to different realms, fantasy world picker with ghost realm, monster realm, and divine artifacts, magical world selection interface",
      action: "Select World"
    },
    {
      title: "📱 Your AR Tools Are Ready",
      description: "Everything you need to become a legendary hunter",
      content: "Your phone is now equipped with AR detection, capture cards, and battle systems. Time to start your monster hunting adventure!",
      image: "AR monster hunting tools and interface ready for adventure, magical smartphone with monster detection capabilities, hunter equipment and capture cards preparation screen",
      action: "Start Hunting!"
    }
  ]

  const worlds = [
    {
      id: 'ghost-world',
      name: 'Ghost World',
      description: 'Hunt ethereal spirits and supernatural beings',
      icon: '👻',
      color: 'from-purple-600 to-indigo-700',
      speciality: 'Shadow Magic',
      difficulty: 'Medium',
      path: '/ghost-world'
    },
    {
      id: 'duel-monster-world',
      name: 'Duel Monster World',  
      description: 'Battle legendary creatures in epic duels',
      icon: '🐉',
      color: 'from-red-600 to-orange-700',
      speciality: 'Combat Arena',
      difficulty: 'Hard',
      path: '/duel-monster-world'
    },
    {
      id: 'divine-artifacts',
      name: 'Divine Artifacts',
      description: 'Discover ancient relics and divine powers',
      icon: '⚡',
      color: 'from-yellow-600 to-amber-700',
      speciality: 'Artifact Magic',
      difficulty: 'Legendary',
      path: '/divine-artifacts'
    }
  ]

  const handleStartAdventure = () => {
    if (!user) {
      setShowAuthModal(true)
      return
    }
    setShowOnboarding(true)
    setOnboardingStep(0)
  }

  const nextOnboardingStep = () => {
    if (onboardingStep < onboardingSteps.length - 1) {
      setOnboardingStep(onboardingStep + 1)
    } else {
      if (selectedWorld) {
        const world = worlds.find(w => w.id === selectedWorld)
        if (world) {
          window.location.href = world.path
        }
      } else {
        window.location.href = '/ar-capture'
      }
    }
  }

  const skipOnboarding = () => {
    setShowOnboarding(false)
    window.location.href = '/ar-capture'
  }

  // Prevent hydration mismatch by not rendering time-sensitive content until mounted
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-pulse">🌟</div>
          <div className="text-white text-xl">Loading Monster Realm...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-purple-600/10 animate-pulse"></div>
        <div className="absolute bottom-20 right-16 w-24 h-24 rounded-full bg-cyan-600/10 animate-bounce"></div>
        <div className="absolute top-1/2 right-8 w-16 h-16 rounded-full bg-pink-600/10 animate-ping"></div>
      </div>

      {/* Onboarding Modal */}
      {showOnboarding && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-gray-900 border-2 border-purple-600 rounded-2xl p-6 max-w-md w-full relative">
            <button
              onClick={skipOnboarding}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-sm"
            >
              Skip ✕
            </button>

            <div className="text-center mb-6">
              <div className="text-4xl mb-4">{onboardingSteps[onboardingStep].title.split(' ')[0]}</div>
              <h2 className="text-xl font-bold text-white mb-2">
                {onboardingSteps[onboardingStep].title.slice(2)}
              </h2>
              <p className="text-purple-400 text-sm mb-4">
                {onboardingSteps[onboardingStep].description}
              </p>
            </div>

            <div className="mb-6">
              <div 
                className="h-48 rounded-xl bg-cover bg-center border-2 border-purple-400/50 relative overflow-hidden"
                style={{
                  backgroundImage: `url(https://readdy.ai/api/search-image?query=$%7BencodeURIComponent%28onboardingSteps%5BonboardingStep%5D.image%29%7D&width=350&height=200&seq=onboard-${onboardingStep}&orientation=landscape)`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 rounded-xl"></div>
                <div className="absolute bottom-3 left-3 right-3 text-center">
                  <p className="text-white text-sm">{onboardingSteps[onboardingStep].content}</p>
                </div>
              </div>
            </div>

            {onboardingStep === 1 && (
              <div className="mb-6 space-y-3">
                {worlds.map((world) => (
                  <button
                    key={world.id}
                    onClick={() => setSelectedWorld(world.id)}
                    className={`w-full p-4 rounded-xl border-2 transition-all ${
                      selectedWorld === world.id
                        ? 'border-purple-500 bg-purple-900/30'
                        : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{world.icon}</div>
                      <div className="flex-1 text-left">
                        <div className="text-white font-semibold">{world.name}</div>
                        <div className="text-gray-400 text-sm">{world.description}</div>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">
                            {world.speciality}
                          </span>
                          <span className="text-xs bg-purple-700 text-purple-300 px-2 py-1 rounded-full">
                            {world.difficulty}
                          </span>
                        </div>
                      </div>
                      {selectedWorld === world.id && (
                        <div className="text-purple-400">✓</div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}

            <div className="flex justify-center space-x-2 mb-6">
              {onboardingSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index === onboardingStep ? 'bg-purple-500' : 
                    index < onboardingStep ? 'bg-purple-600' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextOnboardingStep}
              disabled={onboardingStep === 1 && !selectedWorld}
              className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white py-3 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {onboardingSteps[onboardingStep].action}
            </button>

            {onboardingStep === 1 && !selectedWorld && (
              <p className="text-orange-400 text-xs text-center mt-2">
                Please select a world to continue
              </p>
            )}
          </div>
        </div>
      )}

      {/* Header */}
      <header className="relative z-40 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold font-['Pacifico'] text-lg">M</span>
          </div>
          <div>
            <div className="text-white font-bold font-['Pacifico'] text-xl">Monster Realm</div>
            <div className="text-purple-400 text-xs">AR Adventure Platform</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="text-center">
            <div className="text-white text-sm font-semibold">
              {currentTime}
            </div>
            <div className={`text-xs px-2 py-1 rounded-full ${
              timeBonus.color === 'purple' ? 'bg-purple-600/30 text-purple-300' :
              timeBonus.color === 'orange' ? 'bg-orange-600/30 text-orange-300' :
              'bg-blue-600/30 text-blue-300'
            }`}>
              {timeBonus.icon} {timeBonus.bonus}
            </div>
          </div>
          
          <button 
            onClick={() => setShowMenu(true)}
            className="w-8 h-8 flex items-center justify-center"
          >
            <i className="ri-menu-line text-white text-xl"></i>
          </button>
        </div>
      </header>

      <NavigationMenu isOpen={showMenu} onClose={() => setShowMenu(false)} />

      {/* Hero Section */}
      <section className="relative z-10 px-4 py-8 text-center">
        <div className="mb-8">
          <div className="text-6xl mb-6 animate-bounce">🌟</div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome to the<br />
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Monster Realm
            </span>
          </h1>
          <p className="text-gray-300 text-lg mb-2">
            Discover magical creatures in your world
          </p>
          <p className="text-purple-400 text-sm">
            Use AR to hunt, capture, and battle legendary monsters
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <button
            onClick={handleStartAdventure}
            className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Start Adventure
          </button>
          
          {user && (
            <div className="flex justify-center space-x-4">
              <Link 
                href="/ar-capture" 
                className="bg-gray-800/70 hover:bg-gray-700/70 text-white px-6 py-2 rounded-full text-sm border border-gray-600"
              >
                📱 Quick Capture
              </Link>
              <Link 
                href="/monster-pedia" 
                className="bg-gray-800/70 hover:bg-gray-700/70 text-white px-6 py-2 rounded-full text-sm border border-gray-600"
              >
                📖 Collection
              </Link>
            </div>
          )}
        </div>

        <div className="grid grid-cols-4 gap-4 max-w-sm mx-auto mb-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">12</div>
            <div className="text-purple-400 text-xs">Captured</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">847</div>
            <div className="text-cyan-400 text-xs">Battle Pts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">5</div>
            <div className="text-pink-400 text-xs">Worlds</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">Gold</div>
            <div className="text-yellow-400 text-xs">Rank</div>
          </div>
        </div>
      </section>

      {/* Quick Access Worlds */}
      <section className="relative z-10 px-4 py-6">
        <h2 className="text-xl font-bold text-white mb-4 text-center">🗺️ Explore Worlds</h2>
        <div className="grid grid-cols-1 gap-4">
          {worlds.map((world) => (
            <Link key={world.id} href={world.path}>
              <div className={`bg-gradient-to-r ${world.color} rounded-2xl p-4 border border-white/20 hover:scale-105 transition-all duration-200`}>
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{world.icon}</div>
                  <div className="flex-1">
                    <div className="text-white font-bold text-lg">{world.name}</div>
                    <div className="text-white/80 text-sm mb-2">{world.description}</div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs bg-white/20 text-white px-2 py-1 rounded-full">
                        {world.speciality}
                      </span>
                      <span className="text-xs bg-white/20 text-white px-2 py-1 rounded-full">
                        {world.difficulty}
                      </span>
                    </div>
                  </div>
                  <div className="text-white/60">
                    <i className="ri-arrow-right-line text-xl"></i>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Live Activity Feed */}
      <section className="relative z-10 px-4 py-6">
        <h2 className="text-xl font-bold text-white mb-4">🔥 Live Activity</h2>
        <div className="space-y-3">
          <div className="bg-gray-800/70 border border-gray-700 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <div className="flex-1">
                <div className="text-white font-semibold text-sm">🌙 Blood Moon Event</div>
                <div className="text-gray-400 text-xs">Ghost spawn rate +200% • 2h 15m remaining</div>
              </div>
              <div className="text-red-400 text-xs">LIVE</div>
            </div>
          </div>

          <div className="bg-gray-800/70 border border-gray-700 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="flex-1">
                <div className="text-white font-semibold text-sm">⚔️ Battle Tournament</div>
                <div className="text-gray-400 text-xs">Championship rounds active • 6h 42m remaining</div>
              </div>
              <div className="text-blue-400 text-xs">ACTIVE</div>
            </div>
          </div>

          <div className="bg-gray-800/70 border border-gray-700 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
              <div className="flex-1">
                <div className="text-white font-semibold text-sm">🎭 Monster Carnival</div>
                <div className="text-gray-400 text-xs">Rare creatures spawning globally • 12h 18m remaining</div>
              </div>
              <div className="text-purple-400 text-xs">EVENT</div>
            </div>
          </div>
        </div>
      </section>

      {user && (
        <section className="relative z-10 px-4 py-6">
          <MonsterCollection />
        </section>
      )}

      {!user && (
        <section className="relative z-10 px-4 py-6">
          <div className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border border-purple-600 rounded-2xl p-6">
            <div className="text-center mb-4">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="text-xl font-bold text-white mb-2">Ready to Begin?</h3>
              <p className="text-purple-300 text-sm">Join thousands of hunters worldwide</p>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-600/30 rounded-full flex items-center justify-center">
                  <span className="text-purple-400 text-sm">1</span>
                </div>
                <div className="text-white text-sm">Create your hunter account</div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-600/30 rounded-full flex items-center justify-center">
                  <span className="text-purple-400 text-sm">2</span>
                </div>
                <div className="text-white text-sm">Choose your starting world</div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-600/30 rounded-full flex items-center justify-center">
                  <span className="text-purple-400 text-sm">3</span>
                </div>
                <div className="text-white text-sm">Start capturing monsters with AR</div>
              </div>
            </div>

            <button
              onClick={() => setShowAuthModal(true)}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold"
            >
              Create Hunter Account
            </button>
          </div>
        </section>
      )}

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  )
}