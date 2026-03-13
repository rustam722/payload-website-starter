import type { Access } from 'payload'

/**
 * Restricts read access to documents belonging to the user's tenant.
 * SuperAdmins can see all documents.
 */
export const byTenant: Access = ({ req: { user } }) => {
  if (!user) return false

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const u = user as any

  if (u.role === 'superAdmin') return true

  if (u.tenant) {
    const tenantId = typeof u.tenant === 'object' ? u.tenant.id : u.tenant
    return { tenant: { equals: tenantId } }
  }

  return false
}

/**
 * Restricts read access to documents belonging to the user's restaurant.
 * Managers and above see all restaurants in their tenant.
 */
export const byRestaurant: Access = ({ req: { user } }) => {
  if (!user) return false

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const u = user as any

  if (u.role === 'superAdmin') return true

  if (u.role === 'tenantAdmin' && u.tenant) {
    const tenantId = typeof u.tenant === 'object' ? u.tenant.id : u.tenant
    return { 'restaurant.tenant': { equals: tenantId } }
  }

  if (u.restaurant) {
    const restaurantId = typeof u.restaurant === 'object' ? u.restaurant.id : u.restaurant
    return { restaurant: { equals: restaurantId } }
  }

  return false
}
