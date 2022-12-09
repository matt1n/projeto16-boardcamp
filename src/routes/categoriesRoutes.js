import { Router } from "express";
import  {getCategories, postCategorie}  from "../controllers/categoriesController.js";

const router = Router();

router.get("/categories", getCategories)
router.post('/categories', postCategorie)

export default router