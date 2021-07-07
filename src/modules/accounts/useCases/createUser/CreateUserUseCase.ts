import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUSersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUSersRepository
    ) {}

    async execute({ name, email, driver_license, password }: ICreateUserDTO): Promise<void> {
        await this.usersRepository.create({
            name,
            email,
            driver_license,
            password
        })
    }

}

export { CreateUserUseCase }