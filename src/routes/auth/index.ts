import { Router } from "express";
import { createUser, loginUser } from "./controller.js";
import { validateData } from "../../middlewares/validation.middleware.js";
import { loginUserSchema, createrUserSchema } from "../../db/schema/userSchema.js";
// import { createUserSchema } from "../../zod/validations.js";

const router = Router()

router.post("/register", validateData(createrUserSchema), createUser)
router.post("/login", validateData(loginUserSchema), loginUser)

export default router