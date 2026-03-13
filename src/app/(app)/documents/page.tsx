import type { Metadata } from 'next'
import { FileText, Plus, Download, Search, FolderOpen } from 'lucide-react'

export const metadata: Metadata = { title: 'Документы' }

const documents = [
  {
    id: 1,
    title: 'Стандарты обслуживания гостей (SOP)',
    category: 'sop',
    categoryLabel: 'SOP',
    categoryColor: 'bg-blue-100 text-blue-700',
    department: 'Зал',
    version: '3.2',
    updatedAt: '01 мар 2026',
    updatedBy: 'Козлова Е.Д.',
    format: 'PDF',
    icon: '📋',
  },
  {
    id: 2,
    title: 'Меню весна-лето 2026 с рецептурами',
    category: 'menu',
    categoryLabel: 'Меню',
    categoryColor: 'bg-green-100 text-green-700',
    department: 'Кухня',
    version: '1.0',
    updatedAt: '10 мар 2026',
    updatedBy: 'Иванов И.И.',
    format: 'PDF',
    icon: '🍽️',
  },
  {
    id: 3,
    title: 'Правила личной гигиены и санитарии',
    category: 'safety',
    categoryLabel: 'Безопасность',
    categoryColor: 'bg-red-100 text-red-700',
    department: 'Все',
    version: '2.1',
    updatedAt: '15 янв 2026',
    updatedBy: 'Директор',
    format: 'PDF',
    icon: '🛡️',
  },
  {
    id: 4,
    title: 'Инструкция по работе с POS-системой iiko',
    category: 'sop',
    categoryLabel: 'SOP',
    categoryColor: 'bg-blue-100 text-blue-700',
    department: 'Все',
    version: '1.5',
    updatedAt: '20 фев 2026',
    updatedBy: 'Козлова Е.Д.',
    format: 'PDF',
    icon: '💳',
  },
  {
    id: 5,
    title: 'Карта аллергенов',
    category: 'menu',
    categoryLabel: 'Меню',
    categoryColor: 'bg-green-100 text-green-700',
    department: 'Зал, Кухня',
    version: '2.0',
    updatedAt: '10 мар 2026',
    updatedBy: 'Иванов И.И.',
    format: 'PDF',
    icon: '⚠️',
  },
  {
    id: 6,
    title: 'Шаблон отчёта по инвентаризации',
    category: 'reports',
    categoryLabel: 'Шаблоны',
    categoryColor: 'bg-purple-100 text-purple-700',
    department: 'Все',
    version: '1.0',
    updatedAt: '01 янв 2026',
    updatedBy: 'Бухгалтерия',
    format: 'XLSX',
    icon: '📊',
  },
]

const categories = [
  { value: 'all', label: 'Все', count: documents.length },
  { value: 'sop', label: 'SOP', count: documents.filter((d) => d.category === 'sop').length },
  { value: 'menu', label: 'Меню', count: documents.filter((d) => d.category === 'menu').length },
  {
    value: 'safety',
    label: 'Безопасность',
    count: documents.filter((d) => d.category === 'safety').length,
  },
  {
    value: 'reports',
    label: 'Шаблоны',
    count: documents.filter((d) => d.category === 'reports').length,
  },
]

export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">База знаний</h1>
          <p className="text-gray-500 mt-1">{documents.length} документов</p>
        </div>
        <a
          href="/documents/new"
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Добавить документ
        </a>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Найти документ..."
          className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* Category tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat.value}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              cat.value === 'all'
                ? 'bg-orange-500 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {cat.label}
            <span
              className={`text-xs px-1.5 py-0.5 rounded-full ${
                cat.value === 'all' ? 'bg-orange-400' : 'bg-gray-100 text-gray-500'
              }`}
            >
              {cat.count}
            </span>
          </button>
        ))}
      </div>

      {/* Documents grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl">{doc.icon}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm leading-snug group-hover:text-orange-700 transition-colors">
                  {doc.title}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${doc.categoryColor}`}
                  >
                    {doc.categoryLabel}
                  </span>
                  <span className="text-xs text-gray-400">{doc.department}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
              <div className="text-xs text-gray-400">
                <p>v{doc.version} · {doc.updatedAt}</p>
                <p>Обновил: {doc.updatedBy}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono bg-gray-100 text-gray-500 px-2 py-1 rounded">
                  {doc.format}
                </span>
                <button className="p-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
