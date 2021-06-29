import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

const categoriesRepo = CategoriesRepository.getInstance()
const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepo)
const createCategoryController = new CreateCategoryController(createCategoryUseCase)

export { createCategoryController }