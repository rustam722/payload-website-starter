import type { CollectionConfig } from 'payload'
import { isManager } from '../access/isManager'

export const Enrollments: CollectionConfig = {
  slug: 'enrollments',
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['employee', 'course', 'status', 'progress', 'completedAt'],
    group: 'Обучение',
  },
  access: {
    create: isManager,
    delete: isManager,
    read: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'superAdmin' || user.role === 'tenantAdmin' || user.role === 'manager')
        return true
      return { 'employee.user': { equals: user.id } }
    },
    update: ({ req: { user } }) => {
      if (!user) return false
      return Boolean(user)
    },
  },
  fields: [
    {
      name: 'employee',
      type: 'relationship',
      relationTo: 'employees',
      required: true,
      label: 'Сотрудник',
    },
    {
      name: 'course',
      type: 'relationship',
      relationTo: 'courses',
      required: true,
      label: 'Курс',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'not_started',
      required: true,
      label: 'Статус',
      options: [
        { label: 'Не начат', value: 'not_started' },
        { label: 'В процессе', value: 'in_progress' },
        { label: 'Завершён', value: 'completed' },
        { label: 'Не сдан', value: 'failed' },
        { label: 'Просрочен', value: 'overdue' },
      ],
    },
    {
      name: 'progress',
      type: 'number',
      defaultValue: 0,
      label: 'Прогресс (%)',
      min: 0,
      max: 100,
    },
    {
      name: 'completedLessons',
      type: 'array',
      label: 'Пройденные уроки',
      fields: [
        { name: 'lesson', type: 'relationship', relationTo: 'lessons', label: 'Урок' },
        { name: 'completedAt', type: 'date', label: 'Пройден' },
      ],
    },
    {
      name: 'startedAt',
      type: 'date',
      label: 'Начат',
    },
    {
      name: 'completedAt',
      type: 'date',
      label: 'Завершён',
    },
    {
      name: 'dueDate',
      type: 'date',
      label: 'Срок прохождения',
    },
    {
      name: 'score',
      type: 'number',
      label: 'Итоговый балл (%)',
    },
    {
      name: 'certificateIssuedAt',
      type: 'date',
      label: 'Сертификат выдан',
    },
    {
      name: 'nextRecertificationAt',
      type: 'date',
      label: 'Следующая переаттестация',
    },
    {
      name: 'assignedBy',
      type: 'relationship',
      relationTo: 'users',
      label: 'Назначил',
      admin: { position: 'sidebar' },
    },
  ],
  timestamps: true,
}
