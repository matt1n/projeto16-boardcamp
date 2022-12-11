import { Router } from "express";
import { getCustomers, getCustomersById } from "../controllers/customersController.js";
import { getCustomerByIdValidation } from "../middlewares/customersMiddlewares.js";

const router = Router()

router.get('/customers', getCustomers)
router.get('/customers/:id', getCustomerByIdValidation, getCustomersById)

export default router