import { ICreateTruckDTO } from "../dtos/ICreateTruckDTO";

interface ITrucksRepository {
  create(data: ICreateTruckDTO): Promise<void>
}

export { ITrucksRepository }