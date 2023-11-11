/* eslint-disable react-hooks/exhaustive-deps */
import route from 'next/router'
import { createContext, useEffect, useState } from 'react'
import firebase from '../../firebase/config'
import User from '@/src/model/User'
import Cookies from 'js-cookie'

interface AuthContextProps {
  user?: User | null
  googleLogin?: () => Promise<void>
  login?: (email: string, password: string) => Promise<void>
  register?: (email: string, password: string) => Promise<void>
  logout?: () => Promise<void>
  loading?: boolean
}

const AuthContext = createContext<AuthContextProps>({})

function manageCookie(loggedIn: boolean) {
  if (loggedIn) {
    Cookies.set('admin-template-auth', `${loggedIn}`, {
      expires: 7,
    })
  } else {
    Cookies.remove('admin-template-auth')
  }
}

async function normalizedUser(firebaseUser: firebase.User): Promise<User> {
  const token = await firebaseUser.getIdToken()

  return {
    uid: firebaseUser.uid,
    name: firebaseUser.displayName || '',
    email: firebaseUser.email || '',
    token,
    provider: firebaseUser.providerData[0]?.providerId || '',
    imageUrl: firebaseUser.photoURL || '',
  }
}

interface AuthProviderProps {
  children: any
}

export function AuthProvider(props: AuthProviderProps) {
  const [loading, setLoading] = useState<boolean>(true)
  const [user, setUser] = useState<User | null>(null)

  async function configureSession(firebaseUser: firebase.User | null) {
    if (firebaseUser?.email) {
      const user = await normalizedUser(firebaseUser)
      setUser(user)
      manageCookie(true)
      setLoading(false)

      return user.email
    } else {
      manageCookie(false)
      setUser(null)
      setLoading(false)

      return false
    }
  }

  async function googleLogin() {
    try {
      setLoading(true)
      const response = await firebase
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())

      if (response.user) {
        await configureSession(response.user)
        route.push('/')
      }
    } finally {
      setLoading(false)
    }
  }

  async function login(email: string, password: string) {
    try {
      setLoading(true)
      const response = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)

      if (response.user) {
        await configureSession(response.user)
        route.push('/')
      }
    } finally {
      setLoading(false)
    }
  }

  async function register(email: string, password: string) {
    try {
      setLoading(true)
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)

      if (response.user) {
        await configureSession(response.user)
        route.push('/')
      }
    } finally {
      setLoading(false)
    }
  }

  async function logout() {
    try {
      setLoading(true)
      await firebase.auth().signOut()
      await configureSession(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (Cookies.get('admin-template-auth')) {
      const cancelObserver = firebase.auth().onIdTokenChanged(configureSession)
      return () => cancelObserver()
    } else {
      setLoading(false)
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        googleLogin,
        login,
        register,
        logout,
        loading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext
