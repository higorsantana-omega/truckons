import { Category } from "../../models/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";


class ListCategoriesUseCase{
    constructor(private categoriesRepo: ICategoriesRepository) {
        
    }

    execute(): Category[] {
        const categories = this.categoriesRepo.list()
        return categories
    }
}

export { ListCategoriesUseCase }
