import { Request, Response } from "express";


class ImportCategoryController {

    handle(req: Request, res: Response): Response {
        const { file } = req
        console.log(file)
        return res.send()
    }
}

export { ImportCategoryController }