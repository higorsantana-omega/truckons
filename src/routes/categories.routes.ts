import { Response, Request, Router } from "express";
import { CategoriesRepository } from "../modules/gifts/repositories/CategoriesRepository";
import { CreateCategoryService } from "../modules/gifts/useCases/createCategory/CreateCategoryUseCase";

const categoriesRoutes = Router()
const categoriesRepository = new CategoriesRepository()

categoriesRoutes.post("/", (req: Request, res: Response) => {
    const { name, type, platforms, description } = req.body

    const createCategoryService = new CreateCategoryService(categoriesRepository)

    createCategoryService.execute({ name, type, platforms, description })

    return res.status(201).send()
})

categoriesRoutes.get("/", (req: Request, res: Response) => {
    const list = categoriesRepository.list()

    return res.json(list)
})

export { categoriesRoutes }
