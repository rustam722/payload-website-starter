import type { CollectionConfig } from 'payload'
import { isManager } from '../access/isManager'
import { byRestaurant } from '../access/byTenant'

export const IncidentReports: CollectionConfig = {
  slug: 'incident-reports',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'severity', 'restaurant', 'status', 'createdAt'],
    group: 'Операции',
  },
  access: {
    create: ({ req: { user } }) => Boolean(user),
    delete: isManager,
    read: byRestaurant,
    update: isManager,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Краткое описание',
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
      label: 'Тип инцидента',
      options: [
        { label: 'Несчастный случай', value: 'accident' },
        { label: 'Жалоба гостя', value: 'complaint' },
        { label: 'Проблема с качеством', value: 'quality' },
        { label: 'Поломка оборудования', value: 'equipment' },
        { label: 'Нарушение стандартов', value: 'standard' },
        { label: 'Кража/недостача', value: 'theft' },
        { label: 'Другое', value: 'other' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'severity',
      type: 'select',
      defaultValue: 'low',
      label: 'Серьёзность',
      options: [
        { label: 'Низкая', value: 'low' },
        { label: 'Средняя', value: 'medium' },
        { label: 'Высокая', value: 'high' },
        { label: 'Критическая', value: 'critical' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'open',
      label: 'Статус',
      options: [
        { label: 'Открыт', value: 'open' },
        { label: 'В работе', value: 'in_progress' },
        { label: 'Решён', value: 'resolved' },
        { label: 'Закрыт', value: 'closed' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      label: 'Подробное описание',
    },
    {
      name: 'shift',
      type: 'relationship',
      relationTo: 'shifts',
      label: 'Смена',
    },
    {
      name: 'reportedBy',
      type: 'relationship',
      relationTo: 'employees',
      label: 'Сообщил',
    },
    {
      name: 'involvedEmployees',
      type: 'relationship',
      relationTo: 'employees',
      hasMany: true,
      label: 'Задействованные сотрудники',
    },
    {
      name: 'photos',
      type: 'array',
      label: 'Фотоматериалы',
      fields: [
        { name: 'photo', type: 'upload', relationTo: 'media', label: 'Фото' },
        { name: 'caption', type: 'text', label: 'Подпись' },
      ],
    },
    {
      name: 'resolution',
      type: 'richText',
      label: 'Принятые меры / Решение',
    },
    {
      name: 'resolvedBy',
      type: 'relationship',
      relationTo: 'users',
      label: 'Решил',
    },
    {
      name: 'resolvedAt',
      type: 'date',
      label: 'Дата решения',
    },
    {
      name: 'preventiveMeasures',
      type: 'richText',
      label: 'Меры по предотвращению',
    },
  ],
  timestamps: true,
}
