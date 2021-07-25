import { TrucksRepositoryInMemory } from "@modules/trucks/repositories/in-memory/TrucksRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateTruckSpecificationUseCase } from "./CreateTruckSpecificationUseCase";

let createTruckSpecificationUseCase: CreateTruckSpecificationUseCase;
let trucksRepositoryInMemory: TrucksRepositoryInMemory;

describe("Create Truck Specification", () => {
  beforeEach(() => {
    trucksRepositoryInMemory = new TrucksRepositoryInMemory();
    createTruckSpecificationUseCase = new CreateTruckSpecificationUseCase(
      trucksRepositoryInMemory
    );
  });

  it("should not be able to add a new specification to a now-existent truck", async () => {
    expect(async () => {
      const truck_id = "123456"
    const specifications_id = ["20182108"]
    await createTruckSpecificationUseCase.execute({truck_id, specifications_id});
    }).rejects.toBeInstanceOf(AppError)
  });

  it("should be able to add a new specification to the truck", async () => {
    const truck = await trucksRepositoryInMemory.create({
      name: "Truck2",
      description: "Description truck",
      daily_rate: 200,
      license_plate: "ABC",
      fine_amount: 20,
      brand: "Brand truck",
      category_id: "category"
    })

    const specifications_id = ["20182108"]
    await createTruckSpecificationUseCase.execute({truck_id: truck.id, specifications_id});
  });
});
