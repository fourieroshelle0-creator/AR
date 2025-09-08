'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface ShopItem {
  id: string;
  name: string;
  category: 'potion' | 'weapon' | 'armor' | 'destroyer' | 'monster' | 'premium';
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';
  price: number;
  realPrice?: number; // Real money price in USD
  currency: 'gold' | 'crystals' | 'souls' | 'usd';
  description: string;
  effects: string[];
  ingredients?: string[];
  enchantments?: string[];
  durability?: number;
  requirements?: string[];
  targetTypes?: string[];
  destructionPower?: string;
  holyLevel?: number;
  isPremium?: boolean;
  image: string;
  inStock: number;
  popularity: number;
  monthAdded?: string;
  isNewThisMonth?: boolean;
}

interface PlayerInventory {
  gold: number;
  crystals: number;
  souls: number;
  potions: any[];
  weapons: any[];
  armor: any[];
  destroyers: any[];
  monsters: any[];
  premiumItems: any[];
}

interface PremiumPackage {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  contents: string[];
  bonus: string;
  value: string;
  popular?: boolean;
  image: string;
}

export default function MonsterShop() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'potions' | 'weapons' | 'armor' | 'destroyers' | 'monsters' | 'premium'>('all');
  const [selectedRarity, setSelectedRarity] = useState<'all' | 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showItemModal, setShowItemModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);
  const [purchaseQuantity, setPurchaseQuantity] = useState(1);
  const [showInventory, setShowInventory] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPaymentItem, setSelectedPaymentItem] = useState<ShopItem | PremiumPackage | null>(null);
  const [currentMonth, setCurrentMonth] = useState('December 2024');
  const [playerInventory, setPlayerInventory] = useState<PlayerInventory>({
    gold: 15420,
    crystals: 890,
    souls: 145,
    potions: [],
    weapons: [],
    armor: [],
    destroyers: [],
    monsters: [],
    premiumItems: []
  });

  // PREMIUM MONSTERS - Real Money Only
  const premiumMonsters: ShopItem[] = [
    {
      id: 'legendary-phoenix',
      name: 'Legendary Phoenix',
      category: 'monster',
      rarity: 'Legendary',
      price: 0,
      realPrice: 19.99,
      currency: 'usd',
      description: 'An immortal phoenix with resurrection abilities and solar fire attacks. Exclusive legendary creature.',
      effects: ['Auto-Resurrection', 'Solar Flare Attack', 'Fire Immunity', 'Flight Ability'],
      isPremium: true,
      image: 'Magnificent legendary phoenix with golden solar flames, immortal divine bird with resurrection powers, premium exclusive creature with celestial energy',
      inStock: 999,
      popularity: 100,
      monthAdded: 'December 2024',
      isNewThisMonth: true
    },
    {
      id: 'void-dragon',
      name: 'Void Dragon',
      category: 'monster',
      rarity: 'Mythic',
      price: 0,
      realPrice: 34.99,
      currency: 'usd',
      description: 'A primordial dragon from the void between worlds. Ultimate power creature with reality manipulation.',
      effects: ['Reality Warp', 'Void Breath', 'Dimensional Portal', 'Time Manipulation'],
      isPremium: true,
      image: 'Cosmic void dragon with reality distortion effects, mythic creature with dimensional powers, premium exclusive monster with space-time abilities',
      inStock: 999,
      popularity: 100,
      monthAdded: 'December 2024',
      isNewThisMonth: true
    },
    {
      id: 'celestial-unicorn',
      name: 'Celestial Unicorn',
      category: 'monster',
      rarity: 'Legendary',
      price: 0,
      realPrice: 24.99,
      currency: 'usd',
      description: 'A divine unicorn blessed with healing magic and purity. Rare premium creature with support abilities.',
      effects: ['Mass Healing', 'Purification Aura', 'Light Magic', 'Blessing Powers'],
      isPremium: true,
      image: 'Divine celestial unicorn with healing light aura, premium legendary creature with horn of purity, exclusive magical beast with divine powers',
      inStock: 999,
      popularity: 95,
      monthAdded: 'December 2024',
      isNewThisMonth: true
    }
  ];

  // PREMIUM ITEMS - Real Money Only
  const premiumItems: ShopItem[] = [
    {
      id: 'master-summoner-staff',
      name: 'Master Summoner Staff',
      category: 'weapon',
      rarity: 'Mythic',
      price: 0,
      realPrice: 14.99,
      currency: 'usd',
      description: 'Ultimate weapon for monster summoners. Reduces all summon costs and increases monster power.',
      effects: ['All Summon Costs -50%', 'Monster Power +30%', 'Unlimited Durability', 'Auto-Evolve Chance +25%'],
      isPremium: true,
      durability: 9999,
      image: 'Ultimate summoner staff with cosmic energy and monster spirits, mythic weapon with reality-bending powers, premium exclusive staff with dimensional effects',
      inStock: 999,
      popularity: 98,
      monthAdded: 'December 2024',
      isNewThisMonth: true
    },
    {
      id: 'infinite-blank-cards',
      name: 'Infinite Blank Card Pack',
      category: 'premium',
      rarity: 'Mythic',
      price: 0,
      realPrice: 9.99,
      currency: 'usd',
      description: 'Never run out of capture chances! Unlimited blank cards with enhanced capture rates.',
      effects: ['Infinite Blank Cards', 'Capture Rate +50%', 'Rare Monster Chance +25%', 'Auto-Capture Weak Monsters'],
      isPremium: true,
      image: 'Infinite blank card pack with magical portal, premium capture system with unlimited uses, exclusive card collection with enhanced powers',
      inStock: 999,
      popularity: 100,
      monthAdded: 'December 2024',
      isNewThisMonth: true
    },
    {
      id: 'premium-battle-pass',
      name: 'Premium Battle Pass',
      category: 'premium',
      rarity: 'Epic',
      price: 0,
      realPrice: 4.99,
      currency: 'usd',
      description: 'Monthly premium pass with exclusive rewards, bonus EXP, and premium currency.',
      effects: ['Double EXP for 30 days', '+500 Crystals weekly', 'Exclusive monster skins', 'Priority matchmaking'],
      isPremium: true,
      image: 'Premium battle pass with golden rewards and exclusive content, monthly subscription with bonus items, VIP access pass with special privileges',
      inStock: 999,
      popularity: 85,
      monthAdded: 'December 2024',
      isNewThisMonth: true
    }
  ];

  // PREMIUM PACKAGES
  const premiumPackages: PremiumPackage[] = [
    {
      id: 'starter-pack',
      name: 'Monster Hunter Starter Pack',
      price: 4.99,
      description: 'Perfect for new players! Get everything you need to start your monster hunting journey.',
      contents: ['5 Premium Blank Cards', '1000 Gold', '200 Crystals', 'Basic Health Potions x10', 'Iron Sword'],
      bonus: 'FREE: Exclusive Starter Monster Egg',
      value: '$12 Value',
      image: 'Monster hunter starter pack with essential items and exclusive content, beginner-friendly bundle with premium cards and currency'
    },
    {
      id: 'premium-pack',
      name: 'Premium Hunter Pack',
      price: 14.99,
      originalPrice: 24.99,
      description: 'Most popular pack! Advanced gear and resources for serious monster hunters.',
      contents: ['15 Premium Blank Cards', '5000 Gold', '1000 Crystals', '50 Souls', 'Legendary Weapon', 'Rare Armor Set'],
      bonus: 'FREE: Choice of Rare Monster + Premium Battle Pass (1 month)',
      value: '$35 Value',
      popular: true,
      image: 'Premium hunter pack with legendary weapons and rare monsters, popular bundle with maximum value and exclusive bonuses'
    },
    {
      id: 'ultimate-pack',
      name: 'Ultimate Master Pack',
      price: 49.99,
      originalPrice: 79.99,
      description: 'The ultimate collection! Everything a master monster hunter needs.',
      contents: ['50 Premium Blank Cards', '20000 Gold', '5000 Crystals', '500 Souls', 'Mythic Weapon Collection', 'Complete Armor Sets', '3 Legendary Monsters'],
      bonus: 'FREE: Exclusive Mythic Dragon + VIP Status + Premium Pass (3 months)',
      value: '$120 Value',
      image: 'Ultimate master pack with mythic weapons and legendary monsters, complete collection with VIP benefits and exclusive content'
    },
    {
      id: 'monthly-subscription',
      name: 'Monthly VIP Subscription',
      price: 9.99,
      description: 'Ongoing benefits for dedicated players. Cancel anytime.',
      contents: ['Daily: 100 Gold + 25 Crystals', 'Weekly: 5 Premium Blank Cards', 'Monthly: Legendary Item', 'VIP Chat Badge', 'Priority Support'],
      bonus: 'First Month: Bonus Legendary Monster',
      value: 'Unlimited Benefits',
      image: 'Monthly VIP subscription with daily rewards and exclusive benefits, ongoing premium membership with continuous value'
    }
  ];

  // POTIONS SECTION
  const potionItems: ShopItem[] = [
    {
      id: 'health-potion-basic',
      name: 'Basic Health Potion',
      category: 'potion',
      rarity: 'Common',
      price: 50,
      currency: 'gold',
      description: 'Restores 50 HP to your monster. Made with healing herbs and spring water.',
      effects: ['Restore 50 HP', 'Remove poison status', 'Quick healing over 5 seconds'],
      ingredients: ['Healing Herbs', 'Spring Water', 'Honey'],
      image: 'Small glass bottle with red healing liquid, glowing herb essence, basic health potion with cork stopper, magical healing elixir with warm red glow',
      inStock: 99,
      popularity: 95
    },
    {
      id: 'mana-potion-basic',
      name: 'Basic Mana Potion',
      category: 'potion',
      rarity: 'Common',
      price: 45,
      currency: 'gold',
      description: 'Restores 30 energy points for monster abilities.',
      effects: ['Restore 30 Energy', 'Boost next ability power by 10%', 'Clear mental fatigue'],
      ingredients: ['Mana Crystals', 'Distilled Water', 'Blue Berries'],
      image: 'Blue glowing potion bottle with swirling magical energy, mana restoration elixir with sparkling effects, mystical blue liquid with ethereal glow',
      inStock: 85,
      popularity: 88
    },
    {
      id: 'stamina-brew',
      name: 'Stamina Brew',
      category: 'potion',
      rarity: 'Common',
      price: 40,
      currency: 'gold',
      description: 'Increases monster movement speed and reduces ability cooldowns.',
      effects: ['Speed +25% for 3 minutes', 'Cooldown reduction 15%', 'Extra energy regeneration'],
      ingredients: ['Energy Grass', 'Lightning Essence', 'Sparkling Water'],
      image: 'Yellow energizing potion with electric sparks, stamina enhancement brew with golden lightning effects, speed boost elixir with crackling energy',
      inStock: 76,
      popularity: 82
    },

    // RARE POTIONS
    {
      id: 'elemental-resistance',
      name: 'Elemental Resistance Elixir',
      category: 'potion',
      rarity: 'Rare',
      price: 180,
      currency: 'gold',
      description: 'Grants immunity to one element type for 10 minutes.',
      effects: ['Choose Fire/Ice/Lightning immunity', 'Absorb elemental damage for healing', 'Reflect 25% elemental attacks'],
      ingredients: ['Elemental Stones', 'Magical Water', 'Resistance Herbs', 'Protective Essence'],
      image: 'Multi-colored potion shifting between elemental colors, protective elixir with swirling rainbow effects, resistance potion with prismatic glow',
      inStock: 45,
      popularity: 78
    },
    {
      id: 'berserker-rage',
      name: 'Berserker Rage Potion',
      category: 'potion',
      rarity: 'Rare',
      price: 220,
      currency: 'gold',
      description: 'Doubles attack power but reduces defense. High risk, high reward.',
      effects: ['Attack +100% for 2 minutes', 'Defense -50%', 'Immune to fear and charm', 'Cannot retreat'],
      ingredients: ['Rage Mushrooms', 'Blood Red Flowers', 'Fury Essence', 'Adrenaline Extract'],
      image: 'Dark red potion with pulsing aggressive energy, berserker elixir with blood-red smoke effects, rage enhancement brew with intense crimson glow',
      inStock: 23,
      popularity: 71
    },
    {
      id: 'invisible-essence',
      name: 'Invisibility Essence',
      category: 'potion',
      rarity: 'Rare',
      price: 320,
      currency: 'crystals',
      description: 'Makes monster completely invisible for 30 seconds. Perfect for ambush tactics.',
      effects: ['Complete invisibility 30 seconds', 'First attack deals 200% damage', 'Movement makes no sound'],
      ingredients: ['Ghost Orchids', 'Phantom Dew', 'Ethereal Mist', 'Transparency Crystals'],
      image: 'Transparent potion bottle with barely visible swirling mist, invisibility elixir with ghostly transparency effects, stealth potion with ethereal shimmer',
      inStock: 18,
      popularity: 85
    },

    // EPIC POTIONS
    {
      id: 'dragons-breath',
      name: "Dragon's Breath Elixir",
      category: 'potion',
      rarity: 'Epic',
      price: 850,
      currency: 'crystals',
      description: 'Temporarily grants fire breathing ability to any monster.',
      effects: ['Gain Fire Breath attack', 'Fire immunity', 'All attacks cause burn damage', 'Intimidate enemies'],
      ingredients: ['Dragon Scale Powder', 'Volcanic Ash', 'Phoenix Feathers', 'Molten Core Essence'],
      image: 'Ornate bottle with swirling fire and dragon breath effects, epic fire elixir with golden dragon motifs, legendary flame potion with draconic energy',
      inStock: 8,
      popularity: 92
    },
    {
      id: 'time-dilation',
      name: 'Time Dilation Serum',
      category: 'potion',
      rarity: 'Epic',
      price: 1200,
      currency: 'crystals',
      description: 'Slows down time around your monster, allowing multiple actions.',
      effects: ['Take 3 actions per turn', 'Dodge chance +80%', 'Counter-attack all missed attacks'],
      ingredients: ['Chronos Crystals', 'Temporal Essence', 'Time-Warped Water', 'Quantum Particles'],
      image: 'Swirling potion with clock-like time distortion effects, temporal elixir with chronometer patterns, time magic serum with cosmic energy spirals',
      inStock: 3,
      popularity: 88
    },

    // LEGENDARY POTIONS
    {
      id: 'phoenix-rebirth',
      name: 'Phoenix Rebirth Potion',
      category: 'potion',
      rarity: 'Legendary',
      price: 2500,
      currency: 'crystals',
      description: 'Automatically revives monster with full health when defeated.',
      effects: ['Auto-revive with 100% HP', 'Burst of healing light damages enemies', 'Gain fire immunity permanently'],
      ingredients: ['Phoenix Heart', 'Tears of Renewal', 'Eternal Flames', 'Life Force Crystals'],
      image: 'Golden bottle with phoenix rising from flames effect, legendary rebirth elixir with divine phoenix energy, immortality potion with golden fire aura',
      inStock: 1,
      popularity: 98
    },
    {
      id: 'void-walker',
      name: 'Void Walker Essence',
      category: 'potion',
      rarity: 'Legendary',
      price: 3000,
      currency: 'souls',
      description: 'Allows monster to phase through dimensions and reality.',
      effects: ['Phase through all attacks for 1 minute', 'Teleport anywhere on battlefield', 'Deal void damage'],
      ingredients: ['Void Crystals', 'Dimensional Tears', 'Reality Fragments', 'Cosmic Dust'],
      image: 'Dark bottle with swirling void energy and dimensional portals, legendary void elixir with cosmic horror effects, reality-bending potion with dark matter',
      inStock: 1,
      popularity: 95
    },

    // MYTHIC POTIONS
    {
      id: 'gods-ambrosia',
      name: "God's Ambrosia",
      category: 'potion',
      rarity: 'Mythic',
      price: 10000,
      currency: 'souls',
      description: 'The ultimate potion. Permanently increases all stats and grants divine power.',
      effects: ['All stats +50 permanently', 'Gain divine element', 'Immunity to all negative effects', 'Aura inspires allies'],
      ingredients: ['Divine Nectar', 'Celestial Herbs', 'God Tears', 'Pure Creation Essence'],
      image: 'Radiant golden chalice with divine light beams, mythic ambrosia with celestial energy, god-tier elixir with heavenly glow and angel wings',
      inStock: 1,
      popularity: 100
    }
  ];

  // WEAPONS SECTION
  const weaponItems: ShopItem[] = [
    {
      id: 'iron-sword',
      name: 'Iron Sword',
      category: 'weapon',
      rarity: 'Common',
      price: 150,
      currency: 'gold',
      description: 'A sturdy iron blade perfect for beginning warriors.',
      effects: ['Attack +15', 'Durability: 100 uses'],
      enchantments: ['None'],
      durability: 100,
      image: 'Simple iron sword with leather grip, basic warrior blade with silver metallic finish, starter weapon with clean design',
      inStock: 50,
      popularity: 75
    },
    {
      id: 'wooden-staff',
      name: 'Wooden Staff',
      category: 'weapon',
      rarity: 'Common',
      price: 120,
      currency: 'gold',
      description: 'A carved wooden staff that amplifies magical abilities.',
      effects: ['Magic Attack +20', 'Mana Cost -10%'],
      enchantments: ['Minor Magic Boost'],
      durability: 80,
      image: 'Carved wooden staff with crystal orb on top, magical focus weapon with nature wood grain, spellcaster staff with glowing runes',
      inStock: 35,
      popularity: 68
    },
    {
      id: 'hunter-bow',
      name: 'Hunter Bow',
      category: 'weapon',
      rarity: 'Common',
      price: 180,
      currency: 'gold',
      description: 'A reliable bow for ranged attacks and hunting.',
      effects: ['Ranged Attack +18', 'Critical Hit +5%'],
      enchantments: ['Accuracy Enhancement'],
      durability: 120,
      image: 'Wooden hunting bow with leather string, ranger weapon with carved animal motifs, archery bow with feathered arrows',
      inStock: 28,
      popularity: 72
    },

    // RARE WEAPONS
    {
      id: 'flame-blade',
      name: 'Flame Blade',
      category: 'weapon',
      rarity: 'Rare',
      price: 450,
      currency: 'gold',
      description: 'A sword wreathed in eternal flames that never extinguish.',
      effects: ['Attack +35', 'Fire Damage +25', 'Burn Effect on Hit'],
      enchantments: ['Eternal Flame', 'Heat Aura'],
      durability: 200,
      requirements: ['Level 10+', 'Fire Element Affinity'],
      image: 'Flaming sword with fire wreathed blade, magical fire weapon with molten edge, flame enchanted sword with burning effects',
      inStock: 12,
      popularity: 89
    },
    {
      id: 'frost-spear',
      name: 'Frost Spear',
      category: 'weapon',
      rarity: 'Rare',
      price: 520,
      currency: 'crystals',
      description: 'An icy spear that freezes enemies on contact.',
      effects: ['Attack +40', 'Ice Damage +30', 'Freeze Chance 25%'],
      enchantments: ['Perpetual Frost', 'Ice Shard Explosion'],
      durability: 180,
      requirements: ['Level 12+', 'Ice Element Compatibility'],
      image: 'Ice-crystalline spear with frozen blade, frost weapon with icicle formations, magical ice spear with freezing aura effects',
      inStock: 8,
      popularity: 85
    },
    {
      id: 'shadow-dagger',
      name: 'Shadow Dagger',
      category: 'weapon',
      rarity: 'Rare',
      price: 380,
      currency: 'gold',
      description: 'A dagger that bends shadows and strikes from darkness.',
      effects: ['Attack +25', 'Stealth Attack +100%', 'Shadow Step Ability'],
      enchantments: ['Shadow Blend', 'Darkness Manipulation'],
      durability: 150,
      requirements: ['Level 8+', 'Shadow Element Access'],
      image: 'Dark shadow dagger with wispy darkness effects, stealth weapon with shadow energy, assassin blade with dark mist emanation',
      inStock: 15,
      popularity: 91
    },

    // EPIC WEAPONS
    {
      id: 'thunder-hammer',
      name: 'Thunder Hammer',
      category: 'weapon',
      rarity: 'Epic',
      price: 1200,
      currency: 'crystals',
      description: 'A mighty hammer that calls down lightning with every strike.',
      effects: ['Attack +60', 'Lightning Damage +50', 'Chain Lightning on Crit'],
      enchantments: ['Storm Caller', 'Thunder Crash', 'Electric Aura'],
      durability: 300,
      requirements: ['Level 20+', 'Lightning Affinity', 'Strength 25+'],
      image: 'Massive war hammer crackling with lightning energy, thunder weapon with electrical storm effects, epic lightning hammer with divine power',
      inStock: 3,
      popularity: 94
    },
    {
      id: 'void-scythe',
      name: 'Void Scythe',
      category: 'weapon',
      rarity: 'Epic',
      price: 1500,
      currency: 'souls',
      description: 'A scythe that harvests life force and tears reality.',
      effects: ['Attack +70', 'Life Drain 15%', 'Reality Rend Ability'],
      enchantments: ['Soul Harvest', 'Dimensional Cut', 'Death Aura'],
      durability: 250,
      requirements: ['Level 25+', 'Dark Magic Mastery', 'Soul Binding'],
      image: 'Dark scythe with void energy blade, death weapon with soul-reaping effects, epic void scythe with dimensional tears and dark matter',
      inStock: 2,
      popularity: 88
    },

    // LEGENDARY WEAPONS
    {
      id: 'excalibur-replica',
      name: 'Excalibur Replica',
      category: 'weapon',
      rarity: 'Legendary',
      price: 5000,
      currency: 'crystals',
      description: 'A perfect replica of the legendary sword, radiating divine power.',
      effects: ['Attack +100', 'Holy Damage +75', 'Divine Light Beam', 'Leadership Aura'],
      enchantments: ['Divine Blessing', 'Light of Truth', 'Righteous Fury', 'Purity Shield'],
      durability: 500,
      requirements: ['Level 30+', 'Pure Heart', 'Honor Code', 'Light Element Mastery'],
      image: 'Radiant holy sword with golden divine light, legendary Excalibur with celestial aura, divine weapon with angel wing crossguard',
      inStock: 1,
      popularity: 100
    },

    // MYTHIC WEAPONS
    {
      id: 'worldbreaker',
      name: 'Worldbreaker',
      category: 'weapon',
      rarity: 'Mythic',
      price: 50000,
      currency: 'souls',
      description: 'The ultimate weapon capable of shattering dimensions and remaking reality.',
      effects: ['Attack +200', 'All Element Damage', 'Reality Shatter', 'Dimension Control'],
      enchantments: ['World Ender', 'Reality Forge', 'Cosmic Power', 'Universal Dominion'],
      durability: 9999,
      requirements: ['Level 50+', 'Master of All Elements', 'Defeated World Boss', 'Divine Approval'],
      image: 'Cosmic weapon with swirling galaxies and reality distortions, mythic worldbreaker with universal energy, god-tier weapon with dimensional power',
      inStock: 1,
      popularity: 100
    }
  ];

  // ARMOR SECTION
  const armorItems: ShopItem[] = [
    {
      id: 'leather-vest',
      name: 'Leather Vest',
      category: 'armor',
      rarity: 'Common',
      price: 80,
      currency: 'gold',
      description: 'Basic leather protection for starting adventurers.',
      effects: ['Defense +10', 'Movement Speed unchanged'],
      enchantments: ['None'],
      durability: 100,
      image: 'Brown leather vest with metal studs, basic armor protection with simple design, starter defensive gear with leather straps',
      inStock: 60,
      popularity: 70
    },
    {
      id: 'cloth-robes',
      name: 'Cloth Robes',
      category: 'armor',
      rarity: 'Common',
      price: 70,
      currency: 'gold',
      description: 'Light robes that enhance magical abilities.',
      effects: ['Magic Defense +15', 'Mana Regeneration +10%'],
      enchantments: ['Minor Magic Resistance'],
      durability: 80,
      image: 'Flowing cloth robes with mystical patterns, mage armor with arcane symbols, magical robes with ethereal fabric texture',
      inStock: 45,
      popularity: 65
    },
    {
      id: 'chain-mail',
      name: 'Chain Mail',
      category: 'armor',
      rarity: 'Common',
      price: 120,
      currency: 'gold',
      description: 'Interlocked metal rings providing balanced protection.',
      effects: ['Defense +18', 'Slash Resistance +20%'],
      enchantments: ['Metal Reinforcement'],
      durability: 120,
      image: 'Silver chain mail armor with interlocked rings, medieval protection with metallic shine, flexible metal armor with ring pattern',
      inStock: 30,
      popularity: 78
    },

    // RARE ARMOR
    {
      id: 'dragon-scale-mail',
      name: 'Dragon Scale Mail',
      category: 'armor',
      rarity: 'Rare',
      price: 650,
      currency: 'gold',
      description: 'Armor crafted from real dragon scales, providing exceptional fire protection.',
      effects: ['Defense +35', 'Fire Resistance 50%', 'Intimidate Aura'],
      enchantments: ['Dragon Heritage', 'Fire Immunity', 'Scale Regeneration'],
      durability: 200,
      requirements: ['Level 15+', 'Dragon Encounter Completed'],
      image: 'Crimson dragon scale armor with overlapping protective scales, fire-resistant armor with draconic design, legendary scale mail with flame patterns',
      inStock: 8,
      popularity: 92
    },
    {
      id: 'mithril-plate',
      name: 'Mithril Plate Armor',
      category: 'armor',
      rarity: 'Rare',
      price: 850,
      currency: 'crystals',
      description: 'Lightweight yet incredibly strong armor made from mithril.',
      effects: ['Defense +40', 'Magic Resistance +30%', 'No Movement Penalty'],
      enchantments: ['Weightless', 'Magic Deflection', 'Self-Repair'],
      durability: 250,
      requirements: ['Level 18+', 'Mithril Mine Access'],
      image: 'Shimmering silver mithril plate armor with ethereal glow, lightweight magical armor with elven craftsmanship, mystical metal protection',
      inStock: 5,
      popularity: 89
    },
    {
      id: 'shadow-cloak',
      name: 'Shadow Cloak',
      category: 'armor',
      rarity: 'Rare',
      price: 480,
      currency: 'gold',
      description: 'A cloak woven from shadow essence that bends light around the wearer.',
      effects: ['Defense +20', 'Stealth +60%', 'Shadow Resistance 40%'],
      enchantments: ['Light Bending', 'Shadow Merge', 'Darkness Affinity'],
      durability: 150,
      requirements: ['Level 12+', 'Shadow Element Mastery'],
      image: 'Dark flowing cloak with shadow energy wisps, stealth armor with darkness manipulation, shadowy cloak with ethereal black mist',
      inStock: 12,
      popularity: 85
    },

    // EPIC ARMOR
    {
      id: 'phoenix-mail',
      name: 'Phoenix Mail',
      category: 'armor',
      rarity: 'Epic',
      price: 1800,
      currency: 'crystals',
      description: 'Legendary armor that grants the power of resurrection.',
      effects: ['Defense +55', 'Auto-Revive Once', 'Fire Immunity', 'Healing Aura'],
      enchantments: ['Phoenix Rebirth', 'Eternal Flames', 'Life Force', 'Healing Light'],
      durability: 300,
      requirements: ['Level 25+', 'Phoenix Feather Quest', 'Fire Mastery'],
      image: 'Golden armor with phoenix feather patterns and flame effects, legendary phoenix mail with rebirth energy, divine fire armor with wing motifs',
      inStock: 2,
      popularity: 96
    },
    {
      id: 'void-armor',
      name: 'Void Armor',
      category: 'armor',
      rarity: 'Epic',
      price: 2200,
      currency: 'souls',
      description: 'Armor forged from the void between worlds, offering protection from all realities.',
      effects: ['Defense +60', 'Dimensional Resistance 80%', 'Phase Ability'],
      enchantments: ['Void Walker', 'Reality Anchor', 'Dimensional Shield', 'Cosmic Protection'],
      durability: 350,
      requirements: ['Level 28+', 'Void Touched', 'Dimensional Magic'],
      image: 'Dark armor with swirling void energy and cosmic patterns, dimensional protection with reality distortion effects, void armor with space-time manipulation',
      inStock: 1,
      popularity: 88
    },

    // LEGENDARY ARMOR
    {
      id: 'aegis-divine',
      name: 'Aegis Divine',
      category: 'armor',
      rarity: 'Legendary',
      price: 8000,
      currency: 'crystals',
      description: 'The ultimate shield of the gods, providing absolute protection.',
      effects: ['Defense +80', 'Divine Protection', 'Reflect All Attacks 25%', 'Immunity to All Curses'],
      enchantments: ['God\'s Blessing', 'Perfect Defense', 'Divine Retribution', 'Absolute Protection'],
      durability: 500,
      requirements: ['Level 35+', 'Divine Favor', 'Completed God Trials', 'Pure Soul'],
      image: 'Radiant golden armor with divine wings and celestial light, legendary Aegis with god-tier protection, divine armor with heavenly glow',
      inStock: 1,
      popularity: 100
    },

    // MYTHIC ARMOR
    {
      id: 'reality-weaver',
      name: 'Reality Weaver Armor',
      category: 'armor',
      rarity: 'Mythic',
      price: 100000,
      currency: 'souls',
      description: 'Armor that allows the wearer to rewrite the laws of reality itself.',
      effects: ['Defense +150', 'Reality Control', 'Time Manipulation', 'Universal Adaptation'],
      enchantments: ['Reality Forge', 'Time Lord', 'Universal Law', 'Existence Mastery'],
      durability: 9999,
      requirements: ['Level 50+', 'Mastered All Elements', 'Defeated Reality Boss', 'Cosmic Understanding'],
      image: 'Cosmic armor with swirling galaxies and reality distortions, mythic reality weaver with universal power, god-tier armor with dimensional control',
      inStock: 1,
      popularity: 100
    }
  ];

  // MONSTER DESTROYER ITEMS SECTION
  const destroyerItems: ShopItem[] = [
    {
      id: 'bronze-cross',
      name: 'Bronze Cross',
      category: 'destroyer',
      rarity: 'Common',
      price: 200,
      currency: 'gold',
      description: 'Simple blessed bronze cross for eliminating low-level dark monsters and corrupted spirits.',
      effects: ['Instantly destroys Level 1-10 dark monsters', 'Purifies small corrupted areas', 'Provides protection during battles'],
      targetTypes: ['Shadow Sprites', 'Corrupted Familiars', 'Lesser Demons', 'Dark Wisps'],
      destructionPower: 'Low-Level Elimination',
      holyLevel: 1,
      durability: 50,
      requirements: ['Pure Heart', 'Basic Faith Level'],
      image: 'Simple bronze cross with holy blessing, basic religious artifact with divine light, sacred symbol for monster destruction',
      inStock: 25,
      popularity: 82,
      monthAdded: 'December 2024',
      isNewThisMonth: true
    },
    {
      id: 'silver-cross',
      name: 'Silver Cross',
      category: 'destroyer',
      rarity: 'Rare',
      price: 800,
      currency: 'gold',
      description: 'Blessed silver cross capable of destroying mid-level demons and shadow beasts.',
      effects: ['Instantly destroys Level 11-25 dark monsters', 'Creates protective holy barriers', 'Repels evil auras within 30ft radius'],
      targetTypes: ['Shadow Panthers', 'Demon Hounds', 'Corrupted Dragons', 'Void Stalkers', 'Dark Elementals'],
      destructionPower: 'Mid-Level Elimination',
      holyLevel: 3,
      durability: 100,
      requirements: ['Strong Faith', 'Level 15+', 'Completed Blessing Ritual'],
      image: 'Gleaming silver cross with intense holy radiance, blessed religious artifact with divine power, sacred weapon against evil',
      inStock: 12,
      popularity: 91,
      monthAdded: 'December 2024',
      isNewThisMonth: true
    },
    {
      id: 'gold-cross',
      name: 'Gold Cross',
      category: 'destroyer',
      rarity: 'Epic',
      price: 2500,
      currency: 'crystals',
      description: 'Sacred gold cross blessed by high priests, capable of eliminating powerful demonic entities.',
      effects: ['Instantly destroys Level 26-40 dark monsters', 'Banishes demons to the void', 'Creates sanctuary zones', 'Heals corrupted allies'],
      targetTypes: ['Greater Demons', 'Shadow Lords', 'Corrupted Titans', 'Void Warlords', 'Dark Phoenixes'],
      destructionPower: 'High-Level Elimination',
      holyLevel: 5,
      durability: 200,
      requirements: ['Divine Favor', 'Level 25+', 'Priest Blessing', 'Completed Sacred Quest'],
      image: 'Radiant gold cross with divine flames, sacred artifact blessed by high priests, legendary holy weapon with celestial power',
      inStock: 5,
      popularity: 96,
      monthAdded: 'December 2024',
      isNewThisMonth: true
    },
    {
      id: 'crystal-cross',
      name: 'Crystal Cross',
      category: 'destroyer',
      rarity: 'Legendary',
      price: 8000,
      currency: 'souls',
      description: 'Divine crystal cross that can eliminate entire swarms and nests of dark creatures simultaneously.',
      effects: ['Destroys monster swarms and nests instantly', 'Area elimination up to 100ft radius', 'Permanent corruption cleansing', 'Creates blessed sanctuaries'],
      targetTypes: ['Monster Swarms', 'Demon Nests', 'Corruption Hives', 'Shadow Colonies', 'Void Rifts'],
      destructionPower: 'Swarm/Nest Elimination',
      holyLevel: 8,
      durability: 500,
      requirements: ['Archbishop Blessing', 'Level 35+', 'Completed Cathedral Quest', 'Divine Champion Status'],
      image: 'Perfect crystal cross radiating divine light beams, legendary holy artifact with celestial energy, ultimate sacred weapon against darkness',
      inStock: 2,
      popularity: 100,
      monthAdded: 'December 2024',
      isNewThisMonth: true
    },

    // HOLY WATER - Purification & Destruction
    {
      id: 'blessed-water',
      name: 'Blessed Holy Water',
      category: 'destroyer',
      rarity: 'Common',
      price: 150,
      currency: 'gold',
      description: 'Sacred water blessed by priests, burns dark creatures and purifies corruption.',
      effects: ['Deals continuous holy damage to dark monsters', 'Purifies corrupted ground', 'Protects against possession'],
      targetTypes: ['All Dark Creatures', 'Corrupted Spirits', 'Undead', 'Shadow Beings'],
      destructionPower: 'Continuous Holy Damage',
      holyLevel: 2,
      durability: 10,
      image: 'Crystal vial filled with glowing holy water, sacred blessed liquid with divine light, purification potion against evil',
      inStock: 40,
      popularity: 78,
      monthAdded: 'December 2024',
      isNewThisMonth: true
    },
    {
      id: 'jordan-river-water',
      name: 'Jordan River Holy Water',
      category: 'destroyer',
      rarity: 'Rare',
      price: 600,
      currency: 'gold',
      description: 'Sacred water from the Jordan River, incredibly potent against demonic forces.',
      effects: ['Massive holy damage to demons', 'Instantly purifies corruption', 'Creates holy barriers', 'Blesses weapons for 1 hour'],
      targetTypes: ['Demons', 'Devils', 'Corrupted Dragons', 'Dark Elementals', 'Possessed Monsters'],
      destructionPower: 'Massive Holy Damage',
      holyLevel: 4,
      durability: 5,
      requirements: ['Pilgrimage Completed', 'Faith Level 3+'],
      image: 'Ornate bottle with Jordan River holy water glowing with divine power, sacred biblical water with intense blessing, legendary purification liquid',
      inStock: 8,
      popularity: 94,
      monthAdded: 'December 2024',
      isNewThisMonth: true
    },
    {
      id: 'vatican-holy-water',
      name: 'Vatican Blessed Water',
      category: 'destroyer',
      rarity: 'Epic',
      price: 2000,
      currency: 'crystals',
      description: 'Holy water blessed by the Pope himself, capable of destroying the most powerful evil entities.',
      effects: ['Ultimate holy damage', 'Banishes any dark creature permanently', 'Creates permanent blessed zones', 'Resurrects fallen allies'],
      targetTypes: ['All Evil Entities', 'Demon Lords', 'Dark Gods', 'Corruption Incarnate', 'Void Entities'],
      destructionPower: 'Ultimate Divine Power',
      holyLevel: 7,
      durability: 3,
      requirements: ['Papal Blessing', 'Saint Status', 'Level 40+', 'Divine Mission Completed'],
      image: 'Sacred papal holy water in golden vessel with divine radiance, ultimate blessed liquid with papal blessing, legendary Vatican artifact',
      inStock: 1,
      popularity: 100,
      monthAdded: 'December 2024',
      isNewThisMonth: true
    },

    // HOLY GRIMOIRE (HOLY BIBLE)
    {
      id: 'pocket-bible',
      name: 'Pocket Holy Bible',
      category: 'destroyer',
      rarity: 'Common',
      price: 300,
      currency: 'gold',
      description: 'Small but powerful Bible that recites protective verses and weakens dark creatures.',
      effects: ['Weakens all dark monsters in area', 'Provides continuous protection', 'Recites banishment verses', 'Boosts team morale'],
      targetTypes: ['All Dark Creatures', 'Demonic Entities', 'Corrupted Spirits'],
      destructionPower: 'Weakening & Protection',
      holyLevel: 2,
      durability: 100,
      image: 'Small leather-bound Bible glowing with holy light, pocket religious text with divine power, sacred scripture for monster protection',
      inStock: 30,
      popularity: 76,
      monthAdded: 'December 2024',
      isNewThisMonth: true
    },
    {
      id: 'illuminated-bible',
      name: 'Illuminated Holy Grimoire',
      category: 'destroyer',
      rarity: 'Rare',
      price: 1200,
      currency: 'gold',
      description: 'Ancient illuminated Bible with golden pages that recite powerful banishment spells.',
      effects: ['Casts automatic banishment spells', 'Creates holy light barriers', 'Reveals hidden dark creatures', 'Protects entire party'],
      targetTypes: ['Hidden Demons', 'Invisible Spirits', 'Shapeshifted Devils', 'Masked Evil'],
      destructionPower: 'Revelation & Banishment',
      holyLevel: 4,
      durability: 200,
      requirements: ['Scholar Level 2+', 'Reading Latin', 'Monastery Training'],
      image: 'Ornate illuminated Bible with golden pages and divine light, ancient religious grimoire with mystical power, sacred text with magical properties',
      inStock: 6,
      popularity: 89,
      monthAdded: 'December 2024',
      isNewThisMonth: true
    },
    {
      id: 'archangel-codex',
      name: 'Archangel Codex',
      category: 'destroyer',
      rarity: 'Legendary',
      price: 12000,
      currency: 'souls',
      description: 'Divine grimoire written by Archangel Michael himself, containing the most powerful exorcism rituals.',
      effects: ['Summons Archangel assistance', 'Performs divine exorcisms', 'Opens gates to Heaven', 'Grants temporary divine powers'],
      targetTypes: ['Demon Lords', 'Fallen Angels', 'Dark Gods', 'Primordial Evil', 'Satan\'s Minions'],
      destructionPower: 'Divine Intervention',
      holyLevel: 10,
      durability: 1000,
      requirements: ['Divine Champion', 'Archangel\'s Blessing', 'Level 50+', 'Defeated Demon Lord'],
      image: 'Divine codex with angel wings and celestial light, legendary grimoire written by Archangel Michael, ultimate holy scripture with heavenly power',
      inStock: 1,
      popularity: 100,
      monthAdded: 'December 2024',
      isNewThisMonth: true
    },

    // ADDITIONAL DESTROYER ITEMS - December 2024 NEW ADDITIONS
    {
      id: 'sanctified-salt',
      name: 'Sanctified Salt Circle',
      category: 'destroyer',
      rarity: 'Common',
      price: 100,
      currency: 'gold',
      description: 'Blessed salt that creates protective circles and barriers against evil spirits.',
      effects: ['Creates protective salt circles', 'Traps evil spirits', 'Prevents demon possession', 'Purifies haunted areas'],
      targetTypes: ['Ghosts', 'Spirits', 'Haunting Entities', 'Possessing Demons'],
      destructionPower: 'Containment & Protection',
      holyLevel: 1,
      durability: 20,
      image: 'Pouch of glowing blessed salt with protective properties, sacred salt for creating holy barriers, purification salt against spirits',
      inStock: 50,
      popularity: 70,
      monthAdded: 'December 2024',
      isNewThisMonth: true
    },
    {
      id: 'exorcism-bell',
      name: 'Bell of Exorcism',
      category: 'destroyer',
      rarity: 'Rare',
      price: 750,
      currency: 'gold',
      description: 'Sacred bell whose sound banishes evil spirits and disrupts dark magic.',
      effects: ['Banishes spirits with sound', 'Disrupts dark magic rituals', 'Calls divine assistance', 'Awakens possessed victims'],
      targetTypes: ['Possessing Spirits', 'Dark Mages', 'Ritual Demons', 'Curse Casters'],
      destructionPower: 'Sonic Banishment',
      holyLevel: 3,
      durability: 150,
      requirements: ['Bell Ringer Training', 'Musical Aptitude'],
      image: 'Ornate silver bell with holy engravings and divine sound waves, sacred exorcism bell with banishment power, blessed musical instrument',
      inStock: 10,
      popularity: 85,
      monthAdded: 'December 2024',
      isNewThisMonth: true
    },
    {
      id: 'blessed-incense',
      name: 'Divine Frankincense',
      category: 'destroyer',
      rarity: 'Rare',
      price: 500,
      currency: 'gold',
      description: 'Sacred incense that purifies the air and weakens demonic presence.',
      effects: ['Purifies atmosphere', 'Weakens demons in smoke area', 'Enhances prayer power', 'Reveals invisible evil'],
      targetTypes: ['Atmospheric Demons', 'Air Spirits', 'Invisible Entities', 'Cursed Auras'],
      destructionPower: 'Atmospheric Purification',
      holyLevel: 2,
      durability: 30,
      image: 'Golden incense burner with blessed frankincense smoke, sacred aromatic purification incense, divine atmosphere cleanser',
      inStock: 15,
      popularity: 79,
      monthAdded: 'December 2024',
      isNewThisMonth: true
    },
    {
      id: 'consecrated-oil',
      name: 'Consecrated Holy Oil',
      category: 'destroyer',
      rarity: 'Epic',
      price: 1800,
      currency: 'crystals',
      description: 'Sacred oil blessed by bishops, creates permanent holy barriers and destroys corruption.',
      effects: ['Creates permanent holy barriers', 'Anoints weapons with holy power', 'Heals corruption damage', 'Empowers exorcisms'],
      targetTypes: ['Corrupted Areas', 'Cursed Objects', 'Demon-Touched Items', 'Unholy Artifacts'],
      destructionPower: 'Corruption Destruction',
      holyLevel: 6,
      durability: 10,
      requirements: ['Bishop Blessing', 'Anointing Ceremony', 'Level 30+'],
      image: 'Crystal vial of glowing consecrated oil with divine blessing, sacred anointing oil with holy power, blessed liquid for corruption cleansing',
      inStock: 4,
      popularity: 93,
      monthAdded: 'December 2024',
      isNewThisMonth: true
    },
    {
      id: 'prayer-beads',
      name: 'Rosary of Banishment',
      category: 'destroyer',
      rarity: 'Rare',
      price: 650,
      currency: 'gold',
      description: 'Sacred rosary beads that automatically recite prayers and banish evil entities.',
      effects: ['Auto-casts banishment prayers', 'Provides constant protection', 'Strengthens faith-based attacks', 'Resists dark magic'],
      targetTypes: ['All Evil Entities', 'Dark Magic Users', 'Curse Casters', 'Demon Summoners'],
      destructionPower: 'Prayer Power',
      holyLevel: 3,
      durability: 200,
      requirements: ['Prayer Knowledge', 'Faith Level 2+'],
      image: 'Sacred rosary beads glowing with prayer energy, blessed prayer beads with divine protection, holy rosary for banishing evil',
      inStock: 12,
      popularity: 87,
      monthAdded: 'December 2024',
      isNewThisMonth: true
    },
    {
      id: 'holy-candle',
      name: 'Eternal Blessing Candle',
      category: 'destroyer',
      rarity: 'Common',
      price: 80,
      currency: 'gold',
      description: 'Blessed candle that never extinguishes and keeps evil at bay.',
      effects: ['Never extinguishes', 'Repels evil in light radius', 'Reveals hidden darkness', 'Provides constant blessing'],
      targetTypes: ['Shadow Creatures', 'Dark Spirits', 'Night Demons', 'Invisible Evil'],
      destructionPower: 'Light Barrier',
      holyLevel: 1,
      durability: 9999,
      image: 'Eternal blessed candle with never-dying flame, sacred candle with divine light, holy illumination against darkness',
      inStock: 35,
      popularity: 72,
      monthAdded: 'December 2024',
      isNewThisMonth: true
    }
  ];

  const allItems = [...potionItems, ...premiumMonsters, ...premiumItems];

  const getRealPriceFormatted = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  const handlePremiumPurchase = (item: ShopItem | PremiumPackage) => {
    setSelectedPaymentItem(item);
    setShowPaymentModal(true);
  };

  const processPayment = async () => {
    // This would integrate with Stripe for real payments
    alert('Payment processing... In a real app, this would connect to Stripe payment gateway.');
    
    // Simulate successful payment
    setTimeout(() => {
      alert('Payment successful! Premium item added to your account.');
      setShowPaymentModal(false);
      setSelectedPaymentItem(null);
    }, 2000);
  };

  const filteredItems = allItems.filter(item => {
    const categoryMatch = activeCategory === 'all' || 
      (activeCategory === 'potions' && item.category === 'potion') ||
      (activeCategory === 'weapons' && item.category === 'weapon') ||
      (activeCategory === 'armor' && item.category === 'armor') ||
      (activeCategory === 'destroyers' && item.category === 'destroyer') ||
      (activeCategory === 'monsters' && item.category === 'monster') ||
      (activeCategory === 'premium' && item.isPremium);
    
    const rarityMatch = selectedRarity === 'all' || item.rarity === selectedRarity;
    
    const searchMatch = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return categoryMatch && rarityMatch && searchMatch;
  });

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'from-gray-400 to-gray-600 border-gray-500';
      case 'Rare': return 'from-blue-400 to-blue-600 border-blue-500';
      case 'Epic': return 'from-purple-400 to-purple-600 border-purple-500';
      case 'Legendary': return 'from-orange-400 to-orange-600 border-orange-500';
      case 'Mythic': return 'from-pink-400 to-yellow-400 border-pink-500';
      default: return 'from-gray-400 to-gray-600 border-gray-500';
    }
  };

  const getCurrencyIcon = (currency: string) => {
    switch (currency) {
      case 'gold': return '🪙';
      case 'crystals': return '💎';
      case 'souls': return '👻';
      case 'usd': return '💵';
      default: return '💰';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'potion': return '🧪';
      case 'weapon': return '⚔️';
      case 'armor': return '🛡️';
      case 'destroyer': return '✝️';
      case 'monster': return '🐉';
      case 'premium': return '⭐';
      default: return '📦';
    }
  };

  const canAfford = (item: ShopItem) => {
    const totalCost = item.price * purchaseQuantity;
    switch (item.currency) {
      case 'gold': return playerInventory.gold >= totalCost;
      case 'crystals': return playerInventory.crystals >= totalCost;
      case 'souls': return playerInventory.souls >= totalCost;
      default: return false;
    }
  };

  const handlePurchase = (item: ShopItem) => {
    if (!canAfford(item)) {
      alert('Insufficient funds!');
      return;
    }

    const totalCost = item.price * purchaseQuantity;
    
    // Deduct currency
    setPlayerInventory(prev => {
      const newInventory = { ...prev };
      if (item.currency === 'gold') newInventory.gold -= totalCost;
      else if (item.currency === 'crystals') newInventory.crystals -= totalCost;
      else if (item.currency === 'souls') newInventory.souls -= totalCost;
      
      // Add to inventory
      if (item.category === 'potion') {
        newInventory.potions.push(...Array(purchaseQuantity).fill(item));
      } else if (item.category === 'weapon') {
        newInventory.weapons.push(...Array(purchaseQuantity).fill(item));
      } else if (item.category === 'armor') {
        newInventory.armor.push(...Array(purchaseQuantity).fill(item));
      } else if (item.category === 'destroyer') {
        newInventory.destroyers.push(...Array(purchaseQuantity).fill(item));
      }
      
      return newInventory;
    });

    alert(`Successfully purchased ${purchaseQuantity}x ${item.name}!`);
    setShowItemModal(false);
    setPurchaseQuantity(1);
  };

  return (
    <div className="min-h-screen bg-gray-950 pt-20 pb-24 relative overflow-hidden">
      {/* Payment Modal */}
      {showPaymentModal && selectedPaymentItem && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-gray-900 border-2 border-green-600 rounded-2xl p-6 max-w-sm w-full">
            <div className="text-center mb-4">
              <div className="text-3xl mb-2">💳</div>
              <h3 className="text-xl font-bold text-white mb-2">Secure Payment</h3>
              <p className="text-green-300 text-sm">Complete your purchase</p>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
              <div className="text-white font-bold text-lg mb-2">
                {'name' in selectedPaymentItem ? selectedPaymentItem.name : (selectedPaymentItem as ShopItem).name}
              </div>
              <div className="text-green-400 font-bold text-xl mb-2">
                {'price' in selectedPaymentItem 
                  ? getRealPriceFormatted(selectedPaymentItem.price)
                  : getRealPriceFormatted((selectedPaymentItem as ShopItem).realPrice || 0)
                }
              </div>
              <div className="text-gray-300 text-sm">
                {'description' in selectedPaymentItem ? selectedPaymentItem.description : (selectedPaymentItem as ShopItem).description}
              </div>
            </div>

            <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-3 mb-4">
              <div className="text-yellow-400 font-semibold text-sm mb-1">🔒 Secure Payment</div>
              <div className="text-gray-300 text-xs">
                Payment processed securely through Stripe. Your card information is never stored.
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <button
                onClick={processPayment}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
              >
                💳 Pay with Card
              </button>
              <button
                onClick={processPayment}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
              >
                📱 Pay with Apple Pay
              </button>
              <button
                onClick={processPayment}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold"
              >
                🎮 Pay with Google Pay
              </button>
            </div>

            <div className="text-center text-xs text-gray-400 mb-4">
              Secure SSL encryption • 30-day money back guarantee
            </div>

            <button
              onClick={() => setShowPaymentModal(false)}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Premium Packages Modal */}
      {showPremiumModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-gray-900 border-2 border-yellow-600 rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-4">
              <div className="text-3xl mb-2">⭐</div>
              <h3 className="text-2xl font-bold text-white mb-2">Premium Packages</h3>
              <p className="text-yellow-400 text-sm">Best value bundles with exclusive content</p>
            </div>

            <div className="space-y-4 mb-6">
              {premiumPackages.map((pack) => (
                <div key={pack.id} className={`border-2 rounded-xl p-4 ${pack.popular ? 'border-yellow-500 bg-yellow-900/20' : 'border-gray-700 bg-gray-800/50'}`}>
                  {pack.popular && (
                    <div className="bg-yellow-600 text-black px-3 py-1 rounded-full text-xs font-bold mb-3 inline-block animate-pulse">
                      🔥 MOST POPULAR
                    </div>
                  )}
                  
                  <div className="text-center mb-3">
                    <h4 className="text-white font-bold text-lg">{pack.name}</h4>
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <div className="text-green-400 font-bold text-2xl">{getRealPriceFormatted(pack.price)}</div>
                      {pack.originalPrice && (
                        <div className="text-gray-400 line-through text-lg">{getRealPriceFormatted(pack.originalPrice)}</div>
                      )}
                    </div>
                    <div className="text-yellow-400 text-sm font-semibold">{pack.value}</div>
                  </div>

                  <div className="mb-3">
                    <div className="text-gray-300 text-sm mb-2">{pack.description}</div>
                  </div>

                  <div className="space-y-2 mb-3">
                    <div className="text-white font-semibold text-sm">Package Contents:</div>
                    {pack.contents.map((item, index) => (
                      <div key={index} className="text-gray-300 text-sm flex items-start">
                        <span className="text-green-400 mr-2">•</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-green-900/30 border border-green-700 rounded-lg p-2 mb-3">
                    <div className="text-green-400 font-semibold text-sm">🎁 Bonus: {pack.bonus}</div>
                  </div>

                  <button
                    onClick={() => handlePremiumPurchase(pack)}
                    className={`w-full py-3 rounded-lg font-semibold ${
                      pack.popular 
                        ? 'bg-yellow-600 hover:bg-yellow-700 text-black' 
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    💳 Purchase Now
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowPremiumModal(false)}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="fixed top-0 w-full bg-black/40 backdrop-blur-md z-50 border-b border-purple-800/30">
        <div className="px-4 py-3 flex items-center justify-between">
          <Link href="/duel-monster-world" className="flex items-center">
            <i className="ri-arrow-left-line text-white text-xl mr-2"></i>
            <span className="text-white font-semibold">Premium Monster Shop</span>
          </Link>
          <div className="flex items-center space-x-3">
            <div className="text-yellow-400 text-sm">{playerInventory.gold} 🪙</div>
            <div className="text-blue-400 text-sm">{playerInventory.crystals} 💎</div>
            <div className="text-purple-400 text-sm">{playerInventory.souls} 👻</div>
            <button
              onClick={() => setShowPremiumModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse"
            >
              💳 Shop
            </button>
          </div>
        </div>
      </header>

      {/* Welcome Section with Premium Features */}
      <section className="pt-20 px-4 py-6 relative z-10">
        <div className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border-2 border-purple-500 rounded-2xl p-6 mb-6">
          <div className="text-center mb-4">
            <div className="text-4xl mb-3">🏪</div>
            <h1 className="text-2xl font-bold text-white mb-2">Premium Monster Shop</h1>
            <p className="text-gray-300 text-sm">Real Money Purchases • Exclusive Content • Instant Delivery</p>
            <div className="text-green-400 text-xs mt-2">
              💳 Secure payments powered by Stripe • 30-day money back guarantee
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-center mb-4">
            <div className="bg-green-900/30 rounded-lg p-3">
              <div className="text-2xl mb-1">⭐</div>
              <div className="text-green-400 font-semibold text-sm">Premium</div>
              <div className="text-gray-300 text-xs">{premiumItems.length + premiumMonsters.length} Exclusive</div>
            </div>
            <div className="bg-yellow-900/30 rounded-lg p-3">
              <div className="text-2xl mb-1">🎁</div>
              <div className="text-yellow-400 font-semibold text-sm">Packages</div>
              <div className="text-gray-300 text-xs">{premiumPackages.length} Value Bundles</div>
            </div>
          </div>

          <button
            onClick={() => setShowPremiumModal(true)}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3 rounded-lg font-bold text-lg animate-pulse"
          >
            💎 View Premium Packages
          </button>
        </div>
      </section>

      {/* Premium Features Highlight */}
      <section className="px-4 py-6 relative z-10">
        <div className="bg-gradient-to-r from-yellow-900/50 to-orange-900/50 border border-yellow-700 rounded-xl p-4 mb-6">
          <div className="text-center mb-4">
            <div className="text-3xl mb-2">💰</div>
            <h2 className="text-xl font-bold text-white">Real Money Exclusive Content</h2>
            <p className="text-yellow-400 text-sm">Only available through premium purchases</p>
          </div>
          
          <div className="space-y-3">
            <div className="bg-purple-800/30 rounded-lg p-3">
              <div className="text-purple-400 font-semibold text-sm mb-1">🐉 Legendary Monsters</div>
              <div className="text-gray-300 text-xs">
                Exclusive creatures with unique abilities - Phoenix, Void Dragon, Celestial Unicorn
              </div>
            </div>
            <div className="bg-blue-800/30 rounded-lg p-3">
              <div className="text-blue-400 font-semibold text-sm mb-1">⚔️ Mythic Weapons</div>
              <div className="text-gray-300 text-xs">
                Ultimate gear with game-changing effects - Master Summoner Staff, Infinite Items
              </div>
            </div>
            <div className="bg-green-800/30 rounded-lg p-3">
              <div className="text-green-400 font-semibold text-sm mb-1">⭐ VIP Benefits</div>
              <div className="text-gray-300 text-xs">
                Premium Battle Pass, VIP status, daily rewards, and exclusive bonuses
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter with Premium */}
      <section className="px-4 py-4 relative z-10">
        <div className="flex bg-gray-800/50 rounded-xl p-1 mb-4 overflow-x-auto">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
              activeCategory === 'all' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            All Items
          </button>
          <button
            onClick={() => setActiveCategory('premium')}
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
              activeCategory === 'premium' ? 'bg-green-600 text-white animate-pulse' : 'text-gray-400 hover:text-white'
            }`}
          >
            ⭐ Premium
          </button>
          <button
            onClick={() => setActiveCategory('monsters')}
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
              activeCategory === 'monsters' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            🐉 Monsters
          </button>
          <button
            onClick={() => setActiveCategory('weapons')}
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
              activeCategory === 'weapons' ? 'bg-orange-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            ⚔️ Weapons
          </button>
          <button
            onClick={() => setActiveCategory('potions')}
            className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
              activeCategory === 'potions' ? 'bg-red-600 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            🧪 Potions
          </button>
        </div>
      </section>

      {/* Items Grid with Premium Highlighting */}
      <section className="px-4 py-6 relative z-10 mb-20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-bold">
            {activeCategory === 'premium' ? '⭐ Premium Exclusive' :
             activeCategory === 'monsters' ? '🐉 Monster Collection' :
             activeCategory === 'all' ? 'All Items' : 'Shop Items'}
          </h2>
          <div className="text-gray-400 text-sm">{filteredItems.length} items</div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {filteredItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.isPremium) {
                  handlePremiumPurchase(item);
                } else {
                  setSelectedItem(item);
                  setShowItemModal(true);
                }
              }}
              className={`border-2 rounded-xl p-4 hover:scale-105 transition-all ${
                item.isPremium 
                  ? 'border-green-500 bg-green-900/30 shadow-lg shadow-green-500/20 animate-pulse' 
                  : 'border-gray-700 bg-gray-800/70 hover:border-purple-600'
              }`}
            >
              <div className="text-center mb-3">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-2xl">{getCategoryIcon(item.category)}</div>
                  {item.isPremium && (
                    <div className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-bold animate-bounce">
                      💰 PREMIUM
                    </div>
                  )}
                  {item.isNewThisMonth && !item.isPremium && (
                    <div className="bg-yellow-600 text-black px-1 py-0.5 rounded-full text-xs font-bold animate-pulse">
                      NEW!
                    </div>
                  )}
                </div>
                <div className="text-white font-semibold text-sm mb-1">{item.name}</div>
                <div className={`text-xs px-2 py-1 rounded-full border inline-block ${getRarityColor(item.rarity)}`}>
                  {item.rarity}
                </div>
              </div>

              <div 
                className="h-24 rounded-lg bg-cover bg-center mb-3 border-2 border-gray-600/50"
                style={{
                  backgroundImage: `url(https://readdy.ai/api/search-image?query=$%7Bitem.image%7D&width=120&height=96&seq=${item.id}-grid&orientation=landscape)`
                }}
              >
                <div className="w-full h-full bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
              </div>

              <div className="text-center mb-3">
                {item.currency === 'usd' ? (
                  <div className="text-green-400 font-bold text-lg">
                    💵 {getRealPriceFormatted(item.realPrice || 0)}
                  </div>
                ) : (
                  <div className="text-yellow-400 font-bold text-lg">
                    {item.price} {getCurrencyIcon(item.currency)}
                  </div>
                )}
                <div className="text-gray-400 text-xs">
                  {item.isPremium ? 'Premium Exclusive' : `Stock: ${item.inStock}`}
                </div>
              </div>

              <div className="bg-gray-700/50 rounded-lg p-2">
                <div className="text-gray-300 text-xs line-clamp-2">{item.description}</div>
              </div>

              {item.isPremium && (
                <div className="mt-2 bg-green-900/30 border border-green-700 rounded-lg p-2">
                  <div className="text-green-400 text-xs font-bold text-center">
                    🔒 Premium Content • Instant Delivery
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <div className="text-white font-bold text-lg mb-2">No Items Found</div>
            <div className="text-gray-400 text-sm">
              Try adjusting your search or filters
            </div>
          </div>
        )}
      </section>

      {/* Payment Security Notice */}
      <section className="px-4 py-6 relative z-10 mb-20">
        <div className="bg-gray-800/50 rounded-xl p-4">
          <h3 className="text-white font-bold mb-3">🔒 Secure Payment Information</h3>
          <div className="space-y-3">
            <div className="bg-green-900/30 border border-green-700 rounded-lg p-3">
              <div className="text-green-400 font-semibold text-sm mb-1">💳 Payment Security</div>
              <div className="text-gray-300 text-xs">
                All payments processed securely through Stripe with SSL encryption. Your card information is never stored on our servers.
              </div>
            </div>
            <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-3">
              <div className="text-blue-400 font-semibold text-sm mb-1">📱 Instant Delivery</div>
              <div className="text-gray-300 text-xs">
                Premium items and monsters are delivered instantly to your account after successful payment.
              </div>
            </div>
            <div className="bg-purple-900/30 border border-purple-700 rounded-lg p-3">
              <div className="text-purple-400 font-semibold text-sm mb-1">🛡️ Money Back Guarantee</div>
              <div className="text-gray-300 text-xs">
                30-day money back guarantee on all premium purchases if you're not completely satisfied.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}