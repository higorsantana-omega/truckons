import { Response, Request, Router } from "express";
import { CategoriesRepository } from "../repositories/CategoriesRepository";

const categoriesRoutes = Router()
const categoriesRepository = new CategoriesRepository()

categoriesRoutes.post("/", (req: Request, res: Response) => {
    const { name, type, platforms, description } = req.body

    const categoryAlreadyExists = categoriesRepository.findByName(name)

    if (categoryAlreadyExists) {
        return res.status(400).json({error: "Category already exists"})
    }

    categoriesRepository.create({ name, type, platforms, description })

    return res.status(201).send()
})

categoriesRoutes.get("/", (req: Request, res: Response) => {
    const list = categoriesRepository.list()

    return res.json(list)
})

export { categoriesRoutes }
