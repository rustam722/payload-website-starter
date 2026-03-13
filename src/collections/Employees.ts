import type { CollectionConfig } from 'payload'
import { isManager } from '../access/isManager'
import { byRestaurant } from '../access/byTenant'

export const Employees: CollectionConfig = {
  slug: 'employees',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'position', 'restaurant', 'status', 'hireDate'],
    group: 'Команда',
  },
  access: {
    create: isManager,
    delete: isManager,
    read: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'superAdmin') return true
      if (user.role === 'tenantAdmin' || user.role === 'manager') {
        if (user.restaurant) {
          const restaurantId =
            typeof user.restaurant === 'object' ? user.restaurant.id : user.restaurant
          return { restaurant: { equals: restaurantId } }
        }
        return false
      }
      // Employees can see their own profile
      return { user: { equals: user.id } }
    },
    update: isManager,
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
      label: 'ФИО',
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      label: 'Аккаунт пользователя',
      unique: true,
      admin: { position: 'sidebar' },
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
      name: 'position',
      type: 'relationship',
      relationTo: 'positions',
      label: 'Должность',
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
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      label: 'Статус',
      options: [
        { label: 'Работает', value: 'active' },
        { label: 'В отпуске', value: 'vacation' },
        { label: 'Больничный', value: 'sick' },
        { label: 'Уволен', value: 'fired' },
        { label: 'Испытательный срок', value: 'probation' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      label: 'Фото',
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Основное',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'phone', type: 'text', label: 'Телефон' },
                { name: 'email', type: 'email', label: 'Email' },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'hireDate', type: 'date', label: 'Дата приёма' },
                { name: 'birthDate', type: 'date', label: 'Дата рождения' },
              ],
            },
            {
              name: 'employmentType',
              type: 'select',
              label: 'Тип занятости',
              options: [
                { label: 'Полная ставка', value: 'full' },
                { label: 'Частичная', value: 'part' },
                { label: 'Стажёр', value: 'intern' },
                { label: 'Временный', value: 'temporary' },
              ],
            },
            {
              name: 'notes',
              type: 'textarea',
              label: 'Заметки',
            },
          ],
        },
        {
          label: 'Экстренный контакт',
          fields: [
            {
              name: 'emergencyContact',
              type: 'group',
              label: '',
              fields: [
                { name: 'name', type: 'text', label: 'ФИО контакта' },
                { name: 'relation', type: 'text', label: 'Кем приходится' },
                { name: 'phone', type: 'text', label: 'Телефон' },
              ],
            },
          ],
        },
        {
          label: 'Документы',
          fields: [
            {
              name: 'documents',
              type: 'array',
              label: 'Документы сотрудника',
              fields: [
                {
                  name: 'type',
                  type: 'select',
                  label: 'Тип',
                  options: [
                    { label: 'Трудовой договор', value: 'contract' },
                    { label: 'Санитарная книжка', value: 'health' },
                    { label: 'Паспорт', value: 'passport' },
                    { label: 'ИНН', value: 'inn' },
                    { label: 'Другое', value: 'other' },
                  ],
                },
                { name: 'title', type: 'text', label: 'Название' },
                { name: 'file', type: 'upload', relationTo: 'media', label: 'Файл' },
                { name: 'expiresAt', type: 'date', label: 'Действителен до' },
              ],
            },
          ],
        },
        {
          label: 'Зарплата',
          fields: [
            {
              name: 'salary',
              type: 'group',
              label: '',
              fields: [
                {
                  name: 'type',
                  type: 'select',
                  label: 'Тип оплаты',
                  options: [
                    { label: 'Почасовая', value: 'hourly' },
                    { label: 'Оклад', value: 'salary' },
                    { label: 'Смешанная', value: 'mixed' },
                  ],
                },
                { name: 'hourlyRate', type: 'number', label: 'Ставка (₽/час)' },
                { name: 'monthlySalary', type: 'number', label: 'Оклад (₽/мес)' },
                { name: 'bankAccount', type: 'text', label: 'Банковские реквизиты' },
              ],
            },
          ],
        },
      ],
    },
  ],
  timestamps: true,
}
