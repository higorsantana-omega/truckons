import { AppError } from "../../../../shared/errors/AppError"
import { ICategoriesRepository } from "@modules/trucks/repositories/ICategoriesRepository"
import { inject, injectable } from "tsyringe"


interface IRequest{
    name: string
    description: string
}

@injectable()
class CreateCategoryUseCase{
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepo: ICategoriesRepository) {}

    async execute({ name, description }: IRequest): Promise<void> {
        const categoryAlreadyExists = await this.categoriesRepo.findByName(name)

        if (categoryAlreadyExists) {
            throw new AppError("Category already exists")
        }

        this.categoriesRepo.create({ name, description })
    }
}

export { CreateCategoryUseCase }