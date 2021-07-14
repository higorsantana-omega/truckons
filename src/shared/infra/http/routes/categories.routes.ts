import { CreateCategoryController } from "@modules/trucks/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "@modules/trucks/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "@modules/trucks/useCases/listCategories/ListCategoriesController";
import { Response, Request, Router } from "express";
import multer from "multer";

const categoriesRoutes = Router()

const upload = multer({
    dest: "./tmp"
})

const createCategoryController = new CreateCategoryController()
const importCategoryController = new ImportCategoryController()
const listCategoriesController = new ListCategoriesController()

categoriesRoutes.post("/", createCategoryController.handle)

categoriesRoutes.get("/", listCategoriesController.handle)

categoriesRoutes.post(
    "/import",
    upload.single("file"),
    importCategoryController.handle
)

export { categoriesRoutes }
