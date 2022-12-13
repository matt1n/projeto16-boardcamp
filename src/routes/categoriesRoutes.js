import { Router } from "express";
import  {getCategories, postCategory}  from "../controllers/categoriesController.js";
import { categoryValidation } from "../middlewares/categoriesMiddleware.js";

const router = Router();

router.get("/categories", getCategories)
router.post('/categories', categoryValidation, postCategory)

export default router