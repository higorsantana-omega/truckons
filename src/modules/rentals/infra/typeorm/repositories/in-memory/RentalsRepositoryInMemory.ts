import { Rental } from "../../entities/Rental";
import { IRentalsRepository } from "../IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = []
  async findOpenRentalByTruck(truck_id: string): Promise<Rental> {
    return this.rentals.find(rental => rental.truck_id === truck_id && rental.end_date === null)
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.rentals.find(rental => rental.user_id === user_id && rental.end_date === null)
  }

}

export { RentalsRepositoryInMemory }