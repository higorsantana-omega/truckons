import { Response, Request, Router } from "express";
import { createCategoryController } from "../modules/gifts/useCases/createCategory";
import { listCategoriesController } from "../modules/gifts/useCases/listCategories";
import multer from "multer";
import { importCategoryController } from "../modules/gifts/useCases/importCategory";

const upload = multer({
    dest: "./tmp"
})
const categoriesRoutes = Router()

categoriesRoutes.post("/", (req: Request, res: Response) => {
   return createCategoryController.handle(req, res)
})

categoriesRoutes.get("/", (req: Request, res: Response) => {
    return listCategoriesController.handle(req, res)
})

categoriesRoutes.post("/import", upload.single("file"), (req, res) => {
    return importCategoryController.handle(req, res)
})

export { categoriesRoutes }
