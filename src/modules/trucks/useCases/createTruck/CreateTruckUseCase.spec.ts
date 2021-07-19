import { TrucksRepositoryInMemory } from "@modules/trucks/repositories/in-memory/TrucksRepositoryInMemory"
import { CreateTruckUseCase } from "./CreateTruckUseCase"

let createTruckUseCase: CreateTruckUseCase
let trucksRepositoryInMemory: TrucksRepositoryInMemory

describe("Create a truck", () => {
  beforeEach(() => {
    trucksRepositoryInMemory = new TrucksRepositoryInMemory()
    createTruckUseCase = new CreateTruckUseCase(trucksRepositoryInMemory)
  })

  it("should be able to create a new truck", async () => {
    await createTruckUseCase.execute({
      name: "Name truck",
      description: "Description truck",
      daily_rate: 200,
      license_plate: "ABC",
      fine_amount: 20,
      brand: "Brand truck",
      category_id: "category"
    })
  })
})