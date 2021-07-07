import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";

interface IUSersRepository {
    create(data: ICreateUserDTO): Promise<void>
    findByEmail(email: string): Promise<User>
}

export { IUSersRepository }