import { CategoriesRepository } from "../../repositories/CategoriesRepository";
import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

const categoriesRepo = CategoriesRepository.getInstance()
const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepo)
const listCategoriesController = new ListCategoriesController(listCategoriesUseCase)

export { listCategoriesController }