import type { CollectionConfig } from 'payload'
import { isManager } from '../access/isManager'
import { byRestaurant } from '../access/byTenant'

export const Announcements: CollectionConfig = {
  slug: 'announcements',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'priority', 'restaurant', 'publishedAt', 'isPinned'],
    group: 'Операции',
  },
  access: {
    create: isManager,
    delete: isManager,
    read: ({ req: { user } }) => {
      if (!user) return false
      return true // All authenticated users can read announcements for their restaurant
    },
    update: isManager,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Заголовок',
    },
    {
      name: 'restaurant',
      type: 'relationship',
      relationTo: 'restaurants',
      required: true,
      label: 'Заведение',
      admin: { position: 'sidebar' },
    },
    {
      name: 'priority',
      type: 'select',
      defaultValue: 'normal',
      label: 'Приоритет',
      options: [
        { label: 'Обычное', value: 'normal' },
        { label: 'Важное', value: 'high' },
        { label: 'Срочное', value: 'urgent' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'isPinned',
      type: 'checkbox',
      defaultValue: false,
      label: 'Закреплено',
      admin: { position: 'sidebar' },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Содержание',
    },
    {
      name: 'attachments',
      type: 'array',
      label: 'Вложения',
      fields: [
        { name: 'file', type: 'upload', relationTo: 'media', label: 'Файл' },
        { name: 'title', type: 'text', label: 'Название' },
      ],
    },
    {
      name: 'targetDepartments',
      type: 'relationship',
      relationTo: 'departments',
      hasMany: true,
      label: 'Для отделов',
      admin: {
        description: 'Оставьте пустым — для всех',
      },
    },
    {
      name: 'targetPositions',
      type: 'relationship',
      relationTo: 'positions',
      hasMany: true,
      label: 'Для должностей',
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Дата публикации',
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    {
      name: 'expiresAt',
      type: 'date',
      label: 'Срок действия',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      label: 'Автор',
      admin: { position: 'sidebar' },
    },
    {
      name: 'readBy',
      type: 'array',
      label: 'Прочитали',
      admin: {
        readOnly: true,
        description: 'Список сотрудников, подтвердивших прочтение',
      },
      fields: [
        { name: 'employee', type: 'relationship', relationTo: 'employees', label: 'Сотрудник' },
        { name: 'readAt', type: 'date', label: 'Прочитано' },
      ],
    },
  ],
  timestamps: true,
}
