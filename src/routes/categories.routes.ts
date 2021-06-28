import { Response, Request, Router } from "express";
import { CategoriesRepository } from "../modules/gifts/repositories/CategoriesRepository";
import { createCategoryController } from "../modules/gifts/useCases/createCategory";

const categoriesRoutes = Router()
const categoriesRepository = new CategoriesRepository()

categoriesRoutes.post("/", (req: Request, res: Response) => {
   return createCategoryController.handle(req, res)
})

categoriesRoutes.get("/", (req: Request, res: Response) => {
    const list = categoriesRepository.list()

    return res.json(list)
})

export { categoriesRoutes }
