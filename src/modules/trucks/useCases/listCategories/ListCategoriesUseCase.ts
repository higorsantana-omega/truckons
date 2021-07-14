import { Category } from "@modules/trucks/entities/Category";
import { ICategoriesRepository } from "@modules/trucks/repositories/ICategoriesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListCategoriesUseCase{
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepo: ICategoriesRepository) {
        
    }

    async execute(): Promise<Category[]> {
        const categories = await this.categoriesRepo.list()
        return categories
    }
}

export { ListCategoriesUseCase }
