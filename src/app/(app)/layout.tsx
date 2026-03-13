import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../(frontend)/globals.css'
import { AppSidebar } from '@/components/app/AppSidebar'
import { AppHeader } from '@/components/app/AppHeader'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: {
    template: '%s | RestaurantOS',
    default: 'RestaurantOS — Управление командой',
  },
  description: 'Платформа для управления командой, обучения и контроля смен',
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={inter.className}>
      <body className="bg-gray-50 text-gray-900">
        <div className="flex h-screen overflow-hidden">
          <AppSidebar />
          <div className="flex flex-col flex-1 overflow-hidden">
            <AppHeader />
            <main className="flex-1 overflow-y-auto p-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  )
}
