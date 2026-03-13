import type { CollectionConfig } from 'payload'
import { isSuperAdmin } from '../access/isSuperAdmin'
import { byTenant } from '../access/byTenant'
import { isManager } from '../access/isManager'

export const Restaurants: CollectionConfig = {
  slug: 'restaurants',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'tenant', 'city', 'isActive'],
    group: 'Заведения',
  },
  access: {
    create: ({ req: { user } }) =>
      user?.role === 'superAdmin' || user?.role === 'tenantAdmin',
    delete: isSuperAdmin,
    read: byTenant,
    update: isManager,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Название заведения',
    },
    {
      name: 'tenant',
      type: 'relationship',
      relationTo: 'tenants',
      required: true,
      label: 'Компания',
      admin: { position: 'sidebar' },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Логотип',
    },
    {
      name: 'type',
      type: 'select',
      label: 'Тип заведения',
      options: [
        { label: 'Ресторан', value: 'restaurant' },
        { label: 'Кафе', value: 'cafe' },
        { label: 'Бар', value: 'bar' },
        { label: 'Фастфуд', value: 'fastfood' },
        { label: 'Кофейня', value: 'coffee' },
        { label: 'Столовая', value: 'canteen' },
        { label: 'Пиццерия', value: 'pizzeria' },
        { label: 'Другое', value: 'other' },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'city',
          type: 'text',
          label: 'Город',
        },
        {
          name: 'address',
          type: 'text',
          label: 'Адрес',
        },
      ],
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Телефон',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email заведения',
    },
    {
      name: 'timezone',
      type: 'text',
      defaultValue: 'Europe/Moscow',
      label: 'Часовой пояс',
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: 'Активно',
      admin: { position: 'sidebar' },
    },
    {
      name: 'openingHours',
      type: 'array',
      label: 'Часы работы',
      fields: [
        {
          name: 'day',
          type: 'select',
          label: 'День',
          options: [
            { label: 'Понедельник', value: 'mon' },
            { label: 'Вторник', value: 'tue' },
            { label: 'Среда', value: 'wed' },
            { label: 'Четверг', value: 'thu' },
            { label: 'Пятница', value: 'fri' },
            { label: 'Суббота', value: 'sat' },
            { label: 'Воскресенье', value: 'sun' },
          ],
        },
        { name: 'open', type: 'text', label: 'Открытие (HH:MM)' },
        { name: 'close', type: 'text', label: 'Закрытие (HH:MM)' },
        { name: 'isClosed', type: 'checkbox', label: 'Выходной' },
      ],
    },
  ],
  timestamps: true,
}
