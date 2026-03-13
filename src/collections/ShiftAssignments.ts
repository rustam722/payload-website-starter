import type { CollectionConfig } from 'payload'
import { isManager } from '../access/isManager'

export const ShiftAssignments: CollectionConfig = {
  slug: 'shift-assignments',
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['employee', 'shift', 'status', 'clockIn', 'clockOut'],
    group: 'Смены',
  },
  access: {
    create: isManager,
    delete: isManager,
    read: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'superAdmin' || user.role === 'tenantAdmin' || user.role === 'manager')
        return true
      return { 'employee.user': { equals: user.id } }
    },
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'shift',
      type: 'relationship',
      relationTo: 'shifts',
      required: true,
      label: 'Смена',
    },
    {
      name: 'employee',
      type: 'relationship',
      relationTo: 'employees',
      required: true,
      label: 'Сотрудник',
    },
    {
      name: 'position',
      type: 'relationship',
      relationTo: 'positions',
      label: 'Должность в смене',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'scheduled',
      label: 'Статус',
      options: [
        { label: 'Запланировано', value: 'scheduled' },
        { label: 'Подтверждено', value: 'confirmed' },
        { label: 'Вышел', value: 'completed' },
        { label: 'Не вышел', value: 'absent' },
        { label: 'Опоздал', value: 'late' },
        { label: 'Замена', value: 'replacement' },
      ],
    },
    {
      name: 'clockIn',
      type: 'date',
      label: 'Приход (факт)',
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    {
      name: 'clockOut',
      type: 'date',
      label: 'Уход (факт)',
      admin: {
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    {
      name: 'hoursWorked',
      type: 'number',
      label: 'Отработано часов',
      admin: {
        description: 'Рассчитывается автоматически при закрытии',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Заметки сотрудника',
    },
    {
      name: 'managerNotes',
      type: 'textarea',
      label: 'Заметки менеджера',
    },
    {
      name: 'isSwapRequest',
      type: 'checkbox',
      defaultValue: false,
      label: 'Запрос на замену',
    },
    {
      name: 'swapWith',
      type: 'relationship',
      relationTo: 'employees',
      label: 'Замена на сотрудника',
      admin: {
        condition: (data) => data.isSwapRequest,
      },
    },
    {
      name: 'swapApprovedBy',
      type: 'relationship',
      relationTo: 'users',
      label: 'Замену одобрил',
    },
  ],
  timestamps: true,
}
