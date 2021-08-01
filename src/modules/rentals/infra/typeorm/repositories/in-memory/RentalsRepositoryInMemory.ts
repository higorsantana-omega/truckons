import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "../../entities/Rental";
import { IRentalsRepository } from "../IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = []
  async findOpenRentalByTruck(truck_id: string): Promise<Rental> {
    return this.rentals.find(rental => rental.truck_id === truck_id && !rental.end_date)
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.rentals.find(rental => rental.user_id === user_id && !rental.end_date)
  }

  async create({ truck_id, expected_return_date, user_id}: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental()

    Object.assign(rental, {
      truck_id,
      expected_return_date,
      user_id,
      start_date: new Date(),
    })

    this.rentals.push(rental)

    return rental
  }

}

export { RentalsRepositoryInMemory }