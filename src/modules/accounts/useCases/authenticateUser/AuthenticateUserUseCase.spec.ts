import { AppError } from "@errors/AppError"
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO"
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

let authenticateUserUseCase: AuthenticateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let createUserUseCase: CreateUserUseCase

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory)
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
  })

  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "0012221",
      email: "user@test.com",
      password: "123",
      name: "User_Test"
    }
    await createUserUseCase.execute(user)

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    })

    expect(result).toHaveProperty("token")
  })

  it("should not be able to authenticate an no existent user", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "user@test.com",
        password: "123"
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it("should not be able to authenticate with incorrect password", () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: "9999",
        email: "user@email.com",
        password: "0228121",
        name: "user Error"
      }

      await createUserUseCase.execute(user)

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "passwordincorrect"
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})