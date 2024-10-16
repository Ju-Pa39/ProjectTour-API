require('dotenv').config()
const prisma = require('../config/prisma')

async function run(){
    await prisma.$executeRawUnsafe('DROP DATABASE Tour')
    await prisma.$executeRawUnsafe('CREATE DATABASE Tour')
}

run()