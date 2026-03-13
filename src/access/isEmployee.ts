import type { AccessArgs } from 'payload'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isEmployee = ({ req: { user } }: AccessArgs<any>): boolean => {
  return Boolean(user)
}
