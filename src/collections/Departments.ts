import type { CollectionConfig } from 'payload'
import { isManager } from '../access/isManager'
import { byRestaurant } from '../access/byTenant'

export const Departments: CollectionConfig = {
  slug: 'departments',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'restaurant', 'color'],
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
      label: 'Название отдела',
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
      name: 'description',
      type: 'textarea',
      label: 'Описание',
    },
    {
      name: 'color',
      type: 'text',
      defaultValue: '#6366f1',
      label: 'Цвет (HEX)',
      admin: {
        description: 'Цвет для визуального отображения в расписании',
      },
    },
    {
      name: 'icon',
      type: 'select',
      label: 'Иконка',
      options: [
        { label: 'Кухня', value: 'kitchen' },
        { label: 'Зал', value: 'hall' },
        { label: 'Бар', value: 'bar' },
        { label: 'Доставка', value: 'delivery' },
        { label: 'Администрация', value: 'admin' },
        { label: 'Уборка', value: 'cleaning' },
        { label: 'Склад', value: 'warehouse' },
        { label: 'Касса', value: 'cashier' },
      ],
    },
  ],
  timestamps: true,
}
