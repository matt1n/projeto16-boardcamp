import { Router } from "express";
import { closeRental, deleteRental, getRentals, postRental } from "../controllers/rentalsController.js";
import { closeRentalValidation, deleteRentalValidation, rentalValidation } from "../middlewares/rentalsMiddlewares.js";

const router = Router()

router.get('/rentals', getRentals)
router.post('/rentals', rentalValidation, postRental)
router.post('/rentals/:id/return', closeRentalValidation ,closeRental)
router.delete('/rentals/:id', deleteRentalValidation, deleteRental)

export default router