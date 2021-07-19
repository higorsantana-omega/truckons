import { ITrucksRepository } from "@modules/trucks/repositories/ITrucksRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  name: string
  description: string
  daily_rate: number
  license_plate: string
  fine_amount: number
  brand: string
  category_id: string
}

@injectable()
class CreateTruckUseCase {
  constructor(@inject("TruckRepository") private trucksRepository: ITrucksRepository) {}
  async execute({ name, description, daily_rate, license_plate, fine_amount, brand, category_id }: IRequest): Promise<void> {
    this.trucksRepository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id
    })
  }
}

export { CreateTruckUseCase }