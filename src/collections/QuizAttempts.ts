import type { CollectionConfig } from 'payload'
import { isManager } from '../access/isManager'

export const QuizAttempts: CollectionConfig = {
  slug: 'quiz-attempts',
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['employee', 'quiz', 'score', 'passed', 'createdAt'],
    group: 'Обучение',
  },
  access: {
    create: () => true, // created by system
    delete: isManager,
    read: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'superAdmin' || user.role === 'tenantAdmin' || user.role === 'manager')
        return true
      // Employees can only see their own attempts
      return { 'employee.user': { equals: user.id } }
    },
    update: () => false, // immutable once created
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
      name: 'quiz',
      type: 'relationship',
      relationTo: 'quizzes',
      required: true,
      label: 'Тест',
    },
    {
      name: 'score',
      type: 'number',
      required: true,
      label: 'Балл (%)',
    },
    {
      name: 'passed',
      type: 'checkbox',
      label: 'Тест сдан',
    },
    {
      name: 'timeTaken',
      type: 'number',
      label: 'Время выполнения (секунды)',
    },
    {
      name: 'answers',
      type: 'array',
      label: 'Ответы',
      fields: [
        { name: 'questionIndex', type: 'number', label: 'Номер вопроса' },
        { name: 'selectedOptions', type: 'text', label: 'Выбранные ответы (JSON)' },
        { name: 'isCorrect', type: 'checkbox', label: 'Верно' },
        { name: 'pointsEarned', type: 'number', label: 'Баллы' },
      ],
    },
    {
      name: 'attemptNumber',
      type: 'number',
      label: 'Номер попытки',
    },
  ],
  timestamps: true,
}
