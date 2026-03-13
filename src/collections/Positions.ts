import type { CollectionConfig } from 'payload'
import { isManager } from '../access/isManager'
import { byRestaurant } from '../access/byTenant'

export const Positions: CollectionConfig = {
  slug: 'positions',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'department', 'restaurant', 'accessLevel'],
    group: 'Команда',
  },
  access: {
    create: isManager,
    delete: isManager,
    read: byRestaurant,
    update: isManager,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Название должности',
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
      name: 'department',
      type: 'relationship',
      relationTo: 'departments',
      label: 'Отдел',
      admin: { position: 'sidebar' },
    },
    {
      name: 'accessLevel',
      type: 'select',
      required: true,
      defaultValue: 'employee',
      label: 'Уровень доступа',
      options: [
        { label: 'Сотрудник', value: 'employee' },
        { label: 'Менеджер смены', value: 'shiftManager' },
        { label: 'Менеджер', value: 'manager' },
        { label: 'Администратор', value: 'admin' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Описание должности',
    },
    {
      name: 'responsibilities',
      type: 'richText',
      label: 'Обязанности',
    },
    {
      name: 'requirements',
      type: 'richText',
      label: 'Требования',
    },
    {
      name: 'color',
      type: 'text',
      label: 'Цвет (HEX)',
    },
    {
      name: 'hourlyRate',
      type: 'number',
      label: 'Часовая ставка (₽)',
      admin: {
        description: 'Базовая ставка для расчёта зарплаты',
      },
    },
  ],
  timestamps: true,
}
