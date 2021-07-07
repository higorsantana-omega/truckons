import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUSersRepository } from "../IUsersRepository";


class UsersRepository implements IUSersRepository {
    private repository: Repository<User>
    constructor() {
        this.repository = getRepository(User)
    }

    async create({ name, email, driver_license, password }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name,
            email,
            driver_license,
            password
        })

        await this.repository.save(user)
    }
}

export { UsersRepository }