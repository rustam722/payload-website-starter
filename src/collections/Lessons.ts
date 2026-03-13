import type { CollectionConfig } from 'payload'
import { isManager } from '../access/isManager'
import { isEmployee } from '../access/isEmployee'

export const Lessons: CollectionConfig = {
  slug: 'lessons',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'course', 'type', 'order'],
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
      label: 'Название урока',
    },
    {
      name: 'course',
      type: 'relationship',
      relationTo: 'courses',
      required: true,
      label: 'Курс',
      admin: { position: 'sidebar' },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      label: 'Порядок в курсе',
      admin: { position: 'sidebar' },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'text',
      label: 'Тип урока',
      options: [
        { label: 'Текст/статья', value: 'text' },
        { label: 'Видео', value: 'video' },
        { label: 'PDF документ', value: 'pdf' },
        { label: 'Тест/квиз', value: 'quiz' },
        { label: 'Чек-лист практики', value: 'practical' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Содержание (текст)',
      admin: {
        condition: (data) => data.type === 'text',
      },
    },
    {
      name: 'videoUrl',
      type: 'text',
      label: 'Ссылка на видео (YouTube/Vimeo)',
      admin: {
        condition: (data) => data.type === 'video',
        description: 'Вставьте URL видео с YouTube, Vimeo или прямую ссылку',
      },
    },
    {
      name: 'videoFile',
      type: 'upload',
      relationTo: 'media',
      label: 'Видео файл',
      admin: {
        condition: (data) => data.type === 'video',
      },
    },
    {
      name: 'document',
      type: 'upload',
      relationTo: 'media',
      label: 'PDF файл',
      admin: {
        condition: (data) => data.type === 'pdf',
      },
    },
    {
      name: 'practicalItems',
      type: 'array',
      label: 'Пункты практики',
      admin: {
        condition: (data) => data.type === 'practical',
      },
      fields: [
        { name: 'task', type: 'text', label: 'Задание', required: true },
        { name: 'description', type: 'textarea', label: 'Описание' },
        { name: 'requiresPhoto', type: 'checkbox', label: 'Требует фото' },
      ],
    },
    {
      name: 'duration',
      type: 'number',
      label: 'Длительность (мин)',
      admin: { position: 'sidebar' },
    },
    {
      name: 'isMandatory',
      type: 'checkbox',
      defaultValue: true,
      label: 'Обязательный урок',
      admin: { position: 'sidebar' },
    },
  ],
  timestamps: true,
}
