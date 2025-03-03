import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "./controller.js";
import { validateData } from "../../middlewares/validation.middleware.js";
import { createSchema, updateSchema } from "../../db/schema/productSchema.js";
import { Auth, checkRole } from "../../middlewares/auth.middlware.js";
// import { createProductSchema } from "../../zod/validations.js";

const router = Router()

router.get("/", getAllProducts)
router.get("/:id", getProductById)
router.post("/create", Auth, checkRole(["user"]), validateData(createSchema), createProduct)
router.patch("/update/:id",Auth, checkRole(["user"]), validateData(updateSchema), updateProduct)
router.delete("/delete/:id", deleteProduct)

export default router