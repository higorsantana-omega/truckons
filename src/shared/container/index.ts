import { container } from "tsyringe"
import { ICategoriesRepository } from "../../modules/trucks/repositories/ICategoriesRepository"
import { CategoriesRepository } from "../../modules/trucks/repositories/implementations/CategoriesRepository"
import { SpecificationsRepository } from "../../modules/trucks/repositories/implementations/SpecificationsRepository"
import { ISpecificationsRepository } from "../../modules/trucks/repositories/ISpecificationRepository"

container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
)

container.registerSingleton<ISpecificationsRepository>(
    "SpecificationsRepository",
    SpecificationsRepository
)