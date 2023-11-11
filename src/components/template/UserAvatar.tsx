/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { UserIcon } from '../icons'
import useAuth from '@/src/data/hook/useAuth'

interface UserAvatarProps {
  className?: string
}

export default function UserAvatar(props: UserAvatarProps) {
  const { user } = useAuth()

  return (
    <Link href={`/profile`}>
      {user?.imageUrl ? (
        <img
          src={user.imageUrl}
          alt="user-avatar"
          className={`${props.className} w-10 h-10 rounded-full`}
        />
      ) : (
        <div
          className={`bg-gradient-to-r from-blue-400 to-blue-600 p-2 cursor-pointer rounded-full ${props.className}`}
        >
          {UserIcon}
        </div>
      )}
    </Link>
  )
}
