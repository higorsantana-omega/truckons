import { Router } from "express";
import uploadConfig from "@config/upload";

import { CreateTruckController } from "@modules/trucks/useCases/createTruck/CreateTruckController";
import { CreateTruckSpecificationController } from "@modules/trucks/useCases/createTruckSpecification/CreateTruckSpecificationController";
import { ListAvailableTrucksController } from "@modules/trucks/useCases/listAvailableTrucks/ListAvailableTrucksController";
import { UploadTruckImagesController } from "@modules/trucks/useCases/uploadTruckImages/UpTruckImagesController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import multer from "multer";

const trucksRoutes = Router();

const createTruckController = new CreateTruckController();
const listAvailableTrucksController = new ListAvailableTrucksController();
const createTruckSpecificationController =
  new CreateTruckSpecificationController();
const uploadTruckImagesController = new UploadTruckImagesController();

const upload = multer(uploadConfig.upload("./tmp/trucks"))

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

trucksRoutes.post(
  "/images/:id",
  ensureAuthenticated,
  ensureAdmin,
  upload.array("images"),
  uploadTruckImagesController.handle
);

export { trucksRoutes };
