import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

const categoriesRepo = null
const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepo)
const listCategoriesController = new ListCategoriesController(listCategoriesUseCase)

export { listCategoriesController }