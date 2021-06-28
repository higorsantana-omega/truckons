import { CategoriesRepository } from "../repositories/CategoriesRepository"

interface IRequest{
    name: string
    type: string
    platforms: string
    description: string
}

class CreateCategoryService{
    constructor(private categoriesRepo: CategoriesRepository) {
        
    }

    execute({ name, type, platforms, description }: IRequest): void {
        const categoryAlreadyExists = this.categoriesRepo.findByName(name)

        if (categoryAlreadyExists) {
            throw new Error("Category already exists")
        }

        this.categoriesRepo.create({ name, type, platforms, description })
    }
}

export { CreateCategoryService }