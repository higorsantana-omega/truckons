import { ISpecificationsRepository } from "@modules/trucks/repositories/ISpecificationRepository";
import { ITrucksRepository } from "@modules/trucks/repositories/ITrucksRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  truck_id: string;
  specifications_id: string[];
}

class CreateTruckSpecificationUseCase {
  constructor(
    private trucksRepository: ITrucksRepository,
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({ truck_id, specifications_id }: IRequest): Promise<void> {
    const truckExists = await this.trucksRepository.findById(truck_id);

    if (!truckExists) {
      throw new AppError("Truck does not exists");
    }

    const specifications = await this.specificationsRepository.findByIds(
      specifications_id
    );

    truckExists.specifications = specifications;

    await this.trucksRepository.create(truckExists)
  }
}

export { CreateTruckSpecificationUseCase };
