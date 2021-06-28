import { Response, Request, Router } from "express";
import { CategoriesRepository } from "../repositories/CategoriesRepository";
import { CreateCategoryService } from "../services/CreateCategoryService";

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
