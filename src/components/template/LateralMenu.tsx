import useAuth from '@/src/data/hook/useAuth'
import {
  BellIcon,
  HomeIcon,
  LogoutIcon,
  SettingsIcon,
  UserIcon,
} from '../icons'
import Logo from './Logo'
import MenuItem from './MenuItem'

export default function LateralMenu() {
  const { logout } = useAuth()
  return (
    <aside
      className={`flex flex-col bg-gray-200 bg-text-gray-700 dark:bg-gray-900 `}
    >
      <div
        className={`
        flex flex-col items-center justify-center
      bg-gradient-to-r from-indigo-500 to-purple-800
      w-20 h-20`}
      >
        <Logo />
      </div>
      <ul className={`flex-grow`}>
        <MenuItem icon={HomeIcon} text={`Home`} url={`/`} />
        <MenuItem icon={SettingsIcon} text={`Settings`} url={`/settings`} />
        <MenuItem
          icon={BellIcon}
          text={`Notifications`}
          url={`/notifications`}
        />
      </ul>
      <ul>
        <MenuItem icon={UserIcon} text={`Profile`} url={`/profile`} />
        <MenuItem
          className={`text-red-600 dark:text-red-400 hover:bg-red-400 dark:hover:text-white hover:text-white`}
          icon={LogoutIcon}
          text={`Log out`}
          onClick={logout}
        />
      </ul>
    </aside>
  )
}
