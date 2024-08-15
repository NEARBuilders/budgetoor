import type { Metadata } from 'next'

import '../../designSystem/style/landing.scss'

export const metadata: Metadata = {
  title: 'Welcome',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
