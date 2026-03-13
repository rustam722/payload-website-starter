import type { Metadata } from 'next'
import { CheckSquare, Plus, Clock, CheckCircle, AlertCircle } from 'lucide-react'

export const metadata: Metadata = { title: 'Чек-листы' }

const checklists = [
  {
    id: 1,
    title: 'Открытие кухни',
    type: 'opening',
    typeLabel: 'Открытие',
    typeColor: 'bg-green-100 text-green-700',
    department: 'Кухня',
    itemsCount: 12,
    estimatedTime: 20,
    todayStatus: 'completed',
    completedBy: 'Иванов И.И.',
    completedAt: '09:15',
  },
  {
    id: 2,
    title: 'Открытие зала',
    type: 'opening',
    typeLabel: 'Открытие',
    typeColor: 'bg-green-100 text-green-700',
    department: 'Зал',
    itemsCount: 8,
    estimatedTime: 15,
    todayStatus: 'completed',
    completedBy: 'Петрова А.С.',
    completedAt: '09:30',
  },
  {
    id: 3,
    title: 'Ежедневная уборка зала',
    type: 'cleaning',
    typeLabel: 'Уборка',
    typeColor: 'bg-blue-100 text-blue-700',
    department: 'Зал',
    itemsCount: 15,
    estimatedTime: 30,
    todayStatus: 'in_progress',
    completedBy: null,
    completedAt: null,
  },
  {
    id: 4,
    title: 'Закрытие кухни',
    type: 'closing',
    typeLabel: 'Закрытие',
    typeColor: 'bg-purple-100 text-purple-700',
    department: 'Кухня',
    itemsCount: 18,
    estimatedTime: 25,
    todayStatus: 'pending',
    completedBy: null,
    completedAt: null,
  },
  {
    id: 5,
    title: 'Проверка холодового оборудования',
    type: 'safety',
    typeLabel: 'Безопасность',
    typeColor: 'bg-red-100 text-red-700',
    department: 'Кухня',
    itemsCount: 6,
    estimatedTime: 10,
    todayStatus: 'pending',
    completedBy: null,
    completedAt: null,
  },
]

const statusConfig = {
  completed: {
    icon: CheckCircle,
    label: 'Выполнено',
    color: 'text-green-600',
    bg: 'bg-green-50',
  },
  in_progress: {
    icon: Clock,
    label: 'В процессе',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
  },
  pending: { icon: AlertCircle, label: 'Ожидает', color: 'text-gray-400', bg: 'bg-gray-50' },
}

export default function ChecklistsPage() {
  const completedCount = checklists.filter((c) => c.todayStatus === 'completed').length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Чек-листы</h1>
          <p className="text-gray-500 mt-1">
            Сегодня выполнено: {completedCount} из {checklists.length}
          </p>
        </div>
        <a
          href="/checklists/new"
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Создать чек-лист
        </a>
      </div>

      {/* Progress bar */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Прогресс за сегодня</span>
          <span className="text-sm font-bold text-gray-900">
            {Math.round((completedCount / checklists.length) * 100)}%
          </span>
        </div>
        <div className="bg-gray-100 rounded-full h-3">
          <div
            className="bg-green-500 h-3 rounded-full transition-all"
            style={{ width: `${(completedCount / checklists.length) * 100}%` }}
          />
        </div>
        <div className="flex gap-4 mt-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            Выполнено: {completedCount}
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-orange-400 rounded-full" />
            В процессе: {checklists.filter((c) => c.todayStatus === 'in_progress').length}
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-gray-300 rounded-full" />
            Ожидает: {checklists.filter((c) => c.todayStatus === 'pending').length}
          </span>
        </div>
      </div>

      {/* Checklists */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {checklists.map((checklist) => {
          const status = statusConfig[checklist.todayStatus as keyof typeof statusConfig]
          const StatusIcon = status.icon

          return (
            <div
              key={checklist.id}
              className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900">{checklist.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${checklist.typeColor}`}
                    >
                      {checklist.typeLabel}
                    </span>
                    <span className="text-xs text-gray-400">{checklist.department}</span>
                  </div>
                </div>
                <div className={`p-2 rounded-lg ${status.bg}`}>
                  <StatusIcon className={`w-5 h-5 ${status.color}`} />
                </div>
              </div>

              <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <CheckSquare className="w-4 h-4" />
                  <span>{checklist.itemsCount} пунктов</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>~{checklist.estimatedTime} мин</span>
                </div>
              </div>

              {checklist.todayStatus === 'completed' && (
                <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2 text-xs text-green-600">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>
                    Выполнил {checklist.completedBy} в {checklist.completedAt}
                  </span>
                </div>
              )}

              {checklist.todayStatus !== 'completed' && (
                <div className="mt-3">
                  <a
                    href={`/checklists/${checklist.id}/complete`}
                    className={`w-full text-center block py-2 rounded-lg text-sm font-medium transition-colors ${
                      checklist.todayStatus === 'in_progress'
                        ? 'bg-orange-500 text-white hover:bg-orange-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {checklist.todayStatus === 'in_progress' ? 'Продолжить' : 'Начать'}
                  </a>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
