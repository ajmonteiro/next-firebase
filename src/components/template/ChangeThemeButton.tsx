import { Theme } from '@/src/data/types'
import { MoonIcon, SunIcon } from '../icons'

interface ChangeThemeButtonProps {
  theme?: Theme
  changeTheme?: () => void
}

export default function ChangeThemeButton(props: ChangeThemeButtonProps) {
  return props.theme === 'dark' ? (
    <div
      onClick={props.changeTheme}
      className={`hidden sm:flex cursor-pointer items-center bg-gradient-to-r from-yellow-300 to-yellow-600 w-14 h-8 p-1 rounded-full`}
    >
      <div
        className={`flex items-center justify-center rounded-full bg-white text-yellow-600 w-6 h-6`}
      >
        {SunIcon('w-4 h-4')}
      </div>
    </div>
  ) : (
    <div
      onClick={props.changeTheme}
      className={`hidden sm:flex cursor-pointer items-center justify-end bg-gradient-to-r from-gray-500 to-gray-900 w-14 h-8 p-1 rounded-full`}
    >
      <div
        className={`flex items-center justify-center rounded-full bg-gray-900 text-gray-300 w-6 h-6`}
      >
        {MoonIcon('w-4 h-4')}
      </div>
    </div>
  )
}
