import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

export default (): CreateCategoryController => {
    const categoriesRepo = new CategoriesRepository()
    const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepo)
    const createCategoryController = new CreateCategoryController(createCategoryUseCase)

    return createCategoryController
}
