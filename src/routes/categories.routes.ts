import { Response, Request, Router } from "express";
import { v4 as uuid } from "uuid"

const categoriesRoutes = Router()

const categories = []

categoriesRoutes.post("/", (req: Request, res: Response) => {
    const { name, type, platforms, description } = req.body

    const category = {
        name,
        type,
        platforms,
        description,
        id: uuid()
    }

    categories.push(category)

    return res.status(201).send()
})

export { categoriesRoutes }
