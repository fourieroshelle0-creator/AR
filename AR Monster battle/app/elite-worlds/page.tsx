
'use client';

import { useState } from 'react';
import Link from 'next/link';

interface EliteWorld {
  id: string;
  name: string;
  theme: string;
  difficulty: 'Nightmare' | 'Apocalypse' | 'Transcendent' | 'Divine';
  monthYear: string;
  status: 'upcoming' | 'active' | 'completed';
  invitesSent: number;
  participants: number;
  minRequirements: {
    playerLevel: number;
    legendaryMonstersOwned: number;
    previousEliteCompletions: number;
    battleRating: number;
  };
  rewards: {
    exclusiveMonsters: string[];
    titleReward: string;
    specialRelics: string[];
    prestige: number;
  };
  bossData: {
    name: string;
    difficulty: number;
    weaknesses: string[];
    specialMechanics: string[];
  };
  newMonsters: number;
  completionRate: number;
  timeLimit: string;
}

interface PlayerInvitation {
  id: string;
  worldId: string;
  playerName: string;
  playerLevel: number;
  qualification: string;
  status: 'pending' | 'accepted' | 'declined' | 'expired';
  invitedAt: string;
  expiresAt: string;
}

export default function EliteWorlds() {
  const [selectedWorld, setSelectedWorld] = useState<string | null>(null);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [currentTab, setCurrentTab] = useState<'worlds' | 'invitations' | 'leaderboard'>('worlds');
  const [playerStats, setPlayerStats] = useState({
    level: 47,
    legendaryCount: 12,
    eliteCompletions: 3,
    battleRating: 2847,
    rank: 23,
    qualified: true
  });

  const eliteWorlds: EliteWorld[] = [
    {
      id: 'crimson-abyss-jan2024',
      name: 'Crimson Abyss',
      theme: 'Infernal Dimension',
      difficulty: 'Apocalypse',
      monthYear: 'January 2024',
      status: 'active',
      invitesSent: 150,
      participants: 87,
      minRequirements: {
        playerLevel: 45,
        legendaryMonstersOwned: 10,
        previousEliteCompletions: 2,
        battleRating: 2500
      },
      rewards: {
        exclusiveMonsters: ['Hellfire Sovereign', 'Molten Archfiend', 'Inferno Leviathan'],
        titleReward: 'Abyss Conqueror',
        specialRelics: ['Crown of Eternal Flames', 'Demonbane Scepter'],
        prestige: 1000
      },
      bossData: {
        name: 'Lucifer, The Burning Throne',
        difficulty: 95,
        weaknesses: ['Ice', 'Holy', 'Void'],
        specialMechanics: ['Hellfire Rain', 'Soul Burn', 'Demonic Resurrection', 'Infernal Portal']
      },
      newMonsters: 15,
      completionRate: 12,
      timeLimit: '31 days'
    },
    {
      id: 'void-nexus-feb2024',
      name: 'Void Nexus',
      theme: 'Reality Collapse',
      difficulty: 'Transcendent',
      monthYear: 'February 2024',
      status: 'upcoming',
      invitesSent: 0,
      participants: 0,
      minRequirements: {
        playerLevel: 50,
        legendaryMonstersOwned: 15,
        previousEliteCompletions: 4,
        battleRating: 3000
      },
      rewards: {
        exclusiveMonsters: ['Void Walker Prime', 'Reality Shaper', 'Dimensional Overlord'],
        titleReward: 'Void Master',
        specialRelics: ['Nexus Core', 'Reality Anchor'],
        prestige: 1500
      },
      bossData: {
        name: 'The Null Entity',
        difficulty: 98,
        weaknesses: ['Order', 'Creation', 'Light'],
        specialMechanics: ['Reality Warp', 'Void Cascade', 'Existence Drain', 'Dimensional Rift']
      },
      newMonsters: 18,
      completionRate: 0,
      timeLimit: '28 days'
    },
    {
      id: 'celestial-throne-dec2023',
      name: 'Celestial Throne',
      theme: 'Divine Realm',
      difficulty: 'Divine',
      monthYear: 'December 2023',
      status: 'completed',
      invitesSent: 200,
      participants: 134,
      minRequirements: {
        playerLevel: 40,
        legendaryMonstersOwned: 8,
        previousEliteCompletions: 1,
        battleRating: 2200
      },
      rewards: {
        exclusiveMonsters: ['Seraph Commander', 'Divine Phoenix', 'Celestial Dragon'],
        titleReward: "Heaven's Champion",
        specialRelics: ['Angelic Halo', 'Divine Sword'],
        prestige: 800
      },
      bossData: {
        name: 'Archangel Michael, The Eternal Guardian',
        difficulty: 92,
        weaknesses: ['Darkness', 'Corruption', 'Chaos'],
        specialMechanics: ['Divine Judgment', 'Holy Barrier', 'Angelic Army', 'Purification']
      },
      newMonsters: 12,
      completionRate: 8,
      timeLimit: '31 days'
    },
    {
      id: 'nightmare-carnival-mar2024',
      name: 'Nightmare Carnival',
      theme: 'Twisted Circus',
      difficulty: 'Nightmare',
      monthYear: 'March 2024',
      status: 'upcoming',
      invitesSent: 0,
      participants: 0,
      minRequirements: {
        playerLevel: 48,
        legendaryMonstersOwned: 12,
        previousEliteCompletions: 3,
        battleRating: 2700
      },
      rewards: {
        exclusiveMonsters: ['Phantom Ringmaster', 'Cursed Jester', 'Terror Clown Supreme'],
        titleReward: 'Carnival Master',
        specialRelics: ["Jester's Crown", 'Nightmare Mask'],
        prestige: 1200
      },
      bossData: {
        name: 'The Grand Puppeteer',
        difficulty: 96,
        weaknesses: ['Light', 'Joy', 'Truth'],
        specialMechanics: ['Mind Control', 'Illusion Maze', 'Fear Incarnate', 'Puppet Swarm']
      },
      newMonsters: 16,
      completionRate: 0,
      timeLimit: '31 days'
    }
  ];

  const topPlayers = [
    { rank: 1, name: 'DragonLord99', level: 52, completions: 8, rating: 3247, title: 'Transcendent Master' },
    { rank: 2, name: 'VoidHunter', level: 51, completions: 7, rating: 3156, title: 'Reality Bender' },
    { rank: 3, name: 'CelestialKing', level: 50, completions: 6, rating: 3089, title: 'Divine Champion' },
    { rank: 4, name: 'ShadowEmpress', level: 49, completions: 6, rating: 2998, title: 'Nightmare Queen' },
    { rank: 5, name: 'InfernoMaster', level: 48, completions: 5, rating: 2934, title: 'Abyss Walker' },
    { rank: 23, name: 'You', level: 47, completions: 3, rating: 2847, title: 'Elite Challenger' }
  ];

  const playerInvitations: PlayerInvitation[] = [
    {
      id: 'inv-001',
      worldId: 'crimson-abyss-jan2024',
      playerName: 'You',
      playerLevel: 47,
      qualification: 'Top 50 Elite Players',
      status: 'pending',
      invitedAt: '2024-01-01T00:00:00Z',
      expiresAt: '2024-01-07T23:59:59Z'
    }
  ];

  const smartMonsterTypes = [
    {
      name: 'Adaptive Wraith',
      intelligence: 'Learns player patterns and adjusts combat style',
      abilities: ['Pattern Recognition', 'Counter Evolution', 'Tactical Retreat']
    },
    {
      name: 'Hive Mind Collective',
      intelligence: 'Shares knowledge between all instances globally',
      abilities: ['Global Memory', 'Coordinated Strikes', 'Collective Learning']
    },
    {
      name: 'Quantum Predator',
      intelligence: 'Predicts player moves using probability calculations',
      abilities: ['Future Sight', 'Probability Manipulation', 'Quantum Tunneling']
    },
    {
      name: 'Neural Mimic',
      intelligence: 'Copies and improves upon player strategies',
      abilities: ['Strategy Absorption', 'Enhanced Execution', 'Behavioral Mimicry']
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Nightmare': return 'from-purple-600 to-red-700 border-purple-500';
      case 'Apocalypse': return 'from-red-600 to-black border-red-500';
      case 'Transcendent': return 'from-blue-600 to-purple-800 border-blue-500';
      case 'Divine': return 'from-yellow-500 to-white border-yellow-400';
      default: return 'from-gray-600 to-gray-800 border-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-900/30 border-green-600';
      case 'upcoming': return 'text-blue-400 bg-blue-900/30 border-blue-600';
      case 'completed': return 'text-gray-400 bg-gray-900/30 border-gray-600';
      default: return 'text-gray-400 bg-gray-900/30 border-gray-600';
    }
  };

  const getInviteStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-orange-400 bg-orange-900/30 border-orange-600';
      case 'accepted': return 'text-green-400 bg-green-900/30 border-green-600';
      case 'declined': return 'text-red-400 bg-red-900/30 border-red-600';
      case 'expired': return 'text-gray-400 bg-gray-900/30 border-gray-600';
      default: return 'text-gray-400 bg-gray-900/30 border-gray-600';
    }
  };

  const canQualify = (world: EliteWorld) => {
    return (
      playerStats.level >= world.minRequirements.playerLevel &&
      playerStats.legendaryCount >= world.minRequirements.legendaryMonstersOwned &&
      playerStats.eliteCompletions >= world.minRequirements.previousEliteCompletions &&
      playerStats.battleRating >= world.minRequirements.battleRating
    );
  };

  return (
    <div className="min-h-screen bg-gray-950 pt-20 pb-24 relative overflow-hidden">
      {/* Dramatic Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/20 via-purple-900/10 to-black/60"></div>
        {/* Fixed the problematic SVG URL by URL‑encoding the double quotes */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23dc2626%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse"></div>
      </div>

      {/* Invitation Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-gray-900 border-2 border-red-500 rounded-2xl p-6 max-w-md w-full">
            <div className="text-center mb-6">
              <div className="text-4xl mb-3">👑</div>
              <h3 className="text-2xl font-bold text-white mb-2">Elite World Invitation</h3>
              <p className="text-red-400 text-sm">You have been chosen among the elite</p>
            </div>

            <div className="bg-red-900/30 border border-red-600 rounded-xl p-4 mb-6">
              <div className="text-center mb-4">
                <div className="text-white font-bold text-lg">Crimson Abyss</div>
                <div className="text-red-400 text-sm">Apocalypse Difficulty</div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Your Qualification:</span>
                  <span className="text-green-400">Top 50 Elite Players</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Time Limit:</span>
                  <span className="text-orange-400">6 days remaining</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Participants:</span>
                  <span className="text-blue-400">87/150</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-3 mb-6">
              <div className="text-yellow-400 font-semibold text-sm mb-2">⚠️ Warning: Extreme Difficulty</div>
              <div className="text-gray-300 text-xs space-y-1">
                <div>• Smart monsters adapt to your strategies</div>
                <div>• Boss has 95% difficulty rating</div>
                <div>• Only 12% completion rate so far</div>
                <div>• Failure means 7‑day cooldown</div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowInviteModal(false)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold"
              >
                🔥 Accept Challenge
              </button>
              <button
                onClick={() => setShowInviteModal(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="fixed top-0 w-full bg-black/40 backdrop-blur-md z-50 border-b border-red-800/30">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="mr-3">
              <i className="ri-arrow-left-line text-white text-xl"></i>
            </Link>
            <span className="text-white font-semibold">Elite World Invitations</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-red-400 text-sm">👑 Rank #{playerStats.rank}</div>
            <button
              onClick={() => setShowInviteModal(true)}
              className="text-orange-400 text-sm animate-pulse"
            >
              📨 1 Pending
            </button>
          </div>
        </div>
      </header>

      {/* Player Elite Status */}
      <section className="pt-20 px-4 py-6 relative z-10">
        <div className="bg-gradient-to-r from-red-900/50 to-purple-900/50 border-2 border-red-500 rounded-2xl p-6 mb-6">
          <div className="text-center mb-4">
            <div className="text-4xl mb-2">⚔️</div>
            <h1 className="text-2xl font-bold text-white mb-2">Elite Player Status</h1>
            <p className="text-red-400 text-sm">Monthly invitations for top‑tier hunters only</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-black/30 rounded-lg p-3 text-center">
              <div className="text-white font-bold text-lg">{playerStats.level}</div>
              <div className="text-gray-400 text-sm">Player Level</div>
            </div>
            <div className="bg-black/30 rounded-lg p-3 text-center">
              <div className="text-orange-400 font-bold text-lg">{playerStats.legendaryCount}</div>
              <div className="text-gray-400 text-sm">Legendaries</div>
            </div>
            <div className="bg-black/30 rounded-lg p-3 text-center">
              <div className="text-purple-400 font-bold text-lg">{playerStats.eliteCompletions}</div>
              <div className="text-gray-400 text-sm">Elite Clears</div>
            </div>
            <div className="bg-black/30 rounded-lg p-3 text-center">
              <div className="text-blue-400 font-bold text-lg">{playerStats.battleRating}</div>
              <div className="text-gray-400 text-sm">Battle Rating</div>
            </div>
          </div>

          {playerStats.qualified ? (
            <div className="bg-green-900/30 border border-green-600 rounded-lg p-3 text-center">
              <div className="text-green-400 font-bold">✓ Qualified for Elite Worlds</div>
              <div className="text-gray-300 text-sm">You meet requirements for invitation‑only content</div>
            </div>
          ) : (
            <div className="bg-red-900/30 border border-red-600 rounded-lg p-3 text-center">
              <div className="text-red-400 font-bold">✗ Not Yet Qualified</div>
              <div className="text-gray-300 text-sm">Continue growing to unlock elite invitations</div>
            </div>
          )}
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="px-4 py-4 relative z-10">
        <div className="flex bg-gray-800/50 rounded-xl p-1 mb-6">
          <button
            onClick={() => setCurrentTab('worlds')}
            className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all ${
              currentTab === 'worlds' ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            🌍 Elite Worlds
          </button>
          <button
            onClick={() => setCurrentTab('invitations')}
            className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all ${
              currentTab === 'invitations' ? 'bg-orange-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            📨 Invitations
          </button>
          <button
            onClick={() => setCurrentTab('leaderboard')}
            className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all ${
              currentTab === 'leaderboard' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            👑 Leaderboard
          </button>
        </div>
      </section>

      {/* Elite Worlds Tab */}
      {currentTab === 'worlds' && (
        <section className="px-4 py-6 relative z-10">
          <div className="space-y-6">
            {eliteWorlds.map((world) => (
              <div
                key={world.id}
                className={`bg-gradient-to-r ${getDifficultyColor(world.difficulty)} bg-opacity-20 border-2 rounded-2xl p-6 cursor-pointer transition-all ${
                  selectedWorld === world.id ? 'scale-105 shadow-2xl' : 'hover:scale-102'
                }`}
                onClick={() => setSelectedWorld(selectedWorld === world.id ? null : world.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{world.name}</h3>
                    <p className="text-gray-300 text-sm mb-2">{world.theme}</p>
                    <div className="flex items-center space-x-3">
                      <div className={`text-xs px-3 py-1 rounded-full border font-bold ${getDifficultyColor(world.difficulty)}`}>
                        {world.difficulty}
                      </div>
                      <div className={`text-xs px-3 py-1 rounded-full border ${getStatusColor(world.status)}`}>
                        {world.status.toUpperCase()}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold">{world.monthYear}</div>
                    <div className="text-gray-400 text-sm">{world.timeLimit}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-black/30 rounded-lg p-3">
                    <div className="text-white font-bold">{world.participants}/{world.invitesSent}</div>
                    <div className="text-gray-400 text-sm">Participants</div>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3">
                    <div className="text-red-400 font-bold">{world.completionRate}%</div>
                    <div className="text-gray-400 text-sm">Success Rate</div>
                  </div>
                </div>

                {/* Boss Preview */}
                <div className="bg-red-900/30 border border-red-600 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-red-400 font-bold text-sm">👹 World Boss</div>
                    <div className="text-red-300 text-sm">Difficulty: {world.bossData.difficulty}/100</div>
                  </div>
                  <div className="text-white font-bold text-lg">{world.bossData.name}</div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {world.bossData.specialMechanics.slice(0, 2).map((mechanic, index) => (
                      <div key={index} className="bg-red-600/30 text-red-300 text-xs px-2 py-1 rounded-full">
                        {mechanic}
                      </div>
                    ))}
                    {world.bossData.specialMechanics.length > 2 && (
                      <div className="bg-red-600/30 text-red-300 text-xs px-2 py-1 rounded-full">
                        +{world.bossData.specialMechanics.length - 2} more
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-gray-300 text-sm">🧠 {world.newMonsters} Smart Monsters</div>
                  <div className="flex space-x-2">
                    {canQualify(world) ? (
                      <div className="text-green-400 text-sm">✓ Qualified</div>
                    ) : (
                      <div className="text-red-400 text-sm">✗ Not Qualified</div>
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                {selectedWorld === world.id && (
                  <div className="mt-6 pt-6 border-t border-gray-700 space-y-4">
                    {/* Requirements */}
                    <div>
                      <div className="text-white font-bold mb-2">Entry Requirements</div>
                      <div className="grid grid-cols-2 gap-3">
                        <div
                          className={`bg-black/30 rounded-lg p-2 border ${
                            playerStats.level >= world.minRequirements.playerLevel ? 'border-green-600' : 'border-red-600'
                          }`}
                        >
                          <div className="text-xs text-gray-400">Player Level</div>
                          <div
                            className={`font-bold ${
                              playerStats.level >= world.minRequirements.playerLevel ? 'text-green-400' : 'text-red-400'
                            }`}
                          >
                            {world.minRequirements.playerLevel}+ ({playerStats.level})
                          </div>
                        </div>
                        <div
                          className={`bg-black/30 rounded-lg p-2 border ${
                            playerStats.legendaryCount >= world.minRequirements.legendaryMonstersOwned
                              ? 'border-green-600'
                              : 'border-red-600'
                          }`}
                        >
                          <div className="text-xs text-gray-400">Legendaries</div>
                          <div
                            className={`font-bold ${
                              playerStats.legendaryCount >= world.minRequirements.legendaryMonstersOwned
                                ? 'text-green-400'
                                : 'text-red-400'
                            }`}
                          >
                            {world.minRequirements.legendaryMonstersOwned}+ ({playerStats.legendaryCount})
                          </div>
                        </div>
                        <div
                          className={`bg-black/30 rounded-lg p-2 border ${
                            playerStats.eliteCompletions >= world.minRequirements.previousEliteCompletions
                              ? 'border-green-600'
                              : 'border-red-600'
                          }`}
                        >
                          <div className="text-xs text-gray-400">Elite Clears</div>
                          <div
                            className={`font-bold ${
                              playerStats.eliteCompletions >= world.minRequirements.previousEliteCompletions
                                ? 'text-green-400'
                                : 'text-red-400'
                            }`}
                          >
                            {world.minRequirements.previousEliteCompletions}+ ({playerStats.eliteCompletions})
                          </div>
                        </div>
                        <div
                          className={`bg-black/30 rounded-lg p-2 border ${
                            playerStats.battleRating >= world.minRequirements.battleRating
                              ? 'border-green-600'
                              : 'border-red-600'
                          }`}
                        >
                          <div className="text-xs text-gray-400">Battle Rating</div>
                          <div
                            className={`font-bold ${
                              playerStats.battleRating >= world.minRequirements.battleRating
                                ? 'text-green-400'
                                : 'text-red-400'
                            }`}
                          >
                            {world.minRequirements.battleRating}+ ({playerStats.battleRating})
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Exclusive Rewards */}
                    <div>
                      <div className="text-white font-bold mb-2">Exclusive Rewards</div>
                      <div className="space-y-2">
                        <div className="bg-orange-900/30 border border-orange-600 rounded-lg p-3">
                          <div className="text-orange-400 font-semibold text-sm mb-1">👑 Title Reward</div>
                          <div className="text-white">{world.rewards.titleReward}</div>
                        </div>
                        <div className="bg-purple-900/30 border border-purple-600 rounded-lg p-3">
                          <div className="text-purple-400 font-semibold text-sm mb-1">🐉 Exclusive Monsters</div>
                          <div className="text-white text-sm space-y-1">
                            {world.rewards.exclusiveMonsters.map((monster, index) => (
                              <div key={index}>• {monster}</div>
                            ))}
                          </div>
                        </div>
                        <div className="bg-blue-900/30 border border-blue-600 rounded-lg p-3">
                          <div className="text-blue-400 font-semibold text-sm mb-1">✨ Special Relics</div>
                          <div className="text-white text-sm space-y-1">
                            {world.rewards.specialRelics.map((relic, index) => (
                              <div key={index}>• {relic}</div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Boss Mechanics */}
                    <div>
                      <div className="text-white font-bold mb-2">Boss Mechanics</div>
                      <div className="bg-red-900/30 border border-red-600 rounded-lg p-3">
                        <div className="grid grid-cols-1 gap-2">
                          {world.bossData.specialMechanics.map((mechanic, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                              <div className="text-red-300 text-sm">{mechanic}</div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 pt-3 border-t border-red-700">
                          <div className="text-red-400 text-sm">
                            Weaknesses: {world.bossData.weaknesses.join(', ')}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Invitations Tab */}
      {currentTab === 'invitations' && (
        <section className="px-4 py-6 relative z-10">
          <div className="space-y-4">
            {playerInvitations.map((invitation) => {
              const world = eliteWorlds.find((w) => w.id === invitation.worldId);
              if (!world) return null;

              return (
                <div key={invitation.id} className="bg-gray-800/70 border-2 border-orange-600 rounded-xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{world.name}</h3>
                      <p className="text-gray-300 text-sm">{world.theme}</p>
                    </div>
                    <div className={`text-xs px-3 py-1 rounded-full border ${getInviteStatusColor(invitation.status)}`}>
                      {invitation.status.toUpperCase()}
                    </div>
                  </div>

                  <div className="bg-orange-900/30 border border-orange-600 rounded-lg p-4 mb-4">
                    <div className="text-orange-400 font-bold mb-2">📨 Invitation Details</div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Qualification:</span>
                        <span className="text-green-400">{invitation.qualification}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Invited:</span>
                        <span className="text-blue-400">{new Date(invitation.invitedAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Expires:</span>
                        <span className="text-red-400">{new Date(invitation.expiresAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-900/30 border border-red-600 rounded-lg p-3 mb-4">
                    <div className="text-red-400 font-bold text-sm mb-2">⚠️ Challenge Warning</div>
                    <div className="text-gray-300 text-xs space-y-1">
                      <div>• Difficulty: {world.difficulty} ({world.bossData.difficulty}/100)</div>
                      <div>• Success Rate: Only {world.completionRate}% of players complete</div>
                      <div>• Smart AI monsters learn from your tactics</div>
                      <div>• Failure penalty: 7‑day elite cooldown</div>
                    </div>
                  </div>

                  {invitation.status === 'pending' && (
                    <div className="flex space-x-3">
                      <button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-bold">
                        🔥 Accept Challenge
                      </button>
                      <button className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg">
                        Decline
                      </button>
                    </div>
                  )}
                </div>
              );
            })}

            {playerInvitations.length === 0 && (
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 text-center">
                <div className="text-4xl mb-4">📭</div>
                <div className="text-white font-bold text-lg mb-2">No Active Invitations</div>
                <div className="text-gray-400 text-sm">
                  Keep improving your elite status to receive monthly invitations
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Leaderboard Tab */}
      {currentTab === 'leaderboard' && (
        <section className="px-4 py-6 relative z-10">
          <div className="bg-gray-800/70 border border-purple-600 rounded-xl p-6 mb-6">
            <div className="text-center mb-4">
              <div className="text-3xl mb-2">🏆</div>
              <h3 className="text-xl font-bold text-white mb-2">Elite Players Leaderboard</h3>
              <p className="text-purple-400 text-sm">Top performers eligible for exclusive invitations</p>
            </div>
          </div>

          <div className="space-y-3">
            {topPlayers.map((player, index) => (
              <div
                key={index}
                className={`bg-gray-800/70 border rounded-xl p-4 ${
                  player.name === 'You' ? 'border-yellow-500 bg-yellow-900/20' : 'border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        player.rank === 1
                          ? 'bg-yellow-600 text-white'
                          : player.rank === 2
                          ? 'bg-gray-400 text-white'
                          : player.rank === 3
                          ? 'bg-orange-600 text-white'
                          : player.name === 'You'
                          ? 'bg-yellow-600 text-white'
                          : 'bg-gray-600 text-white'
                      }`}
                    >
                      #{player.rank}
                    </div>
                    <div>
                      <div className={`font-bold ${player.name === 'You' ? 'text-yellow-400' : 'text-white'}`}>
                        {player.name}
                      </div>
                      <div className="text-gray-400 text-sm">{player.title}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold">Lv.{player.level}</div>
                    <div className="text-blue-400 text-sm">{player.rating} Rating</div>
                    <div className="text-purple-400 text-xs">{player.completions} Elite Clears</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-purple-900/30 border border-purple-600 rounded-lg p-4 mt-6">
            <div className="text-purple-400 font-bold text-sm mb-2">📊 Ranking Criteria</div>
            <div className="text-gray-300 text-xs space-y-1">
              <div>• Elite World completions (weighted heavily)</div>
              <div>• Overall battle rating and win/loss record</div>
              <div>• Legendary monster collection size</div>
              <div>• Player level and total experience</div>
              <div>• Community contributions and achievements</div>
            </div>
          </div>
        </section>
      )}

      {/* Smart Monster Preview */}
      <section className="px-4 py-6 relative z-10 mb-20">
        <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-2 border-blue-500 rounded-2xl p-6">
          <div className="text-center mb-4">
            <div className="text-3xl mb-2">🧠</div>
            <h3 className="text-xl font-bold text-white mb-2">Smart AI Monsters</h3>
            <p className="text-blue-400 text-sm">Advanced creatures that learn and adapt</p>
          </div>

          <div className="space-y-4">
            {smartMonsterTypes.map((monster, index) => (
              <div key={index} className="bg-blue-900/30 border border-blue-600 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="text-blue-400 font-bold">{monster.name}</div>
                  <div className="text-yellow-400 text-sm">🧠 AI</div>
                </div>
                <div className="text-gray-300 text-sm mb-3">{monster.intelligence}</div>
                <div className="flex flex-wrap gap-2">
                  {monster.abilities.map((ability, abilityIndex) => (
                    <div key={abilityIndex} className="bg-blue-600/30 text-blue-300 text-xs px-2 py-1 rounded-full">
                      {ability}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-red-900/30 border border-red-600 rounded-lg p-3 mt-4">
            <div className="text-red-400 font-bold text-sm mb-2">⚠️ AI Behavior Warning</div>
            <div className="text-gray-300 text-xs space-y-1">
              <div>• These monsters remember your battle patterns globally</div>
              <div>• They share knowledge with other instances worldwide</div>
              <div>• Expect counter‑strategies to your favorite tactics</div>
              <div>• Only elite players can handle their intelligence</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
