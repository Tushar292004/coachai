import { PrismaClient } from '@prisma/client'


export const db = globalThis.prisma || new PrismaClient()
// every time after hot reloding the new PrismaClient instance is created
// so we need to create global instance of PrismaClient to avoid this

if(process.env.NODE_ENV!=='production'){
  globalThis.prisma = db;
}

//globalThis.prisma: This global variable ensures that the PrismaClient instance is reused across hot reloads during development. Without this, each time your application reloads, a new instance of the PrismaClient would be created potentially leading to connection issues.