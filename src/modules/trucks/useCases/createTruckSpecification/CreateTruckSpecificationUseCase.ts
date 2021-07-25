import { ITrucksRepository } from "@modules/trucks/repositories/ITrucksRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  truck_id: string
  specifications_id: string[]
}

class CreateTruckSpecificationUseCase {
  constructor(private trucksRepository: ITrucksRepository) { }
  
  async execute({ truck_id, specifications_id }: IRequest): Promise<void> {
    const truckExists = await this.trucksRepository.findById(truck_id)

    if (!truckExists) {
      throw new AppError("Truck does not exists");
    }
  }
}

export { CreateTruckSpecificationUseCase };
