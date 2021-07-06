import { container } from "tsyringe"
import { ICategoriesRepository } from "../../modules/trucks/repositories/ICategoriesRepository"
import { CategoriesRepository } from "../../modules/trucks/repositories/implementations/CategoriesRepository"

container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
)