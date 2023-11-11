/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import Image from 'next/image'
import AuthInput from '../components/auth/AuthInput'
import { ExclamationIcon, GoogleIcon } from '../components/icons'
import useAuth from '../data/hook/useAuth'

export default function Auth() {
  const { user, googleLogin, login, register } = useAuth()

  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function showError(message: string, timeout = 5) {
    setError(message)

    setTimeout(() => {
      setError(null)
    }, timeout * 1000)
  }

  async function submit() {
    try {
      if (mode === 'login' && login) {
        await login(email, password)
      } else if (mode === 'register' && register) {
        await register(email, password)
      }
    } catch (e: any) {
      setError(e?.message ?? 'Unknown Error. Try again')
    }
  }

  return (
    <div className={`flex h-screen items-center justify-center`}>
      <div className={`hidden md:block md:w-1/2 lg:w-2/3`}>
        <img
          src="https://source.unsplash.com/random"
          alt="auth-image"
          className={`h-screen w-full object-cover`}
        />
      </div>
      <div className={`w-full md:w-1/2 m-10 lg:w-1/3`}>
        <h1 className={`text-3xl font-bold mb-5`}>
          {mode === 'login'
            ? 'Sign in with your account'
            : 'Register in the platform'}
        </h1>
        {error && (
          <div
            className={`flex items-center bg-red-400 text-white py-3 px-5 my-2 border border-red-700 rounded-lg`}
          >
            {ExclamationIcon}
            <span className={`ml-3`}>{error}</span>
          </div>
        )}
        <AuthInput
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          required
        />
        <AuthInput
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          required
        />
        <button
          className={`w-full bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg px-4 py-3 mt-6`}
          onClick={() => submit()}
        >
          {mode === 'login' ? 'Sign in' : 'Register'}
        </button>

        <hr className={`my-6 border-gray-300 w-full`} />

        <button
          className={`w-full bg-red-500 hover:bg-red-400 text-white rounded-lg px-4 py-3 mt-6 flex justify-center`}
          onClick={googleLogin}
        >
          {GoogleIcon}
        </button>

        {mode === 'login' ? (
          <p className={`mt-8`}>
            New here?
            <a
              onClick={() => setMode('register')}
              className={`pl-2 text-blue-500 hover:text-blue-700 font-semibold cursor-pointer`}
            >
              Create an account
            </a>
          </p>
        ) : (
          <p className={`mt-8`}>
            Already part of the community?
            <a
              onClick={() => setMode('login')}
              className={`pl-2 text-blue-500 hover:text-blue-700 font-semibold cursor-pointer`}
            >
              Sign in
            </a>
          </p>
        )}
      </div>
    </div>
  )
}
