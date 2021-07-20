import { ICreateTruckDTO } from "@modules/trucks/dtos/ICreateTruckDTO";
import { ITrucksRepository } from "@modules/trucks/repositories/ITrucksRepository";
import { getRepository, Repository } from "typeorm";
import { Truck } from "../entities/Truck";

class TrucksRepository implements ITrucksRepository {
  private repository: Repository<Truck>

  constructor() {
    this.repository = getRepository(Truck)
  }

  async create({ brand, category_id, daily_rate, description, fine_amount, name, license_plate }: ICreateTruckDTO): Promise<Truck> {
    const truck = this.repository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id
    })

    await this.repository.save(truck)

    return truck
  }

  async findByLicensePlate(license_plate: string): Promise<Truck> {
    const truck = await this.repository.findOne({
      license_plate
    })

    return truck
  }

}

export { TrucksRepository }