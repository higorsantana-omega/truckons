import { TrucksRepositoryInMemory } from "@modules/trucks/repositories/in-memory/TrucksRepositoryInMemory"
import { ListTrucksUseCase } from "./ListTrucksUseCase"

let listTrucksUseCase: ListTrucksUseCase
let trucksRepositoryInMemory: TrucksRepositoryInMemory

describe("List Trucks", () => {
  beforeEach(() => {
    trucksRepositoryInMemory = new TrucksRepositoryInMemory()
    listTrucksUseCase = new ListTrucksUseCase(trucksRepositoryInMemory)
  })
  it("should be able to list all available trucks", async () => {
    const truck = await trucksRepositoryInMemory.create({
      name: "Truck1",
      description: "Truck description",
      daily_rate: 230,
      license_plate: "7UDJA",
      fine_amount: 150,
      brand: "Truck_brand",
      category_id: "category_id"
    })

    const trucks = await listTrucksUseCase.execute({})

    expect(trucks).toEqual([truck])
  })

  it("should be able to list all available trucks by name", async () => {
    const truck = await trucksRepositoryInMemory.create({
      name: "Truck2",
      description: "Truck description",
      daily_rate: 230,
      license_plate: "7KDJA",
      fine_amount: 150,
      brand: "Truck_brand_test",
      category_id: "category_id"
    })

    const trucks = await listTrucksUseCase.execute({
      brand: "Truck_brand",
    })

    expect(trucks).toEqual([truck])
  })
})