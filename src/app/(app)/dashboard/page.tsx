import type { Metadata } from 'next'
import {
  Users,
  BookOpen,
  Calendar,
  AlertTriangle,
  TrendingUp,
  CheckCircle,
  Clock,
  XCircle,
} from 'lucide-react'

export const metadata: Metadata = { title: 'Дашборд' }

const stats = [
  {
    label: 'Сотрудников',
    value: '24',
    change: '+2 за месяц',
    icon: Users,
    color: 'blue',
  },
  {
    label: 'Курсов пройдено',
    value: '87%',
    change: '+5% за месяц',
    icon: BookOpen,
    color: 'green',
  },
  {
    label: 'Смен сегодня',
    value: '3',
    change: '12 человек на работе',
    icon: Calendar,
    color: 'orange',
  },
  {
    label: 'Открытых инцидентов',
    value: '2',
    change: '-1 за неделю',
    icon: AlertTriangle,
    color: 'red',
  },
]

const colorMap = {
  blue: 'bg-blue-50 text-blue-600',
  green: 'bg-green-50 text-green-600',
  orange: 'bg-orange-50 text-orange-600',
  red: 'bg-red-50 text-red-600',
}

const todayShifts = [
  { name: 'Утренняя смена', time: '09:00 – 17:00', staff: 5, status: 'completed' },
  { name: 'Дневная смена', time: '12:00 – 20:00', staff: 4, status: 'active' },
  { name: 'Вечерняя смена', time: '17:00 – 23:00', staff: 3, status: 'upcoming' },
]

const overdueTraining = [
  { name: 'Иванов И.И.', course: 'Санитарные нормы', daysOverdue: 5 },
  { name: 'Петров А.С.', course: 'Стандарты сервиса', daysOverdue: 3 },
  { name: 'Сидорова М.В.', course: 'Меню 2024', daysOverdue: 1 },
]

const recentAnnouncements = [
  { title: 'Изменение меню с 1 апреля', priority: 'high', date: '13 мар' },
  { title: 'Корпоратив в пятницу', priority: 'normal', date: '12 мар' },
  { title: 'Новые стандарты уборки', priority: 'normal', date: '10 мар' },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Дашборд</h1>
        <p className="text-gray-500 mt-1">Обзор ресторана за сегодня, 13 марта 2026</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          const colorClass = colorMap[stat.color as keyof typeof colorMap]
          return (
            <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {stat.change}
                  </p>
                </div>
                <div className={`p-2.5 rounded-lg ${colorClass}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Two column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's shifts */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Смены сегодня</h2>
            <a href="/shifts" className="text-sm text-orange-600 hover:underline">
              Все смены →
            </a>
          </div>
          <div className="space-y-3">
            {todayShifts.map((shift) => (
              <div
                key={shift.name}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      shift.status === 'active'
                        ? 'bg-green-500'
                        : shift.status === 'completed'
                          ? 'bg-gray-400'
                          : 'bg-orange-400'
                    }`}
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{shift.name}</p>
                    <p className="text-xs text-gray-500">{shift.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{shift.staff}</span>
                  {shift.status === 'active' && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                      Идёт
                    </span>
                  )}
                  {shift.status === 'completed' && (
                    <CheckCircle className="w-4 h-4 text-gray-400" />
                  )}
                  {shift.status === 'upcoming' && (
                    <Clock className="w-4 h-4 text-orange-400" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Overdue training */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Просрочено обучение</h2>
            <a href="/training" className="text-sm text-orange-600 hover:underline">
              Все курсы →
            </a>
          </div>
          {overdueTraining.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <CheckCircle className="w-10 h-10 mx-auto mb-2 text-green-400" />
              <p className="text-sm">Все курсы пройдены вовремя!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {overdueTraining.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between p-3 rounded-lg bg-red-50"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.course}</p>
                  </div>
                  <div className="flex items-center gap-1 text-red-600">
                    <XCircle className="w-4 h-4" />
                    <span className="text-xs font-medium">+{item.daysOverdue}д</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent announcements */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Объявления</h2>
            <a href="/announcements" className="text-sm text-orange-600 hover:underline">
              Все →
            </a>
          </div>
          <div className="space-y-3">
            {recentAnnouncements.map((ann) => (
              <div key={ann.title} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                <div
                  className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                    ann.priority === 'high' ? 'bg-orange-500' : 'bg-gray-300'
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{ann.title}</p>
                  <p className="text-xs text-gray-400">{ann.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-900 mb-4">Быстрые действия</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Создать смену', href: '/shifts/new', icon: Calendar, color: 'orange' },
              { label: 'Добавить сотрудника', href: '/team/new', icon: Users, color: 'blue' },
              {
                label: 'Назначить курс',
                href: '/training/assign',
                icon: BookOpen,
                color: 'green',
              },
              {
                label: 'Сообщить об инциденте',
                href: '/incidents/new',
                icon: AlertTriangle,
                color: 'red',
              },
            ].map((action) => {
              const Icon = action.icon
              const colorClass = colorMap[action.color as keyof typeof colorMap]
              return (
                <a
                  key={action.label}
                  href={action.href}
                  className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-colors group"
                >
                  <div className={`p-2 rounded-lg ${colorClass}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-orange-700">
                    {action.label}
                  </span>
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
