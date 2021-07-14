import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUSersRepository } from "@modules/accounts/repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUSersRepository
    ) {}

    async execute({ name, email, driver_license, password }: ICreateUserDTO): Promise<void> {

        const emailAlreadyExists = await this.usersRepository.findByEmail(email)

        if (emailAlreadyExists) {
            throw new AppError("Email already exists");
        }

        const passwordHash = await hash(password, 9)
        
        await this.usersRepository.create({
            name,
            email,
            driver_license,
            password: passwordHash
        })
    }

}

export { CreateUserUseCase }