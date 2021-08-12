import { TrucksRepositoryInMemory } from "@modules/trucks/repositories/in-memory/TrucksRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateTruckUseCase } from "./CreateTruckUseCase";

let createTruckUseCase: CreateTruckUseCase;
let trucksRepositoryInMemory: TrucksRepositoryInMemory;

describe("Create a truck", () => {
  beforeEach(() => {
    trucksRepositoryInMemory = new TrucksRepositoryInMemory();
    createTruckUseCase = new CreateTruckUseCase(trucksRepositoryInMemory);
  });

  it("should be able to create a new truck", async () => {
    const truck = await createTruckUseCase.execute({
      name: "Name truck",
      description: "Description truck",
      daily_rate: 200,
      license_plate: "ABC",
      fine_amount: 20,
      brand: "Brand truck",
      category_id: "category",
    });

    expect(truck).toHaveProperty("id");
  });

  it("should not be able to create a truck with exists license plate", async () => {
    await createTruckUseCase.execute({
      name: "Truck1",
      description: "Description truck",
      daily_rate: 200,
      license_plate: "ABC",
      fine_amount: 20,
      brand: "Brand truck",
      category_id: "category",
    });

    await expect(
      createTruckUseCase.execute({
        name: "Truck2",
        description: "Description truck",
        daily_rate: 200,
        license_plate: "ABC",
        fine_amount: 20,
        brand: "Brand truck",
        category_id: "category",
      })
    ).rejects.toEqual(new AppError("Truck already exists"));
  });

  it("should not be able to create a truck with available true by default", async () => {
    const truck = await createTruckUseCase.execute({
      name: "Truck2",
      description: "Description truck",
      daily_rate: 200,
      license_plate: "ABC",
      fine_amount: 20,
      brand: "Brand truck",
      category_id: "category",
    });

    expect(truck.available).toBe(true);
  });
});
