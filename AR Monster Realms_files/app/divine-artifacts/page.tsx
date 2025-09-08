'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Artifact {
  id: string;
  name: string;
  category: 'Divine' | 'Celestial' | 'Ancient' | 'Mystical' | 'Guardian' | 'Utility';
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Divine' | 'Mythic';
  price: number;
  currency: 'gold' | 'crystals' | 'souls';
  description: string;
  powers: string[];
  usage: string;
  cooldown?: string;
  limitations?: string[];
  synergies?: string[];
  image: string;
  monthAdded: string;
  isNewThisMonth: boolean;
  purchaseCount: number;
  owned: boolean;
}

interface ARWorld {
  id: string;
  name: string;
  theme: string;
  environment: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Master' | 'Legendary';
  requiredArtifacts: string[];
  uniqueFeatures: string[];
  nativeMonsters: string[];
  exclusiveRewards: string[];
  monthAdded: string;
  isNewThisMonth: boolean;
  image: string;
}

export default function DivineArtifacts() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'Divine' | 'Celestial' | 'Ancient' | 'Mystical' | 'Guardian' | 'Utility'>('all');
  const [selectedRarity, setSelectedRarity] = useState<'all' | 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Divine' | 'Mythic'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'rarity' | 'recent'>('recent');
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null);
  const [showARWorlds, setShowARWorlds] = useState(false);
  const [selectedARWorld, setSelectedARWorld] = useState<ARWorld | null>(null);
  const [currentMonth, setCurrentMonth] = useState('December 2024');
  const [playerGold, setPlayerGold] = useState(25000);
  const [playerCrystals, setPlayerCrystals] = useState(1500);
  const [playerSouls, setPlayerSouls] = useState(300);

  // Divine & Sacred Artifacts Database
  const artifactDatabase: Artifact[] = [
    // Divine Artifacts
    {
      id: 'divine-001',
      name: 'True Cross',
      category: 'Divine',
      rarity: 'Divine',
      price: 50000,
      currency: 'souls',
      description: 'A fragment of the actual cross, radiating pure divine energy that can banish the darkest evil.',
      powers: [
        'Instant banishment of any Dark/Shadow monster',
        'Heals all party members to full HP',
        'Creates protective holy barrier for 10 minutes',
        'Reveals hidden demonic entities within 1 mile radius'
      ],
      usage: 'Hold aloft and speak a prayer. Divine light erupts in all directions.',
      cooldown: '24 hours',
      limitations: ['Cannot be used in cursed ground', 'Requires pure heart to activate'],
      synergies: ['Crown of Thorns', 'Holy Grail'],
      image: 'Ancient wooden cross fragment glowing with pure divine light, sacred relic emanating holy energy, religious artifact with celestial aura and golden radiance',
      monthAdded: 'December 2024',
      isNewThisMonth: true,
      purchaseCount: 42,
      owned: false
    },
    {
      id: 'divine-002',
      name: 'Crown of Thorns',
      category: 'Divine',
      rarity: 'Divine',
      price: 45000,
      currency: 'souls',
      description: 'Sacred crown that grants the wearer divine protection through righteous suffering.',
      powers: [
        'Immunity to curse and charm effects',
        'Reflects 50% of received damage back to attacker',
        'Grants prophetic visions of enemy attacks',
        'Doubles experience gained from defeating evil creatures'
      ],
      usage: 'Wear during battle. Thorns glow when danger approaches.',
      cooldown: 'Passive effect',
      limitations: ['Causes continuous minor pain while worn', 'Cannot remove during combat'],
      synergies: ['True Cross', 'Shroud of Silent Prayer'],
      image: 'Thorned crown radiating divine light with golden glow, sacred headpiece with mystical thorns and holy energy, religious relic with celestial radiance',
      monthAdded: 'December 2024',
      isNewThisMonth: true,
      purchaseCount: 38,
      owned: false
    },
    {
      id: 'divine-003',
      name: 'Holy Grail',
      category: 'Divine',
      rarity: 'Mythic',
      price: 100000,
      currency: 'souls',
      description: 'The legendary chalice that grants eternal life and infinite divine power to the worthy.',
      powers: [
        'Full resurrection of fallen party members',
        'Grants temporary immortality for 1 hour',
        'Infinite mana/energy regeneration while held',
        'Can purify any corrupted land or creature',
        'Reveals the location of all divine artifacts'
      ],
      usage: 'Drink from the grail or pour its contents on target.',
      cooldown: '7 days',
      limitations: ['Only works for those pure of heart', 'Can backfire if used selfishly'],
      synergies: ['True Cross', 'Crown of Thorns', 'Tears of a Fallen Star'],
      image: 'Ornate golden chalice radiating divine light with ethereal mist, legendary holy grail with celestial energy, sacred cup with transcendent aura and heavenly glow',
      monthAdded: 'December 2024',
      isNewThisMonth: true,
      purchaseCount: 12,
      owned: false
    },
    // Celestial Artifacts
    {
      id: 'celestial-001',
      name: 'Tears of a Fallen Star',
      category: 'Celestial',
      rarity: 'Legendary',
      price: 30000,
      currency: 'crystals',
      description: 'Crystallized tears from a dying star, containing the raw essence of creation itself.',
      powers: [
        'Creates new monsters by fusing two existing ones',
        'Enhances any spell or ability by 300%',
        'Can reverse time by 10 minutes once per day',
        'Grants temporary cosmic awareness'
      ],
      usage: 'Crush crystal to release stellar energy. Effects vary by intention.',
      cooldown: '12 hours',
      limitations: ['Extremely fragile', 'Can cause reality distortions if overused'],
      synergies: ['Fragment of the First Dawn', 'Celestial\'s Eye'],
      image: 'Brilliant crystallized star tears with cosmic energy swirling inside, stellar fragments glowing with creation essence, celestial crystals with nebula patterns and starlight',
      monthAdded: 'December 2024',
      isNewThisMonth: true,
      purchaseCount: 67,
      owned: false
    },
    {
      id: 'celestial-002',
      name: 'Fragment of the First Dawn',
      category: 'Celestial',
      rarity: 'Legendary',
      price: 35000,
      currency: 'crystals',
      description: 'A piece of the very first sunrise, holding the power of beginnings and infinite potential.',
      powers: [
        'Instantly evolves any monster to its highest form',
        'Resets all cooldowns and charges',
        'Grants +1000% experience for next battle',
        'Can create entirely new evolution paths'
      ],
      usage: 'Expose to sunlight to activate. Dawn energy flows through everything nearby.',
      cooldown: '48 hours',
      limitations: ['Only works during dawn hours (5-7 AM)', 'Power diminishes in darkness'],
      synergies: ['Tears of a Fallen Star', 'Stone of the Sun'],
      image: 'Radiant dawn fragment with sunrise colors and golden light, piece of first morning with aurora energy, celestial shard emanating beginning essence and hope',
      monthAdded: 'December 2024',
      isNewThisMonth: true,
      purchaseCount: 23,
      owned: false
    },
    {
      id: 'celestial-003',
      name: 'Holy Crystal Orb',
      category: 'Celestial',
      rarity: 'Epic',
      price: 15000,
      currency: 'crystals',
      description: 'A perfect sphere of crystallized holy energy that amplifies divine magic.',
      powers: [
        'Doubles the power of all healing spells',
        'Creates protective barriers of solid light',
        'Can store and release divine energy',
        'Reveals hidden sacred sites and artifacts'
      ],
      usage: 'Hold aloft and channel divine energy through the crystal.',
      cooldown: '6 hours',
      limitations: ['Cracks if exposed to demonic energy', 'Requires sunlight to recharge'],
      synergies: ['True Cross', 'Celestial\'s Eye'],
      image: 'Perfect crystal orb filled with swirling holy light, divine sphere with internal celestial energy, transparent crystal ball radiating sacred power and purity',
      monthAdded: 'December 2024',
      isNewThisMonth: true,
      purchaseCount: 89,
      owned: true
    },
    {
      id: 'celestial-004',
      name: 'Celestial\'s Eye',
      category: 'Celestial',
      rarity: 'Legendary',
      price: 40000,
      currency: 'crystals',
      description: 'The preserved eye of an ancient celestial being, granting sight beyond mortal comprehension.',
      powers: [
        'See through any illusion or disguise',
        'Predict enemy actions 3 turns in advance',
        'Locate any creature or object anywhere in existence',
        'Can see across dimensions and timelines'
      ],
      usage: 'Place against your forehead. Visions of truth flood your mind.',
      cooldown: '24 hours',
      limitations: ['Causes severe headaches', 'Can drive mortals insane if overused'],
      synergies: ['Holy Crystal Orb', 'Orb of Scrying'],
      image: 'Mystical celestial eye with cosmic iris and stellar patterns, divine organ with swirling galaxies inside, ethereal eye artifact glowing with omniscient power',
      monthAdded: 'December 2024',
      isNewThisMonth: true,
      purchaseCount: 31,
      owned: false
    },
    // Ancient Artifacts
    {
      id: 'ancient-001',
      name: 'The Compass',
      category: 'Ancient',
      rarity: 'Mythic',
      price: 75000,
      currency: 'gold',
      description: 'The legendary compass that reveals the exact whereabouts of any monster, no matter how well hidden.',
      powers: [
        'Instantly locates any specific monster anywhere in the world',
        'Shows optimal capture routes and strategies',
        'Reveals monster weaknesses and behavioral patterns',
        'Can track legendary and mythic creatures',
        'Displays monster rarity and evolution potential'
      ],
      usage: 'Speak the monster\'s name and the needle points true.',
      cooldown: '1 hour per search',
      limitations: ['Cannot locate monsters in other dimensions', 'Accuracy decreases for divine beings'],
      synergies: ['Clockwork Familiar', 'Compass of Destiny'],
      image: 'Ornate golden compass with mystical engravings and glowing needle, ancient navigation device with monster-tracking abilities, magical compass with runic symbols and ethereal light',
      monthAdded: 'December 2024',
      isNewThisMonth: true,
      purchaseCount: 156,
      owned: true
    },
    {
      id: 'ancient-002',
      name: 'Locked Heart',
      category: 'Ancient',
      rarity: 'Epic',
      price: 20000,
      currency: 'souls',
      description: 'A crystalline heart sealed with ancient magic, containing the concentrated love of a lost civilization.',
      powers: [
        'Instantly tames any hostile monster',
        'Grants immunity to fear and despair effects',
        'Can resurrect recently deceased creatures',
        'Forms unbreakable bonds with captured monsters'
      ],
      usage: 'Place hand on heart and think of the target with pure love.',
      cooldown: '8 hours',
      limitations: ['Cannot work on truly evil beings', 'Gradually drains user\'s own emotions'],
      synergies: ['Locket of Lost Memories', 'Heartstone'],
      image: 'Crystal heart sealed with golden chains and glowing with warm light, ancient artifact of pure love energy, mystical heart with healing aura and emotional power',
      monthAdded: 'December 2024',
      isNewThisMonth: true,
      purchaseCount: 73,
      owned: false
    },
    {
      id: 'ancient-003',
      name: 'Stone of Immutable Truth',
      category: 'Ancient',
      rarity: 'Legendary',
      price: 45000,
      currency: 'gold',
      description: 'An obsidian stone that forces absolute truth and cannot be corrupted by any lie.',
      powers: [
        'Forces any creature to speak only truth',
        'Reveals the true nature of shapeshifters and illusions',
        'Cannot be affected by mind control or deception',
        'Grants perfect judgment in moral decisions'
      ],
      usage: 'Hold stone while questioning target. Truth becomes inevitable.',
      cooldown: '12 hours',
      limitations: ['Can reveal truths you don\'t want to know', 'Makes lies impossible for user too'],
      synergies: ['Spectacles of Truth', 'Crystal of Whispers'],
      image: 'Obsidian stone with glowing truth runes and ethereal light, ancient artifact of absolute honesty, mystical black stone with revealing power and divine justice',
      monthAdded: 'December 2024',
      isNewThisMonth: true,
      purchaseCount: 29,
      owned: false
    },
    // Mystical Artifacts
    {
      id: 'mystical-001',
      name: 'Seed of a World Tree',
      category: 'Mystical',
      rarity: 'Mythic',
      price: 80000,
      currency: 'crystals',
      description: 'The seed of Yggdrasil itself, capable of growing entire worlds and connecting all realms.',
      powers: [
        'Creates permanent AR worlds that other players can visit',
        'Generates infinite resources over time',
        'Connects all monster habitats across dimensions',
        'Can grow portals to any location'
      ],
      usage: 'Plant in any location and speak words of creation.',
      cooldown: '30 days',
      limitations: ['Takes 7 days to fully grow', 'Requires constant care and protection'],
      synergies: ['Staff of the Blooming Forest', 'Gaia\'s Last Breath'],
      image: 'Massive glowing seed with world tree patterns and cosmic energy, mythical seed containing entire universe potential, mystical world seed with life essence and creation power',
      monthAdded: 'December 2024',
      isNewThisMonth: true,
      purchaseCount: 8,
      owned: false
    },
    {
      id: 'mystical-002',
      name: 'Orb of the Tides',
      category: 'Mystical',
      rarity: 'Epic',
      price: 25000,
      currency: 'crystals',
      description: 'A swirling orb containing the essence of all oceans, controlling water and weather.',
      powers: [
        'Controls weather patterns within 10 mile radius',
        'Summons tsunamis, storms, or perfect calm',
        'All water-type monsters gain +200% power',
        'Can part seas and create underwater breathing'
      ],
      usage: 'Swirl the orb to command the tides and weather.',
      cooldown: '4 hours',
      limitations: ['Causes drought if overused', 'Attracts sea monsters'],
      synergies: ['Vial of Living Water', 'Droplet of the First Rain'],
      image: 'Swirling orb filled with ocean tides and water essence, mystical sphere containing all seas, aquatic artifact with wave patterns and storm energy',
      monthAdded: 'December 2024',
      isNewThisMonth: true,
      purchaseCount: 94,
      owned: false
    },
    // Guardian Artifacts
    {
      id: 'guardian-001',
      name: 'Shield of Reflection',
      category: 'Guardian',
      rarity: 'Legendary',
      price: 35000,
      currency: 'gold',
      description: 'A mirror-bright shield that reflects not just attacks but the true nature of enemies.',
      powers: [
        'Reflects 100% of magical attacks back to caster',
        'Shows true form of shapeshifters and illusions',
        'Creates mirror duplicates of yourself for 5 minutes',
        'Grants immunity to gaze attacks and mental effects'
      ],
      usage: 'Raise shield to block. Reflection activates automatically.',
      cooldown: 'Passive defense',
      limitations: ['Heavy and cumbersome', 'Can be shattered by divine weapons'],
      synergies: ['Breastplate of the Guardian', 'Spectacles of Truth'],
      image: 'Mirror-bright shield with perfect reflection and magical gleam, guardian artifact with defensive power, protective shield reflecting light and energy',
      monthAdded: 'December 2024',
      isNewThisMonth: true,
      purchaseCount: 67,
      owned: false
    },
    {
      id: 'guardian-002',
      name: 'Breastplate of the Guardian',
      category: 'Guardian',
      rarity: 'Epic',
      price: 18000,
      currency: 'gold',
      description: 'Blessed armor that protects not just the body but the soul of the wearer.',
      powers: [
        'Reduces all damage by 75%',
        'Immunity to instant death effects',
        'Automatically heals wearer over time',
        'Grants courage to all nearby allies'
      ],
      usage: 'Wear into battle. Protection is constant and reliable.',
      cooldown: 'Passive protection',
      limitations: ['Cannot be removed during combat', 'Weakens if wearer acts dishonorably'],
      synergies: ['Shield of Reflection', 'Helmet of the Strategist'],
      image: 'Gleaming blessed breastplate with holy engravings and protective aura, guardian armor with divine protection, sacred chest armor radiating defensive energy',
      monthAdded: 'December 2024',
      isNewThisMonth: true,
      purchaseCount: 112,
      owned: true
    },
    // Utility Artifacts
    {
      id: 'utility-001',
      name: 'Bag of Holding',
      category: 'Utility',
      rarity: 'Rare',
      price: 5000,
      currency: 'gold',
      description: 'A magical bag that can hold unlimited items without any weight or size restrictions.',
      powers: [
        'Infinite storage capacity',
        'Items never decay or break inside',
        'Instant retrieval of any stored item',
        'Can store living creatures safely'
      ],
      usage: 'Simply place items inside. Speak item name to retrieve.',
      cooldown: 'No limitations',
      limitations: ['Cannot store other Bags of Holding', 'Tears if punctured by magical weapons'],
      synergies: ['Everfull Pouch', 'Everlasting Quill'],
      image: 'Magical leather bag with dimensional opening and swirling void inside, utility bag with infinite storage, mystical pouch with space-warping properties',
      monthAdded: 'December 2024',
      isNewThisMonth: true,
      purchaseCount: 234,
      owned: true
    },
    {
      id: 'utility-002',
      name: 'Compass of Destiny',
      category: 'Utility',
      rarity: 'Epic',
      price: 15000,
      currency: 'crystals',
      description: 'A compass that points not north, but toward your greatest destiny and purpose.',
      powers: [
        'Always points toward your next important quest',
        'Reveals hidden paths and secret areas',
        'Shows probability of success for planned actions',
        'Can locate your true love or greatest enemy'
      ],
      usage: 'Ask a question about your destiny and follow the needle.',
      cooldown: '3 hours',
      limitations: ['Sometimes points toward dangerous but necessary paths', 'Cannot be used for trivial matters'],
      synergies: ['The Compass', 'Chronometer of Ages'],
      image: 'Mystical compass with destiny needle and fate engravings, magical navigation device pointing to purpose, ornate compass with prophetic abilities and golden glow',
      monthAdded: 'December 2024',
      isNewThisMonth: true,
      purchaseCount: 78,
      owned: false
    },
    {
      id: 'utility-003',
      name: 'Potion of Invisibility',
      category: 'Utility',
      rarity: 'Common',
      price: 500,
      currency: 'gold',
      description: 'A swirling potion that renders the drinker completely invisible for a limited time.',
      powers: [
        'Complete invisibility for 30 minutes',
        'Muffles sound of movement',
        'Can stack with stealth abilities',
        'Works on equipment and held items'
      ],
      usage: 'Drink entire potion. Effect begins immediately.',
      cooldown: '2 hours',
      limitations: ['Visibility returns if you attack', 'Doesn\'t hide scent or magical aura'],
      synergies: ['Chameleon Cloak', 'Sandals of Silent Steps'],
      image: 'Swirling invisible potion in crystal vial with fading effect, magical invisibility elixir with ethereal mist, transparent liquid with stealth properties',
      monthAdded: 'December 2024',
      isNewThisMonth: true,
      purchaseCount: 445,
      owned: true
    }
  ];

  // Monthly AR Worlds
  const arWorldDatabase: ARWorld[] = [
    {
      id: 'world-001',
      name: 'The Celestial Observatory',
      theme: 'Cosmic Starfield',
      environment: 'Floating observatory platforms among the stars with telescope arrays',
      difficulty: 'Advanced',
      requiredArtifacts: ['Celestial\'s Eye', 'Tears of a Fallen Star'],
      uniqueFeatures: [
        'Zero gravity movement mechanics',
        'Stellar constellation puzzles',
        'Time dilation effects in certain areas',
        'Cosmic weather patterns affect battles'
      ],
      nativeMonsters: ['Star Wraiths', 'Cosmic Dragons', 'Nebula Wisps', 'Constellation Guardians'],
      exclusiveRewards: ['Stardust Essence', 'Meteor Fragments', 'Cosmic Lens'],
      monthAdded: 'December 2024',
      isNewThisMonth: true,
      image: 'Massive celestial observatory floating in space with telescope arrays and cosmic energy, starfield environment with floating platforms, astronomical research station among nebulae'
    },
    {
      id: 'world-002', 
      name: 'The Clockwork Dimension',
      theme: 'Steampunk Machinery',
      environment: 'Infinite mechanical realm with gears, pipes, and steam-powered automatons',
      difficulty: 'Master',
      requiredArtifacts: ['Clockwork Familiar', 'Chronometer of Ages'],
      uniqueFeatures: [
        'Time moves at different speeds in each zone',
        'Mechanical puzzles unlock new areas',
        'Steam pressure affects monster behavior',
        'Clockwork mechanisms can be reprogrammed'
      ],
      nativeMonsters: ['Gear Golems', 'Steam Elementals', 'Clockwork Spiders', 'Automaton Knights'],
      exclusiveRewards: ['Precision Gears', 'Steam Crystals', 'Clockwork Hearts'],
      monthAdded: 'December 2024',
      isNewThisMonth: true,
      image: 'Vast clockwork dimension with massive gears and steampunk machinery, mechanical realm with steam pipes and brass constructs, industrial fantasy world with clockwork mechanisms'
    },
    {
      id: 'world-003',
      name: 'The Garden of First Things',
      theme: 'Primordial Paradise',
      environment: 'Lush garden where the first of every species was created',
      difficulty: 'Legendary',
      requiredArtifacts: ['Seed of a World Tree', 'Fragment of the First Dawn'],
      uniqueFeatures: [
        'All monsters appear in their pure, original forms',
        'Evolution works backwards to show origins',
        'Time flows in reverse in certain groves',
        'Can witness the creation of new species'
      ],
      nativeMonsters: ['Proto-Dragons', 'First Phoenixes', 'Original Unicorns', 'Genesis Spirits'],
      exclusiveRewards: ['Seeds of Beginning', 'Essence of Origins', 'Primordial DNA'],
      monthAdded: 'December 2024',
      isNewThisMonth: true,
      image: 'Primordial garden paradise with first creatures and lush vegetation, mystical realm where all species originated, ethereal garden with creation energy and pure life essence'
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'text-gray-400 border-gray-600 bg-gray-600/20';
      case 'Rare': return 'text-blue-400 border-blue-600 bg-blue-600/20';
      case 'Epic': return 'text-purple-400 border-purple-600 bg-purple-600/20';
      case 'Legendary': return 'text-orange-400 border-orange-600 bg-orange-600/20';
      case 'Divine': return 'text-yellow-400 border-yellow-600 bg-yellow-600/20';
      case 'Mythic': return 'text-pink-400 border-pink-600 bg-pink-600/20';
      default: return 'text-white border-gray-600 bg-gray-600/20';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Divine': return 'from-yellow-500 to-yellow-700';
      case 'Celestial': return 'from-blue-500 to-cyan-600';
      case 'Ancient': return 'from-orange-500 to-red-600';
      case 'Mystical': return 'from-purple-500 to-indigo-600';
      case 'Guardian': return 'from-green-500 to-emerald-600';
      case 'Utility': return 'from-gray-500 to-slate-600';
      default: return 'from-gray-500 to-gray-700';
    }
  };

  const getCurrencyIcon = (currency: string) => {
    switch (currency) {
      case 'gold': return '🪙';
      case 'crystals': return '💎';
      case 'souls': return '👻';
      default: return '💰';
    }
  };

  const filteredArtifacts = artifactDatabase.filter(artifact => {
    const matchesCategory = selectedCategory === 'all' || artifact.category === selectedCategory;
    const matchesRarity = selectedRarity === 'all' || artifact.rarity === selectedRarity;
    return matchesCategory && matchesRarity;
  });

  const sortedArtifacts = [...filteredArtifacts].sort((a, b) => {
    switch (sortBy) {
      case 'name': return a.name.localeCompare(b.name);
      case 'price': return b.price - a.price;
      case 'rarity':
        const rarityOrder = { 'Common': 1, 'Rare': 2, 'Epic': 3, 'Legendary': 4, 'Divine': 5, 'Mythic': 6 };
        return rarityOrder[b.rarity as keyof typeof rarityOrder] - rarityOrder[a.rarity as keyof typeof rarityOrder];
      case 'recent': return a.isNewThisMonth ? -1 : 1;
      default: return 0;
    }
  });

  const purchaseArtifact = (artifact: Artifact) => {
    const playerCurrency = artifact.currency === 'gold' ? playerGold : 
                          artifact.currency === 'crystals' ? playerCrystals : playerSouls;
    
    if (playerCurrency >= artifact.price) {
      if (artifact.currency === 'gold') setPlayerGold(prev => prev - artifact.price);
      else if (artifact.currency === 'crystals') setPlayerCrystals(prev => prev - artifact.price);
      else setPlayerSouls(prev => prev - artifact.price);
      
      // Mark as owned
      artifact.owned = true;
      artifact.purchaseCount += 1;
      setSelectedArtifact(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 pt-20 pb-24 relative overflow-hidden">
      {/* Atmospheric Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-900/20 via-transparent to-black/40"></div>
      </div>

      {/* Artifact Detail Modal */}
      {selectedArtifact && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-gray-900 border-2 border-yellow-600 rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-4">
              <div className="flex justify-between items-center mb-3">
                <div className={`text-xs px-3 py-1 rounded-full border ${getRarityColor(selectedArtifact.rarity)}`}>
                  {selectedArtifact.rarity}
                </div>
                {selectedArtifact.isNewThisMonth && (
                  <div className="bg-yellow-600 text-black px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                    🆕 NEW!
                  </div>
                )}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2">{selectedArtifact.name}</h3>
              <div className={`text-sm px-3 py-1 rounded-full bg-gradient-to-r ${getCategoryColor(selectedArtifact.category)} text-white mb-4`}>
                {selectedArtifact.category} Artifact
              </div>
            </div>

            {/* Artifact Image */}
            <div 
              className="h-48 rounded-xl bg-cover bg-center mb-4 border-2 border-yellow-400/50"
              style={{
                backgroundImage: `url(https://readdy.ai/api/search-image?query=$%7BencodeURIComponent%28selectedArtifact.image%29%7D&width=300&height=180&seq=${selectedArtifact.id}-detail&orientation=landscape)`
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-xl flex items-end p-4">
                <div className="text-center w-full">
                  <div className="text-yellow-400 text-lg font-bold">
                    {getCurrencyIcon(selectedArtifact.currency)} {selectedArtifact.price.toLocaleString()}
                  </div>
                  <div className="text-gray-300 text-sm">{selectedArtifact.currency.toUpperCase()}</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-4">
              <div className="text-white font-semibold mb-2">Description</div>
              <div className="text-gray-300 text-sm bg-gray-800/30 rounded-lg p-3">
                {selectedArtifact.description}
              </div>
            </div>

            {/* Powers */}
            <div className="mb-4">
              <div className="text-white font-semibold mb-2">Divine Powers</div>
              <div className="space-y-2">
                {selectedArtifact.powers.map((power, index) => (
                  <div key={index} className="bg-yellow-600/30 text-yellow-300 text-sm px-3 py-2 rounded-lg border border-yellow-600/50">
                    • {power}
                  </div>
                ))}
              </div>
            </div>

            {/* Usage */}
            <div className="mb-4">
              <div className="text-white font-semibold mb-2">How to Use</div>
              <div className="text-gray-300 text-sm bg-blue-900/30 border border-blue-700 rounded-lg p-3">
                {selectedArtifact.usage}
              </div>
            </div>

            {/* Cooldown & Limitations */}
            {selectedArtifact.cooldown && (
              <div className="mb-4">
                <div className="text-white font-semibold mb-2">Cooldown</div>
                <div className="text-orange-400 text-sm bg-orange-900/30 border border-orange-700 rounded-lg p-2">
                  ⏱️ {selectedArtifact.cooldown}
                </div>
              </div>
            )}

            {selectedArtifact.limitations && selectedArtifact.limitations.length > 0 && (
              <div className="mb-4">
                <div className="text-white font-semibold mb-2">Limitations</div>
                <div className="space-y-1">
                  {selectedArtifact.limitations.map((limitation, index) => (
                    <div key={index} className="text-red-400 text-sm bg-red-900/30 border border-red-700 rounded-lg p-2">
                      ⚠️ {limitation}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Synergies */}
            {selectedArtifact.synergies && selectedArtifact.synergies.length > 0 && (
              <div className="mb-4">
                <div className="text-white font-semibold mb-2">Synergizes With</div>
                <div className="flex flex-wrap gap-2">
                  {selectedArtifact.synergies.map((synergy, index) => (
                    <div key={index} className="bg-green-600/30 text-green-300 text-xs px-2 py-1 rounded-full border border-green-600/50">
                      {synergy}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Purchase Info */}
            <div className="bg-purple-900/30 border border-purple-700 rounded-lg p-3 mb-4">
              <div className="text-purple-400 font-semibold text-sm mb-2">Market Info</div>
              <div className="text-gray-300 text-xs space-y-1">
                <div>Added: {selectedArtifact.monthAdded}</div>
                <div>Total Purchases: {selectedArtifact.purchaseCount}</div>
                <div>Status: {selectedArtifact.owned ? '✅ Owned' : '🛒 Available'}</div>
              </div>
            </div>

            {/* Purchase Button */}
            <div className="flex space-x-3">
              {!selectedArtifact.owned ? (
                <button
                  onClick={() => purchaseArtifact(selectedArtifact)}
                  disabled={
                    (selectedArtifact.currency === 'gold' && playerGold < selectedArtifact.price) ||
                    (selectedArtifact.currency === 'crystals' && playerCrystals < selectedArtifact.price) ||
                    (selectedArtifact.currency === 'souls' && playerSouls < selectedArtifact.price)
                  }
                  className="flex-1 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 disabled:opacity-50 text-white py-2 rounded-lg font-semibold"
                >
                  {getCurrencyIcon(selectedArtifact.currency)} Purchase
                </button>
              ) : (
                <div className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold text-center">
                  ✅ Owned
                </div>
              )}
              <button
                onClick={() => setSelectedArtifact(null)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AR World Detail Modal */}
      {selectedARWorld && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-gray-900 border-2 border-cyan-600 rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold text-white mb-2">{selectedARWorld.name}</h3>
              <div className={`text-sm px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white mb-4`}>
                {selectedARWorld.theme}
              </div>
              <div className="text-gray-300 text-sm mb-4">{selectedARWorld.environment}</div>
            </div>

            {/* World Image */}
            <div 
              className="h-48 rounded-xl bg-cover bg-center mb-4 border-2 border-cyan-400/50"
              style={{
                backgroundImage: `url(https://readdy.ai/api/search-image?query=$%7BencodeURIComponent%28selectedARWorld.image%29%7D&width=300&height=180&seq=${selectedARWorld.id}-world&orientation=landscape)`
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-xl flex items-end p-4">
                <div className="text-center w-full">
                  <div className="text-cyan-400 text-lg font-bold">{selectedARWorld.difficulty}</div>
                  <div className="text-gray-300 text-sm">Difficulty</div>
                </div>
              </div>
            </div>

            {/* Required Artifacts */}
            <div className="mb-4">
              <div className="text-white font-semibold mb-2">Required Artifacts</div>
              <div className="space-y-1">
                {selectedARWorld.requiredArtifacts.map((artifact, index) => (
                  <div key={index} className="bg-yellow-600/30 text-yellow-300 text-sm px-3 py-1 rounded-lg border border-yellow-600/50">
                    🏛️ {artifact}
                  </div>
                ))}
              </div>
            </div>

            {/* Unique Features */}
            <div className="mb-4">
              <div className="text-white font-semibold mb-2">Unique Features</div>
              <div className="space-y-1">
                {selectedARWorld.uniqueFeatures.map((feature, index) => (
                  <div key={index} className="text-cyan-300 text-sm">
                    ⭐ {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Native Monsters */}
            <div className="mb-4">
              <div className="text-white font-semibold mb-2">Native Monsters</div>
              <div className="flex flex-wrap gap-2">
                {selectedARWorld.nativeMonsters.map((monster, index) => (
                  <div key={index} className="bg-purple-600/30 text-purple-300 text-xs px-2 py-1 rounded-full border border-purple-600/50">
                    {monster}
                  </div>
                ))}
              </div>
            </div>

            {/* Exclusive Rewards */}
            <div className="mb-4">
              <div className="text-white font-semibold mb-2">Exclusive Rewards</div>
              <div className="flex flex-wrap gap-2">
                {selectedARWorld.exclusiveRewards.map((reward, index) => (
                  <div key={index} className="bg-orange-600/30 text-orange-300 text-xs px-2 py-1 rounded-full border border-orange-600/50">
                    {reward}
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelectedARWorld(null)}
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-lg font-semibold"
            >
              Close World Info
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="fixed top-0 w-full bg-black/40 backdrop-blur-md z-50 border-b border-yellow-800/30">
        <div className="px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <i className="ri-arrow-left-line text-white text-xl mr-2"></i>
            <span className="text-white font-semibold">Divine Artifacts</span>
          </Link>
          <div className="flex items-center space-x-3 text-sm">
            <div className="text-yellow-400">🪙 {playerGold.toLocaleString()}</div>
            <div className="text-cyan-400">💎 {playerCrystals.toLocaleString()}</div>
            <div className="text-purple-400">👻 {playerSouls.toLocaleString()}</div>
          </div>
        </div>
      </header>

      {/* Monthly Update Banner */}
      <section className="pt-20 px-4 py-6 relative z-10">
        <div className="bg-gradient-to-r from-yellow-900/50 to-orange-900/50 border border-yellow-700 rounded-xl p-4 mb-6">
          <div className="text-center">
            <div className="text-3xl mb-2">🏛️</div>
            <div className="text-white font-bold text-xl">Divine Artifacts & Sacred Relics</div>
            <div className="text-yellow-400 text-sm">Monthly Updated Collection</div>
            <div className="text-gray-300 text-sm mt-2">
              {currentMonth} • {artifactDatabase.filter(a => a.isNewThisMonth).length} New Artifacts Added
            </div>
          </div>
        </div>
      </section>

      {/* Toggle Between Artifacts and AR Worlds */}
      <section className="px-4 py-4 relative z-10">
        <div className="flex bg-gray-800/50 rounded-xl p-1 mb-6">
          <button
            onClick={() => setShowARWorlds(false)}
            className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all ${
              !showARWorlds ? 'bg-yellow-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            🏛️ Sacred Artifacts ({artifactDatabase.length})
          </button>
          <button
            onClick={() => setShowARWorlds(true)}
            className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all ${
              showARWorlds ? 'bg-cyan-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            🌍 AR Worlds ({arWorldDatabase.length})
          </button>
        </div>
      </section>

      {!showARWorlds ? (
        <>
          {/* Filters */}
          <section className="px-4 py-4 relative z-10">
            <div className="bg-gray-800/50 rounded-xl p-4 mb-4">
              <div className="grid grid-cols-1 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="text-white text-sm font-semibold mb-2 block">Category</label>
                  <div className="flex flex-wrap gap-2">
                    {['all', 'Divine', 'Celestial', 'Ancient', 'Mystical', 'Guardian', 'Utility'].map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category as any)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          selectedCategory === category 
                            ? 'bg-yellow-600 text-white' 
                            : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                        }`}
                      >
                        {category === 'all' ? 'All' : category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rarity Filter */}
                <div>
                  <label className="text-white text-sm font-semibold mb-2 block">Rarity</label>
                  <div className="flex flex-wrap gap-2">
                    {['all', 'Common', 'Rare', 'Epic', 'Legendary', 'Divine', 'Mythic'].map(rarity => (
                      <button
                        key={rarity}
                        onClick={() => setSelectedRarity(rarity as any)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          selectedRarity === rarity 
                            ? 'bg-yellow-600 text-white' 
                            : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                        }`}
                      >
                        {rarity === 'all' ? 'All' : rarity}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <label className="text-white text-sm font-semibold mb-2 block">Sort By</label>
                  <div className="flex space-x-2">
                    {[
                      { key: 'recent', label: 'New First' },
                      { key: 'rarity', label: 'Rarity' },
                      { key: 'price', label: 'Price' },
                      { key: 'name', label: 'Name' }
                    ].map(sort => (
                      <button
                        key={sort.key}
                        onClick={() => setSortBy(sort.key as any)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          sortBy === sort.key 
                            ? 'bg-yellow-600 text-white' 
                            : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                        }`}
                      >
                        {sort.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Artifacts Grid */}
          <section className="px-4 relative z-10">
            <div className="grid grid-cols-1 gap-4">
              {sortedArtifacts.map((artifact) => (
                <button
                  key={artifact.id}
                  onClick={() => setSelectedArtifact(artifact)}
                  className="bg-gray-800/70 border border-gray-700 rounded-xl p-4 text-left hover:border-yellow-600 transition-all"
                >
                  <div className="flex items-start space-x-4">
                    <div 
                      className="w-20 h-20 rounded-lg bg-cover bg-center flex-shrink-0"
                      style={{
                        backgroundImage: `url(https://readdy.ai/api/search-image?query=$%7BencodeURIComponent%28artifact.image%29%7D&width=80&height=80&seq=${artifact.id}-thumb&orientation=squarish)`
                      }}
                    >
                      {artifact.owned && (
                        <div className="w-full h-full bg-green-600/80 rounded-lg flex items-center justify-center">
                          <div className="text-white text-xl">✓</div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-white font-semibold text-lg">{artifact.name}</div>
                        {artifact.isNewThisMonth && (
                          <div className="bg-yellow-600 text-black px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                            NEW!
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-2">
                        <div className={`text-xs px-2 py-1 rounded-full border ${getRarityColor(artifact.rarity)}`}>
                          {artifact.rarity}
                        </div>
                        <div className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${getCategoryColor(artifact.category)} text-white`}>
                          {artifact.category}
                        </div>
                      </div>
                      
                      <div className="text-gray-300 text-sm mb-2 line-clamp-2">
                        {artifact.description}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-yellow-400 font-bold text-lg">
                          {getCurrencyIcon(artifact.currency)} {artifact.price.toLocaleString()}
                        </div>
                        <div className="text-gray-400 text-xs">
                          {artifact.purchaseCount} purchased
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </>
      ) : (
        /* AR Worlds Section */
        <section className="px-4 relative z-10">
          <div className="space-y-4">
            {arWorldDatabase.map((world) => (
              <button
                key={world.id}
                onClick={() => setSelectedARWorld(world)}
                className="w-full bg-gray-800/70 border border-gray-700 rounded-xl p-4 text-left hover:border-cyan-600 transition-all"
              >
                <div className="flex items-start space-x-4">
                  <div 
                    className="w-20 h-20 rounded-lg bg-cover bg-center flex-shrink-0"
                    style={{
                      backgroundImage: `url(https://readdy.ai/api/search-image?query=$%7BencodeURIComponent%28world.image%29%7D&width=80&height=80&seq=${world.id}-thumb&orientation=squarish)`
                    }}
                  ></div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-white font-semibold text-lg">{world.name}</div>
                      {world.isNewThisMonth && (
                        <div className="bg-cyan-600 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                          NEW WORLD!
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
                        {world.theme}
                      </div>
                      <div className={`text-xs px-2 py-1 rounded-full border ${
                        world.difficulty === 'Beginner' ? 'text-green-400 border-green-600' :
                        world.difficulty === 'Intermediate' ? 'text-yellow-400 border-yellow-600' :
                        world.difficulty === 'Advanced' ? 'text-orange-400 border-orange-600' :
                        world.difficulty === 'Master' ? 'text-red-400 border-red-600' :
                        'text-purple-400 border-purple-600'
                      }`}>
                        {world.difficulty}
                      </div>
                    </div>
                    
                    <div className="text-gray-300 text-sm mb-2">
                      {world.environment}
                    </div>
                    
                    <div className="text-cyan-400 text-xs">
                      Added: {world.monthAdded}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Monthly Update Schedule */}
      <section className="px-4 py-6 relative z-10 mb-20">
        <div className="bg-gray-800/50 rounded-xl p-4">
          <h3 className="text-white font-bold mb-3">📅 Monthly Update Schedule</h3>
          <div className="space-y-3">
            <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-3">
              <div className="text-yellow-400 font-semibold text-sm mb-1">🏛️ New Artifacts</div>
              <div className="text-gray-300 text-xs">
                15+ new sacred relics added monthly with unique powers and synergies
              </div>
            </div>
            <div className="bg-cyan-900/30 border border-cyan-700 rounded-lg p-3">
              <div className="text-cyan-400 font-semibold text-sm mb-1">🌍 New AR Worlds</div>
              <div className="text-gray-300 text-xs">
                3-5 new immersive AR dimensions monthly with exclusive monsters and rewards
              </div>
            </div>
            <div className="bg-purple-900/30 border border-purple-700 rounded-lg p-3">
              <div className="text-purple-400 font-semibold text-sm mb-1">💰 Dynamic Economy</div>
              <div className="text-gray-300 text-xs">
                Artifact prices adjust based on popularity and player purchasing patterns
              </div>
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
          <Link href="/duel-monster-world" className="flex flex-col items-center py-2 text-gray-500">
            <i className="ri-search-line text-lg mb-1"></i>
            <span className="text-xs">Hunt</span>
          </Link>
          <Link href="/divine-artifacts" className="flex flex-col items-center py-2 text-yellow-400">
            <i className="ri-treasure-map-line text-lg mb-1"></i>
            <span className="text-xs">Artifacts</span>
          </Link>
          <Link href="/monster-pedia" className="flex flex-col items-center py-2 text-gray-500">
            <i className="ri-book-3-line text-lg mb-1"></i>
            <span className="text-xs">Pedia</span>
          </Link>
          <Link href="/player-journey" className="flex flex-col items-center py-2 text-gray-500">
            <i className="ri-roadmap-line text-lg mb-1"></i>
            <span className="text-xs">Journey</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}