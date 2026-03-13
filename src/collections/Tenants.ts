import type { CollectionConfig } from 'payload'
import { isSuperAdmin } from '../access/isSuperAdmin'
import { isTenantAdmin } from '../access/isTenantAdmin'

export const Tenants: CollectionConfig = {
  slug: 'tenants',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'plan', 'isActive', 'createdAt'],
    group: 'SaaS',
  },
  access: {
    create: isSuperAdmin,
    delete: isSuperAdmin,
    read: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'superAdmin') return true
      if (user.tenant) {
        const tenantId = typeof user.tenant === 'object' ? user.tenant.id : user.tenant
        return { id: { equals: tenantId } }
      }
      return false
    },
    update: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'superAdmin') return true
      if (user.role === 'tenantAdmin' && user.tenant) {
        const tenantId = typeof user.tenant === 'object' ? user.tenant.id : user.tenant
        return { id: { equals: tenantId } }
      }
      return false
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Название компании',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug (URL-идентификатор)',
      admin: {
        description: 'Уникальный идентификатор, только латиница и цифры',
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Логотип',
    },
    {
      name: 'plan',
      type: 'select',
      required: true,
      defaultValue: 'starter',
      label: 'Тариф',
      options: [
        { label: 'Старт (до 15 сотрудников)', value: 'starter' },
        { label: 'Бизнес (до 50 сотрудников)', value: 'business' },
        { label: 'Сеть (до 200 сотрудников)', value: 'network' },
        { label: 'Корпорат (без лимита)', value: 'enterprise' },
      ],
    },
    {
      name: 'planExpiresAt',
      type: 'date',
      label: 'Дата окончания тарифа',
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
      name: 'contactEmail',
      type: 'email',
      label: 'Email для связи',
    },
    {
      name: 'contactPhone',
      type: 'text',
      label: 'Телефон для связи',
    },
    {
      name: 'billingEmail',
      type: 'email',
      label: 'Email для счетов',
    },
    {
      name: 'maxLocations',
      type: 'number',
      defaultValue: 1,
      label: 'Максимум заведений',
      admin: { position: 'sidebar' },
    },
    {
      name: 'settings',
      type: 'group',
      label: 'Настройки',
      fields: [
        {
          name: 'timezone',
          type: 'text',
          defaultValue: 'Europe/Moscow',
          label: 'Часовой пояс',
        },
        {
          name: 'language',
          type: 'select',
          defaultValue: 'ru',
          label: 'Язык',
          options: [
            { label: 'Русский', value: 'ru' },
            { label: 'English', value: 'en' },
          ],
        },
        {
          name: 'enableTraining',
          type: 'checkbox',
          defaultValue: true,
          label: 'Модуль обучения',
        },
        {
          name: 'enableShifts',
          type: 'checkbox',
          defaultValue: true,
          label: 'Модуль смен',
        },
        {
          name: 'enableChecklists',
          type: 'checkbox',
          defaultValue: true,
          label: 'Чек-листы',
        },
        {
          name: 'enableIncidents',
          type: 'checkbox',
          defaultValue: true,
          label: 'Журнал инцидентов',
        },
      ],
    },
  ],
  timestamps: true,
}
