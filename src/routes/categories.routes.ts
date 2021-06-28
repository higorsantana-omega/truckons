import { Response, Request, Router } from "express";
import { createCategoryController } from "../modules/gifts/useCases/createCategory";
import { listCategoriesController } from "../modules/gifts/useCases/listCategories";

const categoriesRoutes = Router()

categoriesRoutes.post("/", (req: Request, res: Response) => {
   return createCategoryController.handle(req, res)
})

categoriesRoutes.get("/", (req: Request, res: Response) => {
    return listCategoriesController.handle(req, res)
})

export { categoriesRoutes }
