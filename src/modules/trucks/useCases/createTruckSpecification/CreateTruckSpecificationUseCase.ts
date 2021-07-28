import { Truck } from "@modules/trucks/infra/typeorm/entities/Truck";
import { ISpecificationsRepository } from "@modules/trucks/repositories/ISpecificationRepository";
import { ITrucksRepository } from "@modules/trucks/repositories/ITrucksRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
  truck_id: string;
  specifications_id: string[];
}

@injectable()
class CreateTruckSpecificationUseCase {
  constructor(
    @inject("TrucksRepository")
    private trucksRepository: ITrucksRepository,
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({ truck_id, specifications_id }: IRequest): Promise<Truck> {
    const truckExists = await this.trucksRepository.findById(truck_id);

    if (!truckExists) {
      throw new AppError("Truck does not exists");
    }

    const specifications = await this.specificationsRepository.findByIds(
      specifications_id
    );

    truckExists.specifications = specifications;

    await this.trucksRepository.create(truckExists);

    return truckExists;
  }
}

export { CreateTruckSpecificationUseCase };
