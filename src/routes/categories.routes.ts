import { Response, Request, Router } from "express";
import { v4 as uuid } from "uuid"
import { Category } from "../models/Category";

const categoriesRoutes = Router()

const categories: Category[] = []

categoriesRoutes.post("/", (req: Request, res: Response) => {
    const { name, type, platforms, description } = req.body

    const category = new Category()
    Object.assign(category, {
        name,
        type,
        platforms,
        description,
        created_at: new Date()
    })

    categories.push(category)

    return res.status(201).send()
})

export { categoriesRoutes }
