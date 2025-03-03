import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'

export const Auth = (req: Request, res: Response, next: NextFunction): any => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET!)
        if (typeof decoded !== 'object') {
            return res.status(401).json({ message: "Unauthorized hsh" })
        }
        req.user = decoded
        next()
    } catch (error: any) {
        return res.status(401).json({ message: error.message })
    }

}

export const checkRole = (reqRoles: string[]): any => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const role = req.user.role
            if (!role) return res.status(401).json({ message: "Forbidden usage role not found" })
            if (!reqRoles.includes(role)) {
                return res.status(401).json({ message: "Forbidden for you babes" })
            }
            next()
        } catch (error: any) {
            return res.status(401).json({ message: error.message })
        }
    }
}