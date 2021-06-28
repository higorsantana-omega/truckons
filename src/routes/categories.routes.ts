import { Response, Request, Router } from "express";
import { v4 as uuid } from "uuid"
import { Category } from "../models/Category";
import { CategoriesRepository } from "../repositories/CategoriesRepository";

const categoriesRoutes = Router()
const categoriesRepository = new CategoriesRepository()

categoriesRoutes.post("/", (req: Request, res: Response) => {
    const { name, type, platforms, description } = req.body

    categoriesRepository.create({ name, type, platforms, description })

    return res.status(201).send()
})

categoriesRoutes.get("/", (req: Request, res: Response) => {
    const list = categoriesRepository.list()

    return res.json(list)
})

export { categoriesRoutes }
