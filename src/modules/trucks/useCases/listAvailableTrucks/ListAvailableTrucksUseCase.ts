import { Truck } from "@modules/trucks/infra/typeorm/entities/Truck";
import { ITrucksRepository } from "@modules/trucks/repositories/ITrucksRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  category_id?: string;
  brand?: string;
  name?: string;
}

@injectable()
class ListAvailableTrucksUseCase {
  constructor(
    @inject("TrucksRepository")
    private trucksRepository: ITrucksRepository
  ) {}

  async execute({ category_id, brand, name }: IRequest): Promise<Truck[]> {
    const trucks = await this.trucksRepository.findAvailable(
      brand,
      category_id,
      name
    );
    return trucks;
  }
}

export { ListAvailableTrucksUseCase };
