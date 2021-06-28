import { CategoriesRepository } from "../../repositories/CategoriesRepository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

const categoriesRepo = new CategoriesRepository()
const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepo)
const createCategoryController = new CreateCategoryController(createCategoryUseCase)

export { createCategoryController }