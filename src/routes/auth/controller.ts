import { Request, Response } from "express"
import { db } from "../../db/index.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { usersTable } from "../../db/schema/userSchema.js"
import { eq } from "drizzle-orm"

export const createUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const data = req.cleanBody
        const existedUsers = await db.select().from(usersTable).where(eq(usersTable.email, data.email))
        if (existedUsers.length > 0) {
            return res.status(400).json({ message: "can't create duplicate users" })
        }
        data.password = await bcrypt.hash(data.password, 10)
        const [user] = await db.insert(usersTable).values(data).returning()
        return res.status(200).json({ message: 'user created', user })
    } catch (error) {

    }

}

export const loginUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, password } = req.cleanBody
        const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email))
        if (!user) {
            return res.status(404).json({ message: "user not found with this email" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(404).json({ message: "wrong password" })
        }
        const token = jwt.sign({ uid: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '7d' })
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: 'lax'
        })
        return res.status(200).json({ message: 'user logged in', user })
    } catch (error: any) {
        return res.status(200).json({ message: error.message })
    }
}




