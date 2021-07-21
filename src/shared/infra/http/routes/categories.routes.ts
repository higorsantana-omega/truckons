import { CreateCategoryController } from "@modules/trucks/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "@modules/trucks/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "@modules/trucks/useCases/listCategories/ListCategoriesController";
import { Response, Request, Router } from "express";
import multer from "multer";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const categoriesRoutes = Router()

const upload = multer({
  dest: "./tmp"
})

const createCategoryController = new CreateCategoryController()
const importCategoryController = new ImportCategoryController()
const listCategoriesController = new ListCategoriesController()

categoriesRoutes.post("/",
  ensureAuthenticated,
  ensureAdmin,
  createCategoryController.handle)

categoriesRoutes.get("/", listCategoriesController.handle)

categoriesRoutes.post(
  "/import",
  ensureAuthenticated,
  ensureAdmin,
  upload.single("file"),
  importCategoryController.handle
)

export { categoriesRoutes }
