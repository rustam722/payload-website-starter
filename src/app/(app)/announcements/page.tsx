import type { Metadata } from 'next'
import { Megaphone, Plus, Pin, AlertCircle } from 'lucide-react'

export const metadata: Metadata = { title: 'Объявления' }

const announcements = [
  {
    id: 1,
    title: 'Изменение меню с 1 апреля 2026',
    content:
      'С 1 апреля вводим новые позиции в меню. Пожалуйста, ознакомьтесь с новыми рецептурами в разделе "Документы". Обязательный курс по новым блюдам уже назначен всем сотрудникам кухни.',
    priority: 'high',
    isPinned: true,
    date: '13 марта 2026',
    author: 'Козлова Е.Д.',
    readCount: 18,
    totalCount: 24,
    department: 'Все',
  },
  {
    id: 2,
    title: 'Корпоратив в пятницу, 14 марта',
    content:
      'Приглашаем всю команду на небольшой праздник по случаю дня рождения нашего ресторана! Начало в 22:00 после закрытия. Не забудьте поздравить именинника!',
    priority: 'normal',
    isPinned: false,
    date: '12 марта 2026',
    author: 'Иванов А.В.',
    readCount: 24,
    totalCount: 24,
    department: 'Все',
  },
  {
    id: 3,
    title: 'Новые стандарты уборки кухни',
    content:
      'Добавлены новые требования к уборке оборудования. Обновлённые чек-листы уже активны в системе. Пожалуйста, ознакомьтесь с изменениями до начала следующей смены.',
    priority: 'normal',
    isPinned: false,
    date: '10 марта 2026',
    author: 'Козлова Е.Д.',
    readCount: 12,
    totalCount: 18,
    department: 'Кухня',
  },
  {
    id: 4,
    title: 'Срочно: проверка от Роспотребнадзора',
    content:
      'Завтра ожидается плановая проверка. Убедитесь, что все санитарные книжки в наличии, рабочие места в идеальном порядке. Чек-лист проверки прикреплён.',
    priority: 'urgent',
    isPinned: true,
    date: '09 марта 2026',
    author: 'Директор',
    readCount: 24,
    totalCount: 24,
    department: 'Все',
  },
]

const priorityConfig: Record<string, { label: string; color: string; icon: string }> = {
  urgent: { label: 'Срочно', color: 'bg-red-100 text-red-700 border-red-200', icon: '🚨' },
  high: { label: 'Важно', color: 'bg-orange-100 text-orange-700 border-orange-200', icon: '⚠️' },
  normal: { label: 'Обычное', color: 'bg-gray-100 text-gray-600 border-gray-200', icon: '📢' },
}

export default function AnnouncementsPage() {
  const pinned = announcements.filter((a) => a.isPinned)
  const regular = announcements.filter((a) => !a.isPinned)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Объявления</h1>
          <p className="text-gray-500 mt-1">{announcements.length} объявления</p>
        </div>
        <a
          href="/announcements/new"
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Создать объявление
        </a>
      </div>

      {/* Pinned */}
      {pinned.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Pin className="w-4 h-4 text-gray-400" />
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Закреплённые
            </h2>
          </div>
          <div className="space-y-3">
            {pinned.map((ann) => {
              const priority = priorityConfig[ann.priority] ?? priorityConfig.normal
              return (
                <div
                  key={ann.id}
                  className={`bg-white border rounded-xl p-5 ${ann.priority === 'urgent' ? 'border-red-200' : 'border-gray-200'}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <span className="text-xl flex-shrink-0">{priority.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-gray-900">{ann.title}</h3>
                          <span
                            className={`text-xs font-medium px-2 py-0.5 rounded-full border ${priority.color}`}
                          >
                            {priority.label}
                          </span>
                          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                            {ann.department}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-2 leading-relaxed">{ann.content}</p>
                        <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                          <span>{ann.author}</span>
                          <span>{ann.date}</span>
                          <span className="flex items-center gap-1">
                            👁️ {ann.readCount}/{ann.totalCount} прочитали
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Regular */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Все объявления
        </h2>
        <div className="space-y-3">
          {regular.map((ann) => {
            const priority = priorityConfig[ann.priority] ?? priorityConfig.normal
            return (
              <div
                key={ann.id}
                className="bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <span className="text-xl flex-shrink-0">{priority.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-gray-900">{ann.title}</h3>
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                        {ann.department}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{ann.content}</p>
                    <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                      <span>{ann.author}</span>
                      <span>{ann.date}</span>
                      <span>👁️ {ann.readCount}/{ann.totalCount}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
