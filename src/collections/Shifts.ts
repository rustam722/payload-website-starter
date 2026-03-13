import type { CollectionConfig } from 'payload'
import { isManager } from '../access/isManager'
import { byRestaurant } from '../access/byTenant'

export const Shifts: CollectionConfig = {
  slug: 'shifts',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'restaurant', 'date', 'startTime', 'endTime', 'status'],
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
      name: 'name',
      type: 'text',
      required: true,
      label: 'Название смены',
      admin: {
        description: 'Например: Утренняя смена, Вечерняя смена',
      },
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
      name: 'date',
      type: 'date',
      required: true,
      label: 'Дата',
      admin: { position: 'sidebar' },
    },
    {
      type: 'row',
      fields: [
        { name: 'startTime', type: 'text', required: true, label: 'Начало (HH:MM)' },
        { name: 'endTime', type: 'text', required: true, label: 'Конец (HH:MM)' },
      ],
    },
    {
      name: 'department',
      type: 'relationship',
      relationTo: 'departments',
      label: 'Отдел',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      label: 'Статус',
      options: [
        { label: 'Черновик', value: 'draft' },
        { label: 'Опубликована', value: 'published' },
        { label: 'Идёт', value: 'active' },
        { label: 'Завершена', value: 'completed' },
        { label: 'Отменена', value: 'cancelled' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'requiredCount',
      type: 'number',
      defaultValue: 1,
      label: 'Требуется сотрудников',
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Заметки для менеджера',
    },
    {
      name: 'employeeNotes',
      type: 'textarea',
      label: 'Заметки для сотрудников',
    },
    {
      name: 'openedAt',
      type: 'date',
      label: 'Время открытия (факт)',
      admin: { position: 'sidebar' },
    },
    {
      name: 'closedAt',
      type: 'date',
      label: 'Время закрытия (факт)',
      admin: { position: 'sidebar' },
    },
    {
      name: 'openedBy',
      type: 'relationship',
      relationTo: 'employees',
      label: 'Открыл смену',
      admin: { position: 'sidebar' },
    },
    {
      name: 'closedBy',
      type: 'relationship',
      relationTo: 'employees',
      label: 'Закрыл смену',
      admin: { position: 'sidebar' },
    },
    {
      name: 'shiftReport',
      type: 'richText',
      label: 'Отчёт по смене',
    },
    {
      name: 'revenue',
      type: 'number',
      label: 'Выручка за смену (₽)',
    },
    {
      name: 'covers',
      type: 'number',
      label: 'Гостей за смену',
    },
  ],
  timestamps: true,
}
