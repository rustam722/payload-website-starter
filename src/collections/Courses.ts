import type { CollectionConfig } from 'payload'
import { isManager } from '../access/isManager'
import { byRestaurant } from '../access/byTenant'
import { isEmployee } from '../access/isEmployee'

export const Courses: CollectionConfig = {
  slug: 'courses',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'restaurant', 'isRequired', 'status'],
    group: 'Обучение',
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
      label: 'Название курса',
    },
    {
      name: 'restaurant',
      type: 'relationship',
      relationTo: 'restaurants',
      label: 'Заведение',
      admin: { position: 'sidebar' },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      label: 'Статус',
      options: [
        { label: 'Черновик', value: 'draft' },
        { label: 'Опубликован', value: 'published' },
        { label: 'Архив', value: 'archived' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'isRequired',
      type: 'checkbox',
      defaultValue: false,
      label: 'Обязательный курс',
      admin: { position: 'sidebar' },
    },
    {
      name: 'recertificationMonths',
      type: 'number',
      label: 'Повторная сдача (месяцев)',
      admin: {
        description: 'Через сколько месяцев нужно пройти курс повторно. 0 = один раз.',
        position: 'sidebar',
      },
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      label: 'Обложка курса',
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Описание',
    },
    {
      name: 'category',
      type: 'select',
      label: 'Категория',
      options: [
        { label: 'Меню и продукт', value: 'menu' },
        { label: 'Безопасность и гигиена', value: 'safety' },
        { label: 'Стандарты сервиса', value: 'service' },
        { label: 'Операционные процессы', value: 'operations' },
        { label: 'HR и корпоративная культура', value: 'hr' },
        { label: 'Техника продаж', value: 'sales' },
        { label: 'Онбординг', value: 'onboarding' },
      ],
    },
    {
      name: 'estimatedDuration',
      type: 'number',
      label: 'Длительность (минут)',
    },
    {
      name: 'passingScore',
      type: 'number',
      defaultValue: 80,
      label: 'Проходной балл (%)',
      admin: {
        description: 'Минимальный процент правильных ответов для прохождения',
      },
    },
    {
      name: 'targetPositions',
      type: 'relationship',
      relationTo: 'positions',
      hasMany: true,
      label: 'Должности (для кого)',
      admin: {
        description: 'Оставьте пустым — курс доступен всем',
      },
    },
    {
      name: 'targetDepartments',
      type: 'relationship',
      relationTo: 'departments',
      hasMany: true,
      label: 'Отделы (для кого)',
    },
    {
      name: 'certificateEnabled',
      type: 'checkbox',
      defaultValue: false,
      label: 'Выдавать сертификат',
    },
    {
      name: 'order',
      type: 'number',
      label: 'Порядок отображения',
      defaultValue: 0,
      admin: { position: 'sidebar' },
    },
  ],
  timestamps: true,
}
