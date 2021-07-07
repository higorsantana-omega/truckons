import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUSersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUSersRepository
    ) {}

    async execute({ name, username, email, driver_license, password }: ICreateUserDTO): Promise<void> {
        await this.usersRepository.create({
            name,
            username,
            email,
            driver_license,
            password
        })
    }

}

export { CreateUserUseCase }