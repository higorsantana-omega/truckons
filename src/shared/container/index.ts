import { container } from "tsyringe";
import "@shared/container/providers";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository";
import { IUSersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { ICategoriesRepository } from "@modules/trucks/repositories/ICategoriesRepository";
import { CategoriesRepository } from "@modules/trucks/infra/typeorm/repositories/CategoriesRepository";
import { ISpecificationsRepository } from "@modules/trucks/repositories/ISpecificationRepository";
import { SpecificationsRepository } from "@modules/trucks/infra/typeorm/repositories/SpecificationsRepository";
import { ITrucksRepository } from "@modules/trucks/repositories/ITrucksRepository";
import { TrucksRepository } from "@modules/trucks/infra/typeorm/repositories/TrucksRepository";
import { TrucksImageRepository } from "@modules/trucks/infra/typeorm/repositories/TrucksImagesRepository";
import { ITruckImagesRepository } from "@modules/trucks/repositories/ITrucksImageRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { RentalsRepository } from "@modules/rentals/infra/typeorm/repositories/RentalsRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokenRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
);

container.registerSingleton<IUSersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<ITrucksRepository>(
  "TrucksRepository",
  TrucksRepository
);

container.registerSingleton<ITruckImagesRepository>(
  "TrucksImagesRepository",
  TrucksImageRepository
);

container.registerSingleton<IRentalsRepository>(
  "RentalsRepository",
  RentalsRepository
);

container.registerSingleton<IUsersTokensRepository>(
  "UsersTokensRepository",
  UsersTokensRepository
);
