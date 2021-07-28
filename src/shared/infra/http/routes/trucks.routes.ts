import { CreateTruckController } from "@modules/trucks/useCases/createTruck/CreateTruckController";
import { CreateTruckSpecificationController } from "@modules/trucks/useCases/createTruckSpecification/CreateTruckSpecificationController";
import { ListAvailableTrucksController } from "@modules/trucks/useCases/listAvailableTrucks/ListAvailableTrucksController";
import { Router } from "express";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const trucksRoutes = Router();

const createTruckController = new CreateTruckController();
const listAvailableTrucksController = new ListAvailableTrucksController();
const createTruckSpecificationController = new CreateTruckSpecificationController();

trucksRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createTruckController.handle
);

trucksRoutes.get("/available", listAvailableTrucksController.handle);

trucksRoutes.post(
  "/specifications/:id",
  ensureAuthenticated,
  ensureAdmin,
  createTruckSpecificationController.handle
);

export { trucksRoutes };
