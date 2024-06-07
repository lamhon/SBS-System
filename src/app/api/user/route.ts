import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { sql } from "@vercel/postgres"
import * as bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function add() {
    // const allAdmin = await prisma.admins.create({
    //     data: {
    //         username: 'admin',
    //         pwd: bcrypt.hashSync('123123aA', 10),
    //         fullName: 'Lâm Hoàng',
    //         avatar: 'https://res.cloudinary.com/sor25db/image/upload/v1704529295/WASP/pqacnovpfwy32csukskn.jpg',
    //         sex: true,
    //         email: 'lamdzai25',
    //         birthday: new Date(),
    //         deleteType: '00'
    //     }
    // })
    const data = {
        username: 'admin',
        pwd: bcrypt.hashSync('123123aA', 10),
        fullName: 'LamHon',
        avatar: 'https://res.cloudinary.com/sor25db/image/upload/v1704529295/WASP/pqacnovpfwy32csukskn.jpg',
        sex: true,
        phoneNumber: '0345071246',
        email: 'admin@gmail.com',
        birthday: new Date(),
        deleteType: '00'
    }

    console.log(data.pwd)

    const response = await sql`
        INSERT INTO admins(username, pwd, fullName, avatar, sex, phoneNumber, email, birthday, deleteType)
        VALUES(${data.username}, ${data.pwd}, ${data.fullName}, ${data.avatar}, ${data.sex}, ${data.phoneNumber}, ${data.email}, ${data.birthday.toISOString()}, ${data.deleteType})
    `
}

export async function POST(request: NextRequest) {
    add()
        .then(async () => {
            await prisma.$disconnect()
        })
        .catch(async (e) => {
            console.error(e)
            await prisma.$disconnect()
            process.exit(1)
        })
    return NextResponse.json('haha')
}