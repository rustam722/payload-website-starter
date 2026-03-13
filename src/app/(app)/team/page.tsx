import type { Metadata } from 'next'
import { Users, Plus, Search, Filter, Star, Clock, AlertCircle } from 'lucide-react'

export const metadata: Metadata = { title: 'Команда' }

const employees = [
  {
    id: 1,
    name: 'Иванов Иван Иванович',
    position: 'Шеф-повар',
    department: 'Кухня',
    status: 'active',
    avatar: 'ИИ',
    hireDate: '15.03.2022',
    trainingProgress: 95,
    shiftsThisMonth: 18,
  },
  {
    id: 2,
    name: 'Петрова Анна Сергеевна',
    position: 'Официант',
    department: 'Зал',
    status: 'active',
    avatar: 'ПА',
    hireDate: '01.06.2023',
    trainingProgress: 78,
    shiftsThisMonth: 14,
  },
  {
    id: 3,
    name: 'Сидоров Михаил Юрьевич',
    position: 'Бармен',
    department: 'Бар',
    status: 'probation',
    avatar: 'СМ',
    hireDate: '01.03.2026',
    trainingProgress: 42,
    shiftsThisMonth: 8,
  },
  {
    id: 4,
    name: 'Козлова Елена Дмитриевна',
    position: 'Менеджер смены',
    department: 'Администрация',
    status: 'active',
    avatar: 'КЕ',
    hireDate: '10.01.2021',
    trainingProgress: 100,
    shiftsThisMonth: 20,
  },
  {
    id: 5,
    name: 'Новиков Алексей Петрович',
    position: 'Повар',
    department: 'Кухня',
    status: 'vacation',
    avatar: 'НА',
    hireDate: '05.09.2023',
    trainingProgress: 88,
    shiftsThisMonth: 0,
  },
]

const statusLabels: Record<string, { label: string; color: string }> = {
  active: { label: 'Работает', color: 'bg-green-100 text-green-700' },
  probation: { label: 'Испытательный', color: 'bg-orange-100 text-orange-700' },
  vacation: { label: 'Отпуск', color: 'bg-blue-100 text-blue-700' },
  sick: { label: 'Больничный', color: 'bg-yellow-100 text-yellow-700' },
  fired: { label: 'Уволен', color: 'bg-red-100 text-red-700' },
}

export default function TeamPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Команда</h1>
          <p className="text-gray-500 mt-1">{employees.length} сотрудников</p>
        </div>
        <a
          href="/team/new"
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Добавить сотрудника
        </a>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Найти сотрудника..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
          <Filter className="w-4 h-4" />
          Фильтры
        </button>
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Всего', value: '24', color: 'text-gray-900' },
          { label: 'Работают', value: '20', color: 'text-green-600' },
          { label: 'Испытательный', value: '2', color: 'text-orange-600' },
          { label: 'Не на смене', value: '2', color: 'text-blue-600' },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-sm text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Employee list */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Сотрудник
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Должность / Отдел
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Статус
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Обучение
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Смен/месяц
                </th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {employees.map((emp) => {
                const statusInfo = statusLabels[emp.status] ?? statusLabels.active
                return (
                  <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-semibold text-orange-700">
                            {emp.avatar}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{emp.name}</p>
                          <p className="text-xs text-gray-400">с {emp.hireDate}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-sm text-gray-900">{emp.position}</p>
                      <p className="text-xs text-gray-400">{emp.department}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex text-xs font-medium px-2.5 py-1 rounded-full ${statusInfo.color}`}
                      >
                        {statusInfo.label}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-100 rounded-full h-1.5 w-20">
                          <div
                            className={`h-1.5 rounded-full ${
                              emp.trainingProgress >= 80
                                ? 'bg-green-500'
                                : emp.trainingProgress >= 50
                                  ? 'bg-orange-400'
                                  : 'bg-red-400'
                            }`}
                            style={{ width: `${emp.trainingProgress}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500">{emp.trainingProgress}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        {emp.shiftsThisMonth}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <a
                        href={`/team/${emp.id}`}
                        className="text-sm text-orange-600 hover:underline font-medium"
                      >
                        Профиль
                      </a>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
