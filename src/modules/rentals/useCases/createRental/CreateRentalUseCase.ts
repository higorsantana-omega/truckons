import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { inject, injectable } from "tsyringe";
import { ITrucksRepository } from "@modules/trucks/repositories/ITrucksRepository";

dayjs.extend(utc);

interface IRequest {
  user_id: string;
  truck_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("TrucksRepository")
    private trucksRepository: ITrucksRepository
  ) {}

  async execute({
    user_id,
    truck_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const miniumHour = 24;
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

    const dateNow = this.dateProvider.dateNow();

    const compare = this.dateProvider.compareInHours(
      dateNow,
      expected_return_date
    );

    if (compare < miniumHour) {
      throw new AppError("Invalid return time!");
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      truck_id,
      expected_return_date,
    });

    await this.trucksRepository.updateAvailable(truck_id, false);

    return rental;
  }
}

export { CreateRentalUseCase };
