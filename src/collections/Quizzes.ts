import type { CollectionConfig } from 'payload'
import { isManager } from '../access/isManager'
import { isEmployee } from '../access/isEmployee'

export const Quizzes: CollectionConfig = {
  slug: 'quizzes',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'lesson', 'passingScore', 'questionsCount'],
    group: 'Обучение',
  },
  access: {
    create: isManager,
    delete: isManager,
    read: isEmployee,
    update: isManager,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Название теста',
    },
    {
      name: 'lesson',
      type: 'relationship',
      relationTo: 'lessons',
      label: 'Урок',
      admin: { position: 'sidebar' },
    },
    {
      name: 'course',
      type: 'relationship',
      relationTo: 'courses',
      label: 'Курс (итоговый тест)',
      admin: {
        position: 'sidebar',
        description: 'Привяжите к курсу для создания итогового теста',
      },
    },
    {
      name: 'passingScore',
      type: 'number',
      defaultValue: 80,
      required: true,
      label: 'Проходной балл (%)',
      admin: { position: 'sidebar' },
    },
    {
      name: 'timeLimit',
      type: 'number',
      label: 'Лимит времени (минут)',
      admin: {
        position: 'sidebar',
        description: '0 = без ограничения',
      },
    },
    {
      name: 'maxAttempts',
      type: 'number',
      defaultValue: 3,
      label: 'Максимум попыток',
      admin: { position: 'sidebar' },
    },
    {
      name: 'shuffleQuestions',
      type: 'checkbox',
      defaultValue: true,
      label: 'Перемешивать вопросы',
    },
    {
      name: 'showCorrectAnswers',
      type: 'checkbox',
      defaultValue: true,
      label: 'Показывать правильные ответы после сдачи',
    },
    {
      name: 'questions',
      type: 'array',
      required: true,
      label: 'Вопросы',
      minRows: 1,
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
          label: 'Вопрос',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Изображение к вопросу',
        },
        {
          name: 'type',
          type: 'select',
          required: true,
          defaultValue: 'single',
          label: 'Тип вопроса',
          options: [
            { label: 'Один правильный ответ', value: 'single' },
            { label: 'Несколько правильных', value: 'multiple' },
            { label: 'Свободный ответ', value: 'text' },
            { label: 'Верно/Неверно', value: 'boolean' },
          ],
        },
        {
          name: 'options',
          type: 'array',
          label: 'Варианты ответов',
          admin: {
            condition: (data, siblingData) =>
              siblingData?.type === 'single' || siblingData?.type === 'multiple',
          },
          fields: [
            { name: 'text', type: 'text', required: true, label: 'Текст ответа' },
            { name: 'isCorrect', type: 'checkbox', label: 'Правильный ответ' },
          ],
        },
        {
          name: 'correctAnswer',
          type: 'text',
          label: 'Правильный ответ (для свободного)',
          admin: {
            condition: (data, siblingData) => siblingData?.type === 'text',
          },
        },
        {
          name: 'booleanAnswer',
          type: 'select',
          label: 'Правильный ответ',
          options: [
            { label: 'Верно', value: 'true' },
            { label: 'Неверно', value: 'false' },
          ],
          admin: {
            condition: (data, siblingData) => siblingData?.type === 'boolean',
          },
        },
        {
          name: 'explanation',
          type: 'textarea',
          label: 'Объяснение ответа',
          admin: {
            description: 'Показывается после ответа на вопрос',
          },
        },
        {
          name: 'points',
          type: 'number',
          defaultValue: 1,
          label: 'Баллы за вопрос',
        },
      ],
    },
  ],
  timestamps: true,
}
