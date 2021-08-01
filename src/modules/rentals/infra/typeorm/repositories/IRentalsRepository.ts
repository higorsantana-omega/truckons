import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "../entities/Rental";

interface IRentalsRepository {
  findOpenRentalByTruck(truck_id: string): Promise<Rental>;
  findOpenRentalByUser(user_id: string): Promise<Rental>;
  create(data: ICreateRentalDTO): Promise<Rental>
}

export { IRentalsRepository };
