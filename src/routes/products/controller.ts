import { Request, Response } from "express"
import { db } from "../../db/index.js"
import { productsTable } from "../../db/schema/productSchema.js"
import { eq } from "drizzle-orm"

export const getAllProducts = async (req: Request, res: Response): Promise<any> => {
    try {
        const prods = await db.select().from(productsTable)
        return res.status(200).json({ message: "all products fetched", date: prods })
    } catch (error: any) {
        return res.status(500).json({ message: error.message })
    }
}

export const getProductById = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params
        const [prod] = await db.select().from(productsTable).where(eq(productsTable.id, id))
        if (prod) return res.status(200).json({ message: `product fetched`, data: prod })
        return res.status(404).json({ message: "product not found" })
    } catch (error: any) {
        return res.status(500).json({ message: error.message })
    }

}

export const createProduct = async (req: Request, res: Response): Promise<any> => {
    try {
        const { uid } = req.user
        const [prod] = await db.insert(productsTable).values({ ...req.cleanBody, user_id: uid }).returning()
        return res.status(200).json({ message: "product created", date: prod })
    } catch (error: any) {
        return res.status(500).send({ message: error.message })
    }
}

export const updateProduct = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params
        const [upd] = await db.update(productsTable).set(req.cleanBody).where(eq(productsTable.id, id)).returning()
        if (upd) return res.status(200).json({ message: `product updated`, date: upd })
        return res.status(404).json({ message: "product not found" })
    } catch (error: any) {
        return res.status(500).json({ message: error.message })

    }
}

export const deleteProduct = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params
        const [isDel] = await db.delete(productsTable).where(eq(productsTable.id, id)).returning()
        if (isDel) {
            return res.status(204).send({})
        } else {
            return res.status(404).json({ message: "product not found" })
        }
    } catch (error: any) {
        return res.status(500).json({ message: error.message })

    }
}

