import { Truck } from "@modules/trucks/infra/typeorm/entities/Truck";
import { ITrucksRepository } from "@modules/trucks/repositories/ITrucksRepository";

interface IRequest {
  category_id?: string
  brand?: string
  name?: string
}

class ListTrucksUseCase {
  constructor(
    private trucksRepository: ITrucksRepository
  ) { }
  
  async execute({ category_id, brand, name }: IRequest): Promise<Truck[]>{
    const trucks = await this.trucksRepository.findAvailable(brand, category_id, name)

    return trucks
  }
  
}

export { ListTrucksUseCase }