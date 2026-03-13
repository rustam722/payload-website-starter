import type { Metadata } from 'next'
import { Calendar, Plus, ChevronLeft, ChevronRight, Users, Clock } from 'lucide-react'

export const metadata: Metadata = { title: 'Смены' }

const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
const dates = [10, 11, 12, 13, 14, 15, 16]
const today = 13

const weekShifts = [
  {
    day: 1, // Monday
    shifts: [
      {
        name: 'Утренняя',
        time: '09:00–17:00',
        staff: ['Ив.', 'Пет.', 'Сид.'],
        color: 'bg-blue-100 border-blue-300 text-blue-800',
      },
      {
        name: 'Вечерняя',
        time: '17:00–23:00',
        staff: ['Коз.', 'Нов.'],
        color: 'bg-purple-100 border-purple-300 text-purple-800',
      },
    ],
  },
  {
    day: 2,
    shifts: [
      {
        name: 'Утренняя',
        time: '09:00–17:00',
        staff: ['Ив.', 'Пет.'],
        color: 'bg-blue-100 border-blue-300 text-blue-800',
      },
      {
        name: 'Дневная',
        time: '12:00–20:00',
        staff: ['Сид.'],
        color: 'bg-green-100 border-green-300 text-green-800',
      },
    ],
  },
  {
    day: 3,
    shifts: [
      {
        name: 'Дневная',
        time: '12:00–20:00',
        staff: ['Ив.', 'Коз.', 'Нов.'],
        color: 'bg-green-100 border-green-300 text-green-800',
      },
    ],
  },
  {
    day: 4, // Today
    shifts: [
      {
        name: 'Утренняя',
        time: '09:00–17:00',
        staff: ['Пет.', 'Сид.'],
        color: 'bg-blue-100 border-blue-300 text-blue-800',
      },
      {
        name: 'Дневная',
        time: '12:00–20:00',
        staff: ['Ив.', 'Коз.'],
        color: 'bg-green-100 border-green-300 text-green-800',
      },
      {
        name: 'Вечерняя',
        time: '17:00–23:00',
        staff: ['Нов.'],
        color: 'bg-purple-100 border-purple-300 text-purple-800',
      },
    ],
  },
  {
    day: 5,
    shifts: [
      {
        name: 'Утренняя',
        time: '09:00–17:00',
        staff: ['Ив.', 'Пет.', 'Коз.'],
        color: 'bg-blue-100 border-blue-300 text-blue-800',
      },
    ],
  },
  {
    day: 6,
    shifts: [
      {
        name: 'Дневная',
        time: '12:00–22:00',
        staff: ['Сид.', 'Нов.', 'Коз.', 'Пет.'],
        color: 'bg-green-100 border-green-300 text-green-800',
      },
    ],
  },
  {
    day: 7,
    shifts: [
      {
        name: 'Дневная',
        time: '12:00–22:00',
        staff: ['Ив.', 'Пет.', 'Сид.'],
        color: 'bg-green-100 border-green-300 text-green-800',
      },
    ],
  },
]

export default function ShiftsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Смены</h1>
          <p className="text-gray-500 mt-1">Расписание на неделю</p>
        </div>
        <a
          href="/shifts/new"
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Создать смену
        </a>
      </div>

      {/* Week nav */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="font-semibold text-gray-900">10 – 16 марта 2026</h2>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Week grid */}
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day, i) => {
            const date = dates[i]
            const isToday = date === today
            const dayShifts = weekShifts.find((d) => d.day === i + 1)?.shifts ?? []

            return (
              <div key={day} className="min-h-40">
                {/* Day header */}
                <div className="text-center mb-2">
                  <p className="text-xs font-medium text-gray-400 uppercase">{day}</p>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mt-1 text-sm font-semibold ${
                      isToday ? 'bg-orange-500 text-white' : 'text-gray-700'
                    }`}
                  >
                    {date}
                  </div>
                </div>

                {/* Shifts */}
                <div className="space-y-1">
                  {dayShifts.map((shift) => (
                    <div
                      key={shift.name}
                      className={`p-1.5 rounded-lg border text-xs ${shift.color} cursor-pointer hover:opacity-80 transition-opacity`}
                    >
                      <p className="font-semibold leading-none">{shift.name}</p>
                      <p className="mt-0.5 opacity-75">{shift.time}</p>
                      <p className="mt-1">{shift.staff.join(', ')}</p>
                    </div>
                  ))}
                  {dayShifts.length === 0 && (
                    <button className="w-full h-8 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center text-gray-300 hover:border-orange-300 hover:text-orange-400 transition-colors text-xs">
                      +
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Today's details */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h2 className="font-semibold text-gray-900 mb-4">Сегодня, 13 марта</h2>
        <div className="space-y-3">
          {weekShifts
            .find((d) => d.day === 4)
            ?.shifts.map((shift) => (
              <div
                key={shift.name}
                className={`flex items-center justify-between p-4 rounded-xl border ${shift.color}`}
              >
                <div>
                  <p className="font-semibold">{shift.name}</p>
                  <div className="flex items-center gap-1 mt-0.5 opacity-75">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="text-sm">{shift.time}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 opacity-60" />
                  <span className="font-semibold">{shift.staff.length}</span>
                  <a
                    href="/shifts/today"
                    className="ml-2 text-xs underline opacity-75 hover:opacity-100"
                  >
                    Подробнее
                  </a>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
