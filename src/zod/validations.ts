import { z } from 'zod'

// just for practice purpose you also use this validations in validation middleware but in this project we use drizzle-zod to avoid repetation

export const createProductSchema = z.object({
    name: z.string(),
    price: z.number(),
    description: z.string().optional(),
    image: z.string().optional(),
})
export const createUserSchema = z.object({
    fullname: z.string(),
    email: z.string().email("not a valid email-coming from basic zod").max(255),
    password: z.string().min(8, 'passsword length should not be less than 10').max(255)
})