import { SpecificationsRepositoryInMemory } from "@modules/trucks/repositories/in-memory/SpecificationsRepositoryInMemory";
import { TrucksRepositoryInMemory } from "@modules/trucks/repositories/in-memory/TrucksRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateTruckSpecificationUseCase } from "./CreateTruckSpecificationUseCase";

let createTruckSpecificationUseCase: CreateTruckSpecificationUseCase;
let trucksRepositoryInMemory: TrucksRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Create Truck Specification", () => {
  beforeEach(() => {
    trucksRepositoryInMemory = new TrucksRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createTruckSpecificationUseCase = new CreateTruckSpecificationUseCase(
      trucksRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it("should not be able to add a new specification to a now-existent truck", async () => {
    const truck_id = "123456";
    const specifications_id = ["20182108"];

    await expect(
      createTruckSpecificationUseCase.execute({
        truck_id,
        specifications_id,
      })
    ).rejects.toEqual(new AppError("Truck does not exists"));
  });

  it("should be able to add a new specification to the truck", async () => {
    const truck = await trucksRepositoryInMemory.create({
      name: "Truck2",
      description: "Description truck",
      daily_rate: 200,
      license_plate: "ABC",
      fine_amount: 20,
      brand: "Brand truck",
      category_id: "category",
    });

    const specification = await specificationsRepositoryInMemory.create({
      description: "test",
      name: "test",
    });

    const specifications_id = [specification.id];
    const specificationTrucks = await createTruckSpecificationUseCase.execute({
      truck_id: truck.id,
      specifications_id,
    });

    expect(specificationTrucks).toHaveProperty("specifications");
    expect(specificationTrucks.specifications.length).toBe(1);
  });
});
