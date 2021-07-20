import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository"
import { IUSersRepository } from "@modules/accounts/repositories/IUsersRepository"
import { ICategoriesRepository } from "@modules/trucks/repositories/ICategoriesRepository"
import { CategoriesRepository } from "@modules/trucks/infra/typeorm/repositories/CategoriesRepository"
import { ISpecificationsRepository } from "@modules/trucks/repositories/ISpecificationRepository"
import { container } from "tsyringe"
import { SpecificationsRepository } from "@modules/trucks/infra/typeorm/repositories/SpecificationsRepository"
import { ITrucksRepository } from "@modules/trucks/repositories/ITrucksRepository"
import { TrucksRepository } from "@modules/trucks/infra/typeorm/repositories/TrucksRepository"


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

container.registerSingleton<ITrucksRepository>(
  "TrucksRepository", TrucksRepository
)