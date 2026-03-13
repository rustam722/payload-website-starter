import type { Metadata } from 'next'
import { BookOpen, Plus, Play, CheckCircle, Clock, AlertCircle, Award } from 'lucide-react'

export const metadata: Metadata = { title: 'Обучение' }

const courses = [
  {
    id: 1,
    title: 'Стандарты гигиены и безопасности пищи',
    category: 'Безопасность',
    categoryColor: 'bg-red-100 text-red-700',
    duration: 45,
    enrolled: 24,
    completed: 22,
    isRequired: true,
    recertification: 6,
    thumbnail: '🛡️',
  },
  {
    id: 2,
    title: 'Меню весна-лето 2026: новые блюда',
    category: 'Меню и продукт',
    categoryColor: 'bg-green-100 text-green-700',
    duration: 60,
    enrolled: 18,
    completed: 12,
    isRequired: false,
    recertification: 0,
    thumbnail: '🍽️',
  },
  {
    id: 3,
    title: 'Стандарты обслуживания гостей',
    category: 'Сервис',
    categoryColor: 'bg-blue-100 text-blue-700',
    duration: 90,
    enrolled: 24,
    completed: 20,
    isRequired: true,
    recertification: 12,
    thumbnail: '⭐',
  },
  {
    id: 4,
    title: 'Онбординг: добро пожаловать в команду',
    category: 'Онбординг',
    categoryColor: 'bg-purple-100 text-purple-700',
    duration: 30,
    enrolled: 24,
    completed: 24,
    isRequired: true,
    recertification: 0,
    thumbnail: '👋',
  },
  {
    id: 5,
    title: 'Работа с кассой и POS-системой',
    category: 'Операции',
    categoryColor: 'bg-orange-100 text-orange-700',
    duration: 40,
    enrolled: 10,
    completed: 8,
    isRequired: false,
    recertification: 0,
    thumbnail: '💳',
  },
]

export default function TrainingPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Обучение</h1>
          <p className="text-gray-500 mt-1">{courses.length} курсов</p>
        </div>
        <a
          href="/training/new"
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Создать курс
        </a>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {
            label: 'Всего курсов',
            value: '5',
            icon: BookOpen,
            color: 'bg-blue-50 text-blue-600',
          },
          {
            label: 'Средний прогресс',
            value: '84%',
            icon: CheckCircle,
            color: 'bg-green-50 text-green-600',
          },
          {
            label: 'Сертификатов выдано',
            value: '47',
            icon: Award,
            color: 'bg-yellow-50 text-yellow-600',
          },
          {
            label: 'Просрочено',
            value: '3',
            icon: AlertCircle,
            color: 'bg-red-50 text-red-600',
          },
        ].map((s) => {
          const Icon = s.icon
          return (
            <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${s.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900">{s.value}</p>
                  <p className="text-xs text-gray-500">{s.label}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Courses grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {courses.map((course) => {
          const completionRate = Math.round((course.completed / course.enrolled) * 100)
          return (
            <div
              key={course.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Card header */}
              <div className="bg-gray-50 px-5 py-4 border-b border-gray-100 flex items-start gap-3">
                <span className="text-3xl">{course.thumbnail}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm leading-snug">
                    {course.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${course.categoryColor}`}
                    >
                      {course.category}
                    </span>
                    {course.isRequired && (
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                        Обязательный
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card body */}
              <div className="px-5 py-4 space-y-3">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration} мин</span>
                  </div>
                  {course.recertification > 0 && (
                    <span className="text-xs text-gray-400">
                      Переаттестация: {course.recertification} мес.
                    </span>
                  )}
                </div>

                {/* Progress */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">
                      {course.completed} из {course.enrolled} прошли
                    </span>
                    <span className="text-xs font-semibold text-gray-700">{completionRate}%</span>
                  </div>
                  <div className="bg-gray-100 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        completionRate >= 80
                          ? 'bg-green-500'
                          : completionRate >= 50
                            ? 'bg-orange-400'
                            : 'bg-red-400'
                      }`}
                      style={{ width: `${completionRate}%` }}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-1">
                  <a
                    href={`/training/${course.id}`}
                    className="flex-1 text-center text-sm py-2 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors font-medium"
                  >
                    Открыть
                  </a>
                  <a
                    href={`/training/${course.id}/assign`}
                    className="flex-1 text-center text-sm py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                  >
                    Назначить
                  </a>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
