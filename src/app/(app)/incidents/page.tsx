import type { Metadata } from 'next'
import { AlertTriangle, Plus, Clock, CheckCircle } from 'lucide-react'

export const metadata: Metadata = { title: 'Инциденты' }

const incidents = [
  {
    id: 1,
    title: 'Сломан холодильник на кухне №2',
    type: 'equipment',
    typeLabel: 'Оборудование',
    severity: 'high',
    severityLabel: 'Высокая',
    status: 'in_progress',
    statusLabel: 'В работе',
    date: '13 мар 2026, 11:30',
    reportedBy: 'Иванов И.И.',
    description: 'Не держит температуру ниже 8°C. Продукты перемещены в запасной холодильник.',
  },
  {
    id: 2,
    title: 'Жалоба гостя на время ожидания',
    type: 'complaint',
    typeLabel: 'Жалоба',
    severity: 'medium',
    severityLabel: 'Средняя',
    status: 'resolved',
    statusLabel: 'Решён',
    date: '12 мар 2026, 19:45',
    reportedBy: 'Петрова А.С.',
    description: 'Гость ждал основное блюдо 45 минут. Предложили комплимент, принесли извинения.',
  },
  {
    id: 3,
    title: 'Порез сотрудника на кухне',
    type: 'accident',
    typeLabel: 'Несчастный случай',
    severity: 'low',
    severityLabel: 'Низкая',
    status: 'closed',
    statusLabel: 'Закрыт',
    date: '11 мар 2026, 14:20',
    reportedBy: 'Сидоров М.Ю.',
    description: 'Небольшой порез пальца при работе с ножом. Оказана первая помощь на месте.',
  },
]

const severityConfig = {
  critical: { label: 'Критическая', color: 'bg-red-600 text-white' },
  high: { label: 'Высокая', color: 'bg-red-100 text-red-700' },
  medium: { label: 'Средняя', color: 'bg-orange-100 text-orange-700' },
  low: { label: 'Низкая', color: 'bg-green-100 text-green-700' },
}

const statusConfig = {
  open: { label: 'Открыт', color: 'text-red-600', bg: 'bg-red-50' },
  in_progress: { label: 'В работе', color: 'text-orange-600', bg: 'bg-orange-50' },
  resolved: { label: 'Решён', color: 'text-blue-600', bg: 'bg-blue-50' },
  closed: { label: 'Закрыт', color: 'text-gray-500', bg: 'bg-gray-50' },
}

const typeLabels: Record<string, string> = {
  accident: '🤕 Несчастный случай',
  complaint: '💬 Жалоба гостя',
  quality: '🍽️ Качество',
  equipment: '🔧 Оборудование',
  standard: '📋 Нарушение стандартов',
  theft: '🔒 Кража',
  other: '📝 Другое',
}

export default function IncidentsPage() {
  const openCount = incidents.filter((i) => i.status === 'open' || i.status === 'in_progress').length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Журнал инцидентов</h1>
          <p className="text-gray-500 mt-1">{openCount} открытых инцидентов</p>
        </div>
        <a
          href="/incidents/new"
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Сообщить об инциденте
        </a>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Открытых', value: '1', color: 'text-red-600' },
          { label: 'В работе', value: '1', color: 'text-orange-600' },
          { label: 'Решено за месяц', value: '5', color: 'text-blue-600' },
          { label: 'Закрыто за месяц', value: '7', color: 'text-gray-500' },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-sm text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Incidents list */}
      <div className="space-y-3">
        {incidents.map((incident) => {
          const severity =
            severityConfig[incident.severity as keyof typeof severityConfig] ??
            severityConfig.low
          const status =
            statusConfig[incident.status as keyof typeof statusConfig] ?? statusConfig.open

          return (
            <div
              key={incident.id}
              className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 bg-red-50 rounded-lg flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-semibold text-gray-900">{incident.title}</h3>
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${status.bg} ${status.color}`}
                    >
                      {status.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-sm text-gray-500">{typeLabels[incident.type]}</span>
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${severity.color}`}
                    >
                      {severity.label}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mt-2">{incident.description}</p>

                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{incident.date}</span>
                    </div>
                    <span>Сообщил: {incident.reportedBy}</span>
                  </div>
                </div>
              </div>

              {(incident.status === 'open' || incident.status === 'in_progress') && (
                <div className="mt-4 flex gap-2">
                  <a
                    href={`/incidents/${incident.id}`}
                    className="flex-1 text-center py-2 bg-orange-50 text-orange-700 rounded-lg text-sm font-medium hover:bg-orange-100 transition-colors"
                  >
                    Обработать
                  </a>
                  <button className="flex-1 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors flex items-center justify-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    Отметить решённым
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
