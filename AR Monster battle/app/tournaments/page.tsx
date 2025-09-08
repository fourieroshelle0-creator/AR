'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Tournament {
  id: string;
  name: string;
  type: 'single_elimination' | 'double_elimination' | 'round_robin';
  status: 'registration' | 'ongoing' | 'completed';
  maxParticipants: number;
  currentParticipants: number;
  prizePool: {
    first: string;
    second: string;
    third: string;
  };
  registrationDeadline: string;
  startDate: string;
  location: string;
  entryFee: {
    type: 'blank_cards' | 'experience' | 'items';
    amount: number;
  };
  currentRound: number;
  totalRounds: number;
  matches: TournamentMatch[];
  participants: TournamentPlayer[];
  streamingEnabled: boolean;
  featured: boolean;
}

interface TournamentMatch {
  id: string;
  roundNumber: number;
  player1: TournamentPlayer;
  player2: TournamentPlayer;
  winner?: TournamentPlayer;
  status: 'pending' | 'ongoing' | 'completed';
  streamUrl?: string;
  viewerCount: number;
  bracketPosition: { x: number; y: number };
}

interface TournamentPlayer {
  id: string;
  username: string;
  rank: string;
  level: number;
  winStreak: number;
  favoriteMonster: string;
  eliminated: boolean;
  seed: number;
}

