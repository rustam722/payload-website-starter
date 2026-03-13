'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  CheckSquare,
  Megaphone,
  FileText,
  AlertTriangle,
  ChevronLeft,
  UtensilsCrossed,
} from 'lucide-react'
import { cn } from '@/utilities/ui'

const navItems = [
  {
    label: 'Дашборд',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Команда',
    href: '/team',
    icon: Users,
  },
  {
    label: 'Обучение',
    href: '/training',
    icon: BookOpen,
  },
  {
    label: 'Смены',
    href: '/shifts',
    icon: Calendar,
  },
  {
    label: 'Чек-листы',
    href: '/checklists',
    icon: CheckSquare,
  },
  {
    label: 'Объявления',
    href: '/announcements',
    icon: Megaphone,
  },
  {
    label: 'Документы',
    href: '/documents',
    icon: FileText,
  },
  {
    label: 'Инциденты',
    href: '/incidents',
    icon: AlertTriangle,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-200">
        <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
          <UtensilsCrossed className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="font-bold text-gray-900 leading-none">RestaurantOS</p>
          <p className="text-xs text-gray-500 mt-0.5">Управление командой</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href)
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-orange-50 text-orange-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
              )}
            >
              <Icon
                className={cn('w-5 h-5', isActive ? 'text-orange-600' : 'text-gray-400')}
              />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom links */}
      <div className="px-3 py-4 border-t border-gray-200 space-y-1">
        <Link
          href="/admin"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-400" />
          Панель администратора
        </Link>
      </div>
    </aside>
  )
}
