import { ICreateTruckDTO } from "@modules/trucks/dtos/ICreateTruckDTO";
import { Truck } from "@modules/trucks/infra/typeorm/entities/Truck";
import { ITrucksRepository } from "../ITrucksRepository";

class TrucksRepositoryInMemory implements ITrucksRepository{
  trucks: Truck[] = []
  async create({ brand, daily_rate, name, license_plate, fine_amount, description, category_id }: ICreateTruckDTO): Promise<Truck> {
    const truck = new Truck()
    Object.assign(truck, {
      brand,
      daily_rate,
      name,
      license_plate,
      fine_amount,
      description,
      category_id
    })

    this.trucks.push(truck)

    return truck
  }

  async findByLicensePlate(license_plate: string): Promise<Truck> {
    return this.trucks.find(truck => truck.license_plate === license_plate)
  }
}

export { TrucksRepositoryInMemory }