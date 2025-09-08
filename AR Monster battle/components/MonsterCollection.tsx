'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../lib/auth-context'
import { getUserMonsters, UserMonster } from '../lib/supabase'

export default function MonsterCollection() {
  const { user, profile } = useAuth()
  const [monsters, setMonsters] = useState<UserMonster[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMonster, setSelectedMonster] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      fetchUserMonsters()
    }
  }, [user])

  const fetchUserMonsters = async () => {
    if (!user) return
    
    setLoading(true)
    const { data, error } = await getUserMonsters(user.id)
    
    if (error) {
      console.error('Error fetching monsters:', error)
    } else {
      setMonsters(data || [])
    }
    
    setLoading(false)
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common':
        return 'text-gray-400 border-gray-600 bg-gray-600/20'
      case 'Rare':
        return 'text-blue-400 border-blue-600 bg-blue-600/20'
      case 'Epic':
        return 'text-purple-400 border-purple-600 bg-purple-600/20'
      case 'Legendary':
        return 'text-orange-400 border-orange-600 bg-orange-600/20'
      default:
        return 'text-white border-gray-600 bg-gray-600/20'
    }
  }

  const getElementColor = (element: string) => {
    switch (element) {
      case 'Fire':
        return 'text-red-400 bg-red-900/30 border-red-600'
      case 'Earth':
        return 'text-green-400 bg-green-900/30 border-green-600'
      case 'Lightning':
        return 'text-yellow-400 bg-yellow-900/30 border-yellow-600'
      case 'Shadow':
        return 'text-purple-500 bg-purple-900/40 border-purple-700'
      case 'Light':
        return 'text-yellow-200 bg-yellow-900/30 border-yellow-500'
      default:
        return 'text-gray-400 bg-gray-900/30 border-gray-600'
    }
  }

  if (!user) {
    return (
      <div className="text-center py-8">
        <div className="text-6xl mb-4">🔒</div>
        <div className="text-white font-bold text-xl mb-2">Sign In Required</div>
        <div className="text-gray-400">Please sign in to view your monster collection</div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="w-12 h-12 border-4 border-purple-600/30 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
        <div className="text-white">Loading your monsters...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Collection Header */}
      <div className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 rounded-2xl p-6 border border-purple-800/50">
        <div className="text-center">
          <div className="text-3xl mb-2">🎯</div>
          <h2 className="text-2xl font-bold text-white mb-2">{profile?.username}'s Collection</h2>
          <div className="flex justify-center space-x-6 text-sm">
            <div className="text-center">
              <div className="text-purple-400 font-bold text-lg">{monsters.length}</div>
              <div className="text-gray-400">Captured</div>
            </div>
            <div className="text-center">
              <div className="text-cyan-400 font-bold text-lg">{profile?.level || 1}</div>
              <div className="text-gray-400">Level</div>
            </div>
            <div className="text-center">
              <div className="text-yellow-400 font-bold text-lg">{profile?.experience || 0}</div>
              <div className="text-gray-400">XP</div>
            </div>
          </div>
        </div>
      </div>

      {/* Monster Grid */}
      {monsters.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🐾</div>
          <div className="text-white font-bold text-xl mb-2">No Monsters Yet</div>
          <div className="text-gray-400 mb-4">Start exploring to capture your first monster!</div>
          <button className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-6 py-3 rounded-full font-semibold">
            Start Hunting
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {monsters.map((userMonster) => (
            <div
              key={userMonster.id}
              className={`bg-gray-800/70 border-2 rounded-xl p-4 cursor-pointer transition-all ${
                selectedMonster === userMonster.id
                  ? 'border-purple-500 bg-purple-900/30'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
              onClick={() => setSelectedMonster(selectedMonster === userMonster.id ? null : userMonster.id)}
            >
              <div className="flex items-start space-x-4">
                <div className="relative">
                  <div
                    className={`w-20 h-20 rounded-xl bg-cover bg-center flex-shrink-0 ${getRarityColor(userMonster.monster?.rarity || 'Common')}`}
                    style={{
                      backgroundImage: userMonster.monster?.image_url 
                        ? `url(${userMonster.monster.image_url})`
                        : `url(https://readdy.ai/api/search-image?query=$%7BencodeURIComponent%28userMonster.monster%3F.description%20%7C%7C%20fantasy%20monster%29%7D&width=80&height=80&seq=${userMonster.id}&orientation=squarish)`
                    }}
                  >
                    <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                      {userMonster.level}
                    </div>
                  </div>
                  
                  {userMonster.is_in_battle_deck && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-green-600 text-white text-xs rounded-full px-2 py-1">
                      ⚔️ Battle
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-white font-bold">
                      {userMonster.nickname || userMonster.monster?.name}
                    </div>
                    <div className="text-xs text-gray-400">
                      Bond: {userMonster.bond_level}%
                    </div>
                  </div>
                  
                  <div className="text-gray-400 text-sm mb-2">
                    {userMonster.monster?.type} • Captured {new Date(userMonster.captured_at).toLocaleDateString()}
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-2">
                    <div className={`text-xs px-2 py-1 rounded-full border ${getRarityColor(userMonster.monster?.rarity || 'Common')}`}>
                      {userMonster.monster?.rarity}
                    </div>
                    <div className={`text-xs px-2 py-1 rounded-full border ${getElementColor(userMonster.monster?.element || 'Normal')}`}>
                      {userMonster.monster?.element}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-xs">
                    <div className="text-red-400">⚔️ {userMonster.monster?.power}</div>
                    <div className="text-blue-400">🛡️ {userMonster.monster?.defense}</div>
                    <div className="text-yellow-400">⭐ {userMonster.experience} XP</div>
                  </div>
                </div>
              </div>

              {selectedMonster === userMonster.id && (
                <div className="mt-4 pt-4 border-t border-gray-700 space-y-4">
                  {/* Monster Description */}
                  {userMonster.monster?.description && (
                    <div>
                      <div className="text-white font-semibold mb-2">Monster Lore</div>
                      <div className="text-gray-300 text-sm">{userMonster.monster.description}</div>
                    </div>
                  )}

                  {/* Abilities */}
                  {userMonster.monster?.abilities && userMonster.monster.abilities.length > 0 && (
                    <div>
                      <div className="text-white font-semibold mb-2">Abilities</div>
                      <div className="space-y-2">
                        {userMonster.monster.abilities.map((ability, index) => (
                          <div
                            key={index}
                            className="bg-blue-600/30 text-blue-300 text-sm px-3 py-2 rounded-lg border border-blue-600/50"
                          >
                            {ability}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Evolution Chain */}
                  {userMonster.monster?.evolution_chain && userMonster.monster.evolution_chain.length > 1 && (
                    <div>
                      <div className="text-white font-semibold mb-2">Evolution Path</div>
                      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
                        {userMonster.monster.evolution_chain.map((stage, index) => (
                          <div key={index} className="flex items-center space-x-2 flex-shrink-0">
                            <div
                              className={`text-xs px-3 py-1 rounded-full border ${
                                index === userMonster.evolution_stage
                                  ? 'bg-green-600/30 text-green-300 border-green-600/50'
                                  : index < userMonster.evolution_stage
                                  ? 'bg-blue-600/30 text-blue-300 border-blue-600/50'
                                  : 'bg-gray-600/30 text-gray-400 border-gray-600/50'
                              }`}
                            >
                              {stage}
                            </div>
                            {index < userMonster.monster.evolution_chain.length - 1 && (
                              <i className="ri-arrow-right-line text-gray-400 text-sm"></i>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sound Profile */}
                  {userMonster.monster?.sound_profile && (
                    <div>
                      <div className="text-white font-semibold mb-2">🔊 Audio Profile</div>
                      <div className="bg-green-900/30 border border-green-700 rounded-lg p-3">
                        <div className="text-green-400 text-sm mb-1">
                          Voice: {userMonster.monster.sound_profile.voiceType} • Volume: {userMonster.monster.sound_profile.volume}
                        </div>
                        <div className="text-gray-300 text-xs">
                          Battle Cry: {userMonster.monster.sound_profile.battleCries?.[0] || 'Unknown'}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex space-x-2 pt-2">
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-semibold">
                      🎯 Train
                    </button>
                    <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-sm font-semibold">
                      ✨ Evolve
                    </button>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm">
                      ⚔️ Battle
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}