import { Router } from "express"
import { SpecificationsRepository } from "../modules/trucks/repositories/implementations/SpecificationsRepository"
import { CreateSpecificationUseCase } from "../modules/trucks/useCases/createSpecification/CreateSpecificationUseCase"

const specificationsRoutes = Router()
const specificationsRepository = new SpecificationsRepository()


specificationsRoutes.post("/", (req, res) => {
    const { name, description } = req.body
    const createSpecificationService = new CreateSpecificationUseCase(specificationsRepository)
    createSpecificationService.execute({ name, description })
    return res.status(201).send()
})

export { specificationsRoutes }