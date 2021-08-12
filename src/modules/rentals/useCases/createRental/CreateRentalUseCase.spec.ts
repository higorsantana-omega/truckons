import dayjs from "dayjs";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { TrucksRepositoryInMemory } from "@modules/trucks/repositories/in-memory/TrucksRepositoryInMemory";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let trucksRepositoryInMemory: TrucksRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();
  const dayAdd72Hours = dayjs().add(3, "day").toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    trucksRepositoryInMemory = new TrucksRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      trucksRepositoryInMemory
    );
  });

  it("should be able to create a new rental", async () => {
    const truck = await trucksRepositoryInMemory.create({
      name: "Test",
      description: "Truck test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand",
    });

    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      truck_id: truck.id,
      expected_return_date: dayAdd72Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should be able to create a new rental if there is another open to the same user", async () => {
    await rentalsRepositoryInMemory.create({
      truck_id: "11111",
      expected_return_date: dayAdd24Hours,
      user_id: "12345",
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "12345",
        truck_id: "21219",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("There's a rental in progress for user!"));
  });

  it("should be able to create a new rental if there is another open to the same truck", async () => {
    await rentalsRepositoryInMemory.create({
      user_id: "321",
      truck_id: "test",
      expected_return_date: dayAdd24Hours,
    });
    await expect(
      createRentalUseCase.execute({
        user_id: "0231",
        truck_id: "test",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("Truck is unavailable"));
  });

  it("should be able to create a new rental with invalid return time", async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: "123",
        truck_id: "test",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError("Invalid return time!"));
  });
});
