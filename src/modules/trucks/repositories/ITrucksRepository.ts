import { ICreateTruckDTO } from "../dtos/ICreateTruckDTO";
import { Truck } from "../infra/typeorm/entities/Truck";

interface ITrucksRepository {
  create(data: ICreateTruckDTO): Promise<Truck>
  findByLicensePlate(license_plate: string): Promise<Truck>
}

export { ITrucksRepository }