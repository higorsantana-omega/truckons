import { CreateTruckController } from "@modules/trucks/useCases/createTruck/CreateTruckController"
import { Router } from "express"
import { ensureAdmin } from "../middlewares/ensureAdmin"
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"


const trucksRoutes = Router()

const createTruckController = new CreateTruckController()

trucksRoutes.post("/",
  ensureAuthenticated,
  ensureAdmin,
  createTruckController.handle)

export { trucksRoutes }