import { Request, Response } from "express";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";


class ListCategoriesController{
    constructor(private listCategoriesUseCase: ListCategoriesUseCase) {
        
    }

    handle(req: Request, res: Response) {
        const list = this.listCategoriesUseCase.execute()

        return res.json(list)
    }
}

export { ListCategoriesController }