import { createContext, useEffect, useState } from 'react'
import { Theme } from '../types'

interface AppContextProps {
  theme?: Theme
  changeTheme?: () => void
}

const AppContext = createContext<AppContextProps>({})

interface AppProviderProps {
  children: any
}

export function AppProvider(props: AppProviderProps) {
  const [theme, setTheme] = useState<Theme>('dark')

  function changeTheme() {
    const newTheme = theme === '' ? 'dark' : ''
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  useEffect(() => {
    const themeLocalStorage = localStorage.getItem('theme') as Theme | null
    setTheme(themeLocalStorage ?? '')
  }, [])

  return (
    <AppContext.Provider value={{ theme, changeTheme }}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContext
