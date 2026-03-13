import type { CollectionConfig } from 'payload'
import { isManager } from '../access/isManager'
import { byRestaurant } from '../access/byTenant'

export const Checklists: CollectionConfig = {
  slug: 'checklists',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'restaurant', 'frequency', 'isActive'],
    group: 'Смены',
  },
  access: {
    create: isManager,
    delete: isManager,
    read: byRestaurant,
    update: isManager,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Название чек-листа',
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
      name: 'type',
      type: 'select',
      required: true,
      label: 'Тип',
      options: [
        { label: 'Открытие', value: 'opening' },
        { label: 'Закрытие', value: 'closing' },
        { label: 'Уборка', value: 'cleaning' },
        { label: 'Безопасность', value: 'safety' },
        { label: 'Инвентаризация', value: 'inventory' },
        { label: 'Другое', value: 'other' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'department',
      type: 'relationship',
      relationTo: 'departments',
      label: 'Отдел',
      admin: { position: 'sidebar' },
    },
    {
      name: 'frequency',
      type: 'select',
      defaultValue: 'daily',
      label: 'Периодичность',
      options: [
        { label: 'Ежедневно', value: 'daily' },
        { label: 'Еженедельно', value: 'weekly' },
        { label: 'Ежемесячно', value: 'monthly' },
        { label: 'По смене', value: 'per_shift' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: 'Активен',
      admin: { position: 'sidebar' },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Описание',
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      label: 'Пункты чек-листа',
      minRows: 1,
      fields: [
        { name: 'title', type: 'text', required: true, label: 'Пункт' },
        { name: 'description', type: 'textarea', label: 'Описание/инструкция' },
        { name: 'isRequired', type: 'checkbox', defaultValue: true, label: 'Обязательный' },
        {
          name: 'requiresPhoto',
          type: 'checkbox',
          defaultValue: false,
          label: 'Требует фото',
        },
        {
          name: 'category',
          type: 'text',
          label: 'Категория пункта',
        },
      ],
    },
    {
      name: 'estimatedTime',
      type: 'number',
      label: 'Время выполнения (минут)',
    },
  ],
  timestamps: true,
}

export const ChecklistCompletions: CollectionConfig = {
  slug: 'checklist-completions',
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['checklist', 'completedBy', 'completedAt', 'overallStatus'],
    group: 'Смены',
  },
  access: {
    create: ({ req: { user } }) => Boolean(user),
    delete: isManager,
    read: byRestaurant,
    update: isManager,
  },
  fields: [
    {
      name: 'checklist',
      type: 'relationship',
      relationTo: 'checklists',
      required: true,
      label: 'Чек-лист',
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
    },
    {
      name: 'completedBy',
      type: 'relationship',
      relationTo: 'employees',
      required: true,
      label: 'Выполнил',
    },
    {
      name: 'completedAt',
      type: 'date',
      label: 'Дата выполнения',
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    {
      name: 'overallStatus',
      type: 'select',
      defaultValue: 'in_progress',
      label: 'Общий статус',
      options: [
        { label: 'Выполняется', value: 'in_progress' },
        { label: 'Завершено', value: 'completed' },
        { label: 'Завершено с нарушениями', value: 'completed_with_issues' },
        { label: 'Не выполнено', value: 'failed' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'items',
      type: 'array',
      label: 'Выполненные пункты',
      fields: [
        { name: 'itemTitle', type: 'text', label: 'Пункт' },
        { name: 'isCompleted', type: 'checkbox', label: 'Выполнено' },
        { name: 'notes', type: 'textarea', label: 'Комментарий' },
        { name: 'photo', type: 'upload', relationTo: 'media', label: 'Фото' },
      ],
    },
    {
      name: 'managerApprovedBy',
      type: 'relationship',
      relationTo: 'employees',
      label: 'Одобрил менеджер',
    },
    {
      name: 'managerApprovedAt',
      type: 'date',
      label: 'Одобрено',
    },
  ],
  timestamps: true,
}
