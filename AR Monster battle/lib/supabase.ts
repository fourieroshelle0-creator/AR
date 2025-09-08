import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface Monster {
  id: string
  name: string
  element: string
  type: string
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary'
  power: number
  defense: number
  base_level: number
  abilities: string[]
  description: string
  evolution_chain: string[]
  world_type: 'ghost' | 'monster' | 'myth' | 'alien'
  spawn_locations: string[]
  capture_difficulty: number
  image_url?: string
  sound_profile: {
    voiceType: string
    volume: string
    battleCries: string[]
    idleSounds: string[]
  }
  created_at: string
}

export interface UserMonster {
  id: string
  user_id: string
  monster_id: string
  level: number
  experience: number
  bond_level: number
  is_in_battle_deck: boolean
  nickname?: string
  captured_at: string
  capture_location?: string
  evolution_stage: number
  custom_stats?: any
  monster?: Monster
}

export interface UserProfile {
  id: string
  username: string
  level: number
  experience: number
  total_monsters_captured: number
  favorite_world: string
  guild_id?: string
  created_at: string
  updated_at: string
}

export interface BlankCard {
  id: string
  user_id: string
  card_type: 'Basic' | 'Enhanced' | 'Master' | 'Divine'
  rarity: string
  capture_rate: number
  is_used: boolean
  monster_captured?: string
  obtained_at: string
}

export interface WorldEvent {
  id: string
  name: string
  description: string
  event_type: string
  world_type: string
  start_time: string
  end_time: string
  rewards: any
  participants: number
  is_active: boolean
  boss_data?: any
}

export interface Battle {
  id: string
  player1_id: string
  player2_id: string
  winner_id?: string
  battle_type: 'pvp' | 'pve' | 'guild_war' | 'event'
  battle_data: any
  rewards?: any
  started_at: string
  ended_at?: string
  location_lat?: number
  location_lng?: number
}

// Auth helpers
export const signUp = async (email: string, password: string, username: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
  
  if (data.user && !error) {
    // Create user profile
    const { error: profileError } = await supabase
      .from('user_profiles')
      .insert({
        id: data.user.id,
        username,
        level: 1,
        experience: 0,
        total_monsters_captured: 0,
        favorite_world: 'ghost'
      })
    
    if (profileError) {
      console.error('Error creating profile:', profileError)
    }
  }
  
  return { data, error }
}

export const signIn = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  })
}

export const signOut = async () => {
  return await supabase.auth.signOut()
}

// Monster management
export const getUserMonsters = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_monsters')
    .select(`
      *,
      monster:monsters(*)
    `)
    .eq('user_id', userId)
    .order('captured_at', { ascending: false })
  
  return { data, error }
}

export const captureMonster = async (userId: string, monsterId: string, cardId: string, captureLocation: string) => {
  // First, mark the blank card as used
  const { error: cardError } = await supabase
    .from('blank_cards')
    .update({ 
      is_used: true, 
      monster_captured: monsterId 
    })
    .eq('id', cardId)
    .eq('user_id', userId)
  
  if (cardError) return { data: null, error: cardError }
  
  // Then add monster to user's collection
  const { data, error } = await supabase
    .from('user_monsters')
    .insert({
      user_id: userId,
      monster_id: monsterId,
      level: 1,
      experience: 0,
      bond_level: 0,
      capture_location: captureLocation
    })
    .select()
  
  if (!error && data) {
    // Update user's monster count
    await supabase.rpc('increment_monster_count', { user_uuid: userId })
  }
  
  return { data, error }
}

export const getAllMonsters = async () => {
  const { data, error } = await supabase
    .from('monsters')
    .select('*')
    .order('name')
  
  return { data, error }
}

export const getActiveWorldEvents = async () => {
  const { data, error } = await supabase
    .from('world_events')
    .select('*')
    .eq('is_active', true)
    .gte('end_time', new Date().toISOString())
    .order('start_time')
  
  return { data, error }
}

export const getUserBlankCards = async (userId: string) => {
  const { data, error } = await supabase
    .from('blank_cards')
    .select('*')
    .eq('user_id', userId)
    .eq('is_used', false)
    .order('obtained_at', { ascending: false })
  
  return { data, error }
}

export const createBattle = async (battleData: Partial<Battle>) => {
  const { data, error } = await supabase
    .from('battles')
    .insert(battleData)
    .select()
  
  return { data, error }
}

// Real-time subscriptions
export const subscribeToWorldEvents = (callback: (payload: any) => void) => {
  return supabase
    .channel('world_events')
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'world_events' }, 
      callback
    )
    .subscribe()
}

export const subscribeToUserMonsters = (userId: string, callback: (payload: any) => void) => {
  return supabase
    .channel('user_monsters')
    .on('postgres_changes', 
      { 
        event: '*', 
        schema: 'public', 
        table: 'user_monsters',
        filter: `user_id=eq.${userId}`
      }, 
      callback
    )
    .subscribe()
}

export const subscribeToBattles = (userId: string, callback: (payload: any) => void) => {
  return supabase
    .channel('battles')
    .on('postgres_changes', 
      { 
        event: '*', 
        schema: 'public', 
        table: 'battles',
        filter: `player1_id=eq.${userId},player2_id=eq.${userId}`
      }, 
      callback
    )
    .subscribe()
}