import { TrucksRepositoryInMemory } from "@modules/trucks/repositories/in-memory/TrucksRepositoryInMemory";
import { ListTrucksUseCase } from "./ListAvailableTrucksUseCase";

let listTrucksUseCase: ListTrucksUseCase;
let trucksRepositoryInMemory: TrucksRepositoryInMemory;

describe("List Trucks", () => {
  beforeEach(() => {
    trucksRepositoryInMemory = new TrucksRepositoryInMemory();
    listTrucksUseCase = new ListTrucksUseCase(trucksRepositoryInMemory);
  });
  it("should be able to list all available trucks", async () => {
    const truck = await trucksRepositoryInMemory.create({
      name: "Truck1",
      description: "Truck description",
      daily_rate: 230,
      license_plate: "7UDJA",
      fine_amount: 150,
      brand: "Truck_brand",
      category_id: "category_id",
    });

    const trucks = await listTrucksUseCase.execute({});

    expect(trucks).toEqual([truck]);
  });

  it("should be able to list all available trucks by brand", async () => {
    const truck = await trucksRepositoryInMemory.create({
      name: "Truck2",
      description: "Truck description",
      daily_rate: 230,
      license_plate: "7KDJA",
      fine_amount: 150,
      brand: "Truck_brand_test",
      category_id: "category_id",
    });

    const trucks = await listTrucksUseCase.execute({
      brand: "Truck_brand_test",
    });

    expect(trucks).toEqual([truck]);
  });

  it("should be able to list all available trucks by name", async () => {
    const truck = await trucksRepositoryInMemory.create({
      name: "Truck3",
      description: "Truck description",
      daily_rate: 230,
      license_plate: "7KDJA",
      fine_amount: 150,
      brand: "Truck_brand_test",
      category_id: "category_id",
    });

    const trucks = await listTrucksUseCase.execute({
      name: "Truck3",
    });

    expect(trucks).toEqual([truck]);
  });

  it("should be able to list all available trucks by category", async () => {
    const truck = await trucksRepositoryInMemory.create({
      name: "Truck3",
      description: "Truck description",
      daily_rate: 230,
      license_plate: "7KDJA",
      fine_amount: 150,
      brand: "Truck_brand_test",
      category_id: "1234",
    });

    const trucks = await listTrucksUseCase.execute({
      category_id: "1234",
    });

    expect(trucks).toEqual([truck]);
  });
});
