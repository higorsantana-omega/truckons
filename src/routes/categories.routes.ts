import { Response, Request, Router } from "express";

const categoriesRoutes = Router()

const categories = []

categoriesRoutes.post("/categories", (req: Request, res: Response) => {
    const { name, type, platforms, description } = req.body

    categories.push({
        name,
        type,
        platforms,
        description
    })

    return res.status(201).send()
})

export { categoriesRoutes }
