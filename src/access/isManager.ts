import type { AccessArgs } from 'payload'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isManager = ({ req: { user } }: AccessArgs<any>): boolean => {
  const u = user as any
  return u?.role === 'superAdmin' || u?.role === 'tenantAdmin' || u?.role === 'manager'
}
