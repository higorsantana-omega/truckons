import { ICreateUserDTO } from "../dtos/ICreateUserDTO";

interface IUSersRepository {
    create(data: ICreateUserDTO): Promise<void>
}

export { IUSersRepository }