import { Router } from "express";
import { authenticateRoutes } from "./authenticate.routes";
import { categoriesRoutes } from "./categories.routes";
import { rentalRoutes } from "./rental.routes";
import { specificationsRoutes } from "./specification.routes";
import { trucksRoutes } from "./trucks.routes";
import { usersRoutes } from "./users.routes";


const router = Router()

router.use("/categories", categoriesRoutes)
router.use("/specifications", specificationsRoutes)
router.use("/users", usersRoutes)
router.use("/trucks", trucksRoutes)
router.use("/rentals", rentalRoutes)
router.use(authenticateRoutes)

export { router }