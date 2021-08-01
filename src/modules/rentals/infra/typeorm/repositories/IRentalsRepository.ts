import { Rental } from "../entities/Rental";

interface IRentalsRepository {
  findOpenRentalByTruck(truck_id: string): Promise<Rental>;
  findOpenRentalByUser(user_id: string): Promise<Rental>;
}

export { IRentalsRepository };