export default function Tournaments() {
  const [activeTab, setActiveTab] = useState<'active' | 'register' | 'brackets' | 'streaming'>('active');
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);
  const [showRegistration, setShowRegistration] = useState(false);
  const [showBracketView, setShowBracketView] = useState(false);
  const [playerRegistered, setPlayerRegistered] = useState(false);
  const [bracketScale, setBracketScale] = useState(1);
  const [showStreamModal, setShowStreamModal] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<TournamentMatch | null>(null);

  const currentPlayer = {
    id: 'player-1',
    username: 'DragonMaster',
    rank: 'Gold Duelist',
    level: 22,
    winStreak: 8,
    favoriteMonster: 'Inferno Dragon'
  };

  const tournaments: Tournament[] = [
    {
      id: 'championship-2024',
      name: 'Winter Championship 2024',
      type: 'single_elimination',
      status: 'ongoing',
      maxParticipants: 64,
      currentParticipants: 64,
      prizePool: {
        first: '50 Premium Blank Cards + Legendary Phoenix Relic',
        second: '25 Premium Blank Cards + Epic Evolution Relic',
        third: '10 Premium Blank Cards + Rare Monster'
      },
      registrationDeadline: 'Closed',
      startDate: '2 hours ago',
      location: 'Times Square Arena',
      entryFee: {
        type: 'blank_cards',
        amount: 5
      },
      currentRound: 3,
      totalRounds: 6,
      matches: [],
      participants: [],
      streamingEnabled: true,
      featured: true
    },
    {
      id: 'rookie-cup',
      name: 'Rookie Cup Tournament',
      type: 'single_elimination',
      status: 'registration',
      maxParticipants: 32,
      currentParticipants: 18,
      prizePool: {
        first: '15 Blank Cards + Starter Evolution Pack',
        second: '8 Blank Cards + Training Resources',
        third: '5 Blank Cards + Monster Guide'
      },
      registrationDeadline: '6 hours remaining',
      startDate: 'Tomorrow 2:00 PM',
      location: 'Central Park Meadow',
      entryFee: {
        type: 'experience',
        amount: 200
      },
      currentRound: 0,
      totalRounds: 5,
      matches: [],
      participants: [],
      streamingEnabled: true,
      featured: false
    },
    {
      id: 'masters-league',
      name: 'Masters League Weekly',
      type: 'double_elimination',
      status: 'registration',
      maxParticipants: 16,
      currentParticipants: 12,
      prizePool: {
        first: '30 Premium Cards + Master Rank Badge',
        second: '15 Premium Cards + Expert Badge',
        third: '8 Premium Cards + Veteran Badge'
      },
      registrationDeadline: '2 days remaining',
      startDate: 'Friday 7:00 PM',
      location: 'Brooklyn Bridge Arena',
      entryFee: {
        type: 'blank_cards',
        amount: 8
      },
      currentRound: 0,
      totalRounds: 7,
      matches: [],
      participants: [],
      streamingEnabled: true,
      featured: false
    },
    {
      id: 'shadow-tournament',
      name: 'Shadow Element Cup',
      type: 'round_robin',
      status: 'ongoing',
      maxParticipants: 12,
      currentParticipants: 12,
      prizePool: {
        first: 'Shadow Dragon Legendary + 20 Dark Cards',
        second: 'Shadow Beast Epic + 12 Dark Cards',
        third: 'Shadow Imp Rare + 8 Dark Cards'
      },
      registrationDeadline: 'Closed',
      startDate: '1 day ago',
      location: 'Museum Historic Hall',
      entryFee: {
        type: 'items',
        amount: 1
      },
      currentRound: 2,
      totalRounds: 11,
      matches: [],
      participants: [],
      streamingEnabled: true,
      featured: false
    }
  ];

  // Generate mock tournament matches for bracket display
  const generateTournamentBracket = (tournament: Tournament) => {
    const matches: TournamentMatch[] = [];
    const players: TournamentPlayer[] = Array.from({ length: tournament.currentParticipants }, (_, i) => ({
      id: `player-${i + 1}`,
      username: [
        'DragonSlayer', 'ShadowMaster', 'FireBeast', 'IceQueen', 'ThunderGod', 'EarthShaker',
        'WindDancer', 'LightBringer', 'DarkLord', 'NaturGuard', 'CrystalMage', 'StormCaller',
        'FlameWarden', 'FrostKing', 'BoltStrike', 'RockCrusher', 'AirWalker', 'SunBlade',
        'VoidHunter', 'ForestSage', 'ElementMaster', 'SpiritGuide', 'ChaosBringer', 'OrderKeeper'
      ][i] || `Player${i + 1}`,
      rank: ['Bronze', 'Silver', 'Gold', 'Platinum'][Math.floor(Math.random() * 4)] + ' ' + 
            ['Summoner', 'Duelist', 'Champion', 'Master'][Math.floor(Math.random() * 4)],
      level: Math.floor(Math.random() * 20) + 10,
      winStreak: Math.floor(Math.random() * 15),
      favoriteMonster: [
        'Fire Dragon', 'Ice Phoenix', 'Thunder Wolf', 'Earth Golem', 'Shadow Cat',
        'Wind Serpent', 'Light Angel', 'Dark Demon', 'Nature Beast', 'Crystal Guardian'
      ][Math.floor(Math.random() * 10)],
      eliminated: false,
      seed: i + 1
    }));

    // Generate first round matches
    for (let i = 0; i < tournament.currentParticipants; i += 2) {
      if (players[i + 1]) {
        matches.push({
          id: `match-r1-${i / 2}`,
          roundNumber: 1,
          player1: players[i],
          player2: players[i + 1],
          winner: tournament.currentRound > 1 ? (Math.random() > 0.5 ? players[i] : players[i + 1]) : undefined,
          status: tournament.currentRound > 1 ? 'completed' : 
                 tournament.currentRound === 1 ? (Math.random() > 0.7 ? 'ongoing' : 'pending') : 'pending',
          streamUrl: Math.random() > 0.6 ? `stream-${i / 2}` : undefined,
          viewerCount: Math.floor(Math.random() * 500) + 50,
          bracketPosition: { x: 50, y: 100 + (i / 2) * 80 }
        });
      }
    }

    return { matches, participants: players };
  };

  const liveStreams = [
    {
      id: 'stream-1',
      title: 'CHAMPIONSHIP FINALS - DragonSlayer vs ShadowMaster',
      tournament: 'Winter Championship 2024',
      viewers: 1247,
      streamer: 'OfficialTournaments',
      thumbnail: 'Epic championship finals with legendary monsters, tournament streaming overlay with player stats, professional esports arena setup, dramatic battle lighting with spectator crowd',
      isLive: true,
      quality: '1080p',
      featured: true
    },
    {
      id: 'stream-2',
      title: 'Rookie Cup Semifinals - Rising Stars Battle',
      tournament: 'Rookie Cup Tournament',
      viewers: 423,
      streamer: 'MonsterBattleTV',
      thumbnail: 'Young players in rookie tournament semifinals, beginner-friendly streaming setup, educational commentary overlay, encouraging tournament atmosphere',
      isLive: true,
      quality: '720p',
      featured: false
    },
    {
      id: 'stream-3',
      title: 'Masters League - Double Elimination Bracket',
      tournament: 'Masters League Weekly',
      viewers: 689,
      streamer: 'ProBattleStreams',
      thumbnail: 'Professional players in masters league competition, advanced tournament bracket display, high-level gameplay analysis, competitive esports environment',
      isLive: true,
      quality: '1080p',
      featured: false
    }
  ];

  const playerStreams = [
    {
      id: 'player-stream-1',
      title: 'Climbing to Platinum - Live Monster Battles!',
      streamer: 'DragonMaster47',
      viewers: 156,
      thumbnail: 'Player climbing ranked ladder with fire dragon team, personal streaming setup, rank progression overlay, educational gameplay commentary',
      isLive: true,
      game: 'Ranked Battles'
    },
    {
      id: 'player-stream-2',
      title: 'Shadow Element Only Challenge Run',
      streamer: 'ShadowHunter92',
      viewers: 89,
      thumbnail: 'Challenging shadow-only monster team gameplay, unique challenge run setup, creative team building, entertaining player commentary',
      isLive: true,
      game: 'Challenge Mode'
    },
    {
      id: 'player-stream-3',
      title: 'New Player Guide - Starter Monster Tips',
      streamer: 'HelpfulTrainer',
      viewers: 234,
      thumbnail: 'Educational content for new players with starter monsters, helpful tutorial setup, beginner-friendly interface, supportive learning environment',
      isLive: true,
      game: 'Tutorial Mode'
    }
  ];

  useEffect(() => {
    if (selectedTournament) {
      const bracket = generateTournamentBracket(selectedTournament);
      setSelectedTournament(prev => prev ? { ...prev, ...bracket } : null);
    }
  }, [selectedTournament?.id]);

  const registerForTournament = (tournament: Tournament) => {
    setPlayerRegistered(true);
    alert(`Successfully registered for ${tournament.name}!`);
    setShowRegistration(false);
  };

  const viewBracket = (tournament: Tournament) => {
    setSelectedTournament(tournament);
    setShowBracketView(true);
  };

  const watchStream = (streamId: string) => {
    setSelectedMatch(null);
    setShowStreamModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'registration': return 'text-blue-400 bg-blue-900/30';
      case 'ongoing': return 'text-red-400 bg-red-900/30';
      case 'completed': return 'text-green-400 bg-green-900/30';
      default: return 'text-gray-400 bg-gray-900/30';
    }
  };

  const getTournamentIcon = (type: string) => {
    switch (type) {
      case 'single_elimination': return '🏆';
      case 'double_elimination': return '⚔️';
      case 'round_robin': return '🔄';
      default: return '🎮';
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 pt-20 pb-24 relative overflow-hidden">
      {/* Atmospheric Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-900/20 via-transparent to-black/40"></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full bg-black/40 backdrop-blur-md z-50 border-b border-orange-800/30">
        <div className="px-4 py-3 flex items-center justify-between">
          <Link href="/duel-monster-world" className="flex items-center">
            <i className="ri-arrow-left-line text-white text-xl mr-2"></i>
            <span className="text-white font-semibold">Tournament Hub</span>
          </Link>
          <div className="flex items-center space-x-3">
            <div className="text-red-400 text-sm animate-pulse">🔴 3 LIVE</div>
            <div className="text-orange-400 text-sm">🏆 4 Active</div>
          </div>
        </div>
      </header>

      {/* Tournament Registration Modal */}
      {showRegistration && selectedTournament && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-gray-900 border-2 border-orange-600 rounded-2xl p-6 max-w-sm w-full">
            <div className="text-center mb-4">
              <div className="text-3xl mb-2">🏆</div>
              <h3 className="text-xl font-bold text-white mb-2">Tournament Registration</h3>
              <p className="text-gray-300 text-sm">{selectedTournament.name}</p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="bg-orange-900/30 border border-orange-700 rounded-lg p-3">
                <div className="text-orange-400 font-semibold text-sm mb-2">Entry Requirements</div>
                <div className="text-gray-300 text-xs space-y-1">
                  <div>Entry Fee: {selectedTournament.entryFee.amount} {selectedTournament.entryFee.type.replace('_', ' ')}</div>
                  <div>Format: {selectedTournament.type.replace('_', ' ')}</div>
                  <div>Max Level: {selectedTournament.name.includes('Rookie') ? '15' : 'No limit'}</div>
                </div>
              </div>

              <div className="bg-green-900/30 border border-green-700 rounded-lg p-3">
                <div className="text-green-400 font-semibold text-sm mb-2">Prize Pool</div>
                <div className="text-gray-300 text-xs space-y-1">
                  <div>🥇 1st: {selectedTournament.prizePool.first}</div>
                  <div>🥈 2nd: {selectedTournament.prizePool.second}</div>
                  <div>🥉 3rd: {selectedTournament.prizePool.third}</div>
                </div>
              </div>

              <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-3">
                <div className="text-blue-400 font-semibold text-sm mb-2">Player Stats</div>
                <div className="text-gray-300 text-xs space-y-1">
                  <div>Current Rank: {currentPlayer.rank}</div>
                  <div>Level: {currentPlayer.level}</div>
                  <div>Win Streak: {currentPlayer.winStreak}</div>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowRegistration(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => registerForTournament(selectedTournament)}
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-bold"
              >
                Register Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bracket View Modal */}
      {showBracketView && selectedTournament && (
        <div className="fixed inset-0 bg-black z-[100] flex flex-col">
          <div className="bg-black/90 p-4 border-b border-orange-800 flex items-center justify-between">
            <button
              onClick={() => setShowBracketView(false)}
              className="text-white"
            >
              <i className="ri-arrow-left-line text-xl mr-2"></i>
              Back
            </button>
            <div className="text-center">
              <div className="text-white font-bold">{selectedTournament.name}</div>
              <div className="text-orange-400 text-sm">Round {selectedTournament.currentRound}/{selectedTournament.totalRounds}</div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setBracketScale(prev => Math.max(0.5, prev - 0.1))}
                className="bg-gray-600 text-white px-3 py-1 rounded"
              >
                -
              </button>
              <button
                onClick={() => setBracketScale(prev => Math.min(2, prev + 0.1))}
                className="bg-gray-600 text-white px-3 py-1 rounded"
              >
                +
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-auto bg-gray-900">
            <div 
              className="relative min-w-full min-h-full p-8"
              style={{ transform: `scale(${bracketScale})`, transformOrigin: 'top left' }}
            >
              {/* Tournament Bracket Display */}
              <div className="text-center mb-8">
                <div className="text-white text-2xl font-bold">{selectedTournament.name}</div>
                <div className="text-orange-400 text-lg">Tournament Bracket</div>
              </div>

              {/* Single Elimination Bracket */}
              {selectedTournament.type === 'single_elimination' && (
                <div className="space-y-8">
                  {/* Round Headers */}
                  <div className="grid grid-cols-6 gap-8 text-center mb-4">
                    <div className="text-orange-400 font-bold">Round 1</div>
                    <div className="text-orange-400 font-bold">Round 2</div>
                    <div className="text-orange-400 font-bold">Quarterfinals</div>
                    <div className="text-orange-400 font-bold">Semifinals</div>
                    <div className="text-orange-400 font-bold">Finals</div>
                    <div className="text-yellow-400 font-bold">Champion</div>
                  </div>

                  {/* Bracket Grid */}
                  <div className="grid grid-cols-6 gap-8">
                    {/* Round 1 - 32 matches */}
                    <div className="space-y-4">
                      {Array.from({ length: Math.min(16, selectedTournament.currentParticipants / 2) }, (_, i) => (
                        <div key={i} className="bg-gray-800 border border-gray-700 rounded-lg p-3">
                          <div className="space-y-2">
                            <div className={`text-xs px-2 py-1 rounded text-center ${
                              selectedTournament.currentRound > 1 ? 'bg-green-600 text-white' : 
                              selectedTournament.currentRound === 1 ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-300'
                            }`}>
                              Match {i + 1}
                            </div>
                            <div className="text-white text-xs font-semibold">Player{i * 2 + 1}</div>
                            <div className="text-center text-gray-400 text-xs">vs</div>
                            <div className="text-white text-xs font-semibold">Player{i * 2 + 2}</div>
                            {selectedTournament.currentRound > 1 && (
                              <div className="text-green-400 text-xs text-center">
                                Winner: Player{Math.random() > 0.5 ? i * 2 + 1 : i * 2 + 2}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Round 2 - 16 matches */}
                    <div className="space-y-8">
                      {Array.from({ length: Math.min(8, selectedTournament.currentParticipants / 4) }, (_, i) => (
                        <div key={i} className="bg-gray-800 border border-gray-700 rounded-lg p-3">
                          <div className="space-y-2">
                            <div className={`text-xs px-2 py-1 rounded text-center ${
                              selectedTournament.currentRound > 2 ? 'bg-green-600 text-white' : 
                              selectedTournament.currentRound === 2 ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-300'
                            }`}>
                              QF {i + 1}
                            </div>
                            <div className="text-white text-xs font-semibold">TBD</div>
                            <div className="text-center text-gray-400 text-xs">vs</div>
                            <div className="text-white text-xs font-semibold">TBD</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Quarterfinals */}
                    <div className="space-y-16">
                      {Array.from({ length: 4 }, (_, i) => (
                        <div key={i} className="bg-gray-800 border border-gray-700 rounded-lg p-3">
                          <div className="space-y-2">
                            <div className={`text-xs px-2 py-1 rounded text-center ${
                              selectedTournament.currentRound > 3 ? 'bg-green-600 text-white' : 
                              selectedTournament.currentRound === 3 ? 'bg-red-600 text-white animate-pulse' : 'bg-gray-600 text-gray-300'
                            }`}>
                              QF {i + 1}
                            </div>
                            <div className="text-white text-xs font-semibold">TBD</div>
                            <div className="text-center text-gray-400 text-xs">vs</div>
                            <div className="text-white text-xs font-semibold">TBD</div>
                            {selectedTournament.currentRound === 3 && (
                              <button
                                onClick={() => watchStream(`qf-${i}`)}
                                className="w-full bg-red-600 text-white text-xs py-1 rounded mt-2 animate-pulse"
                              >
                                🔴 LIVE
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Semifinals */}
                    <div className="space-y-32">
                      {Array.from({ length: 2 }, (_, i) => (
                        <div key={i} className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                          <div className="space-y-2">
                            <div className={`text-xs px-2 py-1 rounded text-center ${
                              selectedTournament.currentRound > 4 ? 'bg-green-600 text-white' : 
                              selectedTournament.currentRound === 4 ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-300'
                            }`}>
                              Semifinal {i + 1}
                            </div>
                            <div className="text-white text-sm font-semibold">TBD</div>
                            <div className="text-center text-gray-400 text-xs">vs</div>
                            <div className="text-white text-sm font-semibold">TBD</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Finals */}
                    <div className="flex justify-center">
                      <div className="bg-orange-800 border-2 border-orange-600 rounded-lg p-6">
                        <div className="space-y-3">
                          <div className="text-orange-400 font-bold text-center">FINALS</div>
                          <div className="text-white text-lg font-bold">TBD</div>
                          <div className="text-center text-orange-400">vs</div>
                          <div className="text-white text-lg font-bold">TBD</div>
                          <button
                            onClick={() => watchStream('finals')}
                            className="w-full bg-red-600 text-white py-2 rounded font-bold animate-pulse"
                          >
                            🔴 FINALS LIVE
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Champion */}
                    <div className="flex justify-center">
                      <div className="bg-yellow-800 border-2 border-yellow-600 rounded-lg p-6">
                        <div className="space-y-3">
                          <div className="text-yellow-400 font-bold text-center">🏆</div>
                          <div className="text-yellow-400 font-bold text-center">CHAMPION</div>
                          <div className="text-white text-xl font-bold text-center">TBD</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Stream Modal */}
      {showStreamModal && (
        <div className="fixed inset-0 bg-black z-[100] flex flex-col">
          <div className="bg-black/90 p-4 border-b border-red-800 flex items-center justify-between">
            <button
              onClick={() => setShowStreamModal(false)}
              className="text-white"
            >
              <i className="ri-arrow-left-line text-xl mr-2"></i>
              Back to Tournaments
            </button>
            <div className="text-center">
              <div className="text-red-400 font-bold animate-pulse">🔴 LIVE STREAM</div>
              <div className="text-white text-sm">Championship Finals</div>
            </div>
            <div className="text-right">
              <div className="text-red-400 font-bold">1,247 viewers</div>
              <div className="text-gray-400 text-sm">HD Quality</div>
            </div>
          </div>
          
          <div className="flex-1 relative">
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: 'url(https://readdy.ai/api/search-image?query=Professional%20esports%20tournament%20stream%20with%20championship%20finals%20battle%2C%20two%20players%20competing%20with%20monster%20creatures%2C%20tournament%20overlay%20with%20brackets%20and%20stats%2C%20dramatic%20arena%20lighting%20with%20spectator%20crowd%2C%20live%20streaming%20interface%20with%20chat%20and%20viewer%20count&width=375&height=600&seq=tournament-stream&orientation=portrait)'
              }}
            >
              <div className="absolute inset-0 bg-black/30">
                {/* Stream Overlay */}
                <div className="absolute top-4 left-4 right-4">
                  <div className="bg-black/80 rounded-lg p-3">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-blue-400 font-bold">DragonSlayer</div>
                        <div className="text-gray-300 text-sm">Platinum Master</div>
                        <div className="bg-gray-700 rounded-full h-2 mt-1">
                          <div className="bg-blue-400 h-2 rounded-full w-3/4"></div>
                        </div>
                      </div>
                      <div>
                        <div className="text-red-400 font-bold">ShadowMaster</div>
                        <div className="text-gray-300 text-sm">Diamond Champion</div>
                        <div className="bg-gray-700 rounded-full h-2 mt-1">
                          <div className="bg-red-400 h-2 rounded-full w-2/3"></div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center mt-3">
                      <div className="text-yellow-400 font-bold text-lg">CHAMPIONSHIP FINALS</div>
                      <div className="text-orange-400 text-sm">Winter Tournament 2024</div>
                    </div>
                  </div>
                </div>

                {/* Chat Interface */}
                <div className="absolute bottom-4 right-4 w-64 bg-black/80 rounded-lg p-3">
                  <div className="text-white font-bold text-sm mb-2">Live Chat</div>
                  <div className="space-y-1 max-h-32 overflow-y-auto text-xs">
                    <div className="text-blue-400">DragonFan92: Amazing play!</div>
                    <div className="text-green-400">BattleWatcher: That shadow combo was insane</div>
                    <div className="text-purple-400">TournamentPro: Finals are always epic</div>
                    <div className="text-yellow-400">MonsterMaster: Who's winning?</div>
                    <div className="text-red-400">LiveViewer: This is so intense!</div>
                  </div>
                  <div className="flex mt-2">
                    <input 
                      className="flex-1 bg-gray-700 text-white text-xs px-2 py-1 rounded-l"
                      placeholder="Type message..."
                    />
                    <button className="bg-blue-600 text-white text-xs px-3 py-1 rounded-r">
                      Send
                    </button>
                  </div>
                </div>

                {/* Stream Controls */}
                <div className="absolute bottom-4 left-4">
                  <div className="flex space-x-2">
                    <button className="bg-red-600 text-white px-3 py-2 rounded font-bold text-sm">
                      👍 Cheer
                    </button>
                    <button className="bg-purple-600 text-white px-3 py-2 rounded text-sm">
                      🎁 Gift
                    </button>
                    <button className="bg-blue-600 text-white px-3 py-2 rounded text-sm">
                      📤 Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <section className="pt-20 px-4 py-4 relative z-10">
        <div className="flex bg-gray-800/50 rounded-xl p-1 mb-6">
          <button
            onClick={() => setActiveTab('active')}
            className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'active' ? 'bg-orange-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            🏆 Active ({tournaments.filter(t => t.status !== 'completed').length})
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'register' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            📝 Register
          </button>
          <button
            onClick={() => setActiveTab('brackets')}
            className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'brackets' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            📊 Brackets
          </button>
          <button
            onClick={() => setActiveTab('streaming')}
            className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'streaming' ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            📺 Streaming
          </button>
        </div>
      </section>

      {/* Featured Tournament */}
      <section className="px-4 py-4 relative z-10">
        <div className="bg-gradient-to-r from-orange-900/50 to-red-900/50 border-2 border-orange-600 rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-orange-400 font-bold text-sm animate-pulse">🔥 FEATURED TOURNAMENT</div>
              <div className="text-white font-bold text-xl">Winter Championship 2024</div>
              <div className="text-gray-300 text-sm">Single Elimination • 64 Players • LIVE NOW</div>
            </div>
            <div className="text-right">
              <div className="text-red-400 font-bold text-lg animate-pulse">🔴 LIVE</div>
              <div className="text-gray-400 text-sm">Round 3/6</div>
            </div>
          </div>
          
          <div className="flex justify-center space-x-8 mb-4">
            <div className="text-center">
              <div className="text-3xl mb-1">🏆</div>
              <div className="text-yellow-400 font-bold">50 Premium Cards</div>
              <div className="text-gray-300 text-sm">+ Legendary Phoenix</div>
            </div>
            <div className="text-center">
              <div className="text-4xl text-orange-400 animate-pulse">VS</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-1">⚔️</div>
              <div className="text-orange-400 font-bold">8 Quarterfinals</div>
              <div className="text-gray-300 text-sm">Currently Playing</div>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={() => watchStream('championship')}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold animate-pulse"
            >
              🔴 Watch Live Finals
            </button>
            <button
              onClick={() => viewBracket(tournaments[0])}
              className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-bold"
            >
              📊 View Bracket
            </button>
          </div>
        </div>
      </section>

      {/* Tab Content */}
      {activeTab === 'active' && (
        <section className="px-4 py-4 relative z-10">
          <h2 className="text-xl font-bold text-white mb-4">🏆 Active Tournaments</h2>
          <div className="space-y-4">
            {tournaments.filter(t => t.status !== 'completed').map((tournament) => (
              <div key={tournament.id} className="bg-gray-800/70 border border-gray-700 rounded-xl p-4">
                
                {/* Tournament Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{getTournamentIcon(tournament.type)}</div>
                    <div>
                      <div className="text-white font-semibold">{tournament.name}</div>
                      <div className="text-gray-400 text-sm">{tournament.location}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm px-2 py-1 rounded-full ${getStatusColor(tournament.status)}`}>
                      {tournament.status.toUpperCase()}
                    </div>
                    {tournament.status === 'ongoing' && (
                      <div className="text-orange-400 text-sm animate-pulse">Round {tournament.currentRound}</div>
                    )}
                  </div>
                </div>

                {/* Tournament Progress */}
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Participants</span>
                    <span className="text-white">{tournament.currentParticipants}/{tournament.maxParticipants}</span>
                  </div>
                  <div className="bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-orange-400 h-2 rounded-full transition-all"
                      style={{ width: `${(tournament.currentParticipants / tournament.maxParticipants) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Prize Pool */}
                <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-3 mb-3">
                  <div className="text-yellow-400 font-semibold text-sm mb-1">🏆 Prize Pool</div>
                  <div className="text-gray-300 text-xs">
                    🥇 {tournament.prizePool.first}
                  </div>
                </div>

                {/* Tournament Details */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="text-center">
                    <div className="text-gray-400 text-xs">Format</div>
                    <div className="text-white text-sm font-semibold">
                      {tournament.type.replace('_', ' ')}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-400 text-xs">Entry Fee</div>
                    <div className="text-white text-sm font-semibold">
                      {tournament.entryFee.amount} {tournament.entryFee.type.replace('_', ' ')}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  {tournament.status === 'ongoing' && (
                    <>
                      <button
                        onClick={() => watchStream(tournament.id)}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold text-sm animate-pulse"
                      >
                        🔴 Watch Live
                      </button>
                      <button
                        onClick={() => viewBracket(tournament)}
                        className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold text-sm"
                      >
                        📊 View Bracket
                      </button>
                    </>
                  )}
                  {tournament.status === 'registration' && (
                    <button
                      onClick={() => {
                        setSelectedTournament(tournament);
                        setShowRegistration(true);
                      }}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold text-sm"
                    >
                      📝 Register Now
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {activeTab === 'streaming' && (
        <section className="px-4 py-4 relative z-10">
          
          {/* Live Tournament Streams */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white mb-4">🔴 Live Tournament Streams</h2>
            <div className="space-y-4">
              {liveStreams.map((stream) => (
                <div key={stream.id} className="bg-gray-800/70 border border-red-700 rounded-xl p-4">
                  <div className="flex items-start space-x-4">
                    <div 
                      className="w-24 h-16 rounded-lg bg-cover bg-center flex-shrink-0 relative"
                      style={{
                        backgroundImage: `url(https://readdy.ai/api/search-image?query=$%7Bstream.thumbnail%7D&width=96&height=64&seq=${stream.id}-thumb&orientation=landscape)`
                      }}
                    >
                      <div className="absolute top-1 left-1 bg-red-600 text-white text-xs px-1 rounded animate-pulse">
                        🔴 LIVE
                      </div>
                      <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                        {stream.quality}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-semibold text-sm mb-1">{stream.title}</div>
                      <div className="text-gray-400 text-xs mb-2">{stream.tournament}</div>
                      <div className="flex items-center justify-between">
                        <div className="text-gray-300 text-xs">by {stream.streamer}</div>
                        <div className="text-red-400 text-sm font-bold">👁️ {stream.viewers}</div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => watchStream(stream.id)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold text-sm mt-3 animate-pulse"
                  >
                    🔴 Watch Live Stream
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Player Streams */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white mb-4">👤 Player Streams</h2>
            <div className="space-y-3">
              {playerStreams.map((stream) => (
                <div key={stream.id} className="bg-gray-800/70 border border-blue-700 rounded-xl p-4">
                  <div className="flex items-start space-x-4">
                    <div 
                      className="w-20 h-14 rounded-lg bg-cover bg-center flex-shrink-0 relative"
                      style={{
                        backgroundImage: `url(https://readdy.ai/api/search-image?query=$%7Bstream.thumbnail%7D&width=80&height=56&seq=${stream.id}-player-thumb&orientation=landscape)`
                      }}
                    >
                      <div className="absolute top-1 left-1 bg-red-600 text-white text-xs px-1 rounded animate-pulse">
                        LIVE
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-semibold text-sm mb-1">{stream.title}</div>
                      <div className="text-blue-400 text-xs mb-1">{stream.streamer}</div>
                      <div className="flex items-center justify-between">
                        <div className="text-gray-400 text-xs">{stream.game}</div>
                        <div className="text-blue-400 text-sm">👁️ {stream.viewers}</div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => watchStream(stream.id)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm mt-3"
                  >
                    📺 Watch Stream
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Streaming Features */}
          <div className="bg-purple-900/30 border border-purple-700 rounded-xl p-4">
            <h3 className="text-purple-400 font-bold mb-3">📺 Streaming Features</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">🔴</span>
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">Live Tournament Broadcasting</div>
                  <div className="text-gray-300 text-xs">Official tournament streams with professional commentary</div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">👤</span>
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">Player Content Creation</div>
                  <div className="text-gray-300 text-xs">Share your battles and educational content</div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">💬</span>
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">Interactive Chat</div>
                  <div className="text-gray-300 text-xs">Live chat with reactions and cheering system</div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-yellow-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">📤</span>
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">Battle Recording</div>
                  <div className="text-gray-300 text-xs">Save and share your best tournament moments</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Tournament System Info */}
      <section className="px-4 py-6 relative z-10 mb-20">
        <div className="bg-gray-800/50 rounded-xl p-4">
          <h3 className="text-white font-bold mb-3">🏆 Tournament Features</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start space-x-2">
              <span className="text-orange-400">•</span>
              <span className="text-gray-300">Single & Double Elimination brackets with real-time updates</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-orange-400">•</span>
              <span className="text-gray-300">Live streaming integration with chat and viewer interaction</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-orange-400">•</span>
              <span className="text-gray-300">Automatic bracket generation and match scheduling</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-orange-400">•</span>
              <span className="text-gray-300">Prize pools with blank cards, items, and exclusive rewards</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-orange-400">•</span>
              <span className="text-gray-300">Player and tournament streaming platform integration</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-orange-400">•</span>
              <span className="text-gray-300">Battle recording and highlight sharing system</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}