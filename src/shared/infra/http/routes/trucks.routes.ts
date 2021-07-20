import { CreateTruckController } from "@modules/trucks/useCases/createTruck/CreateTruckController"
import { Router } from "express"


const trucksRoutes = Router()

const createTruckController = new CreateTruckController()

trucksRoutes.post("/", createTruckController.handle)

export { trucksRoutes }