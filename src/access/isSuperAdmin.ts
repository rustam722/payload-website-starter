import type { AccessArgs } from 'payload'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isSuperAdmin = ({ req: { user } }: AccessArgs<any>): boolean => {
  return (user as any)?.role === 'superAdmin'
}
