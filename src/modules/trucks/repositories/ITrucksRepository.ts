import { ICreateTruckDTO } from "../dtos/ICreateTruckDTO";
import { Truck } from "../infra/typeorm/entities/Truck";

interface ITrucksRepository {
  create(data: ICreateTruckDTO): Promise<Truck>;
  findByLicensePlate(license_plate: string): Promise<Truck>;
  findAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Truck[]>;
  findById(id: string): Promise<Truck>;
}

export { ITrucksRepository };
