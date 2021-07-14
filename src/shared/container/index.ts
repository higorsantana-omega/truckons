import { UsersRepository } from "@modules/accounts/repositories/implementations/UserRepository"
import { IUSersRepository } from "@modules/accounts/repositories/IUsersRepository"
import { ICategoriesRepository } from "@modules/trucks/repositories/ICategoriesRepository"
import { CategoriesRepository } from "@modules/trucks/repositories/implementations/CategoriesRepository"
import { SpecificationsRepository } from "@modules/trucks/repositories/implementations/SpecificationsRepository"
import { ISpecificationsRepository } from "@modules/trucks/repositories/ISpecificationRepository"
import { container } from "tsyringe"


container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
)

container.registerSingleton<ISpecificationsRepository>(
    "SpecificationsRepository",
    SpecificationsRepository
)

container.registerSingleton<IUSersRepository>(
    "UsersRepository",
    UsersRepository
)