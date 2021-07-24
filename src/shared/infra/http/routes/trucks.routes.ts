import { CreateTruckController } from "@modules/trucks/useCases/createTruck/CreateTruckController";
import { ListAvailableTrucksController } from "@modules/trucks/useCases/listAvailableTrucks/ListAvailableTrucksController";
import { Router } from "express";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const trucksRoutes = Router();

const createTruckController = new CreateTruckController();
const listAvailableTrucksController = new ListAvailableTrucksController();

trucksRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createTruckController.handle
);

trucksRoutes.get("/available", listAvailableTrucksController.handle);

export { trucksRoutes };
