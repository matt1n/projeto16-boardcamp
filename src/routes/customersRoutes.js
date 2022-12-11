import { Router } from "express";
import { getCustomers, getCustomerById, postCustomer, putCustomer } from "../controllers/customersController.js";
import { CustomerBodyAndIdValidation, CustomerBodyValidation, getCustomerByIdValidation } from "../middlewares/customersMiddlewares.js";

const router = Router()

router.get('/customers', getCustomers)
router.get('/customers/:id', getCustomerByIdValidation, getCustomerById)
router.post('/customers', CustomerBodyValidation, postCustomer)
router.put('/customers/:id', CustomerBodyAndIdValidation, putCustomer)

export default router