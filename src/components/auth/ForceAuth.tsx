import Image from 'next/image'
import loadingImage from '../../../public/loading.gif'
import useAuth from '@/src/data/hook/useAuth'
import Router from 'next/router'
import Head from 'next/head'

interface ForceAuthProps {
  children: any
}

export default function ForceAuth(props: ForceAuthProps) {
  const { user, loading } = useAuth()

  function renderContent() {
    return props.children
  }

  function renderLoading() {
    return (
      <div className={`flex justify-center items-center h-screen`}>
        <Image src={loadingImage} alt={`loading`} />
      </div>
    )
  }

  if (!loading && user?.email) {
    return renderContent()
  } else if (loading) {
    return renderLoading()
  } else {
    Router.push('/auth')
    return null
  }
}
