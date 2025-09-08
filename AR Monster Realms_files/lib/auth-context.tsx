
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase, UserProfile } from './supabase'

interface AuthContextType {
  user: User | null
  session: Session | null
  profile: UserProfile | null
  loading: boolean
  signUp: (email: string, password: string, username: string) => Promise<any>
  signIn: (email: string, password: string) => Promise<any>
  signOut: () => Promise<any>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  profile: null,
  loading: true,
  signUp: async () => {},
  signIn: async () => {},
  signOut: async () => {}
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const initializeAuth = async () => {
      try {
        // Get initial session
        const { data: { session } } = await supabase.auth.getSession()
        
        if (isMounted) {
          setSession(session)
          setUser(session?.user ?? null)
          
          if (session?.user) {
            await fetchProfile(session.user.id)
          } else {
            setLoading(false)
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error)
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    initializeAuth()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!isMounted) return

      console.log('Auth state changed:', event, session?.user?.id)
      
      setSession(session)
      setUser(session?.user ?? null)
      
      if (event === 'SIGNED_IN' && session?.user) {
        await fetchProfile(session.user.id)
      } else if (event === 'SIGNED_OUT') {
        setProfile(null)
        setLoading(false)
      }
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [])

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error)
      } else if (data) {
        setProfile(data)
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const signUpHandler = async (email: string, password: string, username: string) => {
    try {
      setLoading(true)
      
      // First check if username already exists
      const { data: existingUser } = await supabase
        .from('user_profiles')
        .select('username')
        .eq('username', username.trim())
        .single()

      if (existingUser) {
        return { data: null, error: { message: 'Username already taken' } }
      }

      // Sign up the user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      })
      
      if (authError) {
        console.error('Auth signup error:', authError)
        return { data: authData, error: authError }
      }
      
      if (authData.user && !authData.session) {
        // Email confirmation required
        return { 
          data: authData, 
          error: null, 
          message: 'Please check your email to confirm your account' 
        }
      }
      
      if (authData.user && authData.session) {
        console.log('User created with session, creating profile...')
        
        try {
          // Create user profile
          const { data: profileData, error: profileError } = await supabase
            .from('user_profiles')
            .insert({
              id: authData.user.id,
              username: username.trim(),
              level: 1,
              experience: 0,
              total_monsters_captured: 0,
              favorite_world: 'ghost',
              card_inventory: 20
            })
            .select()
            .single()
          
          if (profileError) {
            console.error('Profile creation error:', profileError)
            return { data: authData, error: { message: `Profile creation failed: ${profileError.message}` } }
          }

          console.log('Profile created successfully:', profileData)

          // Give starter blank cards
          const starterCards = [
            ...Array(15).fill(null).map(() => ({
              user_id: authData.user.id,
              card_type: 'Basic',
              rarity: 'Common',
              capture_rate: 45
            })),
            ...Array(3).fill(null).map(() => ({
              user_id: authData.user.id,
              card_type: 'Enhanced',
              rarity: 'Rare',
              capture_rate: 65
            })),
            ...Array(2).fill(null).map(() => ({
              user_id: authData.user.id,
              card_type: 'Master',
              rarity: 'Epic',
              capture_rate: 85
            }))
          ]

          const { error: cardsError } = await supabase
            .from('blank_cards')
            .insert(starterCards)

          if (cardsError) {
            console.error('Error creating starter cards:', cardsError)
          }

          console.log('Signup process completed successfully')
          
        } catch (profileError: any) {
          console.error('Profile creation exception:', profileError)
          return { data: authData, error: { message: 'Failed to create user profile' } }
        }
      }
      
      return { data: authData, error: null }
    } catch (error: any) {
      console.error('Signup handler exception:', error)
      return { data: null, error: { message: 'Signup failed' } }
    } finally {
      setLoading(false)
    }
  }

  const signInHandler = async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    })
  }

  const signOutHandler = async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  }

  const value = {
    user,
    session,
    profile,
    loading,
    signUp: signUpHandler,
    signIn: signInHandler,
    signOut: signOutHandler,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
