import { PrismaClient } from '@prisma/client'

declare global {
  // Allow global `prisma` across hot reloads in development
  var prisma: PrismaClient | undefined
}

const prisma = global.prisma ?? new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})

if (process.env.NODE_ENV !== 'production') global.prisma = prisma

export { prisma }
