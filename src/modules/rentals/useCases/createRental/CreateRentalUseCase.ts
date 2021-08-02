import dayjs from 'dayjs'
import utc from "dayjs/plugin/utc"
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/infra/typeorm/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";

dayjs.extend(utc)

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
  }: IRequest): Promise<Rental> {
    const miniumHour = 24
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

    const expectedReturnDateFormat = dayjs(expected_return_date).utc().local().format()
    const dateNow = dayjs().utc().local().format()
    const compare = dayjs(expectedReturnDateFormat).diff(dateNow, "hour")

    if (compare < miniumHour) {
      throw new AppError("Invalid return time!");
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      truck_id,
      expected_return_date,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
