import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { isSuperAdmin } from '../../access/isSuperAdmin'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: ({ req: { user } }) => {
      if (!user) return false
      const u = user as any
      return u.role === 'superAdmin' || u.role === 'tenantAdmin' || u.role === 'manager'
    },
    delete: isSuperAdmin,
    read: ({ req: { user } }) => {
      if (!user) return false
      const u = user as any
      if (u.role === 'superAdmin') return true
      if (u.role === 'tenantAdmin' || u.role === 'manager') {
        if (u.tenant) {
          const tenantId = typeof u.tenant === 'object' ? u.tenant.id : u.tenant
          return { tenant: { equals: tenantId } }
        }
      }
      return { id: { equals: user.id } }
    },
    update: ({ req: { user }, id }) => {
      if (!user) return false
      const u = user as any
      if (u.role === 'superAdmin') return true
      if (u.role === 'tenantAdmin' || u.role === 'manager') return true
      return user.id === id
    },
  },
  admin: {
    defaultColumns: ['name', 'email', 'role', 'restaurant'],
    useAsTitle: 'name',
    group: 'Система',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Имя',
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'employee',
      label: 'Роль',
      saveToJWT: true,
      options: [
        { label: 'Супер-администратор', value: 'superAdmin' },
        { label: 'Администратор компании', value: 'tenantAdmin' },
        { label: 'Менеджер', value: 'manager' },
        { label: 'Сотрудник', value: 'employee' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Определяет уровень доступа в системе',
      },
    },
    {
      name: 'tenant',
      type: 'relationship',
      relationTo: 'tenants',
      label: 'Компания',
      saveToJWT: true,
      admin: {
        position: 'sidebar',
        condition: (data) => data.role !== 'superAdmin',
      },
    },
    {
      name: 'restaurant',
      type: 'relationship',
      relationTo: 'restaurants',
      label: 'Заведение',
      saveToJWT: true,
      admin: {
        position: 'sidebar',
        condition: (data) => data.role === 'manager' || data.role === 'employee',
      },
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      label: 'Фото профиля',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Телефон',
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: 'Активен',
      admin: { position: 'sidebar' },
    },
    {
      name: 'lastSeen',
      type: 'date',
      label: 'Последний визит',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
