import { Request, Router } from "express";
import { Response } from "express-serve-static-core";

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
