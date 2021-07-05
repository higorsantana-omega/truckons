import { Router } from "express"
import { SpecificationsRepository } from "../modules/trucks/repositories/implementations/SpecificationsRepository"
import { CreateSpecificationUseCase } from "../modules/trucks/useCases/createSpecification/CreateSpecificationUseCase"

const specificationsRoutes = Router()
const specificationsRepository = new SpecificationsRepository()


specificationsRoutes.post("/", (req, res) => {
    
})

export { specificationsRoutes }