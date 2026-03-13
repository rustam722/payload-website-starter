import type { CollectionConfig } from 'payload'
import { isManager } from '../access/isManager'
import { byRestaurant } from '../access/byTenant'

export const Tasks: CollectionConfig = {
  slug: 'tasks',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'assignedTo', 'status', 'priority', 'dueTime'],
    group: 'Смены',
  },
  access: {
    create: isManager,
    delete: isManager,
    read: byRestaurant,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Задача',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Описание',
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
      name: 'shift',
      type: 'relationship',
      relationTo: 'shifts',
      label: 'Смена',
      admin: { position: 'sidebar' },
    },
    {
      name: 'assignedTo',
      type: 'relationship',
      relationTo: 'employees',
      label: 'Назначено',
      admin: { position: 'sidebar' },
    },
    {
      name: 'category',
      type: 'select',
      label: 'Категория',
      options: [
        { label: 'Уборка', value: 'cleaning' },
        { label: 'Кухня', value: 'kitchen' },
        { label: 'Сервис', value: 'service' },
        { label: 'Инвентаризация', value: 'inventory' },
        { label: 'Техническое', value: 'technical' },
        { label: 'Другое', value: 'other' },
      ],
    },
    {
      name: 'priority',
      type: 'select',
      defaultValue: 'normal',
      label: 'Приоритет',
      options: [
        { label: 'Низкий', value: 'low' },
        { label: 'Обычный', value: 'normal' },
        { label: 'Высокий', value: 'high' },
        { label: 'Срочно', value: 'urgent' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      label: 'Статус',
      options: [
        { label: 'Ожидает', value: 'pending' },
        { label: 'Выполняется', value: 'in_progress' },
        { label: 'Выполнено', value: 'done' },
        { label: 'Отменено', value: 'cancelled' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'dueTime',
      type: 'text',
      label: 'Срок выполнения (HH:MM)',
    },
    {
      name: 'completedAt',
      type: 'date',
      label: 'Выполнено в',
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    {
      name: 'completedBy',
      type: 'relationship',
      relationTo: 'employees',
      label: 'Выполнил',
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: 'Фото выполнения',
    },
    {
      name: 'isRecurring',
      type: 'checkbox',
      defaultValue: false,
      label: 'Повторяющаяся задача',
    },
  ],
  timestamps: true,
}
