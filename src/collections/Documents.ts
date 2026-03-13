import type { CollectionConfig } from 'payload'
import { isManager } from '../access/isManager'
import { byRestaurant } from '../access/byTenant'
import { isEmployee } from '../access/isEmployee'

export const Documents: CollectionConfig = {
  slug: 'documents',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'restaurant', 'version', 'updatedAt'],
    group: 'Операции',
  },
  access: {
    create: isManager,
    delete: isManager,
    read: isEmployee,
    update: isManager,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Название документа',
    },
    {
      name: 'restaurant',
      type: 'relationship',
      relationTo: 'restaurants',
      label: 'Заведение',
      admin: { position: 'sidebar' },
    },
    {
      name: 'category',
      type: 'select',
      label: 'Категория',
      options: [
        { label: 'Стандарты работы (SOP)', value: 'sop' },
        { label: 'Меню и рецептуры', value: 'menu' },
        { label: 'Безопасность', value: 'safety' },
        { label: 'HR документы', value: 'hr' },
        { label: 'Шаблоны отчётов', value: 'reports' },
        { label: 'Другое', value: 'other' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Описание',
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Содержание (онлайн)',
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
      label: 'Файл (PDF/DOC)',
    },
    {
      name: 'version',
      type: 'text',
      defaultValue: '1.0',
      label: 'Версия',
      admin: { position: 'sidebar' },
    },
    {
      name: 'targetDepartments',
      type: 'relationship',
      relationTo: 'departments',
      hasMany: true,
      label: 'Для отделов',
    },
    {
      name: 'isPublic',
      type: 'checkbox',
      defaultValue: true,
      label: 'Доступен всем сотрудникам',
    },
    {
      name: 'tags',
      type: 'text',
      label: 'Теги (через запятую)',
    },
    {
      name: 'updatedBy',
      type: 'relationship',
      relationTo: 'users',
      label: 'Обновил',
      admin: { position: 'sidebar' },
    },
  ],
  timestamps: true,
}
