'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function PlayerJourney() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [activePhase, setActivePhase] = useState('rookie');

  const journeyPhases = [
    {
      id: 'rookie',
      name: 'Rookie Hunter',
      days: '1-3',
      color: 'from-green-600 to-emerald-800',
      icon: '🌱',
      description: 'First steps into Ghost World'
    },
    {
      id: 'collector',
      name: 'Ghost Collector',
      days: '4-7',
      color: 'from-blue-600 to-cyan-800',
      icon: '📚',
      description: 'Building your ghost roster'
    },
    {
      id: 'raider',
      name: 'Raid Participant',
      days: '8-14',
      color: 'from-purple-600 to-indigo-800',
      icon: '⚔️',
      description: 'Joining guild battles'
    },
    {
      id: 'competitor',
      name: 'PvP Competitor',
      days: '15-21',
      color: 'from-orange-600 to-red-800',
      icon: '🏆',
      description: 'Arena battles and trading'
    },
    {
      id: 'master',
      name: 'World Walker',
      days: '22-30',
      color: 'from-purple-800 to-pink-800',
      icon: '🌍',
      description: 'Multi-dimensional mastery'
    }
  ];

  const dailyProgression = [
    // Rookie Hunter Phase (Days 1-3)
    {
      day: 1,
      phase: 'rookie',
      title: 'First Contact',
      activities: [
        'Tutorial: AR camera overlay with misty filter',
        'First ghost encounter: Shadow Shade appears',
        'Learn basic exorcism mechanics with Silver Cross',
        'Capture first ghost using tutorial guidance'
      ],
      rewards: ['1 Shade (Level 1)', '3 Ghost Shards', 'Basic Relic Set'],
      unlocks: ['Ghost detection radar', 'Energy trace tracking'],
      image: 'New player holding phone with AR ghost tutorial overlay, first supernatural encounter with translucent shadow spirit, beginner-friendly interface with glowing tutorial prompts, atmospheric cemetery setting with soft moonlight'
    },
    {
      day: 2,
      phase: 'rookie',
      title: 'Building Confidence',
      activities: [
        'Explore residential area for common spirits',
        'Capture 2 more ghosts: Hauntling + Poltergeist',
        'Learn about ghost types and rarities',
        'First ghost feeding with Haunted Shards'
      ],
      rewards: ['Ghost collection grows to 3', '8 Ghost Shards', 'Ritual Candle'],
      unlocks: ['Ghost stats panel', 'Basic evolution preview'],
      image: 'Player confidently hunting ghosts in suburban neighborhood, multiple spirit encounters with glowing energy traces, collection interface showing captured ghost portraits, evening atmosphere with streetlights'
    },
    {
      day: 3,
      phase: 'rookie',
      title: 'First Evolution',
      activities: [
        'Shade reaches Level 5 through battles',
        'Complete rookie challenges',
        'Join first local ghost hunt event',
        'Meet other players in nearby park'
      ],
      rewards: ['Shade evolution unlocked', 'Silver rank badge', 'Community invite'],
      unlocks: ['PvP ghost duels', 'Friend system', 'Local leaderboard'],
      image: 'Exciting first ghost evolution sequence with magical transformation effects, Shade becoming more powerful Wraith, celebration interface with achievement notifications, park setting with other players visible'
    },

    // Ghost Collector Phase (Days 4-7)
    {
      day: 4,
      phase: 'collector',
      title: 'Radar Unlocked',
      activities: [
        'Ghost radar unlocks (100m range)',
        'Systematically hunt different locations',
        'Visit cemetery for rare Revenant encounter',
        'Learn location-based spawn mechanics'
      ],
      rewards: ['Ancient Revenant (failed capture)', 'Enhanced detection tools', '15 Ghost Shards'],
      unlocks: ['Location bonus system', 'Rarity tracking', 'Distance indicator'],
      image: 'Advanced AR interface with ghost radar overlay showing multiple spirit signatures, cemetery exploration with ancient tombstones, enhanced detection UI with distance markers and rarity indicators'
    },
    {
      day: 5,
      phase: 'collector',
      title: 'Location Mastery',
      activities: [
        'Church visit: Mini-boss encounter',
        'School grounds: Multiple Hauntling spawns',
        'Abandoned building: Poltergeist nest',
        'Complete location collection achievements'
      ],
      rewards: ['3 new ghost captures', 'Location Master badge', 'Blessed Salt relic'],
      unlocks: ['Boss encounter mechanics', 'Nested spawn locations', 'Achievement system'],
      image: 'Player exploring various haunted locations with different ghost types, church ruins with boss-level spirit, school playground with playful child spirits, location diversity showcase'
    },
    {
      day: 7,
      phase: 'collector',
      title: 'First Major Evolution',
      activities: [
        'Shade evolves to Wraith (Level 10)',
        'Blood Moon event countdown begins',
        'Guild recruitment invitations appear',
        'Ghost trading system unlocked'
      ],
      rewards: ['Wraith evolution complete', 'Guild invites', 'Trading tokens'],
      unlocks: ['Major evolution system', 'Guild preview', 'Player marketplace'],
      image: 'Dramatic ghost evolution ceremony with Shade transforming into powerful Wraith, glowing evolution effects with magical particles, guild recruitment interface with faction options visible'
    },

    // Raid Participant Phase (Days 8-14)
    {
      day: 8,
      phase: 'raider',
      title: 'Guild Selection',
      activities: [
        'Choose faction: Exorcists vs Necromancers',
        'Complete guild initiation quest',
        'First team ghost hunt with guild members',
        'Learn advanced combat mechanics'
      ],
      rewards: ['Guild membership', 'Faction relic', 'Team coordination XP'],
      unlocks: ['Guild chat system', 'Coordinated attacks', 'Faction bonuses'],
      image: 'Player choosing between Exorcist and Necromancer guilds, faction selection interface with member profiles, team formation screen with guild mates, collaborative hunting preparation'
    },
    {
      day: 10,
      phase: 'raider',
      title: 'First Boss Raid',
      activities: [
        'Join Veil Maiden raid (15+ players required)',
        'Learn raid mechanics and coordination',
        'Epic AR boss battle in city park',
        'Contribute to guild victory'
      ],
      rewards: ['Epic boss loot', 'Raid completion badge', 'Rare evolution materials'],
      unlocks: ['Raid calendar', 'Boss encounter history', 'Elite ghost access'],
      image: 'Massive AR boss raid with giant Veil Maiden spirit towering over city park, multiple players visible with phones raised, coordinated attack patterns, epic battle atmosphere with special effects'
    },
    {
      day: 14,
      phase: 'raider',
      title: 'Portal Discovery',
      activities: [
        'Reach Level 20 with evolved Revenant',
        'Complete first raid successfully',
        'Mysterious portal appears in AR view',
        'Duel Monster World teaser unlocked'
      ],
      rewards: ['Revenant mastery', 'Portal key fragment', 'Cross-world preview'],
      unlocks: ['Multi-world system', 'Portal mechanics', 'Dimension switching'],
      image: 'Glowing interdimensional portal appearing in AR view, swirling energy effects with glimpses of Monster World beyond, player character achieving new milestone with evolved Revenant companion'
    },

    // PvP Competitor Phase (Days 15-21)
    {
      day: 15,
      phase: 'competitor',
      title: 'Arena Warrior',
      activities: [
        'Build roster of 6-8 ghost creatures',
        'Enter first PvP arena at shopping mall',
        'Learn AR battle overlay mechanics',
        'Win first ranked competitive match'
      ],
      rewards: ['Arena ranking badge', 'PvP victory tokens', 'Competitive ghost unlock'],
      unlocks: ['Ranked battle system', 'Stadium AR overlays', 'Competition leaderboards'],
      image: 'Intense PvP battle in shopping mall with AR overlay showing ghost creatures fighting, multiple players competing in arena format, holographic battle effects with spectator crowds, competitive gaming atmosphere'
    },
    {
      day: 17,
      phase: 'competitor',
      title: 'Global Trader',
      activities: [
        'Receive daily trade tokens (3 per day)',
        'Trade ghosts with players worldwide',
        'Discover ghost variants: Flaming Wraith, Neon Hauntling',
        'Participate in guild tournament preparation'
      ],
      rewards: ['Rare ghost variants', 'Global trading reputation', 'Tournament qualification'],
      unlocks: ['International marketplace', 'Ghost variant breeding', 'Tournament brackets'],
      image: 'Global trading interface showing players from different countries exchanging rare ghost variants, colorful neon and flaming ghost spirits with unique visual effects, international community interaction'
    },
    {
      day: 19,
      phase: 'competitor',
      title: 'Blood Moon Evolution',
      activities: [
        'Veil Maiden evolves to Banshee during Blood Moon event',
        'Special lunar evolution mechanics unlock',
        'Guild organizes Ghost vs Ghost tournament',
        'Compete for rare relics and evolution shards'
      ],
      rewards: ['Banshee evolution complete', 'Blood Moon relic', 'Tournament victory rewards'],
      unlocks: ['Lunar evolution system', 'Advanced tournament features', 'Elite ghost forms'],
      image: 'Dramatic Blood Moon evolution scene with Veil Maiden transforming into powerful Banshee under crimson moonlight, tournament arena with multiple guilds competing, spectacular lunar magic effects'
    },
    {
      day: 21,
      phase: 'competitor',
      title: 'Tournament Champion',
      activities: [
        'Final Banshee evolution to Wailing Queen',
        'Win guild tournament with strategic team composition',
        'Unlock exclusive ghost breeding combinations',
        'Prepare for legendary world unlock'
      ],
      rewards: ['Wailing Queen mastery', 'Champion title', 'Legendary access token'],
      unlocks: ['Ultimate evolution chains', 'Breeding laboratory', 'World Walker preparation'],
      image: 'Epic tournament victory celebration with Wailing Queen in full power, championship trophy and guild banner, advanced breeding interface showing genetic combinations, preparation for next dimension access'
    },

    // World Walker Phase (Days 22-30)
    {
      day: 22,
      phase: 'master',
      title: 'Blood Moon Wraith Raid',
      activities: [
        'Join global Blood Moon Wraith raid event',
        'Coordinate with 50+ players worldwide',
        'Epic AR boss towering in sky above city',
        'Contribute to legendary boss defeat'
      ],
      rewards: ['Legendary Ghost capture chance', 'Global event completion', 'World Walker status'],
      unlocks: ['Legendary encounter system', 'Cross-dimensional access', 'Elite raid privileges'],
      image: 'Massive global raid event with giant Blood Moon Wraith towering over city skyline, dozens of players coordinating worldwide attack, epic scale AR battle with international cooperation'
    },
    {
      day: 24,
      phase: 'master',
      title: 'Midnight Evolution',
      activities: [
        'Revenant evolution unlocks at 3 AM ritual',
        'Special midnight transformation ceremony',
        'Unlock unique legendary ghost abilities',
        'Begin Duel Monster World permanent access'
      ],
      rewards: ['Ultimate Revenant form', 'Midnight evolution mastery', 'Dual-world access'],
      unlocks: ['Time-based evolution system', 'Monster World portal', 'Cross-dimensional gameplay'],
      image: 'Mystical 3 AM evolution ritual with Revenant achieving ultimate form, clock striking midnight with magical transformation effects, portal to Monster World opening with dual-reality gameplay'
    },
    {
      day: 26,
      phase: 'master',
      title: 'Legendary Roster',
      activities: [
        'Complete legendary ghost roster collection',
        'Master cross-world battle strategies',
        'Train new players as mentor',
        'Participate in world-shaping events'
      ],
      rewards: ['Complete legendary collection', 'Mentor privileges', 'World influence powers'],
      unlocks: ['Master mentor system', 'World event creation', 'Ultimate gameplay features'],
      image: 'Impressive legendary ghost roster display with multiple ultimate evolution forms, mentorship interface showing guidance to new players, world-building tools for community events'
    },
    {
      day: 28,
      phase: 'master',
      title: 'Cerberus Phantom',
      activities: [
        'Spectral Hound final evolution to Cerberus Phantom',
        'Master three-headed beast abilities',
        'Lead guild in cross-dimensional warfare',
        'Shape community meta strategies'
      ],
      rewards: ['Cerberus Phantom mastery', 'Multi-dimensional leadership', 'Strategy influence'],
      unlocks: ['Ultimate beast forms', 'Cross-world guild leadership', 'Meta development tools'],
      image: 'Magnificent three-headed Cerberus Phantom with hellfire effects, cross-dimensional battle leadership interface, strategic planning tools for guild coordination across multiple worlds'
    },
    {
      day: 30,
      phase: 'master',
      title: 'World Walker Master',
      activities: [
        'Achieve ultimate roster: Revenant Lv.35, Wailing Queen Lv.30, Cerberus Phantom Lv.28',
        'Permanently unlock all dimensional layers',
        'Become pillar of player community',
        'Access next-generation content preview'
      ],
      rewards: ['World Walker Master title', 'Ultimate progression completion', 'Next-gen preview access'],
      unlocks: ['Maximum achievement status', 'Community leadership tools', 'Future content access'],
      image: 'Ultimate achievement celebration with maximum level legendary ghost roster, World Walker Master interface with all dimensions accessible, community leadership dashboard with next-generation content preview'
    }
  ];

  const getCurrentPhaseData = () => {
    return journeyPhases.find(phase => phase.id === activePhase) || journeyPhases[0];
  };

  const getPhaseDays = () => {
    return dailyProgression.filter(day => day.phase === activePhase);
  };

  const getProgressionStats = (day: number) => {
    const baseStats = {
      level: Math.min(5 + day * 2, 50),
      ghosts: Math.min(1 + Math.floor(day / 2), 25),
      shards: day * 50 + Math.floor(day / 3) * 100,
      worlds: day < 8 ? 1 : day < 15 ? 1 : day < 22 ? 2 : 3
    };
    return baseStats;
  };

  return (
    <div className="min-h-screen bg-gray-950 relative overflow-hidden">
      {/* Atmospheric Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: `url(https://readdy.ai/api/search-image?query=Epic%20player%20journey%20timeline%20with%20glowing%20progression%20path%20through%20multiple%20fantasy%20worlds%2C%20mystical%20roadmap%20with%20milestones%20and%20achievements%2C%20dark%20cosmic%20background%20with%20constellation%20patterns%2C%20cinematic%20lighting%20effects%2C%20photorealistic%203D%20rendering&width=375&height=812&seq=journey-bg&orientation=portrait)`
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-black/40"></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full bg-black/40 backdrop-blur-md z-50 border-b border-purple-800/30">
        <div className="px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <i className="ri-arrow-left-line text-white text-xl mr-2"></i>
            <span className="text-white font-semibold">Player Journey</span>
          </Link>
          <div className="flex items-center space-x-2">
            <div className="text-xs text-purple-400 px-2 py-1 rounded-full bg-purple-900/30">
              30 Day Guide
            </div>
          </div>
        </div>
      </header>

      {/* Journey Overview */}
      <section className="pt-20 px-4 py-6 relative z-10">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Ghost World Journey</h1>
          <p className="text-gray-300 text-sm">From Rookie Hunter to World Walker Master</p>
        </div>

        {/* Phase Selection */}
        <div className="grid grid-cols-1 gap-2 mb-6">
          {journeyPhases.map((phase) => (
            <button
              key={phase.id}
              onClick={() => setActivePhase(phase.id)}
              className={`p-3 rounded-xl border-2 transition-all ${
                activePhase === phase.id
                  ? 'border-purple-400 bg-purple-900/30'
                  : 'border-gray-700 bg-gray-800/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{phase.icon}</span>
                  <div className="text-left">
                    <div className="text-white font-semibold text-sm">{phase.name}</div>
                    <div className="text-gray-400 text-xs">Days {phase.days}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-purple-400 text-xs">{phase.description}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Phase Details */}
      <section className="px-4 py-6 relative z-10">
        <div className={`bg-gradient-to-r ${getCurrentPhaseData().color} bg-opacity-20 rounded-2xl p-6 border border-purple-700/50 mb-6`}>
          <div className="text-center mb-4">
            <div className="text-4xl mb-2">{getCurrentPhaseData().icon}</div>
            <h2 className="text-2xl font-bold text-white mb-2">{getCurrentPhaseData().name}</h2>
            <p className="text-gray-300 text-sm">Days {getCurrentPhaseData().days} • {getCurrentPhaseData().description}</p>
          </div>
          
          <div 
            className="h-40 rounded-xl bg-cover bg-center mb-4"
            style={{
              backgroundImage: `url(https://readdy.ai/api/search-image?query=${
                activePhase === 'rookie' 
                  ? 'New player learning AR ghost hunting with tutorial interface, beginner-friendly ghost encounters with guide overlays, atmospheric cemetery setting with gentle moonlight, encouraging progression system'
                  : activePhase === 'collector'
                  ? 'Player building impressive ghost collection with multiple captured spirits, diverse location exploration with various ghost types, enhanced AR interface with collection progress, satisfaction of completion'
                  : activePhase === 'raider'
                  ? 'Epic guild raid battle with multiple players coordinating attacks against giant boss spirit, team-based gameplay with communication tools, massive supernatural encounter in city park setting'
                  : activePhase === 'competitor'
                  ? 'Intense PvP arena battles in shopping mall with AR holographic ghosts fighting, competitive gaming atmosphere with multiple players, trading interface showing rare ghost variants, tournament competition scene'
                  : 'Ultimate World Walker master with legendary ghost roster including Revenant Cerberus Phantom and Wailing Queen, multi-dimensional portal access, community leadership interface, maximum progression achievement display'
              }&width=300&height=160&seq=${activePhase}-phase&orientation=landscape)`
            }}
          >
            <div className="h-full bg-black/30 rounded-xl"></div>
          </div>
        </div>

        {/* Daily Progression */}
        <div className="space-y-4">
          {getPhaseDays().map((dayData) => {
            const stats = getProgressionStats(dayData.day);
            return (
              <div
                key={dayData.day}
                className={`bg-gray-800/70 border rounded-xl p-4 cursor-pointer transition-all ${
                  selectedDay === dayData.day ? 'border-purple-500 bg-purple-900/20' : 'border-gray-700'
                }`}
                onClick={() => setSelectedDay(selectedDay === dayData.day ? null : dayData.day)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">{dayData.day}</span>
                    </div>
                    <div>
                      <div className="text-white font-semibold">{dayData.title}</div>
                      <div className="text-gray-400 text-sm">Day {dayData.day} • {dayData.phase}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-purple-400 text-sm font-semibold">Level {stats.level}</div>
                    <div className="text-gray-400 text-xs">{stats.ghosts} Ghosts</div>
                  </div>
                </div>

                {selectedDay === dayData.day && (
                  <div className="space-y-4 mt-4 pt-4 border-t border-gray-700">
                    {/* Day Image */}
                    <div 
                      className="h-32 rounded-xl bg-cover bg-center"
                      style={{
                        backgroundImage: `url(https://readdy.ai/api/search-image?query=$%7BdayData.image%7D&width=300&height=120&seq=day-${dayData.day}&orientation=landscape)`
                      }}
                    >
                      <div className="h-full bg-black/30 rounded-xl"></div>
                    </div>

                    {/* Activities */}
                    <div>
                      <h4 className="text-white font-semibold mb-2">Daily Activities</h4>
                      <div className="space-y-1">
                        {dayData.activities.map((activity, index) => (
                          <div key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <div className="text-gray-300 text-sm">{activity}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Rewards */}
                    <div>
                      <h4 className="text-white font-semibold mb-2">Rewards Earned</h4>
                      <div className="flex flex-wrap gap-2">
                        {dayData.rewards.map((reward, index) => (
                          <span
                            key={index}
                            className="bg-green-600/30 text-green-300 text-xs px-3 py-1 rounded-full border border-green-600/50"
                          >
                            {reward}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Unlocks */}
                    <div>
                      <h4 className="text-white font-semibold mb-2">New Features Unlocked</h4>
                      <div className="flex flex-wrap gap-2">
                        {dayData.unlocks.map((unlock, index) => (
                          <span
                            key={index}
                            className="bg-blue-600/30 text-blue-300 text-xs px-3 py-1 rounded-full border border-blue-600/50"
                          >
                            {unlock}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Player Stats */}
                    <div className="bg-gray-700/50 rounded-lg p-3">
                      <h4 className="text-white font-semibold mb-2">Player Progress</h4>
                      <div className="grid grid-cols-4 gap-3 text-center">
                        <div>
                          <div className="text-purple-400 font-bold">{stats.level}</div>
                          <div className="text-gray-400 text-xs">Level</div>
                        </div>
                        <div>
                          <div className="text-cyan-400 font-bold">{stats.ghosts}</div>
                          <div className="text-gray-400 text-xs">Ghosts</div>
                        </div>
                        <div>
                          <div className="text-yellow-400 font-bold">{stats.shards}</div>
                          <div className="text-gray-400 text-xs">Shards</div>
                        </div>
                        <div>
                          <div className="text-orange-400 font-bold">{stats.worlds}</div>
                          <div className="text-gray-400 text-xs">Worlds</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Engagement Loops */}
      <section className="px-4 py-8 relative z-10">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">⚡ Engagement Loops</h2>
        <div className="space-y-4">
          <div className="bg-blue-900/30 border border-blue-700 rounded-xl p-4">
            <div className="flex items-center mb-2">
              <span className="text-xl mr-2">📅</span>
              <span className="text-white font-semibold">Daily Loop</span>
            </div>
            <p className="text-gray-300 text-sm mb-2">Log in → Catch 2-3 ghosts → Level up main roster</p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-blue-600/30 text-blue-300 text-xs px-2 py-1 rounded-full">Quick Sessions</span>
              <span className="bg-blue-600/30 text-blue-300 text-xs px-2 py-1 rounded-full">Progress Rewards</span>
              <span className="bg-blue-600/30 text-blue-300 text-xs px-2 py-1 rounded-full">Habit Formation</span>
            </div>
          </div>

          <div className="bg-purple-900/30 border border-purple-700 rounded-xl p-4">
            <div className="flex items-center mb-2">
              <span className="text-xl mr-2">🗓️</span>
              <span className="text-white font-semibold">Weekly Loop</span>
            </div>
            <p className="text-gray-300 text-sm mb-2">Raid boss battles + Guild quests + Tournament participation</p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-purple-600/30 text-purple-300 text-xs px-2 py-1 rounded-full">Social Events</span>
              <span className="bg-purple-600/30 text-purple-300 text-xs px-2 py-1 rounded-full">Team Coordination</span>
              <span className="bg-purple-600/30 text-purple-300 text-xs px-2 py-1 rounded-full">Rare Rewards</span>
            </div>
          </div>

          <div className="bg-orange-900/30 border border-orange-700 rounded-xl p-4">
            <div className="flex items-center mb-2">
              <span className="text-xl mr-2">🗓️</span>
              <span className="text-white font-semibold">Monthly Loop</span>
            </div>
            <p className="text-gray-300 text-sm mb-2">Global events unlock rare evolutions + Cross-world portals + Season rewards</p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-orange-600/30 text-orange-300 text-xs px-2 py-1 rounded-full">Epic Events</span>
              <span className="bg-orange-600/30 text-orange-300 text-xs px-2 py-1 rounded-full">Legendary Unlocks</span>
              <span className="bg-orange-600/30 text-orange-300 text-xs px-2 py-1 rounded-full">Meta Shifts</span>
            </div>
          </div>
        </div>
      </section>

      {/* Monetization Opportunities */}
      <section className="px-4 py-8 relative z-10">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">Revenue Opportunities</h2>
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-gradient-to-r from-yellow-900/50 to-orange-900/50 rounded-xl p-4 border border-yellow-800/50">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <span className="text-xl mr-2">⚡</span>
                <span className="text-white font-semibold">Premium Battle Pass</span>
              </div>
              <span className="text-yellow-400 text-sm">$9.99/month</span>
            </div>
            <p className="text-gray-300 text-sm mb-2">Double XP, exclusive ghosts, premium relics</p>
            <div className="text-xs text-gray-400">Peak purchase: Days 7-10 (raid unlock phase)</div>
          </div>

          <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-xl p-4 border border-purple-800/50">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <span className="text-xl mr-2">🗝️</span>
                <span className="text-white font-semibold">World Keys</span>
              </div>
              <span className="text-purple-400 text-sm">$4.99 each</span>
            </div>
            <p className="text-gray-300 text-sm mb-2">Early access to Monster World, Myth World</p>
            <div className="text-xs text-gray-400">Peak purchase: Days 14-15 (world unlock phase)</div>
          </div>

          <div className="bg-gradient-to-r from-red-900/50 to-orange-900/50 rounded-xl p-4 border border-red-800/50">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <span className="text-xl mr-2">💎</span>
                <span className="text-white font-semibold">Ghost Shards Pack</span>
              </div>
              <span className="text-red-400 text-sm">$2.99-$19.99</span>
            </div>
            <p className="text-gray-300 text-sm mb-2">Instant evolution materials and rare captures</p>
            <div className="text-xs text-gray-400">Consistent purchases throughout journey</div>
          </div>

          <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 rounded-xl p-4 border border-green-800/50">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <span className="text-xl mr-2">🎫</span>
                <span className="text-white font-semibold">Trade Tokens</span>
              </div>
              <span className="text-green-400 text-sm">$1.99-$7.99</span>
            </div>
            <p className="text-gray-300 text-sm mb-2">Extra daily trades for rare ghost variants</p>
            <div className="text-xs text-gray-400">Peak purchase: Days 15-21 (competitor phase)</div>
          </div>
        </div>
      </section>

      {/* Community Engagement */}
      <section className="px-4 py-8 relative z-10">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">Social Hooks</h2>
        <div className="space-y-3">
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center mb-2">
              <span className="text-lg mr-2">📸</span>
              <span className="text-white font-semibold">Ghost Photo Sharing</span>
            </div>
            <p className="text-gray-300 text-sm">Players share AR captures → viral marketing effect</p>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center mb-2">
              <span className="text-lg mr-2">🏆</span>
              <span className="text-white font-semibold">Tournament Broadcasting</span>
            </div>
            <p className="text-gray-300 text-sm">Stream guild battles → attract competitive players</p>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center mb-2">
              <span className="text-lg mr-2">🔄</span>
              <span className="text-white font-semibold">Ghost Variant Trading</span>
            </div>
            <p className="text-gray-300 text-sm">Rare variant exchanges create trading economy</p>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center mb-2">
              <span className="text-lg mr-2">🎁</span>
              <span className="text-white font-semibold">Referral Rewards</span>
            </div>
            <p className="text-gray-300 text-sm">Invite friends → get exclusive ghost breeds</p>
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="px-4 py-8 relative z-10 mb-20">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">Projected Metrics</h2>
        <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-green-400 text-2xl font-bold">78%</div>
              <div className="text-gray-400 text-sm">Day 7 Retention</div>
            </div>
            <div>
              <div className="text-blue-400 text-2xl font-bold">45%</div>
              <div className="text-gray-400 text-sm">Day 30 Retention</div>
            </div>
            <div>
              <div className="text-purple-400 text-2xl font-bold">$12.50</div>
              <div className="text-gray-400 text-sm">Average LTV</div>
            </div>
            <div>
              <div className="text-yellow-400 text-2xl font-bold">2.3x</div>
              <div className="text-gray-400 text-sm">Viral Coefficient</div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-black/80 backdrop-blur-md border-t border-gray-800 z-50">
        <div className="grid grid-cols-5 px-0 py-2">
          <Link href="/" className="flex flex-col items-center py-2 text-gray-500">
            <i className="ri-home-4-line text-lg mb-1"></i>
            <span className="text-xs">Home</span>  
          </Link>
          <Link href="/ghost-world" className="flex flex-col items-center py-2 text-gray-500">
            <i className="ri-ghost-line text-lg mb-1"></i>
            <span className="text-xs">Ghost World</span>
          </Link>
          <button className="flex flex-col items-center py-2 text-purple-400">
            <i className="ri-roadmap-line text-lg mb-1"></i>
            <span className="text-xs">Journey</span>
          </button>
          <button className="flex flex-col items-center py-2 text-gray-500">
            <i className="ri-team-line text-lg mb-1"></i>
            <span className="text-xs">Guild</span>
          </button>
          <button className="flex flex-col items-center py-2 text-gray-500">
            <i className="ri-user-line text-lg mb-1"></i>
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
}