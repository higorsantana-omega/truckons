import { Response, Request, Router } from "express";
import { CreateCategoryController } from "../modules/trucks/useCases/createCategory/CreateCategoryController";
import { listCategoriesController } from "../modules/trucks/useCases/listCategories";
import multer from "multer";
import { importCategoryController } from "../modules/trucks/useCases/importCategory";

const categoriesRoutes = Router()

const upload = multer({
    dest: "./tmp"
})

const createCategoryController = new CreateCategoryController()

categoriesRoutes.post("/", createCategoryController.handle)

categoriesRoutes.get("/", (req: Request, res: Response) => {
    return listCategoriesController.handle(req, res)
})

categoriesRoutes.post("/import", upload.single("file"), (req, res) => {
    return importCategoryController.handle(req, res)
})

export { categoriesRoutes }
