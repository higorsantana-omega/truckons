import { IRentalsRepository } from "@modules/rentals/infra/typeorm/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  user_id: string;
  truck_id: string;
  expected_return_date: Date;
}

class CreateRentalUseCase {
  constructor(private rentalsRepository: IRentalsRepository) {}

  async execute({
    user_id,
    truck_id,
    expected_return_date,
  }: IRequest): Promise<void> {
    const truckUnavailable = await this.rentalsRepository.findOpenRentalByTruck(
      truck_id
    );

    if (truckUnavailable) {
      throw new AppError("Truck is unavailable");
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    );

    if (rentalOpenToUser) {
      throw new AppError("There's a rental in progress for user!");
    }
  }
}

export { CreateRentalUseCase };
